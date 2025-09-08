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
  tableId = 'YOUR_TABLE_ID',
  clusterId = 'YOUR_CLUSTER_ID',
  backupId = 'YOUR_BACKUP_ID',
) {
  // [START bigtable_api_restore_backup_no_optimization]
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  async function restoreBackup() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    // const backupId = 'YOUR_BACKUP_ID';

    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();

    // Restore a table to an instance.
    const [restoreLRO] = await adminClient.restoreTable({
      parent: adminClient.instancePath(projectId, instanceId),
      tableId,
      backup: adminClient.backupPath(
        projectId,
        instanceId,
        clusterId,
        backupId,
      ),
    });
    console.log('Waiting for restoreTable operation to complete...');
    const [table] = await restoreLRO.promise();
    console.log(`Table ${table.name} restored successfully.`);
  }

  await restoreBackup();
  // [END bigtable_api_restore_backup_no_optimization]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
