async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();
  // The request will only work if the projectName doesn't contain the {{projectId}} token.
  const options = {};
  //  {
  //    ruleType: 'union',
  //    maxVersions: 3,
  //    maxAge: {
  //      seconds: 1,
  //      nanos: 5000,
  //    },
  //  };

  adminClient
    .modifyColumnFamilies({
      name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
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
      // const apiResponse = result[1];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_create_family]
}

main(...process.argv.slice(2)).catch(console.error);
