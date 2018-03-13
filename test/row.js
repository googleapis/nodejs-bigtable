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
var common = require('@google-cloud/common');
var extend = require('extend');
var proxyquire = require('proxyquire');
var sinon = require('sinon').sandbox.create();

var Mutation = require('../src/mutation.js');

var promisified = false;
var fakeUtil = extend({}, common.util, {
  promisifyAll: function(Class) {
    if (Class.name === 'Row') {
      promisified = true;
    }
  },
});

var ROW_ID = 'my-row';
var CONVERTED_ROW_ID = 'my-converted-row';
var TABLE = {
  bigtable: {},
  id: 'my-table',
};

var FakeMutation = {
  methods: Mutation.methods,
  convertToBytes: sinon.spy(function(value) {
    if (value === ROW_ID) {
      return CONVERTED_ROW_ID;
    }
    return value;
  }),
  convertFromBytes: sinon.spy(function(value) {
    return value;
  }),
  parseColumnName: sinon.spy(function(column) {
    return Mutation.parseColumnName(column);
  }),
  parse: sinon.spy(function(entry) {
    return {
      mutations: entry,
    };
  }),
};

var FakeFilter = {
  parse: sinon.spy(function(filter) {
    return filter;
  }),
};

describe('Bigtable/Row', function() {
  var Row;
  var row;

  before(function() {
    Row = proxyquire('../src/row.js', {
      '@google-cloud/common': {
        util: fakeUtil,
      },
      './mutation.js': FakeMutation,
      './filter.js': FakeFilter,
    });
  });

  beforeEach(function() {
    row = new Row(TABLE, ROW_ID);
  });

  afterEach(function() {
    Object.keys(FakeMutation).forEach(function(spy) {
      if (FakeMutation[spy].resetHistory) {
        FakeMutation[spy].resetHistory();
      }
    });
  });

  describe('instantiation', function() {
    it('should promisify all the things', function() {
      assert(promisified);
    });

    it('should localize Bigtable instance', function() {
      assert.strictEqual(row.bigtable, TABLE.bigtable);
    });

    it('should localize Table instance', function() {
      assert.strictEqual(row.table, TABLE);
    });

    it('should localize ID', function() {
      assert.strictEqual(row.id, ROW_ID);
    });

    it('should create an empty data object', function() {
      assert.deepEqual(row.data, {});
    });
  });

  describe('formatChunks_', function() {
    var convert = FakeMutation.convertFromBytes;

    beforeEach(function() {
      convert = FakeMutation.convertFromBytes;
      FakeMutation.convertFromBytes = sinon.spy(function(val) {
        return val.replace('unconverted', 'converted');
      });
    });

    afterEach(function() {
      FakeMutation.convertFromBytes = convert;
    });

    it('should format the chunks', function() {
      var timestamp = Date.now();
      var chunks = [
        {
          rowKey: 'unconvertedKey',
          familyName: {
            value: 'familyName',
          },
          qualifier: {
            value: 'unconvertedQualifier',
          },
          value: 'unconvertedValue',
          labels: ['label'],
          timestampMicros: timestamp,
          valueSize: 0,
          commitRow: false,
          resetRow: false,
        },
        {
          commitRow: true,
        },
      ];

      var rows = Row.formatChunks_(chunks);

      assert.deepEqual(rows, [
        {
          key: 'convertedKey',
          data: {
            familyName: {
              convertedQualifier: [
                {
                  value: 'convertedValue',
                  labels: ['label'],
                  timestamp: timestamp,
                  size: 0,
                },
              ],
            },
          },
        },
      ]);
    });

    it('should inherit the row key', function() {
      var chunks = [
        {
          rowKey: 'unconvertedKey',
        },
        {
          rowKey: null,
          familyName: {
            value: 'familyName',
          },
          commitRow: true,
        },
        {
          rowKey: 'unconvertedKey2',
        },
        {
          rowKey: null,
          familyName: {
            value: 'familyName2',
          },
          commitRow: true,
        },
      ];

      var rows = Row.formatChunks_(chunks);

      assert.deepEqual(rows, [
        {
          key: 'convertedKey',
          data: {
            familyName: {},
          },
        },
        {
          key: 'convertedKey2',
          data: {
            familyName2: {},
          },
        },
      ]);
    });

    it('should inherit the family name', function() {
      var chunks = [
        {
          rowKey: 'unconvertedKey',
          familyName: {
            value: 'familyName',
          },
        },
        {
          qualifier: {
            value: 'unconvertedQualifier',
          },
        },
        {
          qualifier: {
            value: 'unconvertedQualifier2',
          },
        },
        {
          commitRow: true,
        },
      ];

      var rows = Row.formatChunks_(chunks);

      assert.deepEqual(rows, [
        {
          key: 'convertedKey',
          data: {
            familyName: {
              convertedQualifier: [],
              convertedQualifier2: [],
            },
          },
        },
      ]);
    });

    it('should inherit the qualifier', function() {
      var timestamp1 = 123;
      var timestamp2 = 345;

      var chunks = [
        {
          rowKey: 'unconvertedKey',
          familyName: {
            value: 'familyName',
          },
          qualifier: {
            value: 'unconvertedQualifier',
          },
        },
        {
          value: 'unconvertedValue',
          labels: ['label'],
          timestampMicros: timestamp1,
          valueSize: 0,
        },
        {
          value: 'unconvertedValue2',
          labels: ['label2'],
          timestampMicros: timestamp2,
          valueSize: 2,
        },
        {
          commitRow: true,
        },
      ];

      var rows = Row.formatChunks_(chunks);

      assert.deepEqual(rows, [
        {
          key: 'convertedKey',
          data: {
            familyName: {
              convertedQualifier: [
                {
                  value: 'convertedValue',
                  labels: ['label'],
                  timestamp: timestamp1,
                  size: 0,
                },
                {
                  value: 'convertedValue2',
                  labels: ['label2'],
                  timestamp: timestamp2,
                  size: 2,
                },
              ],
            },
          },
        },
      ]);
    });

    it('should not decode values when applicable', function() {
      var formatOptions = {
        decode: false,
      };

      FakeMutation.convertFromBytes = sinon.spy(function(val, options) {
        assert.strictEqual(options, formatOptions);
        return val.replace('unconverted', 'converted');
      });

      var timestamp1 = 123;
      var timestamp2 = 345;

      var chunks = [
        {
          rowKey: 'unconvertedKey',
          familyName: {
            value: 'familyName',
          },
          qualifier: {
            value: 'unconvertedQualifier',
          },
        },
        {
          value: 'unconvertedValue',
          labels: ['label'],
          timestampMicros: timestamp1,
          valueSize: 0,
        },
        {
          value: 'unconvertedValue2',
          labels: ['label2'],
          timestampMicros: timestamp2,
          valueSize: 2,
        },
        {
          commitRow: true,
        },
      ];

      var rows = Row.formatChunks_(chunks, formatOptions);

      assert.deepEqual(rows, [
        {
          key: 'convertedKey',
          data: {
            familyName: {
              convertedQualifier: [
                {
                  value: 'convertedValue',
                  labels: ['label'],
                  timestamp: timestamp1,
                  size: 0,
                },
                {
                  value: 'convertedValue2',
                  labels: ['label2'],
                  timestamp: timestamp2,
                  size: 2,
                },
              ],
            },
          },
        },
      ]);

      // 0 === row key
      // 1 === qualifier
      // 2 === value
      var args = FakeMutation.convertFromBytes.getCall(2).args;
      assert.strictEqual(args[1], formatOptions);
    });

    it('should discard old data when reset row is found', function() {
      var chunks = [
        {
          rowKey: 'unconvertedKey',
          familyName: {
            value: 'familyName',
          },
          qualifier: {
            value: 'unconvertedQualifier',
          },
          value: 'unconvertedValue',
          labels: ['label'],
          valueSize: 0,
          timestampMicros: 123,
        },
        {
          resetRow: true,
        },
        {
          rowKey: 'unconvertedKey2',
          familyName: {
            value: 'familyName2',
          },
          qualifier: {
            value: 'unconvertedQualifier2',
          },
          value: 'unconvertedValue2',
          labels: ['label2'],
          valueSize: 2,
          timestampMicros: 345,
        },
        {
          commitRow: true,
        },
      ];

      var rows = Row.formatChunks_(chunks);

      assert.deepEqual(rows, [
        {
          key: 'convertedKey2',
          data: {
            familyName2: {
              convertedQualifier2: [
                {
                  value: 'convertedValue2',
                  labels: ['label2'],
                  size: 2,
                  timestamp: 345,
                },
              ],
            },
          },
        },
      ]);
    });
  });

  describe('formatFamilies_', function() {
    var timestamp = Date.now();

    var families = [
      {
        name: 'test-family',
        columns: [
          {
            qualifier: 'test-column',
            cells: [
              {
                value: 'test-value',
                timestampMicros: timestamp,
                labels: [],
              },
            ],
          },
        ],
      },
    ];

    var formattedRowData = {
      'test-family': {
        'test-column': [
          {
            value: 'test-value',
            timestamp: timestamp,
            labels: [],
          },
        ],
      },
    };

    it('should format the families into a user-friendly format', function() {
      var formatted = Row.formatFamilies_(families);
      assert.deepEqual(formatted, formattedRowData);

      var convertStpy = FakeMutation.convertFromBytes;
      assert.strictEqual(convertStpy.callCount, 2);
      assert.strictEqual(convertStpy.getCall(0).args[0], 'test-column');
      assert.strictEqual(convertStpy.getCall(1).args[0], 'test-value');
    });

    it('should optionally not decode the value', function() {
      var formatted = Row.formatFamilies_(families, {
        decode: false,
      });

      assert.deepEqual(formatted, formattedRowData);

      var convertStpy = FakeMutation.convertFromBytes;
      assert.strictEqual(convertStpy.callCount, 1);
      assert.strictEqual(convertStpy.getCall(0).args[0], 'test-column');
    });
  });

  describe('create', function() {
    it('should provide the proper request options', function(done) {
      row.table.mutate = function(entry, gaxOptions) {
        assert.strictEqual(entry.key, row.id);
        assert.strictEqual(entry.data, undefined);
        assert.strictEqual(entry.method, Mutation.methods.INSERT);
        assert.strictEqual(gaxOptions, undefined);
        done();
      };

      row.create(assert.ifError);
    });

    it('should accept data to populate the row', function(done) {
      var options = {
        entry: {
          a: 'a',
          b: 'b',
        },
      };

      row.table.mutate = function(entry) {
        assert.strictEqual(entry.data, options.entry);
        done();
      };

      row.create(options, assert.ifError);
    });

    it('should accept options when inserting data', function(done) {
      var options = {
        gaxOptions: {},
      };

      row.table.mutate = function(entry, gaxOptions) {
        assert.strictEqual(gaxOptions, options.gaxOptions);
        done();
      };

      row.create(options, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var err = new Error('err');
      var response = {};

      row.table.mutate = function(entry, gaxOptions, callback) {
        callback(err, response);
      };

      row.create(function(err_, row, apiResponse) {
        assert.strictEqual(err, err_);
        assert.strictEqual(row, null);
        assert.strictEqual(response, apiResponse);
        done();
      });
    });

    it('should return the Row instance', function(done) {
      var response = {};

      row.table.mutate = function(entry, gaxOptions, callback) {
        callback(null, response);
      };

      row.create(function(err, row_, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(row, row_);
        assert.strictEqual(response, apiResponse);
        done();
      });
    });
  });

  describe('createRules', function() {
    var rules = [
      {
        column: 'a:b',
        append: 'c',
        increment: 1,
      },
    ];

    it('should throw if a rule is not provided', function() {
      assert.throws(function() {
        row.createRules();
      }, /At least one rule must be provided\./);
    });

    it('should read/modify/write rules', function(done) {
      row.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableClient');
        assert.strictEqual(config.method, 'readModifyWriteRow');

        assert.strictEqual(config.reqOpts.tableName, TABLE.id);
        assert.strictEqual(config.reqOpts.rowKey, CONVERTED_ROW_ID);

        assert.deepEqual(config.reqOpts.rules, [
          {
            familyName: 'a',
            columnQualifier: 'b',
            appendValue: 'c',
            incrementAmount: 1,
          },
        ]);

        var spy = FakeMutation.convertToBytes;

        assert.strictEqual(spy.getCall(0).args[0], 'b');
        assert.strictEqual(spy.getCall(1).args[0], 'c');
        assert.strictEqual(spy.getCall(2).args[0], ROW_ID);

        callback(); // done()
      };

      row.createRules(rules, done);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      row.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      row.createRules(rules, gaxOptions, assert.ifError);
    });
  });

  describe('delete', function() {
    it('should provide the proper request options', function(done) {
      row.table.mutate = function(mutation, gaxOptions, callback) {
        assert.strictEqual(mutation.key, ROW_ID);
        assert.strictEqual(mutation.method, FakeMutation.methods.DELETE);
        assert.deepStrictEqual(gaxOptions, {});
        callback(); // done()
      };

      row.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      row.table.mutate = function(mutation, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.delete(gaxOptions, done);
    });
  });

  describe('deleteCells', function() {
    var columns = ['a:b', 'c'];

    it('should provide the proper request options', function(done) {
      row.table.mutate = function(mutation, gaxOptions, callback) {
        assert.strictEqual(mutation.key, ROW_ID);
        assert.strictEqual(mutation.data, columns);
        assert.strictEqual(mutation.method, FakeMutation.methods.DELETE);
        assert.deepStrictEqual(gaxOptions, {});
        callback(); // done()
      };

      row.deleteCells(columns, done);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      row.table.mutate = function(mutation, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.deleteCells(columns, gaxOptions, done);
    });
  });

  describe('exists', function() {
    it('should not require gaxOptions', function(done) {
      row.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      row.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', function(done) {
      var gaxOptions = {};

      row.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error is RowError', function(done) {
      var error = new Row.RowError('Error.');

      row.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      row.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if not RowError', function(done) {
      var error = new Error('Error.');

      row.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      row.exists(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', function(done) {
      row.getMetadata = function(gaxOptions, callback) {
        callback(null, {});
      };

      row.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('filter', function() {
    var mutations = [
      {
        method: 'insert',
        data: {
          a: 'a',
        },
      },
    ];

    var fakeMutations = {
      mutations: [
        {
          a: 'b',
        },
      ],
    };

    beforeEach(function() {
      FakeMutation.parse.resetHistory();
      FakeFilter.parse.resetHistory();
    });

    it('should provide the proper request options', function(done) {
      var filter = {
        column: 'a',
      };

      var fakeParsedFilter = {
        column: 'b',
      };

      FakeFilter.parse = sinon.spy(function() {
        return fakeParsedFilter;
      });

      FakeMutation.parse = sinon.spy(function() {
        return fakeMutations;
      });

      row.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableClient');
        assert.strictEqual(config.method, 'checkAndMutateRow');

        assert.strictEqual(config.reqOpts.tableName, TABLE.id);
        assert.strictEqual(config.reqOpts.rowKey, CONVERTED_ROW_ID);
        assert.deepEqual(config.reqOpts.predicateFilter, fakeParsedFilter);
        assert.deepEqual(config.reqOpts.trueMutations, fakeMutations.mutations);
        assert.deepEqual(
          config.reqOpts.falseMutations,
          fakeMutations.mutations
        );

        assert.strictEqual(config.gaxOpts, undefined);

        assert.strictEqual(FakeMutation.parse.callCount, 2);
        assert.strictEqual(FakeMutation.parse.getCall(0).args[0], mutations[0]);
        assert.strictEqual(FakeMutation.parse.getCall(1).args[0], mutations[0]);

        assert.strictEqual(FakeFilter.parse.callCount, 1);
        assert(FakeFilter.parse.calledWithExactly(filter));

        done();
      };

      row.filter(
        filter,
        {
          onMatch: mutations,
          onNoMatch: mutations,
        },
        assert.ifError
      );
    });

    it('should accept gaxOptions', function(done) {
      var filter = {
        column: 'a',
      };
      var gaxOptions = {};

      row.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      row.filter(filter, {gaxOptions}, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var err = new Error('err');
      var response = {};

      row.bigtable.request = function(config, callback) {
        callback(err, response);
      };

      row.filter({}, mutations, function(err_, matched, apiResponse) {
        assert.strictEqual(err, err_);
        assert.strictEqual(matched, null);
        assert.strictEqual(response, apiResponse);
        done();
      });
    });

    it('should return a matched flag', function(done) {
      var response = {
        predicateMatched: true,
      };

      row.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      row.filter({}, mutations, function(err, matched, apiResponse) {
        assert.ifError(err);
        assert(matched);
        assert.strictEqual(response, apiResponse);
        done();
      });
    });
  });

  describe('get', function() {
    it('should provide the proper request options', function(done) {
      row.table.getRows = function(reqOpts) {
        assert.strictEqual(reqOpts.keys[0], ROW_ID);
        assert.strictEqual(reqOpts.filter, undefined);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 0);
        done();
      };

      row.get(assert.ifError);
    });

    it('should create a filter for a single column', function(done) {
      var keys = ['a:b'];

      var expectedFilter = [
        {
          family: 'a',
        },
        {
          column: 'b',
        },
      ];

      row.table.getRows = function(reqOpts) {
        assert.deepEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 1);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        done();
      };

      row.get(keys, assert.ifError);
    });

    it('should create a filter for multiple columns', function(done) {
      var keys = ['a:b', 'c:d'];

      var expectedFilter = [
        {
          interleave: [
            [
              {
                family: 'a',
              },
              {
                column: 'b',
              },
            ],
            [
              {
                family: 'c',
              },
              {
                column: 'd',
              },
            ],
          ],
        },
      ];

      row.table.getRows = function(reqOpts) {
        assert.deepEqual(reqOpts.filter, expectedFilter);

        var spy = FakeMutation.parseColumnName;

        assert.strictEqual(spy.callCount, 2);
        assert.strictEqual(spy.getCall(0).args[0], keys[0]);
        assert.strictEqual(spy.getCall(1).args[0], keys[1]);
        done();
      };

      row.get(keys, assert.ifError);
    });

    it('should respect supplying only family names', function(done) {
      var keys = ['a'];

      var expectedFilter = [
        {
          family: 'a',
        },
      ];

      row.table.getRows = function(reqOpts) {
        assert.deepEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 1);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        done();
      };

      row.get(keys, assert.ifError);
    });

    it('should respect the options object', function(done) {
      var keys = ['a'];

      var options = {
        decode: false,
      };

      var expectedFilter = [
        {
          family: 'a',
        },
      ];

      row.table.getRows = function(reqOpts) {
        assert.deepEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 1);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        assert.strictEqual(reqOpts.decode, options.decode);
        done();
      };

      row.get(keys, options, assert.ifError);
    });

    it('should respect filter in options object', function(done) {
      var keys = [];

      var options = {
        decode: false,
        filter: [{column: 'abc'}],
      };
      var expectedFilter = options.filter;

      row.table.getRows = function(reqOpts) {
        assert.deepEqual(reqOpts.filter, expectedFilter);
        done();
      };

      row.get(keys, options, assert.ifError);
    });

    it('should accept options without keys', function(done) {
      var options = {
        decode: false,
      };

      row.table.getRows = function(reqOpts) {
        assert.strictEqual(reqOpts.decode, options.decode);
        assert(!reqOpts.filter);
        done();
      };

      row.get(options, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var error = new Error('err');

      row.table.getRows = function(r, callback) {
        callback(error);
      };

      row.get(function(err, row) {
        assert.strictEqual(error, err);
        assert.strictEqual(row, undefined);
        done();
      });
    });

    it('should return a custom error if the row is not found', function(done) {
      row.table.getRows = function(r, callback) {
        callback(null, []);
      };

      row.get(function(err, row_) {
        assert(err instanceof Row.RowError);
        assert.strictEqual(err.message, 'Unknown row: ' + row.id + '.');
        assert.deepEqual(row_, undefined);
        done();
      });
    });

    it('should update the row data upon success', function(done) {
      var fakeRow = new Row(TABLE, ROW_ID);

      fakeRow.data = {
        a: 'a',
        b: 'b',
      };

      row.table.getRows = function(r, callback) {
        callback(null, [fakeRow]);
      };

      row.get(function(err, row_) {
        assert.ifError(err);
        assert.strictEqual(row_, row);
        assert.deepEqual(row.data, fakeRow.data);
        done();
      });
    });

    it('should return only data for the keys provided', function(done) {
      var fakeRow = new Row(TABLE, ROW_ID);

      fakeRow.data = {
        a: 'a',
        b: 'b',
      };

      var keys = ['a', 'b'];

      row.data = {
        c: 'c',
      };

      row.table.getRows = function(r, callback) {
        callback(null, [fakeRow]);
      };

      row.get(keys, function(err, data) {
        assert.ifError(err);
        assert.deepEqual(Object.keys(data), keys);
        done();
      });
    });
  });

  describe('getMetadata', function() {
    it('should return an error to the callback', function(done) {
      var error = new Error('err');

      row.get = function(options, callback) {
        callback(error);
      };

      row.getMetadata(function(err, metadata) {
        assert.strictEqual(error, err);
        assert.strictEqual(metadata, undefined);
        done();
      });
    });

    it('should return metadata to the callback', function(done) {
      var fakeMetadata = {
        a: 'a',
        b: 'b',
      };

      row.get = function(options, callback) {
        callback(null, row);
      };

      row.metadata = fakeMetadata;

      row.getMetadata(function(err, metadata) {
        assert.ifError(err);
        assert.strictEqual(metadata, fakeMetadata);
        done();
      });
    });

    it('should accept an options object', function(done) {
      var fakeMetadata = {};
      var fakeOptions = {
        decode: false,
      };

      row.get = function(options, callback) {
        assert.strictEqual(options, fakeOptions);
        callback(null, row);
      };

      row.metadata = fakeMetadata;

      row.getMetadata(fakeOptions, function(err, metadata) {
        assert.ifError(err);
        assert.strictEqual(metadata, fakeMetadata);
        done();
      });
    });
  });

  describe('increment', function() {
    var COLUMN_NAME = 'a:b';
    var formatFamiliesSpy;

    beforeEach(function() {
      formatFamiliesSpy = sinon.stub(Row, 'formatFamilies_').returns({
        a: {
          b: [
            {
              value: 10,
            },
          ],
        },
      });
    });

    afterEach(function() {
      formatFamiliesSpy.restore();
    });

    it('should provide the proper request options', function(done) {
      row.createRules = function(reqOpts, gaxOptions) {
        assert.strictEqual(reqOpts.column, COLUMN_NAME);
        assert.strictEqual(reqOpts.increment, 1);
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      row.increment(COLUMN_NAME, assert.ifError);
    });

    it('should optionally accept an increment amount', function(done) {
      var increment = 10;

      row.createRules = function(reqOpts) {
        assert.strictEqual(reqOpts.increment, increment);
        done();
      };

      row.increment(COLUMN_NAME, increment, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      row.createRules = function(reqOpts, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.increment(COLUMN_NAME, gaxOptions, assert.ifError);
    });

    it('should accept increment amount and gaxOptions', function(done) {
      var increment = 10;
      var gaxOptions = {};

      row.createRules = function(reqOpts, gaxOptions_) {
        assert.strictEqual(reqOpts.increment, increment);
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.increment(COLUMN_NAME, increment, gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var error = new Error('err');
      var response = {};

      row.createRules = function(r, gaxOptions, callback) {
        callback(error, response);
      };

      row.increment(COLUMN_NAME, function(err, value, apiResponse) {
        assert.strictEqual(err, error);
        assert.strictEqual(value, null);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });

    it('should pass back the updated value to the callback', function(done) {
      var fakeValue = 10;
      var response = {
        row: {
          families: [
            {
              name: 'a',
              columns: [
                {
                  qualifier: 'b',
                  cells: [
                    {
                      timestampMicros: Date.now(),
                      value: fakeValue,
                      labels: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      };

      row.createRules = function(r, gaxOptions, callback) {
        callback(null, response);
      };

      row.increment(COLUMN_NAME, function(err, value, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(value, fakeValue);
        assert.strictEqual(apiResponse, response);
        assert.strictEqual(formatFamiliesSpy.callCount, 1);
        assert(formatFamiliesSpy.calledWithExactly(response.row.families));
        done();
      });
    });
  });

  describe('save', function() {
    var data = {
      a: {
        b: 'c',
      },
    };

    it('should insert an object', function(done) {
      row.table.mutate = function(entry, gaxOptions, callback) {
        assert.strictEqual(entry.data, data);
        callback(); // done()
      };

      row.save(data, done);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      row.table.mutate = function(entry, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.save(data, gaxOptions, assert.ifError);
    });
  });

  describe('RowError', function() {
    it('should supply the correct message', function() {
      var error = new Row.RowError('test');
      assert.strictEqual(error.message, 'Unknown row: test.');
    });

    it('should supply a 404 error code', function() {
      var error = new Row.RowError('test');
      assert.strictEqual(error.code, 404);
    });
  });
});
