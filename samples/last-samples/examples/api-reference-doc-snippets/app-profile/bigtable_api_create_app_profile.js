const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table';
const appProfileId = 'default1';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const appProfile = {
    name: `projects/${projectId}/instances/${instanceId}/appProfiles/${appProfileId}`,
    multiClusterRoutingUseAny: {},
  };

  const request = {
    parent: `projects/${projectId}/instances/${instanceId}`,
    appProfileId: appProfileId,
    appProfile: appProfile,
  };

  instanceAdminClient
    .createAppProfile(request)
    .then(result => {
      const appProfile = result[0];
      const apiResponse = result[1];
    })
  // [END bigtable_api_create_app_profile]
}

main(...process.argv.slice(2)).catch(console.error);
