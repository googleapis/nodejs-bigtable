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
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {
  ExportResult,
  metricsToRequest,
} from '../../src/client-side-metrics/exporter';
import {GCPMetricsHandler} from '../../src/client-side-metrics/gcp-metrics-handler';
import {MetricExporter} from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import {expectedRequestsHandled} from '../../test-common/metrics-handler-fixture';
import {
  OnAttemptCompleteData,
  OnOperationCompleteData,
} from '../../src/client-side-metrics/metrics-handler';
import {
  expectedOtelExportConvertedValue,
  expectedOtelExportInput,
} from '../../test-common/expected-otel-export-input';
import * as assert from 'assert';
import {replaceTimestamps} from '../../test-common/replace-timestamps';

describe('Bigtable/GCPMetricsHandler', () => {
  it('Should export a value ready for sending to the CloudMonitoringExporter', function (done) {
    this.timeout(600000);
    (async () => {
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data.
       */
      const timeout = setTimeout(() => {}, 120000);
      /*
      The exporter is called every x seconds, but we only want to test the value
      it receives once. Since done cannot be called multiple times in mocha,
      exporter ensures we only test the value export receives one time.
      */
      let exported = false;

      class TestExporter extends MetricExporter {
        export(
          metrics: ResourceMetrics,
          resultCallback: (result: ExportResult) => void,
        ): void {
          if (!exported) {
            exported = true;
            try {
              replaceTimestamps(
                metrics as unknown as typeof expectedOtelExportInput,
                [123, 789],
                [456, 789],
              );
              const parsedExportInput: ResourceMetrics = JSON.parse(
                JSON.stringify(metrics),
              );
              assert.deepStrictEqual(
                parsedExportInput.scopeMetrics[0].metrics.length,
                expectedOtelExportInput.scopeMetrics[0].metrics.length,
              );
              for (
                let index = 0;
                index < parsedExportInput.scopeMetrics[0].metrics.length;
                index++
              ) {
                // We need to compare pointwise because mocha truncates to an 8192 character limit.
                assert.deepStrictEqual(
                  parsedExportInput.scopeMetrics[0].metrics[index],
                  expectedOtelExportInput.scopeMetrics[0].metrics[index],
                );
              }
              assert.deepStrictEqual(
                JSON.parse(JSON.stringify(metrics)),
                expectedOtelExportInput,
              );
              const convertedRequest = metricsToRequest(parsedExportInput);
              assert.deepStrictEqual(
                convertedRequest.timeSeries.length,
                expectedOtelExportConvertedValue.timeSeries.length,
              );
              for (
                let index = 0;
                index < convertedRequest.timeSeries.length;
                index++
              ) {
                // We need to compare pointwise because mocha truncates to an 8192 character limit.
                assert.deepStrictEqual(
                  convertedRequest.timeSeries[index],
                  expectedOtelExportConvertedValue.timeSeries[index],
                );
              }
              clearTimeout(timeout);
              resultCallback({code: 0});
              done();
            } catch (e) {
              done(e);
            }
          } else {
            // The test suite will not complete if unanswered callbacks
            // remain on subsequent export calls.
            resultCallback({code: 0});
          }
        }
      }

      const handler = new GCPMetricsHandler(
        new TestExporter({projectId: 'some-project'}),
      );

      for (const request of expectedRequestsHandled) {
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
});
