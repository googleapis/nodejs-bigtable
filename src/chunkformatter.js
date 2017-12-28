/*!
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
const Mutation = require('./mutation.js');
/**
 * Enum for chunk formatter Row state.
 * NEW_ROW: inital state or state after commitRow or resetRow
 * ROW_IN_PROGRESS: state after first valid chunk without commitRow or resetRow
 * CELL_IN_PROGRESS: state when valueSize > 0(partial cell)
 */
const RowStateEnum = Object.freeze({
  NEW_ROW: 1,
  ROW_IN_PROGRESS: 2,
  CELL_IN_PROGRESS: 3,
});
/**
 * ChunkFormatter formats all incoming chunks in to row
 * keeps all intermediate state until end of stream.
 * Should use new instance for each request.
 */
function ChunkFormatter() {
  if (!(this instanceof ChunkFormatter)) {
    return new ChunkFormatter();
  }
  this.reset();
}
/**
 * Formats the row chunks into friendly format. Chunks contain 3 properties:
 *
 * `rowContents` The row contents, this essentially is all data pertaining
 *     to a single family.
 *
 * `commitRow` This is a boolean telling us the all previous chunks for this
 *     row are ok to consume.
 *
 * `resetRow` This is a boolean telling us that all the previous chunks are to
 *     be discarded.
 *
 * @public
 *
 * @param {chunk[]} chunks The list of chunks.
 * @param {object} [options] Formatting options.
 * @param {callback} callback callback will be called with parsed rows
 * @throws Error if it detects invalid state
 * @example
 * ChunkFormatter.formatChunks(chunks);
 * // {
 * //   follows: {
 * //     gwashington: [
 * //       {
 * //         value: 2
 * //       }
 * //     ]
 * //   }
 * // }
 */
ChunkFormatter.prototype.formatChunks = function(chunks, options, callback) {
  options = options || {};
  let shouldContinue;
  for (const chunk of chunks) {
    switch (this.state) {
      case RowStateEnum.NEW_ROW:
        shouldContinue = this.newRow(chunk, options, callback);
        break;
      case RowStateEnum.ROW_IN_PROGRESS:
        shouldContinue = this.rowInProgress(chunk, options, callback);
        break;
      case RowStateEnum.CELL_IN_PROGRESS:
        shouldContinue = this.cellInProgress(chunk, options, callback);
        break;
    }
    if (shouldContinue === false) {
      break;
    }
  }
};
/**
 * should be called at end of the stream to check if there is any pending row.
 * @public
 * @throws Error if there is any uncommitted row.
 */
ChunkFormatter.prototype.onStreamEnd = function() {
  this.invariant(
    typeof this.row.key !== 'undefined',
    'Response ended with pending row without commit',
    this.row
  );
};
/**
 * Resets state of formatter
 * @private
 */
ChunkFormatter.prototype.reset = function() {
  this.prevRowKey = '';
  this.family = {};
  this.qualifiers = [];
  this.qualifier = {};
  this.row = {};
  this.state = RowStateEnum.NEW_ROW;
};
/**
 * sets prevRowkey and calls reset when row is committed.
 * @private
 */
ChunkFormatter.prototype.commit = function() {
  const row = this.row;
  this.reset();
  this.prevRowKey = row.key;
};
/**
 * Error checker if true throws error
 * @private
 * @param {boolean} condition condition to evaluate
 * @param {string} text Error text
 * @param {object} chunk chunk object to append to text
 */
ChunkFormatter.prototype.invariant = function(condition, text, chunk) {
  if (condition) {
    throw new Error(`${text}: ${JSON.stringify(chunk)}`);
  }
};
/**
 * Validates valuesize and commitrow in a chunk
 * @private
 * @param {chunk} chunk chunk to validate for valuesize and commitRow
 */
ChunkFormatter.prototype.validateValueSizeAndCommitRow = function(chunk) {
  this.invariant(
    chunk.valueSize > 0 && chunk.commitRow,
    'A row cannot be have a value size and be a commit row',
    chunk
  );
};
/**
 * Validates resetRow condition for chunk
 * @private
 * @param {chunk} chunk chunk to validate for resetrow
 */
ChunkFormatter.prototype.validateResetRow = function(chunk) {
  this.invariant(
    chunk.resetRow &&
      (chunk.rowKey ||
        chunk.familyName ||
        chunk.qualifier ||
        chunk.value ||
        chunk.timestampMicros > 0),
    'A reset should have no data',
    chunk
  );
};
/**
 * Validates state for new row.
 * @private
 * @param {chunk} chunk chunk to validate
 */
ChunkFormatter.prototype.validateNewRow = function(chunk) {
  const row = this.row;
  const prevRowKey = this.prevRowKey;
  const newRowKey = Mutation.convertFromBytes(chunk.rowKey);
  this.invariant(
    typeof row.key !== 'undefined',
    'A new row cannot have existing state',
    chunk
  );
  this.invariant(
    typeof chunk.rowKey === 'undefined' || chunk.rowKey === '',
    'A row key must be set',
    chunk
  );
  this.invariant(chunk.resetRow, 'A new row cannot be reset', chunk);
  this.invariant(
    prevRowKey === newRowKey,
    'A commit happened but the same key followed',
    chunk
  );
  this.invariant(!chunk.familyName, 'A family must be set', chunk);
  this.invariant(!chunk.qualifier, 'A column qualifier must be set', chunk);
  this.validateValueSizeAndCommitRow(chunk);
};
/**
 * Validates state for rowInProgress
 * @private
 * @param {chunk} chunk chunk to validate
 */
ChunkFormatter.prototype.validateRowInProgress = function(chunk) {
  const row = this.row;
  this.validateResetRow(chunk);
  const newRowKey = Mutation.convertFromBytes(chunk.rowKey);
  this.invariant(
    chunk.rowKey && newRowKey !== row.key,
    'A commit is required between row keys',
    chunk
  );
  this.validateValueSizeAndCommitRow(chunk);
  this.invariant(
    chunk.familyName && !chunk.qualifier,
    'A qualifier must be specified',
    chunk
  );
};
/**
 * Validates chunk for cellInProgress state.
 * @private
 * @param {chunk} chunk chunk to validate
 */
ChunkFormatter.prototype.validateCellInProgress = function(chunk) {
  this.validateResetRow(chunk);
  this.validateValueSizeAndCommitRow(chunk);
};
/**
 * Moves to next state in processing.
 * @private
 * @param {chunk} chunk chunk in process
 * @param {*} callback callback to call with row as and when generates
 */
ChunkFormatter.prototype.moveToNextState = function(chunk, callback) {
  const row = this.row;
  let shouldContinue = true;
  if (chunk.commitRow) {
    shouldContinue = callback(null, row);
    this.commit();
  } else {
    if (chunk.valueSize > 0) {
      this.state = RowStateEnum.CELL_IN_PROGRESS;
    } else {
      this.state = RowStateEnum.ROW_IN_PROGRESS;
    }
  }
  return shouldContinue;
};
/**
 * Process chunk when in NEW_ROW state.
 * @private
 * @param {chunks} chunk chunk to process
 * @param {options} options options
 * @param {callback} callback callback to call with row as and when generates
 * @returns {boolean} return false to stop further processing.
 */
ChunkFormatter.prototype.newRow = function(chunk, options, callback) {
  const newRowKey = Mutation.convertFromBytes(chunk.rowKey);
  this.validateNewRow(chunk);
  const row = this.row;
  row.key = newRowKey;
  row.data = {};
  this.family = row.data[chunk.familyName.value] = {};
  const qualifierName = Mutation.convertFromBytes(chunk.qualifier.value);
  this.qualifiers = this.family[qualifierName] = [];
  this.qualifier = {
    value: Mutation.convertFromBytes(chunk.value, options),
    labels: chunk.labels,
    timestamp: chunk.timestampMicros,
  };
  this.qualifiers.push(this.qualifier);
  return this.moveToNextState(chunk, callback);
};
/**
 * Process chunk when in ROW_IN_PROGRESS state.
 * @private
 * @param {chunk} chunk chunk to process
 * @param {*} options  option
 * @param {*} callback callback to call with row as and when generates
 * @returns {boolean} return false to stop further processing.
 */
ChunkFormatter.prototype.rowInProgress = function(chunk, options, callback) {
  this.validateRowInProgress(chunk);
  if (chunk.resetRow) {
    return this.reset();
  }
  const row = this.row;
  if (chunk.familyName) {
    this.family = row.data[chunk.familyName.value] =
      row.data[chunk.familyName.value] || {};
  }
  if (chunk.qualifier) {
    const qualifierName = Mutation.convertFromBytes(chunk.qualifier.value);
    this.qualifiers = this.family[qualifierName] =
      this.family[qualifierName] || [];
  }
  this.qualifier = {
    value: Mutation.convertFromBytes(chunk.value, options),
    labels: chunk.labels,
    timestamp: chunk.timestampMicros,
  };
  this.qualifiers.push(this.qualifier);
  return this.moveToNextState(chunk, callback);
};
/**
 * Process chunk when in CELl_IN_PROGRESS state.
 * @private
 * @param {chunk} chunk chunk to process
 * @param {options} options options
 * @param {callback} callback callback to call with row as and when generates
 * @returns {boolean} return false to stop further processing.
 */
ChunkFormatter.prototype.cellInProgress = function(chunk, options, callback) {
  this.validateCellInProgress(chunk);
  if (chunk.resetRow) {
    return this.reset();
  }
  this.qualifier.value =
    this.qualifier.value + Mutation.convertFromBytes(chunk.value, options);
  return this.moveToNextState(chunk, callback);
};

module.exports = ChunkFormatter;
module.exports.RowStateEnum = RowStateEnum;
