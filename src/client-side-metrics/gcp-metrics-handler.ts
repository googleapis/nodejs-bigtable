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
  OnAttemptCompleteMetrics,
  OnOperationCompleteMetrics,
} from './metrics-handler';
import * as Resources from '@opentelemetry/resources';
import * as ResourceUtil from '@google-cloud/opentelemetry-resource-util';
import {MetricExporter} from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import {
  OnAttemptCompleteAttributes,
  OnOperationCompleteAttributes,
} from '../../common/client-side-metrics-attributes';
import {View} from '@opentelemetry/sdk-metrics';
const {
  Aggregation,
  ExplicitBucketHistogramAggregation,
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
      const sumAggregation = Aggregation.Sum();
      const histogramAggregation = new ExplicitBucketHistogramAggregation([
        0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10, 13, 16, 20,
        25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250, 300, 400, 500, 650,
        800, 1000, 2000, 5000, 10000, 20000, 50000, 100000,
      ]);
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
            aggregation: name.slice(-9) ? sumAggregation : histogramAggregation,
          })
      );
      const meterProvider = new MeterProvider({
        views: viewList,
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
    this.otelMetrics?.firstResponseLatencies.record(
      metrics.firstResponseLatency,
      attributes
    );
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
  }
}
