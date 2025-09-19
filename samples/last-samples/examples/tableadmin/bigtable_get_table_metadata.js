async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // Get table metadata, and apply a view to the table fields
  // Supported views include ID, schema or full
  // View defaults to schema if unspecified.
  const {Bigtable} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  const options = {
    view: 'id',
  };
  const [tableMetadata] = await adminClient.getTable({
    name: table.name,
    view: options.view,
  });
  console.log(`Metadata: ${JSON.stringify(tableMetadata)}`);
  // [END bigtable_get_table_metadata]
}

main(...process.argv.slice(2)).catch(console.error);
