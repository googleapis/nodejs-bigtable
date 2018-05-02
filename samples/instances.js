/**
 * Copyright 2017, Google, Inc.
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

'use strict';

/**
 * Creates a Production Instance with the name "ssd-instance"
 * with cluster name "ssd-cluster", 3 nodes and location us-central1-f
 */
function createSsdInstance() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // Set options to create an Instance
  const options = {
    displayName: 'SSD Instance',
    clusters: [
      {
        name: 'ssd-cluster',
        nodes: 3,
        location: 'us-central1-f',
        storage: 'ssd',
      },
    ],
    type: 'PRODUCTION', // Optional as default tyoe is PRODUCTION
    labels: {'prod-label': 'prod-label'},
  };

  // Creates an Instance
  bigtable
    .createInstance('ssd-instance', options)
    .then(results => {
      let instance = results[0];
      let operations = results[1];
      let apiResponse = results[2];

      operations.on('complete', () => {
        console.log(`Instance created with name ${instance.name}`);
        console.log(`apiResponse Object Keys: ${Object.keys(apiResponse)}`);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Creates a Development instance with the name "hdd-instance"
 * with cluster name "hdd-cluster" and location us-central1-f
 * Cluster nodes should not be set while creating Development Instance
 */
function createDevInstance() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // Set options to create an Instance
  const options = {
    displayName: 'HDD Instance',
    clusters: [
      {
        name: 'hdd-cluster',
        location: 'us-central1-f',
        storage: 'hdd',
      },
    ],
    type: 'DEVELOPMENT',
    labels: {'dev-label': 'dev-label'},
  };

  // Creates an Instance
  bigtable
    .createInstance('hdd-instance', options)
    .then(results => {
      let instance = results[0];
      let operations = results[1];
      let apiResponse = results[2];

      operations.on('complete', () => {
        console.log(`Instance created with name ${instance.name}`);
        console.log(`apiResponse Object Keys: ${Object.keys(apiResponse)}`);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * List instances in current project
 */
function listInstances() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // Lists all instances in the current project
  bigtable
    .getInstances()
    .then(results => {
      const instances = results[0];

      console.log('Instances:');

      instances.forEach(instance => {
        console.log(instance.id);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Get the instance by name "ssd-instance"
 */
function getInstance() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // check if instance exists
  instance
    .get()
    .then(results => {
      const instance = results[0];

      console.log('performed get on ssd-instance:');
      console.log(`Name: ${instance.name}`); //result[0] is instance Object
      console.log(`Metadata: ${JSON.stringify(instance.metadata)}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Get Clusters for the Instance "ssd-instance"
 */
function getClusters() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // check if instance exists
  instance
    .getClusters()
    .then(results => {
      const clusters = results[0];

      clusters.forEach(cluster => {
        console.log(cluster.name);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Delete the Instance "ssd-instance"
 */
function deleteInstance() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // check if instance exists
  instance
    .delete()
    .then(result => {
      console.log(`deleted instance ssd-instance: ${JSON.stringify(result)}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Create Cluster for "ssd-instance"
 * with 3 nodes at location us-central1-c
 */
function createCluster() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // define callback for createCluster
  const callback = (err, cluster, operations, apiResponse) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }

    operations.on('complete', () => {
      // The cluster was created successfully.
      console.log(`Cluster created sucessfully by name: ${cluster.name}`);
      console.log(`Object keys in apiResponse: ${Object.keys(apiResponse)}`);
    });
  };

  let options = {
    location: 'us-central1-c',
    nodes: 3,
    storage: 'ssd',
  };

  instance.createCluster('ssd-cluster2', options, callback);
}

/**
 * Delete Cluster "ssd-cluster2" for the Instance "ssd-instance"
 */
function deleteCluster() {
  // Imports the Google Cloud client library
  const Bigtable = require('@google-cloud/bigtable');

  // Creates a client
  const bigtable = new Bigtable();

  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // refer instance with id 'ssd-instance'
  let cluster = instance.cluster('ssd-cluster');

  // check if instance exists
  cluster
    .delete()
    .then(result => {
      console.log(`deleted cluster ssd-cluster: ${JSON.stringify(result)}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

require(`yargs`)
  .demand(1)

  // command to create a PRODUCTION instance
  .command(`create-prod-instance`, `Create Instance`, {}, createSsdInstance)
  .example(`node $0 create-prod-instance`, `Creates a PRODUCTION instance`)

  // command to create a DEVELOPMENT instance
  .command(`create-dev-instance`, `Create Instance`, {}, createDevInstance)
  .example(`node $0 create-dev-instance`, `Creates a DEVELOPMENT instance`)

  // command to list all instances and check 'ssd-instance' is listed
  .command(`list-instances`, `Lists all instances`, {}, listInstances)
  .example(`node $0 list`, `Lists all instances in the current project.`)

  // command to get the instance 'ssd-instance'
  .command(`get-instance`, `Get the Instance`, {}, getInstance)
  .example(`node $0 get-instance`, `Get the Instance`)

  // command to list Cluster for instance 'ssd-instance'
  .command(`get-clusters`, `Get Clusters`, {}, getClusters)
  .example(`node $0 get-clusters`, `Get Clusters`)

  // command to delete the instance 'ssd-instance'
  .command(`del-instance`, `Delete the Instance`, {}, deleteInstance)
  .example(`node $0 del-instance`, `Delete the Instance`)

  // command to create Cluster "ssd-cluster2" for instance 'ssd-instance'
  .command(`create-cluster`, `Creates Cluster`, {}, createCluster)
  .example(`node $0 create-cluster`, `Creates Cluster`)

  // command to delete Cluster "ssd-cluster2" for instance 'ssd-instance'
  .command(`del-cluster`, `Delete Cluster`, {}, deleteCluster)
  .example(`node $0 del-cluster`, `Delete Cluster`)

  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/bigtable/docs`)
  .help()
  .strict().argv;
