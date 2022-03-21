// Copyright 2016 Google LLC
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

import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import {before, beforeEach, afterEach, describe, it} from 'mocha';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';
import {ServiceError} from 'google-gax';

import * as inst from '../src/instance';
import {AppProfile, AppProfileOptions} from '../src/app-profile';
import {Cluster, CreateClusterOptions} from '../src/cluster';
import {Family} from '../src/family';
import {
  Policy,
  Table,
  GetIamPolicyOptions,
  GetTablesOptions,
} from '../src/table';
import {Bigtable, RequestOptions} from '../src';
import {PassThrough} from 'stream';
import * as pumpify from 'pumpify';
import {RestoreTableConfig} from '../src/backup';

const sandbox = sinon.createSandbox();

let promisified = false;
const fakePromisify = Object.assign({}, promisify, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promisifyAll(klass: Function, options: any) {
    if (klass.name !== 'Instance') {
      return;
    }
    promisified = true;
    assert.deepStrictEqual(options.exclude, [
      'appProfile',
      'cluster',
      'table',
      'getBackupsStream',
      'getTablesStream',
      'getAppProfilesStream',
    ]);
  },
});

class FakeAppProfile extends AppProfile {
  calledWith_: Array<{}>;
  constructor(...args: [inst.Instance, string]) {
    super(args[0], args[1]);
    this.calledWith_ = args;
  }
}

class FakeBackup {}

class FakeCluster extends Cluster {
  calledWith_: Array<{}>;
  constructor(...args: [inst.Instance, string]) {
    super(args[0], args[1]);
    this.calledWith_ = args;
  }
}

class FakeFamily extends Family {
  calledWith_: Array<{}>;
  constructor(...args: [Table, string]) {
    super(args[0], args[1]);
    this.calledWith_ = args;
  }
}

class FakeTable extends Table {
  calledWith_: Array<{}>;
  VIEWS?: {[index: string]: number};
  constructor(...args: [inst.Instance, string]) {
    super(args[0], args[1]);
    this.calledWith_ = args;
  }
}

describe('Bigtable/Instance', () => {
  const INSTANCE_ID = 'my-instance';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const BIGTABLE = {
    projectName: 'projects/my-project',
    projectId: 'my-project',
    request: () => {},
  } as Bigtable;
  const INSTANCE_NAME = `${BIGTABLE.projectName}/instances/${INSTANCE_ID}`;
  const APP_PROFILE_ID = 'my-app-profile';
  const CLUSTER_ID = 'my-cluster';
  let Instance: typeof inst.Instance;
  let instance: inst.Instance;

  before(() => {
    Instance = proxyquire('../src/instance.js', {
      '@google-cloud/promisify': fakePromisify,
      './app-profile.js': {AppProfile: FakeAppProfile},
      './backup.js': {Backup: FakeBackup},
      './cluster.js': {Cluster: FakeCluster},
      './family.js': {Family: FakeFamily},
      './table.js': {Table: FakeTable},
      pumpify,
    }).Instance;
  });

  beforeEach(() => {
    instance = new Instance(BIGTABLE, INSTANCE_ID);
  });

  afterEach(() => sandbox.restore());

  describe('instantiation', () => {
    it('should promisify all the things', () => {
      assert(promisified);
    });

    it('should localize Bigtable instance', () => {
      assert.strictEqual(instance.bigtable, BIGTABLE);
    });

    it('should create full ID from name', () => {
      assert.strictEqual(instance.name, INSTANCE_NAME);
    });

    it('should localize name', () => {
      assert.strictEqual(instance.id, INSTANCE_ID);
    });

    it('should leave full instance name unaltered and localize the id from the name', () => {
      const instance = new Instance(BIGTABLE, INSTANCE_NAME);
      assert.strictEqual(instance.name, INSTANCE_NAME);
      assert.strictEqual(instance.id, INSTANCE_ID);
    });

    it('should throw if instance id in wrong format', () => {
      const id = `instances/${INSTANCE_ID}`;
      assert.throws(() => {
        new Instance(BIGTABLE, id);
      }, Error);
    });
  });

  describe('getTypeType_', () => {
    const types = {
      unspecified: 0,
      production: 1,
      development: 2,
    } as {[index: string]: number};

    it('should default to unspecified', () => {
      assert.strictEqual(Instance.getTypeType_(), types.unspecified);
      assert.strictEqual(
        Instance.getTypeType_('not-real-type'),
        types.unspecified
      );
    });

    it('should lowercase a type', () => {
      assert.strictEqual(Instance.getTypeType_('PRODUCTION'), types.production);
    });

    Object.keys(types).forEach(type => {
      it(`should get the storage type for "${type}"`, () => {
        assert.strictEqual(Instance.getTypeType_(type), types[type]);
      });
    });
  });

  describe('create', () => {
    it('should call createInstance from bigtable', done => {
      const options = {} as inst.InstanceOptions;
      (instance.bigtable.createInstance as Function) = (
        id: string,
        options_: {},
        callback: Function
      ) => {
        assert.strictEqual(id, instance.id);
        assert.strictEqual(options_, options);
        callback(); // done()
      };
      instance.create(options, done);
    });
  });

  describe('createAppProfile', () => {
    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'createAppProfile');
        assert.strictEqual(config.reqOpts.parent, INSTANCE_NAME);
        assert.strictEqual(config.reqOpts.appProfileId, APP_PROFILE_ID);
        assert.strictEqual(config.gaxOpts, undefined);
        done();
      };
      instance.createAppProfile(
        APP_PROFILE_ID,
        {routing: 'any'},
        assert.ifError
      );
    });

    it('should throw if the routing option is not provided', () => {
      assert.throws(
        instance.createAppProfile.bind(null, APP_PROFILE_ID, assert.ifError),
        /An app profile must contain a routing policy\./
      );
    });

    it('should accept gaxOptions', done => {
      const options = {
        routing: 'any',
        gaxOptions: {},
      } as AppProfileOptions;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };
      instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
    });

    describe('should respect the routing option with', () => {
      const cluster = new FakeCluster({} as inst.Instance, CLUSTER_ID);

      it("an 'any' value", done => {
        const options = {
          routing: 'any',
        } as AppProfileOptions;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (instance.bigtable.request as Function) = (config: any) => {
          assert.deepStrictEqual(
            config.reqOpts.appProfile.multiClusterRoutingUseAny,
            {}
          );
          done();
        };
        instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
      });

      it('a cluster value', done => {
        const options = {routing: cluster};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (instance.bigtable.request as Function) = (config: any) => {
          assert.deepStrictEqual(
            config.reqOpts.appProfile.singleClusterRouting,
            {clusterId: CLUSTER_ID}
          );
          done();
        };
        instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
      });
    });

    it('should respect the allowTransactionalWrites option', done => {
      const cluster = instance.cluster(CLUSTER_ID);
      const options = {
        routing: cluster,
        allowTransactionalWrites: true,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(
          config.reqOpts.appProfile.singleClusterRouting
            .allowTransactionalWrites,
          true
        );
        done();
      };
      instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
    });

    it('should respect the description option', done => {
      const options = {
        routing: 'any',
        description: 'My App Profile',
      } as AppProfileOptions;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(
          config.reqOpts.appProfile.description,
          options.description
        );
        done();
      };
      instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
    });

    it('should respect the ignoreWarnings option', done => {
      const options = {
        routing: 'any',
        ignoreWarnings: true,
      } as AppProfileOptions;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(config.reqOpts.ignoreWarnings, true);
        done();
      };
      instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
    });

    it('should execute callback with arguments from GAPIC', done => {
      const response = {};
      sandbox
        .stub(instance.bigtable, 'request')
        .callsArgWith(1, null, response);
      const fakeAppProfile = {};
      (instance.appProfile as Function) = (id: string) => {
        assert.strictEqual(id, APP_PROFILE_ID);
        return fakeAppProfile;
      };
      instance.createAppProfile(
        APP_PROFILE_ID,
        {routing: 'any'},
        (err, appProfile, apiResponse) => {
          assert.ifError(err);
          assert.strictEqual(appProfile, fakeAppProfile);
          assert.strictEqual(apiResponse, response);
          done();
        }
      );
    });
  });

  describe('createCluster', () => {
    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'createCluster');
        assert.strictEqual(config.reqOpts.parent, INSTANCE_NAME);
        assert.strictEqual(config.reqOpts.clusterId, CLUSTER_ID);
        assert.strictEqual(config.gaxOpts, undefined);
        done();
      };
      instance.createCluster(CLUSTER_ID, assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const options = {
        gaxOptions: {},
      } as CreateClusterOptions;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };
      instance.createCluster(CLUSTER_ID, options, assert.ifError);
    });

    it('should respect the location option', done => {
      const options = {
        location: 'us-central1-b',
      } as CreateClusterOptions;
      const fakeLocation = 'a/b/c/d';
      sandbox
        .stub(FakeCluster, 'getLocation_')
        .callsFake((project, location) => {
          assert.strictEqual(project, BIGTABLE.projectId);
          assert.strictEqual(location, options.location);
          return fakeLocation;
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.reqOpts.cluster.location, fakeLocation);
        done();
      };
      instance.createCluster(CLUSTER_ID, options, assert.ifError);
    });

    it('should respect the nodes option', done => {
      const options = {
        nodes: 3,
        location: 'us-central1-c',
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.reqOpts.cluster.serveNodes, options.nodes);
        done();
      };
      instance.createCluster(CLUSTER_ID, options, assert.ifError);
    });

    it('should respect the storage option', done => {
      const options = {
        storage: 'ssd',
      } as CreateClusterOptions;
      const fakeStorageType = 2;
      sandbox.stub(FakeCluster, 'getStorageType_').callsFake(type => {
        assert.strictEqual(type, options.storage);
        return fakeStorageType;
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(
          config.reqOpts.cluster.defaultStorageType,
          fakeStorageType
        );
        done();
      };
      instance.createCluster(CLUSTER_ID, options, assert.ifError);
    });

    it('should respect the key option', done => {
      const key = 'kms-key-name';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(config.reqOpts.cluster.encryptionConfig, {
          kmsKeyName: key,
        });
        done();
      };

      instance.createCluster(
        CLUSTER_ID,
        {key} as CreateClusterOptions,
        assert.ifError
      );
    });

    it('should handle clusters with an encryption object', done => {
      const key = 'kms-key-name';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(config.reqOpts.cluster.encryptionConfig, {
          kmsKeyName: key,
        });
        done();
      };

      instance.createCluster(
        CLUSTER_ID,
        {encryption: {kmsKeyName: key}} as CreateClusterOptions,
        assert.ifError
      );
    });

    it('should throw if both an encryption object and a key are provided', () => {
      const key = 'kms-key-name';

      assert.throws(() => {
        instance.createCluster(
          CLUSTER_ID,
          {encryption: {kmsKeyName: key}, key} as CreateClusterOptions,
          assert.ifError
        );
      }, /The cluster cannot have both `encryption` and `key` defined\./);
    });

    it('should execute callback with arguments from GAPIC', done => {
      const response = {};
      sandbox
        .stub(instance.bigtable, 'request')
        .callsArgWith(1, null, response);
      const fakeCluster = {};
      (instance.cluster as Function) = (name: string) => {
        assert.strictEqual(name, CLUSTER_ID);
        return fakeCluster;
      };
      (instance.createCluster as Function)(
        CLUSTER_ID,
        (err: Error, cluster: {}, apiResponse: {}) => {
          assert.ifError(err);
          assert.strictEqual(cluster, fakeCluster);
          assert.strictEqual(apiResponse, response);
          done();
        }
      );
    });
  });

  describe('createTable', () => {
    const TABLE_ID = 'my-table';
    const TABLE_NAME =
      'projects/my-project/instances/my-instance/tables/my-table';

    it('should throw if an id is not provided', () => {
      assert.throws(() => {
        (instance.createTable as Function)();
      }, /An id is required to create a table\./);
    });

    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'createTable');
        assert.strictEqual(config.reqOpts.parent, INSTANCE_NAME);
        assert.strictEqual(config.reqOpts.tableId, TABLE_ID);
        assert.deepStrictEqual(config.reqOpts.table, {granularity: 0});
        assert.strictEqual(config.gaxOpts, undefined);
        done();
      };
      instance.createTable(TABLE_ID, assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const options = {
        gaxOptions: {},
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };
      instance.createTable(TABLE_ID, options, assert.ifError);
    });

    it('should set the initial split keys', done => {
      const options = {
        splits: ['a', 'b'],
      };
      const expectedSplits = [{key: 'a'}, {key: 'b'}];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(config.reqOpts.initialSplits, expectedSplits);
        done();
      };
      instance.createTable(TABLE_ID, options, assert.ifError);
    });

    describe('creating column families', () => {
      it('should accept a family name', done => {
        const options = {
          families: ['a', 'b'],
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (instance.bigtable.request as Function) = (config: any) => {
          assert.deepStrictEqual(config.reqOpts.table.columnFamilies, {
            a: {},
            b: {},
          });
          done();
        };
        instance.createTable(TABLE_ID, options, assert.ifError);
      });

      it('should accept a garbage collection object', done => {
        const options = {
          families: [
            {
              name: 'e',
              rule: {},
            },
          ],
        };
        const fakeRule = {a: 'b'};
        (FakeFamily.formatRule_ as Function) = (rule: {}) => {
          assert.strictEqual(rule, options.families[0].rule);
          return fakeRule;
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (instance.bigtable.request as Function) = (config: any) => {
          assert.deepStrictEqual(config.reqOpts.table.columnFamilies, {
            e: {
              gcRule: fakeRule,
            },
          });
          done();
        };
        instance.createTable(TABLE_ID, options, assert.ifError);
      });
    });

    it('should return a Table object', done => {
      const response = {
        name: TABLE_NAME,
      };
      const fakeTable = {} as Table;
      sandbox.stub(instance, 'table').callsFake(id => {
        assert.strictEqual(id, response.name.split('/').pop());
        return fakeTable;
      });
      sandbox
        .stub(instance.bigtable, 'request')
        .callsArgWith(1, null, response);
      instance.createTable(TABLE_ID, (err, table, apiResponse) => {
        assert.ifError(err);
        assert.strictEqual(table, fakeTable);
        assert.strictEqual(table!.metadata, response);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('createTableFromBackup', () => {
    it('should throw if a table is not provided', () => {
      assert.throws(() => {
        (instance.createTableFromBackup as Function)({});
      }, /A table id is required to restore from a backup\./);
    });

    it('should restore from a provided Backup instance', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup = new FakeBackup() as any;
      const table = 'table';

      backup.restoreTo = (config: RestoreTableConfig, callback: Function) => {
        assert.strictEqual(config.tableId, table);
        assert.strictEqual(config.instance, instance);
        assert.strictEqual(typeof config.gaxOptions, 'undefined');
        callback(); // done()
      };

      instance.createTableFromBackup(
        {
          table,
          backup,
        },
        done
      );
    });

    it('should create a Backup using the provided name', done => {
      const clusterId = 'my-cluster';
      const backupId = 'my-backup';
      const backup = `instances/${instance.id}/clusters/${clusterId}/backups/${backupId}`;
      const table = 'table';

      (instance.cluster as Function) = (id: string) => {
        assert.strictEqual(id, clusterId);
        return {
          backup: (id: string) => {
            assert.strictEqual(id, backup);
            return {
              restoreTo: (config: RestoreTableConfig, callback: Function) => {
                assert.strictEqual(config.tableId, table);
                assert.strictEqual(config.instance, instance);
                assert.strictEqual(typeof config.gaxOptions, 'undefined');
                callback(); // done()
              },
            };
          },
        };
      };

      instance.createTableFromBackup(
        {
          table,
          backup,
        },
        done
      );
    });

    it('should respect a Backup from a different instance', done => {
      const diffInstanceId = 'diff-instance';
      const clusterId = 'my-cluster';
      const backupId = 'my-backup';
      const backup = `instances/${diffInstanceId}/clusters/${clusterId}/backups/${backupId}`;
      const table = 'table';

      (instance.bigtable.instance as Function) = (id: string) => {
        assert.strictEqual(id, diffInstanceId);
        return {
          cluster: (id: string) => {
            assert.strictEqual(id, clusterId);
            return {
              backup: (id: string) => {
                assert.strictEqual(id, backup);
                return {
                  restoreTo: (
                    config: RestoreTableConfig,
                    callback: Function
                  ) => {
                    assert.strictEqual(config.tableId, table);
                    assert.strictEqual(config.instance, instance);
                    assert.strictEqual(typeof config.gaxOptions, 'undefined');
                    callback(); // done()
                  },
                };
              },
            };
          },
        };
      };

      instance.createTableFromBackup(
        {
          table,
          backup,
        },
        done
      );
    });

    it('should throw if an unformatted backup name is provided', () => {
      const backup = 'backup-id';
      const table = 'table';

      assert.throws(() => {
        instance.createTableFromBackup(
          {
            table,
            backup,
          },
          assert.ifError
        );
      }, /A complete backup name \(path\) is required or a Backup object\./);
    });

    it('should accept gaxOptions', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backup = new FakeBackup() as any;
      const table = 'table';
      const gaxOptions = {};

      backup.restoreTo = (config: RestoreTableConfig) => {
        assert.strictEqual(config.gaxOptions, gaxOptions);
        done();
      };

      instance.createTableFromBackup(
        {
          table,
          backup,
          gaxOptions,
        },
        assert.ifError
      );
    });
  });

  describe('cluster', () => {
    it('should return a Cluster object', () => {
      const cluster = instance.cluster(CLUSTER_ID);
      assert(cluster instanceof FakeCluster);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const args = (cluster as any).calledWith_;
      assert.strictEqual(args[0], instance);
      assert.strictEqual(args[1], CLUSTER_ID);
    });
  });

  describe('delete', () => {
    it('should make the correct request', done => {
      (instance.bigtable.request as Function) = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: any,
        callback: Function
      ) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'deleteInstance');
        assert.deepStrictEqual(config.reqOpts, {
          name: instance.name,
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        callback(); // done()
      };
      instance.delete(done);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      instance.delete(gaxOptions, assert.ifError);
    });
  });

  describe('exists', () => {
    it('should not require gaxOptions', done => {
      (instance.getMetadata as Function) = (gaxOptions: {}) => {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };
      instance.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', done => {
      const gaxOptions = {};
      (instance.getMetadata as Function) = (gaxOptions_: {}) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };
      instance.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', done => {
      const error = new Error('Error.') as ServiceError;
      error.code = 5;
      sandbox.stub(instance, 'getMetadata').callsArgWith(1, error);
      instance.exists((err, exists) => {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if code is not 5', done => {
      const error = new Error('Error.') as ServiceError;
      error.code = 'NOT-5' as {} as number;
      sandbox.stub(instance, 'getMetadata').callsArgWith(1, error);
      instance.exists(err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', done => {
      sandbox.stub(instance, 'getMetadata').callsArgWith(1, null, {});
      instance.exists((err, exists) => {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('get', () => {
    it('should call getMetadata', done => {
      const gaxOptions = {};
      (instance.getMetadata as Function) = (gaxOptions_: {}) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };
      instance.get(gaxOptions, assert.ifError);
    });

    it('should not require gaxOptions', done => {
      (instance.getMetadata as Function) = (gaxOptions: {}) => {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };
      instance.get(assert.ifError);
    });

    it('should return an error from getMetadata', done => {
      const error = new Error('Error.');
      sandbox.stub(instance, 'getMetadata').callsArgWith(1, error);
      instance.get(err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', done => {
      const metadata = {};
      sandbox.stub(instance, 'getMetadata').callsArgWith(1, null, metadata);
      instance.get((err, instance_, metadata_) => {
        assert.ifError(err);
        assert.strictEqual(instance_, instance);
        assert.strictEqual(metadata_, metadata);
        done();
      });
    });
  });

  describe('getAppProfiles', () => {
    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'listAppProfiles');
        assert.deepStrictEqual(config.reqOpts, {
          parent: INSTANCE_NAME,
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        done();
      };
      instance.getAppProfiles(assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      instance.getAppProfiles(gaxOptions, assert.ifError);
    });

    it('should pass pageToken from gaxOptions into reqOpts', done => {
      const pageToken = 'token';
      const gaxOptions = {pageToken, timeout: 1000};
      const expectedGaxOpts = {timeout: 1000};
      const expectedReqOpts = Object.assign(
        {},
        {gaxOptions},
        {parent: instance.name},
        {pageToken: gaxOptions.pageToken}
      );
      delete expectedReqOpts.gaxOptions;

      (instance.bigtable.request as Function) = (config: RequestOptions) => {
        assert.deepStrictEqual(config.reqOpts, expectedReqOpts);
        assert.notStrictEqual(config.gaxOpts, gaxOptions);
        assert.notDeepStrictEqual(config.gaxOpts, gaxOptions);
        assert.deepStrictEqual(config.gaxOpts, expectedGaxOpts);
        done();
      };
      instance.getAppProfiles(gaxOptions, assert.ifError);
    });

    it('should pass pageSize from gaxOptions into reqOpts', done => {
      const pageSize = 3;
      const gaxOptions = {pageSize, timeout: 1000};
      const expectedGaxOpts = {timeout: 1000};
      const expectedReqOpts = Object.assign(
        {},
        {gaxOptions},
        {parent: instance.name},
        {pageSize: gaxOptions.pageSize}
      );
      delete expectedReqOpts.gaxOptions;

      (instance.bigtable.request as Function) = (config: RequestOptions) => {
        assert.deepStrictEqual(config.reqOpts, expectedReqOpts);
        assert.notStrictEqual(config.gaxOpts, gaxOptions);
        assert.notDeepStrictEqual(config.gaxOpts, gaxOptions);
        assert.deepStrictEqual(config.gaxOpts, expectedGaxOpts);
        done();
      };
      instance.getAppProfiles(gaxOptions, assert.ifError);
    });

    it('should return error from gapic', done => {
      const error = new Error('Error.');
      sandbox.stub(instance.bigtable, 'request').callsArgWith(1, error);
      instance.getAppProfiles(err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of AppProfile objects', done => {
      const response = [{name: 'a'}, {name: 'b'}];
      sandbox
        .stub(instance.bigtable, 'request')
        .callsArgWith(1, null, response);
      instance.getAppProfiles((err, appProfiles, apiResponse) => {
        assert.ifError(err);
        assert.strictEqual(appProfiles![0].id, 'a');
        assert.deepStrictEqual(appProfiles![0].metadata, response[0]);
        assert.strictEqual(appProfiles![1].id, 'b');
        assert.deepStrictEqual(appProfiles![1].metadata, response[1]);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('getAppProfilesStream', () => {
    let returnStream: PassThrough;
    beforeEach(() => {
      returnStream = new PassThrough({
        objectMode: true,
      });
    });

    it('should provide the proper request options', done => {
      const stub = sandbox.stub(pumpify, 'obj');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'listAppProfilesStream');
        assert.deepStrictEqual(config.reqOpts, {
          parent: INSTANCE_NAME,
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        setImmediate(done);
        return returnStream;
      };
      instance.getAppProfilesStream();
      assert.strictEqual(stub.getCall(0).args[0][0], returnStream);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {timeout: 1000};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(config.gaxOpts, gaxOptions);
        setImmediate(done);
        return returnStream;
      };
      instance.getAppProfilesStream(gaxOptions);
    });

    it('should pass pageToken from gaxOptions into reqOpts', done => {
      const pageToken = 'token';
      const gaxOptions = {pageToken, timeout: 1000};
      const expectedGaxOpts = {timeout: 1000};
      const expectedReqOpts = Object.assign(
        {},
        {gaxOptions},
        {parent: instance.name},
        {pageToken: gaxOptions.pageToken}
      );
      delete expectedReqOpts.gaxOptions;

      (instance.bigtable.request as Function) = (config: RequestOptions) => {
        assert.deepStrictEqual(config.reqOpts, expectedReqOpts);
        assert.notStrictEqual(config.gaxOpts, gaxOptions);
        assert.notDeepStrictEqual(config.gaxOpts, gaxOptions);
        assert.deepStrictEqual(config.gaxOpts, expectedGaxOpts);
        setImmediate(done);
        return returnStream;
      };
      instance.getAppProfilesStream(gaxOptions);
    });

    it('should pass pageSize from gaxOptions into reqOpts', done => {
      const pageSize = 3;
      const gaxOptions = {pageSize, timeout: 1000};
      const expectedGaxOpts = {timeout: 1000};
      const expectedReqOpts = Object.assign(
        {},
        {gaxOptions},
        {parent: instance.name},
        {pageSize: gaxOptions.pageSize}
      );
      delete expectedReqOpts.gaxOptions;

      (instance.bigtable.request as Function) = (config: RequestOptions) => {
        assert.deepStrictEqual(config.reqOpts, expectedReqOpts);
        assert.notStrictEqual(config.gaxOpts, gaxOptions);
        assert.notDeepStrictEqual(config.gaxOpts, gaxOptions);
        assert.deepStrictEqual(config.gaxOpts, expectedGaxOpts);
        setImmediate(done);
        return returnStream;
      };
      instance.getAppProfilesStream(gaxOptions);
    });

    it('should return error from gapic', done => {
      const error = new Error('Error.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = () => {
        return returnStream;
      };
      setImmediate(() => {
        returnStream.destroy(error);
      });

      instance.getAppProfilesStream().on('error', err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return a decorated error with failedLocations list', done => {
      let counter = 0;
      let failedLocations: string[] = [];
      const pages = [
        {
          appProfiles: [
            {
              name: '/projects/p/instances/i/appProfiles/profile-a',
            },
            {
              name: '/projects/p/instances/i/appProfiles/profile-b',
            },
          ],
          response: {failedLocations: []},
        },
        {
          appProfiles: [
            {
              name: '/projects/p/instances/i/appProfiles/profile-c',
            },
            {
              name: '/projects/p/instances/i/appProfiles/profile-d',
            },
          ],
          response: {failedLocations: ['us-east1-a']},
        },

        {
          appProfiles: [
            {
              name: '/projects/p/instances/i/appProfiles/profile-e',
            },
            {
              name: '/projects/p/instances/i/appProfiles/profile-f',
            },
          ],
          response: {failedLocations: ['us-west1-b', 'us-west1-c']},
        },
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = () => {
        return returnStream;
      };

      setImmediate(() => {
        pages.forEach(p => {
          failedLocations = failedLocations.concat(p.response.failedLocations);
          returnStream.emit('response', p.response);
          p.appProfiles.forEach(a => {
            returnStream.push(a);
            counter++;
          });
        });
        returnStream.push(null);
      });
      const appProfiles: AppProfile[] = [];
      instance
        .getAppProfilesStream()
        .on('error', err => {
          assert.strictEqual(appProfiles.length, counter);
          console.log(err.message);
          assert.deepStrictEqual(
            err,
            new Error(
              `Resources from the following locations are currently not available\n${JSON.stringify(
                failedLocations
              )}`
            )
          );
          done();
        })
        .on('data', appProfile => {
          assert(appProfile instanceof FakeAppProfile);
          appProfiles.push(appProfile);
        })
        .on('end', () => {
          done();
        });
    });

    it('should return an array of AppProfile objects', done => {
      const response = [
        {
          name: '/projects/my-project/instances/my-instance/appProfiles/my-appProfile-a',
        },
        {
          name: '/projects/my-project/instances/my-instance/appProfiles/my-appProfile-a',
        },
      ];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = () => {
        return returnStream;
      };
      setImmediate(() => {
        response.forEach(r => {
          returnStream.push(r);
        });
        returnStream.push(null);
      });

      const appProfiles: AppProfile[] = [];
      instance
        .getAppProfilesStream()
        .on('error', assert.ifError)
        .on('data', appProfile => {
          assert(appProfile instanceof FakeAppProfile);
          appProfiles.push(appProfile);
        })
        .on('end', () => {
          assert.strictEqual(
            appProfiles[0].id,
            response[0].name.split('/').pop()
          );
          assert.deepStrictEqual(appProfiles[0].metadata, response[0]);
          assert.strictEqual(
            appProfiles[1].id,
            response[1].name.split('/').pop()
          );
          assert.deepStrictEqual(appProfiles[1].metadata, response[1]);
          done();
        });
    });
  });

  describe('getBackups', () => {
    it('should correctly call Cluster#getBackups', done => {
      const options = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance as any).cluster = (name: string) => {
        assert.strictEqual(name, '-');
        return {
          getBackups: (_options: {}, callback: Function) => {
            assert.strictEqual(_options, options);
            callback(); // done()
          },
        };
      };

      instance.getBackups(options, done);
    });
  });

  describe('getBackupsStream', () => {
    it('should correctly call Cluster#getBackupsStream', () => {
      const options = {};
      const getBackupsStream = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance as any).cluster = (name: string) => {
        assert.strictEqual(name, '-');
        return {
          getBackupsStream: (_options: {}) => {
            assert.strictEqual(_options, options);
            return getBackupsStream;
          },
        };
      };

      instance.getBackupsStream(options);
    });
  });

  describe('getClusters', () => {
    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'listClusters');
        assert.deepStrictEqual(config.reqOpts, {
          parent: INSTANCE_NAME,
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        done();
      };
      instance.getClusters(assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      instance.getClusters(gaxOptions, assert.ifError);
    });

    it('should return error from gapic', done => {
      const error = new Error('Error.');
      sandbox.stub(instance.bigtable, 'request').callsArgWith(1, error);
      instance.getClusters(err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of cluster objects', done => {
      const response = {
        clusters: [
          {
            name: 'a',
          },
          {
            name: 'b',
          },
        ],
      };
      const fakeClusters = [{}, {}];
      sandbox
        .stub(instance.bigtable, 'request')
        .callsArgWith(1, null, response);
      let clusterCount = 0;
      (instance.cluster as Function) = (name: string) => {
        assert.strictEqual(name, response.clusters[clusterCount].name);
        return fakeClusters[clusterCount++];
      };
      instance.getClusters((err, clusters, apiResponse) => {
        assert.ifError(err);
        assert.strictEqual(clusters![0], fakeClusters[0]);
        assert.strictEqual(clusters![0].metadata, response.clusters[0]);
        assert.strictEqual(clusters![1], fakeClusters[1]);
        assert.strictEqual(clusters![1].metadata, response.clusters[1]);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('getIamPolicy', () => {
    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'getIamPolicy');
        assert.strictEqual(config.reqOpts.resource, instance.name);
        assert.strictEqual(config.reqOpts.requestedPolicyVersion, undefined);
        assert.strictEqual(config.gaxOpt, undefined);
        done();
      };
      (instance.getIamPolicy as Function)(assert.ifError);
    });

    it('should accept options', done => {
      const requestedPolicyVersion = 0;
      const gaxOptions = {};
      const options: GetIamPolicyOptions = {gaxOptions, requestedPolicyVersion};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        assert.strictEqual(
          config.reqOpts.options.requestedPolicyVersion,
          requestedPolicyVersion
        );
        done();
      };
      instance.getIamPolicy(options, assert.ifError);
    });

    it('should return error', done => {
      const error = new Error('error');
      sandbox.stub(instance.bigtable, 'request').callsArgWith(1, error);
      (instance.getIamPolicy as Function)((err: Error) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should call decodePolicyEtag', () => {
      sandbox.stub(instance.bigtable, 'request').callsArgWith(1, null, {});
      const spy = sinon.stub(Table, 'decodePolicyEtag');
      (instance.getIamPolicy as Function)(assert.ifError);
      assert.strictEqual(spy.calledOnce, true);
      spy.restore();
    });
  });

  describe('getMetadata', () => {
    it('should make correct request', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'getInstance');
        assert.deepStrictEqual(config.reqOpts, {
          name: instance.name,
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        done();
      };
      instance.getMetadata(assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      instance.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update metadata', done => {
      const metadata = {};
      sandbox
        .stub(instance.bigtable, 'request')
        .callsArgWith(1, null, metadata);
      instance.getMetadata(() => {
        assert.strictEqual(instance.metadata, metadata);
        done();
      });
    });

    it('should execute callback with original arguments', done => {
      const args = [{}, {}, {}];
      (instance.bigtable.request as Function) = (
        config: {},
        callback: Function
      ) => {
        callback(...args);
      };
      instance.getMetadata((...args) => {
        assert.deepStrictEqual([].slice.call(args), args);
        done();
      });
    });
  });

  describe('getTables', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const views = ((FakeTable as any).VIEWS = {
      unspecified: 0,
      name: 1,
      schema: 2,
      full: 4,
    });

    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'listTables');
        assert.strictEqual(config.reqOpts.parent, INSTANCE_NAME);
        assert.strictEqual(config.reqOpts.view, views.unspecified);
        assert.deepStrictEqual(config.gaxOpts, {});
        done();
      };
      instance.getTables(assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const options = {
        gaxOptions: {},
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };
      instance.getTables(options, assert.ifError);
    });

    it('should pass pageSize and pageToken from gaxOptions into reqOpts', done => {
      const pageSize = 3;
      const pageToken = 'token';
      const gaxOptions = {pageSize, pageToken, timeout: 1000};
      const expectedGaxOpts = {timeout: 1000};
      const expectedReqOpts = Object.assign(
        {},
        {gaxOptions},
        {
          parent: instance.name,
          view: Table.VIEWS['unspecified'],
        },
        {pageSize: gaxOptions.pageSize, pageToken: gaxOptions.pageToken}
      );
      delete expectedReqOpts.gaxOptions;

      (instance.bigtable.request as Function) = (config: RequestOptions) => {
        assert.deepStrictEqual(config.reqOpts, expectedReqOpts);
        assert.notStrictEqual(config.gaxOpts, gaxOptions);
        assert.notDeepStrictEqual(config.gaxOpts, gaxOptions);
        assert.deepStrictEqual(config.gaxOpts, expectedGaxOpts);
        done();
      };
      instance.getTables({gaxOptions}, assert.ifError);
    });

    it('pageSize and pageToken in options should take precedence over gaxOptions', done => {
      const pageSize = 3;
      const pageToken = 'token';
      const gaxOptions = {pageSize, pageToken, timeout: 1000};
      const expectedGaxOpts = {timeout: 1000};

      const optionsPageSize = 5;
      const optionsPageToken = 'optionsToken';
      const options = Object.assign(
        {},
        {
          pageSize: optionsPageSize,
          pageToken: optionsPageToken,
          gaxOptions,
        }
      );
      const expectedReqOpts = Object.assign(
        {},
        {
          parent: instance.name,
          view: Table.VIEWS['unspecified'],
          pageSize: optionsPageSize,
          pageToken: optionsPageToken,
        }
      );

      (instance.bigtable.request as Function) = (config: RequestOptions) => {
        assert.deepStrictEqual(config.reqOpts, expectedReqOpts);
        assert.notStrictEqual(config.gaxOpts, gaxOptions);
        assert.notDeepStrictEqual(config.gaxOpts, gaxOptions);
        assert.deepStrictEqual(config.gaxOpts, expectedGaxOpts);
        done();
      };

      instance.getTables(options, assert.ifError);
    });

    Object.keys(views).forEach(view => {
      it('should set the "' + view + '" view', done => {
        const options = {
          view,
        } as GetTablesOptions;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (instance.bigtable.request as Function) = (config: any) => {
          assert.strictEqual(config.reqOpts.view, views[view as 'unspecified']);
          done();
        };
        instance.getTables(options, assert.ifError);
      });
    });

    it('should return an array of table objects', done => {
      const response = [
        {
          name: '/projects/my-project/instances/my-instance/tables/my-table-a',
        },
        {
          name: '/projects/my-project/instances/my-instance/tables/my-table-b',
        },
      ];

      const fakeTables = [{}, {}];
      sandbox
        .stub(instance.bigtable, 'request')
        .callsArgWith(1, null, response);
      let tableCount = 0;
      (instance.table as Function) = (id: string) => {
        assert.strictEqual(id, response[tableCount].name.split('/').pop());
        return fakeTables[tableCount++];
      };

      instance.getTables((err, tables) => {
        assert.ifError(err);
        assert.strictEqual(tables![0], fakeTables[0]);
        assert.strictEqual(tables![0].metadata, response[0]);
        assert.strictEqual(tables![1], fakeTables[1]);
        assert.strictEqual(tables![1].metadata, response[1]);
        done();
      });
    });

    it('should return original GAPIC response arguments', done => {
      const response = [{}, null, {}, {}];
      (instance.bigtable.request as Function) = (
        config: {},
        callback: Function
      ) => {
        callback(...response);
      };
      instance.getTables((...args) => {
        assert.strictEqual(args[0], response[0]);
        assert.strictEqual(args[2], response[2]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assert.strictEqual((args as any)[3], response[3]);
        done();
      });
    });

    it('should return error', done => {
      const error = new Error('Error');
      (instance.bigtable.request as Function) = (
        config: {},
        callback: Function
      ) => {
        callback(error);
      };
      instance.getTables(err => {
        assert.strictEqual(err, error);
        done();
      });
    });
  });

  describe('getTablesStream', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const views = ((FakeTable as any).VIEWS = {
      unspecified: 0,
      name: 1,
      schema: 2,
      full: 4,
    });
    let returnStream: PassThrough;
    beforeEach(() => {
      returnStream = new PassThrough({
        objectMode: true,
      });
    });

    it('should provide the proper request options', done => {
      const stub = sandbox.stub(pumpify, 'obj');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'listTablesStream');
        assert.strictEqual(config.reqOpts.parent, INSTANCE_NAME);
        assert.strictEqual(config.reqOpts.view, views.unspecified);
        assert.deepStrictEqual(config.gaxOpts, {});
        setImmediate(done);
        return returnStream;
      };
      instance.getTablesStream();
      assert.strictEqual(stub.getCall(0).args[0][0], returnStream);
    });

    it('should accept gaxOptions', done => {
      const options = {
        gaxOptions: {},
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(config.gaxOpts, options.gaxOptions);
        setImmediate(done);
        return returnStream;
      };
      instance.getTablesStream(options);
    });

    Object.keys(views).forEach(view => {
      it('should set the "' + view + '" view', done => {
        const options = {
          view,
        } as GetTablesOptions;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (instance.bigtable.request as Function) = (config: any) => {
          assert.strictEqual(config.reqOpts.view, views[view as 'unspecified']);
          setImmediate(done);
          return returnStream;
        };
        instance.getTablesStream(options);
      });
    });

    it('should return an error from gapic', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = () => {
        return returnStream;
      };
      const error = new Error('Error');
      setImmediate(() => {
        returnStream.destroy(error);
      });
      instance.getTablesStream().on('error', err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of table objects', done => {
      const response = [
        {
          name: '/projects/my-project/instances/my-instance/tables/my-table-a',
        },
        {
          name: '/projects/my-project/instances/my-instance/tables/my-table-b',
        },
      ];

      const fakeTables = [{}, {}];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = () => {
        return returnStream;
      };
      let tableCount = 0;
      (instance.table as Function) = (id: string) => {
        assert.strictEqual(id, response[tableCount].name.split('/').pop());
        return fakeTables[tableCount++];
      };
      setImmediate(() => {
        response.forEach(r => {
          returnStream.push(r);
        });
        returnStream.push(null);
      });

      const tables: Table[] = [];
      instance
        .getTablesStream()
        .on('error', assert.ifError)
        .on('data', table => {
          tables.push(table);
        })
        .on('end', () => {
          assert.strictEqual(tables[0], fakeTables[0]);
          assert.deepStrictEqual(tables[0].metadata, response[0]);
          assert.strictEqual(tables[1], fakeTables[1]);
          assert.deepStrictEqual(tables[1].metadata, response[1]);
          done();
        });
    });

    it('should transform into Table objects', done => {
      const returnStream = new PassThrough({
        objectMode: true,
      });
      const response = [
        {
          name: '/projects/my-project/instances/my-instance/tables/my-table-a',
        },
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = () => {
        return returnStream;
      };
      setImmediate(() => {
        returnStream.end(response[0]);
      });

      const tables: Table[] = [];
      instance
        .getTablesStream()
        .on('error', assert.ifError)
        .on('data', table => {
          assert(table instanceof FakeTable);
          tables.push(table);
        })
        .on('end', () => {
          assert(tables.length > 0);
          done();
        });
    });
  });

  describe('setIamPolicy', () => {
    const policy = {} as Policy;
    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'setIamPolicy');
        assert.strictEqual(config.reqOpts.resource, instance.name);
        assert.strictEqual(config.reqOpts.policy, policy);
        assert.strictEqual(config.gaxOpt, undefined);
        done();
      };
      instance.setIamPolicy(policy, assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      instance.setIamPolicy(policy, gaxOptions, assert.ifError);
    });

    it('should pass policy to bigtable.request', done => {
      const policy: Policy = {
        bindings: [
          {
            role: 'roles/bigtable.viewer',
            members: ['user:mike@example.com', 'group:admins@example.com'],
            condition: {
              title: 'expirable access',
              description: 'Does not grant access after Sep 2020',
              expression: "request.time <timestamp('2020-10-01T00:00:00.000Z')",
            },
          },
        ],
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.reqOpts.policy, policy);
        done();
      };
      instance.setIamPolicy(policy, assert.ifError);
    });

    it('should encode policy etag', done => {
      const policy = {etag: 'ABS'};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(
          config.reqOpts.policy.etag,
          Buffer.from(policy.etag)
        );
        done();
      };
      instance.setIamPolicy(policy, assert.ifError);
    });

    it('should return error', done => {
      const error = new Error('error');
      sandbox.stub(instance.bigtable, 'request').callsArgWith(1, error);
      instance.setIamPolicy(policy, err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should call decodePolicyEtag', () => {
      sandbox.stub(instance.bigtable, 'request').callsArgWith(1, null, {});
      const spy = sinon.stub(Table, 'decodePolicyEtag');
      instance.setIamPolicy(policy, assert.ifError);
      assert.strictEqual(spy.calledOnce, true);
      spy.restore();
    });
  });

  describe('setMetadata', () => {
    it('should provide the proper request options', done => {
      const metadata = {displayName: 'updateDisplayName'};
      const expectedMetadata = {
        instance: {name: instance.name, displayName: 'updateDisplayName'},
        updateMask: {paths: ['display_name']},
      };
      (instance.bigtable.request as Function) = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: any,
        callback: Function
      ) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'partialUpdateInstance');
        assert.deepStrictEqual(config.reqOpts, expectedMetadata);
        callback(); // done()
      };
      instance.setMetadata(metadata, done);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      instance.setMetadata({}, gaxOptions, assert.ifError);
    });

    it('should update metadata property with API response', done => {
      const response = {};
      sandbox
        .stub(instance.bigtable, 'request')
        .callsArgWith(1, null, response);
      instance.setMetadata({}, err => {
        assert.ifError(err);
        assert.strictEqual(instance.metadata, response);
        done();
      });
    });

    it('should execute callback with all arguments', done => {
      const args = [{}, {}, {}];
      (instance.bigtable.request as Function) = (
        config: {},
        callback: Function
      ) => {
        callback(...args);
      };
      instance.setMetadata({}, (...args) => {
        assert.deepStrictEqual([].slice.call(args), args);
        done();
      });
    });
  });

  describe('table', () => {
    const TABLE_ID = 'table-id';

    it('should return a table instance', () => {
      const table = instance.table(TABLE_ID);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const args = (table as any).calledWith_;
      assert(table instanceof FakeTable);
      assert.strictEqual(args[0], instance);
      assert.strictEqual(args[1], TABLE_ID);
    });
  });

  describe('testIamPermissions', () => {
    const permissions = 'bigtable.tables.get';
    it('should provide the proper request options', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'testIamPermissions');
        assert.strictEqual(config.reqOpts.resource, instance.name);
        assert.deepStrictEqual(config.reqOpts.permissions, [permissions]);
        assert.strictEqual(config.gaxOpt, undefined);
        done();
      };
      instance.testIamPermissions(permissions, assert.ifError);
    });

    it('should accept permissions as array', done => {
      const permissions = ['bigtable.tables.get', 'bigtable.tables.list'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.deepStrictEqual(config.reqOpts.permissions, permissions);
        done();
      };
      instance.testIamPermissions(permissions, assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (instance.bigtable.request as Function) = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      instance.testIamPermissions(permissions, gaxOptions, assert.ifError);
    });

    it('should unpack permissions from resp object', done => {
      const testPermissions = ['bigtable.tables.get', 'bigtable.tables.list'];
      (instance.bigtable.request as Function) = (
        config: {},
        callback: Function
      ) => {
        callback(null, {permissions: testPermissions});
      };
      instance.testIamPermissions(testPermissions, (err, permissions) => {
        assert.ifError(err);
        assert.strictEqual(Array.isArray(permissions), true);
        assert.deepStrictEqual(permissions, testPermissions);
        done();
      });
    });

    it('should return error', done => {
      const permission = 'bigtable.tables.get';
      const error = new Error('error');
      sandbox.stub(instance.bigtable, 'request').callsArgWith(1, error);
      instance.testIamPermissions(permission, err => {
        assert.strictEqual(err, error);
        done();
      });
    });
  });
});
