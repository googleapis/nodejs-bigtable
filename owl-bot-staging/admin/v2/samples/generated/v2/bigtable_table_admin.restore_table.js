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

function main(parent, tableId) {
  // [START admin_v2_generated_BigtableTableAdmin_RestoreTable_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The name of the instance in which to create the restored
   *  table. This instance must be in the same project as the source backup.
   *  Values are of the form `projects/<project>/instances/<instance>`.
   */
  // const parent = 'abc123'
  /**
   *  Required. The id of the table to create and restore to. This
   *  table must not already exist. The `table_id` appended to
   *  `parent` forms the full table name of the form
   *  `projects/<project>/instances/<instance>/tables/<table_id>`.
   */
  // const tableId = 'abc123'
  /**
   *  Name of the backup from which to restore.  Values are of the form
   *  `projects/<project>/instances/<instance>/clusters/<cluster>/backups/<backup>`.
   */
  // const backup = 'abc123'

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function restoreTable() {
    // Construct request
    const request = {
      parent,
      tableId,
    };

    // Run request
    const [operation] = await adminClient.restoreTable(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  restoreTable();
  // [END admin_v2_generated_BigtableTableAdmin_RestoreTable_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
