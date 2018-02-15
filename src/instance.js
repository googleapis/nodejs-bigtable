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
var extend = require('extend');
var is = require('is');
var util = require('util');

var Cluster = require('./cluster.js');
var Family = require('./family.js');
var Table = require('./table.js');

/**
 * Create an Instance object to interact with a Compute instance.
 *
 * @class
 * @param {Bigtable} bigtable The parent {@link Bigtable} object of this
 *     instance.
 * @param {string} name Name of the instance.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 */
function Instance(bigtable, name) {
  this.bigtable = bigtable;

  var id = name;

  if (id.indexOf('/') === -1) {
    id = bigtable.projectName + '/instances/' + name;
  }

  this.id = id;
  this.name = id.split('/').pop();
}

/**
 * Create an instance.
 *
 * @param {object} [options] See {@link Bigtable#createInstance}.
 * @param {object} [options.gaxOptions]  Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * instance.create(function(err, instance, operation, apiResponse) {
 *   if (err) {
 *     // Error handling omitted.
 *   }
 *
 *   operation
 *     .on('error', console.error)
 *     .on('complete', function() {
 *       // The instance was created successfully.
 *     });
 * });
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.create().then(function(data) {
 *   var instance = data[0];
 *   var operation = data[1];
 *   var apiResponse = data[2];
 * });
 */
Instance.prototype.create = function(options, callback) {
  if (is.fn(options)) {
    callback = options;
    options = {};
  }

  this.bigtable.createInstance(this.name, options, callback);
};

/**
 * Create a cluster.
 *
 * @param {string} name The name to be used when referring to the new
 *     cluster within its instance.
 * @param {object} [options] Cluster creation options.
 * @param {object} [options.gaxOptions]  Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
 * @param {string} [options.location] The location where this cluster's nodes
 *     and storage reside. For best performance clients should be located as
 *     as close as possible to this cluster. Currently only zones are
 *     supported.
 * @param {number} [options.nodes] The number of nodes allocated to this
 *     cluster. More nodes enable higher throughput and more consistent
 *     performance.
 * @param {string} [options.storage] The type of storage used by this cluster
 *     to serve its parent instance's tables. Options are 'hdd' or 'ssd'.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this request.
 * @param {Cluster} callback.cluster The newly created
 *     cluster.
 * @param {Operation} callback.operation An operation object that can be used
 *     to check the status of the request.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * const callback = function(err, cluster, operation, apiResponse) {
 *   if (err) {
 *     // Error handling omitted.
 *   }
 *
 *   operation
 *     .on('error', console.log)
 *     .on('complete', function() {
 *       // The cluster was created successfully.
 *     });
 * };
 *
 * const options = {
 *   location: 'us-central1-b',
 *   nodes: 3,
 *   storage: 'ssd'
 * };
 *
 * instance.createCluster('my-cluster', options, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.createCluster('my-cluster', options).then(function(data) {
 *   const cluster = data[0];
 *   const operation = data[1];
 *   const apiResponse = data[2];
 * });
 */
Instance.prototype.createCluster = function(name, options, callback) {
  var self = this;

  if (is.function(options)) {
    callback = options;
    options = {};
  }

  var reqOpts = {
    parent: this.id,
    clusterId: name,
  };

  if (!is.empty(options)) {
    reqOpts.cluster = {};
  }

  if (options.location) {
    reqOpts.cluster.location = Cluster.getLocation_(
      this.bigtable.projectName,
      options.location
    );
  }

  if (options.nodes) {
    reqOpts.cluster.serveNodes = options.nodes;
  }

  if (options.storage) {
    var storageType = Cluster.getStorageType_(options.storage);
    reqOpts.cluster.defaultStorageType = storageType;
  }

  this.bigtable.request(
    {
      client: 'BigtableInstanceAdminClient',
      method: 'createCluster',
      reqOpts: reqOpts,
      gaxOpts: options.gaxOptions,
    },
    function(err, operation) {
      var cluster = err ? self.cluster(name) : null;
      callback(err, cluster, operation);
    }
  );
};

/**
 * Create a table on your Bigtable instance.
 *
 * @see [Designing Your Schema]{@link https://cloud.google.com/bigtable/docs/schema-design}
 * @see [Splitting Keys]{@link https://cloud.google.com/bigtable/docs/managing-tables#splits}
 *
 * @throws {error} If a name is not provided.
 *
 * @param {string} name The name of the table.
 * @param {object} [options] Table creation options.
 * @param {object|string[]} [options.families] Column families to be created
 *     within the table.
 * @param {string[]} [options.splits] Initial
 *    [split keys](https://cloud.google.com/bigtable/docs/managing-tables#splits).
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this request.
 * @param {Table} callback.table The newly created table.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * const callback = function(err, table, apiResponse) {
 *   // `table` is a Table object.
 * };
 *
 * instance.createTable('prezzy', callback);
 *
 * //-
 * // Optionally specify column families to be created within the table.
 * //-
 * const options = {
 *   families: ['follows']
 * };
 *
 * instance.createTable('prezzy', options, callback);
 *
 * //-
 * // You can also specify garbage collection rules for your column families.
 * // See {@link Table#createFamily} for more information about
 * // column families and garbage collection rules.
 * //-
 * const options = {
 *   families: [
 *     {
 *       name: 'follows',
 *       rule:  {
 *         age: {
 *           seconds: 0,
 *           nanos: 5000
 *         },
 *         versions: 3,
 *         union: true
 *       }
 *     }
 *   ]
 * };
 *
 * instance.createTable('prezzy', options, callback);
 *
 * //-
 * // Pre-split the table based on the row key to spread the load across
 * // multiple Cloud Bigtable nodes.
 * //-
 * const options = {
 *   splits: ['10', '20']
 * };
 *
 * instance.createTable('prezzy', options, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.createTable('prezzy', options).then(function(data) {
 *   const table = data[0];
 *   const apiResponse = data[1];
 * });
 */
Instance.prototype.createTable = function(name, options, callback) {
  var self = this;

  if (!name) {
    throw new Error('A name is required to create a table.');
  }

  options = options || {};

  if (is.function(options)) {
    callback = options;
    options = {};
  }

  var reqOpts = {
    parent: this.id,
    tableId: name,
    table: {
      // The granularity at which timestamps are stored in the table.
      // Currently only milliseconds is supported, so it's not configurable.
      granularity: 0,
    },
  };

  if (options.splits) {
    reqOpts.initialSplits = options.splits.map(function(key) {
      return {
        key: key,
      };
    });
  }

  if (options.families) {
    var columnFamilies = options.families.reduce(function(families, family) {
      if (is.string(family)) {
        family = {
          name: family,
        };
      }

      var columnFamily = (families[family.name] = {});

      if (family.rule) {
        columnFamily.gcRule = Family.formatRule_(family.rule);
      }

      return families;
    }, {});

    reqOpts.table.columnFamilies = columnFamilies;
  }

  this.bigtable.request(
    {
      client: 'BigtableTableAdminClient',
      method: 'createTable',
      reqOpts: reqOpts,
      gaxOpts: options.gaxOptions,
    },
    function() {
      if (arguments[1]) {
        var table = self.table(arguments[1].name);
        table.metadata = arguments[1];
        arguments[1] = table;
      }

      callback.apply(null, arguments);
    }
  );
};

/**
 * Get a reference to a Bigtable Cluster.
 *
 * @param {string} name The name of the cluster.
 * @returns {Cluster}
 */
Instance.prototype.cluster = function(name) {
  return new Cluster(this, name);
};

/**
 * Delete the instance.
 *
 * @param {object} [gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} [callback] The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * instance.delete(function(err, apiResponse) {});
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.delete().then(function(data) {
 *   var apiResponse = data[0];
 * });
 */
Instance.prototype.delete = function(gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  this.bigtable.request(
    {
      client: 'BigtableInstanceAdminClient',
      method: 'deleteInstance',
      reqOpts: {
        name: this.id,
      },
      gaxOpts: gaxOptions,
    },
    callback
  );
};

/**
 * Check if an instance exists.
 *
 * @param {object} [gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {boolean} callback.exists Whether the instance exists or not.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * instance.exists(function(err, exists) {});
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.exists().then(function(data) {
 *   var exists = data[0];
 * });
 */
Instance.prototype.exists = function(gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  this.getMetadata(gaxOptions, function(err) {
    if (!err) {
      callback(null, true);
      return;
    }

    if (err.code === 5) {
      callback(null, false);
      return;
    }

    callback(err);
  });
};

/**
 * Get an instance if it exists.
 *
 * @param {object} [gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {boolean} [gaxOptions.autoCreate=false] Automatically create the
 *     instance if it does not already exist.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * instance.get(function(err, instance, apiResponse) {
 *   // The `instance` data has been populated.
 * });
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.get().then(function(data) {
 *   var instance = data[0];
 *   var apiResponse = data[1];
 * });
 */
Instance.prototype.get = function(gaxOptions, callback) {
  var self = this;

  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  var autoCreate = !!gaxOptions.autoCreate;
  delete gaxOptions.autoCreate;

  this.getMetadata(gaxOptions, function(err, apiResponse) {
    if (!err) {
      callback(null, self, apiResponse);
      return;
    }

    if (err.code !== 5 || !autoCreate) {
      callback(err, null, apiResponse);
      return;
    }

    self.create({gaxOptions}, callback);
  });
};

/**
 * Get Cluster objects for all of your clusters.
 *
 * @param {object} [query] Query object.
 * @param {boolean} [query.autoPaginate=true] Have pagination handled
 *     automatically.
 * @param {number} [query.maxApiCalls] Maximum number of API calls to make.
 * @param {number} [query.maxResults] Maximum number of results to return.
 * @param {string} [query.pageToken] Token returned from a previous call, to
 *     request the next page of results.
 * @param {function} callback The callback function.
 * @param {?error} callback.error An error returned while making this request.
 * @param {Cluster[]} callback.clusters List of all
 *     Clusters.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * instance.getClusters(function(err, clusters) {
 *   if (!err) {
 *     // `clusters` is an array of Cluster objects.
 *   }
 * });
 *
 * //-
 * // To control how many API requests are made and page through the results
 * // manually, set `autoPaginate` to false.
 * //-
 * const callback = function(err, clusters, nextQuery, apiResponse) {
 *   if (nextQuery) {
 *     // More results exist.
 *     instance.getClusters(nextQuery, calback);
 *   }
 * };
 *
 * instance.getClusters({
 *   autoPaginate: false
 * }, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.getClusters().then(function(data) {
 *   const clusters = data[0];
 * });
 */
Instance.prototype.getClusters = function(query, callback) {
  var self = this;

  if (is.function(query)) {
    callback = query;
    query = {};
  }

  var reqOpts = extend({}, query, {
    parent: this.id,
  });
  delete reqOpts.gaxOptions;

  this.bigtable.request(
    {
      client: 'BigtableInstanceAdminClient',
      method: 'listClusters',
      reqOpts: reqOpts,
      gaxOpts: query.gaxOptions,
    },
    function(err, resp) {
      if (arguments[1]) {
        arguments[1] = arguments[1].clusters.map(function(clusterObj) {
          var cluster = self.cluster(clusterObj.name);
          cluster.metadata = clusterObj;
          return cluster;
        });
      }

      callback.apply(null, arguments);
    }
  );
};

/**
 * Get {@link Cluster} objects for all of your clusters as a readable
 * object stream.
 *
 * @param {object} [query] Configuration object. See
 *     {@link Instance#getClusters} for a complete list of options.
 * @returns {stream}
 *
 * @example
 * instance.getClustersStream()
 *   .on('error', console.error)
 *   .on('data', function(cluster) {
 *     // `cluster` is a Cluster object.
 *   })
 *   .on('end', function() {
 *     // All clusters retrieved.
 *   });
 *
 * //-
 * // If you anticipate many results, you can end a stream early to prevent
 * // unnecessary processing and API requests.
 * //-
 * instance.getClustersStream()
 *   .on('data', function(cluster) {
 *     this.end();
 *   });
 */
Instance.prototype.getClustersStream = common.paginator.streamify(
  'getClusters'
);

/**
 * Get the instance metadata.
 *
 * @param {object} [gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {object} callback.metadata The metadata.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * instance.getMetadata(function(err, metadata, apiResponse) {});
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.getMetadata().then(function(data) {
 *   var metadata = data[0];
 *   var apiResponse = data[1];
 * });
 */
Instance.prototype.getMetadata = function(gaxOptions, callback) {
  var self = this;

  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  this.bigtable.request(
    {
      client: 'BigtableInstanceAdminClient',
      method: 'getInstance',
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
 * Get Table objects for all the tables in your Compute instance.
 *
 * @param {object} [options] Query object.
 * @param {boolean} [options.autoPaginate=true] Have pagination handled
 *     automatically.
 * @param {object} [options.gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
 * @param {number} [options.maxApiCalls] Maximum number of API calls to make.
 * @param {number} [options.maxResults] Maximum number of items to return.
 * @param {string} [options.pageToken] A previously-returned page token
 *     representing part of a larger set of results to view.
 * @param {string} [options.view] View over the table's fields. Possible options
 *     are 'name', 'schema' or 'full'. Default: 'name'.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this request.
 * @param {Table[]} callback.tables List of all Tables.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * instance.getTables(function(err, tables) {
 *   if (!err) {
 *     // `tables` is an array of Table objects.
 *   }
 * });
 *
 * //-
 * // To control how many API requests are made and page through the results
 * // manually, set `autoPaginate` to false.
 * //-
 * const callback = function(err, tables, nextQuery, apiResponse) {
 *   if (nextQuery) {
 *     // More results exist.
 *     instance.getTables(nextQuery, calback);
 *   }
 * };
 *
 * instance.getTables({
 *   autoPaginate: false
 * }, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.getTables().then(function(data) {
 *   const tables = data[0];
 * });
 */
Instance.prototype.getTables = function(options, callback) {
  var self = this;

  if (is.function(options)) {
    callback = options;
    options = {};
  }

  var originalOptions = extend({}, options);

  var reqOpts = extend({}, options, {
    parent: this.id,
    view: Table.VIEWS[options.view || 'unspecified'],
  });

  var gaxOpts = reqOpts.gaxOptions;
  delete reqOpts.gaxOptions;

  this.bigtable.request(
    {
      client: 'BigtableTableAdminClient',
      method: 'listTables',
      reqOpts: reqOpts,
      gaxOpts: gaxOpts,
    },
    function() {
      if (arguments[1]) {
        arguments[1] = arguments[1].map(function(metadata) {
          var name = metadata.name.split('/').pop();
          var table = self.table(name);

          table.metadata = metadata;
          return table;
        });
      }

      callback.apply(null, arguments);
    }
  );
};

/**
 * Get {@link Table} objects for all the tables in your Compute
 * instance as a readable object stream.
 *
 * @param {object} [query] Configuration object. See
 *     {@link Instance#getTables} for a complete list of options.
 * @returns {stream}
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * instance.getTablesStream()
 *   .on('error', console.error)
 *   .on('data', function(table) {
 *     // table is a Table object.
 *   })
 *   .on('end', function() {
 *     // All tables retrieved.
 *   });
 *
 * //-
 * // If you anticipate many results, you can end a stream early to prevent
 * // unnecessary processing and API requests.
 * //-
 * instance.getTablesStream()
 *   .on('data', function(table) {
 *     this.end();
 *   });
 */
Instance.prototype.getTablesStream = common.paginator.streamify('getTables');

/**
 * Set the instance metadata.
 *
 * @param {object} metadata Metadata object.
 * @param {string} metadata.displayName The descriptive name for this
 *     instance as it appears in UIs. It can be changed at any time, but
 *     should be kept globally unique to avoid confusion.
 * @param {object} metadata.gaxOptions Request configuration options,
 *     outlined here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 *
 * var metadata = {
 *   displayName: 'updated-name'
 * };
 *
 * instance.setMetadata(metadata, function(err, apiResponse) {});
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * instance.setMetadata(metadata).then(function(data) {
 *   var apiResponse = data[0];
 * });
 */
Instance.prototype.setMetadata = function(metadata, callback) {
  var self = this;

  var reqOpts = extend({name: this.id}, metadata);
  delete reqOpts.gaxOptions;

  this.bigtable.request(
    {
      client: 'BigtableInstanceAdminClient',
      method: 'updateInstance',
      reqOpts: reqOpts,
      gaxOpts: metadata.gaxOptions,
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
 * Get a reference to a Bigtable table.
 *
 * @param {string} name The name of the table.
 * @returns {Table}
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const table = instance.table('presidents');
 */
Instance.prototype.table = function(name) {
  return new Table(this, name);
};

/*! Developer Documentation
 *
 * These methods can be auto-paginated.
 */
common.paginator.extend(Instance, ['getClusters', 'getTables']);

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Instance, {
  exclude: ['cluster', 'table'],
});

/**
 * Reference to the {@link Instance} class.
 * @name module:@google-cloud/bigtable.Instance
 * @see Instance
 */
module.exports = Instance;
