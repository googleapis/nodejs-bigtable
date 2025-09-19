async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  const policy = {
    bindings: [
      {
        role: 'roles/bigtable.viewer',
        members: ['user:mike@example.com', 'group:admins@example.com'],
      },
    ],
  };

  const request = {
    resource: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
    policy: policy,
  };

  adminClient
    .setIamPolicy(request)
    .then(result => {
      const setPolicy = result[0];
    })
    .catch(err => {
      // Handle the error
    });
  // [END bigtable_api_set_table_Iam_policy]
}

main(...process.argv.slice(2)).catch(console.error);
