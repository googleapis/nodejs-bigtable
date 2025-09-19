async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const instanceId = 'YOUR_INSTANCE_ID';
  // const tableId = 'YOUR_TABLE_ID';

  const {Bigtable} = require('@google-cloud/bigtable');

  const bigtable = new Bigtable();

  async function writeIncrement() {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const row = table.row('phone#4c410523#20190501');
    await row.increment('stats_summary:connected_wifi', -1);

    console.log(`Successfully updated row ${row}`);
  }

  writeIncrement();
  // [END bigtable_writes_increment]
}

main(...process.argv.slice(2)).catch(console.error);
