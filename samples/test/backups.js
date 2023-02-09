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

'use strict';

const {assert} = require('chai');
const cp = require('child_process');
const {after, before, describe, it} = require('mocha');
const {generateId, getStaleInstances, obtainTestInstance} = require('./util');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

describe('backups', async () => {
  const TABLE_ID = generateId();
  const BACKUP_ID = generateId();

  // The following `obtainTestInstance` line needs to be moved into `before`.
  // This needs to happen when we get the backup tests running again.
  const instance = await obtainTestInstance();

  const INSTANCE_ID = instance.id;
  const CLUSTER_ID = instance.id; // The test function uses the same name.

  const table = instance.table(TABLE_ID);
  const cluster = instance.cluster(INSTANCE_ID);
  const backup = cluster.backup(BACKUP_ID);

  async function createTestBackup(backupId) {
    const [backup, operation] = await cluster.createBackup(backupId, {
      table,
      expireTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    });
    await operation.promise();
    return backup;
  }

  before(async () => {
    await table.create();
    await table.createFamily('follows');
    await table.insert([
      {
        key: 'alincoln',
        data: {
          follows: {
            gwashington: 1,
          },
        },
      },
      {
        key: 'gwashington',
        data: {
          follows: {
            alincoln: 1,
          },
        },
      },
    ]);
    await createTestBackup(BACKUP_ID);
  });

  after(async () => {
    async function reapBackups(instance) {
      const [backups] = await instance.getBackups();
      return Promise.all(
        backups.map(backup => {
          return backup.delete({timeout: 50 * 1000});
        })
      );
    }

    const instances = await getStaleInstances();
    await Promise.all(instances.map(instance => reapBackups(instance)));
  });

  it('should create a backup', () => {
    const backupId = generateId();
    const stdout = execSync(
      `node ./backups.create.js ${INSTANCE_ID} ${TABLE_ID} ${CLUSTER_ID} ${backupId}`
    );
    assert.include(stdout, 'Started a table backup operation.');
    assert.include(stdout, `Backup "${backupId}" is now ready for use.`);
  });

  it('should delete an existing backup', async () => {
    const backupId = generateId();
    await createTestBackup(backupId);

    const stdout = execSync(
      `node ./backups.delete.js ${INSTANCE_ID} ${TABLE_ID} ${CLUSTER_ID} ${backupId}`
    );
    assert.include(stdout, `Backup ${backupId} was deleted successfully.`);
  });

  it('should get an existing backup', async () => {
    // Refresh our copy of the backup metadata.
    const [metadata] = await backup.getMetadata();

    const stdout = execSync(
      `node ./backups.get.js ${INSTANCE_ID} ${TABLE_ID} ${CLUSTER_ID} ${BACKUP_ID}`
    );
    assert.include(stdout, `The backup is ${metadata.sizeBytes} bytes.`);
    assert.include(
      stdout,
      `The backup will auto-delete at ${metadata.expireDate.toISOString()}`
    );
    assert.include(
      stdout,
      `The backup finished being created at ${metadata.endTime.toISOString()}`
    );
  });

  it('should get existing backups', async () => {
    const [backupsFromInstance] = await instance.listBackups();
    const [backupsFromCluster] = await cluster.listBackups();

    const stdout = execSync(
      `node ./backups.list.js ${INSTANCE_ID} ${TABLE_ID} ${CLUSTER_ID}`
    );
    assert.include(
      stdout,
      `${backupsFromInstance.length} backups returned from the instance.`
    );
    assert.include(
      stdout,
      `${backupsFromCluster.length} backups returned from the cluster.`
    );
  });

  it('should restore a backup', () => {
    const newTableId = generateId();
    const stdout = execSync(
      `node ./backups.list.js ${INSTANCE_ID} ${newTableId} ${BACKUP_ID}`
    );
    assert.include(stdout, `Table restored to ${newTableId} successfully.`);
  });

  it('should update a backup', async () => {
    const backupId = generateId();
    const backup = await createTestBackup(backupId);

    const oldExpireTime = backup.expireTime.toISOString();

    const stdout = execSync(
      `node ./backups.update.js ${INSTANCE_ID} ${TABLE_ID} ${CLUSTER_ID} ${backupId}`
    );

    const newExpireTime = backup.expireTime.toISOString();
    assert.notStrictEqual(oldExpireTime, newExpireTime);

    assert.include(
      stdout,
      `The backup will now auto-delete at ${backup.metadata.expireDate}.`
    );
  });
});
