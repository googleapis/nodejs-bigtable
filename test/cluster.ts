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
import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import {afterEach, before, beforeEach, describe, it} from 'mocha';
import * as proxyquire from 'proxyquire';
import {CallOptions} from 'google-gax';
import * as sinon from 'sinon';
import {ModifiableBackupFields, Table} from '../src';

let promisified = false;
const fakePromisify = Object.assign({}, promisify, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promisifyAll(klass: Function, options: any) {
    if (klass.name === 'Cluster') {
      promisified = true;
    }
    promisify.promisifyAll(klass, options);
  },
});

describe('Bigtable/Cluster', () => {
  const CLUSTER_ID = 'my-cluster';
  const PROJECT_ID = 'grape-spaceship-123';
  const TABLE_ID = 'my-table';
  const BACKUP_ID = 'my-backup';

  const INSTANCE = {
    name: `projects/${PROJECT_ID}/instances/i`,
    bigtable: {projectId: PROJECT_ID},
  };

  const CLUSTER_NAME = `${INSTANCE.name}/clusters/${CLUSTER_ID}`;
  const TABLE_NAME = `${INSTANCE.name}/tables/${TABLE_ID}`;
  const BACKUP_NAME = `${CLUSTER_NAME}/backups/${BACKUP_ID}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Cluster: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cluster: any;

  let TABLE: Table;
  const BackupClassStub = sinon.stub();

  before(() => {
    Cluster = proxyquire('../src/cluster.js', {
      '@google-cloud/promisify': fakePromisify,
      './backup': {Backup: BackupClassStub},
    }).Cluster;
  });

  beforeEach(() => {
    cluster = new Cluster(INSTANCE, CLUSTER_ID);
    TABLE = {
      bigtable: {},
      name: TABLE_NAME,
    } as Table;
  });

  afterEach(() => {
    BackupClassStub.reset();
  });

  describe('instantiation', () => {
    it('should promisify all the things', () => {
      assert(promisified);
    });

    it('should localize Bigtable instance', () => {
      assert.strictEqual(cluster.bigtable, INSTANCE.bigtable);
    });

    it('should localize Instance instance', () => {
      assert.strictEqual(cluster.instance, INSTANCE);
    });

    it('should expand id into full resource path', () => {
      assert.strictEqual(cluster.name, CLUSTER_NAME);
    });

    it('should leave full cluster names unaltered', () => {
      const cluster = new Cluster(INSTANCE, CLUSTER_ID);
      assert.strictEqual(cluster.name, CLUSTER_NAME);
    });

    it('should localize the id from the name', () => {
      assert.strictEqual(cluster.id, CLUSTER_ID);
    });

    it('should leave full cluster names unaltered and localize the id from the name', () => {
      const cluster = new Cluster(INSTANCE, CLUSTER_NAME);
      assert.strictEqual(cluster.name, CLUSTER_NAME);
      assert.strictEqual(cluster.id, CLUSTER_ID);
    });

    it('should throw if cluster id in wrong format', () => {
      const id = `clusters/${CLUSTER_ID}`;
      assert.throws(() => {
        new Cluster(INSTANCE, id);
      }, Error);
    });
  });

  describe('getLocation_', () => {
    const LOCATION = 'us-central1-b';

    it('should format the location name', () => {
      const expected = `projects/${PROJECT_ID}/locations/${LOCATION}`;
      const formatted = Cluster.getLocation_(PROJECT_ID, LOCATION);
      assert.strictEqual(formatted, expected);
    });

    it('should format the location name for project name with /', () => {
      const PROJECT_NAME = 'projects/grape-spaceship-123';
      const expected = `projects/${PROJECT_NAME.split(
        '/'
      ).pop()}/locations/${LOCATION}`;
      const formatted = Cluster.getLocation_(PROJECT_NAME, LOCATION);
      assert.strictEqual(formatted, expected);
    });

    it('should not re-format a complete location', () => {
      const complete = `projects/p/locations/${LOCATION}`;
      const formatted = Cluster.getLocation_(PROJECT_ID, complete);
      assert.strictEqual(formatted, complete);
    });
  });

  describe('getStorageType_', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const types: any = {
      unspecified: 0,
      ssd: 1,
      hdd: 2,
    };

    it('should default to unspecified', () => {
      assert.strictEqual(Cluster.getStorageType_(), types.unspecified);
    });

    it('should lowercase a type', () => {
      assert.strictEqual(Cluster.getStorageType_('SSD'), types.ssd);
    });

    Object.keys(types).forEach(type => {
      it('should get the storage type for "' + type + '"', () => {
        assert.strictEqual(Cluster.getStorageType_(type), types[type]);
      });
    });
  });

  describe('create', () => {
    it('should call createCluster from instance', done => {
      const options = {};

      cluster.instance.createCluster = (
        id: string,
        options_: {},
        callback: Function
      ) => {
        assert.strictEqual(id, cluster.id);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      cluster.create(options, done);
    });

    it('should not require options', done => {
      cluster.instance.createCluster = (
        id: string,
        options: {},
        callback: Function
      ) => {
        assert.deepStrictEqual(options, {});
        callback(); // done()
      };

      cluster.create(done);
    });
  });

  describe('delete', () => {
    it('should make the correct request', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.bigtable.request = (config: any, callback: Function) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'deleteCluster');

        assert.deepStrictEqual(config.reqOpts, {
          name: cluster.name,
        });

        assert.deepStrictEqual(config.gaxOpts, {});

        callback(); // done()
      };

      cluster.delete(done);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      cluster.delete(gaxOptions, assert.ifError);
    });
  });

  describe('exists', () => {
    it('should not require gaxOptions', done => {
      cluster.getMetadata = (gaxOptions: CallOptions) => {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      cluster.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', done => {
      const gaxOptions = {};

      cluster.getMetadata = (gaxOptions_: CallOptions) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      cluster.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error: any = new Error('Error.');
      error.code = 5;

      cluster.getMetadata = (gaxOptions: CallOptions, callback: Function) => {
        callback(error);
      };

      cluster.exists((err: Error, exists: boolean) => {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if code is not 5', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error: any = new Error('Error.');
      error.code = 'NOT-5';
      cluster.getMetadata = (_: CallOptions, callback: Function) => {
        callback(error);
      };
      cluster.exists((err: Error) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', done => {
      cluster.getMetadata = (gaxOptions: CallOptions, callback: Function) => {
        callback(null, {});
      };
      cluster.exists((err: Error, exists: boolean) => {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('get', () => {
    it('should call getMetadata', done => {
      const gaxOptions = {};
      cluster.getMetadata = (gaxOptions_: {}) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };
      cluster.get(gaxOptions, assert.ifError);
    });

    it('should not require gaxOptions', done => {
      cluster.getMetadata = (gaxOptions: CallOptions) => {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      cluster.get(assert.ifError);
    });

    it('should return an error from getMetadata', done => {
      const error = new Error('Error.');

      cluster.getMetadata = (gaxOptions: CallOptions, callback: Function) => {
        callback(error);
      };

      cluster.get((err: Error) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', done => {
      const metadata = {};

      cluster.getMetadata = (gaxOptions: CallOptions, callback: Function) => {
        callback(null, metadata);
      };

      cluster.get((err: Error, cluster_: {}, metadata_: {}) => {
        assert.ifError(err);
        assert.strictEqual(cluster_, cluster);
        assert.strictEqual(metadata_, metadata);
        done();
      });
    });
  });

  describe('getMetadata', () => {
    it('should make correct request', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'getCluster');
        assert.deepStrictEqual(config.reqOpts, {
          name: cluster.name,
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        done();
      };
      cluster.getMetadata(assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      cluster.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update metadata', done => {
      const metadata = {};
      cluster.bigtable.request = (config: {}, callback: Function) => {
        callback(null, metadata);
      };
      cluster.getMetadata(() => {
        assert.strictEqual(cluster.metadata, metadata);
        done();
      });
    });

    it('should execute callback with original arguments', done => {
      const args = [{}, {}];
      cluster.bigtable.request = (config: {}, callback: Function) => {
        callback(...args);
      };
      cluster.getMetadata((...argsies: Array<{}>) => {
        assert.deepStrictEqual([].slice.call(argsies), args);
        done();
      });
    });
  });

  describe('setMetadata', () => {
    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.bigtable.request = (config: any, callback: Function) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'updateCluster');
        assert.strictEqual(config.reqOpts.name, CLUSTER_NAME);
        callback(); // done()
      };

      cluster.setMetadata({}, done);
    });

    it('should respect the nodes option', done => {
      const options = {
        nodes: 3,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.reqOpts.serveNodes, options.nodes);
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should accept and pass user provided input through', done => {
      const options = {
        nodes: 3,
        location: 'us-west2-b',
        defaultStorageType: 'exellent_type',
      };

      const expectedReqOpts = Object.assign(
        {},
        {name: CLUSTER_NAME, serveNodes: options.nodes},
        options
      );
      delete expectedReqOpts.nodes;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.bigtable.request = (config: any) => {
        assert.deepStrictEqual(config.reqOpts, expectedReqOpts);
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should respect the gaxOptions', done => {
      const options = {
        nodes: 3,
      };
      const gaxOptions = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.reqOpts.serveNodes, options.nodes);
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      cluster.setMetadata(options, gaxOptions, assert.ifError);
    });

    it('should execute callback with all arguments', done => {
      const args = [{}, {}];

      cluster.bigtable.request = (config: {}, callback: Function) => {
        callback(...args);
      };

      cluster.setMetadata({}, (...argsies: Array<{}>) => {
        assert.deepStrictEqual([].slice.call(argsies), args);
        done();
      });
    });
  });

  describe('createBackup', () => {
    let requestStub: sinon.SinonStub;
    let fields: ModifiableBackupFields;
    const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const expirePrecise = new PreciseDate(expireDate);
    const expireTimestamp = expirePrecise.toStruct();

    beforeEach(() => {
      requestStub = sinon.stub().yields(null, 'ok');
      cluster.bigtable.request = requestStub;
      fields = {
        expireTime: Object.freeze({...expireTimestamp}), // test immutable
      };
    });

    it('should throw if non-table provided', () => {
      assert.throws(
        () => cluster.createBackup({}, undefined, undefined, () => {}),
        TypeError,
        'table error is TypeError'
      );
      assert.throws(
        () => cluster.createBackup({}, undefined, undefined, () => {}),
        /table is required/i,
        'table as pojo'
      );
      assert.throws(
        () => cluster.createBackup(undefined, undefined, undefined, () => {}),
        /table is required/i,
        'table undefined'
      );
      assert.throws(
        () => cluster.createBackup(null, undefined, undefined, () => {}),
        /table is required/i,
        'table null'
      );
      assert(requestStub.notCalled);
    });

    it('should reject if missing table', async () => {
      await assert.rejects(
        async () => await cluster.createBackup(),
        /table is required/i
      );
      assert(requestStub.notCalled);
    });

    it('should throw if falsy id', () => {
      assert.throws(
        () => cluster.createBackup(TABLE, undefined, undefined, () => {}),
        TypeError,
        'id is TypeError'
      );
      assert.throws(
        () => cluster.createBackup(TABLE, undefined, undefined, () => {}),
        /id is required/i,
        'id is undefined'
      );
      assert.throws(
        () => cluster.createBackup(TABLE, null, undefined, () => {}),
        /id is required/i,
        'id is null'
      );
      assert.throws(
        () => cluster.createBackup(TABLE, '', undefined, () => {}),
        /id is required/i,
        'id is empty'
      );
      assert(requestStub.notCalled);
    });

    it('should reject if missing table id', async () => {
      await assert.rejects(
        async () => await cluster.createBackup(TABLE),
        /id is required/i
      );
      assert(requestStub.notCalled);
    });

    it('should throw if missing/invalid expireTime', () => {
      assert.throws(
        () => cluster.createBackup(TABLE, BACKUP_ID, {}, () => {}),
        TypeError,
        'expireTime is TypeError'
      );
      assert.throws(
        () => cluster.createBackup(TABLE, BACKUP_ID, {}, () => {}),
        /expireTime field is required/i,
        'expireTime is undefined'
      );
      assert.throws(
        () =>
          cluster.createBackup(TABLE, BACKUP_ID, {expireTime: null}, () => {}),
        /expireTime field is required/i,
        'expireTime is null'
      );
      assert.throws(
        () =>
          cluster.createBackup(
            TABLE,
            BACKUP_ID,
            {expireTime: {foo: 'bar'}},
            () => {}
          ),
        /expireTime field is required/i,
        'expireTime is invalid type'
      );
      assert(requestStub.notCalled);
    });

    it('should reject if missing expireTime', async () => {
      await assert.rejects(
        async () => await cluster.createBackup(TABLE, BACKUP_ID),
        /expireTime field is required/i
      );
      assert(requestStub.notCalled);
    });

    it('should call request with rpc signature', async () => {
      const [result] = await cluster.createBackup(TABLE, BACKUP_ID, fields);
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0], {
        client: 'BigtableTableAdminClient',
        method: 'createBackup',
        reqOpts: {
          parent: CLUSTER_NAME,
          backupId: BACKUP_ID,
          backup: {
            expireTime: expireTimestamp,
            sourceTable: TABLE_NAME,
          },
        },
        gaxOpts: undefined,
      });
      assert.strictEqual(result, 'ok');
    });

    it('should allow table name', async () => {
      const [result] = await cluster.createBackup(
        TABLE_NAME,
        BACKUP_ID,
        fields
      );
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(
        requestStub.firstCall.args[0].reqOpts.backup.sourceTable,
        TABLE_NAME
      );
      assert.strictEqual(result, 'ok');
    });

    it('should call request including opts', async () => {
      const [result] = await cluster.createBackup(TABLE, BACKUP_ID, fields, {
        gaxOptions: {timeout: 9000},
      });
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0].gaxOpts, {
        timeout: 9000,
      });
      assert.strictEqual(result, 'ok');
    });

    it('should pass through all fields', async () => {
      await cluster.createBackup(TABLE, BACKUP_ID, {
        ...fields,
        foo: 'bar',
      });
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0].reqOpts.backup, {
        expireTime: expireTimestamp,
        sourceTable: TABLE_NAME,
        foo: 'bar',
      });
    });

    it('should convert expireTime from Date', async () => {
      await cluster.createBackup(TABLE, BACKUP_ID, {expireTime: expireDate});
      assert.deepStrictEqual(
        requestStub.firstCall.args[0].reqOpts.backup.expireTime,
        expireTimestamp
      );
    });

    it('should convert expireTime from PreciseDate', async () => {
      await cluster.createBackup(TABLE, BACKUP_ID, {expireTime: expirePrecise});
      assert.deepStrictEqual(
        requestStub.firstCall.args[0].reqOpts.backup.expireTime,
        expireTimestamp
      );
    });

    it('should keep expireTime when struct', async () => {
      await cluster.createBackup(TABLE, BACKUP_ID, {
        expireTime: expireTimestamp,
      });
      assert.deepStrictEqual(
        requestStub.firstCall.args[0].reqOpts.backup.expireTime,
        expireTimestamp
      );
    });

    it('should bubble up errors while creating a backup', async () => {
      const err = new Error('uh oh!');
      requestStub.yields(err);
      await assert.rejects(
        async () => await cluster.createBackup(TABLE, BACKUP_ID, fields),
        err
      );
    });
  });

  describe('deleteBackup', () => {
    let requestStub: sinon.SinonStub;

    beforeEach(() => {
      requestStub = sinon.stub().yields(null, 'ok');
      cluster.bigtable.request = requestStub;
    });

    it('should throw if falsy backup id', () => {
      assert.throws(
        () => cluster.deleteBackup(undefined, () => {}),
        TypeError,
        'backup id error is TypeError'
      );
      assert.throws(
        () => cluster.deleteBackup(undefined, () => {}),
        /backup id is required/i,
        'backup id is undefined'
      );
      assert.throws(
        () => cluster.deleteBackup(null, () => {}),
        /backup id is required/i,
        'backup id is null'
      );
      assert.throws(
        () => cluster.deleteBackup('', () => {}),
        /backup id is required/i,
        'backup id is empty'
      );
      assert(requestStub.notCalled);
    });

    it('should reject if missing backup id', async () => {
      await assert.rejects(
        async () => await cluster.deleteBackup(),
        /backup id is required/i
      );
      assert(requestStub.notCalled);
    });

    it('should call request with rpc signature', async () => {
      const [result] = await cluster.deleteBackup(BACKUP_ID);
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0], {
        client: 'BigtableTableAdminClient',
        method: 'deleteBackup',
        reqOpts: {
          name: BACKUP_NAME,
        },
        gaxOpts: undefined,
      });
      assert.strictEqual(result, 'ok');
    });

    it('should call request including opts', async () => {
      const [result] = await cluster.deleteBackup(BACKUP_ID, {
        gaxOptions: {timeout: 9000},
      });
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0].gaxOpts, {
        timeout: 9000,
      });
      assert.strictEqual(result, 'ok');
    });

    it('should bubble up errors while deleting a backup', async () => {
      const err = new Error('uh oh!');
      requestStub.yields(err);
      await assert.rejects(
        async () => await cluster.deleteBackup(BACKUP_ID),
        err
      );
    });
  });

  describe('getBackup', () => {
    let requestStub: sinon.SinonStub;

    beforeEach(() => {
      requestStub = sinon.stub().yields(null, 'inner resp');
      cluster.bigtable.request = requestStub;
    });

    it('should throw if falsy backup id', () => {
      assert.throws(
        () => cluster.getBackup(undefined, () => {}),
        TypeError,
        'backup id error is TypeError'
      );
      assert.throws(
        () => cluster.getBackup(undefined, () => {}),
        /backup id is required/i,
        'backup id is undefined'
      );
      assert.throws(
        () => cluster.getBackup(null, () => {}),
        /backup id is required/i,
        'backup id is null'
      );
      assert.throws(
        () => cluster.getBackup('', () => {}),
        /backup id is required/i,
        'backup id is empty'
      );
      assert(requestStub.notCalled);
    });

    it('should reject if missing backup id', async () => {
      await assert.rejects(
        async () => await cluster.getBackup(),
        /backup id is required/i
      );
      assert(requestStub.notCalled);
    });

    it('should call request with rpc signature', async () => {
      await cluster.getBackup(BACKUP_ID);
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0], {
        client: 'BigtableTableAdminClient',
        method: 'getBackup',
        reqOpts: {
          name: BACKUP_NAME,
        },
        gaxOpts: undefined,
      });
    });

    it('should handle and transform the response', async () => {
      const [result] = await cluster.getBackup(BACKUP_ID);
      assert(BackupClassStub.calledOnce, 'Backup constructor called');
      assert.deepStrictEqual(BackupClassStub.firstCall.args, [
        {
          ...INSTANCE.bigtable,
          request: requestStub,
        },
        'inner resp',
      ]);
      assert(result instanceof BackupClassStub, 'is a Backup');
    });

    it('should call request including opts', async () => {
      const [result] = await cluster.getBackup(BACKUP_ID, {
        gaxOptions: {timeout: 9000},
      });
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0].gaxOpts, {
        timeout: 9000,
      });
      assert(result instanceof BackupClassStub, 'is a Backup');
    });

    it('should bubble up errors while getting a backup', async () => {
      const err = new Error('uh oh!');
      requestStub.yields(err);
      await assert.rejects(async () => await cluster.getBackup(BACKUP_ID), err);
      assert(
        BackupClassStub.notCalled,
        'do not instantiate a backup that is not returned'
      );
    });
  });

  describe('listBackups', () => {
    let requestStub: sinon.SinonStub;

    beforeEach(() => {
      requestStub = sinon.stub().yields(null, ['backup1', 'backup2']);
      cluster.bigtable.request = requestStub;
    });

    it('should call request with rpc signature', async () => {
      await cluster.listBackups();
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0], {
        client: 'BigtableTableAdminClient',
        method: 'listBackups',
        reqOpts: {
          parent: CLUSTER_NAME,
        },
        gaxOpts: undefined,
      });
    });

    it('should handle and transform the response', async () => {
      const bigtableMock = {
        ...INSTANCE.bigtable,
        request: requestStub,
      };
      const [result] = await cluster.listBackups();
      assert(
        BackupClassStub.calledTwice,
        'Backup constructor called for each item'
      );
      assert.deepStrictEqual(BackupClassStub.firstCall.args, [
        bigtableMock,
        'backup1',
      ]);
      assert.deepStrictEqual(BackupClassStub.secondCall.args, [
        bigtableMock,
        'backup2',
      ]);
      assert(Array.isArray(result));
      assert(result[0] instanceof BackupClassStub, 'first is a Backup');
      assert(result[1] instanceof BackupClassStub, 'second is a Backup');
    });

    it('should call request including gax opts', async () => {
      const [result] = await cluster.listBackups({
        gaxOptions: {timeout: 9000},
      });
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0].gaxOpts, {
        timeout: 9000,
      });
      assert(Array.isArray(result), 'still is the expected result');
    });

    it('should call request including extra opts', async () => {
      const [result] = await cluster.listBackups({
        filter: 'foo',
        orderBy: 'bar',
      });
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));

      const firstArg = requestStub.firstCall.args[0];
      assert.strictEqual(firstArg.reqOpts.filter, 'foo');
      assert.strictEqual(firstArg.reqOpts.orderBy, 'bar');

      assert(Array.isArray(result), 'still is the expected result');
    });

    it('should bubble up errors while getting a backup', async () => {
      const err = new Error('uh oh!');
      requestStub.yields(err);
      await assert.rejects(async () => await cluster.listBackups(), err);
      assert(
        BackupClassStub.notCalled,
        'do not instantiate backups when non are returned'
      );
    });
  });

  describe('updateBackup', () => {
    let requestStub: sinon.SinonStub;
    let fields: ModifiableBackupFields;
    const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const expirePrecise = new PreciseDate(expireDate);
    const expireTimestamp = expirePrecise.toStruct();

    beforeEach(() => {
      requestStub = sinon.stub().yields(null, 'inner resp');
      cluster.bigtable.request = requestStub;
      fields = {
        expireTime: Object.freeze({...expireTimestamp}), // test immutable
      };
    });

    it('should throw if falsy backup id', () => {
      assert.throws(
        () => cluster.updateBackup(undefined, undefined, () => {}),
        TypeError,
        'backup id error is TypeError'
      );
      assert.throws(
        () => cluster.updateBackup(undefined, undefined, () => {}),
        /backup id is required/i,
        'backup id is undefined'
      );
      assert.throws(
        () => cluster.updateBackup(null, undefined, () => {}),
        /backup id is required/i,
        'backup id is null'
      );
      assert.throws(
        () => cluster.updateBackup('', undefined, () => {}),
        /backup id is required/i,
        'backup id is empty'
      );
      assert(requestStub.notCalled);
    });

    it('should reject if missing backup id', async () => {
      await assert.rejects(
        async () => await cluster.updateBackup(),
        /backup id is required/i
      );
      assert(requestStub.notCalled);
    });

    it('should throw if missing fields', () => {
      assert.throws(
        () => cluster.updateBackup(BACKUP_ID, undefined, () => {}),
        TypeError,
        'fields error is TypeError'
      );
      assert.throws(
        () => cluster.updateBackup(BACKUP_ID, undefined, () => {}),
        /at least one field/i,
        'fields is undefined'
      );
      assert.throws(
        () => cluster.updateBackup(BACKUP_ID, null, () => {}),
        /at least one field/i,
        'fields is null'
      );
      assert.throws(
        () => cluster.updateBackup(BACKUP_ID, {}, () => {}),
        /at least one field/i,
        'no fields'
      );
      assert(requestStub.notCalled);
    });

    it('should reject if missing fields', async () => {
      await assert.rejects(
        async () => await cluster.updateBackup(BACKUP_ID),
        /at least one field/i,
        'fields is undefined'
      );
      await assert.rejects(
        async () => await cluster.updateBackup(BACKUP_ID, {}),
        /at least one field/i,
        'no fields'
      );
      assert(requestStub.notCalled);
    });

    it('should throw if invalid field: expireTime', () => {
      assert.throws(
        () => cluster.updateBackup(BACKUP_ID, {expireTime: null}, () => {}),
        TypeError,
        'expireTime error is TypeError'
      );
      assert.throws(
        () => cluster.updateBackup(BACKUP_ID, {expireTime: null}, () => {}),
        /at least one field/i,
        'expireTime is null'
      );
      assert.throws(
        () =>
          cluster.updateBackup(BACKUP_ID, {expireTime: {foo: 'bar'}}, () => {}),
        /expireTime field is invalid/i,
        'expireTime is invalid type'
      );
      assert(requestStub.notCalled);
    });

    it('should reject if invalid field: expireTime', async () => {
      await assert.rejects(
        async () =>
          await cluster.updateBackup(BACKUP_ID, {expireTime: {foo: 'bar'}}),
        /expireTime field is invalid/i
      );
      assert(requestStub.notCalled);
    });

    it('should call request with rpc signature', async () => {
      await cluster.updateBackup(BACKUP_ID, fields);
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0], {
        client: 'BigtableTableAdminClient',
        method: 'updateBackup',
        reqOpts: {
          backup: {
            name: BACKUP_NAME,
            expireTime: expireTimestamp,
          },
          updateMask: {
            paths: ['expire_time'],
          },
        },
        gaxOpts: undefined,
      });
    });

    it('should handle and transform the response', async () => {
      const [result] = await cluster.updateBackup(BACKUP_ID, fields);
      assert(BackupClassStub.calledOnce, 'Backup constructor called');
      assert.deepStrictEqual(BackupClassStub.firstCall.args, [
        {
          ...INSTANCE.bigtable,
          request: requestStub,
        },
        'inner resp',
      ]);
      assert(result instanceof BackupClassStub, 'is a Backup');
    });

    it('should call request including opts', async () => {
      const [result] = await cluster.updateBackup(BACKUP_ID, fields, {
        gaxOptions: {timeout: 9000},
      });
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(requestStub.firstCall.args[0].gaxOpts, {
        timeout: 9000,
      });
      assert(result instanceof BackupClassStub, 'is a Backup');
    });

    it('should include only supported fields in the mask', async () => {
      await cluster.updateBackup(BACKUP_ID, {...fields, foo: 'bar'});
      assert(requestStub.calledOnceWith(sinon.match.object, sinon.match.func));
      assert.deepStrictEqual(
        requestStub.firstCall.args[0].reqOpts.backup.foo,
        'bar',
        'backup struct includes foo'
      );
      assert.deepStrictEqual(
        requestStub.firstCall.args[0].reqOpts.updateMask.paths,
        ['expire_time'],
        'update mask excludes foo'
      );
    });

    it('should convert expireTime from Date', async () => {
      await cluster.updateBackup(BACKUP_ID, {expireTime: expireDate});
      assert.deepStrictEqual(
        requestStub.firstCall.args[0].reqOpts.backup.expireTime,
        expireTimestamp
      );
    });

    it('should convert expireTime from PreciseDate', async () => {
      await cluster.updateBackup(BACKUP_ID, {expireTime: expirePrecise});
      assert.deepStrictEqual(
        requestStub.firstCall.args[0].reqOpts.backup.expireTime,
        expireTimestamp
      );
    });

    it('should keep expireTime when struct', async () => {
      await cluster.updateBackup(BACKUP_ID, {
        expireTime: expireTimestamp,
      });
      assert.deepStrictEqual(
        requestStub.firstCall.args[0].reqOpts.backup.expireTime,
        expireTimestamp
      );
    });

    it('should bubble up errors while getting a backup', async () => {
      const err = new Error('uh oh!');
      requestStub.yields(err);
      await assert.rejects(
        async () => await cluster.updateBackup(BACKUP_ID, fields),
        err
      );
      assert(
        BackupClassStub.notCalled,
        'do not instantiate a backup that is not returned'
      );
    });
  });
});
