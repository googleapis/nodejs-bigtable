// Copyright 2021 Google LLC
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

function main(name, displayName) {
  // [START admin_update_instance_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  The unique name of the instance. Values are of the form
   *  `projects/{project}/instances/[a-z][a-z0-9\\-]+[a-z0-9]`.
   */
  // const name = 'abc123'
  /**
   *  Required. The descriptive name for this instance as it appears in UIs.
   *  Can be changed at any time, but should be kept globally unique
   *  to avoid confusion.
   */
  // const displayName = 'abc123'
  /**
   *  (`OutputOnly`)
   *  The current state of the instance.
   */
  // const state = ''
  /**
   *  The type of the instance. Defaults to `PRODUCTION`.
   */
  // const type = ''
  /**
   *  Labels are a flexible and lightweight mechanism for organizing cloud
   *  resources into groups that reflect a customer's organizational needs and
   *  deployment strategies. They can be used to filter resources and aggregate
   *  metrics.
   *  * Label keys must be between 1 and 63 characters long and must conform to
   *    the regular expression: `[\p{Ll}\p{Lo}][\p{Ll}\p{Lo}\p{N}_-]{0,62}`.
   *  * Label values must be between 0 and 63 characters long and must conform to
   *    the regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`.
   *  * No more than 64 labels can be associated with a given resource.
   *  * Keys and values must both be under 128 bytes.
   */
  // const labels = 1234

  // Imports the Admin library
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableInstanceAdminClient();

  async function updateInstance() {
    // Construct request
    const request = {
      name,
      displayName,
    };

    // Run request
    const response = await adminClient.updateInstance(request);
    console.log(response);
  }

  updateInstance();
  // [END admin_update_instance_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
