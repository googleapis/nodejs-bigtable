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
function ChunkFormatter() {
  if (!(this instanceof ChunkFormatter)) {
    return new ChunkFormatter();
  }

  this.prevRowKey = '';
  this.family = {};
  this.qualifiers = [];
  this.qualifier = {};
  this.row = {};
  this.state = this.newRow;
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
 *
 * @example
 * Row.formatChunks_(chunks);
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
  chunks.forEach(chunk => {
    if (this.state(chunk, options, callback)) {
      this.state = this.newRow;
      this.family = {};
      this.qualifier = {};
      this.qualifiers = [];
      this.row = {};
    }
  }, this);
};

ChunkFormatter.prototype.onStreamEnd = function() {
  if (typeof this.row.key !== 'undefined') {
    throw new Error('Response ended with pending row without commit');
  }
};

ChunkFormatter.prototype.newRow = function(chunk, options, callback) {
  const row = this.row;
  const prevRowKey = this.prevRowKey;
  if (typeof row.key !== 'undefined') {
    throw new Error('A new row cannot have existing state: ' + chunk);
  }
  if (typeof chunk.rowKey === 'undefined') {
    throw new Error('A row key must be set' + chunk);
  }
  if (chunk.resetRow) {
    throw new Error('A new row cannot be reset: ' + chunk);
  }
  const newRowKey = Mutation.convertFromBytes(chunk.rowKey);
  if (prevRowKey === newRowKey) {
    throw new Error('A commit happened but the same key followed: ' + chunk);
  }
  if (!chunk.familyName) {
    throw new Error('A family must be set: ' + chunk);
  }
  if (!chunk.qualifier) {
    throw new Error('A column qualifier must be set: ' + chunk);
  }
  if (chunk.valueSize > 0 && chunk.commitRow) {
    throw new Error(
      'A row cannot be have a value size and be a commit row: ' + chunk
    );
  }
  row.key = newRowKey;
  row.data = {};
  this.family = row.data[chunk.familyName.value] = {};
  const qualifierName = Mutation.convertFromBytes(chunk.qualifier.value);
  this.qualifiers = this.family[qualifierName] = [];
  this.qualifier = {
    value: Mutation.convertFromBytes(chunk.value, options),
    labels: chunk.labels,
    timestamp: chunk.timestampMicros,
    size: chunk.valueSize,
  };
  this.qualifiers.push(this.qualifier);
  if (chunk.commitRow) {
    this.prevRowKey = row.key;
    callback(null, row);
    return true;
  } else {
    if (chunk.valueSize > 0) {
      this.state = this.cellInProgress;
    } else {
      this.state = this.rowInProgress;
    }
    return false;
  }
};
ChunkFormatter.prototype.rowInProgress = function(chunk, options, callback) {
  const row = this.row;
  if (chunk.resetRow) {
    if (
      chunk.rowKey ||
      chunk.familyName ||
      chunk.qualifier ||
      chunk.value ||
      chunk.timestampMicros > 0
    ) {
      throw new Error('A reset should have no data' + chunk);
    }
    return true;
  }
  const newRowKey = Mutation.convertFromBytes(chunk.rowKey);
  if (chunk.rowKey && newRowKey !== row.key) {
    throw new Error('A commit is required between row keys: ' + chunk);
  }
  if (chunk.valueSize > 0 && chunk.commitRow) {
    throw new Error(
      'A row cannot be have a value size and be a commit row: ' + chunk
    );
  }
  if (chunk.familyName) {
    if (!chunk.qualifier) {
      throw new Error('A qualifier must be specified: ' + chunk);
    }
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
    size: chunk.valueSize,
  };
  this.qualifiers.push(this.qualifier);
  if (chunk.commitRow) {
    this.prevRowKey = row.key;
    callback(null, row);
    return true;
  } else {
    if (chunk.valueSize > 0) {
      this.state = this.cellInProgress;
    }
    return false;
  }
};
ChunkFormatter.prototype.cellInProgress = function(chunk, options, callback) {
  const row = this.row;
  if (chunk.resetRow) {
    if (
      chunk.rowKey ||
      chunk.familyName ||
      chunk.qualifier ||
      chunk.value ||
      chunk.timestampMicros > 0
    ) {
      throw new Error('A reset should have no data' + chunk);
    }
    return true;
  }
  if (chunk.valueSize > 0 && chunk.commitRow) {
    throw new Error(
      'A row cannot be have a value size and be a commit row: ' + chunk
    );
  }
  this.qualifier.value =
    this.qualifier.value + Mutation.convertFromBytes(chunk.value, options);
  this.qualifier.size = 0;
  if (chunk.commitRow) {
    this.prevRowKey = row.key;
    callback(null, row);
    return true;
  } else {
    if (chunk.valueSize === 0) {
      this.state = this.rowInProgress;
    }
    return false;
  }
};

module.exports = ChunkFormatter;
