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
import {google} from '../protos/protos';
import {Bigtable} from './';
import {BigtableTableAdminClient} from './v2';
import {
  DeleteBackupOptions,
  DeleteBackupResponse,
  GetBackupOptions,
  GetBackupResponse,
  ModifiableBackupFields,
  UpdateBackupOptions,
  UpdateBackupResponse,
} from './cluster';
import {RestoreTableOptions, RestoreTableResponse} from './instance';
import * as Long from 'long';

export class Backup implements google.bigtable.admin.v2.IBackup {
  name?: string | null;
  sourceTable?: string | null;
  expireTime?: google.protobuf.ITimestamp | null;
  startTime?: google.protobuf.ITimestamp | null;
  endTime?: google.protobuf.ITimestamp | null;
  sizeBytes?: number | Long | string | null;
  state?:
    | google.bigtable.admin.v2.Backup.State
    | keyof typeof google.bigtable.admin.v2.Backup.State
    | null;

  private readonly _backup: google.bigtable.admin.v2.IBackup;
  private _bigtable: Bigtable;
  private _tableAdminClient: BigtableTableAdminClient;

  /**
   * @param {Bigtable} bigtable
   * @param {google.bigtable.admin.v2.IBackup} backup A Backup or
   */
  constructor(bigtable: Bigtable, backup: google.bigtable.admin.v2.IBackup) {
    Object.assign(this, backup);

    this._backup = backup.valueOf();
    this._bigtable = bigtable;
    this._tableAdminClient = this._bigtable.api[
      'BigtableTableAdminClient'
    ] as BigtableTableAdminClient;
  }

  /**
   * The parent path of this backup, i.e. the cluster.
   * @readonly
   * @return {string}
   */
  get parent(): string {
    return this._tableAdminClient.clusterPath(
      this.projectId,
      this.instanceId,
      this.clusterId
    );
  }

  /**
   * The project to which this backup belongs.
   * @readonly
   * @return {string}
   */
  get projectId(): string {
    if (!this.name) {
      throw new TypeError(
        'A backup name is required to determine the projectId.'
      );
    }
    return this._tableAdminClient
      .matchProjectFromBackupName(this.name)
      .toString();
  }

  /**
   * The instance to which this backup belongs.
   * @readonly
   * @return {string}
   */
  get instanceId(): string {
    if (!this.name) {
      throw new TypeError(
        'A backup name is required to determine the instanceId.'
      );
    }
    return this._tableAdminClient
      .matchInstanceFromBackupName(this.name)
      .toString();
  }

  /**
   * The cluster to which this backup belongs.
   * @readonly
   * @return {string}
   */
  get clusterId(): string {
    if (!this.name) {
      throw new TypeError(
        'A backup name is required to determine the clusterId.'
      );
    }
    return this._tableAdminClient
      .matchClusterFromBackupName(this.name)
      .toString();
  }

  /**
   * This backup's identifier.
   * @readonly
   * @return {string}
   */
  get backupId(): string {
    if (!this.name) {
      throw new TypeError(
        'A backup name is required to determine the backupId.'
      );
    }
    return this._tableAdminClient
      .matchBackupFromBackupName(this.name)
      .toString();
  }

  /**
   * A Date-compatible PreciseDate representation of `expireTime`.
   * @readonly
   * @return {PreciseDate}
   */
  get expireDate(): PreciseDate {
    if (!this.expireTime) {
      throw new TypeError('An expireTime is required to convert to Date.');
    }
    return new PreciseDate({
      seconds: this.expireTime.seconds!,
      nanos: this.expireTime.nanos!,
    });
  }

  /**
   * A Date-compatible PreciseDate representation of `startTime`.
   * @readonly
   * @return {PreciseDate}
   */
  get startDate(): PreciseDate {
    if (!this.startTime) {
      throw new TypeError('A startTime is required to convert to Date.');
    }
    return new PreciseDate({
      seconds: this.startTime.seconds!,
      nanos: this.startTime.nanos!,
    });
  }

  /**
   * A Date-compatible PreciseDate representation of `endTime`.
   * @readonly
   * @return {PreciseDate}
   */
  get endDate(): PreciseDate {
    if (!this.endTime) {
      throw new TypeError('An endTime is required to convert to Date.');
    }
    return new PreciseDate({
      seconds: this.endTime.seconds!,
      nanos: this.endTime.nanos!,
    });
  }

  /**
   * Deletes this pending or completed Cloud Bigtable backup.
   *
   * @param {DeleteBackupOptions} [options]
   * @return {Promise<DeleteBackupResponse>}
   * @see {Cluster#deleteBackup}
   *
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_delete_backup
   */
  delete(options?: DeleteBackupOptions): Promise<DeleteBackupResponse> {
    if (!this.name) {
      return Promise.reject(
        new TypeError('A backup name is required to delete a backup.')
      );
    }

    return this._bigtable
      .instance(this.instanceId)
      .cluster(this.clusterId)
      .deleteBackup(this.backupId, options);
  }

  /**
   * Gets fresh metadata for this Cloud Bigtable Backup.
   *
   * @param {GetBackupOptions} [options]
   * @return {Promise<GetBackupResponse>}
   * @see {Cluster#getBackup}
   *
   * @example <caption>include:samples/document-snippets/cluster.js</caption>
   * region_tag:bigtable_cluster_get_backup
   */
  get(options?: GetBackupOptions): Promise<GetBackupResponse> {
    if (!this.name) {
      return Promise.reject(
        new TypeError('A backup name is required to get a backup.')
      );
    }

    return this._bigtable
      .instance(this.instanceId)
      .cluster(this.clusterId)
      .getBackup(this.backupId, options);
  }

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
   * @param {RestoreTableOptions} [options]
   * @return {Promise<RestoreTableResponse>}
   * @see {Instance#restoreTable}
   */
  restore(
    tableId: string,
    options?: RestoreTableOptions
  ): Promise<RestoreTableResponse> {
    if (!this.name) {
      return Promise.reject(
        new TypeError('A backup name is required to restore a backup.')
      );
    }

    return this._bigtable
      .instance(this.instanceId)
      .restoreTable(this.backupId, this.clusterId, tableId, options);
  }

  /**
   * Updates this pending or completed Cloud Bigtable Backup.
   *
   * @param {ModifiableBackupFields} fields
   *   Required. The fields to be updated.
   * @param {BackupTimestamp} fields.expireTime
   *   Required. This is currently the only supported field.
   * @param {UpdateBackupOptions} [options]
   * @return {Promise<UpdateBackupResponse>}
   * @see {Cluster#updateBackup}
   */
  update(
    fields: ModifiableBackupFields,
    options?: UpdateBackupOptions
  ): Promise<UpdateBackupResponse> {
    if (!this.name) {
      return Promise.reject(
        new TypeError('A backup name is required to update a backup.')
      );
    }

    return this._bigtable
      .instance(this.instanceId)
      .cluster(this.clusterId)
      .updateBackup(this.backupId, fields, options);
  }

  /**
   * A plain-old-javascript-object representation of this backup.
   * @return {google.bigtable.admin.v2.IBackup}
   */
  valueOf(): google.bigtable.admin.v2.IBackup {
    return {...this._backup};
  }
}

/**
 * Reference to the {@link Backup} class.
 * @name module:@google-cloud/bigtable.Backup
 * @see Backup
 */
