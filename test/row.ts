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

import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import * as proxyquire from 'proxyquire';

const sn = require('sinon');
import {Mutation} from '../src/mutation.js';

const sinon = sn.createSandbox();

let promisified = false;
const fakePromisify = Object.assign({}, promisify, {
  promisifyAll(Class) {
    if (Class.name === 'Row') {
      promisified = true;
    }
  },
});

const ROW_ID = 'my-row';
const CONVERTED_ROW_ID = 'my-converted-row';
const TABLE = {
  bigtable: {},
  name: '/projects/project/instances/my-instance/tables/my-table',
};

const FakeMutation = {
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

const FakeFilter = {
  parse: sinon.spy(function(filter) {
    return filter;
  }),
};

describe('Bigtable/Row', function() {
  let Row;
  let RowError;
  let row;

  before(function() {
    const Fake = proxyquire('../src/row.js', {
      '@google-cloud/promisify': fakePromisify,
      './mutation.js': {Mutation: FakeMutation},
      './filter.js': {Filter: FakeFilter},
    });
    Row = Fake.Row;
    RowError = Fake.RowError;
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
      assert.deepStrictEqual(row.data, {});
    });
  });

  describe('formatChunks_', function() {
    let convert = FakeMutation.convertFromBytes;

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
      const timestamp = Date.now();
      const chunks = [
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

      const rows = Row.formatChunks_(chunks);

      assert.deepStrictEqual(rows, [
        {
          key: 'convertedKey',
          data: {
            familyName: {
              convertedQualifier: [
                {
                  value: 'convertedValue',
                  labels: ['label'],
                  timestamp,
                  size: 0,
                },
              ],
            },
          },
        },
      ]);
    });

    it('should inherit the row key', function() {
      const chunks = [
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

      const rows = Row.formatChunks_(chunks);

      assert.deepStrictEqual(rows, [
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
      const chunks = [
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

      const rows = Row.formatChunks_(chunks);

      assert.deepStrictEqual(rows, [
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
      const timestamp1 = 123;
      const timestamp2 = 345;

      const chunks = [
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

      const rows = Row.formatChunks_(chunks);

      assert.deepStrictEqual(rows, [
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
      const formatOptions = {
        decode: false,
      };

      FakeMutation.convertFromBytes = sinon.spy(function(val, options) {
        assert.deepStrictEqual(options, {userOptions: formatOptions});
        return val.replace('unconverted', 'converted');
      });

      const timestamp1 = 123;
      const timestamp2 = 345;

      const chunks = [
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

      const rows = Row.formatChunks_(chunks, formatOptions);

      assert.deepStrictEqual(rows, [
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
      const args = FakeMutation.convertFromBytes.getCall(2).args;
      assert.deepStrictEqual(args[1], {userOptions: formatOptions});
    });

    it('should use the encoding scheme provided', function() {
      const formatOptions = {
        encoding: 'binary',
      };

      FakeMutation.convertFromBytes = sinon.spy(function(val, options) {
        assert.deepStrictEqual(options, {userOptions: formatOptions});
        return val.toString(formatOptions.encoding);
      });

      const chunks = [
        {
          rowKey: Buffer.from('ø', 'binary'),
          familyName: {
            value: 'familyName',
          },
          qualifier: {
            value: 'qualifier',
          },
          value: 'value',
          valueSize: 0,
          labels: ['label'],
          timestampMicros: 123,
          commitRow: true,
        },
      ];

      const rows = Row.formatChunks_(chunks, formatOptions);

      assert.deepStrictEqual(rows, [
        {
          key: 'ø',
          data: {
            familyName: {
              qualifier: [
                {
                  value: 'value',
                  size: 0,
                  labels: ['label'],
                  timestamp: 123,
                },
              ],
            },
          },
        },
      ]);

      // 0 === row key
      // 1 === qualifier
      // 2 === value
      const args = FakeMutation.convertFromBytes.getCall(2).args;
      assert.deepStrictEqual(args[1], {userOptions: formatOptions});
    });

    it('should discard old data when reset row is found', function() {
      const chunks = [
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

      const rows = Row.formatChunks_(chunks);

      assert.deepStrictEqual(rows, [
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
    const timestamp = Date.now();

    const families = [
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

    const formattedRowData = {
      'test-family': {
        'test-column': [
          {
            value: 'test-value',
            timestamp,
            labels: [],
          },
        ],
      },
    };

    it('should format the families into a user-friendly format', function() {
      const formatted = Row.formatFamilies_(families);
      assert.deepStrictEqual(formatted, formattedRowData);

      const convertStpy = FakeMutation.convertFromBytes;
      assert.strictEqual(convertStpy.callCount, 2);
      assert.strictEqual(convertStpy.getCall(0).args[0], 'test-column');
      assert.strictEqual(convertStpy.getCall(1).args[0], 'test-value');
    });

    it('should optionally not decode the value', function() {
      const formatted = Row.formatFamilies_(families, {
        decode: false,
      });

      assert.deepStrictEqual(formatted, formattedRowData);

      const convertStpy = FakeMutation.convertFromBytes;
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
      const options = {
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
      const options = {
        gaxOptions: {},
      };

      row.table.mutate = function(entry, gaxOptions) {
        assert.strictEqual(gaxOptions, options.gaxOptions);
        done();
      };

      row.create(options, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      const err = new Error('err');
      const response = {};

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
      const response = {};

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
    const rules = [
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

        assert.strictEqual(config.reqOpts.tableName, TABLE.name);
        assert.strictEqual(config.reqOpts.rowKey, CONVERTED_ROW_ID);

        assert.deepStrictEqual(config.reqOpts.rules, [
          {
            familyName: 'a',
            columnQualifier: 'b',
            appendValue: 'c',
            incrementAmount: 1,
          },
        ]);

        const spy = FakeMutation.convertToBytes;

        assert.strictEqual(spy.getCall(0).args[0], 'b');
        assert.strictEqual(spy.getCall(1).args[0], 'c');
        assert.strictEqual(spy.getCall(2).args[0], ROW_ID);

        callback();  // done()
      };

      row.createRules(rules, done);
    });

    it('should use an appProfileId', function(done) {
      const bigtableInstance = row.bigtable;
      bigtableInstance.appProfileId = 'app-profile-id-12345';

      bigtableInstance.request = function(config) {
        assert.strictEqual(
            config.reqOpts.appProfileId, bigtableInstance.appProfileId);
        done();
      };

      row.createRules(rules, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

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
        callback();  // done()
      };

      row.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      row.table.mutate = function(mutation, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.delete(gaxOptions, done);
    });

    it('should remove existing data', function(done) {
      const gaxOptions = {};
      row.table.mutate = function(mutation, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.delete(gaxOptions, done);
      assert.strictEqual(row.data, undefined);
    });
  });

  describe('deleteCells', function() {
    const columns = ['a:b', 'c'];

    it('should provide the proper request options', function(done) {
      row.table.mutate = function(mutation, gaxOptions, callback) {
        assert.strictEqual(mutation.key, ROW_ID);
        assert.strictEqual(mutation.data, columns);
        assert.strictEqual(mutation.method, FakeMutation.methods.DELETE);
        assert.deepStrictEqual(gaxOptions, {});
        callback();  // done()
      };

      row.deleteCells(columns, done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      row.table.mutate = function(mutation, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.deleteCells(columns, gaxOptions, done);
    });

    it('should remove existing data', function(done) {
      row.table.mutate = function(mutation, gaxOptions, callback) {
        callback();  // done()
      };

      row.deleteCells(columns, done);
      assert.strictEqual(row.data, undefined);
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
      const gaxOptions = {};

      row.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error is RowError', function(done) {
      const error = new RowError('Error.');

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
      const error = new Error('Error.');

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
    const mutations = [
      {
        method: 'insert',
        data: {
          a: 'a',
        },
      },
    ];

    const fakeMutations = {
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
      const filter = {
        column: 'a',
      };

      const fakeParsedFilter = {
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
        assert.strictEqual(config.reqOpts.tableName, TABLE.name);
        assert.strictEqual(config.reqOpts.rowKey, CONVERTED_ROW_ID);
        assert.deepStrictEqual(
            config.reqOpts.predicateFilter, fakeParsedFilter);
        assert.deepStrictEqual(
            config.reqOpts.trueMutations, fakeMutations.mutations);
        assert.deepStrictEqual(
            config.reqOpts.falseMutations, fakeMutations.mutations);

        assert.strictEqual(config.gaxOpts, undefined);

        assert.strictEqual(FakeMutation.parse.callCount, 2);
        assert.strictEqual(FakeMutation.parse.getCall(0).args[0], mutations[0]);
        assert.strictEqual(FakeMutation.parse.getCall(1).args[0], mutations[0]);

        assert.strictEqual(FakeFilter.parse.callCount, 1);
        assert(FakeFilter.parse.calledWithExactly(filter));

        done();
      };

      row.filter(
          filter, {
            onMatch: mutations,
            onNoMatch: mutations,
          },
          assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      const filter = {
        column: 'a',
      };
      const gaxOptions = {};

      row.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      row.filter(filter, {gaxOptions}, assert.ifError);
    });

    it('should use an appProfileId', function(done) {
      const filter = {
        column: 'a',
      };

      const bigtableInstance = row.bigtable;
      bigtableInstance.appProfileId = 'app-profile-id-12345';

      bigtableInstance.request = function(config) {
        assert.strictEqual(
            config.reqOpts.appProfileId, bigtableInstance.appProfileId);
        done();
      };

      row.filter(filter, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      const err = new Error('err');
      const response = {};

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
      const response = {
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
      const keys = ['a:b'];

      const expectedFilter = [
        {
          family: 'a',
        },
        {
          column: 'b',
        },
      ];

      row.table.getRows = function(reqOpts) {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 1);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        done();
      };

      row.get(keys, assert.ifError);
    });

    it('should create a filter for multiple columns', function(done) {
      const keys = ['a:b', 'c:d'];

      const expectedFilter = [
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
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);

        const spy = FakeMutation.parseColumnName;

        assert.strictEqual(spy.callCount, 2);
        assert.strictEqual(spy.getCall(0).args[0], keys[0]);
        assert.strictEqual(spy.getCall(1).args[0], keys[1]);
        done();
      };

      row.get(keys, assert.ifError);
    });

    it('should respect supplying only family names', function(done) {
      const keys = ['a'];

      const expectedFilter = [
        {
          family: 'a',
        },
      ];

      row.table.getRows = function(reqOpts) {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 1);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        done();
      };

      row.get(keys, assert.ifError);
    });

    it('should respect the options object', function(done) {
      const keys = ['a:b'];

      const options: any = {
        filter: [
          {
            column: {
              cellLimit: 1,
            },
          },
        ],
        descode: false,
      };

      const expectedFilter = [
        {
          family: 'a',
        },
        {
          column: 'b',
        },
        {
          column: {
            cellLimit: 1,
          },
        },
      ];

      row.table.getRows = function(reqOpts) {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 1);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        assert.strictEqual(reqOpts.decode, options.decode);
        done();
      };

      row.get(keys, options, assert.ifError);
    });

    it('should respect the options object with filter for multiple columns',
       function(done) {
         const keys = ['a:b', 'c:d'];

         const options: any = {
           filter: [
             {
               column: {
                 cellLimit: 1,
               },
             },
           ],
         };

         const expectedFilter = [
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
           {
             column: {
               cellLimit: 1,
             },
           },
         ];

         row.table.getRows = function(reqOpts) {
           assert.deepStrictEqual(reqOpts.filter, expectedFilter);
           assert.strictEqual(FakeMutation.parseColumnName.callCount, 2);
           assert(FakeMutation.parseColumnName.calledWith(keys[0]));
           assert.strictEqual(reqOpts.decode, options.decode);
           done();
         };

         row.get(keys, options, assert.ifError);
       });

    it('should respect filter in options object', function(done) {
      const keys = [];

      const options = {
        decode: false,
        filter: [{column: 'abc'}],
      };
      const expectedFilter = options.filter;

      row.table.getRows = function(reqOpts) {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);
        done();
      };

      row.get(keys, options, assert.ifError);
    });

    it('should accept options without keys', function(done) {
      const options = {
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
      const error = new Error('err');

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
        assert(err instanceof RowError);
        assert.strictEqual(err.message, 'Unknown row: ' + row.id + '.');
        assert.deepStrictEqual(row_, undefined);
        done();
      });
    });

    it('should update the row data upon success', function(done) {
      const fakeRow = new Row(TABLE, ROW_ID);

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
        assert.deepStrictEqual(row.data, fakeRow.data);
        done();
      });
    });

    it('should return only data for the keys provided', function(done) {
      const fakeRow = new Row(TABLE, ROW_ID);

      fakeRow.data = {
        a: 'a',
        b: 'b',
      };

      const keys = ['a', 'b'];

      row.data = {
        c: 'c',
      };

      row.table.getRows = function(r, callback) {
        callback(null, [fakeRow]);
      };

      row.get(keys, function(err, data) {
        assert.ifError(err);
        assert.deepStrictEqual(Object.keys(data), keys);
        done();
      });
    });
  });

  describe('getMetadata', function() {
    it('should return an error to the callback', function(done) {
      const error = new Error('err');

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
      const fakeMetadata = {
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
      const fakeMetadata = {};
      const fakeOptions = {
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
    const COLUMN_NAME = 'a:b';
    let formatFamiliesSpy;

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
      const increment = 10;

      row.createRules = function(reqOpts) {
        assert.strictEqual(reqOpts.increment, increment);
        done();
      };

      row.increment(COLUMN_NAME, increment, assert.ifError);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      row.createRules = function(reqOpts, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.increment(COLUMN_NAME, gaxOptions, assert.ifError);
    });

    it('should accept increment amount and gaxOptions', function(done) {
      const increment = 10;
      const gaxOptions = {};

      row.createRules = function(reqOpts, gaxOptions_) {
        assert.strictEqual(reqOpts.increment, increment);
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.increment(COLUMN_NAME, increment, gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      const error = new Error('err');
      const response = {};

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
      const fakeValue = 10;
      const response = {
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
    const data = {
      a: {
        b: 'c',
      },
    };

    it('should insert an object', function(done) {
      row.table.mutate = function(entry, gaxOptions, callback) {
        assert.strictEqual(entry.data, data);
        callback();  // done()
      };

      row.save(data, done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

      row.table.mutate = function(entry, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.save(data, gaxOptions, assert.ifError);
    });

    it('should remove existing data', function(done) {
      const gaxOptions = {};
      row.table.mutate = function(entry, gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.save(data, gaxOptions, assert.ifError);
      assert.strictEqual(row.data, undefined);
    });
  });

  describe('RowError', function() {
    it('should supply the correct message', function() {
      const error = new RowError('test');
      assert.strictEqual(error.message, 'Unknown row: test.');
    });

    it('should supply a 404 error code', function() {
      const error = new RowError('test');
      assert.strictEqual(error.code, 404);
    });
  });
});
