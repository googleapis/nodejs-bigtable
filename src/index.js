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

const arrify = require('arrify');
const common = require('@google-cloud/common-grpc');
const extend = require('extend');
const GrpcService = require('@google-cloud/common-grpc').Service;
const {GoogleAuth} = require('google-auth-library');
const gax = require('google-gax');
const grpc = new gax.GrpcClient().grpc;
const is = require('is');
const retryRequest = require('retry-request');
const streamEvents = require('stream-events');
const through = require('through2');

const AppProfile = require('./app-profile');
const Cluster = require('./cluster');
const Instance = require('./instance');

const PKG = require('../package.json');
const v2 = require('./v2');

/**
 * @typedef {object} ClientConfig
 * @property {string} [apiEndpoint] Override the default API endpoint used
 *     to reach Bigtable. This is useful for connecting to your local Bigtable
 *     emulator.
 * @property {string} [projectId] The project ID from the Google Developer's
 *     Console, e.g. 'grape-spaceship-123'. We will also check the environment
 *     variable `GCLOUD_PROJECT` for your project ID. If your app is running in
 *     an environment which supports {@link https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application Application Default Credentials},
 *     your project ID will be detected automatically.
 * @property {string} [keyFilename] Full path to the a .json, .pem, or .p12 key
 *     downloaded from the Google Developers Console. If you provide a path to a
 *     JSON file, the `projectId` option above is not necessary. NOTE: .pem and
 *     .p12 require you to specify the `email` option as well.
 * @property {string} [appProfileId] An application profile ID, a configuration
 *     string value describing how Cloud Bigtable should treat traffic from a
 *     particular end user application.
 * @property {string} [email] Account email address. Required when using a .pem
 *     or .p12 keyFilename.
 * @property {object} [credentials] Credentials object.
 * @property {string} [credentials.client_email]
 * @property {string} [credentials.private_key]
 * @property {boolean} [autoRetry=true] Automatically retry requests if the
 *     response is related to rate limits or certain intermittent server errors.
 *     We will exponentially backoff subsequent requests by default.
 * @property {number} [maxRetries=3] Maximum number of automatic retries
 *     attempted before returning the error.
 * @property {Constructor} [promise] Custom promise module to use instead of
 *     native Promises.
 */

/**
 * @see [Creating a Cloud Bigtable Cluster]{@link https://cloud.google.com/bigtable/docs/creating-instance}
 * @see [Cloud Bigtable Concepts Overview]{@link https://cloud.google.com/bigtable/docs/concepts}
 *
 * @class
 * @param {ClientConfig} [options] Configuration options.
 *
 * @example <caption>Create a client that uses <a href="https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application">Application Default Credentials (ADC)</a>:</caption>
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 *
 * @example <caption>Create a client with <a href="https://cloud.google.com/docs/authentication/production#obtaining_and_providing_service_account_credentials_manually">explicit credentials</a>:</caption>
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable({
 *   projectId: 'your-project-id',
 *   keyFilename: '/path/to/keyfile.json'
 * });
 *
 * @example
 * //<h4> The Bigtable Emulator</h4>
 * //
 * // Make sure you have the <a href="https://cloud.google.com/sdk/downloads">
 * // gcloud SDK installed</a>, then run:
 * //
 * // <pre>
 * //   $ gcloud beta emulators bigtable start
 * // </pre>
 * //
 * // Before running your Node.js app, set the environment variables that this
 * // library will look for to connect to the emulator:
 * //
 * // <pre>
 * //   $ $(gcloud beta emulators bigtable env-init)
 * // </pre>
 * //-
 *
 * //-
 * // <h4>Creating a Bigtable Instance and Cluster</h4>
 * //
 * // Before you create your table, you first need to create a Bigtable Instance
 * // and cluster for the table to be served from.
 * //-
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 *
 * const callback = function(err, instance, operation) {
 *   operation
 *     .on('error', console.log)
 *     .on('complete', function() {
 *       // `instance` is your newly created Instance object.
 *     });
 * };
 *
 * const instance = bigtable.instance('my-instance');
 *
 * instance.create({
 *   clusters: [
 *     {
 *       id: 'my-cluster',
 *       location: 'us-central1-b',
 *       nodes: 3
 *     }
 *   ]
 * }, callback);
 *
 * //-
 * // This can also be done from either the Google Cloud Platform Console or the
 * // `gcloud` cli tool. Please refer to the
 * // <a href="https://cloud.google.com/bigtable/docs/creating-instance">
 * // official Bigtable documentation</a> for more information.
 * //-
 *
 * //-
 * // <h4>Creating Tables</h4>
 * //
 * // After creating your instance and enabling the Bigtable APIs, you are now
 * // ready to create your table with {@link Instance#createTable}.
 * //-
 * instance.createTable('prezzy', function(err, table) {
 *   // `table` is your newly created Table object.
 * });
 *
 * //-
 * // <h4>Creating Column Families</h4>
 * //
 * // Column families are used to group together various pieces of data within
 * // your table. You can think of column families as a mechanism to categorize
 * // all of your data.
 * //
 * // We can create a column family with {@link Table#createFamily}.
 * //-
 * const table = instance.table('prezzy');
 *
 * table.createFamily('follows', function(err, family) {
 *   // `family` is your newly created Family object.
 * });
 *
 * //-
 * // It is also possible to create your column families when creating a new
 * // table.
 * //-
 * const options = {
 *   families: ['follows']
 * };
 *
 * instance.createTable('prezzy', options, function(err, table) {});
 *
 * //-
 * // <h4>Creating Rows</h4>
 * //
 * // New rows can be created within your table using
 * // {@link Table#insert}. You must provide a unique key for each row
 * // to be inserted, this key can then be used to retrieve your row at a later
 * // time.
 * //
 * // With Bigtable, all columns have a unique id composed of a column family
 * // and a column qualifier. In the example below `follows` is the column
 * // family and `tjefferson` is the column qualifier. Together they could be
 * // referred to as `follows:tjefferson`.
 * //-
 * const rows = [
 *   {
 *     key: 'wmckinley',
 *     data: {
 *       follows: {
 *         tjefferson: 1
 *       }
 *     }
 *   }
 * ];
 *
 * table.insert(rows, function(err) {
 *   if (!err) {
 *     // Your rows were successfully inserted.
 *   }
 * });
 *
 * //-
 * // <h4>Retrieving Rows</h4>
 * //
 * // If you're anticipating a large number of rows to be returned, we suggest
 * // using the {@link Table#getRows} streaming API.
 * //-
 * table.createReadStream()
 *   .on('error', console.error)
 *   .on('data', function(row) {
 *     // `row` is a Row object.
 *   });
 *
 * //-
 * // If you're not anticpating a large number of results, a callback mode
 * // is also available.
 * //-
 * const callback = function(err, rows) {
 *   // `rows` is an array of Row objects.
 * };
 *
 * table.getRows(callback);
 *
 * //-
 * // A range of rows can be retrieved by providing `start` and `end` row keys.
 * //-
 * const options = {
 *   start: 'gwashington',
 *   end: 'wmckinley'
 * };
 *
 * table.getRows(options, callback);
 *
 * //-
 * // Retrieve an individual row with {@link Row#get}.
 * //-
 * const row = table.row('alincoln');
 *
 * row.get(function(err) {
 *   // `row.data` is now populated.
 * });
 *
 * //-
 * // <h4>Accessing Row Data</h4>
 * //
 * // When retrieving rows, upon success the `row.data` property will be
 * // populated by an object. That object will contain additional objects
 * // for each family in your table that the row has data for.
 * //
 * // By default, when retrieving rows, each column qualifier will provide you
 * // with all previous versions of the data. So your `row.data` object could
 * // resemble the following.
 * //-
 * // {
 * //   follows: {
 * //     wmckinley: [
 * //       {
 * //         value: 1,
 * //         timestamp: 1466017315951
 * //       }, {
 * //         value: 2,
 * //         timestamp: 1458619200000
 * //       }
 * //     ]
 * //   }
 * // }
 *
 * //-
 * // The `timestamp` field can be used to order cells from newest to oldest.
 * // If you only wish to retrieve the most recent version of the data, you
 * // can specify the number of cells with a {@link Filter} object.
 * //-
 * const filter = [
 *   {
 *     column: {
 *       cellLimit: 1
 *     }
 *   }
 * ];
 *
 * table.getRows({
 *   filter: filter
 * }, callback);
 *
 * //-
 * // <h4>Deleting Row Data</h4>
 * //
 * // We can delete all of an individual row's cells using
 * // {@link Row#delete}.
 * //-
 * const callback = function(err) {
 *   if (!err) {
 *     // All cells for this row were deleted successfully.
 *   }
 * };
 *
 * row.delete(callback);
 *
 * //-
 * // To delete a specific set of cells, we can provide an array of
 * // column families and qualifiers.
 * //-
 * const cells = [
 *   'follows:gwashington',
 *   'traits'
 * ];
 *
 * row.delete(cells, callback);
 *
 * //-
 * // <h4>Deleting Rows</h4>
 * //
 * // If you wish to delete multiple rows entirely, we can do so with
 * // {@link Table#deleteRows}. You can provide this method with a
 * // row key prefix.
 * //-
 * const options = {
 *   prefix: 'gwash'
 * };
 *
 * table.deleteRows(options, function(err) {
 *   if (!err) {
 *     // Rows were deleted successfully.
 *   }
 * });
 *
 * //-
 * // If you omit the prefix, you can delete all rows in your table.
 * //-
 * table.deleteRows(function(err) {
 *   if (!err) {
 *     // All rows were deleted successfully.
 *   }
 * });
 */
class Bigtable {
  constructor(options) {
    options = common.util.normalizeArguments(this, options);

    // Determine what scopes are needed.
    // It is the union of the scopes on all three clients.
    let scopes = [];
    let clientClasses = [
      v2.BigtableClient,
      v2.BigtableInstanceAdminClient,
      v2.BigtableTableAdminClient,
    ];
    for (let clientClass of clientClasses) {
      for (let scope of clientClass.scopes) {
        if (!scopes.includes(scope)) {
          scopes.push(scope);
        }
      }
    }

    options = extend(
      {
        libName: 'gccl',
        libVersion: PKG.version,
        scopes,
        'grpc.max_send_message_length': -1,
        'grpc.max_receive_message_length': -1,
      },
      options
    );

    const defaultBaseUrl = 'bigtable.googleapis.com';
    const defaultAdminBaseUrl = 'bigtableadmin.googleapis.com';

    const customEndpoint =
      options.apiEndpoint || process.env.BIGTABLE_EMULATOR_HOST;
    this.customEndpoint = customEndpoint;

    let customEndpointBaseUrl;
    let customEndpointPort;

    if (customEndpoint) {
      const customEndpointParts = customEndpoint.split(':');
      customEndpointBaseUrl = customEndpointParts[0];
      customEndpointPort = customEndpointParts[1];
    }

    this.options = {
      BigtableClient: extend(
        {
          servicePath: customEndpoint ? customEndpointBaseUrl : defaultBaseUrl,
          port: customEndpoint ? parseInt(customEndpointPort, 10) : 443,
          sslCreds: customEndpoint
            ? grpc.credentials.createInsecure()
            : undefined,
        },
        options
      ),
      BigtableInstanceAdminClient: extend(
        {
          servicePath: customEndpoint
            ? customEndpointBaseUrl
            : defaultAdminBaseUrl,
          port: customEndpoint ? parseInt(customEndpointPort, 10) : 443,
          sslCreds: customEndpoint
            ? grpc.credentials.createInsecure()
            : undefined,
        },
        options
      ),
      BigtableTableAdminClient: extend(
        {
          servicePath: customEndpoint
            ? customEndpointBaseUrl
            : defaultAdminBaseUrl,
          port: customEndpoint ? parseInt(customEndpointPort, 10) : 443,
          sslCreds: customEndpoint
            ? grpc.credentials.createInsecure()
            : undefined,
        },
        options
      ),
    };

    this.api = {};
    this.auth = new GoogleAuth(options);
    this.projectId = options.projectId || '{{projectId}}';
    this.appProfileId = options.appProfileId;
    this.projectName = `projects/${this.projectId}`;
    this.shouldReplaceProjectIdToken = this.projectId === '{{projectId}}';
  }

  /**
   * Create a Cloud Bigtable instance.
   *
   * @see [Creating a Cloud Bigtable Instance]{@link https://cloud.google.com/bigtable/docs/creating-instance}
   *
   * @param {string} id The unique id of the instance.
   * @param {object} options Instance creation options.
   * @param {object[]} options.clusters The clusters to be created within the
   *     instance.
   * @param {string} options.displayName The descriptive name for this instance
   *     as it appears in UIs.
   * @param {Object.<string, string>} [options.labels] Labels are a flexible and
   *     lightweight mechanism for organizing cloud resources into groups that
   *     reflect a customer's organizational needs and deployment strategies.
   *     They can be used to filter resources and aggregate metrics.
   *
   *   * Label keys must be between 1 and 63 characters long and must conform to
   *     the regular expression: `[\p{Ll}\p{Lo}][\p{Ll}\p{Lo}\p{N}_-]{0,62}`.
   *   * Label values must be between 0 and 63 characters long and must conform to
   *     the regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`.
   *   * No more than 64 labels can be associated with a given resource.
   *   * Keys and values must both be under 128 bytes.
   * @param {string} [options.type] The type of the instance. Options are
   *     'production' or 'development'.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Instance} callback.instance The newly created
   *     instance.
   * @param {Operation} callback.operation An operation object that can be used
   *     to check the status of the request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   *
   * const callback = function(err, instance, operation, apiResponse) {
   *   if (err) {
   *     // Error handling omitted.
   *   }
   *
   *   operation
   *     .on('error', console.log)
   *     .on('complete', function() {
   *       // The instance was created successfully.
   *     });
   * };
   *
   * const options = {
   *   displayName: 'my-sweet-instance',
   *   labels: {env: 'prod'},
   *   clusters: [
   *     {
   *       id: 'my-sweet-cluster',
   *       nodes: 3,
   *       location: 'us-central1-b',
   *       storage: 'ssd'
   *     }
   *   ]
   * };
   *
   * bigtable.createInstance('my-instance', options, callback);
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * bigtable.createInstance('my-instance', options).then(function(data) {
   *   const instance = data[0];
   *   const operation = data[1];
   *   const apiResponse = data[2];
   * });
   */
  createInstance(id, options, callback) {
    if (is.function(options)) {
      callback = options;
      options = {};
    }

    const reqOpts = {
      parent: this.projectName,
      instanceId: id,
      instance: {
        displayName: options.displayName || id,
        labels: options.labels,
      },
    };

    if (options.type) {
      reqOpts.instance.type = Instance.getTypeType_(options.type);
    }

    reqOpts.clusters = arrify(options.clusters).reduce((clusters, cluster) => {
      clusters[cluster.id] = {
        location: Cluster.getLocation_(this.projectId, cluster.location),
        serveNodes: cluster.nodes,
        defaultStorageType: Cluster.getStorageType_(cluster.storage),
      };

      return clusters;
    }, {});

    this.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'createInstance',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (...args) => {
        const err = args[0];

        if (!err) {
          args.splice(1, 0, this.instance(id));
        }

        callback(...args);
      }
    );
  }

  /**
   * Get Instance objects for all of your Cloud Bigtable instances.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.error An error returned while making this request.
   * @param {Instance[]} callback.instances List of all
   *     instances.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   *
   * bigtable.getInstances(function(err, instances) {
   *   if (!err) {
   *     // `instances` is an array of Instance objects.
   *   }
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * bigtable.getInstances().then(function(data) {
   *   const instances = data[0];
   * });
   */
  getInstances(gaxOptions, callback) {
    if (is.function(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    const reqOpts = {
      parent: this.projectName,
    };

    this.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'listInstances',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      (err, resp) => {
        if (err) {
          callback(err);
          return;
        }

        const instances = resp.instances.map(instanceData => {
          const instance = this.instance(instanceData.name.split('/').pop());
          instance.metadata = instanceData;
          return instance;
        });

        callback(null, instances, resp);
      }
    );
  }

  /**
   * Get a reference to a Cloud Bigtable instance.
   *
   * @param {string} id The id of the instance.
   * @returns {Instance}
   */
  instance(name) {
    return new Instance(this, name);
  }

  /**
   * Funnel all API requests through this method, to be sure we have a project ID.
   *
   * @param {object} config Configuration object.
   * @param {object} config.gaxOpts GAX options.
   * @param {function} config.method The gax method to call.
   * @param {object} config.reqOpts Request options.
   * @param {function} [callback] Callback function.
   */
  request(config, callback) {
    const isStreamMode = !callback;

    let gaxStream;
    let stream;

    const prepareGaxRequest = callback => {
      this.getProjectId_((err, projectId) => {
        if (err) {
          callback(err);
          return;
        }

        let gaxClient = this.api[config.client];

        if (!gaxClient) {
          // Lazily instantiate client.
          gaxClient = new v2[config.client](this.options[config.client]);
          this.api[config.client] = gaxClient;
        }

        let reqOpts = extend(true, {}, config.reqOpts);

        if (this.shouldReplaceProjectIdToken && projectId !== '{{projectId}}') {
          reqOpts = common.util.replaceProjectIdToken(reqOpts, projectId);
        }

        const requestFn = gaxClient[config.method].bind(
          gaxClient,
          reqOpts,
          config.gaxOpts
        );

        callback(null, requestFn);
      });
    };

    if (isStreamMode) {
      stream = streamEvents(through.obj());

      stream.abort = () => {
        if (gaxStream && gaxStream.cancel) {
          gaxStream.cancel();
        }
      };

      stream.once('reading', makeRequestStream);

      return stream;
    } else {
      makeRequestCallback();
    }

    function makeRequestCallback() {
      prepareGaxRequest((err, requestFn) => {
        if (err) {
          callback(err);
          return;
        }

        requestFn(callback);
      });
    }

    function makeRequestStream() {
      prepareGaxRequest((err, requestFn) => {
        if (err) {
          stream.destroy(err);
          return;
        }

        // @TODO: remove `retry-request` when gax supports retryable streams.
        // https://github.com/googleapis/gax-nodejs/blob/ec0c8b0805c31d8a91ea69cb19fe50f42a38bf87/lib/streaming.js#L230
        const retryOpts = extend(
          {
            currentRetryAttempt: 0,
            noResponseRetries: 0,
            objectMode: true,
            shouldRetryFn: GrpcService.shouldRetryRequest_,
            request() {
              gaxStream = requestFn();
              return gaxStream;
            },
          },
          config.retryOpts
        );

        retryRequest(null, retryOpts)
          .on('error', stream.destroy.bind(stream))
          .on('request', stream.emit.bind(stream, 'request'))
          .pipe(stream);
      });
    }
  }

  /**
   * Determine and localize the project ID. If a user provides an ID, we bypass
   * checking with the auth client for an ID.
   *
   * @private
   *
   * @param {function} callback Callback function.
   * @param {?error} callback.err An error returned from the auth client.
   * @param {string} callback.projectId The detected project ID.
   */
  getProjectId_(callback) {
    const projectIdRequired =
      this.projectId === '{{projectId}}' && !this.customEndpoint;

    if (!projectIdRequired) {
      setImmediate(callback, null, this.projectId);
      return;
    }

    this.auth.getProjectId((err, projectId) => {
      if (err) {
        callback(err);
        return;
      }

      this.projectId = projectId;

      callback(null, this.projectId);
    });
  }
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Bigtable, {
  exclude: ['instance', 'operation', 'request'],
});

/**
 * {@link AppProfile} class.
 *
 * @name Bigtable.AppProfile
 * @see AppProfile
 * @type {Constructor}
 */
Bigtable.AppProfile = AppProfile;

/**
 * {@link Cluster} class.
 *
 * @name Bigtable.Cluster
 * @see Cluster
 * @type {Constructor}
 */
Bigtable.Cluster = Cluster;

/**
 * {@link Instance} class.
 *
 * @name Bigtable.Instance
 * @see Instance
 * @type {Constructor}
 */
Bigtable.Instance = Instance;

// Allow creating a `Bigtable` instance without using the `new` keyword.
// eslint-disable-next-line no-class-assign
Bigtable = new Proxy(Bigtable, {
  apply(target, thisArg, argumentsList) {
    return new target(...argumentsList);
  },
});

/**
 * The default export of the `@google-cloud/bigtable` package is the
 * {@link Bigtable} class.
 *
 * See {@link Bigtable} and {@link ClientConfig} for client methods and
 * configuration options.
 *
 * @module {constructor} @google-cloud/bigtable
 * @alias nodejs-bigtable
 *
 * @example <caption>Install the client library with <a href="https://www.npmjs.com/">npm</a>:</caption>
 * npm install --save @google-cloud/bigtable
 *
 * @example <caption>Import the client library</caption>
 * const Bigtable = require('@google-cloud/bigtable');
 *
 * @example <caption>Create a client that uses <a href="https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application">Application Default Credentials (ADC)</a>:</caption>
 * const bigtable = new Bigtable();
 *
 * @example <caption>Create a client with <a href="https://cloud.google.com/docs/authentication/production#obtaining_and_providing_service_account_credentials_manually">explicit credentials</a>:</caption>
 * const bigtable = new Bigtable({
 *   projectId: 'your-project-id',
 *   keyFilename: '/path/to/keyfile.json'
 * });
 *
 * @example <caption>include:samples/quickstart.js</caption>
 * region_tag:bigtable_quickstart
 * Full quickstart example:
 */

module.exports = Bigtable;
module.exports.v2 = v2;
