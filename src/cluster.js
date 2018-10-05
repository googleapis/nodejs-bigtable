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
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_create_cluster
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
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_delete_cluster
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
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_exists_cluster
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
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_get_cluster
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
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_get_meta
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
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_set_meta
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
