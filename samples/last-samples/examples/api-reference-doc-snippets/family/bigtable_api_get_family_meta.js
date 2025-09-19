const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';

async function main() {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  const request = {
    name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
    view: 'FULL',
  };

  adminClient
    .getTable(request)
    .then(result => {
      const table = result[0];
      const metaData = table.columnFamilies[familyId];
      // const apiResponse = result[1];
    })
  // [END bigtable_api_get_family_meta]
}

main(...process.argv.slice(2)).catch(console.error);
