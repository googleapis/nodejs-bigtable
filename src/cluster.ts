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

import {promisifyAll} from '@google-cloud/promisify';
import {CallOptions, Operation as GaxOperation} from 'google-gax';
import {ServiceError} from '@grpc/grpc-js';

import {google as btTypes} from '../protos/protos';
import {Bigtable} from '.';
import {Instance} from './instance';

export interface GenericCallback<T> {
  (err?: ServiceError | null, apiResponse?: T | null): void;
}
export interface GenericClusterCallback<T> {
  (
    err?: ServiceError | null,
    cluster?: Cluster | null,
    apiResponse?: T | null
  ): void;
}
export interface GenericOperationCallback<T> {
  (
    err?: ServiceError | null,
    operation?: GaxOperation | null,
    apiResponse?: T | null
  ): void;
}

export type IEmpty = btTypes.protobuf.IEmpty;
export type ICluster = btTypes.bigtable.admin.v2.ICluster;
export type IOperation = btTypes.longrunning.IOperation;

export type ApiResponse = [IOperation];
export type CreateClusterResponse = [ICluster, GaxOperation, IOperation];
export type BooleanResponse = [boolean];
export type GetClusterResponse = [ICluster, IOperation];
export type MetadataResponse = [Metadata, IOperation];

export type CreateClusterCallback = GenericCallback<IOperation>;
export type DeleteClusterCallback = GenericCallback<IOperation>;
export type ExistsClusterCallback = GenericCallback<boolean>;
export type GetClusterCallback = GenericClusterCallback<ICluster>;
export type SetClusterMetadataCallback = GenericOperationCallback<IOperation>;

export interface CreateClusterOptions {
  gaxOptions?: CallOptions;
  location: string;
  nodes: number;
  storage?: string;
}
export interface GetClusterMetadataCallback {
  // tslint:disable-next-line no-any
  (...args: any[]): void;
  (
    err: ServiceError | null,
    metadata?: ICluster | null,
    apiResponse?: IOperation | null
  ): void;
}
export interface Metadata extends CreateClusterOptions {
  displayName?: string;
}

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
export class Cluster {
  bigtable: Bigtable;
  instance: Instance;
  id: string;
  name: string;
  metadata?: Metadata;
  constructor(instance: Instance, id: string) {
    this.bigtable = instance.bigtable;
    this.instance = instance;

    let name: string;

    if (id.includes('/')) {
      if (id.startsWith(`${instance.name}/clusters/`)) {
        name = id;
      } else {
        throw new Error(`Cluster id '${id}' is not formatted correctly.
Please use the format 'my-cluster' or '${instance.name}/clusters/my-cluster'.`);
      }
    } else {
      name = `${instance.name}/clusters/${id}`;
    }
    this.id = name.split('/').pop()!;
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
  static getLocation_(project: string, location: string): string {
    if (location.includes('/')) {
      return location;
    }

    // in-case project has '/', split and pick last component
    if (project.includes('/')) {
      project = project.split('/').pop()!;
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
  static getStorageType_(type: string): number {
    const storageTypes: {[k: string]: number} = {
      unspecified: 0,
      ssd: 1,
      hdd: 2,
    };

    if (typeof type === 'string') {
      type = type.toLowerCase();
    }

    return storageTypes[type] || storageTypes.unspecified;
  }

  create(): Promise<CreateClusterResponse>;
  create(options: CreateClusterOptions): Promise<CreateClusterResponse>;
  create(callback: CreateClusterCallback): void;
  create(options: CreateClusterOptions, callback: CreateClusterCallback): void;
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
  create(
    optionsOrCallback?: CreateClusterOptions | CreateClusterCallback,
    cb?: CreateClusterCallback
  ): void | Promise<CreateClusterResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const options =
      typeof optionsOrCallback === 'object' && optionsOrCallback
        ? optionsOrCallback
        : ({} as CreateClusterOptions);

    this.instance.createCluster(this.id, options, callback);
  }

  delete(): Promise<ApiResponse>;
  delete(gaxOptions: CallOptions): Promise<ApiResponse>;
  delete(callback: DeleteClusterCallback): void;
  delete(gaxOptions: CallOptions, callback: DeleteClusterCallback): void;
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
  delete(
    gaxOptionsOrCallback?: CallOptions | DeleteClusterCallback,
    cb?: DeleteClusterCallback
  ): void | Promise<ApiResponse> {
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;
    const gaxOptions =
      typeof gaxOptionsOrCallback === 'object' && gaxOptionsOrCallback
        ? gaxOptionsOrCallback
        : ({} as CallOptions);

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

  exists(): Promise<BooleanResponse>;
  exists(gaxOptions: CallOptions): Promise<BooleanResponse>;
  exists(callback: ExistsClusterCallback): void;
  exists(gaxOptions: CallOptions, callback: ExistsClusterCallback): void;
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
  exists(
    gaxOptionsOrCallback?: CallOptions | ExistsClusterCallback,
    cb?: ExistsClusterCallback
  ): void | Promise<BooleanResponse> {
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;
    const gaxOptions =
      typeof gaxOptionsOrCallback === 'object' && gaxOptionsOrCallback
        ? gaxOptionsOrCallback
        : ({} as CallOptions);

    this.getMetadata(gaxOptions, (err?: ServiceError | null) => {
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

  get(): Promise<GetClusterResponse>;
  get(gaxOptions: CallOptions): Promise<GetClusterResponse>;
  get(callback: GetClusterCallback): void;
  get(gaxOptions: CallOptions, callback: GetClusterCallback): void;
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
  get(
    gaxOptionsOrCallback?: CallOptions | GetClusterCallback,
    cb?: GetClusterCallback
  ): void | Promise<GetClusterResponse> {
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;
    const gaxOptions =
      typeof gaxOptionsOrCallback === 'object' && gaxOptionsOrCallback
        ? gaxOptionsOrCallback
        : ({} as CallOptions);

    this.getMetadata(
      gaxOptions,
      (err?: ServiceError | null, metadata?: ICluster | null) => {
        callback(err, err ? null : this, metadata);
      }
    );
  }

  getMetadata(): Promise<MetadataResponse>;
  getMetadata(gaxOptions: CallOptions): Promise<MetadataResponse>;
  getMetadata(callback: GetClusterMetadataCallback): void;
  getMetadata(
    gaxOptions: CallOptions,
    callback: GetClusterMetadataCallback
  ): void;
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
  getMetadata(
    gaxOptionsOrCallback?: CallOptions | GetClusterMetadataCallback,
    cb?: GetClusterMetadataCallback
  ): void | Promise<MetadataResponse> {
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;
    const gaxOptions =
      typeof gaxOptionsOrCallback === 'object' && gaxOptionsOrCallback
        ? gaxOptionsOrCallback
        : ({} as CallOptions);

    this.bigtable.request(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'getCluster',
        reqOpts: {
          name: this.name,
        },
        gaxOpts: gaxOptions,
      },
      // tslint:disable-next-line no-any
      (...args: any[]) => {
        if (args[1]) {
          this.metadata = args[1];
        }

        callback(...args);
      }
    );
  }

  setMetadata(metadata: CreateClusterOptions): Promise<MetadataResponse>;
  setMetadata(
    metadata: CreateClusterOptions,
    gaxOptions: CallOptions
  ): Promise<MetadataResponse>;
  setMetadata(
    metadata: CreateClusterOptions,
    callback: SetClusterMetadataCallback
  ): void;
  setMetadata(
    metadata: CreateClusterOptions,
    gaxOptions: CallOptions,
    callback: SetClusterMetadataCallback
  ): void;
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
  setMetadata(
    metadata: CreateClusterOptions,
    gaxOptionsOrCallback?: CallOptions | SetClusterMetadataCallback,
    cb?: SetClusterMetadataCallback
  ): void | Promise<MetadataResponse> {
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;
    const gaxOptions =
      typeof gaxOptionsOrCallback === 'object' && gaxOptionsOrCallback
        ? gaxOptionsOrCallback
        : ({} as CallOptions);

    // tslint:disable-next-line no-any
    const reqOpts: any = {
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
