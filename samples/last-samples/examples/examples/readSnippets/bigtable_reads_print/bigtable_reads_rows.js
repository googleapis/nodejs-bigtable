async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const rowKeys = ['phone#4c410523#20190501', 'phone#4c410523#20190502'];
  const [rows] = await table.getRows({keys: rowKeys});
  rows.forEach(row => printRow(row.id, row.data));
  // [END bigtable_reads_rows]
}

main(...process.argv.slice(2)).catch(console.error);
