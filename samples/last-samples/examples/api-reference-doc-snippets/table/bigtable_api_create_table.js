async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();
  const request = {
    parent: `projects/${projectId}/instances/${instanceId}`,
    tableId: tableId,
    table: {
      columnFamilies: {
        follows: {},
      },
    },
  };
  adminClient
    .createTable(request)
    .then(result => {
      const table = result[0];
      // let apiResponse = result[1];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_create_table]
}

main(...process.argv.slice(2)).catch(console.error);
