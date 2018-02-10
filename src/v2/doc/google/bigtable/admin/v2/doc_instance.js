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

// Note: this file is purely for documentation. Any contents are not expected
// to be loaded as the JS file.

/**
 * A collection of Bigtable Tables and
 * the resources that serve them.
 * All tables in an instance are served from a single
 * Cluster.
 *
 * @property {string} name
 *   (`OutputOnly`)
 *   The unique name of the instance. Values are of the form
 *   `projects/<project>/instances/[a-z][a-z0-9\\-]+[a-z0-9]`.
 *
 * @property {string} displayName
 *   The descriptive name for this instance as it appears in UIs.
 *   Can be changed at any time, but should be kept globally unique
 *   to avoid confusion.
 *
 * @property {number} state
 *   (`OutputOnly`)
 *   The current state of the instance.
 *
 *   The number should be among the values of [State]{@link google.bigtable.admin.v2.State}
 *
 * @property {number} type
 *   The type of the instance. Defaults to `PRODUCTION`.
 *
 *   The number should be among the values of [Type]{@link google.bigtable.admin.v2.Type}
 *
 * @property {Object.<string, string>} labels
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
 *
 * @typedef Instance
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.Instance definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/instance.proto}
 */
var Instance = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * Possible states of an instance.
   *
   * @enum {number}
   * @memberof google.bigtable.admin.v2
   */
  State: {

    /**
     * The state of the instance could not be determined.
     */
    STATE_NOT_KNOWN: 0,

    /**
     * The instance has been successfully created and can serve requests
     * to its tables.
     */
    READY: 1,

    /**
     * The instance is currently being created, and may be destroyed
     * if the creation process encounters an error.
     */
    CREATING: 2
  },

  /**
   * The type of the instance.
   *
   * @enum {number}
   * @memberof google.bigtable.admin.v2
   */
  Type: {

    /**
     * The type of the instance is unspecified. If set when creating an
     * instance, a `PRODUCTION` instance will be created. If set when updating
     * an instance, the type will be left unchanged.
     */
    TYPE_UNSPECIFIED: 0,

    /**
     * An instance meant for production use. `serve_nodes` must be set
     * on the cluster.
     */
    PRODUCTION: 1,

    /**
     * The instance is meant for development and testing purposes only; it has
     * no performance or uptime guarantees and is not covered by SLA.
     * After a development instance is created, it can be upgraded by
     * updating the instance to type `PRODUCTION`. An instance created
     * as a production instance cannot be changed to a development instance.
     * When creating a development instance, `serve_nodes` on the cluster must
     * not be set.
     */
    DEVELOPMENT: 2
  }
};

/**
 * A resizable group of nodes in a particular cloud location, capable
 * of serving all Tables in the parent
 * Instance.
 *
 * @property {string} name
 *   (`OutputOnly`)
 *   The unique name of the cluster. Values are of the form
 *   `projects/<project>/instances/<instance>/clusters/[a-z][-a-z0-9]*`.
 *
 * @property {string} location
 *   (`CreationOnly`)
 *   The location where this cluster's nodes and storage reside. For best
 *   performance, clients should be located as close as possible to this
 *   cluster. Currently only zones are supported, so values should be of the
 *   form `projects/<project>/locations/<zone>`.
 *
 * @property {number} state
 *   (`OutputOnly`)
 *   The current state of the cluster.
 *
 *   The number should be among the values of [State]{@link google.bigtable.admin.v2.State}
 *
 * @property {number} serveNodes
 *   The number of nodes allocated to this cluster. More nodes enable higher
 *   throughput and more consistent performance.
 *
 * @property {number} defaultStorageType
 *   (`CreationOnly`)
 *   The type of storage used by this cluster to serve its
 *   parent instance's tables, unless explicitly overridden.
 *
 *   The number should be among the values of [StorageType]{@link google.bigtable.admin.v2.StorageType}
 *
 * @typedef Cluster
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.Cluster definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/instance.proto}
 */
var Cluster = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * Possible states of a cluster.
   *
   * @enum {number}
   * @memberof google.bigtable.admin.v2
   */
  State: {

    /**
     * The state of the cluster could not be determined.
     */
    STATE_NOT_KNOWN: 0,

    /**
     * The cluster has been successfully created and is ready to serve requests.
     */
    READY: 1,

    /**
     * The cluster is currently being created, and may be destroyed
     * if the creation process encounters an error.
     * A cluster may not be able to serve requests while being created.
     */
    CREATING: 2,

    /**
     * The cluster is currently being resized, and may revert to its previous
     * node count if the process encounters an error.
     * A cluster is still capable of serving requests while being resized,
     * but may exhibit performance as if its number of allocated nodes is
     * between the starting and requested states.
     */
    RESIZING: 3,

    /**
     * The cluster has no backing nodes. The data (tables) still
     * exist, but no operations can be performed on the cluster.
     */
    DISABLED: 4
  }
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * A configuration object describing how Cloud Bigtable should treat traffic
 * from a particular end user application.
 *
 * @property {string} name
 *   (`OutputOnly`)
 *   The unique name of the app profile. Values are of the form
 *   `projects/<project>/instances/<instance>/appProfiles/[_a-zA-Z0-9][-_.a-zA-Z0-9]*`.
 *
 * @property {string} etag
 *   Strongly validated etag for optimistic concurrency control. Preserve the
 *   value returned from `GetAppProfile` when calling `UpdateAppProfile` to
 *   fail the request if there has been a modification in the mean time. The
 *   `update_mask` of the request need not include `etag` for this protection
 *   to apply.
 *   See [Wikipedia](https://en.wikipedia.org/wiki/HTTP_ETag) and
 *   [RFC 7232](https://tools.ietf.org/html/rfc7232#section-2.3) for more
 *   details.
 *
 * @property {string} description
 *   Optional long form description of the use case for this AppProfile.
 *
 * @property {Object} multiClusterRoutingUseAny
 *   Use a multi-cluster routing policy that may pick any cluster.
 *
 *   This object should have the same structure as [MultiClusterRoutingUseAny]{@link google.bigtable.admin.v2.MultiClusterRoutingUseAny}
 *
 * @property {Object} singleClusterRouting
 *   Use a single-cluster routing policy.
 *
 *   This object should have the same structure as [SingleClusterRouting]{@link google.bigtable.admin.v2.SingleClusterRouting}
 *
 * @typedef AppProfile
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.AppProfile definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/instance.proto}
 */
var AppProfile = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * Read/write requests may be routed to any cluster in the instance, and will
   * fail over to another cluster in the event of transient errors or delays.
   * Choosing this option sacrifices read-your-writes consistency to improve
   * availability.
   * @typedef MultiClusterRoutingUseAny
   * @memberof google.bigtable.admin.v2
   * @see [google.bigtable.admin.v2.AppProfile.MultiClusterRoutingUseAny definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/instance.proto}
   */
  MultiClusterRoutingUseAny: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  },

  /**
   * Unconditionally routes all read/write requests to a specific cluster.
   * This option preserves read-your-writes consistency, but does not improve
   * availability.
   *
   * @property {string} clusterId
   *   The cluster to which read/write requests should be routed.
   *
   * @property {boolean} allowTransactionalWrites
   *   Whether or not `CheckAndMutateRow` and `ReadModifyWriteRow` requests are
   *   allowed by this app profile. It is unsafe to send these requests to
   *   the same table/row/column in multiple clusters.
   *
   * @typedef SingleClusterRouting
   * @memberof google.bigtable.admin.v2
   * @see [google.bigtable.admin.v2.AppProfile.SingleClusterRouting definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/instance.proto}
   */
  SingleClusterRouting: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  }
};