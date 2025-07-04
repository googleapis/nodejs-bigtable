// Copyright 2025 Google LLC
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

import {GetRowsOptions} from '../table';
import {Row} from '../row';
import * as is from 'is';
import {Filter, BoundData} from '../filter';
import {Mutation} from '../mutation';
import {AbortableDuplex} from '../index';
import {
  ChunkPushData,
  ChunkPushLastScannedRowData,
  ChunkTransformer,
  DataEvent,
} from '../chunktransformer';
import {TableUtils} from './table';
import {Duplex, PassThrough, Transform} from 'stream';
import {
  MethodName,
  StreamingState,
} from '../client-side-metrics/client-side-metrics-attributes';
import {google} from '../../protos/protos';
const pumpify = require('pumpify');
import {grpc, ServiceError} from 'google-gax';
import {
  DEFAULT_BACKOFF_SETTINGS,
  getNextDelay,
  IGNORED_STATUS_CODES,
  populateAttemptHeader,
  RETRYABLE_STATUS_CODES,
  TabularApiSurface,
} from '../tabular-api-surface';
import {OperationMetricsCollector} from '../client-side-metrics/operation-metrics-collector';

/**
 * Creates a readable stream of rows from a Bigtable table or authorized view.
 *
 * This internal method handles the core logic for streaming rows from a Bigtable
 * table. It supports various filtering, limiting, and retry mechanisms. It can
 * be used to create a stream for either a whole table or an authorized view.
 *
 * @param {Table} table The Table instance to read rows from.
 * @param metricsCollector
 * @param {GetRowsOptions} [opts] Optional configuration for the read operation.
 * @param {boolean} [opts.decode=true] If set to `false` it will not decode
 *     Buffer values returned from Bigtable.
 * @param {boolean} [opts.encoding] The encoding to use when converting
 *     Buffer values to a string.
 * @param {string} [opts.end] End value for key range.
 * @param {Filter} [opts.filter] Row filters allow you to
 *     both make advanced queries and format how the data is returned.
 * @param {object} [opts.gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {string[]} [opts.keys] A list of row keys.
 * @param {number} [opts.limit] Maximum number of rows to be returned.
 * @param {string} [opts.prefix] Prefix that the row key must match.
 * @param {string[]} [opts.prefixes] List of prefixes that a row key must
 *     match.
 * @param {object[]} [opts.ranges] A list of key ranges.
 * @param {string} [opts.start] Start value for key range.
 * @returns {stream} A readable stream of {@link Row} objects.
 *
 */
export function createReadStreamInternal(
  table: TabularApiSurface,
  metricsCollector: OperationMetricsCollector,
  opts?: GetRowsOptions,
) {
  const options = opts || {};
  const maxRetries = is.number(table.maxRetries) ? table.maxRetries! : 10;
  let activeRequestStream: AbortableDuplex | null;
  let rowKeys: string[];
  let filter: {} | null;
  const rowsLimit = options.limit || 0;
  const hasLimit = rowsLimit !== 0;

  const viewName = table.viewName;

  let numConsecutiveErrors = 0;
  let numRequestsMade = 0;
  let retryTimer: NodeJS.Timeout | null;

  rowKeys = options.keys || [];

  /*
  The following line of code sets the timeout if it was provided while
  creating the client. This will be used to determine if the client should
  retry on DEADLINE_EXCEEDED errors. Eventually, this will be handled
  downstream in google-gax.
   */
  const timeout =
    opts?.gaxOptions?.timeout ||
    (table?.bigtable?.options?.BigtableClient?.clientConfig?.interfaces &&
      table?.bigtable?.options?.BigtableClient?.clientConfig?.interfaces[
        'google.bigtable.v2.Bigtable'
      ]?.methods['ReadRows']?.timeout_millis);
  const callTimeMillis = new Date().getTime();

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
  // The key of the last row that was emitted by the per attempt pipeline
  // Note: this must be updated from the operation level userStream to avoid referencing buffered rows that will be
  // discarded in the per attempt subpipeline (rowStream)
  let lastRowKey = '';
  let rowsRead = 0;

  // To handle both .on('data') and for-await-of, we need to intercept
  // when data is consumed.
  // For .on('data'), we wrap `emit`.
  // For for-await-of, it's trickier as it pulls via _read.
  // We'll create a custom stream that wraps the PassThrough functionality
  // but allows us to hook into data delivery.

  const internalPassthrough = new PassThrough({
    objectMode: true,
    readableHighWaterMark: 0,
    writableHighWaterMark: 0,
  });

  // userStream is what the user interacts with.
  // We will override its pipe and _read methods, and wrap its emit method.
  const userStream = new Duplex({
    objectMode: true,
    readableHighWaterMark: options.readableHighWaterMark ?? 0, // honor user's HWM for read side
    writableHighWaterMark: 0, // keep internal passthrough HWM low for write side
    read() {
      // This is called when the consumer (e.g. for-await-of) is ready for more data.
      // This signifies the end of the previous user code block for for-await-of.
      metricsCollector.endUserCodeBlock();
      // Now, try to pull data from our internalPassthrough.
      // If data is available, it will be pushed. If not, _read will be called again later.
      let data;
      while ((data = internalPassthrough.read()) !== null) {
        // Before pushing to the consumer, mark the start of the user code block.
        metricsCollector.startUserCodeBlock();
        if (!this.push(data)) {
          // If push returns false, the consumer's buffer is full.
          // The current user code block (for-await-of) will end once _read is called again.
          // For .on('data'), this is handled by emit wrapper.
          return;
        }
        // If push was successful, for for-await-of, the user code runs, then _read is called again.
        // We need to call endUserCodeBlock when _read is called next.
        // For .on('data', listener), the listener has already run if it was attached.
        // This might cause endUserCodeBlock to be called too early for .on('data') if it's also consumed by for-await-of.
        // This needs careful handling. The `emit` wrapper is more reliable for `.on('data')`.
      }
    },
    write(chunk, encoding, callback) {
      internalPassthrough.write(chunk, encoding, callback);
    },
    final(callback) {
      internalPassthrough.end(callback);
    },
  });

  // Forward data from internalPassthrough to userStream's readable side
  internalPassthrough.on('data', () => {
    // When internalPassthrough has data, userStream's _read will be called if it's
    // being pulled from (like in for-await-of or pipe).
    // If userStream is in flowing mode (.on('data')), its emit will handle it.
    userStream.read(0); // This will trigger userStream._read if needed.
  });
  internalPassthrough.on('end', () => {
    userStream.push(null); // Signal end to userStream consumers
  });
  internalPassthrough.on('error', (err) => {
    userStream.emit('error', err);
  });


  // Wrapper for .on('data', listener)
  const originalEmit = userStream.emit;
  userStream.emit = (event: string | symbol, ...args: any[]): boolean => {
    if (event === 'data' && userStream.listenerCount('data') > 0) {
      metricsCollector.startUserCodeBlock();
      const result = originalEmit.call(userStream, event, ...args);
      metricsCollector.endUserCodeBlock();
      return result;
    }
    return originalEmit.call(userStream, event, ...args);
  };

  // This transform handles the logic from the original PassThrough,
  // such as filtering duplicates and updating lastRowKey.
  // It feeds into the `internalPassthrough` stream.
  const processingTransform = new Transform({
    objectMode: true,
    transform(event, _encoding, callback) {
      if (userCanceled) {
        return callback();
      }
      if (event.eventType === DataEvent.LAST_ROW_KEY_UPDATE) {
        lastRowKey = event.lastScannedRowKey;
        return callback();
      }
      const row = event;
      if (TableUtils.lessThanOrEqualTo(row.id, lastRowKey)) {
        return callback();
      }
      lastRowKey = row.id;
      rowsRead++;
      callback(null, row);
    },
  });


  // The caller should be able to call userStream.end() to stop receiving
  // more rows and cancel the stream prematurely. But also, the 'end' event
  // will be emitted if the stream ended normally. To tell these two
  // situations apart, we'll save the "original" end() function, and
  // will call it on rowStream.on('end').
  const originalEnd = userStream.end.bind(userStream);

  // Taking care of this extra listener when piping and unpiping userStream from rowStream:
  // rowStream is the stream coming from pumpify (gRPC data -> chunkTransformer -> toRowStream)
  // This rowStream will now pipe to `processingTransform` which then pipes to `internalPassthrough`.
  const rowStreamPipe = (rowStream: Duplex) => {
    // The originalEnd logic is now implicitly handled by userStream.push(null) when internalPassthrough ends.
    // And internalPassthrough ends when processingTransform ends, which ends when rowStream ends.
    rowStream.pipe(processingTransform).pipe(internalPassthrough, {end: false});
    // When the source rowStream (from pumpify) ends, we need to ensure processingTransform also ends.
    rowStream.on('end', () => {
      processingTransform.end();
    });
  };
  const rowStreamUnpipe = (rowStream: Duplex) => {
    // Unpiping needs to be handled carefully if retries are involved.
    // For now, the main concern is on userStream.end() being called by the user.
    rowStream?.unpipe(processingTransform);
    processingTransform?.unpipe(internalPassthrough);
    // We don't explicitly call originalEnd anymore, userStream handles its own 'end'
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userStream.end = (chunk?: any, encoding?: any, cb?: () => void): Duplex => {
    // Call the original Duplex end method.
    // The `final` method of our Duplex (userStream) will handle ending internalPassthrough.
    // And processingTransform will end when rowStream ends or is unpiped.
    if (!userCanceled) { // Prevent multiple calls if already ending due to user action
      userCanceled = true;
      if (activeRequestStream) {
        activeRequestStream.abort();
      }
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      // Ensure any ongoing user code block is ended before the stream truly finishes.
      // This is particularly important if the stream is ended prematurely by the user.
      metricsCollector.endUserCodeBlock();
    }
    // The Duplex `end` method doesn't return itself in some versions/usages,
    // but the original PassThrough did. We should ensure our custom Duplex's end method behaves as expected.
    // For now, assume standard Duplex end behavior.
    // super.end() or Reflect.getPrototypeOf(userStream).end.call(userStream, chunk, encoding, cb) might be needed if this was a class
    // Since it's an object literal, we rely on the default Duplex.end.
    // To be safe, and mimic original return if it was `this`, we can use:
    const originalEndBehavior = Duplex.prototype.end;
    originalEndBehavior.call(userStream, chunk, encoding, cb);
    return userStream; // Return `this` (userStream)
  };

  metricsCollector.onOperationStart();
  const makeNewRequest = () => {
    metricsCollector.onAttemptStart();

    // Avoid cancelling an expired timer if user
    // cancelled the stream in the middle of a retry
    retryTimer = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chunkTransformer = new ChunkTransformer({
      decode: options.decode,
    } as any);

    // If the viewName is provided then request will be made for an
    // authorized view. Otherwise, the request is made for a table.
    const reqOpts = (
      viewName
        ? {
            authorizedViewName: `${table.name}/authorizedViews/${viewName}`,
            appProfileId: table.bigtable.appProfileId,
          }
        : {
            tableName: table.name,
            appProfileId: table.bigtable.appProfileId,
          }
    ) as google.bigtable.v2.IReadRowsRequest;

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
            lastRowKey as string,
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
        TableUtils.greaterThan(rowKey, lastRowKey as string),
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
      Mutation.convertToBytes,
    ) as {} as Uint8Array[];

    reqOpts.rows.rowRanges = ranges.map(range =>
      Filter.createRange(
        range.start as BoundData,
        range.end as BoundData,
        'Key',
      ),
    );

    if (filter) {
      reqOpts.filter = filter;
    }

    if (hasLimit) {
      reqOpts.rowsLimit = rowsLimit - rowsRead;
    }

    const gaxOpts = populateAttemptHeader(numRequestsMade, options.gaxOptions);

    const requestStream = table.bigtable.request({
      client: 'BigtableClient',
      method: 'readRows',
      reqOpts,
      gaxOpts,
      retryOpts,
    });

    activeRequestStream = requestStream!;

    const toRowStream = new Transform({
      transform: (rowData: ChunkPushData, _, next) => {
        if (
          userCanceled ||
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (userStream as any)._writableState.ended
        ) {
          return next();
        }
        if (
          (rowData as ChunkPushLastScannedRowData).eventType ===
          DataEvent.LAST_ROW_KEY_UPDATE
        ) {
          /**
           * If the data is the chunk transformer communicating that the
           * lastScannedRow was received then this message is passed along
           * to the user stream to update the lastRowKey.
           */
          next(null, rowData);
        } else {
          /**
           * If the data is just regular rows being pushed from the
           * chunk transformer then the rows are encoded so that they
           * can be consumed by the user stream.
           */
          const row = table.row((rowData as Row).key as string);
          row.data = (rowData as Row).data;
          next(null, row);
        }
      },
      objectMode: true,
    });

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

    metricsCollector.handleStatusAndMetadata(requestStream);
    rowStream
      .on('error', (error: ServiceError) => {
        rowStreamUnpipe(rowStream); // Pass rowStream, not userStream
        activeRequestStream = null;
        if (IGNORED_STATUS_CODES.has(error.code)) {
          userStream.end(); // This will trigger our wrapped end and cleanup
          // onOperationComplete is called by the OperationMetricsCollector itself when an attempt fails or stream ends.
          // However, if it's an ignored code (like user cancellation), the current attempt might not have formally "completed"
          // in a way that onAttemptComplete was called. We should ensure onOperationComplete is robustly called.
          // For user cancellation, userStream.end() calls metricsCollector.endUserCodeBlock(),
          // and then onOperationComplete will be triggered by the stream ending.
          // If the error is from the gRPC stream itself, onAttemptComplete should be called.
          // Let's ensure onOperationComplete is called if not already handled by a retry path.
          if (!retryTimer) { // if not about to retry
            metricsCollector.onOperationComplete(error.code);
          }
          return;
        }
        numConsecutiveErrors++;
        numRequestsMade++;
        if (
          numConsecutiveErrors <= maxRetries &&
          (RETRYABLE_STATUS_CODES.has(error.code) || isRstStreamError(error)) &&
          !(timeout && timeout < new Date().getTime() - callTimeMillis)
        ) {
          const backOffSettings =
            options.gaxOptions?.retry?.backoffSettings ||
            DEFAULT_BACKOFF_SETTINGS;
          const nextRetryDelay = getNextDelay(
            numConsecutiveErrors,
            backOffSettings,
          );
          metricsCollector.onAttemptComplete(error.code); // An attempt failed, record it.
          retryTimer = setTimeout(makeNewRequest, nextRetryDelay);
        } else {
          if (
            !error.code &&
            error.message === 'The client has already been closed.'
          ) {
            error.code = grpc.status.CANCELLED;
          }
          // Before emitting the final error, ensure any user code block is ended.
          metricsCollector.endUserCodeBlock();
          metricsCollector.onOperationComplete(error.code); // Final failure for the operation.
          userStream.emit('error', error);
        }
      })
      .on('data', _ => {
        numConsecutiveErrors = 0;
        metricsCollector.onResponse(); // Record that we received a response for the current attempt.
      })
      .on('end', () => {
        activeRequestStream = null;
        // Ensure any final user code block is timed if stream ends cleanly
        metricsCollector.endUserCodeBlock();
        metricsCollector.onOperationComplete(grpc.status.OK); // Operation completed successfully.
        // The processingTransform will end, which ends internalPassthrough, which ends userStream.
      });
    rowStreamPipe(rowStream); // Pass rowStream
  };

  makeNewRequest();
  return userStream;
}
