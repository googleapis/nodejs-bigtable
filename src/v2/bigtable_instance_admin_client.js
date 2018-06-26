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

const gapicConfig = require('./bigtable_instance_admin_client_config');
const gax = require('google-gax');
const merge = require('lodash.merge');
const path = require('path');
const protobuf = require('protobufjs');

const VERSION = require('../../package.json').version;

/**
 * Service for creating, configuring, and deleting Cloud Bigtable Instances and
 * Clusters. Provides access to the Instance and Cluster schemas only, not the
 * tables' metadata or data stored in those tables.
 *
 * @class
 * @memberof v2
 */
class BigtableInstanceAdminClient {
  /**
   * Construct an instance of BigtableInstanceAdminClient.
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
        'google/bigtable/admin/v2/bigtable_instance_admin.proto'
      )
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      projectPathTemplate: new gax.PathTemplate('projects/{project}'),
      instancePathTemplate: new gax.PathTemplate(
        'projects/{project}/instances/{instance}'
      ),
      appProfilePathTemplate: new gax.PathTemplate(
        'projects/{project}/instances/{instance}/appProfiles/{app_profile}'
      ),
      clusterPathTemplate: new gax.PathTemplate(
        'projects/{project}/instances/{instance}/clusters/{cluster}'
      ),
      locationPathTemplate: new gax.PathTemplate(
        'projects/{project}/locations/{location}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listAppProfiles: new gax.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'appProfiles'
      ),
    };
    var protoFilesRoot = new gax.GoogleProtoFilesRoot();
    protoFilesRoot = protobuf.loadSync(
      path.join(
        __dirname,
        '..',
        '..',
        'protos',
        'google/bigtable/admin/v2/bigtable_instance_admin.proto'
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

    var createInstanceResponse = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.Instance'
    );
    var createInstanceMetadata = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.CreateInstanceMetadata'
    );
    var partialUpdateInstanceResponse = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.Instance'
    );
    var partialUpdateInstanceMetadata = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.UpdateInstanceMetadata'
    );
    var createClusterResponse = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.Cluster'
    );
    var createClusterMetadata = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.CreateClusterMetadata'
    );
    var updateClusterResponse = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.Cluster'
    );
    var updateClusterMetadata = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.UpdateClusterMetadata'
    );
    var updateAppProfileResponse = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.AppProfile'
    );
    var updateAppProfileMetadata = protoFilesRoot.lookup(
      'google.bigtable.admin.v2.UpdateAppProfileMetadata'
    );

    this._descriptors.longrunning = {
      createInstance: new gax.LongrunningDescriptor(
        this.operationsClient,
        createInstanceResponse.decode.bind(createInstanceResponse),
        createInstanceMetadata.decode.bind(createInstanceMetadata)
      ),
      partialUpdateInstance: new gax.LongrunningDescriptor(
        this.operationsClient,
        partialUpdateInstanceResponse.decode.bind(
          partialUpdateInstanceResponse
        ),
        partialUpdateInstanceMetadata.decode.bind(partialUpdateInstanceMetadata)
      ),
      createCluster: new gax.LongrunningDescriptor(
        this.operationsClient,
        createClusterResponse.decode.bind(createClusterResponse),
        createClusterMetadata.decode.bind(createClusterMetadata)
      ),
      updateCluster: new gax.LongrunningDescriptor(
        this.operationsClient,
        updateClusterResponse.decode.bind(updateClusterResponse),
        updateClusterMetadata.decode.bind(updateClusterMetadata)
      ),
      updateAppProfile: new gax.LongrunningDescriptor(
        this.operationsClient,
        updateAppProfileResponse.decode.bind(updateAppProfileResponse),
        updateAppProfileMetadata.decode.bind(updateAppProfileMetadata)
      ),
    };

    // Put together the default options sent with requests.
    var defaults = gaxGrpc.constructSettings(
      'google.bigtable.admin.v2.BigtableInstanceAdmin',
      gapicConfig,
      opts.clientConfig,
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.bigtable.admin.v2.BigtableInstanceAdmin.
    var bigtableInstanceAdminStub = gaxGrpc.createStub(
      protos.google.bigtable.admin.v2.BigtableInstanceAdmin,
      opts
    );

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    var bigtableInstanceAdminStubMethods = [
      'createInstance',
      'getInstance',
      'listInstances',
      'updateInstance',
      'partialUpdateInstance',
      'deleteInstance',
      'createCluster',
      'getCluster',
      'listClusters',
      'updateCluster',
      'deleteCluster',
      'createAppProfile',
      'getAppProfile',
      'listAppProfiles',
      'updateAppProfile',
      'deleteAppProfile',
      'getIamPolicy',
      'setIamPolicy',
      'testIamPermissions',
    ];
    for (let methodName of bigtableInstanceAdminStubMethods) {
      this._innerApiCalls[methodName] = gax.createApiCall(
        bigtableInstanceAdminStub.then(
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
   * Create an instance within a project.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the project in which to create the new instance.
   *   Values are of the form `projects/<project>`.
   * @param {string} request.instanceId
   *   The ID to be used when referring to the new instance within its project,
   *   e.g., just `myinstance` rather than
   *   `projects/myproject/instances/myinstance`.
   * @param {Object} request.instance
   *   The instance to create.
   *   Fields marked `OutputOnly` must be left blank.
   *
   *   This object should have the same structure as [Instance]{@link google.bigtable.admin.v2.Instance}
   * @param {Object.<string, Object>} request.clusters
   *   The clusters to be created within the instance, mapped by desired
   *   cluster ID, e.g., just `mycluster` rather than
   *   `projects/myproject/instances/myinstance/clusters/mycluster`.
   *   Fields marked `OutputOnly` must be left blank.
   *   Currently exactly one cluster must be specified.
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
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.projectPath('[PROJECT]');
   * var instanceId = '';
   * var instance = {};
   * var clusters = {};
   * var request = {
   *   parent: formattedParent,
   *   instanceId: instanceId,
   *   instance: instance,
   *   clusters: clusters,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.createInstance(request)
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
   * var formattedParent = client.projectPath('[PROJECT]');
   * var instanceId = '';
   * var instance = {};
   * var clusters = {};
   * var request = {
   *   parent: formattedParent,
   *   instanceId: instanceId,
   *   instance: instance,
   *   clusters: clusters,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.createInstance(request)
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
  createInstance(request, options, callback) {
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

    return this._innerApiCalls.createInstance(request, options, callback);
  }

  /**
   * Gets information about an instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the requested instance. Values are of the form
   *   `projects/<project>/instances/<instance>`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Instance]{@link google.bigtable.admin.v2.Instance}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Instance]{@link google.bigtable.admin.v2.Instance}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
   * client.getInstance({name: formattedName})
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getInstance(request, options, callback) {
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

    return this._innerApiCalls.getInstance(request, options, callback);
  }

  /**
   * Lists information about instances in a project.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the project for which a list of instances is requested.
   *   Values are of the form `projects/<project>`.
   * @param {string} [request.pageToken]
   *   The value of `next_page_token` returned by a previous call.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [ListInstancesResponse]{@link google.bigtable.admin.v2.ListInstancesResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ListInstancesResponse]{@link google.bigtable.admin.v2.ListInstancesResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.projectPath('[PROJECT]');
   * client.listInstances({parent: formattedParent})
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  listInstances(request, options, callback) {
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

    return this._innerApiCalls.listInstances(request, options, callback);
  }

  /**
   * Updates an instance within a project.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   (`OutputOnly`)
   *   The unique name of the instance. Values are of the form
   *   `projects/<project>/instances/[a-z][a-z0-9\\-]+[a-z0-9]`.
   * @param {string} request.displayName
   *   The descriptive name for this instance as it appears in UIs.
   *   Can be changed at any time, but should be kept globally unique
   *   to avoid confusion.
   * @param {number} request.type
   *   The type of the instance. Defaults to `PRODUCTION`.
   *
   *   The number should be among the values of [Type]{@link google.bigtable.admin.v2.Type}
   * @param {Object.<string, string>} request.labels
   *   Labels are a flexible and lightweight mechanism for organizing cloud
   *   resources into groups that reflect a customer's organizational needs and
   *   deployment strategies. They can be used to filter resources and aggregate
   *   metrics.
   *
   *   * Label keys must be between 1 and 63 characters long and must conform to
   *     the regular expression: `[\p{Ll}\p{Lo}][\p{Ll}\p{Lo}\p{N}_-]{0,62}`.
   *   * Label values must be between 0 and 63 characters long and must conform to
   *     the regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`.
   *   * No more than 64 labels can be associated with a given resource.
   *   * Keys and values must both be under 128 bytes.
   * @param {number} [request.state]
   *   (`OutputOnly`)
   *   The current state of the instance.
   *
   *   The number should be among the values of [State]{@link google.bigtable.admin.v2.State}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Instance]{@link google.bigtable.admin.v2.Instance}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Instance]{@link google.bigtable.admin.v2.Instance}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
   * var displayName = '';
   * var type = 'TYPE_UNSPECIFIED';
   * var labels = {};
   * var request = {
   *   name: formattedName,
   *   displayName: displayName,
   *   type: type,
   *   labels: labels,
   * };
   * client.updateInstance(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  updateInstance(request, options, callback) {
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

    return this._innerApiCalls.updateInstance(request, options, callback);
  }

  /**
   * Partially updates an instance within a project.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {Object} request.instance
   *   The Instance which will (partially) replace the current value.
   *
   *   This object should have the same structure as [Instance]{@link google.bigtable.admin.v2.Instance}
   * @param {Object} request.updateMask
   *   The subset of Instance fields which should be replaced.
   *   Must be explicitly set.
   *
   *   This object should have the same structure as [FieldMask]{@link google.protobuf.FieldMask}
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
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var instance = {};
   * var updateMask = {};
   * var request = {
   *   instance: instance,
   *   updateMask: updateMask,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.partialUpdateInstance(request)
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
   * var instance = {};
   * var updateMask = {};
   * var request = {
   *   instance: instance,
   *   updateMask: updateMask,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.partialUpdateInstance(request)
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
  partialUpdateInstance(request, options, callback) {
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
      'instance.name': request.instance.name,
    });

    return this._innerApiCalls.partialUpdateInstance(
      request,
      options,
      callback
    );
  }

  /**
   * Delete an instance from a project.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the instance to be deleted.
   *   Values are of the form `projects/<project>/instances/<instance>`.
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
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
   * client.deleteInstance({name: formattedName}).catch(err => {
   *   console.error(err);
   * });
   */
  deleteInstance(request, options, callback) {
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

    return this._innerApiCalls.deleteInstance(request, options, callback);
  }

  /**
   * Creates a cluster within an instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the instance in which to create the new cluster.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>`.
   * @param {string} request.clusterId
   *   The ID to be used when referring to the new cluster within its instance,
   *   e.g., just `mycluster` rather than
   *   `projects/myproject/instances/myinstance/clusters/mycluster`.
   * @param {Object} request.cluster
   *   The cluster to be created.
   *   Fields marked `OutputOnly` must be left blank.
   *
   *   This object should have the same structure as [Cluster]{@link google.bigtable.admin.v2.Cluster}
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
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   * var clusterId = '';
   * var cluster = {};
   * var request = {
   *   parent: formattedParent,
   *   clusterId: clusterId,
   *   cluster: cluster,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.createCluster(request)
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
   * var clusterId = '';
   * var cluster = {};
   * var request = {
   *   parent: formattedParent,
   *   clusterId: clusterId,
   *   cluster: cluster,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.createCluster(request)
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
  createCluster(request, options, callback) {
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

    return this._innerApiCalls.createCluster(request, options, callback);
  }

  /**
   * Gets information about a cluster.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the requested cluster. Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/<cluster>`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Cluster]{@link google.bigtable.admin.v2.Cluster}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Cluster]{@link google.bigtable.admin.v2.Cluster}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
   * client.getCluster({name: formattedName})
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getCluster(request, options, callback) {
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

    return this._innerApiCalls.getCluster(request, options, callback);
  }

  /**
   * Lists information about clusters in an instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the instance for which a list of clusters is requested.
   *   Values are of the form `projects/<project>/instances/<instance>`.
   *   Use `<instance> = '-'` to list Clusters for all Instances in a project,
   *   e.g., `projects/myproject/instances/-`.
   * @param {string} [request.pageToken]
   *   The value of `next_page_token` returned by a previous call.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [ListClustersResponse]{@link google.bigtable.admin.v2.ListClustersResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ListClustersResponse]{@link google.bigtable.admin.v2.ListClustersResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   * client.listClusters({parent: formattedParent})
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  listClusters(request, options, callback) {
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

    return this._innerApiCalls.listClusters(request, options, callback);
  }

  /**
   * Updates a cluster within an instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   (`OutputOnly`)
   *   The unique name of the cluster. Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/[a-z][-a-z0-9]*`.
   * @param {string} request.location
   *   (`CreationOnly`)
   *   The location where this cluster's nodes and storage reside. For best
   *   performance, clients should be located as close as possible to this
   *   cluster. Currently only zones are supported, so values should be of the
   *   form `projects/<project>/locations/<zone>`.
   * @param {number} request.serveNodes
   *   The number of nodes allocated to this cluster. More nodes enable higher
   *   throughput and more consistent performance.
   * @param {number} [request.state]
   *   (`OutputOnly`)
   *   The current state of the cluster.
   *
   *   The number should be among the values of [State]{@link google.bigtable.admin.v2.State}
   * @param {number} [request.defaultStorageType]
   *   (`CreationOnly`)
   *   The type of storage used by this cluster to serve its
   *   parent instance's tables, unless explicitly overridden.
   *
   *   The number should be among the values of [StorageType]{@link google.bigtable.admin.v2.StorageType}
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
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
   * var location = '';
   * var serveNodes = 0;
   * var request = {
   *   name: formattedName,
   *   location: location,
   *   serveNodes: serveNodes,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.updateCluster(request)
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
   * var formattedName = client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
   * var location = '';
   * var serveNodes = 0;
   * var request = {
   *   name: formattedName,
   *   location: location,
   *   serveNodes: serveNodes,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.updateCluster(request)
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
  updateCluster(request, options, callback) {
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

    return this._innerApiCalls.updateCluster(request, options, callback);
  }

  /**
   * Deletes a cluster from an instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the cluster to be deleted. Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/<cluster>`.
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
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
   * client.deleteCluster({name: formattedName}).catch(err => {
   *   console.error(err);
   * });
   */
  deleteCluster(request, options, callback) {
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

    return this._innerApiCalls.deleteCluster(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable replication. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Creates an app profile within an instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the instance in which to create the new app profile.
   *   Values are of the form
   *   `projects/<project>/instances/<instance>`.
   * @param {string} request.appProfileId
   *   The ID to be used when referring to the new app profile within its
   *   instance, e.g., just `myprofile` rather than
   *   `projects/myproject/instances/myinstance/appProfiles/myprofile`.
   * @param {Object} request.appProfile
   *   The app profile to be created.
   *   Fields marked `OutputOnly` will be ignored.
   *
   *   This object should have the same structure as [AppProfile]{@link google.bigtable.admin.v2.AppProfile}
   * @param {boolean} [request.ignoreWarnings]
   *   If true, ignore safety checks when creating the app profile.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [AppProfile]{@link google.bigtable.admin.v2.AppProfile}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [AppProfile]{@link google.bigtable.admin.v2.AppProfile}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   * var appProfileId = '';
   * var appProfile = {};
   * var request = {
   *   parent: formattedParent,
   *   appProfileId: appProfileId,
   *   appProfile: appProfile,
   * };
   * client.createAppProfile(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  createAppProfile(request, options, callback) {
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

    return this._innerApiCalls.createAppProfile(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable replication. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Gets information about an app profile.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the requested app profile. Values are of the form
   *   `projects/<project>/instances/<instance>/appProfiles/<app_profile>`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [AppProfile]{@link google.bigtable.admin.v2.AppProfile}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [AppProfile]{@link google.bigtable.admin.v2.AppProfile}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.appProfilePath('[PROJECT]', '[INSTANCE]', '[APP_PROFILE]');
   * client.getAppProfile({name: formattedName})
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getAppProfile(request, options, callback) {
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

    return this._innerApiCalls.getAppProfile(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable replication. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Lists information about app profiles in an instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   The unique name of the instance for which a list of app profiles is
   *   requested. Values are of the form
   *   `projects/<project>/instances/<instance>`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Array, ?Object, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is Array of [AppProfile]{@link google.bigtable.admin.v2.AppProfile}.
   *
   *   When autoPaginate: false is specified through options, it contains the result
   *   in a single response. If the response indicates the next page exists, the third
   *   parameter is set to be used for the next request object. The fourth parameter keeps
   *   the raw response object of an object representing [ListAppProfilesResponse]{@link google.bigtable.admin.v2.ListAppProfilesResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [AppProfile]{@link google.bigtable.admin.v2.AppProfile}.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [AppProfile]{@link google.bigtable.admin.v2.AppProfile} in a single response.
   *   The second element is the next request object if the response
   *   indicates the next page exists, or null. The third element is
   *   an object representing [ListAppProfilesResponse]{@link google.bigtable.admin.v2.ListAppProfilesResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * // Iterate over all elements.
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   *
   * client.listAppProfiles({parent: formattedParent})
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
   *     return client.listAppProfiles(nextRequest, options).then(callback);
   *   }
   * }
   * client.listAppProfiles({parent: formattedParent}, options)
   *   .then(callback)
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  listAppProfiles(request, options, callback) {
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

    return this._innerApiCalls.listAppProfiles(request, options, callback);
  }

  /**
   * Equivalent to {@link listAppProfiles}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listAppProfiles} continuously
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
   *   The unique name of the instance for which a list of app profiles is
   *   requested. Values are of the form
   *   `projects/<project>/instances/<instance>`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @returns {Stream}
   *   An object stream which emits an object representing [AppProfile]{@link google.bigtable.admin.v2.AppProfile} on 'data' event.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
   * client.listAppProfilesStream({parent: formattedParent})
   *   .on('data', element => {
   *     // doThingsWith(element)
   *   }).on('error', err => {
   *     console.log(err);
   *   });
   */
  listAppProfilesStream(request, options) {
    options = options || {};

    return this._descriptors.page.listAppProfiles.createStream(
      this._innerApiCalls.listAppProfiles,
      request,
      options
    );
  }

  /**
   * This is a private alpha release of Cloud Bigtable replication. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Updates an app profile within an instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {Object} request.appProfile
   *   The app profile which will (partially) replace the current value.
   *
   *   This object should have the same structure as [AppProfile]{@link google.bigtable.admin.v2.AppProfile}
   * @param {Object} request.updateMask
   *   The subset of app profile fields which should be replaced.
   *   If unset, all fields will be replaced.
   *
   *   This object should have the same structure as [FieldMask]{@link google.protobuf.FieldMask}
   * @param {boolean} [request.ignoreWarnings]
   *   If true, ignore safety checks when updating the app profile.
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
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var appProfile = {};
   * var updateMask = {};
   * var request = {
   *   appProfile: appProfile,
   *   updateMask: updateMask,
   * };
   *
   * // Handle the operation using the promise pattern.
   * client.updateAppProfile(request)
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
   * var appProfile = {};
   * var updateMask = {};
   * var request = {
   *   appProfile: appProfile,
   *   updateMask: updateMask,
   * };
   *
   * // Handle the operation using the event emitter pattern.
   * client.updateAppProfile(request)
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
  updateAppProfile(request, options, callback) {
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
      'app_profile.name': request.appProfile.name,
    });

    return this._innerApiCalls.updateAppProfile(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable replication. This feature
   * is not currently available to most Cloud Bigtable customers. This feature
   * might be changed in backward-incompatible ways and is not recommended for
   * production use. It is not subject to any SLA or deprecation policy.
   *
   * Deletes an app profile from an instance.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   The unique name of the app profile to be deleted. Values are of the form
   *   `projects/<project>/instances/<instance>/appProfiles/<app_profile>`.
   * @param {boolean} request.ignoreWarnings
   *   If true, ignore safety checks when deleting the app profile.
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
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedName = client.appProfilePath('[PROJECT]', '[INSTANCE]', '[APP_PROFILE]');
   * var ignoreWarnings = false;
   * var request = {
   *   name: formattedName,
   *   ignoreWarnings: ignoreWarnings,
   * };
   * client.deleteAppProfile(request).catch(err => {
   *   console.error(err);
   * });
   */
  deleteAppProfile(request, options, callback) {
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

    return this._innerApiCalls.deleteAppProfile(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable instance level
   * permissions. This feature is not currently available to most Cloud Bigtable
   * customers. This feature might be changed in backward-incompatible ways and
   * is not recommended for production use. It is not subject to any SLA or
   * deprecation policy.
   *
   * Gets the access control policy for an instance resource. Returns an empty
   * policy if an instance exists but does not have a policy set.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.resource
   *   REQUIRED: The resource for which the policy is being requested.
   *   `resource` is usually specified as a path. For example, a Project
   *   resource is specified as `projects/{project}`.
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Policy]{@link google.iam.v1.Policy}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Policy]{@link google.iam.v1.Policy}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
   * client.getIamPolicy({resource: formattedResource})
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  getIamPolicy(request, options, callback) {
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
      resource: request.resource,
    });

    return this._innerApiCalls.getIamPolicy(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable instance level
   * permissions. This feature is not currently available to most Cloud Bigtable
   * customers. This feature might be changed in backward-incompatible ways and
   * is not recommended for production use. It is not subject to any SLA or
   * deprecation policy.
   *
   * Sets the access control policy on an instance resource. Replaces any
   * existing policy.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.resource
   *   REQUIRED: The resource for which the policy is being specified.
   *   `resource` is usually specified as a path. For example, a Project
   *   resource is specified as `projects/{project}`.
   * @param {Object} request.policy
   *   REQUIRED: The complete policy to be applied to the `resource`. The size of
   *   the policy is limited to a few 10s of KB. An empty policy is a
   *   valid policy but certain Cloud Platform services (such as Projects)
   *   might reject them.
   *
   *   This object should have the same structure as [Policy]{@link google.iam.v1.Policy}
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [Policy]{@link google.iam.v1.Policy}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Policy]{@link google.iam.v1.Policy}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
   * var policy = {};
   * var request = {
   *   resource: formattedResource,
   *   policy: policy,
   * };
   * client.setIamPolicy(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  setIamPolicy(request, options, callback) {
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
      resource: request.resource,
    });

    return this._innerApiCalls.setIamPolicy(request, options, callback);
  }

  /**
   * This is a private alpha release of Cloud Bigtable instance level
   * permissions. This feature is not currently available to most Cloud Bigtable
   * customers. This feature might be changed in backward-incompatible ways and
   * is not recommended for production use. It is not subject to any SLA or
   * deprecation policy.
   *
   * Returns permissions that the caller has on the specified instance resource.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.resource
   *   REQUIRED: The resource for which the policy detail is being requested.
   *   `resource` is usually specified as a path. For example, a Project
   *   resource is specified as `projects/{project}`.
   * @param {string[]} request.permissions
   *   The set of permissions to check for the `resource`. Permissions with
   *   wildcards (such as '*' or 'storage.*') are not allowed. For more
   *   information see
   *   [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions).
   * @param {Object} [options]
   *   Optional parameters. You can override the default settings for this call, e.g, timeout,
   *   retries, paginations, etc. See [gax.CallOptions]{@link https://googleapis.github.io/gax-nodejs/global.html#CallOptions} for the details.
   * @param {function(?Error, ?Object)} [callback]
   *   The function which will be called with the result of the API call.
   *
   *   The second parameter to the callback is an object representing [TestIamPermissionsResponse]{@link google.iam.v1.TestIamPermissionsResponse}.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [TestIamPermissionsResponse]{@link google.iam.v1.TestIamPermissionsResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   *
   * @example
   *
   * const admin = require('admin.v2');
   *
   * var client = new admin.v2.BigtableInstanceAdminClient({
   *   // optional auth parameters.
   * });
   *
   * var formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
   * var permissions = [];
   * var request = {
   *   resource: formattedResource,
   *   permissions: permissions,
   * };
   * client.testIamPermissions(request)
   *   .then(responses => {
   *     var response = responses[0];
   *     // doThingsWith(response)
   *   })
   *   .catch(err => {
   *     console.error(err);
   *   });
   */
  testIamPermissions(request, options, callback) {
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
      resource: request.resource,
    });

    return this._innerApiCalls.testIamPermissions(request, options, callback);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified project resource name string.
   *
   * @param {String} project
   * @returns {String}
   */
  projectPath(project) {
    return this._pathTemplates.projectPathTemplate.render({
      project: project,
    });
  }

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
   * Return a fully-qualified app_profile resource name string.
   *
   * @param {String} project
   * @param {String} instance
   * @param {String} appProfile
   * @returns {String}
   */
  appProfilePath(project, instance, appProfile) {
    return this._pathTemplates.appProfilePathTemplate.render({
      project: project,
      instance: instance,
      app_profile: appProfile,
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
   * Return a fully-qualified location resource name string.
   *
   * @param {String} project
   * @param {String} location
   * @returns {String}
   */
  locationPath(project, location) {
    return this._pathTemplates.locationPathTemplate.render({
      project: project,
      location: location,
    });
  }

  /**
   * Parse the projectName from a project resource.
   *
   * @param {String} projectName
   *   A fully-qualified path representing a project resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromProjectName(projectName) {
    return this._pathTemplates.projectPathTemplate.match(projectName).project;
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
   * Parse the appProfileName from a app_profile resource.
   *
   * @param {String} appProfileName
   *   A fully-qualified path representing a app_profile resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromAppProfileName(appProfileName) {
    return this._pathTemplates.appProfilePathTemplate.match(appProfileName)
      .project;
  }

  /**
   * Parse the appProfileName from a app_profile resource.
   *
   * @param {String} appProfileName
   *   A fully-qualified path representing a app_profile resources.
   * @returns {String} - A string representing the instance.
   */
  matchInstanceFromAppProfileName(appProfileName) {
    return this._pathTemplates.appProfilePathTemplate.match(appProfileName)
      .instance;
  }

  /**
   * Parse the appProfileName from a app_profile resource.
   *
   * @param {String} appProfileName
   *   A fully-qualified path representing a app_profile resources.
   * @returns {String} - A string representing the app_profile.
   */
  matchAppProfileFromAppProfileName(appProfileName) {
    return this._pathTemplates.appProfilePathTemplate.match(appProfileName)
      .app_profile;
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
   * Parse the locationName from a location resource.
   *
   * @param {String} locationName
   *   A fully-qualified path representing a location resources.
   * @returns {String} - A string representing the project.
   */
  matchProjectFromLocationName(locationName) {
    return this._pathTemplates.locationPathTemplate.match(locationName).project;
  }

  /**
   * Parse the locationName from a location resource.
   *
   * @param {String} locationName
   *   A fully-qualified path representing a location resources.
   * @returns {String} - A string representing the location.
   */
  matchLocationFromLocationName(locationName) {
    return this._pathTemplates.locationPathTemplate.match(locationName)
      .location;
  }
}

module.exports = BigtableInstanceAdminClient;
