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

import {
  MethodName,
  StreamingState,
} from '../src/client-side-metrics/client-side-metrics-attributes';

export const expectedRequestsHandled = [
  {
    metrics: {
      attemptLatency: 2000,
      serverLatency: 101,
      connectivityErrorCount: 0,
    },
    attributes: {
      streamingOperation: StreamingState.STREAMING,
      attemptStatus: 4,
      clientName: 'nodejs-bigtable',
      metricsCollectorData: {
        appProfileId: undefined,
        instanceId: 'fakeInstanceId',
        table: 'fakeTableId',
        cluster: 'fake-cluster3',
        zone: 'us-west1-c',
        methodName: MethodName.READ_ROWS,
        clientUid: 'fake-uuid',
      },
      projectId: 'my-project',
    },
  },
  {
    metrics: {
      attemptLatency: 2000,
      serverLatency: 103,
      connectivityErrorCount: 0,
    },
    attributes: {
      streamingOperation: StreamingState.STREAMING,
      attemptStatus: 0,
      clientName: 'nodejs-bigtable',
      metricsCollectorData: {
        appProfileId: undefined,
        instanceId: 'fakeInstanceId',
        table: 'fakeTableId',
        cluster: 'fake-cluster3',
        zone: 'us-west1-c',
        methodName: MethodName.READ_ROWS,
        clientUid: 'fake-uuid',
      },
      projectId: 'my-project',
    },
  },
  {
    metrics: {
      operationLatency: 7000,
      retryCount: 1,
      firstResponseLatency: 5000,
    },
    attributes: {
      finalOperationStatus: 0,
      streamingOperation: StreamingState.STREAMING,
      metricsCollectorData: {
        appProfileId: undefined,
        instanceId: 'fakeInstanceId',
        table: 'fakeTableId',
        cluster: 'fake-cluster3',
        zone: 'us-west1-c',
        methodName: MethodName.READ_ROWS,
        clientUid: 'fake-uuid',
      },
      clientName: 'nodejs-bigtable',
      projectId: 'my-project',
    },
  },
];
