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
import * as Long from 'long';
import * as sn from 'sinon';

import {IMutateRowRequest, Mutation} from '../src/mutation.js';

const sinon = sn.createSandbox();

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
      const mutation = new Mutation(fakeData);

      assert.strictEqual(mutation.key, fakeData.key);
      assert.strictEqual(mutation.method, fakeData.method);
      assert.strictEqual(mutation.data, fakeData.data);
    });
  });

  describe('convertFromBytes', function() {
    describe('isPossibleNumber', function() {
      it('should convert a base64 encoded number when true', function() {
        const num = 10;
        const encoded =
            Buffer.from(Long.fromNumber(num).toBytesBE()).toString('base64');
        const decoded = Mutation.convertFromBytes(encoded, {
          isPossibleNumber: true,
        });

        assert.strictEqual(num, decoded);
      });
      it('should not convert a base64 encoded number when false', function() {
        const num = 10;
        const encoded =
            Buffer.from(Long.fromNumber(num).toBytesBE()).toString('base64');
        const decoded = Mutation.convertFromBytes(encoded);

        assert.notStrictEqual(num, decoded);
      });
    });

    it('should convert a base64 encoded string', function() {
      const message = 'Hello!';
      const encoded = Buffer.from(message).toString('base64');
      const decoded = Mutation.convertFromBytes(encoded);

      assert.strictEqual(message, decoded);
    });

    it('should allow using a custom encoding scheme', function() {
      const message = 'æ';
      const encoded = Buffer.from(message, 'binary').toString('base64');
      const decoded = Mutation.convertFromBytes(encoded, {
        userOptions: {encoding: 'binary'},
      });

      assert.strictEqual(message, decoded);
    });

    it('should return a buffer if decode is set to false', function() {
      const message = 'Hello!';
      const encoded = Buffer.from(message).toString('base64');
      const userOptions = {decode: false};
      const decoded = Mutation.convertFromBytes(encoded, {
        userOptions,
      });

      assert(decoded instanceof Buffer);
      assert.strictEqual(decoded.toString(), message);
    });

    it('should not create a new Buffer needlessly', function() {
      const message = 'Hello!';
      const encoded = Buffer.from(message);
      const stub = sinon.stub(Buffer, 'from');
      const decoded = Mutation.convertFromBytes(encoded);
      assert.strictEqual(stub.called, false);
      assert.strictEqual(decoded.toString(), message);
    });
  });

  describe('convertToBytes', function() {
    it('should not re-wrap buffers', function() {
      const buf = Buffer.from('hello');
      const encoded = Mutation.convertToBytes(buf);

      assert.strictEqual(buf, encoded);
    });

    it('should pack numbers into int64 values', function() {
      const num = 10;
      const encoded = Mutation.convertToBytes(num);
      const decoded = Long.fromBytes(encoded as any).toNumber();

      assert.strictEqual(num, decoded);
    });

    it('should wrap the value in a buffer', function() {
      const message = 'Hello!';
      const encoded = Mutation.convertToBytes(message);

      assert(encoded instanceof Buffer);
      assert.strictEqual(encoded.toString(), message);
    });

    it('should simply return the value if it cannot wrap it', function() {
      const message = true;
      const notEncoded = Mutation.convertToBytes(message);

      assert(!(notEncoded instanceof Buffer));
      assert.strictEqual(message, notEncoded);
    });
  });

  describe('createTimeRange', function() {
    it('should create a time range', function() {
      const timestamp = Date.now();
      const dateObj = new Date(timestamp);
      const range = Mutation.createTimeRange(dateObj, dateObj);

      assert.strictEqual(range.startTimestampMicros, timestamp * 1000);
      assert.strictEqual(range.endTimestampMicros, timestamp * 1000);
    });
  });

  describe('encodeSetCell', function() {
    let convertCalls;
    const fakeTime: any = new Date('2018-1-1');
    const realTimestamp: any = new Date();

    beforeEach(function() {
      sinon.stub(global, 'Date').returns(fakeTime);
      convertCalls = [];
      sinon.stub(Mutation, 'convertToBytes').callsFake(function(value) {
        convertCalls.push(value);
        return value;
      });
    });

    it('should encode a setCell mutation', function() {
      const fakeMutation = {
        follows: {
          gwashington: 1,
          alincoln: 1,
        },
      };

      const cells = Mutation.encodeSetCell(fakeMutation);

      assert.strictEqual(cells.length, 2);

      assert.deepStrictEqual(cells, [
        {
          setCell: {
            familyName: 'follows',
            columnQualifier: 'gwashington',
            timestampMicros: fakeTime * 1000,  // Convert ms to μs
            value: 1,
          },
        },
        {
          setCell: {
            familyName: 'follows',
            columnQualifier: 'alincoln',
            timestampMicros: fakeTime * 1000,  // Convert ms to μs
            value: 1,
          },
        },
      ]);

      assert.strictEqual(convertCalls.length, 4);
      assert.deepStrictEqual(convertCalls, ['gwashington', 1, 'alincoln', 1]);
    });

    it('should optionally accept a timestamp', function() {
      const fakeMutation = {
        follows: {
          gwashington: {
            value: 1,
            timestamp: realTimestamp,
          },
        },
      };

      const cells = Mutation.encodeSetCell(fakeMutation);

      assert.deepStrictEqual(cells, [
        {
          setCell: {
            familyName: 'follows',
            columnQualifier: 'gwashington',
            timestampMicros: realTimestamp * 1000,  // Convert ms to μs
            value: 1,
          },
        },
      ]);

      assert.strictEqual(convertCalls.length, 2);
      assert.deepStrictEqual(convertCalls, ['gwashington', 1]);
    });

    it('should accept buffers', function() {
      const val = Buffer.from('hello');
      const fakeMutation = {
        follows: {
          gwashington: val,
        },
      };

      const cells = Mutation.encodeSetCell(fakeMutation);

      assert.deepStrictEqual(cells, [
        {
          setCell: {
            familyName: 'follows',
            columnQualifier: 'gwashington',
            timestampMicros: fakeTime * 1000,  // Convert ms to μs
            value: val,
          },
        },
      ]);

      assert.strictEqual(convertCalls.length, 2);
      assert.deepStrictEqual(convertCalls, ['gwashington', val]);
    });
  });

  describe('encodeDelete', function() {
    let convert;
    let convertCalls: any[] = [];

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
      const mutation = Mutation.encodeDelete();

      assert.deepStrictEqual(mutation, [
        {
          deleteFromRow: {},
        },
      ]);
    });

    it('should array-ify the input', function() {
      const fakeKey = 'follows';
      const mutation = Mutation.encodeDelete(fakeKey);

      assert.deepStrictEqual(mutation, [
        {
          deleteFromFamily: {
            familyName: fakeKey,
          },
        },
      ]);
    });

    it('should create a delete family mutation', function() {
      const fakeColumnName = {
        family: 'followed',
        qualifier: null,
      };

      sinon.stub(Mutation, 'parseColumnName').returns(fakeColumnName);

      const mutation = Mutation.encodeDelete(['follows']);

      assert.deepStrictEqual(mutation, [
        {
          deleteFromFamily: {
            familyName: fakeColumnName.family,
          },
        },
      ]);
    });

    it('should create a delete column mutation', function() {
      const mutation = Mutation.encodeDelete(['follows:gwashington']);

      assert.deepStrictEqual(mutation, [
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
      const createTimeRange = Mutation.createTimeRange;
      const timeCalls: any[] = [];
      const fakeTimeRange = {a: 'a'};

      const fakeMutationData = {
        column: 'follows:gwashington',
        time: {
          start: 1,
          end: 2,
        },
      };

      Mutation.createTimeRange = function(start, end) {
        timeCalls.push({
          start,
          end,
        });
        return fakeTimeRange;
      };

      const mutation = Mutation.encodeDelete(fakeMutationData);

      assert.deepStrictEqual(mutation, [
        {
          deleteFromColumn: {
            familyName: 'follows',
            columnQualifier: 'gwashington',
            timeRange: fakeTimeRange,
          },
        },
      ]);

      assert.strictEqual(timeCalls.length, 1);
      assert.deepStrictEqual(timeCalls[0], fakeMutationData.time);

      Mutation.createTimeRange = createTimeRange;
    });
  });

  describe('parse', function() {
    let toProto;
    let toProtoCalled = false;
    const fakeData = {a: 'a'} as IMutateRowRequest;

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
      const fakeMutationData = {
        key: 'a',
        method: 'b',
        data: 'c',
      } as Mutation;

      const mutation = Mutation.parse(fakeMutationData);

      assert.strictEqual(toProtoCalled, true);
      assert.strictEqual(mutation, fakeData);
    });

    it('should parse a pre-existing mutation object', function() {
      const data = new Mutation({
        key: 'a',
        method: 'b',
        data: [],
      });

      const mutation = Mutation.parse(data);

      assert.strictEqual(toProtoCalled, true);
      assert.strictEqual(mutation, fakeData);
    });
  });

  describe('parseColumnName', function() {
    it('should parse a column name', function() {
      const parsed = Mutation.parseColumnName('a:b');

      assert.strictEqual(parsed.family, 'a');
      assert.strictEqual(parsed.qualifier, 'b');
    });

    it('should parse a family name', function() {
      const parsed = Mutation.parseColumnName('a');

      assert.strictEqual(parsed.family, 'a');
      assert.strictEqual(parsed.qualifier, undefined);
    });
  });

  describe('toProto', function() {
    let convert;
    let convertCalls: any[] = [];

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
      const fakeEncoded = [{a: 'a'}];
      const data = {
        key: 'a',
        method: 'insert',
        data: [],
      };

      const mutation = new Mutation(data);

      Mutation.encodeSetCell = function(_data) {
        assert.strictEqual(_data, data.data);
        return fakeEncoded;
      };

      const mutationProto = mutation.toProto();

      assert.strictEqual(mutationProto.mutations, fakeEncoded);
      assert.strictEqual(mutationProto.rowKey, data.key);
      assert.strictEqual(convertCalls[0], data.key);
    });

    it('should encode delete mutations when method is delete', function() {
      const fakeEncoded = [{b: 'b'}];
      const data = {
        key: 'b',
        method: 'delete',
        data: [],
      };

      (Mutation as any).encodeDelete = function(_data) {
        assert.strictEqual(_data, data.data);
        return fakeEncoded;
      };

      const mutation = new Mutation(data).toProto();

      assert.strictEqual(mutation.mutations, fakeEncoded);
      assert.strictEqual(mutation.rowKey, data.key);
      assert.strictEqual(convertCalls[0], data.key);
    });
  });
});
