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

import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import {describe, it} from 'mocha';
import * as proxyquire from 'proxyquire';
import {CallOptions} from 'google-gax';

// tslint:disable no-any

let promisified = false;
const fakePromisify = Object.assign({}, promisify, {
  promisifyAll(klass: Function) {
    if (klass.name === 'Cluster') {
      promisified = true;
    }
  },
});

describe('Bigtable/Cluster', () => {
  const CLUSTER_ID = 'my-cluster';
  const PROJECT_ID = 'grape-spaceship-123';

  const INSTANCE = {
    name: `projects/${PROJECT_ID}/instances/i`,
    bigtable: {projectId: PROJECT_ID},
  };

  const CLUSTER_NAME = `${INSTANCE.name}/clusters/${CLUSTER_ID}`;
  // tslint:disable-next-line variable-name
  let Cluster: any;
  let cluster: any;

  before(() => {
    Cluster = proxyquire('../src/cluster.js', {
      '@google-cloud/promisify': fakePromisify,
    }).Cluster;
  });

  beforeEach(() => {
    cluster = new Cluster(INSTANCE, CLUSTER_ID);
  });

  describe('instantiation', () => {
    it('should promisify all the things', () => {
      assert(promisified);
    });

    it('should localize Bigtable instance', () => {
      assert.strictEqual(cluster.bigtable, INSTANCE.bigtable);
    });

    it('should localize Instance instance', () => {
      assert.strictEqual(cluster.instance, INSTANCE);
    });

    it('should expand id into full resource path', () => {
      assert.strictEqual(cluster.name, CLUSTER_NAME);
    });

    it('should leave full cluster names unaltered', () => {
      const cluster = new Cluster(INSTANCE, CLUSTER_ID);
      assert.strictEqual(cluster.name, CLUSTER_NAME);
    });

    it('should localize the id from the name', () => {
      assert.strictEqual(cluster.id, CLUSTER_ID);
    });

    it('should leave full cluster names unaltered and localize the id from the name', () => {
      const cluster = new Cluster(INSTANCE, CLUSTER_NAME);
      assert.strictEqual(cluster.name, CLUSTER_NAME);
      assert.strictEqual(cluster.id, CLUSTER_ID);
    });

    it('should throw if cluster id in wrong format', () => {
      const id = `clusters/${CLUSTER_ID}`;
      assert.throws(() => {
        const c = new Cluster(INSTANCE, id);
      }, Error);
    });
  });

  describe('getLocation_', () => {
    const LOCATION = 'us-central1-b';

    it('should format the location name', () => {
      const expected = `projects/${PROJECT_ID}/locations/${LOCATION}`;
      const formatted = Cluster.getLocation_(PROJECT_ID, LOCATION);
      assert.strictEqual(formatted, expected);
    });

    it('should format the location name for project name with /', () => {
      const PROJECT_NAME = 'projects/grape-spaceship-123';
      const expected = `projects/${PROJECT_NAME.split(
        '/'
      ).pop()}/locations/${LOCATION}`;
      const formatted = Cluster.getLocation_(PROJECT_NAME, LOCATION);
      assert.strictEqual(formatted, expected);
    });

    it('should not re-format a complete location', () => {
      const complete = `projects/p/locations/${LOCATION}`;
      const formatted = Cluster.getLocation_(PROJECT_ID, complete);
      assert.strictEqual(formatted, complete);
    });
  });

  describe('getStorageType_', () => {
    const types: any = {
      unspecified: 0,
      ssd: 1,
      hdd: 2,
    };

    it('should default to unspecified', () => {
      assert.strictEqual(Cluster.getStorageType_(), types.unspecified);
    });

    it('should lowercase a type', () => {
      assert.strictEqual(Cluster.getStorageType_('SSD'), types.ssd);
    });

    Object.keys(types).forEach(type => {
      it('should get the storage type for "' + type + '"', () => {
        assert.strictEqual(Cluster.getStorageType_(type), types[type]);
      });
    });
  });

  describe('create', () => {
    it('should call createCluster from instance', done => {
      const options = {};

      cluster.instance.createCluster = (
        id: string,
        options_: {},
        callback: Function
      ) => {
        assert.strictEqual(id, cluster.id);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      cluster.create(options, done);
    });

    it('should not require options', done => {
      cluster.instance.createCluster = (
        id: string,
        options: {},
        callback: Function
      ) => {
        assert.deepStrictEqual(options, {});
        callback(); // done()
      };

      cluster.create(done);
    });
  });

  describe('delete', () => {
    it('should make the correct request', done => {
      cluster.bigtable.request = (config: any, callback: Function) => {
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

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      cluster.delete(gaxOptions, assert.ifError);
    });
  });

  describe('exists', () => {
    it('should not require gaxOptions', done => {
      cluster.getMetadata = (gaxOptions: CallOptions) => {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      cluster.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', done => {
      const gaxOptions = {};

      cluster.getMetadata = (gaxOptions_: CallOptions) => {
        assert.strictEqual(gaxOptions, gaxOptions);
        done();
      };

      cluster.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error: any = new Error('Error.');
      error.code = 5;

      cluster.getMetadata = (gaxOptions: CallOptions, callback: Function) => {
        callback(error);
      };

      cluster.exists((err: Error, exists: boolean) => {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if code is not 5', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error: any = new Error('Error.');
      error.code = 'NOT-5';
      cluster.getMetadata = (_: CallOptions, callback: Function) => {
        callback(error);
      };
      cluster.exists((err: Error) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', done => {
      cluster.getMetadata = (gaxOptions: CallOptions, callback: Function) => {
        callback(null, {});
      };
      cluster.exists((err: Error, exists: boolean) => {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('get', () => {
    it('should call getMetadata', done => {
      const gaxOptions = {};
      cluster.getMetadata = (gaxOptions_: {}) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };
      cluster.get(gaxOptions, assert.ifError);
    });

    it('should not require gaxOptions', done => {
      cluster.getMetadata = (gaxOptions: CallOptions) => {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      cluster.get(assert.ifError);
    });

    it('should return an error from getMetadata', done => {
      const error = new Error('Error.');

      cluster.getMetadata = (gaxOptions: CallOptions, callback: Function) => {
        callback(error);
      };

      cluster.get((err: Error) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', done => {
      const metadata = {};

      cluster.getMetadata = (gaxOptions: CallOptions, callback: Function) => {
        callback(null, metadata);
      };

      cluster.get((err: Error, cluster_: {}, metadata_: {}) => {
        assert.ifError(err);
        assert.strictEqual(cluster_, cluster);
        assert.strictEqual(metadata_, metadata);
        done();
      });
    });
  });

  describe('getMetadata', () => {
    it('should make correct request', done => {
      cluster.bigtable.request = (config: any) => {
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

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      cluster.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update metadata', done => {
      const metadata = {};
      cluster.bigtable.request = (config: {}, callback: Function) => {
        callback(null, metadata);
      };
      cluster.getMetadata(() => {
        assert.strictEqual(cluster.metadata, metadata);
        done();
      });
    });

    it('should execute callback with original arguments', done => {
      const args = [{}, {}];
      cluster.bigtable.request = (config: {}, callback: Function) => {
        callback.apply(null, args);
      };
      cluster.getMetadata((...argsies: Array<{}>) => {
        assert.deepStrictEqual([].slice.call(argsies), args);
        done();
      });
    });
  });

  describe('setMetadata', () => {
    it('should provide the proper request options', done => {
      cluster.bigtable.request = (config: any, callback: Function) => {
        assert.strictEqual(config.client, 'BigtableInstanceAdminClient');
        assert.strictEqual(config.method, 'updateCluster');
        assert.strictEqual(config.reqOpts.name, CLUSTER_NAME);
        callback(); // done()
      };

      cluster.setMetadata({}, done);
    });

    it('should respect the location option', done => {
      const options = {
        location: 'us-centralb-1',
      };

      const getLocation = Cluster.getLocation_;
      const fakeLocation = 'a/b/c/d';

      Cluster.getLocation_ = (project: string, location: string) => {
        assert.strictEqual(project, PROJECT_ID);
        assert.strictEqual(location, options.location);
        return fakeLocation;
      };

      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.reqOpts.location, fakeLocation);
        Cluster.getLocation_ = getLocation;
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should respect the nodes option', done => {
      const options = {
        nodes: 3,
      };

      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.reqOpts.serveNodes, options.nodes);
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should respect the storage option', done => {
      const options = {
        storage: 'ssd',
      };

      const getStorageType = Cluster.getStorageType_;
      const fakeStorageType = 'a';

      Cluster.getStorageType_ = (storage: {}) => {
        assert.strictEqual(storage, options.storage);
        return fakeStorageType;
      };

      cluster.bigtable.request = (config: any) => {
        assert.strictEqual(config.reqOpts.defaultStorageType, fakeStorageType);
        Cluster.getStorageType_ = getStorageType;
        done();
      };

      cluster.setMetadata(options, assert.ifError);
    });

    it('should execute callback with all arguments', done => {
      const args = [{}, {}];

      cluster.bigtable.request = (config: {}, callback: Function) => {
        callback.apply(null, args);
      };

      cluster.setMetadata({}, (...argsies: Array<{}>) => {
        assert.deepStrictEqual([].slice.call(argsies), args);
        done();
      });
    });
  });
});
