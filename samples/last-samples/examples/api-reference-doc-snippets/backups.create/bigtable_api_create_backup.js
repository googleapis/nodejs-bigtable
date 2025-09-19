const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table';
const clusterId = 'cluster-id';
const backupId = 'new-backup';

async function main() {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const tableAdminClient = new BigtableTableAdminClient();

  async function createBackup() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    // const backupId = 'YOUR_BACKUP_ID';
    const projectId = await tableAdminClient.getProjectId();

    const seconds = Math.floor(new Date(Date.now() + 7 * 60 * 60 * 1000).getTime() / 1000);
    const request = {
      parent: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
      backupId: backupId,
      backup: {
        sourceTable: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
        expireTime: {
          seconds,
          nanos: 0
        }, // 7 hours from now
      },
    };

    const [operation] = await tableAdminClient.createBackup(request);

    console.log('Started a table backup operation.');
    const [backup] = await operation.promise();

    console.log(`Backup "${backup.name}" is now ready for use.`);
  }

  await createBackup();
  // [END bigtable_api_create_backup]
}

main(...process.argv.slice(2)).catch(console.error);
