async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // List all families in the table with GC rules
  const {Bigtable} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  const [tableData2] = await adminClient.getTable({
    name: table.name,
    view: 'FULL',
  });
  const families = tableData2.columnFamilies;
  // Print ID, GC Rule for each column family
  for (const familyId in families) {
    const family = families[familyId];
    const metadata = JSON.stringify(family.gcRule);
    console.log(`Column family: ${familyId}, Metadata: ${metadata}`);
    /* Sample output:
          Column family: projects/{{projectId}}/instances/my-instance/tables/my-table/columnFamilies/cf4,
          Metadata: {"gcRule":{"intersection":{"rules":[{"maxAge":{"seconds":"432000","nanos":0},"rule":"maxAge"},{"maxNumVersions":2,"rule":"maxNumVersions"}]},"rule":"intersection"}}
      */
  }
  // [END bigtable_list_column_families]
}

main(...process.argv.slice(2)).catch(console.error);
