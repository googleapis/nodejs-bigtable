const instanceId = 'dan-bigtable-instance1';
const tableId = 'events-table78';
const clusterId = 'cluster-id3';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();
  console.log(); //for just a new-line
  console.log('Creating a DEVELOPMENT Instance');
  // Set options to create an Instance
  const options = {
    parent: `projects/${projectId}`,
    instanceId: instanceId,
    instance: {
      displayName: instanceId,
      labels: {'dev-label': 'dev-label'},
      type: 'DEVELOPMENT',
    },
    clusters: {
      [clusterId]: {
        location: `projects/${projectId}/locations/us-central1-f`,
        defaultStorageType: 'HDD',
      },
    },
  };

  // Create development instance with given options
  const [operation, instance] =
    await instanceAdminClient.createInstance(options);
  await operation.promise();
  console.log(`Created development instance: ${instance.name}`);
  // [END bigtable_create_dev_instance]
}

main(...process.argv.slice(2)).catch(console.error);
