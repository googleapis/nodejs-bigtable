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
//   title: Write Conditionally
//   usage: node writeConditionally.js <instanceId> <tableId>

function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
  // [START bigtable_writes_conditional]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const instanceId = 'YOUR_INSTANCE_ID';
  // const tableId = 'YOUR_TABLE_ID';

  const {Bigtable} = require('@google-cloud/bigtable');

  const bigtable = new Bigtable();

  async function writeConditionally() {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const timestamp = new Date();
    const row = table.row('phone#4c410523#20190501');
    const filter = [
      {
        column: 'os_build',
        value: {
          start: 'PQ2A',
          end: 'PQ2A',
        },
      },
    ];

    const config = {
      onMatch: [
        {
          method: 'insert',
          data: {
            stats_summary: {
              os_name: 'android',
              timestamp,
            },
          },
        },
      ],
    };

    await row.filter(filter, config);

    console.log("Successfully updated row's os_name");
  }

  writeConditionally();
  // [END bigtable_writes_conditional]
}

main(...process.argv.slice(2));
