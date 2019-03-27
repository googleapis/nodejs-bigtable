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

import * as common from '@google-cloud/common-grpc';
import * as projectify from '@google-cloud/projectify';
import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import * as gax from 'google-gax';
import * as proxyquire from 'proxyquire';
import * as sn from 'sinon';
import * as through from 'through2';

import {Cluster} from '../src/cluster.js';
import {Instance} from '../src/instance.js';

const v2 = require('../src/v2');
const PKG = require('../../package.json');

const sinon = sn.createSandbox();
const {grpc} = new gax.GrpcClient();

function fakeV2() {}

let promisified = false;
let replaceProjectIdTokenOverride;
const fakePromisify = Object.assign({}, promisify, {
  promisifyAll(Class, options) {
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
const fakeReplaceProjectIdToken = Object.assign({}, projectify, {
  replaceProjectIdToken(reqOpts) {
    if (replaceProjectIdTokenOverride) {
      return replaceProjectIdTokenOverride.apply(null, arguments);
    }
    return reqOpts;
  },
});

let googleAuthOverride;
function fakeGoogleAuth() {
  return (googleAuthOverride || common.util.noop).apply(null, arguments);
}

let retryRequestOverride;
function fakeRetryRequest() {
  return (retryRequestOverride || require('retry-request'))
      .apply(null, arguments);
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

  let Bigtable;
  let bigtable;

  before(function() {
    Bigtable = proxyquire('../src', {
      '@google-cloud/promisify': fakePromisify,
      '@google-cloud/projectify': fakeReplaceProjectIdToken,
      'google-auth-library': {
        GoogleAuth: fakeGoogleAuth,
      },
      'retry-request': fakeRetryRequest,
      './cluster.js': {Cluster: FakeCluster},
      './instance.js': {Instance: FakeInstance},
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
    const EXPECTED_SCOPES: any[] = [];
    const clientClasses = [
      v2.BigtableClient,
      v2.BigtableInstanceAdminClient,
      v2.BigtableTableAdminClient,
    ];

    for (const clientClass of clientClasses) {
      for (const scope of clientClass.scopes) {
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
      const fakeGoogleAuthInstance = {};
      const options = {
        a: 'b',
        c: 'd',
      };

      googleAuthOverride = function(options_) {
        assert.deepStrictEqual(
            options_,
            Object.assign(
                {
                  libName: 'gccl',
                  libVersion: PKG.version,
                  scopes: EXPECTED_SCOPES,
                  'grpc.max_send_message_length': -1,
                  'grpc.max_receive_message_length': -1,
                },
                options));
        return fakeGoogleAuthInstance;
      };

      const bigtable = new Bigtable(options);
      assert.strictEqual(bigtable.auth, fakeGoogleAuthInstance);
    });

    it('should localize the projectId', function() {
      assert.strictEqual(bigtable.projectId, PROJECT_ID);
    });

    it('should localize options', function() {
      const options = {
        a: 'b',
        c: 'd',
      };

      const bigtable = new Bigtable(options);
      const defaultOptions = {
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      };

      assert.deepStrictEqual(bigtable.options, {
        BigtableClient: Object.assign(
            {
              servicePath: 'bigtable.googleapis.com',
              port: 443,
              sslCreds: undefined,
            },
            defaultOptions),
        BigtableInstanceAdminClient: Object.assign(
            {
              servicePath: 'bigtableadmin.googleapis.com',
              port: 443,
              sslCreds: undefined,
            },
            defaultOptions),
        BigtableTableAdminClient: Object.assign(
            {
              servicePath: 'bigtableadmin.googleapis.com',
              port: 443,
              sslCreds: undefined,
            },
            defaultOptions),
      });
    });

    it('should work with the emulator', function() {
      process.env.BIGTABLE_EMULATOR_HOST = 'override:8080';

      const options = {
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      };

      const bigtable = new Bigtable(options);

      assert.strictEqual(
          bigtable.customEndpoint, process.env.BIGTABLE_EMULATOR_HOST);

      assert.deepStrictEqual(bigtable.options, {
        BigtableClient: Object.assign(
            {
              servicePath: 'override',
              port: 8080,
              sslCreds: grpc.credentials.createInsecure(),
            },
            options),
        BigtableInstanceAdminClient: Object.assign(
            {
              servicePath: 'override',
              port: 8080,
              sslCreds: grpc.credentials.createInsecure(),
            },
            options),
        BigtableTableAdminClient: Object.assign(
            {
              servicePath: 'override',
              port: 8080,
              sslCreds: grpc.credentials.createInsecure(),
            },
            options),
      });
    });

    it('should work with a customEndpoint', function() {
      const options = {
        apiEndpoint: 'customEndpoint:9090',
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      };

      const bigtable = new Bigtable(options);

      assert.strictEqual(bigtable.customEndpoint, options.apiEndpoint);

      assert.deepStrictEqual(bigtable.options, {
        BigtableClient: Object.assign(
            {
              servicePath: 'customEndpoint',
              port: 9090,
              sslCreds: grpc.credentials.createInsecure(),
            },
            options),
        BigtableInstanceAdminClient: Object.assign(
            {
              servicePath: 'customEndpoint',
              port: 9090,
              sslCreds: grpc.credentials.createInsecure(),
            },
            options),
        BigtableTableAdminClient: Object.assign(
            {
              servicePath: 'customEndpoint',
              port: 9090,
              sslCreds: grpc.credentials.createInsecure(),
            },
            options),
      });
    });

    it('should default projectId to token', function() {
      const bigtable = new Bigtable();
      assert.strictEqual(bigtable.projectId, PROJECT_ID_TOKEN);
    });

    it('should set the projectName', function() {
      assert.strictEqual(bigtable.projectName, 'projects/' + PROJECT_ID);
    });

    it('should set the appProfileId', function() {
      const options = {
        appProfileId: 'app-profile-id-12345',
      };

      const bigtable = new Bigtable(options);

      assert.strictEqual(bigtable.appProfileId, 'app-profile-id-12345');
    });
  });

  describe('createInstance', function() {
    const INSTANCE_ID = 'my-instance';

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
      const gaxOptions = {};

      bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      bigtable.createInstance(INSTANCE_ID, {gaxOptions}, assert.ifError);
    });

    it('should respect the displayName option', function(done) {
      const options = {
        displayName: 'robocop',
      };

      bigtable.request = function(config) {
        assert.strictEqual(
            config.reqOpts.instance.displayName, options.displayName);
        done();
      };

      bigtable.createInstance(INSTANCE_ID, options, assert.ifError);
    });

    it('should respect the type option', function(done) {
      const options = {type: 'development'};
      const fakeTypeType = 99;

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
      const options = {
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
      const cluster = {
        id: 'my-cluster',
        location: 'us-central1-b',
        nodes: 3,
        storage: 'ssd',
      };

      const options = {
        clusters: [cluster],
      };

      const fakeLocation = 'a/b/c/d';
      FakeCluster.getLocation_ = function(project, location) {
        assert.strictEqual(project, PROJECT_ID);
        assert.strictEqual(location, cluster.location);
        return fakeLocation;
      };

      const fakeStorage = 20;
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
      const error = new Error('err');

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
      const response = {
        name: 'my-operation',
      };

      const responseArg2 = {};
      const responseArg3 = {};

      const fakeInstance = {};
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
      const gaxOptions = {};

      bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      bigtable.getInstances(gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      const error = new Error('err');

      bigtable.request = function(config, callback) {
        callback(error);
      };

      bigtable.getInstances(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of instance objects', function(done) {
      const response = {
        instances: [
          {
            name: 'a',
          },
          {
            name: 'b',
          },
        ],
      };

      const fakeInstances = [{}, {}];

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
      const instance = bigtable.instance(INSTANCE_ID);
      const args = instance.calledWith_;

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
        const error = new Error('Error.');

        bigtable.getProjectId_ = function(callback) {
          callback(error);
        };

        bigtable.request(CONFIG, function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should initiate and cache the client', function() {
        const fakeClient = {
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
          bind() {
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
        const replacedReqOpts = {};

        replaceProjectIdTokenOverride = function(reqOpts, projectId) {
          assert.notStrictEqual(reqOpts, CONFIG.reqOpts);
          assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);
          assert.strictEqual(projectId, PROJECT_ID);

          return replacedReqOpts;
        };

        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind(gaxClient, reqOpts) {
            assert.strictEqual(reqOpts, replacedReqOpts);

            setImmediate(done);

            return common.util.noop;
          },
        };

        bigtable.request(CONFIG, assert.ifError);
      });

      it('should not replace token when project ID not detected',
         function(done) {
           replaceProjectIdTokenOverride = function() {
             throw new Error('Should not have tried to replace token.');
           };

           bigtable.getProjectId_ = function(callback) {
             callback(null, PROJECT_ID_TOKEN);
           };

           bigtable.api[CONFIG.client][CONFIG.method] = {
             bind(gaxClient, reqOpts) {
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
          bind(gaxClient, reqOpts, gaxOpts) {
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
        const error = new Error('Error.');

        bigtable.api[CONFIG.client][CONFIG.method] = function() {
          const callback: Function = [].slice.call(arguments).pop()!;
          callback(error);
        };

        bigtable.request(CONFIG, function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should execute the request function', function() {
        bigtable.api[CONFIG.client][CONFIG.method] = function(done) {
          const callback: Function = [].slice.call(arguments).pop()!;
          callback(null, done);  // so it ends the test
        };

        bigtable.request(CONFIG, assert.ifError);
      });
    });

    describe('makeRequestStream', function() {
      let GAX_STREAM;

      beforeEach(function() {
        GAX_STREAM = through();

        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind() {
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
              (common.Service as any).shouldRetryRequest_);
          done();
        };

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
      });

      it('should expose an abort function', function(done) {
        GAX_STREAM.cancel = done;

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
        requestStream.abort();
      });

      it('should prepare the request once reading', function(done) {
        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind(gaxClient, reqOpts, gaxOpts) {
            assert.strictEqual(gaxClient, bigtable.api[CONFIG.client]);
            assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);
            assert.strictEqual(gaxOpts, CONFIG.gaxOpts);

            setImmediate(done);

            return function() {
              return GAX_STREAM;
            };
          },
        };

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
      });

      it('should destroy the stream with prepare error', function(done) {
        const error = new Error('Error.');

        bigtable.getProjectId_ = function(callback) {
          callback(error);
        };

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');

        requestStream.on('error', function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should destroy the stream with GAX error', function(done) {
        const error = new Error('Error.');

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');

        GAX_STREAM.emit('error', error);

        requestStream.on('error', function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should re-emit request event from retry-request', function(done) {
        retryRequestOverride = function() {
          const fakeRetryRequestStream = through.obj();
          setImmediate(function() {
            fakeRetryRequestStream.emit('request');
          });
          return fakeRetryRequestStream;
        };

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
        requestStream.on('request', done);
      });
    });
  });

  describe('getProjectId_', function() {
    beforeEach(function() {
      bigtable.auth = {
        getProjectId(callback) {
          callback(null, PROJECT_ID);
        },
      };
    });

    it('should return the provided project ID', function(done) {
      const providedProjectId = 'provided-project-id';

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
      const error = new Error('Error.');

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
      const detectedProjectId = 'detected-project-id';

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
