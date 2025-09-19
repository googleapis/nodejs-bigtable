const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table';
const appProfileId = 'default1';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const request = {
    name: `projects/${projectId}/instances/${instanceId}/appProfiles/${appProfileId}`,
    ignoreWarnings: true,
  };

  instanceAdminClient
    .deleteAppProfile(request)
    .then(result => {
      const apiResponse = result[0];
    })
  // [END bigtable_api_delete_app_profile]
}

main(...process.argv.slice(2)).catch(console.error);
