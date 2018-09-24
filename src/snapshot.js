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
const is = require('is');

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
    this.instance = cluster.instance;
    this.cluster = cluster;

    let name;
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

  /**
   * Create a snapshot.
   * @param {string} table
   *   The name of the table for which snapshot will be created.
   *   format: `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {object} options options object.
   * @param {string} options.description
   *   Description of the snapshot.
   * @param {Object} [options.ttl]
   *   Represented of count of seconds
   *   The amount of time that the new snapshot can stay active after it is
   *   created. Once 'ttl' expires, the snapshot will get deleted. The maximum
   *   amount of time a snapshot can stay active is 7 days. If 'ttl' is not
   *   specified, the default value of 24 hours will be used.
   * @param {object} [options.gaxOptions] Request configuration options, outlined here:
   *   https://googleapis.github.io/gax-nodejs/CallSettings.html.
   *
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const cluster = instance.cluster('my-cluster');
   * const table = instance.table('my-table');
   *
   * let options = {
   *   description: 'Description text for snapshot',
   * }
   *
   * // Handle the operation using the promise pattern.
   * snapshot.create(table.name, options)
   *   .then(responses => {
   *     var operation = responses[0];
   *     var initialApiResponse = responses[1];
   *
   *     // Operation#promise starts polling for the completion of the LRO.
   *     return operation.promise();
   *   })
   *   .then(responses => {
   *     // The final result of the operation.
   *     var result = responses[0];
   *
   *     // The metadata value of the completed operation.
   *     var metadata = responses[1];
   *
   *     // The response of the api call returning the complete operation.
   *     var finalApiResponse = responses[2];
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  create(table, options, callback) {
    this.cluster.createSnapshot(this.id, table, options, callback);
  }

  /**
   * Gets metadata information about the specified snapshot.
   *
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *   The second parameter to the callback is an object [Snapshot]
   *   {@link google.bigtable.admin.v2.Snapshot}.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   *
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Snapshot]
   *   {@link google.bigtable.admin.v2.Snapshot}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const cluster = instance.cluster('my-cluster');
   * const snapshot = cluster.snapshot('my-snapshot');
   *
   * snapshot
   *   .getMetadata(name, gaxOptions)
   *   .then(data => {
   *     const operation = data[0];
   *     const apiResponse = data[1];
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getMetadata(gaxOptions, callback) {
    this.cluster.getSnapshot(this.name, gaxOptions, callback);
  }

  /**
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * snapshot.delete(function(err, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * snapshot.delete().then(function(data) {
   *   var apiResponse = data[0];
   * });
   */
  delete(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'deleteSnapshot',
        reqOpts: {
          name: this.name,
        },
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  /**
   * Creates a new table from the snapshot. The target table must
   * not exist. The snapshot and the table must be in the same instance.
   *
   * @param {string} tableId
   *   The name by which the new table should be referred to within the parent
   *   instance, e.g., `foobar` rather than `<parent>/tables/foobar`.
   * @param {Object} [gaxOptions]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is a [gax.Operation]{@link https://googleapis.github.io/gax-nodejs/Operation} object.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('my-table');
   *
   * // Handle the operation using the promise pattern.
   * snapshot.createTable(table.id)
   *   .then(responses => {
   *     var operation = responses[0];
   *     var initialApiResponse = responses[1];
   *
   *     // Operation#promise starts polling for the completion of the LRO.
   *     return operation.promise();
   *   })
   *   .then(responses => {
   *     // The final result of the operation.
   *     var result = responses[0];
   *
   *     // The metadata value of the completed operation.
   *     var metadata = responses[1];
   *
   *     // The response of the api call returning the complete operation.
   *     var finalApiResponse = responses[2];
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  createTable(tableId, gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    const reqOpts = {
      parent: this.instance.name,
      tableId: tableId,
      sourceSnapshot: this.name,
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'createTableFromSnapshot',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      (...args) => {
        callback(...args);
      }
    );
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
