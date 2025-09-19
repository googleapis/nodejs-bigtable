const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table';
const clusterId = 'cluster-id';
const backupId = 'new-backup';

async function main() {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const tableAdminClient = new BigtableTableAdminClient();

  async function getBackup() {
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

    const [metadata] = await tableAdminClient.getBackup(request);
    console.log(`The backup is ${metadata.sizeBytes} bytes.`);

    // Time properties have Date helpers to convert to a `PreciseDate`.
    console.log(
      `The backup will auto-delete at ${new Date(metadata.expireTime.seconds * 1000).toISOString()}`,
    );
    console.log(
      `The backup finished being created at ${new Date(metadata.endTime.seconds * 1000).toISOString()}`,
    );
  }

  await getBackup();
  // [END bigtable_api_get_backup]
}

main(...process.argv.slice(2)).catch(console.error);
