/**
 * Copyright 2018, Google LLC
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

// [START bigtable_quickstart]
// Imports the Google Cloud client library
const Bigtable = require('@google-cloud/bigtable');

// The ID of the Cloud Bigtable instance
const INSTANCE_ID = 'my-bigtable-instance';
// The ID of the Cloud Bigtable table
const TABLE_ID = 'my-table';
const PROJECT_ID = process.env.PROJECT_ID;

if (!PROJECT_ID) {
  throw new Error('Environment variables PROJECT_ID must be set!');
}

(async () => {
  try {
    var bigtableOptions = {
      projectId: PROJECT_ID,
    }

    const bigtable = Bigtable(bigtableOptions);
    // Creates a Bigtable client
    //const bigtable = new Bigtable(bigtableOptions);

    // Connect to an existing instance:my-bigtable-instance
    const instance = bigtable.instance(INSTANCE_ID);

    // Connect to an existing table:my-table
    const table = instance.table(TABLE_ID);

    // Read a row from my-table using a row key
    let [singleRow] = await table.row('r1').get();

    // Print the row key and data (column value, labels, timestamp)
    console.log(
      `Row key: ${singleRow.id}\nData: ${JSON.stringify(
        singleRow.data,
        null,
        4
      )}`
    );
  } catch (err) {
    // Handle error performing the read operation
    console.error(`Error reading row r1:`, err);
  }
})();
// [END bigtable_quickstart]
