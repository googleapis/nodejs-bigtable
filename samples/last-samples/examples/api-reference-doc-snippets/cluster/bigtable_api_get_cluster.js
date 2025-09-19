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

  instanceAdminClient
    .getCluster(request)
    .then(result => {
      const cluster = result[0];
      const apiResponse = result[1];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_get_cluster]
}

main(...process.argv.slice(2)).catch(console.error);
