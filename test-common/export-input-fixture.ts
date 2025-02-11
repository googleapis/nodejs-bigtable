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

export const fakeStartTime = Math.floor(Date.now() / 1000) - 2000;
export const fakeEndTime = fakeStartTime + 1000;

export const exportInput = {
  resource: {
    _attributes: {
      'service.name': 'Cloud Bigtable Table',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.30.0',
      'cloud.provider': 'gcp',
      'cloud.platform': 'gce_instance',
      'cloud.resource_manager.project_id': 'some-project',
      'monitored_resource.type': 'bigtable_client_raw',
    },
    asyncAttributesPending: false,
    _syncAttributes: {
      'service.name': 'Cloud Bigtable Table',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.30.0',
      'cloud.provider': 'gcp',
      'cloud.platform': 'gce_instance',
      'cloud.resource_manager.project_id': 'some-project',
      'monitored_resource.type': 'bigtable_client_raw',
    },
    _asyncAttributesPromise: {},
  },
  scopeMetrics: [
    {
      scope: {
        name: 'bigtable.googleapis.com',
        version: '',
      },
      metrics: [
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/operation_latencies',
            type: 'HISTOGRAM',
            description:
              "The total end-to-end latency across all RPC attempts associated with a Bigtable operation. This metric measures an operation's round trip from the client to Bigtable and back to the client and includes all retries.",
            unit: '',
            valueType: 1,
            advice: {},
          },
          aggregationTemporality: 1,
          dataPointType: 0,
          dataPoints: [
            {
              attributes: {
                appProfileId: 'fake-app-profile-id',
                finalOperationStatus: 0,
                streamingOperation: 'true',
                projectId: 'some-project',
                instanceId: 'emulator-test-instance',
                table: 'my-table',
                cluster: 'fake-cluster3',
                zone: 'us-west1-c',
                methodName: 'readRows',
                clientName: 'nodejs-bigtable/5.1.2',
              },
              startTime: [fakeStartTime, 951000000],
              endTime: [fakeEndTime, 948000000],
              value: {
                min: 76,
                max: 1337,
                sum: 11979,
                buckets: {
                  boundaries: [
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 0, 0, 0, 0, 0, 93, 0, 5, 0, 0, 1, 0, 0, 0, 0],
                },
                count: 99,
              },
            },
          ],
        },
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/operation_latencies',
            type: 'HISTOGRAM',
            description:
              "The total end-to-end latency across all RPC attempts associated with a Bigtable operation. This metric measures an operation's round trip from the client to Bigtable and back to the client and includes all retries.",
            unit: '',
            valueType: 1,
            advice: {},
          },
          aggregationTemporality: 1,
          dataPointType: 0,
          dataPoints: [
            {
              attributes: {
                appProfileId: 'fake-app-profile-id',
                finalOperationStatus: 0,
                streamingOperation: 'true',
                projectId: 'some-project',
                instanceId: 'emulator-test-instance',
                table: 'my-table',
                cluster: 'fake-cluster3',
                zone: 'us-west1-c',
                methodName: 'mutateRows',
                clientName: 'nodejs-bigtable/5.1.2',
              },
              startTime: [fakeStartTime, 951000000],
              endTime: [fakeEndTime, 948000000],
              value: {
                min: 76,
                max: 1337,
                sum: 11979,
                buckets: {
                  boundaries: [
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 0, 0, 0, 0, 0, 93, 0, 5, 0, 0, 1, 0, 0, 0, 0],
                },
                count: 99,
              },
            },
          ],
        },
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/operation_latencies',
            type: 'HISTOGRAM',
            description:
              "The total end-to-end latency across all RPC attempts associated with a Bigtable operation. This metric measures an operation's round trip from the client to Bigtable and back to the client and includes all retries.",
            unit: '',
            valueType: 1,
            advice: {},
          },
          aggregationTemporality: 1,
          dataPointType: 0,
          dataPoints: [
            {
              attributes: {
                appProfileId: 'fake-app-profile-id',
                finalOperationStatus: 0,
                streamingOperation: 'true',
                projectId: 'some-project',
                instanceId: 'emulator-test-instance',
                table: 'my-table',
                cluster: 'fake-cluster3',
                zone: 'us-west1-c',
                methodName: 'sampleRowKeys',
                clientName: 'nodejs-bigtable/5.1.2',
              },
              startTime: [fakeStartTime, 951000000],
              endTime: [fakeEndTime, 948000000],
              value: {
                min: 76,
                max: 1337,
                sum: 11979,
                buckets: {
                  boundaries: [
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 0, 0, 0, 0, 0, 93, 0, 5, 0, 0, 1, 0, 0, 0, 0],
                },
                count: 99,
              },
            },
          ],
        },
      ],
    },
  ],
};

const serverLatencyExportOutput = {
  name: 'projects/cloud-native-db-dpes-shared',
  timeSeries: [
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/server_latencies',
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
          instance: 'bahaaiman-instance-01',
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
              seconds: 2000,
            },
            startTime: {
              seconds: 1000,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 376.103605,
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
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/attempt_latencies',
        labels: {
          app_profile: '',
          client_name: 'go-bigtable/1.35.0',
          client_uid:
            'go-9f4f393d-c57f-457c-9445-550b8a6f7d00@bahaaiman-ct-01.c.googlers.com',
          method: 'Bigtable.ReadRows',
          status: 'OK',
          // "streaming":  "true"
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'bahaaiman-instance-01-c1',
          instance: 'bahaaiman-instance-01',
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
              seconds: 2000,
            },
            startTime: {
              seconds: 1000,
            },
          },
          value: {
            distributionValue: {
              count: '5',
              mean: 272.559932,
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
                '1',
                '0',
                '0',
                '0',
                '2',
                '2',
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
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/server_latencies',
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
          instance: 'bahaaiman-instance-01',
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
              seconds: 2000,
            },
            startTime: {
              seconds: 1000,
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
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/server_latencies',
        labels: {
          app_profile: '',
          client_name: 'go-bigtable/1.35.0',
          client_uid:
            'go-9f4f393d-c57f-457c-9445-550b8a6f7d00@bahaaiman-ct-01.c.googlers.com',
          method: 'Bigtable.ReadRows',
          status: 'OK',
          // "streaming":  "true"
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'bahaaiman-instance-01-c1',
          instance: 'bahaaiman-instance-01',
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
              seconds: 2000,
            },
            startTime: {
              seconds: 1000,
            },
          },
          value: {
            distributionValue: {
              count: '5',
              mean: 230,
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
                '1',
                '0',
                '0',
                '2',
                '2',
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
              ],
            },
          },
        },
      ],
      unit: 'ms',
    },
  ],
};
