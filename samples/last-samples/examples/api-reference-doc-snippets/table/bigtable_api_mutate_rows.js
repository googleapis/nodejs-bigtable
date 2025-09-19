async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const entries = [
    {
      method: 'delete',
      key: 'alincoln',
    },
  ];
  table
    .mutate(entries)
    .then(() => {
      // handle success
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_mutate_rows]
}

main(...process.argv.slice(2)).catch(console.error);
