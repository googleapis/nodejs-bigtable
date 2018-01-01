/*!
 * Copyright 2018 Google Inc. All Rights Reserved.
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
const stream = require('stream');
const util = require('util');
const Transform = stream.Transform;

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
 * ChunkTransformer formats all incoming chunks in to row
 * keeps all intermediate state until end of stream.
 * Should use new instance for each request.
 */
function ChunkTransformer(options) {
  if (!(this instanceof ChunkTransformer)) {
    return new ChunkTransformer(options);
  }
  this.options = options || {};
  this.options.objectMode = true; // forcing object mode
  Transform.call(this, options);
  this._destroyed = false;
  this.reset();
}
util.inherits(ChunkTransformer, Transform);
/**
 * transform the readrowsresponse chunks into friendly format. Chunks contain 3 properties:
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
 * @param {object} data readrows response containing array of chunks.
 * @param {object} [enc] encoding options.
 * @param {callback} next callback will be called once data is processed, with error if any error in processing
 */
ChunkTransformer.prototype._transform = function(data, enc, next) {
  try {
    for (const chunk of data.chunks) {
      switch (this.state) {
        case RowStateEnum.NEW_ROW:
          this.processNewRow(chunk, this.options);
          break;
        case RowStateEnum.ROW_IN_PROGRESS:
          this.processRowInProgress(chunk, this.options);
          break;
        case RowStateEnum.CELL_IN_PROGRESS:
          this.processCellInProgress(chunk, this.options);
          break;
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * called at end of the stream.
 * @public
 * @param {callback} callback callback will be called with error if there is any uncommitted row
 */
ChunkTransformer.prototype._flush = function(cb) {
  try {
    this.invariant(
      typeof this.row.key !== 'undefined',
      'Response ended with pending row without commit',
      this.row
    );
    cb();
  } catch (err) {
    cb(err);
  }
};

/**
 * called when stream is destroyed.
 * @public
 * @param {error} error error if any
 */
ChunkTransformer.prototype.destroy = function(err) {
  if (this._destroyed) return;
  this._destroyed = true;
  var self = this;
  process.nextTick(function() {
    if (err) {
      self.emit('error', err);
    }
    self.emit('close');
  });
};

/**
 * Resets state of formatter
 * @private
 */
ChunkTransformer.prototype.reset = function() {
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
ChunkTransformer.prototype.commit = function() {
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
ChunkTransformer.prototype.invariant = function(condition, text, chunk) {
  if (condition) {
    throw new Error(`${text}: ${JSON.stringify(chunk)}`);
  }
};
/**
 * Validates valuesize and commitrow in a chunk
 * @private
 * @param {chunk} chunk chunk to validate for valuesize and commitRow
 */
ChunkTransformer.prototype.validateValueSizeAndCommitRow = function(chunk) {
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
ChunkTransformer.prototype.validateResetRow = function(chunk) {
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
ChunkTransformer.prototype.validateNewRow = function(chunk) {
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
ChunkTransformer.prototype.validateRowInProgress = function(chunk) {
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
ChunkTransformer.prototype.validateCellInProgress = function(chunk) {
  this.validateResetRow(chunk);
  this.validateValueSizeAndCommitRow(chunk);
};
/**
 * Moves to next state in processing.
 * @private
 * @param {chunk} chunk chunk in process
 */
ChunkTransformer.prototype.moveToNextState = function(chunk) {
  const row = this.row;
  if (chunk.commitRow) {
    this.push(row);
    this.commit();
  } else {
    if (chunk.valueSize > 0) {
      this.state = RowStateEnum.CELL_IN_PROGRESS;
    } else {
      this.state = RowStateEnum.ROW_IN_PROGRESS;
    }
  }
};
/**
 * Process chunk when in NEW_ROW state.
 * @private
 * @param {chunks} chunk chunk to process
 * @param {options} options options
 * @param {callback} callback callback to call with row as and when generates
 * @returns {boolean} return false to stop further processing.
 */
ChunkTransformer.prototype.processNewRow = function(chunk) {
  const newRowKey = Mutation.convertFromBytes(chunk.rowKey);
  this.validateNewRow(chunk);
  const row = this.row;
  row.key = newRowKey;
  row.data = {};
  this.family = row.data[chunk.familyName.value] = {};
  const qualifierName = Mutation.convertFromBytes(chunk.qualifier.value);
  this.qualifiers = this.family[qualifierName] = [];
  this.qualifier = {
    value: Mutation.convertFromBytes(chunk.value, this.options),
    labels: chunk.labels,
    timestamp: chunk.timestampMicros,
  };
  this.qualifiers.push(this.qualifier);
  this.moveToNextState(chunk);
};
/**
 * Process chunk when in ROW_IN_PROGRESS state.
 * @private
 * @param {chunk} chunk chunk to process
 * @param {*} options  option
 * @param {*} callback callback to call with row as and when generates
 * @returns {boolean} return false to stop further processing.
 */
ChunkTransformer.prototype.processRowInProgress = function(chunk) {
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
    value: Mutation.convertFromBytes(chunk.value, this.options),
    labels: chunk.labels,
    timestamp: chunk.timestampMicros,
  };
  this.qualifiers.push(this.qualifier);
  this.moveToNextState(chunk);
};
/**
 * Process chunk when in CELl_IN_PROGRESS state.
 * @private
 * @param {chunk} chunk chunk to process
 * @param {options} options options
 * @param {callback} callback callback to call with row as and when generates
 * @returns {boolean} return false to stop further processing.
 */
ChunkTransformer.prototype.processCellInProgress = function(chunk) {
  this.validateCellInProgress(chunk);
  if (chunk.resetRow) {
    return this.reset();
  }
  this.qualifier.value =
    this.qualifier.value + Mutation.convertFromBytes(chunk.value, this.options);
  this.moveToNextState(chunk);
};

module.exports = ChunkTransformer;
module.exports.RowStateEnum = RowStateEnum;
