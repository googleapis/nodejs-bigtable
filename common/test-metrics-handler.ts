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

import {WithLogger} from './logger';
import {
  AttemptLatencyAttributes,
  ConnectivityErrorCountAttributes,
  FirstResponseLatencyAttributes,
  OperationLatencyAttributes,
  RetryCountAttributes,
  ServerLatenciesAttributes,
} from './client-side-metrics-attributes';

/**
 * A test implementation of the IMetricsHandler interface.  Used for testing purposes.
 * It logs the metrics and attributes received by the onOperationComplete and onAttemptComplete methods.
 */
export class TestMetricsHandler extends WithLogger {
  onRecordAttemptLatency(
    attemptLatency: number,
    attributes: AttemptLatencyAttributes
  ) {
    this.logger.log(
      `Recording parameters for AttemptLatency: ${attemptLatency}:`
    );
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }

  onRecordConnectivityErrorCount(
    connectivityErrorCount: number,
    attributes: ConnectivityErrorCountAttributes
  ) {
    this.logger.log(
      `Recording parameters for ConnectivityErrorCount: ${connectivityErrorCount}:`
    );
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }

  onRecordServerLatency(
    serverLatency: number,
    attributes: ServerLatenciesAttributes
  ) {
    this.logger.log(`Recording parameters for ServerLatency: ${serverLatency}`);
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }

  onRecordOperationLatency(
    operationLatency: number,
    attributes: OperationLatencyAttributes
  ) {
    this.logger.log(
      `Recording parameters for OperationLatency: ${operationLatency}`
    );
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }

  onRecordRetryCount(retryCount: number, attributes: RetryCountAttributes) {
    this.logger.log(`Recording parameters for RetryCount: ${retryCount}`);
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }

  onRecordFirstResponseLatency(
    firstResponseLatency: number,
    attributes: FirstResponseLatencyAttributes
  ) {
    this.logger.log(
      `Recording parameters for FirstResponseLatency: ${firstResponseLatency}`
    );
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }
}
