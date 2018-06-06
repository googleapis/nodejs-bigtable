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

const common = require('@google-cloud/common');
const createErrorClass = require('create-error-class');
const is = require('is');

/**
 * @private
 */
const FamilyError = createErrorClass('FamilyError', function(name) {
  this.message = `Column family not found: ${name}.`;
  this.code = 404;
});

/**
 * Create a Family object to interact with your table column families.
 *
 * @class
 * @param {Table} table
 * @param {string} name
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const table = instance.table('prezzy');
 * const family = table.family('follows');
 */
class Family {
  constructor(table, name) {
    this.bigtable = table.bigtable;
    this.table = table;

    this.id = Family.formatName_(table.id, name);

    /**
     * @name Family#familyName
     * @type {string}
     */
    this.familyName = name.split('/').pop();
  }

  /**
   * Format the Column Family name into the expected proto format.
   *
   * @private
   *
   * @param {string} tableName The full formatted table name.
   * @param {string} name The column family name.
   * @returns {string}
   *
   * @example
   * Family.formatName_(
   *   'projects/p/zones/z/clusters/c/tables/t',
   *   'my-family'
   * );
   * // 'projects/p/zones/z/clusters/c/tables/t/columnFamilies/my-family'
   */
  static formatName_(tableName, name) {
    if (name.indexOf('/') > -1) {
      return name;
    }

    return `${tableName}/columnFamilies/${name}`;
  }

  /**
   * Formats Garbage Collection rule into proto format.
   *
   * @private
   *
   * @param {object} ruleObj The rule object.
   * @returns {object}
   *
   * @example
   * Family.formatRule({
   *   age: {
   *     seconds: 10000,
   *     nanos: 10000
   *   },
   *   versions: 2,
   *   union: true
   * });
   * // {
   * //   union: {
   * //     rules: [
   * //       {
   * //         maxAge: {
   * //           seconds: 10000,
   * //           nanos: 10000
   * //         }
   * //       }, {
   * //         maxNumVersions: 2
   * //       }
   * //     ]
   * //   }
   * // }
   */
  static formatRule_(ruleObj) {
    const rules = [];

    if (ruleObj.age) {
      rules.push({
        maxAge: ruleObj.age,
      });
    }

    if (ruleObj.versions) {
      rules.push({
        maxNumVersions: ruleObj.versions,
      });
    }

    if (ruleObj.rule) {
      rules.push(Family.formatRule_(ruleObj.rule));
    }

    if (rules.length === 1) {
      if (ruleObj.union) {
        throw new Error(
          'A union must have more than one garbage collection rule.'
        );
      }
      return rules[0];
    }

    if (rules.length === 0) {
      throw new Error('No garbage collection rules were specified.');
    }

    const rule = {};
    const ruleType = ruleObj.union ? 'union' : 'intersection';

    rule[ruleType] = {
      rules,
    };

    return rule;
  }

  /**
   * Create a column family.
   *
   * @param {object} [options] See {@link Table#createFamily}.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {Family} callback.family The metadata.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * family.create(function(err, family, apiResponse) {
   *   // The column family was created successfully.
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * family.create().then(function(data) {
   *   const family = data[0];
   *   const apiResponse = data[1];
   * });
   */
  create(options, callback) {
    if (is.fn(options)) {
      callback = options;
      options = {};
    }

    this.table.createFamily(this.familyName, options, callback);
  }

  /**
   * Delete the column family.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} [callback] The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * family.delete(function(err, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * family.delete().then(function(data) {
   *   const apiResponse = data[0];
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
        method: 'modifyColumnFamilies',
        reqOpts: {
          name: this.table.id,
          modifications: [
            {
              id: this.familyName,
              drop: true,
            },
          ],
        },
        gaxOpts: gaxOptions,
      },
      callback
    );
  }

  /**
   * Check if the column family exists.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {boolean} callback.exists Whether the family exists or not.
   *
   * @example
   * family.exists(function(err, exists) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * family.exists().then(function(data) {
   *   const exists = data[0];
   * });
   */
  exists(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.getMetadata(gaxOptions, function(err) {
      if (err) {
        if (err instanceof FamilyError) {
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
   * Get a column family if it exists.
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
   * @param {Family} callback.family The Family object.
   * @param {object} callback.apiResponse The resource as it exists in the API.
   *
   * @example
   * family.get(function(err, family, apiResponse) {
   *   // `family.metadata` has been populated.
   * });
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * family.get().then(function(data) {
   *   const family = data[0];
   *   const apiResponse = data[1];
   * });
   */
  get(options, callback) {
    const self = this;

    if (is.fn(options)) {
      callback = options;
      options = {};
    }

    const autoCreate = !!options.autoCreate;
    const gaxOptions = options.gaxOptions;

    this.getMetadata(gaxOptions, function(err, metadata) {
      if (err) {
        if (err instanceof FamilyError && autoCreate) {
          self.create({gaxOptions, rule: options.rule}, callback);
          return;
        }

        callback(err);
        return;
      }

      callback(null, self, metadata);
    });
  }

  /**
   * Get the column family's metadata.
   *
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.metadata The metadata.
   *
   * @example
   * family.getMetadata(function(err, metadata, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * family.getMetadata().then(function(data) {
   *   var metadata = data[0];
   *   var apiResponse = data[1];
   * });
   */
  getMetadata(gaxOptions, callback) {
    const self = this;

    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.table.getFamilies(gaxOptions, function(err, families) {
      if (err) {
        callback(err);
        return;
      }

      for (let i = 0, l = families.length; i < l; i++) {
        if (families[i].id === self.id) {
          self.metadata = families[i].metadata;
          callback(null, self.metadata);
          return;
        }
      }

      const error = new FamilyError(self.id);
      callback(error);
    });
  }

  /**
   * Set the column family's metadata.
   *
   * See {@link Table#createFamily} for a detailed explanation of the
   * arguments.
   *
   * @see [Garbage Collection Proto Docs]{@link https://github.com/googleapis/googleapis/blob/3592a7339da5a31a3565870989beb86e9235476e/google/bigtable/admin/table/v1/bigtable_table_data.proto#L59}
   *
   * @param {object} metadata Metadata object.
   * @param {object} [metadata.rule] Garbage collection rule.
   * @param {object} [gaxOptions] Request configuration options, outlined here:
   *     https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
   * @param {function} callback The callback function.
   * @param {?error} callback.err An error returned while making this
   *     request.
   * @param {object} callback.apiResponse The full API response.
   *
   * @example
   * var metadata = {
   *   rule: {
   *     versions: 2,
   *     union: true
   *   }
   * };
   *
   * family.setMetadata(metadata, function(err, apiResponse) {});
   *
   * //-
   * // If the callback is omitted, we'll return a Promise.
   * //-
   * family.setMetadata(metadata).then(function(data) {
   *   var apiResponse = data[0];
   * });
   */
  setMetadata(metadata, gaxOptions, callback) {
    const self = this;

    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    const mod = {
      id: this.familyName,
      update: {},
    };

    if (metadata.rule) {
      mod.update.gcRule = Family.formatRule_(metadata.rule);
    }

    const reqOpts = {
      name: this.table.id,
      modifications: [mod],
    };

    this.bigtable.request(
      {
        client: 'BigtableTableAdminClient',
        method: 'modifyColumnFamilies',
        reqOpts,
        gaxOpts: gaxOptions,
      },
      function(...args) {
        if (args[1]) {
          self.metadata = args[1].columnFamilies[self.familyName];
          args.splice(1, 0, self.metadata);
        }

        callback(...args);
      }
    );
  }
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Family);

module.exports = Family;
module.exports.FamilyError = FamilyError;
