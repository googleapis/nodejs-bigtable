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
var commonGrpc = require('@google-cloud/common-grpc');
var extend = require('extend');
var grpc = require('google-gax').grpc().grpc;
var nodeutil = require('util');
var proxyquire = require('proxyquire');
var sinon = require('sinon').sandbox.create();
var through = require('through2');

var Cluster = require('../src/cluster.js');
var Instance = require('../src/instance.js');
var v2 = require('../src/v2');

var PKG = require('../package.json');

function fakeV2() {}

var promisified = false;
var replaceProjectIdTokenOverride;
var fakeUtil = extend({}, common.util, {
  promisifyAll: function(Class, options) {
    if (Class.name !== 'Bigtable') {
      return;
    }

    promisified = true;
    assert.deepEqual(options.exclude, ['instance', 'operation', 'request']);
  },
  replaceProjectIdToken: function(reqOpts) {
    if (replaceProjectIdTokenOverride) {
      return replaceProjectIdTokenOverride.apply(null, arguments);
    }

    return reqOpts;
  },
});
var originalFakeUtil = extend(true, {}, fakeUtil);

var googleAutoAuthOverride;
function fakeGoogleAutoAuth() {
  return (googleAutoAuthOverride || common.util.noop).apply(null, arguments);
}

var retryRequestOverride;
function fakeRetryRequest() {
  return (retryRequestOverride || require('retry-request')).apply(
    null,
    arguments
  );
}

function createFake(Class) {
  function Fake() {
    this.calledWith_ = arguments;
    Class.apply(this, arguments);
  }
  nodeutil.inherits(Fake, Class);
  return Fake;
}

var FakeCluster = createFake(Cluster);
var FakeInstance = createFake(Instance);

describe('Bigtable', function() {
  var PROJECT_ID = 'test-project';
  var PROJECT_ID_TOKEN = '{{projectId}}';

  var Bigtable;
  var bigtable;

  before(function() {
    Bigtable = proxyquire('../', {
      '@google-cloud/common': {
        util: fakeUtil,
      },
      'google-auto-auth': fakeGoogleAutoAuth,
      'retry-request': fakeRetryRequest,
      './cluster.js': FakeCluster,
      './instance.js': FakeInstance,
      './v2': fakeV2,
    });
  });

  afterEach(function() {
    sinon.restore();
  });

  beforeEach(function() {
    extend(fakeUtil, originalFakeUtil);

    googleAutoAuthOverride = null;
    retryRequestOverride = null;
    replaceProjectIdTokenOverride = null;

    delete process.env.BIGTABLE_EMULATOR_HOST;

    bigtable = new Bigtable({projectId: PROJECT_ID});
  });

  describe('instantiation', function() {
    let EXPECTED_SCOPES = [];
    let clientClasses = [
      v2.BigtableClient,
      v2.BigtableInstanceAdminClient,
      v2.BigtableTableAdminClient,
    ];

    for (let clientClass of clientClasses) {
      for (let scope of clientClass.scopes) {
        if (EXPECTED_SCOPES.indexOf(scope) === -1) {
          EXPECTED_SCOPES.push(scope);
        }
      }
    }

    it('should promisify all the things', function() {
      assert(promisified);
    });

    it('should work without new', function() {
      assert.doesNotThrow(function() {
        Bigtable({projectId: PROJECT_ID});
      });
    });

    it('should normalize the arguments', function() {
      var normalizeArgumentsCalled = false;
      var options = {};

      fakeUtil.normalizeArguments = function(context, options_) {
        normalizeArgumentsCalled = true;
        assert.strictEqual(options_, options);
        return options_;
      };

      new Bigtable(options);
      assert.strictEqual(normalizeArgumentsCalled, true);
    });

    it('should initialize the API object', function() {
      assert.deepEqual(bigtable.api, {});
    });

    it('should cache a local google-auto-auth instance', function() {
      var fakeGoogleAutoAuthInstance = {};
      var options = {
        a: 'b',
        c: 'd',
      };

      googleAutoAuthOverride = function(options_) {
        assert.deepEqual(
          options_,
          extend(
            {
              libName: 'gccl',
              libVersion: PKG.version,
              scopes: EXPECTED_SCOPES,
              'grpc.max_send_message_length': -1,
              'grpc.max_receive_message_length': -1,
            },
            options
          )
        );
        return fakeGoogleAutoAuthInstance;
      };

      var bigtable = new Bigtable(options);
      assert.strictEqual(bigtable.auth, fakeGoogleAutoAuthInstance);
    });

    it('should localize the projectId', function() {
      assert.strictEqual(bigtable.projectId, PROJECT_ID);
    });

    it('should localize options', function() {
      var options = {
        a: 'b',
        c: 'd',
      };

      var bigtable = new Bigtable(options);
      var defaultOptions = {
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      };

      assert.deepEqual(bigtable.options, {
        BigtableClient: extend(
          {
            servicePath: 'bigtable.googleapis.com',
            port: 443,
            sslCreds: undefined,
          },
          defaultOptions
        ),
        BigtableInstanceAdminClient: extend(
          {
            servicePath: 'bigtableadmin.googleapis.com',
            port: 443,
            sslCreds: undefined,
          },
          defaultOptions
        ),
        BigtableTableAdminClient: extend(
          {
            servicePath: 'bigtableadmin.googleapis.com',
            port: 443,
            sslCreds: undefined,
          },
          defaultOptions
        ),
      });
    });

    it('should work with the emulator', function() {
      process.env.BIGTABLE_EMULATOR_HOST = 'override:8080';

      var options = {
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      };

      var bigtable = new Bigtable(options);

      assert.strictEqual(
        bigtable.customEndpoint,
        process.env.BIGTABLE_EMULATOR_HOST
      );

      assert.deepEqual(bigtable.options, {
        BigtableClient: extend(
          {
            servicePath: 'override',
            port: 8080,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
        BigtableInstanceAdminClient: extend(
          {
            servicePath: 'override',
            port: 8080,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
        BigtableTableAdminClient: extend(
          {
            servicePath: 'override',
            port: 8080,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
      });
    });

    it('should work with a customEndpoint', function() {
      var options = {
        apiEndpoint: 'customEndpoint:9090',
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      };

      var bigtable = new Bigtable(options);

      assert.strictEqual(bigtable.customEndpoint, options.apiEndpoint);

      assert.deepEqual(bigtable.options, {
        BigtableClient: extend(
          {
            servicePath: 'customEndpoint',
            port: 9090,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
        BigtableInstanceAdminClient: extend(
          {
            servicePath: 'customEndpoint',
            port: 9090,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
        BigtableTableAdminClient: extend(
          {
            servicePath: 'customEndpoint',
            port: 9090,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
      });
    });

    it('should default projectId to token', function() {
      var bigtable = new Bigtable();
      assert.strictEqual(bigtable.projectId, PROJECT_ID_TOKEN);
    });

    it('should set the projectName', function() {
      assert.strictEqual(bigtable.projectName, 'projects/' + PROJECT_ID);
    });

    it('should set the appProfileId', function() {
      var options = {
        appProfileId: 'app-profile-id-12345',
      };

      var bigtable = new Bigtable(options);

      assert.strictEqual(bigtable.appProfileId, 'app-profile-id-12345');
    });
  });

  describe('createInstance', function() {
    var INSTANCE_NAME = 'my-instance';

    it('should provide the proper request options', function(done) {
      bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'createInstance');

        assert.strictEqual(config.reqOpts.parent, bigtable.projectName);
        assert.strictEqual(config.reqOpts.instanceId, INSTANCE_NAME);
        assert.strictEqual(config.reqOpts.instance.displayName, INSTANCE_NAME);

        assert.strictEqual(config.gaxOpts, undefined);

        done();
      };

      bigtable.createInstance(INSTANCE_NAME, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      bigtable.createInstance(INSTANCE_NAME, {gaxOptions}, assert.ifError);
    });

    it('should respect the displayName option', function(done) {
      var options = {
        displayName: 'robocop',
      };

      bigtable.request = function(config) {
        assert.strictEqual(
          config.reqOpts.instance.displayName,
          options.displayName
        );
        done();
      };

      bigtable.createInstance(INSTANCE_NAME, options, assert.ifError);
    });

    it('should respect the type option', function(done) {
      var options = {type: 'development'};
      var fakeTypeType = 99;

      FakeInstance.getTypeType_ = function(type) {
        assert.strictEqual(type, options.type);
        return fakeTypeType;
      };

      bigtable.request = function(config) {
        assert.deepEqual(config.reqOpts.instance.type, fakeTypeType);
        done();
      };

      bigtable.createInstance(INSTANCE_NAME, options, assert.ifError);
    });

    it('should respect the clusters option', function(done) {
      var cluster = {
        name: 'my-cluster',
        location: 'us-central1-b',
        nodes: 3,
        storage: 'ssd',
      };

      var options = {
        clusters: [cluster],
      };

      var fakeLocation = 'a/b/c/d';
      FakeCluster.getLocation_ = function(project, location) {
        assert.strictEqual(project, PROJECT_ID);
        assert.strictEqual(location, cluster.location);
        return fakeLocation;
      };

      var fakeStorage = 20;
      FakeCluster.getStorageType_ = function(storage) {
        assert.strictEqual(storage, cluster.storage);
        return fakeStorage;
      };

      bigtable.request = function(config) {
        assert.deepEqual(config.reqOpts.clusters, {
          'my-cluster': {
            location: fakeLocation,
            serveNodes: cluster.nodes,
            defaultStorageType: fakeStorage,
          },
        });

        done();
      };

      bigtable.createInstance(INSTANCE_NAME, options, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var error = new Error('err');

      bigtable.request = function(config, callback) {
        callback(error);
      };

      bigtable.createInstance(INSTANCE_NAME, function(
        err,
        instance,
        operation
      ) {
        assert.strictEqual(err, error);
        assert.strictEqual(instance, undefined);
        assert.strictEqual(operation, undefined);
        done();
      });
    });

    it('should return an instance to the callback', function(done) {
      var response = {
        name: 'my-operation',
      };

      var responseArg2 = {};
      var responseArg3 = {};

      var fakeInstance = {};
      bigtable.instance = function(name) {
        assert.strictEqual(name, INSTANCE_NAME);
        return fakeInstance;
      };

      bigtable.request = function(config, callback) {
        callback(null, response, responseArg2, responseArg3);
      };

      bigtable.createInstance(INSTANCE_NAME, function(err, instance) {
        assert.ifError(err);
        assert.strictEqual(instance, fakeInstance);
        assert.strictEqual(arguments[2], response);
        assert.strictEqual(arguments[3], responseArg2);
        assert.strictEqual(arguments[4], responseArg3);
        done();
      });
    });
  });

  describe('getInstances', function() {
    it('should provide the proper request options', function(done) {
      bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'listInstances');
        assert.deepStrictEqual(config.reqOpts, {
          parent: bigtable.projectName,
        });
        assert.deepEqual(config.gaxOpts, {});
        done();
      };

      bigtable.getInstances(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      bigtable.getInstances(gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var error = new Error('err');

      bigtable.request = function(config, callback) {
        callback(error);
      };

      bigtable.getInstances(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of instance objects', function(done) {
      var response = {
        instances: [
          {
            name: 'a',
          },
          {
            name: 'b',
          },
        ],
      };

      var fakeInstances = [{}, {}];

      bigtable.request = function(config, callback) {
        callback(null, response);
      };

      var instanceCount = 0;

      bigtable.instance = function(name) {
        assert.strictEqual(name, response.instances[instanceCount].name);
        return fakeInstances[instanceCount++];
      };

      bigtable.getInstances(function(err, instances, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(instances[0], fakeInstances[0]);
        assert.strictEqual(instances[0].metadata, response.instances[0]);
        assert.strictEqual(instances[1], fakeInstances[1]);
        assert.strictEqual(instances[1].metadata, response.instances[1]);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('instance', function() {
    var INSTANCE_NAME = 'my-instance';

    it('should return an Instance object', function() {
      var instance = bigtable.instance(INSTANCE_NAME);
      var args = instance.calledWith_;

      assert(instance instanceof FakeInstance);
      assert.strictEqual(args[0], bigtable);
      assert.strictEqual(args[1], INSTANCE_NAME);
    });
  });

  describe('request', function() {
    var CONFIG = {
      client: 'client',
      method: 'method',
      reqOpts: {
        a: 'b',
        c: 'd',
      },
      gaxOpts: {},
    };

    beforeEach(function() {
      bigtable.getProjectId_ = function(callback) {
        callback(null, PROJECT_ID);
      };

      bigtable.api[CONFIG.client] = {
        [CONFIG.method]: common.util.noop,
      };
    });

    describe('prepareGaxRequest', function() {
      it('should get the project ID', function(done) {
        bigtable.getProjectId_ = function() {
          done();
        };

        bigtable.request(CONFIG, assert.ifError);
      });

      it('should return error if getting project ID failed', function(done) {
        var error = new Error('Error.');

        bigtable.getProjectId_ = function(callback) {
          callback(error);
        };

        bigtable.request(CONFIG, function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should initiate and cache the client', function() {
        var fakeClient = {
          [CONFIG.method]: common.util.noop,
        };

        fakeV2[CONFIG.client] = function(options) {
          assert.strictEqual(options, bigtable.options[CONFIG.client]);
          return fakeClient;
        };

        bigtable.api = {};

        bigtable.request(CONFIG, assert.ifError);

        assert.strictEqual(bigtable.api[CONFIG.client], fakeClient);
      });

      it('should use the cached client', function(done) {
        fakeV2[CONFIG.client] = function() {
          done(new Error('Should not re-instantiate a GAX client.'));
        };

        bigtable.request(CONFIG);
        done();
      });

      it('should replace the project ID token', function(done) {
        var replacedReqOpts = {};

        replaceProjectIdTokenOverride = function(reqOpts, projectId) {
          assert.notStrictEqual(reqOpts, CONFIG.reqOpts);
          assert.deepEqual(reqOpts, CONFIG.reqOpts);
          assert.strictEqual(projectId, PROJECT_ID);

          return replacedReqOpts;
        };

        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind: function(gaxClient, reqOpts) {
            assert.strictEqual(reqOpts, replacedReqOpts);

            setImmediate(done);

            return common.util.noop;
          },
        };

        bigtable.request(CONFIG, assert.ifError);
      });

      it('should not replace token when project ID not detected', function(done) {
        replaceProjectIdTokenOverride = function() {
          throw new Error('Should not have tried to replace token.');
        };

        bigtable.getProjectId_ = function(callback) {
          callback(null, PROJECT_ID_TOKEN);
        };

        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind: function(gaxClient, reqOpts) {
            assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);

            setImmediate(done);

            return common.util.noop;
          },
        };

        bigtable.request(CONFIG, assert.ifError);
      });
    });

    describe('makeRequestCallback', function() {
      it('should prepare the request', function(done) {
        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind: function(gaxClient, reqOpts, gaxOpts) {
            assert.strictEqual(gaxClient, bigtable.api[CONFIG.client]);
            assert.deepEqual(reqOpts, CONFIG.reqOpts);
            assert.strictEqual(gaxOpts, CONFIG.gaxOpts);

            setImmediate(done);

            return common.util.noop;
          },
        };

        bigtable.request(CONFIG, assert.ifError);
      });

      it('should execute callback with error', function(done) {
        var error = new Error('Error.');

        bigtable.api[CONFIG.client][CONFIG.method] = function() {
          var callback = [].slice.call(arguments).pop();
          callback(error);
        };

        bigtable.request(CONFIG, function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should execute the request function', function() {
        bigtable.api[CONFIG.client][CONFIG.method] = function(done) {
          var callback = [].slice.call(arguments).pop();
          callback(null, done); // so it ends the test
        };

        bigtable.request(CONFIG, assert.ifError);
      });
    });

    describe('makeRequestStream', function() {
      var GAX_STREAM;

      beforeEach(function() {
        GAX_STREAM = through();

        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind: function() {
            return function() {
              return GAX_STREAM;
            };
          },
        };
      });

      it('should use retry-request', function(done) {
        retryRequestOverride = function(_, config) {
          assert.strictEqual(config.currentRetryAttempt, 0);
          assert.strictEqual(config.objectMode, true);
          assert.strictEqual(
            config.shouldRetryFn,
            commonGrpc.Service.shouldRetryRequest_
          );
          done();
        };

        var requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
      });

      it('should expose an abort function', function(done) {
        GAX_STREAM.cancel = done;

        var requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
        requestStream.abort();
      });

      it('should prepare the request once reading', function(done) {
        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind: function(gaxClient, reqOpts, gaxOpts) {
            assert.strictEqual(gaxClient, bigtable.api[CONFIG.client]);
            assert.deepEqual(reqOpts, CONFIG.reqOpts);
            assert.strictEqual(gaxOpts, CONFIG.gaxOpts);

            setImmediate(done);

            return function() {
              return GAX_STREAM;
            };
          },
        };

        var requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
      });

      it('should destroy the stream with prepare error', function(done) {
        var error = new Error('Error.');

        bigtable.getProjectId_ = function(callback) {
          callback(error);
        };

        var requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');

        requestStream.on('error', function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should destroy the stream with GAX error', function(done) {
        var error = new Error('Error.');

        var requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');

        requestStream.on('error', function(err) {
          assert.strictEqual(err, error);
          done();
        });

        GAX_STREAM.emit('error', error);
      });

      it('should re-emit request event from retry-request', function(done) {
        retryRequestOverride = function() {
          var fakeRetryRequestStream = through.obj();
          setImmediate(function() {
            fakeRetryRequestStream.emit('request');
          });
          return fakeRetryRequestStream;
        };

        var requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
        requestStream.on('request', done);
      });
    });
  });

  describe('getProjectId_', function() {
    beforeEach(function() {
      bigtable.auth = {
        getProjectId: function(callback) {
          callback(null, PROJECT_ID);
        },
      };
    });

    it('should return the provided project ID', function(done) {
      var providedProjectId = 'provided-project-id';

      bigtable.auth.getProjectId = function() {
        throw new Error('Auth client should not be called.');
      };

      bigtable.projectId = providedProjectId;

      bigtable.getProjectId_(function(err, projectId) {
        assert.ifError(err);
        assert.strictEqual(projectId, providedProjectId);
        done();
      });
    });

    it('should return any project ID if in custom endpoint', function(done) {
      bigtable.auth.getProjectId = function() {
        throw new Error('Auth client should not be called.');
      };

      bigtable.projectId = PROJECT_ID_TOKEN;
      bigtable.customEndpoint = 'custom-endpoint';

      bigtable.getProjectId_(function(err, projectId) {
        assert.ifError(err);
        assert.strictEqual(projectId, PROJECT_ID_TOKEN);
        done();
      });
    });

    it('should return error if project ID detection failed', function(done) {
      var error = new Error('Error.');

      bigtable.auth.getProjectId = function(callback) {
        callback(error);
      };

      bigtable.projectId = PROJECT_ID_TOKEN;

      bigtable.getProjectId_(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should get and cache the project ID if not provided', function(done) {
      var detectedProjectId = 'detected-project-id';

      bigtable.auth.getProjectId = function(callback) {
        callback(null, detectedProjectId);
      };

      bigtable.projectId = PROJECT_ID_TOKEN;

      bigtable.getProjectId_(function(err, projectId) {
        assert.ifError(err);
        assert.strictEqual(projectId, detectedProjectId);
        assert.strictEqual(bigtable.projectId, detectedProjectId);
        done();
      });
    });
  });
});
