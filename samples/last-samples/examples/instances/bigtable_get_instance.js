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
  const [instance2] = await instanceAdminClient.getInstance({
    name: `projects/${projectId}/instances/${instanceId}`,
  });
  console.log(`Instance ID: ${instance2.name}`);
  console.log(`Instance Meta: ${JSON.stringify(instance2.labels)}`);
  // [END bigtable_get_instance]
}

main(...process.argv.slice(2)).catch(console.error);
