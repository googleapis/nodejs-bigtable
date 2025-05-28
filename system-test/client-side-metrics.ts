// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {after, before, describe, it} from 'mocha';
import * as mocha from 'mocha';
import {
  CloudMonitoringExporter,
  ExportResult,
} from '../src/client-side-metrics/exporter';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import * as assert from 'assert';
import {GCPMetricsHandler} from '../src/client-side-metrics/gcp-metrics-handler';
import * as proxyquire from 'proxyquire';
import {Bigtable} from '../src';
import {setupBigtable} from './client-side-metrics-setup-table';
import {TestMetricsHandler} from '../test-common/test-metrics-handler';
import {
  OnAttemptCompleteData,
  OnOperationCompleteData,
} from '../src/client-side-metrics/metrics-handler';
import {ClientOptions} from 'google-gax';
import {ClientSideMetricsConfigManager} from '../src/client-side-metrics/metrics-config-manager';
import {OperationMetricsCollector} from '../src/client-side-metrics/operation-metrics-collector';
import {PassThrough} from 'stream';
import {generateChunksFromRequest} from '../test/utils/readRowsImpl';

const SECOND_PROJECT_ID = 'cfdb-sdk-node-tests';

class FakeHRTime {
  startTime = BigInt(0);

  bigint() {
    this.startTime += BigInt(1000000000);
    return this.startTime;
  }
}

/**
 * This method retrieves a bigtable client that sends metrics to the metrics
 * handler class. The client also uses metrics collectors that have
 * deterministic timestamps associated with the various latency metrics so that
 * they can be tested.
 *
 * @param projectId
 * @param metricsHandlerClass
 */
function getFakeBigtable(
  projectId: string,
  metricsHandlerClass: typeof GCPMetricsHandler | typeof TestMetricsHandler,
  hrtime: FakeHRTime,
) {
  const metricHandler = new metricsHandlerClass(
    {} as unknown as ClientOptions & {value: string},
  );
  const FakeOperationsMetricsCollector = proxyquire(
    '../src/client-side-metrics/operation-metrics-collector.js',
    {
      'node:process': {
        hrtime,
      },
    },
  ).OperationMetricsCollector;
  const FakeClientSideMetricsConfigManager = proxyquire(
    '../src/client-side-metrics/metrics-config-manager.js',
    {
      './operation-metrics-collector.js': {
        OperationMetricsCollector: FakeOperationsMetricsCollector,
      },
    },
  ).ClientSideMetricsConfigManager;
  const newClient = new Bigtable({projectId});
  newClient._metricsConfigManager = new FakeClientSideMetricsConfigManager([
    metricHandler,
  ]);
  return newClient;
}

function getHandlerFromExporter(Exporter: typeof CloudMonitoringExporter) {
  return proxyquire('../src/client-side-metrics/gcp-metrics-handler.js', {
    './exporter': {
      CloudMonitoringExporter: Exporter,
    },
  }).GCPMetricsHandler;
}

describe('Bigtable/ClientSideMetrics', () => {
  const instanceId1 = 'emulator-test-instance';
  const instanceId2 = 'emulator-test-instance2';
  const tableId1 = 'my-table';
  const tableId2 = 'my-table2';
  const columnFamilyId = 'cf1';
  let projectId: string;

  before(async () => {
    const bigtable = new Bigtable();
    for (const instanceId of [instanceId1, instanceId2]) {
      await setupBigtable(bigtable, columnFamilyId, instanceId, [
        tableId1,
        tableId2,
      ]);
    }
    projectId = await new Promise((resolve, reject) => {
      bigtable.getProjectId_((err: Error | null, projectId?: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(projectId as string);
        }
      });
    });
  });

  after(async () => {
    const bigtable = new Bigtable();
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

  describe('Bigtable/ClientSideMetricsToGCM', () => {
    // This test suite ensures that for each test all the export calls are
    // successful even when multiple instances and tables are created.
    async function mockBigtable(projectId: string, done: mocha.Done) {
      /*
      The exporter is called every x seconds, but we only want to test the value
      it receives once. Since done cannot be called multiple times in mocha,
      exported variable ensures we only test the value export receives one time.
      */
      let exported = false;
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data.
      */
      const timeout = setTimeout(() => {
        if (!exported) {
          done(
            new Error(
              'The exporters have not completed yet and the timeout is over',
            ),
          );
        }
      }, 120000);

      class TestExporter extends CloudMonitoringExporter {
        constructor(options: ClientOptions) {
          super(options);
        }

        async export(
          metrics: ResourceMetrics,
          resultCallback: (result: ExportResult) => void,
        ): Promise<void> {
          try {
            await super.export(metrics, (result: ExportResult) => {
              if (!exported) {
                exported = true;
                try {
                  clearTimeout(timeout);
                  // The test passes when the code is 0 because that means the
                  // result from calling export was successful.
                  assert.strictEqual(result.code, 0);
                  resultCallback({code: 0});
                  done();
                } catch (error) {
                  // The code here isn't 0 so we report the original error to the mocha test runner.
                  done(result);
                  done(error);
                }
              } else {
                resultCallback({code: 0});
              }
            });
          } catch (error) {
            done(error);
          }
        }
      }

      return getFakeBigtable(
        projectId,
        getHandlerFromExporter(TestExporter),
        new FakeHRTime(),
      );
    }

    it('should send the metrics to Google Cloud Monitoring for a ReadRows call', done => {
      (async () => {
        try {
          const bigtable = await mockBigtable(projectId, done);
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
        } catch (e) {
          done(new Error('An error occurred while running the script'));
          done(e);
        }
      })().catch(err => {
        throw err;
      });
    });
    it('should send the metrics to Google Cloud Monitoring for a ReadRows call with a second project', done => {
      (async () => {
        try {
          // This is the second project the test is configured to work with:
          const projectId = SECOND_PROJECT_ID;
          const bigtable = await mockBigtable(projectId, done);
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
        } catch (e) {
          done(new Error('An error occurred while running the script'));
          done(e);
        }
      })().catch(err => {
        throw err;
      });
    });
  });
  describe('Bigtable/ClientSideMetricsToGCMTimeout', () => {
    // This test suite simulates a situation where the user creates multiple
    // clients and ensures that the exporter doesn't produce any errors even
    // when multiple clients are attempting an export.
    async function mockBigtable(
      projectId: string,
      done: mocha.Done,
      onExportSuccess?: () => void,
    ) {
      class TestExporter extends CloudMonitoringExporter {
        constructor(options: ClientOptions) {
          super(options);
        }

        async export(
          metrics: ResourceMetrics,
          resultCallback: (result: ExportResult) => void,
        ): Promise<void> {
          try {
            await super.export(metrics, (result: ExportResult) => {
              try {
                // The code is expected to be 0 because the
                // result from calling export was successful.
                assert.strictEqual(result.code, 0);
                resultCallback({code: 0});
                if (onExportSuccess) {
                  onExportSuccess();
                }
              } catch (error) {
                // The code here isn't 0 so we report the original error to the
                // mocha test runner.
                // The test fails here because it means that an export was
                // unsuccessful.
                done(result);
                done(error);
                resultCallback({code: 0});
              }
            });
          } catch (error) {
            done(error);
            resultCallback({code: 0});
          }
        }
      }

      /*
      Below we mock out the table so that it sends the metrics to a test exporter
      that will still send the metrics to Google Cloud Monitoring, but then also
      ensure the export was successful and pass the test with code 0 if it is
      successful.
       */
      return getFakeBigtable(
        projectId,
        getHandlerFromExporter(TestExporter),
        new FakeHRTime(),
      );
    }

    it('should send the metrics to Google Cloud Monitoring for a ReadRows call', done => {
      let testFinished = false;
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data. When the timeout is finished, if there were no export
      errors then the test passes.
      */
      setTimeout(() => {
        testFinished = true;
        done();
      }, 120000);
      (async () => {
        try {
          const bigtable1 = await mockBigtable(projectId, done);
          const bigtable2 = await mockBigtable(projectId, done);
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
          done(new Error('An error occurred while running the script'));
          done(e);
        }
      })().catch(err => {
        throw err;
      });
    });
    it('should send the metrics to Google Cloud Monitoring for a ReadRows call with thirty clients', done => {
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data. When the timeout is finished, if there were no export
      errors then the test passes.
      */
      const testTimeout = setTimeout(() => {
        done(new Error('The test timed out'));
      }, 480000);
      let testComplete = false;
      const numClients = 30;
      (async () => {
        try {
          const bigtableList = [];
          const completedSet = new Set();
          for (
            let bigtableCount = 0;
            bigtableCount < numClients;
            bigtableCount++
          ) {
            const currentCount = bigtableCount;
            const onExportSuccess = () => {
              completedSet.add(currentCount);
              if (completedSet.size === numClients) {
                // If every client has completed the export then pass the test.
                clearTimeout(testTimeout);
                if (!testComplete) {
                  testComplete = true;
                  done();
                }
              }
            };
            bigtableList.push(
              await mockBigtable(projectId, done, onExportSuccess),
            );
          }
          for (const bigtable of bigtableList) {
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
          done(new Error('An error occurred while running the script'));
        }
      })().catch(err => {
        throw err;
      });
    });
  });
  describe('Bigtable/ClientSideMetricsToMetricsHandler', () => {
    /**
     * This method is called to do a bunch of basic assertion checks that are
     * expected to pass when a client makes two getRows calls.
     *
     * @param requestsHandled
     */
    function standardAssertionChecks(
      requestsHandled: (OnOperationCompleteData | OnAttemptCompleteData)[],
    ) {
      const firstRequest = requestsHandled[0] as any;
      // We would expect these parameters to be different every time so delete
      // them from the comparison after checking they exist.
      assert(firstRequest.attemptLatency);
      assert(firstRequest.serverLatency);
      delete firstRequest.attemptLatency;
      delete firstRequest.serverLatency;
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
      const secondRequest = requestsHandled[1] as any;
      // We would expect these parameters to be different every time so delete
      // them from the comparison after checking they exist.
      assert(secondRequest.operationLatency);
      assert(secondRequest.firstResponseLatency);
      assert(secondRequest.applicationLatencies);
      delete secondRequest.operationLatency;
      delete secondRequest.firstResponseLatency;
      delete secondRequest.applicationLatencies;
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
      const thirdRequest = requestsHandled[2] as any;
      assert(thirdRequest.attemptLatency);
      assert(thirdRequest.serverLatency);
      delete thirdRequest.attemptLatency;
      delete thirdRequest.serverLatency;
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
      const fourthRequest = requestsHandled[3] as any;
      // We would expect these parameters to be different every time so delete
      // them from the comparison after checking they exist.
      assert(fourthRequest.operationLatency);
      assert(fourthRequest.firstResponseLatency);
      assert(fourthRequest.applicationLatencies);
      delete fourthRequest.operationLatency;
      delete fourthRequest.firstResponseLatency;
      delete fourthRequest.applicationLatencies;
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
    }
    function applicationLatenciesChecks(
      requestsHandled: (OnOperationCompleteData | OnAttemptCompleteData)[],
    ) {
      const compareValue = [
        {
          projectId: 'cfdb-sdk-node-tests',
          serverLatency: undefined,
          attemptLatency: 20000,
          connectivityErrorCount: 0,
          streaming: 'true',
          status: '0',
          client_name: 'nodejs-bigtable',
          metricsCollectorData: {
            instanceId: 'emulator-test-instance',
            table: 'my-table',
            cluster: 'unspecified',
            zone: 'global',
            method: 'Bigtable.ReadRows',
          },
        },
        {
          projectId: 'cfdb-sdk-node-tests',
          status: '0',
          streaming: 'true',
          metricsCollectorData: {
            instanceId: 'emulator-test-instance',
            table: 'my-table',
            cluster: 'unspecified',
            zone: 'global',
            method: 'Bigtable.ReadRows',
          },
          client_name: 'nodejs-bigtable',
          operationLatency: 22000,
          retryCount: 0,
          firstResponseLatency: 2000,
          applicationLatencies: [6000, 6000],
        },
        {
          projectId: 'cfdb-sdk-node-tests',
          attemptLatency: 5000,
          serverLatency: undefined,
          connectivityErrorCount: 0,
          streaming: 'true',
          status: '0',
          client_name: 'nodejs-bigtable',
          metricsCollectorData: {
            instanceId: 'emulator-test-instance',
            table: 'my-table2',
            cluster: 'unspecified',
            zone: 'global',
            method: 'Bigtable.ReadRows',
          },
        },
        {
          projectId: 'cfdb-sdk-node-tests',
          status: '0',
          streaming: 'true',
          metricsCollectorData: {
            instanceId: 'emulator-test-instance',
            table: 'my-table2',
            cluster: 'unspecified',
            zone: 'global',
            method: 'Bigtable.ReadRows',
          },
          client_name: 'nodejs-bigtable',
          operationLatency: 7000,
          retryCount: 0,
          firstResponseLatency: 2000,
          applicationLatencies: [1000, 1000],
        },
      ];
      assert.deepStrictEqual(requestsHandled, compareValue);
    }

    async function mockBigtable(
      projectId: string,
      done: mocha.Done,
      checkFn: (
        requestsHandled: (OnOperationCompleteData | OnAttemptCompleteData)[],
      ) => void,
      hrtime: FakeHRTime,
    ) {
      let handlerRequestCount = 0;
      class TestGCPMetricsHandler extends TestMetricsHandler {
        projectId = projectId;
        onOperationComplete(data: OnOperationCompleteData) {
          handlerRequestCount++;
          try {
            super.onOperationComplete(data);
            if (handlerRequestCount > 1) {
              assert.strictEqual(this.requestsHandled.length, 4);
              checkFn(this.requestsHandled);
              done();
            }
          } catch (e) {
            done(e);
          }
        }
      }

      const bigtable = getFakeBigtable(
        projectId,
        TestGCPMetricsHandler,
        hrtime,
      );
      await setupBigtable(bigtable, columnFamilyId, instanceId1, [
        tableId1,
        tableId2,
      ]);
      return bigtable;
    }

    it('should send the metrics to the metrics handler for a ReadRows call', done => {
      (async () => {
        const bigtable = await mockBigtable(
          projectId,
          done,
          standardAssertionChecks,
          new FakeHRTime(),
        );
        const instance = bigtable.instance(instanceId1);
        const table = instance.table(tableId1);
        await table.getRows();
        const table2 = instance.table(tableId2);
        await table2.getRows();
      })().catch(err => {
        throw err;
      });
    });
    it('should pass the projectId to the metrics handler properly', done => {
      (async () => {
        try {
          const projectId = SECOND_PROJECT_ID;
          const bigtable = await mockBigtable(
            projectId,
            done,
            standardAssertionChecks,
            new FakeHRTime(),
          );
          const instance = bigtable.instance(instanceId1);
          const table = instance.table(tableId1);
          await table.getRows();
          const table2 = instance.table(tableId2);
          await table2.getRows();
        } catch (e) {
          done(e);
        }
      })().catch(err => {
        throw err;
      });
    });
    it.only('should record the right metrics when iterating through readrows stream', done => {
      (async () => {
        try {
          const hrtime = new FakeHRTime();
          const projectId = SECOND_PROJECT_ID;
          const bigtable = await mockBigtable(
            projectId,
            done,
            applicationLatenciesChecks,
            hrtime,
          );
          const instance = bigtable.instance(instanceId1);
          const table = instance.table(tableId1);
          // Mock stream behaviour:
          // @ts-ignore
          table.bigtable.request = () => {
            const chunks = generateChunksFromRequest(
              {},
              {
                chunkSize: 1,
                valueSize: 1,
                errorAfterChunkNo: 2,
                keyFrom: 0,
                keyTo: 3,
                chunksPerResponse: 1,
                debugLog: () => {},
              },
            );
            const data = {
              lastRowKey: chunks[2].rowKey,
              chunks,
            };
            const stream = new PassThrough({
              objectMode: true,
            });

            setImmediate(() => {
              stream.emit('data', data);
              stream.emit('end');
            });

            return stream;
          };
          const stream = table.createReadStream();
          for await (const row of stream) {
            // Simulate an application that takes 5 seconds between row reads.
            hrtime.bigint();
            hrtime.bigint();
            hrtime.bigint();
            hrtime.bigint();
            hrtime.bigint();
          }
          // TODO: try handling a stream error here
          const table2 = instance.table(tableId2);
          await table2.getRows();
        } catch (e) {
          done(e);
        }
      })().catch(err => {
        throw err;
      });
    });
  });
});
