async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const row = table.row('samplerow');

  // Specify a custom amount to increment the column by.
  // row
  //   .increment('follows:gwashington', 2)
  //   .then(result => {
  //     let value = result[0];
  //     let apiResponse = result[1];
  // });

  // To decrement a column, simply supply a negative value.
  // row
  //   .increment('follows:gwashington', -1)
  //   .then(result => {
  //     let value = result[0];
  //     let apiResponse = result[1];
  // });
  row
    .increment('follows:gwashington')
    .then(result => {
      const value = result[0];
      const apiResponse = result[1];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_row_increment]
}

main(...process.argv.slice(2)).catch(console.error);
