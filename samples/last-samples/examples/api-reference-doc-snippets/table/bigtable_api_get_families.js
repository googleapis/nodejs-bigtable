async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
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
      const families = result[0].columnFamilies;
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_get_families]
}

main(...process.argv.slice(2)).catch(console.error);
