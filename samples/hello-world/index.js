// This file will only work on node v8.x since it uses async/await.
// A version of this script is available for node v6.x in index.v6.js

/*eslint node/no-unsupported-features: ["error", {version: 8}]*/

const bigtable = require('@google-cloud/bigtable');

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

(async () => {
  try {
    const bigtableClient = bigtable();
    const instance = bigtableClient.instance(INSTANCE_ID);

    const table = instance.table(TABLE_NAME);
    const [tableExists] = await table.exists();
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
      await table.create(options);
    }

    console.log('Write some greetings to the table');
    const greetings = ['Hello World!', 'Hello Bigtable!', 'Hello Node!'];
    const rowsToInsert = greetings.map((greeting, index) => ({
      key: `greeting${index}`,
      data: {
        [COLUMN_FAMILY_NAME]: {
          [COLUMN_NAME]: {
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
