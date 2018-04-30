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

// Imports the Google Cloud client library
const Bigtable = require('@google-cloud/bigtable');

// Creates a client
const bigtable = new Bigtable();

/**
 * Check if an instance with given 'ssd-instance', Exists?.
 * Delete if it exists.
 */
function delIfExists() {
  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // check if instance exists
  instance.exists((err, result) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    if (result === false) {
      console.log('Instance with ID: ssd-instance, does not exists');
      return;
    } else {
      instance.delete(err => {
        if (err) {
          console.error('ERROR:', err);
          return;
        }
        console.log('Instance with ID: ssd-instance, deleted.');
      });
    }
  });
}

/**
 * Creates a production instance with the name "ssd-instance"
 * that has a single SSD cluster name "ssd-cluster"
 */
function createInstance() {
  // Set options to create an Instance
  const options = {
    displayName: 'SSD Instance',
    clusters: [
      {
        name: 'ssd-cluster',
        nodes: 3,
        location: 'us-central1-b',
        storage: 'ssd',
      },
    ],
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
 * List instances also verify and console "ssd-instance" is listed
 */
function listInstances() {
  // Lists all instances in the current project
  bigtable
    .getInstances()
    .then(results => {
      const instances = results[0];
      console.log('Instances:');
      let ssdIFound = false;
      instances.forEach(instance => {
        console.log(instance.id);
        if (instance.id === 'ssd-instance') ssdIFound = true;
      });

      if (ssdIFound) {
        console.log('listed ssd-instance above');
      }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Get the instance
 */
function getInstance() {
  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  // check if instance exists
  instance
    .get()
    .then(results => {
      const instance = results[0];
      // const rawResponse = results[1];

      console.log('performed get on ssd-instance:');
      console.log(`Name: ${instance.name}`); //result[0] is instance Object
      console.log(`Metadata: ${JSON.stringify(instance.metadata)}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

/**
 * Delete the instance
 */
function delInstance() {
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
 * Create Cluster for ssd-instance
 */
function createCluster() {
  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  const callback = (err, cluster, operations, apiResponse) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }

    operations.on('error', console.log).on('complete', function() {
      // The cluster was created successfully.
      console.log(`Cluster created sucessfully by name: ${cluster.name}`);
      console.log(`Object keys in apiResponse: ${Object.keys(apiResponse)}`);
    });
  };

  let options = {
    location: 'us-central1-f',
    nodes: 3,
    storage: 'ssd',
  };

  instance.createCluster('my-cluster', options, callback);

  //-
  // If the callback is omitted, we'll return a Promise.
  //-
  // instance.createCluster('my-cluster', options).then(function(data) {
  //   const cluster = data[0];
  //   const operation = data[1];
  //   const apiResponse = data[2];
  // });
}

/**
 * Get Clusters for ssd-instance
 */
function listClusters() {
  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  const callback = (err, clusters, apiResponse) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log('Clusters List:');
    clusters.forEach(cluster => {
      console.log(`${cluster.name} -- ${cluster.metadata.location}`);
      console.log(`Object keys in apiResponse: ${apiResponse}`);
    });
  };

  instance.getClusters(callback);
}

/**
 * Create Table for ssd-instance
 */
function createTable() {
  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  const callback = (err, table, apiResponse) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }

    // The cluster was created successfully.
    console.log(`Table created sucessfully by name: ${table.name}`);
    console.log(`Object keys in apiResponse: ${Object.keys(apiResponse)}`);
  };

  // set optional info
  let options = {
    families: ['personal-info', 'business-info'],
  };

  instance.createTable('my-table2', options, callback);
}

/**
 * Get Tables for ssd-instance
 */
function listTables() {
  // refer instance with id 'ssd-instance'
  let instance = bigtable.instance('ssd-instance');

  const callback = (err, tables) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log('Tables List:');
    tables.forEach(table => {
      console.log(`${table.name}`);
    });
  };

  instance.getTables(callback);
}

require(`yargs`)
  .demand(1)

  // command to check if instance exists and delete if true
  .command(`del-if-exists`, `Deletes the Instance if Exists`, {}, delIfExists)
  .example(
    `node $0 del-if-exists <instanceId>`,
    `Deletes the Instance if Exists`
  )

  // command to create an instance
  .command(`create-instance`, `Create Instance`, {}, createInstance)
  .example(`node $0 create-instance`, `Creates a PRODUCTION instance`)

  // command to list all instances and check 'ssd-instance' is listed
  .command(`list-instances`, `Lists all instances`, {}, listInstances)
  .example(`node $0 list`, `Lists all instances in the current project.`)

  // command to get the instance 'ssd-instance'
  .command(`get-instance`, `Get the Instance`, {}, getInstance)
  .example(`node $0 get-instance`, `Get the Instance`)

  // command to delete the instance 'ssd-instance'
  .command(`del-instance`, `Delete the Instance`, {}, delInstance)
  .example(`node $0 del-instance`, `Delete the Instance`)

  // command to create Cluster for instance 'ssd-instance'
  .command(`create-cluster`, `Creates Cluster`, {}, createCluster)
  .example(`node $0 create-cluster`, `Create Cluster`)

  // command to list Cluster for instance 'ssd-instance'
  .command(`list-clusters`, `Lists Clusters`, {}, listClusters)
  .example(`node $0 list-clusters`, `Lists Clusters`)

  // command to create Table for instance 'ssd-instance'
  .command(`create-table`, `Creates Table`, {}, createTable)
  .example(`node $0 create-table`, `Creates Table`)

  // command to list Cluster for instance 'ssd-instance'
  .command(`list-tables`, `Lists Tables`, {}, listTables)
  .example(`node $0 list-tables`, `Lists Tables`)

  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/bigtable/docs`)
  .help()
  .strict().argv;
