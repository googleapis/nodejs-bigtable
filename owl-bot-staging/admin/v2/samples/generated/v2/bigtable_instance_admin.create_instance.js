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

function main(parent, instanceId, instance, clusters) {
  // [START bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateInstance_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the project in which to create the new instance.
   *  Values are of the form `projects/{project}`.
   */
  // const parent = 'abc123'
  /**
   *  Required. The ID to be used when referring to the new instance within its project,
   *  e.g., just `myinstance` rather than
   *  `projects/myproject/instances/myinstance`.
   */
  // const instanceId = 'abc123'
  /**
   *  Required. The instance to create.
   *  Fields marked `OutputOnly` must be left blank.
   */
  // const instance = ''
  /**
   *  Required. The clusters to be created within the instance, mapped by desired
   *  cluster ID, e.g., just `mycluster` rather than
   *  `projects/myproject/instances/myinstance/clusters/mycluster`.
   *  Fields marked `OutputOnly` must be left blank.
   *  Currently, at most four clusters can be specified.
   */
  // const clusters = 1234

  // Imports the Admin library
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableInstanceAdminClient();

  async function createInstance() {
    // Construct request
    const request = {
      parent,
      instanceId,
      instance,
      clusters,
    };

    // Run request
    const [operation] = await adminClient.createInstance(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  createInstance();
  // [END bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateInstance_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
