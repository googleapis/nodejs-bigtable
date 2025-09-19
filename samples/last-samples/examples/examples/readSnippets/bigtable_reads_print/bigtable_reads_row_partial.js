async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const COLUMN_FAMILY = 'stats_summary';
  const COLUMN_QUALIFIER = 'os_build';
  const rowkey = 'phone#4c410523#20190501';

  const [row] = await table
    .row(rowkey)
    .get([`${COLUMN_FAMILY}:${COLUMN_QUALIFIER}`]);

  printRow(rowkey, row);
  // [END bigtable_reads_row_partial]
}

main(...process.argv.slice(2)).catch(console.error);
