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

const uuid = require('uuid');
const {describe, it, before, after} = require('mocha');

const INSTANCE_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const CLUSTER_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const TABLE_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const FAMILY_ID = `sample-family-${uuid.v4()}`.substr(0, 10); // Bigtable naming rules

const familySnippets = require('./family.js');

describe.skip('Family Snippets', () => {
  before(async () => {
    try {
      const {BigtableInstanceAdminClient} =
        require('@google-cloud/bigtable').v2;
      const instanceAdminClient = new BigtableInstanceAdminClient();
      const projectId = await instanceAdminClient.getProjectId();
      const request = {
        parent: `projects/${projectId}`,
        instanceId: INSTANCE_ID,
        instance: {
          displayName: INSTANCE_ID,
          labels: {},
          type: 'DEVELOPMENT',
        },
        clusters: {
          [CLUSTER_ID]: {
            location: `projects/${projectId}/locations/us-central1-f`,
            serveNodes: 1,
            defaultStorageType: 'HDD',
          },
        },
      };
      const [, operation] = await instanceAdminClient.createInstance(request);
      await operation.promise();
      const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
      const adminClient = new BigtableTableAdminClient();
      const tableRequest = {
        parent: `projects/${projectId}/instances/${INSTANCE_ID}`,
        tableId: TABLE_ID,
        table: {
          columnFamilies: {
            [FAMILY_ID]: {},
          },
        },
      };
      await adminClient.createTable(tableRequest);
    } catch (err) {
      //
    }
  });

  after(async () => {
    try {
      const {BigtableInstanceAdminClient} =
        require('@google-cloud/bigtable').v2;
      const instanceAdminClient = new BigtableInstanceAdminClient();
      const projectId = await instanceAdminClient.getProjectId();
      const instancePath = instanceAdminClient.instancePath(
        projectId,
        INSTANCE_ID,
      );
      await instanceAdminClient.deleteInstance({name: instancePath});
    } catch (err) {
      // Handle the error.
    }
  });

  it('should create a column family', () => {
    familySnippets.createColmFamily(INSTANCE_ID, TABLE_ID, FAMILY_ID);
  });

  it('should check family exists', () => {
    familySnippets.existsFamily(INSTANCE_ID, TABLE_ID, FAMILY_ID);
  });

  it('should get the family', () => {
    familySnippets.getFamily(INSTANCE_ID, TABLE_ID, FAMILY_ID);
  });

  it('should get family metadata', () => {
    familySnippets.getMetadata(INSTANCE_ID, TABLE_ID, FAMILY_ID);
  });

  it('should set family metadata', () => {
    familySnippets.setMetadata(INSTANCE_ID, TABLE_ID, FAMILY_ID);
  });

  it('should delete family', () => {
    familySnippets.delFamily(INSTANCE_ID, TABLE_ID, FAMILY_ID);
  });
});
