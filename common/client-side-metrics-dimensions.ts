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

/**
 * Dimensions (labels) associated with a Bigtable metric. These
 * dimensions provide context for the metric values.
 */
export interface Dimensions {
  projectId: string;
  instanceId: string;
  table: string;
  cluster?: string | null;
  zone?: string | null;
  appProfileId?: string;
  methodName: string;
  attemptStatus?: string;
  finalOperationStatus?: string;
  streamingOperation?: string;
  clientName: string;
}

export function dimensionsToString(d: Dimensions) {
  const p = (dimension?: string | null) => (dimension ? dimension : '');
  return `${p(d.projectId)};${p(d.instanceId)};${p(d.table)};${p(d.cluster)};${p(d.zone)};${p(d.appProfileId)};${p(d.methodName)};${p(d.attemptStatus)};${p(d.finalOperationStatus)};${p(d.streamingOperation)};${p(d.clientName)}`;
}
