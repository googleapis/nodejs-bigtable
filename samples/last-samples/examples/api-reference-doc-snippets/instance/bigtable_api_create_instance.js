const instanceId = 'dan-bigtable-instance5';
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
    parent: `projects/${projectId}`,
    instanceId: instanceId,
    instance: {
      displayName: instanceId,
      labels: {},
      type: 'PRODUCTION',
    },
    clusters: {
      [clusterId]: {
        location: `projects/${projectId}/locations/us-central1-f`,
        serveNodes: 1,
        defaultStorageType: 'HDD',
      },
    },
  };

  // creates a new Instance
  const [operation, newInstance] =
    await instanceAdminClient.createInstance(options);
  await operation.promise();
  console.log(`Created Instance: ${newInstance.name}`);
  // let operations = result[1];
  // let apiResponse = result[2];
  // [END bigtable_api_create_instance]
}

main(...process.argv.slice(2)).catch(console.error);
