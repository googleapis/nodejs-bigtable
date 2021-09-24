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

function main(parent) {
  // [START admin_v2_generated_BigtableInstanceAdmin_ListClusters_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the instance for which a list of clusters is requested.
   *  Values are of the form `projects/{project}/instances/{instance}`.
   *  Use `{instance} = '-'` to list Clusters for all Instances in a project,
   *  e.g., `projects/myproject/instances/-`.
   */
  // const parent = 'abc123'
  /**
   *  DEPRECATED: This field is unused and ignored.
   */
  // const pageToken = 'abc123'

  // Imports the Admin library
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableInstanceAdminClient();

  async function listClusters() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const response = await adminClient.listClusters(request);
    console.log(response);
  }

  listClusters();
  // [END admin_v2_generated_BigtableInstanceAdmin_ListClusters_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
