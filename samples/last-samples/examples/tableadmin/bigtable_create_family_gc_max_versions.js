async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // Create a column family with GC policy : most recent N versions
  // where 1 = most recent version

  const {Bigtable, GCRuleMaker} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  // Define the GC policy to retain only the most recent 2 versions
  const maxVersionsRule = {
    rule: {
      maxVersions: 2,
    },
  };

  // Create a column family with given GC rule
  const [family] = await adminClient.modifyColumnFamilies({
    name: table.name,
    modifications: [
      {
        id: 'cf2',
        create: {
          gcRule: GCRuleMaker.makeRule(maxVersionsRule),
        },
      },
    ],
  });
  console.log(`Created column family ${family.name}`);
  // [END bigtable_create_family_gc_max_versions]
}

main(...process.argv.slice(2)).catch(console.error);
