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
  // [START admin_list_app_profiles_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the instance for which a list of app profiles is
   *  requested. Values are of the form
   *  `projects/{project}/instances/{instance}`.
   *  Use `{instance} = '-'` to list AppProfiles for all Instances in a project,
   *  e.g., `projects/myproject/instances/-`.
   */
  // const parent = 'abc123'
  /**
   *  Maximum number of results per page.
   *  A page_size of zero lets the server choose the number of items to return.
   *  A page_size which is strictly positive will return at most that many items.
   *  A negative page_size will cause an error.
   *  Following the first request, subsequent paginated calls are not required
   *  to pass a page_size. If a page_size is set in subsequent calls, it must
   *  match the page_size given in the first request.
   */
  // const pageSize = 1234
  /**
   *  The value of `next_page_token` returned by a previous call.
   */
  // const pageToken = 'abc123'

  // Imports the Admin library
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableInstanceAdminClient();

  async function listAppProfiles() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const iterable = await adminClient.listAppProfilesAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  listAppProfiles();
  // [END admin_list_app_profiles_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
