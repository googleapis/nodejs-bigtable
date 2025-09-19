const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table';
const appProfileId = 'default';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const request = {
    name: `projects/${projectId}/instances/${instanceId}/appProfiles/${appProfileId}`,
  };

  try {
    await instanceAdminClient.getAppProfile(request);
    console.log('App profile exists.');
  } catch (err) {
    if (err.code === 5) {
      console.log('App profile does not exist.');
    } else {
      // Handle the error.
      console.error(err);
    }
  }
  // [END bigtable_api_exists_app_profile]
}

main(...process.argv.slice(2)).catch(console.error);
