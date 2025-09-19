async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  table
    .createReadStream()
    .on('error', err => {
      // Handle the error.
    })
    .on('data', row => {
      // `row` is a Row object.
    })
    .on('end', () => {
      // All rows retrieved.
    });
  //-
  // If you anticipate many results, you can end a stream early to prevent
  // unnecessary processing.
  //-
  // table
  //   .createReadStream()
  //   .on('data', function (row) {
  //     this.end();
  //   });

  //-
  // Specify arbitrary keys for a non-contiguous set of rows.
  // The total size of the keys must remain under 1MB, after encoding.
  //-
  // table.createReadStream({
  //   keys: [
  //     'alincoln',
  //     'gwashington'
  //   ]
  // });

  //-
  // Scan for row keys that contain a specific prefix.
  //-
  // table.createReadStream({
  //   prefix: 'gwash'
  // });

  //-
  // Specify a contiguous range of rows to read by supplying `start` and `end`
  // keys.
  //
  // If the `start` key is omitted, it is interpreted as an empty string.
  // If the `end` key is omitted, it is interpreted as infinity.
  //-
  // table.createReadStream({
  //   start: 'alincoln',
  //   end: 'gwashington'
  // });

  //-
  // Specify multiple ranges.
  //-
  // table.createReadStream({
  //   ranges: [{
  //     start: 'alincoln',
  //     end: 'gwashington'
  //   }, {
  //     start: 'tjefferson',
  //     end: 'jadams'
  //   }]
  // });

  //-
  // Apply a {@link Filter} to the contents of the specified rows.
  //-
  // table.createReadStream({
  //   filter: [
  //     {
  //       column: 'gwashington'
  //     }, {
  //       value: 1
  //     }
  //   ]
  // });
  //
  // [END bigtable_api_table_readstream]
}

main(...process.argv.slice(2)).catch(console.error);
