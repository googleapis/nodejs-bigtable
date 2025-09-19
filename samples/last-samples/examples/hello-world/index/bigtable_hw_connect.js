async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const bigtableClient = new Bigtable();
  const instance = bigtableClient.instance(INSTANCE_ID);
  const table = instance.table(TABLE_ID);
  // [END bigtable_hw_connect]
}

main(...process.argv.slice(2)).catch(console.error);
