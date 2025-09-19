const instanceId = 'dan-bigtable-instance4';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();
  console.log(); //for just a new-line
  console.log('Deleting Cluster');
  await instanceAdminClient.deleteCluster({
    name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
  });
  console.log(`Cluster deleted: ${clusterId}`);
  // [END bigtable_delete_cluster]
}

main(...process.argv.slice(2)).catch(console.error);
