const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  let instanceExists = true;
  try {
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();
    await instanceAdminClient.getInstance({
      name: `projects/${projectId}/instances/${instanceId}`,
    });
    console.log('got instances');
  } catch (e) {
    console.error(e);
    if (e.code === 5) {
      instanceExists = false;
    }
  }
  // [END bigtable_check_instance_exists]
}

main(...process.argv.slice(2)).catch(console.error);
