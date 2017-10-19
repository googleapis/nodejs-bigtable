/**
 * Copyright 2017, Google, Inc.
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

// Your Google Cloud Platform project ID
const projectId = 'YOUR_PROJECT_ID';

// Instantiates a client
const bigtable = new Bigtable({
  projectId: projectId,
});

const instance = bigtable.instance('my-instance');
const table = instance.table('prezzy');

// Get the rows from your table.
table.getRows(function(err, rows) {
  if (err) {
    // Error handling omitted.
  }

  console.log(rows);
});
// [END bigtable_quickstart]
