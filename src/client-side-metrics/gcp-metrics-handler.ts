import {
  IMetricsHandler,
  OnAttemptCompleteMetrics,
  OnOperationCompleteMetrics,
} from './metrics-handler';
import * as Resources from '@opentelemetry/resources';
import * as ResourceUtil from '@google-cloud/opentelemetry-resource-util';
import {MetricExporter} from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import {OnAttemptCompleteAttributes, OnOperationCompleteAttributes} from '../../common/client-side-metrics-attributes';
const {
  MeterProvider,
  Histogram,
  Counter,
  PeriodicExportingMetricReader,
} = require('@opentelemetry/sdk-metrics');

/**
 * A collection of OpenTelemetry metric instruments used to record
 * Bigtable client-side metrics.
 */
interface Metrics {
  operationLatencies: typeof Histogram;
  attemptLatencies: typeof Histogram;
  retryCount: typeof Counter;
  applicationBlockingLatencies: typeof Histogram;
  firstResponseLatencies: typeof Histogram;
  serverLatencies: typeof Histogram;
  connectivityErrorCount: typeof Histogram;
  clientBlockingLatencies: typeof Histogram;
}

/**
 * A metrics handler implementation that uses OpenTelemetry to export metrics to Google Cloud Monitoring.
 * This handler records metrics such as operation latency, attempt latency, retry count, and more,
 * associating them with relevant attributes for detailed analysis in Cloud Monitoring.
 */
export class GCPMetricsHandler implements IMetricsHandler {
  private initialized = false;
  private otelMetrics?: Metrics;

  /**
   * Initializes the OpenTelemetry metrics instruments if they haven't been already.
   * Creates and registers metric instruments (histograms and counters) for various Bigtable client metrics.
   * Sets up a MeterProvider and configures a PeriodicExportingMetricReader for exporting metrics to Cloud Monitoring.
   * @param {string} [projectId] The Google Cloud project ID. Used for metric export. If not provided, it will attempt to detect it from the environment.
   */
  private initialize(projectId?: string) {
    if (!this.initialized) {
      this.initialized = true;
      // Use MeterProvider provided by user
      // If MeterProvider was not provided then use the default meter provider.
      const meterProvider = new MeterProvider({
        // This is the default meter provider
        // Create a resource. Fill the `service.*` attributes in with real values for your service.
        // GcpDetectorSync will add in resource information about the current environment if you are
        // running on GCP. These resource attributes will be translated to a specific GCP monitored
        // resource if running on GCP. Otherwise, metrics will be sent with monitored resource
        // `generic_task`.
        resource: new Resources.Resource({
          'service.name': 'bigtable-metrics',
        }).merge(new ResourceUtil.GcpDetectorSync().detect()),
        readers: [
          // Register the exporter
          new PeriodicExportingMetricReader({
            // Export metrics every 10 seconds. 5 seconds is the smallest sample period allowed by
            // Cloud Monitoring.
            exportIntervalMillis: 100_000,
            exporter: new MetricExporter({
              projectId,
            }),
          }),
        ],
      });
      const meter = meterProvider.getMeter('bigtable.googleapis.com');
      this.otelMetrics = {
        operationLatencies: meter.createHistogram('operation_latencies', {
          description:
            "The total end-to-end latency across all RPC attempts associated with a Bigtable operation. This metric measures an operation's round trip from the client to Bigtable and back to the client and includes all retries.",
        }),
        attemptLatencies: meter.createHistogram('attempt_latencies', {
          description:
            'The latencies of a client RPC attempt. Under normal circumstances, this value is identical to operation_latencies. If the client receives transient errors, however, then operation_latencies is the sum of all attempt_latencies and the exponential delays.',
          unit: 'ms',
        }),
        retryCount: meter.createCounter('retry_count', {
          description:
            'A counter that records the number of attempts that an operation required to complete. Under normal circumstances, this value is empty.',
        }),
        applicationBlockingLatencies: meter.createHistogram(
          'application_blocking_latencies',
          {
            description:
              'The time from when the client receives the response to a request until the application reads the response. This metric is most relevant for ReadRows requests. The start and stop times for this metric depend on the way that you send the read request; see Application blocking latencies timer examples for details.',
            unit: 'ms',
          }
        ),
        firstResponseLatencies: meter.createHistogram(
          'first_response_latencies',
          {
            description:
              'Latencies from when a client sends a request and receives the first row of the response.',
            unit: 'ms',
          }
        ),
        serverLatencies: meter.createHistogram('server_latencies', {
          description:
            'Latencies between the time when the Google frontend receives an RPC and when it sends the first byte of the response.',
        }),
        connectivityErrorCount: meter.createHistogram(
          'connectivity_error_count',
          {
            description:
              "The number of requests that failed to reach Google's network. In normal cases, this number is 0. When the number is not 0, it can indicate connectivity issues between the application and the Google network.",
          }
        ),
        clientBlockingLatencies: meter.createHistogram(
          'client_blocking_latencies',
          {
            description:
              'Latencies introduced when the client blocks the sending of more requests to the server because of too many pending requests in a bulk operation.',
            unit: 'ms',
          }
        ),
      };
    }
  }

  /**
   * Records metrics for a completed Bigtable operation.
   * This method records the operation latency and retry count, associating them with provided attributes.
   * @param {OnOperationCompleteMetrics} metrics Metrics related to the completed operation.
   * @param {OnOperationCompleteAttributes} attributes Attributes associated with the completed operation.
   */
  onOperationComplete(
    metrics: OnOperationCompleteMetrics,
    attributes: OnOperationCompleteAttributes
  ) {
    this.initialize();
    this.otelMetrics?.operationLatencies.record(
      metrics.operationLatency,
      attributes
    );
    this.otelMetrics?.retryCount.add(metrics.retryCount, attributes);
  }

  /**
   * Records metrics for a completed attempt of a Bigtable operation.
   * This method records attempt latency, connectivity error count, server latency, and first response latency,
   * along with the provided attributes.
   * @param {OnAttemptCompleteMetrics} metrics Metrics related to the completed attempt.
   * @param {OnAttemptCompleteAttributes} attributes Attributes associated with the completed attempt.
   */
  onAttemptComplete(
    metrics: OnAttemptCompleteMetrics,
    attributes: OnAttemptCompleteAttributes
  ) {
    this.initialize();
    this.otelMetrics?.attemptLatencies.record(
      metrics.attemptLatency,
      attributes
    );
    this.otelMetrics?.connectivityErrorCount.record(
      metrics.connectivityErrorCount,
      attributes
    );
    this.otelMetrics?.serverLatencies.record(metrics.serverLatency, attributes);
    this.otelMetrics?.firstResponseLatencies.record(
      metrics.firstResponseLatency,
      attributes
    );
  }
}
