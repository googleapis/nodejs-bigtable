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

const sn = require('sinon');
import {Mutation} from '../src/mutation.js';

const sinon = sn.createSandbox();

let promisified = false;
const fakePromisify = Object.assign({}, promisify, {
  promisifyAll(klass) {
    if (klass.name === 'Row') {
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

// tslint:disable-next-line variable-name
const FakeMutation = {
  methods: Mutation.methods,
  convertToBytes: sinon.spy(value => {
    if (value === ROW_ID) {
      return CONVERTED_ROW_ID;
    }
    return value;
  }),
  convertFromBytes: sinon.spy(value => {
    return value;
  }),
  parseColumnName: sinon.spy(column => {
    return Mutation.parseColumnName(column);
  }),
  parse: sinon.spy(entry => {
    return {
      mutations: entry,
    };
  }),
};

// tslint:disable-next-line variable-name
const FakeFilter = {
  parse: sinon.spy(filter => {
    return filter;
  }),
};

describe('Bigtable/Row', () => {
  // tslint:disable-next-line variable-name
  let Row;
  // tslint:disable-next-line variable-name
  let RowError;
  let row;

  before(() => {
    // tslint:disable-next-line variable-name
    const Fake = proxyquire('../src/row.js', {
      '@google-cloud/promisify': fakePromisify,
      './mutation.js': {Mutation: FakeMutation},
      './filter.js': {Filter: FakeFilter},
    });
    Row = Fake.Row;
    RowError = Fake.RowError;
  });

  beforeEach(() => {
    row = new Row(TABLE, ROW_ID);
  });

  afterEach(() => {
    Object.keys(FakeMutation).forEach(spy => {
      if (FakeMutation[spy].resetHistory) {
        FakeMutation[spy].resetHistory();
      }
    });
  });

  describe('instantiation', () => {
    it('should promisify all the things', () => {
      assert(promisified);
    });

    it('should localize Bigtable instance', () => {
      assert.strictEqual(row.bigtable, TABLE.bigtable);
    });

    it('should localize Table instance', () => {
      assert.strictEqual(row.table, TABLE);
    });

    it('should localize ID', () => {
      assert.strictEqual(row.id, ROW_ID);
    });

    it('should create an empty data object', () => {
      assert.deepStrictEqual(row.data, {});
    });
  });

  describe('formatChunks_', () => {
    let convert = FakeMutation.convertFromBytes;

    beforeEach(() => {
      convert = FakeMutation.convertFromBytes;
      FakeMutation.convertFromBytes = sinon.spy(val => {
        return val.replace('unconverted', 'converted');
      });
    });

    afterEach(() => {
      FakeMutation.convertFromBytes = convert;
    });

    it('should format the chunks', () => {
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

    it('should inherit the row key', () => {
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

    it('should inherit the family name', () => {
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

    it('should inherit the qualifier', () => {
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

    it('should not decode values when applicable', () => {
      const formatOptions = {
        decode: false,
      };

      FakeMutation.convertFromBytes = sinon.spy((val, options) => {
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

    it('should use the encoding scheme provided', () => {
      const formatOptions = {
        encoding: 'binary',
      };

      FakeMutation.convertFromBytes = sinon.spy((val, options) => {
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

    it('should discard old data when reset row is found', () => {
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

  describe('formatFamilies_', () => {
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

    it('should format the families into a user-friendly format', () => {
      const formatted = Row.formatFamilies_(families);
      assert.deepStrictEqual(formatted, formattedRowData);

      const convertStpy = FakeMutation.convertFromBytes;
      assert.strictEqual(convertStpy.callCount, 2);
      assert.strictEqual(convertStpy.getCall(0).args[0], 'test-column');
      assert.strictEqual(convertStpy.getCall(1).args[0], 'test-value');
    });

    it('should optionally not decode the value', () => {
      const formatted = Row.formatFamilies_(families, {
        decode: false,
      });

      assert.deepStrictEqual(formatted, formattedRowData);

      const convertStpy = FakeMutation.convertFromBytes;
      assert.strictEqual(convertStpy.callCount, 1);
      assert.strictEqual(convertStpy.getCall(0).args[0], 'test-column');
    });
  });

  describe('create', () => {
    it('should provide the proper request options', done => {
      row.table.mutate = (entry, gaxOptions) => {
        assert.strictEqual(entry.key, row.id);
        assert.strictEqual(entry.data, undefined);
        assert.strictEqual(entry.method, Mutation.methods.INSERT);
        assert.strictEqual(gaxOptions, undefined);
        done();
      };

      row.create(assert.ifError);
    });

    it('should accept data to populate the row', done => {
      const options = {
        entry: {
          a: 'a',
          b: 'b',
        },
      };

      row.table.mutate = entry => {
        assert.strictEqual(entry.data, options.entry);
        done();
      };

      row.create(options, assert.ifError);
    });

    it('should accept options when inserting data', done => {
      const options = {
        gaxOptions: {},
      };

      row.table.mutate = (entry, gaxOptions) => {
        assert.strictEqual(gaxOptions, options.gaxOptions);
        done();
      };

      row.create(options, assert.ifError);
    });

    it('should return an error to the callback', done => {
      const err = new Error('err');
      const response = {};

      row.table.mutate = (entry, gaxOptions, callback) => {
        callback(err, response);
      };

      row.create((err_, row, apiResponse) => {
        assert.strictEqual(err, err_);
        assert.strictEqual(row, null);
        assert.strictEqual(response, apiResponse);
        done();
      });
    });

    it('should return the Row instance', done => {
      const response = {};

      row.table.mutate = (entry, gaxOptions, callback) => {
        callback(null, response);
      };

      row.create((err, row_, apiResponse) => {
        assert.ifError(err);
        assert.strictEqual(row, row_);
        assert.strictEqual(response, apiResponse);
        done();
      });
    });
  });

  describe('createRules', () => {
    const rules = [
      {
        column: 'a:b',
        append: 'c',
        increment: 1,
      },
    ];

    it('should throw if a rule is not provided', () => {
      assert.throws(() => {
        row.createRules();
      }, /At least one rule must be provided\./);
    });

    it('should read/modify/write rules', done => {
      row.bigtable.request = (config, callback) => {
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

        callback(); // done()
      };

      row.createRules(rules, done);
    });

    it('should use an appProfileId', done => {
      const bigtableInstance = row.bigtable;
      bigtableInstance.appProfileId = 'app-profile-id-12345';

      bigtableInstance.request = config => {
        assert.strictEqual(
          config.reqOpts.appProfileId,
          bigtableInstance.appProfileId
        );
        done();
      };

      row.createRules(rules, assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      row.bigtable.request = config => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      row.createRules(rules, gaxOptions, assert.ifError);
    });
  });

  describe('delete', () => {
    it('should provide the proper request options', done => {
      row.table.mutate = (mutation, gaxOptions, callback) => {
        assert.strictEqual(mutation.key, ROW_ID);
        assert.strictEqual(mutation.method, FakeMutation.methods.DELETE);
        assert.deepStrictEqual(gaxOptions, {});
        callback(); // done()
      };

      row.delete(done);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      row.table.mutate = (mutation, gaxOptions_) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.delete(gaxOptions, done);
    });

    it('should remove existing data', done => {
      const gaxOptions = {};
      row.table.mutate = (mutation, gaxOptions_) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.delete(gaxOptions, done);
      assert.strictEqual(row.data, undefined);
    });
  });

  describe('deleteCells', () => {
    const columns = ['a:b', 'c'];

    it('should provide the proper request options', done => {
      row.table.mutate = (mutation, gaxOptions, callback) => {
        assert.strictEqual(mutation.key, ROW_ID);
        assert.strictEqual(mutation.data, columns);
        assert.strictEqual(mutation.method, FakeMutation.methods.DELETE);
        assert.deepStrictEqual(gaxOptions, {});
        callback(); // done()
      };

      row.deleteCells(columns, done);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      row.table.mutate = (mutation, gaxOptions_) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.deleteCells(columns, gaxOptions, done);
    });

    it('should remove existing data', done => {
      row.table.mutate = (mutation, gaxOptions, callback) => {
        callback(); // done()
      };

      row.deleteCells(columns, done);
      assert.strictEqual(row.data, undefined);
    });
  });

  describe('exists', () => {
    it('should not require gaxOptions', done => {
      row.getMetadata = gaxOptions => {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      row.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', done => {
      const gaxOptions = {};

      row.getMetadata = gaxOptions_ => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error is RowError', done => {
      const error = new RowError('Error.');

      row.getMetadata = (gaxOptions, callback) => {
        callback(error);
      };

      row.exists((err, exists) => {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if not RowError', done => {
      const error = new Error('Error.');

      row.getMetadata = (gaxOptions, callback) => {
        callback(error);
      };

      row.exists(err => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', done => {
      row.getMetadata = (gaxOptions, callback) => {
        callback(null, {});
      };

      row.exists((err, exists) => {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('filter', () => {
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

    beforeEach(() => {
      FakeMutation.parse.resetHistory();
      FakeFilter.parse.resetHistory();
    });

    it('should provide the proper request options', done => {
      const filter = {
        column: 'a',
      };

      const fakeParsedFilter = {
        column: 'b',
      };

      FakeFilter.parse = sinon.spy(() => {
        return fakeParsedFilter;
      });

      FakeMutation.parse = sinon.spy(() => {
        return fakeMutations;
      });

      row.bigtable.request = config => {
        assert.strictEqual(config.client, 'BigtableClient');
        assert.strictEqual(config.method, 'checkAndMutateRow');
        assert.strictEqual(config.reqOpts.tableName, TABLE.name);
        assert.strictEqual(config.reqOpts.rowKey, CONVERTED_ROW_ID);
        assert.deepStrictEqual(
          config.reqOpts.predicateFilter,
          fakeParsedFilter
        );
        assert.deepStrictEqual(
          config.reqOpts.trueMutations,
          fakeMutations.mutations
        );
        assert.deepStrictEqual(
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

    it('should accept gaxOptions', done => {
      const filter = {
        column: 'a',
      };
      const gaxOptions = {};

      row.bigtable.request = config => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      row.filter(filter, {gaxOptions}, assert.ifError);
    });

    it('should use an appProfileId', done => {
      const filter = {
        column: 'a',
      };

      const bigtableInstance = row.bigtable;
      bigtableInstance.appProfileId = 'app-profile-id-12345';

      bigtableInstance.request = config => {
        assert.strictEqual(
          config.reqOpts.appProfileId,
          bigtableInstance.appProfileId
        );
        done();
      };

      row.filter(filter, assert.ifError);
    });

    it('should return an error to the callback', done => {
      const err = new Error('err');
      const response = {};

      row.bigtable.request = (config, callback) => {
        callback(err, response);
      };

      row.filter({}, mutations, (err_, matched, apiResponse) => {
        assert.strictEqual(err, err_);
        assert.strictEqual(matched, null);
        assert.strictEqual(response, apiResponse);
        done();
      });
    });

    it('should return a matched flag', done => {
      const response = {
        predicateMatched: true,
      };

      row.bigtable.request = (config, callback) => {
        callback(null, response);
      };

      row.filter({}, mutations, (err, matched, apiResponse) => {
        assert.ifError(err);
        assert(matched);
        assert.strictEqual(response, apiResponse);
        done();
      });
    });
  });

  describe('get', () => {
    it('should provide the proper request options', done => {
      row.table.getRows = reqOpts => {
        assert.strictEqual(reqOpts.keys[0], ROW_ID);
        assert.strictEqual(reqOpts.filter, undefined);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 0);
        done();
      };

      row.get(assert.ifError);
    });

    it('should create a filter for a single column', done => {
      const keys = ['a:b'];

      const expectedFilter = [
        {
          family: 'a',
        },
        {
          column: 'b',
        },
      ];

      row.table.getRows = reqOpts => {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 1);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        done();
      };

      row.get(keys, assert.ifError);
    });

    it('should create a filter for multiple columns', done => {
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

      row.table.getRows = reqOpts => {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);

        const spy = FakeMutation.parseColumnName;

        assert.strictEqual(spy.callCount, 2);
        assert.strictEqual(spy.getCall(0).args[0], keys[0]);
        assert.strictEqual(spy.getCall(1).args[0], keys[1]);
        done();
      };

      row.get(keys, assert.ifError);
    });

    it('should respect supplying only family names', done => {
      const keys = ['a'];

      const expectedFilter = [
        {
          family: 'a',
        },
      ];

      row.table.getRows = reqOpts => {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 1);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        done();
      };

      row.get(keys, assert.ifError);
    });

    it('should respect the options object', done => {
      const keys = ['a:b'];
      // tslint:disable-next-line no-any
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

      row.table.getRows = reqOpts => {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 1);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        assert.strictEqual(reqOpts.decode, options.decode);
        done();
      };

      row.get(keys, options, assert.ifError);
    });

    it('should respect the options object with filter for multiple columns', done => {
      const keys = ['a:b', 'c:d'];

      // tslint:disable-next-line no-any
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

      row.table.getRows = reqOpts => {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);
        assert.strictEqual(FakeMutation.parseColumnName.callCount, 2);
        assert(FakeMutation.parseColumnName.calledWith(keys[0]));
        assert.strictEqual(reqOpts.decode, options.decode);
        done();
      };

      row.get(keys, options, assert.ifError);
    });

    it('should respect filter in options object', done => {
      const keys = [];

      const options = {
        decode: false,
        filter: [{column: 'abc'}],
      };
      const expectedFilter = options.filter;

      row.table.getRows = reqOpts => {
        assert.deepStrictEqual(reqOpts.filter, expectedFilter);
        done();
      };

      row.get(keys, options, assert.ifError);
    });

    it('should accept options without keys', done => {
      const options = {
        decode: false,
      };

      row.table.getRows = reqOpts => {
        assert.strictEqual(reqOpts.decode, options.decode);
        assert(!reqOpts.filter);
        done();
      };

      row.get(options, assert.ifError);
    });

    it('should return an error to the callback', done => {
      const error = new Error('err');

      row.table.getRows = (r, callback) => {
        callback(error);
      };

      row.get((err, row) => {
        assert.strictEqual(error, err);
        assert.strictEqual(row, undefined);
        done();
      });
    });

    it('should return a custom error if the row is not found', done => {
      row.table.getRows = (r, callback) => {
        callback(null, []);
      };

      row.get((err, row_) => {
        assert(err instanceof RowError);
        assert.strictEqual(err.message, 'Unknown row: ' + row.id + '.');
        assert.deepStrictEqual(row_, undefined);
        done();
      });
    });

    it('should update the row data upon success', done => {
      const fakeRow = new Row(TABLE, ROW_ID);

      fakeRow.data = {
        a: 'a',
        b: 'b',
      };

      row.table.getRows = (r, callback) => {
        callback(null, [fakeRow]);
      };

      row.get((err, row_) => {
        assert.ifError(err);
        assert.strictEqual(row_, row);
        assert.deepStrictEqual(row.data, fakeRow.data);
        done();
      });
    });

    it('should return only data for the keys provided', done => {
      const fakeRow = new Row(TABLE, ROW_ID);

      fakeRow.data = {
        a: 'a',
        b: 'b',
      };

      const keys = ['a', 'b'];

      row.data = {
        c: 'c',
      };

      row.table.getRows = (r, callback) => {
        callback(null, [fakeRow]);
      };

      row.get(keys, (err, data) => {
        assert.ifError(err);
        assert.deepStrictEqual(Object.keys(data), keys);
        done();
      });
    });
  });

  describe('getMetadata', () => {
    it('should return an error to the callback', done => {
      const error = new Error('err');

      row.get = (options, callback) => {
        callback(error);
      };

      row.getMetadata((err, metadata) => {
        assert.strictEqual(error, err);
        assert.strictEqual(metadata, undefined);
        done();
      });
    });

    it('should return metadata to the callback', done => {
      const fakeMetadata = {
        a: 'a',
        b: 'b',
      };

      row.get = (options, callback) => {
        callback(null, row);
      };

      row.metadata = fakeMetadata;

      row.getMetadata((err, metadata) => {
        assert.ifError(err);
        assert.strictEqual(metadata, fakeMetadata);
        done();
      });
    });

    it('should accept an options object', done => {
      const fakeMetadata = {};
      const fakeOptions = {
        decode: false,
      };

      row.get = (options, callback) => {
        assert.strictEqual(options, fakeOptions);
        callback(null, row);
      };

      row.metadata = fakeMetadata;

      row.getMetadata(fakeOptions, (err, metadata) => {
        assert.ifError(err);
        assert.strictEqual(metadata, fakeMetadata);
        done();
      });
    });
  });

  describe('increment', () => {
    const COLUMN_NAME = 'a:b';
    let formatFamiliesSpy;

    beforeEach(() => {
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

    afterEach(() => {
      formatFamiliesSpy.restore();
    });

    it('should provide the proper request options', done => {
      row.createRules = (reqOpts, gaxOptions) => {
        assert.strictEqual(reqOpts.column, COLUMN_NAME);
        assert.strictEqual(reqOpts.increment, 1);
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      row.increment(COLUMN_NAME, assert.ifError);
    });

    it('should optionally accept an increment amount', done => {
      const increment = 10;

      row.createRules = reqOpts => {
        assert.strictEqual(reqOpts.increment, increment);
        done();
      };

      row.increment(COLUMN_NAME, increment, assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      row.createRules = (reqOpts, gaxOptions_) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.increment(COLUMN_NAME, gaxOptions, assert.ifError);
    });

    it('should accept increment amount and gaxOptions', done => {
      const increment = 10;
      const gaxOptions = {};

      row.createRules = (reqOpts, gaxOptions_) => {
        assert.strictEqual(reqOpts.increment, increment);
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.increment(COLUMN_NAME, increment, gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', done => {
      const error = new Error('err');
      const response = {};

      row.createRules = (r, gaxOptions, callback) => {
        callback(error, response);
      };

      row.increment(COLUMN_NAME, (err, value, apiResponse) => {
        assert.strictEqual(err, error);
        assert.strictEqual(value, null);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });

    it('should pass back the updated value to the callback', done => {
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

      row.createRules = (r, gaxOptions, callback) => {
        callback(null, response);
      };

      row.increment(COLUMN_NAME, (err, value, apiResponse) => {
        assert.ifError(err);
        assert.strictEqual(value, fakeValue);
        assert.strictEqual(apiResponse, response);
        assert.strictEqual(formatFamiliesSpy.callCount, 1);
        assert(formatFamiliesSpy.calledWithExactly(response.row.families));
        done();
      });
    });
  });

  describe('save', () => {
    const data = {
      a: {
        b: 'c',
      },
    };

    it('should insert an object', done => {
      row.table.mutate = (entry, gaxOptions, callback) => {
        assert.strictEqual(entry.data, data);
        callback(); // done()
      };

      row.save(data, done);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      row.table.mutate = (entry, gaxOptions_) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.save(data, gaxOptions, assert.ifError);
    });

    it('should remove existing data', done => {
      const gaxOptions = {};
      row.table.mutate = (entry, gaxOptions_) => {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      row.save(data, gaxOptions, assert.ifError);
      assert.strictEqual(row.data, undefined);
    });
  });

  describe('RowError', () => {
    it('should supply the correct message', () => {
      const error = new RowError('test');
      assert.strictEqual(error.message, 'Unknown row: test.');
    });

    it('should supply a 404 error code', () => {
      const error = new RowError('test');
      assert.strictEqual(error.code, 404);
    });
  });
});
