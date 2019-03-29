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

import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import * as proxyquire from 'proxyquire';

let promisified = false;
const fakePromisify = Object.assign({}, promisify, {
  promisifyAll(Class) {
    if (Class.name === 'Family') {
      promisified = true;
    }
  },
});

describe('Bigtable/Family', function() {
  const FAMILY_ID = 'family-test';
  const TABLE = {
    bigtable: {},
    id: 'my-table',
    name: 'projects/my-project/instances/my-inststance/tables/my-table',
    getFamilies: () => {},
    createFamily: () => {},
  };

  const FAMILY_NAME = `${TABLE.name}/columnFamilies/${FAMILY_ID}`;
  let Family;
  let family;
  let FamilyError;

  before(function() {
    const Fake = proxyquire('../src/family.js', {
      '@google-cloud/promisify': fakePromisify,
    });
    Family = Fake.Family;
    FamilyError = Fake.FamilyError;
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
      const family = new Family(TABLE, FAMILY_ID);
      assert.strictEqual(family.name, FAMILY_NAME);
    });

    it('should leave full family names unaltered and localize the id from the name',
       function() {
         const family = new Family(TABLE, FAMILY_NAME);
         assert.strictEqual(family.name, FAMILY_NAME);
         assert.strictEqual(family.id, FAMILY_ID);
       });

    it('should throw if family id in wrong format', function() {
      const id = `/project/bad-project/instances/bad-instance/columnFamiles/${
          FAMILY_ID}`;
      assert.throws(function() {
        new Family(TABLE, id);
      }, Error);
    });
  });

  describe('formatRule_', function() {
    it('should capture the max age option', function() {
      const originalRule = {
        age: 10,
      };

      const rule = Family.formatRule_(originalRule);

      assert.deepStrictEqual(rule, {
        maxAge: originalRule.age,
      });
    });

    it('should capture the max number of versions option', function() {
      const originalRule = {
        versions: 10,
      };

      const rule = Family.formatRule_(originalRule);

      assert.deepStrictEqual(rule, {
        maxNumVersions: originalRule.versions,
      });
    });

    it('should create a union rule', function() {
      const originalRule = {
        age: 10,
        versions: 2,
        union: true,
      };

      const rule = Family.formatRule_(originalRule);

      assert.deepStrictEqual(rule, {
        union: {
          rules: [
            {
              maxAge: originalRule.age,
            },
            {
              maxNumVersions: originalRule.versions,
            },
          ],
        },
      });
    });

    it('should create an intersecting rule', function() {
      const originalRule = {
        age: 10,
        versions: 2,
      };

      const rule = Family.formatRule_(originalRule);

      assert.deepStrictEqual(rule, {
        intersection: {
          rules: [
            {
              maxAge: originalRule.age,
            },
            {
              maxNumVersions: originalRule.versions,
            },
          ],
        },
      });
    });

    it('should allow nested rules', function() {
      const originalRule = {
        age: 10,
        rule: {age: 30, versions: 2},
        union: true,
      };

      const rule = Family.formatRule_(originalRule);

      assert.deepStrictEqual(rule, {
        union: {
          rules: [
            {maxAge: originalRule.age},
            {
              intersection: {
                rules: [
                  {maxAge: originalRule.rule.age},
                  {maxNumVersions: originalRule.rule.versions},
                ],
              },
            },
          ],
        },
      });
    });

    it('should throw if union only has one rule', function() {
      assert.throws(function() {
        Family.formatRule_({age: 10, union: true});
      }, /A union must have more than one garbage collection rule\./);
    });

    it('should throw if no rules are provided', function() {
      assert.throws(function() {
        Family.formatRule_({});
      }, /No garbage collection rules were specified\./);
    });
  });

  describe('create', function() {
    it('should call createFamily from table', function(done) {
      const options = {};

      family.table.createFamily = function(id, options_, callback) {
        assert.strictEqual(id, family.id);
        assert.strictEqual(options_, options);
        callback();  // done()
      };

      family.create(options, done);
    });

    it('should not require options', function(done) {
      family.table.createFamily = function(name, options, callback) {
        assert.deepStrictEqual(options, {});
        callback();  // done()
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
          name: family.table.name,
          modifications: [
            {
              id: family.id,
              drop: true,
            },
          ],
        });

        assert.deepStrictEqual(config.gaxOpts, {});

        callback();  // done()
      };

      family.delete(done);
    });

    it('should accept gaxOptions', function(done) {
      const gaxOptions = {};

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
      const gaxOptions = {};

      family.getMetadata = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      family.exists(gaxOptions, assert.ifError);
    });

    it('should return false if FamilyError', function(done) {
      const error = new FamilyError('Error.');

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if not FamilyError', function(done) {
      const error = new Error('Error.');

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
      const options = {
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

    it('should auto create with a FamilyError error', function(done) {
      const error = new FamilyError(TABLE.id);

      const options = {
        autoCreate: true,
        gaxOptions: {},
      };

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.create = function(options_, callback) {
        assert.strictEqual(options_.gaxOptions, options.gaxOptions);
        callback();
      };

      family.get(options, done);
    });

    it('should pass the rules when auto creating', function(done) {
      const error = new FamilyError(TABLE.id);

      const options = {
        autoCreate: true,
        rule: {
          versions: 1,
        },
      };

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.create = function(options_, callback) {
        assert.deepStrictEqual(options.rule, {versions: 1});
        callback();
      };

      family.get(options, done);
    });

    it('should not auto create without a FamilyError error', function(done) {
      const error: any = new Error('Error.');
      error.code = 'NOT-5';

      const options = {
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
      const error = new FamilyError(TABLE.id);

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
      const error = new Error('Error.');

      family.getMetadata = function(gaxOptions, callback) {
        callback(error);
      };

      family.get(function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', function(done) {
      const apiResponse = {};

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
      const gaxOptions = {};

      family.table.getFamilies = function(gaxOptions_) {
        assert.strictEqual(gaxOptions_, gaxOptions);
        done();
      };

      family.getMetadata(gaxOptions, assert.ifError);
    });

    it('should return an error to the callback', function(done) {
      const err = new Error('err');
      const response = {};

      family.table.getFamilies = function(gaxOptions, callback) {
        callback(err, null, response);
      };

      family.getMetadata(function(err_) {
        assert.strictEqual(err, err_);
        done();
      });
    });

    it('should update the metadata', function(done) {
      const family = new Family(TABLE, FAMILY_NAME);
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

        assert.strictEqual(config.reqOpts.name, TABLE.name);
        assert.deepStrictEqual(config.reqOpts.modifications, [
          {
            id: FAMILY_ID,
            update: {},
          },
        ]);

        done();
      };

      family.setMetadata({}, assert.ifError);
    });

    it('should respect the gc rule option', function(done) {
      const formatRule = Family.formatRule_;

      const formattedRule = {
        a: 'a',
        b: 'b',
      };

      const metadata = {
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
        assert.deepStrictEqual(config.reqOpts, {
          name: TABLE.name,
          modifications: [
            {
              id: family.id,
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
      const error = new Error('err');

      family.bigtable.request = function(config, callback) {
        callback(error);
      };

      family.setMetadata({}, function(err) {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should update the metadata property', function(done) {
      const fakeMetadata = {};
      const response = {
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
      const err = new FamilyError(FAMILY_NAME);

      assert.strictEqual(err.code, 404);
      assert.strictEqual(
          err.message, 'Column family not found: ' + FAMILY_NAME + '.');
    });
  });
});
