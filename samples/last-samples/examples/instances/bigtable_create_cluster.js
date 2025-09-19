const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id3';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();
  const clusterOptions = {
    parent: `projects/${projectId}/instances/${instanceId}`,
    clusterId: clusterId,
    cluster: {
      location: `projects/${projectId}/locations/us-central1-b`,
      serveNodes: 3,
      defaultStorageType: 'SSD',
    },
  };

  const [operation, cluster] =
    await instanceAdminClient.createCluster(clusterOptions);
  await operation.promise();
  console.log(`Cluster created: ${cluster.name}`);
  // [END bigtable_create_cluster]
}

main(...process.argv.slice(2)).catch(console.error);
