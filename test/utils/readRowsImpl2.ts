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

import {ServerWritableStream} from '@grpc/grpc-js';
import {protos} from '../../src';
import {GoogleError, Status} from 'google-gax';
import {
  debugLog,
  generateChunks,
  isKeyInRowSet,
  prettyPrintRequest,
} from './readRowsImpl';
import {ReadRowsServiceParameters} from './readRowsServiceParameters';

// Returns an implementation of the server streaming ReadRows call that would return
// monotonically increasing zero padded rows in the range [keyFrom, keyTo).
// The returned implementation can be passed to gRPC server.
// TODO: Remove optional keyFrom, keyTo from the server. No test uses them. Remove them from this test as well.
// TODO: Address the excessive number of if statements.
// TODO: Perhaps group the if statements into classes so that they can be unit tested.
export function readRowsImpl2(
  serviceParameters: ReadRowsServiceParameters
): (
  stream: ServerWritableStream<
    protos.google.bigtable.v2.IReadRowsRequest,
    protos.google.bigtable.v2.IReadRowsResponse
  >
) => Promise<void> {
  let errorAfterChunkNo = serviceParameters.errorAfterChunkNo;
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
    let keyFromRequestClosed: any;
    if (
      stream?.request?.rows?.rowRanges &&
      stream?.request?.rows?.rowRanges[0] &&
      stream?.request?.rows?.rowRanges[0]?.startKeyClosed?.toString()
    ) {
      keyFromRequestClosed =
        stream?.request?.rows?.rowRanges[0]?.startKeyClosed?.toString();
    }
    let keyFromRequestOpen: any;
    if (
      stream?.request?.rows?.rowRanges &&
      stream?.request?.rows?.rowRanges[0] &&
      stream?.request?.rows?.rowRanges[0]?.startKeyOpen?.toString()
    ) {
      keyFromRequestOpen =
        stream?.request?.rows?.rowRanges[0]?.startKeyOpen?.toString();
    }
    let keyToRequestClosed: any;
    if (
      stream?.request?.rows?.rowRanges &&
      stream?.request?.rows?.rowRanges[0] &&
      stream?.request?.rows?.rowRanges[0]?.endKeyClosed?.toString()
    ) {
      keyToRequestClosed =
        stream?.request?.rows?.rowRanges[0]?.endKeyClosed?.toString();
    }
    let keyToRequestOpen;
    if (
      stream?.request?.rows?.rowRanges &&
      stream?.request?.rows?.rowRanges[0] &&
      stream?.request?.rows?.rowRanges[0]?.endKeyOpen?.toString()
    ) {
      keyToRequestOpen =
        stream?.request?.rows?.rowRanges[0]?.endKeyOpen?.toString();
    }
    const keyFromUsed = serviceParameters.defaultKeyFrom
      ? serviceParameters.defaultKeyFrom
      : keyFromRequestClosed
        ? parseInt(keyFromRequestClosed as string)
        : parseInt(keyFromRequestOpen as string) + 1;
    const keyToUsed = serviceParameters.defaultKeyTo
      ? serviceParameters.defaultKeyTo
      : keyToRequestClosed
        ? parseInt(keyToRequestClosed as string)
        : parseInt(keyToRequestOpen as string) + 1;
    const chunks = generateChunks({
      keyFrom: keyFromUsed,
      keyTo: keyToUsed,
      chunkSize: serviceParameters.chunkSize,
      valueSize: serviceParameters.valueSize,
    });
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
        currentResponseChunks.length === serviceParameters.chunksPerResponse ||
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
    if (currentResponseChunks.length > 0) {
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
