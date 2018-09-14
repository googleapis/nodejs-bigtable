/*!
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

const {promisifyAll} = require('@google-cloud/promisify');
const Snapshot = require('./snapshot.js');
const is = require('is');

/**
 * Create a cluster object to interact with your cluster.
 *
 * @class
 * @param {Instance} instance The parent instance of this cluster.
 * @param {string} id Id of the cluster.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const cluster = instance.cluster('my-cluster');
 */
class Cluster {
  constructor(instance, id) {
    this.bigtable = instance.bigtable;
    this.instance = instance;

    let name;

    if (id.includes('/')) {
      if (id.startsWith(`${instance.name}/clusters/`)) {
        name = id;
      } else {
        throw new Error(
          `Cluster id '${id}' is not formatted correctly.
Please use the format 'my-cluster' or '${instance.name}/clusters/my-cluster'.`
        );
      }
    } else {
      name = `${instance.name}/clusters/${id}`;
    }
    this.id = name.split('/').pop();
    this.name = name;
  }

  /**
   * Formats zone location.
   *
   * @private
   *
   * @param {string} project The project ID.
   * @param {string} location The zone location.
   * @returns {string}
   *
   * @example
   * Cluster.getLocation_('my-project', 'us-central1-b');
   * // 'projects/my-project/locations/us-central1-b'
   */
  static getLocation_(project, location) {
    if (location.includes('/')) {
      return location;
    }

    // in-case project has '/', split and pick last component
    if (project.includes('/')) {
      project = project.split('/').pop();
    }

    return `projects/${project}/locations/${location}`;
  }

  /**
   * Maps the storage type to the proper integer.
   *
   * @private
   *
   * @param {string} type The storage type (hdd, ssd).
   * @returns {number}
   *
   * @example
   * Cluster.getStorageType_('ssd');
   * // 1
   */
  static getStorageType_(type) {
    const storageTypes = {
      unspecified: 0,
      ssd: 1,
      hdd: 2,
    };

    if (is.string(type)) {
      type = type.toLowerCase();
    }

    return storageTypes[type] || storageTypes.unspecified;
  }

  /**
   * Create a cluster.
   *
   * @param {object} [options] See {@link Instance#createCluster}.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const cluster = instance.cluster('my-cluster');
   *
   * cluster.create(function(err, cluster, operation, apiResponse) {
   *   if (err) {
   *     // Error handling omitted.
   *   }
   *
   *   operation
   *     .on('error', console.error)
   *     .on('complete', function() {
   *       // The cluster was created successfully.
   *     });
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * cluster.create().then(function(data) {
   *   const cluster = data[0];
   *   const operation = data[1];
   *   const apiResponse = data[2];
   * });
   */
  create(options, callback) {
    if (is.fn(options)) {
      callback = options;
      options = {};
    }

    this.instance.createCluster(this.id, options, callback);
  }

  /**
   * Delete the cluster.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * cluster.delete(function(err, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * cluster.delete().then(function(data) {
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
        client: 'BigtableInstanceAdminClient',
        method: 'deleteCluster',
        reqOpts: {
          name: this.name,
        },
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  /**
   * Check if a cluster exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {boolean} callback.exists Whether the cluster exists or not.
   *
   * @example
   * cluster.exists(function(err, exists) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * cluster.exists().then(function(data) {
   *   var exists = data[0];
   * });
   */
  exists(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.getMetadata(gaxOptions, err => {
      if (err) {
        if (err.code === 5) {
          callback(null, false);
          return;
        }

        callback(err);
        return;
      }

      callback(null, true);
    });
  }

  /**
   * Get a cluster if it exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * cluster.get(function(err, cluster, apiResponse) {
   *   // The `cluster` data has been populated.
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * cluster.get().then(function(data) {
   *   var cluster = data[0];
   *   var apiResponse = data[1];
   * });
   */
  get(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.getMetadata(gaxOptions, (err, metadata) => {
      callback(err, err ? null : this, metadata);
    });
  }

  /**
   * Get the cluster metadata.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.metadata The metadata.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * cluster.getMetadata(function(err, metadata, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * cluster.getMetadata().then(function(data) {
   *   var metadata = data[0];
   *   var apiResponse = data[1];
   * });
   */
  getMetadata(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'getCluster',
        reqOpts: {
          name: this.name,
        },
        gaxOpts: gaxOptions,
      },
      (...args) => {
        if (args[1]) {
          this.metadata = args[1];
        }

        callback(...args);
      }
    );
  }

  /**
   * Set the cluster metadata.
   *
   * @param {object} metadata See {@link Instance#createCluster} for the
   *     available metadata options.
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Operation} callback.operation An operation object that can be used
   *     to check the status of the request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const cluster = instance.cluster('my-cluster');
   *
   * const callback = function(err, operation, apiResponse) {
   *   if (err) {
   *     // Error handling omitted.
   *   }
   *
   *   operation
   *     .on('error', console.error)
   *     .on('complete', function() {
   *       // The cluster was updated successfully.
   *     });
   * };
   *
   * const metadata = {
   *   location: 'us-central1-b',
   *   nodes: 3,
   *   storage: 'ssd'
   * };
   *
   * cluster.setMetadata(metadata, callback);
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * cluster.setMetadata(metadata).then(function(data) {
   *   const operation = data[0];
   *   const apiResponse = data[1];
   * });
   */
  setMetadata(metadata, gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    const reqOpts = {
      name: this.name,
    };

    if (metadata.location) {
      reqOpts.location = Cluster.getLocation_(
        this.bigtable.projectId,
        metadata.location
      );
    }

    if (metadata.nodes) {
      reqOpts.serveNodes = metadata.nodes;
    }

    if (metadata.storage) {
      reqOpts.defaultStorageType = Cluster.getStorageType_(metadata.storage);
    }

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'updateCluster',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  /**
   * Get a reference to a Bigtable Snapshot.
   *
   * @param {string} id The id of the snapshot.
   * @returns {Snapshot}
   *
   * @example
   * const snapshot = cluster.snapshot('my-snapshot');
   */
  snapshot(id) {
    return new Snapshot(this, id);
  }

  /**
   * Creates a new snapshot in the specified cluster from the specified
   * source table. The cluster and the table must be in the same instance.
   *
   * @param {string} id
   *   The ID for new snapshot should be referred to within the parent cluster.
   *   e.g., `mysnapshot` of the form: `[_a-zA-Z0-9][-_.a-zA-Z0-9]*`
   * @param {string} tableId
   *   The id of the table for which snapshot will be created.
   * @param {object} options options object.
   * @param {string} options.description
   *   Description of the snapshot.
   * @param {Object} [options.ttl]
   *   The amount of time that the new snapshot can stay active after it is
   *   created. Once 'ttl' expires, the snapshot will get deleted. The maximum
   *   amount of time a snapshot can stay active is 7 days. If 'ttl' is not
   *   specified, the default value of 24 hours will be used.
   * @param {object} [options.gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   *
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *   The second parameter to the callback is a [gax.Operation]
   *   {@link https://googleapis.github.io/gax-nodejs/Operation} object.
   *
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is a [gax.Operation]
   *   {@link https://googleapis.github.io/gax-nodejs/Operation} object.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   * const id = 'my-snapshot';
   * const tableId = 'my-table';
   * let options = {
   *   description: 'sample description text for snapshot';
   * };
   *
   * cluster
   *  .createSnapshot(id, tableId, options)
   *  .then(responses => {
   *    let operation = responses[0];
   *    let initialApiResponse = responses[1];
   *
   *		// Adding a listener for the "complete" event starts polling for the
   *    // completion of the operation.
   *    operation.on('complete', (result, metadata, finalApiResponse) => {
   *      console.log(`On Complete: ${result}`);
   *    });
   *
   *    // Adding a listener for the "progress" event causes the callback to be
   *    // called on any change in metadata when the operation is polled.
   *    operation.on('progress', (metadata, apiResponse) => {
   *      // doSomethingWith(metadata)
   *    });
   *
   *    // Adding a listener for the "error" event handles any errors found during polling.
   *    operation.on('error', err => {
   *      // throw(err);
   *    });
   *	})
   *	.catch(err => {
   *    // Handle the error
   *  });
   */
  createSnapshot(id, tableId, options, callback) {
    const table = this.instance.table(tableId);
    const reqOpts = {
      snapshotId: id,
      cluster: this.name,
      name: table.name,
      description: options.description,
    };

    if (options.ttl) {
      reqOpts.ttl = options.ttl;
    }

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'snapshotTable',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (...args) => {
        callback(...args);
      }
    );
  }

  /**
   * Gets metadata information about the specified snapshot.
   *
   * @param {string} id
   *   The unique id of the requested snapshot.
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   *
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *   The second parameter to the callback is an object [Snapshot]
   *   {@link google.bigtable.admin.v2.Snapshot}.
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
   *
   * cluster
   *   .getSnapshot('my-snapshot', options)
   *   .then(data => {
   *     const snapshot = data[0];
   *     const apiResponse = data[1];
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getSnapshot(id, gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    const reqOpts = {
      name: this.snapshot(id).name,
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'getSnapshot',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      (...args) => {
        callback(...args);
      }
    );
  }

  /**
   * Lists all snapshots associated with the cluster.
   *
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Snapshot[]} callback.snapshots List of all Snapshots.
   * @param {object} callback.apiResponse The full API response.
   * @param {number} [options.pageSize]
   *   The maximum number of resources in a page.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   *
   * @example
   * const options = {
   *   gaxOptions: {
   *     autoPaginate: false
   *   }
   * };
   *
   * cluster
   *   .listSnapshots(options)
   *   .then(responses => {
   *     var snapshots = responses[0];
   *     snapshots.forEach(t => {
   *       // doThingsWith(snapshot)
   *       console.log(snapshots.id);
   *     });
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  listSnapshots(options, callback) {
    if (is.function(options)) {
      callback = options;
      options = {};
    }

    const reqOpts = {
      parent: this.name,
    };

    if (options.pageSize) {
      reqOpts.pageSize = options.pageSize;
    }

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'listSnapshots',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (...args) => {
        if (args[1]) {
          args[1] = args[1].map(snapshotObj => {
            const snapshot = this.snapshot(snapshotObj.name.split('/').pop());
            snapshot.metadata = snapshotObj;
            return snapshot;
          });
        }

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
promisifyAll(Cluster);

/**
 * Reference to the {@link Cluster} class.
 * @name module:@google-cloud/bigtable.Cluster
 * @see Cluster
 */
module.exports = Cluster;
