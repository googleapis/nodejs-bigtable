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

import * as assert from 'assert';
import Q from 'p-queue';
import * as uuid from 'uuid';

import {Bigtable} from '../src';
import {AppProfile} from '../src/app-profile.js';
import {Cluster} from '../src/cluster.js';
import {Family} from '../src/family.js';
import {Row} from '../src/row.js';
import {Table} from '../src/table.js';

const PREFIX = 'gcloud-tests-';

describe('Bigtable', () => {
  const bigtable = new Bigtable();
  const INSTANCE: any = bigtable.instance(generateId('instance'));
  const TABLE = INSTANCE.table(generateId('table'));
  const APP_PROFILE_ID = generateId('appProfile');
  const APP_PROFILE = INSTANCE.appProfile(APP_PROFILE_ID);
  const CLUSTER_ID = generateId('cluster');

  before(async () => {
    const [, operation] = await INSTANCE.create({
      clusters: [
        {
          id: CLUSTER_ID,
          location: 'us-central1-c',
          nodes: 3,
        },
      ],
      labels: {
        time_created: Date.now(),
      },
    });
    await operation.promise();
    await TABLE.create({
      families: ['follows', 'traits'],
    });
    await INSTANCE.createAppProfile(APP_PROFILE_ID, {
      routing: 'any',
      ignoreWarnings: true,
    });
  });

  after(async () => {
    const [instances] = await (bigtable as any).getInstances();
    const testInstances =
        instances.filter(i => i.id.match(PREFIX)).filter(i => {
          const timeCreated = i.metadata.labels.time_created;
          // Only delete stale resources.
          const oneHourAgo = new Date(Date.now() - 3600000);
          return !timeCreated || timeCreated <= oneHourAgo;
        });
    const q = new Q({concurrency: 5});
    await Promise.all(testInstances.map(instance => {
      q.add(() => instance.delete());
    }));
  });

  describe('instances', () => {
    it('should get a list of instances', async () => {
      const [instances] = await (bigtable as any).getInstances();
      assert(instances.length > 0);
    });

    it('should check if an instance exists', async () => {
      const [exists] = await INSTANCE.exists();
      assert.strictEqual(exists, true);
    });

    it('should check if an instance does not exist', async () => {
      const instance = bigtable.instance('fake-instance');
      const [exists] = await (instance as any).exists();
      assert.strictEqual(exists, false);
    });

    it('should get a single instance', async () => {
      await INSTANCE.get();
    });

    it('should update an instance', async () => {
      const metadata = {
        displayName: 'metadata-test',
      };
      await INSTANCE.setMetadata(metadata);
      const [metadata_] = await INSTANCE.getMetadata();
      assert.strictEqual(metadata.displayName, metadata_.displayName);
    });
  });

  describe('appProfiles', () => {
    it('should retrieve a list of app profiles', async () => {
      const [appProfiles] = await INSTANCE.getAppProfiles();
      assert(appProfiles[0] instanceof AppProfile);
    });

    it('should check if an app profile exists', async () => {
      const [exists] = await APP_PROFILE.exists();
      assert.strictEqual(exists, true);
    });

    it('should check if an app profile does not exist', async () => {
      const appProfile = INSTANCE.appProfile('should-not-exist');
      const [exists] = await appProfile.exists();
      assert.strictEqual(exists, false);
    });

    it('should get an app profile', async () => {
      await APP_PROFILE.get();
    });

    it('should delete an app profile', async () => {
      const appProfile = INSTANCE.appProfile(generateId('app-profile'));
      await appProfile.create({
        routing: 'any',
        ignoreWarnings: true,
      });
      await appProfile.delete({ignoreWarnings: true});
    });

    it('should get the app profiles metadata', async () => {
      const [metadata] = await APP_PROFILE.getMetadata();
      assert.strictEqual(
          metadata.name,
          APP_PROFILE.name.replace('{{projectId}}', bigtable.projectId));
    });

    it('should update an app profile', async () => {
      const cluster = INSTANCE.cluster(CLUSTER_ID);
      const options = {
        routing: cluster,
        allowTransactionalWrites: true,
        description: 'My Updated App Profile',
      };
      await APP_PROFILE.setMetadata(options);
      const [updatedAppProfile] = await APP_PROFILE.get();
      assert.strictEqual(
          updatedAppProfile.metadata.description, options.description);
      assert.deepStrictEqual(updatedAppProfile.metadata.singleClusterRouting, {
        clusterId: CLUSTER_ID,
        allowTransactionalWrites: true,
      });
    });
  });

  describe('clusters', () => {
    let CLUSTER;

    beforeEach(() => {
      CLUSTER = INSTANCE.cluster(CLUSTER_ID);
    });

    it('should retrieve a list of clusters', async () => {
      const [clusters] = await INSTANCE.getClusters();
      assert(clusters[0] instanceof Cluster);
    });

    it('should check if a cluster exists', async () => {
      const [exists] = await CLUSTER.exists();
      assert.strictEqual(exists, true);
    });

    it('should check if a cluster does not exist', async () => {
      const cluster = INSTANCE.cluster('fake-cluster');
      const [exists] = await cluster.exists();
      assert.strictEqual(exists, false);
    });

    it('should get a cluster', async () => {
      await CLUSTER.get();
    });

    it('should update a cluster', async () => {
      const metadata = {
        nodes: 4,
      };
      const [operation] = await CLUSTER.setMetadata(metadata);
      await operation.promise();
      const [_metadata] = await CLUSTER.getMetadata();
      assert.strictEqual(metadata.nodes, _metadata.serveNodes);
    });
  });

  describe('tables', () => {
    it('should retrieve a list of tables', async () => {
      const [tables] = await INSTANCE.getTables();
      assert(tables[0] instanceof Table);
    });

    it('should retrieve a list of tables in stream mode', done => {
      const tables: any[] = [];
      INSTANCE.getTablesStream()
          .on('error', done)
          .on('data',
              table => {
                assert(table instanceof Table);
                tables.push(table);
              })
          .on('end', () => {
            assert(tables.length > 0);
            done();
          });
    });

    it('should check if a table exists', async () => {
      const [exists] = await TABLE.exists();
      assert.strictEqual(exists, true);
    });

    it('should check if a table does not exist', async () => {
      const table = INSTANCE.table('should-not-exist');
      const [exists] = await table.exists();
      assert.strictEqual(exists, false);
    });

    it('should get a table', async () => {
      await TABLE.get();
    });

    it('should delete a table', async () => {
      const table = INSTANCE.table(generateId('table'));
      await table.create();
      await table.delete();
    });

    it('should get the tables metadata', async () => {
      const [metadata] = await TABLE.getMetadata();
      assert.strictEqual(
          metadata.name,
          TABLE.name.replace('{{projectId}}', bigtable.projectId));
    });

    it('should create a table with column family data', async () => {
      const name = generateId('table');
      const options = {
        families: ['test'],
      };
      const [table] = await INSTANCE.createTable(name, options);
      assert(table.metadata.columnFamilies.test);
    });

    it('should create a table if autoCreate is true', async () => {
      const table = INSTANCE.table(generateId('table'));
      await table.get({autoCreate: true});
      await table.delete();
    });
  });

  describe('consistency tokens', () => {
    it('should generate consistency token', async () => {
      const [token] = await TABLE.generateConsistencyToken();
      assert.strictEqual(typeof token, 'string');
    });

    it('should return error for checkConsistency of invalid token', done => {
      TABLE.checkConsistency('dummy-token', err => {
        assert.strictEqual(err.code, 3);
        done();
      });
    });

    it('should return boolean for checkConsistency of token', async () => {
      const [token] = await TABLE.generateConsistencyToken();
      const [res] = await TABLE.checkConsistency(token);
      assert.strictEqual(typeof res, 'boolean');
    });

    it('should return boolean for waitForReplication', async () => {
      const [res] = await TABLE.waitForReplication();
      assert.strictEqual(typeof res, 'boolean');
    });
  });

  describe('replication states', () => {
    it('should get a map of clusterId and state', async () => {
      const [clusterStates] = await TABLE.getReplicationStates();
      assert(clusterStates instanceof Map);
      assert(clusterStates.has(CLUSTER_ID));
    });
  });

  describe('column families', () => {
    const FAMILY_ID = 'presidents';
    let FAMILY;

    before(async () => {
      FAMILY = TABLE.family(FAMILY_ID);
      await FAMILY.create();
    });

    it('should get a list of families', async () => {
      const [families] = await TABLE.getFamilies();
      assert.strictEqual(families.length, 3);
      assert(families[0] instanceof Family);
      assert.notStrictEqual(-1, families.map(f => f.id).indexOf(FAMILY.id));
    });

    it('should get a family', async () => {
      const family = TABLE.family(FAMILY_ID);
      await family.get();
      assert(family instanceof Family);
      assert.strictEqual(family.name, FAMILY.name);
      assert.strictEqual(family.id, FAMILY.id);
    });

    it('should check if a family exists', async () => {
      const [exists] = await FAMILY.exists();
      assert.strictEqual(exists, true);
    });

    it('should check if a family does not exist', async () => {
      const family = TABLE.family('prezzies');
      const [exists] = await family.exists();
      assert.strictEqual(exists, false);
    });

    it('should create a family if autoCreate is true', async () => {
      const family = TABLE.family('prezzies');
      await family.get({autoCreate: true});
      await family.delete();
    });

    it('should create a family with nested gc rules', async () => {
      const family = TABLE.family('prezzies');
      const options = {
        rule: {
          union: true,
          versions: 10,
          rule: {
            versions: 2,
            age: {seconds: 60 * 60 * 24 * 30},
          },
        },
      };
      await family.create(options);
      const [metadata] = await family.getMetadata();
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
      await family.delete();
    });

    it('should get the column family metadata', async () => {
      const [metadata] = await FAMILY.getMetadata();
      assert.strictEqual(FAMILY.metadata, metadata);
    });

    it('should update a column family', async () => {
      const rule: any = {
        age: {
          seconds: 10000,
          nanos: 10000,
        },
      };
      const [metadata] = await FAMILY.setMetadata({rule});
      const maxAge = metadata.gcRule.maxAge;
      assert.strictEqual(maxAge.seconds, rule.age.seconds.toString());
      assert.strictEqual(maxAge.nanas, rule.age.nanas);
    });

    it('should delete a column family', async () => {
      await FAMILY.delete();
    });
  });

  describe('rows', () => {
    describe('.exists()', () => {
      const row = TABLE.row('alincoln');

      beforeEach(async () => {
        await row.create({
          entry: {
            follows: {
              gwashington: 1,
              jadams: 1,
              tjefferson: 1,
            },
          },
        });
      });

      afterEach(async () => row.delete());

      it('should check if a row exists', async () => {
        const [exists] = await row.exists();
        assert.strictEqual(exists, true);
      });

      it('should check if a row does not exist', async () => {
        const row = TABLE.row('gwashington');
        const [exists] = await row.exists();
        assert.strictEqual(exists, false);
      });
    });

    describe('inserting data', () => {
      it('should insert rows', async () => {
        const rows = [
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
        await TABLE.insert(rows);
      });

      it('should insert a large row', async () => {
        await TABLE.insert({
          key: 'gwashington',
          data: {
            follows: {
              jadams: Buffer.alloc(5000000),
            },
          },
        });
      });

      it('should create an individual row', async () => {
        const row = TABLE.row('alincoln');
        const rowData = {
          follows: {
            gwashington: 1,
            jadams: 1,
            tjefferson: 1,
          },
        };
        await row.create({entry: rowData});
      });

      it('should insert individual cells', async () => {
        const row = TABLE.row('gwashington');
        const rowData = {
          follows: {
            jadams: 1,
          },
        };
        await row.save(rowData);
      });

      it('should allow for user specified timestamps', async () => {
        const row = TABLE.row('gwashington');
        const rowData = {
          follows: {
            jadams: {
              value: 1,
              timestamp: new Date('March 22, 1986'),
            },
          },
        };
        await row.save(rowData);
      });

      it('should increment a column value', async () => {
        const row = TABLE.row('gwashington');
        const increment = 5;
        const [value] = await row.increment('follows:increment', increment);
        assert.strictEqual(value, increment);
      });

      it('should apply read/modify/write rules to a row', async () => {
        const row = TABLE.row('gwashington');
        const rule = {
          column: 'traits:teeth',
          append: '-wood',
        };
        await row.save({
          traits: {
            teeth: 'shiny',
          },
        });
        await row.createRules(rule);
        const [data] = await row.get(['traits:teeth']);
        assert.strictEqual(data.traits.teeth[0].value, 'shiny-wood');
      });

      it('should check and mutate a row', async () => {
        const row = TABLE.row('gwashington');
        const filter = {
          family: 'follows',
          value: 'alincoln',
        };
        const mutations = [
          {
            method: 'delete',
            data: ['follows:alincoln'],
          },
        ];
        const [matched] = await row.filter(filter, {onMatch: mutations});
        assert(matched);
      });
    });

    describe('fetching data', () => {
      it('should get rows', async () => {
        const [rows] = await TABLE.getRows();
        assert.strictEqual(rows.length, 4);
        assert(rows[0] instanceof Row);
      });

      it('should get rows via stream', done => {
        const rows: any = [];
        TABLE.createReadStream()
            .on('error', done)
            .on('data',
                row => {
                  assert(row instanceof Row);
                  rows.push(row);
                })
            .on('end', () => {
              assert.strictEqual(rows.length, 4);
              done();
            });
      });

      it('should fetch an individual row', async () => {
        const row = TABLE.row('alincoln');
        const [row_] = await row.get();
        assert.strictEqual(row, row_);
      });

      it('should limit the number of rows', async () => {
        const [rows] = await TABLE.getRows({
          limit: 1,
        });
        assert.strictEqual(rows.length, 1);
      });

      it('should fetch a range of rows', async () => {
        const options = {
          start: 'alincoln',
          end: 'jadams',
        };
        const [rows] = await TABLE.getRows(options);
        assert.strictEqual(rows.length, 3);
      });

      it('should fetch a range of rows via prefix', async () => {
        const options = {
          prefix: 'g',
        };
        const [rows] = await TABLE.getRows(options);
        assert.strictEqual(rows.length, 1);
        assert.strictEqual(rows[0].id, 'gwashington');
      });

      it('should fetch individual cells of a row', async () => {
        const row = TABLE.row('alincoln');
        const [data] = await row.get(['follows:gwashington']);
        assert.strictEqual(data.follows.gwashington[0].value, 1);
      });

      it('should not decode the values', async () => {
        const row = TABLE.row('gwashington');
        const options = {
          decode: false,
        };
        await row.get(options);
        const teeth = row.data.traits.teeth;
        const value = teeth[0].value;
        assert(value instanceof Buffer);
        assert.strictEqual(value.toString(), 'shiny-wood');
      });

      it('should get sample row keys', async () => {
        const [keys] = await TABLE.sampleRowKeys();
        assert(keys.length > 0);
      });

      it('should get sample row keys via stream', done => {
        const keys: any = [];
        TABLE.sampleRowKeysStream()
            .on('error', done)
            .on('data',
                rowKey => {
                  keys.push(rowKey);
                })
            .on('end', () => {
              assert(keys.length > 0);
              done();
            });
      });

      it('should end stream early', async () => {
        const entries = [
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
        await TABLE.insert(entries);
        const rows: any = [];
        await new Promise((resolve, reject) => {
          const stream = TABLE.createReadStream()
                             .on('error', reject)
                             .on('data',
                                 row => {
                                   rows.push(row);
                                   stream.end();
                                 })
                             .on('end', () => {
                               assert.strictEqual(rows.length, 1);
                               resolve();
                             });
        });
      });

      describe('filters', () => {
        it('should get rows via column data', async () => {
          const filter = {
            column: 'gwashington',
          };
          const [rows] = await TABLE.getRows({filter});
          assert.strictEqual(rows.length, 3);
          const keys = rows.map(row => row.id).sort();
          assert.deepStrictEqual(keys, ['alincoln', 'jadams', 'tjefferson']);
        });

        it('should get rows that satisfy the cell limit', async () => {
          const entry = {
            key: 'alincoln',
            data: {
              follows: {
                tjefferson: 1,
              },
            },
          };
          const filter = [
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
          await TABLE.insert(entry);
          const [rows] = await TABLE.getRows({filter});
          const rowData = rows[0].data;
          assert.strictEqual(rowData.follows.tjefferson.length, 1);
        });

        it('should get a range of columns', async () => {
          const filter = [
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

          const [rows] = await TABLE.getRows({filter});
          rows.forEach(row => {
            const keys = Object.keys(row.data.follows).sort();
            assert.deepStrictEqual(keys, ['gwashington', 'jadams']);
          });
        });

        it('should run a conditional filter', async () => {
          const filter = {
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
          const [rows] = await TABLE.getRows({filter});
          assert.strictEqual(rows.length, 1);
          assert.strictEqual(rows[0].id, 'tjefferson');
        });

        it('should run a conditional filter with pass only', async () => {
          const filter = {
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
          const [rows] = await TABLE.getRows({filter});
          assert(rows.length > 0);
        });

        it('should only get cells for a specific family', async () => {
          const entries = [
            {
              key: 'gwashington',
              data: {
                traits: {
                  teeth: 'wood',
                },
              },
            },
          ];
          await TABLE.insert(entries);
          const filter = {
            family: 'traits',
          };
          const [rows] = await TABLE.getRows({filter});
          assert(rows.length > 0);
          const families = Object.keys(rows[0].data);
          assert.deepStrictEqual(families, ['traits']);
        });

        it('should interleave filters', async () => {
          const filter = [
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
          const [rows] = await TABLE.getRows({filter});
          assert.strictEqual(rows.length, 2);
          const ids = rows.map(row => row.id).sort();
          assert.deepStrictEqual(ids, ['gwashington', 'tjefferson']);
        });

        it('should apply labels to the results', async () => {
          const filter = {
            label: 'test-label',
          };
          const [rows] = await TABLE.getRows({filter});
          rows.forEach(row => {
            const follows = row.data.follows;
            Object.keys(follows).forEach(column => {
              follows[column].forEach(cell => {
                assert.deepStrictEqual(cell.labels, [filter.label]);
              });
            });
          });
        });

        it('should run a regex against the row id', async () => {
          const filter = {
            row: /[a-z]+on$/,
          };
          const [rows] = await TABLE.getRows({filter});
          const keys = rows.map(row => row.id).sort();
          assert.deepStrictEqual(keys, ['gwashington', 'tjefferson']);
        });

        it('should run a sink filter', async () => {
          const filter = [
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
          const [rows] = await TABLE.getRows({filter});
          const columns = Object.keys(rows[0].data.follows).sort();
          assert.deepStrictEqual(columns, [
            'gwashington',
            'jadams',
            'tjefferson',
          ]);
        });
      });

      it('should accept a date range', async () => {
        const filter = {
          time: {
            start: new Date('March 21, 1986'),
            end: new Date('March 23, 1986'),
          },
        };
        const [rows] = await TABLE.getRows({filter});
        assert(rows.length > 0);
      });
    });
  });

  describe('deleting rows', () => {
    it('should delete specific cells', async () => {
      const row = TABLE.row('alincoln');
      await row.deleteCells(['follows:gwashington']);
    });

    it('should delete a family', async () => {
      const row = TABLE.row('gwashington');
      await row.deleteCells(['traits']);
    });

    it('should delete all the cells', async () => {
      const row = TABLE.row('alincoln');
      await row.delete();
    });
  });

  describe('.deleteRows()', () => {
    const table = INSTANCE.table(generateId('table'));
    beforeEach(async () => {
      const tableOptions = {
        families: ['cf1'],
      };
      const data = {
        cf1: {
          foo: 1,
        },
      };
      const rows = [
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
      await table.create(tableOptions);
      await table.insert(rows);
    });

    afterEach(async () => {
      await table.delete();
    });

    it('should delete the prefixes', async () => {
      await table.deleteRows('a');
      const [rows] = await table.getRows();
      assert.strictEqual(rows.length, 1);
    });
  });

  describe('.truncate()', () => {
    const table = INSTANCE.table(generateId('table'));
    beforeEach(async () => {
      const tableOptions = {
        families: ['follows'],
      };
      const rows = [
        {
          key: 'gwashington',
          data: {
            follows: {
              jadams: 1,
            },
          },
        },
      ];
      await table.create(tableOptions);
      await table.insert(rows);
    });

    afterEach(async () => {
      await table.delete();
    });

    it('should truncate a table', async () => {
      await table.truncate();
      const [rows] = await table.getRows();
      assert.strictEqual(rows.length, 0);
    });
  });
});

function generateId(resourceType) {
  return PREFIX + resourceType + '-' + uuid.v1().substr(0, 8);
}
