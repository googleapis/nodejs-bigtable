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

function main(name, state, serveNodes, encryptionConfig) {
  // [START admin_v2_generated_BigtableInstanceAdmin_UpdateCluster_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  The unique name of the cluster. Values are of the form
   *  `projects/{project}/instances/{instance}/clusters/[a-z][-a-z0-9]*`.
   */
  // const name = 'abc123'
  /**
   *  (`CreationOnly`)
   *  The location where this cluster's nodes and storage reside. For best
   *  performance, clients should be located as close as possible to this
   *  cluster. Currently only zones are supported, so values should be of the
   *  form `projects/{project}/locations/{zone}`.
   */
  // const location = 'abc123'
  /**
   *  The current state of the cluster.
   */
  // const state = ''
  /**
   *  Required. The number of nodes allocated to this cluster. More nodes enable
   *  higher throughput and more consistent performance.
   */
  // const serveNodes = 1234
  /**
   *  (`CreationOnly`)
   *  The type of storage used by this cluster to serve its
   *  parent instance's tables, unless explicitly overridden.
   */
  // const defaultStorageType = ''
  /**
   *  Immutable. The encryption configuration for CMEK-protected clusters.
   */
  // const encryptionConfig = ''

  // Imports the Admin library
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableInstanceAdminClient();

  async function updateCluster() {
    // Construct request
    const request = {
      name,
      state,
      serveNodes,
      encryptionConfig,
    };

    // Run request
    const [operation] = await adminClient.updateCluster(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  updateCluster();
  // [END admin_v2_generated_BigtableInstanceAdmin_UpdateCluster_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
