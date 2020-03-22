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

import * as projectify from '@google-cloud/projectify';
import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import {describe, it} from 'mocha';
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
const noop = () => {};

function fakeV2() {}

let promisified = false;
let replaceProjectIdTokenOverride;
const fakePromisify = Object.assign({}, promisify, {
  promisifyAll(klass, options) {
    if (klass.name !== 'Bigtable') {
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
  return (googleAuthOverride || noop).apply(null, arguments);
}

let retryRequestOverride;
function fakeRetryRequest() {
  return (retryRequestOverride || require('retry-request')).apply(
    null,
    arguments
  );
}

function createFake(klass) {
  return class Fake extends klass {
    calledWith_: IArguments;
    constructor() {
      super(...arguments);
      this.calledWith_ = arguments;
    }
  };
}

// tslint:disable-next-line variable-name
const FakeCluster = createFake(Cluster);
// tslint:disable-next-line variable-name
const FakeInstance = createFake(Instance);

describe('Bigtable', () => {
  const PROJECT_ID = 'test-project';
  const PROJECT_ID_TOKEN = '{{projectId}}';
  // tslint:disable-next-line variable-name
  let Bigtable;
  let bigtable;

  before(() => {
    Bigtable = proxyquire('../src', {
      '@google-cloud/promisify': fakePromisify,
      '@google-cloud/projectify': fakeReplaceProjectIdToken,
      'google-gax': {
        GoogleAuth: fakeGoogleAuth,
      },
      'retry-request': fakeRetryRequest,
      './cluster.js': {Cluster: FakeCluster},
      './instance.js': {Instance: FakeInstance},
      './v2': fakeV2,
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    googleAuthOverride = null;
    retryRequestOverride = null;
    replaceProjectIdTokenOverride = null;
    delete process.env.BIGTABLE_EMULATOR_HOST;
    bigtable = new Bigtable({projectId: PROJECT_ID});
  });

  describe('instantiation', () => {
    const EXPECTED_SCOPES: string[] = [];
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

    it('should promisify all the things', () => {
      assert(promisified);
    });

    it('should work without new', () => {
      const bigtable = Bigtable();
      assert(bigtable instanceof Bigtable);
    });

    it('should initialize the API object', () => {
      assert.deepStrictEqual(bigtable.api, {});
    });

    it('should cache a local google-auth-library instance', () => {
      const fakeGoogleAuthInstance = {};
      const options = {
        a: 'b',
        c: 'd',
      };

      googleAuthOverride = options_ => {
        assert.deepStrictEqual(
          options_,
          Object.assign(
            {
              libName: 'gccl',
              libVersion: PKG.version,
              scopes: EXPECTED_SCOPES,
            },
            options
          )
        );
        return fakeGoogleAuthInstance;
      };

      const bigtable = new Bigtable(options);
      assert.strictEqual(bigtable.auth, fakeGoogleAuthInstance);
    });

    it('should localize the projectId', () => {
      assert.strictEqual(bigtable.projectId, PROJECT_ID);
    });

    it('should localize options', () => {
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
      };

      assert.deepStrictEqual(bigtable.options, {
        BigtableClient: Object.assign(
          {
            servicePath: 'bigtable.googleapis.com',
            port: 443,
            sslCreds: undefined,
          },
          defaultOptions
        ),
        BigtableInstanceAdminClient: Object.assign(
          {
            servicePath: 'bigtableadmin.googleapis.com',
            port: 443,
            sslCreds: undefined,
          },
          defaultOptions
        ),
        BigtableTableAdminClient: Object.assign(
          {
            servicePath: 'bigtableadmin.googleapis.com',
            port: 443,
            sslCreds: undefined,
          },
          defaultOptions
        ),
      });
    });

    it('should work with the emulator', () => {
      process.env.BIGTABLE_EMULATOR_HOST = 'override:8080';

      const options = {
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
      };

      const bigtable = new Bigtable(options);

      assert.strictEqual(
        bigtable.customEndpoint,
        process.env.BIGTABLE_EMULATOR_HOST
      );

      assert.deepStrictEqual(bigtable.options, {
        BigtableClient: Object.assign(
          {
            servicePath: 'override',
            port: 8080,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
        BigtableInstanceAdminClient: Object.assign(
          {
            servicePath: 'override',
            port: 8080,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
        BigtableTableAdminClient: Object.assign(
          {
            servicePath: 'override',
            port: 8080,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
      });
    });

    it('should work with a customEndpoint', () => {
      const options = {
        apiEndpoint: 'customEndpoint:9090',
        a: 'b',
        c: 'd',
        libName: 'gccl',
        libVersion: PKG.version,
        scopes: EXPECTED_SCOPES,
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
          options
        ),
        BigtableInstanceAdminClient: Object.assign(
          {
            servicePath: 'customEndpoint',
            port: 9090,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
        BigtableTableAdminClient: Object.assign(
          {
            servicePath: 'customEndpoint',
            port: 9090,
            sslCreds: grpc.credentials.createInsecure(),
          },
          options
        ),
      });
    });

    it('should default projectId to token', () => {
      const bigtable = new Bigtable();
      assert.strictEqual(bigtable.projectId, PROJECT_ID_TOKEN);
    });

    it('should set the projectName', () => {
      assert.strictEqual(bigtable.projectName, 'projects/' + PROJECT_ID);
    });

    it('should set the appProfileId', () => {
      const options = {
        appProfileId: 'app-profile-id-12345',
      };

      const bigtable = new Bigtable(options);

      assert.strictEqual(bigtable.appProfileId, 'app-profile-id-12345');
    });
  });

  describe('createInstance', () => {
    const INSTANCE_ID = 'my-instance';

    it('should provide the proper request options', done => {
      bigtable.request = config => {
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

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      bigtable.request = config => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      bigtable.createInstance(INSTANCE_ID, {gaxOptions}, assert.ifError);
    });

    it('should respect the displayName option', done => {
      const options = {
        displayName: 'robocop',
      };

      bigtable.request = config => {
        assert.strictEqual(
          config.reqOpts.instance.displayName,
          options.displayName
        );
        done();
      };

      bigtable.createInstance(INSTANCE_ID, options, assert.ifError);
    });

    it('should respect the type option', done => {
      const options = {type: 'development'};
      const fakeTypeType = 99;

      FakeInstance.getTypeType_ = type => {
        assert.strictEqual(type, options.type);
        return fakeTypeType;
      };

      bigtable.request = config => {
        assert.deepStrictEqual(config.reqOpts.instance.type, fakeTypeType);
        done();
      };

      bigtable.createInstance(INSTANCE_ID, options, assert.ifError);
    });

    it('should respect the labels option', done => {
      const options = {
        labels: {
          env: 'prod',
        },
      };

      bigtable.request = config => {
        assert.deepStrictEqual(config.reqOpts.instance.labels, options.labels);
        done();
      };

      bigtable.createInstance(INSTANCE_ID, options, assert.ifError);
    });

    it('should respect the clusters option', done => {
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
      FakeCluster.getLocation_ = (project, location) => {
        assert.strictEqual(project, PROJECT_ID);
        assert.strictEqual(location, cluster.location);
        return fakeLocation;
      };

      const fakeStorage = 20;
      FakeCluster.getStorageType_ = storage => {
        assert.strictEqual(storage, cluster.storage);
        return fakeStorage;
      };

      bigtable.request = config => {
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

    it('should return an error to the callback', done => {
      const error = new Error('err');

      bigtable.request = (config, callback) => {
        callback(error);
      };

      bigtable.createInstance(INSTANCE_ID, (err, instance, operation) => {
        assert.strictEqual(err, error);
        assert.strictEqual(instance, undefined);
        assert.strictEqual(operation, undefined);
        done();
      });
    });

    it('should return an instance to the callback', done => {
      const response = {
        name: 'my-operation',
      };

      const responseArg2 = {};
      const responseArg3 = {};

      const fakeInstance = {};
      bigtable.instance = id => {
        assert.strictEqual(id, INSTANCE_ID);
        return fakeInstance;
      };

      bigtable.request = (config, callback) => {
        callback(null, response, responseArg2, responseArg3);
      };

      bigtable.createInstance(INSTANCE_ID, (err, instance, ...args) => {
        assert.ifError(err);
        assert.strictEqual(instance, fakeInstance);
        assert.strictEqual(args[0], response);
        assert.strictEqual(args[1], responseArg2);
        assert.strictEqual(args[2], responseArg3);
        done();
      });
    });
  });

  describe('getInstances', () => {
    it('should provide the proper request options', done => {
      bigtable.request = config => {
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

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      bigtable.request = config => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      bigtable.getInstances(gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', done => {
      const error = new Error('err');

      bigtable.request = (config, callback) => {
        callback(error);
      };

      bigtable.getInstances(err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of instance objects', done => {
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

      bigtable.request = (config, callback) => {
        callback(null, response);
      };

      let instanceCount = 0;

      bigtable.instance = name => {
        assert.strictEqual(name, response.instances[instanceCount].name);
        return fakeInstances[instanceCount++];
      };

      bigtable.getInstances((err, instances, apiResponse) => {
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

  describe('instance', () => {
    const INSTANCE_ID = 'my-instance';

    it('should return an Instance object', () => {
      const instance = bigtable.instance(INSTANCE_ID);
      const args = instance.calledWith_;

      assert(instance instanceof FakeInstance);
      assert.strictEqual(args[0], bigtable);
      assert.strictEqual(args[1], INSTANCE_ID);
    });
  });

  describe('request', () => {
    const CONFIG = {
      client: 'client',
      method: 'method',
      reqOpts: {
        a: 'b',
        c: 'd',
      },
      gaxOpts: {},
    };

    beforeEach(() => {
      bigtable.getProjectId_ = callback => {
        callback(null, PROJECT_ID);
      };

      bigtable.api[CONFIG.client] = {
        [CONFIG.method]: noop,
      };
    });

    describe('prepareGaxRequest', () => {
      it('should get the project ID', done => {
        bigtable.getProjectId_ = () => {
          done();
        };
        bigtable.request(CONFIG, assert.ifError);
      });

      it('should return error if getting project ID failed', done => {
        const error = new Error('Error.');

        bigtable.getProjectId_ = callback => {
          callback(error);
        };

        bigtable.request(CONFIG, err => {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should initiate and cache the client', () => {
        const fakeClient = {
          [CONFIG.method]: noop,
        };
        // tslint:disable-next-line only-arrow-functions
        fakeV2[CONFIG.client] = function(options) {
          assert.strictEqual(options, bigtable.options[CONFIG.client]);
          return fakeClient;
        };
        bigtable.api = {};
        bigtable.request(CONFIG, assert.ifError);
        assert.strictEqual(bigtable.api[CONFIG.client], fakeClient);
      });

      it('should use the cached client', done => {
        // tslint:disable-next-line only-arrow-functions
        fakeV2[CONFIG.client] = function() {
          done(new Error('Should not re-instantiate a GAX client.'));
        };
        bigtable.request(CONFIG);
        done();
      });

      it('should not call replace project ID token', done => {
        replaceProjectIdTokenOverride = sinon.spy();
        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind() {
            assert(!replaceProjectIdTokenOverride.called);
            setImmediate(done);
            return noop;
          },
        };
        bigtable.request(CONFIG, assert.ifError);
      });
    });

    describe('replace projectID token', () => {
      beforeEach(() => {
        bigtable = new Bigtable();
        bigtable.getProjectId_ = callback => {
          callback(null, PROJECT_ID);
        };

        bigtable.api[CONFIG.client] = {
          [CONFIG.method]: noop,
        };
      });

      it('should replace the project ID token', done => {
        const replacedReqOpts = {};

        replaceProjectIdTokenOverride = (reqOpts, projectId) => {
          assert.notStrictEqual(reqOpts, CONFIG.reqOpts);
          assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);
          assert.strictEqual(projectId, PROJECT_ID);

          return replacedReqOpts;
        };

        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind(gaxClient, reqOpts) {
            assert.strictEqual(reqOpts, replacedReqOpts);
            setImmediate(done);
            return noop;
          },
        };

        bigtable.request(CONFIG, assert.ifError);
      });

      it('should not replace token when project ID not detected', done => {
        replaceProjectIdTokenOverride = () => {
          throw new Error('Should not have tried to replace token.');
        };

        bigtable.getProjectId_ = callback => {
          callback(null, PROJECT_ID_TOKEN);
        };

        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind(gaxClient, reqOpts) {
            assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);
            setImmediate(done);
            return noop;
          },
        };

        bigtable.request(CONFIG, assert.ifError);
      });
    });

    describe('makeRequestCallback', () => {
      it('should prepare the request', done => {
        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind(gaxClient, reqOpts, gaxOpts) {
            assert.strictEqual(gaxClient, bigtable.api[CONFIG.client]);
            assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);
            assert.strictEqual(gaxOpts, CONFIG.gaxOpts);
            setImmediate(done);
            return noop;
          },
        };

        bigtable.request(CONFIG, assert.ifError);
      });

      it('should execute callback with error', done => {
        const error = new Error('Error.');

        bigtable.api[CONFIG.client][CONFIG.method] = (...args) => {
          const callback: Function = [].slice.call(args).pop()!;
          callback(error);
        };

        bigtable.request(CONFIG, err => {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should execute the request function', () => {
        bigtable.api[CONFIG.client][CONFIG.method] = (...args) => {
          const callback: Function = [].slice.call(args).pop()!;
          callback(null, args[0]); // so it ends the test
        };

        bigtable.request(CONFIG, assert.ifError);
      });
    });

    describe('makeRequestStream', () => {
      let GAX_STREAM;

      beforeEach(() => {
        GAX_STREAM = through();
        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind() {
            return () => {
              return GAX_STREAM;
            };
          },
        };
      });

      it('should use retry-request', done => {
        retryRequestOverride = (_, config) => {
          assert.strictEqual(config.currentRetryAttempt, 0);
          assert.strictEqual(config.objectMode, true);
          done();
        };

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
      });

      it('should expose an abort function', done => {
        GAX_STREAM.cancel = done;

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
        requestStream.abort();
      });

      it('should prepare the request once reading', done => {
        bigtable.api[CONFIG.client][CONFIG.method] = {
          bind(gaxClient, reqOpts, gaxOpts) {
            assert.strictEqual(gaxClient, bigtable.api[CONFIG.client]);
            assert.deepStrictEqual(reqOpts, CONFIG.reqOpts);
            assert.strictEqual(gaxOpts, CONFIG.gaxOpts);

            setImmediate(done);

            return () => {
              return GAX_STREAM;
            };
          },
        };

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');
      });

      it('should destroy the stream with prepare error', done => {
        const error = new Error('Error.');

        bigtable.getProjectId_ = callback => {
          callback(error);
        };

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');

        requestStream.on('error', err => {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should destroy the stream with GAX error', done => {
        const error = new Error('Error.');

        const requestStream = bigtable.request(CONFIG);
        requestStream.emit('reading');

        GAX_STREAM.emit('error', error);

        requestStream.on('error', err => {
          assert.strictEqual(err, error);
          done();
        });
      });

      it('should re-emit request event from retry-request', done => {
        retryRequestOverride = () => {
          const fakeRetryRequestStream = through.obj();
          setImmediate(() => {
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

  describe('getProjectId_', () => {
    beforeEach(() => {
      bigtable.auth = {
        getProjectId(callback) {
          callback(null, PROJECT_ID);
        },
      };
    });

    it('should return the provided project ID', done => {
      const providedProjectId = 'provided-project-id';

      bigtable.auth.getProjectId = () => {
        throw new Error('Auth client should not be called.');
      };

      bigtable.projectId = providedProjectId;

      bigtable.getProjectId_((err, projectId) => {
        assert.ifError(err);
        assert.strictEqual(projectId, providedProjectId);
        done();
      });
    });

    it('should return any project ID if in custom endpoint', done => {
      bigtable.auth.getProjectId = () => {
        throw new Error('Auth client should not be called.');
      };

      bigtable.projectId = PROJECT_ID_TOKEN;
      bigtable.customEndpoint = 'custom-endpoint';

      bigtable.getProjectId_((err, projectId) => {
        assert.ifError(err);
        assert.strictEqual(projectId, PROJECT_ID_TOKEN);
        done();
      });
    });

    it('should return error if project ID detection failed', done => {
      const error = new Error('Error.');

      bigtable.auth.getProjectId = callback => {
        callback(error);
      };

      bigtable.projectId = PROJECT_ID_TOKEN;

      bigtable.getProjectId_(err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should get and cache the project ID if not provided', done => {
      const detectedProjectId = 'detected-project-id';

      bigtable.auth.getProjectId = callback => {
        callback(null, detectedProjectId);
      };

      bigtable.projectId = PROJECT_ID_TOKEN;

      bigtable.getProjectId_((err, projectId) => {
        assert.ifError(err);
        assert.strictEqual(projectId, detectedProjectId);
        assert.strictEqual(bigtable.projectId, detectedProjectId);
        done();
      });
    });
  });
});
