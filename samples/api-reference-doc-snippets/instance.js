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
  createInstance: async (instanceId, clusterId) => {
    // [START bigtable_api_create_instance]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const options = {
      parent: `projects/${projectId}`,
      instanceId: instanceId,
      instance: {
        displayName: instanceId,
        labels: {},
        type: 'DEVELOPMENT',
      },
      clusters: {
        [clusterId]: {
          location: `projects/${projectId}/locations/us-central1-f`,
          serveNodes: 1,
          defaultStorageType: 'HDD',
        },
      },
    };

    // creates a new Instance
    const [newInstance, operation] = await instanceAdminClient.createInstance(options);
    // let operations = result[1];
    // let apiResponse = result[2];
  })
  .catch(err => {
    // Handle the error.
  });
    // [END bigtable_api_create_instance]
  },

  createCluster: async (instanceId, clusterId) => {
    // [START bigtable_api_create_cluster]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const options = {
      parent: instanceAdminClient.instancePath(projectId, instanceId),
      clusterId: clusterId,
      cluster: {
        location: `projects/${projectId}/locations/us-central1-b`,
        serveNodes: 1,
        defaultStorageType: 'HDD',
      },
    };
    instanceAdminClient
      .createCluster(options)
      .then(result => {
        const newCluster = result[0];
        // const operations = result[1];
        // const apiResponse = result[2];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_cluster]
  },

  createAppProfile: async (instanceId, clusterId, appProfileId, callback) => {
    // [START bigtable_api_create_app_profile]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const appProfile = {
      name: instanceAdminClient.appProfilePath(
        projectId,
        instanceId,
        appProfileId
      ),
      multiClusterRoutingUseAny: {},
    };

    const request = {
      parent: instanceAdminClient.instancePath(projectId, instanceId),
      appProfileId: appProfileId,
      appProfile: appProfile,
    };

    instanceAdminClient.createAppProfile(request, (err, appProfile) => {
      if (err) {
        // Handle the error.
        return callback(err);
      }
      return callback(appProfile);
    });
    // [END bigtable_api_create_app_profile]
  },

  createTable: async (instanceId, tableId) => {
    // [START bigtable_api_create_table]
    const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();

    const request = {
      parent: adminClient.instancePath(projectId, instanceId),
      tableId: tableId,
      table: {
        columnFamilies: {
          follows: {},
        },
      },
    };

    // You can also specify garbage collection rules for your column families.
    // See {@link Table#createFamily} for more information about
    // column families and garbage collection rules.
    //-
    // const request = {
    //   parent: instance.name,
    //   tableId: tableId,
    //   table: {
    //     columnFamilies: {
    //       follows: {
    //         gcRule: {
    //           union: {
    //             rules: [
    //               {
    //                 maxAge: {
    //                   seconds: 0,
    //                   nanos: 5000,
    //                 },
    //               },
    //               {
    //                 maxNumVersions: 3,
    //               },
    //             ],
    //           },
    //         },
    //       },
    //     },
    //   },
    // };

    adminClient
      .createTable(request)
      .then(result => {
        const newTable = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_table]
  },

  existsInstance: async (instanceId) => {
    // [START bigtable_api_exists_instance]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: instanceAdminClient.instancePath(projectId, instanceId),
    };

    try {
      await instanceAdminClient.getInstance(request);
      console.log('Instance exists.');
    } catch (err) {
      if (err.code === 5) {
        console.log('Instance does not exist.');
      } else {
        // Handle the error.
        console.error(err);
      }
    }
    // [END bigtable_api_exists_instance]
  },

  getInstance: async instanceId => {
    // [START bigtable_api_get_instance]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: instanceAdminClient.instancePath(projectId, instanceId),
    };

    instanceAdminClient
      .getInstance(request)
      .then(result => {
        const instance = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_instance]
  },

  getClusters: async instanceId => {
    // [START bigtable_api_get_clusters]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      parent: instanceAdminClient.instancePath(projectId, instanceId),
    };

    instanceAdminClient
      .listClusters(request)
      .then(result => {
        const clusters = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_clusters]
  },

  getIamPolicy: async instanceId => {
    // [START bigtable_api_get_instance_Iam_policy]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      resource: instanceAdminClient.instancePath(projectId, instanceId),
    };

    instanceAdminClient
      .getIamPolicy(request)
      .then(result => {
        const policy = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_instance_Iam_policy]
  },

  setIamPolicy: async instanceId => {
    // [START bigtable_api_set_instance_Iam_policy]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const policy = {
      bindings: [
        {
          role: 'roles/bigtable.viewer',
          members: ['user:mike@example.com', 'group:admins@example.com'],
        },
      ],
    };

    const request = {
      resource: instanceAdminClient.instancePath(projectId, instanceId),
      policy: policy,
    };

    instanceAdminClient
      .setIamPolicy(request)
      .then(result => {
        const setPolicy = result[0];
      })
      .catch(err => {
        // Handle the error
      });
    // [END bigtable_api_set_instance_Iam_policy]
  },

  testIamPermissions: async instanceId => {
    // [START bigtable_api_test_instance_Iam_permissions]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      resource: instanceAdminClient.instancePath(projectId, instanceId),
      permissions: ['bigtable.tables.get', 'bigtable.tables.readRows'],
    };

    instanceAdminClient
      .testIamPermissions(request)
      .then(result => {
        const grantedPermissions = result[0];
      })
      .catch(err => {
        // Handle the error
      });
    // [END bigtable_api_test_instance_Iam_permissions]
  },

  getAppProfiles: async instanceId => {
    // [START bigtable_api_get_app_profiles]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      parent: instanceAdminClient.instancePath(projectId, instanceId),
    };

    instanceAdminClient
      .listAppProfiles(request)
      .then(result => {
        const appProfiles = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_app_profiles]
  },

  getMetadata: async instanceId => {
    // [START bigtable_api_get_instance_metadata]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: instanceAdminClient.instancePath(projectId, instanceId),
    };

    instanceAdminClient
      .getInstance(request)
      .then(result => {
        const metaData = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_instance_metadata]
  },

  getTables: async instanceId => {
    // [START bigtable_api_get_tables]
    const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
    const tableAdminClient = new BigtableTableAdminClient();
    const projectId = await tableAdminClient.getProjectId();

    // To control how many API requests are made and page through the results
    // manually, set `autoPaginate` to false.
    const options = {
      parent: tableAdminClient.instancePath(projectId, instanceId),
      autoPaginate: false,
    };
    // const options = {
    //   autoPaginate: true
    // };

    tableAdminClient
      .listTables(options)
      .then(result => {
        const tables = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_tables]
  },

  updateInstance: async instanceId => {
    // [START bigtable_api_set_meta_data]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      instance: {
        name: instanceAdminClient.instancePath(projectId, instanceId),
        displayName: 'updated-name',
      },
      updateMask: {
        paths: ['display_name'],
      },
    };

    instanceAdminClient
      .partialUpdateInstance(request)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_set_meta_data]
  },

  delInstance: async instanceId => {
    // [START bigtable_api_del_instance]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const request = {
      name: instanceAdminClient.instancePath(projectId, instanceId),
    };

    instanceAdminClient
      .deleteInstance(request)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_del_instance]
  },

  executeQuery: async (instanceId, tableId) => {
    // [START bigtable_api_execute_query]
    const {Bigtable} = require('@google-cloud/bigtable').v2;
    const bigtableClient = new Bigtable();
    const projectId = await bigtableClient.getProjectId();

    const query = `SELECT
                    _key
                  from \`${tableId}\` WHERE _key=@row_key`;
    const request = {
      instanceName: bigtableClient.instancePath(projectId, instanceId),
      query,
      params: {
        fields: {
          row_key: {
            stringValue: 'alincoln',
          },
        },
      },
    };

    bigtableClient
      .executeQuery(request)
      .then(result => {
        const rows = result[0];
      })
      .catch(err => {
        // Handle errors
      });

    // [END bigtable_api_execute_query]
  },

  createExecuteQueryStream: async (instanceId, tableId) => {
    // [START bigtable_api_create_query_stream]
    const {Bigtable} = require('@google-cloud/bigtable').v2;
    const bigtableClient = new Bigtable();
    const projectId = await bigtableClient.getProjectId();

    const query = `SELECT
                    _key
                  from \`${tableId}\` WHERE _key=@row_key`;
    const request = {
      instanceName: bigtableClient.instancePath(projectId, instanceId),
      query,
      params: {
        fields: {
          row_key: {
            stringValue: 'alincoln',
          },
        },
      },
    };
    bigtableClient
      .executeQueryStream(request)
      .on('error', err => {
        // Handle the error.
      })
      .on('data', row => {
        // `row` is a QueryResultRow object.
      })
      .on('end', () => {
        // All rows retrieved.
      });

    // If you anticipate many results, you can end a stream early to prevent
    // unnecessary processing.
    //-
    // instance
    //   .createExecuteQueryStream(options)
    //   .on('data', function (row) {
    //     this.end();
    //   });

    // [END bigtable_api_create_query_stream]
  },
};

module.exports = snippets;
