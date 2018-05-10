/**
 * Copyright 2017, Google, Inc.
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

'use strict';

/**
 * Creates a table named "my_table" with 1 column family "simpleFamily"
 * that has a max versions of 1
 */
function createTable() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // Set instance Object
  const instance = bigtable.instance('ssd-instance');

  // Set options
  const options = {
    families: [
      {
        name: 'simpleFamily',
        rule: {
          versions: 1,
        },
      },
    ],
  };

  instance
    .createTable('my-table', options)
    .then(data => {
      let table = data[0];
      let apiResponse = data[1];

      console.log(`Table created successfully by Name: ${table.name}`);
      console.log(`Table metadata: ${Object.keys(apiResponse)}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * check if a table by name "my-table" exists for instance "ssd-instance"
 */
function checkTableExists() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  const instance = bigtable.instance('ssd-instance');

  // refer table with id 'my-table'
  const table = instance.table('my-table');

  table
    .exists()
    .then(function(data) {
      const exists = data[0];
      if (exists) {
        console.log('Table Exists');
      } else {
        console.log('Table does not Exists');
      }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Get the table by name "my-table"
 */
function getTable() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  const instance = bigtable.instance('ssd-instance');

  // refer table with id 'my-table'
  const table = instance.table('my-table2');

  table
    .get()
    .then(data => {
      let table = data[0];
      let apiResponse = data[1];
      console.log(`Table Name: ${table.name}`);
      console.log(`apiResponse details: ${Object.keys(apiResponse)}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * List tables for a instance
 */
function listTables() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // Set instance Object
  const instance = bigtable.instance('ssd-instance');

  instance
    .getTables()
    .then(data => {
      const tables = data[0];
      console.log('Tables:');

      tables.forEach(table => {
        console.log(table.name);
      });
    })
    .catch(err => {
      console.error(`Error: ${err}`);
    });
}

/**
 * Delete the Table "my-table"
 */
function deleteTable() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // refer table with id 'my-table'
  const table = instance.table('my-table');

  // check if instance exists
  table
    .delete()
    .then(data => {
      let apiResponse = data[0];
      console.log(`Table Deleted ${apiResponse}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Creates a column family called "complex" on "my_table" that has
 * the following GCRule which means "have at least 2 columns, but
 * no more than 10. Any additional columns past 2 should have a TTL of 30d
 */
function addFamily() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // refer table with id 'my-table'
  const table = instance.table('my-table');

  const options = {
    rule: {
      age: {
        seconds: 60 * 60 * 24 * 30,
      },
      versions: 2,
      union: true,
    },
  };

  table
    .createFamily('complex', options)
    .then(data => {
      const family = data[0];
      console.log(
        `Column Families: ${Object.keys(family.metadata.columnFamilies)}`
      );
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Delete a column family called "complex" on "my_table"
 */
function delFamily() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // refer table with id 'my-table'
  const table = instance.table('my-table');

  const family = table.family('complex');

  family
    .delete()
    .then(data => {
      const apiResponse = data[0];
      console.log(`Family Deleted ${JSON.stringify(apiResponse)}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

require(`yargs`)
  .demand(1)

  // command to create a PRODUCTION instance
  .command(`create-table`, `Create Table`, {}, createTable)
  .example(`node $0 create-table`, `Creates a Table`)

  // command to Check if Table exists
  .command(`table-exists`, `Check Table Exists`, {}, checkTableExists)
  .example(`node $0 table-exists`, `Check Table Exists`)

  // command to list all tables
  .command(`list-tables`, `Lists all tables`, {}, listTables)
  .example(`node $0 list-tables`, `Lists all tables in an Instance`)

  // command to delete table named 'my-table'
  .command(`del-table`, `Delete the Table`, {}, deleteTable)
  .example(`node $0 del-table`, `Delete the Table`)

  // command to get the instance 'ssd-instance'
  .command(`get-table`, `Get the Table`, {}, getTable)
  .example(`node $0 get-table`, `Get the Table`)

  // command to get the instance 'ssd-instance'
  .command(`add-family`, `Add Col Family to Table`, {}, addFamily)
  .example(`node $0 add-family`, `Add Col Family to Table`)

  // command to get the instance 'ssd-instance'
  .command(`del-family`, `Delete Col Family`, {}, delFamily)
  .example(`node $0 del-family`, `Delete Col Family`)

  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/bigtable/docs`)
  .help()
  .strict().argv;
