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
export interface Attributes {
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

/**
 * Converts a Dimensions object to a string representation.
 * This string representation is suitable for use as labels or tags.
 * The order of dimensions in the output string is fixed:
 * projectId;instanceId;table;cluster;zone;appProfileId;methodName;attemptStatus;finalOperationStatus;streamingOperation;clientName
 * If a dimension is null or undefined, the empty string is used.
 * @param {Attributes} a The Dimensions object to convert.
 * @returns A string representation of the dimensions.
 */
export function attributesToString(a: Attributes) {
  const p = (attribute?: string | null) => (attribute ? attribute : '');
  return `${p(a.projectId)};${p(a.instanceId)};${p(a.table)};${p(a.cluster)};${p(a.zone)};${p(a.appProfileId)};${p(a.methodName)};${p(a.attemptStatus)};${p(a.finalOperationStatus)};${p(a.streamingOperation)};nodejs-bigtable`;
}
