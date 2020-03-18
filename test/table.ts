// Copyright 2016 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import {describe, it} from 'mocha';
import * as proxyquire from 'proxyquire';
import * as pumpify from 'pumpify';
import * as sinon from 'sinon';
import {PassThrough} from 'stream';
import * as through from 'through2';
import {DecoratedStatus} from '../src/decorateStatus';

import {ChunkTransformer} from '../src/chunktransformer.js';
import {Family} from '../src/family.js';
import {Mutation} from '../src/mutation.js';
import {Row} from '../src/row.js';
import * as tblTypes from '../src/table';
import * as ds from '../src/decorateStatus.js';

const sandbox = sinon.createSandbox();
const noop = () => {};

let promisified = false;
const fakePromisify = Object.assign({}, promisify, {
  promisifyAll(Class, options) {
    if (Class.name !== 'Table') {
      return;
    }
    promisified = true;
    assert.deepStrictEqual(options.exclude, ['family', 'row']);
  },
});

function createFake(Class) {
  return class Fake extends Class {
    calledWith_: IArguments;
    constructor() {
      super(...arguments);
      this.calledWith_ = arguments;
    }
  };
}

const FakeFamily = createFake(Family);
FakeFamily.formatRule_ = sinon.spy(rule => rule);

const FakeRow = createFake(Row);

FakeRow.formatChunks_ = sinon.spy(function(chunks) {
  return chunks;
});

const FakeChunkTransformer = createFake(ChunkTransformer);
FakeChunkTransformer.prototype._transform = function(rows, enc, next) {
  rows.forEach(row => this.push(row));
  next();
};

const FakeMutation = {
  methods: Mutation.methods,
  convertToBytes: sinon.spy(function(value) {
    return value;
  }),
  convertFromBytes: sinon.spy(function(value) {
    return value;
  }),
  parse: sinon.spy(function(value) {
    return value;
  }),
};

const FakeFilter = {
  parse: sinon.spy(function(value) {
    return value;
  }),
  createRange: (...args) => {
    return {};
  },
};

describe('Bigtable/Table', function() {
  const TABLE_ID = 'my-table';
  let INSTANCE;
  let TABLE_NAME;

  let Table: typeof tblTypes.Table;
  let table: any;

  before(function() {
    Table = proxyquire('../src/table.js', {
      '@google-cloud/promisify': fakePromisify,
      './family.js': {Family: FakeFamily},
      './mutation.js': {Mutation: FakeMutation},
      './filter.js': {Filter: FakeFilter},
      pumpify,
      './row.js': {Row: FakeRow},
      './chunktransformer.js': {ChunkTransformer: FakeChunkTransformer},
    }).Table;
  });

  beforeEach(function() {
    INSTANCE = {
      bigtable: {},
      name: 'a/b/c/d',
    };
    TABLE_NAME = INSTANCE.name + '/tables/' + TABLE_ID;
    table = new Table(INSTANCE, TABLE_ID);
  });

  afterEach(function() {
    Object.keys(FakeMutation).forEach(function(spy) {
      if (FakeMutation[spy].reset) {
        FakeMutation[spy].resetHistory();
      }
    });

    FakeFilter.parse.resetHistory();
    sandbox.restore();
  });

  describe('instantiation', function() {
    it('should promisify all the things', function() {
      assert(promisified);
    });

    it('should localize Bigtable instance', function() {
      assert.strictEqual(table.bigtable, INSTANCE.bigtable);
    });

    it('should localize Instance instance', function() {
      assert.strictEqual(table.instance, INSTANCE);
    });

    it('should localize ID', function() {
      assert.strictEqual(table.id, TABLE_ID);
    });

    it('should localize table name', function() {
      assert.strictEqual(table.name, TABLE_NAME);
    });
    it('should leave full table name unaltered and localize the id from the name', function() {
      const table = new Table(INSTANCE, TABLE_NAME);
      assert.strictEqual(table.name, TABLE_NAME);
      assert.strictEqual(table.id, TABLE_ID);
    });

    it('should throw if table id in wrong format', function() {
      const id = `tables/${TABLE_ID}`;
      assert.throws(function() {
        new Table(INSTANCE, id);
      }, Error);
    });
  });

  describe('VIEWS', function() {
    const views = {
      unspecified: 0,
      name: 1,
      schema: 2,
      replication: 3,
      full: 4,
    };

    it('should export the table views', function() {
      assert.deepStrictEqual(views, Table.VIEWS);
    });
  });

  describe('formatName_', function() {
    it('should format the table name to include the cluster name', function() {
      const tableName = Table.formatName_(INSTANCE.name, TABLE_ID);
      assert.strictEqual(tableName, TABLE_NAME);
    });

    it('should not re-format the table name', function() {
      const tableName = Table.formatName_(INSTANCE.id, TABLE_NAME);
      assert.strictEqual(tableName, TABLE_NAME);
    });
  });

  describe('create', function() {
    it('should call createTable from instance', function(done) {
      const options = {};

      table.instance.createTable = function(id, options_, callback) {
        assert.strictEqual(id, table.id);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      table.create(options, done);
    });

    it('should not require options', function(done) {
      table.instance.createTable = function(id, options, callback) {
        assert.deepStrictEqual(options, {});
        callback(); // done()
      };

      table.create(done);
    });
  });

  describe('createPrefixRange', function() {
    it('should create a range from the prefix', function() {
      assert.deepStrictEqual(Table.createPrefixRange('start'), {
        start: 'start',
        end: {
          value: 'staru',
          inclusive: false,
        },
      });

      assert.deepStrictEqual(Table.createPrefixRange('X\xff'), {
        start: 'X\xff',
        end: {
          value: 'Y',
          inclusive: false,
        },
      });

      assert.deepStrictEqual(Table.createPrefixRange('xoo\xff'), {
        start: 'xoo\xff',
        end: {
          value: 'xop',
          inclusive: false,
        },
      });

      assert.deepStrictEqual(Table.createPrefixRange('a\xffb'), {
        start: 'a\xffb',
        end: {
          value: 'a\xffc',
          inclusive: false,
        },
      });

      assert.deepStrictEqual(Table.createPrefixRange('com.google.'), {
        start: 'com.google.',
        end: {
          value: 'com.google/',
          inclusive: false,
        },
      });
    });

    it('should create an inclusive bound when the prefix is empty', function() {
      assert.deepStrictEqual(Table.createPrefixRange('\xff'), {
        start: '\xff',
        end: {
          value: '',
          inclusive: true,
        },
      });

      assert.deepStrictEqual(Table.createPrefixRange(''), {
        start: '',
        end: {
          value: '',
          inclusive: true,
        },
      });
    });
  });

  describe('createFamily', function() {
    const COLUMN_ID = 'my-column';
    const FAMILY_ID = 'test-family';

    it('should throw if a id is not provided', function() {
      assert.throws(function() {
        // tslint:disable-next-line no-any
        (table as any).createFamily();
      }, /An id is required to create a family\./);
    });

    it('should provide the proper request options', function(done) {
      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'modifyColumnFamilies');

        assert.strictEqual(config.reqOpts.name, TABLE_NAME);
        assert.deepStrictEqual(config.reqOpts.modifications, [
          {
            id: COLUMN_ID,
            create: {},
          },
        ]);

        assert.strictEqual(config.gaxOpts, undefined);

        done();
      };

      table.createFamily(COLUMN_ID, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      table.createFamily(COLUMN_ID, {gaxOptions}, assert.ifError);
    });

    it('should respect the gc rule option', function(done) {
      const rule = {
        a: 'a',
        b: 'b',
      };
      const convertedRule = {
        c: 'c',
        d: 'd',
      };

      const spy = (FakeFamily.formatRule_ = sinon.spy(function() {
        return convertedRule;
      }));

      table.bigtable.request = function(config) {
        const modification = config.reqOpts.modifications[0];

        assert.strictEqual(modification.create.gcRule, convertedRule);
        assert.strictEqual(spy.callCount, 1);
        assert.strictEqual((spy as any).getCall(0).args[0], rule);
        done();
      };

      table.createFamily(COLUMN_ID, {rule}, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      const error = new Error('err');
      const response = {};

      table.bigtable.request = function(config, callback) {
        callback(error, response);
      };

      table.createFamily(COLUMN_ID, function(err, family, apiResponse) {
        assert.strictEqual(error, err);
        assert.strictEqual(family, null);
        assert.strictEqual(response, apiResponse);
        done();
      });
    });

    it('should return a Family object', function(done) {
      const response = {
        name: 'response-family-name',
      };
      const fakeFamily = {} as Family;

      table.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      sandbox.stub(table, 'family').callsFake(id => {
        assert.strictEqual(id, FAMILY_ID);
        return fakeFamily;
      });

      table.createFamily(FAMILY_ID, function(err, family, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(family, fakeFamily);
        assert.strictEqual(family.metadata, response);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('createReadStream', function() {
    it('should provide the proper request options', function(done) {
      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableClient');
        assert.strictEqual(config.method, 'readRows');
        assert.strictEqual(config.reqOpts.tableName, TABLE_NAME);
        assert.strictEqual(config.reqOpts.appProfileId, undefined);
        assert.strictEqual(config.gaxOpts, undefined);
        done();
      };
      table.createReadStream();
    });

    it('should use an appProfileId', function(done) {
      const bigtableInstance = table.bigtable;
      bigtableInstance.appProfileId = 'app-profile-id-12345';

      bigtableInstance.request = function(config) {
        assert.strictEqual(
          config.reqOpts.appProfileId,
          bigtableInstance.appProfileId
        );
        done();
      };

      table.createReadStream();
    });

    it('should abort request on end', function(done) {
      table.bigtable.request = function(config) {
        const requestStream = new PassThrough({
          objectMode: true,
        });

        /* tslint:disable-next-line */
        (requestStream as any).abort = function() {
          done();
        };

        return requestStream;
      };

      table.createReadStream().end();
    });

    describe('options', function() {
      it('should accept gaxOptions', function(done) {
        const gaxOptions = {};

        table.bigtable.request = function(config) {
          assert.strictEqual(config.gaxOpts, gaxOptions);
          done();
        };

        table.createReadStream({gaxOptions});
      });

      it('should retrieve a range of rows', function(done) {
        const options = {
          start: 'gwashington',
          end: 'alincoln',
        };

        const fakeRange = {
          start: 'a',
          end: 'b',
        };

        const formatSpy = (FakeFilter.createRange = sinon.spy(function() {
          return fakeRange;
        }));

        table.bigtable.request = function(config) {
          assert.deepStrictEqual(config.reqOpts.rows.rowRanges[0], fakeRange);
          assert.strictEqual(formatSpy.callCount, 1);
          assert.deepStrictEqual(formatSpy.getCall(0).args, [
            options.start,
            options.end,
            'Key',
          ]);
          done();
        };

        table.createReadStream(options);
      });

      it('should retrieve multiple rows', function(done) {
        const options = {
          keys: ['gwashington', 'alincoln'],
        };
        const convertedKeys = ['a', 'b'];

        const convertSpy = (FakeMutation.convertToBytes = sinon.spy(function(
          key
        ) {
          const keyIndex = options.keys.indexOf(key);
          return convertedKeys[keyIndex];
        }));

        table.bigtable.request = function(config) {
          assert.deepStrictEqual(config.reqOpts.rows.rowKeys, convertedKeys);
          assert.strictEqual(convertSpy.callCount, 2);
          assert.strictEqual(convertSpy.getCall(0).args[0], options.keys[0]);
          assert.strictEqual(convertSpy.getCall(1).args[0], options.keys[1]);
          done();
        };

        table.createReadStream(options);
      });

      it('should retrieve multiple ranges', function(done) {
        const options = {
          ranges: [
            {
              start: 'a',
              end: 'b',
            },
            {
              start: 'c',
              end: 'd',
            },
          ],
        };

        const fakeRanges = [
          {
            start: 'e',
            end: 'f',
          },
          {
            start: 'g',
            end: 'h',
          },
        ];

        const formatSpy = (FakeFilter.createRange = sinon.spy(function() {
          return fakeRanges[formatSpy.callCount - 1];
        }));

        table.bigtable.request = function(config) {
          assert.deepStrictEqual(config.reqOpts.rows.rowRanges, fakeRanges);
          assert.strictEqual(formatSpy.callCount, 2);
          assert.deepStrictEqual(formatSpy.getCall(0).args, [
            options.ranges[0].start,
            options.ranges[0].end,
            'Key',
          ]);
          assert.deepStrictEqual(formatSpy.getCall(1).args, [
            options.ranges[1].start,
            options.ranges[1].end,
            'Key',
          ]);
          done();
        };

        table.createReadStream(options);
      });

      it('should parse a filter object', function(done) {
        const options = {
          filter: [{}],
        };

        const fakeFilter = {};

        const parseSpy = ((FakeFilter as any).parse = sinon.spy(function() {
          return fakeFilter;
        }));

        table.bigtable.request = function(config) {
          assert.strictEqual(config.reqOpts.filter, fakeFilter);
          assert.strictEqual(parseSpy.callCount, 1);
          assert.strictEqual(
            (parseSpy as any).getCall(0).args[0],
            options.filter
          );
          done();
        };

        table.createReadStream(options);
      });

      it('should allow setting a row limit', function(done) {
        const options = {
          limit: 10,
        };

        table.bigtable.request = function(config) {
          assert.strictEqual(config.reqOpts.rowsLimit, options.limit);
          done();
        };

        table.createReadStream(options);
      });

      it('should throw if ranges and start is set together', function() {
        const options = {
          ranges: [
            {
              start: 'a',
              end: 'b',
            },
            {
              start: 'c',
              end: 'd',
            },
          ],
          start: 'a',
        };
        assert.throws(function() {
          (table as any).createReadStream(options, assert.ifError);
        }, /start\/end should be used exclusively to ranges\/prefix\/prefixes\./);
      });

      it('should throw if ranges and end is set together', function() {
        const options = {
          ranges: [
            {
              start: 'a',
              end: 'b',
            },
            {
              start: 'c',
              end: 'd',
            },
          ],
          end: 'a',
        };
        assert.throws(function() {
          (table as any).createReadStream(options, assert.ifError);
        }, /start\/end should be used exclusively to ranges\/prefix\/prefixes\./);
      });

      it('should throw if ranges and prefix is set together', function() {
        const options = {
          ranges: [
            {
              start: 'a',
              end: 'b',
            },
            {
              start: 'c',
              end: 'd',
            },
          ],
          prefix: 'a',
        };
        assert.throws(function() {
          (table as any).createReadStream(options, assert.ifError);
        }, /prefix should be used exclusively to ranges\/start\/end\/prefixes\./);
      });

      it('should throw if ranges and prefixes is set together', function() {
        const options = {
          ranges: [
            {
              start: 'a',
              end: 'b',
            },
            {
              start: 'c',
              end: 'd',
            },
          ],
          prefixes: [{prefix: 'a'}],
        };
        assert.throws(function() {
          (table as any).createReadStream(options, assert.ifError);
        }, /prefixes should be used exclusively to ranges\/start\/end\/prefix\./);
      });

      it('should throw if prefix and start is set together', function() {
        const options = {
          start: 'a',
          prefix: 'a',
        };
        assert.throws(function() {
          (table as any).createReadStream(options, assert.ifError);
        }, /start\/end should be used exclusively to ranges\/prefix\/prefixes\./);
      });

      describe('prefixes', function() {
        beforeEach(function() {
          (FakeFilter as any).createRange = noop;
        });

        afterEach(function() {
          (Table as any).createPrefixRange.restore();
        });

        it('should transform the prefix into a range', function(done) {
          const fakeRange = {};
          const fakePrefixRange = ({
            start: 'a',
            end: 'b',
          } as {}) as tblTypes.PrefixRange;

          const fakePrefix = 'abc';

          const prefixSpy = sandbox
            .stub(Table, 'createPrefixRange')
            .returns(fakePrefixRange);

          const rangeSpy = sandbox
            .stub(FakeFilter, 'createRange')
            .returns(fakeRange);

          table.bigtable.request = function(config) {
            assert.strictEqual(prefixSpy.getCall(0).args[0], fakePrefix);
            assert.deepStrictEqual(config.reqOpts.rows.rowRanges, [fakeRange]);

            assert.deepStrictEqual(rangeSpy.getCall(0).args, [
              fakePrefixRange.start,
              fakePrefixRange.end,
              'Key',
            ]);

            done();
          };

          table.createReadStream({prefix: fakePrefix});
        });

        it('should accept multiple prefixes', function(done) {
          const prefixes = ['abc', 'def'];
          const prefixRanges = ([
            {start: 'abc', end: 'abd'},
            {start: 'def', end: 'deg'},
          ] as {}) as tblTypes.PrefixRange[];
          const prefixSpy = sandbox
            .stub(Table, 'createPrefixRange')
            .callsFake(function() {
              const callIndex = prefixSpy.callCount - 1;
              return prefixRanges[callIndex];
            });

          const ranges = [{}, {}];
          const rangeSpy = sandbox
            .stub(FakeFilter, 'createRange')
            .callsFake(() => {
              const callIndex = rangeSpy.callCount - 1;
              return ranges[callIndex];
            });

          table.bigtable.request = function(config) {
            assert.strictEqual(prefixSpy.callCount, 2);

            prefixes.forEach(function(prefix, i) {
              const prefixRange = prefixRanges[i];

              assert.deepStrictEqual(prefixSpy.getCall(i).args, [prefix]);
              assert.deepStrictEqual(rangeSpy.getCall(i).args, [
                prefixRange.start,
                prefixRange.end,
                'Key',
              ]);
              assert.strictEqual(config.reqOpts.rows.rowRanges[i], ranges[i]);
            });

            done();
          };

          table.createReadStream({prefixes});
        });
      });
    });

    describe('success', function() {
      const fakeChunks = {
        chunks: [
          {
            rowKey: 'a',
          },
          {
            commitRow: true,
          },
          {
            rowKey: 'b',
          },
          {
            commitRow: true,
          },
        ],
      };

      const formattedRows = [
        {key: 'c', data: {}},
        {key: 'd', data: {}},
      ];

      beforeEach(function() {
        sinon.stub(table, 'row').callsFake(function() {
          return {} as Row;
        });
        FakeChunkTransformer.prototype._transform = function(
          chunks,
          enc,
          next
        ) {
          formattedRows.forEach(row => this.push(row));
          next();
        };
        FakeChunkTransformer.prototype._flush = function(cb) {
          cb();
        };

        table.bigtable.request = function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          /* tslint:disable-next-line */
          (stream as any).abort = function() {};

          setImmediate(function() {
            stream.push(fakeChunks);
            stream.push(null);
          });

          return stream;
        };
      });

      it('should stream Row objects', function(done) {
        const rows: any[] = [];

        table
          .createReadStream()
          .on('error', done)
          .on('data', function(row) {
            rows.push(row);
          })
          .on('end', function() {
            const rowSpy: any = table.row;

            assert.strictEqual(rows.length, formattedRows.length);
            assert.strictEqual(rowSpy.callCount, formattedRows.length);

            assert.strictEqual(rowSpy.getCall(0).args[0], formattedRows[0].key);
            assert.strictEqual(rows[0].data, formattedRows[0].data);

            assert.strictEqual(rowSpy.getCall(1).args[0], formattedRows[1].key);
            assert.strictEqual(rows[1].data, formattedRows[1].data);

            done();
          });
      });

      it('should allow a stream to end early', function(done) {
        const rows: any[] = [];

        const stream = table
          .createReadStream()
          .on('error', noop)
          .on('data', function(row) {
            rows.push(row);
            stream.end();
          })
          .on('end', function() {
            assert.strictEqual(rows.length, 1);
            done();
          });
      });
    });

    describe('error', function() {
      const error = new Error('err');
      const fakeChunks = {
        chunks: [
          {
            rowKey: 'a',
          },
          {
            commitRow: true,
          },
          {
            rowKey: 'b',
          },
          {
            commitRow: true,
          },
        ],
      };

      // beforeEach(function() {
      //   table.bigtable.request = function() {
      //     let stream = new PassThrough({
      //       objectMode: true,
      //     });

      //     setImmediate(function() {
      //       stream.emit('error', error);
      //     });

      //     return stream;
      //   };
      // });

      it('should emit an error event', function(done) {
        table.bigtable.request = function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            stream.emit('error', error);
          });

          return stream;
        };
        table
          .createReadStream()
          .on('error', function(err) {
            assert.strictEqual(error, err);
            done();
          })
          .on('data', done);
      });
      it('should emit an error event when chunk format returns error', function(done) {
        table.bigtable.request = function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            stream.push(fakeChunks);
            stream.push(null);
          });

          return stream;
        };
        FakeChunkTransformer.prototype._transform = function(
          chunks,
          enc,
          next
        ) {
          next(error);
        };
        table
          .createReadStream()
          .on('error', function(err) {
            assert.strictEqual(error, err);
            done();
          })
          .on('data', done);
      });
      it('should emit an error event when chunktransformer returns error on flush end', function(done) {
        table.bigtable.request = function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            stream.push(null);
          });

          return stream;
        };
        FakeChunkTransformer.prototype._flush = function(next) {
          next(error);
        };
        table
          .createReadStream()
          .on('error', function(err) {
            assert.strictEqual(error, err);
            done();
          })
          .on('data', done);
      });
    });

    describe('retries', function() {
      let callCreateReadStream;
      let emitters; // = [function(stream) { stream.push([{ key: 'a' }]);
      // stream.end(); }, ...];
      let makeRetryableError;
      let reqOptsCalls;
      let setTimeoutSpy;

      beforeEach(function() {
        FakeChunkTransformer.prototype._transform = function(rows, enc, next) {
          rows.forEach(row => this.push(row));
          this.lastRowKey = rows[rows.length - 1].key;
          next();
        };

        FakeChunkTransformer.prototype._flush = function(cb) {
          cb();
        };

        callCreateReadStream = (options, verify) => {
          table
            .createReadStream(options)
            .on('end', verify)
            .resume(); // The stream starts paused unless it has a `.data()`
          // callback.
        };

        emitters = null; // This needs to be assigned in each test case.

        makeRetryableError = () => {
          const error: any = new Error('retry me!');
          error.code = 4;
          return error;
        };

        sandbox.stub(FakeFilter, 'createRange').callsFake((start, end) => {
          const range: any = {};
          if (start) {
            range.start = start.value || start;
            range.startInclusive =
              typeof start === 'object' ? start.inclusive : true;
          }
          if (end) {
            range.end = end.value || end;
          }
          return range;
        });

        (FakeMutation as any).convertToBytes = function(value) {
          return Buffer.from(value);
        };

        reqOptsCalls = [];

        setTimeoutSpy = sandbox
          .stub(global, 'setTimeout')
          .callsFake(fn => (fn as Function)());

        table.bigtable.request = function(config) {
          reqOptsCalls.push(config.reqOpts);

          const stream = new PassThrough({
            objectMode: true,
          });

          /* tslint:disable-next-line */
          (stream as any).abort = function() {};

          setImmediate(function() {
            stream.emit('request');
            emitters.shift()(stream);
          });

          return stream;
        };
      });

      afterEach(function() {
        if (setTimeoutSpy) {
          setTimeoutSpy.restore();
        }
      });

      it('should do a retry the stream is interrupted', function(done) {
        emitters = [
          function(stream) {
            stream.emit('error', makeRetryableError());
            stream.end();
          },
          function(stream) {
            stream.end();
          },
        ];
        callCreateReadStream(null, () => {
          assert.strictEqual(reqOptsCalls.length, 2);
          done();
        });
      });

      it('should not retry CANCELLED errors', function(done) {
        emitters = [
          function(stream) {
            const cancelledError: any = new Error('do not retry me!');
            cancelledError.code = 1;
            stream.emit('error', cancelledError);
            stream.end();
          },
        ];
        callCreateReadStream(null, () => {
          assert.strictEqual(reqOptsCalls.length, 1);
          done();
        });
      });

      it('should have a range which starts after the last read key', function(done) {
        emitters = [
          function(stream) {
            stream.push([{key: 'a'}]);
            stream.emit('error', makeRetryableError());
          },
          function(stream) {
            stream.end();
          },
        ];

        callCreateReadStream(null, () => {
          assert.strictEqual(reqOptsCalls[0].rows, undefined);
          assert.deepStrictEqual(reqOptsCalls[1].rows, {
            rowRanges: [{start: 'a', startInclusive: false}],
          });
          done();
        });
      });

      it('should move the active range start to after the last read key', function(done) {
        emitters = [
          function(stream) {
            stream.push([{key: 'a'}]);
            stream.emit('error', makeRetryableError());
          },
          function(stream) {
            stream.end();
          },
        ];

        callCreateReadStream({ranges: [{start: 'a'}]}, () => {
          assert.deepStrictEqual(reqOptsCalls[0].rows, {
            rowRanges: [{start: 'a', startInclusive: true}],
          });
          assert.deepStrictEqual(reqOptsCalls[1].rows, {
            rowRanges: [{start: 'a', startInclusive: false}],
          });
          done();
        });
      });

      it('should remove ranges which were already read', function(done) {
        emitters = [
          function(stream) {
            stream.push([{key: 'a'}]);
            stream.push([{key: 'b'}]);
            stream.emit('error', makeRetryableError());
          },
          function(stream) {
            stream.push([{key: 'c'}]);
            stream.end();
          },
        ];

        const options = {
          ranges: [{start: 'a', end: 'b'}, {start: 'c'}],
        };

        callCreateReadStream(options, () => {
          const allRanges = [
            {start: 'a', end: 'b', startInclusive: true},
            {start: 'c', startInclusive: true},
          ];
          assert.deepStrictEqual(reqOptsCalls[0].rows, {
            rowRanges: allRanges,
          });
          assert.deepStrictEqual(reqOptsCalls[1].rows, {
            rowRanges: allRanges.slice(1),
          });
          done();
        });
      });

      it('should remove the keys which were already read', function(done) {
        emitters = [
          function(stream) {
            stream.push([{key: 'a'}]);
            stream.emit('error', makeRetryableError());
          },
          function(stream) {
            stream.end([{key: 'c'}]);
          },
        ];

        callCreateReadStream({keys: ['a', 'b']}, () => {
          assert.strictEqual(reqOptsCalls[0].rows.rowKeys.length, 2);
          assert.strictEqual(reqOptsCalls[1].rows.rowKeys.length, 1);
          done();
        });
      });

      it('should remove `keys` if they were all read', function(done) {
        emitters = [
          function(stream) {
            stream.push([{key: 'a'}]);
            stream.emit('error', makeRetryableError());
          },
          function(stream) {
            stream.push([{key: 'c'}]);
            stream.end();
          },
        ];

        callCreateReadStream({keys: ['a']}, () => {
          assert.strictEqual(reqOptsCalls[0].rows.rowKeys.length, 1);
          assert.strictEqual(reqOptsCalls[1].rows.rowKeys, undefined);
          done();
        });
      });
    });
  });

  describe('delete', function() {
    it('should make the correct request', function(done) {
      table.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'deleteTable');

        assert.deepStrictEqual(config.reqOpts, {
          name: table.name,
        });

        assert.deepStrictEqual(config.gaxOpts, {});

        callback(); // done()
      };

      table.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      table.delete(gaxOptions, assert.ifError);
    });
  });

  describe('deleteRows', function() {
    const prefix = 'a';

    it('should provide the proper request options', function(done) {
      table.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'dropRowRange');
        assert.strictEqual(config.reqOpts.name, TABLE_NAME);
        assert.deepStrictEqual(config.gaxOpts, {});
        callback();
      };

      table.deleteRows(prefix, done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      table.deleteRows(prefix, gaxOptions, assert.ifError);
    });

    it('should respect the row key prefix option', function(done) {
      const fakePrefix = 'b';

      const spy = ((FakeMutation as any).convertToBytes = sinon.spy(
        () => fakePrefix
      ));

      table.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.rowKeyPrefix, fakePrefix);
        assert.strictEqual(spy.callCount, 1);
        assert.strictEqual((spy as any).getCall(0).args[0], prefix);
        done();
      };

      table.deleteRows(prefix, assert.ifError);
    });

    it('should throw if prefix is not provided', function() {
      assert.throws(function() {
        (table as any).deleteRows(assert.ifError);
      }, /A prefix is required for deleteRows\./);
    });
  });

  describe('exists', function() {
    it('should not require gaxOptions', function(done) {
      table.getMetadata = function(options_) {
        assert.deepStrictEqual(options_.gaxOptions, {});
        done();
      };
      table.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', function(done) {
      const gaxOptions = {};
      table.getMetadata = function(options_) {
        assert.strictEqual(options_.gaxOptions, gaxOptions);
        done();
      };
      table.exists(gaxOptions, assert.ifError);
    });

    it('should pass view = name to getMetadata', function(done) {
      const gaxOptions = {};
      table.getMetadata = function(options_) {
        assert.strictEqual(options_.view, 'name');
        done();
      };
      table.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', function(done) {
      const error: any = new Error('Error.');
      error.code = 5;
      table.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };
      table.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if code is not 5', function(done) {
      const error: any = new Error('Error.');
      error.code = 'NOT-5';
      table.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };
      table.exists(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', function(done) {
      table.getMetadata = function(gaxOptions, callback) {
        callback(null, {});
      };

      table.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('family', function() {
    const FAMILY_ID = 'test-family';

    it('should throw if an id is not provided', function() {
      assert.throws(function() {
        (table as any).family();
      }, /A family id must be provided\./);
    });

    it('should create a family with the proper arguments', function() {
      const family: any = table.family(FAMILY_ID);
      assert(family instanceof FakeFamily);
      assert.strictEqual(family.calledWith_[0], table);
      assert.strictEqual(family.calledWith_[1], FAMILY_ID);
    });
  });

  describe('get', function() {
    it('should call getMetadata', function(done) {
      const options = {
        gaxOptions: {},
      };

      table.getMetadata = function(options_) {
        assert.strictEqual(options_.gaxOptions, options.gaxOptions);
        done();
      };

      table.get(options, assert.ifError);
    });

    it('should not require an options object', function(done) {
      table.getMetadata = function(options) {
        assert.deepStrictEqual(options, {gaxOptions: undefined});
        done();
      };
      table.get(assert.ifError);
    });

    it('should auto create with error code 5', function(done) {
      const error: any = new Error('Error.');
      error.code = 5;

      const options = {
        autoCreate: true,
        gaxOptions: {},
      };

      table.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      table.create = function(options_, callback) {
        assert.strictEqual(options_.gaxOptions, options.gaxOptions);
        callback(); // done()
      };

      table.get(options, done);
    });

    it('should not auto create without error code 5', function(done) {
      const error: any = new Error('Error.');
      error.code = 'NOT-5';

      const options = {
        autoCreate: true,
      };

      table.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      table.create = function() {
        throw new Error('Should not create.');
      };

      table.get(options, function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should not auto create unless requested', function(done) {
      const error: any = new Error('Error.');
      error.code = 5;

      table.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      table.create = function() {
        throw new Error('Should not create.');
      };

      table.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an error from getMetadata', function(done) {
      const error = new Error('Error.');

      table.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      table.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      const apiResponse = {};

      table.getMetadata = function(gaxOptions, callback) {
        callback(null, apiResponse);
      };

      table.get(function(err, table_, apiResponse_) {
        assert.ifError(err);
        assert.strictEqual(table_, table);
        assert.strictEqual(apiResponse_, apiResponse);
        done();
      });
    });
  });

  describe('getIamPolicy', () => {
    it('should provide the proper request options', done => {
      table.bigtable.request = config => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'getIamPolicy');
        assert.strictEqual(config.reqOpts.resource, table.name);
        assert.strictEqual(config.reqOpts.requestedPolicyVersion, undefined);
        assert.strictEqual(config.gaxOpt, undefined);
        done();
      };
      table.getIamPolicy(assert.ifError);
    });

    it('should accept options', done => {
      const requestedPolicyVersion = 0;
      const gaxOptions = {};
      const options = {gaxOptions, requestedPolicyVersion};

      table.bigtable.request = config => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        assert.strictEqual(
          config.reqOpts.options.requestedPolicyVersion,
          requestedPolicyVersion
        );
        done();
      };
      table.getIamPolicy(options, assert.ifError);
    });

    it('should return error', done => {
      const error = new Error('error');
      table.bigtable.request = (config, callback) => {
        callback(error);
      };
      table.getIamPolicy(err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should call decodePolicyEtag', () => {
      table.bigtable.request = (config, callback) => {
        callback(null, {});
      };
      const spy = sandbox.stub(Table, 'decodePolicyEtag');
      table.getIamPolicy(assert.ifError);
      assert.strictEqual(spy.calledOnce, true);
      spy.restore();
    });
  });

  describe('getReplicationStates', function() {
    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.getMetadata = function(options) {
        assert.strictEqual(options.gaxOptions, gaxOptions);
        done();
      };

      table.getReplicationStates(gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      const error = new Error('err');
      const response = {};

      table.getMetadata = function(options, callback) {
        callback(error, response);
      };

      table.getReplicationStates(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return a map of cluster states', function(done) {
      const response = {
        clusterStates: {
          cluster1: 'READY',
          cluster2: 'INITIALIZING',
        },
      };

      table.getMetadata = function(options, callback) {
        callback(null, response);
      };

      table.getReplicationStates(function(err, clusterStates) {
        assert.ifError(err);

        assert(clusterStates instanceof Map);
        assert.strictEqual(clusterStates.size, 2);
        assert.strictEqual(clusterStates.get('cluster1'), 'READY');
        assert.strictEqual(clusterStates.get('cluster2'), 'INITIALIZING');

        done();
      });
    });
  });

  describe('getFamilies', function() {
    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.getMetadata = function(options) {
        assert.strictEqual(options.gaxOptions, gaxOptions);
        done();
      };

      table.getFamilies(gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      const error = new Error('err');
      const response = {};

      table.getMetadata = function(options, callback) {
        callback(error, response);
      };

      table.getFamilies(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of Family objects', function(done) {
      const metadata = {
        a: 'b',
      };

      const response = {
        columnFamilies: {
          test: metadata,
        },
      };

      const fakeFamily = {} as Family;

      table.getMetadata = function(options, callback) {
        callback(null, response);
      };

      sandbox.stub(table, 'family').callsFake(id => {
        assert.strictEqual(id, 'test');
        return fakeFamily;
      });

      table.getFamilies(function(err, families, apiResponse) {
        assert.ifError(err);

        const family = families[0];
        assert.strictEqual(family, fakeFamily);
        assert.strictEqual(family.metadata, metadata);

        assert.strictEqual(apiResponse, response.columnFamilies);

        done();
      });
    });
  });

  describe('waitForReplication', () => {
    it('should return the error to the callback', function(done) {
      const error = new Error('err');

      table.bigtable.request = function(config, callback) {
        callback(error);
      };

      table.waitForReplication(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should call checkConsistency', done => {
      const consistencyToken = 'sample-token12345';

      table.generateConsistencyToken = function(callback) {
        callback(null, consistencyToken);
      };

      table.checkConsistency = function(token, callback) {
        assert.strictEqual(token, consistencyToken);
        callback(null, true);
      };

      table.waitForReplication(done);
    });

    describe('retries', () => {
      let clock;
      let setTimeoutSpy;
      let clearTimeoutSpy;
      let checkConsistencySpy;
      let responses: any[] = [];

      beforeEach(() => {
        clock = sinon.useFakeTimers({
          toFake: ['setTimeout', 'clearTimeout'],
        });
        setTimeoutSpy = sinon.spy(global, 'setTimeout');
        clearTimeoutSpy = sinon.spy(global, 'clearTimeout');
        checkConsistencySpy = sinon.spy(table, 'checkConsistency');

        table.bigtable.request = function(config, callback) {
          responses.shift()(config, callback);
        };
      });

      afterEach(() => {
        clock.restore();
      });

      it('should return true if token is consistent', done => {
        responses = [
          (config, callback) =>
            callback(null, {consistencyToken: 'sample-token12345'}),
          (config, callback) => callback(null, {consistent: true}),
        ];

        table.waitForReplication(function(err, res) {
          // Checks that a 10 minute timer was set.
          setTimeoutSpy.calledWith(sinon.match.func, 10 * 60 * 1000);

          // check checkConsistencySpy called for first time
          assert.strictEqual(checkConsistencySpy.callCount, 1);

          // Checks that clearInterval was called.
          assert.strictEqual(clearTimeoutSpy.callCount, 1);

          assert.strictEqual(res, true);
          assert.ifError(err);
          done();
        });

        clock.runAll();
      });

      it('should retry checkConsistency', done => {
        responses = [
          (config, callback) =>
            callback(null, {consistencyToken: 'sample-token12345'}),
          (config, callback) => callback(null, {consistent: false}),
          (config, callback) => callback(null, {consistent: true}),
        ];

        table.waitForReplication(function(err, response) {
          // Checks that a 10 minute timer was set.
          setTimeoutSpy.calledWith(sinon.match.func, 10 * 60 * 1000);

          // check checkConsistencySpy called for first time
          checkConsistencySpy.callOnce;

          setTimeoutSpy.calledWith(sinon.match.func, 5000);

          // check checkConsistencySpy called twice after 5seconds
          clock.tick(5010);
          assert.strictEqual(checkConsistencySpy.callCount, 2);

          // Checks that clearInterval was called.
          setTimeoutSpy.called;
          assert.ifError(err);
          assert.strictEqual(response, true);
          done();
        });

        clock.runAll();
      });

      it('should return false after 10 min if inconsistency repeats', done => {
        table.bigtable.request = function(config, callback) {
          if (config.method === 'generateConsistencyToken') {
            return callback(null, {consistencyToken: 'sample-token12345'});
          }
          if (config.method === 'checkConsistency') {
            return callback(null, {consistent: false});
          }
        };

        table.waitForReplication(function(err, response) {
          assert.ifError(err);
          setTimeoutSpy.called;
          assert.strictEqual(response, false);
          done();
        });

        clock.runAll();
      });

      it('should return error if checkonsistency returns error', done => {
        const error = new Error('consistency-check error');

        responses = [
          (config, callback) =>
            callback(null, {consistencyToken: 'sample-token12345'}),
          (config, callback) => callback(error),
        ];

        table.waitForReplication((err, res) => {
          clearTimeoutSpy.called;
          assert.strictEqual(checkConsistencySpy.callCount, 1);
          assert.strictEqual(err, error);
          assert.strictEqual(res, undefined);
          done();
        });
      });
    });
  });

  describe('generateConsistencyToken', function() {
    it('should provide proper request options', function(done) {
      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'generateConsistencyToken');
        assert.strictEqual(config.reqOpts.name, table.name);
        done();
      };
      table.generateConsistencyToken(assert.ifError);
    });

    it('should return a consistencyToken', function(done) {
      const cToken = 'sample-token-123456';
      const response = {
        consistencyToken: cToken,
      };

      table.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      table.generateConsistencyToken(function(err, token) {
        assert.ifError(err);
        assert.strictEqual(token, cToken);
        done();
      });
    });

    it('should return error', function(done) {
      const error = new Error('err');
      table.bigtable.request = function(config, callback) {
        callback(error);
      };

      table.generateConsistencyToken(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });
  });

  describe('checkConsistency', function() {
    it('should provide the proper request options', function(done) {
      const cToken = 'consistency-token-123';

      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'checkConsistency');
        assert.strictEqual(config.reqOpts.name, table.name);
        assert.strictEqual(config.reqOpts.consistencyToken, cToken);
        done();
      };

      table.checkConsistency(cToken, assert.ifError);
    });

    describe('error', function() {
      const error = new Error('err');

      it('should return the error to the callback', function(done) {
        table.bigtable.request = function(config, callback) {
          callback(error);
        };

        table.checkConsistency('cToken', function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });
    });

    describe('success', function() {
      it('should return true if consistent', function(done) {
        table.bigtable.request = function(config, callback) {
          callback(null, {consistent: true});
        };

        table.checkConsistency('', function(err, resp) {
          assert.ifError(err);
          assert.strictEqual(resp, true);
          done();
        });
      });

      it('should return false if not consistent', function(done) {
        table.bigtable.request = function(config, callback) {
          callback(null, {consistent: false});
        };
        table.checkConsistency('', function(err, resp) {
          assert.ifError(err);
          assert.strictEqual(resp, false);
          done();
        });
      });
    });
  });

  describe('getMetadata', function() {
    const views = {
      unspecified: 0,
      name: 1,
      schema: 2,
      full: 4,
    };
    beforeEach(function() {
      (Table as any).VIEWS = views;
    });

    it('should provide the proper request options', function(done) {
      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'getTable');

        assert.strictEqual(config.reqOpts.name, table.name);
        assert.strictEqual(config.reqOpts.view, views.unspecified);

        assert.strictEqual(config.gaxOpts, undefined);

        done();
      };

      table.getMetadata(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      const options = {
        gaxOptions: {},
      };

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      table.getMetadata(options, assert.ifError);
    });

    Object.keys(views).forEach(function(view) {
      it('should set the "' + view + '" view', function(done) {
        const options = {
          view,
        };

        table.bigtable.request = function(config) {
          assert.strictEqual(config.reqOpts.view, views[view]);
          done();
        };

        table.getMetadata(options, assert.ifError);
      });
    });

    it('should update the metadata', function(done) {
      const response = {};

      table.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      table.getMetadata(function(err, metadata) {
        assert.ifError(err);
        assert.strictEqual(metadata, response);
        assert.strictEqual(table.metadata, response);
        done();
      });
    });

    it('should execute callback with original arguments', function(done) {
      const args = [{}, {}, {}];

      table.bigtable.request = function(config, callback) {
        callback.apply(null, args);
      };

      table.getMetadata(function() {
        assert.deepStrictEqual([].slice.call(arguments), args);
        done();
      });
    });
  });

  describe('getRows', function() {
    describe('success', function() {
      const fakeRows = [
        {key: 'c', data: {}},
        {key: 'd', data: {}},
      ];

      beforeEach(function() {
        table.createReadStream = sinon.spy(function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            fakeRows.forEach(function(row) {
              stream.push(row);
            });

            stream.push(null);
          });

          return stream;
        });
      });

      it('should return the rows to the callback', function(done) {
        const options = {};

        table.getRows(options, function(err, rows) {
          assert.ifError(err);
          assert.deepStrictEqual(rows, fakeRows);

          const spy = (table as any).createReadStream.getCall(0);
          assert.strictEqual(spy.args[0], options);
          done();
        });
      });

      it('should optionally accept options', function(done) {
        table.getRows(function(err, rows) {
          assert.ifError(err);
          assert.deepStrictEqual(rows, fakeRows);
          done();
        });
      });
    });

    describe('error', function() {
      const error = new Error('err');

      beforeEach(function() {
        table.createReadStream = sinon.spy(function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            stream.emit('error', error);
          });

          return stream;
        });
      });

      it('should return the error to the callback', function(done) {
        table.getRows(function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });
    });
  });

  describe('insert', function() {
    it('should create an "insert" mutation', function(done) {
      const fakeEntries = [
        {
          key: 'a',
          data: {},
        },
        {
          key: 'b',
          data: {},
        },
      ];

      table.mutate = function(entries, options, callback) {
        assert.deepStrictEqual(entries[0], {
          key: fakeEntries[0].key,
          data: fakeEntries[0].data,
          method: FakeMutation.methods.INSERT,
        });

        assert.deepStrictEqual(entries[1], {
          key: fakeEntries[1].key,
          data: fakeEntries[1].data,
          method: FakeMutation.methods.INSERT,
        });

        callback();
      };

      table.insert(fakeEntries, done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.mutate = function(entries, options) {
        assert.strictEqual(options.gaxOptions, gaxOptions);
        done();
      };

      table.insert([], gaxOptions, assert.ifError);
    });
  });

  describe('mutate', function() {
    const entries = [{}, {}];
    const fakeEntries = [{}, {}];
    let parseSpy;

    beforeEach(function() {
      parseSpy = FakeMutation.parse = sinon.spy(function(value) {
        const entryIndex = entries.indexOf(value);
        return fakeEntries[entryIndex];
      });
    });

    it('should provide the proper request options', function(done) {
      const stream = through.obj();

      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableClient');
        assert.strictEqual(config.method, 'mutateRows');

        assert.strictEqual(config.reqOpts.tableName, TABLE_NAME);
        assert.strictEqual(config.reqOpts.appProfileId, undefined);
        assert.deepStrictEqual(config.reqOpts.entries, fakeEntries);

        assert.strictEqual(parseSpy.callCount, 2);
        assert.strictEqual(parseSpy.getCall(0).args[0], entries[0]);
        assert.strictEqual(parseSpy.getCall(1).args[0], entries[1]);

        setImmediate(done);

        return stream;
      };

      table.mutate(entries, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      table.mutate(entries, {gaxOptions}, assert.ifError);
    });

    it('should use an appProfileId', function(done) {
      const bigtableInstance = table.bigtable;
      bigtableInstance.appProfileId = 'app-profile-id-12345';

      bigtableInstance.request = function(config) {
        assert.strictEqual(
          config.reqOpts.appProfileId,
          bigtableInstance.appProfileId
        );
        done();
      };

      table.mutate(done);
    });

    it('should parse the mutations', function(done) {
      table.bigtable.request = function() {
        assert.strictEqual(FakeMutation.parse.called, true);
        done();
      };

      table.mutate(entries, done);
    });

    it('should allow raw mutations', function(done) {
      table.bigtable.request = function() {
        assert.strictEqual(FakeMutation.parse.called, false);
        done();
      };

      table.mutate(entries, {rawMutation: true}, done);
    });

    describe('error', function() {
      describe('pre-request errors', function() {
        const error = new Error('Error.');

        beforeEach(function() {
          table.bigtable.request = function() {
            const stream = new PassThrough({
              objectMode: true,
            });

            setImmediate(function() {
              stream.emit('error', error);
            });

            return stream;
          };
        });

        it('should return error', function(done) {
          table.mutate(entries, function(err) {
            assert.strictEqual(err, error);
            done();
          });
        });
      });

      describe('API errors', function() {
        const error = new Error('err');

        beforeEach(function() {
          table.bigtable.request = function() {
            const stream = new PassThrough({
              objectMode: true,
            });

            setImmediate(function() {
              stream.emit('request');
              stream.emit('error', error);
            });

            return stream;
          };
        });

        it('should return the error to the callback', function(done) {
          table.maxRetries = 0;
          table.mutate(entries, function(err) {
            assert.strictEqual(err, error);
            done();
          });
        });
      });

      describe('mutation errors', function() {
        const fakeStatuses = [
          {
            index: 0,
            status: {
              code: 1,
            },
          },
          {
            index: 1,
            status: {
              code: 1,
            },
          },
        ];

        const parsedStatuses = [{} as DecoratedStatus, {} as DecoratedStatus];

        beforeEach(function() {
          table.bigtable.request = function() {
            const stream = through.obj();

            stream.push({entries: fakeStatuses});

            setImmediate(function() {
              stream.end();
            });

            return stream;
          };

          let statusCount = 0;
          sandbox.stub(ds, 'decorateStatus').callsFake(status => {
            assert.strictEqual(status, fakeStatuses[statusCount].status);
            return parsedStatuses[statusCount++];
          });
        });

        it('should return a PartialFailureError', function(done) {
          table.mutate(entries, function(err) {
            assert.strictEqual(err.name, 'PartialFailureError');

            assert.deepStrictEqual(err.errors, [
              Object.assign(
                {
                  entry: entries[0],
                },
                parsedStatuses[0]
              ),

              Object.assign(
                {
                  entry: entries[1],
                },
                parsedStatuses[1]
              ),
            ]);

            done();
          });
        });
      });
    });

    describe('success', function() {
      const fakeStatuses = [
        {
          status: {
            code: 0,
          },
        },
        {
          status: {
            code: 0,
          },
        },
      ];

      beforeEach(function() {
        table.bigtable.request = function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            stream.emit('request');
            stream.end({entries: fakeStatuses});
          });

          return stream;
        };
      });

      it('should execute callback', function(done) {
        table.maxRetries = 0;
        table.mutate(entries, done);
      });
    });

    describe('retries', function() {
      let fakeStatuses;
      let entryRequests;

      beforeEach(function() {
        entryRequests = [];
        fakeStatuses = [
          [
            {
              index: 0,
              status: {
                code: 0,
              },
            },
            {
              index: 1,
              status: {
                code: 4,
              },
            },
          ],
          [
            {
              index: 0,
              status: {
                code: 0,
              },
            },
          ],
        ];
        sandbox.stub(ds, 'decorateStatus').returns({} as DecoratedStatus);
        table.bigtable.request = function(config) {
          entryRequests.push(config.reqOpts.entries);
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            stream.emit('request');
            stream.end({entries: fakeStatuses.shift()});
          });

          return stream;
        };
      });

      it('should succeed after a retry', function(done) {
        table.maxRetries = 1;
        table.mutate(entries, done);
      });

      it('should retry the same failed entry', function(done) {
        table.maxRetries = 1;
        table.mutate(entries, function() {
          assert.strictEqual(entryRequests[0].length, 2);
          assert.strictEqual(entryRequests[1].length, 1);
          assert.strictEqual(entryRequests[0][1], entryRequests[1][0]);
          done();
        });
      });
    });
  });

  describe('row', function() {
    const KEY = 'test-row';

    it('should throw if a key is not provided', function() {
      assert.throws(function() {
        (table as any).row();
      }, /A row key must be provided\./);
    });

    it('should return a Row object', function() {
      const row: any = table.row(KEY);
      assert(row instanceof FakeRow);
      assert.strictEqual(row.calledWith_[0], table);
      assert.strictEqual(row.calledWith_[1], KEY);
    });
  });

  describe('sampleRowKeys', function() {
    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.sampleRowKeysStream = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      table.sampleRowKeys(gaxOptions);
    });

    describe('success', function() {
      const fakeKeys = [
        {
          key: 'a',
          offset: 10,
        },
        {
          key: 'b',
          offset: 20,
        },
      ];

      beforeEach(function() {
        table.sampleRowKeysStream = sinon.spy(function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            fakeKeys.forEach(function(key) {
              stream.push(key);
            });

            stream.push(null);
          });

          return stream;
        });
      });

      it('should return the keys to the callback', function(done) {
        table.sampleRowKeys(function(err, keys) {
          assert.ifError(err);
          assert.deepStrictEqual(keys, fakeKeys);
          done();
        });
      });
    });

    describe('error', function() {
      const error = new Error('err');

      beforeEach(function() {
        table.sampleRowKeysStream = sinon.spy(function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            stream.emit('error', error);
          });

          return stream;
        });
      });

      it('should return the error to the callback', function(done) {
        table.sampleRowKeys(function(err) {
          assert.strictEqual(err, error);
          done();
        });
      });
    });
  });

  describe('sampleRowKeysStream', function() {
    it('should provide the proper request options', function(done) {
      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableClient');
        assert.strictEqual(config.method, 'sampleRowKeys');
        assert.strictEqual(config.reqOpts.tableName, TABLE_NAME);
        assert.strictEqual(config.gaxOpts, undefined);

        setImmediate(done);

        return new PassThrough({
          objectMode: true,
        });
      };

      table.sampleRowKeysStream();
    });

    it('should use an appProfileId', function(done) {
      const bigtableInstance = table.bigtable;
      bigtableInstance.appProfileId = 'app-profile-id-12345';

      bigtableInstance.request = function(config) {
        assert.strictEqual(
          config.reqOpts.appProfileId,
          bigtableInstance.appProfileId
        );
        done();
      };

      table.sampleRowKeysStream(done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);

        setImmediate(done);

        return new PassThrough({
          objectMode: true,
        });
      };

      table.sampleRowKeysStream(gaxOptions);
    });

    describe('success', function() {
      const fakeKeys = [
        {
          rowKey: 'a',
          offsetBytes: 10,
        },
        {
          rowKey: 'b',
          offsetByte: 20,
        },
      ];

      beforeEach(function() {
        table.bigtable.request = function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            fakeKeys.forEach(function(key) {
              stream.push(key);
            });

            stream.push(null);
          });

          return stream;
        };
      });

      it('should stream key objects', function(done) {
        const keys: any[] = [];

        table
          .sampleRowKeysStream()
          .on('error', done)
          .on('data', function(key) {
            keys.push(key);
          })
          .on('end', function() {
            assert.strictEqual(keys[0].key, fakeKeys[0].rowKey);
            assert.strictEqual(keys[0].offset, fakeKeys[0].offsetBytes);
            assert.strictEqual(keys[1].key, fakeKeys[1].rowKey);
            assert.strictEqual(keys[1].offset, fakeKeys[1].offsetBytes);
            done();
          });
      });
    });

    describe('error', function() {
      const error = new Error('err');

      beforeEach(function() {
        table.bigtable.request = function() {
          const stream = new PassThrough({
            objectMode: true,
          });

          setImmediate(function() {
            stream.emit('error', error);
          });

          return stream;
        };
      });

      it('should emit an error event', function(done) {
        table
          .sampleRowKeysStream()
          .on('error', function(err) {
            assert.strictEqual(err, error);
            done();
          })
          .on('data', done);
      });
    });
  });

  describe('setIamPolicy', () => {
    const policy = {};
    it('should provide the proper request options', done => {
      table.bigtable.request = config => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'setIamPolicy');
        assert.strictEqual(config.reqOpts.resource, table.name);
        assert.strictEqual(config.reqOpts.policy, policy);
        assert.strictEqual(config.gaxOpt, undefined);
        done();
      };
      table.setIamPolicy(policy, assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      table.bigtable.request = config => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      table.setIamPolicy(policy, gaxOptions, assert.ifError);
    });

    it('should pass policy to bigtable.request', done => {
      const policy: tblTypes.Policy = {
        bindings: [
          {
            role: 'roles/bigtable.viewer',
            members: ['user:mike@example.com', 'group:admins@example.com'],
            condition: {
              title: 'expirable access',
              description: 'Does not grant access after Sep 2020',
              expression: "request.time <timestamp('2020-10-01T00:00:00.000Z')",
            },
          },
        ],
      };

      table.bigtable.request = config => {
        assert.strictEqual(config.reqOpts.policy, policy);
        done();
      };
      table.setIamPolicy(policy, assert.ifError);
    });

    it('should encode policy etag', done => {
      const policy = {etag: 'ABS'};
      table.bigtable.request = config => {
        assert.deepStrictEqual(
          config.reqOpts.policy.etag,
          Buffer.from(policy.etag)
        );
        done();
      };
      table.setIamPolicy(policy, assert.ifError);
    });

    it('should return error', done => {
      const error = new Error('error');
      table.bigtable.request = (config, callback) => {
        callback(error);
      };
      table.setIamPolicy(policy, err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should call decodePolicyEtag', () => {
      table.bigtable.request = (config, callback) => {
        callback(null, {});
      };
      const spy = sandbox.stub(Table, 'decodePolicyEtag');
      table.setIamPolicy(policy, assert.ifError);
      assert.strictEqual(spy.calledOnce, true);
    });
  });

  describe('testIamPermissions', () => {
    const permissions = 'bigtable.tables.get';
    it('should provide the proper request options', done => {
      table.bigtable.request = config => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'testIamPermissions');
        assert.strictEqual(config.reqOpts.resource, table.name);
        assert.deepStrictEqual(config.reqOpts.permissions, [permissions]);
        assert.strictEqual(config.gaxOpt, undefined);
        done();
      };
      table.testIamPermissions(permissions, assert.ifError);
    });

    it('should accept permissions as array', done => {
      const permissions = [`bigtable.tables.get`, `bigtable.tables.list`];
      table.bigtable.request = config => {
        assert.deepStrictEqual(config.reqOpts.permissions, permissions);
        done();
      };
      table.testIamPermissions(permissions, assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};
      table.bigtable.request = config => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };
      table.testIamPermissions(permissions, gaxOptions, assert.ifError);
    });

    it('should unpack permissions from resp object', done => {
      const testPermissions = [`bigtable.tables.get`, `bigtable.tables.list`];
      table.bigtable.request = (config, callback) => {
        callback(null, {permissions: testPermissions});
      };
      table.testIamPermissions(testPermissions, (err, permissions) => {
        assert.ifError(err);
        assert.strictEqual(Array.isArray(permissions), true);
        assert.deepStrictEqual(permissions, testPermissions);
        done();
      });
    });

    it('should return error', done => {
      const permission = 'bigtable.tables.get';
      const error = new Error('error');
      table.bigtable.request = (config, callback) => {
        callback(error);
      };
      table.testIamPermissions(permission, (err, resp) => {
        assert.strictEqual(err, error);
        done();
      });
    });
  });

  describe('decodePolicyEtag', () => {
    it('should return policy with etag decoded to string', () => {
      const etagString = 'ABC';
      const policy = {
        etag: Buffer.from(etagString),
      };
      assert.strictEqual(Table.decodePolicyEtag(policy).etag, etagString);
    });
  });

  describe('truncate', function() {
    it('should provide the proper request options', function(done) {
      table.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'dropRowRange');
        assert.strictEqual(config.reqOpts.name, TABLE_NAME);
        assert.strictEqual(config.reqOpts.deleteAllDataFromTable, true);
        assert.deepStrictEqual(config.gaxOpts, {});
        callback();
      };

      table.truncate(done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      table.truncate(gaxOptions, assert.ifError);
    });
  });
});
