import {describe} from 'mocha';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {
  ExportInput,
  ExportResult,
  metricsToRequest,
} from '../../src/client-side-metrics/exporter';
import {GCPMetricsHandler} from '../../src/client-side-metrics/gcp-metrics-handler';
import {MetricExporter} from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import {expectedRequestsHandled} from '../../test-common/metrics-handler-fixture';
import {
  OnAttemptCompleteAttributes,
  OnOperationCompleteAttributes,
} from '../../src/client-side-metrics/client-side-metrics-attributes';
import {OnOperationCompleteMetrics} from '../../src/client-side-metrics/metrics-handler';
import {
  expectedOtelExportConvertedValue,
  expectedOtelExportInput,
} from '../../test-common/expected-otel-export-input';
import * as assert from 'assert';

function replaceTimestamps(
  request: typeof expectedOtelExportInput,
  newStartTime: [number, number],
  newEndTime: [number, number]
) {
  request.scopeMetrics.forEach(scopeMetric => {
    scopeMetric.metrics.forEach(metric => {
      metric.dataPoints.forEach(dataPoint => {
        dataPoint.startTime = newStartTime;
        dataPoint.endTime = newEndTime;
      });
    });
  });
}

describe.only('Bigtable/GCPMetricsHandler', () => {
  it('Should export a value ready for sending to the CloudMonitoringExporter', done => {
    (async () => {
      /*
      We need to create a timeout here because if we don't then mocha shuts down
      the test as it is sleeping before the GCPMetricsHandler has a chance to
      export the data.
       */
      const timeout = setTimeout(() => {}, 30000);

      class TestExporter extends MetricExporter {
        async export(
          metrics: ResourceMetrics,
          resultCallback: (result: ExportResult) => void
        ): Promise<void> {
          try {
            replaceTimestamps(
              metrics as unknown as typeof expectedOtelExportInput,
              [123, 789],
              [456, 789]
            );
            assert.deepStrictEqual(
              JSON.parse(JSON.stringify(metrics)),
              expectedOtelExportInput
            );
            const convertedRequest = metricsToRequest(
              expectedOtelExportInput as unknown as ExportInput
            );
            assert.deepStrictEqual(
              JSON.parse(JSON.stringify(convertedRequest)),
              expectedOtelExportConvertedValue
            );
            clearTimeout(timeout);
            resultCallback({code: 0});
            done();
          } catch (e) {
            done(e);
          }
        }
      }

      const handler = new GCPMetricsHandler(
        new TestExporter({projectId: 'cloud-native-db-dpes-shared'})
      );

      for (const request of expectedRequestsHandled) {
        if (request.metrics.attemptLatency) {
          handler.onAttemptComplete(
            request.metrics,
            request.attributes as OnAttemptCompleteAttributes
          );
        } else {
          handler.onOperationComplete(
            request.metrics as OnOperationCompleteMetrics,
            request.attributes as OnOperationCompleteAttributes
          );
        }
      }
    })();
  });
});
