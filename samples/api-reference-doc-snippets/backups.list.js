// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

async function main(
  instanceId = 'YOUR_INSTANCE_ID',
  clusterId = 'YOUR_CLUSTER_ID',
) {
  // [START bigtable_api_list_backups]
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
  const tableAdminClient = new BigtableTableAdminClient();

  async function listBackups() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    const projectId = await tableAdminClient.getProjectId();

    const request = {
      parent: tableAdminClient.clusterPath(projectId, instanceId, clusterId),
    };

    const [backupsFromCluster] = await tableAdminClient.listBackups(request);
    console.log(
      `${backupsFromCluster.length} backups returned from the cluster.`,
    );
  }

  await listBackups();
  // [END bigtable_api_list_backups]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
