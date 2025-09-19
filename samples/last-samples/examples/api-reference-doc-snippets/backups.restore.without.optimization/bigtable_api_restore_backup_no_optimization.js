const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';

async function main() {
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

main(...process.argv.slice(2)).catch(console.error);
