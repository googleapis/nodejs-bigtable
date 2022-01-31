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

function main(name, displayName, createTime) {
  // [START bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateInstance_async]
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
  // const state = {}
  /**
   *  The type of the instance. Defaults to `PRODUCTION`.
   */
  // const type = {}
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
  /**
   *  Output only. A server-assigned timestamp representing when this Instance was created.
   *  For instances created before this field was added (August 2021), this value
   *  is `seconds: 0, nanos: 1`.
   */
  // const createTime = {}

  // Imports the Admin library
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableInstanceAdminClient();

  async function callUpdateInstance() {
    // Construct request
    const request = {
      name,
      displayName,
      createTime,
    };

    // Run request
    const response = await adminClient.updateInstance(request);
    console.log(response);
  }

  callUpdateInstance();
  // [END bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateInstance_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
