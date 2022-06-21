// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

exports[
  'Bigtable/Instance createCluster should provide the proper request options asynchronously 1'
] = {
  input: {
    id: 'my-cluster',
    options: {
      nodes: 2,
      location: 'us-central1-b',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'createCluster',
      reqOpts: {
        parent: 'projects/my-project/instances/my-instance',
        clusterId: 'my-cluster',
        cluster: {
          location: 'projects/my-project/locations/us-central1-b',
          serveNodes: 2,
        },
      },
    },
  },
};

exports[
  'Bigtable/Instance createCluster should provide the proper request options asynchronously 2'
] = {
  input: {
    id: 'my-cluster',
    options: {
      nodes: 2,
      storage: 'ssd',
      location: 'us-central1-b',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'createCluster',
      reqOpts: {
        parent: 'projects/my-project/instances/my-instance',
        clusterId: 'my-cluster',
        cluster: {
          location: 'projects/my-project/locations/us-central1-b',
          serveNodes: 2,
          defaultStorageType: 1,
        },
      },
    },
  },
};

exports[
  'Bigtable/Instance createCluster should provide the proper request options asynchronously 3'
] = {
  input: {
    id: 'my-cluster',
    options: {
      nodes: 2,
      key: 'kms-key-name',
      location: 'us-central1-b',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'createCluster',
      reqOpts: {
        parent: 'projects/my-project/instances/my-instance',
        clusterId: 'my-cluster',
        cluster: {
          location: 'projects/my-project/locations/us-central1-b',
          serveNodes: 2,
          encryptionConfig: {
            kmsKeyName: 'kms-key-name',
          },
        },
      },
    },
  },
};

exports[
  'Bigtable/Instance createCluster should provide the proper request options asynchronously 4'
] = {
  input: {
    id: 'my-cluster',
    options: {
      nodes: 2,
      encryption: {
        kmsKeyName: 'kms-key-name',
      },
      location: 'us-central1-b',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'createCluster',
      reqOpts: {
        parent: 'projects/my-project/instances/my-instance',
        clusterId: 'my-cluster',
        cluster: {
          location: 'projects/my-project/locations/us-central1-b',
          serveNodes: 2,
          encryptionConfig: {
            kmsKeyName: 'kms-key-name',
          },
        },
      },
    },
  },
};

exports[
  'Bigtable/Instance createCluster should provide the proper request options asynchronously 5'
] = {
  input: {
    id: 'my-cluster',
    options: {
      minServeNodes: 2,
      maxServeNodes: 3,
      cpuUtilizationPercent: 50,
      location: 'us-central1-b',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'createCluster',
      reqOpts: {
        parent: 'projects/my-project/instances/my-instance',
        clusterId: 'my-cluster',
        cluster: {
          location: 'projects/my-project/locations/us-central1-b',
          clusterConfig: {
            clusterAutoscalingConfig: {
              autoscalingTargets: {
                cpuUtilizationPercent: 50,
              },
              autoscalingLimits: {
                minServeNodes: 2,
                maxServeNodes: 3,
              },
            },
          },
        },
      },
    },
  },
};
