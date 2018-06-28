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

const assert = require('assert');
const Long = require('long');
const Mutation = require('../src/mutation.js');
const sinon = require('sinon').createSandbox();

describe('Bigtable/Mutation', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('instantiation', function() {
    const fakeData = {
      key: 'a',
      method: 'b',
      data: 'c',
    };

    it('should localize all the mutation properties', function() {
      let mutation = new Mutation(fakeData);

      assert.strictEqual(mutation.key, fakeData.key);
      assert.strictEqual(mutation.method, fakeData.method);
      assert.strictEqual(mutation.data, fakeData.data);
    });
  });

  describe('convertFromBytes', function() {
    describe('isPossibleNumber', function() {
      it('should convert a base64 encoded number when true', function() {
        let num = 10;
        let encoded = Buffer.from(Long.fromNumber(num).toBytesBE()).toString(
          'base64'
        );
        let decoded = Mutation.convertFromBytes(encoded, {
          isPossibleNumber: true,
        });

        assert.strictEqual(num, decoded);
      });
      it('should not convert a base64 encoded number when false', function() {
        let num = 10;
        let encoded = Buffer.from(Long.fromNumber(num).toBytesBE()).toString(
          'base64'
        );
        let decoded = Mutation.convertFromBytes(encoded);

        assert.notEqual(num, decoded);
      });
    });

    it('should convert a base64 encoded string', function() {
      let message = 'Hello!';
      let encoded = Buffer.from(message).toString('base64');
      let decoded = Mutation.convertFromBytes(encoded);

      assert.strictEqual(message, decoded);
    });

    it('should allow using a custom encoding scheme', function() {
      let message = 'æ';
      let encoded = Buffer.from(message, 'binary').toString('base64');
      let decoded = Mutation.convertFromBytes(encoded, {
        userOptions: {encoding: 'binary'},
      });

      assert.strictEqual(message, decoded);
    });

    it('should return a buffer if decode is set to false', function() {
      let message = 'Hello!';
      let encoded = Buffer.from(message).toString('base64');
      const userOptions = {decode: false};
      let decoded = Mutation.convertFromBytes(encoded, {
        userOptions: userOptions,
      });

      assert(decoded instanceof Buffer);
      assert.strictEqual(decoded.toString(), message);
    });

    it('should not create a new Buffer needlessly', function() {
      let message = 'Hello!';
      let encoded = Buffer.from(message);
      const stub = sinon.stub(Buffer, 'from');
      const decoded = Mutation.convertFromBytes(encoded);
      assert.strictEqual(stub.called, false);
      assert.strictEqual(decoded.toString(), message);
    });
  });

  describe('convertToBytes', function() {
    it('should not re-wrap buffers', function() {
      let buf = Buffer.from('hello');
      let encoded = Mutation.convertToBytes(buf);

      assert.strictEqual(buf, encoded);
    });

    it('should pack numbers into int64 values', function() {
      let num = 10;
      let encoded = Mutation.convertToBytes(num);
      let decoded = Long.fromBytes(encoded).toNumber();

      assert.strictEqual(num, decoded);
    });

    it('should wrap the value in a buffer', function() {
      let message = 'Hello!';
      let encoded = Mutation.convertToBytes(message);

      assert(encoded instanceof Buffer);
      assert.strictEqual(encoded.toString(), message);
    });

    it('should simply return the value if it cannot wrap it', function() {
      let message = true;
      let notEncoded = Mutation.convertToBytes(message);

      assert(!(notEncoded instanceof Buffer));
      assert.strictEqual(message, notEncoded);
    });
  });

  describe('createTimeRange', function() {
    it('should create a time range', function() {
      let timestamp = Date.now();
      let dateObj = new Date(timestamp);
      let range = Mutation.createTimeRange(dateObj, dateObj);

      assert.strictEqual(range.startTimestampMicros, timestamp * 1000);
      assert.strictEqual(range.endTimestampMicros, timestamp * 1000);
    });
  });

  describe('encodeSetCell', function() {
    let convertCalls;
    let fakeTime = new Date('2018-1-1');
    let realTimestamp = new Date();

    beforeEach(function() {
      sinon.stub(global, 'Date').returns(fakeTime);
      convertCalls = [];
      sinon.stub(Mutation, 'convertToBytes').callsFake(function(value) {
        convertCalls.push(value);
        return value;
      });
    });

    it('should encode a setCell mutation', function() {
      let fakeMutation = {
        follows: {
          gwashington: 1,
          alincoln: 1,
        },
      };

      let cells = Mutation.encodeSetCell(fakeMutation);

      assert.strictEqual(cells.length, 2);

      assert.deepEqual(cells, [
        {
          setCell: {
            familyName: 'follows',
            columnQualifier: 'gwashington',
            timestampMicros: fakeTime * 1000, // Convert ms to μs
            value: 1,
          },
        },
        {
          setCell: {
            familyName: 'follows',
            columnQualifier: 'alincoln',
            timestampMicros: fakeTime * 1000, // Convert ms to μs
            value: 1,
          },
        },
      ]);

      assert.strictEqual(convertCalls.length, 4);
      assert.deepEqual(convertCalls, ['gwashington', 1, 'alincoln', 1]);
    });

    it('should optionally accept a timestamp', function() {
      let fakeMutation = {
        follows: {
          gwashington: {
            value: 1,
            timestamp: realTimestamp,
          },
        },
      };

      let cells = Mutation.encodeSetCell(fakeMutation);

      assert.deepEqual(cells, [
        {
          setCell: {
            familyName: 'follows',
            columnQualifier: 'gwashington',
            timestampMicros: realTimestamp * 1000, // Convert ms to μs
            value: 1,
          },
        },
      ]);

      assert.strictEqual(convertCalls.length, 2);
      assert.deepEqual(convertCalls, ['gwashington', 1]);
    });

    it('should accept buffers', function() {
      let val = Buffer.from('hello');
      let fakeMutation = {
        follows: {
          gwashington: val,
        },
      };

      let cells = Mutation.encodeSetCell(fakeMutation);

      assert.deepEqual(cells, [
        {
          setCell: {
            familyName: 'follows',
            columnQualifier: 'gwashington',
            timestampMicros: fakeTime * 1000, // Convert ms to μs
            value: val,
          },
        },
      ]);

      assert.strictEqual(convertCalls.length, 2);
      assert.deepEqual(convertCalls, ['gwashington', val]);
    });
  });

  describe('encodeDelete', function() {
    let convert;
    let convertCalls = [];

    before(function() {
      convert = Mutation.convertToBytes;
      Mutation.convertToBytes = function(value) {
        convertCalls.push(value);
        return value;
      };
    });

    after(function() {
      Mutation.convertToBytes = convert;
    });

    beforeEach(function() {
      convertCalls = [];
    });

    it('should create a delete row mutation', function() {
      let mutation = Mutation.encodeDelete();

      assert.deepEqual(mutation, [
        {
          deleteFromRow: {},
        },
      ]);
    });

    it('should array-ify the input', function() {
      let fakeKey = 'follows';
      let mutation = Mutation.encodeDelete(fakeKey);

      assert.deepEqual(mutation, [
        {
          deleteFromFamily: {
            familyName: fakeKey,
          },
        },
      ]);
    });

    it('should create a delete family mutation', function() {
      let fakeColumnName = {
        family: 'followed',
        qualifier: null,
      };

      sinon.stub(Mutation, 'parseColumnName').returns(fakeColumnName);

      let mutation = Mutation.encodeDelete(['follows']);

      assert.deepEqual(mutation, [
        {
          deleteFromFamily: {
            familyName: fakeColumnName.family,
          },
        },
      ]);
    });

    it('should create a delete column mutation', function() {
      let mutation = Mutation.encodeDelete(['follows:gwashington']);

      assert.deepEqual(mutation, [
        {
          deleteFromColumn: {
            familyName: 'follows',
            columnQualifier: 'gwashington',
            timeRange: undefined,
          },
        },
      ]);

      assert.strictEqual(convertCalls.length, 1);
      assert.strictEqual(convertCalls[0], 'gwashington');
    });

    it('should optionally accept a timerange for column requests', function() {
      let createTimeRange = Mutation.createTimeRange;
      let timeCalls = [];
      let fakeTimeRange = {a: 'a'};

      let fakeMutationData = {
        column: 'follows:gwashington',
        time: {
          start: 1,
          end: 2,
        },
      };

      Mutation.createTimeRange = function(start, end) {
        timeCalls.push({
          start: start,
          end: end,
        });
        return fakeTimeRange;
      };

      let mutation = Mutation.encodeDelete(fakeMutationData);

      assert.deepEqual(mutation, [
        {
          deleteFromColumn: {
            familyName: 'follows',
            columnQualifier: 'gwashington',
            timeRange: fakeTimeRange,
          },
        },
      ]);

      assert.strictEqual(timeCalls.length, 1);
      assert.deepEqual(timeCalls[0], fakeMutationData.time);

      Mutation.createTimeRange = createTimeRange;
    });
  });

  describe('parse', function() {
    let toProto;
    let toProtoCalled = false;
    let fakeData = {a: 'a'};

    before(function() {
      toProto = Mutation.prototype.toProto;
      Mutation.prototype.toProto = function() {
        toProtoCalled = true;
        return fakeData;
      };
    });

    after(function() {
      Mutation.prototype.toProto = toProto;
    });

    it('should create a new mutation object and parse it', function() {
      let fakeMutationData = {
        key: 'a',
        method: 'b',
        data: 'c',
      };

      let mutation = Mutation.parse(fakeMutationData);

      assert.strictEqual(toProtoCalled, true);
      assert.strictEqual(mutation, fakeData);
    });

    it('should parse a pre-existing mutation object', function() {
      let data = new Mutation({
        key: 'a',
        method: 'b',
        data: [],
      });

      let mutation = Mutation.parse(data);

      assert.strictEqual(toProtoCalled, true);
      assert.strictEqual(mutation, fakeData);
    });
  });

  describe('parseColumnName', function() {
    it('should parse a column name', function() {
      let parsed = Mutation.parseColumnName('a:b');

      assert.strictEqual(parsed.family, 'a');
      assert.strictEqual(parsed.qualifier, 'b');
    });

    it('should parse a family name', function() {
      let parsed = Mutation.parseColumnName('a');

      assert.strictEqual(parsed.family, 'a');
      assert.strictEqual(parsed.qualifier, undefined);
    });
  });

  describe('toProto', function() {
    let convert;
    let convertCalls = [];

    before(function() {
      convert = Mutation.convertToBytes;
      Mutation.convertToBytes = function(value) {
        convertCalls.push(value);
        return value;
      };
    });

    after(function() {
      Mutation.convertToBytes = convert;
    });

    beforeEach(function() {
      convertCalls = [];
    });

    it('should encode set cell mutations when method is insert', function() {
      let fakeEncoded = [{a: 'a'}];
      let data = {
        key: 'a',
        method: 'insert',
        data: [],
      };

      let mutation = new Mutation(data);

      Mutation.encodeSetCell = function(_data) {
        assert.strictEqual(_data, data.data);
        return fakeEncoded;
      };

      let mutationProto = mutation.toProto();

      assert.strictEqual(mutationProto.mutations, fakeEncoded);
      assert.strictEqual(mutationProto.rowKey, data.key);
      assert.strictEqual(convertCalls[0], data.key);
    });

    it('should encode delete mutations when method is delete', function() {
      let fakeEncoded = [{b: 'b'}];
      let data = {
        key: 'b',
        method: 'delete',
        data: [],
      };

      Mutation.encodeDelete = function(_data) {
        assert.strictEqual(_data, data.data);
        return fakeEncoded;
      };

      let mutation = new Mutation(data).toProto();

      assert.strictEqual(mutation.mutations, fakeEncoded);
      assert.strictEqual(mutation.rowKey, data.key);
      assert.strictEqual(convertCalls[0], data.key);
    });
  });
});
