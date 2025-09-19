const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const tableAdminClient = new BigtableTableAdminClient();
  const projectId = await tableAdminClient.getProjectId();

  // To control how many API requests are made and page through the results
  // manually, set `autoPaginate` to false.
  const options = {
    parent: `projects/${projectId}/instances/${instanceId}`,
    autoPaginate: false,
  };
  // const options = {
  //   autoPaginate: true
  // };

  tableAdminClient
    .listTables(options)
    .then(result => {
      const tables = result[0];
    })
  // [END bigtable_api_get_tables]
}

main(...process.argv.slice(2)).catch(console.error);
