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

function listInstances() {
  // [START bigtable_list_instances]
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // Lists all instances in the current project
  bigtable
    .getInstances()
    .then(results => {
      const instances = results[0];
      console.log('Instances:');
      instances.forEach(instance => console.log(instance.id));
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END bigtable_list_instances]
}

require(`yargs`)
  .demand(1)
  .command(
    `list`,
    `Lists all instances in the current project.`,
    {},
    listInstances
  )
  .example(`node $0 list`, `Lists all instances in the current project.`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/bigtable/docs`)
  .help()
  .strict().argv;
