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
  OnAttemptCompleteAttributes,
  OnOperationCompleteAttributes,
} from '../../common/client-side-metrics-attributes';

/**
 * The interfaces below use undefined instead of null to indicate a metric is
 * not available yet. The benefit of this is that new metrics can be added
 * without requiring users to change the methods in their metrics handler.
 */

/**
 * Metrics related to the completion of a Bigtable operation.
 */
export interface OnOperationCompleteMetrics {
  operationLatency: number;
  retryCount?: number;
}

/**
 * Metrics related to the completion of a single attempt of a Bigtable operation.
 */
export interface OnAttemptCompleteMetrics {
  attemptLatency: number;
  serverLatency?: number;
  firstResponseLatency?: number;
  connectivityErrorCount: number;
}

// TODO: Trim attributes so only necessary attributes are required.
/**
 * An interface for handling client-side metrics related to Bigtable operations.
 * Implementations of this interface can define how metrics are recorded and processed.
 */
export interface IMetricsHandler {
  /**
   * Called when an operation completes (successfully or unsuccessfully).
   * @param {OnOperationCompleteMetrics} metrics Metrics related to the completed operation.
   * @param {OnOperationCompleteAttributes} attributes Attributes associated with the completed operation.
   */
  onOperationComplete?(
    metrics: OnOperationCompleteMetrics,
    attributes: OnOperationCompleteAttributes
  ): void;
  /**
   * Called when an attempt (e.g., an RPC attempt) completes.
   * @param {OnAttemptCompleteMetrics} metrics Metrics related to the completed attempt.
   * @param {OnAttemptCompleteAttributes} attributes Attributes associated with the completed attempt.
   */
  onAttemptComplete?(
    metrics: OnAttemptCompleteMetrics,
    attributes: OnAttemptCompleteAttributes
  ): void;
}
