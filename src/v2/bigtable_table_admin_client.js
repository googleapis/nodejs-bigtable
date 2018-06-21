// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const gapicConfig = require('./bigtable_table_admin_client_config');
const gax = require('google-gax');
const merge = require('lodash.merge');
const path = require('path');
const protobuf = require('protobufjs');

const VERSION = require('../../package.json').version;

/**
 * Service for creating, configuring, and deleting Cloud Bigtable tables.
 *
 *
 * Provides access to the table schemas only, not the data stored within
 * the tables.
 *
 * @class
 * @memberof v2
 */
class BigtableTableAdminClient {
  /**
   * Construct an instance of BigtableTableAdminClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.servicePath] - The domain name of the
   *     API remote host.
   */
  constructor(opts) {
    this._descriptors = {};

    // Ensure that options include the service address and port.
    opts = Object.assign(
      {
        clientConfig: {},
        port: this.constructor.port,
        servicePath: this.constructor.servicePath,
      },
      opts
    );

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = this.constructor.scopes;
    var gaxGrpc = new gax.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth;

    // Determine the client header string.
    var clientHeader = [
      `gl-node/${process.version.node}`,
      `grpc/${gaxGrpc.grpcVersion}`,
      `gax/${gax.version}`,
      `gapic/${VERSION}`,
    ];
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }

    // Load the applicable protos.
    var protos = merge(
      {},
      gaxGrpc.loadProto(
        path.join(__dirname, '..', '..', 'protos'),
        'google/bigtable/admin/v2/bigtable_table_admin.proto'
      )
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      instancePathTemplate: new gax.PathTemplate(
        'projects/{project}/instances/{instance}'
      ),
      clusterPathTemplate: new gax.PathTemplate(
        'projects/{project}/instances/{instance}/clusters/{cluster}'
      ),
      snapshotPathTemplate: new gax.PathTemplate(
        'projects/{project}/instances/{instance}/clusters/{cluster}/snapshots/{snapshot}'
      ),
      tablePathTemplate: new gax.PathTemplate(
        'projects/{project}/instances/{instance}/tables/{table}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listTables: new gax.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'tables'
      ),
      listSnapshots: new gax.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'snapshots'
      ),
    };
    var protoFilesRoot = new gax.GoogleProtoFilesRoot();
    protoFilesRoot = protobuf.loadSync(
      path.join(
        __dirname,
        '..',
        '..',
        'protos',
        'google/bigtable/admin/v2/bigtable_table_admin.proto'
      ),
      protoFilesRoot
    );

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    this.operationsClient = new gax.lro({
      auth: gaxGrpc.auth,
      grpc: gaxGrpc.grpc,
    }).operationsClient(opts);

    var createTableFromSnapshotResponse = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.Table'
    );
    var createTableFromSnapshotMetadata = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.CreateTableFromSnapshotMetadata'
    );
    var snapshotTableResponse = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.Snapshot'
    );
    var snapshotTableMetadata = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.SnapshotTableMetadata'
    );

    this._descriptors.longrunning = {
      createTableFromSnapshot: new gax.LongrunningDescriptor(
        this.operationsClient,
        createTableFromSnapshotResponse.decode.bind(
          createTableFromSnapshotResponse
        ),
        createTableFromSnapshotMetadata.decode.bind(
          createTableFromSnapshotMetadata
        )
      ),
      snapshotTable: new gax.LongrunningDescriptor(
        this.operationsClient,
        snapshotTableResponse.decode.bind(snapshotTableResponse),
        snapshotTableMetadata.decode.bind(snapshotTableMetadata)
      ),
    };

    // Put together the default options sent with requests.
    var defaults = gaxGrpc.constructSettings(
      'google.bigtable.admin.v2.BigtableTableAdmin',
      gapicConfig,
      opts.clientConfig,
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.bigtable.admin.v2.BigtableTableAdmin.
    var bigtableTableAdminStub = gaxGrpc.createStub(
      protos.google.bigtable.admin.v2.BigtableTableAdmin,
      opts
    );

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    var bigtableTableAdminStubMethods = [
      'createTable',
      'createTableFromSnapshot',
      'listTables',
      'getTable',
      'deleteTable',
      'modifyColumnFamilies',
      'dropRowRange',
      'generateConsistencyToken',
      'checkConsistency',
      'snapshotTable',
      'getSnapshot',
      'listSnapshots',
      'deleteSnapshot',
    ];
    for (let methodName of bigtableTableAdminStubMethods) {
      this._innerApiCalls[methodName] = gax.createApiCall(
        bigtableTableAdminStub.then(
          stub =>
            function() {
              var args = Array.prototype.slice.call(arguments, 0);
              return stub[methodName].apply(stub, args);
            }
        ),
        defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.longrunning[methodName]
      );
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'bigtableadmin.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/bigtable.admin',
      'https://www.googleapis.com/auth/bigtable.admin.cluster',
      'https://www.googleapis.com/auth/bigtable.admin.instance',
      'https://www.googleapis.com/auth/bigtable.admin.table',
      'https://www.googleapis.com/auth/cloud-bigtable.admin',
      'https://www.googleapis.com/auth/cloud-bigtable.admin.cluster',
      'https://www.googleapis.com/auth/cloud-bigtable.admin.table',
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/cloud-platform.read-only',
    ];
  }

  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(callback) {
    return this.auth.getProjectId(callback);
  }

  // -------------------
  // -- Service calls --
  // -------------------

  /**
   * Creates a new table in the specified instance.
   * The table can be created with a full set of initial column families,
   * specified in the request.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the instance in which to create the table.
   *   Values are of the form `projects/<project>/instances/<instance>`.
   * @param {string} request.tableId
   *   The name by which the new table should be referred to within the parent
   *   instance, e.g., `foobar` rather than `<parent>/tables/foobar`.
   * @param {Object} request.table
   *   The Table to create.
   *
   *   This object should have the same structure as [Table]{@link google.bigtable.admin.v2.Table}
   * @param {Object[]} [request.initialSplits]
   *   The optional list of row keys that will be used to initially split the
   *   table into several tablets (tablets are similar to HBase regions).
   *   Given two split keys, `s1` and `s2`, three tablets will be created,
   *   spanning the key ranges: `[, s1), [s1, s2), [s2, )`.
   *
   *   Example:
   *
   *   * Row keys := `["a", "apple", "custom", "customer_1", "customer_2",`
   *                  `"other", "zz"]`
   *   * initial_split_keys := `["apple", "customer_1", "customer_2", "other"]`
   *   * Key assignment:
   *       - Tablet 1 `[, apple)                => {"a"}.`
   *       - Tablet 2 `[apple, customer_1)      => {"apple", "custom"}.`
   *       - Tablet 3 `[customer_1, customer_2) => {"customer_1"}.`
   *       - Tablet 4 `[customer_2, other)      => {"customer_2"}.`
   *       - Tablet 5 `[other, )                => {"other", "zz"}.`
   *
   *   This object should have the same structure as [Split]{@link google.bigtable.admin.v2.Split}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Table]{@link google.bigtable.admin.v2.Table}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Table]{@link google.bigtable.admin.v2.Table}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   * var tableId = '';
   * var table = {};
   * var request = {
   *   parent: formattedParent,
   *   tableId: tableId,
   *   table: table,
   * };
   * client.createTable(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  createTable(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent,
    });

    return this._innerApiCalls.createTable(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable snapshots. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Creates a new table from the specified snapshot. The target table must
   * not exist. The snapshot and the table must be in the same instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the instance in which to create the table.
   *   Values are of the form `projects/<project>/instances/<instance>`.
   * @param {string} request.tableId
   *   The name by which the new table should be referred to within the parent
   *   instance, e.g., `foobar` rather than `<parent>/tables/foobar`.
   * @param {string} request.sourceSnapshot
   *   The unique name of the snapshot from which to restore the table. The
   *   snapshot and the table must be in the same instance.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/<cluster>/snapshots/<snapshot>`.
   * @param {Object} [options]
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
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   * var tableId = '';
   * var sourceSnapshot = '';
   * var request = {
   *   parent: formattedParent,
   *   tableId: tableId,
   *   sourceSnapshot: sourceSnapshot,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.createTableFromSnapshot(request)
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
   *
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   * var tableId = '';
   * var sourceSnapshot = '';
   * var request = {
   *   parent: formattedParent,
   *   tableId: tableId,
   *   sourceSnapshot: sourceSnapshot,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.createTableFromSnapshot(request)
   *   .then(responses => {
   *     var operation = responses[0];
   *     var initialApiResponse = responses[1];
   *
   *     // Adding a listener for the "complete" event starts polling for the
   *     // completion of the operation.
   *     operation.on('complete', (result, metadata, finalApiResponse) => {
   *       // doSomethingWith(result);
   *     });
   *
   *     // Adding a listener for the "progress" event causes the callback to be
   *     // called on any change in metadata when the operation is polled.
   *     operation.on('progress', (metadata, apiResponse) => {
   *       // doSomethingWith(metadata)
   *     });
   *
   *     // Adding a listener for the "error" event handles any errors found during polling.
   *     operation.on('error', err => {
   *       // throw(err);
   *     });
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  createTableFromSnapshot(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent,
    });

    return this._innerApiCalls.createTableFromSnapshot(
      request,
      options,
      callback
    );
  }

  /**
   * Lists all tables served from a specified instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the instance for which tables should be listed.
   *   Values are of the form `projects/<project>/instances/<instance>`.
   * @param {number} [request.view]
   *   The view to be applied to the returned tables' fields.
   *   Defaults to `NAME_ONLY` if unspecified; no others are currently supported.
   *
   *   The number should be among the values of [View]{@link google.bigtable.admin.v2.View}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Array, ?Object, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is Array of [Table]{@link google.bigtable.admin.v2.Table}.
   *
   *   When autoPaginate: false is specified through options, it contains the result
   *   in a single response. If the response indicates the next page exists, the third
   *   parameter is set to be used for the next request object. The fourth parameter keeps
   *   the raw response object of an object representing [ListTablesResponse]{@link google.bigtable.admin.v2.ListTablesResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [Table]{@link google.bigtable.admin.v2.Table}.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [Table]{@link google.bigtable.admin.v2.Table} in a single response.
   *   The second element is the next request object if the response
   *   indicates the next page exists, or null. The third element is
   *   an object representing [ListTablesResponse]{@link google.bigtable.admin.v2.ListTablesResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * // Iterate over all elements.
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   *
   * client.listTables({parent: formattedParent})
   *   .then(responses => {
   *     var resources = responses[0];
   *     for (let i = 0; i < resources.length; i += 1) {
   *       // doThingsWith(resources[i])
   *     }
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   *
   * // Or obtain the paged response.
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   *
   *
   * var options = {autoPaginate: false};
   * var callback = responses => {
   *   // The actual resources in a response.
   *   var resources = responses[0];
   *   // The next request if the response shows that there are more responses.
   *   var nextRequest = responses[1];
   *   // The actual response object, if necessary.
   *   // var rawResponse = responses[2];
   *   for (let i = 0; i < resources.length; i += 1) {
   *     // doThingsWith(resources[i]);
   *   }
   *   if (nextRequest) {
   *     // Fetch the next page.
   *     return client.listTables(nextRequest, options).then(callback);
   *   }
   * }
   * client.listTables({parent: formattedParent}, options)
   *   .then(callback)
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  listTables(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent,
    });

    return this._innerApiCalls.listTables(request, options, callback);
  }

  /**
   * Equivalent to {@link listTables}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listTables} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the instance for which tables should be listed.
   *   Values are of the form `projects/<project>/instances/<instance>`.
   * @param {number} [request.view]
   *   The view to be applied to the returned tables' fields.
   *   Defaults to `NAME_ONLY` if unspecified; no others are currently supported.
   *
   *   The number should be among the values of [View]{@link google.bigtable.admin.v2.View}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @returns {Stream}
   *   An object stream which emits an object representing [Table]{@link google.bigtable.admin.v2.Table} on 'data' event.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   * client.listTablesStream({parent: formattedParent})
   *   .on('data', element => {
   *     // doThingsWith(element)
   *   }).on('error', err => {
   *     console.log(err);
   *   });
   */
  listTablesStream(request, options) {
    options = options || {};

    return this._descriptors.page.listTables.createStream(
      this._innerApiCalls.listTables,
      request,
      options
    );
  }

  /**
   * Gets metadata information about the specified table.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the requested table.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {number} [request.view]
   *   The view to be applied to the returned table's fields.
   *   Defaults to `SCHEMA_VIEW` if unspecified.
   *
   *   The number should be among the values of [View]{@link google.bigtable.admin.v2.View}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Table]{@link google.bigtable.admin.v2.Table}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Table]{@link google.bigtable.admin.v2.Table}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * client.getTable({name: formattedName})
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getTable(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.getTable(request, options, callback);
  }

  /**
   * Permanently deletes a specified table and all of its data.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the table to be deleted.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error)} [callback]
   *   The function which will be called with the result of the API call.
   * @returns {Promise} - The promise which resolves when API call finishes.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * client.deleteTable({name: formattedName}).catch(err => {
   *   console.error(err);
   * });
   */
  deleteTable(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.deleteTable(request, options, callback);
  }

  /**
   * Performs a series of column family modifications on the specified table.
   * Either all or none of the modifications will occur before this method
   * returns, but data requests received prior to that point may see a table
   * where only some modifications have taken effect.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the table whose families should be modified.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {Object[]} request.modifications
   *   Modifications to be atomically applied to the specified table's families.
   *   Entries are applied in order, meaning that earlier modifications can be
   *   masked by later ones (in the case of repeated updates to the same family,
   *   for example).
   *
   *   This object should have the same structure as [Modification]{@link google.bigtable.admin.v2.Modification}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Table]{@link google.bigtable.admin.v2.Table}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Table]{@link google.bigtable.admin.v2.Table}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * var modifications = [];
   * var request = {
   *   name: formattedName,
   *   modifications: modifications,
   * };
   * client.modifyColumnFamilies(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  modifyColumnFamilies(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.modifyColumnFamilies(request, options, callback);
  }

  /**
   * Permanently drop/delete a row range from a specified table. The request can
   * specify whether to delete all rows in a table, or only those that match a
   * particular prefix.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the table on which to drop a range of rows.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {string} [request.rowKeyPrefix]
   *   Delete all rows that start with this row key prefix. Prefix cannot be
   *   zero length.
   * @param {boolean} [request.deleteAllDataFromTable]
   *   Delete all rows in the table. Setting this to false is a no-op.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error)} [callback]
   *   The function which will be called with the result of the API call.
   * @returns {Promise} - The promise which resolves when API call finishes.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * client.dropRowRange({name: formattedName}).catch(err => {
   *   console.error(err);
   * });
   */
  dropRowRange(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.dropRowRange(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable replication. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Generates a consistency token for a Table, which can be used in
   * CheckConsistency to check whether mutations to the table that finished
   * before this call started have been replicated. The tokens will be available
   * for 90 days.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the Table for which to create a consistency token.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [GenerateConsistencyTokenResponse]{@link google.bigtable.admin.v2.GenerateConsistencyTokenResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [GenerateConsistencyTokenResponse]{@link google.bigtable.admin.v2.GenerateConsistencyTokenResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * client.generateConsistencyToken({name: formattedName})
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  generateConsistencyToken(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.generateConsistencyToken(
      request,
      options,
      callback
    );
  }

  /**
   * This is a private alpha release of Cloud Bigtable replication. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Checks replication consistency based on a consistency token, that is, if
   * replication has caught up based on the conditions specified in the token
   * and the check request.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the Table for which to check replication consistency.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {string} request.consistencyToken
   *   The token created using GenerateConsistencyToken for the Table.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [CheckConsistencyResponse]{@link google.bigtable.admin.v2.CheckConsistencyResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [CheckConsistencyResponse]{@link google.bigtable.admin.v2.CheckConsistencyResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * var consistencyToken = '';
   * var request = {
   *   name: formattedName,
   *   consistencyToken: consistencyToken,
   * };
   * client.checkConsistency(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  checkConsistency(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.checkConsistency(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable snapshots. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Creates a new snapshot in the specified cluster from the specified
   * source table. The cluster and the table must be in the same instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the table to have the snapshot taken.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {string} request.cluster
   *   The name of the cluster where the snapshot will be created in.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/<cluster>`.
   * @param {string} request.snapshotId
   *   The ID by which the new snapshot should be referred to within the parent
   *   cluster, e.g., `mysnapshot` of the form: `[_a-zA-Z0-9][-_.a-zA-Z0-9]*`
   *   rather than
   *   `projects/<project>/instances/<instance>/clusters/<cluster>/snapshots/mysnapshot`.
   * @param {string} request.description
   *   Description of the snapshot.
   * @param {Object} [request.ttl]
   *   The amount of time that the new snapshot can stay active after it is
   *   created. Once 'ttl' expires, the snapshot will get deleted. The maximum
   *   amount of time a snapshot can stay active is 7 days. If 'ttl' is not
   *   specified, the default value of 24 hours will be used.
   *
   *   This object should have the same structure as [Duration]{@link google.protobuf.Duration}
   * @param {Object} [options]
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
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * var cluster = '';
   * var snapshotId = '';
   * var description = '';
   * var request = {
   *   name: formattedName,
   *   cluster: cluster,
   *   snapshotId: snapshotId,
   *   description: description,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.snapshotTable(request)
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
   *
   * var formattedName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * var cluster = '';
   * var snapshotId = '';
   * var description = '';
   * var request = {
   *   name: formattedName,
   *   cluster: cluster,
   *   snapshotId: snapshotId,
   *   description: description,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.snapshotTable(request)
   *   .then(responses => {
   *     var operation = responses[0];
   *     var initialApiResponse = responses[1];
   *
   *     // Adding a listener for the "complete" event starts polling for the
   *     // completion of the operation.
   *     operation.on('complete', (result, metadata, finalApiResponse) => {
   *       // doSomethingWith(result);
   *     });
   *
   *     // Adding a listener for the "progress" event causes the callback to be
   *     // called on any change in metadata when the operation is polled.
   *     operation.on('progress', (metadata, apiResponse) => {
   *       // doSomethingWith(metadata)
   *     });
   *
   *     // Adding a listener for the "error" event handles any errors found during polling.
   *     operation.on('error', err => {
   *       // throw(err);
   *     });
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  snapshotTable(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.snapshotTable(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable snapshots. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Gets metadata information about the specified snapshot.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the requested snapshot.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/<cluster>/snapshots/<snapshot>`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Snapshot]{@link google.bigtable.admin.v2.Snapshot}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Snapshot]{@link google.bigtable.admin.v2.Snapshot}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.snapshotPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]', '[SNAPSHOT]');
   * client.getSnapshot({name: formattedName})
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getSnapshot(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.getSnapshot(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable snapshots. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Lists all snapshots associated with the specified cluster.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the cluster for which snapshots should be listed.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/<cluster>`.
   *   Use `<cluster> = '-'` to list snapshots for all clusters in an instance,
   *   e.g., `projects/<project>/instances/<instance>/clusters/-`.
   * @param {number} [request.pageSize]
   *   The maximum number of resources contained in the underlying API
   *   response. If page streaming is performed per-resource, this
   *   parameter does not affect the return value. If page streaming is
   *   performed per-page, this determines the maximum number of
   *   resources in a page.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Array, ?Object, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is Array of [Snapshot]{@link google.bigtable.admin.v2.Snapshot}.
   *
   *   When autoPaginate: false is specified through options, it contains the result
   *   in a single response. If the response indicates the next page exists, the third
   *   parameter is set to be used for the next request object. The fourth parameter keeps
   *   the raw response object of an object representing [ListSnapshotsResponse]{@link google.bigtable.admin.v2.ListSnapshotsResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [Snapshot]{@link google.bigtable.admin.v2.Snapshot}.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [Snapshot]{@link google.bigtable.admin.v2.Snapshot} in a single response.
   *   The second element is the next request object if the response
   *   indicates the next page exists, or null. The third element is
   *   an object representing [ListSnapshotsResponse]{@link google.bigtable.admin.v2.ListSnapshotsResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * // Iterate over all elements.
   * var formattedParent = client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
   *
   * client.listSnapshots({parent: formattedParent})
   *   .then(responses => {
   *     var resources = responses[0];
   *     for (let i = 0; i < resources.length; i += 1) {
   *       // doThingsWith(resources[i])
   *     }
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   *
   * // Or obtain the paged response.
   * var formattedParent = client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
   *
   *
   * var options = {autoPaginate: false};
   * var callback = responses => {
   *   // The actual resources in a response.
   *   var resources = responses[0];
   *   // The next request if the response shows that there are more responses.
   *   var nextRequest = responses[1];
   *   // The actual response object, if necessary.
   *   // var rawResponse = responses[2];
   *   for (let i = 0; i < resources.length; i += 1) {
   *     // doThingsWith(resources[i]);
   *   }
   *   if (nextRequest) {
   *     // Fetch the next page.
   *     return client.listSnapshots(nextRequest, options).then(callback);
   *   }
   * }
   * client.listSnapshots({parent: formattedParent}, options)
   *   .then(callback)
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  listSnapshots(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent,
    });

    return this._innerApiCalls.listSnapshots(request, options, callback);
  }

  /**
   * Equivalent to {@link listSnapshots}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listSnapshots} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the cluster for which snapshots should be listed.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/<cluster>`.
   *   Use `<cluster> = '-'` to list snapshots for all clusters in an instance,
   *   e.g., `projects/<project>/instances/<instance>/clusters/-`.
   * @param {number} [request.pageSize]
   *   The maximum number of resources contained in the underlying API
   *   response. If page streaming is performed per-resource, this
   *   parameter does not affect the return value. If page streaming is
   *   performed per-page, this determines the maximum number of
   *   resources in a page.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @returns {Stream}
   *   An object stream which emits an object representing [Snapshot]{@link google.bigtable.admin.v2.Snapshot} on 'data' event.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
   * client.listSnapshotsStream({parent: formattedParent})
   *   .on('data', element => {
   *     // doThingsWith(element)
   *   }).on('error', err => {
   *     console.log(err);
   *   });
   */
  listSnapshotsStream(request, options) {
    options = options || {};

    return this._descriptors.page.listSnapshots.createStream(
      this._innerApiCalls.listSnapshots,
      request,
      options
    );
  }

  /**
   * This is a private alpha release of Cloud Bigtable snapshots. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Permanently deletes the specified snapshot.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the snapshot to be deleted.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/<cluster>/snapshots/<snapshot>`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error)} [callback]
   *   The function which will be called with the result of the API call.
   * @returns {Promise} - The promise which resolves when API call finishes.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableTableAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.snapshotPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]', '[SNAPSHOT]');
   * client.deleteSnapshot({name: formattedName}).catch(err => {
   *   console.error(err);
   * });
   */
  deleteSnapshot(request, options, callback) {
    if (options instanceof Function && callback === undefined) {
      callback = options;
      options = {};
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name,
    });

    return this._innerApiCalls.deleteSnapshot(request, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified instance resource name string.
   *
   * @param {String} project
   * @param {String} instance
   * @returns {String}
   */
  instancePath(project, instance) {
    return this._pathTemplates.instancePathTemplate.render({
      project: project,
      instance: instance,
    });
  }

  /**
   * Return a fully-qualified cluster resource name string.
   *
   * @param {String} project
   * @param {String} instance
   * @param {String} cluster
   * @returns {String}
   */
  clusterPath(project, instance, cluster) {
    return this._pathTemplates.clusterPathTemplate.render({
      project: project,
      instance: instance,
      cluster: cluster,
    });
  }

  /**
   * Return a fully-qualified snapshot resource name string.
   *
   * @param {String} project
   * @param {String} instance
   * @param {String} cluster
   * @param {String} snapshot
   * @returns {String}
   */
  snapshotPath(project, instance, cluster, snapshot) {
    return this._pathTemplates.snapshotPathTemplate.render({
      project: project,
      instance: instance,
      cluster: cluster,
      snapshot: snapshot,
    });
  }

  /**
   * Return a fully-qualified table resource name string.
   *
   * @param {String} project
   * @param {String} instance
   * @param {String} table
   * @returns {String}
   */
  tablePath(project, instance, table) {
    return this._pathTemplates.tablePathTemplate.render({
      project: project,
      instance: instance,
      table: table,
    });
  }

  /**
   * Parse the instanceName from a instance resource.
   *
   * @param {String} instanceName
   *   A fully-qualified path representing a instance resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromInstanceName(instanceName) {
    return this._pathTemplates.instancePathTemplate.match(instanceName).project;
  }

  /**
   * Parse the instanceName from a instance resource.
   *
   * @param {String} instanceName
   *   A fully-qualified path representing a instance resources.
   * @returns {String} - A string representing the instance.
   */
  matchInstanceFromInstanceName(instanceName) {
    return this._pathTemplates.instancePathTemplate.match(instanceName)
      .instance;
  }

  /**
   * Parse the clusterName from a cluster resource.
   *
   * @param {String} clusterName
   *   A fully-qualified path representing a cluster resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromClusterName(clusterName) {
    return this._pathTemplates.clusterPathTemplate.match(clusterName).project;
  }

  /**
   * Parse the clusterName from a cluster resource.
   *
   * @param {String} clusterName
   *   A fully-qualified path representing a cluster resources.
   * @returns {String} - A string representing the instance.
   */
  matchInstanceFromClusterName(clusterName) {
    return this._pathTemplates.clusterPathTemplate.match(clusterName).instance;
  }

  /**
   * Parse the clusterName from a cluster resource.
   *
   * @param {String} clusterName
   *   A fully-qualified path representing a cluster resources.
   * @returns {String} - A string representing the cluster.
   */
  matchClusterFromClusterName(clusterName) {
    return this._pathTemplates.clusterPathTemplate.match(clusterName).cluster;
  }

  /**
   * Parse the snapshotName from a snapshot resource.
   *
   * @param {String} snapshotName
   *   A fully-qualified path representing a snapshot resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromSnapshotName(snapshotName) {
    return this._pathTemplates.snapshotPathTemplate.match(snapshotName).project;
  }

  /**
   * Parse the snapshotName from a snapshot resource.
   *
   * @param {String} snapshotName
   *   A fully-qualified path representing a snapshot resources.
   * @returns {String} - A string representing the instance.
   */
  matchInstanceFromSnapshotName(snapshotName) {
    return this._pathTemplates.snapshotPathTemplate.match(snapshotName)
      .instance;
  }

  /**
   * Parse the snapshotName from a snapshot resource.
   *
   * @param {String} snapshotName
   *   A fully-qualified path representing a snapshot resources.
   * @returns {String} - A string representing the cluster.
   */
  matchClusterFromSnapshotName(snapshotName) {
    return this._pathTemplates.snapshotPathTemplate.match(snapshotName).cluster;
  }

  /**
   * Parse the snapshotName from a snapshot resource.
   *
   * @param {String} snapshotName
   *   A fully-qualified path representing a snapshot resources.
   * @returns {String} - A string representing the snapshot.
   */
  matchSnapshotFromSnapshotName(snapshotName) {
    return this._pathTemplates.snapshotPathTemplate.match(snapshotName)
      .snapshot;
  }

  /**
   * Parse the tableName from a table resource.
   *
   * @param {String} tableName
   *   A fully-qualified path representing a table resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromTableName(tableName) {
    return this._pathTemplates.tablePathTemplate.match(tableName).project;
  }

  /**
   * Parse the tableName from a table resource.
   *
   * @param {String} tableName
   *   A fully-qualified path representing a table resources.
   * @returns {String} - A string representing the instance.
   */
  matchInstanceFromTableName(tableName) {
    return this._pathTemplates.tablePathTemplate.match(tableName).instance;
  }

  /**
   * Parse the tableName from a table resource.
   *
   * @param {String} tableName
   *   A fully-qualified path representing a table resources.
   * @returns {String} - A string representing the table.
   */
  matchTableFromTableName(tableName) {
    return this._pathTemplates.tablePathTemplate.match(tableName).table;
  }
}

module.exports = BigtableTableAdminClient;
