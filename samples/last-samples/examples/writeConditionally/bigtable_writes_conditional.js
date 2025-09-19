async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const instanceId = 'YOUR_INSTANCE_ID';
  // const tableId = 'YOUR_TABLE_ID';

  const {Bigtable} = require('@google-cloud/bigtable');

  const bigtable = new Bigtable();

  async function writeConditionally() {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const timestamp = new Date();
    const row = table.row('phone#4c410523#20190501');
    const filter = [
      {
        column: 'os_build',
        value: {
          start: 'PQ2A',
          end: 'PQ2A',
        },
      },
    ];

    const config = {
      onMatch: [
        {
          method: 'insert',
          data: {
            stats_summary: {
              os_name: 'android',
              timestamp,
            },
          },
        },
      ],
    };

    await row.filter(filter, config);

    console.log("Successfully updated row's os_name");
  }

  writeConditionally();
  // [END bigtable_writes_conditional]
}

main(...process.argv.slice(2)).catch(console.error);
