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
  OnAttemptCompleteMetrics,
  OnOperationCompleteMetrics,
} from '../src/client-side-metrics/metrics-handler';
import {
  OnAttemptCompleteAttributes,
  OnOperationCompleteAttributes,
} from '../src/client-side-metrics/client-side-metrics-attributes';

/**
 * A test implementation of the IMetricsHandler interface.  Used for testing purposes.
 * It logs the metrics and attributes received by the onOperationComplete and onAttemptComplete methods.
 */
export class TestMetricsHandler {
  private messages: {value: string};

  constructor(messages: {value: string}) {
    this.messages = messages;
  }
  /**
   * Logs the metrics and attributes received for an operation completion.
   * @param {OnOperationCompleteMetrics} metrics Metrics related to the completed operation.
   * @param {Attributes} attributes Attributes associated with the completed operation.
   */
  onOperationComplete(
    metrics: OnOperationCompleteMetrics,
    attributes: OnOperationCompleteAttributes
  ) {
    attributes.clientName = 'nodejs-bigtable';
    this.messages.value += 'Recording parameters for onOperationComplete:\n';
    this.messages.value += `metrics: ${JSON.stringify(metrics)}\n`;
    this.messages.value += `attributes: ${JSON.stringify(attributes)}\n`;
  }

  /**
   * Logs the metrics and attributes received for an attempt completion.
   * @param {OnAttemptCompleteMetrics} metrics Metrics related to the completed attempt.
   * @param {Attributes} attributes Attributes associated with the completed attempt.
   */
  onAttemptComplete(
    metrics: OnAttemptCompleteMetrics,
    attributes: OnAttemptCompleteAttributes
  ) {
    attributes.clientName = 'nodejs-bigtable';
    this.messages.value += 'Recording parameters for onAttemptComplete:\n';
    this.messages.value += `metrics: ${JSON.stringify(metrics)}\n`;
    this.messages.value += `attributes: ${JSON.stringify(attributes)}\n`;
  }
}
