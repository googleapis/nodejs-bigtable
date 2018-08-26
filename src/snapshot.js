/*!
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
const {promisifyAll} = require('@google-cloud/promisify');

/**
 * @private
 */
class SnapshotError extends Error {
  constructor(name) {
    super();
    this.name = 'SnapshotError';
    this.message = `Snapshot not found: ${name}.`;
    this.code = 404;
  }
}

/**
 * Create a Snapshot object for a Cloud Bigtable table.
 *
 * @class
 * @param {Snapshot} snapshot Snapshot Object.
 * @param {string} id Unique identifier of the snapshot.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const cluster = instance.cluster('my-cluster');
 * const snapshot = cluster.snapshot('my-snapshot');
 */
class Snapshot {
  constructor(cluster, id) {
    this.bigtable = cluster.bigtable;
    this.cluster = cluster;

    var name;
    if (id.includes('/')) {
      if (id.startsWith(`${cluster.name}/snapshots/`)) {
        name = id;
      } else {
        throw new Error(
          `Snapshot id '${id}' is not formatted correctly.
Please use the format 'follows' or '${cluster.name}/snapshots/my-snapshot'.`
        );
      }
    } else {
      name = `${cluster.name}/snapshots/${id}`;
    }

    this.name = name;
    this.id = name.split('/').pop();
  }
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(Snapshot);

module.exports = Snapshot;
module.exports.SnapshotError = SnapshotError;
