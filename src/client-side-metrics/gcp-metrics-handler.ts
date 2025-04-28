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

import {
  IMetricsHandler,
  OnAttemptCompleteData,
  OnOperationCompleteData,
} from './metrics-handler';
import * as Resources from '@opentelemetry/resources';
import * as ResourceUtil from '@google-cloud/opentelemetry-resource-util';
import {PushMetricExporter, View} from '@opentelemetry/sdk-metrics';
const {
  Aggregation,
  ExplicitBucketHistogramAggregation,
  MeterProvider,
  Histogram,
  PeriodicExportingMetricReader,
} = require('@opentelemetry/sdk-metrics');

/**
 * A collection of OpenTelemetry metric instruments used to record
 * Bigtable client-side metrics.
 */
interface MetricsInstruments {
  operationLatencies: typeof Histogram;
  attemptLatencies: typeof Histogram;
  retryCount: typeof Histogram;
  applicationBlockingLatencies: typeof Histogram;
  firstResponseLatencies: typeof Histogram;
  serverLatencies: typeof Histogram;
  connectivityErrorCount: typeof Histogram;
  clientBlockingLatencies: typeof Histogram;
}

/**
 * This method gets the open telemetry instruments that will store GCP metrics
 * for a particular project.
 *
 * @param projectId The project for which the instruments will be stored.
 * @param exporter The exporter the metrics will be sent to.
 */
function createInstruments(projectId: string, exporter: PushMetricExporter) {
  const latencyBuckets = [
    0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 8.0, 10.0, 13.0, 16.0, 20.0, 25.0, 30.0,
    40.0, 50.0, 65.0, 80.0, 100.0, 130.0, 160.0, 200.0, 250.0, 300.0, 400.0,
    500.0, 650.0, 800.0, 1000.0, 2000.0, 5000.0, 10000.0, 20000.0, 50000.0,
    100000.0, 200000.0, 400000.0, 800000.0, 1600000.0, 3200000.0,
  ];
  const viewList = [
    'operation_latencies',
    'first_response_latencies',
    'attempt_latencies',
    'retry_count',
    'server_latencies',
    'connectivity_error_count',
    'application_latencies',
    'throttling_latencies',
  ].map(
    name =>
      new View({
        instrumentName: name,
        name,
        aggregation: name.endsWith('latencies')
          ? Aggregation.Sum()
          : new ExplicitBucketHistogramAggregation(latencyBuckets),
      }),
  );
  const meterProvider = new MeterProvider({
    views: viewList,
    resource: new Resources.Resource({
      'service.name': 'Cloud Bigtable Table',
      'monitored_resource.project_id': projectId,
    }).merge(new ResourceUtil.GcpDetectorSync().detect()),
    readers: [
      // Register the exporter
      new PeriodicExportingMetricReader({
        // Export metrics every 60 seconds.
        exportIntervalMillis: 60_000,
        exporter,
      }),
    ],
  });
  const meter = meterProvider.getMeter('bigtable.googleapis.com');
  return {
    operationLatencies: meter.createHistogram(
      'bigtable.googleapis.com/internal/client/operation_latencies',
      {
        description:
          "The total end-to-end latency across all RPC attempts associated with a Bigtable operation. This metric measures an operation's round trip from the client to Bigtable and back to the client and includes all retries.",
        unit: 'ms',
        advice: {
          explicitBucketBoundaries: latencyBuckets,
        },
      },
    ),
    attemptLatencies: meter.createHistogram(
      'bigtable.googleapis.com/internal/client/attempt_latencies',
      {
        description:
          'The latencies of a client RPC attempt. Under normal circumstances, this value is identical to operation_latencies. If the client receives transient errors, however, then operation_latencies is the sum of all attempt_latencies and the exponential delays.',
        unit: 'ms',
        advice: {
          explicitBucketBoundaries: latencyBuckets,
        },
      },
    ),
    retryCount: meter.createCounter(
      'bigtable.googleapis.com/internal/client/retry_count',
      {
        description:
          'A counter that records the number of attempts that an operation required to complete. Under normal circumstances, this value is empty.',
      },
    ),
    applicationBlockingLatencies: meter.createHistogram(
      'bigtable.googleapis.com/internal/client/application_latencies',
      {
        description:
          'The time from when the client receives the response to a request until the application reads the response. This metric is most relevant for ReadRows requests. The start and stop times for this metric depend on the way that you send the read request; see Application blocking latencies timer examples for details.',
        unit: 'ms',
        advice: {
          explicitBucketBoundaries: latencyBuckets,
        },
      },
    ),
    firstResponseLatencies: meter.createHistogram(
      'bigtable.googleapis.com/internal/client/first_response_latencies',
      {
        description:
          'Latencies from when a client sends a request and receives the first row of the response.',
        unit: 'ms',
        advice: {
          explicitBucketBoundaries: latencyBuckets,
        },
      },
    ),
    serverLatencies: meter.createHistogram(
      'bigtable.googleapis.com/internal/client/server_latencies',
      {
        description:
          'Latencies between the time when the Google frontend receives an RPC and when it sends the first byte of the response.',
        unit: 'ms',

        advice: {
          explicitBucketBoundaries: latencyBuckets,
        },
      },
    ),
    connectivityErrorCount: meter.createCounter(
      'bigtable.googleapis.com/internal/client/connectivity_error_count',
      {
        description:
          "The number of requests that failed to reach Google's network. In normal cases, this number is 0. When the number is not 0, it can indicate connectivity issues between the application and the Google network.",
      },
    ),
    clientBlockingLatencies: meter.createHistogram(
      'bigtable.googleapis.com/internal/client/throttling_latencies',
      {
        description:
          'Latencies introduced when the client blocks the sending of more requests to the server because of too many pending requests in a bulk operation.',
        unit: 'ms',
        advice: {
          explicitBucketBoundaries: latencyBuckets,
        },
      },
    ),
  };
}

/**
 * A metrics handler implementation that uses OpenTelemetry to export metrics to Google Cloud Monitoring.
 * This handler records metrics such as operation latency, attempt latency, retry count, and more,
 * associating them with relevant attributes for detailed analysis in Cloud Monitoring.
 */
export class GCPMetricsHandler implements IMetricsHandler {
  private exporter: PushMetricExporter;
  // The variable below is the singleton map from projects to instrument stacks
  // which exists so that we only create one instrument stack per project. This
  // will eliminate errors due to the maximum sampling period.
  static instrumentsForProject: {[projectId: string]: MetricsInstruments} = {};

  /**
   * The `GCPMetricsHandler` is responsible for managing and recording
   * client-side metrics for Google Cloud Bigtable using OpenTelemetry. It
   * handles the creation and configuration of various metric instruments
   * (histograms and counters) and exports them to Google Cloud Monitoring
   * through the provided `PushMetricExporter`.
   *
   * @param exporter - The `PushMetricExporter` instance to use for exporting
   *   metrics to Google Cloud Monitoring. This exporter is responsible for
   *   sending the collected metrics data to the monitoring backend. The provided exporter must be fully configured, for example the projectId must have been set.
   */
  constructor(exporter: PushMetricExporter) {
    this.exporter = exporter;
  }

  /**
   * Initializes the OpenTelemetry metrics instruments if they haven't been already.
   * Creates and registers metric instruments (histograms and counters) for various Bigtable client metrics.
   * Sets up a MeterProvider and configures a PeriodicExportingMetricReader for exporting metrics to Cloud Monitoring.
   *
   * which will be provided to the exporter in every export call.
   *
   */
  private getInstruments(projectId: string): MetricsInstruments {
    // The projectId is needed per metrics handler because when the exporter is
    // used it provides the project id for the name of the time series exported.
    // ie. name: `projects/${....['monitored_resource.project_id']}`,
    if (!GCPMetricsHandler.instrumentsForProject[projectId]) {
      GCPMetricsHandler.instrumentsForProject[projectId] = createInstruments(
        projectId,
        this.exporter,
      );
    }
    return GCPMetricsHandler.instrumentsForProject[projectId];
  }

  /**
   * Records metrics for a completed Bigtable operation.
   * This method records the operation latency and retry count, associating them with provided attributes.
   * @param {OnOperationCompleteData} data Data related to the completed operation.
   */
  onOperationComplete(data: OnOperationCompleteData) {
    const otelInstruments = this.getInstruments(data.projectId);
    const commonAttributes = {
      app_profile: data.metricsCollectorData.app_profile,
      method: data.metricsCollectorData.method,
      client_uid: data.metricsCollectorData.client_uid,
      client_name: data.client_name,
      instanceId: data.metricsCollectorData.instanceId,
      table: data.metricsCollectorData.table,
      cluster: data.metricsCollectorData.cluster,
      zone: data.metricsCollectorData.zone,
    };
    otelInstruments.operationLatencies.record(data.operationLatency, {
      streaming: data.streaming,
      status: data.status,
      ...commonAttributes,
    });
    otelInstruments.retryCount.add(data.retryCount, {
      status: data.status,
      ...commonAttributes,
    });
    otelInstruments.firstResponseLatencies.record(data.firstResponseLatency, {
      status: data.status,
      ...commonAttributes,
    });
    for (const applicationLatency of data.applicationLatencies) {
      otelInstruments.applicationBlockingLatencies.record(
        applicationLatency,
        commonAttributes,
      );
    }
    otelInstruments.retryCount.add(data.retryCount, commonAttributes);
  }

  /**
   * Records metrics for a completed attempt of a Bigtable operation.
   * This method records attempt latency, connectivity error count, server latency,
   * along with the provided attributes.
   * @param {OnAttemptCompleteData} data Data related to the completed attempt.
   */
  onAttemptComplete(data: OnAttemptCompleteData) {
    const otelInstruments = this.getInstruments(data.projectId);
    const commonAttributes = {
      app_profile: data.metricsCollectorData.app_profile,
      method: data.metricsCollectorData.method,
      client_uid: data.metricsCollectorData.client_uid,
      status: data.status,
      client_name: data.client_name,
      instanceId: data.metricsCollectorData.instanceId,
      table: data.metricsCollectorData.table,
      cluster: data.metricsCollectorData.cluster,
      zone: data.metricsCollectorData.zone,
    };
    otelInstruments.attemptLatencies.record(data.attemptLatency, {
      streaming: data.streaming,
      ...commonAttributes,
    });
    otelInstruments.connectivityErrorCount.add(
      data.connectivityErrorCount,
      commonAttributes,
    );
    otelInstruments.serverLatencies.record(data.serverLatency, {
      streaming: data.streaming,
      ...commonAttributes,
    });
  }
}
