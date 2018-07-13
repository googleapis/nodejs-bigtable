/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Bigtable = require('@google-cloud/bigtable');
const bigtable = new Bigtable();

const snippets = {
  createInstance: (instanceId, clusterId, callback) => {
    // [START bigtable_create_instance]
    const instance = bigtable.instance(instanceId);

    // options for a PRODUCTION Instance
    // const options = {
    //   clusters: [
    //     {
    //       name: clusterId,
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
          name: clusterId,
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
        let newInstance = result[0];
        // let operations = result[1];
        // let apiResponse = result[2];

        console.log(`Created Instance: ${newInstance.id}`);
        callback(null, newInstance);
      })
      .catch(err => {
        console.error('Error creating prod-instance:', err);
        callback(err);
      });
    // [END bigtable_create_instance]
  },

  createCluster: (instanceId, clusterId, callback) => {
    // [START bigtable_create_cluster]
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
        console.log(`Cluster created: ${newCluster.id}`);
        callback(null, newCluster);
      })
      .catch(err => {
        console.error('Error creating cluster: ', err);
        callback(err);
      });
    // [END bigtable_create_cluster]
  },

  createAppProfile: (instanceId, clusterId, appProfileId, callback) => {
    // [START bigtable_create_app_profile]
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    const options = {
      routing: cluster,
      allowTransactionalWrites: true,
      ignoreWarnings: true,
    };

    instance.createAppProfile(appProfileId, options, (err, appProfile) => {
      if (err) {
        console.error('Error creating appProfile: ', err);
        callback(err);
        return;
      }
      console.log(`App-Profile created: ${appProfile.name}`);
      callback(appProfile);
    });
    // [END bigtable_create_app_profile]
  },

  createTable: (instanceId, tableId, callback) => {
    // [START bigtable_create_table]
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
        console.log(`Table created: ${newTable.name}`);
        callback(null, newTable);
      })
      .catch(err => {
        console.error('Error creating table: ', err);
        callback(err);
      });
    // [END bigtable_create_table]
  },

  existsInstance: (instanceId, callback) => {
    const instance = bigtable.instance(instanceId);

    // [START bigtable_exists_instance]
    instance
      .exists()
      .then(result => {
        const exists = result[0];
        console.log(`Instance ${instanceId} Exists: ${exists}`);
        callback(null, exists);
      })
      .catch(err => {
        console.error('Error in checking Instance exists: ', err);
        callback(err);
      });
    // [END bigtable_exists_instance]
  },

  getInstance: (instanceId, callback) => {
    const instance = bigtable.instance(instanceId);

    // [START bigtable_get_instance]
    instance
      .get()
      .then(result => {
        const instance = result[0];
        // const apiResponse = result[1];
        console.log(`Instance: \n${instance}`);
        callback(null, instance);
      })
      .catch(err => {
        console.error('Error geting Instance: ', err);
        callback(err);
      });
    // [END bigtable_get_instance]
  },

  getClusters: (instanceId, callback) => {
    const instance = bigtable.instance(instanceId);

    // [START bigtable_get_clusters]
    instance
      .getClusters()
      .then(result => {
        console.log(`Clusters: \n${result[0]}`);
        callback(null, result);
      })
      .catch(err => {
        console.error('Error geting Clusters: ', err);
        callback(err);
      });
    // [END bigtable_get_clusters]
  },

  getAppProfiles: (instanceId, callback) => {
    const instance = bigtable.instance(instanceId);

    // [START bigtable_get_app_profiles]
    instance
      .getAppProfiles()
      .then(result => {
        console.log(`AppProfiles: \n${result[0]}`);
        callback(null, result);
      })
      .catch(err => {
        console.error('Error geting AppProfiles: ', err);
        callback(err);
      });
    // [END bigtable_get_app_profiles]
  },

  getMetaData: (instanceId, callback) => {
    const instance = bigtable.instance(instanceId);

    // [START bigtable_get_instance_metadata]
    instance
      .getMetadata()
      .then(result => {
        const metaData = result[0];
        // const apiResponse = result[1];
        console.log('%s %O', 'Instance Metadata:\n', metaData);
        callback(null, metaData);
      })
      .catch(err => {
        console.error('Error geting Metadata: ', err);
        callback(err);
      });
    // [END bigtable_get_instance_metadata]
  },

  getTables: (instanceId, callback) => {
    const instance = bigtable.instance(instanceId);

    // [START bigtable_get_tables]

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
        console.log(`Tables:`);
        let tables = result[0];
        tables.forEach(t => {
          console.log(t.id);
        });
        callback(null, tables);
      })
      .catch(err => {
        console.error('Error geting Tables: ', err);
        callback(err);
      });
    // [END bigtable_get_tables]
  },

  updateInstance: (instanceId, callback) => {
    const instance = bigtable.instance(instanceId);

    // [START bigtable_set_meta_data]
    let metadata = {
      displayName: 'updated-name',
    };

    instance
      .setMetadata(metadata)
      .then(result => {
        console.log(`API Response: \n${result[0]}`);
        callback(null, result);
      })
      .catch(err => {
        console.error('Error in Set MetaData: ', err);
        callback(err);
      });
    // [END bigtable_set_meta_data]
  },

  delInstance: (instanceId, callback) => {
    // [START bigtable_del_instance]
    const instance = bigtable.instance(instanceId);
    instance
      .delete()
      .then(result => {
        const apiResponse = result[0];
        console.log(`Instance ${instanceId} deleted: ${apiResponse}`);
        callback(null, apiResponse);
      })
      .catch(err => {
        console.error('Error deleting instance: ', err);
        callback(err);
      });
    // [END bigtable_del_instance]
  },
};

module.exports = snippets;
