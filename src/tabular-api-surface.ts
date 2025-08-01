// Copyright 2024 Google LLC
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
import {Instance} from './instance';
import {Mutation} from './mutation';
import {
  Bigtable,
  Entry,
  MutateOptions,
  SampleRowKeysCallback,
  SampleRowsKeysResponse,
} from './index';
import {BoundData, RawFilter} from './filter';
import {Row} from './row';
import {BackoffSettings} from 'google-gax/build/src/gax';
import {google} from '../protos/protos';
import {CallOptions, grpc, ServiceError} from 'google-gax';
import {Transform} from 'stream';
import * as is from 'is';
import {GoogleInnerError} from './table';
import {createReadStreamInternal} from './utils/createReadStreamInternal';
import {getRowsInternal} from './utils/getRowsInternal';
import {
  MethodName,
  StreamingState,
} from './client-side-metrics/client-side-metrics-attributes';

// See protos/google/rpc/code.proto
// (4=DEADLINE_EXCEEDED, 8=RESOURCE_EXHAUSTED, 10=ABORTED, 14=UNAVAILABLE)
export const RETRYABLE_STATUS_CODES = new Set([4, 8, 10, 14]);
// (1=CANCELLED)
export const IGNORED_STATUS_CODES = new Set([1]);

export const DEFAULT_BACKOFF_SETTINGS: BackoffSettings = {
  initialRetryDelayMillis: 10,
  retryDelayMultiplier: 2,
  maxRetryDelayMillis: 60000,
};

export type InsertRowsCallback = (
  err: ServiceError | PartialFailureError | null,
  apiResponse?: google.protobuf.Empty,
) => void;
export type InsertRowsResponse = [google.protobuf.Empty];
export type MutateCallback = (
  err: ServiceError | PartialFailureError | null,
  apiResponse?: google.protobuf.Empty,
) => void;
export type MutateResponse = [google.protobuf.Empty];

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

export type GetRowsCallback = (
  err: ServiceError | null,
  rows?: Row[],
  apiResponse?: google.bigtable.v2.ReadRowsResponse,
) => void;
export type GetRowsResponse = [Row[], google.bigtable.v2.ReadRowsResponse];

export interface PrefixRange {
  start?: BoundData | string;
  end?: BoundData | string;
}

export interface PrefixRange {
  start?: BoundData | string;
  end?: BoundData | string;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const concat = require('concat-stream');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pumpify = require('pumpify');

/**
 * The TabularApiSurface class is a class that contains methods we want to
 * expose on both tables and authorized views. It also contains data that will
 * be used by both Authorized views and Tables for these shared methods.
 *
 * @class
 * @param {Instance} instance Instance Object.
 * @param {string} id Unique identifier of the table.
 *
 */
export class TabularApiSurface {
  bigtable: Bigtable;
  instance: Instance;
  name: string;
  id: string;
  metadata?: google.bigtable.admin.v2.ITable;
  maxRetries?: number;
  // We need viewName to be public because now we need it in Row class
  // We need it in Row class because now we use getRowsInternal instead of getRows
  viewName?: string;

  protected constructor(instance: Instance, id: string, viewName?: string) {
    this.bigtable = instance.bigtable;
    this.instance = instance;
    this.viewName = viewName;

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
   * Get {@link Row} objects for the rows currently in your table as a
   * readable object stream.
   *
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
   * @param opts
   */
  createReadStream(opts?: GetRowsOptions) {
    const metricsCollector =
      this.bigtable._metricsConfigManager.createOperation(
        MethodName.READ_ROWS,
        StreamingState.STREAMING,
        this,
      );
    return createReadStreamInternal(this, metricsCollector, opts);
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
   *     {@link Table#createReadStream} for a complete list of options.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Row[]} callback.rows List of Row objects.
   *
   * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
   * region_tag:bigtable_api_get_rows
   * @param optionsOrCallback
   * @param cb
   */
  getRows(
    optionsOrCallback?: GetRowsOptions | GetRowsCallback,
    cb?: GetRowsCallback,
  ): void | Promise<GetRowsResponse> {
    const metricsCollector =
      this.bigtable._metricsConfigManager.createOperation(
        MethodName.READ_ROWS,
        StreamingState.STREAMING,
        this,
      );
    return getRowsInternal(this, metricsCollector, optionsOrCallback, cb);
  }

  insert(
    entries: Entry | Entry[],
    gaxOptions?: CallOptions,
  ): Promise<InsertRowsResponse>;
  insert(
    entries: Entry | Entry[],
    gaxOptions: CallOptions,
    callback: InsertRowsCallback,
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
    cb?: InsertRowsCallback,
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
    options?: MutateOptions,
  ): Promise<MutateResponse>;
  mutate(
    entries: Entry | Entry[],
    options: MutateOptions,
    callback: MutateCallback,
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
    cb?: MutateCallback,
  ): void | Promise<MutateResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const options =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
    const entries: Entry[] = (arrify(entriesRaw) as Entry[]).reduce(
      (a, b) => a.concat(b),
      [],
    );
    const collectMetricsCallback = (
      originalError: ServiceError | null,
      err: ServiceError | PartialFailureError | null,
      apiResponse?: google.protobuf.Empty,
    ) => {
      // originalError is the error that was sent from the gapic layer. The
      // compiler guarantees that it contains a code which needs to be
      // provided when an operation is marked complete.
      //
      // err is the error we intend to send back to the user. Often it is the
      // same as originalError, but in one case we construct a
      // PartialFailureError and send that back to the user instead. In this
      // case, we still need to pass the originalError into the method
      // because the PartialFailureError doesn't have a code, but we need to
      // communicate a code to the metrics collector.
      //
      const code = originalError ? originalError.code : 0;
      metricsCollector.onOperationComplete(code);
      callback(err, apiResponse);
    };

    const metricsCollector =
      this.bigtable._metricsConfigManager.createOperation(
        MethodName.MUTATE_ROWS,
        StreamingState.STREAMING,
        this,
      );
    /*
    The following line of code sets the timeout if it was provided while
    creating the client. This will be used to determine if the client should
    retry on errors. Eventually, this will be handled downstream in google-gax.
    */
    const timeout =
      options?.gaxOptions?.timeout ||
      (this?.bigtable?.options?.BigtableClient?.clientConfig?.interfaces &&
        this?.bigtable?.options?.BigtableClient?.clientConfig?.interfaces[
          'google.bigtable.v2.Bigtable'
        ]?.methods['MutateRows']?.timeout_millis);
    const callTimeMillis = new Date().getTime();

    let numRequestsMade = 0;

    const maxRetries = is.number(this.maxRetries) ? this.maxRetries! : 3;
    const pendingEntryIndices = new Set(
      entries.map((entry: Entry, index: number) => index),
    );
    const entryToIndex = new Map(
      entries.map((entry: Entry, index: number) => [entry, index]),
    );
    const mutationErrorsByEntryIndex = new Map();

    const isRetryable = (
      err: ServiceError | null,
      timeoutExceeded: boolean,
    ) => {
      if (timeoutExceeded) {
        // If the timeout has been exceeded then do not retry.
        return false;
      }
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
        collectMetricsCallback(err, err);
        return;
      }

      const timeoutExceeded = !!(
        timeout && timeout < new Date().getTime() - callTimeMillis
      );
      if (isRetryable(err, timeoutExceeded)) {
        // If the timeout or max retries is exceeded or if there are no
        // pending indices left then the client doesn't retry.
        // Otherwise, the client will retry if there is no error or if the
        // error has a retryable status code.
        const backOffSettings =
          options.gaxOptions?.retry?.backoffSettings ||
          DEFAULT_BACKOFF_SETTINGS;
        const nextDelay = getNextDelay(numRequestsMade, backOffSettings);
        metricsCollector.onAttemptComplete(err ? err.code : 0);
        setTimeout(makeNextBatchRequest, nextDelay);
        return;
      }

      // If there's no more pending mutations, set the error
      // to null
      if (pendingEntryIndices.size === 0) {
        err = null;
      }

      const mutationErrors = Array.from(mutationErrorsByEntryIndex.values());
      if (mutationErrorsByEntryIndex.size !== 0) {
        collectMetricsCallback(
          err,
          new PartialFailureError(mutationErrors, err),
        );
        return;
      }
      if (err) {
        /* If there's an RPC level failure and the mutation entries don't have
           a status code, the RPC level failure error code will be used as the
           entry failure code.
          */
        (err as ServiceError & {errors?: ServiceError[]}).errors =
          mutationErrors.concat(
            [...pendingEntryIndices]
              .filter(index => !mutationErrorsByEntryIndex.has(index))
              .map(() => err),
          );
        collectMetricsCallback(err, err);
        return;
      }
      collectMetricsCallback(null, null);
    };

    metricsCollector.onOperationStart();
    const makeNextBatchRequest = () => {
      metricsCollector.onAttemptStart();
      const entryBatch = entries.filter((entry: Entry, index: number) => {
        return pendingEntryIndices.has(index);
      });

      // If the viewName is provided then request will be made for an
      // authorized view. Otherwise, the request is made for a table.
      const baseReqOpts = (
        this.viewName
          ? {
              authorizedViewName: `${this.name}/authorizedViews/${this.viewName}`,
            }
          : {
              tableName: this.name,
            }
      ) as google.bigtable.v2.IReadRowsRequest;
      const reqOpts = Object.assign(baseReqOpts, {
        appProfileId: this.bigtable.appProfileId,
        entries: options.rawMutation
          ? entryBatch
          : entryBatch.map(Mutation.parse),
      });

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
        options.gaxOptions,
      );

      const requestStream =
        this.bigtable.request<google.bigtable.v2.MutateRowsResponse>({
          client: 'BigtableClient',
          method: 'mutateRows',
          reqOpts,
          gaxOpts: options.gaxOptions,
          retryOpts,
        });
      metricsCollector.wrapRequest(requestStream);
      requestStream
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
    cb?: SampleRowKeysCallback,
  ): void | Promise<SampleRowsKeysResponse> {
    const callback =
      typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;
    const gaxOptions =
      typeof optionsOrCallback === 'object' ? optionsOrCallback : {};

    /*
    The following line of code sets the timeout if it was provided while
    creating the client. This will be used to determine if the client should
    retry on DEADLINE_EXCEEDED errors. Eventually, this will be handled
    downstream in google-gax.
     */
    const timeout = gaxOptions?.timeout;
    const callTimeMillis = new Date().getTime();

    this.sampleRowKeysStream(gaxOptions)
      .on('error', (error: grpc.ServiceError) => {
        if (timeout && timeout > new Date().getTime() - callTimeMillis) {
          error.code = grpc.status.DEADLINE_EXCEEDED;
        }
        callback(error);
      })
      .pipe(
        concat((keys: string[]) => {
          callback(null, keys);
        }),
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
    // If the viewName is provided then request will be made for an
    // authorized view. Otherwise, the request is made for a table.
    const reqOpts = (
      this.viewName
        ? {
            authorizedViewName: `${this.name}/authorizedViews/${this.viewName}`,
            appProfileId: this.bigtable.appProfileId,
          }
        : {
            tableName: this.name,
            appProfileId: this.bigtable.appProfileId,
          }
    ) as google.bigtable.v2.IReadRowsRequest;

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
}

export function getNextDelay(
  numConsecutiveErrors: number,
  config: BackoffSettings,
) {
  // 0 - 100 ms jitter
  const jitter = Math.floor(Math.random() * 100);
  const calculatedNextRetryDelay =
    config.initialRetryDelayMillis *
      Math.pow(config.retryDelayMultiplier, numConsecutiveErrors) +
    jitter;

  return Math.min(calculatedNextRetryDelay, config.maxRetryDelayMillis);
}

export function populateAttemptHeader(attempt: number, gaxOpts?: CallOptions) {
  gaxOpts = gaxOpts || {};
  gaxOpts.otherArgs = gaxOpts.otherArgs || {};
  gaxOpts.otherArgs.headers = gaxOpts.otherArgs.headers || {};
  gaxOpts.otherArgs.headers['bigtable-attempt'] = attempt;
  return gaxOpts;
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(TabularApiSurface, {
  exclude: ['family', 'row'],
});

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
        'Multiple errors occurred during the request. Please see the `errors` array for complete details.\n',
      );
      messages.push('\n');
    }
    this.message = messages.join('\n');
    if (rpcError) {
      this.message += 'Request failed with: ' + rpcError.message;
    }
  }
}
