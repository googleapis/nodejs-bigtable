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

interface OperationLatencyAttributes extends StandardAttributes {
  finalOperationStatus: FinalOperationStatus;
  StreamingOperation: boolean;
}

interface AttemptLatencyAttributes extends StandardAttributes {
  attemptStatus: AttemptStatus;
  streamingOperation: boolean;
}

interface RetryCountAttributes extends StandardAttributes {
  finalOperationStatus: FinalOperationStatus;
}

type ApplicationBlockingLatenciesAttributes = StandardAttributes;

interface FirstResponseLatencyAttributes extends StandardAttributes {
  finalOperationStatus: FinalOperationStatus;
}

interface ServerLatenciesAttributes extends StandardAttributes {
  attemptStatus: AttemptStatus;
  streamingOperation: boolean;
}

interface ConnectivityErrorCountAttributes extends StandardAttributes {
  attemptStatus: AttemptStatus;
}

type ClientBlockingLatenciesAttributes = StandardAttributes;

export interface AttemptOnlyAttributes {
  attemptStatus: AttemptStatus;
  streamingOperation: boolean;
}

/**
 * Information about a Bigtable operation.
 */
export interface OperationOnlyAttributes {
  /**
   * The final status of the operation (e.g., 'OK', 'ERROR').
   */
  finalOperationStatus: FinalOperationStatus;
  streamingOperation: boolean;
}

export type FinalOperationStatus = grpc.status;

export type AttemptStatus = grpc.status;

export type OnOperationCompleteAttributes =
  | OperationLatencyAttributes
  | FirstResponseLatencyAttributes
  | RetryCountAttributes;

export type OnAttemptCompleteAttributes =
  | AttemptLatencyAttributes
  | ConnectivityErrorCountAttributes
  | ServerLatenciesAttributes
  | ClientBlockingLatenciesAttributes;

export interface OnAttemptCompleteInfo {
  connectivityErrorCount: number;
  /**
   * The final status of the operation (e.g., 'OK', 'ERROR').
   */
  finalOperationStatus: FinalOperationStatus;
  /**
   * Whether the operation is a streaming operation or not.
   */
  streamingOperation: boolean;
  /**
   * The attempt status of the operation.
   */
  attemptStatus: AttemptStatus;
}

export enum MethodName {
  READ_ROWS = 'readRows',
  MUTATE_ROW = 'mutateRow',
  CHECK_AND_MUTATE_ROW = 'checkAndMutateRow',
  READ_MODIFY_WRITE_ROW = 'readModifyWriteRow',
  SAMPLE_ROW_KEYS = 'sampleRowKeys',
  MUTATE_ROWS = 'mutateRows',
}
