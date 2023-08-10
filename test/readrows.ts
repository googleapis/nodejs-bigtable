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
import {Bigtable, Row, Table} from '../src';
import * as assert from 'assert';
import {Transform, PassThrough, pipeline} from 'stream';

import {GoogleError} from 'google-gax';
import {MockServer} from '../src/util/mock-servers/mock-server';
import {BigtableClientMockService} from '../src/util/mock-servers/service-implementations/bigtable-client-mock-service';
import {MockService} from '../src/util/mock-servers/mock-service';
import {debugLog, readRowsImpl} from './utils/readRowsImpl';
import { UntypedHandleCall } from '@grpc/grpc-js';

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

  it('should create read stream and read synchronously', done => {
    // 1000 rows must be enough to reproduce issues with losing the data and to create backpressure
    const keyFrom = 0;
    const keyTo = 1000;

    service.setService({
      ReadRows: readRowsImpl(keyFrom, keyTo) as any,
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
      assert.strictEqual(receivedRowCount, keyTo - keyFrom);
      assert.strictEqual(lastKeyReceived, keyTo - 1);
      done();
    });
  });

  it('should create read stream and read synchronously using Transform stream', done => {
    // 1000 rows must be enough to reproduce issues with losing the data and to create backpressure
    const keyFrom = 0;
    const keyTo = 1000;

    service.setService({
      ReadRows: readRowsImpl(keyFrom, keyTo) as any,
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
      assert.strictEqual(receivedRowCount, keyTo - keyFrom);
      assert.strictEqual(lastKeyReceived, keyTo - 1);
      done();
    });

    pipeline(readStream, transform, passThrough, () => {});
  });

  it('should create read stream and read asynchronously using Transform stream', function (done) {
    if (process.platform === 'win32') {
      this.timeout(60000); // it runs much slower on Windows!
    }

    // 1000 rows must be enough to reproduce issues with losing the data and to create backpressure
    const keyFrom = 0;
    const keyTo = 1000;

    service.setService({
      ReadRows: readRowsImpl(keyFrom, keyTo) as any,
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
      assert.strictEqual(receivedRowCount, keyTo - keyFrom);
      assert.strictEqual(lastKeyReceived, keyTo - 1);
      done();
    });

    pipeline(readStream, transform, passThrough, () => {});
  });

  it('should be able to stop reading from the read stream', done => {
    // 1000 rows must be enough to reproduce issues with losing the data and to create backpressure
    const keyFrom = 0;
    const keyTo = 1000;
    // pick any key to stop after
    const stopAfter = 42;

    service.setService({
      ReadRows: readRowsImpl(keyFrom, keyTo) as any,
    });

    let receivedRowCount = 0;
    let lastKeyReceived: number | undefined;

    const readStream = table.createReadStream({
      // workaround for https://github.com/grpc/grpc-node/issues/2446, remove when fixed
      gaxOptions: {
        timeout: 3000,
      },
    });
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
  it.skip('should be able to stop reading from the read stream when reading asynchronously', function (done) {
    if (process.platform === 'win32') {
      this.timeout(60000); // it runs much slower on Windows!
    }

    // 1000 rows must be enough to reproduce issues with losing the data and to create backpressure
    const keyFrom = 0;
    const keyTo = 1000;
    // pick any key to stop after
    const stopAfter = 420;

    service.setService({
      ReadRows: readRowsImpl(keyFrom, keyTo) as any,
    });

    let receivedRowCount = 0;
    let lastKeyReceived: number | undefined;

    // BigTable stream
    const readStream = table.createReadStream({
      // workaround for https://github.com/grpc/grpc-node/issues/2446, remove when fixed
      gaxOptions: {
        timeout: 3000,
      },
    });

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

  it('should silently resume after server or network error', done => {
    // 1000 rows must be enough to reproduce issues with losing the data and to create backpressure
    const keyFrom = 0;
    const keyTo = 1000;
    // the server will error after sending this chunk (not row)
    const errorAfterChunkNo = 423;

    service.setService({
      ReadRows: readRowsImpl(keyFrom, keyTo, errorAfterChunkNo) as any,
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
      assert.strictEqual(receivedRowCount, keyTo - keyFrom);
      assert.strictEqual(lastKeyReceived, keyTo - 1);
      done();
    });
  });

  after(async () => {
    server.shutdown(() => {});
  });
});
