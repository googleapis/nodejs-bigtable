async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  const request = {
    resource: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
  };

  adminClient
    .getIamPolicy(request)
    .then(result => {
      const policy = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_get_table_Iam_policy]
}

main(...process.argv.slice(2)).catch(console.error);
