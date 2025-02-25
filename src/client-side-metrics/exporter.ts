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
import {
  CONNECTIIVTY_ERROR_COUNT,
  RETRY_COUNT_NAME,
} from '../../test-common/expected-otel-export-input';

export interface ExportResult {
  code: number;
}

interface OnAttemptAttribute {
  methodName: string;
  clientUid: string;
  appProfileId?: string;
  attemptStatus: number;
  streamingOperation?: string;
  clientName: string;
}

interface OnOperationAttribute {
  methodName: string;
  clientUid: string;
  appProfileId?: string;
  finalOperationStatus: number;
  streamingOperation?: string;
  clientName: string;
}

interface Metric<Attributes, Value> {
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
    attributes: Attributes;
    startTime: number[];
    endTime: number[];
    value: Value;
  }[];
}

type OtherMetric = Metric<
  OnAttemptAttribute | OnOperationAttribute,
  {
    min?: number;
    max?: number;
    sum: number;
    count: number;
    buckets: {
      boundaries: number[];
      counts: number[];
    };
  }
>;

type RetryMetric = Metric<OnAttemptAttribute | OnOperationAttribute, number>;

export interface ExportInput {
  resource: {
    _attributes: {
      'cloud.resource_manager.project_id': string;
    };
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
    metrics: (RetryMetric | OtherMetric)[];
  }[];
}

function isIntegerMetric(
  metric: OtherMetric | RetryMetric
): metric is RetryMetric {
  return (
    metric.descriptor.name === RETRY_COUNT_NAME ||
    metric.descriptor.name === CONNECTIIVTY_ERROR_COUNT
  );
}

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
    for (const metric of scopeMetrics.metrics) {
      const metricName = metric.descriptor.name;
      if (isIntegerMetric(metric)) {
        for (const dataPoint of metric.dataPoints) {
          // Extract attributes to labels based on their intended target (resource or metric)
          const allAttributes = dataPoint.attributes;
          const streaming = allAttributes.streamingOperation;
          const metricLabels = Object.assign(
            {
              app_profile: allAttributes.appProfileId,
              client_name: allAttributes.clientName,
              method: allAttributes.methodName,
              status:
                (
                  allAttributes as OnAttemptAttribute
                ).attemptStatus?.toString() ??
                (
                  allAttributes as OnOperationAttribute
                ).finalOperationStatus?.toString(),
              client_uid: allAttributes.clientUid,
            },
            streaming ? {streaming} : null
          );
          const timeSeries = {
            metric: {
              type: metricName,
              labels: metricLabels,
            },
            resource: {
              type: exportArgs.resource._syncAttributes[
                'monitored_resource.type'
              ],
              labels: resourceLabels,
            },
            valueType: 'INT64',
            points: [
              {
                interval: {
                  endTime: {
                    seconds: dataPoint.endTime[0],
                  },
                  startTime: {
                    seconds: dataPoint.startTime[0],
                  },
                },
                value: {
                  int64Value: dataPoint.value,
                },
              },
            ],
          };
          timeSeriesArray.push(timeSeries);
        }
      } else {
        for (const dataPoint of metric.dataPoints) {
          // Extract attributes to labels based on their intended target (resource or metric)
          const allAttributes = dataPoint.attributes;
          const streaming = allAttributes.streamingOperation;
          const metricLabels = Object.assign(
            {
              app_profile: allAttributes.appProfileId,
              client_name: allAttributes.clientName,
              method: allAttributes.methodName,
              status:
                (
                  allAttributes as OnAttemptAttribute
                ).attemptStatus?.toString() ??
                (
                  allAttributes as OnOperationAttribute
                ).finalOperationStatus?.toString(),
              client_uid: allAttributes.clientUid,
            },
            streaming ? {streaming} : null
          );
          const timeSeries = {
            metric: {
              type: metricName,
              labels: metricLabels,
            },
            resource: {
              type: exportArgs.resource._syncAttributes[
                'monitored_resource.type'
              ],
              labels: resourceLabels,
            },
            metricKind: 'CUMULATIVE',
            valueType: 'DISTRIBUTION',
            points: [
              {
                interval: {
                  endTime: {
                    seconds: dataPoint.endTime[0],
                  },
                  startTime: {
                    seconds: dataPoint.startTime[0],
                  },
                },
                value: {
                  distributionValue: {
                    count: String(dataPoint.value.count),
                    mean: dataPoint.value.sum / dataPoint.value.count,
                    bucketOptions: {
                      explicitBuckets: {
                        bounds: dataPoint.value.buckets.boundaries,
                      },
                    },
                    bucketCounts: dataPoint.value.buckets.counts.map(String),
                  },
                },
              },
            ],
            unit: metric.descriptor.unit || 'ms', // Default to 'ms' if no unit is specified
          };
          timeSeriesArray.push(timeSeries);
        }
      }
    }
  }
  return {
    name: `projects/${exportArgs.resource._attributes['cloud.resource_manager.project_id']}`,
    timeSeries: timeSeriesArray,
  };
}

// TODO: Add test for when the export fails
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
