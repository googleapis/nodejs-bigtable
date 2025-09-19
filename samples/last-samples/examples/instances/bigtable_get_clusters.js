const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();
  const [clusters] = await instanceAdminClient.listClusters({
    parent: `projects/${projectId}/instances/${instanceId}`,
  });
  clusters.clusters.forEach(cluster => {
    console.log(cluster.name);
  });
  // [END bigtable_get_clusters]
}

main(...process.argv.slice(2)).catch(console.error);
