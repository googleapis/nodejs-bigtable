/**
 * Copyright 2018 Google Inc. All Rights Reserved.
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
  promisifyAll(klass) {
    if (klass.name === 'AppProfile') {
      promisified = true;
    }
  },
});

describe('Bigtable/AppProfile', function() {
  const APP_PROFILE_ID = 'my-app-profile';
  const PROJECT_ID = 'grape-spaceship-123';

  const INSTANCE = {
    name: `projects/${PROJECT_ID}/instances/i`,
    bigtable: {projectId: PROJECT_ID},
  };

  const APP_PROFILE_NAME = `${INSTANCE.name}/appProfiles/${APP_PROFILE_ID}`;
  let AppProfile;
  let appProfile;

  class FakeCluster {
    instance;
    id;
    constructor(instance, id) {
      this.instance = instance;
      this.id = id;
    }
  }

  before(function() {
    AppProfile = proxyquire('../src/app-profile.js', {
                   '../src/cluster.js': {Cluster: FakeCluster},
                   '@google-cloud/promisify': fakePromisify,
                 }).AppProfile;
  });

  beforeEach(function() {
    appProfile = new AppProfile(INSTANCE, APP_PROFILE_NAME);
  });

  describe('instantiation', function() {
    it('should promisify all the things', function() {
      assert(promisified);
    });

    it('should localize Bigtable instance', function() {
      assert.strictEqual(appProfile.bigtable, INSTANCE.bigtable);
    });

    it('should localize Instance instance', function() {
      assert.strictEqual(appProfile.instance, INSTANCE);
    });

    it('should expand name into full resource path', function() {
      assert.strictEqual(appProfile.name, APP_PROFILE_NAME);
    });

    it('should leave full app profile name unaltered', function() {
      const appProfile = new AppProfile(INSTANCE, APP_PROFILE_NAME);
      assert.strictEqual(appProfile.name, APP_PROFILE_NAME);
    });

    it('should localize the name from the ID', function() {
      assert.strictEqual(appProfile.id, APP_PROFILE_ID);
    });

    it('should leave full app profile name unaltered and localize the id from the name',
       function() {
         const appProfile = new AppProfile(INSTANCE, APP_PROFILE_NAME);
         assert.strictEqual(appProfile.name, APP_PROFILE_NAME);
         assert.strictEqual(appProfile.id, APP_PROFILE_ID);
       });

    it('should throw if cluster id in wrong format', function() {
      const id = `appProfiles/${APP_PROFILE_ID}`;
      assert.throws(function() {
        new AppProfile(INSTANCE, id);
      }, Error);
    });
  });

  describe('formatAppProfile_', function() {
    it(`should accept an 'any' cluster routing policy`, function() {
      const formattedAppProfile = AppProfile.formatAppProfile_({
        routing: 'any',
      });
      assert.deepStrictEqual(formattedAppProfile.multiClusterRoutingUseAny, {});
    });

    describe(`with a single cluster routing policy`, function() {
      const clusterId = 'my-cluster';
      const cluster = new FakeCluster(INSTANCE, clusterId);

      it('should accept allowTransactionalWrites not being set', function() {
        const formattedAppProfile = AppProfile.formatAppProfile_({
          routing: cluster,
        });
        assert.deepStrictEqual(formattedAppProfile.singleClusterRouting, {
          clusterId,
        });
      });
      it('should accept allowTransactionalWrites', function() {
        const formattedAppProfile = AppProfile.formatAppProfile_({
          routing: cluster,
          allowTransactionalWrites: true,
        });
        assert.deepStrictEqual(formattedAppProfile.singleClusterRouting, {
          clusterId,
          allowTransactionalWrites: true,
        });
      });

      it(`should accept description`, function() {
        const description = 'my-description';
        const formattedAppProfile = AppProfile.formatAppProfile_({
          description,
        });
        assert.strictEqual(formattedAppProfile.description, description);
      });

      it('should throw for an invalid routing policy', function() {
        const errorReg =
            /An app profile routing policy can only contain "any" or a `Cluster`\./;

        assert.throws(
            AppProfile.formatAppProfile_.bind(null, {
              routing: 'not-any',
            }),
            errorReg);
      });
    });
  });

  describe('create', function() {
    it('should call createAppProfile from instance', function(done) {
      const options = {};

      appProfile.instance.createAppProfile = function(id, options_, callback) {
        assert.strictEqual(id, appProfile.id);
        assert.strictEqual(options_, options);
        callback();
      };

      appProfile.create(options, done);
    });

    it('should not require options', function(done) {
      appProfile.instance.createAppProfile = function(id, options, callback) {
        assert.deepStrictEqual(options, {});
        callback();
      };

      appProfile.create(done);
    });
  });

  describe('delete', function() {
    it('should make the correct request', function(done) {
      appProfile.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'deleteAppProfile');

        assert.deepStrictEqual(config.reqOpts, {
          name: appProfile.name,
        });

        callback();
      };

      appProfile.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      appProfile.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      appProfile.delete({gaxOptions}, assert.ifError);
    });

    it('should accept ignoreWarnings', function(done) {
      appProfile.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.ignoreWarnings, true);
        done();
      };

      appProfile.delete({ignoreWarnings: true}, assert.ifError);
    });
  });

  describe('exists', function() {
    it('should not require gaxOptions', function(done) {
      appProfile.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      appProfile.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', function(done) {
      const gaxOptions = {};

      appProfile.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      appProfile.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', function(done) {
      const error: any = new Error('Error.');
      error.code = 5;

      appProfile.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      appProfile.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if code is not 5', function(done) {
      const error: any = new Error('Error.');
      error.code = 'NOT-5';

      appProfile.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      appProfile.exists(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', function(done) {
      appProfile.getMetadata = function(gaxOptions, callback) {
        callback(null, {});
      };

      appProfile.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('get', function() {
    it('should call getMetadata', function(done) {
      const gaxOptions = {};

      appProfile.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      appProfile.get(gaxOptions, assert.ifError);
    });

    it('should not require gaxOptions', function(done) {
      appProfile.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      appProfile.get(assert.ifError);
    });

    it('should return an error from getMetadata', function(done) {
      const error = new Error('Error.');

      appProfile.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      appProfile.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      const metadata = {};

      appProfile.getMetadata = function(gaxOptions, callback) {
        callback(null, metadata);
      };

      appProfile.get(function(err, appProfile_, metadata_) {
        assert.ifError(err);
        assert.strictEqual(appProfile_, appProfile);
        assert.strictEqual(metadata_, metadata);
        done();
      });
    });
  });

  describe('getMetadata', function() {
    it('should make correct request', function(done) {
      appProfile.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'getAppProfile');

        assert.deepStrictEqual(config.reqOpts, {
          name: appProfile.name,
        });

        assert.deepStrictEqual(config.gaxOpts, {});

        done();
      };

      appProfile.getMetadata(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      appProfile.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      appProfile.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update metadata', function(done) {
      const metadata = {};

      appProfile.bigtable.request = function(config, callback) {
        callback(null, metadata);
      };

      appProfile.getMetadata(function() {
        assert.strictEqual(appProfile.metadata, metadata);
        done();
      });
    });

    it('should execute callback with original arguments', function(done) {
      const args = [{}, {}, {}];

      appProfile.bigtable.request = function(config, callback) {
        callback.apply(null, args);
      };

      appProfile.getMetadata(function() {
        assert.deepStrictEqual([].slice.call(arguments), args);
        done();
      });
    });
  });

  describe('setMetadata', function() {
    it('should provide the proper request options', function(done) {
      appProfile.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'updateAppProfile');
        assert.strictEqual(config.reqOpts.appProfile.name, APP_PROFILE_NAME);
        callback();
      };

      appProfile.setMetadata({}, done);
    });

    it('should respect the description option', function(done) {
      const options = {description: 'my-description'};

      appProfile.bigtable.request = function(config) {
        assert(
            config.reqOpts.updateMask.paths.indexOf('description') !== -1,
            `updateMask does not should include 'description'`);
        assert.strictEqual(
            config.reqOpts.appProfile.description, options.description);
        done();
      };

      appProfile.setMetadata(options, assert.ifError);
    });

    it('should respect the ignoreWarnings option', function(done) {
      const options = {ignoreWarnings: true};

      appProfile.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.ignoreWarnings, true);
        done();
      };

      appProfile.setMetadata(options, assert.ifError);
    });

    describe('should respect the routing option when', function() {
      const clusterId = 'my-cluster';
      const cluster = new FakeCluster(INSTANCE, clusterId);

      it(`has an 'any' value`, function(done) {
        const options = {routing: 'any'};

        appProfile.bigtable.request = function(config) {
          assert(
              config.reqOpts.updateMask.paths.indexOf(
                  'multi_cluster_routing_use_any') !== -1,
              `updateMask does not should include 'multi_cluster_routing_use_any'`);
          assert.deepStrictEqual(
              config.reqOpts.appProfile.multiClusterRoutingUseAny, {});
          done();
        };

        appProfile.setMetadata(options, assert.ifError);
      });

      it(`has a cluster value`, function(done) {
        const options = {routing: cluster};

        appProfile.bigtable.request = function(config) {
          assert(
              config.reqOpts.updateMask.paths.indexOf(
                  'single_cluster_routing') !== -1,
              `updateMask does not should include 'single_cluster_routing'`);
          assert.deepStrictEqual(
              config.reqOpts.appProfile.singleClusterRouting, {clusterId});
          done();
        };

        appProfile.setMetadata(options, assert.ifError);
      });
    });

    it('should execute callback with all arguments', function(done) {
      const args = [{}, {}, {}];

      appProfile.bigtable.request = function(config, callback) {
        callback.apply(null, args);
      };

      appProfile.setMetadata({}, function() {
        assert.deepStrictEqual([].slice.call(arguments), args);
        done();
      });
    });
  });
});
