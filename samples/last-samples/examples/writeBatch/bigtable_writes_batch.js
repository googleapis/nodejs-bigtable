async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const instanceId = 'YOUR_INSTANCE_ID';
  // const tableId = 'YOUR_TABLE_ID';

  const {Bigtable} = require('@google-cloud/bigtable');

  const bigtable = new Bigtable();

  async function writeBatch() {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const timestamp = new Date();
    const rowsToInsert = [
      {
        key: 'tablet#a0b81f74#20190501',
        data: {
          stats_summary: {
            connected_wifi: {
              value: 1,
              timestamp,
            },
            os_build: {
              value: '12155.0.0-rc1',
              timestamp,
            },
          },
        },
      },
      {
        key: 'tablet#a0b81f74#20190502',
        data: {
          stats_summary: {
            connected_wifi: {
              value: 1,
              timestamp,
            },
            os_build: {
              value: '12145.0.0-rc6',
              timestamp,
            },
          },
        },
      },
    ];

    await table.insert(rowsToInsert);

    console.log(
      `Successfully wrote 2 rows: ${rowsToInsert[0].key} and ${rowsToInsert[1].key}`,
    );
  }

  writeBatch();
  // [END bigtable_writes_batch]
}

main(...process.argv.slice(2)).catch(console.error);
