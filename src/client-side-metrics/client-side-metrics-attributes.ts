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

import {grpc} from 'google-gax';

/**
 * Standard attributes common to various Bigtable client-side metrics. These attributes provide
 * contextual information about the Bigtable environment and operation.
 */
interface StandardAttributes {
  projectId: string;
  instanceId: string;
  table: string;
  cluster?: string;
  zone?: string;
  appProfileId?: string;
  methodName: string;
  clientName: string;
}

export enum StreamingState {
  STREAMING = 'streaming',
  UNARY = 'unary',
}

/**
 * Attributes associated with operation latency metrics for Bigtable client operations.
 * These attributes provide context about the Bigtable environment and the completed operation.
 */
interface OperationLatencyAttributes extends StandardAttributes {
  finalOperationStatus: grpc.status;
  streamingOperation: StreamingState;
}

/**
 * Attributes associated with attempt latency metrics for Bigtable client operations.
 * These attributes provide context about the Bigtable environment, the specific attempt, and whether the operation was streaming.
 */
interface AttemptLatencyAttributes extends StandardAttributes {
  attemptStatus: grpc.status;
  streamingOperation: StreamingState;
}

/**
 * Attributes associated with retry count metrics for Bigtable client operations.  These attributes
 * provide context about the Bigtable environment and the final status of the operation.
 */
interface RetryCountAttributes extends StandardAttributes {
  finalOperationStatus: grpc.status;
}

/**
 * Attributes associated with application blocking latencies for Bigtable client operations.
 * These attributes provide context about the Bigtable environment and the operation being performed.
 */
type ApplicationBlockingLatenciesAttributes = StandardAttributes;

/**
 * Attributes associated with first response latency metrics for Bigtable client operations.
 * These attributes provide context about the Bigtable environment and the final status of the operation.
 */
interface FirstResponseLatencyAttributes extends StandardAttributes {
  finalOperationStatus: grpc.status;
}

/**
 * Attributes associated with server latency metrics for Bigtable client operations.
 * These attributes provide context about the Bigtable environment, the specific attempt, and whether the operation was streaming.
 */
interface ServerLatenciesAttributes extends StandardAttributes {
  attemptStatus: grpc.status;
  streamingOperation: StreamingState;
}

/**
 * Attributes associated with connectivity error count metrics for Bigtable client operations.
 * These attributes provide context about the Bigtable environment and the status of the attempt.
 */
interface ConnectivityErrorCountAttributes extends StandardAttributes {
  attemptStatus: grpc.status;
}

/**
 * Attributes associated with client blocking latencies for Bigtable client operations.
 * These attributes provide context about the Bigtable environment and the operation being performed.
 */
type ClientBlockingLatenciesAttributes = StandardAttributes;

/**
 * Attributes associated with the completion of a Bigtable operation. These
 * attributes provide context about the Bigtable environment, the completed
 * operation, and its final status.  They are used for recording metrics such as
 * operation latency, first response latency, and retry count.
 */
export type OnOperationCompleteAttributes =
  | OperationLatencyAttributes
  | FirstResponseLatencyAttributes
  | RetryCountAttributes;

/**
 * Attributes associated with the completion of a single attempt of a Bigtable
 * operation.  These attributes provide context about the Bigtable environment,
 * the specific attempt, its status, and whether the operation was streaming. They
 * are used for recording metrics such as attempt latency, server latency, and
 * connectivity errors.
 */
export type OnAttemptCompleteAttributes =
  | AttemptLatencyAttributes
  | ConnectivityErrorCountAttributes
  | ServerLatenciesAttributes
  | ClientBlockingLatenciesAttributes;

/**
 * Represents the names of Bigtable methods. These are used as attributes for
 * metrics, allowing for differentiation of performance by method.
 */
export enum MethodName {
  READ_ROWS = 'readRows',
  MUTATE_ROW = 'mutateRow',
  CHECK_AND_MUTATE_ROW = 'checkAndMutateRow',
  READ_MODIFY_WRITE_ROW = 'readModifyWriteRow',
  SAMPLE_ROW_KEYS = 'sampleRowKeys',
  MUTATE_ROWS = 'mutateRows',
}
