import {describe} from 'mocha';
import {AbortableDuplex, Bigtable} from '../src';
import {PassThrough} from 'stream';
import * as assert from 'assert';
import {Mutation} from '../src/mutation';
import * as mocha from 'mocha';

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
        function setupMutateRows(done: mocha.Done) {
          let requestCount = 0;
          table.bigtable.request = (config: any) => {
            try {
              delete config['retryOpts'];
              requestCount++;
              const requestForTable = {
                tableName: `projects/{{projectId}}/instances/${fakeInstanceName}/tables/${fakeTableName}`,
              };
              const requestForAuthorizedView = {
                authorizedViewName: `projects/{{projectId}}/instances/${fakeInstanceName}/tables/${fakeTableName}/authorizedViews/${fakeViewName}`,
              };
              const expectedPartialReqOpts =
                requestCount === 1 ? requestForTable : requestForAuthorizedView;
              const mutationValue = Mutation.convertToBytes(1);
              assert.deepStrictEqual(config, {
                client: 'BigtableClient',
                method: 'mutateRows',
                gaxOpts: {
                  maxRetries: 0,
                  otherArgs: {
                    headers: {
                      ['bigtable-attempt']: 0,
                    },
                  },
                },
                reqOpts: Object.assign(expectedPartialReqOpts, {
                  appProfileId: undefined,
                  entries: [
                    {
                      rowKey: Buffer.from('some-id'),
                      mutations: [
                        {
                          setCell: {
                            familyName: 'follows',
                            columnQualifier:
                              Mutation.convertToBytes('tjefferson'),
                            timestampMicros: 2,
                            value: mutationValue,
                          },
                        },
                      ],
                    },
                  ],
                }),
              });
            } catch (err: unknown) {
              done(err);
            }
            const stream = new PassThrough({
              objectMode: true,
            });
            setImmediate(() => {
              stream.end();
            });
            return stream as {} as AbortableDuplex;
          };
        }
        it('requests for mutate should match', done => {
          (async () => {
            setupMutateRows(done);
            const mutation = {
              key: 'some-id',
              data: {
                follows: {
                  tjefferson: {
                    value: 1,
                    timestamp: 2,
                  },
                },
              },
              method: Mutation.methods.INSERT,
            };
            // Currently the client retries on an end event if all the data
            // hasn't been sent back so maxRetries needs to be 0.
            const gaxOptions = {maxRetries: 0};
            table.maxRetries = 0;
            await table.mutate(mutation, {gaxOptions});
            view.maxRetries = 0;
            await view.mutate(mutation, {gaxOptions});
            done();
          })();
        });
      });
    });
  });
});
