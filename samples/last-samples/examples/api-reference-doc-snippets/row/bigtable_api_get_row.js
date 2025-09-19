async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const row = table.row('samplerow');

  row
    .get()
    .then(result => {
      const row = result[0];
    })
    .catch(err => {
      // Handle the error.
    });

  //-
  // Or pass in an array of column names to populate specific cells.
  // Under the hood this will create an interleave filter.
  //-
  // row
  //   .get([
  //     'follows:gwashington',
  //     'follows:alincoln'
  //   ])
  //   .then(result => {
  //     let row = result[0];
  //   })
  //   .catch(err => {
  //     // Handle the error.
  //   });

  // [END bigtable_api_get_row]
}

main(...process.argv.slice(2)).catch(console.error);
