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
                streamingOperation: 'STREAMING',
                projectId: 'some-project',
                instanceId: 'emulator-test-instance',
                table: 'my-table',
                cluster: 'fake-cluster3',
                zone: 'us-west1-c\u0012',
                methodName: 'readRows',
                clientName: 'nodejs-bigtable/5.1.2',
              },
              startTime: [1738946024, 951000000],
              endTime: [1738946034, 948000000],
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
            name: 'bigtable.googleapis.com/internal/client/retry_count',
            type: 'HISTOGRAM',
            description:
              'A counter that records the number of attempts that an operation required to complete. Under normal circumstances, this value is empty.',
            unit: 'ms',
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
                streamingOperation: 'STREAMING',
                projectId: 'some-project',
                instanceId: 'emulator-test-instance',
                table: 'my-table',
                cluster: 'fake-cluster3',
                zone: 'us-west1-c\u0012',
                methodName: 'readRows',
                clientName: 'nodejs-bigtable/5.1.2',
              },
              startTime: [1738946024, 951000000],
              endTime: [1738946034, 948000000],
              value: {
                min: 0,
                max: 0,
                sum: 0,
                buckets: {
                  boundaries: [
                    0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
                    7500, 10000,
                  ],
                  counts: [99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
