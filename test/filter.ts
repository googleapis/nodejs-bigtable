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

import * as assert from 'assert';
import * as proxyquire from 'proxyquire';
const sn = require('sinon');

const sinon = sn.createSandbox();

const FakeMutation = {
  convertToBytes: sinon.spy(function(value) {
    return value;
  }),
  createTimeRange: sinon.stub(),
};

describe('Bigtable/Filter', function() {
  let Filter;
  let FilterError;
  let filter;

  before(function() {
    const Fake = proxyquire('../src/filter', {
      './mutation.js': {Mutation: FakeMutation},
    });
    Filter = Fake.Filter;
    FilterError = Fake.FilterError;
  });

  beforeEach(function() {
    filter = new Filter();
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('instantiation', function() {
    it('should create an empty array of filters', function() {
      assert.deepStrictEqual(filter.filters_, []);
    });
  });

  describe('convertToRegExpString', function() {
    it('should convert a RegExp to a string', function() {
      const str = Filter.convertToRegExpString(/\d+/);
      assert.strictEqual(str, '\\d+');
    });

    it('should convert an Array of strings to a single string', function() {
      const things = ['a', 'b', 'c'];
      const str = Filter.convertToRegExpString(things);
      assert.strictEqual(str, '(a|b|c)');
    });

    it('should convert an Array of buffers to a single string', function() {
      const faces = [Buffer.from('.|.'), Buffer.from('=|=')];
      const str = Filter.convertToRegExpString(faces);

      assert.strictEqual(str, '(\\.\\|\\.|=\\|=)');
    });

    it('should not do anything to a string', function() {
      const str1 = 'hello';
      const str2 = Filter.convertToRegExpString(str1);

      assert.strictEqual(str1, str2);
    });

    it('should convert a number to a string', function() {
      const str = Filter.convertToRegExpString(1);

      assert.strictEqual(str, '1');
    });

    it('should not do anything to a buffer', function() {
      const str1 = 'hello';
      const buffer = Buffer.from(str1);
      const str2 = Filter.convertToRegExpString(buffer);

      assert.deepStrictEqual(buffer, str2);
    });

    it('should use a binary encoding on a non utf8 buffer', function() {
      const str1 = 'æ';
      const buffer = Buffer.from('æ', 'binary');
      const str2 = Filter.convertToRegExpString(buffer).toString('binary');

      assert.strictEqual(str1, str2);
    });

    it('should throw an error for unknown types', function() {
      const errorReg = /Can't convert to RegExp String from unknown type\./;

      assert.throws(function() {
        Filter.convertToRegExpString(true);
      }, errorReg);
    });
  });

  describe('createRange', function() {
    it('should create a range object', function() {
      const start = 'a';
      const end = 'b';
      const key = 'Key';

      const range = Filter.createRange(start, end, key);

      assert.deepStrictEqual(range, {
        startKeyClosed: start,
        endKeyClosed: end,
      });
    });

    it('should only create start bound', function() {
      const start = 'a';
      const key = 'Key';

      const range = Filter.createRange(start, null, key);

      assert(FakeMutation.convertToBytes.calledWithExactly(start));
      assert.deepStrictEqual(range, {
        startKeyClosed: start,
      });
    });

    it('should only create an end bound', function() {
      const end = 'b';
      const key = 'Key';

      const range = Filter.createRange(null, end, key);

      assert(FakeMutation.convertToBytes.calledWithExactly(end));
      assert.deepStrictEqual(range, {
        endKeyClosed: end,
      });
    });

    it('should optionally accept inclusive flags', function() {
      const start = {
        value: 'a',
        inclusive: false,
      };

      const end = {
        value: 'b',
        inclusive: false,
      };

      const key = 'Key';

      const range = Filter.createRange(start, end, key);

      assert.deepStrictEqual(range, {
        startKeyOpen: start.value,
        endKeyOpen: end.value,
      });
    });
  });

  describe('parse', function() {
    it('should call each individual filter method', function() {
      sinon.spy(Filter.prototype, 'row');
      sinon.spy(Filter.prototype, 'value');

      const fakeFilter = [
        {
          row: 'a',
        },
        {
          value: 'b',
        },
      ];

      Filter.parse(fakeFilter);

      assert.strictEqual(Filter.prototype.row.callCount, 1);
      assert(Filter.prototype.row.calledWithExactly('a'));

      assert.strictEqual(Filter.prototype.value.callCount, 1);
      assert(Filter.prototype.value.calledWithExactly('b'));
    });

    it('should throw an error for unknown filters', function() {
      const fakeFilter = [
        {
          wat: 'a',
        },
      ];

      assert.throws(Filter.parse.bind(null, fakeFilter), FilterError);
    });

    it('should return the filter in JSON form', function() {
      const fakeProto = {a: 'a'};
      const fakeFilter = [
        {
          column: 'a',
        },
      ];

      const stub = sinon.stub(Filter.prototype, 'toProto').returns(fakeProto);

      const parsedFilter = Filter.parse(fakeFilter);

      assert.strictEqual(parsedFilter, fakeProto);
      assert.strictEqual(Filter.prototype.toProto.callCount, 1);

      stub.restore();
    });
  });

  describe('all', function() {
    it('should create a pass all filter when set to true', function(done) {
      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'passAllFilter');
        assert.strictEqual(value, true);
        done();
      };

      filter.all(true);
    });

    it('should create a block all filter when set to false', function(done) {
      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'blockAllFilter');
        assert.strictEqual(value, true);
        done();
      };

      filter.all(false);
    });
  });

  describe('column', function() {
    it('should set the column qualifier regex filter', function(done) {
      const column = {
        name: 'fake-column',
      };

      const spy = sinon.stub(Filter, 'convertToRegExpString').returnsArg(0);

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'columnQualifierRegexFilter');
        assert.strictEqual(value, column.name);
        assert(spy.calledWithExactly(column.name));
        assert(FakeMutation.convertToBytes.calledWithExactly(column.name));
        spy.restore();
        done();
      };

      filter.column(column);
    });

    it('should handle a binary encoded buffer regex filter', function(done) {
      const column = {
        name: Buffer.from('æ', 'binary'),
      };

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'columnQualifierRegexFilter');
        assert.deepStrictEqual(value, column.name);
        assert(FakeMutation.convertToBytes.calledWithExactly(column.name));
        done();
      };

      filter.column(column);
    });

    it('should accept the short-hand version of column', function(done) {
      const column = 'fake-column';

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'columnQualifierRegexFilter');
        assert.strictEqual(value, column);
        done();
      };

      filter.column(column);
    });

    it('should accept the cells per column limit filter', function(done) {
      const column = {
        cellLimit: 10,
      };

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'cellsPerColumnLimitFilter');
        assert.strictEqual(value, column.cellLimit);
        done();
      };

      filter.column(column);
    });

    it('should accept the column range filter', function(done) {
      const fakeRange = {
        a: 'a',
        b: 'b',
      };
      const column = {
        start: 'a',
        end: 'b',
      };

      const spy = sinon.stub(Filter, 'createRange').returns(fakeRange);

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'columnRangeFilter');
        assert.strictEqual(value, fakeRange);
        assert(spy.calledWithExactly(column.start, column.end, 'Qualifier'));
        spy.restore();
        done();
      };

      filter.column(column);
    });
  });

  describe('condition', function() {
    it('should create a condition filter', function(done) {
      const condition = {
        test: {a: 'a'},
        pass: {b: 'b'},
        fail: {c: 'c'},
      };

      const spy = sinon.stub(Filter, 'parse').returnsArg(0);

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'condition');
        assert.deepStrictEqual(value, {
          predicateFilter: condition.test,
          trueFilter: condition.pass,
          falseFilter: condition.fail,
        });

        assert.strictEqual(spy.getCall(0).args[0], condition.test);
        assert.strictEqual(spy.getCall(1).args[0], condition.pass);
        assert.strictEqual(spy.getCall(2).args[0], condition.fail);

        spy.restore();

        done();
      };

      filter.condition(condition);
    });
  });

  describe('family', function() {
    it('should create a family name regex filter', function(done) {
      const familyName = 'fake-family';

      const spy = sinon.stub(Filter, 'convertToRegExpString').returnsArg(0);

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'familyNameRegexFilter');
        assert.strictEqual(value, familyName);
        assert(spy.calledWithExactly(familyName));
        spy.restore();
        done();
      };

      filter.family(familyName);
    });
  });

  describe('interleave', function() {
    it('should create an interleave filter', function(done) {
      const fakeFilters = [{}, {}, {}];

      const spy = sinon.stub(Filter, 'parse').returnsArg(0);

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'interleave');
        assert.strictEqual(value.filters[0], fakeFilters[0]);
        assert.strictEqual(value.filters[1], fakeFilters[1]);
        assert.strictEqual(value.filters[2], fakeFilters[2]);
        assert.strictEqual(spy.getCall(0).args[0], fakeFilters[0]);
        assert.strictEqual(spy.getCall(1).args[0], fakeFilters[1]);
        assert.strictEqual(spy.getCall(2).args[0], fakeFilters[2]);
        spy.restore();
        done();
      };

      filter.interleave(fakeFilters);
    });
  });

  describe('label', function() {
    it('should apply the label transformer', function(done) {
      const label = 'label';

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'applyLabelTransformer');
        assert.strictEqual(value, label);
        done();
      };

      filter.label(label);
    });
  });

  describe('row', function() {
    it('should apply the row key regex filter', function(done) {
      const row = {
        key: 'gwashinton',
      };
      const convertedKey = 'abcd';

      const spy =
          sinon.stub(Filter, 'convertToRegExpString').returns(convertedKey);

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'rowKeyRegexFilter');
        assert.strictEqual(value, convertedKey);
        assert(spy.calledWithExactly(row.key));
        assert(FakeMutation.convertToBytes.calledWithExactly(convertedKey));
        spy.restore();
        done();
      };

      filter.row(row);
    });

    it('should accept the short-hand version of row key', function(done) {
      const rowKey = 'gwashington';

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'rowKeyRegexFilter');
        assert.strictEqual(value, rowKey);
        done();
      };

      filter.row(rowKey);
    });

    it('should set the row sample filter', function(done) {
      const row = {
        sample: 10,
      };

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'rowSampleFilter');
        assert.strictEqual(value, row.sample);
        done();
      };

      filter.row(row);
    });

    it('should set the cells per row offset filter', function(done) {
      const row = {
        cellOffset: 10,
      };

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'cellsPerRowOffsetFilter');
        assert.strictEqual(value, row.cellOffset);
        done();
      };

      filter.row(row);
    });

    it('should set the cells per row limit filter', function(done) {
      const row = {
        cellLimit: 10,
      };

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'cellsPerRowLimitFilter');
        assert.strictEqual(value, row.cellLimit);
        done();
      };

      filter.row(row);
    });
  });

  describe('set', function() {
    it('should create a filter object', function() {
      const key = 'notARealFilter';
      const value = {a: 'b'};

      filter.set(key, value);

      assert.strictEqual(filter.filters_[0][key], value);
    });
  });

  describe('sink', function() {
    it('should set the sink filter', function(done) {
      const sink = true;

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'sink');
        assert.strictEqual(value, sink);
        done();
      };

      filter.sink(sink);
    });
  });

  describe('time', function() {
    it('should set the timestamp range filter', function(done) {
      const fakeTimeRange = {
        start: 10,
        end: 10,
      };

      const spy = FakeMutation.createTimeRange.returns(fakeTimeRange);

      filter.set = function(filterName, value) {
        assert.strictEqual(filterName, 'timestampRangeFilter');
        assert.strictEqual(value, fakeTimeRange);
        assert(spy.calledWithExactly(fakeTimeRange.start, fakeTimeRange.end));
        done();
      };

      filter.time(fakeTimeRange);
    });
  });

  describe('toProto', function() {
    it('should return null when no filters are present', function() {
      const filter = new Filter();
      const filterProto = filter.toProto();

      assert.strictEqual(filterProto, null);
    });

    it('should return a plain filter if there is only 1', function() {
      filter.filters_ = [{}];

      const filterProto = filter.toProto();

      assert.strictEqual(filterProto, filter.filters_[0]);
    });

    it('should create a chain filter if there are multiple', function() {
      filter.filters_ = [{}, {}];

      const filterProto = filter.toProto();

      assert.strictEqual(filterProto.chain.filters, filter.filters_);
    });
  });

  describe('value', function() {
    it('should set the value regex filter', function(done) {
      const value = {
        value: 'fake-value',
      };
      const fakeRegExValue = 'abcd';
      const fakeConvertedValue = 'dcba';

      const regSpy =
          sinon.stub(Filter, 'convertToRegExpString').returns(fakeRegExValue);

      const bytesSpy = (FakeMutation.convertToBytes = sinon.spy(function() {
        return fakeConvertedValue;
      }));

      filter.set = function(filterName, val) {
        assert.strictEqual(filterName, 'valueRegexFilter');
        assert.strictEqual(fakeConvertedValue, val);
        assert(regSpy.calledWithExactly(value.value));
        assert(bytesSpy.calledWithExactly(fakeRegExValue));
        regSpy.restore();
        done();
      };

      filter.value(value);
    });

    it('should accept the short-hand version of value', function(done) {
      const value = 'fake-value';

      const fakeRegExValue = 'abcd';
      const fakeConvertedValue = 'dcba';

      const regSpy =
          sinon.stub(Filter, 'convertToRegExpString').returns(fakeRegExValue);

      const bytesSpy = (FakeMutation.convertToBytes = sinon.spy(function() {
        return fakeConvertedValue;
      }));

      filter.set = function(filterName, val) {
        assert.strictEqual(filterName, 'valueRegexFilter');
        assert.strictEqual(fakeConvertedValue, val);
        assert(regSpy.calledWithExactly(value));
        assert(bytesSpy.calledWithExactly(fakeRegExValue));
        regSpy.restore();
        done();
      };

      filter.value(value);
    });

    it('should accept the value range filter', function(done) {
      const fakeRange = {
        a: 'a',
        b: 'b',
      };
      const value = {
        start: 'a',
        end: 'b',
      };

      const spy = sinon.stub(Filter, 'createRange').returns(fakeRange);

      filter.set = function(filterName, val) {
        assert.strictEqual(filterName, 'valueRangeFilter');
        assert.strictEqual(val, fakeRange);
        assert(spy.calledWithExactly(value.start, value.end, 'Value'));
        spy.restore();
        done();
      };

      filter.value(value);
    });

    it('should apply the strip label transformer', function(done) {
      const value = {
        strip: true,
      };

      filter.set = function(filterName, val) {
        assert.strictEqual(filterName, 'stripValueTransformer');
        assert.strictEqual(val, value.strip);
        done();
      };

      filter.value(value);
    });
  });

  describe('FilterError', function() {
    it('should set the correct message', function() {
      const err = new FilterError('test');
      assert.strictEqual(err.message, 'Unknown filter: test.');
    });

    it('should set the correct name', function() {
      const err = new FilterError('test');

      assert.strictEqual(err.name, 'FilterError');
    });
  });
});
