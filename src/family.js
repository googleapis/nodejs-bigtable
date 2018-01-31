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

var common = require('@google-cloud/common');
var commonGrpc = require('@google-cloud/common-grpc');
var createErrorClass = require('create-error-class');
var util = require('util');

/**
 * @private
 */
var FamilyError = createErrorClass('FamilyError', function(name) {
  this.message = 'Column family not found: ' + name + '.';
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
function Family(table, name) {
  var id = Family.formatName_(table.id, name);
  /**
   * @name Family#familyName
   * @type {string}
   */
  this.familyName = name.split('/').pop();

  var methods = {
    /**
     * Create a column family.
     *
     * @method Family#create
     * @param {object} [options] See {@link Table#createFamily}.
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
    create: true,

    /**
     * Delete the column family.
     *
     * @method Family#delete
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
    delete: {
      protoOpts: {
        service: 'BigtableTableAdmin',
        method: 'modifyColumnFamilies',
      },
      reqOpts: {
        name: table.id,
        modifications: [
          {
            id: this.familyName,
            drop: true,
          },
        ],
      },
    },

    /**
     * Check if the column family exists.
     *
     * @method Family#exists
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
    exists: true,

    /**
     * Get a column family if it exists.
     *
     * You may optionally use this to "get or create" an object by providing an
     * object with `autoCreate` set to `true`. Any extra configuration that is
     * normally required for the `create` method must be contained within this
     * object as well.
     *
     * @method Family#get
     * @param {object} [options] Configuration object.
     * @param {boolean} [options.autoCreate=false] Automatically create the
     *     object if it does not exist.
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
    get: true,
  };

  var config = {
    parent: table,
    id: id,
    methods: methods,
    createMethod: function(_, options, callback) {
      table.createFamily(name, options, callback);
    },
  };

  commonGrpc.ServiceObject.call(this, config);
}

util.inherits(Family, commonGrpc.ServiceObject);

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
Family.formatName_ = function(tableName, name) {
  if (name.indexOf('/') > -1) {
    return name;
  }

  return tableName + '/columnFamilies/' + name;
};

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
Family.formatRule_ = function(ruleObj) {
  var rules = [];

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

  if (!ruleObj.intersection && !ruleObj.union) {
    return rules[0];
  }

  var rule = {};
  var ruleType = ruleObj.union ? 'union' : 'intersection';

  rule[ruleType] = {
    rules: rules,
  };

  return rule;
};

/**
 * Get the column family's metadata.
 *
 * @param {function} callback The callback function.
 * @param {?error} callback.err An error returned while making this
 *     request.
 * @param {object} callback.metadata The metadata.
 * @param {object} callback.apiResponse The full API response.
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
Family.prototype.getMetadata = function(callback) {
  var self = this;

  this.parent.getFamilies(function(err, families, resp) {
    if (err) {
      callback(err, null, resp);
      return;
    }

    for (var i = 0, l = families.length; i < l; i++) {
      if (families[i].id === self.id) {
        self.metadata = families[i].metadata;
        callback(null, self.metadata, resp);
        return;
      }
    }

    var error = new FamilyError(self.id);
    callback(error, null, resp);
  });
};

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
Family.prototype.setMetadata = function(metadata, gaxOptions, callback) {
  var self = this;
  var bigtable = this.parent;

  if (is.fn(gaxOptions)) {
    callback = gaxOptions;
    gaxOptions = {};
  }

  var mod = {
    id: this.familyName,
    update: {},
  };

  if (metadata.rule) {
    mod.update.gcRule = Family.formatRule_(metadata.rule);
  }

  var reqOpts = {
    name: bigtable.id,
    modifications: [mod],
  };

  bigtable.request({
    client: 'BigtableTableAdmin',
    method: 'modifyColumnFamilies',
    reqOpts: reqOpts,
    gaxOpts: gaxOptions,
  }, function(err, resp) {
    if (err) {
      callback(err, null, resp);
      return;
    }

    self.metadata = resp.columnFamilies[self.familyName];
    callback(null, self.metadata, resp);
  });
};

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Family);

module.exports = Family;
module.exports.FamilyError = FamilyError;
