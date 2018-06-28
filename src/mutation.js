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

const arrify = require('arrify');
const Long = require('long');
const is = require('is');

/**
 * Formats table mutations to be in the expected proto format.
 *
 * @private
 *
 * @class
 * @param {object} mutation
 *
 * @example
 * var mutation = new Mutation({
 *   key: 'gwashington',
 *   method: 'insert',
 *   data: {
 *     jadams: 1
 *   }
 * });
 */
class Mutation {
  constructor(mutation) {
    this.key = mutation.key;
    this.method = mutation.method;
    this.data = mutation.data;
  }

  /**
   * Parses "bytes" returned from proto service.
   *
   * @param {string} bytes - Base64 encoded string.
   * @param {object} [options] Options to device return types
   * @param {boolean} [options.isPossibleNumber] Check if byte is number
   * @param {object} [options.userOptions]
   * @param {boolean} [options.userOptions.decode] Check if decode is required
   * @param {boolean} [options.userOptions.encoding] The encoding to use when
   *     converting the buffer to a string.
   * @returns {string|number|buffer}
   */
  static convertFromBytes(bytes, options) {
    const buf = bytes instanceof Buffer ? bytes : Buffer.from(bytes, 'base64');
    if (options && options.isPossibleNumber && buf.length === 8) {
      const num = Long.fromBytes(buf).toNumber();

      if (Number.MIN_SAFE_INTEGER < num && num < Number.MAX_SAFE_INTEGER) {
        return num;
      }
    }

    const userOptions = (options && options.userOptions) || {};

    if (userOptions.decode === false) {
      return buf;
    }

    return buf.toString(userOptions.encoding);
  }

  /**
   * Converts data into a buffer for proto service.
   *
   * @param {string} data - The data to be sent.
   * @returns {buffer}
   */
  static convertToBytes(data) {
    if (data instanceof Buffer) {
      return data;
    }

    if (is.number(data)) {
      return Buffer.from(Long.fromNumber(data).toBytesBE());
    }

    try {
      return Buffer.from(data);
    } catch (e) {
      return data;
    }
  }

  /**
   * Takes date objects and creates a time range.
   *
   * @param {date} start - The start date.
   * @param {date} end - The end date.
   * @returns {object}
   */
  static createTimeRange(start, end) {
    const range = {};

    if (is.date(start)) {
      range.startTimestampMicros = start.getTime() * 1000;
    }

    if (is.date(end)) {
      range.endTimestampMicros = end.getTime() * 1000;
    }

    return range;
  }

  /**
   * Formats an `insert` mutation to what the proto service expects.
   *
   * @param {object} data - The entity data.
   * @returns {object[]}
   *
   * @example
   * Mutation.encodeSetCell({
   *   follows: {
   *     gwashington: 1,
   *     alincoln: 1
   *   }
   * });
   * // [
   * //   {
   * //     setCell: {
   * //       familyName: 'follows',
   * //       columnQualifier: 'gwashington', // as buffer
   * //       timestampMicros: -1, // -1 means to use the server time
   * //       value: 1 // as buffer
   * //     }
   * //   }, {
   * //     setCell: {
   * //       familyName: 'follows',
   * //       columnQualifier: 'alincoln', // as buffer
   * //       timestampMicros: new Date(), // uses the client's current time
   * //       value: 1 // as buffer
   * //     }
   * //   }
   * // ]
   */
  static encodeSetCell(data) {
    const mutations = [];

    Object.keys(data).forEach(familyName => {
      const family = data[familyName];

      Object.keys(family).forEach(cellName => {
        let cell = family[cellName];

        if (!is.object(cell) || cell instanceof Buffer) {
          cell = {
            value: cell,
          };
        }

        let timestamp = cell.timestamp || new Date();

        if (is.date(timestamp)) {
          timestamp = timestamp.getTime() * 1000;
        }

        const setCell = {
          familyName,
          columnQualifier: Mutation.convertToBytes(cellName),
          timestampMicros: timestamp,
          value: Mutation.convertToBytes(cell.value),
        };

        mutations.push({setCell});
      });
    });

    return mutations;
  }

  /**
   * Formats a `delete` mutation to what the proto service expects. Depending
   * on what data is supplied to this method, it will return an object that can
   * will do one of the following:
   *
   * * Delete specific cells from a column.
   * * Delete all cells contained with a specific family.
   * * Delete all cells from an entire rows.
   *
   * @param {object} data - The entry data.
   * @returns {object}
   *
   * @example
   * Mutation.encodeDelete([
   *   'follows:gwashington'
   * ]);
   * // {
   * //   deleteFromColumn: {
   * //     familyName: 'follows',
   * //     columnQualifier: 'gwashington', // as buffer
   * //     timeRange: null // optional
   * //   }
   * // }
   *
   * Mutation.encodeDelete([
   *   'follows'
   * ]);
   * // {
   * //   deleteFromFamily: {
   * //     familyName: 'follows'
   * //   }
   * // }
   *
   * Mutation.encodeDelete();
   * // {
   * //   deleteFromRow: {}
   * // }
   *
   * //-
   * // It's also possible to specify a time range when deleting specific columns.
   * //-
   * Mutation.encodeDelete([
   *   {
   *     column: 'follows:gwashington',
   *     time: {
   *       start: new Date('March 21, 2000'),
   *       end: new Date('March 21, 2001')
   *     }
   *   }
   * ]);
   */
  static encodeDelete(data) {
    if (!data) {
      return [
        {
          deleteFromRow: {},
        },
      ];
    }

    return arrify(data).map(mutation => {
      if (is.string(mutation)) {
        mutation = {
          column: mutation,
        };
      }

      const column = Mutation.parseColumnName(mutation.column);

      if (!column.qualifier) {
        return {
          deleteFromFamily: {
            familyName: column.family,
          },
        };
      }

      let timeRange;

      if (mutation.time) {
        timeRange = Mutation.createTimeRange(
          mutation.time.start,
          mutation.time.end
        );
      }

      return {
        deleteFromColumn: {
          familyName: column.family,
          columnQualifier: Mutation.convertToBytes(column.qualifier),
          timeRange,
        },
      };
    });
  }

  /**
   * Creates a new Mutation object and returns the proto JSON form.
   *
   * @param {object} mutation - The entity data.
   * @returns {object}
   */
  static parse(mutation) {
    if (!(mutation instanceof Mutation)) {
      mutation = new Mutation(mutation);
    }

    return mutation.toProto();
  }

  /**
   * Parses a column name into an object.
   *
   * @param {string} column - The column name.
   * @returns {object}
   *
   * @example
   * Mutation.parseColumnName('follows:gwashington');
   * // {
   * //  family: 'follows',
   * //  qualifier: 'gwashington'
   * // }
   */
  static parseColumnName(column) {
    const parts = column.split(':');

    return {
      family: parts[0],
      qualifier: parts[1],
    };
  }

  /**
   * Converts the mutation object into proto friendly JSON.
   *
   * @returns {object}
   */
  toProto() {
    const mutation = {};

    if (this.key) {
      mutation.rowKey = Mutation.convertToBytes(this.key);
    }

    if (this.method === methods.INSERT) {
      mutation.mutations = Mutation.encodeSetCell(this.data);
    } else if (this.method === methods.DELETE) {
      mutation.mutations = Mutation.encodeDelete(this.data);
    }

    return mutation;
  }
}

/**
 * Mutation methods
 *
 * INSERT => setCell
 * DELETE => deleteFrom*
 */
const methods = (Mutation.methods = {
  INSERT: 'insert',
  DELETE: 'delete',
});

module.exports = Mutation;
