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
const Mutation = require('./mutation');
const stream = require('stream');
const Transform = stream.Transform;

class TransformError extends Error {
  constructor(props) {
    super();
    this.name = 'TransformError';
    this.message = `${props.message}: ${JSON.stringify(props.chunk)}`;
  }
}

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
class ChunkTransformer extends Transform {
  constructor(options = {}) {
    options.objectMode = true; // forcing object mode
    super(options);
    this.options = options;
    this._destroyed = false;
    this.lastRowKey = undefined;
    this.reset();
  }

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
  _transform(data, enc, next) {
    for (const chunk of data.chunks) {
      switch (this.state) {
        case RowStateEnum.NEW_ROW:
          this.processNewRow(chunk);
          break;
        case RowStateEnum.ROW_IN_PROGRESS:
          this.processRowInProgress(chunk);
          break;
        case RowStateEnum.CELL_IN_PROGRESS:
          this.processCellInProgress(chunk);
          break;
      }
      if (this._destroyed) {
        return;
      }
    }
    if (data.lastScannedRowKey && data.lastScannedRowKey.length > 0) {
      this.lastRowKey = Mutation.convertFromBytes(data.lastScannedRowKey, {
        userOptions: this.options,
      });
    }
    next();
  }

  /**
   * called at end of the stream.
   * @public
   * @param {callback} cb callback will be called with error if there is any uncommitted row
   */
  _flush(cb) {
    if (typeof this.row.key !== 'undefined') {
      this.destroy(
        new TransformError({
          message: 'Response ended with pending row without commit',
          chunk: null,
        })
      );
      return;
    }
    cb();
  }

  /**
   * called when stream is destroyed.
   * @public
   * @param {error} err error if any
   */
  destroy(err) {
    if (this._destroyed) return;
    this._destroyed = true;
    if (err) {
      this.emit('error', err);
    }
    this.emit('close');
  }

  /**
   * Resets state of formatter
   * @private
   */
  reset() {
    this.prevRowKey = null;
    this.family = {};
    this.qualifiers = [];
    this.qualifier = {};
    this.row = {};
    this.state = RowStateEnum.NEW_ROW;
  }

  /**
   * sets prevRowkey and calls reset when row is committed.
   * @private
   */
  commit() {
    const row = this.row;
    this.reset();
    this.prevRowKey = row.key;
  }

  /**
   * Validates valuesize and commitrow in a chunk
   * @private
   * @param {chunk} chunk chunk to validate for valuesize and commitRow
   */
  validateValueSizeAndCommitRow(chunk) {
    if (chunk.valueSize > 0 && chunk.commitRow) {
      this.destroy(
        new TransformError({
          message: 'A row cannot be have a value size and be a commit row',
          chunk,
        })
      );
    }
  }

  /**
   * Validates resetRow condition for chunk
   * @private
   * @param {chunk} chunk chunk to validate for resetrow
   */
  validateResetRow(chunk) {
    const containsData =
      (chunk.rowKey && chunk.rowKey.length !== 0) ||
      chunk.familyName ||
      chunk.qualifier ||
      (chunk.value && chunk.value.length !== 0) ||
      chunk.timestampMicros > 0;
    if (chunk.resetRow && containsData) {
      this.destroy(
        new TransformError({
          message: 'A reset should have no data',
          chunk,
        })
      );
    }
  }

  /**
   * Validates state for new row.
   * @private
   * @param {chunk} chunk chunk to validate
   * @param {newRowKey} newRowKey newRowKey of the new row
   */
  validateNewRow(chunk, newRowKey) {
    const row = this.row;
    const prevRowKey = this.prevRowKey;
    let errorMessage;

    if (typeof row.key !== 'undefined') {
      errorMessage = 'A new row cannot have existing state';
    } else if (
      typeof chunk.rowKey === 'undefined' ||
      chunk.rowKey.length === 0 ||
      newRowKey.length === 0
    ) {
      errorMessage = 'A row key must be set';
    } else if (chunk.resetRow) {
      errorMessage = 'A new row cannot be reset';
    } else if (prevRowKey === newRowKey) {
      errorMessage = 'A commit happened but the same key followed';
    } else if (!chunk.familyName) {
      errorMessage = 'A family must be set';
    } else if (!chunk.qualifier) {
      errorMessage = 'A column qualifier must be set';
    }
    if (errorMessage) {
      this.destroy(new TransformError({message: errorMessage, chunk}));
      return;
    }
    this.validateValueSizeAndCommitRow(chunk);
  }

  /**
   * Validates state for rowInProgress
   * @private
   * @param {chunk} chunk chunk to validate
   */
  validateRowInProgress(chunk) {
    const row = this.row;
    if (chunk.rowKey && chunk.rowKey.length) {
      const newRowKey = Mutation.convertFromBytes(chunk.rowKey, {
        userOptions: this.options,
      });
      if (
        newRowKey &&
        chunk.rowKey &&
        newRowKey.length !== 0 &&
        newRowKey !== row.key
      ) {
        this.destroy(
          new TransformError({
            message: 'A commit is required between row keys',
            chunk,
          })
        );
        return;
      }
    }
    if (chunk.familyName && !chunk.qualifier) {
      this.destroy(
        new TransformError({
          message: 'A qualifier must be specified',
          chunk,
        })
      );
      return;
    }
    this.validateResetRow(chunk);
    this.validateValueSizeAndCommitRow(chunk);
  }

  /**
   * Validates chunk for cellInProgress state.
   * @private
   * @param {chunk} chunk chunk to validate
   */
  validateCellInProgress(chunk) {
    this.validateResetRow(chunk);
    this.validateValueSizeAndCommitRow(chunk);
  }

  /**
   * Moves to next state in processing.
   * @private
   * @param {chunk} chunk chunk in process
   */
  moveToNextState(chunk) {
    const row = this.row;
    if (chunk.commitRow) {
      this.push(row);
      this.commit();
      this.lastRowKey = row.key;
    } else {
      if (chunk.valueSize > 0) {
        this.state = RowStateEnum.CELL_IN_PROGRESS;
      } else {
        this.state = RowStateEnum.ROW_IN_PROGRESS;
      }
    }
  }

  /**
   * Process chunk when in NEW_ROW state.
   * @private
   * @param {chunks} chunk chunk to process
   */
  processNewRow(chunk) {
    const newRowKey = Mutation.convertFromBytes(chunk.rowKey, {
      userOptions: this.options,
    });
    this.validateNewRow(chunk, newRowKey);
    if (chunk.familyName && chunk.qualifier) {
      const row = this.row;
      row.key = newRowKey;
      row.data = {};
      this.family = row.data[chunk.familyName.value] = {};
      const qualifierName = Mutation.convertFromBytes(chunk.qualifier.value, {
        userOptions: this.options,
      });
      this.qualifiers = this.family[qualifierName] = [];
      this.qualifier = {
        value: Mutation.convertFromBytes(chunk.value, {
          userOptions: this.options,
          isPossibleNumber: true,
        }),
        labels: chunk.labels,
        timestamp: chunk.timestampMicros,
      };
      this.qualifiers.push(this.qualifier);
      this.moveToNextState(chunk);
    }
  }

  /**
   * Process chunk when in ROW_IN_PROGRESS state.
   * @private
   * @param {chunk} chunk chunk to process
   */
  processRowInProgress(chunk) {
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
      const qualifierName = Mutation.convertFromBytes(chunk.qualifier.value, {
        userOptions: this.options,
      });
      this.qualifiers = this.family[qualifierName] =
        this.family[qualifierName] || [];
    }
    this.qualifier = {
      value: Mutation.convertFromBytes(chunk.value, {
        userOptions: this.options,
        isPossibleNumber: true,
      }),
      labels: chunk.labels,
      timestamp: chunk.timestampMicros,
    };
    this.qualifiers.push(this.qualifier);
    this.moveToNextState(chunk);
  }

  /**
   * Process chunk when in CELl_IN_PROGRESS state.
   * @private
   * @param {chunk} chunk chunk to process
   */
  processCellInProgress(chunk) {
    this.validateCellInProgress(chunk);
    if (chunk.resetRow) {
      return this.reset();
    }
    const chunkQualifierValue = Mutation.convertFromBytes(chunk.value, {
      userOptions: this.options,
    });

    if (
      chunkQualifierValue instanceof Buffer &&
      this.qualifier.value instanceof Buffer
    ) {
      this.qualifier.value = Buffer.concat([
        this.qualifier.value,
        chunkQualifierValue,
      ]);
    } else {
      this.qualifier.value += chunkQualifierValue;
    }
    this.moveToNextState(chunk);
  }
}

module.exports = ChunkTransformer;
module.exports.RowStateEnum = RowStateEnum;
