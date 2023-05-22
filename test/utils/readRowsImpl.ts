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

const valueSize = 1024 * 1024;
// we want each row to be splitted into 2 chunks of different sizes
const chunkSize = 1023 * 1024 - 1;
const chunksPerResponse = 10;

const debug = process.env.BIGTABLE_TEST_DEBUG === 'true';

export function debugLog(text: string) {
  if (debug) {
    console.log(text);
  }
}

function generateChunks(
  keyFrom: number,
  keyTo: number,
  stream: ServerWritableStream<
    protos.google.bigtable.v2.IReadRowsRequest,
    protos.google.bigtable.v2.IReadRowsResponse
  >
) {
  debugLog(`generating chunks from ${keyFrom} to ${keyTo}`);

  const chunks: protos.google.bigtable.v2.ReadRowsResponse.ICellChunk[] = [];
  for (let key = keyFrom; key < keyTo; ++key) {
    // the keys must be increasing, but we also want to keep them readable,
    // so we'll use keys 00000000, 00000001, 00000002, etc. stored as Buffers
    const binaryKey = Buffer.from(key.toString().padStart(8, '0'));

    // primitive support for row ranges
    if (stream.request.rows?.rowRanges || stream.request.rows?.rowKeys) {
      let take = false;
      const stringKey = binaryKey.toString();
      for (const requestKey of stream.request.rows?.rowKeys ?? []) {
        if (stringKey === requestKey.toString()) {
          take;
          break;
        }
      }
      for (const range of stream.request.rows?.rowRanges ?? []) {
        let startOk = true;
        let endOk = true;
        if (range.startKeyOpen && range.startKeyOpen.toString() >= stringKey) {
          startOk = false;
        }
        if (
          range.startKeyClosed &&
          range.startKeyClosed.toString() > stringKey
        ) {
          startOk = false;
        }
        if (range.endKeyOpen && range.endKeyOpen.toString() <= stringKey) {
          endOk = false;
        }
        if (range.endKeyClosed && range.endKeyClosed.toString() < stringKey) {
          endOk = false;
        }
        if (startOk && endOk) {
          take = true;
        }
      }
      if (!take) {
        debugLog(
          `skipping key ${key} because it's out of requested range or keys`
        );
        continue;
      }
    }

    debugLog(`generating chunks for ${key}`);
    const rowKey = binaryKey.toString('base64');
    let remainingBytes = valueSize;
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
      const thisChunkSize =
        remainingBytes >= chunkSize ? chunkSize : remainingBytes;
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

export function readRowsImpl(
  keyFrom: number,
  keyTo: number,
  errorAfterChunkNo?: number
) {
  return async (
    stream: ServerWritableStream<
      protos.google.bigtable.v2.IReadRowsRequest,
      protos.google.bigtable.v2.IReadRowsResponse
    >
  ) => {
    // pretty-printing important parts of the request.
    // doing it field by field because we want to apply .toString() to all key fields
    debugLog('received request: {');
    debugLog(`  tableName: "${stream.request.tableName}",`);
    if (stream.request.rows) {
      debugLog('  rows: {');
      if (stream.request.rows.rowKeys) {
        debugLog('    rowKeys: [');
        for (const key of stream.request.rows.rowKeys) {
          debugLog(`      "${key.toString()}",`);
        }
        debugLog('    ],');
      }
      if (stream.request.rows.rowRanges) {
        debugLog('    rowRanges: [');
        for (const range of stream.request.rows.rowRanges) {
          debugLog('      {');
          if (range.startKeyOpen) {
            debugLog(
              `        startKeyOpen: "${range.startKeyOpen.toString()}",`
            );
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
            debugLog(
              `        endKeyClosed: "${range.endKeyClosed.toString()}",`
            );
          }
          debugLog('      },');
        }
        debugLog('    ],');
      }
      debugLog('  },');
    }
    debugLog('}');

    let stopWaiting: () => void = () => {};
    let cancelled = false;

    stream.on('cancelled', () => {
      debugLog('gRPC server received cancel()');
      cancelled = true;
      stopWaiting();
      stream.emit('error', new Error('Cancelled'));
    });

    let chunksSent = 0;
    const chunks = generateChunks(keyFrom, keyTo, stream);
    let lastScannedRowKey: string | undefined;
    let currentResponseChunks: protos.google.bigtable.v2.ReadRowsResponse.ICellChunk[] =
      [];
    let chunkIdx = 0;
    for (const chunk of chunks) {
      if (cancelled) {
        break;
      }
      if (chunk.rowKey) {
        debugLog(
          `starting row with key ${Buffer.from(
            chunk.rowKey as string,
            'base64'
          ).toString()}`
        );
      }
      if (chunk.commitRow) {
        lastScannedRowKey = chunk.rowKey as string;
        debugLog('commit row');
      }
      currentResponseChunks.push(chunk);
      ++chunkIdx;
      if (
        currentResponseChunks.length === chunksPerResponse ||
        chunkIdx === errorAfterChunkNo
      ) {
        const response: protos.google.bigtable.v2.IReadRowsResponse = {
          chunks: currentResponseChunks,
          lastScannedRowKey,
        };
        chunksSent += currentResponseChunks.length;
        await new Promise<void>(resolve => {
          setTimeout(async () => {
            if (cancelled) {
              resolve();
              return;
            }
            const canSendMore = stream.write(response);
            debugLog(`sent ${currentResponseChunks.length} chunks`);
            currentResponseChunks = [];
            if (!canSendMore) {
              debugLog(
                `awaiting for back pressure after sending ${chunksSent} chunks`
              );
              await new Promise<void>(resolve => {
                stopWaiting = resolve;
                stream.once('drain', resolve);
              });
            }
            resolve();
          }, 0);
        });
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
    }
    if (!cancelled && currentResponseChunks.length > 0) {
      const response: protos.google.bigtable.v2.IReadRowsResponse = {
        chunks: currentResponseChunks,
        lastScannedRowKey,
      };
      chunksSent += currentResponseChunks.length;
      await new Promise<void>(resolve => {
        setTimeout(() => {
          stream.write(response);
          resolve();
        }, 0);
      });
      debugLog(`sent ${currentResponseChunks.length} remaining chunks`);
    }
    debugLog(`in total, sent ${chunksSent} chunks`);
    stream.end();
  };
}
