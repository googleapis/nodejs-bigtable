/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const assert = require('assert');
const common = require('@google-cloud/common-grpc');
const extend = require('extend');
const proxyquire = require('proxyquire');

const AppProfile = require('../src/app-profile.js');
const Cluster = require('../src/cluster.js');
const Family = require('../src/family.js');
const Table = require('../src/table.js');

var promisified = false;
const fakeUtil = extend({}, common.util, {
  promisifyAll: function(Class, options) {
    if (Class.name !== 'Instance') {
      return;
    }

    promisified = true;
    assert.deepEqual(options.exclude, ['appProfile', 'cluster', 'table']);
  },
});

const fakePaginator = {
  extend: function() {
    this.calledWith_ = arguments;
  },
  streamify: function(methodName) {
    return methodName;
  },
};

function createFake(Class) {
  return class Fake extends Class {
    constructor() {
      super(...arguments);
      this.calledWith_ = arguments;
    }
  };
}

const FakeAppProfile = createFake(AppProfile);
const FakeCluster = createFake(Cluster);
const FakeFamily = createFake(Family);
const FakeTable = createFake(Table);

describe('Bigtable/Instance', function() {
  const INSTANCE_ID = 'my-instance';
  const BIGTABLE = {projectName: 'projects/my-project'};

  const INSTANCE_NAME = `${BIGTABLE.projectName}/instances/${INSTANCE_ID}`;
  const APP_PROFILE_ID = 'my-app-profile';
  const CLUSTER_ID = 'my-cluster';

  var Instance;
  var instance;

  before(function() {
    Instance = proxyquire('../src/instance.js', {
      '@google-cloud/common-grpc': {
        paginator: fakePaginator,
        util: fakeUtil,
      },
      './app-profile.js': FakeAppProfile,
      './cluster.js': FakeCluster,
      './family.js': FakeFamily,
      './table.js': FakeTable,
    });
  });

  beforeEach(function() {
    instance = new Instance(BIGTABLE, INSTANCE_ID);
  });

  describe('instantiation', function() {
    it('should extend the correct methods', function() {
      let args = fakePaginator.calledWith_;

      assert.strictEqual(args[0], Instance);
      assert.deepEqual(args[1], ['getTables']);
    });

    it('should streamify the correct methods', function() {
      assert.strictEqual(instance.getTablesStream, 'getTables');
    });

    it('should promisify all the things', function() {
      assert(promisified);
    });

    it('should localize Bigtable instance', function() {
      assert.strictEqual(instance.bigtable, BIGTABLE);
    });

    it('should create full ID from name', function() {
      assert.strictEqual(instance.name, INSTANCE_NAME);
    });

    it('should localize name', function() {
      assert.strictEqual(instance.id, INSTANCE_ID);
    });

    it('should leave full instance name unaltered and localize the id from the name', function() {
      let instance = new Instance(BIGTABLE, INSTANCE_NAME);
      assert.strictEqual(instance.name, INSTANCE_NAME);
      assert.strictEqual(instance.id, INSTANCE_ID);
    });

    it('should throw if instance id in wrong format', function() {
      let id = `instances/${INSTANCE_ID}`;
      assert.throws(function() {
        new Instance(BIGTABLE, id);
      }, Error);
    });
  });

  describe('getTypeType_', function() {
    let types = {
      unspecified: 0,
      production: 1,
      development: 2,
    };

    it('should default to unspecified', function() {
      assert.strictEqual(Instance.getTypeType_(), types.unspecified);
      assert.strictEqual(
        Instance.getTypeType_('not-real-type'),
        types.unspecified
      );
    });

    it('should lowercase a type', function() {
      assert.strictEqual(Instance.getTypeType_('PRODUCTION'), types.production);
    });

    Object.keys(types).forEach(function(type) {
      it('should get the storage type for "' + type + '"', function() {
        assert.strictEqual(Instance.getTypeType_(type), types[type]);
      });
    });
  });

  describe('create', function() {
    it('should call createInstance from bigtable', function(done) {
      let options = {};

      instance.bigtable.createInstance = function(id, options_, callback) {
        assert.strictEqual(id, instance.id);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      instance.create(options, done);
    });

    it('should not require options', function(done) {
      instance.bigtable.createInstance = function(id, options, callback) {
        assert.deepStrictEqual(options, {});
        callback(); // done()
      };

      instance.create(done);
    });
  });

  describe('createAppProfile', function() {
    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
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

    it('should throw if the routing option is not provided', function() {
      assert.throws(
        instance.createAppProfile.bind(null, APP_PROFILE_ID, assert.ifError)
      ),
        /An app profile must contain a routing policy\./;
    });

    it('should accept gaxOptions', function(done) {
      let options = {
        routing: 'any',
        gaxOptions: {},
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
    });

    describe('should respect the routing option with', function() {
      const cluster = new FakeCluster({}, CLUSTER_ID);

      it(`an 'any' value`, function(done) {
        let options = {
          routing: 'any',
        };

        instance.bigtable.request = function(config) {
          assert.deepStrictEqual(
            config.reqOpts.appProfile.multiClusterRoutingUseAny,
            {}
          );
          done();
        };

        instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
      });

      it(`a cluster value`, function(done) {
        let options = {routing: cluster};

        instance.bigtable.request = function(config) {
          assert.deepStrictEqual(
            config.reqOpts.appProfile.singleClusterRouting,
            {clusterId: CLUSTER_ID}
          );
          done();
        };

        instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
      });
    });

    it('should respect the allowTransactionalWrites option', function(done) {
      let cluster = instance.cluster(CLUSTER_ID);
      let options = {
        routing: cluster,
        allowTransactionalWrites: true,
      };

      instance.bigtable.request = function(config) {
        assert.deepStrictEqual(
          config.reqOpts.appProfile.singleClusterRouting
            .allowTransactionalWrites,
          true
        );
        done();
      };

      instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
    });

    it('should respect the description option', function(done) {
      let options = {
        routing: 'any',
        description: 'My App Profile',
      };

      instance.bigtable.request = function(config) {
        assert.deepStrictEqual(
          config.reqOpts.appProfile.description,
          options.description
        );
        done();
      };

      instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
    });

    it('should respect the ignoreWarnings option', function(done) {
      let options = {
        routing: 'any',
        ignoreWarnings: true,
      };

      instance.bigtable.request = function(config) {
        assert.deepStrictEqual(config.reqOpts.ignoreWarnings, true);
        done();
      };

      instance.createAppProfile(APP_PROFILE_ID, options, assert.ifError);
    });

    it('should execute callback with arguments from GAPIC', function(done) {
      let response = {};

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      let fakeAppProfile = {};

      instance.appProfile = function(id) {
        assert.strictEqual(id, APP_PROFILE_ID);
        return fakeAppProfile;
      };

      instance.createAppProfile(APP_PROFILE_ID, {routing: 'any'}, function(
        err,
        appProfile,
        apiResponse
      ) {
        assert.ifError(err);
        assert.strictEqual(arguments[1], fakeAppProfile);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('createCluster', function() {
    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'createCluster');

        assert.strictEqual(config.reqOpts.parent, INSTANCE_NAME);
        assert.strictEqual(config.reqOpts.clusterId, CLUSTER_ID);

        assert.strictEqual(config.gaxOpts, undefined);

        done();
      };

      instance.createCluster(CLUSTER_ID, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      let options = {
        gaxOptions: {},
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      instance.createCluster(CLUSTER_ID, options, assert.ifError);
    });

    it('should respect the location option', function(done) {
      let options = {
        location: 'us-central1-b',
      };

      let fakeLocation = 'a/b/c/d';

      FakeCluster.getLocation_ = function(project, location) {
        assert.strictEqual(project, BIGTABLE.projectId);
        assert.strictEqual(location, options.location);
        return fakeLocation;
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.cluster.location, fakeLocation);
        done();
      };

      instance.createCluster(CLUSTER_ID, options, assert.ifError);
    });

    it('should respect the nodes option', function(done) {
      let options = {
        nodes: 3,
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.cluster.serveNodes, options.nodes);
        done();
      };

      instance.createCluster(CLUSTER_ID, options, assert.ifError);
    });

    it('should respect the storage option', function(done) {
      let options = {
        storage: 'ssd',
      };

      let fakeStorageType = 2;

      FakeCluster.getStorageType_ = function(type) {
        assert.strictEqual(type, options.storage);
        return fakeStorageType;
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(
          config.reqOpts.cluster.defaultStorageType,
          fakeStorageType
        );
        done();
      };

      instance.createCluster(CLUSTER_ID, options, assert.ifError);
    });

    it('should execute callback with arguments from GAPIC', function(done) {
      let response = {};

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      let fakeCluster = {};

      instance.cluster = function(name) {
        assert.strictEqual(name, CLUSTER_ID);
        return fakeCluster;
      };

      instance.createCluster(CLUSTER_ID, function(err, cluster, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(arguments[1], fakeCluster);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('createTable', function() {
    let TABLE_ID = 'my-table';
    let TABLE_NAME =
      'projects/my-project/instances/my-instance/tables/my-table';

    it('should throw if an id is not provided', function() {
      assert.throws(function() {
        instance.createTable();
      }, /An id is required to create a table\./);
    });

    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
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

    it('should accept gaxOptions', function(done) {
      let options = {
        gaxOptions: {},
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      instance.createTable(TABLE_ID, options, assert.ifError);
    });

    it('should set the initial split keys', function(done) {
      let options = {
        splits: ['a', 'b'],
      };

      let expectedSplits = [{key: 'a'}, {key: 'b'}];

      instance.bigtable.request = function(config) {
        assert.deepEqual(config.reqOpts.initialSplits, expectedSplits);
        done();
      };

      instance.createTable(TABLE_ID, options, assert.ifError);
    });

    describe('creating column families', function() {
      it('should accept a family name', function(done) {
        let options = {
          families: ['a', 'b'],
        };

        instance.bigtable.request = function(config) {
          assert.deepEqual(config.reqOpts.table.columnFamilies, {
            a: {},
            b: {},
          });

          done();
        };

        instance.createTable(TABLE_ID, options, assert.ifError);
      });

      it('should accept a garbage collection object', function(done) {
        let options = {
          families: [
            {
              name: 'e',
              rule: {},
            },
          ],
        };

        let fakeRule = {a: 'b'};

        FakeFamily.formatRule_ = function(rule) {
          assert.strictEqual(rule, options.families[0].rule);
          return fakeRule;
        };

        instance.bigtable.request = function(config) {
          assert.deepEqual(config.reqOpts.table.columnFamilies, {
            e: {
              gcRule: fakeRule,
            },
          });
          done();
        };

        instance.createTable(TABLE_ID, options, assert.ifError);
      });
    });

    it('should return a Table object', function(done) {
      let response = {
        name: TABLE_NAME,
      };

      let fakeTable = {};

      instance.table = function(id) {
        assert.strictEqual(id, response.name.split('/').pop());
        return fakeTable;
      };

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      instance.createTable(TABLE_ID, function(err, table, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(table, fakeTable);
        assert.strictEqual(table.metadata, response);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('cluster', function() {
    it('should return a Cluster object', function() {
      let cluster = instance.cluster(CLUSTER_ID);

      assert(cluster instanceof FakeCluster);

      let args = cluster.calledWith_;

      assert.strictEqual(args[0], instance);
      assert.strictEqual(args[1], CLUSTER_ID);
    });
  });

  describe('delete', function() {
    it('should make the correct request', function(done) {
      instance.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'deleteInstance');

        assert.deepEqual(config.reqOpts, {
          name: instance.name,
        });

        assert.deepEqual(config.gaxOpts, {});

        callback(); // done()
      };

      instance.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      let gaxOptions = {};

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      instance.delete(gaxOptions, assert.ifError);
    });
  });

  describe('exists', function() {
    it('should not require gaxOptions', function(done) {
      instance.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      instance.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', function(done) {
      let gaxOptions = {};

      instance.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      instance.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', function(done) {
      let error = new Error('Error.');
      error.code = 5;

      instance.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      instance.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if code is not 5', function(done) {
      let error = new Error('Error.');
      error.code = 'NOT-5';

      instance.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      instance.exists(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', function(done) {
      instance.getMetadata = function(gaxOptions, callback) {
        callback(null, {});
      };

      instance.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('get', function() {
    it('should call getMetadata', function(done) {
      let gaxOptions = {};

      instance.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      instance.get(gaxOptions, assert.ifError);
    });

    it('should not require gaxOptions', function(done) {
      instance.getMetadata = function(gaxOptions) {
        assert.deepEqual(gaxOptions, {});
        done();
      };

      instance.get(assert.ifError);
    });

    it('should return an error from getMetadata', function(done) {
      let error = new Error('Error.');

      instance.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      instance.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      let metadata = {};

      instance.getMetadata = function(gaxOptions, callback) {
        callback(null, metadata);
      };

      instance.get(function(err, instance_, metadata_) {
        assert.ifError(err);
        assert.strictEqual(instance_, instance);
        assert.strictEqual(metadata_, metadata);
        done();
      });
    });
  });

  describe('getAppProfiles', function() {
    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'listAppProfiles');
        assert.deepStrictEqual(config.reqOpts, {
          parent: INSTANCE_NAME,
        });
        assert.deepEqual(config.gaxOpts, {});
        done();
      };

      instance.getAppProfiles(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      let gaxOptions = {};

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      instance.getAppProfiles(gaxOptions, assert.ifError);
    });

    it('should return error from gapic', function(done) {
      let error = new Error('Error.');

      instance.bigtable.request = function(config, callback) {
        callback(error);
      };

      instance.getAppProfiles(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of AppProfile objects', function(done) {
      let response = [{name: 'a'}, {name: 'b'}];

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      instance.getAppProfiles(function(err, appProfiles, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(appProfiles[0].id, 'a');
        assert.deepStrictEqual(appProfiles[0].metadata, response[0]);
        assert.strictEqual(appProfiles[1].id, 'b');
        assert.deepStrictEqual(appProfiles[1].metadata, response[1]);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('getClusters', function() {
    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'listClusters');
        assert.deepStrictEqual(config.reqOpts, {
          parent: INSTANCE_NAME,
        });
        assert.deepEqual(config.gaxOpts, {});
        done();
      };

      instance.getClusters(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      let gaxOptions = {};

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      instance.getClusters(gaxOptions, assert.ifError);
    });

    it('should return error from gapic', function(done) {
      let error = new Error('Error.');

      instance.bigtable.request = function(config, callback) {
        callback(error);
      };

      instance.getClusters(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of cluster objects', function(done) {
      let response = {
        clusters: [
          {
            name: 'a',
          },
          {
            name: 'b',
          },
        ],
      };

      let fakeClusters = [{}, {}];

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      let clusterCount = 0;

      instance.cluster = function(name) {
        assert.strictEqual(name, response.clusters[clusterCount].name);
        return fakeClusters[clusterCount++];
      };

      instance.getClusters(function(err, clusters, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(clusters[0], fakeClusters[0]);
        assert.strictEqual(clusters[0].metadata, response.clusters[0]);
        assert.strictEqual(clusters[1], fakeClusters[1]);
        assert.strictEqual(clusters[1].metadata, response.clusters[1]);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('getMetadata', function() {
    it('should make correct request', function(done) {
      instance.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'getInstance');

        assert.deepEqual(config.reqOpts, {
          name: instance.name,
        });

        assert.deepEqual(config.gaxOpts, {});

        done();
      };

      instance.getMetadata(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      let gaxOptions = {};

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      instance.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update metadata', function(done) {
      let metadata = {};

      instance.bigtable.request = function(config, callback) {
        callback(null, metadata);
      };

      instance.getMetadata(function() {
        assert.strictEqual(instance.metadata, metadata);
        done();
      });
    });

    it('should execute callback with original arguments', function(done) {
      let args = [{}, {}, {}];

      instance.bigtable.request = function(config, callback) {
        callback.apply(null, args);
      };

      instance.getMetadata(function() {
        assert.deepStrictEqual([].slice.call(arguments), args);
        done();
      });
    });
  });

  describe('getTables', function() {
    let views = (FakeTable.VIEWS = {
      unspecified: 0,
      name: 1,
      schema: 2,
      full: 4,
    });

    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'listTables');
        assert.strictEqual(config.reqOpts.parent, INSTANCE_NAME);
        assert.strictEqual(config.reqOpts.view, views.unspecified);
        assert.strictEqual(config.gaxOpts, undefined);
        done();
      };

      instance.getTables(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      let options = {
        gaxOptions: {},
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      instance.getTables(options, assert.ifError);
    });

    Object.keys(views).forEach(function(view) {
      it('should set the "' + view + '" view', function(done) {
        let options = {
          view: view,
        };

        instance.bigtable.request = function(config) {
          assert.strictEqual(config.reqOpts.view, views[view]);
          done();
        };

        instance.getTables(options, assert.ifError);
      });
    });

    it('should return an array of table objects', function(done) {
      let response = [
        {
          name: '/projects/my-project/instances/my-instance/tables/my-table-a',
        },
        {
          name: '/projects/my-project/instances/my-instance/tables/my-table-b',
        },
      ];

      let fakeTables = [{}, {}];

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      let tableCount = 0;

      instance.table = function(id) {
        assert.strictEqual(id, response[tableCount].name.split('/').pop());
        return fakeTables[tableCount++];
      };

      instance.getTables(function(err, tables) {
        assert.ifError(err);
        assert.strictEqual(tables[0], fakeTables[0]);
        assert.strictEqual(tables[0].metadata, response[0]);
        assert.strictEqual(tables[1], fakeTables[1]);
        assert.strictEqual(tables[1].metadata, response[1]);
        done();
      });
    });

    it('should return original GAPIC response arguments', function(done) {
      let response = [{}, null, {}, {}];

      instance.bigtable.request = function(config, callback) {
        callback.apply(null, response);
      };

      instance.getTables(function() {
        assert.strictEqual(arguments[0], response[0]);
        assert.strictEqual(arguments[2], response[2]);
        assert.strictEqual(arguments[3], response[3]);
        done();
      });
    });
  });

  describe('setMetadata', function() {
    it('should provide the proper request options', function(done) {
      let metadata = {displayName: 'updateDisplayName'};
      let expectedMetadata = {
        instance: {name: instance.name, displayName: 'updateDisplayName'},
        updateMask: {paths: ['display_name']},
      };

      instance.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'partialUpdateInstance');
        assert.deepStrictEqual(config.reqOpts, expectedMetadata);
        callback(); // done()
      };

      instance.setMetadata(metadata, done);
    });

    it('should update metadata property with API response', function(done) {
      let response = {};

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      instance.setMetadata({}, function(err) {
        assert.ifError(err);
        assert.strictEqual(instance.metadata, response);
        done();
      });
    });

    it('should execute callback with all arguments', function(done) {
      let args = [{}, {}, {}];

      instance.bigtable.request = function(config, callback) {
        callback.apply(null, args);
      };

      instance.setMetadata({}, function() {
        assert.deepStrictEqual([].slice.call(arguments), args);
        done();
      });
    });
  });

  describe('table', function() {
    const TABLE_ID = 'table-id';

    it('should return a table instance', function() {
      let table = instance.table(TABLE_ID);
      let args = table.calledWith_;

      assert(table instanceof FakeTable);
      assert.strictEqual(args[0], instance);
      assert.strictEqual(args[1], TABLE_ID);
    });
  });
});
