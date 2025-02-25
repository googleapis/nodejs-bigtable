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

describe('Bigtable/GCPMetricsHandler', () => {
  it('Should export a value to the CloudMonitoringExporter', done => {
    (async () => {
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data.
       */
      const timeout = setTimeout(() => {}, 30000);
      /*
      The exporter is called every x seconds, but we only want to test the value
      it receives once. Since done cannot be called multiple times in mocha,
      exporter ensures we only test the value export receives one time.
      */
      let exported = false;
      function getTestResultCallback(
        resultCallback: (result: ExportResult) => void
      ) {
        return (result: ExportResult) => {
          if (!exported) {
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
          } else {
            resultCallback({code: 0});
          }
        };
      }
      class MockExporter extends CloudMonitoringExporter {
        export(
          metrics: ResourceMetrics,
          resultCallback: (result: ExportResult) => void
        ): void {
          const testResultCallback = getTestResultCallback(resultCallback);
          super.export(metrics, testResultCallback);
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
      const handler = new GCPMetricsHandler(new MockExporter({projectId}));
      const transformedRequestsHandled = JSON.parse(
        JSON.stringify(expectedRequestsHandled).replace(
          /my-project/g,
          projectId
        )
      );
      for (const request of transformedRequestsHandled) {
        if (request.attemptLatency) {
          handler.onAttemptComplete(request as OnAttemptCompleteData);
        } else {
          handler.onOperationComplete(request as OnOperationCompleteData);
        }
      }
    })();
  });
});
