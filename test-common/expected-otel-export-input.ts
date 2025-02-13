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
            advice: {},
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
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
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
            advice: {},
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
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
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
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                },
                count: 1,
              },
            },
          ],
        },
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/retry_count',
            type: 'HISTOGRAM',
            description:
              'A counter that records the number of attempts that an operation required to complete. Under normal circumstances, this value is empty.',
            unit: '',
            valueType: 1,
            advice: {},
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
                min: 1,
                max: 1,
                sum: 1,
                buckets: {
                  boundaries: [
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
                count: 1,
              },
            },
          ],
        },
        {
          descriptor: {
            name: 'bigtable.googleapis.com/internal/client/first_response_latencies',
            type: 'HISTOGRAM',
            description:
              'Latencies from when a client sends a request and receives the first row of the response.',
            unit: 'ms',
            valueType: 1,
            advice: {},
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
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
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
            advice: {},
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
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
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
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
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
            advice: {},
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
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
