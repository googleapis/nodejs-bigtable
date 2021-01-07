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
  clusterId = 'YOUR_CLUSTER_ID',
  backupId = 'YOUR_BACKUP_ID'
) {
  // [START bigtable_api_get_backup]
  const {Bigtable} = require('@google-cloud/bigtable');
  const bigtable = new Bigtable();

  async function getBackup() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    // const backupId = 'YOUR_BACKUP_ID';
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const cluster = table.cluster(clusterId);

    // Create a reference to the backup before performing operations on it.
    const backup = cluster.backup(backupId);

    // Get the backup's metadata, with information such as when it will expire
    // and how big it is.
    const [metadata] = await backup.getMetadata();
    console.log(`The backup is ${metadata.sizeBytes} bytes.`);

    // Time properties have Date helpers to convert to a `PreciseDate`.
    console.log(
      `The backup will auto-delete at ${metadata.expireDate.toISOString()}`
    );
    console.log(
      `The backup finished being created at ${metadata.endTime.toISOString()}`
    );
  }

  await getBackup();
  // [END bigtable_api_get_backup]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
