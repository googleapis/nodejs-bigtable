const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';

async function main() {
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
          nanos: 0
        }, // 7 hours from now
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

main(...process.argv.slice(2)).catch(console.error);
