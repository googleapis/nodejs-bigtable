async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const row = table.row('samplerow');

  row
    .exists()
    .then(result => {
      const exists = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_row_exists]
}

main(...process.argv.slice(2)).catch(console.error);
