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

var assert = require('assert');
var async = require('async');
var uuid = require('uuid');

var Bigtable = require('../');
var AppProfile = require('../src/app-profile.js');
var Cluster = require('../src/cluster.js');
var Table = require('../src/table.js');
var Family = require('../src/family.js');
var Row = require('../src/row.js');

var PREFIX = 'gcloud-tests-';

describe('Bigtable', function() {
  var bigtable = new Bigtable();

  var INSTANCE = bigtable.instance(generateId('instance'));
  var TABLE = INSTANCE.table(generateId('table'));
  var APP_PROFILE_ID = generateId('appProfile');
  var APP_PROFILE = INSTANCE.appProfile(APP_PROFILE_ID);
  var CLUSTER_ID = generateId('cluster');

  before(function(done) {
    INSTANCE.create(
      {
        clusters: [
          {
            id: CLUSTER_ID,
            location: 'us-central1-c',
            nodes: 3,
          },
        ],
      },
      function(err, instance, operation) {
        if (err) {
          done(err);
          return;
        }

        operation.on('error', done).on('complete', function() {
          TABLE.create(
            {
              families: ['follows', 'traits'],
            },
            function(err) {
              if (err) {
                done(err);
                return;
              }
              INSTANCE.createAppProfile(
                APP_PROFILE_ID,
                {
                  routing: 'any',
                  ignoreWarnings: true,
                },
                done
              );
            }
          );
        });
      }
    );
  });

  after(function(done) {
    bigtable.getInstances(function(err, instances) {
      if (err) {
        done(err);
        return;
      }

      var testInstances = instances.filter(function(instance) {
        return instance.id.match(PREFIX);
      });

      async.eachLimit(
        testInstances,
        5,
        function(instance, next) {
          instance.delete(next);
        },
        done
      );
    });
  });

  describe('instances', function() {
    it('should get a list of instances', function(done) {
      bigtable.getInstances(function(err, instances) {
        assert.ifError(err);
        assert(instances.length > 0);
        done();
      });
    });

    it('should check if an instance exists', function(done) {
      INSTANCE.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });

    it('should check if an instance does not exist', function(done) {
      var instance = bigtable.instance('fake-instance');

      instance.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should get a single instance', function(done) {
      INSTANCE.get(done);
    });

    it('should update an instance', function(done) {
      var metadata = {
        displayName: 'metadata-test',
      };

      INSTANCE.setMetadata(metadata, function(err) {
        assert.ifError(err);

        INSTANCE.getMetadata(function(err, metadata_) {
          assert.ifError(err);
          assert.strictEqual(metadata.displayName, metadata_.displayName);
          done();
        });
      });
    });
  });

  describe('appProfiles', function() {
    it('should retrieve a list of app profiles', function(done) {
      INSTANCE.getAppProfiles(function(err, appProfiles) {
        assert.ifError(err);
        assert(appProfiles[0] instanceof AppProfile);
        done();
      });
    });

    it('should check if an app profile exists', function(done) {
      APP_PROFILE.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });

    it('should check if an app profile does not exist', function(done) {
      var appProfile = INSTANCE.appProfile('should-not-exist');

      appProfile.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should get an app profile', function(done) {
      APP_PROFILE.get(done);
    });

    it('should delete an app profile', function(done) {
      var appProfile = INSTANCE.appProfile(generateId('app-profile'));

      async.series(
        [
          appProfile.create.bind(appProfile, {
            routing: 'any',
            ignoreWarnings: true,
          }),
          appProfile.delete.bind(appProfile, {ignoreWarnings: true}),
        ],
        done
      );
    });

    it('should get the app profiles metadata', function(done) {
      APP_PROFILE.getMetadata(function(err, metadata) {
        assert.strictEqual(
          metadata.name,
          APP_PROFILE.name.replace('{{projectId}}', bigtable.projectId)
        );
        done();
      });
    });

    it('should update an app profile', function(done) {
      var cluster = INSTANCE.cluster(CLUSTER_ID);
      var options = {
        routing: cluster,
        allowTransactionalWrites: true,
        description: 'My Updated App Profile',
      };
      APP_PROFILE.setMetadata(options, function(err) {
        assert.ifError(err);
        APP_PROFILE.get(function(err, updatedAppProfile) {
          assert.ifError(err);
          assert.strictEqual(
            updatedAppProfile.metadata.description,
            options.description
          );
          assert.deepStrictEqual(
            updatedAppProfile.metadata.singleClusterRouting,
            {
              clusterId: CLUSTER_ID,
              allowTransactionalWrites: true,
            }
          );
          done();
        });
      });
    });
  });

  describe('clusters', function() {
    var CLUSTER;

    beforeEach(function() {
      CLUSTER = INSTANCE.cluster(CLUSTER_ID);
    });

    it('should retrieve a list of clusters', function(done) {
      INSTANCE.getClusters(function(err, clusters) {
        assert.ifError(err);
        assert(clusters[0] instanceof Cluster);
        done();
      });
    });

    it('should check if a cluster exists', function(done) {
      CLUSTER.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });

    it('should check if a cluster does not exist', function(done) {
      var cluster = INSTANCE.cluster('fake-cluster');

      cluster.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should get a cluster', function(done) {
      CLUSTER.get(done);
    });

    it('should update a cluster', function(done) {
      var metadata = {
        nodes: 4,
      };

      CLUSTER.setMetadata(metadata, function(err, operation) {
        assert.ifError(err);

        operation.on('error', done).on('complete', function() {
          CLUSTER.getMetadata(function(err, _metadata) {
            assert.ifError(err);
            assert.strictEqual(metadata.nodes, _metadata.serveNodes);
            done();
          });
        });
      });
    });
  });

  describe('tables', function() {
    it('should retrieve a list of tables', function(done) {
      INSTANCE.getTables(function(err, tables) {
        assert.ifError(err);
        assert(tables[0] instanceof Table);
        done();
      });
    });

    it('should retrieve a list of tables in stream mode', function(done) {
      var tables = [];

      INSTANCE.getTablesStream()
        .on('error', done)
        .on('data', function(table) {
          assert(table instanceof Table);
          tables.push(table);
        })
        .on('end', function() {
          assert(tables.length > 0);
          done();
        });
    });

    it('should check if a table exists', function(done) {
      TABLE.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });

    it('should check if a table does not exist', function(done) {
      var table = INSTANCE.table('should-not-exist');

      table.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should get a table', function(done) {
      TABLE.get(done);
    });

    it('should delete a table', function(done) {
      var table = INSTANCE.table(generateId('table'));

      async.series([table.create.bind(table), table.delete.bind(table)], done);
    });

    it('should get the tables metadata', function(done) {
      TABLE.getMetadata(function(err, metadata) {
        assert.strictEqual(
          metadata.name,
          TABLE.name.replace('{{projectId}}', bigtable.projectId)
        );
        done();
      });
    });

    it('should create a table with column family data', function(done) {
      var name = generateId('table');
      var options = {
        families: ['test'],
      };

      INSTANCE.createTable(name, options, function(err, table) {
        assert.ifError(err);
        assert(table.metadata.columnFamilies.test);
        done();
      });
    });

    it('should create a table if autoCreate is true', function(done) {
      var table = INSTANCE.table(generateId('table'));
      async.series(
        [table.get.bind(table, {autoCreate: true}), table.delete.bind(table)],
        done
      );
    });
  });

  describe('consistency tokens', function() {
    it('should generate consistency token', done => {
      TABLE.generateConsistencyToken(function(err, token) {
        assert.ifError(err);
        assert.strictEqual(typeof token, 'string');
        done();
      });
    });

    it('should return error for checkConsistency of invalid token', done => {
      TABLE.checkConsistency('dummy-token', function(err) {
        assert.strictEqual(err.code, 3);
        done();
      });
    });

    it('should return boolean for checkConsistency of token', done => {
      TABLE.generateConsistencyToken(function(err, token) {
        TABLE.checkConsistency(token, function(err, res) {
          assert.ifError(err);
          assert.strictEqual(typeof res, 'boolean');
          done();
        });
      });
    });

    it('should return boolean for waitForReplication', done => {
      TABLE.waitForReplication(function(err, res) {
        assert.ifError(err);
        assert.strictEqual(typeof res, 'boolean');
        done();
      });
    });
  });

  describe('column families', function() {
    var FAMILY_ID = 'presidents';
    var FAMILY;

    before(function(done) {
      FAMILY = TABLE.family(FAMILY_ID);
      FAMILY.create(done);
    });

    it('should get a list of families', function(done) {
      TABLE.getFamilies(function(err, families) {
        assert.ifError(err);
        assert.strictEqual(families.length, 3);
        assert(families[0] instanceof Family);
        assert.notEqual(
          -1,
          families
            .map(f => {
              return f.id;
            })
            .indexOf(FAMILY.id)
        );
        done();
      });
    });

    it('should get a family', function(done) {
      var family = TABLE.family(FAMILY_ID);

      family.get(function(err, family) {
        assert.ifError(err);
        assert(family instanceof Family);
        assert.strictEqual(family.name, FAMILY.name);
        assert.strictEqual(family.id, FAMILY.id);
        done();
      });
    });

    it('should check if a family exists', function(done) {
      FAMILY.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });

    it('should check if a family does not exist', function(done) {
      var family = TABLE.family('prezzies');

      family.exists(function(err, exists) {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should create a family if autoCreate is true', function(done) {
      var family = TABLE.family('prezzies');

      async.series(
        [
          family.get.bind(family, {autoCreate: true}),
          family.delete.bind(family),
        ],
        done
      );
    });

    it('should create a family with nested gc rules', function(done) {
      var family = TABLE.family('prezzies');
      var options = {
        rule: {
          union: true,
          versions: 10,
          rule: {
            versions: 2,
            age: {seconds: 60 * 60 * 24 * 30},
          },
        },
      };

      async.series(
        [
          family.create.bind(family, options),
          next => {
            family.getMetadata((err, metadata) => {
              if (err) return next(err);
              assert.deepStrictEqual(metadata.gcRule, {
                union: {
                  rules: [
                    {
                      maxNumVersions: 10,
                      rule: 'maxNumVersions',
                    },
                    {
                      intersection: {
                        rules: [
                          {
                            maxAge: {
                              seconds: '2592000',
                              nanos: 0,
                            },
                            rule: 'maxAge',
                          },
                          {
                            maxNumVersions: 2,
                            rule: 'maxNumVersions',
                          },
                        ],
                      },
                      rule: 'intersection',
                    },
                  ],
                },
                rule: 'union',
              });
              next();
            });
          },
          family.delete.bind(family),
        ],
        done
      );
    });

    it('should get the column family metadata', function(done) {
      FAMILY.getMetadata(function(err, metadata) {
        assert.ifError(err);
        assert.strictEqual(FAMILY.metadata, metadata);
        done();
      });
    });

    it('should update a column family', function(done) {
      var rule = {
        age: {
          seconds: 10000,
          nanos: 10000,
        },
      };

      FAMILY.setMetadata({rule: rule}, function(err, metadata) {
        assert.ifError(err);
        var maxAge = metadata.gcRule.maxAge;

        assert.strictEqual(maxAge.seconds, rule.age.seconds.toString());
        assert.strictEqual(maxAge.nanos, rule.age.nanos.toString());
        done();
      });
    });

    it('should delete a column family', function(done) {
      FAMILY.delete(done);
    });
  });

  describe('rows', function() {
    describe('.exists()', function() {
      var row = TABLE.row('alincoln');

      beforeEach(function(done) {
        var rowData = {
          follows: {
            gwashington: 1,
            jadams: 1,
            tjefferson: 1,
          },
        };

        row.create(
          {
            entry: rowData,
          },
          done
        );
      });

      afterEach(row.delete.bind(row));

      it('should check if a row exists', function(done) {
        row.exists(function(err, exists) {
          assert.ifError(err);
          assert.strictEqual(exists, true);
          done();
        });
      });

      it('should check if a row does not exist', function(done) {
        var row = TABLE.row('gwashington');

        row.exists(function(err, exists) {
          assert.ifError(err);
          assert.strictEqual(exists, false);
          done();
        });
      });
    });

    describe('inserting data', function() {
      it('should insert rows', function(done) {
        var rows = [
          {
            key: 'gwashington',
            data: {
              follows: {
                jadams: 1,
              },
            },
          },
          {
            key: 'tjefferson',
            data: {
              follows: {
                gwashington: 1,
                jadams: 1,
              },
            },
          },
          {
            key: 'jadams',
            data: {
              follows: {
                gwashington: 1,
                tjefferson: 1,
              },
            },
          },
        ];

        TABLE.insert(rows, done);
      });

      it('should insert a large row', function() {
        return TABLE.insert({
          key: 'gwashington',
          data: {
            follows: {
              jadams: Buffer.alloc(5000000),
            },
          },
        });
      });

      it('should create an individual row', function(done) {
        var row = TABLE.row('alincoln');
        var rowData = {
          follows: {
            gwashington: 1,
            jadams: 1,
            tjefferson: 1,
          },
        };

        row.create({entry: rowData}, done);
      });

      it('should insert individual cells', function(done) {
        var row = TABLE.row('gwashington');

        var rowData = {
          follows: {
            jadams: 1,
          },
        };

        row.save(rowData, done);
      });

      it('should allow for user specified timestamps', function(done) {
        var row = TABLE.row('gwashington');

        var rowData = {
          follows: {
            jadams: {
              value: 1,
              timestamp: new Date('March 22, 1986'),
            },
          },
        };

        row.save(rowData, done);
      });

      it('should increment a column value', function(done) {
        var row = TABLE.row('gwashington');
        var increment = 5;

        row.increment('follows:increment', increment, function(err, value) {
          assert.ifError(err);
          assert.strictEqual(value, increment);
          done();
        });
      });

      it('should apply read/modify/write rules to a row', function(done) {
        var row = TABLE.row('gwashington');
        var rule = {
          column: 'traits:teeth',
          append: '-wood',
        };

        row.save(
          {
            traits: {
              teeth: 'shiny',
            },
          },
          function(err) {
            assert.ifError(err);

            row.createRules(rule, function(err) {
              assert.ifError(err);

              row.get(['traits:teeth'], function(err, data) {
                assert.ifError(err);
                assert.strictEqual(data.traits.teeth[0].value, 'shiny-wood');
                done();
              });
            });
          }
        );
      });

      it('should check and mutate a row', function(done) {
        var row = TABLE.row('gwashington');
        var filter = {
          family: 'follows',
          value: 'alincoln',
        };

        var mutations = [
          {
            method: 'delete',
            data: ['follows:alincoln'],
          },
        ];

        row.filter(filter, {onMatch: mutations}, function(err, matched) {
          assert.ifError(err);
          assert(matched);
          done();
        });
      });
    });

    describe('fetching data', function() {
      it('should get rows', function(done) {
        TABLE.getRows(function(err, rows) {
          assert.ifError(err);
          assert.strictEqual(rows.length, 4);
          assert(rows[0] instanceof Row);
          done();
        });
      });

      it('should get rows via stream', function(done) {
        var rows = [];

        TABLE.createReadStream()
          .on('error', done)
          .on('data', function(row) {
            assert(row instanceof Row);
            rows.push(row);
          })
          .on('end', function() {
            assert.strictEqual(rows.length, 4);
            done();
          });
      });

      it('should fetch an individual row', function(done) {
        var row = TABLE.row('alincoln');

        row.get(function(err, row_) {
          assert.ifError(err);
          assert.strictEqual(row, row_);
          done();
        });
      });

      it('should limit the number of rows', function(done) {
        var options = {
          limit: 1,
        };

        TABLE.getRows(options, function(err, rows) {
          assert.ifError(err);
          assert.strictEqual(rows.length, 1);
          done();
        });
      });

      it('should fetch a range of rows', function(done) {
        var options = {
          start: 'alincoln',
          end: 'jadams',
        };

        TABLE.getRows(options, function(err, rows) {
          assert.ifError(err);
          assert.strictEqual(rows.length, 3);
          done();
        });
      });

      it('should fetch a range of rows via prefix', function(done) {
        var options = {
          prefix: 'g',
        };

        TABLE.getRows(options, function(err, rows) {
          assert.ifError(err);
          assert.strictEqual(rows.length, 1);
          assert.strictEqual(rows[0].id, 'gwashington');
          done();
        });
      });

      it('should fetch individual cells of a row', function(done) {
        var row = TABLE.row('alincoln');

        row.get(['follows:gwashington'], function(err, data) {
          assert.ifError(err);
          assert.strictEqual(data.follows.gwashington[0].value, 1);
          done();
        });
      });

      it('should not decode the values', function(done) {
        var row = TABLE.row('gwashington');
        var options = {
          decode: false,
        };

        row.get(options, function(err) {
          assert.ifError(err);

          var teeth = row.data.traits.teeth;
          var value = teeth[0].value;

          assert(value instanceof Buffer);
          assert.strictEqual(value.toString(), 'shiny-wood');

          done();
        });
      });

      it('should get sample row keys', function(done) {
        TABLE.sampleRowKeys(function(err, keys) {
          assert.ifError(err);
          assert(keys.length > 0);
          done();
        });
      });

      it('should get sample row keys via stream', function(done) {
        var keys = [];

        TABLE.sampleRowKeysStream()
          .on('error', done)
          .on('data', function(rowKey) {
            keys.push(rowKey);
          })
          .on('end', function() {
            assert(keys.length > 0);
            done();
          });
      });

      it('should end stream early', function(done) {
        var entries = [
          {
            key: 'gwashington',
            data: {
              follows: {
                jadams: 1,
              },
            },
          },
          {
            key: 'tjefferson',
            data: {
              follows: {
                gwashington: 1,
                jadams: 1,
              },
            },
          },
          {
            key: 'jadams',
            data: {
              follows: {
                gwashington: 1,
                tjefferson: 1,
              },
            },
          },
        ];

        TABLE.insert(entries, function(err) {
          assert.ifError(err);

          var rows = [];

          TABLE.createReadStream()
            .on('error', done)
            .on('data', function(row) {
              rows.push(row);
              this.end();
            })
            .on('end', function() {
              assert.strictEqual(rows.length, 1);
              done();
            });
        });
      });

      describe('filters', function() {
        it('should get rows via column data', function(done) {
          var filter = {
            column: 'gwashington',
          };

          TABLE.getRows({filter: filter}, function(err, rows) {
            assert.ifError(err);
            assert.strictEqual(rows.length, 3);

            var keys = rows
              .map(function(row) {
                return row.id;
              })
              .sort();

            assert.deepEqual(keys, ['alincoln', 'jadams', 'tjefferson']);

            done();
          });
        });

        it('should get rows that satisfy the cell limit', function(done) {
          var entry = {
            key: 'alincoln',
            data: {
              follows: {
                tjefferson: 1,
              },
            },
          };

          var filter = [
            {
              row: 'alincoln',
            },
            {
              column: {
                name: 'tjefferson',
                cellLimit: 1,
              },
            },
          ];

          TABLE.insert(entry, function(err) {
            assert.ifError(err);

            TABLE.getRows({filter: filter}, function(err, rows) {
              assert.ifError(err);
              var rowData = rows[0].data;
              assert(rowData.follows.tjefferson.length, 1);
              done();
            });
          });
        });

        it('should get a range of columns', function(done) {
          var filter = [
            {
              row: 'tjefferson',
            },
            {
              column: {
                family: 'follows',
                start: 'gwashington',
                end: 'jadams',
              },
            },
          ];

          TABLE.getRows({filter: filter}, function(err, rows) {
            assert.ifError(err);

            rows.forEach(function(row) {
              var keys = Object.keys(row.data.follows).sort();

              assert.deepEqual(keys, ['gwashington', 'jadams']);
            });

            done();
          });
        });

        it('should run a conditional filter', function(done) {
          var filter = {
            condition: {
              test: [
                {
                  row: 'gwashington',
                },
                {
                  family: 'follows',
                },
                {
                  column: 'tjefferson',
                },
              ],
              pass: {
                row: 'gwashington',
              },
              fail: {
                row: 'tjefferson',
              },
            },
          };

          TABLE.getRows({filter: filter}, function(err, rows) {
            assert.ifError(err);
            assert.strictEqual(rows.length, 1);
            assert.strictEqual(rows[0].id, 'tjefferson');
            done();
          });
        });

        it('should run a conditional filter with pass only', function(done) {
          var filter = {
            condition: {
              test: [
                {
                  row: 'gwashington',
                },
              ],
              pass: [
                {
                  all: true,
                },
              ],
            },
          };

          TABLE.getRows({filter: filter}, function(err, rows) {
            assert.ifError(err);
            assert(rows.length > 0);
            done();
          });
        });

        it('should only get cells for a specific family', function(done) {
          var entries = [
            {
              key: 'gwashington',
              data: {
                traits: {
                  teeth: 'wood',
                },
              },
            },
          ];

          var filter = {
            family: 'traits',
          };

          TABLE.insert(entries, function(err) {
            assert.ifError(err);

            TABLE.getRows({filter: filter}, function(err, rows) {
              assert.ifError(err);
              assert(rows.length > 0);

              var families = Object.keys(rows[0].data);
              assert.deepEqual(families, ['traits']);
              done();
            });
          });
        });

        it('should interleave filters', function(done) {
          var filter = [
            {
              interleave: [
                [
                  {
                    row: 'gwashington',
                  },
                ],
                [
                  {
                    row: 'tjefferson',
                  },
                ],
              ],
            },
          ];

          TABLE.getRows({filter: filter}, function(err, rows) {
            assert.ifError(err);
            assert.strictEqual(rows.length, 2);

            var ids = rows
              .map(function(row) {
                return row.id;
              })
              .sort();

            assert.deepEqual(ids, ['gwashington', 'tjefferson']);

            done();
          });
        });

        it('should apply labels to the results', function(done) {
          var filter = {
            label: 'test-label',
          };

          TABLE.getRows({filter: filter}, function(err, rows) {
            assert.ifError(err);

            rows.forEach(function(row) {
              var follows = row.data.follows;

              Object.keys(follows).forEach(function(column) {
                follows[column].forEach(function(cell) {
                  assert.deepEqual(cell.labels, [filter.label]);
                });
              });
            });

            done();
          });
        });

        it('should run a regex against the row id', function(done) {
          var filter = {
            row: /[a-z]+on$/,
          };

          TABLE.getRows({filter: filter}, function(err, rows) {
            assert.ifError(err);

            var keys = rows
              .map(function(row) {
                return row.id;
              })
              .sort();

            assert.deepEqual(keys, ['gwashington', 'tjefferson']);

            done();
          });
        });

        it('should run a sink filter', function(done) {
          var filter = [
            {
              row: 'alincoln',
            },
            {
              family: 'follows',
            },
            {
              interleave: [
                [
                  {
                    all: true,
                  },
                ],
                [
                  {
                    label: 'prezzy',
                  },
                  {
                    sink: true,
                  },
                ],
              ],
            },
            {
              column: 'gwashington',
            },
          ];

          TABLE.getRows({filter: filter}, function(err, rows) {
            assert.ifError(err);

            var columns = Object.keys(rows[0].data.follows).sort();

            assert.deepEqual(columns, ['gwashington', 'jadams', 'tjefferson']);

            done();
          });
        });

        it('should accept a date range', function(done) {
          var filter = {
            time: {
              start: new Date('March 21, 1986'),
              end: new Date('March 23, 1986'),
            },
          };

          TABLE.getRows({filter: filter}, function(err, rows) {
            assert.ifError(err);
            assert(rows.length > 0);
            done();
          });
        });
      });
    });

    describe('deleting rows', function() {
      it('should delete specific cells', function(done) {
        var row = TABLE.row('alincoln');

        row.deleteCells(['follows:gwashington'], done);
      });

      it('should delete a family', function(done) {
        var row = TABLE.row('gwashington');

        row.deleteCells(['traits'], done);
      });

      it('should delete all the cells', function(done) {
        var row = TABLE.row('alincoln');

        row.delete(done);
      });
    });

    describe('.deleteRows()', function() {
      var table = INSTANCE.table(generateId('table'));

      beforeEach(function(done) {
        var tableOptions = {
          families: ['cf1'],
        };
        var data = {
          cf1: {
            foo: 1,
          },
        };
        var rows = [
          {
            key: 'aaa',
            data,
          },
          {
            key: 'abc',
            data,
          },
          {
            key: 'def',
            data,
          },
        ];

        async.series(
          [
            table.create.bind(table, tableOptions),
            table.insert.bind(table, rows),
          ],
          done
        );
      });

      afterEach(table.delete.bind(table));

      it('should delete the prefixes', function(done) {
        async.series([
          table.deleteRows.bind(table, 'a'),
          function() {
            table.getRows(function(err, rows) {
              assert.ifError(err);
              assert.strictEqual(rows.length, 1);
              done();
            });
          },
        ]);
      });
    });

    describe('.truncate()', function() {
      var table = INSTANCE.table(generateId('table'));

      beforeEach(function(done) {
        var tableOptions = {
          families: ['follows'],
        };
        var rows = [
          {
            key: 'gwashington',
            data: {
              follows: {
                jadams: 1,
              },
            },
          },
        ];

        async.series(
          [
            table.create.bind(table, tableOptions),
            table.insert.bind(table, rows),
          ],
          done
        );
      });

      afterEach(table.delete.bind(table));

      it('should truncate a table', function(done) {
        async.series([
          table.truncate.bind(table),
          function() {
            table.getRows(function(err, rows) {
              assert.ifError(err);
              assert.strictEqual(rows.length, 0);
              done();
            });
          },
        ]);
      });
    });
  });
});

function generateId(resourceType) {
  return PREFIX + resourceType + '-' + uuid.v1().substr(0, 8);
}
