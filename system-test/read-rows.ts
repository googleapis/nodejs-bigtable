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

import {Bigtable, Cluster, protos, Table} from '../src';
const {tests} = require('../../system-test/data/read-rows-retry-test.json') as {
  tests: ReadRowsTest[];
};
import * as assert from 'assert';
import {describe, it, before} from 'mocha';
import {CreateReadStreamRequest, ReadRowsTest} from './testTypes';
import {
  ServiceError,
  GrpcClient,
  CallOptions,
  GoogleError,
  RetryOptions,
} from 'google-gax';
import {MockServer} from '../src/util/mock-servers/mock-server';
import {MockService} from '../src/util/mock-servers/mock-service';
import {BigtableClientMockService} from '../src/util/mock-servers/service-implementations/bigtable-client-mock-service';
import {Metadata, ServerWritableStream} from '@grpc/grpc-js';
import * as v2 from '../src/v2';
import * as protobuf from 'protobufjs';
import {BackoffSettings} from 'google-gax/build/src/gax';

const {grpc} = new GrpcClient();

function emitError<T, U>(stream: ServerWritableStream<T, U>, code: number) {
  const errorInfoObj = {
    reason: 'SERVICE_DISABLED',
    domain: 'googleapis.com',
    metadata: {
      consumer: 'projects/455411330361',
      service: 'translate.googleapis.com',
    },
  };
  // TODO: See if we can parse gax filesystem for status.json
  const errorProtoJson = require('../../system-test/data/status.json');
  const root = protobuf.Root.fromJSON(errorProtoJson);
  const errorInfoType = root.lookupType('ErrorInfo');
  const buffer = errorInfoType.encode(errorInfoObj).finish() as Buffer;
  const any = {
    type_url: 'type.googleapis.com/google.rpc.ErrorInfo',
    value: buffer,
  };
  const status = {code, message: 'test', details: [any]};
  const Status = root.lookupType('google.rpc.Status');
  const status_buffer = Status.encode(status).finish() as Buffer;
  const metadata = new Metadata();
  metadata.set('grpc-status-details-bin', status_buffer);
  const error = Object.assign(new GoogleError('test error'), {
    code, // DEADLINE_EXCEEDED
    details: 'Failed to read',
    metadata: metadata,
  });
  setImmediate(() => {
    stream.emit('error', error);
  });
  setImmediate(() => {
    stream.emit('status', status);
  });
}

function oldEmitError<T, U>(stream: ServerWritableStream<T, U>, code: number) {
  const error: GoogleError = new GoogleError();
  error.code = code;
  stream.emit('error', error);
}
function rowResponseFromServer(rowKey: string) {
  return {
    rowKey: Buffer.from(rowKey).toString('base64'),
    familyName: {value: 'family'},
    qualifier: {value: Buffer.from('qualifier').toString('base64')},
    commitRow: true,
    value: Buffer.from(rowKey).toString('base64'),
  };
}

function isRowKeysWithFunction(array: unknown): array is RowKeysWithFunction {
  return (array as RowKeysWithFunction).asciiSlice !== undefined;
}

function isRowKeysWithFunctionArray(
  array: unknown[]
): array is RowKeysWithFunction[] {
  return array.every((element: unknown) => {
    return isRowKeysWithFunction(element);
  });
}

interface TestRowRange {
  startKey?: 'startKeyClosed' | 'startKeyOpen';
  endKey?: 'endKeyOpen' | 'endKeyClosed';
  startKeyClosed?: Uint8Array | string | null;
  startKeyOpen?: Uint8Array | string | null;
  endKeyOpen?: Uint8Array | string | null;
  endKeyClosed?: Uint8Array | string | null;
}
interface RowKeysWithFunction {
  asciiSlice: () => string;
}
function getRequestOptions(request: {
  rows?: {
    rowRanges?: TestRowRange[] | null;
    rowKeys?: Uint8Array[] | null;
  } | null;
  rowsLimit?: string | number | Long | null | undefined;
}): CreateReadStreamRequest {
  const requestOptions = {} as CreateReadStreamRequest;
  if (request.rows && request.rows.rowRanges) {
    requestOptions.rowRanges = request.rows.rowRanges.map(
      (range: TestRowRange) => {
        const convertedRowRange = {} as {[index: string]: string};
        {
          // startKey and endKey get filled in during the grpc request.
          // They should be removed as the test data does not look
          // for these properties in the request.
          if (range.startKey) {
            delete range.startKey;
          }
          if (range.endKey) {
            delete range.endKey;
          }
        }
        Object.entries(range).forEach(
          ([key, value]) => (convertedRowRange[key] = value.asciiSlice())
        );
        return convertedRowRange;
      }
    );
  }
  if (
    request.rows &&
    request.rows.rowKeys &&
    isRowKeysWithFunctionArray(request.rows.rowKeys)
  ) {
    requestOptions.rowKeys = request.rows.rowKeys.map(
      (rowKeys: RowKeysWithFunction) => rowKeys.asciiSlice()
    );
  }
  // The grpc protocol sets rowsLimit to '0' if rowsLimit is not provided in the
  // grpc request.
  //
  // Do not append rowsLimit to collection of request options if received grpc
  // rows limit is '0' so that test data in read-rows-retry-test.json remains
  // shorter.
  if (
    request.rowsLimit &&
    request.rowsLimit !== '0' &&
    typeof request.rowsLimit === 'string'
  ) {
    requestOptions.rowsLimit = parseInt(request.rowsLimit);
  }
  return requestOptions;
}

describe('Bigtable/Table', () => {
  const bigtable = new Bigtable();
  const INSTANCE_NAME = 'fake-instance2';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (bigtable as any).grpcCredentials = grpc.credentials.createInsecure();

  const INSTANCE = bigtable.instance('instance');

  describe('close', () => {
    it('should fail when invoking readRows with closed client', async () => {
      const instance = bigtable.instance(INSTANCE_NAME);
      const table = instance.table('fake-table');
      const [, operation] = await instance.create({
        clusters: {
          id: 'fake-cluster3',
          location: 'us-west1-c',
          nodes: 1,
        },
      });
      await operation.promise();
      const gaxOptions: CallOptions = {
        retry: {
          retryCodes: [grpc.status.DEADLINE_EXCEEDED, grpc.status.NOT_FOUND],
        },
        maxRetries: 10,
      };
      await table.create({
        gaxOptions,
      });
      await table.getRows(); // This is done to initialize the data client
      await bigtable.close();
      try {
        await table.getRows();
        assert.fail(
          'An error should have been thrown because the client is closed'
        );
      } catch (err: any) {
        assert.strictEqual(err.message, 'The client has already been closed.');
      }
    });
    after(async () => {
      const bigtableSecondClient = new Bigtable();
      const instance = bigtableSecondClient.instance(INSTANCE_NAME);
      await instance.delete({});
    });
  });

  describe('createReadStream using mock server', () => {
    let server: MockServer;
    let service: MockService;
    let bigtable = new Bigtable();
    let table: Table;
    before(async () => {
      // make sure we have everything initialized before starting tests
      const port = await new Promise<string>(resolve => {
        server = new MockServer(resolve);
      });
      bigtable = new Bigtable({
        apiEndpoint: `localhost:${port}`,
      });
      table = bigtable.instance('fake-instance').table('fake-table');
      service = new BigtableClientMockService(server);
    });

    after(async () => {
      server.shutdown(() => {});
    });

    tests.forEach(test => {
      it(test.name, done => {
        // These variables store request/response data capturing data sent
        // and received when using readRows with retries. This data is evaluated
        // in checkResults at the end of the test for correctness.
        const requestedOptions: CreateReadStreamRequest[] = [];
        const responses = test.responses;
        const rowKeysRead: string[][] = [];
        let endCalled = false;
        let error: ServiceError | null = null;
        function checkResults() {
          if (test.error) {
            assert(!endCalled, ".on('end') should not have been invoked");
            assert.strictEqual(error!.code, test.error);
          } else {
            assert(endCalled, ".on('end') should have been invoked");
            assert.ifError(error);
          }
          assert.deepStrictEqual(rowKeysRead, test.row_keys_read);
          assert.strictEqual(
            responses.length,
            0,
            'not all the responses were used'
          );
          assert.deepStrictEqual(requestedOptions, test.request_options);
          done();
        }

        table.maxRetries = test.max_retries;
        service.setService({
          ReadRows: (
            stream: ServerWritableStream<
              protos.google.bigtable.v2.IReadRowsRequest,
              protos.google.bigtable.v2.IReadRowsResponse
            >
          ) => {
            const response = responses!.shift();
            assert(response);
            rowKeysRead.push([]);
            requestedOptions.push(getRequestOptions(stream.request));
            if (response.row_keys) {
              stream.write({
                chunks: response.row_keys.map(rowResponseFromServer),
              });
            }
            if (response.end_with_error) {
              const error: GoogleError = new GoogleError();
              error.code = response.end_with_error;
              stream.emit('error', error);
            } else {
              stream.end();
            }
          },
        });
        table
          .createReadStream(test.createReadStream_options)
          .on('data', row => rowKeysRead[rowKeysRead.length - 1].push(row.id))
          .on('end', () => {
            endCalled = true;
            checkResults();
          })
          .on('error', err => {
            error = err as ServiceError;
            checkResults();
          });
      });
    });
  });

  describe.only('readrows directly using mock server', () => {
    let server: MockServer;
    let service: MockService;
    let apiEndpoint: string;
    let port: string;
    before(async () => {
      // make sure we have everything initialized before starting tests
      port = await new Promise<string>(resolve => {
        server = new MockServer(resolve);
      });
      apiEndpoint = `localhost:${port}`;
      service = new BigtableClientMockService(server);
    });

    after(async () => {
      server.shutdown(() => {});
    });

    it('testing readrows directly (no handwritten layer)', done => {
      let retryCounter = 0;
      service.setService({
        ReadRows: (
          stream: ServerWritableStream<
            protos.google.bigtable.v2.IReadRowsRequest,
            protos.google.bigtable.v2.IReadRowsResponse
          >
        ) => {
          console.log(`Server retry counter: ${retryCounter++}`);
          // emitError(stream, 4);
          emitError(stream, 4);
        },
      });
      const BigtableClient = new v2.BigtableClient({
        servicePath: 'localhost',
        apiEndpoint: 'localhost:1234',
        port: parseInt(port),
        sslCreds: grpc.credentials.createInsecure(),
      });
      const request: protos.google.bigtable.v2.IReadRowsRequest = {
        tableName:
          'projects/{{projectId}}/instances/fake-instance/tables/fake-table',
        rows: {
          rowKeys: [],
          rowRanges: [],
        },
      };
      // TODO: Modify these call options as needed.
      // Set to currently not retry
      const backOffSettings = {
        initialRetryDelayMillis: 10,
        retryDelayMultiplier: 2,
        maxRetryDelayMillis: 60000,
      };
      const shouldRetryFn = function checkRetry(error: GoogleError) {
        return false; // return [14, 4].includes(error!.code!);
      };
      const retry = new RetryOptions([], backOffSettings, shouldRetryFn);
      const options: CallOptions = {
        otherArgs: {
          header: {
            'bigtable-attempt': 0,
          },
        },
        retry,
        maxRetries: 3,
        /*
        retryRequestOptions: {
          currentRetryAttempt: 0,
          noResponseRetries: 0,
          objectMode: true,
          shouldRetryFn: () => false,
        },
         */
      };
      const stream = BigtableClient.readRows(request, options);
      stream.on('error', (error: any) => {
        console.log('catching error');
        console.log(error);
        done();
      });
      stream.on('end', () => {
        console.log('ending');
        done();
      });
    });
  });
});
