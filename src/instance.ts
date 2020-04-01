// Copyright 2016 Google LLC
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

import {paginator, ResourceStream} from '@google-cloud/paginator';
import {promisifyAll} from '@google-cloud/promisify';
import arrify = require('arrify');
import * as is from 'is';
import snakeCase = require('lodash.snakecase');
import {
  AppProfile,
  AppProfileOptions,
  CreateAppProfileCallback,
  CreateAppProfileResponse,
  GetAppProfilesCallback,
  GetAppProfilesResponse,
} from './app-profile';
import {
  Cluster,
  CreateClusterOptions,
  CreateClusterCallback,
  CreateClusterResponse,
  GetClustersCallback,
  GetClustersResponse,
} from './cluster';
import {Family} from './family';
import {
  GetIamPolicyCallback,
  GetIamPolicyOptions,
  GetIamPolicyResponse,
  Policy,
  SetIamPolicyCallback,
  SetIamPolicyResponse,
  Table,
  TestIamPermissionsCallback,
  TestIamPermissionsResponse,
  CreateTableOptions,
  CreateTableCallback,
  CreateTableResponse,
  GetTablesOptions,
  GetTablesCallback,
  GetTablesResponse,
} from './table';
import {CallOptions, Operation} from 'google-gax';
import {ServiceError} from '@grpc/grpc-js';
import {Bigtable} from '.';
import {google} from '../protos/protos';

export interface ClusterInfo {
  id?: string;
  location?: string;
  serveNodes?: number;
  nodes?: number;
  storage?: string;
  defaultStorageType?: number;
}

export interface InstanceOptions {
  /**
   * The clusters to be created within the instance.
   */
  clusters?: ClusterInfo[] | ClusterInfo;

  /**
   * The descriptive name for this instance as it appears in UIs.
   */
  displayName?: string;

  /**
   * Labels are a flexible and lightweight mechanism for organizing cloud
   * resources into groups that reflect a customer's organizational needs and
   * deployment strategies. They can be used to filter resources and
   * aggregate metrics.
   *
   * Label keys must be between 1 and 63 characters long and must conform to
   * the regular expression: `[\p{Ll}\p{Lo}][\p{Ll}\p{Lo}\p{N}_-]{0,62}`.
   * Label values must be between 0 and 63 characters long and must conform
   * to the regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`.
   * No more than 64 labels can be associated with a given resource.
   * Keys and values must both be under 128 bytes.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels?: {[index: string]: any};

  type?: 'production' | 'development';

  /**
   * Request configuration options, outlined here:
   * https://googleapis.github.io/gax-nodejs/CallSettings.html.
   */
  gaxOptions?: CallOptions;
}

export type IInstance = google.bigtable.admin.v2.IInstance;
export type CreateInstanceCallback = (
  err: ServiceError | null,
  instance?: Instance,
  operation?: Operation,
  apiResponse?: IInstance
) => void;
export type CreateInstanceResponse = [Instance, Operation, IInstance];
export type DeleteInstanceCallback = (
  err: ServiceError | null,
  apiResponse?: google.protobuf.Empty
) => void;
export type DeleteInstanceResponse = [google.protobuf.Empty];
export type InstanceExistsCallback = (
  err: ServiceError | null,
  exists?: boolean
) => void;
export type InstanceExistsResponse = [boolean];
export type GetInstanceCallback = (
  err: ServiceError | null,
  instance?: Instance,
  apiResponse?: IInstance
) => void;
export type GetInstanceResponse = [Instance, IInstance];
export type GetInstanceMetadataCallback = (
  err: ServiceError | null,
  metadata?: IInstance
) => void;
export type GetInstanceMetadataResponse = [IInstance];
export type SetInstanceMetadataCallback = (
  err: ServiceError | null,
  apiResponse?: google.protobuf.Empty
) => void;
export type SetInstanceMetadataResponse = [google.protobuf.Empty];

/**
 * Create an Instance object to interact with a Cloud Bigtable instance.
 *
 * @class
 * @param {Bigtable} bigtable The parent {@link Bigtable} object of this
 *     instance.
 * @param {string} id Id of the instance.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 */

export class Instance {
  bigtable: Bigtable;
  id: string;
  name: string;
  metadata?: google.bigtable.admin.v2.IInstance;
  getTablesStream!: (options?: GetTablesOptions) => ResourceStream<Table>;
  constructor(bigtable: Bigtable, id: string) {
    this.bigtable = bigtable;

    let name;
    if (id.includes('/')) {
      if (id.startsWith(`${bigtable.projectName}/instances/`)) {
        name = id;
      } else {
        throw new Error(`Instance id '${id}' is not formatted correctly.
Please use the format 'my-instance' or '${bigtable.projectName}/instances/my-instance'.`);
      }
    } else {
      name = `${bigtable.projectName}/instances/${id}`;
    }

    this.id = name.split('/').pop()!;
    this.name = name;
  }

  /**
   * Maps the instance type to the proper integer.
   *
   * @private
   *
   * @param {string} type The instance type (production, development).
   * @returns {number}
   *
   * @example
   * Instance.getTypeType_('production');
   * // 1
   */
  static getTypeType_(type?: string): number {
    const types = {
      unspecified: 0,
      production: 1,
      development: 2,
    } as {[index: string]: number};
    if (typeof type === 'string') {
      type = type.toLowerCase();
    }
    return types[type!] || types.unspecified;
  }

  /**
   * Get a reference to a Bigtable App Profile.
   *
   * @param {string} name The name of the app profile.
   * @returns {AppProfile}
   */
  appProfile(name: string): AppProfile {
    return new AppProfile(this, name);
  }

  create(options?: InstanceOptions): Promise<CreateInstanceResponse>;
  create(options: InstanceOptions, callback: CreateInstanceCallback): void;
  create(callback: CreateInstanceCallback): void;
  /**
   * Create an instance.
   *
   * @param {object} options See {@link Bigtable#createInstance}.
   * @param {object} [options.gaxOptions]  Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {Instance} callback.instance The newly created
   *     instance.
   * @param {Operation} callback.operation An operation object that can be used
   *     to check the status of the request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_create_instance
   */
  create(
    optionsOrCallback?: InstanceOptions | CreateInstanceCallback,
    cb?: CreateInstanceCallback
  ): void | Promise<CreateInstanceResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    this.bigtable.createInstance(this.id, options, callback);
  }

  createAppProfile(
    id: string,
    options?: AppProfileOptions
  ): Promise<CreateAppProfileResponse>;
  createAppProfile(
    id: string,
    options: AppProfileOptions,
    callback: CreateAppProfileCallback
  ): void;
  createAppProfile(id: string, callback: CreateAppProfileCallback): void;
  /**
   * Create an app profile.
   *
   * @param {string} id The name to be used when referring to the new
   *     app profile within its instance.
   * @param {object} options AppProfile creation options.
   * @param {'any'|Cluster} options.routing  The routing policy for all
   *     read/write requests which use this app profile. This can be either the
   *     string 'any' or a cluster of an instance. This value is required when
   *     creating the app profile and optional when setting the metadata.
   * @param {object} [options.gaxOptions]  Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {boolean} [options.allowTransactionalWrites] Whether or not
   *     CheckAndMutateRow and ReadModifyWriteRow requests are allowed by this
   *     app profile. It is unsafe to send these requests to the same
   *     table/row/column in multiple clusters. This is only used when the
   *     routing value is a cluster.
   * @param {string} [options.description] The long form description of the use
   *     case for this AppProfile.
   * @param {string} [options.ignoreWarnings] Whether to ignore safety checks
   *     when creating the app profile
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Cluster} callback.appProfile The newly created app profile.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_create_app_profile
   */
  createAppProfile(
    id: string,
    optionsOrCallback?: AppProfileOptions | CreateAppProfileCallback,
    cb?: CreateAppProfileCallback
  ): void | Promise<CreateAppProfileResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    if (!options.routing) {
      throw new Error('An app profile must contain a routing policy.');
    }

    const appProfile = AppProfile.formatAppProfile_(options);

    const reqOpts = {
      parent: this.name,
      appProfileId: id,
      appProfile,
    } as google.bigtable.admin.v2.CreateAppProfileRequest;

    if (is.boolean(options.ignoreWarnings)) {
      reqOpts.ignoreWarnings = options.ignoreWarnings!;
    }

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'createAppProfile',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (...args) => {
        if (args[1]) {
          args.splice(1, 0, this.appProfile(id));
        }

        callback(...args);
      }
    );
  }

  createCluster(
    id: string,
    options?: CreateClusterOptions
  ): Promise<CreateClusterResponse>;
  createCluster(
    id: string,
    options: CreateClusterOptions,
    callback: CreateClusterCallback
  ): void;
  createCluster(id: string, callback: CreateClusterCallback): void;
  /**
   * Create a cluster.
   *
   * @param {string} id The id to be used when referring to the new
   *     cluster within its instance.
   * @param {object} options Cluster creation options.
   * @param {object} [options.gaxOptions]  Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {string} options.location The location where this cluster's nodes
   *     and storage reside. For best performance clients should be located as
   *     as close as possible to this cluster. Currently only zones are
   *     supported.
   * @param {number} options.nodes The number of nodes allocated to this
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
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_create_cluster
   */
  createCluster(
    id: string,
    optionsOrCallback?: CreateClusterOptions | CreateClusterCallback,
    cb?: CreateClusterCallback
  ): void | Promise<CreateClusterResponse> {
    const options =
      typeof optionsOrCallback === 'object'
        ? optionsOrCallback
        : ({} as CreateClusterOptions);
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    const reqOpts = {
      parent: this.name,
      clusterId: id,
    } as google.bigtable.admin.v2.CreateClusterRequest;

    if (!is.empty(options)) {
      reqOpts.cluster = {};
    }

    if (options.location) {
      reqOpts.cluster!.location = Cluster.getLocation_(
        this.bigtable.projectId,
        options.location
      );
    }

    if (options.nodes) {
      reqOpts.cluster!.serveNodes = options.nodes;
    }

    if (options.storage) {
      const storageType = Cluster.getStorageType_(options.storage);
      reqOpts.cluster!.defaultStorageType = storageType;
    }

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'createCluster',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (...args) => {
        if (args[1]) {
          args.splice(1, 0, this.cluster(id));
        }

        callback(...args);
      }
    );
  }

  createTable(
    id: string,
    options?: CreateTableOptions
  ): Promise<CreateTableResponse>;
  createTable(
    id: string,
    options: CreateTableOptions,
    callback: CreateTableCallback
  ): void;
  createTable(id: string, callback: CreateTableCallback): void;
  /**
   * Create a table on your Bigtable instance.
   *
   * @see [Designing Your Schema]{@link https://cloud.google.com/bigtable/docs/schema-design}
   * @see [Splitting Keys]{@link https://cloud.google.com/bigtable/docs/managing-tables#splits}
   *
   * @throws {error} If a id is not provided.
   *
   * @param {string} id Unique identifier of the table.
   * @param {object} [options] Table creation options.
   * @param {object|string[]} [options.families] Column families to be created
   *     within the table.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {string[]} [options.splits] Initial
   *    [split keys](https://cloud.google.com/bigtable/docs/managing-tables#splits).
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Table} callback.table The newly created table.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_create_table
   */
  createTable(
    id: string,
    optionsOrCallback?: CreateTableOptions | CreateTableCallback,
    cb?: CreateTableCallback
  ): void | Promise<CreateTableResponse> {
    if (!id) {
      throw new Error('An id is required to create a table.');
    }

    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    const reqOpts = {
      parent: this.name,
      tableId: id,
      table: {
        // The granularity at which timestamps are stored in the table.
        // Currently only milliseconds is supported, so it's not
        // configurable.
        granularity: 0,
      },
    } as google.bigtable.admin.v2.CreateTableRequest;

    if (options.splits) {
      reqOpts.initialSplits = options.splits.map(key => ({
        key,
      }));
    }

    if (options.families) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const columnFamilies = (options.families as any[]).reduce(
        (families, family) => {
          if (typeof family === 'string') {
            family = {
              name: family,
            };
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const columnFamily: any = (families[family.name] = {});
          if (family.rule) {
            columnFamily.gcRule = Family.formatRule_(family.rule);
          }
          return families;
        },
        {}
      );

      reqOpts.table!.columnFamilies = columnFamilies;
    }

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'createTable',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (...args) => {
        if (args[1]) {
          const table = this.table(args[1].name.split('/').pop());
          table.metadata = args[1];
          args.splice(1, 0, table);
        }

        callback(...args);
      }
    );
  }

  /**
   * Get a reference to a Bigtable Cluster.
   *
   * @param {string} id The id of the cluster.
   * @returns {Cluster}
   */
  cluster(id: string): Cluster {
    return new Cluster(this, id);
  }

  delete(gaxOptions?: CallOptions): Promise<DeleteInstanceResponse>;
  delete(gaxOptions: CallOptions, callback: DeleteInstanceCallback): void;
  delete(callback: DeleteInstanceCallback): void;
  /**
   * Delete the instance.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_del_instance
   */
  delete(
    optionsOrCallback?: CallOptions | DeleteInstanceCallback,
    cb?: DeleteInstanceCallback
  ): void | Promise<DeleteInstanceResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'deleteInstance',
        reqOpts: {
          name: this.name,
        },
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  exists(options?: CallOptions): Promise<InstanceExistsResponse>;
  exists(options: CallOptions, callback: InstanceExistsCallback): void;
  exists(callback: InstanceExistsCallback): void;
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
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_exists_instance
   */
  exists(
    optionsOrCallback?: CallOptions | InstanceExistsCallback,
    cb?: InstanceExistsCallback
  ): void | Promise<InstanceExistsResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
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

  get(gaxOptions?: CallOptions): Promise<GetInstanceResponse>;
  get(gaxOptions: CallOptions, callback: GetInstanceCallback): void;
  get(callback: GetInstanceCallback): void;
  /**
   * Get an instance if it exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.error An error returned while making this request.
   * @param {Instance} callback.instance The Instance object.
   * @param {object} callback.apiResponse The resource as it exists in the API.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_get_instance
   */
  get(
    optionsOrCallback?: CallOptions | GetInstanceCallback,
    cb?: GetInstanceCallback
  ): void | Promise<GetInstanceResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    this.getMetadata(gaxOptions, (err, metadata) => {
      if (err) {
        callback(err, undefined, metadata);
      } else {
        callback(null, this, metadata);
      }
    });
  }

  getAppProfiles(options?: CallOptions): Promise<GetAppProfilesResponse>;
  getAppProfiles(options: CallOptions, callback: GetAppProfilesCallback): void;
  getAppProfiles(callback: GetAppProfilesCallback): void;
  /**
   * Get App Profile objects for this instance.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.error An error returned while making this request.
   * @param {AppProfile[]} callback.appProfiles List of all AppProfiles.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_get_app_profiles
   */
  getAppProfiles(
    optionsOrCallback?: CallOptions | GetAppProfilesCallback,
    cb?: GetAppProfilesCallback
  ): void | Promise<GetAppProfilesResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    const reqOpts = {
      parent: this.name,
    };

    this.bigtable.request<google.bigtable.admin.v2.IAppProfile[]>(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'listAppProfiles',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      (err, resp) => {
        if (err) {
          callback(err);
          return;
        }
        const appProfiles = resp!.map(appProfileObj => {
          const appProfile = this.appProfile(
            appProfileObj.name!.split('/').pop()!
          );
          appProfile.metadata = appProfileObj;
          return appProfile;
        });
        callback(null, appProfiles, resp);
      }
    );
  }

  getClusters(options?: CallOptions): Promise<GetClustersResponse>;
  getClusters(options: CallOptions, callback: GetClustersCallback): void;
  getClusters(callback: GetClustersCallback): void;
  /**
   * Get Cluster objects for all of your clusters.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.error An error returned while making this request.
   * @param {Cluster[]} callback.clusters List of all
   *     Clusters.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_get_clusters
   */
  getClusters(
    optionsOrCallback?: CallOptions | GetClustersCallback,
    cb?: GetClustersCallback
  ): void | Promise<GetClustersResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    const reqOpts = {
      parent: this.name,
    };

    this.bigtable.request<google.bigtable.admin.v2.IListClustersResponse>(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'listClusters',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      (err, resp) => {
        if (err) {
          callback(err);
          return;
        }
        const clusters = resp!.clusters!.map(clusterObj => {
          const cluster = this.cluster(clusterObj.name!.split('/').pop()!);
          cluster.metadata = clusterObj;
          return cluster;
        });
        callback(null, clusters, resp);
      }
    );
  }

  getIamPolicy(options?: GetIamPolicyOptions): Promise<[Policy]>;
  getIamPolicy(
    options: GetIamPolicyOptions,
    callback: GetIamPolicyCallback
  ): void;
  /**
   * @param {object} [options] Configuration object.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {number} [options.requestedPolicyVersion] The policy format version
   *     to be returned. Valid values are 0, 1, and 3. Requests specifying an
   *     invalid value will be rejected. Requests for policies with any
   *     conditional bindings must specify version 3. Policies without any
   *     conditional bindings may specify any valid value or leave the field unset.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.error An error returned while making this request.
   * @param {Policy} policy The policy.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_get_instance_Iam_policy
   */
  getIamPolicy(
    optionsOrCallback?: GetIamPolicyOptions | GetIamPolicyCallback,
    callback?: GetIamPolicyCallback
  ): void | Promise<GetIamPolicyResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : callback!;

    const reqOpts = {
      resource: this.name,
    } as google.iam.v1.IGetIamPolicyRequest;

    if (
      options.requestedPolicyVersion !== null &&
      options.requestedPolicyVersion !== undefined
    ) {
      reqOpts.options = {
        requestedPolicyVersion: options.requestedPolicyVersion,
      };
    }

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'getIamPolicy',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (err, resp) => {
        if (err) {
          callback!(err);
          return;
        }
        callback!(null, Table.decodePolicyEtag(resp));
      }
    );
  }

  getMetadata(options?: CallOptions): Promise<GetInstanceMetadataResponse>;
  getMetadata(
    options: CallOptions,
    callback: GetInstanceMetadataCallback
  ): void;
  getMetadata(callback: GetInstanceMetadataCallback): void;
  /**
   * Get the instance metadata.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.metadata The metadata.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_get_instance_metadata
   */
  getMetadata(
    optionsOrCallback?: CallOptions | GetInstanceMetadataCallback,
    cb?: GetInstanceMetadataCallback
  ): void | Promise<GetInstanceMetadataResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    this.bigtable.request<google.bigtable.admin.v2.IInstance>(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'getInstance',
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

  getTables(options?: GetTablesOptions): Promise<GetTablesResponse>;
  getTables(options: GetTablesOptions, callback: GetTablesCallback): void;
  getTables(callback: GetTablesCallback): void;
  /**
   * Get Table objects for all the tables in your Cloud Bigtable instance.
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
   * @param {Table[]} callback.tables List of all Table objects.These objects contains
   *     only table name & id but is not a complete representation of a table.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_get_tables
   */
  getTables(
    optionsOrCallback?: GetTablesOptions | GetTablesCallback,
    cb?: GetTablesCallback
  ): void | Promise<GetTablesResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    const reqOpts = Object.assign({}, options, {
      parent: this.name,
      view: Table.VIEWS[options.view || 'unspecified'],
    });

    delete reqOpts.gaxOptions;

    this.bigtable.request<Table[]>(
      {
        client: 'BigtableTableAdminClient',
        method: 'listTables',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (...args) => {
        if (args[1]) {
          args[1] = args[1].map(tableObj => {
            const table = this.table(tableObj.name!.split('/').pop()!);
            table.metadata = tableObj;
            return table;
          });
        }

        callback(...args);
      }
    );
  }

  setIamPolicy(
    policy: Policy,
    gaxOptions?: CallOptions
  ): Promise<SetIamPolicyResponse>;
  setIamPolicy(
    policy: Policy,
    gaxOptions: CallOptions,
    callback: SetIamPolicyCallback
  ): void;
  setIamPolicy(policy: Policy, callback: SetIamPolicyCallback): void;
  /**
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.error An error returned while making this request.
   * @param {Policy} policy The policy.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_set_instance_Iam_policy
   */
  setIamPolicy(
    policy: Policy,
    gaxOptionsOrCallback?: CallOptions | SetIamPolicyCallback,
    callback?: SetIamPolicyCallback
  ): void | Promise<SetIamPolicyResponse> {
    const gaxOptions =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    callback =
      typeof gaxOptionsOrCallback === 'function'
        ? gaxOptionsOrCallback
        : callback!;

    if (policy.etag !== null && policy.etag !== undefined) {
      ((policy.etag as {}) as Buffer) = Buffer.from(policy.etag);
    }
    const reqOpts = {
      resource: this.name,
      policy,
    };

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'setIamPolicy',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      (err, resp) => {
        if (err) {
          callback!(err);
        }
        callback!(null, Table.decodePolicyEtag(resp));
      }
    );
  }

  setMetadata(
    metadata: IInstance,
    options?: CallOptions
  ): Promise<SetInstanceMetadataResponse>;
  setMetadata(
    metadata: IInstance,
    options: CallOptions,
    callback: SetInstanceMetadataCallback
  ): void;
  setMetadata(metadata: IInstance, callback: SetInstanceMetadataCallback): void;
  /**
   * Set the instance metadata.
   *
   * @param {object} metadata Metadata object.
   * @param {string} metadata.displayName The descriptive name for this
   *     instance as it appears in UIs. It can be changed at any time, but
   *     should be kept globally unique to avoid confusion.
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_set_meta_data
   */
  setMetadata(
    metadata: IInstance,
    optionsOrCallback?: CallOptions | SetInstanceMetadataCallback,
    cb?: SetInstanceMetadataCallback
  ): void | Promise<SetInstanceMetadataResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const reqOpts = {
      instance: Object.assign({name: this.name}, metadata),
      updateMask: {
        paths: [],
      },
    } as google.bigtable.admin.v2.IPartialUpdateInstanceRequest;
    const fieldsForMask = ['displayName', 'type', 'labels'];

    fieldsForMask.forEach(field => {
      if (field in reqOpts.instance!) {
        reqOpts.updateMask!.paths!.push(snakeCase(field));
      }
    });

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'partialUpdateInstance',
        reqOpts,
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
   * Get a reference to a Bigtable table.
   *
   * @param {string} id Unique identifier of the table.
   * @returns {Table}
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('presidents');
   */
  table(id: string): Table {
    return new Table(this, id);
  }

  testIamPermissions(
    permissions: string | string[],
    gaxOptions?: CallOptions
  ): Promise<TestIamPermissionsResponse>;
  testIamPermissions(
    permissions: string | string[],
    callback: TestIamPermissionsCallback
  ): void;
  testIamPermissions(
    permissions: string | string[],
    gaxOptions: CallOptions,
    callback: TestIamPermissionsCallback
  ): void;
  /**
   *
   * @param {string | string[]} permissions The permission(s) to test for.
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.error An error returned while making this request.
   * @param {string[]} permissions A subset of permissions that the caller is
   *     allowed.
   *
   * @example <caption>include:samples/document-snippets/instance.js</caption>
   * region_tag:bigtable_test_instance_Iam_permissions
   */
  testIamPermissions(
    permissions: string | string[],
    gaxOptionsOrCallback?: CallOptions | TestIamPermissionsCallback,
    callback?: TestIamPermissionsCallback
  ): void | Promise<TestIamPermissionsResponse> {
    const gaxOptions =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    callback =
      typeof gaxOptionsOrCallback === 'function'
        ? gaxOptionsOrCallback
        : callback!;

    const reqOpts = {
      resource: this.name,
      permissions: arrify(permissions),
    };

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'testIamPermissions',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      (err, resp) => {
        if (err) {
          callback!(err);
          return;
        }
        callback!(null, resp.permissions);
      }
    );
  }
}

/**
 * Get {@link Table} objects for all the tables in your Cloud Bigtable
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
 *   .on('end', () => {
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
Instance.prototype.getTablesStream = paginator.streamify<Table>('getTables');

/*! Developer Documentation
 *
 * These methods can be auto-paginated.
 */
paginator.extend(Instance, ['getTables']);

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(Instance, {
  exclude: ['appProfile', 'cluster', 'table'],
});

/**
 * Reference to the {@link Instance} class.
 * @name module:@google-cloud/bigtable.Instance
 * @see Instance
 */
