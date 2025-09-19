const instanceId = 'dan-bigtable-instance4';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  console.log('Deleting Instance');
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();
  await instanceAdminClient.deleteInstance({
    name: `projects/${projectId}/instances/${instanceId}`,
  });
  console.log(`Instance deleted: ${instanceId}`);
  // [END bigtable_delete_instance]
}

main(...process.argv.slice(2)).catch(console.error);
