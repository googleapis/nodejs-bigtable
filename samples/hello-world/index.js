/**
 * A minimal application that demonstrates using the Nodejs Google Cloud API
 * to connect to and interact with Cloud Bigtable. See
 * https://github.com/googleapis/nodejs-bigtable/blob/master/samples/hello-world/README.md
 * for more details
 */

// This file will only work on node v8.x since it uses async/await.
// A version of this script is available for node v6.x in index.v6.js

/*eslint node/no-unsupported-features: ["error", {version: 8}]*/

const bigtable = require('@google-cloud/bigtable');

const TABLE_ID = 'Hello-Bigtable';
const COLUMN_FAMILY_ID = 'cf1';
const COLUMN_QUALIFIER = 'greeting';
const INSTANCE_ID = process.env.INSTANCE_ID;
const PROJECT_ID = process.env.PROJECT_ID;

if (!INSTANCE_ID) {
  throw new Error('Environment variables for INSTANCE_ID must be set!');
}

if (!PROJECT_ID) {
  throw new Error('Environment variables PROJECT_ID must be set!');
}

var bigtableOptions = {
  projectId: PROJECT_ID,
};

const getRowGreeting = row => {
  return row.data[COLUMN_FAMILY_ID][COLUMN_QUALIFIER][0].value;
};

(async () => {
  try {
    const bigtableClient = bigtable(bigtableOptions);
    const instance = bigtableClient.instance(INSTANCE_ID);

    const table = instance.table(TABLE_ID);
    const [tableExists] = await table.exists();
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
      await table.create(options);
    }

    console.log('Write some greetings to the table');
    const greetings = ['Hello World!', 'Hello Bigtable!', 'Hello Node!'];
    const rowsToInsert = greetings.map((greeting, index) => ({
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

    const filter = [
      {
        column: {
          cellLimit: 1, // Only retrieve the most recent version of the cell.
        },
      },
    ];

    console.log('Reading a single row by row key');
    let [singeRow] = await table.row('greeting0').get({filter});
    console.log(`\tRead: ${getRowGreeting(singeRow)}`);

    console.log('Reading the entire table');
    const [allRows] = await table.getRows({filter});
    for (const row of allRows) {
      console.log(`\tRead: ${getRowGreeting(row)}`);
    }

    console.log('Delete the table');
    await table.delete();
  } catch (error) {
    console.error('Something went wrong:', error);
  }
})();
