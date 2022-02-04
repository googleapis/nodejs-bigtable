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

function main(tableName) {
  // [START bigtable_v2_generated_Bigtable_ReadRows_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the table from which to read.
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
   *  The row keys and/or ranges to read sequentially. If not specified, reads
   *  from all rows.
   */
  // const rows = {}
  /**
   *  The filter to apply to the contents of the specified row(s). If unset,
   *  reads the entirety of each row.
   */
  // const filter = {}
  /**
   *  The read will stop after committing to N rows' worth of results. The
   *  default (zero) is to return all results.
   */
  // const rowsLimit = 1234

  // Imports the Bigtable library
  const {BigtableClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const bigtableClient = new BigtableClient();

  async function callReadRows() {
    // Construct request
    const request = {
      tableName,
    };

    // Run request
    const stream = await bigtableClient.readRows(request);
    stream.on('data', (response) => { console.log(response) });
    stream.on('error', (err) => { throw(err) });
    stream.on('end', () => { /* API call completed */ });
  }

  callReadRows();
  // [END bigtable_v2_generated_Bigtable_ReadRows_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
