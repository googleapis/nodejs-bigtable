async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
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
}

main(...process.argv.slice(2)).catch(console.error);
