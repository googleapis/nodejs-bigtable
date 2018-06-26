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
const bigtableClient = new Bigtable();

function newInstance(instanceId) {
  // [START bigtable_create_instance]
  const instance = bigtableClient.instance(instanceId);

  // options for a PRODUCTION Instance
  const options = {
    clusters: [
      {
        name: 'sample-cluster',
        nodes: 3,
        location: 'us-central1-f',
        storage: 'ssd',
      },
    ],
    type: 'PRODUCTION', // Optional as default type is PRODUCTION
  };

  // // options for a DEVELOPMENT Instance
  // const options = {
  //   clusters: [
  //     {
  //       name: 'sample-cluster',
  //       location: 'us-central1-f',
  //       storage: 'hdd',
  //     },
  //   ],
  //   type: 'DEVELOPMENT',
  // };

  // creates a new Instance
  instance
    .create(options)
    .then(result => {
      let newInstance = result[0];
      // let operations = result[1];
      // let apiResponse = result[2];

      console.log(`Created Instance: ${newInstance.name}`);
    })
    .catch(err => {
      console.error('Error creating prod-instance:', err);
    });
  // [END bigtable_create_instance]
}

function newCluster(clusterId, instanceId) {
  // [START bigtable_create_cluster]
  const instance = bigtableClient.instance(instanceId);

  const options = {
    location: 'us-central1-b',
    nodes: 3,
    storage: 'ssd',
  };

  instance
    .createCluster(clusterId, options)
    .then(result => {
      const newCluster = result[0];
      // const operations = result[1];
      // const apiResponse = result[2];
      console.log(`Cluster created: ${newCluster.name}`);
    })
    .catch(err => {
      console.error('Error creating cluster: ', err);
    });
  // [END bigtable_create_cluster]
}

function newAppProfile(appProfileId, clusterId, instanceId) {
  // [START bigtable_create_appProfile]
  const instance = bigtableClient.instance(instanceId);
  const cluster = instance.cluster(clusterId);

  const options = {
    routing: cluster,
    allowTransactionalWrites: true,
    ignoreWarnings: true,
  };

  instance.createAppProfile(appProfileId, options, (err, appProfile) => {
    if (err) {
      console.error('Error creating appProfile: ', err);
      return;
    }
    console.log(`App-Profile created: ${appProfile.name}`);
  });
  // [END bigtable_create_appProfile]
}

function newTable(tableId, instanceId) {
  // [START bigtable_create_table]
  const instance = bigtableClient.instance(instanceId);

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
    })
    .catch(err => {
      console.error('Error creating table: ', err);
    });
  // [END bigtable_create_table]
}

function existsInstance(instanceId) {
  const instance = bigtableClient.instance(instanceId);

  // [START bigtable_exists_instance]
  instance
    .exists()
    .then(result => {
      const exists = result[0];
      console.log(`Instance ${instanceId} Exists: ${exists}`);
    })
    .catch(err => {
      console.error('Error in checking Instance exists: ', err);
    });
  // [END bigtable_exists_instance]
}

function getInstance(instanceId) {
  const instance = bigtableClient.instance(instanceId);

  // [START bigtable_get_instance]
  instance
    .get()
    .then(result => {
      const instance = result[0];
      // const apiResponse = result[1];
      console.log(`Instance: \n${instance}`);
    })
    .catch(err => {
      console.error('Error geting Instance: ', err);
    });
  // [END bigtable_get_instance]
}

function getClusters(instanceId) {
  const instance = bigtableClient.instance(instanceId);

  // [START bigtable_get_clusters]
  instance
    .getClusters()
    .then(result => {
      console.log(`Clusters: \n${result[0]}`);
    })
    .catch(err => {
      console.error('Error geting Clusters: ', err);
    });
  // [END bigtable_get_clusters]
}

function getAppProfiles(instanceId) {
  const instance = bigtableClient.instance(instanceId);

  // [START bigtable_get_app_profiles]
  instance
    .getAppProfiles()
    .then(result => {
      console.log(`AppProfiles: \n${result[0]}`);
    })
    .catch(err => {
      console.error('Error geting AppProfiles: ', err);
    });
  // [END bigtable_get_app_profiles]
}

function getMetaData(instanceId) {
  const instance = bigtableClient.instance(instanceId);

  // [START bigtable_get_imeta]
  instance
    .getMetadata()
    .then(result => {
      const metaData = result[0];
      // const apiResponse = result[1];
      console.log(`Instance Metadata: \n${metaData}`);
    })
    .catch(err => {
      console.error('Error geting Metadata: ', err);
    });
  // [END bigtable_get_imeta]
}

function getTables(instanceId) {
  const instance = bigtableClient.instance(instanceId);

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
      console.log(`Tables: \n${result[0]}`);
    })
    .catch(err => {
      console.error('Error geting Tables: ', err);
    });
  // [END bigtable_get_tables]
}

function setMetaData(instanceId) {
  const instance = bigtableClient.instance(instanceId);

  // [START bigtable_set_meta]
  let metadata = {
    displayName: 'updated-name',
  };

  instance
    .setMetadata(metadata)
    .then(result => {
      console.log(`API Response: \n${result[0]}`);
    })
    .catch(err => {
      console.error('Error in Set MetaData: ', err);
    });
  // [END bigtable_set_meta]
}

function delInstance(instanceId) {
  // [START bigtable_del_instance]
  const instance = bigtableClient.instance(instanceId);
  instance
    .delete()
    .then(result => {
      const apiResponse = result[0];
      console.log(`Instance ${instanceId} deleted: ${apiResponse}`);
    })
    .catch(err => {
      console.error('Error deleting instance: ', err);
    });
  // [END bigtable_del_instance]
}

require(`yargs`)
  .demand(1)

  // create Instance
  .command(`new-instance`, `Creates an Instance`, {}, argv =>
    newInstance(argv.instance)
  )
  .example(`node $0 new-instance --instance [instanceid]`)

  // create Cluster
  .command(`new-cluster`, `Creates a Cluster`, {}, argv =>
    newCluster(argv.cluster, argv.instance)
  )
  .example(`node $0 new-cluster --cluster [clusterId] --instance [instanceid]`)

  // create App-Profile
  .command(`new-app-profile`, `Creates an AppProfile`, {}, argv =>
    newAppProfile(argv.appProfile, argv.cluster, argv.instance)
  )
  .example(
    `node $0 new-app-profile --appProfile [appProfileId]--cluster [clusterId] --instance [instanceId]`
  )

  // create Table
  .command(`new-table`, `Creates a Table`, {}, argv =>
    newTable(argv.table, argv.instance)
  )
  .example(`node $0 new-table --table [tableId] --instance [instanceId]`)

  // check Instance exists
  .command(`exist-instance`, `Check Instance Exists`, {}, argv =>
    existsInstance(argv.instance)
  )
  .example(`node $0 exist-instance --instance [instanceid]`)

  // get an existing Instance
  .command(`get-instance`, `Get an existing Instance`, {}, argv =>
    getInstance(argv.instance)
  )
  .example(`node $0 get-instance --instance [instanceid]`)

  // get Clusters
  .command(`get-clusters`, `Get Clusters`, {}, argv =>
    getClusters(argv.instance)
  )
  .example(`node $0 get-clusters --instance [instanceid]`)

  // get AppProfiles
  .command(`get-app-profiles`, `Get AppProfiles`, {}, argv =>
    getAppProfiles(argv.instance)
  )
  .example(`node $0 get-app-profiles --instance [instanceid]`)

  // get Instance Metadata
  .command(`get-imeta`, `Get Instance Metadata`, {}, argv =>
    getMetaData(argv.instance)
  )
  .example(`node $0 get-imeta --instance [instanceid]`)

  // get Instance Tables
  .command(`get-tables`, `Get Instance Tables`, {}, argv =>
    getTables(argv.instance)
  )
  .example(`node $0 get-tables --instance [instanceid]`)

  // set metaData for Instance
  .command(`set-meta`, `Set Instance MetaData`, {}, argv =>
    setMetaData(argv.instance)
  )
  .example(`node $0 set-meta --instance [instanceid]`)

  // delete Instance
  .command(`del-instance`, `Delete an Instance`, {}, argv =>
    delInstance(argv.instance)
  )

  .example(`node $0 del-instance --instance [instanceid]`)
  .wrap(120)
  .nargs('instance', 1)
  .describe('instance', 'Cloud Bigtable Instance ID')
  .nargs('cluster', 1)
  .describe('cluster', 'Cloud Bigtable Cluster ID')
  .nargs('appProfile', 1)
  .describe('appProfile', 'Cloud Bigtable App Profile ID')
  .nargs('table', 1)
  .describe('table', 'Cloud Bigtable Table ID')
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/bigtable/docs`)
  .help()
  .strict().argv;
