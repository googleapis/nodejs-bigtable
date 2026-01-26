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
  // Redirect the generated sample tag here, to reflect the desired user journey.
  // [START bigtable_api_restore_backup]
  // [START bigtableadmin_v2_generated_BigtableTableAdmin_RestoreTable_async]
  const {TableAdminClient} = require('@google-cloud/bigtable').admin;

  async function restoreBackup() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    // const backupId = 'YOUR_BACKUP_ID';

    const adminClient = new TableAdminClient();
    const projectId = await adminClient.getProjectId();

    // Restore a table to an instance.
    const [restoreLRO] = await adminClient.restoreTable({
      parent: `projects/${projectId}/instances/${instanceId}`,
      tableId,
      backup: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}/backups/${backupId}`,
    });
    console.log('Waiting for restoreTable operation to complete...');
    const [table, metadata] = await restoreLRO.promise();
    console.log(`Table ${table.name} restored successfully.`);

    // Await the secondary optimize table operation
    const optimizeTableOperationName = metadata.optimizeTableOperationName;
    if (optimizeTableOperationName) {
      console.log(
        `Waiting for optimize table operation: ${optimizeTableOperationName}`,
      );
      const [optimizeLRO] =
        await adminClient.checkOptimizeRestoredTableProgress(
          optimizeTableOperationName,
        );
      const [table] = await optimizeLRO.promise();

      console.log(`Optimized table restored to ${table.name} successfully.`);
    } else {
      console.log('No optimize table operation name found in metadata.');
    }
  }

  await restoreBackup();
  // [END bigtableadmin_v2_generated_BigtableTableAdmin_RestoreTable_async]
  // [END bigtable_api_restore_backup]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
