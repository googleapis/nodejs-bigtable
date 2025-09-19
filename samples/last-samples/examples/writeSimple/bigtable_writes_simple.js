async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  const {Bigtable} = require('@google-cloud/bigtable');
  const bigtable = new Bigtable();

  async function writeSimple() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const timestamp = new Date();
    const rowToInsert = {
      key: 'phone#4c410523#20190501',
      data: {
        stats_summary: {
          connected_cell: {
            value: 1,
            timestamp,
          },
          connected_wifi: {
            value: 1,
            timestamp,
          },
          os_build: {
            value: 'PQ2A.190405.003',
            timestamp,
          },
        },
      },
    };

    await table.insert(rowToInsert);

    console.log(`Successfully wrote row ${rowToInsert.key}`);
  }

  writeSimple();
  // [END bigtable_writes_simple]
}

main(...process.argv.slice(2)).catch(console.error);
