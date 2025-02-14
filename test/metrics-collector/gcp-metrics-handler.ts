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
import {expectedOtelExportInput} from '../../test-common/expected-otel-export-input';
import * as assert from 'assert';
import {exportInput} from '../../test-common/export-input-fixture';

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
// replaceTimestamps(expectedOtelExportInput, [123, 789], [456, 789]);

// You can now use updatedInput with metricsToRequest, and it will have the new timestamps.

describe.only('Bigtable/GCPMetricsHandler', () => {
  it('Should export a value ready for sending to the CloudMonitoringExporter', done => {
    (async () => {
      // let exportPromiseResolve: (value: unknown) => void;
      /*
      const exportPromise = new Promise(resolve => {
        setTimeout(() => {
          resolve(undefined);
        }, 30000);
      });
       */

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
            console.log('in exporter');
            // Make export async
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
            console.log('in export');
            // Perform your assertions here on the 'metrics' object
            // ... (your assertion logic)
            clearTimeout(timeout);
            resultCallback({code: 0});
            done();
            // exportPromiseResolve(undefined); // Resolve the promise after export
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

      // await exportPromise; // Wait for the export to complete

      console.log('done waiting'); // This will now be reached
    })();
  });
});
/*
describe.only('Bigtable/GCPMetricsHandler', () => {
  it('Should export a value ready for sending to the CloudMonitoringExporter', async () => {
    let testDone = false;
    let resolvePlaceholder: (arg: string) => void;
    class TestExporter extends MetricExporter {
      export(
        metrics: ResourceMetrics,
        resultCallback: (result: ExportResult) => void
      ) {
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
    await new Promise(resolve => {
      resolvePlaceholder = resolve;
    });
    console.log('done waiting');
  });
});
*/

/*
replaceTimestamps(
  metrics as unknown as typeof expectedOtelExportInput,
  [123, 789],
  [456, 789]
);
 */
