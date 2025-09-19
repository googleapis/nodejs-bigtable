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
    resource: `projects/${projectId}/instances/${instanceId}`,
  };

  instanceAdminClient
    .getIamPolicy(request)
    .then(result => {
      const policy = result[0];
    })
  // [END bigtable_api_get_instance_Iam_policy]
}

main(...process.argv.slice(2)).catch(console.error);
