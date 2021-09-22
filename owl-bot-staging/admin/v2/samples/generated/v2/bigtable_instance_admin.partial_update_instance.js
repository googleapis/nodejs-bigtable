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

function main(instance, updateMask) {
  // [START admin_partial_update_instance_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The Instance which will (partially) replace the current value.
   */
  // const instance = ''
  /**
   *  Required. The subset of Instance fields which should be replaced.
   *  Must be explicitly set.
   */
  // const updateMask = ''

  // Imports the Admin library
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableInstanceAdminClient();

  async function partialUpdateInstance() {
    // Construct request
    const request = {
      instance,
      updateMask,
    };

    // Run request
    const [operation] = await adminClient.partialUpdateInstance(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  partialUpdateInstance();
  // [END admin_partial_update_instance_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
