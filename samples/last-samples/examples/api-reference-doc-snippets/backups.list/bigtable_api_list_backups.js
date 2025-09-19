const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table';
const clusterId = 'cluster-id';
const backupId = 'new-backup';

async function main() {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const tableAdminClient = new BigtableTableAdminClient();

  async function listBackups() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    const projectId = await tableAdminClient.getProjectId();

    const request = {
      parent: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
    };

    const [backupsFromCluster] = await tableAdminClient.listBackups(request);
    console.log(
      `${backupsFromCluster.length} backups returned from the cluster.`,
    );
  }

  await listBackups();
  // [END bigtable_api_list_backups]
}

main(...process.argv.slice(2)).catch(console.error);
