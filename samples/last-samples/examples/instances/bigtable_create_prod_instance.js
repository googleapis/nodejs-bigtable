const instanceId = 'dan-bigtable-instance4';
const tableId = 'events-table78';
const clusterId = 'cluster-id3';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  // Creates a Production Instance with the ID "ssd-instance"
  // with cluster id "ssd-cluster", 3 nodes and location us-central1-f
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const instanceOptions = {
    parent: `projects/${projectId}`,
    instanceId: instanceId,
    instance: {
      displayName: instanceId,
      labels: {'prod-label': 'prod-label'},
      type: 'PRODUCTION',
    },
    clusters: {
      [clusterId]: {
        location: `projects/${projectId}/locations/us-central1-f`,
        serveNodes: 3,
        defaultStorageType: 'SSD',
      },
    },
  };

  // Create production instance with given options
  const [operation, prodInstance] =
    await instanceAdminClient.createInstance(instanceOptions);
  await operation.promise();
  console.log(`Created Instance: ${prodInstance.name}`);
  // [END bigtable_create_prod_instance]
}

main(...process.argv.slice(2)).catch(console.error);
