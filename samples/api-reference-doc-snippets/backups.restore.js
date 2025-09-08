// Copyright 2020 Google LLC
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

const {promisify} = require('util');
const sleep = promisify(setTimeout);

/**
 * Waits for a Long Running Operation to complete by polling its status.
 * @param {LROsClient} operationsClient The GAPIC Long Running Operations client.
 * @param {string} operationName The full name of the operation.
 * @param {number} [pollIntervalMs=5000] Interval between poll attempts in milliseconds.
 * @param {number} [timeoutMs=300000] Maximum time to wait in milliseconds.
 * @returns {Promise<google.longrunning.Operation>} The completed operation object.
 */
async function waitForOperation(
  operationsClient,
  operationName,
  pollIntervalMs = 5000,
  timeoutMs = 300000,
) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    const [operation] = await operationsClient.getOperation({
      name: operationName,
    });

    if (operation.done) {
      if (operation.error) {
        const error = new Error(operation.error.message || 'Operation failed');
        error.code = operation.error.code;
        error.details = operation.error.details;
        throw error;
      }
      return operation;
    }

    await sleep(pollIntervalMs);
  }

  throw new Error(
    `Operation ${operationName} timed out after ${timeoutMs} ms.`,
  );
}

async function main(
  instanceId = 'YOUR_INSTANCE_ID',
  tableId = 'YOUR_TABLE_ID',
  clusterId = 'YOUR_CLUSTER_ID',
  backupId = 'YOUR_BACKUP_ID',
) {
  // [START bigtable_api_restore_backup]
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  async function restoreBackup() {
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const instanceId = 'YOUR_INSTANCE_ID';
    // const tableId = 'YOUR_TABLE_ID';
    // const clusterId = 'YOUR_CLUSTER_ID';
    // const backupId = 'YOUR_BACKUP_ID';

    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();

    // Restore a table to an instance.
    const [restoreLRO] = await adminClient.restoreTable({
      parent: adminClient.instancePath(projectId, instanceId),
      tableId,
      backup: adminClient.backupPath(
        projectId,
        instanceId,
        clusterId,
        backupId,
      ),
    });
    console.log('Waiting for restoreTable operation to complete...');
    const [table, metadata] = await restoreLRO.promise();
    console.log(`Table ${table.name} restored successfully.`);

    // Await the secondary optimize table operation
    const optimizeTableOperationName = metadata.optimizeTableOperationName;
    if (optimizeTableOperationName) {
      /*
      You can run this code to wait for the optimized restore table:
      console.log(
        `Waiting for optimize table operation: ${optimizeTableOperationName}`,
      );
      try {
        const completedOptimizeLRO = await waitForOperation(
          adminClient.operationsClient,
          optimizeTableOperationName,
        );
        console.log(
          `Optimized table operation ${completedOptimizeLRO.name} completed successfully.`,
        );
      } catch (err) {
        console.error(`Optimize table operation failed:`, err);
      }
       */
    } else {
      console.log('No optimize table operation name found in metadata.');
    }
  }

  await restoreBackup();
  // [END bigtable_api_restore_backup]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
