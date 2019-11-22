/**
 * Copyright 2019, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// sample-metadata:
//   title: Read a row
//   description: Get all the data for a Bigtable row by key.
//   usage: node readRow.js <instanceId>

function main(
  instanceId = 'YOUR_INSTANCE_ID',
  tableId = 'YOUR_TABLE_ID',
  filterType = 'filterRowSample'
) {
  const Bigtable = require('@google-cloud/bigtable');
  const bigtable = Bigtable();

  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const instanceId = 'YOUR_INSTANCE_ID';
  // const tableId = 'YOUR_TABLE_ID';
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  // [START bigtable_filters_limit_row_sample]
  async function filterRowSample() {
    const filter = {
      row: {
        sample: .75,
      },
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_row_sample]
  // [START bigtable_filters_limit_row_regex]
  async function filterRowRegex() {
    const filter = {
      row: /.*#20190501$/,
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_row_regex]
  // [START bigtable_filters_limit_cells_per_col]
  async function filterCellsPerCol() {
    const filter = {
      column: {
        cellLimit: 2,
      },
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_cells_per_col]
  // [START bigtable_filters_limit_cells_per_row]
  async function filterCellsPerRow() {
    const filter = {
      row: {
        cellLimit: 2,
      },
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_cells_per_row]
  // [START bigtable_filters_limit_cells_per_row_offset]
  async function filterCellsPerRowOffset() {
    const filter = {
      row: {
        cellOffset: 2,
      },
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_cells_per_row_offset]
  // [START bigtable_filters_limit_col_family_regex]
  async function filterColFamilyRegex() {
    const filter = {
      family: /stats_.*$/,
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_col_family_regex]
  // [START bigtable_filters_limit_col_qualifier_regex]
  async function filterColQualifierRegex() {
    const filter = {
      column: /connected_.*$/,
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_col_qualifier_regex]
  // [START bigtable_filters_limit_col_range]
  async function filterColRange() {
    const filter = {
      column: {
        family: 'cell_plan',
        start: 'data_plan_01gb',
        end: {
          value: 'data_plan_10gb',
          inclusive: false,
        },
      },
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_col_range]
  // [START bigtable_filters_limit_value_range]
  async function filterValueRange() {
    const filter = {
      value: {
        start: 'PQ2A.190405',
        end: 'PQ2A.190406',
      },
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_value_range]
  // [START bigtable_filters_limit_value_regex]
  async function filterValueRegex() {
    const filter = {
      value: /PQ2A.*$/,
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_value_regex]
  // [START bigtable_filters_limit_timestamp_range]
  async function filterTimestampRange() {
    const start = 0;
    const end = new Date();
    end.setHours(end.getHours() - 1);
    const filter = {
      time: {
        start,
        end,
      },
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_timestamp_range]
  // [START bigtable_filters_limit_block_all]
  async function filterBlockAll() {
    const filter = {
      all: false,
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_block_all]
  // [START bigtable_filters_limit_pass_all]
  async function filterPassAll() {
    const filter = {
      all: true,
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_pass_all]

  // [START bigtable_filters_limit_strip_value]
  async function filterStripValue() {
    const filter = {
      value: {
        strip: true,
      },
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_strip_value]
  // [START bigtable_filters_limit_apply_label]
  async function filterApplyLabel() {
    const filter = {
      label: 'labelled',
    };
    readWithFilter(filter);
  }
  // [END bigtable_filters_limit_apply_label]

  async function readWithFilter(filter) {
    await table
      .createReadStream({
        filter,
      })
      .on('error', err => {
        // Handle the error.
      })
      .on('data', row => printRow(row.id, row.data))
      .on('end', function() {
        // All rows retrieved.
      });
  }

  function printRow(rowkey, rowData) {
    console.log(`Reading data for ${rowkey}:`);

    for (const columnFamily of Object.keys(rowData)) {
      const columnFamilyData = rowData[columnFamily];
      console.log(`Column Family ${columnFamily}`);

      for (const columnQualifier of Object.keys(columnFamilyData)) {
        const col = columnFamilyData[columnQualifier];

        for (let i = 0; i < col.length; i++) {
          const cell = col[i];
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

  eval(`${filterType}()`);
}

main(...process.argv.slice(2));
