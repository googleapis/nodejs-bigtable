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

import {PreciseDate} from '@google-cloud/precise-date';
import * as assert from 'assert';
import {afterEach, beforeEach, describe, it} from 'mocha';
import * as sinon from 'sinon';
import {Backup} from '../src/backup';
import {google} from '../protos/protos';
import {Bigtable, ModifiableBackupFields} from '../src';

import IBackup = google.bigtable.admin.v2.IBackup;

const sandbox = sinon.createSandbox();

describe('Bigtable/Backup', () => {
  const PROJECT_ID = 'my-project';
  const INSTANCE_ID = 'my-instance';
  const CLUSTER_ID = 'my-cluster';
  const BACKUP_ID = 'my-backup';
  const TABLE_ID = 'my-table';

  const INSTANCE_NAME = `projects/${PROJECT_ID}/instances/${INSTANCE_ID}`;
  const CLUSTER_NAME = `${INSTANCE_NAME}/clusters/${CLUSTER_ID}`;
  const BACKUP_NAME = `${CLUSTER_NAME}/backups/${BACKUP_ID};`;
  const TABLE_NAME = `${INSTANCE_NAME}/tables/${TABLE_ID}`;

  const now = Date.now();
  const aMinuteInMillis = 60 * 1000;
  const aDayInMillis = 24 * 60 * aMinuteInMillis;

  let bigtableMock: unknown;
  let backupStruct: IBackup;
  let instanceStub: sinon.SinonStub;
  let clusterStub: sinon.SinonStub;
  let clusterPathStub: sinon.SinonStub;
  let matchProjectStub: sinon.SinonStub;
  let matchInstanceStub: sinon.SinonStub;
  let matchClusterStub: sinon.SinonStub;
  let matchBackupStub: sinon.SinonStub;

  beforeEach(() => {
    instanceStub = sandbox.stub();
    clusterStub = sandbox.stub();
    clusterPathStub = sandbox.stub().returns(CLUSTER_NAME);
    matchProjectStub = sandbox.stub().returns(PROJECT_ID);
    matchInstanceStub = sandbox.stub().returns(INSTANCE_ID);
    matchClusterStub = sandbox.stub().returns(CLUSTER_ID);
    matchBackupStub = sandbox.stub().returns(BACKUP_ID);

    const instanceMock = {
      cluster: clusterStub,
    };
    instanceStub.returns(instanceMock);

    bigtableMock = {
      api: {
        BigtableTableAdminClient: {
          clusterPath: clusterPathStub,
          matchProjectFromBackupName: matchProjectStub,
          matchInstanceFromBackupName: matchInstanceStub,
          matchClusterFromBackupName: matchClusterStub,
          matchBackupFromBackupName: matchBackupStub,
        },
      },
      instance: instanceStub,
    };

    backupStruct = Object.freeze({
      name: BACKUP_NAME,
      sourceTable: TABLE_NAME,
      expireTime: new PreciseDate(now + aDayInMillis).toStruct(),
      startTime: new PreciseDate(now).toStruct(),
      endTime: new PreciseDate(now + aMinuteInMillis).toStruct(),
      sizeBytes: 42,
      state: 'READY',
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('instantiation', () => {
    it('should create backup from response data', () => {
      assert.doesNotThrow(
        () => new Backup(bigtableMock as Bigtable, backupStruct)
      );
    });

    it('should copy all properties to maintain the interface', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      assert.strictEqual(backup.name, backupStruct.name);
      assert.strictEqual(backup.sourceTable, backupStruct.sourceTable);
      assert.deepStrictEqual(backup.expireTime, backupStruct.expireTime);
      assert.deepStrictEqual(backup.startTime, backupStruct.startTime);
      assert.deepStrictEqual(backup.endTime, backupStruct.endTime);
      assert.strictEqual(backup.sizeBytes, backupStruct.sizeBytes);
      assert.strictEqual(backup.state, backupStruct.state);
    });

    it('should keep the original struct as metadata', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      assert.strictEqual(backup.metadata, backupStruct);
    });

    it('should keep a copy of original instance primitive as metadata', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const copy = new Backup(bigtableMock as Bigtable, backup);
      assert.notStrictEqual(copy.metadata, backup);
      assert.deepStrictEqual(copy.metadata, backupStruct);
    });
  });

  describe('parent', () => {
    it('should return inferred parent (cluster)', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      assert.strictEqual(backup.parent, CLUSTER_NAME);
      assert(clusterPathStub.calledOnce);
      assert.deepStrictEqual(clusterPathStub.firstCall.args, [
        PROJECT_ID,
        INSTANCE_ID,
        CLUSTER_ID,
      ]);
    });

    it('should throw if missing backup name', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.name = null;
      assert.throws(() => backup.parent, TypeError);
      assert(clusterPathStub.notCalled);
    });
  });

  describe('projectId', () => {
    it('should return inferred projectId', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      assert.strictEqual(backup.projectId, PROJECT_ID);
      assert(matchProjectStub.calledOnce);
      assert.deepStrictEqual(matchProjectStub.firstCall.args, [BACKUP_NAME]);
    });

    it('should throw if missing backup name', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.name = null;
      assert.throws(() => backup.projectId, TypeError);
      assert(matchProjectStub.notCalled);
    });
  });

  describe('instanceId', () => {
    it('should return inferred instanceId', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      assert.strictEqual(backup.instanceId, INSTANCE_ID);
      assert(matchInstanceStub.calledOnce);
      assert.deepStrictEqual(matchInstanceStub.firstCall.args, [BACKUP_NAME]);
    });

    it('should throw if missing backup name', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.name = null;
      assert.throws(() => backup.instanceId, TypeError);
      assert(matchInstanceStub.notCalled);
    });
  });

  describe('clusterId', () => {
    it('should return inferred clusterId', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      assert.strictEqual(backup.clusterId, CLUSTER_ID);
      assert(matchClusterStub.calledOnce);
      assert.deepStrictEqual(matchClusterStub.firstCall.args, [BACKUP_NAME]);
    });

    it('should throw if missing backup name', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.name = null;
      assert.throws(() => backup.clusterId, TypeError);
      assert(matchClusterStub.notCalled);
    });
  });

  describe('backupId', () => {
    it('should return inferred backupId', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      assert.strictEqual(backup.backupId, BACKUP_ID);
      assert(matchBackupStub.calledOnce);
      assert.deepStrictEqual(matchBackupStub.firstCall.args, [BACKUP_NAME]);
    });

    it('should throw if missing backup name', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.name = null;
      assert.throws(() => backup.backupId, TypeError);
      assert(matchBackupStub.notCalled);
    });
  });

  describe('expireDate', () => {
    it('should return expireTime as expireDate', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const {expireDate} = backup;
      assert(expireDate instanceof PreciseDate);
      assert.deepStrictEqual(expireDate.toStruct(), backupStruct.expireTime);
    });

    it('should throw if missing expireTime', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.expireTime = null;
      assert.throws(() => backup.expireDate, TypeError);
    });
  });

  describe('startDate', () => {
    it('should return startTime as startDate', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const {startDate} = backup;
      assert(startDate instanceof PreciseDate);
      assert.deepStrictEqual(startDate.toStruct(), backupStruct.startTime);
    });

    it('should throw if missing startTime', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.startTime = null;
      assert.throws(() => backup.startDate, TypeError);
    });
  });

  describe('endDate', () => {
    it('should return endTime as endDate', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const {endDate} = backup;
      assert(endDate instanceof PreciseDate);
      assert.deepStrictEqual(endDate.toStruct(), backupStruct.endTime);
    });

    it('should throw if missing endTime', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.endTime = null;
      assert.throws(() => backup.endDate, TypeError);
    });
  });

  describe('delete', () => {
    let deleteStub: sinon.SinonStub;

    beforeEach(() => {
      deleteStub = sandbox.stub().resolves('ok');
      clusterStub.returns({deleteBackup: deleteStub});
    });

    it('should delete backup via cluster interface', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      await backup.delete();
      assert(instanceStub.calledOnceWithExactly(INSTANCE_ID), 'instance');
      assert(clusterStub.calledOnceWithExactly(CLUSTER_ID), 'cluster');
      assert(deleteStub.calledOnce, 'deleteBackup');
      assert.deepStrictEqual(deleteStub.firstCall.args, [BACKUP_ID, undefined]);
    });

    it('should pass through options', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const opts = Object.freeze({gaxOptions: {timeout: 9000}});
      await backup.delete(opts);
      assert(deleteStub.calledOnce, 'deleteBackup');
      assert.deepStrictEqual(deleteStub.firstCall.args, [BACKUP_ID, opts]);
    });

    it('should reject if missing backup name', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.name = null;
      await assert.rejects(async () => await backup.delete(), TypeError);
      assert(deleteStub.notCalled);
    });

    it('should resolve the original value from api', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const result = await backup.delete();
      assert.strictEqual(result, 'ok');
    });
  });

  describe('get', () => {
    let getStub: sinon.SinonStub;

    beforeEach(() => {
      getStub = sandbox.stub().resolves('ok');
      clusterStub.returns({getBackup: getStub});
    });

    it('should get backup via cluster interface', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      await backup.get();
      assert(instanceStub.calledOnceWithExactly(INSTANCE_ID), 'instance');
      assert(clusterStub.calledOnceWithExactly(CLUSTER_ID), 'cluster');
      assert(getStub.calledOnce, 'getBackup');
      assert.deepStrictEqual(getStub.firstCall.args, [BACKUP_ID, undefined]);
    });

    it('should pass through options', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const opts = Object.freeze({gaxOptions: {timeout: 9000}});
      await backup.get(opts);
      assert(getStub.calledOnce, 'getBackup');
      assert.deepStrictEqual(getStub.firstCall.args, [BACKUP_ID, opts]);
    });

    it('should reject if missing backup name', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.name = null;
      await assert.rejects(async () => await backup.get(), TypeError);
      assert(getStub.notCalled);
    });

    it('should resolve the original value from api', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const result = await backup.get();
      assert.strictEqual(result, 'ok');
    });
  });

  describe('restore', () => {
    let restoreStub: sinon.SinonStub;

    beforeEach(() => {
      restoreStub = sandbox.stub().resolves('ok');
      instanceStub.returns({restoreTable: restoreStub});
    });

    it('should restore backup via cluster interface', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      await backup.restore(TABLE_ID);
      assert(instanceStub.calledOnceWithExactly(INSTANCE_ID), 'instance');
      assert(clusterStub.notCalled, 'avoid cluster invocation mistake');
      assert(restoreStub.calledOnce, 'restoreBackup');
      assert.deepStrictEqual(restoreStub.firstCall.args, [
        BACKUP_ID,
        CLUSTER_ID,
        TABLE_ID,
        undefined,
      ]);
    });

    it('should pass through options', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const opts = Object.freeze({gaxOptions: {timeout: 9000}});
      await backup.restore(TABLE_ID, opts);
      assert(restoreStub.calledOnce, 'restoreBackup');
      assert.deepStrictEqual(restoreStub.firstCall.args, [
        BACKUP_ID,
        CLUSTER_ID,
        TABLE_ID,
        opts,
      ]);
    });

    it('should reject if missing backup name', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.name = null;
      await assert.rejects(
        async () => await backup.restore(TABLE_ID),
        TypeError
      );
      assert(restoreStub.notCalled);
    });

    it('should resolve the original value from api', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const result = await backup.restore(TABLE_ID);
      assert.strictEqual(result, 'ok');
    });
  });

  describe('update', () => {
    let updateStub: sinon.SinonStub;
    let fields: ModifiableBackupFields;

    beforeEach(() => {
      updateStub = sandbox.stub().resolves('ok');
      clusterStub.returns({updateBackup: updateStub});
      fields = {
        expireTime: new Date(),
      };
    });

    it('should update backup via cluster interface', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      await backup.update(fields);
      assert(instanceStub.calledOnceWithExactly(INSTANCE_ID), 'instance');
      assert(clusterStub.calledOnceWithExactly(CLUSTER_ID), 'cluster');
      assert(updateStub.calledOnce, 'updateBackup');
      assert.deepStrictEqual(updateStub.firstCall.args, [
        BACKUP_ID,
        fields,
        undefined,
      ]);
    });

    it('should pass through options', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const opts = Object.freeze({gaxOptions: {timeout: 9000}});
      await backup.update(fields, opts);
      assert(updateStub.calledOnce, 'updateBackup');
      assert.deepStrictEqual(updateStub.firstCall.args, [
        BACKUP_ID,
        fields,
        opts,
      ]);
    });

    it('should reject if missing backup name', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      backup.name = null;
      await assert.rejects(async () => await backup.update(fields), TypeError);
      assert(updateStub.notCalled);
    });

    it('should resolve the original value from api', async () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const result = await backup.update(fields);
      assert.strictEqual(result, 'ok');
    });
  });

  describe('valueOf', () => {
    it('should implement valueOf which clones from metadata', () => {
      const backup = new Backup(bigtableMock as Bigtable, backupStruct);
      const cloned = backup.valueOf();

      assert.deepStrictEqual(cloned, backupStruct);
      assert.notStrictEqual(cloned, backupStruct);

      assert.deepStrictEqual(cloned, backup.metadata);
      assert.notStrictEqual(cloned, backup.metadata);
    });
  });
});
