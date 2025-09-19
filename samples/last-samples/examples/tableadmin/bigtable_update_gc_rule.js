async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // Update the column family metadata to update the GC rule

  const {Bigtable, GCRuleMaker} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  // Update a column family GC rule
  const updatedMetadata = {
    rule: {
      versions: 1,
    },
  };

  const [apiResponse] = await adminClient.modifyColumnFamilies({
    name: table.name,
    modifications: [
      {
        id: 'cf1',
        update: {
          gcRule: GCRuleMaker.makeRule(updatedMetadata.rule),
        },
      },
    ],
  });
  console.log(`Updated GC rule: ${JSON.stringify(apiResponse)}`);
  // [END bigtable_update_gc_rule]
}

main(...process.argv.slice(2)).catch(console.error);
