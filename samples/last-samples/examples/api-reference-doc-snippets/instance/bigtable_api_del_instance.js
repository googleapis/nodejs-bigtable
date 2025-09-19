const instanceId = 'dan-bigtable-instance1';
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

  instanceAdminClient
    .deleteInstance(request)
    .then(result => {
      const apiResponse = result[0];
    })
  // [END bigtable_api_del_instance]
}

main(...process.argv.slice(2)).catch(console.error);
