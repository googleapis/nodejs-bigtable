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

import {GCPMetricsHandler} from './gcp-metrics-handler';
import {ClientOptions} from 'google-gax';

/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export class ClientSideMetricsConfigManager {
  private static gcpHandlerStore = new Map();

  static getGcpHandlerForProject(
    projectId: string,
    options: ClientOptions,
  ): GCPMetricsHandler {
    // share a single GCPMetricsHandler for each project, to avoid sampling errors
    if (this.gcpHandlerStore.has(projectId)) {
      return this.gcpHandlerStore.get(projectId)!;
    } else {
      const newHandler = new GCPMetricsHandler(options);
      this.gcpHandlerStore.set(projectId, newHandler);
      return newHandler;
    }
  }
}
