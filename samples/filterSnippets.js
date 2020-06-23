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

function main(
  instanceId = 'YOUR_INSTANCE_ID',
  tableId = 'YOUR_TABLE_ID',
  filterType = 'filterRowSample'
) {
  // [START bigtable_filters_print]
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
  switch (filterType) {
    case 'filterRowSample': {
      // [START bigtable_filters_limit_row_sample]
      const filter = {
        row: {
          sample: 0.75,
        },
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_row_sample]
      break;
    }

    case 'filterRowRegex': {
      // [START bigtable_filters_limit_row_regex]
      const filter = {
        row: /.*#20190501$/,
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_row_regex]
      break;
    }

    case 'filterCellsPerCol': {
      // [START bigtable_filters_limit_cells_per_col]
      const filter = {
        column: {
          cellLimit: 2,
        },
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_cells_per_col]
      break;
    }

    case 'filterCellsPerRow': {
      // [START bigtable_filters_limit_cells_per_row]
      const filter = {
        row: {
          cellLimit: 2,
        },
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_cells_per_row]
      break;
    }

    case 'filterCellsPerRowOffset': {
      // [START bigtable_filters_limit_cells_per_row_offset]
      const filter = {
        row: {
          cellOffset: 2,
        },
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_cells_per_row_offset]
      break;
    }

    case 'filterColFamilyRegex': {
      // [START bigtable_filters_limit_col_family_regex]
      const filter = {
        family: /stats_.*$/,
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_col_family_regex]
      break;
    }

    case 'filterColQualifierRegex': {
      // [START bigtable_filters_limit_col_qualifier_regex]
      const filter = {
        column: /connected_.*$/,
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_col_qualifier_regex]
      break;
    }

    case 'filterColRange': {
      // [START bigtable_filters_limit_col_range]
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
      // [END bigtable_filters_limit_col_range]
      break;
    }

    case 'filterValueRange': {
      // [START bigtable_filters_limit_value_range]
      const filter = {
        value: {
          start: 'PQ2A.190405',
          end: 'PQ2A.190406',
        },
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_value_range]
      break;
    }

    case 'filterValueRegex': {
      // [START bigtable_filters_limit_value_regex]
      const filter = {
        value: /PQ2A.*$/,
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_value_regex]
      break;
    }

    case 'filterTimestampRange': {
      // [START bigtable_filters_limit_timestamp_range]
      const start = 0;
      const end = new Date(2019, 5, 1);
      end.setUTCHours(0);
      const filter = {
        time: {
          start,
          end,
        },
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_timestamp_range]
      break;
    }

    case 'filterBlockAll': {
      // [START bigtable_filters_limit_block_all]
      const filter = {
        all: false,
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_block_all]
      break;
    }

    case 'filterPassAll': {
      // [START bigtable_filters_limit_pass_all]
      const filter = {
        all: true,
      };
      readWithFilter(filter);
      // [END bigtable_filters_limit_pass_all]
      break;
    }

    case 'filterStripValue': {
      // [START bigtable_filters_modify_strip_value]
      const filter = {
        value: {
          strip: true,
        },
      };
      readWithFilter(filter);
      // [END bigtable_filters_modify_strip_value]
      break;
    }

    case 'filterApplyLabel': {
      // [START bigtable_filters_modify_apply_label]
      const filter = {
        label: 'labelled',
      };
      readWithFilter(filter);
      // [END bigtable_filters_modify_apply_label]
      break;
    }

    case 'filterChain': {
      // [START bigtable_filters_composing_chain]
      const filter = [
        {
          column: {
            cellLimit: 1,
          },
        },
        {
          family: 'cell_plan',
        },
      ];
      readWithFilter(filter);
      // [END bigtable_filters_composing_chain]
      break;
    }

    case 'filterInterleave': {
      // [START bigtable_filters_composing_interleave]
      const filter = {
        interleave: [
          {
            value: 'true',
          },
          {column: 'os_build'},
        ],
      };
      readWithFilter(filter);
      // [END bigtable_filters_composing_interleave]
      break;
    }

    case 'filterCondition': {
      // [START bigtable_filters_composing_condition]
      const filter = {
        condition: {
          test: [
            {column: 'data_plan_10gb'},
            {
              value: 'true',
            },
          ],
          pass: {
            label: 'passed-filter',
          },
          fail: {
            label: 'filtered-out',
          },
        },
      };
      readWithFilter(filter);
      // [END bigtable_filters_composing_condition]
      break;
    }
  }
  // [END_EXCLUDE]

  async function readWithFilter(filter) {
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
  }

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
}
// [END bigtable_filters_print]

main(...process.argv.slice(2));
