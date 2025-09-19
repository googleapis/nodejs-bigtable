async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  const permissions = ['bigtable.tables.get', 'bigtable.tables.readRows'];

  const request = {
    resource: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
    permissions: permissions,
  };

  adminClient
    .testIamPermissions(request)
    .then(result => {
      const grantedPermissions = result[0];
    })
    .catch(err => {
      // Handle the error
    });
  // [END bigtable_api_test_table_Iam_permissions]
}

main(...process.argv.slice(2)).catch(console.error);
