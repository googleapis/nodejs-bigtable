// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {describe, it, before, after} from 'mocha';
import * as assert from 'assert';
import {Bigtable} from '../src';
import * as proxyquire from 'proxyquire';
import {TabularApiSurface} from '../src/tabular-api-surface';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {
  CloudMonitoringExporter,
  ExportResult,
} from '../src/client-side-metrics/exporter';
import {GCPMetricsHandler} from '../src/client-side-metrics/gcp-metrics-handler';
import * as mocha from 'mocha';

describe('Bigtable/ClientSideMetricsToGCM', () => {
  async function mockBigtable(done: mocha.Done) {
    /*
    We need to create a timeout here because if we don't then mocha shuts down
    the test as it is sleeping before the GCPMetricsHandler has a chance to
    export the data.
    */
    const timeout = setTimeout(() => {}, 120000);
    /*
    The exporter is called every x seconds, but we only want to test the value
    it receives once. Since done cannot be called multiple times in mocha,
    exported variable ensures we only test the value export receives one time.
    */
    let exported = false;

    class TestExporter extends CloudMonitoringExporter {
      export(
        metrics: ResourceMetrics,
        resultCallback: (result: ExportResult) => void
      ): void {
        super.export(metrics, (result: ExportResult) => {
          if (!exported) {
            exported = true;
            try {
              clearTimeout(timeout);
              // The test passes when the code is 0 because that means the
              // result from calling export was successful.
              assert.strictEqual(result.code, 0);
              done();
              resultCallback({code: 0});
            } catch (error) {
              // The code here isn't 0 so we report the original error to the mocha test runner.
              done(result);
              done(error);
            }
          }
        });
      }
    }

    class TestGCPMetricsHandler extends GCPMetricsHandler {
      constructor() {
        super(new TestExporter());
      }
    }

    /*
    Below we mock out the table so that it sends the metrics to a test exporter
    that will still send the metrics to Google Cloud Monitoring, but then also
    ensure the export was successful and pass the test with code 0 if it is
    successful.
     */
    const FakeBigtable = proxyquire('../src/index.js', {
      './client-side-metrics/gcp-metrics-handler': {
        GCPMetricsHandler: TestGCPMetricsHandler,
      },
    }).Bigtable;
    bigtable = new FakeBigtable();

    const instance = bigtable.instance(instanceId);
    const [instanceInfo] = await instance.exists();
    if (!instanceInfo) {
      const [, operation] = await instance.create({
        clusters: {
          id: 'fake-cluster3',
          location: 'us-west1-c',
          nodes: 1,
        },
      });
      await operation.promise();
    }

    const table = instance.table(tableId);
    const [tableExists] = await table.exists();
    if (!tableExists) {
      await table.create({families: [columnFamilyId]}); // Create column family
    } else {
      // Check if column family exists and create it if not.
      const [families] = await table.getFamilies();

      if (
        !families.some((family: {id: string}) => family.id === columnFamilyId)
      ) {
        await table.createFamily(columnFamilyId);
      }
    }
  }

  const instanceId = 'emulator-test-instance';
  const tableId = 'my-table';
  const columnFamilyId = 'cf1';
  let bigtable: Bigtable;

  before(async () => {
    // This line is added just to make sure the bigtable variable is assigned.
    // It is needed to solve a compile time error in the after hook.
    bigtable = new Bigtable();
  });

  after(async () => {
    try {
      // If the instance has been deleted already by another source, we don't
      // want this after hook to block the continuous integration pipeline.
      const instance = bigtable.instance(instanceId);
      await instance.delete({});
    } catch (e) {
      console.warn('The instance has been deleted already');
    }
  });

  it('should send the metrics to Google Cloud Monitoring for a ReadRows call', done => {
    (async () => {
      await mockBigtable(done);
      const instance = bigtable.instance(instanceId);
      const table = instance.table(tableId);
      await table.getRows();
    })();
  });
});
