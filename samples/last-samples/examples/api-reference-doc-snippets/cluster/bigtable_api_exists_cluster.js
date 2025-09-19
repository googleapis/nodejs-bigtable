const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const request = {
    name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
  };

  try {
    await instanceAdminClient.getCluster(request);
    console.log('Cluster exists.');
  } catch (err) {
    if (err.code === 5) {
      console.log('Cluster does not exist.');
    } else {
      // Handle the error.
      console.error(err);
    }
  }
  // [END bigtable_api_exists_cluster]
}

main(...process.argv.slice(2)).catch(console.error);
