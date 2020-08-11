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
import {BigtableTableAdminClient} from './v2';
import {CallOptions, LROperation, ServiceError} from 'google-gax';

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
  (err: ServiceError | null, backup: Backup, apiResponse?: T): void;
}

export type DeleteBackupCallback = GenericBackupCallback<IEmpty>;
export type DeleteBackupResponse = [Backup, IEmpty];
export type GetBackupCallback = GenericBackupCallback<IBackup>;
export type GetBackupResponse = [Backup, IBackup];
export type UpdateBackupCallback = GenericBackupCallback<IBackup>;
export type UpdateBackupResponse = [Backup, IBackup];

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

export type RestoreTableCallback = (
  err: ServiceError | null,
  table: Table | null,
  apiResponse?: LROperation<
    google.bigtable.admin.v2.ITable,
    google.bigtable.admin.v2.IRestoreTableMetadata
  >
) => void;
export type RestoreTableResponse = [
  Table,
  LROperation<
    google.bigtable.admin.v2.ITable,
    google.bigtable.admin.v2.IRestoreTableMetadata
  >
];

export interface GetBackupsOptions {
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

  gaxOptions?: CallOptions;
}

export type GetBackupsResponse = [Backup[], IBackup[]];
export type GetBackupsCallback = (
  err: ServiceError | null,
  backups?: Backup[],
  apiResponse?: IBackup[]
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
 * const backup = instance.backup('my-backup', 'my-cluster');
 */
export class Backup {
  bigtable: Bigtable;
  cluster: Cluster;

  /**
   * A unique backup string, e.g. "my-backup".
   * This string must be between 1 and 50 characters in length and match the
   * regex {@link -_.a-zA-Z0-9|_a-zA-Z0-9}*.
   */
  id: string;

  /**
   * The full path of the backup which is in the form of:
   *  `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}`.
   *
   * The "backup" portion must be between 1 and 50 characters in length and
   * match the regex {@link -_.a-zA-Z0-9|_a-zA-Z0-9}*.
   */
  name: string;
  metadata: IBackup;

  /**
   * @param {Cluster} cluster
   * @param {string} idOrName The backup name or id.
   * @param {ModifiableBackupFields} [fields]
   */
  constructor(
    cluster: Cluster,
    idOrName: string,
    fields?: ModifiableBackupFields
  ) {
    this.bigtable = cluster.bigtable;
    this.cluster = cluster;
    this.metadata = {};

    if (fields && fields.expireTime) {
      if (fields.expireTime instanceof Date) {
        this.metadata.expireTime = new PreciseDate(
          fields.expireTime
        ).toStruct();
      } else if (fields.expireTime.seconds) {
        this.metadata.expireTime = fields.expireTime;
      }
    }

    const tableAdminClient = this.bigtable.api[
      'BigtableTableAdminClient'
    ] as BigtableTableAdminClient;

    if (idOrName.includes('/')) {
      this.name = idOrName;
      this.id = tableAdminClient.matchBackupFromBackupName(idOrName).toString();
      if (!this.id) {
        throw new Error(`Backup id '${idOrName}' is not formatted correctly.
        Please use the format 'projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}.`);
      }
    } else {
      this.id = idOrName;
      this.name = tableAdminClient.backupPath(
        this.bigtable.projectId,
        this.cluster.instance.id,
        this.cluster.id,
        this.id
      );
    }
  }

  /**
   * A Date-compatible PreciseDate representation of `expireTime`.
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
   * A Date-compatible PreciseDate representation of `startTime`.
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

  /**
   * A Date-compatible PreciseDate representation of `endTime`.
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

  create(
    table: Table | string,
    fields?: Required<ModifiableBackupFields>
  ): Promise<CreateBackupResponse>;
  create(
    table: Table | string,
    fields: Required<ModifiableBackupFields>,
    gaxOptions?: CallOptions
  ): Promise<CreateBackupResponse>;
  create(
    table: Table | string,
    fields: Required<ModifiableBackupFields>,
    gaxOptions: CallOptions,
    callback: CreateBackupCallback
  ): void;
  create(
    table: Table | string,
    fields: Required<ModifiableBackupFields>,
    callback: CreateBackupCallback
  ): void;
  /**
   * Starts creating a new Cloud Bigtable Backup.
   *
   * The returned backup
   * {@link google.longrunning.Operation|long-running operation} can be used to
   * track creation of the backup. Cancelling the returned operation will
   * stop the creation and delete the backup.
   *
   * @param {Table|string} table A reference to the Table to backup, or the full
   *   table path in the form:
   *   `projects/{project}/instances/{instance}/tables/{table}`.
   * @param {ModifiableBackupFields} [fields] Fields to be specified, otherwise
   *   use the data originally provided to the constructor.
   * @param {BackupTimestamp} [fields.expireTime] When the backup will be
   *   automatically deleted.
   * @param {CallOptions | CreateBackupCallback} [gaxOptionsOrCallback]
   * @param {CreateBackupCallback} [cb]
   * @return {void | Promise<CreateBackupResponse>}
   *
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_create_backup
   */
  create(
    table: Table | string,
    fields?: Required<ModifiableBackupFields>,
    gaxOptionsOrCallback?: CallOptions | CreateBackupCallback,
    cb?: CreateBackupCallback
  ): void | Promise<CreateBackupResponse> {
    const options =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    if (
      !table ||
      (typeof table === 'object' && !table.name) ||
      typeof table === 'function'
    ) {
      throw new TypeError(
        'A reference to a table is required to create a backup.'
      );
    }

    const {expireTime, ...restFields} = fields || {};
    this.metadata = {
      sourceTable: typeof table === 'string' ? table : table.name,
      ...restFields,
    };

    if (expireTime instanceof Date) {
      this.metadata.expireTime = new PreciseDate(expireTime).toStruct();
    } else if (expireTime && expireTime.seconds) {
      this.metadata.expireTime = expireTime;
    }

    if (!this.metadata.expireTime) {
      throw new TypeError('The expireTime field is invalid.');
    }

    const reqOpts: google.bigtable.admin.v2.ICreateBackupRequest = {
      parent: this.cluster.name,
      backupId: this.id,
      backup: this.metadata,
    };

    this.bigtable.request<
      LROperation<IBackup, google.bigtable.admin.v2.ICreateBackupMetadata>
    >(
      {
        client: 'BigtableTableAdminClient',
        method: 'createBackup',
        reqOpts,
        gaxOpts: options,
      },
      callback
    );
  }

  delete(gaxOptions?: CallOptions): Promise<DeleteBackupResponse>;
  delete(callback: DeleteBackupCallback): void;
  delete(gaxOptions: CallOptions, callback: DeleteBackupCallback): void;
  /**
   * Deletes this pending or completed Cloud Bigtable backup.
   *
   * @param {CallOptions | DeleteBackupCallback} [gaxOptionsOrCallback]
   * @param {DeleteBackupCallback} [cb]
   * @return {void | Promise<DeleteBackupResponse>}
   *
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_delete_backup
   */
  delete(
    gaxOptionsOrCallback?: CallOptions | DeleteBackupCallback,
    cb?: DeleteBackupCallback
  ): void | Promise<DeleteBackupResponse> {
    const options =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    const reqOpts: google.bigtable.admin.v2.IDeleteBackupRequest = {
      name: this.name,
    };

    this.bigtable.request<google.protobuf.IEmpty>(
      {
        client: 'BigtableTableAdminClient',
        method: 'deleteBackup',
        reqOpts,
        gaxOpts: options,
      },
      (err, resp) => callback(err, this, resp)
    );
  }

  get(gaxOptions?: CallOptions): Promise<GetBackupResponse>;
  get(callback: GetBackupCallback): void;
  get(gaxOptions: CallOptions, callback: GetBackupCallback): void;
  /**
   * Gets fresh metadata for this Cloud Bigtable Backup.
   *
   * @param {CallOptions | GetBackupCallback} [gaxOptionsOrCallback]
   * @param {GetBackupCallback} [cb]
   * @return {void | Promise<GetBackupResponse>}
   *
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_get_backup
   */
  get(
    gaxOptionsOrCallback?: CallOptions | GetBackupCallback,
    cb?: GetBackupCallback
  ): void | Promise<GetBackupResponse> {
    const options =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    const reqOpts: google.bigtable.admin.v2.IGetBackupRequest = {
      name: this.name,
    };

    this.bigtable.request<IBackup>(
      {
        client: 'BigtableTableAdminClient',
        method: 'getBackup',
        reqOpts,
        gaxOpts: options,
      },
      (err, resp) => {
        if (resp) {
          this.metadata = resp;
        }

        callback(err, this, this.metadata);
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
   * the backup. The returned table
   * {@link google.longrunning.Operation|long-running operation} can be used
   * to track the progress of the operation, and to cancel it.
   *
   * @param {string} tableId
   *   Required. The id of the table to create and restore to. This
   *   table must not already exist. The `table_id` appended to
   *   `parent` forms the full table name of the form
   *   `projects/<project>/instances/<instance>/tables/<table_id>`.
   * @param {CallOptions | RestoreTableCallback} [gaxOptionsOrCallback]
   * @param {RestoreTableCallback} [cb]
   * @return {void | Promise<RestoreTableResponse>}
   */
  restore(
    tableId: string,
    gaxOptionsOrCallback?: CallOptions | RestoreTableCallback,
    cb?: RestoreTableCallback
  ): void | Promise<RestoreTableResponse> {
    const options =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    const reqOpts: google.bigtable.admin.v2.IRestoreTableRequest = {
      parent: this.cluster.name,
      tableId,
      backup: this.name,
    };

    this.bigtable.request<
      LROperation<
        google.bigtable.admin.v2.ITable,
        google.bigtable.admin.v2.IRestoreTableMetadata
      >
    >(
      {
        client: 'BigtableTableAdminClient',
        method: 'restoreTable',
        reqOpts,
        gaxOpts: options,
      },
      (err, operation) => {
        let table: Table | null = null;
        if (!err) {
          table = new Table(this.cluster.instance, tableId);
        }
        callback(err, table, operation);
      }
    );
  }

  update(
    fields: ModifiableBackupFields,
    gaxOptions?: CallOptions
  ): Promise<UpdateBackupResponse>;
  update(fields: ModifiableBackupFields, callback: UpdateBackupCallback): void;
  update(
    fields: ModifiableBackupFields,
    gaxOptions: CallOptions,
    callback: UpdateBackupCallback
  ): void;
  /**
   * Updates this pending or completed Cloud Bigtable Backup.
   *
   * @param {ModifiableBackupFields} fields
   *   Required. The fields to be updated.
   * @param {BackupTimestamp} fields.expireTime
   *   Required. This is currently the only supported field.
   * @param {CallOptions | UpdateBackupCallback} [gaxOptionsOrCallback]
   * @param {UpdateBackupCallback} [cb]
   * @return {void | Promise<UpdateBackupResponse>}
   */
  update(
    fields: ModifiableBackupFields,
    gaxOptionsOrCallback?: CallOptions | UpdateBackupCallback,
    cb?: UpdateBackupCallback
  ): void | Promise<UpdateBackupResponse> {
    const options =
      typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
    const callback =
      typeof gaxOptionsOrCallback === 'function' ? gaxOptionsOrCallback : cb!;

    if (!fields || !fields.expireTime) {
      throw new TypeError(
        'Must specify at least one field to update (e.g. expireTime).'
      );
    }

    const {expireTime, ...restFields} = fields;

    const backup: IBackup = {
      name: this.name,
      ...restFields,
    };

    if (expireTime) {
      if (expireTime instanceof Date) {
        backup.expireTime = new PreciseDate(expireTime).toStruct();
      } else if (expireTime.seconds) {
        backup.expireTime = expireTime;
      } else {
        throw new TypeError('The expireTime field is invalid.');
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

    this.bigtable.request<IBackup>(
      {
        client: 'BigtableTableAdminClient',
        method: 'updateBackup',
        reqOpts,
        gaxOpts: options,
      },
      (err, resp) => {
        if (resp) {
          this.metadata = resp;
        }

        callback(err, this, this.metadata);
      }
    );
  }
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(Backup, {exclude: ['expireDate', 'startDate', 'endDate']});

/**
 * Reference to the {@link Backup} class.
 * @name module:@google-cloud/bigtable.Backup
 * @see Backup
 */
