const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table';
const appProfileId = 'default';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const appProfile = {
    name: `projects/${projectId}/instances/${instanceId}/appProfiles/${appProfileId}`,
    description: 'My Updated App Profile',
    multiClusterRoutingUseAny: {},
  };

  const request = {
    appProfile: appProfile,
    updateMask: {
      paths: ['description', 'multi_cluster_routing_use_any'],
    },
  };

  instanceAdminClient
    .updateAppProfile(request)
    .then(result => {
      const apiResponse = result[0];
    })
  // [END bigtable_api_app_profile_set_meta]
}

main(...process.argv.slice(2)).catch(console.error);
