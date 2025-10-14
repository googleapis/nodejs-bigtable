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

import * as protos from '../../../../protos/protos';

type SRKRequest = protos.google.bigtable.v2.ISampleRowKeysRequest;
type SRKResponse = protos.google.bigtable.v2.ISampleRowKeysResponse;

/**
 * This function will create a request that can be passed into the
 * handwritten ßsampleRowKeys method and calls the Gapic layer under the hood.
 *
 * @param {any} client Bigtable client
 * @param {SRKRequest} request The sampleRowKeys request information
 * that can be sent to the Gapic layer.
 * @returns {Promise<SRKResponse>} A reponse that can be passed into the
 * sampleRowKeys Gapic layer.
 */
export function getSRKRequest(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any,
  request: SRKRequest,
): Promise<SRKResponse> {
  const {tableName} = request;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTableInfo = (bigtable: any, tableName: any) => {
    const [, , , instanceId, , tableId] = tableName.split('/');
    const instance = bigtable.instance(instanceId);
    return instance.table(tableId);
  };

  const table = getTableInfo(client, tableName);
  const sampleRowKeysResponse = table.sampleRowKeys();

  return sampleRowKeysResponse;
}
