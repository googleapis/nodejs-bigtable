export const expectedOtelExportConvertedValue = {
  name: 'projects/my-project',
  timeSeries: [
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/operation_latencies',
        labels: {
          method: 'Bigtable.ReadRows',
          client_uid: 'fake-uuid',
          client_name: 'nodejs-bigtable',
          status: '0',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'fake-cluster3',
          instance: 'fakeInstanceId',
          project_id: 'my-project',
          table: 'fakeTableId',
          zone: 'us-west1-c',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
              nanos: 789,
            },
            startTime: {
              seconds: 123,
              nanos: 789,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 6000,
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
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '1', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0'
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
          method: 'Bigtable.ReadRows',
          client_uid: 'fake-uuid',
          client_name: 'nodejs-bigtable',
          status: '4',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'fake-cluster3',
          instance: 'fakeInstanceId',
          project_id: 'my-project',
          table: 'fakeTableId',
          zone: 'us-west1-c',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
              nanos: 789,
            },
            startTime: {
              seconds: 123,
              nanos: 789,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 2000,
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
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '1', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0'
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
          method: 'Bigtable.ReadRows',
          client_uid: 'fake-uuid',
          client_name: 'nodejs-bigtable',
          status: '0',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'fake-cluster3',
          instance: 'fakeInstanceId',
          project_id: 'my-project',
          table: 'fakeTableId',
          zone: 'us-west1-c',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
              nanos: 789,
            },
            startTime: {
              seconds: 123,
              nanos: 789,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 1000,
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
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '1',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0'
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
          method: 'Bigtable.ReadRows',
          client_uid: 'fake-uuid',
          client_name: 'nodejs-bigtable',
          status: '0',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'fake-cluster3',
          instance: 'fakeInstanceId',
          project_id: 'my-project',
          table: 'fakeTableId',
          zone: 'us-west1-c',
        },
      },
      valueType: 'INT64',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
              nanos: 789,
            },
            startTime: {
              seconds: 123,
              nanos: 789,
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
        type: 'bigtable.googleapis.com/internal/client/application_latencies',
        labels: {
          method: 'Bigtable.ReadRows',
          client_uid: 'fake-uuid',
          client_name: 'nodejs-bigtable',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'fake-cluster3',
          instance: 'fakeInstanceId',
          project_id: 'my-project',
          table: 'fakeTableId',
          zone: 'us-west1-c',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
              nanos: 789,
            },
            startTime: {
              seconds: 123,
              nanos: 789,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 1256,
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
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '1',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0'
              ],
            },
          },
        },
      ],
      unit: 'ms',
    },
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/first_response_latencies',
        labels: {
          method: 'Bigtable.ReadRows',
          client_uid: 'fake-uuid',
          client_name: 'nodejs-bigtable',
          status: '0',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'fake-cluster3',
          instance: 'fakeInstanceId',
          project_id: 'my-project',
          table: 'fakeTableId',
          zone: 'us-west1-c',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
              nanos: 789,
            },
            startTime: {
              seconds: 123,
              nanos: 789,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 2000,
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
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0',    '0',
                '0', '1',    '0', '0', '0', '0',    '0',
                '0', '0',    '0', '0', '0', '0'
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
          method: 'Bigtable.ReadRows',
          client_uid: 'fake-uuid',
          client_name: 'nodejs-bigtable',
          status: '4',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'fake-cluster3',
          instance: 'fakeInstanceId',
          project_id: 'my-project',
          table: 'fakeTableId',
          zone: 'us-west1-c',
        },
      },
      metricKind: 'CUMULATIVE',
      valueType: 'DISTRIBUTION',
      points: [
        {
          interval: {
            endTime: {
              seconds: 456,
              nanos: 789,
            },
            startTime: {
              seconds: 123,
              nanos: 789,
            },
          },
          value: {
            distributionValue: {
              count: '1',