async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const options = {
    keys: ['alincoln', 'gwashington'],
  };
  table
    .getRows(options)
    .then(result => {
      const rows = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_get_rows]
}

main(...process.argv.slice(2)).catch(console.error);
