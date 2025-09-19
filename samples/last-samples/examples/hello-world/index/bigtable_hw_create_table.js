const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const adminClient = new BigtableTableAdminClient();
  const projectId = await adminClient.getProjectId();

  let tableExists = true;
  try {
    await adminClient.getTable({
      name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
    });
  } catch (e) {
    if (e.code === 5) {
      tableExists = false;
    }
  }
  if (!tableExists) {
    console.log(`Creating table ${tableId}`);
    const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();
    await adminClient.createTable({
      parent: `projects/${projectId}/instances/${instanceId}`,
      tableId: tableId,
      table: {
        columnFamilies: {
          [familyId]: {
            gcRule: {
              maxNumVersions: 1,
            },
          },
        },
      },
    });
  }
  // [END bigtable_hw_create_table]
}

main(...process.argv.slice(2)).catch(console.error);
