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
  createTable: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_create_table]
    await table
      .create()
      .then(result => {
        const table = result[0];
        // let apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_create_table]

    callback(caughtError);
  },

  existsTable: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

    // [START bigtable_exists_table]
    await table
      .exists()
      .then(result => {
        const exists = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_exists_table]

    callback(caughtError);
  },

  getTable: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

    // [START bigtable_get_table]
    await table
      .get()
      .then(result => {
        const table = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_table]

    callback(caughtError);
  },

  getMetadata: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

    // [START bigtable_get_table_meta]
    await table
      .getMetadata()
      .then(result => {
        const metaData = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_table_meta]

    callback(caughtError);
  },

  createFamily: (instanceId, tableId, familyId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_create_family]
    const options = {};
    // options.rule = {
    //   age: {
    //     seconds: 0,
    //     nanos: 5000
    //   },
    //   versions: 3,
    //   union: true
    // };

    await table
      .createFamily(familyId, options)
      .then(result => {
        const family = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_create_table]

    callback(caughtError);
  },

  getFamilies: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

    // [START bigtable_get_families]
    await table
      .getFamilies()
      .then(result => {
        const families = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_families]

    callback(caughtError);
  },

  insertRows: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

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

    await table
      .insert(entries)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_insert_rows]

    callback(caughtError);
  },

  getRows: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

    // [START bigtable_get_rows]
    const options = {
      keys: ['alincoln', 'gwashington'],
    };
    await table
      .getRows(options)
      .then(result => {
        const rows = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_rows]

    callback(caughtError);
  },

  mutate: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_mutate_rows]
    const entries = [
      {
        method: 'delete',
        key: 'alincoln',
      },
    ];
    await table
      .mutate(entries)
      .then(() => {
        // handle success
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_mutate_rows]

    callback(caughtError);
  },

  createReadStream: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

    // [START bigtable_table_readstream]
    await table
      .createReadStream()
      .on('error', err => {
        // Handle the error.
      })
      .on('data', function(row) {
        // `row` is a Row object.
      })
      .on('end', function() {
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

    callback(caughtError);
  },

  sampleRowKeys: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

    // [START bigtable_sample_row_keys]
    await table
      .sampleRowKeys()
      .then(result => {
        const sampleRKeys = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_sample_row_keys]

    callback(caughtError);
  },

  delRows: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

    // [START bigtable_del_rows]
    await table
      .deleteRows('alincoln')
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [START bigtable_del_rows]

    callback(caughtError);
  },

  delTable: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    let caughtError = false;

    // [START bigtable_del_table]
    await table
      .delete()
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_del_table]

    callback(caughtError);
  },
};

module.exports = snippets;
