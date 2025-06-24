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
  createInstance: (instanceId, clusterId) => {
    // [START bigtable_api_create_instance]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // options for a PRODUCTION Instance
    // const options = {
    //   clusters: [
    //     {
    //       id: clusterId,
    //       nodes: 3,
    //       location: 'us-central1-f',
    //       storage: 'ssd',
    //     },
    //   ],
    //   type: 'PRODUCTION', // Optional as default type is PRODUCTION
    // };

    // options for a DEVELOPMENT Instance
    const options = {
      clusters: [
        {
          id: clusterId,
          location: 'us-central1-f',
          storage: 'hdd',
        },
      ],
      type: 'DEVELOPMENT',
    };

    // creates a new Instance
    instance
      .create(options)
      .then(result => {
        const newInstance = result[0];
        // let operations = result[1];
        // let apiResponse = result[2];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_instance]
  },

  createCluster: (instanceId, clusterId) => {
    // [START bigtable_api_create_cluster]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // const options = {
    //   location: 'us-central1-b',
    //   nodes: 3,
    //   storage: 'ssd',
    // };
    const options = {
      location: 'us-central1-b',
      storage: 'hdd',
    };
    instance
      .createCluster(clusterId, options)
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

  createAppProfile: (instanceId, clusterId, appProfileId, callback) => {
    // [START bigtable_api_create_app_profile]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const cluster = instance.cluster(clusterId);

    const options = {
      routing: cluster,
      allowTransactionalWrites: true,
      ignoreWarnings: true,
    };

    instance.createAppProfile(appProfileId, options, (err, appProfile) => {
      if (err) {
        // Handle the error.
        return callback(err);
      }
      return callback(appProfile);
    });
    // [END bigtable_api_create_app_profile]
  },

  createTable: (instanceId, tableId) => {
    // [START bigtable_api_create_table]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const options = {
      families: ['follows'],
    };

    // You can also specify garbage collection rules for your column families.
    // See {@link Table#createFamily} for more information about
    // column families and garbage collection rules.
    //-
    // const options = {
    //   families: [
    //     {
    //       name: 'follows',
    //       rule:  {
    //         age: {
    //           seconds: 0,
    //           nanos: 5000
    //         },
    //         versions: 3,
    //         union: true
    //       }
    //     }
    //   ]
    // };

    instance
      .createTable(tableId, options)
      .then(result => {
        const newTable = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_table]
  },

  existsInstance: instanceId => {
    // [START bigtable_api_exists_instance]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    instance
      .exists()
      .then(result => {
        const exists = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_exists_instance]
  },

  getInstance: instanceId => {
    // [START bigtable_api_get_instance]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    instance
      .get()
      .then(result => {
        const instance = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_instance]
  },

  getClusters: instanceId => {
    // [START bigtable_api_get_clusters]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    instance
      .getClusters()
      .then(result => {
        const clusters = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_clusters]
  },

  getIamPolicy: instanceId => {
    // [START bigtable_api_get_instance_Iam_policy]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    instance
      .getIamPolicy()
      .then(result => {
        const policy = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_instance_Iam_policy]
  },

  setIamPolicy: instanceId => {
    // [START bigtable_api_set_instance_Iam_policy]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const policy = {
      bindings: [
        {
          role: 'roles/bigtable.viewer',
          members: ['user:mike@example.com', 'group:admins@example.com'],
        },
      ],
    };

    instance
      .setIamPolicy(policy)
      .then(result => {
        const setPolicy = result[0];
      })
      .catch(err => {
        // Handle the error
      });
    // [END bigtable_api_set_instance_Iam_policy]
  },

  testIamPermissions: instanceId => {
    // [START bigtable_api_test_instance_Iam_permissions]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const permissions = ['bigtable.tables.get', 'bigtable.tables.readRows'];
    instance
      .testIamPermissions(permissions)
      .then(result => {
        const grantedPermissions = result[0];
      })
      .catch(err => {
        // Handle the error
      });
    // [END bigtable_api_test_instance_Iam_permissions]
  },

  getAppProfiles: instanceId => {
    // [START bigtable_api_get_app_profiles]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    instance
      .getAppProfiles()
      .then(result => {
        const appProfiles = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_app_profiles]
  },

  getMetadata: instanceId => {
    // [START bigtable_api_get_instance_metadata]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    instance
      .getMetadata()
      .then(result => {
        const metaData = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_instance_metadata]
  },

  getTables: instanceId => {
    // [START bigtable_api_get_tables]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    // To control how many API requests are made and page through the results
    // manually, set `autoPaginate` to false.
    const options = {
      autoPaginate: false,
    };
    // const options = {
    //   autoPaginate: true
    // };

    instance
      .getTables(options)
      .then(result => {
        const tables = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_tables]
  },

  updateInstance: instanceId => {
    // [START bigtable_api_set_meta_data]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const metadata = {
      displayName: 'updated-name',
    };

    instance
      .setMetadata(metadata)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_set_meta_data]
  },

  delInstance: instanceId => {
    // [START bigtable_api_del_instance]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    instance
      .delete()
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_del_instance]
  },

  executeQuery: (instanceId, tableId) => {
    // [START bigtable_api_execute_query]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const query = `SELECT
                    _key
                  from \`${tableId}\` WHERE _key=@row_key`;
    const parameters = {
      row_key: 'alincoln',
    };

    const parameterTypes = {
      row_key: Bigtable.SqlTypes.String(),
    };

    const prepareStatementOptions = {
      query,
      parameterTypes,
    };

    instance
      .prepareStatement(prepareStatementOptions)
      .then(([preparedStatement]) =>
        instance.executeQuery({
          preparedStatement,
          parameters,
        }),
      )
      .then(result => {
        const rows = result[0];
      })
      .catch(err => {
        // Handle errors
      });

    // [END bigtable_api_execute_query]
  },

  createExecuteQueryStream: (instanceId, tableId) => {
    // [START bigtable_api_create_query_stream]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);

    const query = `SELECT
                    _key
                  from \`${tableId}\` WHERE _key=@row_key`;
    const parameters = {
      row_key: 'alincoln',
    };
    const parameterTypes = {
      row_key: Bigtable.ExecuteQueryTypes.String(),
    };

    const prepareStatementOptions = {
      query,
      parameterTypes,
    };
    instance
      .prepareStatement(prepareStatementOptions)
      .then(preparedStatement => {
        instance
          .createExecuteQueryStream({
            preparedStatement,
            parameters,
          })
          .on('error', err => {
            // Handle the error.
          })
          .on('data', row => {
            // `row` is a QueryResultRow object.
          })
          .on('end', () => {
            // All rows retrieved.
          });
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
