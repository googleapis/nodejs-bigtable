import {describe} from 'mocha';
import {AbortableDuplex, Bigtable} from '../src';
import {PassThrough} from 'stream';
import * as assert from 'assert';
import {Mutation} from '../src/mutation';

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
        function setupReadRows() {
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
        }

        it('requests for createReadStream should match', async () => {
          setupReadRows();
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
          setupReadRows();
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
      describe.only('should make MutateRows grpc requests', () => {
        function setupMutateRows() {
          let requestCount = 0;
          table.bigtable.request = (config: any) => {
            requestCount++;
            assert.strictEqual(config.client, 'BigtableClient');
            assert.strictEqual(config.method, 'mutateRows');
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
        }
        it('requests for mutate should match', async () => {
          setupMutateRows();
          const entry = {
            key: 'alincoln',
            data: {
              follows: {
                tjefferson: 1,
              },
            },
          };
          const mutation = {
            key: 'some-id',
            data: entry,
            method: Mutation.methods.INSERT,
          };
          const gaxOptions = {maxRetries: 4};
          await table.mutate(mutation, {gaxOptions});
          await view.mutate(mutation, {gaxOptions});
        });
      });
    });
  });
});
