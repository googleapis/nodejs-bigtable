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
import {Bigtable} from '../src';
import * as proxyquire from 'proxyquire';
import * as mocha from 'mocha';
import * as assert from 'assert';
import {TestMetricsHandler} from '../test-common/test-metrics-handler';
import {OnOperationCompleteData} from '../src/client-side-metrics/metrics-handler';
import {setupBigtable} from './client-side-metrics-setup-table';

describe('Bigtable/ClientSideMetricsToMetricsHandler', () => {
  async function mockBigtable(projectId: string, done: mocha.Done) {
    let handlerRequestCount = 0;
    class TestGCPMetricsHandler extends TestMetricsHandler {
      onOperationComplete(data: OnOperationCompleteData) {
        handlerRequestCount++;
        try {
          super.onOperationComplete(data);
          if (handlerRequestCount > 1) {
            assert.strictEqual(this.requestsHandled.length, 4);
            const firstRequest = this.requestsHandled[0] as any;
            // We would expect these parameters to be different every time so delete
            // them from the comparison after checking they exist.
            assert(firstRequest.attemptLatency);
            assert(firstRequest.serverLatency);
            assert(firstRequest.metricsCollectorData.client_uid);
            delete firstRequest.attemptLatency;
            delete firstRequest.serverLatency;
            delete firstRequest.metricsCollectorData.client_uid;
            delete firstRequest.metricsCollectorData.appProfileId;
            assert.deepStrictEqual(firstRequest, {
              connectivityErrorCount: 0,
              streaming: 'true',
              status: '0',
              client_name: 'nodejs-bigtable',
              metricsCollectorData: {
                instanceId: 'emulator-test-instance',
                table: 'my-table',
                cluster: 'fake-cluster3',
                zone: 'us-west1-c',
                method: 'Bigtable.ReadRows',
              },
              projectId,
            });
            const secondRequest = this.requestsHandled[1] as any;
            // We would expect these parameters to be different every time so delete
            // them from the comparison after checking they exist.
            assert(secondRequest.operationLatency);
            assert(secondRequest.firstResponseLatency);
            assert(secondRequest.metricsCollectorData.client_uid);
            delete secondRequest.operationLatency;
            delete secondRequest.firstResponseLatency;
            delete secondRequest.metricsCollectorData.client_uid;
            delete secondRequest.metricsCollectorData.appProfileId;
            assert.deepStrictEqual(secondRequest, {
              status: '0',
              streaming: 'true',
              client_name: 'nodejs-bigtable',
              metricsCollectorData: {
                instanceId: 'emulator-test-instance',
                cluster: 'fake-cluster3',
                zone: 'us-west1-c',
                method: 'Bigtable.ReadRows',
                table: 'my-table',
              },
              projectId,
              retryCount: 0,
            });
            // We would expect these parameters to be different every time so delete
            // them from the comparison after checking they exist.
            const thirdRequest = this.requestsHandled[2] as any;
            assert(thirdRequest.attemptLatency);
            assert(thirdRequest.serverLatency);
            assert(thirdRequest.metricsCollectorData.client_uid);
            delete thirdRequest.attemptLatency;
            delete thirdRequest.serverLatency;
            delete thirdRequest.metricsCollectorData.client_uid;
            delete thirdRequest.metricsCollectorData.appProfileId;
            assert.deepStrictEqual(thirdRequest, {
              connectivityErrorCount: 0,
              streaming: 'true',
              status: '0',
              client_name: 'nodejs-bigtable',
              metricsCollectorData: {
                instanceId: 'emulator-test-instance',
                table: 'my-table2',
                cluster: 'fake-cluster3',
                zone: 'us-west1-c',
                method: 'Bigtable.ReadRows',
              },
              projectId,
            });
            const fourthRequest = this.requestsHandled[3] as any;
            // We would expect these parameters to be different every time so delete
            // them from the comparison after checking they exist.
            assert(fourthRequest.operationLatency);
            assert(fourthRequest.firstResponseLatency);
            assert(fourthRequest.metricsCollectorData.client_uid);
            delete fourthRequest.operationLatency;
            delete fourthRequest.firstResponseLatency;
            delete fourthRequest.metricsCollectorData.client_uid;
            delete fourthRequest.metricsCollectorData.appProfileId;
            assert.deepStrictEqual(fourthRequest, {
              status: '0',
              streaming: 'true',
              client_name: 'nodejs-bigtable',
              metricsCollectorData: {
                instanceId: 'emulator-test-instance',
                cluster: 'fake-cluster3',
                zone: 'us-west1-c',
                method: 'Bigtable.ReadRows',
                table: 'my-table2',
              },
              projectId,
              retryCount: 0,
            });
            done();
          }
        } catch (e) {
          done(e);
        }
      }
    }

    const FakeBigtable = proxyquire('../src/index.js', {
      './client-side-metrics/gcp-metrics-handler': {
        GCPMetricsHandler: TestGCPMetricsHandler,
      },
    }).Bigtable;
    bigtable = new FakeBigtable();
    await setupBigtable(bigtable, columnFamilyId, instanceId, [
      tableId,
      tableId2,
    ]);
  }

  const instanceId = 'emulator-test-instance';
  const tableId = 'my-table';
  const tableId2 = 'my-table2';
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

  it('should send the metrics to the metrics handler for a ReadRows call', done => {
    (async () => {
      const projectId: string = await new Promise((resolve, reject) => {
        bigtable.getProjectId_((err, projectId) => {
          if (err) {
            reject(err);
          } else {
            resolve(projectId as string);
          }
        });
      });
      await mockBigtable(projectId, done);
      const instance = bigtable.instance(instanceId);
      const table = instance.table(tableId);
      await table.getRows();
      const table2 = instance.table(tableId2);
      await table2.getRows();
    })();
  });
});
