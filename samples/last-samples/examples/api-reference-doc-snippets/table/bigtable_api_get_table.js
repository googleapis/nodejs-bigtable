async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  const request = {
    name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
  };

  adminClient
    .getTable(request)
    .then(result => {
      const table = result[0];
      // const apiResponse = result[1];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_get_table]
}

main(...process.argv.slice(2)).catch(console.error);
