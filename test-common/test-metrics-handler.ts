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
  IMetricsHandler,
  OnAttemptCompleteData,
  OnOperationCompleteData,
} from '../src/client-side-metrics/metrics-handler';

/**
 * A test implementation of the IMetricsHandler interface.  Used for testing purposes.
 * It logs the metrics and attributes received by the onOperationComplete and onAttemptComplete methods.
 */
export class TestMetricsHandler implements IMetricsHandler {
  private messages: {value: string};
  requestsHandled: (OnOperationCompleteData | OnAttemptCompleteData)[] = [];

  constructor(messages: {value: string}) {
    this.messages = messages;
  }
  /**
   * Logs the metrics and attributes received for an operation completion.
   * @param {OnOperationCompleteData} data Metrics related to the completed operation.
   */
  onOperationComplete(data: OnOperationCompleteData) {
    this.requestsHandled.push(data);
    data.client_name = 'nodejs-bigtable';
    this.messages.value += 'Recording parameters for onOperationComplete:\n';
    this.messages.value += `${JSON.stringify(data)}\n`;
  }

  /**
   * Logs the metrics and attributes received for an attempt completion.
   * @param {OnOperationCompleteData} data Metrics related to the completed attempt.
   */
  onAttemptComplete(data: OnAttemptCompleteData) {
    this.requestsHandled.push(data);
    data.client_name = 'nodejs-bigtable';
    this.messages.value += 'Recording parameters for onAttemptComplete:\n';
    this.messages.value += `${JSON.stringify(data)}\n`;
  }
}
