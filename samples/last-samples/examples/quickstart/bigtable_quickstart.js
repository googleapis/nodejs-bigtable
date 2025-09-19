async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // Imports the Google Cloud client library
  const {Bigtable} = require('@google-cloud/bigtable');

  const bigtable = new Bigtable();

  async function quickstart() {
    // Connect to an existing instance:my-bigtable-instance
    const instance = bigtable.instance(INSTANCE_ID);

    // Connect to an existing table:my-table
    const table = instance.table(TABLE_ID);

    // Read a row from my-table using a row key
    const [singleRow] = await table.row('r1').get();

    // Print the row key and data (column value, labels, timestamp)
    const rowData = JSON.stringify(singleRow.data, null, 4);
    console.log(`Row key: ${singleRow.id}\nData: ${rowData}`);
  }
  quickstart();
  // [END bigtable_quickstart]
}

main(...process.argv.slice(2)).catch(console.error);
