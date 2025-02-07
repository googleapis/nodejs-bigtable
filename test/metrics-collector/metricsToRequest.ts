import {describe} from 'mocha';

// TODO: Generate the export code
describe('Bigtable/metricsToRequest', () => {
  it('Converts a counter and a histogram to the cloud monitoring format', () => {
    const exportArgs = {
      resource: {
        _attributes: {
          'service.name': 'Cloud Bigtable Table',
          'telemetry.sdk.language': 'nodejs',
          'telemetry.sdk.name': 'opentelemetry',
          'telemetry.sdk.version': '1.30.0',
          'cloud.provider': 'gcp',
          'cloud.platform': 'gce_instance',
          'cloud.resource_manager.project_id': 'cloud-native-db-dpes-shared',
          'monitored_resource.type': 'bigtable_client_raw',
          'monitored_resource.labels.project_id': 'cloud-native-db-dpes-shared',
          'monitored_resource.labels.instance_id': 'dan-bigtable-instance',
          'monitored_resource.labels.table_id': 'events-table',
        },
        asyncAttributesPending: false,
        _syncAttributes: {
          'service.name': 'Cloud Bigtable Table',
          'telemetry.sdk.language': 'nodejs',
          'telemetry.sdk.name': 'opentelemetry',
          'telemetry.sdk.version': '1.30.0',
          'cloud.provider': 'gcp',
          'cloud.platform': 'gce_instance',
          'cloud.resource_manager.project_id': 'cloud-native-db-dpes-shared',
          'monitored_resource.type': 'bigtable_client_raw',
          'monitored_resource.labels.project_id': 'cloud-native-db-dpes-shared',
          'monitored_resource.labels.instance_id': 'dan-bigtable-instance',
          'monitored_resource.labels.table_id': 'events-table',
        },
      },
      scopeMetrics: [
        {
          scope: {
            name: 'sample_metric',
            version: '',
          },
          metrics: [
            {
              descriptor: {
                name: 'bigtable.googleapis.com/internal/client/metric91',
                type: 'COUNTER',
                description: '',
                unit: '',
                valueType: 1,
                advice: {},
              },
              aggregationTemporality: 1,
              dataPointType: 3,
              dataPoints: [
                {
                  attributes: {
                    key: 'value',
                  },
                  startTime: [1738789130, 855000000],
                  endTime: [1738789140, 857000000],
                  value: 15,
                },
              ],
              isMonotonic: true,
            },
            {
              descriptor: {
                name: 'bigtable.googleapis.com/internal/client/metric92',
                type: 'HISTOGRAM',
                description:
                  'Latencies introduced when the client blocks the sending of more requests to the server because of too many pending requests in a bulk operation.',
                unit: 'ms',
                valueType: 1,
                advice: {},
              },
              aggregationTemporality: 1,
              dataPointType: 0,
              dataPoints: [
                {
                  attributes: {
                    key: 'value',
                  },
                  startTime: [1738789130, 855000000],
                  endTime: [1738789140, 857000000],
                  value: {
                    min: 7,
                    max: 7,
                    sum: 7,
                    buckets: {
                      boundaries: [
                        0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500,
                        5000, 7500, 10000,
                      ],
                      counts: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    const expectedRequest = {
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
              streaming: 'true',
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
                  seconds: Math.floor(Date.now() / 1000),
                },
                startTime: {
                  seconds: Math.floor(Date.now() / 1000) - 1000,
                },
              },
              value: {
                distributionValue: {
                  count: '1',
                  mean: 376.177845,
                  bucketOptions: {
                    explicitBuckets: {
                      bounds: [
                        0, 1, 2, 3, 4, 5, 6, 8, 10, 13, 16, 20, 25, 30, 40, 50,
                        65, 80, 100, 130, 160, 200, 250, 300, 400, 500, 650,
                        800, 1000, 2000, 5000, 10000, 20000, 50000, 100000,
                        200000, 400000, 800000, 1600000, 3200000,
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
  });
});
