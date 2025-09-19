async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {Bigtable} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  // List tables in current project
  const [tables] = await adminClient.listTables({parent: instance.name});
  tables.forEach(table => {
    console.log(table.name);
  });
  // [END bigtable_list_tables]
}

main(...process.argv.slice(2)).catch(console.error);
