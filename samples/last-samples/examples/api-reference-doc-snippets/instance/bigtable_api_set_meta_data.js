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
    instance: {
      name: `projects/${projectId}/instances/${instanceId}`,
      displayName: 'updated-name',
    },
    updateMask: {
      paths: ['display_name'],
    },
  };

  instanceAdminClient
    .partialUpdateInstance(request)
    .then(result => {
      const apiResponse = result[0];
    })
  // [END bigtable_api_set_meta_data]
}

main(...process.argv.slice(2)).catch(console.error);
