import * as assert from 'assert';
import {describe} from 'mocha';
import {exportInput} from './export-input-fixture';
import {
  metricsToRequest,
} from '../../src/client-side-metrics/exporter';

// TODO: Generate the export code
describe.only('Bigtable/metricsToRequest', () => {
  it('Converts a counter and a histogram to the cloud monitoring format', () => {
    const expectedRequest = {
      name: 'projects/some-project',
      timeSeries: [
        {
          metric: {
            type: 'bigtable.googleapis.com/internal/client/operation_latencies',
            labels: {
              app_profile: 'fake-app-profile-id',
              client_name: 'nodejs-bigtable/5.1.2',
              method: 'readRows',
              finalOperationStatus: '0',
              streaming: 'STREAMING',
            },
          },
          resource: {
            type: 'bigtable_client_raw',
            labels: {
              cluster: 'fake-cluster3',
              instance: 'emulator-test-instance',
              project_id: 'some-project',
              table: 'my-table',
              zone: 'us-west1-c\u0012',
            },
          },
          metricKind: 'CUMULATIVE',
          valueType: 'DISTRIBUTION',
          points: [
            {
              interval: {
                endTime: {
                  seconds: 1738946034,
                  nanos: 948000000,
                },
                startTime: {
                  seconds: 1738946024,
                  nanos: 951000000,
                },
              },
              value: {
                distributionValue: {
                  count: '99',
                  mean: 121,
                  bucketOptions: {
                    explicitBuckets: {
                      bounds: [
                        0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500,
                        5000, 7500, 10000,
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
                    '93',
                    '0',
                    '5',
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
            type: 'bigtable.googleapis.com/internal/client/retry_count',
            labels: {
              app_profile: 'fake-app-profile-id',
              client_name: 'nodejs-bigtable/5.1.2',
              method: 'readRows',
              finalOperationStatus: '0',
              streaming: 'STREAMING',
            },
          },
          resource: {
            type: 'bigtable_client_raw',
            labels: {
              cluster: 'fake-cluster3',
              instance: 'emulator-test-instance',
              project_id: 'some-project',
              table: 'my-table',
              zone: 'us-west1-c\u0012',
            },
          },
          metricKind: 'CUMULATIVE',
          valueType: 'DISTRIBUTION',
          points: [
            {
              interval: {
                endTime: {
                  nanos: 948000000,
                  seconds: 1738946034,
                },
                startTime: {
                  nanos: 951000000,
                  seconds: 1738946024,
                },
              },
              value: {
                distributionValue: {
                  count: '99',
                  mean: 0,
                  bucketOptions: {
                    explicitBuckets: {
                      bounds: [
                        0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500,
                        5000, 7500, 10000,
                      ],
                    },
                  },
                  bucketCounts: [
                    '99',
                    '0',
                    '0',
                    '0',
                    '0',
                    '0',
                    '0',
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
    const actualRequest = metricsToRequest(exportInput);
    assert.deepStrictEqual(actualRequest, expectedRequest);
  });
});
