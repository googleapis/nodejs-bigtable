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

interface StandardAttributes {
  projectId: string;
  instanceId: string;
  table: string;
  cluster?: string | null;
  zone?: string | null;
  appProfileId?: string;
  methodName: string;
  clientName: string;
}

/**
 * Information about a Bigtable operation.
 */
export interface OperationOnlyAttributes {
  /**
   * The final status of the operation (e.g., 'OK', 'ERROR').
   */
  finalOperationStatus: string;
  streamingOperation: string;
}

/**
 * Information about a single attempt of a Bigtable operation.
 */
export interface AttemptOnlyAttributes {
  /**
   * The final status of the operation (e.g., 'OK', 'ERROR').
   */
  finalOperationStatus: string; // TODO: enum
  /**
   * Whether the operation is a streaming operation or not.
   */
  streamingOperation: string; // TODO: enum
  /**
   * The attempt status of the operation.
   */
  attemptStatus: string; // TODO: enum
}

export interface OnOperationCompleteAttributes
  extends StandardAttributes,
    OperationOnlyAttributes {
  finalOperationStatus: string;
  streamingOperation: string;
}

export interface OnAttemptCompleteAttributes
  extends StandardAttributes,
    AttemptOnlyAttributes {
  attemptStatus: string;
  finalOperationStatus: string;
  streamingOperation: string;
}
