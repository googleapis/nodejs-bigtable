async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const row = table.row('samplerow');

  // Delete selective cell within a family.
  // let cells = [
  //   'follows:gwashington'
  // ];

  // Delete all cells within a family.
  const cells = ['follows'];

  row
    .deleteCells(cells)
    .then(result => {
      const apiResponse = result[0];
    })
    .catch(err => {
      // Handle the error.
    });
  // [END bigtable_api_delete_particular_cells]
}

main(...process.argv.slice(2)).catch(console.error);
