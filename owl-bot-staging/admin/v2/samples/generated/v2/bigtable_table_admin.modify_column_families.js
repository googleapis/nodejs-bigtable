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

function main(name, modifications) {
  // [START admin_modify_column_families_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the table whose families should be modified.
   *  Values are of the form
   *  `projects/{project}/instances/{instance}/tables/{table}`.
   */
  // const name = 'abc123'
  /**
   *  Required. Modifications to be atomically applied to the specified table's families.
   *  Entries are applied in order, meaning that earlier modifications can be
   *  masked by later ones (in the case of repeated updates to the same family,
   *  for example).
   */
  // const modifications = 1234

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function modifyColumnFamilies() {
    // Construct request
    const request = {
      name,
      modifications,
    };

    // Run request
    const response = await adminClient.modifyColumnFamilies(request);
    console.log(response);
  }

  modifyColumnFamilies();
  // [END admin_modify_column_families_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
