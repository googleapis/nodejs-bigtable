// Copyright 2023 Google LLC
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

import {ServerWritableStream} from '@grpc/grpc-js';
import {protos} from '../../src';
import {GoogleError, Status} from 'google-gax';

const VALUE_SIZE = 1;
// we want each row to be splitted into 2 chunks of different sizes
const CHUNK_SIZE = 1;
const CHUNK_PER_RESPONSE = 1;

const DEBUG = process.env.BIGTABLE_TEST_DEBUG === 'true';

export function debugLog(text: string) {
  if (DEBUG) {
    console.log(text);
  }
}

function prettyPrintRequest(
  request: protos.google.bigtable.v2.IReadRowsRequest
) {
  // pretty-printing important parts of the request.
  // doing it field by field because we want to apply .toString() to all key fields
  debugLog('received request: {');
  debugLog(`  tableName: "${request.tableName}",`);
  if (request.rows) {
    debugLog('  rows: {');
    if (request.rows.rowKeys) {
      debugLog('    rowKeys: [');
      for (const key of request.rows.rowKeys) {
        debugLog(`      "${key.toString()}",`);
      }
      debugLog('    ],');
    }
    if (request.rows.rowRanges) {
      debugLog('    rowRanges: [');
      for (const range of request.rows.rowRanges) {
        debugLog('      {');
        if (range.startKeyOpen) {
          debugLog(`        startKeyOpen: "${range.startKeyOpen.toString()}",`);
        }
        if (range.startKeyClosed) {
          debugLog(
            `        startKeyClosed: "${range.startKeyClosed.toString()}",`
          );
        }
        if (range.endKeyOpen) {
          debugLog(`        endKeyOpen: "${range.endKeyOpen.toString()}",`);
        }
        if (range.endKeyClosed) {
          debugLog(`        endKeyClosed: "${range.endKeyClosed.toString()}",`);
        }
        debugLog('      },');
      }
      debugLog('    ],');
    }
    debugLog('  },');
  }
  debugLog('}');
}

/** Generates chunks for rows in a fake table that match the provided RowSet.
 * The fake table contains monotonically increasing zero padded rows
 * in the range [keyFrom, keyTo).
 */
function generateChunks(keyFrom: number, keyTo: number) {
  debugLog(`generating chunks from ${keyFrom} to ${keyTo}`);

  const chunks: protos.google.bigtable.v2.ReadRowsResponse.ICellChunk[] = [];
  for (let key = keyFrom; key < keyTo; ++key) {
    // the keys must be increasing, but we also want to keep them readable,
    // so we'll use keys 00000000, 00000001, 00000002, etc. stored as Buffers
    const binaryKey = Buffer.from(key.toString().padStart(8, '0'));
    debugLog(`generating chunks for ${key}`);
    const rowKey = binaryKey.toString('base64');
    let remainingBytes = VALUE_SIZE;
    let chunkCounter = 0;
    while (remainingBytes > 0) {
      debugLog(`  remaining bytes: ${remainingBytes}`);
      const chunk: protos.google.bigtable.v2.ReadRowsResponse.ICellChunk = {};
      if (chunkCounter === 0) {
        chunk.rowKey = rowKey;
        chunk.familyName = {
          value: 'family',
        };
        chunk.qualifier = {
          value: Buffer.from('qualifier').toString('base64'),
        };
      }
      const thisChunkSize = Math.min(CHUNK_SIZE, remainingBytes);
      remainingBytes -= thisChunkSize;
      const value = Buffer.from('a'.repeat(remainingBytes)).toString('base64');
      chunk.value = value;
      if (remainingBytes === 0) {
        debugLog(`  setting commit flag for rowKey ${key}`);
        chunk.commitRow = true;
      }
      chunks.push(chunk);
      ++chunkCounter;
    }
  }
  debugLog(`generated ${chunks.length} chunks between ${keyFrom} and ${keyTo}`);
  return chunks;
}

function isKeyInRowSet(
  stringKey: string,
  rowSet?: protos.google.bigtable.v2.IRowSet | null
): boolean {
  if (!rowSet) {
    return true;
  }
  // primitive support for row ranges
  if (rowSet.rowRanges || rowSet.rowKeys) {
    for (const requestKey of rowSet.rowKeys ?? []) {
      if (stringKey === requestKey.toString()) {
        return true;
      }
    }
    for (const range of rowSet.rowRanges ?? []) {
      let startOk = true;
      let endOk = true;
      if (range.startKeyOpen && range.startKeyOpen.toString() >= stringKey) {
        startOk = false;
      }
      if (range.startKeyClosed && range.startKeyClosed.toString() > stringKey) {
        startOk = false;
      }
      if (range.endKeyOpen && range.endKeyOpen.toString() <= stringKey) {
        endOk = false;
      }
      if (range.endKeyClosed && range.endKeyClosed.toString() < stringKey) {
        endOk = false;
      }
      if (startOk && endOk) {
        return true;
      }
    }
    return false;
  }
  return true;
}

// Returns an implementation of the server streaming ReadRows call that would return
// monotonically increasing zero padded rows in the range [keyFrom, keyTo).
// The returned implementation can be passed to gRPC server.
export function readRowsImpl(
  keyFrom?: number,
  keyTo?: number,
  errorAfterChunkNo?: number
): (
  stream: ServerWritableStream<
    protos.google.bigtable.v2.IReadRowsRequest,
    protos.google.bigtable.v2.IReadRowsResponse
  >
) => Promise<void> {
  return async (
    stream: ServerWritableStream<
      protos.google.bigtable.v2.IReadRowsRequest,
      protos.google.bigtable.v2.IReadRowsResponse
    >
  ): Promise<void> => {
    prettyPrintRequest(stream.request);

    let stopWaiting: () => void = () => {};
    let cancelled = false;
    // an asynchronous function to write a response object to stream, reused several times below.
    // captures `cancelled` variable
    const sendResponse = async (
      response: protos.google.bigtable.v2.IReadRowsResponse
    ): Promise<void> => {
      return new Promise<void>(resolve => {
        setTimeout(async () => {
          if (cancelled) {
            resolve();
            return;
          }
          const canSendMore = stream.write(response);
          if (response.chunks && response.chunks.length > 0) {
            debugLog(`sent ${response.chunks.length} chunks`);
          }
          if (response.lastScannedRowKey) {
            const binaryKey = Buffer.from(
              response.lastScannedRowKey as string,
              'base64'
            );
            const stringKey = binaryKey.toString();
            debugLog(`sent lastScannedRowKey = ${stringKey}`);
          }
          if (!canSendMore) {
            debugLog('awaiting for back pressure');
            await new Promise<void>(resolve => {
              stopWaiting = resolve;
              stream.once('drain', resolve);
            });
          }
          resolve();
        }, 0);
      });
    };

    stream.on('cancelled', () => {
      debugLog('gRPC server received cancel()');
      cancelled = true;
      stopWaiting();
      stream.emit('error', new Error('Cancelled'));
    });

    let chunksSent = 0;
    const keyFromRequestClosed = stream?.request?.rows?.rowRanges
      ?.at(0)
      ?.startKeyClosed?.toString();
    const keyFromRequestOpen = stream?.request?.rows?.rowRanges
      ?.at(0)
      ?.startKeyOpen?.toString();
    const keyToRequestClosed = stream?.request?.rows?.rowRanges
      ?.at(0)
      ?.endKeyClosed?.toString();
    const keyToRequestOpen = stream?.request?.rows?.rowRanges
      ?.at(0)
      ?.endKeyClosed?.toString();
    const keyFromUsed = keyFrom
      ? keyFrom
      : keyFromRequestClosed
        ? parseInt(keyFromRequestClosed as string)
        : parseInt(keyFromRequestOpen as string) + 1;
    const keyToUsed = keyTo
      ? keyTo
      : keyToRequestClosed
        ? parseInt(keyToRequestClosed as string)
        : parseInt(keyToRequestOpen as string) + 1;
    const chunks = generateChunks(keyFromUsed, keyToUsed);
    let lastScannedRowKey: string | undefined;
    let currentResponseChunks: protos.google.bigtable.v2.ReadRowsResponse.ICellChunk[] =
      [];
    let chunkIdx = 0;
    let skipThisRow = false;
    for (const chunk of chunks) {
      if (cancelled) {
        break;
      }

      if (chunk.rowKey) {
        const binaryKey = Buffer.from(chunk.rowKey as string, 'base64');
        const stringKey = binaryKey.toString();

        debugLog(`starting row with key ${stringKey}`);
        if (isKeyInRowSet(stringKey, stream.request.rows)) {
          skipThisRow = false;
        } else {
          debugLog(
            `skipping row with key ${stringKey} because it's out of requested range or keys`
          );
          skipThisRow = true;
          lastScannedRowKey = chunk.rowKey as string;
        }
      }

      if (chunk.commitRow) {
        debugLog('commit row');
      }

      if (!skipThisRow) {
        currentResponseChunks.push(chunk);
        ++chunkIdx;
      }
      if (
        currentResponseChunks.length === CHUNK_PER_RESPONSE ||
        chunkIdx === errorAfterChunkNo ||
        // if we skipped a row and set lastScannedRowKey, dump everything and send a separate message with lastScannedRowKey
        lastScannedRowKey
      ) {
        const response: protos.google.bigtable.v2.IReadRowsResponse = {
          chunks: currentResponseChunks,
        };
        chunksSent += currentResponseChunks.length;
        await sendResponse(response);
        currentResponseChunks = [];
        if (chunkIdx === errorAfterChunkNo) {
          debugLog(`sending error after chunk #${chunkIdx}`);
          errorAfterChunkNo = undefined; // do not send error for the second time
          const error = new GoogleError('Uh oh');
          error.code = Status.ABORTED;
          stream.emit('error', error);
          cancelled = true;
          break;
        }
      }
      if (lastScannedRowKey) {
        const response: protos.google.bigtable.v2.IReadRowsResponse = {
          lastScannedRowKey,
        };
        await sendResponse(response);
        lastScannedRowKey = undefined;
      }
    }
    if (!cancelled && currentResponseChunks.length > 0) {
      const response: protos.google.bigtable.v2.IReadRowsResponse = {
        chunks: currentResponseChunks,
        lastScannedRowKey,
      };
      chunksSent += currentResponseChunks.length;
      await sendResponse(response);
    }
    debugLog(`in total, sent ${chunksSent} chunks`);
    stream.end();
  };
}
