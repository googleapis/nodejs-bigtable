async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const entries = [
    {
      key: 'alincoln',
      data: {
        follows: {
          gwashington: 1,
        },
      },
    },
  ];

  table
    .insert(entries)
    .then(result => {
      const apiResponse = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_insert_rows]
}

main(...process.argv.slice(2)).catch(console.error);
