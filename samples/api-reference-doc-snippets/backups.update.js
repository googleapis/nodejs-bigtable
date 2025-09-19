// Copyright 2020 Google LLC
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

async function main(
  instanceId = 'YOUR_INSTANCE_ID',
  clusterId = 'YOUR_CLUSTER_ID',
  backupId = 'YOUR_BACKUP_ID',
) {
  // [START bigtable_api_update_backup]
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const tableAdminClient = new BigtableTableAdminClient();

  async function updateBackup() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    // const backupId = 'YOUR_BACKUP_ID';
    const projectId = await tableAdminClient.getProjectId();

    const seconds = Math.floor(
      new Date(Date.now() + 7 * 60 * 60 * 1000).getTime() / 1000,
      // 7 hours from now
    );
    const request = {
      backup: {
        name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}/backups/${backupId}`,
        expireTime: {
          seconds,
          nanos: 0,
        },
      },
      updateMask: {
        paths: ['expire_time'],
      },
    };

    const [metadata] = await tableAdminClient.updateBackup(request);
    console.log(
      `The backup will now auto-delete at ${new Date(metadata.expireTime.seconds * 1000)}.`,
    );
  }

  await updateBackup();
  // [END bigtable_api_update_backup]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
