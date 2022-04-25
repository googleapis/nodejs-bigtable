'use strict';

async function main(
  instanceId = 'YOUR_INSTANCE_ID',
  tableId = 'YOUR_TABLE_ID',
  deleteType = 'readRow'
) {
  // [START bigtable_deletes_print]
  const {Bigtable} = require('@google-cloud/bigtable');
  const bigtable = new Bigtable();

  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const instanceId = 'YOUR_INSTANCE_ID';
  // const tableId = 'YOUR_TABLE_ID';
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // Write your code here.
  // [START_EXCLUDE]
  switch (deleteType) {
    case 'deleteFromRow': {
      // [START bigtable_deletes_from_row]
      const row = table.row('phone#4c410523#20190501');
      await row.deleteCells(['cell_plan:data_plan_05gb']);
      // [END bigtable_deletes_from_row]
      break;
    }
    case 'dropRowRange': {
      // [START bigtable_drop_row_range]
      await table.deleteRows('phone#4c');
      // [END bigtable_drop_row_range]
      break;
    }
    case 'deleteColumnFamily': {
      // [START bigtable_delete_column_family]
      const cf = table.family('stats_summary');
      await cf.delete({});
      // [END bigtable_delete_column_family]
      break;
    }
    case 'deleteTable': {
      // [START bigtable_delete_table]
      await table.delete({});
      // [END bigtable_delete_table]
      break;
    }
  }
  // [END_EXCLUDE]
}
// [END bigtable_deletes_print]

main(...process.argv.slice(2));
