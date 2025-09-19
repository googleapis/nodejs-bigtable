const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const options = {
    parent: `projects/${projectId}/instances/${instanceId}`,
    clusterId: clusterId,
    cluster: {
      location: `projects/${projectId}/locations/us-central1-b`,
      serveNodes: 1,
      defaultStorageType: 'HDD',
    },
  };
  instanceAdminClient
    .createCluster(options)
    .then(result => {
      const newCluster = result[0];
      // const operations = result[1];
      // const apiResponse = result[2];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_create_cluster]
}

main(...process.argv.slice(2)).catch(console.error);
