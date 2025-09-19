const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table';
const clusterId = 'cluster-id';
const backupId = 'new-backup';

async function main() {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const tableAdminClient = new BigtableTableAdminClient();

  async function deleteBackup() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    // const backupId = 'YOUR_BACKUP_ID';
    const projectId = await tableAdminClient.getProjectId();
    const request = {
      name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}/backups/${backupId}`,
    };
    await tableAdminClient.deleteBackup(request);
    console.log(`Backup ${backupId} was deleted successfully.`);
  }

  await deleteBackup();
  // [END bigtable_api_delete_backup]
}

main(...process.argv.slice(2)).catch(console.error);
