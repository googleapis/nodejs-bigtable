const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';

async function main() {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  const request = {
    name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
    view: 'FAMILY_VIEW_BASIC',
  };

  try {
    const [table] = await adminClient.getTable(request);
    const exists = Object.prototype.hasOwnProperty.call(
      table.columnFamilies,
      familyId,
    );
    console.log(`Family ${familyId} exists: ${exists}`);
  } catch (err) {
    // Handle the error.
    console.error(err);
  }
  // [END bigtable_api_exists_family]
}

main(...process.argv.slice(2)).catch(console.error);
