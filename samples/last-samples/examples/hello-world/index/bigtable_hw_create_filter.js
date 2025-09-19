async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const filter = [
    {
      column: {
        cellLimit: 1, // Only retrieve the most recent version of the cell.
      },
    },
  ];
  // [END bigtable_hw_create_filter]
}

main(...process.argv.slice(2)).catch(console.error);
