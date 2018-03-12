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

var arrify = require('arrify');
var common = require('@google-cloud/common');
var createErrorClass = require('create-error-class');
var dotProp = require('dot-prop');
var extend = require('extend');
var flatten = require('lodash.flatten');
var is = require('is');

var Filter = require('./filter.js');
var Mutation = require('./mutation.js');

/**
 * @private
 */
var RowError = createErrorClass('RowError', function(row) {
  this.message = 'Unknown row: ' + row + '.';
  this.code = 404;
});

/**
 * Create a Row object to interact with your table rows.
 *
 * @class
 * @param {Table} table The row's parent Table instance.
 * @param {string} key The key for this row.
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const table = instance.table('prezzy');
 * const row = table.row('gwashington');
 */
function Row(table, key) {
  this.bigtable = table.bigtable;
  this.table = table;
  this.id = key;

  this.data = {};
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
 * @private
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
Row.formatChunks_ = function(chunks, options) {
  var rows = [];
  var familyName;
  var qualifierName;

  options = options || {};

  chunks.reduce(function(row, chunk) {
    var family;
    var qualifier;

    row.data = row.data || {};

    if (chunk.rowKey) {
      row.key = Mutation.convertFromBytes(chunk.rowKey, options);
    }

    if (chunk.familyName) {
      familyName = chunk.familyName.value;
    }

    if (familyName) {
      family = row.data[familyName] = row.data[familyName] || {};
    }

    if (chunk.qualifier) {
      qualifierName = Mutation.convertFromBytes(chunk.qualifier.value, options);
    }

    if (family && qualifierName) {
      qualifier = family[qualifierName] = family[qualifierName] || [];
    }

    if (qualifier && chunk.value) {
      qualifier.push({
        value: Mutation.convertFromBytes(chunk.value, options),
        labels: chunk.labels,
        timestamp: chunk.timestampMicros,
        size: chunk.valueSize,
      });
    }

    if (chunk.commitRow) {
      rows.push(row);
    }

    if (chunk.commitRow || chunk.resetRow) {
      familyName = qualifierName = null;
      return {};
    }

    return row;
  }, {});

  return rows;
};

/**
 * Formats a rowContents object into friendly format.
 *
 * @private
 *
 * @param {object[]} families The row families.
 * @param {object} [options] Formatting options.
 *
 * @example
 * var families = [
 *   {
 *     name: 'follows',
 *     columns: [
 *       {
 *         qualifier: 'gwashington',
 *         cells: [
 *           {
 *             value: 2
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * ];
 *
 * Row.formatFamilies_(families);
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
Row.formatFamilies_ = function(families, options) {
  var data = {};

  options = options || {};

  families.forEach(function(family) {
    var familyData = (data[family.name] = {});

    family.columns.forEach(function(column) {
      var qualifier = Mutation.convertFromBytes(column.qualifier);

      familyData[qualifier] = column.cells.map(function(cell) {
        var value = cell.value;

        if (options.decode !== false) {
          value = Mutation.convertFromBytes(value);
        }

        return {
          value: value,
          timestamp: cell.timestampMicros,
          labels: cell.labels,
        };
      });
    });
  });

  return data;
};

/**
 * Create a new row in your table.
 *
 * @param {object} [options] Configuration object.
 * @param {object} [options.entry] An entry. See {@link Table#insert}.
 * @param {object} [options.gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {Row} callback.row The newly created row object.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * var callback = function(err, apiResponse) {
 *   if (!err) {
 *     // Row successfully created
 *   }
 * };
 *
 * row.create(callback);
 *
 * //-
 * // Optionally, you can supply entry data.
 * //-
 * row.create({
 *   entry: {
 *     follows: {
 *       alincoln: 1
 *     }
 *   }
 * }, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.create().then(function(data) {
 *   var apiResponse = data[0];
 * });
 */
Row.prototype.create = function(options, callback) {
  var self = this;

  if (is.function(options)) {
    callback = options;
    options = {};
  }

  var entry = {
    key: this.id,
    data: extend({}, options.entry),
    method: Mutation.methods.INSERT,
  };

  this.table.mutate(entry, options.gaxOptions, function(err, apiResponse) {
    if (err) {
      callback(err, null, apiResponse);
      return;
    }

    callback(null, self, apiResponse);
  });
};

/**
 * Update a row with rules specifying how the row's contents are to be
 * transformed into writes. Rules are applied in order, meaning that earlier
 * rules will affect the results of later ones.
 *
 * @throws {error} If no rules are provided.
 *
 * @param {object|object[]} rules The rules to apply to this row.
 * @param {object} [gaxOptions] Request configuration options, outlined here:
 *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * //-
 * // Add an increment amount to an existing value, if the targeted cell is
 * // unset, it will be treated as containing a zero.
 * //-
 * var callback = function(err, apiResponse) {
 *   if (!err) {
 *     // The rules have successfully been applied.
 *   }
 * };
 *
 * var rules = [
 *   {
 *     column: 'follows:gwashington',
 *     increment: 1
 *   }
 * ];
 *
 * row.createRules(rules, callback);
 *
 * //-
 * // You can also create a rule that will append data to an existing value.
 * // If the targeted cell is unset, it will be treated as a containing an
 * // empty string.
 * //-
 * var rules = [
 *   {
 *     column: 'follows:alincoln',
 *     append: ' Honest Abe!'
 *   }
 * ];
 *
 * row.createRules(rules, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.createRules(rules).then(function(data) {
 *   var apiResponse = data[0];
 * });
 */
Row.prototype.createRules = function(rules, gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  if (!rules || rules.length === 0) {
    throw new Error('At least one rule must be provided.');
  }

  rules = arrify(rules).map(function(rule) {
    var column = Mutation.parseColumnName(rule.column);
    var ruleData = {
      familyName: column.family,
      columnQualifier: Mutation.convertToBytes(column.qualifier),
    };

    if (rule.append) {
      ruleData.appendValue = Mutation.convertToBytes(rule.append);
    }

    if (rule.increment) {
      ruleData.incrementAmount = rule.increment;
    }

    return ruleData;
  });

  var reqOpts = {
    tableName: this.table.id,
    rowKey: Mutation.convertToBytes(this.id),
    rules: rules,
  };

  this.bigtable.request(
    {
      client: 'BigtableClient',
      method: 'readModifyWriteRow',
      reqOpts: reqOpts,
      gaxOpts: gaxOptions,
    },
    callback
  );
};

/**
 * Deletes all cells in the row.
 *
 * @param {object} [gaxOptions] Request configuration options, outlined here:
 *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * row.delete(function(err, apiResponse) {});
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.delete().then(function(data) {
 *   var apiResponse = data[0];
 * });
 */
Row.prototype.delete = function(gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  var mutation = {
    key: this.id,
    method: Mutation.methods.DELETE,
  };

  this.table.mutate(mutation, gaxOptions, callback);
};

/**
 * Delete specified cells from the row. See {@link Table#mutate}.
 *
 * @param {string[]} columns Column names for the cells to be deleted.
 * @param {object} [gaxOptions] Request configuration options, outlined here:
 *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * //-
 * // Delete individual cells.
 * //-
 * var callback = function(err, apiResponse) {
 *   if (!err) {
 *     // Cells were successfully deleted.
 *   }
 * };
 *
 * var cells = [
 *   'follows:gwashington'
 * ];
 *
 * row.deleteCells(cells, callback);
 *
 * //-
 * // Delete all cells within a family.
 * //-
 * var cells = [
 *   'follows',
 * ];
 *
 * row.deleteCells(cells, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.deleteCells(cells).then(function(data) {
 *   var apiResponse = data[0];
 * });
 */
Row.prototype.deleteCells = function(columns, gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  var mutation = {
    key: this.id,
    data: arrify(columns),
    method: Mutation.methods.DELETE,
  };

  this.table.mutate(mutation, gaxOptions, callback);
};

/**
 * Check if the table row exists.
 *
 * @param {object} [gaxOptions] Request configuration options, outlined here:
 *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {boolean} callback.exists Whether the row exists or not.
 *
 * @example
 * row.exists(function(err, exists) {});
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.exists().then(function(data) {
 *   var exists = data[0];
 * });
 */
Row.prototype.exists = function(gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  this.getMetadata(gaxOptions, function(err) {
    if (!err) {
      callback(null, true);
      return;
    }

    if (err instanceof RowError) {
      callback(null, false);
      return;
    }

    callback(err);
  });
};

/**
 * Mutates a row atomically based on the output of a filter. Depending on
 * whether or not any results are yielded, either the `onMatch` or `onNoMatch`
 * callback will be executed.
 *
 * @param {Filter} filter Filter to be applied to the contents of the row.
 * @param {?object[]} onMatch A list of entries to be ran if a match is found.
 * @param {object[]} [onNoMatch] A list of entries to be ran if no matches are
 *     found.
 * @param {object} [gaxOptions] Request configuration options, outlined here:
 *     https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {boolean} callback.matched Whether a match was found or not.
 *
 * @example
 * var callback = function(err, matched) {
 *   if (!err) {
 *     // `matched` will let us know if a match was found or not.
 *   }
 * };
 *
 * var filter = [
 *   {
 *     family: 'follows'
 *   },
 *   {
 *     column: 'alincoln',
 *   },
 *   {
 *     value: 1
 *   }
 * ];
 *
 * var entries = [
 *   {
 *     method: 'insert',
 *     data: {
 *       follows: {
 *         jadams: 1
 *       }
 *     }
 *   }
 * ];
 *
 * row.filter(filter, entries, callback);
 *
 * //-
 * // Optionally, you can pass in an array of entries to be ran in the event
 * // that a match is not made.
 * //-
 * row.filter(filter, null, entries, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.filter(filter, null, entries).then(function(data) {
 *   var matched = data[0];
 * });
 */
Row.prototype.filter = function(
  filter,
  onMatch,
  onNoMatch,
  gaxOptions,
  callback
) {
  if (is.object(onNoMatch)) {
    gaxOptions = onNoMatch;
    onNoMatch = [];
  }

  if (is.function(onNoMatch)) {
    callback = onNoMatch;
    onNoMatch = [];
  }

  if (is.function(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  var reqOpts = {
    tableName: this.table.id,
    rowKey: Mutation.convertToBytes(this.id),
    predicateFilter: Filter.parse(filter),
    trueMutations: createFlatMutationsList(onMatch),
    falseMutations: createFlatMutationsList(onNoMatch),
  };

  this.bigtable.request(
    {
      client: 'BigtableClient',
      method: 'checkAndMutateRow',
      reqOpts: reqOpts,
      gaxOpts: gaxOptions,
    },
    function(err, apiResponse) {
      if (err) {
        callback(err, null, apiResponse);
        return;
      }

      callback(null, apiResponse.predicateMatched, apiResponse);
    }
  );

  function createFlatMutationsList(entries) {
    entries = arrify(entries).map(function(entry) {
      return Mutation.parse(entry).mutations;
    });

    return flatten(entries);
  }
};

/**
 * Get the row data. See {@link Table#getRows}.
 *
 * @param {string[]} [columns] List of specific columns to retrieve.
 * @param {object} [options] Configuration object.
 * @param {boolean} [options.decode=true] If set to `false` it will not decode Buffer
 *     values returned from Bigtable.
 * @param {object} [options.gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {Row} callback.row The updated Row object.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * //-
 * // Use this method to grab an entire row
 * //-
 * var callback = function(err, row, apiResponse) {
 *   if (!err) {
 *     // `row.cells` has been updated.
 *   }
 * };
 *
 * row.get(callback);
 *
 * //-
 * // Or pass in an array of column names to populate specific cells.
 * // Under the hood this will create an interleave filter.
 * //-
 * row.get([
 *   'follows:gwashington',
 *   'follows:alincoln'
 * ], callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.get().then(function(data) {
 *   var row = data[0];
 *   var apiResponse = data[1];
 * });
 */
Row.prototype.get = function(columns, options, callback) {
  var self = this;

  if (!is.array(columns)) {
    callback = options;
    options = columns;
    columns = [];
  }

  if (is.function(options)) {
    callback = options;
    options = {};
  }

  var filter;
  if (options.filter) {
    filter = options.filter;
  } else {
    columns = arrify(columns);

    if (columns.length) {
      var filters = columns.map(Mutation.parseColumnName).map(function(column) {
        var filters = [{family: column.family}];

        if (column.qualifier) {
          filters.push({column: column.qualifier});
        }

        return filters;
      });

      if (filters.length > 1) {
        filter = [
          {
            interleave: filters,
          },
        ];
      } else {
        filter = filters[0];
      }
    }
  }

  var getRowsOptions = extend({}, options, {
    keys: [this.id],
    filter: filter,
  });

  this.table.getRows(getRowsOptions, function(err, rows) {
    if (err) {
      callback(err);
      return;
    }

    var row = rows[0];

    if (!row) {
      err = new RowError(self.id);
      callback(err);
      return;
    }

    extend(true, self.data, row.data);

    // If the user specifies column names, we'll return back the row data we
    // received. Otherwise, we'll return the row itself in a typical
    // GrpcServiceObject#get fashion.
    callback(null, columns.length ? row.data : self);
  });
};

/**
 * Get the row's metadata.
 *
 * @param {object} [options] Configuration object.
 * @param {boolean} [options.decode=true] If set to `false` it will not decode
 *     Buffer values returned from Bigtable.
 * @param {object} [options.gaxOptions] Request configuration options, outlined
 *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {object} callback.metadata The row's metadata.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * row.getMetadata(function(err, metadata, apiResponse) {});
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.getMetadata().then(function(data) {
 *   var metadata = data[0];
 *   var apiResponse = data[1];
 * });
 */
Row.prototype.getMetadata = function(options, callback) {
  if (is.function(options)) {
    callback = options;
    options = {};
  }

  this.get(options, function(err, row, resp) {
    if (err) {
      callback(err, null, resp);
      return;
    }

    callback(null, row.metadata, resp);
  });
};

/**
 * Increment a specific column within the row. If the column does not
 * exist, it is automatically initialized to 0 before being incremented.
 *
 * @param {string} column The column we are incrementing a value in.
 * @param {number} [value] The amount to increment by, defaults to 1.
 * @param {object} [gaxOptions] Request configuration options, outlined here:
 *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {number} callback.value The updated value of the column.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * var callback = function(err, value, apiResponse) {
 *   if (!err) {
 *     // `value` is the value of the updated column.
 *   }
 * };
 *
 * row.increment('follows:gwashington', callback);
 *
 * //-
 * // Specify a custom amount to increment the column by.
 * //-
 * row.increment('follows:gwashington', 2, callback);
 *
 * //-
 * // To decrement a column, simply supply a negative value.
 * //-
 * row.increment('follows:gwashington', -1, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.increment('follows:gwashington').then(function(data) {
 *   var value = data[0];
 *   var apiResponse = data[1];
 * });
 */
Row.prototype.increment = function(column, value, gaxOptions, callback) {
  // increment('column', callback)
  if (is.function(value)) {
    callback = value;
    value = 1;
  }

  // increment('column', value, callback)
  if (is.function(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  // increment('column', { gaxOptions }, callback)
  if (is.object(value)) {
    callback = gaxOptions;
    gaxOptions = value;
    value = 1;
  }

  var reqOpts = {
    column: column,
    increment: value,
  };

  this.createRules(reqOpts, gaxOptions, function(err, resp) {
    if (err) {
      callback(err, null, resp);
      return;
    }

    var data = Row.formatFamilies_(resp.row.families);
    var value = dotProp.get(data, column.replace(':', '.'))[0].value;

    callback(null, value, resp);
  });
};

/**
 * Update the row cells.
 *
 * @param {object} key An entry object to be inserted into the row. See
 *     {@link Table#insert}.
 * @param {object} [gaxOptions] Request configuration options, outlined here:
 *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {object} callback.apiResponse The full API response.
 *
 * @example
 * //-
 * // Update a single cell.
 * //-
 * var callback = function(err, apiResponse) {
 *   if (!err) {
 *     // The row has been successfully updated.
 *   }
 * };
 *
 * row.save('follows:jadams', 1, callback);
 *
 * //-
 * // Or update several cells at once.
 * //-
 * row.save({
 *   follows: {
 *     jadams: 1,
 *     wmckinley: 1
 *   }
 * }, callback);
 *
 * //-
 * // If the callback is omitted, we'll return a Promise.
 * //-
 * row.save('follows:jadams', 1).then(function(data) {
 *   var apiResponse = data[0];
 * });
 */
Row.prototype.save = function(entry, gaxOptions, callback) {
  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  var mutation = {
    key: this.id,
    data: entry,
    method: Mutation.methods.INSERT,
  };

  this.table.mutate(mutation, gaxOptions, callback);
};

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Row);

module.exports = Row;
module.exports.RowError = RowError;
