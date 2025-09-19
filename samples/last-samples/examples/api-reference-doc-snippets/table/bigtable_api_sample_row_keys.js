async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  table
    .sampleRowKeys()
    .then(result => {
      const sampleRKeys = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_sample_row_keys]
}

main(...process.argv.slice(2)).catch(console.error);
