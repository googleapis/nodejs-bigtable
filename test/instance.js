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

var assert = require('assert');
var common = require('@google-cloud/common');
var extend = require('extend');
var format = require('string-format-obj');
var proxyquire = require('proxyquire');
var util = require('util');

var Cluster = require('../src/cluster.js');
var Family = require('../src/family.js');
var Table = require('../src/table.js');

var promisified = false;
var fakeUtil = extend({}, common.util, {
  promisifyAll: function(Class, options) {
    if (Class.name !== 'Instance') {
      return;
    }

    promisified = true;
    assert.deepEqual(options.exclude, ['cluster', 'table']);
  },
});

var fakePaginator = {
  extend: function() {
    this.calledWith_ = arguments;
  },
  streamify: function(methodName) {
    return methodName;
  },
};

function createFake(Class) {
  function Fake() {
    this.calledWith_ = arguments;
    Class.apply(this, arguments);
  }

  util.inherits(Fake, Class);
  return Fake;
}

var FakeCluster = createFake(Cluster);
var FakeFamily = createFake(Family);
var FakeTable = createFake(Table);

describe.only('Bigtable/Instance', function() {
  var INSTANCE_NAME = 'my-instance';
  var BIGTABLE = {projectName: 'projects/my-project'};

  var INSTANCE_ID = format('{project}/instances/{instance}', {
    project: BIGTABLE.projectName,
    instance: INSTANCE_NAME,
  });

  var CLUSTER_NAME = 'my-cluster';

  var Instance;
  var instance;

  before(function() {
    Instance = proxyquire('../src/instance.js', {
      '@google-cloud/common': {
        paginator: fakePaginator,
        util: fakeUtil,
      },
      './cluster.js': FakeCluster,
      './family.js': FakeFamily,
      './table.js': FakeTable,
    });
  });

  beforeEach(function() {
    instance = new Instance(BIGTABLE, INSTANCE_NAME);
  });

  describe('instantiation', function() {
    it('should extend the correct methods', function() {
      var args = fakePaginator.calledWith_;

      assert.strictEqual(args[0], Instance);
      assert.deepEqual(args[1], ['getClusters', 'getTables']);
    });

    it('should streamify the correct methods', function() {
      assert.strictEqual(instance.getClustersStream, 'getClusters');
      assert.strictEqual(instance.getTablesStream, 'getTables');
    });

    it('should promisify all the things', function() {
      assert(promisified);
    });

    it('should localize Bigtable instance', function() {
      assert.strictEqual(instance.bigtable, BIGTABLE);
    });

    it('should create full ID from name', function() {
      assert.strictEqual(instance.id, INSTANCE_ID);
    });

    it('should localize name', function() {
      assert.strictEqual(instance.name, INSTANCE_NAME);
    });

    it('should not alter full instance ids', function() {
      var instance = new Instance(BIGTABLE, INSTANCE_ID);
      assert.strictEqual(instance.id, INSTANCE_ID);
      assert.strictEqual(instance.name, INSTANCE_NAME);
    });
  });

  describe('create', function() {
    it('should call createInstance from instance', function(done) {
      var options = {};

      instance.bigtable.createInstance = function(name, options_, callback) {
        assert.strictEqual(name, instance.name);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      instance.create(options, done);
    });

    it('should not require options', function(done) {
      instance.bigtable.createInstance = function(name, options, callback) {
        assert.deepStrictEqual(options, {});
        callback(); // done()
      };

      instance.create(done);
    });
  });

  describe('createCluster', function() {
    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'createCluster');

        assert.strictEqual(config.reqOpts.parent, INSTANCE_ID);
        assert.strictEqual(config.reqOpts.clusterId, CLUSTER_NAME);

        assert.strictEqual(config.gaxOpts, undefined);

        done();
      };

      instance.createCluster(CLUSTER_NAME, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var options = {
        gaxOptions: {},
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      instance.createCluster(CLUSTER_NAME, options, assert.ifError);
    });

    it('should respect the location option', function(done) {
      var options = {
        location: 'us-central1-b',
      };

      var fakeLocation = 'a/b/c/d';

      FakeCluster.getLocation_ = function(project, location) {
        assert.strictEqual(project, BIGTABLE.projectName);
        assert.strictEqual(location, options.location);
        return fakeLocation;
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.cluster.location, fakeLocation);
        done();
      };

      instance.createCluster(CLUSTER_NAME, options, assert.ifError);
    });

    it('should respect the nodes option', function(done) {
      var options = {
        nodes: 3,
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.cluster.serveNodes, options.nodes);
        done();
      };

      instance.createCluster(CLUSTER_NAME, options, assert.ifError);
    });

    it('should respect the storage option', function(done) {
      var options = {
        storage: 'ssd',
      };

      var fakeStorageType = 2;

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

      instance.createCluster(CLUSTER_NAME, options, assert.ifError);
    });

    it('should execute callback with arguments from GAPIC', function(done) {
      var response = {};

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      var fakeCluster = {};

      instance.cluster = function(name) {
        assert.strictEqual(name, CLUSTER_NAME);
        return fakeCluster;
      };

      instance.createCluster(CLUSTER_NAME, function(err, cluster, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(arguments[1], fakeCluster);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('createTable', function() {
    var TABLE_ID = 'my-table';

    it('should throw if a name is not provided', function() {
      assert.throws(function() {
        instance.createTable();
      }, /A name is required to create a table\./);
    });

    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'createTable');

        assert.strictEqual(config.reqOpts.parent, INSTANCE_ID);
        assert.strictEqual(config.reqOpts.tableId, TABLE_ID);
        assert.deepStrictEqual(config.reqOpts.table, {granularity: 0});

        assert.strictEqual(config.gaxOpts, undefined);

        done();
      };

      instance.createTable(TABLE_ID, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var options = {
        gaxOptions: {},
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      instance.createTable(TABLE_ID, options, assert.ifError);
    });

    it('should set the initial split keys', function(done) {
      var options = {
        splits: ['a', 'b'],
      };

      var expectedSplits = [{key: 'a'}, {key: 'b'}];

      instance.bigtable.request = function(config) {
        assert.deepEqual(config.reqOpts.initialSplits, expectedSplits);
        done();
      };

      instance.createTable(TABLE_ID, options, assert.ifError);
    });

    describe('creating column families', function() {
      it('should accept a family name', function(done) {
        var options = {
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
        var options = {
          families: [
            {
              name: 'e',
              rule: {},
            },
          ],
        };

        var fakeRule = {a: 'b'};

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
      var response = {
        name: TABLE_ID,
      };

      var fakeTable = {};

      instance.table = function(name) {
        assert.strictEqual(name, response.name);
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
      var cluster = instance.cluster(CLUSTER_NAME);

      assert(cluster instanceof FakeCluster);

      var args = cluster.calledWith_;

      assert.strictEqual(args[0], instance);
      assert.strictEqual(args[1], CLUSTER_NAME);
    });
  });

  describe('delete', function() {
    it('should make the correct request', function(done) {
      instance.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'deleteInstance');

        assert.deepEqual(config.reqOpts, {
          name: instance.id,
        });

        assert.deepEqual(config.gaxOpts, {});

        callback(); // done()
      };

      instance.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

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
      var gaxOptions = {};

      instance.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      instance.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', function(done) {
      var error = new Error('Error.');
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
      var error = new Error('Error.');
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
      var options = {
        gaxOptions: {},
      };

      instance.getMetadata = function(gaxOptions) {
        assert.strictEqual(gaxOptions, options.gaxOptions);
        done();
      };

      instance.get(options, assert.ifError);
    });

    it('should not require an options object', function(done) {
      instance.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, undefined);
        done();
      };

      instance.get(assert.ifError);
    });

    it('should auto create with error code 5', function(done) {
      var error = new Error('Error.');
      error.code = 5;

      var options = {
        autoCreate: true,
        gaxOptions: {},
      };

      instance.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      instance.create = function(options_, callback) {
        assert.strictEqual(options_.gaxOptions, options.gaxOptions);
        callback(); // done()
      };

      instance.get(options, done);
    });

    it('should not auto create without error code 5', function(done) {
      var error = new Error('Error.');
      error.code = 'NOT-5';

      var options = {
        autoCreate: true,
      };

      instance.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      instance.create = function() {
        throw new Error('Should not create.');
      };

      instance.get(options, function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should not auto create unless requested', function(done) {
      var error = new Error('Error.');
      error.code = 5;

      instance.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      instance.create = function() {
        throw new Error('Should not create.');
      };

      instance.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an error from getMetadata', function(done) {
      var error = new Error('Error.');

      instance.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      instance.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      var apiResponse = {};

      instance.getMetadata = function(gaxOptions, callback) {
        callback(null, apiResponse);
      };

      instance.get(function(err, instance_, apiResponse_) {
        assert.ifError(err);
        assert.strictEqual(instance_, instance);
        assert.strictEqual(apiResponse_, apiResponse);
        done();
      });
    });
  });

  describe('getClusters', function() {
    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'listClusters');
        assert.strictEqual(config.reqOpts.parent, INSTANCE_ID);
        assert.strictEqual(config.gaxOpts, undefined);
        done();
      };

      instance.getClusters(assert.ifError);
    });

    it('should copy all query options', function(done) {
      var options = {
        a: 'a',
        b: 'b',
      };

      instance.bigtable.request = function(config) {
        Object.keys(options).forEach(function(key) {
          assert.strictEqual(config.reqOpts[key], options[key]);
        });
        assert.notStrictEqual(config.reqOpts, options);
        done();
      };

      instance.getClusters(options, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var options = {
        gaxOptions: {},
      };

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      instance.getClusters(options, assert.ifError);
    });

    it('should return an array of cluster objects', function(done) {
      var response = [
        {
          name: 'a',
        },
        {
          name: 'b',
        },
      ];

      var fakeClusters = [{}, {}];

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      var clusterCount = 0;

      instance.cluster = function(name) {
        assert.strictEqual(name, response[clusterCount].name);
        return fakeClusters[clusterCount++];
      };

      instance.getClusters(function(err, clusters) {
        assert.ifError(err);
        assert.strictEqual(clusters[0], fakeClusters[0]);
        assert.strictEqual(clusters[0].metadata, response[0]);
        assert.strictEqual(clusters[1], fakeClusters[1]);
        assert.strictEqual(clusters[1].metadata, response[1]);
        done();
      });
    });

    it('should return original GAPIC response arguments', function(done) {
      var response = [{}, null, {}, {}];

      instance.bigtable.request = function(config, callback) {
        callback.apply(null, response);
      };

      instance.getClusters(function() {
        assert.strictEqual(arguments[0], response[0]);
        assert.strictEqual(arguments[2], response[2]);
        assert.strictEqual(arguments[3], response[3]);
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
          name: instance.id,
        });

        assert.deepEqual(config.gaxOpts, {});

        done();
      };

      instance.getMetadata(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      instance.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      instance.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update metadata', function(done) {
      var metadata = {};

      instance.bigtable.request = function(config, callback) {
        callback(null, metadata);
      };

      instance.getMetadata(function() {
        assert.strictEqual(instance.metadata, metadata);
        done();
      });
    });

    it('should execute callback with original arguments', function(done) {
      var args = [{}, {}, {}];

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
    var views = (FakeTable.VIEWS = {
      unspecified: 0,
      name: 1,
      schema: 2,
      full: 4,
    });

    it('should provide the proper request options', function(done) {
      instance.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'listTables');
        assert.strictEqual(config.reqOpts.parent, INSTANCE_ID);
        assert.strictEqual(config.reqOpts.view, views.unspecified);
        assert.strictEqual(config.gaxOpts, undefined);
        done();
      };

      instance.getTables(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var options = {
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
        var options = {
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
      var response = [
        {
          name: 'a',
        },
        {
          name: 'b',
        },
      ];

      var fakeTables = [{}, {}];

      instance.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      var tableCount = 0;

      instance.table = function(name) {
        assert.strictEqual(name, response[tableCount].name);
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
      var response = [{}, null, {}, {}];

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
      var metadata = {a: 'b'};
      var expectedMetadata = extend({name: instance.id}, metadata);

      instance.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'updateInstance');
        assert.deepStrictEqual(config.reqOpts, expectedMetadata);
        callback(); // done()
      };

      instance.setMetadata(metadata, done);
    });

    it('should update metadata property with API response', function(done) {
      var response = {};

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
      var args = [{}, {}, {}];

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
    var TABLE_ID = 'table-id';

    it('should return a table instance', function() {
      var table = instance.table(TABLE_ID);
      var args = table.calledWith_;

      assert(table instanceof FakeTable);
      assert.strictEqual(args[0], instance);
      assert.strictEqual(args[1], TABLE_ID);
    });
  });
});
