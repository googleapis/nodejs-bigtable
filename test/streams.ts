import {describe, it} from 'mocha';
import {generateId} from '../system-test/common';
import {Bigtable} from '../src';
import {PassThrough, pipeline, Transform, Writable} from 'stream';
import * as streamEvents from 'stream-events';
import {AbortableDuplex} from '../src';
import * as assert from 'assert';

describe('Bigtable/Streams', () => {
  describe('createReadStream', () => {
    it('should finish delivering a chunk every time a chunk is sent', async () => {
      let rowCount = 0;
      const chunkSize = 209;
      const bigtable = new Bigtable();
      const instance = bigtable.instance('fake-instance');
      const table = instance.table(generateId('table'));
      const requestFn = table.bigtable.request;
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
      const stream = streamEvents(
        new PassThrough({
          objectMode: true,
        })
      );
      table.bigtable.request = (config?: any) => {
        return stream as AbortableDuplex;
      };
      const readStream = table.createReadStream({});
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
  });
});
