/*!
 * Copyright 2017 Google Inc. All Rights Reserved.
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
const Buffer = require('safe-buffer').Buffer;
const EventEmitter = require('events');
const _ = require('lodash');
const util = require('util');

/**
 * The `ReadRowResponse` represents either the complete response or a part of the response
 * of the `RowRequest`. This class `RowMergerStateManager` manages the `ReadRowResponse` and
 * manages the lifecycle of the response therefore create the fully formed `Row` representing
 * the response of the `RowRequest`.
 *
 * The `ReadRowResponse` can either be in following state:-
 * `NewRow` - sees the first response in the stream.
 * `CellInProgress` - sees the first response in the stream.
 *
 * @constructor
 */
function RowMergerStateManager() {
  this.states = {
    new_row: new NewRow(),
    row_in_progress: new RowInProgress(),
    cell_in_progress: new CellInProgress(),
  };
  this.currentState = this.states['new_row'];
  this.lastCompletedRowKey = null;
  this.currentRow = null;
  this.lastScannedRowKey = null;
  EventEmitter.call(this);
}

util.inherits(RowMergerStateManager, EventEmitter);

RowMergerStateManager.prototype.onCompleted = function() {
  this.currentState.handleOnComplete(this);
};

/**
 * The `readRowResponse` may either itself represent the complete response
 * or a part of the response of the `RowRequest`. This method is the one that is invoked
 * by the client to process the next incoming `ReadRowResponse`.
 *
 * @param {Object} readRowResponse
 */
RowMergerStateManager.prototype.consumeNext = function(readRowResponse) {
  const chunks = readRowResponse.chunks;
  const lastScannedRowKey = readRowResponse.lastScannedRowKey;
  if (null === this.lastScannedRowKey) {
    if (lastScannedRowKey) throw new Error('Invalid Response');
  }

  this.lastScannedRowKey = lastScannedRowKey;
  try {
    chunks.forEach(chunk => {
      this.currentState.validateChunk(
        this.currentRow,
        this.lastCompletedRowKey,
        chunk
      );
      if (chunk.resetRow) {
        this.currentRow = null;
        this.currentState = this.states.new_row;
      } else {
        let currentRow = this.currentRow;
        if (this.currentState === this.states.new_row) {
          currentRow = new CurrentRow();
          currentRow.updateCurrentKey(chunk);
          this.currentRow = currentRow;
        } else if (this.currentState === this.states.row_in_progress) {
          currentRow.updateCurrentKey(chunk);
        }
        if (chunk.valueSize > 0) {
          this.currentRow.addPartialCellChunk(chunk);
          this.currentState = this.states.cell_in_progress;
        } else if (this.currentRow.isChunkInProgress()) {
          this.currentRow.addPartialCellChunk(chunk);
          this.currentRow.completeMultiChunkCell();
          this.currentState = this.states.row_in_progress;
        } else {
          this.currentRow.addFullChunk(chunk);
          this.currentState = this.states.row_in_progress;
        }

        if (chunk.commitRow) {
          this.emit('row', this.currentRow.buildRow());
          this.lastCompletedRowKey = this.currentRow.rowKey;
          this.currentRow = null;
          this.currentState = this.states.new_row;
        }
      }
    });
  } catch (error) {
    this.emit('error', error);
  }
};

/**
 * Base class for all the states.
 *
 * @constructor
 */
function RowState() {}

/**
 * This method takes the incoming chunk and introspects if this chunk is valid in the current state.
 * Depending on the current state, the valid conditions can be different.
 *
 * @param {Object} rowInProgress is the current row for which the chunk is incoming.
 * @param {string} previousKey is the row Id of the row.
 * @param {CellChunk} chunk the chunk that needs to be validated.
 */
RowState.prototype.validateChunk = function(rowInProgess, previousKey, chunk) {
  throw new Error(`${util.format(chunk)} cannot be validated`);
};

RowState.prototype.handleOnComplete = function(eventEmitter) {};

/**
 * This class represents the state when the Row is a new row.
 * @constructor
 */
function NewRow() {
  RowState.call(this);
}
util.inherits(NewRow, RowState);

/**
 * Represents a state when the Row is in the process of formation and is incomplete.
 *
 * @constructor
 */
function RowInProgress() {
  RowState.call(this);
}

/**
 * Introspects the incoming Cell Chunk for the preconditions before
 * the Reads row response enters the NewRow state.
 *
 * @param {object} rowInProgress should not exist since the row is yet to be formed.
 * @param {string} previousKey
 * @param {CellChunk} newChunk the incoming chunk that needs to be validated before entering NewRow
 */
NewRow.prototype.validateChunk = function(rowInProgess, previousKey, newChunk) {
  assert(
    rowInProgess === null || !rowInProgess.hasOwnProperty('rowKey'),
    `A new row cannot have existing state: ${util.format(newChunk)}`
  );
  assert(
    newChunk.resetRow === null || !newChunk.resetRow,
    `A new row cannot be reset: ${util.format(newChunk)}`
  );
  assert(newChunk.familyName, `A family must be set: ${util.format(newChunk)}`);
  assert(
    newChunk.rowKey && newChunk.rowKey !== '',
    `A row key must be set: ${util.format(newChunk)}`
  );
  assert(
    previousKey === null || previousKey !== newChunk.rowKey,
    `A commit happened but the same key followed: ${util.format(newChunk)}`
  );
  assert(
    newChunk.qualifier,
    `A column qualifier must be set: ${util.format(newChunk)}`
  );
  if (newChunk.valueSize > 0) {
    assert(
      !newChunk.commitRow,
      `A row cannot have a value size and be a commit row: ${util.format(
        newChunk
      )}`
    );
  }
};
util.inherits(RowInProgress, RowState);

RowInProgress.prototype.handleOnComplete = function(eventEmitter) {
  eventEmitter.emit(
    'error',
    new Error('Got a partial row, but the stream ended')
  );
};

/**
 * Introspects the incoming Cell Chunk for the preconditions before
 * the Reads row response enters the RowInProgress state.
 *
 * @param {object} rowInProgress is the current Row in formation which is yet to be complete.
 * @param {string} previousKey
 * @param {CellChunk} newChunk the incoming chunk that needs to be validated before entering RowInProgress.
 */
RowInProgress.prototype.validateChunk = function(
  rowInProgress,
  previousKey,
  newChunk
) {
  if (newChunk.hasOwnProperty('familyName')) {
    assert(
      newChunk.qualifier,
      `A qualifier must be specified: ${util.format(newChunk)}`
    );
  }
  const newRowKey = validValue(newChunk.rowKey);
  if (newChunk.resetRow) {
    assert(
      (newRowKey === null || newRowKey === '') &&
        !newChunk.hasOwnProperty('familyName') &&
        !newChunk.hasOwnProperty('qualifier') &&
        validValue(newChunk.value, '') === '' &&
        validValue(newChunk.timestampMicros, 0) === 0,
      `A reset should have no data: ${util.format(newChunk)}`
    );
  } else {
    assert(
      newRowKey === null || newRowKey === rowInProgress.rowKey,
      `A commit is required between row keys: ${util.format(newChunk)}`
    );
    if (
      newChunk.hasOwnProperty('valueSize') &&
      newChunk.hasOwnProperty('commitRow')
    ) {
      assert(
        newChunk.valueSize === 0 || !newChunk.commitRow,
        `A row cannot be have a value size and be a commit row: ${util.format(
          newChunk
        )}`
      );
    }
  }
};

/**
 * The state represents when the `Cell` of a `Row` is under formation.
 *
 * @constructor
 */
function CellInProgress() {
  RowState.call(this);
}
util.inherits(CellInProgress, RowState);

CellInProgress.prototype.handleOnComplete = function(eventEmitter) {
  eventEmitter.emit(
    'error',
    new Error('Got a partial row, but the stream ended')
  );
};

/**
 * Introspects the incoming Cell Chunk for the preconditions before
 * the Reads row response enters the CellInProgress state.
 *
 * @param {object} rowInProgress should not exist since the row is yet to be formed.
 * @param {string} previousKey
 * @param {CellChunk} newChunk the incoming chunk that needs to be validated before entering CellInProgress.
 */
CellInProgress.prototype.validateChunk = function(
  rowInProgress,
  previousKey,
  newChunk
) {
  const newRowKey = validValue(newChunk.rowKey);
  if (newChunk.resetRow) {
    assert(
      (newRowKey === null || newRowKey === '') &&
        !newChunk.hasOwnProperty('familyName') &&
        !newChunk.hasOwnProperty('qualifier') &&
        validValue(newChunk.value, '') === '' &&
        validValue(newChunk.timestampMicros, 0) === 0,
      `A reset should have no data: ${util.format(newChunk)}`
    );
  } else {
    assert(
      newRowKey === null || newRowKey !== rowInProgress.rowKey,
      `A commit is required between row keys: ${util.format(newChunk)}`
    );
    if (
      newChunk.hasOwnProperty('valueSize') &&
      newChunk.hasOwnProperty('commitRow')
    ) {
      assert(
        newChunk.valueSize === 0 || !newChunk.commitRow,
        `A row cannot be have a value size and be a commit row: ${util.format(
          newChunk
        )}`
      );
    }
  }
};

/**
 * `CellIdentifier` is the metadata of the `Cell`.
 *
 * @param {CellChunk} chunk
 * @constructor
 */
function CellIdentifier(chunk) {
  this.family = null;
  this.qualifier = null;
  this.timestampMicros = null;
  this.labels = validValue(chunk.labels, '');
  this.updateForFamily(chunk);
}

CellIdentifier.prototype.updateForFamily = function(chunk) {
  const chunkFamily = chunk.familyName.value;
  if (chunkFamily !== this.family) {
    this.family = chunkFamily;
  }
  this.updateForQualifier(chunk);
};

CellIdentifier.prototype.updateForQualifier = function(chunk) {
  this.qualifier = chunk.qualifier.value;
  this.updateForTimestamp(chunk);
};

CellIdentifier.prototype.updateForTimestamp = function(chunk) {
  this.timestampMicros = validValue(chunk.timestampMicros, 0);
  this.labels = validValue(chunk.labels, '');
};

function Cell(family, qualifier, timestamp, value, labels) {
  this.family = family;
  this.qualifier = qualifier;
  this.timestamp = timestamp;
  this.value = validValue(value, '');
  this.labels = validValue(labels, '');
}

/**
 * `CurrentRow` represents the current row in progress.
 *
 * @constructor
 */
function CurrentRow() {
  this.rowKey = null;
  this.currentId = null;
  this.cells = {};
  this.currentFamily = null;
  this.currentFamilyRowCells = null;
  this.previousNoLabelCell = null;
  this.buffer = null;
}

/**
 * Helper function that tells if the `ReadRowResponse` spans multiple reads.
 * @returns {boolean} true if the `CellChunk` spans across multiple reads.
 */
CurrentRow.prototype.isChunkInProgress = function() {
  return this.buffer !== null;
};

/**
 * Signals that the `Cell` which was split across multiple `ReadRowResponse` is complete.
 */
CurrentRow.prototype.completeMultiChunkCell = function() {
  this.addCell(this.buffer.toString());
  this.buffer = null;
};

/**
 * Collects all the information through different stages and constructs
 * `Cell` and adds it to the `CurrentRow`.
 *
 * @param value is the value inside the `Cell`.
 */
CurrentRow.prototype.addCell = function(value) {
  if (this.currentFamily !== this.currentId.family) {
    this.currentFamilyRowCells = [];
    this.currentFamily = this.currentId.family;
    this.cells[this.currentId.family] = this.currentFamilyRowCells;
    this.previousNoLabelCell = null;
  }

  const currentId = this.currentId;
  const cell = new Cell(
    currentId.family,
    currentId.qualifier,
    currentId.timestampMicros,
    value,
    currentId.labels
  );
  if (currentId.labels !== null) {
    this.currentFamilyRowCells.push(cell);
  } else if (!this.isSameTimestampAndQualifier()) {
    this.currentFamilyRowCells.push(cell);
    this.previousNoLabelCell = cell;
  }
};

CurrentRow.prototype.isSameTimestampAndQualifier = function() {
  return (
    this.previousNoLabelCell !== null &&
    this.currentId.timestampMicros ===
      this.previousNoLabelCell.timestampMicros &&
    this.previousNoLabelCell.qualifier === this.currentId.qualifier
  );
};

CurrentRow.prototype.updateCurrentKey = function(chunk) {
  const newRowKey = validValue(chunk.rowKey);
  const currentKey = this.rowKey;
  if (currentKey === null || (null !== newRowKey && newRowKey !== currentKey)) {
    this.rowKey = newRowKey;
    this.currentId = new CellIdentifier(chunk);
    this.currentFamily = null;
    this.cells = {};
    this.currentFamilyRowCells = null;
  } else if (isValidValue(chunk.familyName)) {
    this.currentId.updateForFamily(chunk);
  } else if (isValidValue(chunk.qualifier)) {
    this.currentId.updateForQualifier(chunk);
  } else {
    this.currentId.updateForTimestamp(chunk);
  }
  return chunk;
};

/**
 * Chunk represents the complete response and adds the `Cell` to the `Row`.
 *
 * @param chunk
 */
CurrentRow.prototype.addFullChunk = function(chunk) {
  this.addCell(chunk.value);
};

/**
 * Chunk represents the partial cell and which spans across multiple responses. It adds the content to the `Buffer`
 *
 * @param chunk is the incoming `CellChunk` whose `value` will be buffered.
 */
CurrentRow.prototype.addPartialCellChunk = function(chunk) {
  const buffer = Buffer.from(chunk.value);
  if (this.buffer === null) {
    this.buffer = buffer;
  } else {
    this.buffer = Buffer.concat([this.buffer, buffer]);
  }
};

CurrentRow.prototype._flattenCells = function() {
  let allCells = [];
  const results = _.mapKeys(this.cells, value => {
    return allCells.push(value);
  });
  return _.flatMap(results);
};

CurrentRow.prototype.buildRow = function() {
  const self = this;
  const allCells = this._flattenCells();
  return {
    rowKey: self.rowKey,
    cells: allCells,
  };
};

/**
 * Represents the `ReadRowResponse` corresponding to the `ReadRows` request for Bigtable.ReadRows.
 *
 * @param {Array|bytes} lastScannedRowKey is optional row key of the last row the server has scanned.
 * @param chunks specifies a piece of a row's contents as part of the read response stream.
 * @constructor
 */
function ReadRowsResponse(lastScannedRowKey, chunks) {
  this.lastScannedRowKey = lastScannedRowKey;
  this.chunks = chunks;
}

function isValidValue(value) {
  return typeof value !== 'undefined' && value !== null;
}

function validValue(value, defaultValue) {
  if (typeof value !== 'undefined' && value !== null) {
    return value;
  } else {
    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    }
    return null;
  }
}
exports = module.exports = {
  RowMergerStateManager: RowMergerStateManager,
  ReadRowsResponse: ReadRowsResponse,
};
