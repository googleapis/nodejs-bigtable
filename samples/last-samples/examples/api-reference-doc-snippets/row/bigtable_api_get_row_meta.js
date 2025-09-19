async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const row = table.row('samplerow');

  row
    .getMetadata()
    .then(result => {
      const metaData = result[0];
      const apiResponse = result[1];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_get_row_meta]
}

main(...process.argv.slice(2)).catch(console.error);
