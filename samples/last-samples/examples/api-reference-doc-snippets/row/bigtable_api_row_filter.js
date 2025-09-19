async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const row = table.row('samplerow');

  const filter = [
    {
      family: 'follows',
    },
    {
      column: 'alincoln',
    },
    {
      value: 1,
    },
  ];

  // Optionally, you can pass in an array of entries to be ran in the event
  // that a match is not made.
  const config = {
    onNoMatch: [
      {
        method: 'insert',
        data: {
          follows: {
            jadams: 1,
          },
        },
      },
    ],
  };

  row
    .filter(filter, config)
    .then(result => {
      const matched = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_row_filter]
}

main(...process.argv.slice(2)).catch(console.error);
