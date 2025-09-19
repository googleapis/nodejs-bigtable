async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // Create a nested GC rule:
  // Drop cells that are either older than the 10 recent versions
  // OR
  // Drop cells that are older than a month AND older than the 2 recent versions
  const {Bigtable, GCRuleMaker} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  const nestedRule = {
    ruleType: 'union',
    maxVersions: 10,
    rule: {
      ruleType: 'intersection',
      maxVersions: 2,
      maxAge: {
        // one month
        seconds: 60 * 60 * 24 * 30,
        nanos: 0,
      },
    },
  };

  const [family] = await adminClient.modifyColumnFamilies({
    name: table.name,
    modifications: [
      {
        id: 'cf5',
        create: {
          gcRule: GCRuleMaker.makeRule(nestedRule),
        },
      },
    ],
  });
  console.log(`Created column family ${family.name}`);
  // [END bigtable_create_family_gc_nested]
}

main(...process.argv.slice(2)).catch(console.error);
