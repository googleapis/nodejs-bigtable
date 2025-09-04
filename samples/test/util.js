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

const uuid = require('uuid');
const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const instanceAdminClient = new BigtableInstanceAdminClient();
let instance;

let obtainPromise;

// Get a unique ID to use for test resources.
function generateId() {
  return `${PREFIX}-${uuid.v4()}`.substr(0, 30);
}

/**
 * Get instances created more than one hour ago.
 */
async function getStaleInstances() {
  const [instances] = await instanceAdminClient.listInstances();
  return instances
    .filter(i => i.id.match(PREFIX))
    .filter(i => {
      const timeCreated = i.metadata.labels.time_created;
      // Only delete stale resources.
      const oneHourAgo = new Date(Date.now() - 3600000);
      return !timeCreated || timeCreated <= oneHourAgo;
    });
}

/**
 * Only create a single cluster and instance, but let multiple tests await
 * the result.
 */
async function obtainTestInstance() {
  // Note: This function should only be called inside a `before` or `it` block.
  // Note: Otherwise it will try to create an instance more than once.
  if (!obtainPromise) {
    obtainPromise = createTestInstance();
  }
  return obtainPromise;
}

/**
 * Create a testing cluster and the corresponding instance.
 */
async function createTestInstance() {
  const projectId = await instanceAdminClient.getProjectId();
  const request = {
    parent: instanceAdminClient.projectPath(projectId),
    instanceId: instanceId,
    instance: {
      displayName: instanceId,
      labels: {
        time_created: Date.now(),
      },
    },
    clusters: {
      [clusterId]: {
        location: instanceAdminClient.locationPath(projectId, 'us-central1-c'),
        serveNodes: 1,
        defaultStorageType: 'HDD',
      },
    },
  };
  const [, operation] = await instanceAdminClient.createInstance(request);
  await operation.promise();
  return instanceAdminClient.getInstance({
    name: instanceAdminClient.instancePath(projectId, instanceId),
  });
}

/**
 * Delete the instance in a global hook.
 */
after(async () => {
  const projectId = await instanceAdminClient.getProjectId();
  const instancePath = instanceAdminClient.instancePath(projectId, instanceId);
  await instanceAdminClient.deleteInstance({name: instancePath});
});

module.exports = {generateId, getStaleInstances, obtainTestInstance};
