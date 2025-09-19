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

  instanceAdminClient
    .getAppProfile(request)
    .then(result => {
      const metadata = result[0];
      const apiResponse = result[1];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_app_profile_get_meta]
}

main(...process.argv.slice(2)).catch(console.error);
