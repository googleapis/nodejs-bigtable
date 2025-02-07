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

interface ExportResult {
  code: number;
}

// TODO: Only involves the values that we care about
interface ExportInput {
  resource: {
    _attributes: {
      'cloud.resource_manager.project_id': string;
    };
    _syncAttributes: {
      'monitored_resource.type': string;
    };
  };
  scopeMetrics: [
    {
      metrics: [
        {
          descriptor: {
            name: string;
            unit: string;
          };
          dataPoints: [
            {
              attributes: {
                appProfileId: string;
                finalOperationStatus: number;
                streamingOperation: string;
                projectId: string;
                instanceId: string;
                table: string;
                cluster: string;
                zone: string;
                methodName: string;
                clientName: string;
              };
              startTime: [number, number];
              endTime: [number, number];
              value: {
                sum: number;
                count: number;
                buckets: {
                  boundaries: number[];
                  counts: number[];
                };
              };
            },
          ];
        },
      ];
    },
  ];
}

export function metricsToRequest(exportArgs: ExportInput) {
  const request = {
    name: `projects/${exportArgs.resource._attributes['cloud.resource_manager.project_id']}`,
    timeSeries: [],
  };

  for (const scopeMetrics of exportArgs.scopeMetrics) {
    for (const metric of scopeMetrics.metrics) {
      const metricName = metric.descriptor.name;

      for (const dataPoint of metric.dataPoints) {
        // Extract attributes to labels based on their intended target (resource or metric)
        const allAttributes = dataPoint.attributes;
        const metricLabels = {
          app_profile: allAttributes.appProfileId,
          client_name: allAttributes.clientName,
          method: allAttributes.methodName,
          finalOperationStatus: allAttributes.finalOperationStatus,
          streaming: allAttributes.streamingOperation,
        };
        const resourceLabels = {
          cluster: allAttributes.cluster,
          instance: allAttributes.instanceId,
          project_id: allAttributes.projectId,
          table: allAttributes.table,
          zone: allAttributes.zone,
        };
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
                  nanos: dataPoint.endTime[1],
                },
                startTime: {
                  seconds: dataPoint.startTime[0],
                  nanos: dataPoint.startTime[1],
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
        request.timeSeries.push(timeSeries);
      }
    }
  }
  return request;
}

export class CloudMonitoringExporter extends MetricExporter {
  private monitoringClient = new MetricServiceClient();

  export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void
  ): void {
    (async () => {
      try {
        // TODO: Remove casting.
        const request = metricsToRequest(metrics as unknown as ExportInput);
        await this.monitoringClient.createTimeSeries(request);
        const exportResult = {code: 0};
        resultCallback(exportResult);
      } catch (error) {
        const exportResult = {code: (error as ServiceError).code as number};
        resultCallback(exportResult);
      }
    })();
  }
}
