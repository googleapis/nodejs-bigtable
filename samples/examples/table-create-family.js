async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID', familyId = 'YOUR_FAMILY_ID') {
  // [START bigtable_api_create_family]
  const {BigtableTableAdminClient, GCRuleMaker} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();
  const options = {};

  adminClient
    .modifyColumnFamilies({
      name: adminClient.tablePath(projectId, instanceId, tableId),
      modifications: [
        {
          id: familyId,
          create: {
            gcRule: GCRuleMaker.makeRule(options),
          },
        },
      ],
    })
    .then(result => {
      const family = result[0];
      console.log(`Family ${family.name} created successfully.`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END bigtable_api_create_family]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
