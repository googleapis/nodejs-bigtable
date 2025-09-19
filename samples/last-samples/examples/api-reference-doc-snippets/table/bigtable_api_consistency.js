const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  try {
    const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();
    // 1. Generate a consistency token.
    const token = (
      await adminClient.generateConsistencyToken({
        name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
      })
    )[0].consistencyToken;
    console.log('Generated consistency token:', token);
    let isConsistent = false;
    while (!isConsistent) {
      // 2. Check for consistency
      const consistent = await adminClient.checkConsistency({
        name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
        consistencyToken: token,
      });
      isConsistent = consistent[0].consistent;

      if (isConsistent) {
        console.log('Data is consistent!');
      } else {
        console.log('Data is not yet consistent. Retrying in 5 seconds...');
      }
    }
  } finally {

  }
  // [END bigtable_api_consistency]
}

main(...process.argv.slice(2)).catch(console.error);
