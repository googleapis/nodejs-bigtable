import {before, describe, it} from 'mocha';
import {Bigtable, AbortableDuplex} from '../src';
import {PassThrough, pipeline, Transform, Writable} from 'stream';
const streamEvents = require('stream-events');
import * as assert from 'assert';
import {MockServer} from '../src/util/mock-servers/mock-server';
import {MockService} from '../src/util/mock-servers/mock-service';
import {BigtableClientMockService} from '../src/util/mock-servers/service-implementations/bigtable-client-mock-service';

describe('Bigtable/Streams', () => {
  describe('createReadStream', () => {
    let rowCount = 0;
    const transformer = new Transform({
      objectMode: true,
      transform(
        chunk: any,
        _encoding: any,
        callback: (err: any, data: any) => void
      ) {
        rowCount++;
        // console.log(`row count: ${rowCount}`);
        setTimeout(() => {
          callback(null, chunk);
        }, 0);
      },
    });
    const output = new Writable({
      objectMode: true,
      write(_chunk, _encoding, callback) {
        callback();
      },
    });
    function ascii(index: number) {
      return String.fromCharCode(index);
    }
    function getChunk(index: number) {
      return {
        labels: [],
        rowKey: Buffer.from(`a${ascii(index)}`),
        familyName: {value: 'cf1'},
        qualifier: {value: Buffer.from('a')},
        timestampMicros: '12',
        value: Buffer.from('a'),
        valueSize: 0,
        commitRow: true,
        rowStatus: 'commitRow',
      };
    }

    it('should finish delivering a chunk every time a chunk is sent', async () => {
      rowCount = 0;
      const chunkSize = 209;
      const bigtable = new Bigtable();
      const instance = bigtable.instance('fake-instance');
      const table = instance.table('fake-table');
      const requestFn = table.bigtable.request;
      const stream = streamEvents(
        new PassThrough({
          objectMode: true,
        })
      );
      table.bigtable.request = (config?: any) => {
        return stream as AbortableDuplex;
      };
      const readStream = table.createReadStream({});
      function pushChunks(numChunks: number) {
        const chunks = [];
        for (let i = 0; i < numChunks; i++) {
          chunks.push(getChunk(i));
        }
        const data = {
          chunks,
          lastScannedRowKey: Buffer.from('a'),
        };
        stream.push(data);
      }
      let chunksPushed = 0;
      const runNextTick = () => {
        if (chunksPushed < 80) {
          pushChunks(chunkSize);
          chunksPushed++;
          process.nextTick(runNextTick);
        } else {
          stream.emit('end');
        }
      };
      process.nextTick(runNextTick);
      await new Promise((resolve: (err?: any) => void, reject) => {
        pipeline(readStream, transformer, output, (err?: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      console.log('total row count:');
      console.log(`${rowCount}`);
      table.bigtable.request = requestFn;
      assert.strictEqual(rowCount % chunkSize, 0);
    });
    describe('with the mock server', () => {
      let server: MockServer;
      let service: MockService;
      let bigtable: Bigtable;
      let table: any;

      before(done => {
        server = new MockServer(() => {
          bigtable = new Bigtable({
            apiEndpoint: `localhost:${server.port}`,
          });
          table = bigtable.instance('fake-instance').table('fake-table');
          service = new BigtableClientMockService(server);
          service.setService({
            ReadRows: pushDataToUser,
          });
          done();
        });
      });

      function createResponse(i: number) {
        const response: any = {
          chunks: [],
        };
        const chunk1 = getChunk(i);
        response.chunks = [chunk1];
        return response;
      }
      const pushDataToUser = (call: any) => {
        let rowId = 0;
        function sendNextRow() {
          for (let j = 0; j < 100; j++) {
            call.write(createResponse(rowId++));
          }

          if (rowId < 300) {
            setTimeout(sendNextRow, 10);
          } else {
            call.end();
          }
        }
        sendNextRow();
      };

      it('should finish delivering all the data to the user', async () => {
        rowCount = 0;
        const instance = bigtable.instance('fake-instance');
        const table = instance.table('fake-table');
        const readStream = table.createReadStream({
          decode: false,
          limit: 81,
        });
        await new Promise((resolve, reject) => {
          pipeline(readStream, transformer, output, (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(null);
            }
          });
        });
        assert.strictEqual(rowCount, 300);
      });
    });
  });
});
