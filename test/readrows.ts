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

import {before, describe, it} from 'mocha';
import {Bigtable, protos, Row, Table} from '../src';
import * as assert from 'assert';
import {Transform, PassThrough, pipeline} from 'stream';

import {GoogleError} from 'google-gax';
import {MockServer} from '../src/util/mock-servers/mock-server';
import {BigtableClientMockService} from '../src/util/mock-servers/service-implementations/bigtable-client-mock-service';
import {MockService} from '../src/util/mock-servers/mock-service';
import {debugLog, readRowsImpl} from './utils/readRowsImpl';
import {ServerWritableStream} from '@grpc/grpc-js';

import {ReadRowsServiceParameters} from '../test/utils/readRowsServiceParameters';
import * as mocha from 'mocha';

// Define parameters for a standard Bigtable Mock service
const VALUE_SIZE = 1024 * 1024;
// we want each row to be split into 2 chunks of different sizes
const CHUNK_SIZE = 1023 * 1024 - 1;
const CHUNKS_PER_RESPONSE = 10;
const STANDARD_KEY_FROM = 0;
// 1000 rows must be enough to reproduce issues with losing the data and to create backpressure
const STANDARD_KEY_TO = 1000;
const STANDARD_SERVICE_WITHOUT_ERRORS: ReadRowsServiceParameters = {
  keyFrom: STANDARD_KEY_FROM,
  keyTo: STANDARD_KEY_TO,
  valueSize: VALUE_SIZE,
  chunkSize: CHUNK_SIZE,
  chunksPerResponse: CHUNKS_PER_RESPONSE,
};

type PromiseVoid = Promise<void>;
interface ServerImplementationInterface {
  (
    server: ServerWritableStream<
      protos.google.bigtable.v2.IReadRowsRequest,
      protos.google.bigtable.v2.IReadRowsResponse
    >
  ): PromiseVoid;
}

describe('Bigtable/ReadRows', () => {
  let server: MockServer;
  let service: MockService;
  let bigtable: Bigtable;
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

  // helper function because some tests run slower
  // on Windows and need a longer timeout
  function setWindowsTestTimeout(test: mocha.Context) {
    if (process.platform === 'win32') {
      test.timeout(60000); // it runs much slower on Windows!
    }
  }

  it('should create read stream and read synchronously', function (done) {
    setWindowsTestTimeout(this);

    service.setService({
      ReadRows: readRowsImpl(
        STANDARD_SERVICE_WITHOUT_ERRORS
      ) as ServerImplementationInterface,
    });

    let receivedRowCount = 0;
    let lastKeyReceived: number | undefined;

    const readStream = table.createReadStream();
    readStream.on('error', (err: GoogleError) => {
      done(err);
    });
    readStream.on('data', (row: Row) => {
      ++receivedRowCount;
      const key = parseInt(row.id);
      if (lastKeyReceived && key <= lastKeyReceived) {
        done(new Error('Test error: keys are not in order'));
      }
      lastKeyReceived = key;
      debugLog(`received row key ${key}`);
    });
    readStream.on('end', () => {
      assert.strictEqual(receivedRowCount, STANDARD_KEY_TO - STANDARD_KEY_FROM);
      assert.strictEqual(lastKeyReceived, STANDARD_KEY_TO - 1);
      done();
    });
  });

  it('should create read stream and read synchronously using Transform stream', done => {
    service.setService({
      ReadRows: readRowsImpl(
        STANDARD_SERVICE_WITHOUT_ERRORS
      ) as ServerImplementationInterface,
    });

    let receivedRowCount = 0;
    let lastKeyReceived: number | undefined;

    // BigTable stream
    const readStream = table.createReadStream();

    // Transform stream
    const transform = new Transform({
      objectMode: true,
      transform: (row, _encoding, callback) => {
        callback(null, row);
      },
    });

    // Final stream
    const passThrough = new PassThrough({
      objectMode: true,
    });

    passThrough.on('error', (err: GoogleError) => {
      done(err);
    });
    passThrough.on('data', (row: Row) => {
      ++receivedRowCount;
      const key = parseInt(row.id);
      if (lastKeyReceived && key <= lastKeyReceived) {
        done(new Error('Test error: keys are not in order'));
      }
      lastKeyReceived = key;
      debugLog(`received row key ${key}`);
    });
    passThrough.on('end', () => {
      assert.strictEqual(receivedRowCount, STANDARD_KEY_TO - STANDARD_KEY_FROM);
      assert.strictEqual(lastKeyReceived, STANDARD_KEY_TO - 1);
      done();
    });

    pipeline(readStream, transform, passThrough, () => {});
  });

  it('should create read stream and read asynchronously using Transform stream', function (done) {
    setWindowsTestTimeout(this);
    service.setService({
      ReadRows: readRowsImpl(
        STANDARD_SERVICE_WITHOUT_ERRORS
      ) as ServerImplementationInterface,
    });

    let receivedRowCount = 0;
    let lastKeyReceived: number | undefined;

    // BigTable stream
    const readStream = table.createReadStream();

    // Transform stream
    const transform = new Transform({
      objectMode: true,
      transform: (row, _encoding, callback) => {
        setTimeout(() => {
          callback(null, row);
        }, 0);
      },
    });

    // Final stream
    const passThrough = new PassThrough({
      objectMode: true,
    });

    passThrough.on('error', (err: GoogleError) => {
      done(err);
    });
    passThrough.on('data', (row: Row) => {
      ++receivedRowCount;
      const key = parseInt(row.id);
      if (lastKeyReceived && key <= lastKeyReceived) {
        done(new Error('Test error: keys are not in order'));
      }
      lastKeyReceived = key;
      debugLog(`received row key ${key}`);
    });
    passThrough.on('end', () => {
      assert.strictEqual(receivedRowCount, STANDARD_KEY_TO - STANDARD_KEY_FROM);
      assert.strictEqual(lastKeyReceived, STANDARD_KEY_TO - 1);
      done();
    });

    pipeline(readStream, transform, passThrough, () => {});
  });

  it('should be able to stop reading from the read stream', done => {
    // pick any key to stop after
    const stopAfter = 42;

    service.setService({
      ReadRows: readRowsImpl(
        STANDARD_SERVICE_WITHOUT_ERRORS
      ) as ServerImplementationInterface,
    });

    let receivedRowCount = 0;
    let lastKeyReceived: number | undefined;

    const readStream = table.createReadStream();
    readStream.on('error', (err: GoogleError) => {
      done(err);
    });
    readStream.on('data', (row: Row) => {
      ++receivedRowCount;
      const key = parseInt(row.id);
      if (lastKeyReceived && key <= lastKeyReceived) {
        done(new Error('Test error: keys are not in order'));
      }
      lastKeyReceived = key;
      debugLog(`received row key ${key}`);

      if (receivedRowCount === stopAfter) {
        debugLog(`requesting to stop after receiving key ${key}`);
        readStream.end();
      }
    });
    readStream.on('end', () => {
      assert.strictEqual(receivedRowCount, stopAfter);
      assert.strictEqual(lastKeyReceived, stopAfter - 1);
      done();
    });
  });

  // TODO: enable after https://github.com/googleapis/nodejs-bigtable/issues/1286 is fixed
  it('should be able to stop reading from the read stream when reading asynchronously', function (done) {
    setWindowsTestTimeout(this);
    // pick any key to stop after
    const stopAfter = 420;

    service.setService({
      ReadRows: readRowsImpl(
        STANDARD_SERVICE_WITHOUT_ERRORS
      ) as ServerImplementationInterface,
    });

    let receivedRowCount = 0;
    let lastKeyReceived: number | undefined;

    // BigTable stream
    const readStream = table.createReadStream();

    // Transform stream
    const transform = new Transform({
      objectMode: true,
      writableHighWaterMark: 0,
      transform: (row, _encoding, callback) => {
        setTimeout(() => {
          callback(null, row);
        }, 0);
      },
    });

    // Final stream
    const passThrough = new PassThrough({
      objectMode: true,
    });

    passThrough.on('error', (err: GoogleError) => {
      done(err);
    });
    passThrough.on('data', (row: Row) => {
      ++receivedRowCount;
      const key = parseInt(row.id);
      if (lastKeyReceived && key <= lastKeyReceived) {
        done(new Error('Test error: keys are not in order'));
      }
      lastKeyReceived = key;
      debugLog(`received row key ${key}`);

      if (receivedRowCount === stopAfter) {
        debugLog(`requesting to stop after receiving key ${key}`);
        readStream.end();
      }
    });
    passThrough.on('end', () => {
      assert.strictEqual(receivedRowCount, stopAfter);
      assert.strictEqual(lastKeyReceived, stopAfter - 1);
      done();
    });

    pipeline(readStream, transform, passThrough, () => {});
  });

  describe('should silently resume after server or network error', () => {
    function runTest(done: Mocha.Done, errorAfterChunkNo: number) {
      service.setService({
        ReadRows: readRowsImpl({
          keyFrom: STANDARD_KEY_FROM,
          keyTo: STANDARD_KEY_TO,
          valueSize: VALUE_SIZE,
          chunkSize: CHUNK_SIZE,
          chunksPerResponse: CHUNKS_PER_RESPONSE,
          errorAfterChunkNo,
        }) as ServerImplementationInterface,
      });
      let receivedRowCount = 0;
      let lastKeyReceived: number | undefined;

      const readStream = table.createReadStream();
      readStream.on('error', (err: GoogleError) => {
        done(err);
      });
      readStream.on('data', (row: Row) => {
        ++receivedRowCount;
        const key = parseInt(row.id);
        if (lastKeyReceived && key <= lastKeyReceived) {
          done(new Error('Test error: keys are not in order'));
        }
        lastKeyReceived = key;
        debugLog(`received row key ${key}`);
      });
      readStream.on('end', () => {
        assert.strictEqual(
          receivedRowCount,
          STANDARD_KEY_TO - STANDARD_KEY_FROM
        );
        assert.strictEqual(lastKeyReceived, STANDARD_KEY_TO - 1);
        done();
      });
    }
    it('with an error at a fixed position', function (done) {
      setWindowsTestTimeout(this);
      // Emits an error after enough chunks have been pushed to create back pressure
      runTest(done, 423);
    });
    it('with an error at a random position', function (done) {
      setWindowsTestTimeout(this);
      // Emits an error after a random number of chunks.
      const errorAfterChunkNo = Math.floor(Math.random() * 1000);
      runTest(done, errorAfterChunkNo);
    });
  });
  it('should return row data in the right order', function (done) {
    setWindowsTestTimeout(this);
    const dataResults = [];

    // keyTo and keyFrom are not provided so they will be determined from
    // the request that is passed in.
    service.setService({
      ReadRows: readRowsImpl({
        errorAfterChunkNo: 100, // the server will error after sending this chunk (not row)
        valueSize: 1,
        chunkSize: 1,
        chunksPerResponse: 1,
      }) as ServerImplementationInterface,
    });
    const sleep = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
    (async () => {
      try {
        // 150 rows must be enough to reproduce issues with losing the data and to create backpressure
        const stream = table.createReadStream({
          start: '00000000',
          end: '00000150',
        });

        for await (const row of stream) {
          dataResults.push(row.id);
          await sleep(50);
        }
        const expectedResults = Array.from(Array(150).keys())
          .map(i => '00000000' + i.toString())
          .map(i => i.slice(-8));
        assert.deepStrictEqual(dataResults, expectedResults);
        done();
      } catch (error) {
        done(error);
      }
    })();
  });

  after(async () => {
    server.shutdown(() => {});
  });
});
