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

'use strict';

var common = require('@google-cloud/common');
var format = require('string-format-obj');
var is = require('is');

/**
 * Create a cluster object to interact with your cluster.
 *
 * @class
 * @param {Instance} instance The parent instance of this cluster.
 * @param {string} name Name of the cluster.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const cluster = instance.cluster('my-cluster');
 */
function Cluster(instance, name) {
  this.bigtable = instance.bigtable;
  this.instance = instance;

  var id = name;

  if (id.indexOf('/') === -1) {
    id = `${instance.id}/clusters/${name}`;
  }

  this.id = id;
  this.name = id.split('/').pop();
}

/**
 * Formats zone location.
 *
 * @private
 *
 * @param {string} project The project.
 * @param {string} location The zone location.
 * @returns {string}
 *
 * @example
 * Cluster.getLocation_('my-project', 'us-central1-b');
 * // 'projects/my-project/locations/us-central1-b'
 */
Cluster.getLocation_ = function(project, location) {
  if (location.indexOf('/') > -1) {
    return location;
  }

  return format('projects/{project}/locations/{location}', {
    project: project,
    location: location,
  });
};

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
Cluster.getStorageType_ = function(type) {
  var storageTypes = {
    unspecified: 0,
    ssd: 1,
    hdd: 2,
  };

  if (is.string(type)) {
    type = type.toLowerCase();
  }

  return storageTypes[type] || storageTypes.unspecified;
};

/**
 * Create a cluster.
 *
 * @param {object} [options] See {@link Instance#createCluster}.
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
Cluster.prototype.create = function(options, callback) {
  if (is.fn(options)) {
    callback = options;
    options = {};
  }

  this.instance.createCluster(this.name, options, callback);
};

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
Cluster.prototype.delete = function(gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  this.bigtable.request(
    {
      client: 'BigtableInstanceAdminClient',
      method: 'deleteCluster',
      reqOpts: {
        name: this.id,
      },
      gaxOpts: gaxOptions,
    },
    callback
  );
};

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
Cluster.prototype.exists = function(gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  this.getMetadata(gaxOptions, function(err) {
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
};

/**
 * Get a cluster if it exists.
 *
 * You may optionally use this to "get or create" an object by providing an
 * object with `autoCreate` set to `true`. Any extra configuration that is
 * normally required for the `create` method must be contained within this
 * object as well.
 *
 * @param {object} [options] Configuration object.
 * @param {boolean} [options.autoCreate=false] Automatically create the
 *     instance if it does not already exist.
 * @param {object} [options.gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
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
Cluster.prototype.get = function(options, callback) {
  var self = this;

  if (is.fn(options)) {
    callback = options;
    options = {};
  }

  var autoCreate = !!options.autoCreate;
  var gaxOptions = options.gaxOptions;

  this.getMetadata(gaxOptions, function(err, apiResponse) {
    if (err) {
      if (err.code === 5 && autoCreate) {
        self.create({gaxOptions}, callback);
        return;
      }

      callback(err, null, apiResponse);
      return;
    }

    callback(null, self, apiResponse);
  });
};

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
Cluster.prototype.getMetadata = function(gaxOptions, callback) {
  var self = this;

  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  this.bigtable.request(
    {
      client: 'BigtableInstanceAdminClient',
      method: 'getCluster',
      reqOpts: {
        name: this.id,
      },
      gaxOpts: gaxOptions,
    },
    function() {
      if (arguments[1]) {
        self.metadata = arguments[1];
      }

      callback.apply(null, arguments);
    }
  );
};

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
Cluster.prototype.setMetadata = function(metadata, gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  var reqOpts = {
    name: this.id,
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
      reqOpts: reqOpts,
      gaxOpts: gaxOptions,
    },
    callback
  );
};

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Cluster);

/**
 * Reference to the {@link Cluster} class.
 * @name module:@google-cloud/bigtable.Cluster
 * @see Cluster
 */
module.exports = Cluster;
