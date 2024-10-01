import {describe} from 'mocha';
import {AbortableDuplex, Bigtable, PrefixRange, RawFilter} from '../src';
import {PassThrough} from 'stream';
import {CallOptions} from 'google-gax';
import * as assert from 'assert';

describe('Bigtable/AuthorizedViews', () => {
  describe('Authorized View methods should have requests that match Table and Row requests', () => {
    describe('Table', () => {
      const bigtable = new Bigtable({});
      const fakeTableName = 'fake-table';
      const fakeInstanceName = 'fake-instance';
      const fakeViewName = 'fake-view';
      const instance = bigtable.instance(fakeInstanceName);
      const table = instance.table(fakeTableName);
      const view = instance.view(fakeTableName, fakeViewName);
      describe('should make ReadRows grpc requests', () => {
        it('requests for createReadStream should match', async () => {
          let requestCount = 0;
          table.bigtable.request = (config: any) => {
            requestCount++;
            assert.strictEqual(config.client, 'BigtableClient');
            assert.strictEqual(config.method, 'readRows');
            const requestForTable = {
              tableName: `projects/{{projectId}}/instances/${fakeInstanceName}/tables/${fakeTableName}`,
            };
            const requestForAuthorizedView = {
              authorizedViewName: `projects/{{projectId}}/instances/${fakeInstanceName}/tables/${fakeTableName}/authorizedViews/${fakeViewName}`,
            };
            const expectedPartialReqOpts =
              requestCount === 1 ? requestForTable : requestForAuthorizedView;
            const expectedReqOpts = Object.assign(
              {
                appProfileId: undefined,
                rows: {
                  rowKeys: [],
                  rowRanges: [
                    {
                      startKeyClosed: Buffer.from('7'),
                      endKeyClosed: Buffer.from('9'),
                    },
                  ],
                },
                filter: {
                  columnQualifierRegexFilter: Buffer.from('abc'),
                },
                rowsLimit: 5,
              },
              expectedPartialReqOpts
            );
            assert.deepStrictEqual(config.reqOpts, expectedReqOpts);
            const expectedGaxOpts = {
              maxRetries: 4,
              otherArgs: {
                headers: {
                  'bigtable-attempt': 0,
                },
              },
            };
            assert.deepStrictEqual(config.gaxOpts, expectedGaxOpts);
            const stream = new PassThrough({
              objectMode: true,
            });
            return stream as {} as AbortableDuplex;
          };
          const opts = {
            decode: true,
            end: '9',
            filter: [{column: 'abc'}],
            gaxOptions: {
              maxRetries: 4,
            },
            limit: 5,
            start: '7',
          };
          await table.createReadStream(opts);
          await view.createReadStream(opts);
        });
        it('requests for getRows should match', async () => {
          let requestCount = 0;
          table.bigtable.request = (config: any) => {
            requestCount++;
            assert.strictEqual(config.client, 'BigtableClient');
            assert.strictEqual(config.method, 'readRows');
            const requestForTable = {
              tableName: `projects/{{projectId}}/instances/${fakeInstanceName}/tables/${fakeTableName}`,
            };
            const requestForAuthorizedView = {
              authorizedViewName: `projects/{{projectId}}/instances/${fakeInstanceName}/tables/${fakeTableName}/authorizedViews/${fakeViewName}`,
            };
            const expectedPartialReqOpts =
              requestCount === 1 ? requestForTable : requestForAuthorizedView;
            const expectedReqOpts = Object.assign(
              {
                appProfileId: undefined,
                rows: {
                  rowKeys: [],
                  rowRanges: [
                    {
                      startKeyClosed: Buffer.from('7'),
                      endKeyClosed: Buffer.from('9'),
                    },
                  ],
                },
                filter: {
                  columnQualifierRegexFilter: Buffer.from('abc'),
                },
                rowsLimit: 5,
              },
              expectedPartialReqOpts
            );
            assert.deepStrictEqual(config.reqOpts, expectedReqOpts);
            const expectedGaxOpts = {
              maxRetries: 4,
              otherArgs: {
                headers: {
                  'bigtable-attempt': 0,
                },
              },
            };
            assert.deepStrictEqual(config.gaxOpts, expectedGaxOpts);
            const stream = new PassThrough({
              objectMode: true,
            });
            setImmediate(() => {
              stream.end();
            });
            return stream as {} as AbortableDuplex;
          };
          const opts = {
            decode: true,
            end: '9',
            filter: [{column: 'abc'}],
            gaxOptions: {
              maxRetries: 4,
            },
            limit: 5,
            start: '7',
          };
          await table.getRows(opts);
          await view.getRows(opts);
        });
      });
    });
  });
});
