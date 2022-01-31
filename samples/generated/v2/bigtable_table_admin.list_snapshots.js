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

function main(parent) {
  // [START bigtableadmin_v2_generated_BigtableTableAdmin_ListSnapshots_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the cluster for which snapshots should be listed.
   *  Values are of the form
   *  `projects/{project}/instances/{instance}/clusters/{cluster}`.
   *  Use `{cluster} = '-'` to list snapshots for all clusters in an instance,
   *  e.g., `projects/{project}/instances/{instance}/clusters/-`.
   */
  // const parent = 'abc123'
  /**
   *  The maximum number of snapshots to return per page.
   *  CURRENTLY UNIMPLEMENTED AND IGNORED.
   */
  // const pageSize = 1234
  /**
   *  The value of `next_page_token` returned by a previous call.
   */
  // const pageToken = 'abc123'

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function callListSnapshots() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const iterable = await adminClient.listSnapshotsAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  callListSnapshots();
  // [END bigtableadmin_v2_generated_BigtableTableAdmin_ListSnapshots_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
