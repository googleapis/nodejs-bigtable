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
//   title: Simple Insert
//   description: Insert a row into a table.
//   usage: node writeSimple.js <instanceId> <tableId>

function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // [START bigtable_writes_simple]
  const {Bigtable} = require('@google-cloud/bigtable');
  const bigtable = new Bigtable();

  async function writeSimple() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const timestamp = new Date();
    const rowToInsert = {
      key: 'phone#4c410523#20190501',
      data: {
        stats_summary: {
          connected_cell: {
            value: 1,
            timestamp,
          },
          connected_wifi: {
            value: 1,
            timestamp,
          },
          os_build: {
            value: 'PQ2A.190405.003',
            timestamp,
          },
        },
      },
    };

    await table.insert(rowToInsert);

    console.log(`Successfully wrote row ${rowToInsert.key}`);
  }

  writeSimple();
  // [END bigtable_writes_simple]
}

main(...process.argv.slice(2));
