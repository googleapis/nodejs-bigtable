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
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {
  CloudMonitoringExporter,
  ExportResult,
} from '../src/client-side-metrics/exporter';
import {GCPMetricsHandler} from '../src/client-side-metrics/gcp-metrics-handler';
import * as mocha from 'mocha';
import {setupBigtable} from './client-side-metrics-setup-table';

describe.only('Bigtable/ClientSideMetricsToGCM', () => {
  let numberOfExports = 0;
  async function mockBigtable(done: mocha.Done) {
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
        try {
          super.export(metrics, (result: ExportResult) => {
            if (!exported) {
              exported = true;
              try {
                clearTimeout(timeout);
                // The test passes when the code is 0 because that means the
                // result from calling export was successful.
                assert.strictEqual(result.code, 0);
                resultCallback({code: 0});
                if (numberOfExports > 1) {
                  done();
                }
                numberOfExports++;
              } catch (error) {
                // The code here isn't 0 so we report the original error to the mocha test runner.
                done(result);
                done(error);
              }
            }
          });
        } catch (error) {
          done(error);
        }
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
    return new FakeBigtable();
  }

  const instanceId1 = 'emulator-test-instance';
  const instanceId2 = 'emulator-test-instance2';
  const tableId1 = 'my-table';
  const tableId2 = 'my-table2';
  const columnFamilyId = 'cf1';
  // This line is added just to make sure the bigtable variable is assigned.
  // It is needed to solve a compile time error in the after hook.
  const bigtable = new Bigtable();

  after(async () => {
    try {
      // If the instance has been deleted already by another source, we don't
      // want this after hook to block the continuous integration pipeline.
      const instance = bigtable.instance(instanceId1);
      await instance.delete({});
    } catch (e) {
      console.warn('The instance has been deleted already');
    }
    try {
      // If the instance has been deleted already by another source, we don't
      // want this after hook to block the continuous integration pipeline.
      const instance = bigtable.instance(instanceId2);
      await instance.delete({});
    } catch (e) {
      console.warn('The instance has been deleted already');
    }
  });

  it('should send the metrics to Google Cloud Monitoring for a ReadRows call', done => {
    /*
    We need to create a timeout here because if we don't then mocha shuts down
    the test as it is sleeping before the GCPMetricsHandler has a chance to
    export the data.
    */
    const timeout = setTimeout(() => {
      if (numberOfExports < 2) {
        done(
          new Error(
            'The exporters have not completed yet and the timeout is over'
          )
        );
      }
    }, 240000);
    (async () => {
      try {
        const bigtable1 = await mockBigtable(done);
        const bigtable2 = await mockBigtable(done);
        for (const bigtable of [bigtable1, bigtable2]) {
          for (const instanceId of [instanceId1, instanceId2]) {
            await setupBigtable(bigtable, columnFamilyId, instanceId, [
              tableId1,
              tableId2,
            ]);
            const instance = bigtable.instance(instanceId);
            const table = instance.table(tableId1);
            await table.getRows();
            const table2 = instance.table(tableId2);
            await table2.getRows();
          }
        }
      } catch (e) {
        done(e);
      }
    })();
  });
});
