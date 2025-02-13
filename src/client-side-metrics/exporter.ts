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
import {expectedRequest} from '../../test/metrics-collector/metricsToRequest';
import {exportInput} from '../../test-common/export-input-fixture';

interface ExportResult {
  code: number;
}

// TODO: Only involves the values that we care about
export interface ExportInput {
  resource: {
    _attributes: {
      'cloud.resource_manager.project_id': string;
    };
    _syncAttributes: {
      'monitored_resource.type': string;
    };
  };
  scopeMetrics: {
    scope: {
      name: string;
      version: string;
    };
    metrics: {
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
        attributes: {
          appProfileId?: string;
          finalOperationStatus: number;
          streamingOperation: string;
          projectId: string;
          instanceId: string;
          table: string;
          cluster: string;
          zone: string;
          methodName: string;
          clientName: string;
          clientUid: string;
        };
        startTime: number[];
        endTime: number[];
        value: {
          min?: number;
          max?: number;
          sum: number;
          count: number;
          buckets: {
            boundaries: number[];
            counts: number[];
          };
        };
      }[];
    }[];
  }[];
}

export function metricsToRequest(exportArgs: ExportInput) {
  const timeSeriesArray = [];
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
          status: allAttributes.finalOperationStatus.toString(),
          streaming: allAttributes.streamingOperation,
          client_uid: allAttributes.clientUid,
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
        timeSeriesArray.push(timeSeries);
      }
    }
  }
  return {
    name: `projects/${exportArgs.resource._attributes['cloud.resource_manager.project_id']}`,
    timeSeries: timeSeriesArray,
  };
}

const goRequestToExporter = {
  name: 'projects/cloud-native-db-dpes-shared',
  timeSeries: [
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/operation_latencies',
        labels: {
          app_profile: '',
          client_name: 'go-bigtable/1.35.0',
          client_uid:
            'go-9f4f393d-c57f-457c-9445-550b8a6f7d00@bahaaiman-ct-01.c.googlers.com',
          method: 'Bigtable.MutateRows',
          status: 'OK',
          // "streaming":  "true"
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'bahaaiman-instance-01-c1',
          instance: 'interim-instance3',
          project_id: 'cloud-native-db-dpes-shared',
          table: 'profile-b5e6f29d-2122-4d2c-8c12-cfb8e90ca05f',
          zone: 'us-central1-f',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: Math.floor(Date.now() / 1000),
            },
            startTime: {
              seconds: Math.floor(Date.now() / 1000) - 1000,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 331,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 1, 2, 3, 4, 5, 6, 8, 10, 13, 16, 20, 25, 30, 40, 50, 65,
                    80, 100, 130, 160, 200, 250, 300, 400, 500, 650, 800, 1000,
                    2000, 5000, 10000, 20000, 50000, 100000, 200000, 400000,
                    800000, 1600000, 3200000,
                  ],
                },
              },
              bucketCounts: [
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '1',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
                '0',
              ],
            },
          },
        },
      ],
      unit: 'ms',
    },
  ],
};

// TODO: Add test for when the export fails
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
        await this.monitoringClient.createTimeSeries(
          request as ICreateTimeSeriesRequest
        );
        const exportResult = {code: 0};
        resultCallback(exportResult);
      } catch (error) {
        const exportResult = {code: (error as ServiceError).code as number};
        resultCallback(exportResult);
      }
    })();
  }
}
