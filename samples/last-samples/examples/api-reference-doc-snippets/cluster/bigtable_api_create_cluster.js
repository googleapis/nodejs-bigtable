const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id2';
const backupId = 'new-backup';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const request = {
    parent: `projects/${projectId}/instances/${instanceId}`,
    clusterId: clusterId,
    cluster: {
      location: `projects/${projectId}/locations/us-central1-f`,
      serveNodes: 1,
      defaultStorageType: 'HDD',
    },
  };

  instanceAdminClient
    .createCluster(request)
    .then(result => {
      const cluster = result[0];
      const operation = result[1];
      const apiResponse = result[2];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_create_cluster]
}

main(...process.argv.slice(2)).catch(console.error);
