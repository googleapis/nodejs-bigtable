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
const gax = require('google-gax');
const grpc = new gax.GrpcClient().grpc;
const proxyquire = require('proxyquire');
const sinon = require('sinon').createSandbox();
const through = require('through2');
const promisify = require('@google-cloud/promisify');
const projectify = require('@google-cloud/projectify');

const Cluster = require('../src/cluster.js');
const Instance = require('../src/instance.js');
const v2 = require('../src/v2');

const PKG = require('../package.json');

function fakeV2() {}

var promisified = false;
var replaceProjectIdTokenOverride;
const fakePromisify = extend({}, promisify, {
  promisifyAll: function(Class, options) {
    if (Class.name !== 'Bigtable') {
      return;
    }
    promisified = true;
    assert.deepStrictEqual(options.exclude, [
      'instance',
      'operation',
      'request',
    ]);
  },
});
const fakeReplaceProjectIdToken = extend({}, projectify, {
  replaceProjectIdToken: function(reqOpts) {
    if (replaceProjectIdTokenOverride) {
      return replaceProjectIdTokenOverride.apply(null, arguments);
    }
    return reqOpts;
  },
});

var googleAuthOverride;
function fakeGoogleAuth() {
  return (googleAuthOverride || common.util.noop).apply(null, arguments);
}

var retryRequestOverride;
function fakeRetryRequest() {
  return (retryRequestOverride || require('retry-request')).apply(
    null,
    arguments
  );
}

function createFake(Class) {
  return class Fake extends Class {
    constructor() {
      super(...arguments);
      this.calledWith_ = arguments;
    }
  };
}

const FakeCluster = createFake(Cluster);
const FakeInstance = createFake(Instance);

describe('Bigtable', function() {
  const PROJECT_ID = 'test-project';
  const PROJECT_ID_TOKEN = '{{projectId}}';

  var Bigtable;
  var bigtable;

  before(function() {
    Bigtable = proxyquire('../', {
      '@google-cloud/promisify': fakePromisify,
      '@google-cloud/projectify': fakeReplaceProjectIdToken,
      'google-auth-library': {
        GoogleAuth: fakeGoogleAuth,
      },
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
    googleAuthOverride = null;
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
      const bigtable = Bigtable();
      assert(bigtable instanceof Bigtable);
    });

    it('should initialize the API object', function() {
      assert.deepStrictEqual(bigtable.api, {});
    });

    it('should cache a local google-auth-library instance', function() {
      let fakeGoogleAuthInstance = {};
      let options = {
        a: 'b',
        c: 'd',
      };

      googleAuthOverride = function(options_) {
        assert.deepStrictEqual(
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
        return fakeGoogleAuthInstance;
      };

      let bigtable = new Bigtable(options);
      assert.strictEqual(bigtable.auth, fakeGoogleAuthInstance);
    });

    it('should localize the projectId', function() {
      assert.strictEqual(bigtable.projectId, PROJECT_ID);
    });

    it('should localize options', function() {
      let options = {
        a: 'b',
        c: 'd',
      };

      let bigtable = new Bigtable(options);
      let defaultOptions = {
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      };

      assert.deepStrictEqual(bigtable.options, {
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

      let options = {
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      };

      let bigtable = new Bigtable(options);

      assert.strictEqual(
        bigtable.customEndpoint,
        process.env.BIGTABLE_EMULATOR_HOST
      );

      assert.deepStrictEqual(bigtable.options, {
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
      let options = {
        apiEndpoint: 'customEndpoint:9090',
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      };

      let bigtable = new Bigtable(options);

      assert.strictEqual(bigtable.customEndpoint, options.apiEndpoint);

      assert.deepStrictEqual(bigtable.options, {
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
      let bigtable = new Bigtable();
      assert.strictEqual(bigtable.projectId, PROJECT_ID_TOKEN);
    });

    it('should set the projectName', function() {
      assert.strictEqual(bigtable.projectName, 'projects/' + PROJECT_ID);
    });

    it('should set the appProfileId', function() {
      let options = {
        appProfileId: 'app-profile-id-12345',
      };

      let bigtable = new Bigtable(options);

      assert.strictEqual(bigtable.appProfileId, 'app-profile-id-12345');
    });
  });

  describe('createInstance', function() {
    let INSTANCE_ID = 'my-instance';

    it('should provide the proper request options', function(done) {
      bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'createInstance');

        assert.strictEqual(config.reqOpts.parent, bigtable.projectName);
        assert.strictEqual(config.reqOpts.instanceId, INSTANCE_ID);
        assert.strictEqual(config.reqOpts.instance.displayName, INSTANCE_ID);

        assert.strictEqual(config.gaxOpts, undefined);

        done();
      };

      bigtable.createInstance(INSTANCE_ID, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      let gaxOptions = {};

      bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      bigtable.createInstance(INSTANCE_ID, {gaxOptions}, assert.ifError);
    });

    it('should respect the displayName option', function(done) {
      let options = {
        displayName: 'robocop',
      };

      bigtable.request = function(config) {
        assert.strictEqual(
          config.reqOpts.instance.displayName,
          options.displayName
        );
        done();
      };

      bigtable.createInstance(INSTANCE_ID, options, assert.ifError);
    });

    it('should respect the type option', function(done) {
      let options = {type: 'development'};
      let fakeTypeType = 99;

      FakeInstance.getTypeType_ = function(type) {
        assert.strictEqual(type, options.type);
        return fakeTypeType;
      };

      bigtable.request = function(config) {
        assert.deepStrictEqual(config.reqOpts.instance.type, fakeTypeType);
        done();
      };

      bigtable.createInstance(INSTANCE_ID, options, assert.ifError);
    });

    it('should respect the labels option', function(done) {
      let options = {
        labels: {
          env: 'prod',
        },
      };

      bigtable.request = function(config) {
        assert.deepStrictEqual(config.reqOpts.instance.labels, options.labels);
        done();
      };

      bigtable.createInstance(INSTANCE_ID, options, assert.ifError);
    });

    it('should respect the clusters option', function(done) {
      let cluster = {
        id: 'my-cluster',
        location: 'us-central1-b',
        nodes: 3,
        storage: 'ssd',
      };

      let options = {
        clusters: [cluster],
      };

      let fakeLocation = 'a/b/c/d';
      FakeCluster.getLocation_ = function(project, location) {
        assert.strictEqual(project, PROJECT_ID);
        assert.strictEqual(location, cluster.location);
        return fakeLocation;
      };

      let fakeStorage = 20;
      FakeCluster.getStorageType_ = function(storage) {
        assert.strictEqual(storage, cluster.storage);
        return fakeStorage;
      };

      bigtable.request = function(config) {
        assert.deepStrictEqual(config.reqOpts.clusters, {
          'my-cluster': {
            location: fakeLocation,
            serveNodes: cluster.nodes,
            defaultStorageType: fakeStorage,
          },
        });

        done();
      };

      bigtable.createInstance(INSTANCE_ID, options, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      let error = new Error('err');

      bigtable.request = function(config, callback) {
        callback(error);
      };

      bigtable.createInstance(INSTANCE_ID, function(err, instance, operation) {
        assert.strictEqual(err, error);
        assert.strictEqual(instance, undefined);
        assert.strictEqual(operation, undefined);
        done();
      });
    });

    it('should return an instance to the callback', function(done) {
      let response = {
        name: 'my-operation',
      };

      let responseArg2 = {};
      let responseArg3 = {};

      let fakeInstance = {};
      bigtable.instance = function(id) {
        assert.strictEqual(id, INSTANCE_ID);
        return fakeInstance;
      };

      bigtable.request = function(config, callback) {
        callback(null, response, responseArg2, responseArg3);
      };

      bigtable.createInstance(INSTANCE_ID, function(err, instance) {
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
        assert.deepStrictEqual(config.gaxOpts, {});
        done();
      };

      bigtable.getInstances(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      let gaxOptions = {};

      bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      bigtable.getInstances(gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      let error = new Error('err');

      bigtable.request = function(config, callback) {
        callback(error);
      };

      bigtable.getInstances(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of instance objects', function(done) {
      let response = {
        instances: [
          {
            name: 'a',
          },
          {
            name: 'b',
          },
        ],
      };

      let fakeInstances = [{}, {}];

      bigtable.request = function(config, callback) {
        callback(null, response);
      };

      let instanceCount = 0;

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
    const INSTANCE_ID = 'my-instance';

    it('should return an Instance object', function() {
      let instance = bigtable.instance(INSTANCE_ID);
      let args = instance.calledWith_;

      assert(instance instanceof FakeInstance);
      assert.strictEqual(args[0], bigtable);
      assert.strictEqual(args[1], INSTANCE_ID);
    });
  });

  describe('request', function() {
    const CONFIG = {
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
        let error = new Error('Error.');

        bigtable.getProjectId_ = function(callback) {
          callback(error);
        };

        bigtable.request(CONFIG, function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should initiate and cache the client', function() {
        let fakeClient = {
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

      it('should not call replace project ID token', function(done) {
        replaceProjectIdTokenOverride = sinon.spy();

        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind: function() {
            assert(!replaceProjectIdTokenOverride.called);
            setImmediate(done);

            return common.util.noop;
          },
        };

        bigtable.request(CONFIG, assert.ifError);
      });
    });

    describe('replace projectID token', function() {
      beforeEach(function() {
        bigtable = new Bigtable();
        bigtable.getProjectId_ = function(callback) {
          callback(null, PROJECT_ID);
        };

        bigtable.api[CONFIG.client] = {
          [CONFIG.method]: common.util.noop,
        };
      });

      it('should replace the project ID token', function(done) {
        let replacedReqOpts = {};

        replaceProjectIdTokenOverride = function(reqOpts, projectId) {
          assert.notStrictEqual(reqOpts, CONFIG.reqOpts);
          assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);
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
            assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);
            assert.strictEqual(gaxOpts, CONFIG.gaxOpts);

            setImmediate(done);

            return common.util.noop;
          },
        };

        bigtable.request(CONFIG, assert.ifError);
      });

      it('should execute callback with error', function(done) {
        let error = new Error('Error.');

        bigtable.api[CONFIG.client][CONFIG.method] = function() {
          let callback = [].slice.call(arguments).pop();
          callback(error);
        };

        bigtable.request(CONFIG, function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should execute the request function', function() {
        bigtable.api[CONFIG.client][CONFIG.method] = function(done) {
          let callback = [].slice.call(arguments).pop();
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
            common.Service.shouldRetryRequest_
          );
          done();
        };

        let requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
      });

      it('should expose an abort function', function(done) {
        GAX_STREAM.cancel = done;

        let requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
        requestStream.abort();
      });

      it('should prepare the request once reading', function(done) {
        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind: function(gaxClient, reqOpts, gaxOpts) {
            assert.strictEqual(gaxClient, bigtable.api[CONFIG.client]);
            assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);
            assert.strictEqual(gaxOpts, CONFIG.gaxOpts);

            setImmediate(done);

            return function() {
              return GAX_STREAM;
            };
          },
        };

        let requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
      });

      it('should destroy the stream with prepare error', function(done) {
        let error = new Error('Error.');

        bigtable.getProjectId_ = function(callback) {
          callback(error);
        };

        let requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');

        requestStream.on('error', function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should destroy the stream with GAX error', function(done) {
        let error = new Error('Error.');

        let requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');

        GAX_STREAM.emit('error', error);

        requestStream.on('error', function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should re-emit request event from retry-request', function(done) {
        retryRequestOverride = function() {
          let fakeRetryRequestStream = through.obj();
          setImmediate(function() {
            fakeRetryRequestStream.emit('request');
          });
          return fakeRetryRequestStream;
        };

        let requestStream = bigtable.request(CONFIG);
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
      let providedProjectId = 'provided-project-id';

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
      let error = new Error('Error.');

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
      let detectedProjectId = 'detected-project-id';

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
