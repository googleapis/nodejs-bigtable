/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Bigtable = require('@google-cloud/bigtable');
const bigtable = new Bigtable();

const snippets = {
  createTable: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    // [START bigtable_create_table]
    table
      .create()
      .then(result => {
        let table = result[0];
        // let apiResponse = result[1];
        console.log(`Table created: ${table.name}`);
        callback(null, table);
      })
      .catch(err => {
        console.error('Error creating Table:', err);
        callback(err);
      });
    // [END bigtable_create_table]
  },

  existsTable: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_exists_table]
    table
      .exists()
      .then(result => {
        const exists = result[0];
        console.log(`Table ${tableId} Exists: ${exists}`);
        callback(null, exists);
      })
      .catch(err => {
        console.error('Error in checking Table exists: ', err);
        callback(err);
      });
    // [END bigtable_exists_table]
  },

  getTable: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_get_table]
    table
      .get()
      .then(result => {
        const table = result[0];
        // const apiResponse = result[1];
        console.log(`Table: \n${table}`);
        callback(null, table);
      })
      .catch(err => {
        console.error('Error geting Table: ', err);
        callback(err);
      });
    // [END bigtable_get_table]
  },

  getMetaData: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_get_table_meta]
    table
      .getMetadata()
      .then(result => {
        const metaData = result[0];
        // const apiResponse = result[1];
        console.log('%s %O', 'Table Metadata:\n', metaData);
        callback(null, metaData);
      })
      .catch(err => {
        console.error('Error geting Metadata: ', err);
        callback(err);
      });
    // [END bigtable_get_table_meta]
  },

  createFamily: (instanceId, tableId, familyId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    // [START bigtable_create_family]

    let options = {};

    // options.rule = {
    //   age: {
    //     seconds: 0,
    //     nanos: 5000
    //   },
    //   versions: 3,
    //   union: true
    // };

    table
      .createFamily(familyId, options)
      .then(result => {
        const family = result[0];
        // const apiResponse = result[1];
        console.log(`Family created: ${family.name}`);
        callback(null, result);
      })
      .catch(err => {
        console.error('Error creating Family:', err);
        callback(err);
      });
    // [END bigtable_create_table]
  },

  getFamilies: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_get_families]
    table
      .getFamilies()
      .then(result => {
        console.log(`Families:`);
        let families = result[0];
        families.forEach(f => {
          console.log(f.name);
        });
        callback(null, result);
      })
      .catch(err => {
        console.error('Error geting Families: ', err);
        callback(err);
      });
    // [END bigtable_get_families]
  },

  insertRows: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_insert_rows]
    const entries = [
      {
        key: 'alincoln',
        data: {
          follows: {
            gwashington: 1,
          },
        },
      },
    ];

    table
      .insert(entries)
      .then(result => {
        console.log(`${result}`);
        callback(null, result);
      })
      .catch(err => {
        console.error('Error inserting Rows: ', err);
        callback(err);
      });
    // [END bigtable_insert_rows]
  },

  getRows: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const options = {
      keys: ['alincoln', 'gwashington'],
    };
    // [START bigtable_get_rows]
    table
      .getRows(options)
      .then(result => {
        console.log(`Rows:`);
        let rows = result[0];
        rows.forEach(r => {
          console.log('%s %O', `${r.id}: `, r.data);
        });
        callback(null, result);
      })
      .catch(err => {
        console.error('Error geting Rows: ', err);
        callback(err);
      });
    // [END bigtable_get_rows]
  },

  mutate: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    // [START bigtable_mutate_rows]
    const entries = [
      {
        method: 'delete',
        key: 'alincoln',
      },
    ];
    table
      .mutate(entries)
      .then(() => {
        console.log(`Mutation done.`);
        callback(null);
      })
      .catch(err => {
        console.error('Error mutation rows', err);
        callback(err);
      });
    // [END bigtable_mutate_rows]
  },

  createReadStream: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_table_readstream]
    table
      .createReadStream()
      .on('error', callback)
      .on('data', function(row) {
        // `row` is a Row object.
        console.log(row);
        callback(null, row);
      })
      .on('end', function() {
        callback();
        // All rows retrieved.
      });
    //-
    // If you anticipate many results, you can end a stream early to prevent
    // unnecessary processing.
    //-
    // table
    //   .createReadStream()
    //   .on('data', function (row) {
    //     this.end();
    //   });

    //-
    // Specify arbitrary keys for a non-contiguous set of rows.
    // The total size of the keys must remain under 1MB, after encoding.
    //-
    // table.createReadStream({
    //   keys: [
    //     'alincoln',
    //     'gwashington'
    //   ]
    // });

    //-
    // Scan for row keys that contain a specific prefix.
    //-
    // table.createReadStream({
    //   prefix: 'gwash'
    // });

    //-
    // Specify a contiguous range of rows to read by supplying `start` and `end`
    // keys.
    //
    // If the `start` key is omitted, it is interpreted as an empty string.
    // If the `end` key is omitted, it is interpreted as infinity.
    //-
    // table.createReadStream({
    //   start: 'alincoln',
    //   end: 'gwashington'
    // });

    //-
    // Specify multiple ranges.
    //-
    // table.createReadStream({
    //   ranges: [{
    //     start: 'alincoln',
    //     end: 'gwashington'
    //   }, {
    //     start: 'tjefferson',
    //     end: 'jadams'
    //   }]
    // });

    //-
    // Apply a {@link Filter} to the contents of the specified rows.
    //-
    // table.createReadStream({
    //   filter: [
    //     {
    //       column: 'gwashington'
    //     }, {
    //       value: 1
    //     }
    //   ]
    // });
    //
    // [END bigtable_table_readstream]
  },

  sampleRowKeys: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_sample_row_keys]
    table
      .sampleRowKeys()
      .then(result => {
        console.log(`Sample Rows-Keys:`);
        let sampleRKeys = result[0];
        sampleRKeys.forEach(k => {
          console.log(k);
        });
        callback(null, result);
      })
      .catch(err => {
        console.error('Error geting Sample Row Keys: ', err);
        callback(err);
      });
    // [END bigtable_sample_row_keys]
  },

  delRows(instanceId, tableId, callback) {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_del_rows]
    table
      .deleteRows('alincoln')
      .then(result => {
        const apiResponse = result[0];
        console.log(`Rows successfully deleted: ${apiResponse}`);
        callback(null, apiResponse);
      })
      .catch(err => {
        console.error('Error deleting Rows:', err);
        callback(err);
      });
    // [START bigtable_del_rows]
  },

  delTable: (instanceId, tableId, callback) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_del_table]
    table
      .delete()
      .then(result => {
        const apiResponse = result[0];
        console.log(`Table deleted: ${apiResponse}`);
        callback(null, result);
      })
      .catch(err => {
        console.error('Error deleting Table:', err);
        callback(err);
      });
    // [END bigtable_del_table]
  },
};

module.exports = snippets;
