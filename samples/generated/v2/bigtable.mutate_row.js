// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main(tableName, rowKey, mutations) {
  // [START bigtable_v2_generated_Bigtable_MutateRow_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the table to which the mutation should be applied.
   *  Values are of the form
   *  `projects/<project>/instances/<instance>/tables/<table>`.
   */
  // const tableName = 'abc123'
  /**
   *  This value specifies routing for replication. If not specified, the
   *  "default" application profile will be used.
   */
  // const appProfileId = 'abc123'
  /**
   *  Required. The key of the row to which the mutation should be applied.
   */
  // const rowKey = 'Buffer.from('string')'
  /**
   *  Required. Changes to be atomically applied to the specified row. Entries are applied
   *  in order, meaning that earlier mutations can be masked by later ones.
   *  Must contain at least one entry and at most 100000.
   */
  // const mutations = 1234

  // Imports the Bigtable library
  const {BigtableClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const bigtableClient = new BigtableClient();

  async function callMutateRow() {
    // Construct request
    const request = {
      tableName,
      rowKey,
      mutations,
    };

    // Run request
    const response = await bigtableClient.mutateRow(request);
    console.log(response);
  }

  callMutateRow();
  // [END bigtable_v2_generated_Bigtable_MutateRow_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
