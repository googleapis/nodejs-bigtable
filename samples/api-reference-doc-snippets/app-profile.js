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
  create: async (instanceId, appProfileId) => {
    // [START bigtable_api_create_app_profile]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const appProfile = {
      name: instanceAdminClient.appProfilePath(
        projectId,
        instanceId,
        appProfileId,
      ),
      multiClusterRoutingUseAny: {},
    };

    const request = {
      parent: `projects/${projectId}/instances/${instanceId}`,
      appProfileId: appProfileId,
      appProfile: appProfile,
    };

    instanceAdminClient
      .createAppProfile(request)
      .then(result => {
        const appProfile = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_app_profile]
  },

  delete: async (instanceId, appProfileId) => {
    // [START bigtable_api_delete_app_profile]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: instanceAdminClient.appProfilePath(
        projectId,
        instanceId,
        appProfileId,
      ),
    };

    instanceAdminClient
      .deleteAppProfile(request)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_delete_app_profile]
  },

  exists: async (instanceId, appProfileId) => {
    // [START bigtable_api_exists_app_profile]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: instanceAdminClient.appProfilePath(
        projectId,
        instanceId,
        appProfileId,
      ),
    };

    try {
      await instanceAdminClient.getAppProfile(request);
      console.log('App profile exists.');
    } catch (err) {
      if (err.code === 5) {
        console.log('App profile does not exist.');
      } else {
        // Handle the error.
        console.error(err);
      }
    }
    // [END bigtable_api_exists_app_profile]
  },

  get: async (instanceId, appProfileId) => {
    // [START bigtable_api_get_app_profile]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: instanceAdminClient.appProfilePath(
        projectId,
        instanceId,
        appProfileId,
      ),
    };

    instanceAdminClient
      .getAppProfile(request)
      .then(result => {
        const appProfile = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_app_profile]
  },

  getMeta: async (instanceId, appProfileId) => {
    // [START bigtable_api_app_profile_get_meta]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: instanceAdminClient.appProfilePath(
        projectId,
        instanceId,
        appProfileId,
      ),
    };

    instanceAdminClient
      .getAppProfile(request)
      .then(result => {
        const metadata = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_app_profile_get_meta]
  },

  setMeta: async (instanceId, appProfileId, clusterId) => {
    // [START bigtable_api_app_profile_set_meta]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const appProfile = {
      name: instanceAdminClient.appProfilePath(
        projectId,
        instanceId,
        appProfileId,
      ),
      description: 'My Updated App Profile',
      multiClusterRoutingUseAny: {},
    };

    const request = {
      appProfile: appProfile,
      updateMask: {
        paths: ['description', 'multi_cluster_routing_use_any'],
      },
    };

    instanceAdminClient
      .updateAppProfile(request)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_app_profile_set_meta]
  },
};

module.exports = snippets;
