import * as assert from 'assert';
import {describe} from 'mocha';
import {
  exportInput,
  fakeEndTime,
  fakeStartTime,
} from '../../test-common/export-input-fixture';
import {metricsToRequest} from '../../src/client-side-metrics/exporter';

export const expectedRequest = {
  name: 'projects/some-project',
  timeSeries: [
    {
      metric: {
        type: 'bigtable.googleapis.com/internal/client/operation_latencies',
        labels: {
          app_profile: 'fake-app-profile-id',
          client_name: 'nodejs-bigtable/5.1.2',
          client_uid: 'fake-uuid',
          method: 'Bigtable.ReadRows',
          status: '0',
          streaming: 'true',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'fake-cluster3',
          instance: 'fakeInstanceId',
          project_id: 'some-project',
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
              seconds: fakeEndTime,
            },
            startTime: {
              seconds: fakeStartTime,
            },
          },
          value: {
            distributionValue: {
              count: '1',
              mean: 11979,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, // 1
                    0.01, // 2
                    0.05, // 3
                    0.1, // 4
                    0.3, // 5
                    0.6, // 6
                    0.8, // 7
                    1, // 8
                    2, // 9
                    3, // 10
                    4, // 11
                    5, // 12
                    6, // 13
                    8, // 14
                    10, // 15
                    13, // 16
                    16, // 17
                    20, // 18
                    25, // 19
                    30, // 20
                    40, // 21
                    50, // 22
                    65, // 23
                    80, // 24
                    100, // 25
                    130, // 26
                    160, // 27
                    200, // 28
                    250, // 29
                    300, // 30
                    400, // 31
                    500, // 32
                    650, // 33
                    800, // 34
                    1000, // 35
                    2000, // 36
                    5000, // 37
                    10000, // 38
                    20000, // 39
                    50000, // 40
                    100000, // 41
                  ],
                },
              },
              bucketCounts: [
                '0', //1
                '0', //2
                '0', //3
                '0', //4
                '0', //5
                '0', //6
                '0', //7
                '0', //8
                '0', //9
                '0', //10
                '0', //11
                '0', //12
                '0', //13
                '0', //14
                '0', //15
                '0', //16
                '0', //17
                '0', //18
                '0', //19
                '0', //20
                '0', //21
                '0', //22
                '0', //23
                '0', //24
                '1', //25
                '0', //26
                '0', //27
                '0', //28
                '0', //29
                '0', //30
                '0', //31
                '0', //32
                '0', //33
                '0', //34
                '0', //35
                '0', //36
                '0', //37
                '0', //38
                '0', //39
                '0', //40
                '0', //41
                '0', //42
              ],
            },
          },
        },
      ],
      unit: 'ms',
    },
  ],
};

// TODO: Generate the export code
describe('Bigtable/metricsToRequest', () => {
  it('Converts a counter and a histogram to the cloud monitoring format', () => {
    const actualRequest = metricsToRequest(exportInput);
    assert.deepStrictEqual(actualRequest, expectedRequest);
  });
});
