async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  console.log('Reading the entire table');
  // Note: For improved performance in production applications, call
  // `Table#readStream` to get a stream of rows. See the API documentation:
  // https://cloud.google.com/nodejs/docs/reference/bigtable/latest/Table#createReadStream
  const [allRows] = await table.getRows({filter});
  for (const row of allRows) {
    console.log(`\tRead: ${getRowGreeting(row)}`);
  }
  // [END bigtable_hw_scan_with_filter]
}

main(...process.argv.slice(2)).catch(console.error);
