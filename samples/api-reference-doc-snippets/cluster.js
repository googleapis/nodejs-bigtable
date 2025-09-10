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
  create: async (instanceId, clusterId) => {
    // [START bigtable_api_create_cluster]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      parent: instanceAdminClient.instancePath(projectId, instanceId),
      clusterId: clusterId,
      cluster: {
        location: `projects/${projectId}/locations/us-central1-f`,
        serveNodes: 1,
        defaultStorageType: 'HDD',
      },
    };

    instanceAdminClient
      .createCluster(request)
      .then(result => {
        const cluster = result[0];
        const operation = result[1];
        const apiResponse = result[2];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_cluster]
  },

  delete: async (instanceId, clusterId) => {
    // [START bigtable_api_delete_cluster]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
    };

    instanceAdminClient
      .deleteCluster(request)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_delete_cluster]
  },

  exists: async (instanceId, clusterId) => {
    // [START bigtable_api_exists_cluster]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
    };

    try {
      await instanceAdminClient.getCluster(request);
      console.log('Cluster exists.');
    } catch (err) {
      if (err.code === 5) {
        console.log('Cluster does not exist.');
      } else {
        // Handle the error.
        console.error(err);
      }
    }
    // [END bigtable_api_exists_cluster]
  },

  get: async (instanceId, clusterId) => {
    // [START bigtable_api_get_cluster]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
    };

    instanceAdminClient
      .getCluster(request)
      .then(result => {
        const cluster = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_cluster]
  },

  getMeta: async (instanceId, clusterId) => {
    // [START bigtable_api_cluster_get_meta]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
    };

    instanceAdminClient
      .getCluster(request)
      .then(result => {
        const metadata = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_cluster_get_meta]
  },

  setMeta: async (instanceId, clusterId) => {
    // [START bigtable_api_cluster_set_meta]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const cluster = {
      name: `projects/${projectId}/instances/${instanceId}/clusters/${clusterId}`,
      serveNodes: 4,
    };

    const request = {
      cluster: cluster,
      updateMask: {
        paths: ['serve_nodes'],
      },
    };

    instanceAdminClient
      .updateCluster(request)
      .then(result => {
        const operation = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_cluster_set_meta]
  },
};

module.exports = snippets;
