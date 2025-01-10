// import * as SDKMetrics from '@opentelemetry/sdk-metrics';
const { MeterProvider, Histogram, Counter, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
// import { MeterProvider, PeriodicExportingMetricReader, Histogram} from '@opentelemetry/sdk-metrics';
import * as Resources from '@opentelemetry/resources';
import { MetricExporter } from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import * as ResourceUtil from '@google-cloud/opentelemetry-resource-util';

interface OperationInfo {
  retries: number;
}

const buckets = [0.001, 0.01, 0.1, 1, 10, 100]
const count = 0;

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

class MetricsTracer { // TODO: Consider rename.
  private metrics: Metrics;

  constructor(metrics: Metrics) {
    this.metrics = metrics;
  }

  onAttemptComplete(info: OperationInfo) {
    console.log('onAttemptComplete');
  }

  onOperationComplete(info: OperationInfo) {
    console.log('onOperationComplete');
  }
}

export class MetricsTracerFactory {
  private metrics: Metrics;

  constructor() {
    // Create MeterProvider
    const meterProvider = new MeterProvider({
      // Create a resource. Fill the `service.*` attributes in with real values for your service.
      // GcpDetectorSync will add in resource information about the current environment if you are
      // running on GCP. These resource attributes will be translated to a specific GCP monitored
      // resource if running on GCP. Otherwise, metrics will be sent with monitored resource
      // `generic_task`.
      resource: new Resources.Resource({
        "service.name": "example-metric-service",
        "service.namespace": "samples",
        "service.instance.id": "12345",
        "cloud.resource_manager.project_id": "cloud-native-db-dpes-shared"
      }).merge(new ResourceUtil.GcpDetectorSync().detect()),
      readers: [ // Register the exporter
        new PeriodicExportingMetricReader({
          // Export metrics every 10 seconds. 5 seconds is the smallest sample period allowed by
          // Cloud Monitoring.
          exportIntervalMillis: 10_000,
          exporter: new MetricExporter({
            projectId: 'cloud-native-db-dpes-shared' // TODO: Replace later
          }),
        })
      ]
    });
    const meter = meterProvider.getMeter('bigtable.googleapis.com');
    this.metrics = {
      operationLatencies: meter.createHistogram('operation_latencies', {
        description: 'The total end-to-end latency across all RPC attempts associated with a Bigtable operation. This metric measures an operation\'s round trip from the client to Bigtable and back to the client and includes all retries.',
      }),
      attemptLatencies: meter.createHistogram('attempt_latencies', {
        description: "The latencies of a client RPC attempt. Under normal circumstances, this value is identical to operation_latencies. If the client receives transient errors, however, then operation_latencies is the sum of all attempt_latencies and the exponential delays.",
        unit: 'ms',
      }),
      retryCount: meter.createCounter('retry_count', {
        description: 'A counter that records the number of attempts that an operation required to complete. Under normal circumstances, this value is empty.',
      }),
      applicationBlockingLatencies: meter.createHistogram('application_blocking_latencies', {
        description: 'The time from when the client receives the response to a request until the application reads the response. This metric is most relevant for ReadRows requests. The start and stop times for this metric depend on the way that you send the read request; see Application blocking latencies timer examples for details.',
        unit: 'ms',
      }),
      firstResponseLatencies: meter.createHistogram('first_response_latencies', {
        description: 'Latencies from when a client sends a request and receives the first row of the response.',
        unit: 'ms',
      }),
      serverLatencies: meter.createHistogram('server_latencies', {
        description: 'Latencies between the time when the Google frontend receives an RPC and when it sends the first byte of the response.',
      }),
      connectivityErrorCount: meter.createHistogram('connectivity_error_count', {
        description: 'The number of requests that failed to reach Google\'s network. In normal cases, this number is 0. When the number is not 0, it can indicate connectivity issues between the application and the Google network.',
      }),
      clientBlockingLatencies: meter.createHistogram('client_blocking_latencies', {
        description: 'Latencies introduced when the client blocks the sending of more requests to the server because of too many pending requests in a bulk operation.',
        unit: 'ms',
      }),
    };
  }

  getMetricsTracer() {
    return new MetricsTracer(this.metrics);
  }
}
