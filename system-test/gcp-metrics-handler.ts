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

import {describe} from 'mocha';
import {GCPMetricsHandler} from '../src/client-side-metrics/gcp-metrics-handler';
import {expectedRequestsHandled} from '../test-common/metrics-handler-fixture';
import {
  OnAttemptCompleteData,
  OnOperationCompleteData,
} from '../src/client-side-metrics/metrics-handler';
import {
  CloudMonitoringExporter,
  ExportResult,
} from '../src/client-side-metrics/exporter';
import {Bigtable} from '../src';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import * as assert from 'assert';
import {expectedOtelHundredExportInputs} from '../test-common/expected-otel-export-input';
import {replaceTimestamps} from '../test-common/replace-timestamps';

describe('Bigtable/GCPMetricsHandler', () => {
  it('Should export a value to the GCPMetricsHandler', done => {
    (async () => {
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data.
       */
      const timeout = setTimeout(() => {
        done(new Error('The export never happened'));
      }, 120000);
      /*
      The exporter is called every x seconds, but we only want to test the value
      it receives once. Since done cannot be called multiple times in mocha,
      exported variable ensures we only test the value export receives one time.
      */
      let exported = false;
      function getTestResultCallback(
        resultCallback: (result: ExportResult) => void,
      ) {
        return (result: ExportResult) => {
          exported = true;
          try {
            clearTimeout(timeout);
            assert.strictEqual(result.code, 0);
            done();
            resultCallback({code: 0});
          } catch (error) {
            // Code isn't 0 so report the original error.
            done(result);
            done(error);
          }
        };
      }
      class MockExporter extends CloudMonitoringExporter {
        export(
          metrics: ResourceMetrics,
          resultCallback: (result: ExportResult) => void,
        ): void {
          const testResultCallback = getTestResultCallback(resultCallback);
          if (!exported) {
            super.export(metrics, testResultCallback);
          } else {
            resultCallback({code: 0});
          }
        }
      }

      const bigtable = new Bigtable();
      const projectId: string = await new Promise((resolve, reject) => {
        bigtable.getProjectId_((err, projectId) => {
          if (err) {
            reject(err);
          } else {
            resolve(projectId as string);
          }
        });
      });
      // projectToInstruments argument is set to {} because we want a fresh
      // instrument stack each time this test is run.
      GCPMetricsHandler.instrumentsForProject = {};
      const handler = new GCPMetricsHandler(new MockExporter({projectId}));
      const transformedRequestsHandled = JSON.parse(
        JSON.stringify(expectedRequestsHandled).replace(
          /my-project/g,
          projectId,
        ),
      );
      for (const request of transformedRequestsHandled) {
        if (request.attemptLatency) {
          handler.onAttemptComplete(request as OnAttemptCompleteData);
        } else {
          handler.onOperationComplete(request as OnOperationCompleteData);
        }
      }
    })().catch(err => {
      throw err;
    });
  });
  it('Should export a value to two GCPMetricsHandlers', done => {
    // This test ensures that when we create two GCPMetricsHandlers much like
    // what we would be doing when calling readRows on two separate tables that
    // the data doesn't store duplicates in the same place and export twice as
    // much data as it should.
    (async () => {
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data.
       */
      const timeout = setTimeout(() => {
        done(new Error('The export never happened'));
      }, 120000);
      /*
      The exporter is called every x seconds, but we only want to test the value
      it receives once. Since done cannot be called multiple times in mocha,
      exported variable ensures we only test the value export receives one time.
      */
      let exportedCount = 0;
      function getTestResultCallback(
        resultCallback: (result: ExportResult) => void,
      ) {
        return (result: ExportResult) => {
          exportedCount++;
          try {
            assert.strictEqual(result.code, 0);
          } catch (error) {
            // Code isn't 0 so report the original error.
            done(result);
            done(error);
          }
          if (exportedCount === 1) {
            // We are expecting two calls to an exporter. One for each
            // metrics handler.
            clearTimeout(timeout);
            done();
          }
          // The resultCallback needs to be called to end the exporter operation
          // so that the test shuts down in mocha.
          resultCallback({code: 0});
        };
      }
      class MockExporter extends CloudMonitoringExporter {
        export(
          metrics: ResourceMetrics,
          resultCallback: (result: ExportResult) => void,
        ): void {
          if (exportedCount < 1) {
            // The code below uses the test callback to ensure the export was successful.
            const testResultCallback = getTestResultCallback(resultCallback);
            super.export(metrics, testResultCallback);
          } else {
            // After the test is complete the periodic exporter may still be
            // running in which case we don't want to do any checks. We just
            // want to call the resultCallback so that there are no hanging
            // threads.
            resultCallback({code: 0});
          }
        }
      }

      const bigtable = new Bigtable();
      const projectId: string = await new Promise((resolve, reject) => {
        bigtable.getProjectId_((err, projectId) => {
          if (err) {
            reject(err);
          } else {
            resolve(projectId as string);
          }
        });
      });
      // projectToInstruments argument is set to {} because we want a fresh
      // instrument stack each time this test is run.
      GCPMetricsHandler.instrumentsForProject = {};
      const handler = new GCPMetricsHandler(new MockExporter({projectId}));
      const handler2 = new GCPMetricsHandler(new MockExporter({projectId}));
      const transformedRequestsHandled = JSON.parse(
        JSON.stringify(expectedRequestsHandled).replace(
          /my-project/g,
          projectId,
        ),
      );
      for (const request of transformedRequestsHandled) {
        if (request.attemptLatency) {
          handler.onAttemptComplete(request as OnAttemptCompleteData);
        } else {
          handler.onOperationComplete(request as OnOperationCompleteData);
        }
      }
      for (const request of transformedRequestsHandled) {
        if (request.attemptLatency) {
          handler2.onAttemptComplete(request as OnAttemptCompleteData);
        } else {
          handler2.onOperationComplete(request as OnOperationCompleteData);
        }
      }
    })().catch(err => {
      throw err;
    });
  });
  it('Should export a value to a hundred GCPMetricsHandlers', done => {
    // This test ensures that when we create multiple GCPMetricsHandlers much like
    // what we would be doing when calling readRows on separate tables that
    // the data doesn't store duplicates in the same place and export twice as
    // much data as it should.
    (async () => {
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data.
       */
      const timeout = setTimeout(() => {
        done(new Error('The export never happened'));
      }, 120000);
      /*
      The exporter is called every x seconds, but we only want to test the value
      it receives once. Since done cannot be called multiple times in mocha,
      exported variable ensures we only test the value export receives one time.
      */
      let exportedCount = 0;
      function getTestResultCallback(
        resultCallback: (result: ExportResult) => void,
      ) {
        return (result: ExportResult) => {
          exportedCount++;
          try {
            assert.strictEqual(result.code, 0);
          } catch (error) {
            // Code isn't 0 so report the original error.
            done(result);
            done(error);
          }
          if (exportedCount === 1) {
            // We are expecting one call to an exporter.
            clearTimeout(timeout);
            done();
          }
          // The resultCallback needs to be called to end the exporter operation
          // so that the test shuts down in mocha.
          resultCallback({code: 0});
        };
      }
      class MockExporter extends CloudMonitoringExporter {
        export(
          metrics: ResourceMetrics,
          resultCallback: (result: ExportResult) => void,
        ): void {
          if (exportedCount < 1) {
            try {
              // This code block ensures the metrics are correct. Mainly, the metrics
              // shouldn't contain two copies of the data. It should only contain
              // one.
              //
              // For this test since we are still writing a time series with
              // metrics variable we don't want to modify the metrics variable
              // to have artificial times because then sending the data to the
              // metric service client will fail. Therefore, we must make a copy
              // of the metrics and use that.
              const parsedExportInput: ResourceMetrics = JSON.parse(
                JSON.stringify(metrics),
              );
              replaceTimestamps(
                parsedExportInput as unknown as typeof expectedOtelHundredExportInputs,
                [123, 789],
                [456, 789],
              );
              assert.deepStrictEqual(
                parsedExportInput.scopeMetrics[0].metrics.length,
                expectedOtelHundredExportInputs.scopeMetrics[0].metrics.length,
              );
              for (
                let index = 0;
                index < parsedExportInput.scopeMetrics[0].metrics.length;
                index++
              ) {
                // We need to compare pointwise because mocha truncates to an 8192 character limit.
                assert.deepStrictEqual(
                  parsedExportInput.scopeMetrics[0].metrics[index],
                  expectedOtelHundredExportInputs.scopeMetrics[0].metrics[
                    index
                  ],
                );
              }
            } catch (e) {
              // The error needs to be caught so it can be reported to the mocha
              // test runner.
              done(e);
            }
            // The code below uses the test callback to ensure the export was successful.
            const testResultCallback = getTestResultCallback(resultCallback);
            super.export(metrics, testResultCallback);
          } else {
            // After the test is complete the periodic exporter may still be
            // running in which case we don't want to do any checks. We just
            // want to call the resultCallback so that there are no hanging
            // threads.
            resultCallback({code: 0});
          }
        }
      }

      const bigtable = new Bigtable();
      const projectId: string = await new Promise((resolve, reject) => {
        bigtable.getProjectId_((err, projectId) => {
          if (err) {
            reject(err);
          } else {
            resolve(projectId as string);
          }
        });
      });
      const transformedRequestsHandled = JSON.parse(
        JSON.stringify(expectedRequestsHandled).replace(
          /my-project/g,
          projectId,
        ),
      );
      const handlers = [];
      // projectToInstruments argument is set to {} because we want a fresh
      // instrument stack each time this test is run.
      GCPMetricsHandler.instrumentsForProject = {};
      for (let i = 0; i < 100; i++) {
        handlers.push(new GCPMetricsHandler(new MockExporter({projectId})));
        for (const request of transformedRequestsHandled) {
          if (request.attemptLatency) {
            handlers[i].onAttemptComplete(request as OnAttemptCompleteData);
          } else {
            handlers[i].onOperationComplete(request as OnOperationCompleteData);
          }
        }
      }
    })().catch(err => {
      throw err;
    });
  });
  it('Should write two duplicate points inserted into the metrics handler', done => {
    (async () => {
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data.
       */
      const timeout = setTimeout(() => {
        done(new Error('The export never happened'));
      }, 120000);
      /*
      The exporter is called every x seconds, but we only want to test the value
      it receives once. Since done cannot be called multiple times in mocha,
      exported variable ensures we only test the value export receives one time.
      */
      let exported = false;
      function getTestResultCallback(
        resultCallback: (result: ExportResult) => void,
      ) {
        return (result: ExportResult) => {
          exported = true;
          try {
            clearTimeout(timeout);
            assert.strictEqual(result.code, 0);
            done();
            resultCallback({code: 0});
          } catch (error) {
            // Code isn't 0 so report the original error.
            done(result);
            done(error);
          }
        };
      }
      class MockExporter extends CloudMonitoringExporter {
        export(
          metrics: ResourceMetrics,
          resultCallback: (result: ExportResult) => void,
        ): void {
          const testResultCallback = getTestResultCallback(resultCallback);
          if (!exported) {
            super.export(metrics, testResultCallback);
          } else {
            resultCallback({code: 0});
          }
        }
      }

      const bigtable = new Bigtable();
      const projectId: string = await new Promise((resolve, reject) => {
        bigtable.getProjectId_((err, projectId) => {
          if (err) {
            reject(err);
          } else {
            resolve(projectId as string);
          }
        });
      });
      // projectToInstruments argument is set to {} because we want a fresh
      // instrument stack each time this test is run.
      GCPMetricsHandler.instrumentsForProject = {};
      const handler = new GCPMetricsHandler(new MockExporter({projectId}));
      const transformedRequestsHandled = JSON.parse(
        JSON.stringify(expectedRequestsHandled).replace(
          /my-project/g,
          projectId,
        ),
      );
      for (let i = 0; i < 2; i++) {
        for (const request of transformedRequestsHandled) {
          if (request.attemptLatency) {
            handler.onAttemptComplete(request as OnAttemptCompleteData);
          } else {
            handler.onOperationComplete(request as OnOperationCompleteData);
          }
        }
      }
    })().catch(err => {
      throw err;
    });
  });
});
