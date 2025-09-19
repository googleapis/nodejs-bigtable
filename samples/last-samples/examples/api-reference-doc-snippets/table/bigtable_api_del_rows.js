async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  table
    .deleteRows('alincoln')
    .then(result => {
      const apiResponse = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_del_rows]
}

main(...process.argv.slice(2)).catch(console.error);
