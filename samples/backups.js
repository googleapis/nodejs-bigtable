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
const {Bigtable, Backup} = require('@google-cloud/bigtable');
const uuid = require('uuid');
const {inspect} = require('util');

function generateBackupId() {
  return `gcloud-tests-${uuid.v4()}`.substr(0, 48);
}

async function runBackupOperations(
  instanceID,
  clusterID,
  tableID,
  optionalBackupID
) {
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceID);
  const cluster = instance.cluster(clusterID);

  const backupID = optionalBackupID || generateBackupId();

  // [START bigtable_create_backup]
  const table = instance.table(tableID);
  const expireTime = new Date(Date.now() + 7 * 60 * 60 * 1000); // 7 hours from now

  // expireTime can be either a Date, PreciseDate, or an ITimestamp
  const [backupOperation] = await cluster.createBackup(table, backupID, {
    expireTime,
  });
  console.log(
    'Started a table backup operation:',
    inspect(backupOperation.latestResponse.name, {depth: null, colors: true})
  );

  // The long running operation (LRO) "backupOperation" provides an EventEmitter interface
  // or a promise to wait for completion.
  // The backup cannot be interacted with (restore, update, delete) until it is ready.
  const [backupMeta] = await backupOperation.promise();
  console.log(
    `Backup is now "${backupMeta.state}" (READY = 2, i.e. available).`
  );
  // [END bigtable_create_backup]

  // [START bigtable_table_backup]
  // An alternative way is to call backup right on a Table which will
  // automatically select the first cluster that has a READY cluster state.
  const [backupOperationFromTable] = await table.backup(`${backupID}-2`, {
    expireTime: new Date(Date.now() + 7 * 60 * 60 * 1000), // 7 hours from now
  });
  const [backupFromTable] = await backupOperationFromTable.promise();
  // [END bigtable_table_backup]

  // [START bigtable_list_backups]
  const [existingBackups] = await cluster.listBackups();
  console.log(
    'These backups exist:',
    inspect(
      existingBackups.map(backup => backup.valueOf()),
      {depth: 3, colors: true}
    )
  );
  // [END bigtable_list_backups]

  // [START bigtable_get_backup]
  // Get metadata about a backup, like when it will expire or how big it is.
  // NOTE: No need to poll with this RPC to get backup ready status,
  //  instead use the EventEmitter or promise interface of the LRO.
  // `getBackup` also returns a `Backup` with `restore`, `update`, and `delete` methods.
  const [fetchedBackup] = await cluster.getBackup(backupID);
  console.log('The backup is %s bytes in size.', fetchedBackup.sizeBytes);

  // *Time properties have *Date helpers to convert from ITimestamp to PreciseDate
  console.log(
    'The backup will auto delete at',
    fetchedBackup.expireDate.toISOString() // helper for expireTime
  );

  console.log(
    'The backup finished being created at',
    fetchedBackup.endTime // or use the original timestamp directly
  );
  // [END bigtable_get_backup]

  // [START bigtable_update_backup]
  // Extend a backup's life by updating its expiry date.
  const [updatedBackup] = await cluster.updateBackup(backupID, {
    expireTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours (was 7)
  });
  console.log(
    'The backup will now auto delete at',
    updatedBackup.expireDate.toISOString()
  );

  // alternatively use the update method on the backup
  // `updatedBackup` can be reused since it is a `Backup`
  const [ownUpdatedBackupMeta] = await updatedBackup.update({
    expireTime: new Date(Date.now() + 9 * 60 * 60 * 1000), // 9 hours (was 8)
  });
  console.log(
    'The backup will now auto delete at',
    ownUpdatedBackupMeta.expireDate.toISOString()
  );
  // [END bigtable_update_backup]

  // [START bigtable_restore_backup]
  // Restore a table to an instance from a backup.
  // Restores do NOT happen on clusters.
  const restoredTableId = `${tableID}-restored`;
  console.log(
    `Restoring backup ${backupID} to new table ${restoredTableId}...`
  );
  const [tableRestoreOperation] = await instance.restoreTable(
    backupID,
    clusterID,
    restoredTableId
  );

  console.log(
    'Table restoration started, waiting for the table to be fully restored'
  );
  const [restoredTable, restoredMeta] = await tableRestoreOperation.promise();
  console.log('restoredTable:', restoredTable);
  console.log('restoredMeta:', restoredMeta);
  // [END bigtable_restore_backup]

  // [START bigtable_delete_backup]
  console.log('Deleting the backup %s...', backupID);
  await cluster.deleteBackup(backupID, {
    gaxOptions: {
      // deleting a backup takes a good 30-40 seconds
      // if DEADLINE_EXCEEDED is witnessed, then deleteBackup exceeds the default timeout
      // this overrides it
      timeout: 50 * 1000,
    },
  });
  console.log('Deleted backup with ID %s, no response is returned.', backupID);
  // [END bigtable_delete_backup]

  // need to delete that other backup example
  await new Backup(bigtable, backupFromTable).delete({
    gaxOptions: {
      timeout: 50 * 1000,
    },
  });
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
