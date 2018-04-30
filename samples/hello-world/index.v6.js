/**
 * A minimal application that demonstrates using the Nodejs Google Cloud API
 * to connect to and interact with Cloud Bigtable.
 */

// This file works on node v6.x and newer.
// A node v8.x version that uses async/await of this script is available
// in index.js

/*eslint node/no-unsupported-features: ["error", {version: 6}]*/

const bigtable = require('@google-cloud/bigtable');
const co = require('co');

const TABLE_NAME = 'Hello-Bigtable';
const COLUMN_FAMILY_NAME = 'cf1';
const COLUMN_NAME = 'greeting';
const INSTANCE_ID = process.env.INSTANCE_ID;

if (!INSTANCE_ID) {
  throw new Error('Environment variables for INSTANCE_ID must be set!');
}

const getRowGreeting = row => {
  return row.data[COLUMN_FAMILY_NAME][COLUMN_NAME][0].value;
};

co(function*() {
  try {
    const bigtableClient = bigtable();
    const instance = bigtableClient.instance(INSTANCE_ID);

    const table = instance.table(TABLE_NAME);
    const [tableExists] = yield table.exists();
    if (!tableExists) {
      console.log(`Creating table ${TABLE_NAME}`);
      const options = {
        families: [
          {
            name: COLUMN_FAMILY_NAME,
            rule: {
              versions: 1,
            },
          },
        ],
      };
      yield table.create(options);
    }

    console.log('Write some greetings to the table');
    const greetings = ['Hello World!', 'Hello Bigtable!', 'Hello Node!'];
    const rowsToInsert = greetings.map(function(greeting, index) {
      return {
        key: `greeting${index}`,
        data: {
          [COLUMN_FAMILY_NAME]: {
            [COLUMN_NAME]: {
              // Setting the timestamp allows the client to perform retries.
              // If server-side time is used, retries may cause multiple cells
              // to be generated.
              timestamp: new Date(),
              value: greeting,
            },
          },
        },
      };
    });
    yield table.insert(rowsToInsert);

    const filter = [
      {
        column: {
          cellLimit: 1, // Only retrieve the most recent version of the cell.
        },
      },
    ];

    console.log('Reading a single row by row key');
    let [singeRow] = yield table.row('greeting0').get({filter});
    console.log(`\tRead: ${getRowGreeting(singeRow)}`);

    console.log('Reading the entire table');
    const [allRows] = yield table.getRows({filter});
    for (const row of allRows) {
      console.log(`\tRead: ${getRowGreeting(row)}`);
    }

    console.log('Delete the table');
    yield table.delete();
  } catch (error) {
    console.error('Something went wrong:', error);
  }
});
