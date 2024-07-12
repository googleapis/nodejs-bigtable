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

import {promisifyAll} from '@google-cloud/promisify';
import arrify = require('arrify');
import {ServiceError} from 'google-gax';
import {BackoffSettings} from 'google-gax/build/src/gax';
import {PassThrough, Transform} from 'stream';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const concat = require('concat-stream');
import * as is from 'is';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pumpify = require('pumpify');

import {
  Family,
  CreateFamilyOptions,
  CreateFamilyCallback,
  CreateFamilyResponse,
  IColumnFamily,
} from './family';
import {Filter, BoundData, RawFilter} from './filter';
import {Mutation} from './mutation';
import {Row} from './row';
import {ChunkTransformer, ChunkTransformerLogger} from './chunktransformer';
import {CallOptions} from 'google-gax';
import {Bigtable, AbortableDuplex} from '.';
import {Instance} from './instance';
import {ModifiableBackupFields} from './backup';
import {CreateBackupCallback, CreateBackupResponse} from './cluster';
import {google} from '../protos/protos';
import {Duplex} from 'stream';
import {TableUtils} from './utils/table';
import {TransformCallback} from 'node:stream';

// See protos/google/rpc/code.proto
// (4=DEADLINE_EXCEEDED, 8=RESOURCE_EXHAUSTED, 10=ABORTED, 14=UNAVAILABLE)
const RETRYABLE_STATUS_CODES = new Set([4, 8, 10, 14]);
// (1=CANCELLED)
const IGNORED_STATUS_CODES = new Set([1]);

const DEFAULT_BACKOFF_SETTINGS: BackoffSettings = {
  initialRetryDelayMillis: 10,
  retryDelayMultiplier: 2,
  maxRetryDelayMillis: 60000,
};

/**
 * @typedef {object} Policy
 * @property {number} [version] Specifies the format of the policy.
 *     Valid values are 0, 1, and 3. Requests specifying an invalid value will
 *     be rejected.
 *
 *     Operations affecting conditional bindings must specify version 3. This
 *     can be either setting a conditional policy, modifying a conditional
 *     binding, or removing a binding (conditional or unconditional) from the
 *     stored conditional policy.
 *     Operations on non-conditional policies may specify any valid value or
 *     leave the field unset.
 *
 *     If no etag is provided in the call to `setIamPolicy`, version compliance
 *     checks against the stored policy is skipped.
 * @property {array} [policy.bindings] Bindings associate members with roles.
 * @property {string} [policy.etag] `etag` is used for optimistic concurrency
 *     control as a way to help prevent simultaneous updates of a policy from
 *     overwriting each other. It is strongly suggested that systems make use
 *     of the `etag` in the read-modify-write cycle to perform policy updates
 *     in order to avoid raceconditions.
 */
export interface Policy {
  version?: number;
  bindings?: PolicyBinding[];
  etag?: Buffer | string;
}

/**
 * @typedef {object} PolicyBinding
 * @property {array} [PolicyBinding.role] Role that is assigned to `members`.
 *     For example, `roles/viewer`, `roles/editor`, or `roles/owner`.
 * @property {string} [PolicyBinding.members] Identities requesting access.
 *     The full list of accepted values is outlined here
 *     https://googleapis.dev/nodejs/bigtable/latest/google.iam.v1.html#.Binding
 * @property {Expr} [PolicyBinding.condition] The condition that is associated
 *     with this binding.
 *     NOTE: An unsatisfied condition will not allow user access via current
 *     binding. Different bindings, including their conditions, are examined
 *     independently.
 */
export interface PolicyBinding {
  role?: string;
  members?: string[];
  condition?: Expr | null;
}

/**
 * @typedef {object} Expr
 * @property {string} [Expr.expression] The application context of the containing
 *     message determines which well-known feature set of Common Expression Language
 *     is supported.
 * @property {string} [Expr.title] An optional title for the expression, i.e. a
 *     short string describing its purpose. This can be used e.g. in UIs which
 *     allow to enter the expression.
 * @property {string} [Expr.description] An optional description of the
 *     expression. This is a longer text which describes the expression,
 *     e.g. when hovered over it in a UI.
 * @property {string} [Expr.location] An optional string indicating the location
 *     of the expression for error reporting, e.g. a file name and a position
 *     in the file.
 */
interface Expr {
  expression?: string;
  title?: string;
  description?: string;
  location?: string;
}

/**
 * @callback GetIamPolicyCallback
 * @param {?Error} err Request error, if any.
 * @param {object} policy The policy.
 */
export interface GetIamPolicyCallback {
  (err?: Error | null, policy?: Policy): void;
}

/**
 * @typedef {array} GetIamPolicyResponse
 * @property {object} 0 The policy.
 */
export type GetIamPolicyResponse = [Policy];

export interface GetIamPolicyOptions {
  gaxOptions?: CallOptions;
  requestedPolicyVersion?: 0 | 1 | 3;
}

export type SetIamPolicyCallback = GetIamPolicyCallback;
export type SetIamPolicyResponse = GetIamPolicyResponse;

/**
 * @callback TestIamPermissionsCallback
 * @param {?Error} err Request error, if any.
 * @param {string[]} permissions A subset of permissions that the caller is
 *     allowed.
 */
export interface TestIamPermissionsCallback {
  (err?: Error | null, permissions?: string[]): void;
}

/**
 * @typedef {array} TestIamPermissionsResponse
 * @property {string[]} 0 A subset of permissions that the caller is allowed.
 */
export type TestIamPermissionsResponse = [string[]];

export interface CreateTableOptions {
  families?: {} | string[];
  gaxOptions?: CallOptions;
  splits?: string[];
}
export type CreateTableCallback = (
  err: ServiceError | null,
  table?: Table,
  apiResponse?: google.bigtable.admin.v2.Table
) => void;
export type CreateTableResponse = [Table, google.bigtable.admin.v2.Table];

export type TableExistsCallback = (
  err: ServiceError | null,
  exists?: boolean
) => void;
export type TableExistsResponse = [boolean];

export interface GetTablesOptions {
  gaxOptions?: CallOptions;
  /**
   * View over the table's fields. Possible options are 'name', 'schema' or
   * 'full'. Default: 'name'.
   */
  view?: 'name' | 'schema' | 'full';
  pageSize?: number;
  pageToken?: string;
}

export interface GetRowsOptions {
  /**
   * If set to `false` it will not decode Buffer values returned from Bigtable.
   */
  decode?: boolean;

  /**
   * The encoding to use when converting Buffer values to a string.
   */
  encoding?: string;

  /**
   * End value for key range.
   */
  end?: string;

  /**
   * Row filters allow you to both make advanced queries and format how the data is returned.
   */
  filter?: RawFilter;

  /**
   * Request configuration options, outlined here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   */
  gaxOptions?: CallOptions;

  /**
   * A list of row keys.
   */
  keys?: string[];

  /**
   * Maximum number of rows to be returned.
   */
  limit?: number;

  /**
   * Prefix that the row key must match.
   */
  prefix?: string;

  /**
   * List of prefixes that a row key must match.
   */
  prefixes?: string[];

  /**
   * A list of key ranges.
   */
  ranges?: PrefixRange[];

  /**
   * Start value for key range.
   */
  start?: string;
}

export interface GetMetadataOptions {
  /**
   * Request configuration options, outlined here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   */
  gaxOptions?: CallOptions;

  /**
   * The view to be applied to the table fields.
   */
  view?: string;
}

export interface GetTableOptions {
  /**
   * Automatically create the instance if it does not already exist.
   */
  autoCreate?: boolean;

  /**
   * Request configuration options, outlined here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   */
  gaxOptions?: CallOptions;
}

export interface MutateOptions {
  /**
   * Request configuration options, outlined here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   */
  gaxOptions?: CallOptions;
  /**
   * If set to `true` will treat entriesmas a raw Mutation object. See {@link Mutation#parse}.
   */
  rawMutation?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Entry = any;

export type DeleteTableCallback = (
  err: ServiceError | null,
  apiResponse?: google.protobuf.Empty
) => void;
export type DeleteTableResponse = [google.protobuf.Empty];
export type CheckConsistencyCallback = (
  err: ServiceError | null,
  consistent?: boolean
) => void;
export type CheckConsistencyResponse = [boolean];
export type GenerateConsistencyTokenCallback = (
  err: ServiceError | null,
  token?: string
) => void;
export type GenerateConsistencyTokenResponse = [string];
export type WaitForReplicationCallback = (
  err: ServiceError | null,
  wait?: boolean
) => void;
export type WaitForReplicationResponse = [boolean];
export type TruncateCallback = (
  err: ServiceError | null,
  apiResponse?: google.protobuf.Empty
) => void;
export type TruncateResponse = [google.protobuf.Empty];
export type SampleRowKeysCallback = (
  err: ServiceError | null,
  keys?: string[]
) => void;
export type SampleRowsKeysResponse = [string[]];
export type DeleteRowsCallback = (
  err: ServiceError | null,
  apiResponse?: google.protobuf.Empty
) => void;
export type DeleteRowsResponse = [google.protobuf.Empty];
export type GetMetadataCallback = (
  err: ServiceError | null,
  apiResponse: google.bigtable.admin.v2.ITable
) => void;
export type GetMetadataResponse = [google.bigtable.admin.v2.Table];
export type GetTableCallback = (
  err: ServiceError | null,
  table?: Table,
  apiResponse?: google.bigtable.admin.v2.ITable
) => void;
export type GetTableResponse = [Table, google.bigtable.admin.v2.Table];
export type GetTablesCallback = (
  err: ServiceError | null,
  tables?: Table[],
  apiResponse?: google.bigtable.admin.v2.ITable[]
) => void;
export type GetTablesResponse = [Table[], google.bigtable.admin.v2.Table[]];
export type GetFamiliesCallback = (
  err: ServiceError | null,
  families?: Family[],
  apiResponse?: IColumnFamily
) => void;
export type GetFamiliesResponse = [Family[], IColumnFamily];
export type GetReplicationStatesCallback = (
  err: ServiceError | null,
  clusterStates?: Map<string, google.bigtable.admin.v2.Table.IClusterState>,
  apiResponse?: {}
) => void;
export type GetReplicationStatesResponse = [
  Map<string, google.bigtable.admin.v2.Table.IClusterState>,
  google.bigtable.admin.v2.ITable,
];
export type GetRowsCallback = (
  err: ServiceError | null,
  rows?: Row[],
  apiResponse?: google.bigtable.v2.ReadRowsResponse
) => void;
export type GetRowsResponse = [Row[], google.bigtable.v2.ReadRowsResponse];
export type InsertRowsCallback = (
  err: ServiceError | PartialFailureError | null,
  apiResponse?: google.protobuf.Empty
) => void;
export type InsertRowsResponse = [google.protobuf.Empty];
export type MutateCallback = (
  err: ServiceError | PartialFailureError | null,
  apiResponse?: google.protobuf.Empty
) => void;
export type MutateResponse = [google.protobuf.Empty];

export interface PrefixRange {
  start?: BoundData | string;
  end?: BoundData | string;
}

export interface CreateBackupConfig extends ModifiableBackupFields {
  gaxOptions?: CallOptions;
}

/**
 * Create a Table object to interact with a Cloud Bigtable table.
 *
 * @class
 * @param {Instance} instance Instance Object.
 * @param {string} id Unique identifier of the table.
 *
 * @example
 * ```
 * const {Bigtable} = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const table = instance.table('prezzy');
 * ```
 */
export class Table {
  bigtable: Bigtable;
  instance: Instance;
  name: string;
  id: string;
  metadata?: google.bigtable.admin.v2.ITable;
  maxRetries?: number;
  constructor(instance: Instance, id: string) {
    this.bigtable = instance.bigtable;
    this.instance = instance;

    let name;

    if (id.includes('/')) {
      if (id.startsWith(`${instance.name}/tables/`)) {
        name = id;
      } else {
        throw new Error(`Table id '${id}' is not formatted correctly.
Please use the format 'prezzy' or '${instance.name}/tables/prezzy'.`);
      }
    } else {
      name = `${instance.name}/tables/${id}`;
    }

    this.name = name;
    this.id = name.split('/').pop()!;
  }

  /**
   * Formats the decodes policy etag value to string.
   *
   * @private
   *
   * @param {object} policy
   */
  static decodePolicyEtag(policy: Policy): Policy {
    policy.etag = policy.etag!.toString('ascii');
    return policy;
  }

  /**
   * Formats the table name to include the Bigtable cluster.
   *
   * @private
   *
   * @param {string} instanceName The formatted instance name.
   * @param {string} name The table name.
   *
   * @example
   * ```
   * Table.formatName_(
   *   'projects/my-project/zones/my-zone/instances/my-instance',
   *   'my-table'
   * );
   * //
   * 'projects/my-project/zones/my-zone/instances/my-instance/tables/my-table'
   * ```
   */
  static formatName_(instanceName: string, id: string) {
    if (id.includes('/')) {
      return id;
    }
    return `${instanceName}/tables/${id}`;
  }

  /**
   * Creates a range based off of a key prefix.
   *
   * @private
   *
   * @param {string} start The key prefix/starting bound.
   * @returns {object} range
   *
   * @example
   * ```
   * const {Bigtable} = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   * table.createPrefixRange('start');
   * // => {
   * //   start: 'start',
   * //   end: {
   * //     value: 'staru',
   * //     inclusive: false
   * //   }
   * // }
   * ```
   */
  static createPrefixRange(start: string): PrefixRange {
    return TableUtils.createPrefixRange(start);
  }

  create(options?: CreateTableOptions): Promise<CreateTableResponse>;
  create(options: CreateTableOptions, callback: CreateTableCallback): void;
  create(callback: CreateTableCallback): void;
  /**
   * Create a table.
   *
   * @param {object} [options] See {@link Instance#createTable}.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Table} callback.table The newly created table.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_create_table
   */
  create(
    optionsOrCallback?: CreateTableOptions | CreateTableCallback,
    cb?: CreateTableCallback
  ): void | Promise<CreateTableResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    this.instance.createTable(this.id, options, callback);
  }

  createBackup(
    id: string,
    config: CreateBackupConfig
  ): Promise<CreateBackupResponse>;
  createBackup(
    id: string,
    config: CreateBackupConfig,
    callback: CreateBackupCallback
  ): void;
  createBackup(
    id: string,
    config: CreateBackupConfig,
    callback: CreateBackupCallback
  ): void;
  /**
   * Backup a table with cluster auto selection.
   *
   * Backups of tables originate from a specific cluster. This is a helper
   * around `Cluster.createBackup` that automatically selects the first ready
   * cluster from which a backup can be performed.
   *
   * NOTE: This will make two API requests to first determine the most
   * appropriate cluster, then create the backup. This could lead to a race
   * condition if other requests are simultaneously sent or if the cluster
   * availability state changes between each call.
   *
   * @param {string} id A unique ID for the backup.
   * @param {CreateBackupConfig} config Metadata to set on the Backup.
   * @param {BackupTimestamp} config.expireTime When the backup will be
   *   automatically deleted.
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
  createBackup(
    id: string,
    config: CreateBackupConfig,
    callback?: CreateBackupCallback
  ): void | Promise<CreateBackupResponse> {
    if (!id) {
      throw new TypeError('An id is required to create a backup.');
    }

    if (!config) {
      throw new TypeError('A configuration object is required.');
    }

    this.getReplicationStates(config.gaxOptions!, (err, stateMap) => {
      if (err) {
        callback!(err);
        return;
      }

      const [clusterId] =
        [...stateMap!.entries()].find(([, clusterState]) => {
          return (
            clusterState.replicationState === 'READY' ||
            clusterState.replicationState === 'READY_OPTIMIZING'
          );
        }) || [];

      if (!clusterId) {
        callback!(new Error('No ready clusters eligible for backup.'));
        return;
      }

      this.instance.cluster(clusterId).createBackup(
        id,
        {
          table: this.name,
          ...config,
        },
        callback!
      );
    });
  }

  createFamily(
    id: string,
    options?: CreateFamilyOptions
  ): Promise<CreateFamilyResponse>;
  createFamily(
    id: string,
    options: CreateFamilyOptions,
    callback: CreateFamilyCallback
  ): void;
  createFamily(id: string, callback: CreateFamilyCallback): void;
  /**
   * Create a column family.
   *
   * Optionally you can send garbage collection rules and when creating a
   * family. Garbage collection executes opportunistically in the background, so
   * it's possible for reads to return a cell even if it matches the active
   * expression for its family.
   *
   * @see [Garbage Collection Proto Docs]{@link https://github.com/googleapis/googleapis/blob/3b236df084cf9222c529a2890f90e3a4ff0f2dfd/google/bigtable/admin/v2/table.proto#L184}
   *
   * @throws {error} If a name is not provided.
   *
   * @param {string} id The unique identifier of column family.
   * @param {object} [options] Configuration object.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {object} [options.rule] Garbage collection rule
   * @param {object} [options.rule.age] Delete cells in a column older than the
   *     given age. Values must be at least 1 millisecond.
   * @param {number} [options.rule.versions] Maximum number of versions to delete
   *     cells in a column, except for the most recent.
   * @param {boolean} [options.rule.intersect] Cells to delete should match all
   *     rules.
   * @param {boolean} [options.rule.union] Cells to delete should match any of the
   *     rules.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Family} callback.family The newly created Family.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_create_family
   */
  createFamily(
    id: string,
    optionsOrCallback?: CreateFamilyOptions | CreateFamilyCallback,
    cb?: CreateFamilyCallback
  ): void | Promise<CreateFamilyResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};

    if (!id) {
      throw new Error('An id is required to create a family.');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod: any = {
      id,
      create: {},
    };

    if (options.rule) {
      mod.create.gcRule = Family.formatRule_(options.rule);
    }

    const reqOpts = {
      name: this.name,
      modifications: [mod],
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'modifyColumnFamilies',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (err, resp) => {
        if (err) {
          callback(err, null, resp);
          return;
        }
        const family = this.family(id);
        family.metadata = resp;
        callback(null, family, resp);
      }
    );
  }

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  /**
   * Get {@link Row} objects for the rows currently in your table as a
   * readable object stream.
   *
   * @param {object} [options] Configuration object.
   * @param {boolean} [options.decode=true] If set to `false` it will not decode
   *     Buffer values returned from Bigtable.
   * @param {boolean} [options.encoding] The encoding to use when converting
   *     Buffer values to a string.
   * @param {string} [options.end] End value for key range.
   * @param {Filter} [options.filter] Row filters allow you to
   *     both make advanced queries and format how the data is returned.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {string[]} [options.keys] A list of row keys.
   * @param {number} [options.limit] Maximum number of rows to be returned.
   * @param {string} [options.prefix] Prefix that the row key must match.
   * @param {string[]} [options.prefixes] List of prefixes that a row key must
   *     match.
   * @param {object[]} [options.ranges] A list of key ranges.
   * @param {string} [options.start] Start value for key range.
   * @returns {stream}
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_table_readstream
   */
  // eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  createReadStream(opts?: GetRowsOptions) {
    const options = opts || {};
    const maxRetries = is.number(this.maxRetries) ? this.maxRetries! : 10;
    let activeRequestStream: AbortableDuplex | null;
    let rowKeys: string[];
    let filter: {} | null;
    const rowsLimit = options.limit || 0;
    const hasLimit = rowsLimit !== 0;

    let numConsecutiveErrors = 0;
    let numRequestsMade = 0;
    let retryTimer: NodeJS.Timeout | null;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisTable = this;

    class RowStreamTransformer extends Transform {
      constructor() {
        super({
          objectMode: true,
          transform: (rowData, _, next) => {
            console.log(`in toRowStream ${rowData.key}`);
            if (
              userCanceled ||
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (userStream as any)._writableState.ended
            ) {
              console.log('has been cancelled');
              return next();
            }
            console.log('has not been cancelled');
            const row = thisTable.row(rowData.key);
            row.data = rowData.data;
            next(null, row);
          },
        });
      }

      emit(event: string | symbol, ...args: any[]): boolean {
        console.log(
          '> rowStream.emit',
          event,
          event === 'data' ? args[0].id : null
        );
        if (event === 'data' && args[0] === '1b') {
          //debugger;
        }
        return super.emit(event, ...args);
      }
      _destroy(error: Error | null, callback: (error?: Error | null) => void) {
        console.log('rowStream.destroy');
        super._destroy(error, callback);
      }
    }

    rowKeys = options.keys || [];

    const ranges = TableUtils.getRanges(options);

    // If rowKeys and ranges are both empty, the request is a full table scan.
    // Add an empty range to simplify the resumption logic.
    if (rowKeys.length === 0 && ranges.length === 0) {
      ranges.push({});
    }

    if (options.filter) {
      filter = Filter.parse(options.filter);
    }

    let chunkTransformer: ChunkTransformer;
    let rowStream: Duplex;

    let userCanceled = false;
    let lastRowKey = '';
    let rowsRead = 0;
    class UserStream extends Transform {
      constructor() {
        super({
          objectMode: true,
          readableHighWaterMark: 0,
          writableHighWaterMark: 0,
          transform(
            row: any,
            _encoding: any,
            callback: (a?: any, b?: any) => void
          ) {
            /*
            if (userCanceled) {
              callback();
              return;
            }
             */
            lastRowKey = row.id;
            rowsRead++;
            callback(null, row);
          },
        });
      }
      write(chunk: any, encoding: any, cb?: any): boolean {
        // console.log('userstream.write', chunk);
        return super.write(chunk, encoding, cb);
      }

      /*
      _transform(
        chunk: any,
        encoding: BufferEncoding,
        callback: TransformCallback
      ) {
        console.log('userStream', chunk);
        this.push(chunk);
        callback();
      }
       */

      emit(event: string | symbol, ...args: any[]): boolean {
        console.log(
          '> userStream.emit',
          event,
          event === 'data' ? args[0].id : null
        );
        return super.emit(event, ...args);
      }
    }
    const userStream = new UserStream() as Transform;
    /*
    new PassThrough({
      objectMode: true,
      readableHighWaterMark: 0, // We need to disable readside buffering to allow for acceptable behavior when the end user cancels the stream early.
      writableHighWaterMark: 0, // We need to disable writeside buffering because in nodejs 14 the call to _transform happens after write buffering. This creates problems for tracking the last seen row key.
      transform(row, _encoding, callback) {
        if (userCanceled) {
          callback();
          return;
        }
        lastRowKey = row.id;
        rowsRead++;
        callback(null, row);
      },
    });

     */

    // The caller should be able to call userStream.end() to stop receiving
    // more rows and cancel the stream prematurely. But also, the 'end' event
    // will be emitted if the stream ended normally. To tell these two
    // situations apart, we'll save the "original" end() function, and
    // will call it on rowStream.on('end').
    const originalEnd = userStream.end.bind(userStream);

    // Taking care of this extra listener when piping and unpiping userStream:
    const rowStreamPipe = (rowStream: Duplex, userStream: PassThrough) => {
      rowStream.pipe(userStream, {end: false});
      rowStream.on('end', originalEnd);
    };
    const rowStreamUnpipe = (rowStream: Duplex, userStream: PassThrough) => {
      rowStream?.unpipe(userStream);
      rowStream?.removeListener('end', originalEnd);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userStream.end = (chunk?: any, encoding?: any, cb?: () => void) => {
      rowStreamUnpipe(rowStream, userStream);
      userCanceled = true;
      if (activeRequestStream) {
        activeRequestStream.abort();
      }
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      return originalEnd(chunk, encoding, cb);
    };

    const makeNewRequest = () => {
      // Avoid cancelling an expired timer if user
      // cancelled the stream in the middle of a retry
      retryTimer = null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chunkTransformer = new ChunkTransformerLogger();

      const reqOpts = {
        tableName: this.name,
        appProfileId: this.bigtable.appProfileId,
      } as google.bigtable.v2.IReadRowsRequest;

      const retryOpts = {
        currentRetryAttempt: 0, // was numConsecutiveErrors
        // Handling retries in this client. Specify the retry options to
        // make sure nothing is retried in retry-request.
        noResponseRetries: 0,
        shouldRetryFn: (_: any) => {
          return false;
        },
      };

      if (lastRowKey) {
        // Readjust and/or remove ranges based on previous valid row reads.
        // Iterate backward since items may need to be removed.
        for (let index = ranges.length - 1; index >= 0; index--) {
          const range = ranges[index];
          const startValue = is.object(range.start)
            ? (range.start as BoundData).value
            : range.start;
          const endValue = is.object(range.end)
            ? (range.end as BoundData).value
            : range.end;
          const startKeyIsRead =
            !startValue ||
            TableUtils.lessThanOrEqualTo(
              startValue as string,
              lastRowKey as string
            );
          const endKeyIsNotRead =
            !endValue ||
            (endValue as Buffer).length === 0 ||
            TableUtils.lessThan(lastRowKey as string, endValue as string);
          if (startKeyIsRead) {
            if (endKeyIsNotRead) {
              // EndKey is not read, reset the range to start from lastRowKey open
              range.start = {
                value: lastRowKey,
                inclusive: false,
              };
            } else {
              // EndKey is read, remove this range
              ranges.splice(index, 1);
            }
          }
        }

        // Remove rowKeys already read.
        rowKeys = rowKeys.filter(rowKey =>
          TableUtils.greaterThan(rowKey, lastRowKey as string)
        );

        // If there was a row limit in the original request and
        // we've already read all the rows, end the stream and
        // do not retry.
        if (hasLimit && rowsLimit === rowsRead) {
          userStream.end();
          return;
        }
        // If all the row keys and ranges are read, end the stream
        // and do not retry.
        if (rowKeys.length === 0 && ranges.length === 0) {
          userStream.end();
          return;
        }
      }

      // Create the new reqOpts
      reqOpts.rows = {};

      // TODO: preprocess all the keys and ranges to Bytes
      reqOpts.rows.rowKeys = rowKeys.map(
        Mutation.convertToBytes
      ) as {} as Uint8Array[];

      reqOpts.rows.rowRanges = ranges.map(range =>
        Filter.createRange(
          range.start as BoundData,
          range.end as BoundData,
          'Key'
        )
      );

      if (filter) {
        reqOpts.filter = filter;
      }

      if (hasLimit) {
        reqOpts.rowsLimit = rowsLimit - rowsRead;
      }

      const gaxOpts = populateAttemptHeader(
        numRequestsMade,
        options.gaxOptions
      );

      const requestStream = this.bigtable.request({
        client: 'BigtableClient',
        method: 'readRows',
        reqOpts,
        gaxOpts,
        retryOpts,
      });

      activeRequestStream = requestStream!;

      const toRowStream = new RowStreamTransformer();

      rowStream = pumpify.obj([requestStream, chunkTransformer, toRowStream]);

      // Retry on "received rst stream" errors
      const isRstStreamError = (error: ServiceError): boolean => {
        if (error.code === 13 && error.message) {
          const error_message = (error.message || '').toLowerCase();
          return (
            error.code === 13 &&
            (error_message.includes('rst_stream') ||
              error_message.includes('rst stream'))
          );
        }
        return false;
      };

      rowStream
        .on('error', (error: ServiceError) => {
          rowStreamUnpipe(rowStream, userStream);
          activeRequestStream = null;
          if (IGNORED_STATUS_CODES.has(error.code)) {
            // We ignore the `cancelled` "error", since we are the ones who cause
            // it when the user calls `.abort()`.
            userStream.end();
            return;
          }
          numConsecutiveErrors++;
          numRequestsMade++;
          if (
            numConsecutiveErrors <= maxRetries &&
            (RETRYABLE_STATUS_CODES.has(error.code) || isRstStreamError(error))
          ) {
            const backOffSettings =
              options.gaxOptions?.retry?.backoffSettings ||
              DEFAULT_BACKOFF_SETTINGS;
            const nextRetryDelay = getNextDelay(
              numConsecutiveErrors,
              backOffSettings
            );
            retryTimer = setTimeout(makeNewRequest, nextRetryDelay);
          } else {
            userStream.emit('error', error);
          }
        })
        .on('data', _ => {
          console.log('data event reaches rowStream');
          // Reset error count after a successful read so the backoff
          // time won't keep increasing when as stream had multiple errors
          numConsecutiveErrors = 0;
        })
        .on('end', () => {
          activeRequestStream = null;
        });
      rowStreamPipe(rowStream, userStream);
    };

    makeNewRequest();
    return userStream;
  }

  delete(gaxOptions?: CallOptions): Promise<DeleteTableResponse>;
  delete(gaxOptions: CallOptions, callback: DeleteTableCallback): void;
  delete(callback: DeleteTableCallback): void;
  /**
   * Delete the table.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_del_table
   */
  delete(
    optionsOrCallback?: CallOptions | DeleteTableCallback,
    cb?: DeleteTableCallback
  ): void | Promise<DeleteTableResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'deleteTable',
        reqOpts: {
          name: this.name,
        },
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  deleteRows(
    prefix: string,
    gaxOptions?: CallOptions
  ): Promise<DeleteRowsResponse>;
  deleteRows(
    prefix: string,
    gaxOptions: CallOptions,
    callback: DeleteRowsCallback
  ): void;
  deleteRows(prefix: string, callback: DeleteRowsCallback): void;
  /**
   * Delete all rows in the table, optionally corresponding to a particular
   * prefix.
   *
   * @throws {error} If a prefix is not provided.
   *
   * @param {string} prefix Row key prefix.
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_del_rows
   */
  deleteRows(
    prefix: string,
    optionsOrCallback?: CallOptions | DeleteRowsCallback,
    cb?: DeleteRowsCallback
  ): void | Promise<DeleteRowsResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    if (!prefix || is.fn(prefix)) {
      throw new Error('A prefix is required for deleteRows.');
    }
    const reqOpts = {
      name: this.name,
      rowKeyPrefix: Mutation.convertToBytes(prefix),
    };
    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'dropRowRange',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  exists(gaxOptions?: CallOptions): Promise<TableExistsResponse>;
  exists(gaxOptions: CallOptions, callback: TableExistsCallback): void;
  exists(callback: TableExistsCallback): void;
  /**
   * Check if a table exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {boolean} callback.exists Whether the table exists or not.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_exists_table
   */
  exists(
    optionsOrCallback?: CallOptions | TableExistsCallback,
    cb?: TableExistsCallback
  ): void | Promise<TableExistsResponse> {
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const reqOpts = {
      view: 'name',
      gaxOptions,
    };
    this.getMetadata(reqOpts, err => {
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

  /**
   * Get a reference to a Table Family.
   *
   * @throws {error} If a name is not provided.
   *
   * @param {string} id The family unique identifier.
   * @returns {Family}
   *
   * @example
   * ```
   * const family = table.family('my-family');
   * ```
   */
  family(id: string): Family {
    if (!id) {
      throw new Error('A family id must be provided.');
    }
    return new Family(this, id);
  }

  get(options?: GetTableOptions): Promise<GetTableResponse>;
  get(options: GetTableOptions, callback: GetTableCallback): void;
  get(callback: GetTableCallback): void;
  /**
   * Get a table if it exists.
   *
   * You may optionally use this to "get or create" an object by providing an
   * object with `autoCreate` set to `true`. Any extra configuration that is
   * normally required for the `create` method must be contained within this
   * object as well.
   *
   * @param {object} [options] Configuration object.
   * @param {boolean} [options.autoCreate=false] Automatically create the
   *     instance if it does not already exist.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {?error} callback.error An error returned while making this request.
   * @param {Table} callback.table The Table object.
   * @param {object} callback.apiResponse The resource as it exists in the API.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_get_table
   */
  get(
    optionsOrCallback?: GetTableOptions | GetTableCallback,
    cb?: GetTableCallback
  ): void | Promise<GetTableResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const autoCreate = !!options.autoCreate;
    const gaxOptions = options.gaxOptions;

    this.getMetadata({gaxOptions}, (err, metadata) => {
      if (err) {
        if (err.code === 5 && autoCreate) {
          this.create({gaxOptions}, callback);
          return;
        }

        callback(err);
        return;
      }

      callback(null, this, metadata);
    });
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
   * @example <caption>include:samples/api-reference-doc-snippets/instance.js</caption>
   * region_tag:bigtable_api_get_table_Iam_policy
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
    } as google.iam.v1.GetIamPolicyRequest;

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
        client: 'BigtableTableAdminClient',
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

  getFamilies(gaxOptions?: CallOptions): Promise<GetFamiliesResponse>;
  getFamilies(gaxOptions: CallOptions, callback: GetFamiliesCallback): void;
  getFamilies(callback: GetFamiliesCallback): void;
  /**
   * Get Family objects for all the column families in your table.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Family[]} callback.families The list of families.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_get_families
   */
  getFamilies(
    optionsOrCallback?: CallOptions | GetFamiliesCallback,
    cb?: GetFamiliesCallback
  ): void | Promise<GetFamiliesResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    this.getMetadata({gaxOptions}, (err, metadata) => {
      if (err) {
        callback(err);
        return;
      }
      const families = Object.keys(metadata.columnFamilies!).map(familyId => {
        const family = this.family(familyId);
        family.metadata = metadata.columnFamilies![familyId];
        return family;
      });
      callback(null, families, metadata.columnFamilies!);
    });
  }

  getReplicationStates(
    gaxOptions?: CallOptions
  ): Promise<GetReplicationStatesResponse>;
  getReplicationStates(
    gaxOptions: CallOptions,
    callback: GetReplicationStatesCallback
  ): void;
  getReplicationStates(callback: GetReplicationStatesCallback): void;
  /**
   * Get replication states of the clusters for this table.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Family[]} callback.clusterStates The map of clusterId and its replication state.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * ```
   * const {Bigtable} = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   *
   * table.getReplicationStates(function(err, clusterStates, apiResponse) {
   *   // `clusterStates` is an map of clusterId and its replication state.
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.getReplicationStates().then(function(data) {
   *   const clusterStates = data[0];
   *   const apiResponse = data[1];
   * });
   * ```
   */
  getReplicationStates(
    optionsOrCallback?: CallOptions | GetReplicationStatesCallback,
    cb?: GetReplicationStatesCallback
  ): void | Promise<GetReplicationStatesResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const reqOpts = {
      view: 'replication',
      gaxOptions,
    };
    this.getMetadata(reqOpts, (err, metadata) => {
      if (err) {
        callback(err);
        return;
      }
      const clusterStates = new Map<
        string,
        google.bigtable.admin.v2.Table.IClusterState
      >();
      Object.keys(metadata.clusterStates!).map(clusterId =>
        clusterStates.set(clusterId, metadata.clusterStates![clusterId])
      );
      callback(null, clusterStates, metadata);
    });
  }

  getMetadata(options?: GetMetadataOptions): Promise<GetMetadataResponse>;
  getMetadata(options: GetMetadataOptions, callback: GetMetadataCallback): void;
  getMetadata(callback: GetMetadataCallback): void;
  /**
   * Get the table's metadata.
   *
   * @param {object} [options] Table request options.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {string} [options.view] The view to be applied to the table fields.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.metadata The table's metadata.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_get_table_meta
   */
  getMetadata(
    optionsOrCallback?: GetMetadataOptions | GetMetadataCallback,
    cb?: GetMetadataCallback
  ): void | Promise<GetMetadataResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const reqOpts = {
      name: this.name,
      view: Table.VIEWS[options.view || 'unspecified'],
    };
    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'getTable',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (...args) => {
        if (args[1]) {
          this.metadata = args[1];
        }
        callback(...args);
      }
    );
  }

  getRows(options?: GetRowsOptions): Promise<GetRowsResponse>;
  getRows(options: GetRowsOptions, callback: GetRowsCallback): void;
  getRows(callback: GetRowsCallback): void;
  /**
   * Get {@link Row} objects for the rows currently in your table.
   *
   * This method is not recommended for large datasets as it will buffer all rows
   * before returning the results. Instead we recommend using the streaming API
   * via {@link Table#createReadStream}.
   *
   * @param {object} [options] Configuration object. See
   *     {@link Table#createReadStream} for a complete list of options.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Row[]} callback.rows List of Row objects.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_get_rows
   */
  getRows(
    optionsOrCallback?: GetRowsOptions | GetRowsCallback,
    cb?: GetRowsCallback
  ): void | Promise<GetRowsResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    this.createReadStream(options)
      .on('error', callback)
      .pipe(
        concat((rows: Row[]) => {
          callback(null, rows);
        })
      );
  }

  insert(
    entries: Entry | Entry[],
    gaxOptions?: CallOptions
  ): Promise<InsertRowsResponse>;
  insert(
    entries: Entry | Entry[],
    gaxOptions: CallOptions,
    callback: InsertRowsCallback
  ): void;
  insert(entries: Entry | Entry[], callback: InsertRowsCallback): void;
  /**
   * Insert or update rows in your table. It should be noted that gRPC only allows
   * you to send payloads that are less than or equal to 4MB. If you're inserting
   * more than that you may need to send smaller individual requests.
   *
   * @param {object|object[]} entries List of entries to be inserted.
   *     See {@link Table#mutate}.
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object[]} callback.err.errors If present, these represent partial
   *     failures. It's possible for part of your request to be completed
   *     successfully, while the other part was not.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_insert_rows
   */
  insert(
    entries: Entry | Entry[],
    optionsOrCallback?: CallOptions | InsertRowsCallback,
    cb?: InsertRowsCallback
  ): void | Promise<InsertRowsResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    entries = arrify<Entry>(entries).map((entry: Entry) => {
      entry.method = Mutation.methods.INSERT;
      return entry;
    });
    return this.mutate(entries, {gaxOptions}, callback);
  }

  mutate(
    entries: Entry | Entry[],
    options?: MutateOptions
  ): Promise<MutateResponse>;
  mutate(
    entries: Entry | Entry[],
    options: MutateOptions,
    callback: MutateCallback
  ): void;
  mutate(entries: Entry | Entry[], callback: MutateCallback): void;
  /**
   * Apply a set of changes to be atomically applied to the specified row(s).
   * Mutations are applied in order, meaning that earlier mutations can be masked
   * by later ones.
   *
   * @param {object|object[]} entries List of entities to be inserted or
   *     deleted.
   * @param {object} [options] Configuration object.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {boolean} [options.rawMutation] If set to `true` will treat entries
   *     as a raw Mutation object. See {@link Mutation#parse}.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object[]} callback.err.errors If present, these represent partial
   *     failures. It's possible for part of your request to be completed
   *     successfully, while the other part was not.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_mutate_rows
   */
  mutate(
    entriesRaw: Entry | Entry[],
    optionsOrCallback?: MutateOptions | MutateCallback,
    cb?: MutateCallback
  ): void | Promise<MutateResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const entries: Entry[] = (arrify(entriesRaw) as Entry[]).reduce(
      (a, b) => a.concat(b),
      []
    );

    let numRequestsMade = 0;

    const maxRetries = is.number(this.maxRetries) ? this.maxRetries! : 3;
    const pendingEntryIndices = new Set(
      entries.map((entry: Entry, index: number) => index)
    );
    const entryToIndex = new Map(
      entries.map((entry: Entry, index: number) => [entry, index])
    );
    const mutationErrorsByEntryIndex = new Map();

    const isRetryable = (err: ServiceError | null) => {
      // Don't retry if there are no more entries or retry attempts
      if (pendingEntryIndices.size === 0 || numRequestsMade >= maxRetries + 1) {
        return false;
      }
      // If the error is empty but there are still outstanding mutations,
      // it means that there are retryable errors in the mutate response
      // even when the RPC succeeded
      return !err || RETRYABLE_STATUS_CODES.has(err.code);
    };

    const onBatchResponse = (err: ServiceError | null) => {
      // Return if the error happened before a request was made
      if (numRequestsMade === 0) {
        callback(err);
        return;
      }

      if (isRetryable(err)) {
        const backOffSettings =
          options.gaxOptions?.retry?.backoffSettings ||
          DEFAULT_BACKOFF_SETTINGS;
        const nextDelay = getNextDelay(numRequestsMade, backOffSettings);
        setTimeout(makeNextBatchRequest, nextDelay);
        return;
      }

      // If there's no more pending mutations, set the error
      // to null
      if (pendingEntryIndices.size === 0) {
        err = null;
      }

      if (mutationErrorsByEntryIndex.size !== 0) {
        const mutationErrors = Array.from(mutationErrorsByEntryIndex.values());
        callback(new PartialFailureError(mutationErrors, err));
        return;
      }

      callback(err);
    };

    const makeNextBatchRequest = () => {
      const entryBatch = entries.filter((entry: Entry, index: number) => {
        return pendingEntryIndices.has(index);
      });

      const reqOpts = {
        tableName: this.name,
        appProfileId: this.bigtable.appProfileId,
        entries: options.rawMutation
          ? entryBatch
          : entryBatch.map(Mutation.parse),
      };

      const retryOpts = {
        currentRetryAttempt: numRequestsMade,
        // Handling retries in this client. Specify the retry options to
        // make sure nothing is retried in retry-request.
        noResponseRetries: 0,
        shouldRetryFn: (_: any) => {
          return false;
        },
      };

      options.gaxOptions = populateAttemptHeader(
        numRequestsMade,
        options.gaxOptions
      );

      this.bigtable
        .request<google.bigtable.v2.MutateRowsResponse>({
          client: 'BigtableClient',
          method: 'mutateRows',
          reqOpts,
          gaxOpts: options.gaxOptions,
          retryOpts,
        })
        .on('error', (err: ServiceError) => {
          onBatchResponse(err);
        })
        .on('data', (obj: google.bigtable.v2.IMutateRowsResponse) => {
          obj.entries!.forEach(entry => {
            const originalEntry = entryBatch[entry.index as number];
            const originalEntriesIndex = entryToIndex.get(originalEntry)!;

            // Mutation was successful.
            if (entry.status!.code === 0) {
              pendingEntryIndices.delete(originalEntriesIndex);
              mutationErrorsByEntryIndex.delete(originalEntriesIndex);
              return;
            }
            if (!RETRYABLE_STATUS_CODES.has(entry.status!.code!)) {
              pendingEntryIndices.delete(originalEntriesIndex);
            }
            const errorDetails = entry.status;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (errorDetails as any).entry = originalEntry;
            mutationErrorsByEntryIndex.set(originalEntriesIndex, errorDetails);
          });
        })
        .on('end', onBatchResponse);
      numRequestsMade++;
    };

    makeNextBatchRequest();
  }

  /**
   * Get a reference to a table row.
   *
   * @throws {error} If a key is not provided.
   *
   * @param {string} key The row key.
   * @returns {Row}
   *
   * @example
   * ```
   * const row = table.row('lincoln');
   * ```
   */
  row(key: string): Row {
    if (!key) {
      throw new Error('A row key must be provided.');
    }
    return new Row(this, key);
  }

  sampleRowKeys(gaxOptions?: CallOptions): Promise<SampleRowsKeysResponse>;
  sampleRowKeys(gaxOptions: CallOptions, callback: SampleRowKeysCallback): void;
  sampleRowKeys(callback?: SampleRowKeysCallback): void;
  /**
   * Returns a sample of row keys in the table. The returned row keys will delimit
   * contiguous sections of the table of approximately equal size, which can be
   * used to break up the data for distributed tasks like mapreduces.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object[]} callback.keys The list of keys.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_sample_row_keys
   */
  sampleRowKeys(
    optionsOrCallback?: CallOptions | SampleRowKeysCallback,
    cb?: SampleRowKeysCallback
  ): void | Promise<SampleRowsKeysResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    this.sampleRowKeysStream(gaxOptions)
      .on('error', callback)
      .pipe(
        concat((keys: string[]) => {
          callback(null, keys);
        })
      );
  }

  /**
   * Returns a sample of row keys in the table as a readable object stream.
   *
   * See {@link Table#sampleRowKeys} for more details.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @returns {stream}
   *
   * @example
   * ```
   * table.sampleRowKeysStream()
   *   .on('error', console.error)
   *   .on('data', function(key) {
   *     // Do something with the `key` object.
   *   });
   *
   * //-
   * // If you anticipate many results, you can end a stream early to prevent
   * // unnecessary processing.
   * //-
   * table.sampleRowKeysStream()
   *   .on('data', function(key) {
   *     this.end();
   *   });
   * ```
   */
  sampleRowKeysStream(gaxOptions?: CallOptions) {
    const reqOpts = {
      tableName: this.name,
      appProfileId: this.bigtable.appProfileId,
    };

    const rowKeysStream = new Transform({
      transform(key, enc, next) {
        next(null, {
          key: key.rowKey,
          offset: key.offsetBytes,
        });
      },
      objectMode: true,
    });

    return pumpify.obj([
      this.bigtable.request({
        client: 'BigtableClient',
        method: 'sampleRowKeys',
        reqOpts,
        gaxOpts: Object.assign({}, gaxOptions),
      }),
      rowKeysStream,
    ]);
  }

  setIamPolicy(
    policy: Policy,
    gaxOptions?: CallOptions
  ): Promise<SetIamPolicyResponse>;
  setIamPolicy(policy: Policy, callback: SetIamPolicyCallback): void;
  setIamPolicy(
    policy: Policy,
    gaxOptions: CallOptions,
    callback: SetIamPolicyCallback
  ): void;
  /**
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.error An error returned while making this request.
   * @param {Policy} policy The policy.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/instance.js</caption>
   * region_tag:bigtable_api_set_table_Iam_policy
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
      (policy.etag as {} as Buffer) = Buffer.from(policy.etag);
    }
    const reqOpts = {
      resource: this.name,
      policy,
    };
    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
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
   * @example <caption>include:samples/api-reference-doc-snippets/instance.js</caption>
   * region_tag:bigtable_api_test_table_Iam_permissions
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
        client: 'BigtableTableAdminClient',
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

  truncate(gaxOptions?: CallOptions): Promise<TruncateResponse>;
  truncate(gaxOptions: CallOptions, callback: TruncateCallback): void;
  truncate(callback: TruncateCallback): void;
  /**
   * Truncate the table.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * ```
   * table.truncate(function(err, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.truncate().then(function(data) {
   *   const apiResponse = data[0];
   * });
   * ```
   */
  truncate(
    optionsOrCallback?: CallOptions | TruncateCallback,
    cb?: TruncateCallback
  ): void | Promise<TruncateResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const reqOpts = {
      name: this.name,
      deleteAllDataFromTable: true,
    };
    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'dropRowRange',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  waitForReplication(): Promise<WaitForReplicationResponse>;
  waitForReplication(callback: WaitForReplicationCallback): void;
  /**
   * Generates Consistency-Token and check consistency for generated token
   * In-case consistency check returns false, retrial is done in interval
   * of 5 seconds till 10 minutes, after that it returns false.
   *
   * @param {function(?error, ?boolean)} callback The callback function.
   * @param {?Error} callback.err An error returned while making this request.
   * @param {?Boolean} callback.resp Boolean value.
   */
  waitForReplication(
    callback?: WaitForReplicationCallback
  ): void | Promise<WaitForReplicationResponse> {
    // handler for generated consistency-token
    const tokenHandler: GenerateConsistencyTokenCallback = (err, token) => {
      if (err) {
        return callback!(err);
      }

      // set timeout for 10 minutes
      const timeoutAfterTenMinutes = setTimeout(
        () => {
          callback!(null, false);
        },
        10 * 60 * 1000
      );

      // method checks if retrial is required & init retrial with 5 sec
      // delay
      const retryIfNecessary: CheckConsistencyCallback = (err, res) => {
        if (err) {
          clearTimeout(timeoutAfterTenMinutes);
          return callback!(err);
        }

        if (res === true) {
          clearTimeout(timeoutAfterTenMinutes);
          return callback!(null, true);
        }

        setTimeout(launchCheck, 5000);
      };

      // method to launch token consistency check
      const launchCheck = () => {
        this.checkConsistency(token!, retryIfNecessary);
      };

      launchCheck();
    };

    // generate consistency-token
    this.generateConsistencyToken(tokenHandler);
  }

  generateConsistencyToken(): Promise<GenerateConsistencyTokenResponse>;
  generateConsistencyToken(callback: GenerateConsistencyTokenCallback): void;
  /**
   * Generates Consistency-Token
   * @param {function(?error, ?boolean)} callback The callback function.
   * @param {?Error} callback.err An error returned while making this request.
   * @param {?String} callback.token The generated consistency token.
   */
  generateConsistencyToken(
    callback?: GenerateConsistencyTokenCallback
  ): void | Promise<GenerateConsistencyTokenResponse> {
    const reqOpts = {
      name: this.name,
    };
    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'generateConsistencyToken',
        reqOpts,
      },
      (err, res) => {
        if (err) {
          callback!(err);
          return;
        }
        callback!(null, res.consistencyToken);
      }
    );
  }

  checkConsistency(token: string): Promise<CheckConsistencyResponse>;
  checkConsistency(token: string, callback: CheckConsistencyCallback): void;
  /**
   * Checks consistency for given ConsistencyToken
   * @param {string} token consistency token
   * @param {function(?error, ?boolean)} callback The callback function.
   * @param {?Error} callback.err An error returned while making this request.
   * @param {?Boolean} callback.consistent Boolean value.
   */
  checkConsistency(
    token: string,
    callback?: CheckConsistencyCallback
  ): void | Promise<CheckConsistencyResponse> {
    const reqOpts = {
      name: this.name,
      consistencyToken: token,
    };
    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'checkConsistency',
        reqOpts,
      },
      (err, res) => {
        if (err) {
          callback!(err);
          return;
        }
        callback!(null, res.consistent);
      }
    );
  }
  /**
   * The view to be applied to the returned table's fields.
   * Defaults to schema if unspecified.
   *
   * @private
   */
  static VIEWS = {
    unspecified: 0,
    name: 1,
    schema: 2,
    replication: 3,
    full: 4,
  } as {[index: string]: number};
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(Table, {
  exclude: ['family', 'row'],
});

function getNextDelay(numConsecutiveErrors: number, config: BackoffSettings) {
  // 0 - 100 ms jitter
  const jitter = Math.floor(Math.random() * 100);
  const calculatedNextRetryDelay =
    config.initialRetryDelayMillis *
      Math.pow(config.retryDelayMultiplier, numConsecutiveErrors) +
    jitter;

  return Math.min(calculatedNextRetryDelay, config.maxRetryDelayMillis);
}

function populateAttemptHeader(attempt: number, gaxOpts?: CallOptions) {
  gaxOpts = gaxOpts || {};
  gaxOpts.otherArgs = gaxOpts.otherArgs || {};
  gaxOpts.otherArgs.headers = gaxOpts.otherArgs.headers || {};
  gaxOpts.otherArgs.headers['bigtable-attempt'] = attempt;
  return gaxOpts;
}

export interface GoogleInnerError {
  reason?: string;
  message?: string;
}

export class PartialFailureError extends Error {
  errors?: GoogleInnerError[];
  constructor(errors: GoogleInnerError[], rpcError?: ServiceError | null) {
    super();
    this.errors = errors;
    this.name = 'PartialFailureError';
    let messages = errors.map(e => e.message);
    if (messages.length > 1) {
      messages = messages.map((message, i) => `    ${i + 1}. ${message}`);
      messages.unshift(
        'Multiple errors occurred during the request. Please see the `errors` array for complete details.\n'
      );
      messages.push('\n');
    }
    this.message = messages.join('\n');
    if (rpcError) {
      this.message += 'Request failed with: ' + rpcError.message;
    }
  }
}
