async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {Bigtable} = require('@google-cloud/bigtable');
  // [END bigtable_hw_imports]
}

main(...process.argv.slice(2)).catch(console.error);
