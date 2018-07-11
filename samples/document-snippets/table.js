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

function createTable(instanceId, tableId) {
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  // [START bigtable_create_table]
  table
    .create()
    .then(result => {
      let table = result[0];
      // let apiResponse = result[1];
      console.log(`Table created: ${table.name}`);
    })
    .catch(err => {
      console.error('Error creating Table:', err);
    });
  // [END bigtable_create_table]
}

function existsTable(instanceId, tableId) {
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // [START bigtable_exists_table]
  table
    .exists()
    .then(result => {
      const exists = result[0];
      console.log(`Table ${tableId} Exists: ${exists}`);
    })
    .catch(err => {
      console.error('Error in checking Table exists: ', err);
    });
  // [END bigtable_exists_table]
}

function getTable(instanceId, tableId) {
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // [START bigtable_get_table]
  table
    .get()
    .then(result => {
      const table = result[0];
      // const apiResponse = result[1];
      console.log(`Table: \n${table}`);
    })
    .catch(err => {
      console.error('Error geting Table: ', err);
    });
  // [END bigtable_get_table]
}

function getMetaData(instanceId, tableId) {
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // [START bigtable_get_table_meta]
  table
    .getMetadata()
    .then(result => {
      const metaData = result[0];
      // const apiResponse = result[1];
      console.log('%s %O', 'Table Metadata:\n', metaData);
    })
    .catch(err => {
      console.error('Error geting Metadata: ', err);
    });
  // [END bigtable_get_table_meta]
}

function createFamily(instanceId, tableId, familyId) {
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
    })
    .catch(err => {
      console.error('Error creating Family:', err);
    });
  // [END bigtable_create_table]
}

function getFamilies(instanceId, tableId) {
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
    })
    .catch(err => {
      console.error('Error geting Families: ', err);
    });
  // [END bigtable_get_families]
}

function insertRows(instanceId, tableId) {
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
    })
    .catch(err => {
      console.error('Error inserting Rows: ', err);
    });
  // [END bigtable_insert_rows]
}

function getRows(instanceId, tableId) {
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
    })
    .catch(err => {
      console.error('Error geting Rows: ', err);
    });
  // [END bigtable_get_rows]
}

function mutate(instanceId, tableId) {
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
    })
    .catch(err => {
      console.error('Error mutation rows', err);
    });
  // [END bigtable_mutate_rows]
}

function createReadStream(instanceId, tableId) {
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // [START bigtable_table_readstream]
  table
    .createReadStream()
    .on('error', console.error)
    .on('data', function(row) {
      // `row` is a Row object.
      console.log(row);
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
}

function sampleRowKeys(instanceId, tableId) {
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
    })
    .catch(err => {
      console.error('Error geting Sample Row Keys: ', err);
    });
  // [END bigtable_sample_row_keys]
}

function delRows(instanceId, tableId) {
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // [START bigtable_del_rows]
  table
    .deleteRows('alincoln')
    .then(result => {
      const apiResponse = result[0];
      console.log(`Rows successfully deleted: ${apiResponse}`);
    })
    .catch(err => {
      console.error('Error deleting Rows:', err);
    });
  // [START bigtable_del_rows]
}

function delTable(instanceId, tableId) {
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // [START bigtable_del_table]
  table
    .delete()
    .then(result => {
      const apiResponse = result[0];
      console.log(`Table deleted: ${apiResponse}`);
    })
    .catch(err => {
      console.error('Error deleting Table:', err);
    });
  // [END bigtable_del_table]
}

require(`yargs`)
  .demand(1)

  // create Table
  .command(`create-table`, `Creates a Table`, {}, argv =>
    createTable(argv.instance, argv.table)
  )
  .example(`node $0 create-table --instance [instanceId] --table [tableId]`)

  // Exists Table
  .command(`exists-table`, `Check Table Exists`, {}, argv =>
    existsTable(argv.instance, argv.table)
  )
  .example(`node $0 exists-table --instance [instanceId] --table [tableId]`)

  // Get Table
  .command(`get-table`, `Get Table`, {}, argv =>
    getTable(argv.instance, argv.table)
  )
  .example(`node $0 get-table --instance [instanceId] --table [tableId]`)

  // create Family
  .command(`create-family`, `Creates Table Family`, {}, argv =>
    createFamily(argv.instance, argv.table, argv.family)
  )
  .example(
    `node $0 create-family --instance [instanceId] --table [tableId] --family [familyId]`
  )

  // Get Table Families
  .command(`get-families`, `Get Table Families`, {}, argv =>
    getFamilies(argv.instance, argv.table)
  )
  .example(`node $0 get-families --instance [instanceId] --table [tableId]`)

  // get Table Metadata
  .command(`table-meta`, `Get Table Metadata`, {}, argv =>
    getMetaData(argv.instance, argv.table)
  )
  .example(`node $0 table-meta --instance [instanceId] --table [tableId]`)

  // Insert Rows
  .command(`insert`, `Insert rows`, {}, argv =>
    insertRows(argv.instance, argv.table)
  )
  .example(`node $0 insert --instance [instanceId] --table [tableId]`)

  // get Rows
  .command(`rows`, `get rows`, {}, argv => getRows(argv.instance, argv.table))
  .example(`node $0 rows --instance [instanceId] --table [tableId]`)

  // Create Read Stream
  .command(`read-stream`, `create read stream`, {}, argv =>
    createReadStream(argv.instance, argv.table)
  )
  .example(`node $0 read-stream --instance [instanceId] --table [tableId]`)

  // mutate Rows
  .command(`mutate`, `mutate rows`, {}, argv =>
    mutate(argv.instance, argv.table)
  )
  .example(`node $0 mutate --instance [instanceId] --table [tableId]`)

  // Sample Row Keys
  .command(`sample-keys`, `Get sample-row-keys`, {}, argv =>
    sampleRowKeys(argv.instance, argv.table)
  )
  .example(`node $0 sample-keys --instance [instanceId] --table [tableId]`)

  // Delete Rows
  .command(`del-rows`, `Delete Rows`, {}, argv =>
    delRows(argv.instance, argv.table)
  )
  .example(`node $0 del-rows --instance [instanceId] --table [tableId]`)

  // Delete Table
  .command(`del-table`, `Delete Table`, {}, argv =>
    delTable(argv.instance, argv.table)
  )
  .example(`node $0 del-table --instance [instanceId] --table [tableId]`)

  .wrap(120)
  .nargs('instance', 1)
  .describe('instance', 'Cloud Bigtable Instance ID')
  .nargs('table', 1)
  .describe('table', 'Cloud Bigtable Table ID')
  .nargs('family', 1)
  .describe('family', 'Cloud Bigtable Table Family-ID')
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/bigtable/docs`)
  .help()
  .strict().argv;
