// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * A minimal application that demonstrates using the Nodejs Google Cloud API
 * to connect to and interact with Cloud Bigtable. See
 * https://github.com/googleapis/nodejs-bigtable/blob/master/samples/hello-world/README.md
 * for more details
 */

// This file will only work on node v8.x since it uses async/await.
// A version of this script is available for node v6.x in index.v6.js

// [START bigtable_hw_imports]
const {Bigtable} = require('@google-cloud/bigtable');
// [END bigtable_hw_imports]

const TABLE_ID = 'Hello-Bigtable';
const COLUMN_FAMILY_ID = 'cf1';
const COLUMN_QUALIFIER = 'greeting';
const INSTANCE_ID = process.env.INSTANCE_ID;

if (!INSTANCE_ID) {
  throw new Error('Environment variables for INSTANCE_ID must be set!');
}

const getRowGreeting = row => {
  return row.data[COLUMN_FAMILY_ID][COLUMN_QUALIFIER][0].value;
};

(async () => {
  try {
    // [START bigtable_hw_connect]
    const bigtableClient = new Bigtable();
    const instance = bigtableClient.instance(INSTANCE_ID);
    // [END bigtable_hw_connect]

    // [START bigtable_hw_create_table]
    const table = instance.table(TABLE_ID);
    const [tableExists] = await table.exists();
    if (!tableExists) {
      console.log(`Creating table ${TABLE_ID}`);
      const options = {
        families: [
          {
            name: COLUMN_FAMILY_ID,
            rule: {
              versions: 1,
            },
          },
        ],
      };
      await table.create(options);
    }
    // [END bigtable_hw_create_table]

    // [START bigtable_hw_write_rows]
    console.log('Write some greetings to the table');
    const greetings = ['Hello World!', 'Hello Bigtable!', 'Hello Node!'];
    const rowsToInsert = greetings.map((greeting, index) => ({
      // Note: This example uses sequential numeric IDs for simplicity, but this
      // pattern can result in poor performance in a production application.
      // Rows are stored in sorted order by key, so sequential keys can result
      // in poor distribution of operations across nodes.
      //
      // For more information about how to design an effective schema for Cloud
      // Bigtable, see the documentation:
      // https://cloud.google.com/bigtable/docs/schema-design
      key: `greeting${index}`,
      data: {
        [COLUMN_FAMILY_ID]: {
          [COLUMN_QUALIFIER]: {
            // Setting the timestamp allows the client to perform retries. If
            // server-side time is used, retries may cause multiple cells to
            // be generated.
            timestamp: new Date(),
            value: greeting,
          },
        },
      },
    }));
    await table.insert(rowsToInsert);
    // [END bigtable_hw_write_rows]

    // [START bigtable_hw_create_filter]
    const filter = [
      {
        column: {
          cellLimit: 1, // Only retrieve the most recent version of the cell.
        },
      },
    ];
    // [END bigtable_hw_create_filter]

    // [START bigtable_hw_get_with_filter]
    console.log('Reading a single row by row key');
    const [singleRow] = await table.row('greeting0').get({filter});
    console.log(`\tRead: ${getRowGreeting(singleRow)}`);
    // [END bigtable_hw_get_with_filter]

    // [START bigtable_hw_scan_with_filter]
    console.log('Reading the entire table');
    // Note: For improved performance in production applications, call
    // `Table#readStream` to get a stream of rows. See the API documentation:
    // https://cloud.google.com/nodejs/docs/reference/bigtable/latest/Table#createReadStream
    const [allRows] = await table.getRows({filter});
    for (const row of allRows) {
      console.log(`\tRead: ${getRowGreeting(row)}`);
    }
    // [END bigtable_hw_scan_with_filter]

    // [START bigtable_hw_delete_table]
    console.log('Delete the table');
    await table.delete();
    // [END bigtable_hw_delete_table]
  } catch (error) {
    console.error('Something went wrong:', error);
  }
})();
