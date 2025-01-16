// import * as SDKMetrics from '@opentelemetry/sdk-metrics';
import {Table} from './table';

// TODO: Mock out Date - ie. DateWrapper

const {
  MeterProvider,
  Histogram,
  Counter,
  PeriodicExportingMetricReader,
} = require('@opentelemetry/sdk-metrics');
// import { MeterProvider, PeriodicExportingMetricReader, Histogram} from '@opentelemetry/sdk-metrics';
import * as Resources from '@opentelemetry/resources';
import {MetricExporter} from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import * as ResourceUtil from '@google-cloud/opentelemetry-resource-util';
import {TabularApiSurface} from './tabular-api-surface';

interface OperationInfo {
  retries?: number;
  finalOperationStatus: string;
  connectivityErrorCount?: number;
}

interface Dimensions {
  projectId: string;
  instanceId: string;
  table: string;
  cluster?: string | null;
  zone?: string | null;
  appProfileId?: string;
  methodName: string;
  finalOperationStatus: string;
  clientName: string;
}

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

interface DateLike {
  getTime(): number;
}

interface DateProvider {
  getDate(): DateLike;
}

class DefaultDateProvider {
  getDate() {
    return new Date();
  }
}

interface ICounter {
  add(retries: number, dimensions: {}): void;
}

interface IHistogram {
  record(value: number, dimensions: {}): void;
}

interface IMeter {
  createCounter(instrument: string, attributes: {}): ICounter;
  createHistogram(instrument: string, attributes: {}): IHistogram;
}

interface IMeterProvider {
  getMeter(name: string): IMeter;
}

export interface ObservabilityOptions {
  meterProvider: IMeterProvider;
}

interface IBigtable {
  appProfileId?: string;
  getProjectId_(
    callback: (err: Error | null, projectId?: string) => void
  ): void;
}

interface IInstance {
  id: string;
}

interface ITabularApiSurface {
  instance: IInstance;
  id: string;
  bigtable: IBigtable;
}

class MetricsTracer {
  // TODO: Consider rename.
  private operationStartTime: DateLike | null;
  private attemptStartTime: DateLike | null;
  private metrics: Metrics;
  private zone: string | null | undefined;
  private cluster: string | null | undefined;
  private tabularApiSurface: ITabularApiSurface;
  private methodName: string;
  private receivedFirstResponse: boolean;
  private serverTimeRead: boolean;
  private lastReadTime: DateLike | null;
  private dateProvider: DateProvider;

  constructor(
    metrics: Metrics,
    tabularApiSurface: ITabularApiSurface,
    methodName: string,
    dateProvider?: DateProvider
  ) {
    this.metrics = metrics;
    this.zone = null;
    this.cluster = null;
    this.tabularApiSurface = tabularApiSurface;
    this.methodName = methodName;
    this.operationStartTime = null;
    this.attemptStartTime = null;
    this.receivedFirstResponse = false;
    this.lastReadTime = null;
    this.serverTimeRead = false;
    if (dateProvider) {
      this.dateProvider = dateProvider;
    } else {
      this.dateProvider = new DefaultDateProvider();
    }
  }

  private getBasicDimensions(projectId: string) {
    return {
      projectId,
      instanceId: this.tabularApiSurface.instance.id,
      table: this.tabularApiSurface.id,
      cluster: this.cluster,
      zone: this.zone,
      appProfileId: this.tabularApiSurface.bigtable.appProfileId,
      methodName: this.methodName,
      clientName: 'nodejs-bigtable',
    };
  }

  private getFinalOperationDimensions(
    projectId: string,
    finalOperationStatus: string
  ): Dimensions {
    return Object.assign(
      {
        finalOperationStatus: finalOperationStatus,
      },
      this.getBasicDimensions(projectId)
    );
  }

  private getAttemptDimensions(projectId: string, attemptStatus: string) {
    return Object.assign(
      {
        attemptStatus: attemptStatus,
      },
      this.getBasicDimensions(projectId)
    );
  }

  onOperationStart() {
    this.operationStartTime = this.dateProvider.getDate();
  }

  onRead() {
    const currentTime = this.dateProvider.getDate();
    if (this.lastReadTime) {
      this.tabularApiSurface.bigtable.getProjectId_(
        (err: Error | null, projectId?: string) => {
          if (projectId && this.lastReadTime) {
            const dimensions = this.getAttemptDimensions(projectId, 'PENDING');
            const difference =
              currentTime.getTime() - this.lastReadTime.getTime();
            this.metrics.applicationBlockingLatencies.record(
              difference,
              dimensions
            );
            this.lastReadTime = currentTime;
          }
        }
      );
    } else {
      this.lastReadTime = currentTime;
    }
  }

  onAttemptComplete(info: OperationInfo) {
    const endTime = this.dateProvider.getDate();
    this.tabularApiSurface.bigtable.getProjectId_(
      (err: Error | null, projectId?: string) => {
        if (projectId && this.attemptStartTime) {
          const dimensions = this.getAttemptDimensions(
            projectId,
            info.finalOperationStatus
          );
          const totalTime = endTime.getTime() - this.attemptStartTime.getTime();
          this.metrics.attemptLatencies.record(totalTime, dimensions);
        }
      }
    );
  }

  onAttemptStart() {
    this.attemptStartTime = this.dateProvider.getDate();
  }

  onResponse() {
    const endTime = this.dateProvider.getDate();
    this.tabularApiSurface.bigtable.getProjectId_(
      (err: Error | null, projectId?: string) => {
        if (projectId && this.operationStartTime) {
          const dimensions = this.getFinalOperationDimensions(
            projectId,
            'PENDING'
          );
          const totalTime =
            endTime.getTime() - this.operationStartTime.getTime();
          if (!this.receivedFirstResponse) {
            this.receivedFirstResponse = true;
            this.metrics.firstResponseLatencies.record(totalTime, dimensions);
          }
        }
      }
    );
  }

  onOperationComplete(info: OperationInfo) {
    const endTime = this.dateProvider.getDate();
    this.onAttemptComplete(info);
    this.tabularApiSurface.bigtable.getProjectId_(
      (err: Error | null, projectId?: string) => {
        if (projectId && this.operationStartTime) {
          const totalTime =
            endTime.getTime() - this.operationStartTime.getTime();
          const dimensions = this.getFinalOperationDimensions(
            projectId,
            info.finalOperationStatus
          );
          this.metrics.operationLatencies.record(totalTime, dimensions);
          this.metrics.retryCount.add(info.retries, dimensions);
          if (info.connectivityErrorCount) {
            this.metrics.connectivityErrorCount.record(
              info.connectivityErrorCount,
              dimensions
            );
          }
        }
      }
    );
  }

  onMetadataReceived(metadata: {
    internalRepr: Map<string, Buffer>;
    options: {};
  }) {
    const mappedEntries = new Map(
      Array.from(metadata.internalRepr.entries(), ([key, value]) => [
        key,
        value.toString(),
      ])
    );
    const durationValues = mappedEntries.get('server-timing')?.split('dur=');
    if (durationValues && durationValues[1]) {
      if (!this.serverTimeRead) {
        this.serverTimeRead = true;
        const serverTime = parseInt(durationValues[1]);
        this.tabularApiSurface.bigtable.getProjectId_(
          (err: Error | null, projectId?: string) => {
            if (projectId) {
              const dimensions = this.getAttemptDimensions(
                projectId,
                'PENDING' // TODO: Adjust this
              );
              this.metrics.serverLatencies.record(serverTime, dimensions);
            }
          }
        );
      }
    }
  }

  onStatusReceived(status: {
    metadata: {internalRepr: Map<string, Buffer>; options: {}};
  }) {
    const mappedEntries = new Map(
      Array.from(status.metadata.internalRepr.entries(), ([key, value]) => [
        key,
        value.toString(),
      ])
    );
    const instanceInformation = mappedEntries
      .get('x-goog-ext-425905942-bin')
      ?.replace(new RegExp('\\n', 'g'), '')
      .split('\r');
    if (instanceInformation && instanceInformation[0]) {
      this.zone = instanceInformation[0];
    }
    if (instanceInformation && instanceInformation[1]) {
      this.cluster = instanceInformation[0];
    }
  }
}

export class MetricsTracerFactory {
  private metrics: Metrics;

  constructor(observabilityOptions?: ObservabilityOptions) {
    // Create MeterProvider
    const meterProvider =
      observabilityOptions && observabilityOptions.meterProvider
        ? observabilityOptions.meterProvider
        : new MeterProvider({
            // This is the default meter provider
            // Create a resource. Fill the `service.*` attributes in with real values for your service.
            // GcpDetectorSync will add in resource information about the current environment if you are
            // running on GCP. These resource attributes will be translated to a specific GCP monitored
            // resource if running on GCP. Otherwise, metrics will be sent with monitored resource
            // `generic_task`.
            resource: new Resources.Resource({
              'service.name': 'example-metric-service',
              'service.namespace': 'samples',
              'service.instance.id': '12345',
              'cloud.resource_manager.project_id':
                'cloud-native-db-dpes-shared',
            }).merge(new ResourceUtil.GcpDetectorSync().detect()),
            readers: [
              // Register the exporter
              new PeriodicExportingMetricReader({
                // Export metrics every 10 seconds. 5 seconds is the smallest sample period allowed by
                // Cloud Monitoring.
                exportIntervalMillis: 10_000,
                exporter: new MetricExporter({
                  projectId: 'cloud-native-db-dpes-shared', // TODO: Replace later
                }),
              }),
            ],
          });
    const meter = meterProvider.getMeter('bigtable.googleapis.com');
    this.metrics = {
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

  getMetricsTracer(
    tabularApiSurface: ITabularApiSurface,
    methodName: string,
    dateProvider?: DateProvider
  ) {
    return new MetricsTracer(
      this.metrics,
      tabularApiSurface,
      methodName,
      dateProvider
    );
  }
}
