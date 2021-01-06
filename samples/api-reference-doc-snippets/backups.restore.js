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
  backupId = 'YOUR_BACKUP_ID'
) {
  // [START bigtable_api_restore_backup]
  const {Bigtable} = require('@google-cloud/bigtable');
  const bigtable = new Bigtable();

  async function restoreBackup() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';
    // const backupId = 'YOUR_BACKUP_ID';
    const instance = bigtable.instance(instanceId);

    // Restore a table to an instance.
    const [table, operation] = await instance.createTableFromBackup({
      table: tableId,
      backup: backupId,
    });

    await operation.promise();
    console.log(`Table restored to ${table.id} successfully.`);
  }

  await restoreBackup();
  // [END bigtable_api_restore_backup]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
