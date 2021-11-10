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

function main(parent, tableId, table) {
  // [START bigtableadmin_v2_generated_BigtableTableAdmin_CreateTable_async]
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
   *  Maximum 50 characters.
   */
  // const tableId = 'abc123'
  /**
   *  Required. The Table to create.
   */
  // const table = {}
  /**
   *  The optional list of row keys that will be used to initially split the
   *  table into several tablets (tablets are similar to HBase regions).
   *  Given two split keys, `s1` and `s2`, three tablets will be created,
   *  spanning the key ranges: `[, s1), [s1, s2), [s2, )`.
   *  Example:
   *  * Row keys := `["a", "apple", "custom", "customer_1", "customer_2",`
   *                 `"other", "zz"`
   *  * initial_split_keys := `["apple", "customer_1", "customer_2", "other"]`
   *  * Key assignment:
   *      - Tablet 1 `[, apple)                => {"a"}.`
   *      - Tablet 2 `[apple, customer_1)      => {"apple", "custom"}.`
   *      - Tablet 3 `[customer_1, customer_2) => {"customer_1"}.`
   *      - Tablet 4 `[customer_2, other)      => {"customer_2"}.`
   *      - Tablet 5 `[other, )                => {"other", "zz"}.`
   */
  // const initialSplits = 1234

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function callCreateTable() {
    // Construct request
    const request = {
      parent,
      tableId,
      table,
    };

    // Run request
    const response = await adminClient.createTable(request);
    console.log(response);
  }

  callCreateTable();
  // [END bigtableadmin_v2_generated_BigtableTableAdmin_CreateTable_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
