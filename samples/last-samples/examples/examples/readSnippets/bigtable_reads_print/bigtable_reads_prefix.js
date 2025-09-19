async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const prefix = 'phone#';

  await table
    .createReadStream({
      prefix,
    })
    .on('error', err => {
      // Handle the error.
      console.log(err);
    })
    .on('data', row => printRow(row.id, row.data))
    .on('end', () => {
      // All rows retrieved.
    });
  // [END bigtable_reads_prefix]
}

main(...process.argv.slice(2)).catch(console.error);
