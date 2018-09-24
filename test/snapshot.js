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

let promisified = false;
const fakePromisify = extend({}, promisify, {
  promisifyAll: function(Class) {
    if (Class.name === 'Snapshot') {
      promisified = true;
    }
  },
});

describe('Bigtable/Snapshot', function() {
  const INSTANCE = {
    bigtable: {},
    id: 'my-instance',
    name: 'projects/my-project/instances/my-instance',
  };

  const CLUSTER = {
    bigtable: {},
    id: 'my-cluster',
    name: 'projects/my-project/instances/my-instance/clusters/my-cluster',
    instance: INSTANCE,
  };

  const TABLE = {
    bigtable: {},
    id: 'my-table',
    name: 'projects/my-project/instances/my-instance/tables/my-table',
  };

  const SNAPSHOT_ID = 'my-snapshot';
  const SNAPSHOT_NAME = `${CLUSTER.name}/snapshots/${SNAPSHOT_ID}`;
  let Snapshot;
  let snapshot;
  let SnapshotError;

  before(function() {
    Snapshot = proxyquire('../src/snapshot.js', {
      '@google-cloud/promisify': fakePromisify,
    });

    SnapshotError = Snapshot.SnapshotError;
  });

  beforeEach(function() {
    snapshot = new Snapshot(CLUSTER, SNAPSHOT_NAME);
  });

  describe('instantiation', function() {
    it('should promisify all the things', function() {
      assert(promisified);
    });

    it('should localize the Bigtable instance', function() {
      assert.strictEqual(snapshot.bigtable, CLUSTER.bigtable);
    });

    it('should localize the Cluster instance', function() {
      assert.strictEqual(snapshot.cluster, CLUSTER);
    });

    it('should localize the full resource path', function() {
      assert.strictEqual(snapshot.id, SNAPSHOT_ID);
    });

    it('should extract the snapshot name', function() {
      const snapshot = new Snapshot(CLUSTER, SNAPSHOT_ID);
      assert.strictEqual(snapshot.name, SNAPSHOT_NAME);
    });

    it('should leave full snapshot name unaltered and localize the id from the name', function() {
      const snapshot = new Snapshot(CLUSTER, SNAPSHOT_NAME);
      assert.strictEqual(snapshot.name, SNAPSHOT_NAME);
      assert.strictEqual(snapshot.id, SNAPSHOT_ID);
    });

    it('should throw if snapshot id in wrong format', function() {
      const id = `/project/bad-project/instances/bad-instance/snapshots/${SNAPSHOT_ID}`;
      assert.throws(function() {
        new Snapshot(CLUSTER, id);
      }, Error);
    });
  });

  describe('create', function() {
    it('should call createSnapshot from cluster', function(done) {
      const options = {
        description: 'Description text for Snapshot',
      };

      snapshot.cluster.createSnapshot = function(
        id,
        table,
        options_,
        callback
      ) {
        assert.strictEqual(id, snapshot.id);
        assert.strictEqual(table, TABLE.name);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      snapshot.create(TABLE.name, options, done);
    });

    it('should return error', function(done) {
      const error = new Error('Error.');

      snapshot.cluster.createSnapshot = function(config, callback) {
        callback(error);
      };

      snapshot.create(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });
  });

  describe('get-metadata', function() {
    it('should call getSnapshot from cluster', function(done) {
      snapshot.cluster.getSnapshot = function(name, callback) {
        assert.strictEqual(name, snapshot.name);
        callback(); // done()
      };

      snapshot.getMetadata(done);
    });

    it('should accept gaxOptions', function() {
      const GAX_OPTS = {
        timeout: 60000,
      };

      snapshot.cluster.getSnapshot = function(name, gaxOptions, callback) {
        assert.strictEqual(name, snapshot.name);
        assert.deepStrictEqual(gaxOptions, GAX_OPTS);
        callback();
      };

      snapshot.getMetadata(GAX_OPTS, assert.ifError);
    });
  });

  describe('delete', function() {
    it('should make the correct request', function(done) {
      snapshot.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'deleteSnapshot');

        assert.deepStrictEqual(config.reqOpts, {
          name: snapshot.name,
        });

        assert.deepStrictEqual(config.gaxOpts, {});

        callback(); // done()
      };

      snapshot.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      snapshot.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      snapshot.delete(gaxOptions, assert.ifError);
    });
  });

  describe('createTable', function() {
    it('should make the correct request', function(done) {
      snapshot.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'createTableFromSnapshot');

        assert.deepStrictEqual(config.reqOpts, {
          parent: snapshot.instance.name,
          tableId: TABLE.id,
          sourceSnapshot: snapshot.name,
        });

        assert.deepStrictEqual(config.gaxOpts, {});

        callback(); // done()
      };

      snapshot.createTable(TABLE.id, done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      snapshot.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      snapshot.createTable(TABLE.id, gaxOptions, assert.ifError);
    });
  });

  describe('SnapshotError', function() {
    it('should set the code and message', function() {
      const err = new SnapshotError(SNAPSHOT_NAME);

      assert.strictEqual(err.code, 404);
      assert.strictEqual(
        err.message,
        'Snapshot not found: ' + SNAPSHOT_NAME + '.'
      );
    });
  });
});
