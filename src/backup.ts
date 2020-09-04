// Copyright 2020 Google LLC
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

import {PreciseDate} from '@google-cloud/precise-date';
import {promisifyAll} from '@google-cloud/promisify';
import snakeCase = require('lodash.snakecase');
import {google} from '../protos/protos';
import {Bigtable, Cluster, Table} from './';
import {
  CreateBackupConfig,
  CreateBackupCallback,
  CreateBackupResponse,
  IOperation,
} from './cluster';
import {CallOptions, LROperation, Operation, ServiceError} from 'google-gax';

type IEmpty = google.protobuf.IEmpty;
export type IBackup = google.bigtable.admin.v2.IBackup;

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

export interface GenericBackupCallback<T> {
  (
    err?: ServiceError | null,
    backup?: Backup | null,
    apiResponse?: T | null
  ): void;
}

export type DeleteBackupCallback = (
  err: ServiceError | null,
  apiResponse?: IEmpty
) => void;
export type DeleteBackupResponse = [IEmpty];

export type BackupExistsCallback = (
  err: ServiceError | null,
  exists?: boolean
) => void;
export type BackupExistsResponse = [boolean];

export type GetBackupCallback = GenericBackupCallback<IBackup>;
export type GetBackupResponse = [Backup, IBackup];

export type BackupGetMetadataCallback = (
  err?: ServiceError | null,
  metadata?: IBackup | null
) => void;
export type BackupGetMetadataResponse = [IBackup];

export type BackupSetMetadataCallback = (
  err: ServiceError | null,
  metadata: IBackup,
  resp: IBackup
) => void;
export type BackupSetMetadataResponse = [IBackup, IBackup];

export type RestoreTableCallback = (
  err: ServiceError | null,
  table?: Table,
  operation?: Operation,
  apiResponse?: IOperation
) => void;
export type RestoreTableResponse = [Table, Operation, IOperation];

export interface GetBackupsOptions {
  /**
   * A filter expression that filters backups listed in the response. The
   * expression must specify the field name, a comparison operator, and the
   * value that you want to use for filtering. The value must be a string, a
   * number, or a boolean. The comparison operator must be <, >, <=, >=, !=, =,
   * or :. Colon ‘:’ represents a HAS operator which is roughly synonymous with
   * equality. Filter rules are case insensitive.
   */
  filter?: string;

  /**
   * An expression for specifying the sort order of the results of the request.
   * The string value should specify one or more fields in
   * {@link google.bigtable.admin.v2.Backup|Backup}. The full syntax is
   * described at https://aip.dev/132#ordering.
   */
  orderBy?: string;

  gaxOptions?: CallOptions;

  pageSize?: number;
  pageToken?: string;
  autoPaginate?: boolean;
}

export type GetBackupsResponse = [
  Backup[],
  GetBackupsOptions,
  google.bigtable.admin.v2.IListBackupsResponse
];
export type GetBackupsCallback = (
  err: ServiceError | null,
  backups?: Backup[],
  nextQuery?: GetBackupsOptions,
  apiResponse?: google.bigtable.admin.v2.IListBackupsResponse
) => void;

/**
 * Interact with backups like get detailed information from BigTable, create
 * a backup, or restore a backup to a table.
 *
 * @class
 * @param {Cluster} cluster The parent instance of this backup.
 * @param {string} name Name of the backup.
 *
 * @example
 * const {Bigtable} = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const cluster = instance.cluster('my-cluster');
 * const backup = cluster.backup('my-backup');
 */
export class Backup {
  bigtable: Bigtable;
  cluster: Cluster;

  /**
   * A unique backup string, e.g. "my-backup".
   */
  id: string;

  /**
   * The full path of the backup which is in the form of:
   *  `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}`.
   */
  name: string;
  metadata?: IBackup;

  /**
   * @param {Cluster} cluster
   * @param {string} id The backup name or id.
   */
  constructor(cluster: Cluster, id: string) {
    this.bigtable = cluster.bigtable;
    this.cluster = cluster;

    if (id.includes('/')) {
      if (id.startsWith(cluster.name)) {
        this.name = id;
        this.id = id.split('/').pop()!;
      } else {
        throw new Error(`Backup id '${id}' is not formatted correctly.
Please use the format 'my-backup' or '${cluster.name}/backups/my-backup'.`);
      }
    } else {
      this.name = `${this.cluster.name}/backups/${id}`;
      this.id = id;
    }
  }

  /**
   * A Date-compatible PreciseDate representing the time that the backup was
   * finished.
   * @readonly
   * @return {PreciseDate}
   */
  get endDate(): PreciseDate {
    if (!this.metadata || !this.metadata.endTime) {
      throw new TypeError('An endTime is required to convert to Date.');
    }
    return new PreciseDate({
      seconds: this.metadata.endTime.seconds!,
      nanos: this.metadata.endTime.nanos!,
    });
  }

  /**
   * A Date-compatible PreciseDate representing the expiration time of this
   * backup.
   * @readonly
   * @return {PreciseDate}
   */
  get expireDate(): PreciseDate {
    if (!this.metadata || !this.metadata.expireTime) {
      throw new TypeError('An expireTime is required to convert to Date.');
    }
    return new PreciseDate({
      seconds: this.metadata.expireTime.seconds!,
      nanos: this.metadata.expireTime.nanos!,
    });
  }

  /**
   * A Date-compatible PreciseDate representing the time that this backup was
   * started.
   * @readonly
   * @return {PreciseDate}
   */
  get startDate(): PreciseDate {
    if (!this.metadata || !this.metadata.startTime) {
      throw new TypeError('A startTime is required to convert to Date.');
    }
    return new PreciseDate({
      seconds: this.metadata.startTime.seconds!,
      nanos: this.metadata.startTime.nanos!,
    });
  }

  create(config: CreateBackupConfig, callback?: CreateBackupCallback): void;
  create(config: CreateBackupConfig): Promise<CreateBackupResponse>;
  /**
   * Starts creating a new Cloud Bigtable Backup.
   *
   * The returned {@link google.longrunning.Operation|long-running operation}
   * can be used to track creation of the backup. Cancelling the returned
   * operation will stop the creation and delete the backup.
   *
   * @param {CreateBackupConfig} config Configuration object.
   * @param {BackupTimestamp} config.expireTime When the backup will be
   *     automatically deleted.
   * @param {string|Table} config.table Table to create the backup from.
   * @param {CallOptions} [config.gaxOptions] Request configuration options,
   *     outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {CreateBackupCallback} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Backup} callback.backup The newly created Backup.
   * @param {Operation} callback.operation An operation object that can be used
   *     to check the status of the request.
   * @param {object} callback.apiResponse The full API response.
   * @return {void | Promise<CreateBackupResponse>}
   */
  create(
    config: CreateBackupConfig,
    callback?: CreateBackupCallback
  ): void | Promise<CreateBackupResponse> {
    this.cluster.createBackup(this.id, config, callback!);
  }

  delete(gaxOptions?: CallOptions): Promise<DeleteBackupResponse>;
  delete(callback: DeleteBackupCallback): void;
  delete(gaxOptions: CallOptions, callback: DeleteBackupCallback): void;
  /**
   * Deletes this pending or completed Cloud Bigtable backup.
   *
   * @param {CallOptions | DeleteBackupCallback} [gaxOptionsOrCallback]
   * @param {DeleteBackupCallback} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object} callback.apiResponse The full API response.
   * @return {void | Promise<DeleteBackupResponse>}
   */
  delete(
    gaxOptionsOrCallback?: CallOptions | DeleteBackupCallback,
    cb?: DeleteBackupCallback
  ): void | Promise<DeleteBackupResponse> {
    const gaxOpts =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    this.bigtable.request<google.protobuf.IEmpty>(
      {
        client: 'BigtableTableAdminClient',
        method: 'deleteBackup',
        reqOpts: {
          name: this.name,
        },
        gaxOpts,
      },
      callback
    );
  }

  exists(gaxOptions?: CallOptions): Promise<BackupExistsResponse>;
  exists(gaxOptions: CallOptions, callback: BackupExistsCallback): void;
  exists(callback: BackupExistsCallback): void;
  /**
   * Check if a backup exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {boolean} callback.exists Whether the backup exists or not.
   */
  exists(
    optionsOrCallback?: CallOptions | BackupExistsCallback,
    cb?: BackupExistsCallback
  ): void | Promise<BackupExistsResponse> {
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

  get(gaxOptions?: CallOptions): Promise<GetBackupResponse>;
  get(callback: GetBackupCallback): void;
  get(gaxOptions: CallOptions, callback: GetBackupCallback): void;
  /**
   * Get a backup if it exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {Backup} callback.backup The Backup instance.
   * @param {object} callback.apiResponse The full API response.
   */
  get(
    gaxOptionsOrCallback?: CallOptions | GetBackupCallback,
    cb?: GetBackupCallback
  ): void | Promise<GetBackupResponse> {
    const gaxOpts =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    this.getMetadata(
      gaxOpts,
      (err?: ServiceError | null, metadata?: IBackup | null) => {
        callback(err, err ? null : this, metadata);
      }
    );
  }

  getMetadata(gaxOptions?: CallOptions): Promise<BackupGetMetadataResponse>;
  getMetadata(callback: BackupGetMetadataCallback): void;
  getMetadata(
    gaxOptions: CallOptions,
    callback: BackupGetMetadataCallback
  ): void;
  /**
   * Get a backup if it exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.metadata The metadata.
   * @param {object} callback.apiResponse The full API response.
   */
  getMetadata(
    gaxOptionsOrCallback?: CallOptions | BackupGetMetadataCallback,
    cb?: BackupGetMetadataCallback
  ): void | Promise<BackupGetMetadataResponse> {
    const gaxOpts =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    this.bigtable.request<IBackup>(
      {
        client: 'BigtableTableAdminClient',
        method: 'getBackup',
        reqOpts: {
          name: this.name,
        },
        gaxOpts,
      },
      (err, resp) => {
        if (resp) {
          this.metadata = resp;
        }
        callback(err, resp);
      }
    );
  }

  restore(
    tableId: string,
    gaxOptions?: CallOptions
  ): Promise<RestoreTableResponse>;
  restore(
    tableId: string,
    gaxOptions: CallOptions,
    callback: RestoreTableCallback
  ): void;
  restore(tableId: string, callback: RestoreTableCallback): void;
  /**
   * Create a new table by restoring from this completed backup.
   *
   * The new table must be in the same instance as the instance containing
   * the backup. The returned
   * {@link google.longrunning.Operation|long-running operation} can be used
   * to track the progress of the operation, and to cancel it.
   *
   * @param {string} tableId The id of the table to create and restore to. This
   *   table must not already exist.
   * @param {CallOptions | RestoreTableCallback} [gaxOptionsOrCallback]
   * @param {RestoreTableCallback} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Table} callback.table The newly created Table.
   * @param {Operation} callback.operation An operation object that can be used
   *     to check the status of the request.
   * @param {object} callback.apiResponse The full API response.
   * @return {void | Promise<RestoreTableResponse>}
   */
  restore(
    tableId: string,
    gaxOptionsOrCallback?: CallOptions | RestoreTableCallback,
    cb?: RestoreTableCallback
  ): void | Promise<RestoreTableResponse> {
    const gaxOpts =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    this.bigtable.request<
      LROperation<
        google.bigtable.admin.v2.ITable,
        google.bigtable.admin.v2.IRestoreTableMetadata
      >
    >(
      {
        client: 'BigtableTableAdminClient',
        method: 'restoreTable',
        reqOpts: {
          parent: this.cluster.name,
          tableId,
          backup: this.name,
        },
        gaxOpts,
      },
      (err, ...args) => {
        if (err) {
          callback(err, undefined, ...args);
          return;
        }
        callback(err, this.cluster.instance.table(tableId), ...args);
      }
    );
  }

  setMetadata(
    metadata: ModifiableBackupFields,
    gaxOptions?: CallOptions
  ): Promise<BackupSetMetadataResponse>;
  setMetadata(
    metadata: ModifiableBackupFields,
    callback: BackupSetMetadataCallback
  ): void;
  setMetadata(
    metadata: ModifiableBackupFields,
    gaxOptions: CallOptions,
    callback: BackupSetMetadataCallback
  ): void;
  /**
   * Updates this pending or completed Cloud Bigtable Backup.
   *
   * @param {ModifiableBackupFields} metadata - The fields to be updated.
   * @param {CallOptions | BackupSetMetadataCallback} [gaxOptionsOrCallback]
   * @param {BackupSetMetadataCallback} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param
   * @param {object} callback.apiResponse The full API response.
   * @return {void | Promise<BackupSetMetadataResponse>}
   */
  setMetadata(
    metadata: ModifiableBackupFields,
    gaxOptionsOrCallback?: CallOptions | BackupSetMetadataCallback,
    cb?: BackupSetMetadataCallback
  ): void | Promise<BackupSetMetadataResponse> {
    const gaxOpts =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    const backup = {
      name: this.name,
      ...metadata,
    };

    if (backup.expireTime instanceof Date) {
      backup.expireTime = new PreciseDate(backup.expireTime).toStruct();
    }

    this.bigtable.request<IBackup>(
      {
        client: 'BigtableTableAdminClient',
        method: 'updateBackup',
        reqOpts: {
          backup,
          updateMask: {
            paths: Object.keys(metadata).map(snakeCase),
          },
        },
        gaxOpts,
      },
      (err, resp) => {
        if (resp) {
          this.metadata = resp;
        }

        callback(err, this.metadata!, resp!);
      }
    );
  }
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(Backup, {exclude: ['endDate', 'expireDate', 'startDate']});

/**
 * Reference to the {@link Backup} class.
 * @name module:@google-cloud/bigtable.Backup
 * @see Backup
 */
