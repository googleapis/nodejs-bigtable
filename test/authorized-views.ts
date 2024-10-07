import {beforeEach, describe} from 'mocha';
import {AbortableDuplex, Bigtable, RequestCallback} from '../src';
import {PassThrough} from 'stream';
import * as assert from 'assert';
import {Mutation} from '../src/mutation';
import * as mocha from 'mocha';
import {Row} from '../src';
import {ServiceError} from 'google-gax';

describe.only('Bigtable/AuthorizedViews', () => {
  describe('Authorized View methods should have requests that match Table and Row requests', () => {
    const bigtable = new Bigtable({});
    const fakeTableName = 'fake-table';
    const fakeInstanceName = 'fake-instance';
    const fakeViewName = 'fake-view';
    const instance = bigtable.instance(fakeInstanceName);
    const table = instance.table(fakeTableName);
    const view = instance.view(fakeTableName, fakeViewName);

    /** This function mocks out the request function and compares the request
     * passed into it to ensure it is correct.
     *
     * @param done The function to call when ending the mocha test
     * @param compareFn The function that maps the requestCount to the
     * request that we would expect to be passed into `request`.
     */
    function mockCallbackRequest(
      done: mocha.Done,
      compareFn: (requestCount: number) => unknown
    ) {
      let requestCount = 0;
      table.bigtable.request = (
        config?: any,
        callback?: RequestCallback<any>
      ) => {
        try {
          requestCount++;
          delete config['retryOpts'];
          assert.deepStrictEqual(config, compareFn(requestCount));
        } catch (err: unknown) {
          done(err);
        }
        if (callback) {
          callback(null);
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

    /**
     * This function gets the basic structure of the requests we would
     * expect when first making a request for a table and then for an
     * authorized view.
     */
    function getBaseRequestOptions(requestCount: number) {
      const requestForTable = {
        tableName: `projects/{{projectId}}/instances/${fakeInstanceName}/tables/${fakeTableName}`,
      };
      const requestForAuthorizedView = {
        authorizedViewName: `projects/{{projectId}}/instances/${fakeInstanceName}/tables/${fakeTableName}/authorizedViews/${fakeViewName}`,
      };
      return requestCount === 1 ? requestForTable : requestForAuthorizedView;
    }

    describe('Table', () => {
      describe('should make ReadRows grpc requests', () => {
        /**
         * This function mocks out the request function to expect a readRows
         * request when the tests are run.
         *
         * @param done The function to call when ending the mocha test
         */
        function setupReadRows(done: mocha.Done) {
          mockCallbackRequest(done, requestCount => {
            return {
              client: 'BigtableClient',
              method: 'readRows',
              gaxOpts: {
                maxRetries: 4,
                otherArgs: {
                  headers: {
                    'bigtable-attempt': 0,
                  },
                },
              },
              reqOpts: Object.assign(
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
                getBaseRequestOptions(requestCount)
              ),
            };
          });
        }

        it('requests for createReadStream should match', done => {
          setupReadRows(done);
          (async () => {
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
            done();
          })();
        });
        it('requests for getRows should match', done => {
          setupReadRows(done);
          (async () => {
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
            done();
          })();
        });
      });
      describe('should make MutateRows grpc requests', () => {
        /**
         * This function mocks out the request function to expect a mutateRows
         * request when the tests are run.
         *
         * @param done The function to call when ending the mocha test
         */
        function setupMutateRows(done: mocha.Done) {
          mockCallbackRequest(done, requestCount => {
            return {
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
              reqOpts: Object.assign(getBaseRequestOptions(requestCount), {
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
                          value: Mutation.convertToBytes(1),
                        },
                      },
                    ],
                  },
                ],
              }),
            };
          });
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
        it('requests for insert should match', done => {
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
            };
            // Currently the client retries on an end event if all the data
            // hasn't been sent back so maxRetries needs to be 0.
            const gaxOptions = {maxRetries: 0};
            table.maxRetries = 0;
            await table.insert(mutation, gaxOptions);
            view.maxRetries = 0;
            await view.insert(mutation, gaxOptions);
            done();
          })();
        });
      });
      describe('should make SampleRowKeys grpc requests', () => {
        /**
         * This function mocks out the request function to expect a sampleRowKeys
         * request when the tests are run.
         *
         * @param done The function to call when ending the mocha test
         */
        function setupSampleRowKeys(done: mocha.Done) {
          mockCallbackRequest(done, requestCount => {
            return {
              client: 'BigtableClient',
              method: 'sampleRowKeys',
              gaxOpts: {
                maxRetries: 4,
              },
              reqOpts: Object.assign(getBaseRequestOptions(requestCount), {
                appProfileId: undefined,
              }),
            };
          });
        }
        it('requests for sampleRowKeys should match', done => {
          setupSampleRowKeys(done);
          (async () => {
            const opts = {
              maxRetries: 4,
            };
            await table.sampleRowKeys(opts);
            await view.sampleRowKeys(opts);
            done();
          })();
        });
        it('requests for sampleRowKeysStream should match', done => {
          setupSampleRowKeys(done);
          (async () => {
            const gaxOptions = {maxRetries: 4};
            await table.sampleRowKeysStream(gaxOptions);
            await view.sampleRowKeysStream(gaxOptions);
            done();
          })();
        });
      });
    });
    describe('Row', () => {
      const rowId = 'row-id';
      let row: Row;

      beforeEach(() => {
        row = table.row(rowId);
      });

      describe('should make readModifyWriteRow grpc requests', () => {
        /**
         * This function mocks out the request function to expect a readRows
         * request when the tests are run.
         *
         * @param done The function to call when ending the mocha test
         */
        function setupReadModifyWriteRow(done: mocha.Done) {
          mockCallbackRequest(done, requestCount => {
            return {
              client: 'BigtableClient',
              method: 'readModifyWriteRow',
              gaxOpts: {
                maxRetries: 4,
              },
              reqOpts: Object.assign(
                {
                  appProfileId: undefined,
                  rowKey: Buffer.from(rowId),
                  rules: [
                    {
                      familyName: 'traits',
                      columnQualifier: Buffer.from('teeth'),
                      appendValue: Buffer.from('-wood'),
                    },
                  ],
                },
                getBaseRequestOptions(requestCount)
              ),
            };
          });
        }

        it('requests for get should match', done => {
          setupReadModifyWriteRow(done);
          (async () => {
            const rule = {
              column: 'traits:teeth',
              append: '-wood',
            };
            const gaxOpts = {maxRetries: 4};
            await row.createRules(rule, gaxOpts);
            await view.createRules({rules: rule, rowId: 'row-id'}, gaxOpts);
            done();
          })();
        });
      });
    });
  });
});
