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
          client_name: 'go-bigtable/1.35.0',
          client_uid:
            'go-9f4f393d-c57f-457c-9445-550b8a6f7d00@bahaaiman-ct-01.c.googlers.com',
          method: 'Bigtable.ReadRows',
          status: 'OK',
        },
      },
      resource: {
        type: 'bigtable_client_raw',
        labels: {
          cluster: 'fake-cluster3',
          instance: 'emulator-test-instance2',
          project_id: 'some-project',
          table: 'my-table',
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
              mean: 376.103605,
              bucketOptions: {
                explicitBuckets: {
                  bounds: [
                    0, 0.01, 0.05, 0.1, 0.3, 0.6, 0.8, 1, 2, 3, 4, 5, 6, 8, 10,
                    25, 30, 40, 50, 65, 80, 100, 130, 160, 200, 250, 300, 400,
                    800, 1000, 2000, 5000, 10000, 20000, 50000, 100000,
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
