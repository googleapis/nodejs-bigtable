async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const start = 'phone#4c410523#20190501';
  const end = 'phone#4c410523#201906201';

  await table
    .createReadStream({
      start,
      end,
    })
    .on('error', err => {
      // Handle the error.
      console.log(err);
    })
    .on('data', row => printRow(row.id, row.data))
    .on('end', () => {
      // All rows retrieved.
    });
  // [END bigtable_reads_row_range]
}

main(...process.argv.slice(2)).catch(console.error);
