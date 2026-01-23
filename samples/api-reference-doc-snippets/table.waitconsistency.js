// Copyright 2026 Google LLC
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

async function main(
  instanceId = 'YOUR_INSTANCE_ID',
  tableId = 'YOUR_TABLE_ID',
) {
  // [START bigtable_api_consistency]
  const {TableAdminClient} = require('@google-cloud/bigtable').admin;

  async function waitForConsistency() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';

    const adminClient = new TableAdminClient();
    const projectId = await adminClient.getProjectId();

    // Wait for a table within an instance to become consistent.
    console.log('Waiting for table consistency...');
    await adminClient.waitForConsistency(
      `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
    );

    // Wait for a table within an instance to become consistent,
    // using a pre-existing token.
    const [token] = await adminClient.generateConsistencyToken({
      name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
    });

    console.log('Waiting for table consistency...');
    await adminClient.waitForConsistency(
      `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
      token.consistencyToken,
    );
  }

  await waitForConsistency();
  // [END bigtable_api_consistency]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
