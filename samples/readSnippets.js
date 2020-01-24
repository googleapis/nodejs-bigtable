// Copyright 2019 Google LLC
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
  readType = 'readRow'
) {
  // [START bigtable_reads_row]
  // [START bigtable_reads_row_partial]
  // [START bigtable_reads_rows]
  // [START bigtable_reads_row_range]
  // [START bigtable_reads_row_ranges]
  // [START bigtable_reads_prefix]
  // [START bigtable_reads_filter]
  const {Bigtable} = require('@google-cloud/bigtable');
  const bigtable = Bigtable();

  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const instanceId = 'YOUR_INSTANCE_ID';
  // const tableId = 'YOUR_TABLE_ID';
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);
  // [END bigtable_reads_row]
  // [END bigtable_reads_row_partial]
  // [END bigtable_reads_rows]
  // [END bigtable_reads_row_range]
  // [END bigtable_reads_row_ranges]
  // [END bigtable_reads_prefix]
  // [END bigtable_reads_filter]
  switch (readType) {
    // [START bigtable_reads_row]
    case 'readRow': {
      const rowkey = 'phone#4c410523#20190501';

      const [row] = await table.row(rowkey).get();
      printRow(rowkey, row.data);
      // [END bigtable_reads_row]
      break;
    }

    // [START bigtable_reads_row_partial]
    case 'readRowPartial': {
      const COLUMN_FAMILY = 'stats_summary';
      const COLUMN_QUALIFIER = 'os_build';
      const rowkey = 'phone#4c410523#20190501';

      const [row] = await table
        .row(rowkey)
        .get([`${COLUMN_FAMILY}:${COLUMN_QUALIFIER}`]);

      printRow(rowkey, row);
      // [END bigtable_reads_row_partial]
      break;
    }

    // [START bigtable_reads_rows]
    case 'readRows': {
      const rowKeys = ['phone#4c410523#20190501', 'phone#4c410523#20190502'];
      const [rows] = await table.getRows({keys: rowKeys});
      rows.forEach(row => printRow(row.id, row.data));
      // [END bigtable_reads_rows]
      break;
    }

    // [START bigtable_reads_row_range]
    case 'readRowRange': {
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
      break;
    }

    // [START bigtable_reads_row_ranges]
    case 'readRowRanges': {
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
      break;
    }

    // [START bigtable_reads_prefix]
    case 'readPrefix': {
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
      break;
    }

    // [START bigtable_reads_filter]
    case 'readFilter': {
      const filter = {
        value: /PQ2A.*$/,
      };

      await table
        .createReadStream({
          filter,
        })
        .on('error', err => {
          // Handle the error.
          console.log(err);
        })
        .on('data', row => printRow(row.id, row.data))
        .on('end', () => {
          // All rows retrieved.
        });
      // [END bigtable_reads_filter]
      break;
    }
  }

  // [START bigtable_reads_row]
  // [START bigtable_reads_row_partial]
  // [START bigtable_reads_rows]
  // [START bigtable_reads_row_range]
  // [START bigtable_reads_row_ranges]
  // [START bigtable_reads_prefix]
  // [START bigtable_reads_filter]
  function printRow(rowkey, rowData) {
    console.log(`Reading data for ${rowkey}:`);

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
    console.log();
  }

  // [END bigtable_reads_row]
  // [END bigtable_reads_row_partial]
  // [END bigtable_reads_rows]
  // [END bigtable_reads_row_range]
  // [END bigtable_reads_row_ranges]
  // [END bigtable_reads_prefix]
  // [END bigtable_reads_filter]
}

main(...process.argv.slice(2));
