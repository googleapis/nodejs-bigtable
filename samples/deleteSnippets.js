// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

async function main(
  instanceId = 'YOUR_INSTANCE_ID',
  tableId = 'YOUR_TABLE_ID',
  deleteType = 'readRow'
) {
  // [START bigtable_deletes_print]
  const {Bigtable} = require('@google-cloud/bigtable');
  const bigtable = new Bigtable();

  // TODO: We need to import Mutation.methods.DELETE from mutation.ts, but I guess we need to compile typescript?
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const instanceId = 'YOUR_INSTANCE_ID';
  // const tableId = 'YOUR_TABLE_ID';
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  switch (deleteType) {
    case 'deleteFromColumn': {
      // [START bigtable_delete_from_column]
      await table.mutate({
        key: 'phone#4c410523#20190501',
        method: 'delete',
        data: {
          column: 'cell_plan:data_plan_05gb',
        },
      });
      await printRows();
      // [END bigtable_delete_from_column]
      break;
    }
    case 'deleteFromFamily': {
      // [START bigtable_delete_from_column_family]
      await table.mutate({
        key: 'phone#4c410523#20190501',
        method: 'delete',
        data: {
          column: 'cell_plan',
        },
      });
      await printRows();
      // [END bigtable_delete_from_column_family]
      break;
    }
    case 'deleteFromRow': {
      // [START bigtable_deletes_from_row]
      const row = table.row('phone#4c410523#20190501');
      await row.delete();
      await printRows();
      // [END bigtable_deletes_from_row]
      break;
    }
    case 'streamingAndBatching': {
      // [START bigtable_streaming_and_batching]
      const rows = (await table.getRows({limit: 2}))[0];
      const entries = rows.map(row => {
        return {
          key: row.id,
          method: 'delete',
          data: {
            column: 'cell_plan:data_plan_05gb',
          },
        };
      });
      await table.mutate(entries);
      await printRows();
      // [END bigtable_streaming_and_batching]
      break;
    }
    case 'checkAndMutate': {
      // [START bigtable_check_and_mutate]
      const row = table.row('phone#4c410523#20190502');
      await row.filter(
        {
          column: 'data_plan_05gb',
        },
        {
          onMatch: {
            key: 'phone#4c410523#20190502',
            method: 'delete',
          },
        }
      );
      await printRows();
      // [END bigtable_check_and_mutate]
      break;
    }
    case 'dropRowRange': {
      // [START bigtable_drop_row_range]
      await table.deleteRows('phone#5c10102');
      await printRows();
      // [END bigtable_drop_row_range]
      break;
    }
    case 'deleteColumnFamily': {
      // [START bigtable_delete_column_family]
      const cf = table.family('stats_summary');
      await cf.delete();
      await printRows();
      // [END bigtable_delete_column_family]
      break;
    }
    case 'deleteTable': {
      // [START bigtable_delete_table]
      await table.delete();
      console.log(await table.exists({}));
      // [END bigtable_delete_table]
      break;
    }
  }

  async function printRows() {
    const rows = (await table.getRows({}))[0];
    for (const row of rows) {
      const rowData = row.data;
      for (const columnFamily of Object.keys(rowData)) {
        const columnFamilyData = rowData[columnFamily];
        console.log(`Column Family ${columnFamily}`);

        for (const columnQualifier of Object.keys(columnFamilyData)) {
          const col = columnFamilyData[columnQualifier];

          for (const cell of col) {
            const labels = cell.labels.length
              ? ` [${cell.labels.join(',')}]`
              : '';
            console.log(
              `\t${columnQualifier}: ${cell.value} @${cell.timestamp}${labels}`
            );
          }
        }
      }
    }
    console.log();
  }
}
// [END bigtable_deletes_print]

main(...process.argv.slice(2));
