const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
const adminClient = new BigtableTableAdminClient();

async function main() {
  const projectId = await adminClient.getProjectId();
  console.log('Delete the table');
  const request = {
    name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
  };
  await adminClient.deleteTable(request);
  // [END bigtable_hw_delete_table]
}

main(...process.argv.slice(2)).catch(console.error);
