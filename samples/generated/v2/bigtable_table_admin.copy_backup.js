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
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(parent, backupId, sourceBackup, expireTime) {
  // [START bigtableadmin_v2_generated_BigtableTableAdmin_CopyBackup_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The name of the destination cluster that will contain the backup
   *  copy. The cluster must already exist. Values are of the form:
   *  `projects/{project}/instances/{instance}/clusters/{cluster}`.
   */
  // const parent = 'abc123'
  /**
   *  Required. The id of the new backup. The `backup_id` along with `parent`
   *  are combined as {parent}/backups/{backup_id} to create the full backup
   *  name, of the form:
   *  `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup_id}`.
   *  This string must be between 1 and 50 characters in length and match the
   *  regex _a-zA-Z0-9 -_.a-zA-Z0-9 *.
   */
  // const backupId = 'abc123'
  /**
   *  Required. The source backup to be copied from.
   *  The source backup needs to be in READY state for it to be copied.
   *  Copying a copied backup is not allowed.
   *  Once CopyBackup is in progress, the source backup cannot be deleted or
   *  cleaned up on expiration until CopyBackup is finished.
   *  Values are of the form:
   *  `projects/<project>/instances/<instance>/clusters/<cluster>/backups/<backup>`.
   */
  // const sourceBackup = 'abc123'
  /**
   *  Required. Required. The expiration time of the copied backup with
   *  microsecond granularity that must be at least 6 hours and at most 30 days
   *  from the time the request is received. Once the `expire_time` has
   *  passed, Cloud Bigtable will delete the backup and free the resources used
   *  by the backup.
   */
  // const expireTime = {}

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function callCopyBackup() {
    // Construct request
    const request = {
      parent,
      backupId,
      sourceBackup,
      expireTime,
    };

    // Run request
    const [operation] = await adminClient.copyBackup(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callCopyBackup();
  // [END bigtableadmin_v2_generated_BigtableTableAdmin_CopyBackup_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
