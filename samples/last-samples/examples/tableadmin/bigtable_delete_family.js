async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {Bigtable} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  // Delete a column family
  await adminClient.modifyColumnFamilies({
    name: table.name,
    modifications: [
      {
        id: 'cf2',
        drop: true,
      },
    ],
  });
  console.log('cf2 deleted successfully\n');
  // [END bigtable_delete_family]
}

main(...process.argv.slice(2)).catch(console.error);
