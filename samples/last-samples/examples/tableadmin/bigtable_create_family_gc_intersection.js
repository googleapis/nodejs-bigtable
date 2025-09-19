async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // Create a column family with GC policy to drop data that matches all conditions

  const {Bigtable, GCRuleMaker} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  // GC rule: Drop cells older than 5 days AND older than the most recent 2 versions
  const intersectionRule = {
    ruleType: 'intersection',
    maxVersions: 2,
    maxAge: {
      seconds: 60 * 60 * 24 * 5,
      nanos: 0,
    },
  };
  const [family] = await adminClient.modifyColumnFamilies({
    name: table.name,
    modifications: [
      {
        id: 'cf4',
        create: {
          gcRule: GCRuleMaker.makeRule(intersectionRule),
        },
      },
    ],
  });
  console.log(`Created column family ${family.name}`);
  // [END bigtable_create_family_gc_intersection]
}

main(...process.argv.slice(2)).catch(console.error);
