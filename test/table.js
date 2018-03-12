/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var assert = require('assert');
var Buffer = require('buffer').Buffer;
var extend = require('extend');
var nodeutil = require('util');
var proxyquire = require('proxyquire');
var pumpify = require('pumpify');
var sinon = require('sinon').sandbox.create();
var Stream = require('stream').PassThrough;
var through = require('through2');

var common = require('@google-cloud/common');
var commonGrpc = require('@google-cloud/common-grpc');
var Family = require('../src/family.js');
var Mutation = require('../src/mutation.js');
var Row = require('../src/row.js');
var ChunkTransformer = require('../src/chunktransformer.js');

var promisified = false;
var fakeUtil = extend({}, common.util, {
  promisifyAll: function(Class, options) {
    if (Class.name !== 'Table') {
      return;
    }

    promisified = true;
    assert.deepEqual(options.exclude, ['family', 'row']);
  },
});

function createFake(Class) {
  function Fake() {
    this.calledWith_ = arguments;
    Class.apply(this, arguments);
  }
  nodeutil.inherits(Fake, Class);
  return Fake;
}

var FakeGrpcService = createFake(commonGrpc.Service);
var FakeFamily = createFake(Family);

FakeFamily.formatRule_ = sinon.spy(function(rule) {
  return rule;
});

var FakeRow = createFake(Row);

FakeRow.formatChunks_ = sinon.spy(function(chunks) {
  return chunks;
});

var FakeChunkTransformer = createFake(ChunkTransformer);
FakeChunkTransformer.prototype._transform = function(rows, enc, next) {
  rows.forEach(row => this.push(row));
  next();
};

var FakeMutation = {
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

var FakeFilter = {
  parse: sinon.spy(function(value) {
    return value;
  }),
};

describe('Bigtable/Table', function() {
  var TABLE_ID = 'my-table';
  var INSTANCE = {
    bigtable: {},
    id: 'a/b/c/d',
  };

  var TABLE_NAME = INSTANCE.id + '/tables/' + TABLE_ID;

  var Table;
  var table;

  before(function() {
    Table = proxyquire('../src/table.js', {
      '@google-cloud/common': {
        util: fakeUtil,
      },
      '@google-cloud/common-grpc': {
        Service: FakeGrpcService,
      },
      './family.js': FakeFamily,
      './mutation.js': FakeMutation,
      './filter.js': FakeFilter,
      pumpify: pumpify,
      './row.js': FakeRow,
      './chunktransformer.js': FakeChunkTransformer,
    });
  });

  beforeEach(function() {
    table = new Table(INSTANCE, TABLE_ID);
  });

  afterEach(function() {
    Object.keys(FakeMutation).forEach(function(spy) {
      if (FakeMutation[spy].reset) {
        FakeMutation[spy].resetHistory();
      }
    });

    FakeFilter.parse.resetHistory();
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
      assert.strictEqual(table.id, TABLE_NAME);
    });

    it('should localize table name', function() {
      assert.strictEqual(table.name, TABLE_ID);
    });
  });

  describe('VIEWS', function() {
    var views = {
      unspecified: 0,
      name: 1,
      schema: 2,
      full: 4,
    };

    it('should export the table views', function() {
      assert.deepEqual(views, Table.VIEWS);
    });
  });

  describe('formatName_', function() {
    it('should format the table name to include the cluster name', function() {
      var tableName = Table.formatName_(INSTANCE.id, TABLE_ID);
      assert.strictEqual(tableName, TABLE_NAME);
    });

    it('should not re-format the table name', function() {
      var tableName = Table.formatName_(INSTANCE.id, TABLE_NAME);
      assert.strictEqual(tableName, TABLE_NAME);
    });
  });

  describe('create', function() {
    it('should call createTable from instance', function(done) {
      var options = {};

      table.instance.createTable = function(name, options_, callback) {
        assert.strictEqual(name, table.name);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      table.create(options, done);
    });

    it('should not require options', function(done) {
      table.instance.createTable = function(name, options, callback) {
        assert.deepStrictEqual(options, {});
        callback(); // done()
      };

      table.create(done);
    });
  });

  describe('createPrefixRange_', function() {
    it('should create a range from the prefix', function() {
      assert.deepEqual(Table.createPrefixRange_('start'), {
        start: 'start',
        end: {
          value: 'staru',
          inclusive: false,
        },
      });

      assert.deepEqual(Table.createPrefixRange_('X\xff'), {
        start: 'X\xff',
        end: {
          value: 'Y',
          inclusive: false,
        },
      });

      assert.deepEqual(Table.createPrefixRange_('xoo\xff'), {
        start: 'xoo\xff',
        end: {
          value: 'xop',
          inclusive: false,
        },
      });

      assert.deepEqual(Table.createPrefixRange_('a\xffb'), {
        start: 'a\xffb',
        end: {
          value: 'a\xffc',
          inclusive: false,
        },
      });

      assert.deepEqual(Table.createPrefixRange_('com.google.'), {
        start: 'com.google.',
        end: {
          value: 'com.google/',
          inclusive: false,
        },
      });
    });

    it('should create an inclusive bound when the prefix is empty', function() {
      assert.deepEqual(Table.createPrefixRange_('\xff'), {
        start: '\xff',
        end: {
          value: '',
          inclusive: true,
        },
      });

      assert.deepEqual(Table.createPrefixRange_(''), {
        start: '',
        end: {
          value: '',
          inclusive: true,
        },
      });
    });
  });

  describe('createFamily', function() {
    var COLUMN_ID = 'my-column';

    it('should throw if a name is not provided', function() {
      assert.throws(function() {
        table.createFamily();
      }, /A name is required to create a family\./);
    });

    it('should provide the proper request options', function(done) {
      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'modifyColumnFamilies');

        assert.strictEqual(config.reqOpts.name, TABLE_NAME);
        assert.deepEqual(config.reqOpts.modifications, [
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
      var gaxOptions = {};

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      table.createFamily(COLUMN_ID, {gaxOptions}, assert.ifError);
    });

    it('should respect the gc rule option', function(done) {
      var rule = {
        a: 'a',
        b: 'b',
      };
      var convertedRule = {
        c: 'c',
        d: 'd',
      };

      var spy = (FakeFamily.formatRule_ = sinon.spy(function() {
        return convertedRule;
      }));

      table.bigtable.request = function(config) {
        var modification = config.reqOpts.modifications[0];

        assert.strictEqual(modification.create.gcRule, convertedRule);
        assert.strictEqual(spy.callCount, 1);
        assert.strictEqual(spy.getCall(0).args[0], rule);
        done();
      };

      table.createFamily(COLUMN_ID, {rule}, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var error = new Error('err');
      var response = {};

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
      var response = {
        name: 'response-family-name',
      };
      var fakeFamily = {};

      table.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      table.family = function(name) {
        assert.strictEqual(name, response.name);
        return fakeFamily;
      };

      table.createFamily(COLUMN_ID, function(err, family, apiResponse) {
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
        assert.strictEqual(config.gaxOpts, undefined);
        done();
      };

      table.createReadStream();
    });

    describe('options', function() {
      it('should accept gaxOptions', function(done) {
        var gaxOptions = {};

        table.bigtable.request = function(config) {
          assert.strictEqual(config.gaxOpts, gaxOptions);
          done();
        };

        table.createReadStream({gaxOptions});
      });

      it('should retrieve a range of rows', function(done) {
        var options = {
          start: 'gwashington',
          end: 'alincoln',
        };

        var fakeRange = {
          start: 'a',
          end: 'b',
        };

        var formatSpy = (FakeFilter.createRange = sinon.spy(function() {
          return fakeRange;
        }));

        table.bigtable.request = function(config) {
          assert.deepEqual(config.reqOpts.rows.rowRanges[0], fakeRange);
          assert.strictEqual(formatSpy.callCount, 1);
          assert.deepEqual(formatSpy.getCall(0).args, [
            options.start,
            options.end,
            'Key',
          ]);
          done();
        };

        table.createReadStream(options);
      });

      it('should retrieve multiple rows', function(done) {
        var options = {
          keys: ['gwashington', 'alincoln'],
        };
        var convertedKeys = ['a', 'b'];

        var convertSpy = (FakeMutation.convertToBytes = sinon.spy(function(
          key
        ) {
          var keyIndex = options.keys.indexOf(key);
          return convertedKeys[keyIndex];
        }));

        table.bigtable.request = function(config) {
          assert.deepEqual(config.reqOpts.rows.rowKeys, convertedKeys);
          assert.strictEqual(convertSpy.callCount, 2);
          assert.strictEqual(convertSpy.getCall(0).args[0], options.keys[0]);
          assert.strictEqual(convertSpy.getCall(1).args[0], options.keys[1]);
          done();
        };

        table.createReadStream(options);
      });

      it('should retrieve multiple ranges', function(done) {
        var options = {
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

        var fakeRanges = [
          {
            start: 'e',
            end: 'f',
          },
          {
            start: 'g',
            end: 'h',
          },
        ];

        var formatSpy = (FakeFilter.createRange = sinon.spy(function() {
          return fakeRanges[formatSpy.callCount - 1];
        }));

        table.bigtable.request = function(config) {
          assert.deepEqual(config.reqOpts.rows.rowRanges, fakeRanges);
          assert.strictEqual(formatSpy.callCount, 2);
          assert.deepEqual(formatSpy.getCall(0).args, [
            options.ranges[0].start,
            options.ranges[0].end,
            'Key',
          ]);
          assert.deepEqual(formatSpy.getCall(1).args, [
            options.ranges[1].start,
            options.ranges[1].end,
            'Key',
          ]);
          done();
        };

        table.createReadStream(options);
      });

      it('should parse a filter object', function(done) {
        var options = {
          filter: [{}],
        };

        var fakeFilter = {};

        var parseSpy = (FakeFilter.parse = sinon.spy(function() {
          return fakeFilter;
        }));

        table.bigtable.request = function(config) {
          assert.strictEqual(config.reqOpts.filter, fakeFilter);
          assert.strictEqual(parseSpy.callCount, 1);
          assert.strictEqual(parseSpy.getCall(0).args[0], options.filter);
          done();
        };

        table.createReadStream(options);
      });

      it('should allow setting a row limit', function(done) {
        var options = {
          limit: 10,
        };

        table.bigtable.request = function(config) {
          assert.strictEqual(config.reqOpts.rowsLimit, options.limit);
          done();
        };

        table.createReadStream(options);
      });

      it('should transform the prefix into a range', function(done) {
        var fakeRange = {};
        var fakePrefixRange = {
          start: 'a',
          end: 'b',
        };

        var fakePrefix = 'abc';

        var prefixSpy = (Table.createPrefixRange_ = sinon.spy(function() {
          return fakePrefixRange;
        }));

        var rangeSpy = (FakeFilter.createRange = sinon.spy(function() {
          return fakeRange;
        }));

        table.bigtable.request = function(config) {
          assert.strictEqual(prefixSpy.getCall(0).args[0], fakePrefix);
          assert.deepEqual(config.reqOpts.rows.rowRanges, [fakeRange]);

          assert.deepEqual(rangeSpy.getCall(0).args, [
            fakePrefixRange.start,
            fakePrefixRange.end,
            'Key',
          ]);

          done();
        };

        table.createReadStream({prefix: fakePrefix});
      });
    });

    describe('success', function() {
      var fakeChunks = {
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

      var formattedRows = [{key: 'c', data: {}}, {key: 'd', data: {}}];

      beforeEach(function() {
        sinon.stub(table, 'row').callsFake(function() {
          return {};
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
          var stream = new Stream({
            objectMode: true,
          });

          setImmediate(function() {
            stream.push(fakeChunks);
            stream.push(null);
          });

          return stream;
        };
      });

      it('should stream Row objects', function(done) {
        var rows = [];

        table
          .createReadStream()
          .on('error', done)
          .on('data', function(row) {
            rows.push(row);
          })
          .on('end', function() {
            var rowSpy = table.row;

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
        var rows = [];

        table
          .createReadStream()
          .on('error', done)
          .on('data', function(row) {
            rows.push(row);
            this.end();
          })
          .on('end', function() {
            assert.strictEqual(rows.length, 1);
            done();
          });
      });
    });

    describe('error', function() {
      var error = new Error('err');
      var fakeChunks = {
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
      //     var stream = new Stream({
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
          var stream = new Stream({
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
          var stream = new Stream({
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
          var stream = new Stream({
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
      var callCreateReadStream;
      var emitters; // = [function(stream) { stream.push([{ key: 'a' }]); stream.end(); }, ...];
      var makeRetryableError;
      var reqOptsCalls;
      var setTimeoutSpy;

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
            .resume(); // The stream starts paused unless it has a `.data()` callback.
        };

        emitters = null; // This needs to be assigned in each test case.

        makeRetryableError = () => {
          var error = new Error('retry me!');
          error.code = 409;
          return error;
        };

        FakeFilter.createRange = function(start, end) {
          var range = {};
          if (start) {
            range.start = start.value || start;
            range.startInclusive =
              typeof start === 'object' ? start.inclusive : true;
          }
          if (end) {
            range.end = end.value || end;
          }
          return range;
        };

        FakeMutation.convertToBytes = function(value) {
          return Buffer.from(value);
        };

        reqOptsCalls = [];

        setTimeoutSpy = sinon.stub(global, 'setTimeout').callsFake(fn => fn());

        table.bigtable.request = function(config) {
          reqOptsCalls.push(config.reqOpts);

          var stream = new Stream({
            objectMode: true,
          });

          setImmediate(function() {
            stream.emit('request');
            emitters.shift()(stream);
          });

          return stream;
        };
      });

      afterEach(function() {
        setTimeoutSpy.restore();
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

        var options = {
          ranges: [{start: 'a', end: 'b'}, {start: 'c'}],
        };

        callCreateReadStream(options, () => {
          var allRanges = [
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

        assert.deepEqual(config.reqOpts, {
          name: table.id,
        });

        assert.deepEqual(config.gaxOpts, {});

        callback(); // done()
      };

      table.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      table.delete(gaxOptions, assert.ifError);
    });
  });

  describe('deleteRows', function() {
    it('should provide the proper request options', function(done) {
      table.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'dropRowRange');
        assert.strictEqual(config.reqOpts.name, TABLE_NAME);
        assert.strictEqual(config.gaxOpts, undefined);
        callback(); // done()
      };

      table.deleteRows(done);
    });

    it('should accept gaxOptions', function(done) {
      var options = {
        gaxOptions: {},
      };

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, options.gaxOptions);
        done();
      };

      table.deleteRows(options, assert.ifError);
    });

    it('should respect the row key prefix option', function(done) {
      var options = {
        prefix: 'a',
      };
      var fakePrefix = 'b';

      var spy = (FakeMutation.convertToBytes = sinon.spy(function() {
        return fakePrefix;
      }));

      table.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.rowKeyPrefix, fakePrefix);
        assert.strictEqual(spy.callCount, 1);
        assert.strictEqual(spy.getCall(0).args[0], options.prefix);
        done();
      };

      table.deleteRows(options, assert.ifError);
    });

    it('should delete all data when no options are provided', function(done) {
      table.bigtable.request = function(config) {
        assert.strictEqual(config.reqOpts.deleteAllDataFromTable, true);
        done();
      };

      table.deleteRows(assert.ifError);
    });
  });

  describe('exists', function() {
    it('should not require gaxOptions', function(done) {
      table.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      table.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', function(done) {
      var gaxOptions = {};

      table.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      table.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', function(done) {
      var error = new Error('Error.');
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
      var error = new Error('Error.');
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
    var FAMILY_ID = 'test-family';

    it('should throw if a name is not provided', function() {
      assert.throws(function() {
        table.family();
      }, /A family name must be provided\./);
    });

    it('should create a family with the proper arguments', function() {
      var family = table.family(FAMILY_ID);

      assert(family instanceof FakeFamily);
      assert.strictEqual(family.calledWith_[0], table);
      assert.strictEqual(family.calledWith_[1], FAMILY_ID);
    });
  });

  describe('get', function() {
    it('should call getMetadata', function(done) {
      var options = {
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
      var error = new Error('Error.');
      error.code = 5;

      var options = {
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
      var error = new Error('Error.');
      error.code = 'NOT-5';

      var options = {
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
      var error = new Error('Error.');
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
      var error = new Error('Error.');

      table.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      table.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      var apiResponse = {};

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

  describe('getFamilies', function() {
    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      table.getMetadata = function(options) {
        assert.strictEqual(options.gaxOptions, gaxOptions);
        done();
      };

      table.getFamilies(gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var error = new Error('err');
      var response = {};

      table.getMetadata = function(options, callback) {
        callback(error, response);
      };

      table.getFamilies(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an array of Family objects', function(done) {
      var metadata = {
        a: 'b',
      };

      var response = {
        columnFamilies: {
          test: metadata,
        },
      };

      var fakeFamily = {};

      table.getMetadata = function(options, callback) {
        callback(null, response);
      };

      table.family = function(id) {
        assert.strictEqual(id, 'test');
        return fakeFamily;
      };

      table.getFamilies(function(err, families, apiResponse) {
        assert.ifError(err);

        var family = families[0];
        assert.strictEqual(family, fakeFamily);
        assert.strictEqual(family.metadata, metadata);

        assert.strictEqual(apiResponse, response.columnFamilies);

        done();
      });
    });
  });

  describe('getMetadata', function() {
    var views = {
      unspecified: 0,
      name: 1,
      schema: 2,
      full: 4,
    };
    beforeEach(function() {
      Table.VIEWS = views;
    });

    it('should provide the proper request options', function(done) {
      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'getTable');

        assert.strictEqual(config.reqOpts.name, table.id);
        assert.strictEqual(config.reqOpts.view, views.unspecified);

        assert.strictEqual(config.gaxOpts, undefined);

        done();
      };

      table.getMetadata(assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var options = {
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
        var options = {
          view: view,
        };

        table.bigtable.request = function(config) {
          assert.strictEqual(config.reqOpts.view, views[view]);
          done();
        };

        table.getMetadata(options, assert.ifError);
      });
    });

    it('should update the metadata', function(done) {
      var response = {};

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
      var args = [{}, {}, {}];

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
      var fakeRows = [{key: 'c', data: {}}, {key: 'd', data: {}}];

      beforeEach(function() {
        table.createReadStream = sinon.spy(function() {
          var stream = new Stream({
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
        var options = {};

        table.getRows(options, function(err, rows) {
          assert.ifError(err);
          assert.deepEqual(rows, fakeRows);

          var spy = table.createReadStream.getCall(0);
          assert.strictEqual(spy.args[0], options);
          done();
        });
      });

      it('should optionally accept options', function(done) {
        table.getRows(function(err, rows) {
          assert.ifError(err);
          assert.deepEqual(rows, fakeRows);
          done();
        });
      });
    });

    describe('error', function() {
      var error = new Error('err');

      beforeEach(function() {
        table.createReadStream = sinon.spy(function() {
          var stream = new Stream({
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
      var fakeEntries = [
        {
          key: 'a',
          data: {},
        },
        {
          key: 'b',
          data: {},
        },
      ];

      table.mutate = function(entries, gaxOptions, callback) {
        assert.deepEqual(entries[0], {
          key: fakeEntries[0].key,
          data: fakeEntries[0].data,
          method: FakeMutation.methods.INSERT,
        });

        assert.deepEqual(entries[1], {
          key: fakeEntries[1].key,
          data: fakeEntries[1].data,
          method: FakeMutation.methods.INSERT,
        });

        callback();
      };

      table.insert(fakeEntries, done);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      table.mutate = function(entries, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      table.insert([], gaxOptions, assert.ifError);
    });
  });

  describe('mutate', function() {
    var entries = [{}, {}];
    var fakeEntries = [{}, {}];
    var parseSpy;

    beforeEach(function() {
      parseSpy = FakeMutation.parse = sinon.spy(function(value) {
        var entryIndex = entries.indexOf(value);
        return fakeEntries[entryIndex];
      });
    });

    it('should provide the proper request options', function(done) {
      var stream = through.obj();

      table.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableClient');
        assert.strictEqual(config.method, 'mutateRows');

        assert.strictEqual(config.reqOpts.tableName, TABLE_NAME);
        assert.deepEqual(config.reqOpts.entries, fakeEntries);

        assert.strictEqual(parseSpy.callCount, 2);
        assert.strictEqual(parseSpy.getCall(0).args[0], entries[0]);
        assert.strictEqual(parseSpy.getCall(1).args[0], entries[1]);

        setImmediate(done);

        return stream;
      };

      table.mutate(entries, assert.ifError);
    });

    describe('error', function() {
      describe('API errors', function() {
        var error = new Error('err');

        beforeEach(function() {
          table.bigtable.request = function() {
            var stream = new Stream({
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
        var fakeStatuses = [
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

        var parsedStatuses = [{}, {}];

        beforeEach(function() {
          table.bigtable.request = function() {
            var stream = through.obj();

            stream.push({entries: fakeStatuses});

            setImmediate(function() {
              stream.end();
            });

            return stream;
          };

          var statusCount = 0;
          FakeGrpcService.decorateStatus_ = function(status) {
            assert.strictEqual(status, fakeStatuses[statusCount].status);
            return parsedStatuses[statusCount++];
          };
        });

        it('should return a PartialFailureError', function(done) {
          table.mutate(entries, function(err) {
            assert.strictEqual(err.name, 'PartialFailureError');

            assert.deepEqual(err.errors, [
              extend(
                {
                  entry: entries[0],
                },
                parsedStatuses[0]
              ),

              extend(
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
      var fakeStatuses = [
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
          var stream = new Stream({
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
      var fakeStatuses;
      var entryRequests;

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
        FakeGrpcService.decorateStatus_ = function() {
          return {};
        };
        table.bigtable.request = function(config) {
          entryRequests.push(config.reqOpts.entries);
          var stream = new Stream({
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
    var KEY = 'test-row';

    it('should throw if a key is not provided', function() {
      assert.throws(function() {
        table.row();
      }, /A row key must be provided\./);
    });

    it('should return a Row object', function() {
      var row = table.row(KEY);

      assert(row instanceof FakeRow);
      assert.strictEqual(row.calledWith_[0], table);
      assert.strictEqual(row.calledWith_[1], KEY);
    });
  });

  describe('sampleRowKeys', function() {
    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      table.sampleRowKeysStream = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      table.sampleRowKeys(gaxOptions);
    });

    describe('success', function() {
      var fakeKeys = [
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
          var stream = new Stream({
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
          assert.deepEqual(keys, fakeKeys);
          done();
        });
      });
    });

    describe('error', function() {
      var error = new Error('err');

      beforeEach(function() {
        table.sampleRowKeysStream = sinon.spy(function() {
          var stream = new Stream({
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

        return new Stream({
          objectMode: true,
        });
      };

      table.sampleRowKeysStream();
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      table.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);

        setImmediate(done);

        return new Stream({
          objectMode: true,
        });
      };

      table.sampleRowKeysStream(gaxOptions);
    });

    describe('success', function() {
      var fakeKeys = [
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
          var stream = new Stream({
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
        var keys = [];

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
      var error = new Error('err');

      beforeEach(function() {
        table.bigtable.request = function() {
          var stream = new Stream({
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
});
