async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // [START bigtable_api_create_table]
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  const request = {
    parent: adminClient.instancePath(projectId, instanceId),
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
      const newTable = result[0];
      console.log(`Table ${newTable.name} created successfully.`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END bigtable_api_create_table]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
