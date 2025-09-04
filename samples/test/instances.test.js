// Copyright 2018 Google LLC
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

const {assert} = require('chai');
const {describe, it, before, after} = require('mocha');
const uuid = require('uuid');
const {execSync} = require('child_process');

const exec = cmd => execSync(cmd, {encoding: 'utf8'});

const clusterId = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const instanceId = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules

describe('instances', () => {
  before(async () => {
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();
    const request = {
      parent: instanceAdminClient.projectPath(projectId),
      instanceId: instanceId,
      instance: {
        displayName: instanceId,
        labels: {},
        type: 'PRODUCTION',
      },
      clusters: {
        [clusterId]: {
          location: instanceAdminClient.locationPath(
            projectId,
            'us-central1-c',
          ),
          serveNodes: 3,
          defaultStorageType: 'SSD',
        },
      },
    };
    const [, operation] = await instanceAdminClient.createInstance(request);
    await operation.promise();
  });

  after(async () => {
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();
    const instancePath = instanceAdminClient.instancePath(
      projectId,
      instanceId,
    );
    await instanceAdminClient.deleteInstance({name: instancePath});
  });

  it('should list zones', () => {
    const output = exec(
      `node instances.js run --instance ${instanceId} --cluster ${clusterId}`,
    );
    assert.include(output, 'Instances:');
    assert.include(output, instanceId);
  });
});
