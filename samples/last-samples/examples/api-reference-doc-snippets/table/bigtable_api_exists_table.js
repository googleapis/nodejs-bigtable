async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  const request = {
    name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
  };

  try {
    await adminClient.getTable(request);
    console.log(`Table ${tableId} exists.`);
  } catch (err) {
    if (err.code === 5) {
      console.log(`Table ${tableId} does not exist.`);
    } else {
      // Handle the error.
      console.error(err);
    }
  }
  // [END bigtable_api_exists_table]
}

main(...process.argv.slice(2)).catch(console.error);
