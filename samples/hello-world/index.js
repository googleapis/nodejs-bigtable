/**
 * A minimal application that demonstrates using the Nodejs Google Cloud API
 * to connect to and interact with Cloud Bigtable. See
 * https://github.com/googleapis/nodejs-bigtable/blob/master/samples/hello-world/README.md
 * for more details
 */

// This file will only work on node v8.x since it uses async/await.
// A version of this script is available for node v6.x in index.v6.js

/*eslint node/no-unsupported-features: ["error", {version: 8}]*/

// [START dependencies]
const Bigtable = require('@google-cloud/bigtable');
// [END dependencies]

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

(async () => {
  try {
    // [START connecting_to_bigtable]
    const bigtableClient = new Bigtable(bigtableOptions);
    const instance = bigtableClient.instance(INSTANCE_ID);
    // [END connecting_to_bigtable]

    // [START creating_a_table]
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
    // [END creating_a_table]

    // [START writing_rows]
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
    // [END writing_rows]

    // [START creating_a_filter]
    const filter = [
      {
        column: {
          cellLimit: 1, // Only retrieve the most recent version of the cell.
        },
      },
    ];
    // [END creating_a_filter]

    // [START getting_a_row]
    console.log('Reading a single row by row key');
    const [singleRow] = await table.row('greeting0').get({filter});
    console.log(`\tRead: ${getRowGreeting(singleRow)}`);
    // [END getting_a_row]

    // [START scanning_all_rows]
    console.log('Reading the entire table');
    // Note: For improved performance in production applications, call
    // `Table#readStream` to get a stream of rows. See the API documentation:
    // https://cloud.google.com/nodejs/docs/reference/bigtable/latest/Table#createReadStream
    const [allRows] = await table.getRows({filter});
    for (const row of allRows) {
      console.log(`\tRead: ${getRowGreeting(row)}`);
    }
    // [END scanning_all_rows]

    // [START deleting_a_table]
    console.log('Delete the table');
    await table.delete();
    // [END deleting_a_table]
  } catch (error) {
    console.error('Something went wrong:', error);
  }
})();
