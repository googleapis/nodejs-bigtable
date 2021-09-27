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

function main(parent, tableId, sourceSnapshot) {
  // [START bigtableadmin_v2_generated_BigtableTableAdmin_CreateTableFromSnapshot_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the instance in which to create the table.
   *  Values are of the form `projects/{project}/instances/{instance}`.
   */
  // const parent = 'abc123'
  /**
   *  Required. The name by which the new table should be referred to within the parent
   *  instance, e.g., `foobar` rather than `{parent}/tables/foobar`.
   */
  // const tableId = 'abc123'
  /**
   *  Required. The unique name of the snapshot from which to restore the table. The
   *  snapshot and the table must be in the same instance.
   *  Values are of the form
   *  `projects/{project}/instances/{instance}/clusters/{cluster}/snapshots/{snapshot}`.
   */
  // const sourceSnapshot = 'abc123'

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function createTableFromSnapshot() {
    // Construct request
    const request = {
      parent,
      tableId,
      sourceSnapshot,
    };

    // Run request
    const [operation] = await adminClient.createTableFromSnapshot(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  createTableFromSnapshot();
  // [END bigtableadmin_v2_generated_BigtableTableAdmin_CreateTableFromSnapshot_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
