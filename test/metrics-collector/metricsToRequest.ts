import * as assert from 'assert';
import {describe} from 'mocha';
import {
  exportInput,
  fakeEndTime,
  fakeStartTime,
} from '../../test-common/export-input-fixture';
import {metricsToRequest} from '../../src/client-side-metrics/exporter';

// TODO: Generate the export code
describe('Bigtable/metricsToRequest', () => {
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
              status: '0',
              streaming: 'true',
            },
          },
          resource: {
            type: 'bigtable_client_raw',
            labels: {
              cluster: 'fake-cluster3',
              instance: 'emulator-test-instance',
              project_id: 'some-project',
              table: 'my-table',
              zone: 'us-west1-c',
            },
          },
          metricKind: 'CUMULATIVE',
          valueType: 'DISTRIBUTION',
          points: [
            {
              interval: {
                endTime: {
                  seconds: fakeEndTime,
                  nanos: 948000000,
                },
                startTime: {
                  seconds: fakeStartTime,
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
      ],
    };
    const actualRequest = metricsToRequest(exportInput);
    assert.deepStrictEqual(actualRequest, expectedRequest);
  });
});
