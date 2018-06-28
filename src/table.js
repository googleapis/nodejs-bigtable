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
const common = require('@google-cloud/common-grpc');
const concat = require('concat-stream');
const flatten = require('lodash.flatten');
const is = require('is');
const propAssign = require('prop-assign');
const pumpify = require('pumpify');
const through = require('through2');

const Family = require('./family');
const Filter = require('./filter');
const Mutation = require('./mutation');
const Row = require('./row');
const ChunkTransformer = require('./chunktransformer');

// See protos/google/rpc/code.proto
// (4=DEADLINE_EXCEEDED, 10=ABORTED, 14=UNAVAILABLE)
const RETRYABLE_STATUS_CODES = new Set([4, 10, 14]);

/**
 * Create a Table object to interact with a Cloud Bigtable table.
 *
 * @class
 * @param {Instance} instance Instance Object.
 * @param {string} id Unique identifier of the table.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const table = instance.table('prezzy');
 */
class Table {
  constructor(instance, id) {
    this.bigtable = instance.bigtable;
    this.instance = instance;

    var name;

    if (id.includes('/')) {
      if (id.startsWith(`${instance.name}/tables/`)) {
        name = id;
      } else {
        throw new Error(
          `Table id '${id}' is not formatted correctly.
Please use the format 'prezzy' or '${instance.name}/tables/prezzy'.`
        );
      }
    } else {
      name = `${instance.name}/tables/${id}`;
    }

    this.name = name;
    this.id = name.split('/').pop();
  }

  /**
   * Formats the table name to include the Bigtable cluster.
   *
   * @private
   *
   * @param {string} instanceName The formatted instance name.
   * @param {string} name The table name.
   *
   * @example
   * Table.formatName_(
   *   'projects/my-project/zones/my-zone/instances/my-instance',
   *   'my-table'
   * );
   * // 'projects/my-project/zones/my-zone/instances/my-instance/tables/my-table'
   */
  static formatName_(instanceName, id) {
    if (id.includes('/')) {
      return id;
    }

    return `${instanceName}/tables/${id}`;
  }

  /**
   * Creates a range based off of a key prefix.
   *
   * @private
   *
   * @param {string} start The key prefix/starting bound.
   * @returns {object} range
   *
   * @example
   * Table.createPrefixRange_('start');
   * // => {
   * //   start: 'start',
   * //   end: {
   * //     value: 'staru',
   * //     inclusive: false
   * //   }
   * // }
   */
  static createPrefixRange_(start) {
    const prefix = start.replace(new RegExp('[\xff]+$'), '');
    let endKey = '';

    if (prefix) {
      const position = prefix.length - 1;
      const charCode = prefix.charCodeAt(position);
      const nextChar = String.fromCharCode(charCode + 1);

      endKey = prefix.substring(0, position) + nextChar;
    }

    return {
      start,
      end: {
        value: endKey,
        inclusive: !endKey,
      },
    };
  }

  /**
   * Create a table.
   *
   * @param {object} [options] See {@link Instance#createTable}.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Table} callback.table The newly created table.
   * @param {object} callback.apiResponse The full API response.
   * @example
   * table.create(function(err, table, apiResponse) {
   *   if (!err) {
   *     // The table was created successfully.
   *   }
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.create().then(function(data) {
   *   var table = data[0];
   *   var apiResponse = data[1];
   * });
   */
  create(options, callback) {
    if (is.fn(options)) {
      callback = options;
      options = {};
    }

    this.instance.createTable(this.id, options, callback);
  }

  /**
   * Create a column family.
   *
   * Optionally you can send garbage collection rules and when creating a family.
   * Garbage collection executes opportunistically in the background, so it's
   * possible for reads to return a cell even if it matches the active expression
   * for its family.
   *
   * @see [Garbage Collection Proto Docs]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/table/v1/bigtable_table_data.proto#L59}
   *
   * @throws {error} If a name is not provided.
   *
   * @param {string} id The unique identifier of column family.
   * @param {object} [options] Configuration object.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {object} [options.rule] Garbage collection rule
   * @param {object} [options.rule.age] Delete cells in a column older than the
   *     given age. Values must be at least 1 millisecond.
   * @param {number} [options.rule.versions] Maximum number of versions to delete
   *     cells in a column, except for the most recent.
   * @param {boolean} [options.rule.intersect] Cells to delete should match all
   *     rules.
   * @param {boolean} [options.rule.union] Cells to delete should match any of the
   *     rules.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Family} callback.family The newly created Family.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   *
   * const callback = function(err, family, apiResponse) {
   *   // `family` is a Family object
   * };
   *
   * const options={};
   *
   * options.rule = {
   *   age: {
   *     seconds: 0,
   *     nanos: 5000
   *   },
   *   versions: 3,
   *   union: true
   * };
   *
   * table.createFamily('follows', options, callback);
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.createFamily('follows').then(function(data) {
   *   const family = data[0];
   *   const apiResponse = data[1];
   * });
   *
   * // Note that rules can have nested rules. For example The following rule
   * // will delete cells that are either older than 10 versions OR if the cell
   * // is is a month old and has at least 2 newer version.
   * // Essentially: (version > 10 OR (age > 30 AND version > 2))
   * const rule = {
   *   union: true,
   *   versions: 10,
   *   rule: {
   *     versions: 2,
   *     age: { seconds: 60 * 60 * 24 * 30 }, // one month
   *   },
   * };
   */
  createFamily(id, options, callback) {
    if (is.function(options)) {
      callback = options;
      options = {};
    }

    if (!id) {
      throw new Error('An id is required to create a family.');
    }

    const mod = {
      id: id,
      create: {},
    };

    if (options.rule) {
      mod.create.gcRule = Family.formatRule_(options.rule);
    }

    const reqOpts = {
      name: this.name,
      modifications: [mod],
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'modifyColumnFamilies',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (err, resp) => {
        if (err) {
          callback(err, null, resp);
          return;
        }

        const family = this.family(id);
        family.metadata = resp;

        callback(null, family, resp);
      }
    );
  }

  /**
   * Get {@link Row} objects for the rows currently in your table as a
   * readable object stream.
   *
   * @param {object} [options] Configuration object.
   * @param {boolean} [options.decode=true] If set to `false` it will not decode
   *     Buffer values returned from Bigtable.
   * @param {boolean} [options.encoding] The encoding to use when converting
   *     Buffer values to a string.
   * @param {string} [options.end] End value for key range.
   * @param {Filter} [options.filter] Row filters allow you to
   *     both make advanced queries and format how the data is returned.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {string[]} [options.keys] A list of row keys.
   * @param {number} [options.limit] Maximum number of rows to be returned.
   * @param {string} [options.prefix] Prefix that the row key must match.
   * @param {string[]} [options.prefixes] List of prefixes that a row key must
   *     match.
   * @param {object[]} [options.ranges] A list of key ranges.
   * @param {string} [options.start] Start value for key range.
   * @returns {stream}
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   *
   * table.createReadStream()
   *   .on('error', console.error)
   *   .on('data', function(row) {
   *     // `row` is a Row object.
   *   })
   *   .on('end', function() {
   *     // All rows retrieved.
   *   });
   *
   * //-
   * // If you anticipate many results, you can end a stream early to prevent
   * // unnecessary processing.
   * //-
   * table.createReadStream()
   *   .on('data', function(row) {
   *     this.end();
   *   });
   *
   * //-
   * // Specify arbitrary keys for a non-contiguous set of rows.
   * // The total size of the keys must remain under 1MB, after encoding.
   * //-
   * table.createReadStream({
   *   keys: [
   *     'alincoln',
   *     'gwashington'
   *   ]
   * });
   *
   * //-
   * // Scan for row keys that contain a specific prefix.
   * //-
   * table.createReadStream({
   *   prefix: 'gwash'
   * });
   *
   * //-
   * // Specify a contiguous range of rows to read by supplying `start` and `end`
   * // keys.
   * //
   * // If the `start` key is omitted, it is interpreted as an empty string.
   * // If the `end` key is omitted, it is interpreted as infinity.
   * //-
   * table.createReadStream({
   *   start: 'alincoln',
   *   end: 'gwashington'
   * });
   *
   * //-
   * // Specify multiple ranges.
   * //-
   * table.createReadStream({
   *   ranges: [{
   *     start: 'alincoln',
   *     end: 'gwashington'
   *   }, {
   *     start: 'tjefferson',
   *     end: 'jadams'
   *   }]
   * });
   *
   * //-
   * // Apply a {@link Filter} to the contents of the specified rows.
   * //-
   * table.createReadStream({
   *   filter: [
   *     {
   *       column: 'gwashington'
   *     }, {
   *       value: 1
   *     }
   *   ]
   * });
   */
  createReadStream(options) {
    options = options || {};
    let maxRetries = is.number(this.maxRetries) ? this.maxRetries : 3;

    let rowKeys;
    let ranges = options.ranges || [];
    let filter;
    let rowsLimit;
    let rowsRead = 0;
    let numRequestsMade = 0;

    if (options.start || options.end) {
      ranges.push({
        start: options.start,
        end: options.end,
      });
    }

    if (options.keys) {
      rowKeys = options.keys;
    }

    if (options.prefix) {
      ranges.push(Table.createPrefixRange_(options.prefix));
    }

    if (options.prefixes) {
      options.prefixes.forEach(prefix => {
        ranges.push(Table.createPrefixRange_(prefix));
      });
    }

    if (options.filter) {
      filter = Filter.parse(options.filter);
    }

    if (options.limit) {
      rowsLimit = options.limit;
    }

    const userStream = through.obj();
    let chunkTransformer;

    const makeNewRequest = () => {
      let lastRowKey = chunkTransformer ? chunkTransformer.lastRowKey : '';
      chunkTransformer = new ChunkTransformer({decode: options.decode});

      const reqOpts = {
        tableName: this.name,
        appProfileId: this.bigtable.appProfileId,
      };

      const retryOpts = {
        currentRetryAttempt: numRequestsMade,
      };

      if (lastRowKey) {
        const lessThan = (lhs, rhs) => {
          const lhsBytes = Mutation.convertToBytes(lhs);
          const rhsBytes = Mutation.convertToBytes(rhs);
          return lhsBytes.compare(rhsBytes) === -1;
        };
        const greaterThan = (lhs, rhs) => lessThan(rhs, lhs);
        const greaterThanOrEqualTo = (lhs, rhs) => !lessThan(rhs, lhs);

        if (ranges.length === 0) {
          ranges.push({
            start: {
              value: lastRowKey,
              inclusive: false,
            },
          });
        } else {
          // Readjust and/or remove ranges based on previous valid row reads.

          // Iterate backward since items may need to be removed.
          for (let index = ranges.length - 1; index >= 0; index--) {
            const range = ranges[index];
            const startValue = is.object(range.start)
              ? range.start.value
              : range.start;
            const endValue = is.object(range.end) ? range.end.value : range.end;
            const isWithinStart =
              !startValue || greaterThanOrEqualTo(startValue, lastRowKey);
            const isWithinEnd = !endValue || lessThan(lastRowKey, endValue);
            if (isWithinStart) {
              if (isWithinEnd) {
                // The lastRowKey is within this range, adjust the start value.
                range.start = {
                  value: lastRowKey,
                  inclusive: false,
                };
              } else {
                // The lastRowKey is past this range, remove this range.
                ranges.splice(index, 1);
              }
            }
          }
        }

        // Remove rowKeys already read.
        if (rowKeys) {
          rowKeys = rowKeys.filter(rowKey => greaterThan(rowKey, lastRowKey));
          if (rowKeys.length === 0) {
            rowKeys = null;
          }
        }
      }
      if (rowKeys || ranges.length) {
        reqOpts.rows = {};

        if (rowKeys) {
          reqOpts.rows.rowKeys = rowKeys.map(Mutation.convertToBytes);
        }

        if (ranges.length) {
          reqOpts.rows.rowRanges = ranges.map(range =>
            Filter.createRange(range.start, range.end, 'Key')
          );
        }
      }

      if (filter) {
        reqOpts.filter = filter;
      }

      if (rowsLimit) {
        reqOpts.rowsLimit = rowsLimit - rowsRead;
      }

      const requestStream = this.bigtable.request({
        client: 'BigtableClient',
        method: 'readRows',
        reqOpts,
        gaxOpts: options.gaxOptions,
        retryOpts,
      });

      requestStream.on('request', () => numRequestsMade++);

      const rowStream = pumpify.obj([
        requestStream,
        chunkTransformer,
        through.obj((rowData, enc, next) => {
          if (chunkTransformer._destroyed || userStream._writableState.ended) {
            return next();
          }
          numRequestsMade = 0;
          rowsRead++;
          const row = this.row(rowData.key);
          row.data = rowData.data;
          next(null, row);
        }),
      ]);

      rowStream.on('error', error => {
        rowStream.unpipe(userStream);
        if (
          numRequestsMade <= maxRetries &&
          RETRYABLE_STATUS_CODES.has(error.code)
        ) {
          makeNewRequest();
        } else {
          userStream.emit('error', error);
        }
      });
      rowStream.pipe(userStream);
    };

    makeNewRequest();
    return userStream;
  }

  /**
   * Delete the table.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * table.delete(function(err, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.delete().then(function(data) {
   *   var apiResponse = data[0];
   * });
   */
  delete(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'deleteTable',
        reqOpts: {
          name: this.name,
        },
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  /**
   * Delete all rows in the table, optionally corresponding to a particular
   * prefix.
   *
   * @throws {error} If a prefix is not provided.
   *
   * @param {string} prefix Row key prefix.
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   *
   * //-
   * // You can supply a prefix to delete all corresponding rows.
   * //-
   * const callback = function(err, apiResponse) {
   *   if (!err) {
   *     // Rows successfully deleted.
   *   }
   * };
   *
   * table.deleteRows('alincoln', callback);
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.deleteRows('alincoln').then(function(data) {
   *   const apiResponse = data[0];
   * });
   */
  deleteRows(prefix, gaxOptions, callback) {
    if (is.function(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    if (!prefix || is.fn(prefix)) {
      throw new Error('A prefix is required for deleteRows.');
    }

    const reqOpts = {
      name: this.name,
      rowKeyPrefix: Mutation.convertToBytes(prefix),
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'dropRowRange',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  /**
   * Check if a table exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {boolean} callback.exists Whether the table exists or not.
   *
   * @example
   * table.exists(function(err, exists) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.exists().then(function(data) {
   *   var exists = data[0];
   * });
   */
  exists(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.getMetadata(gaxOptions, err => {
      if (err) {
        if (err.code === 5) {
          callback(null, false);
          return;
        }

        callback(err);
        return;
      }

      callback(null, true);
    });
  }

  /**
   * Get a reference to a Table Family.
   *
   * @throws {error} If a name is not provided.
   *
   * @param {string} id The family unique identifier.
   * @returns {Family}
   *
   * @example
   * const family = table.family('my-family');
   */
  family(id) {
    if (!id) {
      throw new Error('A family id must be provided.');
    }

    return new Family(this, id);
  }

  /**
   * Get a table if it exists.
   *
   * You may optionally use this to "get or create" an object by providing an
   * object with `autoCreate` set to `true`. Any extra configuration that is
   * normally required for the `create` method must be contained within this
   * object as well.
   *
   * @param {object} [options] Configuration object.
   * @param {boolean} [options.autoCreate=false] Automatically create the
   *     instance if it does not already exist.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {?error} callback.error An error returned while making this request.
   * @param {Table} callback.table The Table object.
   * @param {object} callback.apiResponse The resource as it exists in the API.
   *
   * @example
   * table.get(function(err, table, apiResponse) {
   *   // The `table` data has been populated.
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.get().then(function(data) {
   *   var table = data[0];
   *   var apiResponse = data[0];
   * });
   */
  get(options, callback) {
    if (is.fn(options)) {
      callback = options;
      options = {};
    }

    const autoCreate = !!options.autoCreate;
    const gaxOptions = options.gaxOptions;

    this.getMetadata({gaxOptions}, (err, metadata) => {
      if (err) {
        if (err.code === 5 && autoCreate) {
          this.create({gaxOptions}, callback);
          return;
        }

        callback(err);
        return;
      }

      callback(null, this, metadata);
    });
  }

  /**
   * Get Family objects for all the column familes in your table.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Family[]} callback.families The list of families.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   *
   * table.getFamilies(function(err, families, apiResponse) {
   *   // `families` is an array of Family objects.
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.getFamilies().then(function(data) {
   *   var families = data[0];
   *   var apiResponse = data[1];
   * });
   */
  getFamilies(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.getMetadata({gaxOptions}, (err, metadata) => {
      if (err) {
        callback(err);
        return;
      }

      const families = Object.keys(metadata.columnFamilies).map(familyId => {
        const family = this.family(familyId);
        family.metadata = metadata.columnFamilies[familyId];
        return family;
      });

      callback(null, families, metadata.columnFamilies);
    });
  }

  /**
   * Get the table's metadata.
   *
   * @param {object} [options] Table request options.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {string} [options.view] The view to be applied to the table fields.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.metadata The table's metadata.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   *
   * table.getMetadata(function(err, metadata) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.getMetadata().then(function(data) {
   *   var metadata = data[0];
   *   var apiResponse = data[1];
   * });
   */
  getMetadata(options, callback) {
    if (is.function(options)) {
      callback = options;
      options = {};
    }

    const reqOpts = {
      name: this.name,
      view: Table.VIEWS[options.view || 'unspecified'],
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'getTable',
        reqOpts,
        gaxOpts: options.gaxOptions,
      },
      (...args) => {
        if (args[1]) {
          this.metadata = args[1];
        }

        callback(...args);
      }
    );
  }

  /**
   * Get {@link Row} objects for the rows currently in your table.
   *
   * This method is not recommended for large datasets as it will buffer all rows
   * before returning the results. Instead we recommend using the streaming API
   * via {@link Table#createReadStream}.
   *
   * @param {object} [options] Configuration object. See
   *     {@link Table#createReadStream} for a complete list of options.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {Row[]} callback.rows List of Row objects.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   *
   * table.getRows(function(err, rows) {
   *   if (!err) {
   *     // `rows` is an array of Row objects.
   *   }
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.getRows().then(function(data) {
   *   var rows = data[0];
   * });
   */
  getRows(options, callback) {
    if (is.function(options)) {
      callback = options;
      options = {};
    }

    this.createReadStream(options)
      .on('error', callback)
      .pipe(
        concat(rows => {
          callback(null, rows);
        })
      );
  }

  /**
   * Insert or update rows in your table. It should be noted that gRPC only allows
   * you to send payloads that are less than or equal to 4MB. If you're inserting
   * more than that you may need to send smaller individual requests.
   *
   * @param {object|object[]} entries List of entries to be inserted.
   *     See {@link Table#mutate}.
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object[]} callback.err.errors If present, these represent partial
   *     failures. It's possible for part of your request to be completed
   *     successfully, while the other part was not.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   *
   * const callback = function(err) {
   *   if (err) {
   *     // An API error or partial failure occurred.
   *
   *     if (err.name === 'PartialFailureError') {
   *       // err.errors[].code = 'Response code'
   *       // err.errors[].message = 'Error message'
   *       // err.errors[].entry = The original entry
   *     }
   *   }
   * };
   *
   * const entries = [
   *  {
   *     key: 'alincoln',
   *     data: {
   *       follows: {
   *         gwashington: 1
   *       }
   *     }
   *   }
   * ];
   *
   * table.insert(entries, callback);
   *
   * //-
   * // By default whenever you insert new data, the server will capture a
   * // timestamp of when your data was inserted. It's possible to provide a
   * // date object to be used instead.
   * //-
   * const entries = [
   *   {
   *     key: 'gwashington',
   *     data: {
   *       follows: {
   *         jadams: {
   *           value: 1,
   *           timestamp: new Date('March 22, 2016')
   *         }
   *       }
   *     }
   *   }
   * ];
   *
   * table.insert(entries, callback);
   *
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.insert(entries).then(function() {
   *   // All requested inserts have been processed.
   * });
   * //-
   */
  insert(entries, gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    entries = arrify(entries).map(
      propAssign('method', Mutation.methods.INSERT)
    );

    return this.mutate(entries, {gaxOptions}, callback);
  }

  /**
   * Apply a set of changes to be atomically applied to the specified row(s).
   * Mutations are applied in order, meaning that earlier mutations can be masked
   * by later ones.
   *
   * @param {object|object[]} entries List of entities to be inserted or
   *     deleted.
   * @param {object} [options] Configuration object.
   * @param {object} [options.gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {boolean} [options.rawMutation] If set to `true` will treat entries
   *     as a raw Mutation object. See {@link Mutation#parse}.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object[]} callback.err.errors If present, these represent partial
   *     failures. It's possible for part of your request to be completed
   *     successfully, while the other part was not.
   *
   * @example
   * const Bigtable = require('@google-cloud/bigtable');
   * const bigtable = new Bigtable();
   * const instance = bigtable.instance('my-instance');
   * const table = instance.table('prezzy');
   *
   * //-
   * // Insert entities. See {@link Table#insert}.
   * //-
   * const callback = function(err) {
   *   if (err) {
   *     // An API error or partial failure occurred.
   *
   *     if (err.name === 'PartialFailureError') {
   *       // err.errors[].code = 'Response code'
   *       // err.errors[].message = 'Error message'
   *       // err.errors[].entry = The original entry
   *     }
   *   }
   * };
   *
   * const entries = [
   *   {
   *     method: 'insert',
   *     key: 'gwashington',
   *     data: {
   *       follows: {
   *         jadams: 1
   *       }
   *     }
   *   }
   * ];
   *
   * table.mutate(entries, callback);
   *
   * //-
   * // Delete entities. See {@link Row#deleteCells}.
   * //-
   * const entries = [
   *   {
   *     method: 'delete',
   *     key: 'gwashington'
   *   }
   * ];
   *
   * table.mutate(entries, callback);
   *
   * //-
   * // Delete specific columns within a row.
   * //-
   * const entries = [
   *   {
   *     method: 'delete',
   *     key: 'gwashington',
   *     data: [
   *       'follows:jadams'
   *     ]
   *   }
   * ];
   *
   * table.mutate(entries, callback);
   *
   * //-
   * // Mix and match mutations. This must contain at least one entry and at
   * // most 100,000.
   * //-
   * const entries = [
   *   {
   *     method: 'insert',
   *     key: 'alincoln',
   *     data: {
   *       follows: {
   *         gwashington: 1
   *       }
   *     }
   *   }, {
   *     method: 'delete',
   *     key: 'jadams',
   *     data: [
   *       'follows:gwashington'
   *     ]
   *   }
   * ];
   *
   * table.mutate(entries, callback);
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.mutate(entries).then(function() {
   *   // All requested mutations have been processed.
   * });
   */
  mutate(entries, options, callback) {
    options = options || {};

    if (is.fn(options)) {
      callback = options;
      options = {};
    }

    entries = flatten(arrify(entries));

    let numRequestsMade = 0;

    const maxRetries = is.number(this.maxRetries) ? this.maxRetries : 3;
    const pendingEntryIndices = new Set(entries.map((entry, index) => index));
    const entryToIndex = new Map(entries.map((entry, index) => [entry, index]));
    const mutationErrorsByEntryIndex = new Map();

    const onBatchResponse = err => {
      if (err) {
        // The error happened before a request was even made, don't retry.
        callback(err);
        return;
      }
      if (pendingEntryIndices.size !== 0 && numRequestsMade <= maxRetries) {
        makeNextBatchRequest();
        return;
      }

      if (mutationErrorsByEntryIndex.size !== 0) {
        const mutationErrors = Array.from(mutationErrorsByEntryIndex.values());
        err = new common.util.PartialFailureError({
          errors: mutationErrors,
        });
      }

      callback(err);
    };

    const makeNextBatchRequest = () => {
      const entryBatch = entries.filter((entry, index) => {
        return pendingEntryIndices.has(index);
      });

      const reqOpts = {
        tableName: this.name,
        appProfileId: this.bigtable.appProfileId,
        entries: options.rawMutation
          ? entryBatch
          : entryBatch.map(Mutation.parse),
      };

      const retryOpts = {
        currentRetryAttempt: numRequestsMade,
      };

      this.bigtable
        .request({
          client: 'BigtableClient',
          method: 'mutateRows',
          reqOpts,
          gaxOpts: options.gaxOptions,
          retryOpts,
        })
        .on('request', () => numRequestsMade++)
        .on('error', err => {
          if (numRequestsMade === 0) {
            callback(err); // Likely a "projectId not detected" error.
            return;
          }

          onBatchResponse(err);
        })
        .on('data', obj => {
          obj.entries.forEach(entry => {
            const originalEntry = entryBatch[entry.index];
            const originalEntriesIndex = entryToIndex.get(originalEntry);

            // Mutation was successful.
            if (entry.status.code === 0) {
              pendingEntryIndices.delete(originalEntriesIndex);
              mutationErrorsByEntryIndex.delete(originalEntriesIndex);
              return;
            }

            if (!RETRYABLE_STATUS_CODES.has(entry.status.code)) {
              pendingEntryIndices.delete(originalEntriesIndex);
            }

            const status = common.Service.decorateStatus_(entry.status);
            status.entry = originalEntry;

            mutationErrorsByEntryIndex.set(originalEntriesIndex, status);
          });
        })
        .on('end', onBatchResponse);
    };

    makeNextBatchRequest();
  }

  /**
   * Get a reference to a table row.
   *
   * @throws {error} If a key is not provided.
   *
   * @param {string} key The row key.
   * @returns {Row}
   *
   * @example
   * var row = table.row('lincoln');
   */
  row(key) {
    if (!key) {
      throw new Error('A row key must be provided.');
    }

    return new Row(this, key);
  }

  /**
   * Returns a sample of row keys in the table. The returned row keys will delimit
   * contigous sections of the table of approximately equal size, which can be
   * used to break up the data for distributed tasks like mapreduces.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object[]} callback.keys The list of keys.
   *
   * @example
   * table.sampleRowKeys(function(err, keys) {
   *   // keys = [
   *   //   {
   *   //     key: '',
   *   //     offset: '805306368'
   *   //   },
   *   //   ...
   *   // ]
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.sampleRowKeys().then(function(data) {
   *   var keys = data[0];
   * });
   */
  sampleRowKeys(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.sampleRowKeysStream(gaxOptions)
      .on('error', callback)
      .pipe(
        concat(keys => {
          callback(null, keys);
        })
      );
  }

  /**
   * Returns a sample of row keys in the table as a readable object stream.
   *
   * See {@link Table#sampleRowKeys} for more details.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @returns {stream}
   *
   * @example
   * table.sampleRowKeysStream()
   *   .on('error', console.error)
   *   .on('data', function(key) {
   *     // Do something with the `key` object.
   *   });
   *
   * //-
   * // If you anticipate many results, you can end a stream early to prevent
   * // unnecessary processing.
   * //-
   * table.sampleRowKeysStream()
   *   .on('data', function(key) {
   *     this.end();
   *   });
   */
  sampleRowKeysStream(gaxOptions) {
    const reqOpts = {
      tableName: this.name,
      appProfileId: this.bigtable.appProfileId,
    };

    return pumpify.obj([
      this.bigtable.request({
        client: 'BigtableClient',
        method: 'sampleRowKeys',
        reqOpts,
        gaxOpts: gaxOptions,
      }),
      through.obj((key, enc, next) => {
        next(null, {
          key: key.rowKey,
          offset: key.offsetBytes,
        });
      }),
    ]);
  }

  /**
   * Truncate the table.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined
   *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * table.truncate(function(err, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * table.truncate().then(function(data) {
   *   var apiResponse = data[0];
   * });
   */
  truncate(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    const reqOpts = {
      name: this.name,
      deleteAllDataFromTable: true,
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'dropRowRange',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  /**
   * Generates Consistency-Token and check consistency for generated token
   * In-case consistency check returns false, retrial is done in interval
   * of 5 seconds till 10 minutes, after that it returns false.
   *
   * @param {function(?error, ?boolean)} callback The callback function.
   * @param {?Error} callback.err An error returned while making this request.
   * @param {?Boolean} callback.resp Boolean value.
   */
  waitForReplication(callback) {
    // handler for generated consistency-token
    const tokenHandler = (err, token) => {
      if (err) {
        return callback(err);
      }

      // set timeout for 10 minutes
      const timeoutAfterTenMinutes = setTimeout(() => {
        callback(null, false);
      }, 10 * 60 * 1000);

      // method checks if retrial is required & init retrial with 5 sec delay
      const retryIfNecessary = (err, res) => {
        if (err) {
          clearTimeout(timeoutAfterTenMinutes);
          return callback(err);
        }

        if (res === true) {
          clearTimeout(timeoutAfterTenMinutes);
          return callback(null, true);
        }

        setTimeout(launchCheck, 5000);
      };

      // method to launch token consistency check
      const launchCheck = () => {
        this.checkConsistency(token, retryIfNecessary);
      };

      launchCheck();
    };

    // generate consistency-token
    this.generateConsistencyToken(tokenHandler);
  }

  /**
   * Generates Consistency-Token
   * @param {function(?error, ?boolean)} callback The callback function.
   * @param {?Error} callback.err An error returned while making this request.
   * @param {?String} callback.token The generated consistency token.
   */
  generateConsistencyToken(callback) {
    const reqOpts = {
      name: this.name,
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'generateConsistencyToken',
        reqOpts: reqOpts,
      },
      (err, res) => {
        if (err) {
          callback(err);
          return;
        }

        callback(null, res.consistencyToken);
      }
    );
  }

  /**
   * Checks consistency for given ConsistencyToken
   * @param {string} token consistency token
   * @param {function(?error, ?boolean)} callback The callback function.
   * @param {?Error} callback.err An error returned while making this request.
   * @param {?Boolean} callback.consistent Boolean value.
   */
  checkConsistency(token, callback) {
    const reqOpts = {
      name: this.name,
      consistencyToken: token,
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'checkConsistency',
        reqOpts: reqOpts,
      },
      (err, res) => {
        if (err) {
          callback(err);
          return;
        }

        callback(null, res.consistent);
      }
    );
  }
}

/**
 * The view to be applied to the returned table's fields.
 * Defaults to schema if unspecified.
 *
 * @private
 */
Table.VIEWS = {
  unspecified: 0,
  name: 1,
  schema: 2,
  full: 4,
};

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Table, {
  exclude: ['family', 'row'],
});

module.exports = Table;
