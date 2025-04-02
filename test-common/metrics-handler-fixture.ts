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

export const expectedRequestsHandled = [
  {
    attemptLatency: 4000,
    serverLatency: 101,
    connectivityErrorCount: 0,
    streaming: 'true',
    status: '4',
    client_name: 'nodejs-bigtable',
    metricsCollectorData: {
      instanceId: 'fakeInstanceId',
      table: 'fakeTableId',
      cluster: 'fake-cluster3',
      zone: 'us-west1-c',
      method: 'Bigtable.ReadRows',
      client_uid: 'fake-uuid',
    },
    projectId: 'my-project',
  },
  {
    attemptLatency: 3000,
    serverLatency: 103,
    connectivityErrorCount: 0,
    streaming: 'true',
    status: '0',
    client_name: 'nodejs-bigtable',
    metricsCollectorData: {
      instanceId: 'fakeInstanceId',
      table: 'fakeTableId',
      cluster: 'fake-cluster3',
      zone: 'us-west1-c',
      method: 'Bigtable.ReadRows',
      client_uid: 'fake-uuid',
    },
    projectId: 'my-project',
  },
  {
    status: '0',
    streaming: 'true',
    metricsCollectorData: {
      instanceId: 'fakeInstanceId',
      table: 'fakeTableId',
      cluster: 'fake-cluster3',
      zone: 'us-west1-c',
      method: 'Bigtable.ReadRows',
      client_uid: 'fake-uuid',
    },
    client_name: 'nodejs-bigtable',
    projectId: 'my-project',
    operationLatency: 10000,
    applicationLatencies: [1000, 1000],
    retryCount: 1,
    firstResponseLatency: 2000,
  },
];
