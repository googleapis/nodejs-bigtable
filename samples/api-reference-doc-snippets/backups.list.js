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
  tableId = 'YOUR_TABLE_ID',
  clusterId = 'YOUR_CLUSTER_ID'
) {
  // [START bigtable_api_list_backups]
  const {Bigtable} = require('@google-cloud/bigtable');
  const bigtable = new Bigtable();

  async function listBackups() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const cluster = table.cluster(clusterId);

    const [backupsFromInstance] = await instance.listBackups();
    console.log(
      `${backupsFromInstance.length} backups returned from the instance.`
    );

    const [backupsFromCluster] = await cluster.listBackups();
    console.log(
      `${backupsFromCluster.length} backups returned from the cluster.`
    );
  }

  await listBackups();
  // [END bigtable_api_list_backups]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
