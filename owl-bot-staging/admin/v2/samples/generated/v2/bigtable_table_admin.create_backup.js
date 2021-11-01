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

function main(parent, backupId, backup) {
  // [START bigtableadmin_v2_generated_BigtableTableAdmin_CreateBackup_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. This must be one of the clusters in the instance in which this
   *  table is located. The backup will be stored in this cluster. Values are
   *  of the form `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  // const parent = 'abc123'
  /**
   *  Required. The id of the backup to be created. The `backup_id` along with
   *  the parent `parent` are combined as {parent}/backups/{backup_id} to create
   *  the full backup name, of the form:
   *  `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup_id}`.
   *  This string must be between 1 and 50 characters in length and match the
   *  regex [_a-zA-Z0-9][-_.a-zA-Z0-9]*.
   */
  // const backupId = 'abc123'
  /**
   *  Required. The backup to create.
   */
  // const backup = ''

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function createBackup() {
    // Construct request
    const request = {
      parent,
      backupId,
      backup,
    };

    // Run request
    const [operation] = await adminClient.createBackup(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  createBackup();
  // [END bigtableadmin_v2_generated_BigtableTableAdmin_CreateBackup_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
