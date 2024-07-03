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

import {Bigtable} from '../src';
import {Mutation} from '../src/mutation.js';
const {tests} = require('../../system-test/data/read-rows-retry-test.json') as {
  tests: Test[];
};
import {google} from '../protos/protos';
import * as assert from 'assert';
import {describe, it, afterEach, beforeEach} from 'mocha';
import * as sinon from 'sinon';
import {EventEmitter} from 'events';
import {Test} from './testTypes';
import {ServiceError, GrpcClient, GoogleError, CallOptions} from 'google-gax';
import {PassThrough} from 'stream';

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
        const requestOptions = {} as google.bigtable.v2.IRowSet;
        if (reqOpts.rows && reqOpts.rows.rowRanges) {
          requestOptions.rowRanges = reqOpts.rows.rowRanges.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (range: any) => {
              const convertedRowRange = {} as {[index: string]: string};
              Object.keys(range).forEach(
                key => (convertedRowRange[key] = range[key].asciiSlice())
              );
              return convertedRowRange;
            }
          );
        }
        if (reqOpts.rows && reqOpts.rows.rowKeys) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          requestOptions.rowKeys = reqOpts.rows.rowKeys.map((rowKeys: any) =>
            rowKeys.asciiSlice()
          );
        }
        if (reqOpts.rowsLimit) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (requestOptions as any).rowsLimit = reqOpts.rowsLimit;
        }
        requestedOptions.push(requestOptions);
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
});
