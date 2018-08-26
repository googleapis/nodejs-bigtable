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
const extend = require('extend');
const proxyquire = require('proxyquire');
const promisify = require('@google-cloud/promisify');

const Snapshot = require('../src/snapshot.js');

var promisified = false;
const fakePromisify = extend({}, promisify, {
  promisifyAll: function(Class) {
    if (Class.name === 'Cluster') {
      promisified = true;
    }
  },
});

function createFake(Class) {
  return class Fake extends Class {
    constructor() {
      super(...arguments);
      this.calledWith_ = arguments;
    }
  };
}

const FakeSnapshot = createFake(Snapshot);

describe('Bigtable/Cluster', function() {
  const CLUSTER_ID = 'my-cluster';
  const TABLE_ID = 'my-table';
  const PROJECT_ID = 'grape-spaceship-123';

  const INSTANCE = {
    name: `projects/${PROJECT_ID}/instances/i`,
    bigtable: {projectId: PROJECT_ID},
  };

  const TABLE_NAME = `${INSTANCE.name}/tables/${TABLE_ID}`;
  const CLUSTER_NAME = `${INSTANCE.name}/clusters/${CLUSTER_ID}`;
  var Cluster;
  var cluster;

  before(function() {
    Cluster = proxyquire('../src/cluster.js', {
      '@google-cloud/promisify': fakePromisify,
      './snapshot.js': FakeSnapshot,
    });
  });

  beforeEach(function() {
    cluster = new Cluster(INSTANCE, CLUSTER_ID);
  });

  describe('instantiation', function() {
    it('should promisify all the things', function() {
      assert(promisified);
    });

    it('should localize Bigtable instance', function() {
      assert.strictEqual(cluster.bigtable, INSTANCE.bigtable);
    });

    it('should localize Instance instance', function() {
      assert.strictEqual(cluster.instance, INSTANCE);
    });

    it('should expand id into full resource path', function() {
      assert.strictEqual(cluster.name, CLUSTER_NAME);
    });

    it('should leave full cluster names unaltered', function() {
      let cluster = new Cluster(INSTANCE, CLUSTER_ID);
      assert.strictEqual(cluster.name, CLUSTER_NAME);
    });

    it('should localize the id from the name', function() {
      assert.strictEqual(cluster.id, CLUSTER_ID);
    });

    it('should leave full cluster names unaltered and localize the id from the name', function() {
      let cluster = new Cluster(INSTANCE, CLUSTER_NAME);
      assert.strictEqual(cluster.name, CLUSTER_NAME);
      assert.strictEqual(cluster.id, CLUSTER_ID);
    });

    it('should throw if cluster id in wrong format', function() {
      let id = `clusters/${CLUSTER_ID}`;
      assert.throws(function() {
        new Cluster(INSTANCE, id);
      }, Error);
    });
  });

  describe('getLocation_', function() {
    const LOCATION = 'us-central1-b';

    it('should format the location name', function() {
      let expected = `projects/${PROJECT_ID}/locations/${LOCATION}`;
      let formatted = Cluster.getLocation_(PROJECT_ID, LOCATION);
      assert.strictEqual(formatted, expected);
    });

    it('should format the location name for project name with /', function() {
      let PROJECT_NAME = 'projects/grape-spaceship-123';
      let expected = `projects/${PROJECT_NAME.split(
        '/'
      ).pop()}/locations/${LOCATION}`;
      let formatted = Cluster.getLocation_(PROJECT_NAME, LOCATION);
      assert.strictEqual(formatted, expected);
    });

    it('should not re-format a complete location', function() {
      let complete = `projects/p/locations/${LOCATION}`;
      let formatted = Cluster.getLocation_(PROJECT_ID, complete);
      assert.strictEqual(formatted, complete);
    });
  });

  describe('getStorageType_', function() {
    let types = {
      unspecified: 0,
      ssd: 1,
      hdd: 2,
    };

    it('should default to unspecified', function() {
      assert.strictEqual(Cluster.getStorageType_(), types.unspecified);
    });

    it('should lowercase a type', function() {
      assert.strictEqual(Cluster.getStorageType_('SSD'), types.ssd);
    });

    Object.keys(types).forEach(function(type) {
      it('should get the storage type for "' + type + '"', function() {
        assert.strictEqual(Cluster.getStorageType_(type), types[type]);
      });
    });
  });

  describe('create', function() {
    it('should call createCluster from instance', function(done) {
      let options = {};

      cluster.instance.createCluster = function(id, options_, callback) {
        assert.strictEqual(id, cluster.id);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      cluster.create(options, done);
    });

    it('should not require options', function(done) {
      cluster.instance.createCluster = function(id, options, callback) {
        assert.deepStrictEqual(options, {});
        callback(); // done()
      };

      cluster.create(done);
    });
  });

  describe('delete', function() {
    it('should make the correct request', function(done) {
      cluster.bigtable.request = function(config, callback) {
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

    it('should accept gaxOptions', function(done) {
      let gaxOptions = {};

      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      cluster.delete(gaxOptions, assert.ifError);
    });
  });

  describe('exists', function() {
    it('should not require gaxOptions', function(done) {
      cluster.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      cluster.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', function(done) {
      let gaxOptions = {};

      cluster.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      cluster.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', function(done) {
      let error = new Error('Error.');
      error.code = 5;

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      cluster.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if code is not 5', function(done) {
      let error = new Error('Error.');
      error.code = 'NOT-5';

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      cluster.exists(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', function(done) {
      cluster.getMetadata = function(gaxOptions, callback) {
        callback(null, {});
      };

      cluster.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('get', function() {
    it('should call getMetadata', function(done) {
      let gaxOptions = {};

      cluster.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      cluster.get(gaxOptions, assert.ifError);
    });

    it('should not require gaxOptions', function(done) {
      cluster.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      cluster.get(assert.ifError);
    });

    it('should return an error from getMetadata', function(done) {
      let error = new Error('Error.');

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      cluster.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      let metadata = {};

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(null, metadata);
      };

      cluster.get(function(err, cluster_, metadata_) {
        assert.ifError(err);
        assert.strictEqual(cluster_, cluster);
        assert.strictEqual(metadata_, metadata);
        done();
      });
    });
  });

  describe('getMetadata', function() {
    it('should make correct request', function(done) {
      cluster.bigtable.request = function(config) {
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

    it('should accept gaxOptions', function(done) {
      let gaxOptions = {};

      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      cluster.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update metadata', function(done) {
      let metadata = {};

      cluster.bigtable.request = function(config, callback) {
        callback(null, metadata);
      };

      cluster.getMetadata(function() {
        assert.strictEqual(cluster.metadata, metadata);
        done();
      });
    });

    it('should execute callback with original arguments', function(done) {
      let args = [{}, {}, {}];

      cluster.bigtable.request = function(config, callback) {
        callback.apply(null, args);
      };

      cluster.getMetadata(function() {
        assert.deepStrictEqual([].slice.call(arguments), args);
        done();
      });
    });
  });

  describe('setMetadata', function() {
    it('should provide the proper request options', function(done) {
      cluster.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'updateCluster');
        assert.strictEqual(config.reqOpts.name, CLUSTER_NAME);
        callback(); // done()
      };

      cluster.setMetadata({}, done);
    });

    it('should respect the location option', function(done) {
      let options = {
        location: 'us-centralb-1',
      };

      let getLocation = Cluster.getLocation_;
      let fakeLocation = 'a/b/c/d';

      Cluster.getLocation_ = function(project, location) {
        assert.strictEqual(project, PROJECT_ID);
        assert.strictEqual(location, options.location);
        return fakeLocation;
      };

      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.location, fakeLocation);
        Cluster.getLocation_ = getLocation;
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should respect the nodes option', function(done) {
      let options = {
        nodes: 3,
      };

      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.serveNodes, options.nodes);
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should respect the storage option', function(done) {
      let options = {
        storage: 'ssd',
      };

      let getStorageType = Cluster.getStorageType_;
      let fakeStorageType = 'a';

      Cluster.getStorageType_ = function(storage) {
        assert.strictEqual(storage, options.storage);
        return fakeStorageType;
      };

      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.defaultStorageType, fakeStorageType);
        Cluster.getStorageType_ = getStorageType;
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should execute callback with all arguments', function(done) {
      let args = [{}, {}, {}];

      cluster.bigtable.request = function(config, callback) {
        callback.apply(null, args);
      };

      cluster.setMetadata({}, function() {
        assert.deepStrictEqual([].slice.call(arguments), args);
        done();
      });
    });
  });

  describe('createSnapshot', () => {
    it('should provide the proper request options', done => {
      const snapshotId = 'my-table-snapshot';
      const description = 'snapshot description text';
      const ttl = 172800; // 48 hours in seconds
      cluster.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'snapshotTable');
        assert.strictEqual(config.reqOpts.name, TABLE_NAME);
        assert.strictEqual(config.reqOpts.cluster, CLUSTER_NAME);
        assert.strictEqual(config.reqOpts.snapshotId, snapshotId);
        assert.strictEqual(config.reqOpts.description, description);
        assert.strictEqual(config.reqOpts.ttl, ttl);
        assert.deepStrictEqual(config.gaxOpts, {});
        callback();
      };

      cluster.createSnapshot(
        {table: TABLE_NAME, snapshotId, description, ttl},
        done
      );
    });
  });

  describe('getSnapshot', () => {
    it('should provide the proper request options', done => {
      const SNAPSHOT_NAME = CLUSTER_NAME + '/snapshots/my-table-snapshot';

      cluster.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'getSnapshot');
        assert.strictEqual(config.reqOpts.name, SNAPSHOT_NAME);
        assert.deepStrictEqual(config.gaxOpts, {});
        callback();
      };

      cluster.getSnapshot(SNAPSHOT_NAME, done);
    });
  });

  describe('listSnapshot', () => {
    const PAGE_SIZE = 5;
    it('should provide the proper request options', done => {
      cluster.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'listSnapshots');
        assert.strictEqual(config.reqOpts.parent, CLUSTER_NAME);
        assert.strictEqual(config.reqOpts.pageSize, PAGE_SIZE);
        assert.strictEqual(config.gaxOpts, undefined);
        callback();
      };

      cluster.listSnapshots({pageSize: PAGE_SIZE}, done);
    });

    it('should respect empty options', done => {
      cluster.bigtable.request = function(config, callback) {
        callback();
      };

      cluster.listSnapshots(done);
    });
  });

  describe('snapshot', function() {
    const SNAPSHOT_ID = 'my-snapshot';

    it('should return a snapshot instance', function() {
      let snapshot = cluster.snapshot(SNAPSHOT_ID);
      let args = snapshot.calledWith_;

      assert(snapshot instanceof FakeSnapshot);
      assert.strictEqual(args[0], cluster);
      assert.strictEqual(args[1], SNAPSHOT_ID);
    });
  });
});
