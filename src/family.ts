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

import {promisifyAll} from '@google-cloud/promisify';
import * as is from 'is';

/**
 * @private
 */
export class FamilyError extends Error {
  code;
  constructor(name) {
    super();
    this.name = 'FamilyError';
    this.message = `Column family not found: ${name}.`;
    this.code = 404;
  }
}

/**
 * Create a Family object to interact with your table column families.
 *
 * @class
 * @param {Table} table
 * @param {string} id
 *
 * @example
 * const Bigtable = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const table = instance.table('prezzy');
 * const family = table.family('follows');
 */
export class Family {
  bigtable;
  table;
  name;
  id;
  metadata;
  constructor(table, id) {
    this.bigtable = table.bigtable;
    this.table = table;

    let name;
    if (id.includes('/')) {
      if (id.startsWith(`${table.name}/columnFamilies/`)) {
        name = id;
      } else {
        throw new Error(`Family id '${id}' is not formatted correctly.
Please use the format 'follows' or '${table.name}/columnFamilies/my-family'.`);
      }
    } else {
      name = `${table.name}/columnFamilies/${id}`;
    }

    this.name = name;
    this.id = name.split('/').pop();
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
    const rules: any[] = [];

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
            'A union must have more than one garbage collection rule.');
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
   * @example <caption>include:samples/document-snippets/family.js</caption>
   * region_tag:bigtable_create_family
   */
  create(options, callback) {
    if (is.fn(options)) {
      callback = options;
      options = {};
    }

    this.table.createFamily(this.id, options, callback);
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
   * @example <caption>include:samples/document-snippets/family.js</caption>
   * region_tag:bigtable_del_family
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
            name: this.table.name,
            modifications: [
              {
                id: this.id,
                drop: true,
              },
            ],
          },
          gaxOpts: gaxOptions,
        },
        callback);
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
   * @example <caption>include:samples/document-snippets/family.js</caption>
   * region_tag:bigtable_exists_family
   */
  exists(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.getMetadata(gaxOptions, err => {
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
   * @example <caption>include:samples/document-snippets/family.js</caption>
   * region_tag:bigtable_get_family
   */
  get(options, callback) {
    if (is.fn(options)) {
      callback = options;
      options = {};
    }

    const autoCreate = !!options.autoCreate;
    const gaxOptions = options.gaxOptions;

    this.getMetadata(gaxOptions, (err, metadata) => {
      if (err) {
        if (err instanceof FamilyError && autoCreate) {
          this.create({gaxOptions, rule: options.rule}, callback);
          return;
        }

        callback(err);
        return;
      }

      callback(null, this, metadata);
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
   * @example <caption>include:samples/document-snippets/family.js</caption>
   * region_tag:bigtable_get_family_meta
   */
  getMetadata(gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    this.table.getFamilies(gaxOptions, (err, families) => {
      if (err) {
        callback(err);
        return;
      }

      for (let i = 0, l = families.length; i < l; i++) {
        if (families[i].name === this.name) {
          this.metadata = families[i].metadata;
          callback(null, this.metadata);
          return;
        }
      }

      const error = new FamilyError(this.id);
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
   * @example <caption>include:samples/document-snippets/family.js</caption>
   * region_tag:bigtable_set_family_meta
   */
  setMetadata(metadata, gaxOptions, callback) {
    if (is.fn(gaxOptions)) {
      callback = gaxOptions;
      gaxOptions = {};
    }

    const mod: any = {
      id: this.id,
      update: {},
    };

    if (metadata.rule) {
      mod.update.gcRule = Family.formatRule_(metadata.rule);
    }

    const reqOpts = {
      name: this.table.name,
      modifications: [mod],
    };

    this.bigtable.request(
        {
          client: 'BigtableTableAdminClient',
          method: 'modifyColumnFamilies',
          reqOpts,
          gaxOpts: gaxOptions,
        },
        (...args) => {
          if (args[1]) {
            this.metadata = args[1].columnFamilies[this.id];
            args.splice(1, 0, this.metadata);
          }

          callback(...args);
        });
  }
}

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
promisifyAll(Family);
