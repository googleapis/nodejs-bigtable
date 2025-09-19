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
    modifications: [
      {
        id: familyId,
        create: {},
      },
    ],
  };

  adminClient
    .modifyColumnFamilies(request)
    .then(result => {
      const family = result[0];
      // let apiResponse = result[1];
    })
  // [END bigtable_api_create_family]
}

main(...process.argv.slice(2)).catch(console.error);
