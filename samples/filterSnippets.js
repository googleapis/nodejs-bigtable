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

function main(instanceId = 'YOUR_INSTANCE_ID') {
  const Bigtable = require('@google-cloud/bigtable');
  const bigtable = Bigtable();

  async function filterSnippets() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    const instance = bigtable.instance(instanceId);
    const table = instance.table('mobile-time-series');
    const COLUMN_FAMILY = 'stats_summary';
    let filter = {};
    let filterType = 'timestamp_regex';
    switch (filterType) {
      case 'row_sample':
        // [START bigtable_filters_limit_row_sample]
        filter = {
          row: {
            sample: 0.5,
          },
        };
        // [END bigtable_filters_limit_row_sample]
        break;
      case 'row_regex':
        // [START bigtable_filters_limit_row_regex]
        filter = {
          row: /.*#20190501$/,
        };
        // [END bigtable_filters_limit_row_regex]
        break;
      case 'cells_per_col':
        // [START bigtable_filters_limit_cells_per_col]
        filter = {
          column: {
            cellLimit: 2,
          },
        };
        // [END bigtable_filters_limit_cells_per_col]
        break;
      case 'cells_per_row':
        // [START bigtable_filters_limit_cells_per_row]
        filter = {
          row: {
            cellLimit: 2,
          },
        };
        // [END bigtable_filters_limit_cells_per_row]
        break;
      case 'cells_per_row_offset':
        // [START bigtable_filters_limit_cells_per_row_offset]
        filter = {
          row: {
            cellOffset: 2,
          },
        };
        // [END bigtable_filters_limit_cells_per_row_offset]
        break;
      case 'col_family_regex':
        // [START bigtable_filters_limit_col_family_regex]
        filter = {
          family: /stats_.*$/,
        };
        // [END bigtable_filters_limit_col_family_regex]
        break;
      case 'col_qualifier_regex':
        // [START bigtable_filters_limit_col_qualifier_regex]
        filter = {
          column: /connected_.*$/,
        };
        // [END bigtable_filters_limit_col_qualifier_regex]
        break;
      case 'col_range':
        // [START bigtable_filters_limit_col_range]
        filter = {
          column: {
            start: 'data_plan_01gb',
            end: {
              value: 'data_plan_10gb',
              inclusive: false,
            },
          },
        };
        // [END bigtable_filters_limit_col_range]
        break;
      case 'value_range':
        // [START bigtable_filters_limit_value_range]
        filter = {
          value: {
            start: 'PQ2A.190405',
            end: 'PQ2A.190406',
          },
        };
        // [END bigtable_filters_limit_value_range]
        break;
      case 'value_regex':
        // [START bigtable_filters_limit_value_regex]
        filter = {
          value: /PQ2A.*$/,
        };
        // [END bigtable_filters_limit_value_regex]
        break;
      case 'timestamp_range':
        // [START bigtable_filters_limit_timestamp_range]
        const end = new Date();
        const start = new Date();
        start.setHours(start.getHours() - 1);
        filter = {
          time: {
            start,
            end,
          },
        };
        // [END bigtable_filters_limit_timestamp_range]
        break;
      case 'block_all':
        // [START bigtable_filters_limit_block_all]
        filter = {
          all: false,
        };
        // [END bigtable_filters_limit_block_all]
        break;
      case 'pass_all':
        // [START bigtable_filters_limit_pass_all]
        filter = {
          all: true,
        };
        // [END bigtable_filters_limit_pass_all]
        break;
      case 'sink':
        // [START bigtable_filters_limit_sink]
        filter = [
          {
            column: 'gwashington',
          },
          {
            sink: true,
          },
        ];
        // [END bigtable_filters_limit_sink]
        break;
      case 'strip_value':
        // [START bigtable_filters_limit_strip_value]
        filter = {
          value: {
            strip: true,
          },
        };
        // [END bigtable_filters_limit_strip_value]
        break;
      case 'apply_label':
        // [START bigtable_filters_limit_apply_label]
        filter = {
          label: 'my-label',
        };
        // [END bigtable_filters_limit_apply_label]
        break;
    }

    await table
      .createReadStream({
        filter,
      })
      .on('error', err => {
        // Handle the error.
      })
      .on('data', function(row) {
        const columnFamilyData = row.data[COLUMN_FAMILY];

        console.log(`Reading ${COLUMN_FAMILY} data for ${row.id}`);

        Object.keys(columnFamilyData).forEach(columnQualifier => {
          const col = columnFamilyData[columnQualifier];
          for (let i = 0; i < col.length; i++) {
            console.log(
              columnQualifier + ': ' + col[i].value + ' @' + col[i].timestamp
            );
          }
        });
      })
      .on('end', function() {
        // All rows retrieved.
      });
  }

  filterSnippets();
}

main(...process.argv.slice(2));
