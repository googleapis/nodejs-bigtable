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

// Imports the Google Cloud client library
const {Bigtable} = require('@google-cloud/bigtable');
const {inspect} = require('util');

async function runBackupOperations(
  instanceID,
  clusterID,
  tableID,
  optionalBackupID
) {
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceID);
  const cluster = instance.cluster(clusterID);

  const backupID = optionalBackupID || generateBackupId(cluster, tableID);

  // [START bigtable_create_backup]
  const table = instance.table(tableID);
  const [backupOperation] = await cluster.createBackup(table, backupID, {
    expireTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // in 1 day from now
  });
  console.log(
    'Started a table backup operation:',
    inspect(backupOperation.latestResponse.name, {depth: null, colors: true})
  );

  // The long running operation (LRO) "backupOperation" provides an EventEmitter interface
  // or a promise to wait for completion.
  // The backup cannot be interacted with (restore, update, delete) until it is ready.
  await backupOperation.promise();
  console.log('Backup is now "READY" (available).');
  // [END bigtable_create_backup]

  // [START bigtable_list_backups]
  const [existingBackups] = await cluster.listBackups();
  console.log(
    'These backups exist:',
    inspect(existingBackups, {depth: null, colors: true})
  );
  // [END bigtable_list_backups]

  // [START bigtable_get_backup]
  // Get information about a backup, like when it will expire or how big it is.
  // NOTE: No need to poll with this RPC to get backup ready status,
  //  instead use the EventEmitter or promise interface of the LRO.

  // Convert GCPs Timestamp into a JavaScript Date, this will be used below...
  function timestampToDate(timestamp) {
    return new Date(
      Number(timestamp.seconds) * 1000 + Math.floor(timestamp.nanos / 1000000)
    );
  }

  const [backupInfo] = await cluster.getBackup(backupID);
  console.log('The backup is %s bytes in size.', backupInfo.sizeBytes);

  const expireDate = timestampToDate(backupInfo.expireTime);
  console.log('The backup will auto delete at', expireDate.toISOString());

  const endDate = timestampToDate(backupInfo.endTime);
  console.log('The backup finished being created at', endDate.toISOString());
  // [END bigtable_get_backup]

  // [START bigtable_delete_backup]
  await cluster.deleteBackup(backupID);
  console.log('Deleted backup with ID %s, no response is returned.', backupID);
  // [END bigtable_delete_backup]
}

function generateBackupId(cluster, table) {
  return [cluster.id, table.id || table, Date.now()].join('-').slice(-50); // truncate to max backup id length of 50
}

require('yargs')
  .demand(1)
  .command(
    'run',
    'Create a backup of a table, restore it, and finally delete it.',
    {},
    argv =>
      runBackupOperations(argv.instance, argv.cluster, argv.table, argv.backup)
  )
  .example(
    'node $0 run --instance [instanceID] --cluster [clusterID] --table [tableID] [--backup [backupID]]',
    'Create a backup, restore it, and finally delete it.'
  )
  .wrap(120)
  .nargs('instance', 1)
  .nargs('cluster', 1)
  .nargs('table', 1)
  .nargs('backup', 1)
  .describe('instance', 'Cloud Bigtable Instance ID')
  .describe('cluster', 'Cloud Bigtable Cluster ID')
  .describe('table', 'Cloud Bigtable Table ID')
  .describe('backup', 'A unique Cloud Bigtable Backup ID')
  .demandOption(['instance', 'cluster', 'table'])
  .recommendCommands()
  .epilogue('For more information, see https://cloud.google.com/bigtable/docs')
  .help()
  .strict().argv;
