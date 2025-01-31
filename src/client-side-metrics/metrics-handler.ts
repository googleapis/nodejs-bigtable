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
  AttemptLatencyAttributes,
  ConnectivityErrorCountAttributes,
  FirstResponseLatencyAttributes,
  OperationLatencyAttributes,
  RetryCountAttributes,
  ServerLatenciesAttributes,
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
  firstResponseLatency?: number;
  operationLatency: number;
  retryCount?: number;
}

/**
 * Metrics related to the completion of a single attempt of a Bigtable operation.
 */
export interface OnAttemptCompleteMetrics {
  attemptLatency: number;
  serverLatency?: number;
  connectivityErrorCount: number;
}

/**
 * An interface for handling client-side metrics related to Bigtable operations.
 * Implementations of this interface can define how metrics are recorded and processed.
 */
export interface IMetricsHandler {
  onRecordAttemptLatency?(
    attemptLatency: number,
    attributes: AttemptLatencyAttributes
  ): void;

  onRecordConnectivityErrorCount?(
    connectivityErrorCount: number,
    attributes: ConnectivityErrorCountAttributes
  ): void;

  onRecordServerLatency?(
    serverLatency: number,
    attributes: ServerLatenciesAttributes
  ): void;

  onRecordOperationLatency?(
    operationLatency: number,
    attributes: OperationLatencyAttributes
  ): void;

  onRecordRetryCount?(
    retryCount: number,
    attributes: RetryCountAttributes
  ): void;

  onRecordFirstResponseLatency?(
    firstResponseLatency: number,
    attributes: FirstResponseLatencyAttributes
  ): void;
}
