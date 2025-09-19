async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  console.log('Reading a single row by row key');
  const [singleRow] = await table.row('greeting0').get({filter});
  console.log(`\tRead: ${getRowGreeting(singleRow)}`);
  // [END bigtable_hw_get_with_filter]
}

main(...process.argv.slice(2)).catch(console.error);
