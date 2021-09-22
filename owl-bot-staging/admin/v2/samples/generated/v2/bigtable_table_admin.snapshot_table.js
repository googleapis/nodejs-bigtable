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

function main(name, cluster, snapshotId) {
  // [START admin_snapshot_table_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the table to have the snapshot taken.
   *  Values are of the form
   *  `projects/{project}/instances/{instance}/tables/{table}`.
   */
  // const name = 'abc123'
  /**
   *  Required. The name of the cluster where the snapshot will be created in.
   *  Values are of the form
   *  `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  // const cluster = 'abc123'
  /**
   *  Required. The ID by which the new snapshot should be referred to within the parent
   *  cluster, e.g., `mysnapshot` of the form: `[_a-zA-Z0-9][-_.a-zA-Z0-9]*`
   *  rather than
   *  `projects/{project}/instances/{instance}/clusters/{cluster}/snapshots/mysnapshot`.
   */
  // const snapshotId = 'abc123'
  /**
   *  The amount of time that the new snapshot can stay active after it is
   *  created. Once 'ttl' expires, the snapshot will get deleted. The maximum
   *  amount of time a snapshot can stay active is 7 days. If 'ttl' is not
   *  specified, the default value of 24 hours will be used.
   */
  // const ttl = ''
  /**
   *  Description of the snapshot.
   */
  // const description = 'abc123'

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function snapshotTable() {
    // Construct request
    const request = {
      name,
      cluster,
      snapshotId,
    };

    // Run request
    const [operation] = await adminClient.snapshotTable(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  snapshotTable();
  // [END admin_snapshot_table_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
