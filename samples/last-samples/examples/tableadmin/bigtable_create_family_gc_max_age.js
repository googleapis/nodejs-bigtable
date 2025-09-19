async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // Create a column family with GC policy : maximum age
  // where age = current time minus cell timestamp
  const {Bigtable, GCRuleMaker} = require('@google-cloud/bigtable');
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // Define the GC rule to retain data with max age of 5 days
  const maxAgeRule = {
    rule: {
      maxAge: {
        // Value must be atleast 1 millisecond
        seconds: 60 * 60 * 24 * 5,
        nanos: 0,
      },
    },
  };
  const [family] = await adminClient.modifyColumnFamilies({
    name: table.name,
    modifications: [
      {
        id: 'cf1',
        create: {
          gcRule: GCRuleMaker.makeRule(maxAgeRule),
        },
      },
    ],
  });
  console.log(`Created column family ${family.name}`);
  // [END bigtable_create_family_gc_max_age]
}

main(...process.argv.slice(2)).catch(console.error);
