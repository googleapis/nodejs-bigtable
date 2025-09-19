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

  const appProfile = {
    name: `projects/${projectId}/instances/${instanceId}/appProfiles/${appProfileId}`,
    multiClusterRoutingUseAny: {},
  };

  const request = {
    parent: `projects/${projectId}/instances/${instanceId}`,
    appProfileId: appProfileId,
    appProfile: appProfile,
  };

  instanceAdminClient.createAppProfile(request, (err, appProfile) => {
    if (err) {
      // Handle the error.
      return callback(err);
    }
    return callback(appProfile);
  });
  // [END bigtable_api_create_app_profile]
}

main(...process.argv.slice(2)).catch(console.error);
