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
var extend = require('extend');
var format = require('string-format-obj');
var proxyquire = require('proxyquire');

var common = require('@google-cloud/common');

var promisified = false;
var fakeUtil = extend({}, common.util, {
  promisifyAll: function(Class) {
    if (Class.name === 'Cluster') {
      promisified = true;
    }
  },
});

describe('Bigtable/Cluster', function() {
  var CLUSTER_NAME = 'my-cluster';
  var PROJECT_ID = 'grape-spaceship-123';

  var INSTANCE = {
    id: 'projects/p/instances/i',
    bigtable: {projectId: PROJECT_ID},
  };

  var CLUSTER_ID = format('{instance}/clusters/{cluster}', {
    instance: INSTANCE.id,
    cluster: CLUSTER_NAME,
  });

  var Cluster;
  var cluster;

  before(function() {
    Cluster = proxyquire('../src/cluster.js', {
      '@google-cloud/common': {
        util: fakeUtil,
      },
    });
  });

  beforeEach(function() {
    cluster = new Cluster(INSTANCE, CLUSTER_NAME);
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

    it('should expand name into full resource path', function() {
      assert.strictEqual(cluster.id, CLUSTER_ID);
    });

    it('should leave full cluster names unaltered', function() {
      var cluster = new Cluster(INSTANCE, CLUSTER_ID);
      assert.strictEqual(cluster.id, CLUSTER_ID);
    });

    it('should localize the name from the ID', function() {
      assert.strictEqual(cluster.name, CLUSTER_NAME);
    });
  });

  describe('getLocation_', function() {
    var LOCATION = 'us-centralb-1';

    it('should format the location name', function() {
      var expected = format('projects/{project}/locations/{location}', {
        project: PROJECT_ID,
        location: LOCATION,
      });

      var formatted = Cluster.getLocation_(PROJECT_ID, LOCATION);
      assert.strictEqual(formatted, expected);
    });

    it('should not re-format a complete location', function() {
      var complete = format('projects/p/locations/{location}', {
        location: LOCATION,
      });

      var formatted = Cluster.getLocation_(PROJECT_ID, complete);
      assert.strictEqual(formatted, complete);
    });
  });

  describe('getStorageType_', function() {
    var types = {
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
      var options = {};

      cluster.instance.createCluster = function(name, options_, callback) {
        assert.strictEqual(name, cluster.name);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      cluster.create(options, done);
    });

    it('should not require options', function(done) {
      cluster.instance.createCluster = function(name, options, callback) {
        assert.deepStrictEqual(options, {});
        callback(); // done()
      };

      cluster.create(done);
    });
  });

  describe('delete', function() {
    it('should accept gaxOptions', function(done) {
      cluster.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'deleteCluster');

        assert.deepEqual(config.reqOpts, {
          name: cluster.id,
        });

        assert.deepEqual(config.gaxOpts, {});

        callback(); // done()
      };

      cluster.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

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
      var gaxOptions = {};

      cluster.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      cluster.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', function(done) {
      var error = new Error('Error.');
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
      var error = new Error('Error.');
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
      var options = {
        gaxOptions: {},
      };

      cluster.getMetadata = function(gaxOptions) {
        assert.strictEqual(gaxOptions, options.gaxOptions);
        done();
      };

      cluster.get(options, assert.ifError);
    });

    it('should not require an options object', function(done) {
      cluster.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, undefined);
        done();
      };

      cluster.get(assert.ifError);
    });

    it('should auto create with error code 5', function(done) {
      var error = new Error('Error.');
      error.code = 5;

      var options = {
        autoCreate: true,
        gaxOptions: {},
      };

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      cluster.create = function(options_, callback) {
        assert.strictEqual(options_.gaxOptions, options.gaxOptions);
        callback(); // done()
      };

      cluster.get(options, done);
    });

    it('should not auto create without error code 5', function(done) {
      var error = new Error('Error.');
      error.code = 'NOT-5';

      var options = {
        autoCreate: true,
      };

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      cluster.create = function() {
        throw new Error('Should not create.');
      };

      cluster.get(options, function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should not auto create unless requested', function(done) {
      var error = new Error('Error.');
      error.code = 5;

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      cluster.create = function() {
        throw new Error('Should not create.');
      };

      cluster.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an error from getMetadata', function(done) {
      var error = new Error('Error.');

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      cluster.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      var apiResponse = {};

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(null, apiResponse);
      };

      cluster.get(function(err, cluster_, apiResponse_) {
        assert.ifError(err);
        assert.strictEqual(cluster_, cluster);
        assert.strictEqual(apiResponse_, apiResponse);
        done();
      });
    });
  });

  describe('getMetadata', function() {
    it('should make correct request', function(done) {
      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'getCluster');

        assert.deepEqual(config.reqOpts, {
          name: cluster.id,
        });

        assert.deepEqual(config.gaxOpts, {});

        done();
      };

      cluster.getMetadata(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      cluster.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update metadata', function(done) {
      var metadata = {};

      cluster.bigtable.request = function(config, callback) {
        callback(null, metadata);
      };

      cluster.getMetadata(function() {
        assert.strictEqual(cluster.metadata, metadata);
        done();
      });
    });

    it('should execute callback with original arguments', function(done) {
      var args = [{}, {}, {}];

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
        assert.strictEqual(config.reqOpts.name, CLUSTER_ID);
        callback(); // done()
      };

      cluster.setMetadata({}, done);
    });

    it('should respect the location option', function(done) {
      var options = {
        location: 'us-centralb-1',
      };

      var getLocation = Cluster.getLocation_;
      var fakeLocation = 'a/b/c/d';

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
      var options = {
        nodes: 3,
      };

      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.serveNodes, options.nodes);
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should respect the storage option', function(done) {
      var options = {
        storage: 'ssd',
      };

      var getStorageType = Cluster.getStorageType_;
      var fakeStorageType = 'a';

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
  });
});
