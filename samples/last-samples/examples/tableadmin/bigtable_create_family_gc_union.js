async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // Create a column family with GC policy to drop data that matches at least one condition.

  const {Bigtable, GCRuleMaker} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  // Define a GC rule to drop cells older than 5 days or not the most recent version
  const unionRule = {
    ruleType: 'union',
    maxVersions: 1,
    maxAge: {
      seconds: 60 * 60 * 24 * 5,
      nanos: 0,
    },
  };

  const [family] = await adminClient.modifyColumnFamilies({
    name: table.name,
    modifications: [
      {
        id: 'cf3',
        create: {
          gcRule: GCRuleMaker.makeRule(unionRule),
        },
      },
    ],
  });
  console.log(`Created column family ${family.name}`);
  // [END bigtable_create_family_gc_union]
}

main(...process.argv.slice(2)).catch(console.error);
