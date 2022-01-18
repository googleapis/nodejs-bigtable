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

function main(cluster, updateMask) {
  // [START bigtableadmin_v2_generated_BigtableInstanceAdmin_PartialUpdateCluster_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The Cluster which contains the partial updates to be applied, subject to
   *  the update_mask.
   */
  // const cluster = {}
  /**
   *  Required. The subset of Cluster fields which should be replaced.
   */
  // const updateMask = {}

  // Imports the Admin library
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableInstanceAdminClient();

  async function callPartialUpdateCluster() {
    // Construct request
    const request = {
      cluster,
      updateMask,
    };

    // Run request
    const [operation] = await adminClient.partialUpdateCluster(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callPartialUpdateCluster();
  // [END bigtableadmin_v2_generated_BigtableInstanceAdmin_PartialUpdateCluster_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
