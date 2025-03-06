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

// TODO: Must be put in root folder or will not run

import {describe, it, before, after} from 'mocha';
import {Bigtable} from '../src';
import * as proxyquire from 'proxyquire';
import {TabularApiSurface} from '../src/tabular-api-surface';
import * as mocha from 'mocha';
import * as assert from 'assert';
import {TestMetricsHandler} from '../test-common/test-metrics-handler';
import {
  OnOperationCompleteData,
} from '../src/client-side-metrics/metrics-handler';

describe.only('Bigtable/MetricsCollector', () => {
  async function mockBigtable(done: mocha.Done) {
    class TestGCPMetricsHandler extends TestMetricsHandler {
      onOperationComplete(data: OnOperationCompleteData) {
        super.onOperationComplete(data);
        assert.strictEqual(this.requestsHandled.length, 2);
        const firstRequest = this.requestsHandled[0] as any;
        // We would expect these parameters to be different every time so delete
        // them from the comparison.
        delete firstRequest.attemptLatency;
        delete firstRequest.serverLatency;
        delete firstRequest.metricsCollectorData.clientUid;
        delete firstRequest.metricsCollectorData.appProfileId;
        assert.deepStrictEqual(firstRequest, {
          connectivityErrorCount: 0,
          streamingOperation: 'true',
          attemptStatus: 0,
          clientName: 'nodejs-bigtable',
          metricsCollectorData: {
            instanceId: 'emulator-test-instance',
            table: 'my-table',
            cluster: 'fake-cluster3',
            zone: 'us-west1-c',
            methodName: 'Bigtable.ReadRows',
          },
          projectId: 'cloud-native-db-dpes-shared',
        });
        const secondRequest = this.requestsHandled[1] as any;
        delete secondRequest.operationLatency;
        delete secondRequest.firstResponseLatency;
        delete secondRequest.metricsCollectorData.clientUid;
        delete secondRequest.metricsCollectorData.appProfileId;
        assert.deepStrictEqual(secondRequest, {
          finalOperationStatus: 0,
          streamingOperation: 'true',
          clientName: 'nodejs-bigtable',
          metricsCollectorData: {
            instanceId: 'emulator-test-instance',
            table: 'my-table',
            cluster: 'fake-cluster3',
            zone: 'us-west1-c',
            methodName: 'Bigtable.ReadRows',
          },
          projectId: 'cloud-native-db-dpes-shared',
          retryCount: 0,
        });
        // Do assertion checks here to
        done();
      }
    }

    const FakeTabularApiSurface = proxyquire('../src/tabular-api-surface.js', {
      './client-side-metrics/gcp-metrics-handler': {
        GCPMetricsHandler: TestGCPMetricsHandler,
      },
    }).TabularApiSurface;
    const FakeTable: TabularApiSurface = proxyquire('../src/table.js', {
      './tabular-api-surface.js': {TabularApiSurface: FakeTabularApiSurface},
    }).Table;
    const FakeInstance = proxyquire('../src/instance.js', {
      './table.js': {Table: FakeTable},
    }).Instance;
    const FakeBigtable = proxyquire('../src/index.js', {
      './instance.js': {Instance: FakeInstance},
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
    const instance = bigtable.instance(instanceId);
    await instance.delete({});
  });

  it('should read rows after inserting data', done => {
    (async () => {
      await mockBigtable(done);
      const instance = bigtable.instance(instanceId);
      const table = instance.table(tableId);
      await table.getRows();
    })();
  });
});
