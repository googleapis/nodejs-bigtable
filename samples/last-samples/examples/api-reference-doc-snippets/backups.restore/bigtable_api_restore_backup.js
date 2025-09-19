const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table77';
const clusterId = 'cluster-id';
const backupId = 'new-backup';

async function main() {
  // eslint-disable-next-line n/no-extraneous-require
  const gax = require('google-gax');
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
      const [rawOptimizeLRO] = await adminClient.operationsClient.getOperation({
        name: optimizeTableOperationName,
      });
      const optimizeRestoreTableLRO = gax.operation(
        rawOptimizeLRO,
        adminClient.descriptors.longrunning.restoreTable,
        {},
      );
      const [, , info] = await optimizeRestoreTableLRO.promise();

      console.log(`Optimized table restored to ${info.name} successfully.`);
    } else {
      console.log('No optimize table operation name found in metadata.');
    }
  }

  await restoreBackup();
  // [END bigtable_api_restore_backup]
}

main(...process.argv.slice(2)).catch(console.error);
