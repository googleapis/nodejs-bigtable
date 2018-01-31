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
var commonGrpc = require('@google-cloud/common-grpc');
var format = require('string-format-obj');
var is = require('is');
var util = require('util');

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
  var id = name;

  if (id.indexOf('/') === -1) {
    id = instance.id + '/clusters/' + name;
  }

  var methods = {
    /**
     * Create a cluster.
     *
     * @method Cluster#create
     * @param {object} options See {@link Instance#createCluster}
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
    create: true,

    /**
     * Delete the cluster.
     *
     * @method Cluster#delete
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
    delete: {
      protoOpts: {
        service: 'BigtableInstanceAdmin',
        method: 'deleteCluster',
      },
      reqOpts: {
        name: id,
      },
    },

    /**
     * Check if a cluster exists.
     *
     * @method Cluster#exists
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
    exists: true,

    /**
     * Get a cluster if it exists.
     *
     * @method Cluster#get
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
    get: true,

    /**
     * Get the cluster metadata.
     *
     * @method Cluster#getMetadata
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
    getMetadata: {
      protoOpts: {
        service: 'BigtableInstanceAdmin',
        method: 'getCluster',
      },
      reqOpts: {
        name: id,
      },
    },
  };

  var config = {
    parent: instance,
    /**
     * @name Cluster#id
     * @type {string}
     */
    id: id,
    methods: methods,
    createMethod: function(_, options, callback) {
      instance.createCluster(name, options, callback);
    },
  };

  commonGrpc.ServiceObject.call(this, config);
}

util.inherits(Cluster, commonGrpc.ServiceObject);

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
 * Set the cluster metadata.
 *
 * See {@link Instance#createCluster} for a detailed explanation of
 * the arguments.
 *
 * @param {object} metadata Metadata object.
 * @param {string} metadata.location The cluster location.
 * @param {number} metadata.nodes Number of nodes allocated to the cluster.
 * @param {string} metadata.storage The cluster storage type.
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
Cluster.prototype.setMetadata = function(options, callback) {
  var reqOpts = {
    name: this.id,
  };

  var bigtable = this.parent.parent;

  if (options.location) {
    reqOpts.location = Cluster.getLocation_(
      bigtable.projectId,
      options.location
    );
  }

  if (options.nodes) {
    reqOpts.serveNodes = options.nodes;
  }

  if (options.storage) {
    reqOpts.defaultStorageType = Cluster.getStorageType_(options.storage);
  }

  bigtable.request({
    client: 'BigtableInstanceAdmin',
    method: 'updateCluster',
    reqOpts: reqOpts,
    gaxOpts: gaxOpts,
  }, function(err, resp) {
    if (err) {
      callback(err, null, resp);
      return;
    }

    var operation = bigtable.operation(resp.name);
    operation.metadata = resp;

    callback(null, operation, resp);
  });
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
