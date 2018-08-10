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

const gapicConfig = require('./bigtable_client_config');
const gax = require('google-gax');
const merge = require('lodash.merge');
const path = require('path');

const VERSION = require('../../package.json').version;

/**
 * Service for reading from and writing to existing Bigtable tables.
 *
 * @class
 * @memberof v2
 */
class BigtableClient {
  /**
   * Construct an instance of BigtableClient.
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
      `gl-node/${process.version}`,
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
        'google/bigtable/v2/bigtable.proto'
      )
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      tablePathTemplate: new gax.PathTemplate(
        'projects/{project}/instances/{instance}/tables/{table}'
      ),
    };

    // Some of the methods on this service provide streaming responses.
    // Provide descriptors for these.
    this._descriptors.stream = {
      readRows: new gax.StreamDescriptor(gax.StreamType.SERVER_STREAMING),
      sampleRowKeys: new gax.StreamDescriptor(gax.StreamType.SERVER_STREAMING),
      mutateRows: new gax.StreamDescriptor(gax.StreamType.SERVER_STREAMING),
    };

    // Put together the default options sent with requests.
    var defaults = gaxGrpc.constructSettings(
      'google.bigtable.v2.Bigtable',
      gapicConfig,
      opts.clientConfig,
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.bigtable.v2.Bigtable.
    var bigtableStub = gaxGrpc.createStub(
      protos.google.bigtable.v2.Bigtable,
      opts
    );

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    var bigtableStubMethods = [
      'readRows',
      'sampleRowKeys',
      'mutateRow',
      'mutateRows',
      'checkAndMutateRow',
      'readModifyWriteRow',
    ];
    for (let methodName of bigtableStubMethods) {
      this._innerApiCalls[methodName] = gax.createApiCall(
        bigtableStub.then(
          stub =>
            function() {
              var args = Array.prototype.slice.call(arguments, 0);
              return stub[methodName].apply(stub, args);
            }
        ),
        defaults[methodName],
        this._descriptors.stream[methodName]
      );
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'bigtable.googleapis.com';
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
      'https://www.googleapis.com/auth/bigtable.data',
      'https://www.googleapis.com/auth/bigtable.data.readonly',
      'https://www.googleapis.com/auth/cloud-bigtable.data',
      'https://www.googleapis.com/auth/cloud-bigtable.data.readonly',
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
   * Streams back the contents of all requested rows in key order, optionally
   * applying the same Reader filter to each. Depending on their size,
   * rows and cells may be broken up across multiple responses, but
   * atomicity of each row will still be preserved. See the
   * ReadRowsResponse documentation for details.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.tableName
   *   The unique name of the table from which to read.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {string} [request.appProfileId]
   *   This value specifies routing for replication. If not specified, the
   *   "default" application profile will be used.
   * @param {Object} [request.rows]
   *   The row keys and/or ranges to read. If not specified, reads from all rows.
   *
   *   This object should have the same structure as [RowSet]{@link google.bigtable.v2.RowSet}
   * @param {Object} [request.filter]
   *   The filter to apply to the contents of the specified row(s). If unset,
   *   reads the entirety of each row.
   *
   *   This object should have the same structure as [RowFilter]{@link google.bigtable.v2.RowFilter}
   * @param {number} [request.rowsLimit]
   *   The read will terminate after committing to N rows' worth of results. The
   *   default (zero) is to return all results.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @returns {Stream}
   *   An object stream which emits [ReadRowsResponse]{@link google.bigtable.v2.ReadRowsResponse} on 'data' event.
   *
   * @example
   *
   * const bigtable = require('@google-cloud/bigtable');
   *
   * var client = new bigtable.v2.BigtableClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedTableName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * client.readRows({tableName: formattedTableName}).on('data', response => {
   *   // doThingsWith(response)
   * });
   */
  readRows(request, options) {
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      table_name: request.tableName,
    });

    return this._innerApiCalls.readRows(request, options);
  }

  /**
   * Returns a sample of row keys in the table. The returned row keys will
   * delimit contiguous sections of the table of approximately equal size,
   * which can be used to break up the data for distributed tasks like
   * mapreduces.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.tableName
   *   The unique name of the table from which to sample row keys.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {string} [request.appProfileId]
   *   This value specifies routing for replication. If not specified, the
   *   "default" application profile will be used.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @returns {Stream}
   *   An object stream which emits [SampleRowKeysResponse]{@link google.bigtable.v2.SampleRowKeysResponse} on 'data' event.
   *
   * @example
   *
   * const bigtable = require('@google-cloud/bigtable');
   *
   * var client = new bigtable.v2.BigtableClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedTableName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * client.sampleRowKeys({tableName: formattedTableName}).on('data', response => {
   *   // doThingsWith(response)
   * });
   */
  sampleRowKeys(request, options) {
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      table_name: request.tableName,
    });

    return this._innerApiCalls.sampleRowKeys(request, options);
  }

  /**
   * Mutates a row atomically. Cells already present in the row are left
   * unchanged unless explicitly changed by `mutation`.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.tableName
   *   The unique name of the table to which the mutation should be applied.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {string} request.rowKey
   *   The key of the row to which the mutation should be applied.
   * @param {Object[]} request.mutations
   *   Changes to be atomically applied to the specified row. Entries are applied
   *   in order, meaning that earlier mutations can be masked by later ones.
   *   Must contain at least one entry and at most 100000.
   *
   *   This object should have the same structure as [Mutation]{@link google.bigtable.v2.Mutation}
   * @param {string} [request.appProfileId]
   *   This value specifies routing for replication. If not specified, the
   *   "default" application profile will be used.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [MutateRowResponse]{@link google.bigtable.v2.MutateRowResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [MutateRowResponse]{@link google.bigtable.v2.MutateRowResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const bigtable = require('@google-cloud/bigtable');
   *
   * var client = new bigtable.v2.BigtableClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedTableName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * var rowKey = '';
   * var mutations = [];
   * var request = {
   *   tableName: formattedTableName,
   *   rowKey: rowKey,
   *   mutations: mutations,
   * };
   * client.mutateRow(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  mutateRow(request, options, callback) {
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
      table_name: request.tableName,
    });

    return this._innerApiCalls.mutateRow(request, options, callback);
  }

  /**
   * Mutates multiple rows in a batch. Each individual row is mutated
   * atomically as in MutateRow, but the entire batch is not executed
   * atomically.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.tableName
   *   The unique name of the table to which the mutations should be applied.
   * @param {Object[]} request.entries
   *   The row keys and corresponding mutations to be applied in bulk.
   *   Each entry is applied as an atomic mutation, but the entries may be
   *   applied in arbitrary order (even between entries for the same row).
   *   At least one entry must be specified, and in total the entries can
   *   contain at most 100000 mutations.
   *
   *   This object should have the same structure as [Entry]{@link google.bigtable.v2.Entry}
   * @param {string} [request.appProfileId]
   *   This value specifies routing for replication. If not specified, the
   *   "default" application profile will be used.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @returns {Stream}
   *   An object stream which emits [MutateRowsResponse]{@link google.bigtable.v2.MutateRowsResponse} on 'data' event.
   *
   * @example
   *
   * const bigtable = require('@google-cloud/bigtable');
   *
   * var client = new bigtable.v2.BigtableClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedTableName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * var entries = [];
   * var request = {
   *   tableName: formattedTableName,
   *   entries: entries,
   * };
   * client.mutateRows(request).on('data', response => {
   *   // doThingsWith(response)
   * });
   */
  mutateRows(request, options) {
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      table_name: request.tableName,
    });

    return this._innerApiCalls.mutateRows(request, options);
  }

  /**
   * Mutates a row atomically based on the output of a predicate Reader filter.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.tableName
   *   The unique name of the table to which the conditional mutation should be
   *   applied.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {string} request.rowKey
   *   The key of the row to which the conditional mutation should be applied.
   * @param {string} [request.appProfileId]
   *   This value specifies routing for replication. If not specified, the
   *   "default" application profile will be used.
   * @param {Object} [request.predicateFilter]
   *   The filter to be applied to the contents of the specified row. Depending
   *   on whether or not any results are yielded, either `true_mutations` or
   *   `false_mutations` will be executed. If unset, checks that the row contains
   *   any values at all.
   *
   *   This object should have the same structure as [RowFilter]{@link google.bigtable.v2.RowFilter}
   * @param {Object[]} [request.trueMutations]
   *   Changes to be atomically applied to the specified row if `predicate_filter`
   *   yields at least one cell when applied to `row_key`. Entries are applied in
   *   order, meaning that earlier mutations can be masked by later ones.
   *   Must contain at least one entry if `false_mutations` is empty, and at most
   *   100000.
   *
   *   This object should have the same structure as [Mutation]{@link google.bigtable.v2.Mutation}
   * @param {Object[]} [request.falseMutations]
   *   Changes to be atomically applied to the specified row if `predicate_filter`
   *   does not yield any cells when applied to `row_key`. Entries are applied in
   *   order, meaning that earlier mutations can be masked by later ones.
   *   Must contain at least one entry if `true_mutations` is empty, and at most
   *   100000.
   *
   *   This object should have the same structure as [Mutation]{@link google.bigtable.v2.Mutation}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [CheckAndMutateRowResponse]{@link google.bigtable.v2.CheckAndMutateRowResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [CheckAndMutateRowResponse]{@link google.bigtable.v2.CheckAndMutateRowResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const bigtable = require('@google-cloud/bigtable');
   *
   * var client = new bigtable.v2.BigtableClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedTableName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * var rowKey = '';
   * var request = {
   *   tableName: formattedTableName,
   *   rowKey: rowKey,
   * };
   * client.checkAndMutateRow(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  checkAndMutateRow(request, options, callback) {
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
      table_name: request.tableName,
    });

    return this._innerApiCalls.checkAndMutateRow(request, options, callback);
  }

  /**
   * Modifies a row atomically on the server. The method reads the latest
   * existing timestamp and value from the specified columns and writes a new
   * entry based on pre-defined read/modify/write rules. The new value for the
   * timestamp is the greater of the existing timestamp or the current server
   * time. The method returns the new contents of all modified cells.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.tableName
   *   The unique name of the table to which the read/modify/write rules should be
   *   applied.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>/tables/<table>`.
   * @param {string} request.rowKey
   *   The key of the row to which the read/modify/write rules should be applied.
   * @param {Object[]} request.rules
   *   Rules specifying how the specified row's contents are to be transformed
   *   into writes. Entries are applied in order, meaning that earlier rules will
   *   affect the results of later ones.
   *
   *   This object should have the same structure as [ReadModifyWriteRule]{@link google.bigtable.v2.ReadModifyWriteRule}
   * @param {string} [request.appProfileId]
   *   This value specifies routing for replication. If not specified, the
   *   "default" application profile will be used.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [ReadModifyWriteRowResponse]{@link google.bigtable.v2.ReadModifyWriteRowResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ReadModifyWriteRowResponse]{@link google.bigtable.v2.ReadModifyWriteRowResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const bigtable = require('@google-cloud/bigtable');
   *
   * var client = new bigtable.v2.BigtableClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedTableName = client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
   * var rowKey = '';
   * var rules = [];
   * var request = {
   *   tableName: formattedTableName,
   *   rowKey: rowKey,
   *   rules: rules,
   * };
   * client.readModifyWriteRow(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  readModifyWriteRow(request, options, callback) {
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
      table_name: request.tableName,
    });

    return this._innerApiCalls.readModifyWriteRow(request, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

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

module.exports = BigtableClient;
