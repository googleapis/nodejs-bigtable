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

import {MetricExporter} from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {ServiceError} from 'google-gax';
import {MetricServiceClient} from '@google-cloud/monitoring';
import {google} from '@google-cloud/monitoring/build/protos/protos';
import ICreateTimeSeriesRequest = google.monitoring.v3.ICreateTimeSeriesRequest;

export interface ExportResult {
  code: number;
}

/**
 * Attributes associated with the completion of a single attempt of a Bigtable
 * operation. These attributes provide context about the specific attempt,
 * its status, and the method involved. They are used for recording metrics
 * such as attempt latency and connectivity errors.
 *
 * @property methodName - The name of the Bigtable method that was attempted (e.g.,
 *   'Bigtable.ReadRows', 'Bigtable.MutateRows').
 * @property clientUid - A unique identifier for the client that initiated the
 *   attempt.
 * @property appProfileId - (Optional) The ID of the application profile used for
 *   the attempt.
 * @property attemptStatus - The status code of the attempt. A value of `0`
 *   typically indicates success (grpc.status.OK), while other values indicate
 *   different types of errors.
 * @property streamingOperation - (Optional) Indicates if the operation is a streaming operation.
 *   Will be "true" or "false" if present.
 * @property clientName - The name of the client library making the attempt
 *   (e.g., 'nodejs-bigtable', 'go-bigtable/1.35.0').
 */
interface OnAttemptAttribute {
  methodName: string;
  clientUid: string;
  appProfileId?: string;
  attemptStatus: number;
  streamingOperation?: string;
  clientName: string;
}

/**
 * Attributes associated with the completion of a Bigtable operation. These
 * attributes provide context about the operation, its final status, and the
 * method involved. They are used for recording metrics such as operation
 * latency.
 *
 * @property methodName - The name of the Bigtable method that was performed
 *   (e.g., 'Bigtable.ReadRows', 'Bigtable.MutateRows').
 * @property clientUid - A unique identifier for the client that initiated the
 *   operation.
 * @property appProfileId - (Optional) The ID of the application profile used for
 *   the operation.
 * @property finalOperationStatus - The final status code of the operation. A
 *   value of `0` typically indicates success (grpc.status.OK), while other
 *   values indicate different types of errors.
 * @property streamingOperation - (Optional) Indicates if the operation is a streaming operation.
 *   Will be "true" or "false" if present.
 * @property clientName - The name of the client library performing the operation
 *   (e.g., 'nodejs-bigtable', 'go-bigtable/1.35.0').
 */
interface OnOperationAttribute {
  methodName: string;
  clientUid: string;
  appProfileId?: string;
  finalOperationStatus: number;
  streamingOperation?: string;
  clientName: string;
}

/**
 * Represents a generic metric in the OpenTelemetry format.
 *
 * This interface describes the structure of a metric, which can represent
 * either a counter or a distribution (histogram). It includes the metric's
 * descriptor, the type of data it collects, and the actual data points.
 *
 */
interface Metric<Value> {
  descriptor: {
    name: string;
    unit: string;
    description?: string;
    type?: string;
    valueType?: number;
    advice?: {};
  };
  aggregationTemporality?: number;
  dataPointType?: number;
  dataPoints: {
    attributes: OnAttemptAttribute | OnOperationAttribute;
    startTime: number[];
    endTime: number[];
    value: Value;
  }[];
}

interface DistributionValue {
  min?: number;
  max?: number;
  sum: number;
  count: number;
  buckets: {
    boundaries: number[];
    counts: number[];
  };
}

/**
 * Represents a metric that measures the distribution of values.
 *
 * Distribution metrics, also known as histograms, are used to track the
 * statistical distribution of a set of measurements. They allow you to capture
 * not only the count and sum of the measurements but also how they are spread
 * across different ranges (buckets). This makes them suitable for tracking
 * latencies, sizes, or other metrics where the distribution is important.
 *
 */
type DistributionMetric = Metric<DistributionValue>;

/**
 * Represents a metric that counts the number of occurrences of an event or
 * the cumulative value of a quantity over time.
 *
 * Counter metrics are used to track quantities that increase over time, such
 * as the number of requests, errors, or retries. They are always
 * non-negative and can only increase or remain constant.
 *
 */
type CounterMetric = Metric<number>;

/**
 * Represents the input data structure for exporting OpenTelemetry metrics.
 *
 * This interface defines the structure of the object that is passed to the
 * `metricsToRequest` function to convert OpenTelemetry metrics into a format
 * suitable for the Google Cloud Monitoring API.
 *
 * It contains information about the monitored resource and an array of
 * scope metrics, which include various types of metrics (counters and
 * distributions) and their associated data points.
 *
 * @remarks
 * This structure is specifically designed to hold OpenTelemetry metrics data
 * as it is exported from the Bigtable client library. It represents the data
 * before it is transformed into the Cloud Monitoring API's `TimeSeries`
 * format.
 *
 * Each `CounterMetric` and `DistributionMetric` within the `scopeMetrics`
 * array represents a different type of measurement, such as retry counts,
 * operation latencies, attempt latencies etc. Each metric contains an array of dataPoints
 * Each `dataPoint` contains the `attributes`, `startTime`, `endTime` and `value`.
 * `value` will be a number for a counter metric and an object for a distribution metric.
 */
export interface ExportInput {
  resource: {
    _syncAttributes: {
      'monitored_resource.type': string;
      'monitored_resource.project_id': string;
      'monitored_resource.instance_id': string;
      'monitored_resource.table': string;
      'monitored_resource.cluster': string;
      'monitored_resource.zone': string;
    };
  };
  scopeMetrics: {
    scope: {
      name: string;
      version: string;
    };
    metrics: (CounterMetric | DistributionMetric)[];
  }[];
}

/**
 * Type guard function to determine if a given value is a counter value (a number).
 *
 * This function checks if a value, which could be either a `DistributionValue`
 * object or a `number`, is specifically a `number`. This is used to differentiate
 * between counter metrics (which have numeric values) and distribution metrics
 * (which have more complex, object-based values).
 *
 */
function isCounterValue(value: DistributionValue | number): value is number {
  return typeof value === 'number';
}

/**
 * Converts OpenTelemetry metrics data into a format suitable for the Google Cloud
 * Monitoring API's `createTimeSeries` method.
 *
 * This function transforms the structured metrics data, including resource and
 * metric attributes, data points, and aggregation information, into an object
 * that conforms to the expected request format of the Cloud Monitoring API.
 *
 * @param {ExportInput} exportArgs - The OpenTelemetry metrics data to be converted. This
 *   object contains resource attributes, scope information, and a list of
 *   metrics with their associated data points.
 *
 * @returns An object representing a `CreateTimeSeriesRequest`, ready for sending
 *   to the Google Cloud Monitoring API. This object contains the project name
 *   and an array of time series data points, formatted for ingestion by
 *   Cloud Monitoring.
 *
 * @throws Will throw an error if there are issues converting the data.
 *
 * @remarks
 *   The output format is specific to the Cloud Monitoring API and involves
 *   mapping OpenTelemetry concepts to Cloud Monitoring's data model, including:
 *   - Mapping resource attributes to resource labels.
 *   - Mapping metric attributes to metric labels.
 *   - Handling different metric types (counter, distribution).
 *   - Converting data points to the correct structure, including start and end
 *     times, values, and bucket information for distributions.
 *
 * @example
 *   const exportInput: ExportInput = { ... }; // Example ExportInput object
 *   const monitoringRequest = metricsToRequest(exportInput);
 *   // monitoringRequest can now be used in monitoringClient.createTimeSeries(monitoringRequest)
 *
 *
 */
export function metricsToRequest(exportArgs: ExportInput) {
  const timeSeriesArray = [];
  const resourceLabels = {
    cluster: exportArgs.resource._syncAttributes['monitored_resource.cluster'],
    instance:
      exportArgs.resource._syncAttributes['monitored_resource.instance_id'],
    project_id:
      exportArgs.resource._syncAttributes['monitored_resource.project_id'],
    table: exportArgs.resource._syncAttributes['monitored_resource.table'],
    zone: exportArgs.resource._syncAttributes['monitored_resource.zone'],
  };
  for (const scopeMetrics of exportArgs.scopeMetrics) {
    for (const scopeMetric of scopeMetrics.metrics) {
      const metricName = scopeMetric.descriptor.name;
      for (const dataPoint of scopeMetric.dataPoints) {
        const value = dataPoint.value;
        const allAttributes = dataPoint.attributes;
        const streaming = allAttributes.streamingOperation;
        /*
        metricLabels are built from the open telemetry attributes that are set
        when a data point is recorded. This means that for one metric there may
        be multiple time series' with different attributes, but the resource
        labels will always be the same for a particular export call.
         */
        const metricLabels = Object.assign(
          {
            app_profile: allAttributes.appProfileId,
            client_name: allAttributes.clientName,
            method: allAttributes.methodName,
            status:
              (allAttributes as OnAttemptAttribute).attemptStatus?.toString() ??
              (
                allAttributes as OnOperationAttribute
              ).finalOperationStatus?.toString(),
            client_uid: allAttributes.clientUid,
          },
          streaming ? {streaming} : null
        );
        const metric = {
          type: metricName,
          labels: metricLabels,
        };
        const resource = {
          type: exportArgs.resource._syncAttributes['monitored_resource.type'],
          labels: resourceLabels,
        };
        const interval = {
          endTime: {
            seconds: dataPoint.endTime[0],
          },
          startTime: {
            seconds: dataPoint.startTime[0],
          },
        };
        const timeSeries = isCounterValue(value)
          ? {
              metric,
              resource,
              valueType: 'INT64',
              points: [
                {
                  interval,
                  value: {
                    int64Value: dataPoint.value,
                  },
                },
              ],
            }
          : {
              metric,
              resource,
              metricKind: 'CUMULATIVE',
              valueType: 'DISTRIBUTION',
              points: [
                {
                  interval,
                  value: {
                    distributionValue: {
                      count: String(value.count),
                      mean: value.count ? value.sum / value.count : 0,
                      bucketOptions: {
                        explicitBuckets: {
                          bounds: value.buckets.boundaries,
                        },
                      },
                      bucketCounts: value.buckets.counts.map(String),
                    },
                  },
                },
              ],
              unit: scopeMetric.descriptor.unit || 'ms', // Default to 'ms' if no unit is specified
            };
        timeSeriesArray.push(timeSeries);
      }
    }
  }
  return {
    name: `projects/${exportArgs.resource._syncAttributes['monitored_resource.project_id']}`,
    timeSeries: timeSeriesArray,
  };
}

/**
 * A custom OpenTelemetry `MetricExporter` that sends metrics data to Google Cloud
 * Monitoring.
 *
 * This class extends the base `MetricExporter` from `@google-cloud/opentelemetry-cloud-monitoring-exporter`
 * and handles the process of converting OpenTelemetry metrics data into the
 * format required by the Google Cloud Monitoring API. It uses the
 * `MetricServiceClient` to send the data to Google Cloud Monitoring's
 * `createTimeSeries` method.
 *
 * @remarks
 *   This exporter relies on the `metricsToRequest` function to perform the
 *   necessary transformation of OpenTelemetry metrics into Cloud Monitoring
 *   `TimeSeries` data.
 *
 *   The exporter is asynchronous and will not block the calling thread while
 *   sending metrics. It manages the Google Cloud Monitoring client and handles
 *   potential errors during the export process.
 *
 *   The class expects the `ResourceMetrics` to have been correctly configured
 *   and populated with the required resource attributes to correctly identify
 *   the monitored resource in Cloud Monitoring.
 *
 * @example
 *   // Create an instance of the CloudMonitoringExporter
 *   const exporter = new CloudMonitoringExporter();
 *
 *   // Use the exporter with a MeterProvider
 *   const meterProvider = new MeterProvider({
 *     resource: new Resource({
 *       'service.name': 'my-service',
 *       // ... other resource attributes
 *     }),
 *     readers: [new PeriodicExportingMetricReader({
 *         exporter: exporter,
 *         exportIntervalMillis: 10000 // Export every 10 seconds
 *     })]
 *   });
 *
 *   // Now start instrumenting your application using the meter
 *   const meter = meterProvider.getMeter('my-meter');
 *   // ... create counters, histograms, etc.
 *
 * @beta
 */
export class CloudMonitoringExporter extends MetricExporter {
  private monitoringClient = new MetricServiceClient();

  export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void
  ): void {
    (async () => {
      try {
        const request = metricsToRequest(metrics as unknown as ExportInput);
        await this.monitoringClient.createTimeSeries(
          request as ICreateTimeSeriesRequest
        );
        // {code: 0} is typically the format the callback expects in the super class.
        const exportResult = {code: 0};
        resultCallback(exportResult);
      } catch (error) {
        resultCallback(error as ServiceError);
      }
    })();
  }
}
