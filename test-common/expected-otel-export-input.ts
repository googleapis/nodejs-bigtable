export const RETRY_COUNT_NAME =
  'bigtable.googleapis.com/internal/client/retry_count';

export const expectedOtelExportConvertedValue = {
  name: 'projects/my-project',
  timeSeries: [
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/operation_latencies',
        labels: {
          client_name: 'nodejs-bigtable',
          status: '0',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          project_id: 'my-project',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
            },
            startTime: {
              seconds: 123,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 7000,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
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
          client_name: 'nodejs-bigtable',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          project_id: 'my-project',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
            },
            startTime: {
              seconds: 123,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 2000,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
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
          client_name: 'nodejs-bigtable',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          project_id: 'my-project',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
            },
            startTime: {
              seconds: 123,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 2000,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
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
              ],
            },
          },
        },
      ],
      unit: 'ms',
    },
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/retry_count',
        labels: {
          client_name: 'nodejs-bigtable',
          status: '0',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          project_id: 'my-project',
        },
      },
      valueType: 'INT64',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
            },
            startTime: {
              seconds: 123,
            },
          },
          value: {
            int64Value: 1,
          },
        },
      ],
    },
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/first_response_latencies',
        labels: {
          client_name: 'nodejs-bigtable',
          status: '0',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          project_id: 'my-project',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
            },
            startTime: {
              seconds: 123,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 5000,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
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
          client_name: 'nodejs-bigtable',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          project_id: 'my-project',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
            },
            startTime: {
              seconds: 123,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 101,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
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
          client_name: 'nodejs-bigtable',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          project_id: 'my-project',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
            },
            startTime: {
              seconds: 123,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 103,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
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
        type: 'bigtable.googleapis.com/internal/client/connectivity_error_count',
        labels: {
          client_name: 'nodejs-bigtable',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          project_id: 'my-project',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
            },
            startTime: {
              seconds: 123,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 0,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                },
              },
              bucketCounts: [
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
        type: 'bigtable.googleapis.com/internal/client/connectivity_error_count',
        labels: {
          client_name: 'nodejs-bigtable',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          project_id: 'my-project',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
            },
            startTime: {
              seconds: 123,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 0,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                },
              },
              bucketCounts: [
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

export const expectedOtelExportInput = {
  resource: {
    _attributes: {
      'service.name': 'Cloud Bigtable Table',
      'telemetry.sdk.language': 'nodejs',
      'telemetry.sdk.name': 'opentelemetry',
      'telemetry.sdk.version': '1.30.0',
      'cloud.provider': 'gcp',
      'cloud.platform': 'gce_instance',
      'cloud.resource_manager.project_id': 'my-project',
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
      'cloud.resource_manager.project_id': 'my-project',
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
            unit: 'ms',
            valueType: 1,
            advice: {
              explicitBucketBoundaries: [
                0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10, 13,
                16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250, 300,
                400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000, 50000,
                100000,
              ],
            },
          },
          aggregationTemporality: 1,
          dataPointType: 0,
          dataPoints: [
            {
              attributes: {
                finalOperationStatus: 0,
                streamingOperation: 'true',
                metricsCollectorData: {
                  instanceId: 'fakeInstanceId',
                  table: 'fakeTableId',
                  cluster: 'fake-cluster3',
                  zone: 'us-west1-c',
                  methodName: 'readRows',
                  clientUid: 'fake-uuid',
                },
                clientName: 'nodejs-bigtable',
                projectId: 'my-project',
              },
              startTime: [123, 789],
              endTime: [456, 789],
              value: {
                min: 7000,
                max: 7000,
                sum: 7000,
                buckets: {
                  boundaries: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                  counts: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
                    0, 0,
                  ],
                },
                count: 1,
              },
            },
          ],
        },
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/attempt_latencies',
            type: 'HISTOGRAM',
            description:
              'The latencies of a client RPC attempt. Under normal circumstances, this value is identical to operation_latencies. If the client receives transient errors, however, then operation_latencies is the sum of all attempt_latencies and the exponential delays.',
            unit: 'ms',
            valueType: 1,
            advice: {
              explicitBucketBoundaries: [
                0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10, 13,
                16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250, 300,
                400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000, 50000,
                100000,
              ],
            },
          },
          aggregationTemporality: 1,
          dataPointType: 0,
          dataPoints: [
            {
              attributes: {
                streamingOperation: 'true',
                attemptStatus: 4,
                clientName: 'nodejs-bigtable',
                metricsCollectorData: {
                  instanceId: 'fakeInstanceId',
                  table: 'fakeTableId',
                  cluster: 'fake-cluster3',
                  zone: 'us-west1-c',
                  methodName: 'readRows',
                  clientUid: 'fake-uuid',
                },
                projectId: 'my-project',
              },
              startTime: [123, 789],
              endTime: [456, 789],
              value: {
                min: 2000,
                max: 2000,
                sum: 2000,
                buckets: {
                  boundaries: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                  counts: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
                    0, 0,
                  ],
                },
                count: 1,
              },
            },
            {
              attributes: {
                streamingOperation: 'true',
                attemptStatus: 0,
                clientName: 'nodejs-bigtable',
                metricsCollectorData: {
                  instanceId: 'fakeInstanceId',
                  table: 'fakeTableId',
                  cluster: 'fake-cluster3',
                  zone: 'us-west1-c',
                  methodName: 'readRows',
                  clientUid: 'fake-uuid',
                },
                projectId: 'my-project',
              },
              startTime: [123, 789],
              endTime: [456, 789],
              value: {
                min: 2000,
                max: 2000,
                sum: 2000,
                buckets: {
                  boundaries: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                  counts: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
                    0, 0,
                  ],
                },
                count: 1,
              },
            },
          ],
        },
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/retry_count',
            type: 'COUNTER',
            description:
              'A counter that records the number of attempts that an operation required to complete. Under normal circumstances, this value is empty.',
            unit: '',
            valueType: 1,
            advice: {},
          },
          aggregationTemporality: 1,
          dataPointType: 3,
          dataPoints: [
            {
              attributes: {
                finalOperationStatus: 0,
                streamingOperation: 'true',
                metricsCollectorData: {
                  instanceId: 'fakeInstanceId',
                  table: 'fakeTableId',
                  cluster: 'fake-cluster3',
                  zone: 'us-west1-c',
                  methodName: 'readRows',
                  clientUid: 'fake-uuid',
                },
                clientName: 'nodejs-bigtable',
                projectId: 'my-project',
              },
              startTime: [123, 789],
              endTime: [456, 789],
              value: 1,
            },
          ],
          isMonotonic: true,
        },
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/first_response_latencies',
            type: 'HISTOGRAM',
            description:
              'Latencies from when a client sends a request and receives the first row of the response.',
            unit: 'ms',
            valueType: 1,
            advice: {
              explicitBucketBoundaries: [
                0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10, 13,
                16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250, 300,
                400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000, 50000,
                100000,
              ],
            },
          },
          aggregationTemporality: 1,
          dataPointType: 0,
          dataPoints: [
            {
              attributes: {
                finalOperationStatus: 0,
                streamingOperation: 'true',
                metricsCollectorData: {
                  instanceId: 'fakeInstanceId',
                  table: 'fakeTableId',
                  cluster: 'fake-cluster3',
                  zone: 'us-west1-c',
                  methodName: 'readRows',
                  clientUid: 'fake-uuid',
                },
                clientName: 'nodejs-bigtable',
                projectId: 'my-project',
              },
              startTime: [123, 789],
              endTime: [456, 789],
              value: {
                min: 5000,
                max: 5000,
                sum: 5000,
                buckets: {
                  boundaries: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                  counts: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                    0, 0,
                  ],
                },
                count: 1,
              },
            },
          ],
        },
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/server_latencies',
            type: 'HISTOGRAM',
            description:
              'Latencies between the time when the Google frontend receives an RPC and when it sends the first byte of the response.',
            unit: 'ms',
            valueType: 1,
            advice: {
              explicitBucketBoundaries: [
                0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10, 13,
                16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250, 300,
                400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000, 50000,
                100000,
              ],
            },
          },
          aggregationTemporality: 1,
          dataPointType: 0,
          dataPoints: [
            {
              attributes: {
                streamingOperation: 'true',
                attemptStatus: 4,
                clientName: 'nodejs-bigtable',
                metricsCollectorData: {
                  instanceId: 'fakeInstanceId',
                  table: 'fakeTableId',
                  cluster: 'fake-cluster3',
                  zone: 'us-west1-c',
                  methodName: 'readRows',
                  clientUid: 'fake-uuid',
                },
                projectId: 'my-project',
              },
              startTime: [123, 789],
              endTime: [456, 789],
              value: {
                min: 101,
                max: 101,
                sum: 101,
                buckets: {
                  boundaries: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                  counts: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0,
                  ],
                },
                count: 1,
              },
            },
            {
              attributes: {
                streamingOperation: 'true',
                attemptStatus: 0,
                clientName: 'nodejs-bigtable',
                metricsCollectorData: {
                  instanceId: 'fakeInstanceId',
                  table: 'fakeTableId',
                  cluster: 'fake-cluster3',
                  zone: 'us-west1-c',
                  methodName: 'readRows',
                  clientUid: 'fake-uuid',
                },
                projectId: 'my-project',
              },
              startTime: [123, 789],
              endTime: [456, 789],
              value: {
                min: 103,
                max: 103,
                sum: 103,
                buckets: {
                  boundaries: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                  counts: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0,
                  ],
                },
                count: 1,
              },
            },
          ],
        },
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/connectivity_error_count',
            type: 'HISTOGRAM',
            description:
              "The number of requests that failed to reach Google's network. In normal cases, this number is 0. When the number is not 0, it can indicate connectivity issues between the application and the Google network.",
            unit: '',
            valueType: 1,
            advice: {
              explicitBucketBoundaries: [
                0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10, 13,
                16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250, 300,
                400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000, 50000,
                100000,
              ],
            },
          },
          aggregationTemporality: 1,
          dataPointType: 0,
          dataPoints: [
            {
              attributes: {
                streamingOperation: 'true',
                attemptStatus: 4,
                clientName: 'nodejs-bigtable',
                metricsCollectorData: {
                  instanceId: 'fakeInstanceId',
                  table: 'fakeTableId',
                  cluster: 'fake-cluster3',
                  zone: 'us-west1-c',
                  methodName: 'readRows',
                  clientUid: 'fake-uuid',
                },
                projectId: 'my-project',
              },
              startTime: [123, 789],
              endTime: [456, 789],
              value: {
                min: 0,
                max: 0,
                sum: 0,
                buckets: {
                  boundaries: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                  counts: [
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0,
                  ],
                },
                count: 1,
              },
            },
            {
              attributes: {
                streamingOperation: 'true',
                attemptStatus: 0,
                clientName: 'nodejs-bigtable',
                metricsCollectorData: {
                  instanceId: 'fakeInstanceId',
                  table: 'fakeTableId',
                  cluster: 'fake-cluster3',
                  zone: 'us-west1-c',
                  methodName: 'readRows',
                  clientUid: 'fake-uuid',
                },
                projectId: 'my-project',
              },
              startTime: [123, 789],
              endTime: [456, 789],
              value: {
                min: 0,
                max: 0,
                sum: 0,
                buckets: {
                  boundaries: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    13, 16, 20, 25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250,
                    300, 400, 500, 650, 800, 1000, 2000, 5000, 10000, 20000,
                    50000, 100000,
                  ],
                  counts: [
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0,
                  ],
                },
                count: 1,
              },
            },
          ],
        },
      ],
    },
  ],
};
