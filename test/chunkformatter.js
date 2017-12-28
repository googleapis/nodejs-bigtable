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
const RowStateEnum = require('../src/chunkformatter.js').RowStateEnum;

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
      this.state = RowStateEnum.NEW_ROW;
      assert.deepEqual(chunkFormatter.row, {}, 'invalid initial state');
      assert.deepEqual(chunkFormatter.prevRowKey, '', 'invalid initial state');
      assert.deepEqual(chunkFormatter.family, {}, 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifiers, [], 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifier, {}, 'invalid initial state');
      assert.deepEqual(
        chunkFormatter.state,
        RowStateEnum.NEW_ROW,
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
    var resetSpy;
    var commitSpy;
    beforeEach(function() {
      newRowSpy = sinon.spy(chunkFormatter, 'newRow');
      callback = sinon.spy();
      resetSpy = sinon.spy(chunkFormatter, 'reset');
      commitSpy = sinon.spy(chunkFormatter, 'commit');
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
      chunkFormatter.newRow(chunk, {}, callback);
      assert(resetSpy.called, 'reset state failed');
      assert(commitSpy.called, 'commit row failed');
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
      chunkFormatter.newRow(chunk, {}, callback);
      assert(!resetSpy.called, 'invalid call to reset');
      assert(!commitSpy.called, 'inavlid call to commit');
      assert(!callback.called, 'wrong callback');
      let partialRow = {
        key: chunk.rowKey,
        data: {
          family: {
            qualifier: [
              {
                value: chunk.value,
                timestamp: chunk.timestampMicros,
                labels: chunk.labels,
              },
            ],
          },
        },
      };
      assert.deepEqual(chunkFormatter.row, partialRow);
      assert.equal(
        chunkFormatter.state,
        RowStateEnum.ROW_IN_PROGRESS,
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
      chunkFormatter.newRow(chunk, {}, callback);
      assert(!resetSpy.called, 'invalid call to reset');
      assert(!commitSpy.called, 'inavlid call to commit');
      assert(!callback.called, 'wrong callback');
      let partialRow = {
        key: chunk.rowKey,
        data: {
          family: {
            qualifier: [
              {
                value: chunk.value,
                timestamp: chunk.timestampMicros,
                labels: chunk.labels,
              },
            ],
          },
        },
      };
      assert.deepEqual(chunkFormatter.row, partialRow);
      assert.equal(
        chunkFormatter.state,
        RowStateEnum.CELL_IN_PROGRESS,
        'wrong state'
      );
    });
  });
  describe('rowInProgress', function() {
    var rowInProgressSpy;
    var callback;
    var resetSpy;
    var commitSpy;
    beforeEach(function() {
      rowInProgressSpy = sinon.spy(chunkFormatter, 'rowInProgress');
      callback = sinon.spy();
      resetSpy = sinon.spy(chunkFormatter, 'reset');
      commitSpy = sinon.spy(chunkFormatter, 'commit');
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
    it('should reset on resetRow ', function() {
      const chunk = {resetRow: true};
      chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(resetSpy.called, 'Did not reset');
      assert(!callback.called, 'unexpected callback');
      assert(!commitSpy.called, 'unexpected commit');
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
      chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(commitSpy.called, 'did not call commit');
      assert(resetSpy.called, 'did not call reset');
      assert(callback.called);
      const expectedRow = {
        key: 'key',
        data: {
          family: {
            qualifier: [
              {
                value: undefined,
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
        RowStateEnum.NEW_ROW,
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
      chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(commitSpy.called, 'did not call commit');
      assert(resetSpy.called, 'did not call reset');
      assert(callback.called);
      const expectedRow = {
        key: 'key',
        data: {
          family: {
            qualifier: [],
            qualifier2: [
              {
                value: 'value',
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
        RowStateEnum.NEW_ROW,
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
      chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(commitSpy.called, 'did not call commit');
      assert(resetSpy.called, 'did not call reset');
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
        RowStateEnum.NEW_ROW,
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
      chunkFormatter.rowInProgress(chunk, {}, callback);
      assert(!commitSpy.called, 'invalid call to commit');
      assert(!resetSpy.called, 'invalid call to reset');
      assert(!callback.called);
      const expectedState = {
        key: 'key',
        data: {
          family: {
            qualifier: [
              {
                value: 'value2',
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
        RowStateEnum.CELL_IN_PROGRESS,
        'state mismatch'
      );
    });
  });
  describe('cellInProgress', function() {
    var cellInProgressSpy;
    var callback;
    var resetSpy;
    var commitSpy;
    beforeEach(function() {
      cellInProgressSpy = sinon.spy(chunkFormatter, 'cellInProgress');
      callback = sinon.spy();
      resetSpy = sinon.spy(chunkFormatter, 'reset');
      commitSpy = sinon.spy(chunkFormatter, 'commit');
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
      chunkFormatter.cellInProgress(chunk, {}, callback);
      assert(resetSpy.called, 'did not call reset');
      assert(!commitSpy.called, 'unexpected call to commit');
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
        valueSize: 0,
      };
      chunkFormatter.cellInProgress(chunk, {}, callback);
      assert(commitSpy.called, 'did not call commit');
      assert(resetSpy.called, 'did not call reste');
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
        RowStateEnum.NEW_ROW,
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
      chunkFormatter.cellInProgress(chunk, {}, callback);
      assert(!resetSpy.called, 'invalid call to reset');
      assert(!commitSpy.called, 'invalid call to commit');
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
        RowStateEnum.ROW_IN_PROGRESS,
        'state mismatch'
      );
    });
  });
  describe('onStreamEnd', function() {
    var onStreamEndSpy;
    beforeEach(function() {
      onStreamEndSpy = sinon.spy(chunkFormatter, 'onStreamEnd');
    });
    it('pending row should throw exception', function() {
      chunkFormatter.row = {key: 'key'};
      try {
        onStreamEndSpy.call(chunkFormatter);
      } catch (err) {
        //pass
      }
      assert(onStreamEndSpy.threw());
    });
    it('completed row should complete successfully', function() {
      chunkFormatter.row = {};
      try {
        onStreamEndSpy.call(chunkFormatter);
      } catch (err) {
        //pass
      }
      assert(!onStreamEndSpy.threw());
    });
  });
  describe('formatChunks', function() {
    var callback;
    var newRowSpy;
    var rowInProgressSpy;
    var cellInProgressSpy;
    beforeEach(function() {
      callback = sinon.spy();
      newRowSpy = sinon.spy(chunkFormatter, 'newRow');
      rowInProgressSpy = sinon.spy(chunkFormatter, 'rowInProgress');
      cellInProgressSpy = sinon.spy(chunkFormatter, 'cellInProgress');
    });
    it('when current state is NEW_ROW should call newRow', function() {
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
      chunkFormatter.state = RowStateEnum.NEW_ROW;
      const chunks = [chunk];
      try {
        chunkFormatter.formatChunks(chunks, {}, callback);
      } catch (err) {
        //pass
      }
      assert(newRowSpy.called, 'did not call newRow');
    });
    it('when current state is ROW_IN_PROGRESS should call rowInProgress', function() {
      chunkFormatter.row = {key: 'key'};
      chunkFormatter.state = RowStateEnum.ROW_IN_PROGRESS;
      const chunks = [{key: 'key'}];
      try {
        chunkFormatter.formatChunks(chunks, {}, callback);
      } catch (err) {
        //pass
      }
      assert(rowInProgressSpy.called, 'did not call rowInProgress');
    });
    it('when current state is CELL_IN_PROGRESS should call cellInProgress', function() {
      chunkFormatter.row = {key: 'key'};
      chunkFormatter.state = RowStateEnum.CELL_IN_PROGRESS;
      const chunks = [{key: 'key'}];
      try {
        chunkFormatter.formatChunks(chunks, {}, callback);
      } catch (err) {
        //pass
      }
      assert(cellInProgressSpy.called, 'did not call cellInProgress');
    });
    it('should early terminate loop when callback return false', function() {
      chunkFormatter.row = {key: 'key'};
      chunkFormatter.state = RowStateEnum.CELL_IN_PROGRESS;
      const chunks = [
        {
          rowKey: 'key1',
          familyName: {value: 'family'},
          qualifier: {value: 'qualifier'},
          valueSize: 0,
          timestampMicros: 0,
          labels: [],
          commitRow: true,
          value: 'value',
        },
        {
          rowKey: 'key2',
          familyName: {value: 'family'},
          qualifier: {value: 'qualifier'},
          valueSize: 0,
          timestampMicros: 0,
          labels: [],
          commitRow: true,
          value: 'value',
        },
      ];
      const errors = [];
      const rows = [];
      try {
        chunkFormatter.formatChunks(chunks, {}, function(err, row) {
          if (err) {
            errors.push(err);
          } else {
            rows.push(row);
          }
          return false;
        });
      } catch (err) {
        //pass
      }
      assert.equal(rows.length, 1, 'did not early terminate loop');
    });
  });
  describe('reset', function() {
    it('should reset initial state', function() {
      chunkFormatter.prevRowKey = 'prevkey';
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
      this.state = RowStateEnum.CELL_IN_PROGRESS;
      chunkFormatter.reset();
      assert.deepEqual(chunkFormatter.row, {}, 'invalid initial state');
      assert.deepEqual(chunkFormatter.prevRowKey, '', 'invalid initial state');
      assert.deepEqual(chunkFormatter.family, {}, 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifiers, [], 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifier, {}, 'invalid initial state');
      assert.deepEqual(
        chunkFormatter.state,
        RowStateEnum.NEW_ROW,
        'invalid initial state'
      );
    });
  });
  describe('commit', function() {
    var resetSpy;
    beforeEach(function() {
      resetSpy = sinon.spy(chunkFormatter, 'reset');
    });
    it('should reset to initial state and set prevRowKey', function() {
      chunkFormatter.prevRowKey = '';
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
      this.state = RowStateEnum.CELL_IN_PROGRESS;
      chunkFormatter.commit();
      assert(resetSpy.called, 'did not call reset');
      assert.deepEqual(chunkFormatter.row, {}, 'invalid initial state');
      assert.deepEqual(
        chunkFormatter.prevRowKey,
        'key',
        'invalid initial state'
      );
      assert.deepEqual(chunkFormatter.family, {}, 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifiers, [], 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifier, {}, 'invalid initial state');
      assert.deepEqual(
        chunkFormatter.state,
        RowStateEnum.NEW_ROW,
        'invalid initial state'
      );
    });
  });
  describe('invariant', function() {
    var invariantSpy;
    beforeEach(function() {
      invariantSpy = sinon.spy(chunkFormatter, 'invariant');
    });
    it('should throw error on true', function() {
      try {
        invariantSpy(true, '', '');
      } catch (err) {
        //pass
      }
      assert(invariantSpy.threw(), 'did not threw error');
    });
    it('should not throw error on false', function() {
      try {
        invariantSpy(false, '', '');
      } catch (err) {
        //pass
      }
      assert(!invariantSpy.threw(), 'unexpected error');
    });
  });
  describe('moveToNextState', function() {
    var callback;
    var commitSpy;
    beforeEach(function() {
      commitSpy = sinon.spy(chunkFormatter, 'commit');
      callback = sinon.spy();
    });
    it('chunk with commit row should call callback with row and call commit state', function() {
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
      };
      chunkFormatter.moveToNextState(chunk, callback);
      assert(commitSpy.called, 'did not call commit');
      assert(callback.called);
      const expectedRow = {
        key: 'key',
        data: {
          family: {
            qualifier: [
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
        RowStateEnum.NEW_ROW,
        'state mismatch'
      );
    });
    it('chunk without commitRow and value size>0 should move to CELL_IN_PROGRESS', function() {
      const chunk = {
        commitRow: false,
        valueSize: 10,
      };
      chunkFormatter.state = RowStateEnum.NEW_ROW;
      chunkFormatter.moveToNextState(chunk, callback);
      assert(!commitSpy.called, 'did not call commit');
      assert(!callback.called);
      assert.equal(
        chunkFormatter.state,
        RowStateEnum.CELL_IN_PROGRESS,
        'wrong state'
      );
    });
    it('chunk without commitRow and value size==0 should move to ROW_IN_PROGRESS', function() {
      const chunk = {
        commitRow: false,
        valueSize: 0,
      };
      chunkFormatter.state = RowStateEnum.CELL_IN_PROGRESS;
      chunkFormatter.moveToNextState(chunk, callback);
      assert(!commitSpy.called, 'did not call commit');
      assert(!callback.called);
      assert.equal(
        chunkFormatter.state,
        RowStateEnum.ROW_IN_PROGRESS,
        'wrong state'
      );
    });
  });
});
