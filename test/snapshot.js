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

var promisified = false;
const fakePromisify = extend({}, promisify, {
  promisifyAll: function(Class) {
    if (Class.name === 'Snapshot') {
      promisified = true;
    }
  },
});


describe('Bigtable/Snapshot', function() {
  const SNAPSHOT_ID = 'snapshot-test';
  const CLUSTER = {
    bigtable: {},
  };

  const SNAPSHOT_NAME = `${CLUSTER.name}/snapshots/${SNAPSHOT_ID}`;
  var Snapshot;
  var snapshot;
  var SnapshotError;

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
      let snapshot = new Snapshot(CLUSTER, SNAPSHOT_ID);
      assert.strictEqual(snapshot.name, SNAPSHOT_NAME);
    });

    it('should leave full snapshot name unaltered and localize the id from the name', function() {
      let snapshot = new Snapshot(CLUSTER, SNAPSHOT_NAME);
      assert.strictEqual(snapshot.name, SNAPSHOT_NAME);
      assert.strictEqual(snapshot.id, SNAPSHOT_ID);
    });

    it('should throw if snapshot id in wrong format', function() {
      let id = `/project/bad-project/instances/bad-instance/snapshots/${SNAPSHOT_ID}`;
      assert.throws(function() {
        new Snapshot(CLUSTER, id);
      }, Error);
    });
  });

  describe('SnapshotError', function() {
    it('should set the code and message', function() {
      let err = new SnapshotError(SNAPSHOT_NAME);

      assert.strictEqual(err.code, 404);
      assert.strictEqual(
        err.message,
        'Snapshot not found: ' + SNAPSHOT_NAME + '.'
      );
    });
  });
});
