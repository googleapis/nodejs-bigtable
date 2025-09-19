const instanceId = 'dan-bigtable-instance';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';

async function main() {
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();

  const cluster = {
    name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
    serveNodes: 4,
  };

  const request = {
    cluster: cluster,
    updateMask: {
      paths: ['serve_nodes'],
    },
  };

  instanceAdminClient
    .updateCluster(request)
    .then(result => {
      const operation = result[0];
      const apiResponse = result[1];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_cluster_set_meta]
}

main(...process.argv.slice(2)).catch(console.error);
