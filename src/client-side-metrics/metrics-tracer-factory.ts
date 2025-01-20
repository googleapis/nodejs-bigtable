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

import {Dimensions} from '../../common/client-side-metrics-dimensions';

const {
  MeterProvider,
  Histogram,
  Counter,
  PeriodicExportingMetricReader,
} = require('@opentelemetry/sdk-metrics');
import * as Resources from '@opentelemetry/resources';
import {MetricExporter} from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import * as ResourceUtil from '@google-cloud/opentelemetry-resource-util';
import {ObservabilityOptions} from './observability-options';
import * as fs from 'fs';

/**
 * Information about a Bigtable operation.
 */
interface OperationInfo {
  /**
   * The number of retries attempted for the operation.
   */
  retries?: number;
  /**
   * The final status of the operation (e.g., 'OK', 'ERROR').
   */
  finalOperationStatus: string;
  /**
   * Number of times a connectivity error occurred during the operation.
   */
  connectivityErrorCount?: number;
  streamingOperation: string;
}

/**
 * Information about a single attempt of a Bigtable operation.
 */
interface AttemptInfo {
  /**
   * The final status of the attempt (e.g., 'OK', 'ERROR').
   */
  finalOperationStatus: string;
  /**
   * Whether the operation is a streaming operation or not
   */
  streamingOperation: string;
}

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
 * An interface representing a Date-like object.  Provides a `getTime` method
 * for retrieving the time value in milliseconds.  Used for abstracting time
 * in tests.
 */
interface DateLike {
  /**
   * Returns the time value in milliseconds.
   * @returns The time value in milliseconds.
   */
  getTime(): number;
}

/**
 * Interface for a provider that returns DateLike objects. Used for mocking dates in tests.
 */
interface DateProvider {
  /**
   * Returns a DateLike object.
   * @returns A DateLike object representing the current time or a fake time value.
   */
  getDate(): DateLike;
}

/**
 * The default DateProvider implementation.  Returns the current date and time.
 */
class DefaultDateProvider {
  /**
   * Returns a new Date object representing the current time.
   * @returns {Date} The current date and time.
   */
  getDate() {
    return new Date();
  }
}

/**
 * An interface representing a tabular API surface, such as a Bigtable table.
 */
export interface ITabularApiSurface {
  instance: {
    id: string;
  };
  id: string;
  bigtable: {
    appProfileId?: string;
    getProjectId_(
      callback: (err: Error | null, projectId?: string) => void
    ): void;
  };
}

const packageJSON = fs.readFileSync('package.json');
const version = JSON.parse(packageJSON.toString()).version;

/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
class MetricsTracer {
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

  /**
   * @param metrics The metrics instruments to record data with.
   * @param tabularApiSurface Information about the Bigtable table being accessed.
   * @param methodName The name of the method being traced.
   * @param dateProvider A provider for date/time information (for testing).
   */
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

  /**
   * Assembles the basic dimensions for metrics. These dimensions provide
   * context about the Bigtable environment and the operation being performed.
   * @param {string} projectId The Google Cloud project ID.
   * @returns {object} An object containing the basic dimensions.
   */
  private getBasicDimensions(projectId: string) {
    return {
      projectId,
      instanceId: this.tabularApiSurface.instance.id,
      table: this.tabularApiSurface.id,
      cluster: this.cluster,
      zone: this.zone,
      appProfileId: this.tabularApiSurface.bigtable.appProfileId,
      methodName: this.methodName,
      clientName: `nodejs-bigtable/${version}`,
    };
  }

  /**
   * Assembles the dimensions for operation latency metrics.  These dimensions
   * provide context about the Bigtable environment, the operation being performed, and the final status of the operation.
   * Includes whether the operation was a streaming operation or not.
   * @param {string} projectId The Google Cloud project ID.
   * @param {string} finalOperationStatus The final status of the operation.
   * @param {string} streamOperation Whether the operation was a streaming operation or not.
   * @returns An object containing the dimensions for operation latency metrics.
   */
  private getOperationLatencyDimensions(
    projectId: string,
    finalOperationStatus: string,
    streamOperation?: string
  ): Dimensions {
    return Object.assign(
      {
        finalOperationStatus: finalOperationStatus,
        streamingOperation: streamOperation,
      },
      this.getBasicDimensions(projectId)
    );
  }

  private getFinalOpDimensions(
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

  private getAttemptDimensions(
    projectId: string,
    attemptStatus: string,
    streamingOperation: string
  ) {
    return Object.assign(
      {
        attemptStatus: attemptStatus,
        streamingOperation: streamingOperation,
      },
      this.getBasicDimensions(projectId)
    );
  }

  private getAttemptStatusDimensions(projectId: string, attemptStatus: string) {
    return Object.assign(
      {
        attemptStatus: attemptStatus,
      },
      this.getBasicDimensions(projectId)
    );
  }

  /**
   * Called when the operation starts. Records the start time.
   */
  onOperationStart() {
    this.operationStartTime = this.dateProvider.getDate();
  }

  /**
   * Called after the client reads a row. Records application blocking latencies.
   */
  onRead() {
    const currentTime = this.dateProvider.getDate();
    if (this.lastReadTime) {
      this.tabularApiSurface.bigtable.getProjectId_(
        (err: Error | null, projectId?: string) => {
          if (projectId && this.lastReadTime) {
            const dimensions = this.getBasicDimensions(projectId);
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

  /**
   * Called when an attempt (e.g., an RPC attempt) completes. Records attempt latencies.
   * @param info Information about the completed attempt.
   */
  onAttemptComplete(info: AttemptInfo) {
    const endTime = this.dateProvider.getDate();
    this.tabularApiSurface.bigtable.getProjectId_(
      (err: Error | null, projectId?: string) => {
        if (projectId && this.attemptStartTime) {
          const dimensions = this.getAttemptDimensions(
            projectId,
            info.finalOperationStatus,
            info.streamingOperation
          );
          const totalTime = endTime.getTime() - this.attemptStartTime.getTime();
          this.metrics.attemptLatencies.record(totalTime, dimensions);
        }
      }
    );
  }

  /**
   * Called when a new attempt starts. Records the start time of the attempt.
   */
  onAttemptStart() {
    this.attemptStartTime = this.dateProvider.getDate();
  }

  /**
   * Called when the first response is received. Records first response latencies.
   */
  onResponse(finalOperationStatus: string) {
    const endTime = this.dateProvider.getDate();
    this.tabularApiSurface.bigtable.getProjectId_(
      (err: Error | null, projectId?: string) => {
        if (projectId && this.operationStartTime) {
          const dimensions = this.getFinalOpDimensions(
            projectId,
            finalOperationStatus
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

  /**
   * Called when an operation completes (successfully or unsuccessfully).
   * Records operation latencies, retry counts, and connectivity error counts.
   * @param info Information about the completed operation.
   */
  onOperationComplete(info: OperationInfo) {
    const endTime = this.dateProvider.getDate();
    this.onAttemptComplete(info);
    this.tabularApiSurface.bigtable.getProjectId_(
      (err: Error | null, projectId?: string) => {
        if (projectId && this.operationStartTime) {
          const totalTime =
            endTime.getTime() - this.operationStartTime.getTime();
          {
            // This block records operation latency metrics.
            const operationLatencyDimensions =
              this.getOperationLatencyDimensions(
                projectId,
                info.finalOperationStatus,
                info.streamingOperation
              );
            this.metrics.operationLatencies.record(
              totalTime,
              operationLatencyDimensions
            );
          }
          if (info.retries) {
            // This block records the retry count metrics
            const retryCountDimensions = this.getFinalOpDimensions(
              projectId,
              info.finalOperationStatus
            );
            this.metrics.retryCount.add(info.retries, retryCountDimensions);
          }
          if (info.connectivityErrorCount) {
            // This block records the connectivity error count metrics
            const connectivityCountDimensions = this.getAttemptStatusDimensions(
              projectId,
              info.finalOperationStatus
            );
            this.metrics.connectivityErrorCount.record(
              info.connectivityErrorCount,
              connectivityCountDimensions
            );
          }
        }
      }
    );
  }

  /**
   * Called when metadata is received. Extracts server timing information if available.
   * @param info Information about the completed attempt.
   * @param metadata The received metadata.
   */
  onMetadataReceived(
    info: AttemptInfo,
    metadata: {
      internalRepr: Map<string, Buffer>;
      options: {};
    }
  ) {
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
                info.finalOperationStatus,
                info.streamingOperation
              );
              this.metrics.serverLatencies.record(serverTime, dimensions);
            }
          }
        );
      }
    }
  }

  /**
   * Called when status information is received. Extracts zone and cluster information.
   * @param status The received status information.
   */
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

/**
 * A factory class for creating MetricsTracer instances. Initializes
 * OpenTelemetry metrics instruments.
 */
export class MetricsTracerFactory {
  private metrics: Metrics;

  /**
   * @param observabilityOptions Options for configuring client-side metrics observability.
   */
  constructor(observabilityOptions?: ObservabilityOptions) {
    // Use MeterProvider provided by user
    // If MeterProvider was not provided then use the default meter provider.
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
              'service.name': 'bigtable-metrics',
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

  /**
   * Creates a new MetricsTracer instance.
   * @param tabularApiSurface The Bigtable table being accessed.
   * @param methodName The name of the method being traced.
   * @param dateProvider An optional DateProvider for testing purposes.
   * @returns A new MetricsTracer instance.
   */
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
