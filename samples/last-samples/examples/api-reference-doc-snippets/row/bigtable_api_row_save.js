async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const row = table.row('samplerow');
  const entry = {
    follows: {
      jadams: 1,
    },
  };
  row
    .save(entry)
    .then(result => {
      const apiResponse = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_row_save]
}

main(...process.argv.slice(2)).catch(console.error);
