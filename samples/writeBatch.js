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

// sample-metadata:
//   title: Write Batch
//   usage: node writeBatch.js <instanceId> <tableId>

function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // [START bigtable_writes_batch]
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
      `Successfully wrote 2 rows: ${rowsToInsert[0].key} and ${rowsToInsert[1].key}`
    );
  }

  writeBatch();
  // [END bigtable_writes_batch]
}

main(...process.argv.slice(2));
