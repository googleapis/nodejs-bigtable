/**
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

var assert = require('assert');
var extend = require('extend');
var format = require('string-format-obj');
var proxyquire = require('proxyquire');
var util = require('@google-cloud/common').util;

var promisified = false;
var fakeUtil = extend({}, util, {
  promisifyAll: function(Class) {
    if (Class.name === 'Family') {
      promisified = true;
    }
  },
});

describe('Bigtable/Family', function() {
  var FAMILY_NAME = 'family-test';
  var TABLE = {
    bigtable: {},
    id: 'my-table',
    getFamilies: util.noop,
    createFamily: util.noop,
  };

  var FAMILY_ID = format('{t}/columnFamilies/{f}', {
    t: TABLE.id,
    f: FAMILY_NAME,
  });

  var Family;
  var family;
  var FamilyError;

  before(function() {
    Family = proxyquire('../src/family.js', {
      '@google-cloud/common': {
        util: fakeUtil,
      },
    });

    FamilyError = Family.FamilyError;
  });

  beforeEach(function() {
    family = new Family(TABLE, FAMILY_NAME);
  });

  describe('instantiation', function() {
    it('should promisify all the things', function() {
      assert(promisified);
    });

    it('should localize the Bigtable instance', function() {
      assert.strictEqual(family.bigtable, TABLE.bigtable);
    });

    it('should localize the Table instance', function() {
      assert.strictEqual(family.table, TABLE);
    });

    it('should localize the full resource path', function() {
      assert.strictEqual(family.id, FAMILY_ID);
    });

    it('should extract the family name', function() {
      var family = new Family(TABLE, FAMILY_ID);
      assert.strictEqual(family.familyName, FAMILY_NAME);
    });
  });

  describe('formatName_', function() {
    it('should format the column family name', function() {
      var formatted = Family.formatName_(TABLE.id, FAMILY_NAME);

      assert.strictEqual(formatted, FAMILY_ID);
    });

    it('should not re-format the name', function() {
      var formatted = Family.formatName_(TABLE.id, FAMILY_ID);

      assert.strictEqual(formatted, FAMILY_ID);
    });
  });

  describe('formatRule_', function() {
    it('should capture the max age option', function() {
      var originalRule = {
        age: 10,
      };

      var rule = Family.formatRule_(originalRule);

      assert.deepEqual(rule, {
        maxAge: originalRule.age,
      });
    });

    it('should capture the max number of versions option', function() {
      var originalRule = {
        versions: 10,
      };

      var rule = Family.formatRule_(originalRule);

      assert.deepEqual(rule, {
        maxNumVersions: originalRule.versions,
      });
    });

    it('should create a union rule', function() {
      var originalRule = {
        age: 10,
        union: true,
      };

      var rule = Family.formatRule_(originalRule);

      assert.deepEqual(rule, {
        union: {
          rules: [
            {
              maxAge: originalRule.age,
            },
          ],
        },
      });
    });

    it('should create an intersecting rule', function() {
      var originalRule = {
        versions: 2,
        intersection: true,
      };

      var rule = Family.formatRule_(originalRule);

      assert.deepEqual(rule, {
        intersection: {
          rules: [
            {
              maxNumVersions: originalRule.versions,
            },
          ],
        },
      });
    });
  });

  describe('create', function() {
    it('should call createFamily from table', function(done) {
      var options = {};

      family.table.createFamily = function(name, options_, callback) {
        assert.strictEqual(name, family.familyName);
        assert.strictEqual(options_, options);
        callback(); // done()
      };

      family.create(options, done);
    });

    it('should not require options', function(done) {
      family.table.createFamily = function(name, options, callback) {
        assert.deepStrictEqual(options, {});
        callback(); // done()
      };

      family.create(done);
    });
  });

  describe('delete', function() {
    it('should make the correct request', function(done) {
      family.bigtable.request = function(config, callback) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'modifyColumnFamilies');

        assert.deepStrictEqual(config.reqOpts, {
          name: family.table.id,
          modifications: [
            {
              id: family.familyName,
              drop: true,
            },
          ],
        });

        assert.deepStrictEqual(config.gaxOpts, {});

        callback(); // done()
      };

      family.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      family.bigtable.request = function(config) {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      family.delete(gaxOptions, assert.ifError);
    });
  });

  describe('exists', function() {
    it('should not require gaxOptions', function(done) {
      family.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, {});
        done();
      };

      family.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', function(done) {
      var gaxOptions = {};

      family.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      family.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error name is FamilyError', function(done) {
      var error = new Error('Error.');
      error.name = 'FamilyError';

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if name is not FamilyError', function(done) {
      var error = new Error('Error.');
      error.name = 'NOT-FamilyError';

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.exists(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', function(done) {
      family.getMetadata = function(gaxOptions, callback) {
        callback(null, {});
      };

      family.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('get', function() {
    it('should call getMetadata', function(done) {
      var options = {
        gaxOptions: {},
      };

      family.getMetadata = function(gaxOptions) {
        assert.strictEqual(gaxOptions, options.gaxOptions);
        done();
      };

      family.get(options, assert.ifError);
    });

    it('should not require an options object', function(done) {
      family.getMetadata = function(gaxOptions) {
        assert.deepStrictEqual(gaxOptions, undefined);
        done();
      };

      family.get(assert.ifError);
    });

    it('should auto create with error code 5', function(done) {
      var error = new Error('Error.');
      error.code = 5;

      var options = {
        autoCreate: true,
        gaxOptions: {},
      };

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.create = function(options_, callback) {
        assert.strictEqual(options_.gaxOptions, options.gaxOptions);
        callback(); // done()
      };

      family.get(options, done);
    });

    it('should not auto create without error code 5', function(done) {
      var error = new Error('Error.');
      error.code = 'NOT-5';

      var options = {
        autoCreate: true,
      };

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.create = function() {
        throw new Error('Should not create.');
      };

      family.get(options, function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should not auto create unless requested', function(done) {
      var error = new Error('Error.');
      error.code = 5;

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.create = function() {
        throw new Error('Should not create.');
      };

      family.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return an error from getMetadata', function(done) {
      var error = new Error('Error.');

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      var apiResponse = {};

      family.getMetadata = function(gaxOptions, callback) {
        callback(null, apiResponse);
      };

      family.get(function(err, family_, apiResponse_) {
        assert.ifError(err);
        assert.strictEqual(family_, family);
        assert.strictEqual(apiResponse_, apiResponse);
        done();
      });
    });
  });

  describe('getMetadata', function() {
    it('should accept gaxOptions', function(done) {
      var gaxOptions = {};

      family.table.getFamilies = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      family.getMetadata(gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var err = new Error('err');
      var response = {};

      family.table.getFamilies = function(gaxOptions, callback) {
        callback(err, null, response);
      };

      family.getMetadata(function(err_) {
        assert.strictEqual(err, err_);
        done();
      });
    });

    it('should update the metadata', function(done) {
      var family = new Family(TABLE, FAMILY_NAME);
      family.metadata = {
        a: 'a',
        b: 'b',
      };

      family.table.getFamilies = function(gaxOptions, callback) {
        callback(null, [family]);
      };

      family.getMetadata(function(err, metadata) {
        assert.ifError(err);
        assert.strictEqual(metadata, family.metadata);
        done();
      });
    });

    it('should return a custom error if no results', function(done) {
      family.table.getFamilies = function(gaxOptions, callback) {
        callback(null, []);
      };

      family.getMetadata(function(err) {
        assert(err instanceof FamilyError);
        done();
      });
    });
  });

  describe('setMetadata', function() {
    it('should provide the proper request options', function(done) {
      family.bigtable.request = function(config) {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'modifyColumnFamilies');

        assert.strictEqual(config.reqOpts.name, TABLE.id);
        assert.deepEqual(config.reqOpts.modifications, [
          {
            id: FAMILY_NAME,
            update: {},
          },
        ]);

        done();
      };

      family.setMetadata({}, assert.ifError);
    });

    it('should respect the gc rule option', function(done) {
      var formatRule = Family.formatRule_;

      var formattedRule = {
        a: 'a',
        b: 'b',
      };

      var metadata = {
        rule: {
          c: 'c',
          d: 'd',
        },
      };

      Family.formatRule_ = function(rule) {
        assert.strictEqual(rule, metadata.rule);
        return formattedRule;
      };

      family.bigtable.request = function(config) {
        assert.deepEqual(config.reqOpts, {
          name: TABLE.id,
          modifications: [
            {
              id: family.familyName,
              update: {
                gcRule: formattedRule,
              },
            },
          ],
        });
        Family.formatRule_ = formatRule;
        done();
      };

      family.setMetadata(metadata, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      var error = new Error('err');

      family.bigtable.request = function(config, callback) {
        callback(error);
      };

      family.setMetadata({}, function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should update the metadata property', function(done) {
      var fakeMetadata = {};
      var response = {
        columnFamilies: {
          'family-test': fakeMetadata,
        },
      };

      family.bigtable.request = function(config, callback) {
        callback(null, response);
      };

      family.setMetadata({}, function(err, metadata, apiResponse) {
        assert.ifError(err);
        assert.strictEqual(metadata, fakeMetadata);
        assert.strictEqual(family.metadata, fakeMetadata);
        assert.strictEqual(apiResponse, response);
        done();
      });
    });
  });

  describe('FamilyError', function() {
    it('should set the code and message', function() {
      var err = new FamilyError(FAMILY_NAME);

      assert.strictEqual(err.code, 404);
      assert.strictEqual(
        err.message,
        'Column family not found: ' + FAMILY_NAME + '.'
      );
    });
  });
});
