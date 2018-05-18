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

// The name of the Cloud Bigtable instance
const instanceName = 'my-bigtable-instance';
// The name of the Cloud Bigtable table
const tableName = 'my-table';

(async () => {
  try {
    // Creates a Bigtable client
    const bigtable = new Bigtable();

    // Connect to an existing instance:my-bigtable-instance
    const instance = bigtable.instance(instanceName);

    // Connect to an existing table:my-table
    const table = instance.table(tableName);

    //Read a row from my-table using a row key
    let [singleRow] = await table.row('r1').get();

    // Print the row key and data (column value, labels, timestamp)
    console.log(`Row key: ${singleRow.id}\nData: ${JSON.stringify(singleRow.data, null, 4)}`);

  } catch (err) {
    // Handle error performing the read operation
    console.err(`Error reading row r1: ${err}`);
  }
})();
// [END bigtable_quickstart]
