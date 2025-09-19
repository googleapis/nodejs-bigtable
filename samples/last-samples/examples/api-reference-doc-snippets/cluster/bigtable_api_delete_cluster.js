const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id2';
const backupId = 'new-backup';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const request = {
    name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
  };

  instanceAdminClient
    .deleteCluster(request)
    .then(result => {
      const apiResponse = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_delete_cluster]
}

main(...process.argv.slice(2)).catch(console.error);
