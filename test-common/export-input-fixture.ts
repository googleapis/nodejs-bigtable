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
                zone: 'us-central1-f',
                methodName: 'Bigtable.ReadRows',
                clientName: 'nodejs-bigtable/5.1.2',
                clientUid: 'fake-uuid',
              },
              startTime: [fakeStartTime, 951000000],
              endTime: [fakeEndTime, 948000000],
              value: {
                min: 76,
                max: 1337,
                sum: 11979,
                buckets: {
                  boundaries: [
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
                  counts: [
                    0, //1
                    0, //2
                    0, //3
                    0, //4
                    0, //5
                    0, //6
                    0, //7
                    0, //8
                    0, //9
                    0, //10
                    0, //11
                    0, //12
                    0, //13
                    0, //14
                    0, //15
                    0, //16
                    0, //17
                    0, //18
                    0, //19
                    0, //20
                    0, //21
                    0, //22
                    0, //23
                    0, //24
                    1, //25
                    0, //26
                    0, //27
                    0, //28
                    0, //29
                    0, //30
                    0, //31
                    0, //32
                    0, //33
                    0, //34
                    0, //35
                    0, //36
                    0, //37
                    0, //38
                    0, //39
                    0, //40
                    0, //41
                    0, //42
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
