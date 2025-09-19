async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  await table
    .createReadStream({
      ranges: [
        {
          start: 'phone#4c410523#20190501',
          end: 'phone#4c410523#20190601',
        },
        {
          start: 'phone#5c10102#20190501',
          end: 'phone#5c10102#20190601',
        },
      ],
    })
    .on('error', err => {
      // Handle the error.
      console.log(err);
    })
    .on('data', row => printRow(row.id, row.data))
    .on('end', () => {
      // All rows retrieved.
    });
  // [END bigtable_reads_row_ranges]
}

main(...process.argv.slice(2)).catch(console.error);
