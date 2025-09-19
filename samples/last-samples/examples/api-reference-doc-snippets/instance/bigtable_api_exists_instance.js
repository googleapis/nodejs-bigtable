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

  const request = {
    name: `projects/${projectId}/instances/${instanceId}`,
  };

  try {
    await instanceAdminClient.getInstance(request);
    console.log('Instance exists.');
  } catch (err) {
    if (err.code === 5) {
      console.log('Instance does not exist.');
    } else {
      // Handle the error.
      console.error(err);
    }
  }
  // [END bigtable_api_exists_instance]
}

main(...process.argv.slice(2)).catch(console.error);
