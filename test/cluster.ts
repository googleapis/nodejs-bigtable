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

import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import * as proxyquire from 'proxyquire';

let promisified = false;
const fakePromisify = Object.assign({}, promisify, {
  promisifyAll(Class) {
    if (Class.name === 'Cluster') {
      promisified = true;
    }
  },
});

describe('Bigtable/Cluster', function() {
  const CLUSTER_ID = 'my-cluster';
  const PROJECT_ID = 'grape-spaceship-123';

  const INSTANCE = {
    name: `projects/${PROJECT_ID}/instances/i`,
    bigtable: {projectId: PROJECT_ID},
  };

  const CLUSTER_NAME = `${INSTANCE.name}/clusters/${CLUSTER_ID}`;
  let Cluster;
  let cluster;

  before(function() {
    Cluster = proxyquire('../src/cluster.js', {
                '@google-cloud/promisify': fakePromisify,
              }).Cluster;
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
      const cluster = new Cluster(INSTANCE, CLUSTER_ID);
      assert.strictEqual(cluster.name, CLUSTER_NAME);
    });

    it('should localize the id from the name', function() {
      assert.strictEqual(cluster.id, CLUSTER_ID);
    });

    it('should leave full cluster names unaltered and localize the id from the name',
       function() {
         const cluster = new Cluster(INSTANCE, CLUSTER_NAME);
         assert.strictEqual(cluster.name, CLUSTER_NAME);
         assert.strictEqual(cluster.id, CLUSTER_ID);
       });

    it('should throw if cluster id in wrong format', function() {
      const id = `clusters/${CLUSTER_ID}`;
      assert.throws(function() {
        new Cluster(INSTANCE, id);
      }, Error);
    });
  });

  describe('getLocation_', function() {
    const LOCATION = 'us-central1-b';

    it('should format the location name', function() {
      const expected = `projects/${PROJECT_ID}/locations/${LOCATION}`;
      const formatted = Cluster.getLocation_(PROJECT_ID, LOCATION);
      assert.strictEqual(formatted, expected);
    });

    it('should format the location name for project name with /', function() {
      const PROJECT_NAME = 'projects/grape-spaceship-123';
      const expected =
          `projects/${PROJECT_NAME.split('/').pop()}/locations/${LOCATION}`;
      const formatted = Cluster.getLocation_(PROJECT_NAME, LOCATION);
      assert.strictEqual(formatted, expected);
    });

    it('should not re-format a complete location', function() {
      const complete = `projects/p/locations/${LOCATION}`;
      const formatted = Cluster.getLocation_(PROJECT_ID, complete);
      assert.strictEqual(formatted, complete);
    });
  });

  describe('getStorageType_', function() {
    const types = {
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
      const options = {};

      cluster.instance.createCluster = function(id, options_, callback) {
        assert.strictEqual(id, cluster.id);
        assert.strictEqual(options_, options);
        callback();  // done()
      };

      cluster.create(options, done);
    });

    it('should not require options', function(done) {
      cluster.instance.createCluster = function(id, options, callback) {
        assert.deepStrictEqual(options, {});
        callback();  // done()
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

        callback();  // done()
      };

      cluster.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

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
      const gaxOptions = {};

      cluster.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      cluster.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', function(done) {
      const error: any = new Error('Error.');
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
      const error: any = new Error('Error.');
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
      const gaxOptions = {};

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
      const error = new Error('Error.');

      cluster.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      cluster.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      const metadata = {};

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
      const gaxOptions = {};

      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      cluster.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update metadata', function(done) {
      const metadata = {};

      cluster.bigtable.request = function(config, callback) {
        callback(null, metadata);
      };

      cluster.getMetadata(function() {
        assert.strictEqual(cluster.metadata, metadata);
        done();
      });
    });

    it('should execute callback with original arguments', function(done) {
      const args = [{}, {}, {}];

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
        callback();  // done()
      };

      cluster.setMetadata({}, done);
    });

    it('should respect the location option', function(done) {
      const options = {
        location: 'us-centralb-1',
      };

      const getLocation = Cluster.getLocation_;
      const fakeLocation = 'a/b/c/d';

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
      const options = {
        nodes: 3,
      };

      cluster.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.serveNodes, options.nodes);
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should respect the storage option', function(done) {
      const options = {
        storage: 'ssd',
      };

      const getStorageType = Cluster.getStorageType_;
      const fakeStorageType = 'a';

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
      const args = [{}, {}, {}];

      cluster.bigtable.request = function(config, callback) {
        callback.apply(null, args);
      };

      cluster.setMetadata({}, function() {
        assert.deepStrictEqual([].slice.call(arguments), args);
        done();
      });
    });
  });
});
