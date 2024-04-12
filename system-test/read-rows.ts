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

import {Bigtable, protos, Table} from '../src';
import {Mutation} from '../src/mutation.js';
const {tests} = require('../../system-test/data/read-rows-retry-test.json') as {
  tests: Test[];
};
import {google} from '../protos/protos';
import * as assert from 'assert';
import {describe, it, afterEach, beforeEach, before} from 'mocha';
import * as sinon from 'sinon';
import {EventEmitter} from 'events';
import {Test} from './testTypes';
import {ServiceError, GrpcClient, GoogleError, CallOptions} from 'google-gax';
import {PassThrough} from 'stream';
import {MockServer} from '../src/util/mock-servers/mock-server';
import {MockService} from '../src/util/mock-servers/mock-service';
import {BigtableClientMockService} from '../src/util/mock-servers/service-implementations/bigtable-client-mock-service';
import {ServerWritableStream} from '@grpc/grpc-js';

const {grpc} = new GrpcClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dispatch(emitter: EventEmitter, response: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emits: any[] = [{name: 'request'}];
  if (response.row_keys) {
    emits.push.apply(emits, [
      {name: 'response', arg: 200},
      {
        name: 'data',
        arg: {chunks: response.row_keys.map(rowResponse)},
      },
    ]);
  }
  if (response.end_with_error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error: any = new Error();
    error.code = response.end_with_error;
    emits.push({name: 'error', arg: error});
  } else {
    emits.push({name: 'end'});
  }
  let index = 0;
  setImmediate(next);

  function next() {
    if (index < emits.length) {
      const emit = emits[index];
      index++;
      emitter.emit(emit.name, emit.arg);
      setImmediate(next);
    }
  }
}

function rowResponse(rowKey: {}) {
  return {
    rowKey: Mutation.convertToBytes(rowKey),
    familyName: {value: 'family'},
    qualifier: {value: 'qualifier'},
    valueSize: 0,
    timestampMicros: 0,
    labels: [],
    commitRow: true,
    value: 'value',
  };
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

function getRequestOptions(request: any): google.bigtable.v2.IRowSet {
  const requestOptions = {} as google.bigtable.v2.IRowSet;
  if (request.rows && request.rows.rowRanges) {
    requestOptions.rowRanges = request.rows.rowRanges.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (range: any) => {
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
        Object.keys(range).forEach(
          key => (convertedRowRange[key] = range[key].asciiSlice())
        );
        return convertedRowRange;
      }
    );
  }
  if (request.rows && request.rows.rowKeys) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestOptions.rowKeys = request.rows.rowKeys.map((rowKeys: any) =>
      rowKeys.asciiSlice()
    );
  }
  // The grpc protocol sets rowsLimit to '0' if rowsLimit is not provided in the
  // grpc request.
  //
  // Do not append rowsLimit to collection of request options if received grpc
  // rows limit is '0' so that test data in read-rows-retry-test.json remains
  // shorter.
  if (request.rowsLimit && request.rowsLimit !== '0') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (requestOptions as any).rowsLimit = parseInt(request.rowsLimit);
  }
  return requestOptions;
}

describe('Bigtable/Table', () => {
  const bigtable = new Bigtable();
  const INSTANCE_NAME = 'fake-instance2';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (bigtable as any).grpcCredentials = grpc.credentials.createInsecure();

  const INSTANCE = bigtable.instance('instance');
  const TABLE = INSTANCE.table('table');

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

  describe('createReadStream', () => {
    let clock: sinon.SinonFakeTimers;
    let endCalled: boolean;
    let error: ServiceError | null;
    let requestedOptions: Array<{}>;
    let responses: Array<{}> | null;
    let rowKeysRead: Array<Array<{}>>;
    let stub: sinon.SinonStub;

    beforeEach(() => {
      clock = sinon.useFakeTimers({
        toFake: [
          'setTimeout',
          'clearTimeout',
          'setImmediate',
          'clearImmediate',
          'setInterval',
          'clearInterval',
          'Date',
          'nextTick',
        ],
      });
      endCalled = false;
      error = null;
      responses = null;
      rowKeysRead = [];
      requestedOptions = [];
      stub = sinon.stub(bigtable, 'request').callsFake(cfg => {
        const reqOpts = cfg.reqOpts;
        requestedOptions.push(getRequestOptions(reqOpts));
        rowKeysRead.push([]);
        const requestStream = new PassThrough({objectMode: true});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (requestStream as any).abort = () => {};
        dispatch(requestStream, responses!.shift());
        return requestStream;
      });
    });

    afterEach(() => {
      clock.restore();
      stub.restore();
    });

    tests.forEach(test => {
      it(test.name, () => {
        responses = test.responses;
        TABLE.maxRetries = test.max_retries;
        TABLE.createReadStream(test.createReadStream_options)
          .on('data', row => rowKeysRead[rowKeysRead.length - 1].push(row.id))
          .on('end', () => (endCalled = true))
          .on('error', err => (error = err as ServiceError));
        clock.runAll();

        if (test.error) {
          assert(!endCalled, ".on('end') should not have been invoked");
          assert.strictEqual(error!.code, test.error);
        } else {
          assert(endCalled, ".on('end') shoud have been invoked");
          assert.ifError(error);
        }
        assert.deepStrictEqual(rowKeysRead, test.row_keys_read);
        assert.strictEqual(
          responses.length,
          0,
          'not all the responses were used'
        );
        assert.deepStrictEqual(requestedOptions, test.request_options);
      });
    });
  });
  describe.only('createReadStream using mock server', () => {
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

    tests.forEach(test => {
      it(test.name, done => {
        // These variables store request/response data capturing data sent
        // and received when using readRows with retries. This data is evaluated
        // in checkResults at the end of the test for correctness.
        const requestedOptions: google.bigtable.v2.IRowSet[] = [];
        const responses: any[] = test.responses as any[];
        const rowKeysRead: any[] = [];
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const error: any = new Error();
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
});
