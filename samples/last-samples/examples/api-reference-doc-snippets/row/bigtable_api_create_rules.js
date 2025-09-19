async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const row = table.row('samplerow');
  // -
  // Add an increment amount to an existing value, if the targeted cell is
  // unset, it will be treated as containing a zero.
  //
  const rules = [
    {
      column: 'follows:gwashington',
      increment: 1,
    },
  ];

  // -
  // You can also create a rule that will append data to an existing value.
  // If the targeted cell is unset, it will be treated as a containing an
  // empty string.
  //
  // const rules = [
  //   {
  //     column: 'follows:alincoln',
  //     append: ' Honest Abe!',
  //   },
  // ];

  row
    .createRules(rules)
    .then(result => {
      const apiResponse = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_create_rules]
}

main(...process.argv.slice(2)).catch(console.error);
