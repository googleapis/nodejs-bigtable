async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {Bigtable} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  // Retrieve column family metadata (Id, column family GC rule)
  const [tableData] = await adminClient.getTable({
    name: table.name,
    view: 'FULL',
  });
  const metadata = tableData.columnFamilies['cf1'].gcRule;
  console.log(`Metadata: ${JSON.stringify(metadata)}`);
  // [END bigtable_family_get_gc_rule]
}

main(...process.argv.slice(2)).catch(console.error);
