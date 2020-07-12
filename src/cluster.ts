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
import {PreciseDate} from '@google-cloud/precise-date';
import {promisifyAll} from '@google-cloud/promisify';
import {
  CallOptions,
  LROperation,
  Operation as GaxOperation,
  Operation,
  ServiceError,
} from 'google-gax';
import snakeCase = require('lodash.snakecase');

import {google} from '../protos/protos';
import {Bigtable} from '.';
import {Table} from './table';
import {Instance} from './instance';
import {Backup} from './backup';

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

export type IEmpty = google.protobuf.IEmpty;
export type ICluster = google.bigtable.admin.v2.ICluster;
export type IOperation = google.longrunning.IOperation;

export type ApiResponse = [IOperation];
export type CreateClusterResponse = [ICluster, GaxOperation, IOperation];
export type BooleanResponse = [boolean];
export type GetClusterResponse = [ICluster, IOperation];
export type GetClustersResponse = [Cluster[], IOperation];
export type GetClusterMetadataResponse = [ICluster, IOperation];
export type SetClusterMetadataResponse = [Operation, google.protobuf.Empty];

export type CreateClusterCallback = GenericCallback<IOperation>;
export type DeleteClusterCallback = GenericCallback<IOperation>;
export type ExistsClusterCallback = GenericCallback<boolean>;
export type GetClusterCallback = GenericClusterCallback<ICluster>;
export type GetClustersCallback = (
  err: ServiceError | null,
  clusters?: Cluster[],
  apiResponse?: google.bigtable.admin.v2.IListClustersResponse
) => void;
export interface SetClusterMetadataOptions {
  nodes: number;
}
export type SetClusterMetadataCallback = GenericOperationCallback<
  Operation | null | undefined
>;
export interface BasicClusterConfig {
  location: string;
  nodes: number;
  storage?: string;
}

export interface CreateClusterOptions extends BasicClusterConfig {
  gaxOptions?: CallOptions;
}
export type GetClusterMetadataCallback = (
  err: ServiceError | null,
  metadata?: ICluster | null,
  apiResponse?: IOperation | null
) => void;

export type BackupTimestamp = google.protobuf.ITimestamp | PreciseDate | Date;
export interface ModifiableBackupFields {
  /**
   * The ITimestamp (Date or PreciseDate will be converted) representing
   * when the backup will automatically be deleted. This must be at a
   * minimum 6 hours from the time of the backup request and a maximum of 30
   * days.
   */
  expireTime?: BackupTimestamp;
}

export interface CreateBackupOptions {
  gaxOptions?: CallOptions;
}
export type CreateBackupCallback = (
  err: ServiceError | null,
  apiResponse?: LROperation<
    google.bigtable.admin.v2.IBackup,
    google.bigtable.admin.v2.ICreateBackupMetadata
  >
) => void;
export type CreateBackupResponse = [
  LROperation<
    google.bigtable.admin.v2.IBackup,
    google.bigtable.admin.v2.ICreateBackupMetadata
  >
];

export interface DeleteBackupOptions {
  gaxOptions?: CallOptions;
}
export type DeleteBackupCallback = (
  err: ServiceError | null,
  apiResponse?: google.protobuf.IEmpty
) => void;
export type DeleteBackupResponse = [google.protobuf.IEmpty];

export interface GetBackupOptions {
  gaxOptions?: CallOptions;
}
export type GetBackupCallback = (
  err: ServiceError | null,
  apiResponse?: Backup
) => void;
export type GetBackupResponse = [Backup];

export interface ListBackupsOptions {
  /**
   * A filter expression that filters backups listed in the response.
   *   The expression must specify the field name, a comparison operator,
   *   and the value that you want to use for filtering. The value must be a
   *   string, a number, or a boolean. The comparison operator must be
   *   <, >, <=, >=, !=, =, or :. Colon ‘:’ represents a HAS operator which is
   *   roughly synonymous with equality. Filter rules are case insensitive.
   */
  filter?: string;

  /**
   * An expression for specifying the sort order of the results of the request.
   *   The string value should specify one or more fields in
   *   {@link google.bigtable.admin.v2.Backup|Backup}. The full syntax is
   *   described at https://aip.dev/132#ordering.
   */
  orderBy?: string;

  /**
   * Maximum results to return per page.
   * @default Infinity
   */
  pageSize?: number;

  /**
   * A previously-returned page token representing part of a larger set of
   * results to view.
   */
  pageToken?: string;

  gaxOptions?: CallOptions;
}

export interface ListBackupsStreamOptions extends ListBackupsOptions {
  /**
   * Have pagination handled automatically.
   * @default true
   */
  autoPaginate?: boolean;

  /**
   * Maximum API calls to make.
   * @default Infinity
   */
  maxApiCalls?: number;
}

export type ListBackupsResponse = [Backup[]];
export type ListBackupsCallback = (
  err: ServiceError | null,
  metadata?: Backup[]
) => void;

export interface UpdateBackupOptions {
  gaxOptions?: CallOptions;
}
export type UpdateBackupCallback = (
  err: ServiceError | null,
  apiResponse?: Backup
) => void;
export type UpdateBackupResponse = [Backup];

/**
 * Create a cluster object to interact with your cluster.
 *
 * @class
 * @param {Instance} instance The parent instance of this cluster.
 * @param {string} id Id of the cluster.
 *
 * @example
 * const {Bigtable} = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const cluster = instance.cluster('my-cluster');
 */
export class Cluster {
  bigtable: Bigtable;
  instance: Instance;
  id: string;
  name: string;
  metadata?: ICluster;
  listBackupsStream!: (
    options?: ListBackupsStreamOptions
  ) => ResourceStream<Backup>;

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

  getMetadata(): Promise<GetClusterMetadataResponse>;
  getMetadata(gaxOptions: CallOptions): Promise<GetClusterMetadataResponse>;
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
  ): void | Promise<GetClusterMetadataResponse> {
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;
    const gaxOptions =
      typeof gaxOptionsOrCallback === 'object' && gaxOptionsOrCallback
        ? gaxOptionsOrCallback
        : ({} as CallOptions);

    this.bigtable.request<google.bigtable.admin.v2.ICluster>(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'getCluster',
        reqOpts: {
          name: this.name,
        },
        gaxOpts: gaxOptions,
      },
      (err, resp) => {
        if (resp) {
          this.metadata = resp;
        }
        callback(err, resp);
      }
    );
  }

  setMetadata(
    metadata: SetClusterMetadataOptions,
    gaxOptions?: CallOptions
  ): Promise<SetClusterMetadataResponse>;
  setMetadata(
    metadata: SetClusterMetadataOptions,
    callback: SetClusterMetadataCallback
  ): void;
  setMetadata(
    metadata: SetClusterMetadataOptions,
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
    metadata: SetClusterMetadataOptions,
    gaxOptionsOrCallback?: CallOptions | SetClusterMetadataCallback,
    cb?: SetClusterMetadataCallback
  ): void | Promise<SetClusterMetadataResponse> {
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;
    const gaxOptions =
      typeof gaxOptionsOrCallback === 'object'
        ? gaxOptionsOrCallback
        : ({} as CallOptions);

    const reqOpts: ICluster = Object.assign(
      {},
      {
        name: this.name,
        serveNodes: metadata.nodes,
      },
      metadata
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (reqOpts as any).nodes;

    this.bigtable.request<Operation>(
      {
        client: 'BigtableInstanceAdminClient',
        method: 'updateCluster',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      (err, resp) => {
        callback(err, resp);
      }
    );
  }

  createBackup(
    table: Table,
    id: string,
    fields: Required<ModifiableBackupFields>,
    options?: CreateBackupOptions
  ): Promise<CreateBackupResponse>;
  createBackup(
    table: Table,
    id: string,
    fields: Required<ModifiableBackupFields>,
    options: CreateBackupOptions,
    callback: CreateBackupCallback
  ): void;
  createBackup(
    table: Table,
    id: string,
    fields: Required<ModifiableBackupFields>,
    callback: CreateBackupCallback
  ): void;
  /**
   * Starts creating a new Cloud Bigtable Backup from this cluster.
   *
   * The returned backup
   * {@link google.longrunning.Operation|long-running operation} can be used to
   * track creation of the backup. Cancelling the returned operation will
   * stop the creation and delete the backup.
   *
   * @param {Table} table A reference to the Table to backup.
   * @param {string} id
   *   Required. The id of the backup to be created. The `backup_id` along with
   *   the parent `parent` are combined as {parent}/backups/{backup_id} to
   *   create the full backup name, of the form:
   *   `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup_id}`.
   *   This string must be between 1 and 50 characters in length and match the
   *   regex {@link -_.a-zA-Z0-9|_a-zA-Z0-9}*.
   * @param {ModifiableBackupFields} fields Fields to be specified.
   * @param {BackupTimestamp} fields.expireTime When the backup will be
   *   automatically deleted.
   * @param {CreateBackupOptions | CreateBackupCallback} [optionsOrCallback]
   * @param {CreateBackupCallback} [cb]
   * @return {void | Promise<CreateBackupResponse>}
   *
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_create_backup
   */
  createBackup(
    table: Table,
    id: string,
    fields: Required<ModifiableBackupFields>,
    optionsOrCallback?: CreateBackupOptions | CreateBackupCallback,
    cb?: CreateBackupCallback
  ): void | Promise<CreateBackupResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    if (!table) {
      throw new Error('A reference to a table is required to create a backup.');
    }

    if (!id) {
      throw new Error('An id is required to create a backup.');
    }

    if (!fields || !fields.expireTime) {
      throw new Error('Must specify the `expireTime` field.');
    }

    const {expireTime, ...restFields} = fields;

    const backup: google.bigtable.admin.v2.IBackup = {
      sourceTable: table.name,
      ...restFields,
    };

    if (expireTime instanceof Date) {
      backup.expireTime = new PreciseDate(expireTime).toStruct();
    } else {
      backup.expireTime = expireTime;
    }

    const reqOpts: google.bigtable.admin.v2.ICreateBackupRequest = {
      parent: this.name,
      backupId: id,
      backup,
    };

    this.bigtable.request<
      LROperation<
        google.bigtable.admin.v2.IBackup,
        google.bigtable.admin.v2.ICreateBackupMetadata
      >
    >(
      {
        client: 'BigtableTableAdminClient',
        method: 'createBackup',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      callback // TODO cast as Backup
    );
  }

  deleteBackup(
    id: string,
    options?: DeleteBackupOptions
  ): Promise<DeleteBackupResponse>;
  deleteBackup(
    id: string,
    options: DeleteBackupOptions,
    callback: DeleteBackupCallback
  ): void;
  deleteBackup(id: string, callback: DeleteBackupCallback): void;
  /**
   * Deletes a pending or completed Cloud Bigtable backup from this cluster.
   *
   * @param {string} id
   *   Required. The unique ID of the backup. This is not the full name of
   *   the backup, but just the backup ID part.
   * @param {DeleteBackupOptions | DeleteBackupCallback} [optionsOrCallback]
   * @param {DeleteBackupCallback} [cb]
   * @return {void | Promise<DeleteBackupResponse>}
   *
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_delete_backup
   */
  deleteBackup(
    id: string,
    optionsOrCallback?: DeleteBackupOptions | DeleteBackupCallback,
    cb?: DeleteBackupCallback
  ): void | Promise<DeleteBackupResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    if (!id) {
      throw new Error('The backup id/name is required.');
    }

    const name = `${this.name}/backups/${id}`;

    const reqOpts: google.bigtable.admin.v2.IDeleteBackupRequest = {
      name,
    };

    this.bigtable.request<google.protobuf.IEmpty>(
      {
        client: 'BigtableTableAdminClient',
        method: 'deleteBackup',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      callback
    );
  }

  getBackup(id: string, options?: GetBackupOptions): Promise<GetBackupResponse>;
  getBackup(
    id: string,
    options: GetBackupOptions,
    callback: GetBackupCallback
  ): void;
  getBackup(id: string, callback: GetBackupCallback): void;
  /**
   * Gets metadata on a pending or completed Cloud Bigtable Backup relative
   * to this cluster.
   *
   * @param {string} id
   *   Required. The unique ID of the backup. This is not the full name of
   *   the backup, but just the backup ID part.
   * @param {GetBackupOptions | GetBackupCallback} [optionsOrCallback]
   * @param {GetBackupCallback} [cb]
   * @return {void | Promise<GetBackupResponse>}
   *
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_get_backup
   */
  getBackup(
    id: string,
    optionsOrCallback?: GetBackupOptions | GetBackupCallback,
    cb?: GetBackupCallback
  ): void | Promise<GetBackupResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    if (!id) {
      throw new Error('The backup id/name is required.');
    }

    const name = `${this.name}/backups/${id}`;

    const reqOpts: google.bigtable.admin.v2.IGetBackupRequest = {
      name,
    };

    this.bigtable.request<google.bigtable.admin.v2.IBackup>(
      {
        client: 'BigtableTableAdminClient',
        method: 'getBackup',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (err, resp) => {
        let backup;
        if (resp) {
          backup = new Backup(this.bigtable, resp);
        }

        callback(err, backup);
      }
    );
  }

  listBackups(options?: ListBackupsOptions): Promise<ListBackupsResponse>;
  listBackups(options: ListBackupsOptions, callback: ListBackupsCallback): void;
  listBackups(callback: ListBackupsCallback): void;
  /**
   * Lists Cloud Bigtable backups within this cluster. Returns both
   * completed and pending backups.
   *
   * @param {ListBackupsOptions | ListBackupsCallback} [optionsOrCallback]
   * @param {ListBackupsCallback} [cb]
   * @return {void | Promise<ListBackupsResponse>}
   *
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_list_backups
   */
  listBackups(
    optionsOrCallback?: ListBackupsOptions | ListBackupsCallback,
    cb?: ListBackupsCallback
  ): void | Promise<ListBackupsResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    const reqOpts: google.bigtable.admin.v2.IListBackupsRequest = {
      parent: this.name,
      filter: options.filter,
      orderBy: options.orderBy,
      pageSize: options.pageSize,
      pageToken: options.pageToken,
    };

    this.bigtable.request<google.bigtable.admin.v2.IBackup[]>(
      {
        client: 'BigtableTableAdminClient',
        method: 'listBackups',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (err, resp) => {
        let backups;
        if (resp) {
          backups = resp.map(backup => new Backup(this.bigtable, backup));
        }

        callback(err, backups);
      }
    );
  }

  updateBackup(
    id: string,
    fields: ModifiableBackupFields,
    options?: UpdateBackupOptions
  ): Promise<UpdateBackupResponse>;
  updateBackup(
    id: string,
    fields: ModifiableBackupFields,
    options: UpdateBackupOptions,
    callback: UpdateBackupCallback
  ): void;
  updateBackup(
    id: string,
    fields: ModifiableBackupFields,
    callback: UpdateBackupCallback
  ): void;
  /**
   * Updates a pending or completed Cloud Bigtable Backup.
   *
   * @param {string} id
   *   Required. The unique ID of the backup. This is not the full name of
   *   the backup, but just the backup ID part.
   * @param {ModifiableBackupFields} fields
   *   Required. The fields to be updated.
   * @param {BackupTimestamp} fields.expireTime
   *   Required. This is currently the only supported field.
   * @param {UpdateBackupOptions | UpdateBackupCallback} [optionsOrCallback]
   * @param {GetBackupCallback} [cb]
   * @return {void | Promise<UpdateBackupResponse>}
   */
  updateBackup(
    id: string,
    fields: ModifiableBackupFields,
    optionsOrCallback?: UpdateBackupOptions | UpdateBackupCallback,
    cb?: UpdateBackupCallback
  ): void | Promise<UpdateBackupResponse> {
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

    if (!id) {
      throw new Error('The backup id/name is required.');
    }

    if (!fields || !fields.expireTime) {
      throw new Error(
        'Must specify at least one field to update (e.g. expireTime).'
      );
    }

    const name = `${this.name}/backups/${id}`;
    const {expireTime, ...restFields} = fields;

    const backup: google.bigtable.admin.v2.IBackup = {
      name,
      ...restFields,
    };

    if (fields.expireTime) {
      if (expireTime instanceof Date) {
        backup.expireTime = new PreciseDate(expireTime).toStruct();
      } else {
        backup.expireTime = expireTime;
      }
    }

    const reqOpts: google.bigtable.admin.v2.IUpdateBackupRequest = {
      backup,
      updateMask: {
        paths: [],
      },
    };

    const fieldsForMask = ['expireTime'];
    fieldsForMask.forEach(field => {
      if (field in fields) {
        reqOpts.updateMask!.paths!.push(snakeCase(field));
      }
    });

    this.bigtable.request<google.bigtable.admin.v2.IBackup>(
      {
        client: 'BigtableTableAdminClient',
        method: 'updateBackup',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (err, resp) => {
        let backup;
        if (resp) {
          backup = new Backup(this.bigtable, resp);
        }

        callback(err, backup);
      }
    );
  }
}

/**
 * Lists Cloud Bigtable backups within this cluster. Provides both
 * completed and pending backups as a readable object stream.
 *
 * @param {ListBackupsStreamOptions} [options] Configuration object. See
 *     {@link Cluster#listBackups} for a complete list of options.
 * @returns {ResourceStream<Backup>}
 *
 * @example
 * const {Bigtable} = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const cluster = instance.cluster('my-cluster');
 *
 * instance.listBackupsStream()
 *   .on('error', console.error)
 *   .on('data', function(backup) {
 *     // backup is a Backup object.
 *   })
 *   .on('end', () => {
 *     // All backups retrieved.
 *   });
 *
 * //-
 * // If you anticipate many results, you can end a stream early to prevent
 * // unnecessary processing and API requests.
 * //-
 * cluster.listBackupsStream()
 *   .on('data', function(backup) {
 *     this.end();
 *   });
 */
Cluster.prototype.listBackupsStream = paginator.streamify<Backup>(
  'listBackups'
);

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
