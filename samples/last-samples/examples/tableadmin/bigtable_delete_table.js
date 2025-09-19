async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();
  // Delete the entire table
  console.log('Delete the table.');
  await adminClient.deleteTable({
    name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
  });
  console.log(`Table deleted: ${tableId}`);
  // [END bigtable_delete_table]
}

main(...process.argv.slice(2)).catch(console.error);
