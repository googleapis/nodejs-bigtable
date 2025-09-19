const instanceId = 'dan-bigtable-instance1';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  const request = {
    parent: `projects/${projectId}/instances/${instanceId}`,
    tableId: tableId,
    table: {
      columnFamilies: {
        follows: {},
      },
    },
  };

  // You can also specify garbage collection rules for your column families.
  // See {@link Table#createFamily} for more information about
  // column families and garbage collection rules.
  //-
  // const request = {
  //   parent: instance.name,
  //   tableId: tableId,
  //   table: {
  //     columnFamilies: {
  //       follows: {
  //         gcRule: {
  //           union: {
  //             rules: [
  //               {
  //                 maxAge: {
  //                   seconds: 0,
  //                   nanos: 5000,
  //                 },
  //               },
  //               {
  //                 maxNumVersions: 3,
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

  adminClient
    .createTable(request)
    .then(result => {
      const newTable = result[0];
      // const apiResponse = result[1];
    })
  // [END bigtable_api_create_table]
}

main(...process.argv.slice(2)).catch(console.error);
