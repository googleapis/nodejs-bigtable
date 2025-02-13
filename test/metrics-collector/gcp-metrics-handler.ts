import {describe} from 'mocha';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {ExportResult} from '../../src/client-side-metrics/exporter';
import {GCPMetricsHandler} from '../../src/client-side-metrics/gcp-metrics-handler';
import {MetricExporter} from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import {expectedRequestsHandled} from '../../test-common/metrics-handler-fixture';
import {
  OnAttemptCompleteAttributes,
  OnOperationCompleteAttributes,
} from '../../src/client-side-metrics/client-side-metrics-attributes';
import {OnOperationCompleteMetrics} from '../../src/client-side-metrics/metrics-handler';
import {expectedOtelExportInput} from '../../test-common/expected-otel-export-input';

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

// Example usage:
replaceTimestamps(expectedOtelExportInput, [123, 789], [456, 789]);

// You can now use updatedInput with metricsToRequest, and it will have the new timestamps.

describe.only('Bigtable/GCPMetricsHandler', () => {
  it('Should export a value ready for sending to the CloudMonitoringExporter', done => {
    let testDone = false;
    let resolvePlaceholder: (arg: string) => void;
    class TestExporter extends MetricExporter {
      export(
        metrics: ResourceMetrics,
        resultCallback: (result: ExportResult) => void
      ) {
        replaceTimestamps(
          metrics as unknown as typeof expectedOtelExportInput,
          [123, 789],
          [456, 789]
        );
        // super.export(metrics, resultCallback);
        console.log('in export');
        try {
          // Add assert statement here.
          if (!testDone) {
            testDone = true;
            resultCallback({code: 0});
            resolvePlaceholder('done');
          }
        } catch (e) {
          resolvePlaceholder('error');
        }
      }
    }
    const handler = new GCPMetricsHandler(
      new TestExporter({projectId: 'cloud-native-db-dpes-shared'})
    );
    for (let i = 0; i < expectedRequestsHandled.length; i++) {
      const request = expectedRequestsHandled[i];
      if (request.metrics.attemptLatency) {
        handler.onAttemptComplete(
          request.metrics,
          request.attributes as OnAttemptCompleteAttributes
        );
      } else {
        // TODO: Use a type guard here instead of casting.
        handler.onOperationComplete(
          request.metrics as OnOperationCompleteMetrics,
          request.attributes as OnOperationCompleteAttributes
        );
      }
    }
    // Wait for the metric to be exported
    console.log('waiting');
    // This promise is needed because the test completes prematurely otherwise
    // before the metric is exported.
    // TODO: Try removing this promise
    new Promise(resolve => {
      resolvePlaceholder = resolve;
    });
  });
});
