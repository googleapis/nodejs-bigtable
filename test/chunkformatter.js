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
const proxyquire = require('proxyquire');
const sinon = require('sinon').sandbox.create();
const Mutation = require('../src/mutation.js');
const ROW_ID = 'my-row';
const CONVERTED_ROW_ID = 'my-converted-row';

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
};

describe('Bigtable/ChunkFormatter', function() {
  var ChunkFormatter;
  var chunkFormatter;

  before(function() {
    ChunkFormatter = proxyquire('../src/chunkformatter.js', {
      './mutation.js': FakeMutation,
    });
  });
  beforeEach(function() {
    chunkFormatter = new ChunkFormatter();
  });
  afterEach(function() {
    sinon.restore();
  });
  describe('instantiation', function() {
    it('should have initial state', function() {
      assert(chunkFormatter instanceof ChunkFormatter);
      this.prevRowKey = '';
      this.family = {};
      this.qualifiers = [];
      this.qualifier = {};
      this.row = {};
      this.state = this.newRow;
      assert.deepEqual(chunkFormatter.row, {}, 'invalid initial state');
      assert.deepEqual(chunkFormatter.prevRowKey, '', 'invalid initial state');
      assert.deepEqual(chunkFormatter.family, {}, 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifiers, [], 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifier, {}, 'invalid initial state');
      assert.deepEqual(
        chunkFormatter.state,
        chunkFormatter.newRow,
        'invalid initial state'
      );
    });
    it('calling as function should return chunkformatter instance', function() {
      const instance = ChunkFormatter();
      assert(instance instanceof ChunkFormatter);
    });
  });
  describe('newRow', function() {
    var newRowSpy;
    var callback;
    beforeEach(function() {
      newRowSpy = sinon.spy(chunkFormatter, 'newRow');
      callback = sinon.spy();
    });
    it('should throw exception when row key is undefined ', function() {
      try {
        chunkFormatter.row = {key: 'abc'};
        newRowSpy.call(chunkFormatter, {}, {}, callback);
      } catch (err) {
        //pass
      }
      assert(newRowSpy.threw());
    });
    it('should throw exception when chunk key is undefined ', function() {
      try {
        newRowSpy.call(chunkFormatter, {}, {}, callback);
      } catch (err) {
        //pass
      }
      assert(newRowSpy.threw());
    });
    it('should throw exception when resetRow is true ', function() {
      try {
        newRowSpy.call(
          chunkFormatter,
          {rowKey: 'key', resetRow: true},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(newRowSpy.threw());
    });
    it('should throw exception when resetRow ', function() {
      try {
        newRowSpy.call(chunkFormatter, {resetRow: true}, {}, callback);
      } catch (err) {
        //pass
      }
      assert(newRowSpy.threw());
    });
    it('should throw exception when row key is equal to previous row key ', function() {
      chunkFormatter.prevRowKey = 'key';
      try {
        newRowSpy.call(
          chunkFormatter,
          {rowKey: 'key', resetRow: false},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(newRowSpy.threw());
    });
    it('should throw exception when family name is undefined ', function() {
      try {
        newRowSpy.call(chunkFormatter, {rowKey: 'key'}, {}, callback);
      } catch (err) {
        //pass
      }
      assert(newRowSpy.threw());
    });
    it('should throw exception when qualifier is undefined ', function() {
      try {
        newRowSpy.call(
          chunkFormatter,
          {rowKey: 'key', familyName: 'family'},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(newRowSpy.threw());
    });
    it('should throw exception when valueSize>0 and commitRow=true ', function() {
      try {
        newRowSpy.call(
          chunkFormatter,
          {
            rowKey: 'key',
            familyName: 'family',
            qualifier: 'qualifier',
            valueSize: 10,
            commitRow: true,
          },
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(newRowSpy.threw());
    });
    it('should commit 1 row ', function() {
      const chunk = {
        rowKey: 'key',
        familyName: {value: 'family'},
        qualifier: {value: 'qualifier'},
        valueSize: 0,
        timestampMicros: 0,
        labels: [],
        commitRow: true,
        value: 'value',
      };
      const returnValue = chunkFormatter.newRow(chunk, {}, callback);
      assert(returnValue, true, 'reset state failed');
      assert(callback.called);
      assert.equal(
        chunkFormatter.prevRowKey,
        chunk.rowKey,
        'wrong state prevrowkey'
      );
      let row = callback.getCall(0).args[1];
      let expectedRow = {
        key: chunk.rowKey,
        data: {
          family: {
            qualifier: [
              {
                value: chunk.value,
                timestamp: chunk.timestampMicros,
                labels: chunk.labels,
                size: chunk.valueSize,
              },
            ],
          },
        },
      };
      assert.deepEqual(row, expectedRow);
    });
    it('partial row  ', function() {
      const chunk = {
        rowKey: 'key',
        familyName: {value: 'family'},
        qualifier: {value: 'qualifier'},
        valueSize: 0,
        timestampMicros: 0,
        labels: [],
        commitRow: false,
        value: 'value',
      };
      const returnValue = chunkFormatter.newRow(chunk, {}, callback);
      assert.equal(returnValue, false, 'reset state failed');
      assert.equal(callback.called, false, 'wrong callback');
      let partialRow = {
        key: chunk.rowKey,
        data: {
          family: {
            qualifier: [
              {
                value: chunk.value,
                timestamp: chunk.timestampMicros,
                labels: chunk.labels,
                size: chunk.valueSize,
              },
            ],
          },
        },
      };
      assert.deepEqual(chunkFormatter.row, partialRow);
      assert.equal(
        chunkFormatter.state,
        chunkFormatter.rowInProgress,
        'wrong state'
      );
    });
    it('partial cell  ', function() {
      const chunk = {
        rowKey: 'key',
        familyName: {value: 'family'},
        qualifier: {value: 'qualifier'},
        valueSize: 10,
        timestampMicros: 0,
        labels: [],
        commitRow: false,
        value: 'value',
      };
      const returnValue = chunkFormatter.newRow(chunk, {}, callback);
      assert.equal(returnValue, false, 'reset state failed');
      assert.equal(callback.called, false, 'wrong callback');
      let partialRow = {
        key: chunk.rowKey,
        data: {
          family: {
            qualifier: [
              {
                value: chunk.value,
                timestamp: chunk.timestampMicros,
                labels: chunk.labels,
                size: chunk.valueSize,
              },
            ],
          },
        },
      };
      assert.deepEqual(chunkFormatter.row, partialRow);
      assert.equal(
        chunkFormatter.state,
        chunkFormatter.cellInProgress,
        'wrong state'
      );
    });
  });
  describe('rowInProgress', function() {
    var rowInProgressSpy;
    var callback;
    beforeEach(function() {
      rowInProgressSpy = sinon.spy(chunkFormatter, 'rowInProgress');
      callback = sinon.spy();
    });
    it('should throw exception when resetRow and rowkey', function() {
      try {
        rowInProgressSpy.call(
          chunkFormatter,
          {resetRow: true, rowKey: 'key'},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(rowInProgressSpy.threw());
    });
    it('should throw exception when resetRow and familyName', function() {
      try {
        rowInProgressSpy.call(
          chunkFormatter,
          {resetRow: true, familyName: 'family'},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(rowInProgressSpy.threw());
    });
    it('should throw exception when resetRow and qualifier', function() {
      try {
        rowInProgressSpy.call(
          chunkFormatter,
          {resetRow: true, qualifier: 'qualifier'},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(rowInProgressSpy.threw());
    });
    it('should throw exception when resetRow and value', function() {
      try {
        rowInProgressSpy.call(
          chunkFormatter,
          {resetRow: true, value: 'value'},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(rowInProgressSpy.threw());
    });
    it('should throw exception when resetRow and timestampMicros', function() {
      try {
        rowInProgressSpy.call(
          chunkFormatter,
          {resetRow: true, timestampMicros: 10},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(rowInProgressSpy.threw());
    });
    it('should throw exception when rowKey not equal to prevRowKey', function() {
      try {
        chunkFormatter.row = {key: 'key1'};
        rowInProgressSpy.call(chunkFormatter, {rowKey: 'key'}, {}, callback);
      } catch (err) {
        //pass
      }
      assert(rowInProgressSpy.threw());
    });
    it('should throw exception when valueSize>0 and commitRow=true ', function() {
      try {
        rowInProgressSpy.call(
          chunkFormatter,
          {
            valueSize: 10,
            commitRow: true,
          },
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(rowInProgressSpy.threw());
    });
    it('should throw exception when familyName without qualifier ', function() {
      try {
        rowInProgressSpy.call(
          chunkFormatter,
          {
            familyName: 'family',
          },
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(rowInProgressSpy.threw());
    });
    it('should return true on resetRow ', function() {
      const chunk = {resetRow: true};
      const returnValue = chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(returnValue);
      assert(!callback.called);
    });
    it('bare commitRow should produce qualifer ', function() {
      chunkFormatter.qualifiers = [];
      chunkFormatter.row = {
        key: 'key',
        data: {
          family: {
            qualifier: chunkFormatter.qualifiers,
          },
        },
      };
      const chunk = {commitRow: true};
      const returnValue = chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(returnValue);
      assert(callback.called);
      const expectedRow = {
        key: 'key',
        data: {
          family: {
            qualifier: [
              {
                value: undefined,
                size: undefined,
                timestamp: undefined,
                labels: undefined,
              },
            ],
          },
        },
      };
      const row = callback.getCall(0).args[1];
      assert.deepEqual(row, expectedRow, 'row mismatch');
      assert.equal(
        chunkFormatter.state,
        chunkFormatter.newRow,
        'state mismatch'
      );
    });
    it('chunk with qualifier and commit should produce row ', function() {
      chunkFormatter.qualifiers = [];
      chunkFormatter.family = {
        qualifier: chunkFormatter.qualifiers,
      };
      chunkFormatter.row = {
        key: 'key',
        data: {
          family: chunkFormatter.family,
        },
      };
      const chunk = {
        commitRow: true,
        qualifier: {value: 'qualifier2'},
        value: 'value',
        timestampMicros: 0,
        labels: [],
        valueSize: 0,
      };
      const returnValue = chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(returnValue);
      assert(callback.called);
      const expectedRow = {
        key: 'key',
        data: {
          family: {
            qualifier: [],
            qualifier2: [
              {
                value: 'value',
                size: 0,
                timestamp: 0,
                labels: [],
              },
            ],
          },
        },
      };
      const row = callback.getCall(0).args[1];
      assert.deepEqual(row, expectedRow, 'row mismatch');
      assert.equal(
        chunkFormatter.state,
        chunkFormatter.newRow,
        'state mismatch'
      );
    });
    it('chunk with new family and commitRow should produce row', function() {
      chunkFormatter.qualifiers = [];
      chunkFormatter.family = {
        qualifier: chunkFormatter.qualifiers,
      };
      chunkFormatter.row = {
        key: 'key',
        data: {
          family: chunkFormatter.family,
        },
      };
      const chunk = {
        commitRow: true,
        familyName: {value: 'family2'},
        qualifier: {value: 'qualifier2'},
        value: 'value',
        timestampMicros: 0,
        labels: [],
        valueSize: 0,
      };
      const returnValue = chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(returnValue);
      assert(callback.called);
      const expectedRow = {
        key: 'key',
        data: {
          family: {
            qualifier: [],
          },
          family2: {
            qualifier2: [
              {
                value: 'value',
                size: 0,
                timestamp: 0,
                labels: [],
              },
            ],
          },
        },
      };
      const row = callback.getCall(0).args[1];
      assert.deepEqual(row, expectedRow, 'row mismatch');
      assert.equal(
        chunkFormatter.state,
        chunkFormatter.newRow,
        'state mismatch'
      );
    });
    it('partial cell ', function() {
      chunkFormatter.qualifiers = [];
      chunkFormatter.row = {
        key: 'key',
        data: {
          family: {
            qualifier: chunkFormatter.qualifiers,
          },
        },
      };
      const chunk = {
        commitRow: false,
        value: 'value2',
        valueSize: 10,
        timestampMicros: 0,
        labels: [],
      };
      const returnValue = chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(!returnValue);
      assert(!callback.called);
      const expectedState = {
        key: 'key',
        data: {
          family: {
            qualifier: [
              {
                value: 'value2',
                size: 10,
                timestamp: 0,
                labels: [],
              },
            ],
          },
        },
      };
      assert.deepEqual(chunkFormatter.row, expectedState, 'row state mismatch');
      assert.equal(
        chunkFormatter.state,
        chunkFormatter.cellInProgress,
        'state mismatch'
      );
    });
  });
  describe('cellInProgress', function() {
    var cellInProgressSpy;
    var callback;
    beforeEach(function() {
      cellInProgressSpy = sinon.spy(chunkFormatter, 'cellInProgress');
      callback = sinon.spy();
    });
    it('should throw exception when resetRow and rowkey', function() {
      try {
        cellInProgressSpy.call(
          this,
          {resetRow: true, rowKey: 'key'},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(cellInProgressSpy.threw());
    });
    it('should throw exception when resetRow and familyName', function() {
      try {
        cellInProgressSpy.call(
          this,
          {resetRow: true, familyName: 'family'},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(cellInProgressSpy.threw());
    });
    it('should throw exception when resetRow and qualifier', function() {
      try {
        cellInProgressSpy.call(
          this,
          {resetRow: true, qualifier: 'qualifier'},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(cellInProgressSpy.threw());
    });
    it('should throw exception when resetRow and value', function() {
      try {
        cellInProgressSpy.call(
          this,
          {resetRow: true, value: 'value'},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(cellInProgressSpy.threw());
    });
    it('should throw exception when resetRow and timestampMicros', function() {
      try {
        cellInProgressSpy.call(
          this,
          {resetRow: true, timestampMicros: 10},
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(cellInProgressSpy.threw());
    });
    it('should throw exception when rowKey not equal to prevRowKey', function() {
      try {
        chunkFormatter.row = {key: 'key'};
        cellInProgressSpy.call(this, {rowKey: 'key'}, {}, callback);
      } catch (err) {
        //pass
      }
      assert(cellInProgressSpy.threw());
    });
    it('should throw exception when valueSize>0 and commitRow=true ', function() {
      try {
        cellInProgressSpy.call(
          this,
          {
            valueSize: 10,
            commitRow: true,
          },
          {},
          callback
        );
      } catch (err) {
        //pass
      }
      assert(cellInProgressSpy.threw());
    });
    it('should return true on resetRow ', function() {
      const chunk = {resetRow: true};
      const returnValue = chunkFormatter.cellInProgress(chunk, {}, callback);
      assert(returnValue);
      assert(!callback.called);
    });
    it('should produce row on commitRow', function() {
      chunkFormatter.qualifier = {
        value: 'value',
        size: 0,
        timestamp: 0,
        labels: [],
      };
      chunkFormatter.qualifiers = [chunkFormatter.qualifier];
      chunkFormatter.family = {
        qualifier: chunkFormatter.qualifiers,
      };
      chunkFormatter.row = {
        key: 'key',
        data: {
          family: chunkFormatter.family,
        },
      };
      const chunk = {
        commitRow: true,
        value: '2',
      };
      const returnValue = chunkFormatter.cellInProgress(chunk, {}, callback);
      assert(returnValue);
      assert(callback.called);
      const expectedRow = {
        key: 'key',
        data: {
          family: {
            qualifier: [
              {
                value: 'value2',
                size: 0,
                timestamp: 0,
                labels: [],
              },
            ],
          },
        },
      };
      const row = callback.getCall(0).args[1];
      assert.deepEqual(row, expectedRow, 'row mismatch');
      assert.equal(
        chunkFormatter.state,
        chunkFormatter.newRow,
        'state mismatch'
      );
    });
    it('without commitRow should change state to rowInProgress', function() {
      chunkFormatter.qualifier = {
        value: 'value',
        size: 0,
        timestamp: 0,
        labels: [],
      };
      chunkFormatter.qualifiers = [chunkFormatter.qualifier];
      chunkFormatter.family = {
        qualifier: chunkFormatter.qualifiers,
      };
      chunkFormatter.row = {
        key: 'key',
        data: {
          family: chunkFormatter.family,
        },
      };
      const chunk = {
        commitRow: false,
        value: '2',
        valueSize: 0,
      };
      const returnValue = chunkFormatter.cellInProgress(chunk, {}, callback);
      assert(!returnValue);
      assert(!callback.called);
      const expectedState = {
        key: 'key',
        data: {
          family: {
            qualifier: [
              {
                value: 'value2',
                size: 0,
                timestamp: 0,
                labels: [],
              },
            ],
          },
        },
      };
      assert.deepEqual(chunkFormatter.row, expectedState, 'row mismatch');
      assert.equal(
        chunkFormatter.state,
        chunkFormatter.rowInProgress,
        'state mismatch'
      );
    });
  });
  describe('onStreamEnd', function() {
    var callback;
    beforeEach(function() {
      callback = sinon.spy();
    });
    it('pending row should callback with error', function() {
      chunkFormatter.row = {key: 'key'};
      chunkFormatter.onStreamEnd(callback);
      assert(callback.called);
      const err = callback.getCall(0).args[0];
      assert(err);
    });
    it('completed row should callback with null', function() {
      chunkFormatter.row = {};
      chunkFormatter.onStreamEnd(callback);
      assert(callback.called);
      const err = callback.getCall(0).args[0];
      assert(!err);
    });
  });
  describe('formatChunks', function() {
    var callback;
    // var formatChunksSpy;
    beforeEach(function() {
      // formatChunksSpy = sinon.spy(chunkFormatter.formatChunks);
      callback = sinon.spy();
    });
    it('when current state returns true it should reset state', function() {
      chunkFormatter.state = sinon.spy(function() {
        return true;
      });
      chunkFormatter.row = {key: 'key'};
      const chunks = [{key: 'key'}];
      chunkFormatter.formatChunks(chunks, {}, callback);
      assert.deepEqual(chunkFormatter.row, {}, ' state mismatch');
    });
    it('when current state throws exception it should reset state', function() {
      chunkFormatter.state = sinon.spy(function() {
        throw new Error('error');
      });
      chunkFormatter.row = {key: 'key'};
      const chunks = [{key: 'key'}];
      chunkFormatter.formatChunks(chunks, {}, callback);
      assert.deepEqual(chunkFormatter.row, {}, ' state mismatch');
    });
    it('when current state returns false it should keep state', function() {
      chunkFormatter.state = sinon.spy(function() {
        return false;
      });
      chunkFormatter.row = {key: 'key'};
      const chunks = [{key: 'key'}];
      chunkFormatter.formatChunks(chunks, {}, callback);
      assert.deepEqual(chunkFormatter.row, {key: 'key'}, ' state mismatch');
    });
  });
});
