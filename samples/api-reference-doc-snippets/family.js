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

const snippets = {
  createColmFamily: async (instanceId, tableId, familyId) => {
    // [START bigtable_api_create_family]
    const {BigtableTableAdminClient, GCRuleMaker} =
      require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
      modifications: [
        {
          id: familyId,
          create: {},
        },
      ],
    };

    adminClient
      .modifyColumnFamilies(request)
      .then(result => {
        const family = result[0];
        // let apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_family]
  },
  existsFamily: async (instanceId, tableId, familyId) => {
    // [START bigtable_api_exists_family]
    const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
      view: 'FAMILY_VIEW_BASIC',
    };

    try {
      const [table] = await adminClient.getTable(request);
      const exists = Object.prototype.hasOwnProperty.call(
        table.columnFamilies,
        familyId,
      );
      console.log(`Family ${familyId} exists: ${exists}`);
    } catch (err) {
      // Handle the error.
      console.error(err);
    }
    // [END bigtable_api_exists_family]
  },
  getFamily: async (instanceId, tableId, familyId) => {
    // [START bigtable_api_get_family]
    const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
      view: 'FULL',
    };

    adminClient
      .getTable(request)
      .then(result => {
        const table = result[0];
        const family = table.columnFamilies[familyId];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_family]
  },
  getMetadata: async (instanceId, tableId, familyId) => {
    // [START bigtable_api_get_family_meta]
    const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
      view: 'FULL',
    };

    adminClient
      .getTable(request)
      .then(result => {
        const table = result[0];
        const metaData = table.columnFamilies[familyId];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_family_meta]
  },
  setMetadata: async (instanceId, tableId, familyId) => {
    // [START bigtable_api_set_family_meta]
    const {BigtableTableAdminClient, GCRuleMaker} =
      require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();

    const rule = {
      versions: 2,
      union: true,
    };

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
      modifications: [
        {
          id: familyId,
          update: {
            gcRule: GCRuleMaker.makeRule(rule),
          },
        },
      ],
    };

    adminClient
      .modifyColumnFamilies(request)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_set_family_meta]
  },
  delFamily: async (instanceId, tableId, familyId) => {
    // [START bigtable_api_del_family]
    const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/tables/${tableId}`,
      modifications: [
        {
          id: familyId,
          drop: true,
        },
      ],
    };

    adminClient
      .modifyColumnFamilies(request)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_del_family]
  },
};

module.exports = snippets;
