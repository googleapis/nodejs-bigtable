async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const row = table.row('samplerow');

  row
    .create()
    .then(result => {
      const apiResponse = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_create_row]
}

main(...process.argv.slice(2)).catch(console.error);
