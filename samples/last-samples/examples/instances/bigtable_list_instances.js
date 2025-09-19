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
  const [instances] = await instanceAdminClient.listInstances({
    parent: `projects/${projectId}`,
  });
  instances.instances.forEach(instance => {
    console.log(instance.name);
  });
  // [END bigtable_list_instances]
}

main(...process.argv.slice(2)).catch(console.error);
