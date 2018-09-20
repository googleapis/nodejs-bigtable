/**
 * A minimal application that demonstrates using the Nodejs Google Cloud API
 * to connect to and interact with Cloud Bigtable. See
 * https://github.com/googleapis/nodejs-bigtable/blob/master/samples/hello-world/README.md
 * for more details
 */

// This file works on node v6.x and newer.
// A node v8.x version that uses async/await of this script is available
// in index.js

/*eslint node/no-unsupported-features: ["error", {version: 6}]*/

const bigtable = require('@google-cloud/bigtable');
const co = require('co');

const TABLE_ID = 'Hello-Bigtable';
const COLUMN_FAMILY_ID = 'cf1';
const COLUMN_QUALIFIER = 'greeting';
const INSTANCE_ID = process.env.INSTANCE_ID;
const GCLOUD_PROJECT = process.env.GCLOUD_PROJECT;

if (!INSTANCE_ID) {
  throw new Error('Environment variables for INSTANCE_ID must be set!');
}

if (!GCLOUD_PROJECT) {
  throw new Error('Environment variables GCLOUD_PROJECT must be set!');
}

const bigtableOptions = {
  projectId: GCLOUD_PROJECT,
};

const getRowGreeting = row => {
  return row.data[COLUMN_FAMILY_ID][COLUMN_QUALIFIER][0].value;
};

co(function*() {
  try {
    const bigtableClient = bigtable(bigtableOptions);
    const instance = bigtableClient.instance(INSTANCE_ID);

    const table = instance.table(TABLE_ID);
    const [tableExists] = yield table.exists();
    if (!tableExists) {
      console.log(`Creating table ${TABLE_ID}`);
      const options = {
        families: [
          {
            id: COLUMN_FAMILY_ID,
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
          [COLUMN_FAMILY_ID]: {
            [COLUMN_QUALIFIER]: {
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
    const [singeRow] = yield table.row('greeting0').get({filter});
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
