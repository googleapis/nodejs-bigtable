// Copyright 2017 Google LLC
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

'use strict';

// Imports the Google Cloud client library
const {Bigtable} = require('@google-cloud/bigtable');

async function runInstanceOperations(instanceID, clusterID) {
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceID);

  console.log('Check Instance Exists');
  // [START bigtable_check_instance_exists]
  const [instanceExists] = await instance.exists();
  // [END bigtable_check_instance_exists]

  // Create instance if does not exists
  if (!instanceExists) {
    console.log('Creating a PRODUCTION Instance');
    // [START bigtable_create_prod_instance]
    // Creates a Production Instance with the ID "ssd-instance"
    // with cluster id "ssd-cluster", 3 nodes and location us-central1-f

    const instanceOptions = {
      clusters: [
        {
          id: clusterID,
          nodes: 3,
          location: 'us-central1-f',
          storage: 'ssd',
        },
      ],
      type: 'PRODUCTION', // Optional as default type is PRODUCTION
      labels: {'prod-label': 'prod-label'},
    };

    // Create production instance with given options
    const [prodInstance, operation] = await instance.create(instanceOptions);
    await operation.promise();
    console.log(`Created Instance: ${prodInstance.id}`);
    // [END bigtable_create_prod_instance]
  } else {
    console.log(`Instance ${instance.id} exists`);
  }

  console.log(); //for just a new-line
  console.log('Listing Instances:');
  // [START bigtable_list_instances]
  const [instances] = await bigtable.getInstances();
  instances.forEach(instance => {
    console.log(instance.id);
  });
  // [END bigtable_list_instances]

  console.log(); //for just a new-line
  console.log('Get Instance');
  // [START bigtable_get_instance]
  const [instances2] = await bigtable.instance(instanceID).get();
  console.log(`Instance ID: ${instances2.id}`);
  console.log(`Instance Meta: ${JSON.stringify(instances2.metadata)}`);
  // [END bigtable_get_instance]

  console.log(); //for just a new-line
  console.log('Listing Clusters...');
  // [START bigtable_get_clusters]
  const instance3 = bigtable.instance(instanceID);
  const [clusters] = await instance3.getClusters();
  clusters.forEach(cluster => {
    console.log(cluster.id);
  });
  // [END bigtable_get_clusters]
}

// Creates a Development instance with the ID "hdd-instance"
// with cluster ID "hdd-cluster" and location us-central1-f
// Cluster nodes should not be set while creating Development Instance
async function createDevInstance(instanceID, clusterID) {
  const bigtable = new Bigtable();

  // [START bigtable_create_dev_instance]
  console.log(); //for just a new-line
  console.log('Creating a DEVELOPMENT Instance');
  // Set options to create an Instance
  const options = {
    clusters: [
      {
        id: clusterID,
        location: 'us-central1-f',
        storage: 'hdd',
      },
    ],
    type: 'DEVELOPMENT',
    labels: {'dev-label': 'dev-label'},
  };

  // Create development instance with given options
  const [instance, operation] = await bigtable.createInstance(
    instanceID,
    options
  );
  await operation.promise();
  console.log(`Created development instance: ${instance.id}`);
  // [END bigtable_create_dev_instance]
}

// Delete the Instance
async function deleteInstance(instanceID) {
  // Creates a client
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceID);

  console.log(); //for just a new-line
  // [START bigtable_delete_instance]
  console.log('Deleting Instance');
  await instance.delete();
  console.log(`Instance deleted: ${instance.id}`);
  // [END bigtable_delete_instance]
}

// Add Cluster
async function addCluster(instanceID, clusterID) {
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceID);
  const [instanceExists] = await instance.exists();
  if (!instanceExists) {
    console.log('Instance does not exists');
  } else {
    console.log(); //for just a new-line
    console.log(`Adding Cluster to Instance ${instance.id}`);
    // [START bigtable_create_cluster]
    const clusterOptions = {
      location: 'us-central1-c',
      nodes: 3,
      storage: 'ssd',
    };

    const [cluster, operation] = await instance.createCluster(
      clusterID,
      clusterOptions
    );
    await operation.promise();
    console.log(`Cluster created: ${cluster.id}`);
    // [END bigtable_create_cluster]
  }
}

// Delete the Cluster
async function deleteCluster(instanceID, clusterID) {
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceID);
  const cluster = instance.cluster(clusterID);

  // [START bigtable_delete_cluster]
  console.log(); //for just a new-line
  console.log('Deleting Cluster');
  await cluster.delete();
  console.log(`Cluster deleted: ${cluster.id}`);
  // [END bigtable_delete_cluster]
}

require('yargs')
  .demand(1)
  .command(
    'run',
    'Creates an Instance(type: PRODUCTION) and run basic instance-operations',
    {},
    argv => runInstanceOperations(argv.instance, argv.cluster)
  )
  .example(
    'node $0 run --instance [instanceID] --cluster [clusterID]',
    'Run instance operations'
  )
  .command('dev-instance', 'Create Development Instance', {}, argv =>
    createDevInstance(argv.instance, argv.cluster)
  )
  .example(
    'node $0 dev-instance --instance [instanceID]',
    'Create Development Instance'
  )
  .command('del-instance', 'Delete the Instance', {}, argv =>
    deleteInstance(argv.instance)
  )
  .example(
    'node $0 del-instance --instance [instanceID]',
    'Delete the Instance.'
  )
  .command('add-cluster', 'Add Cluster', {}, argv =>
    addCluster(argv.instance, argv.cluster)
  )
  .example(
    'node $0 add-cluster --instance [instanceID] --cluster [clusterID]',
    'Add Cluster'
  )
  .command('del-cluster', 'Delete the Cluster', {}, argv =>
    deleteCluster(argv.instance, argv.cluster)
  )
  .example(
    'node $0 del-cluster --instance [instanceID] --cluster [clusterID]',
    'Delete the Cluster'
  )
  .wrap(120)
  .nargs('instance', 1)
  .nargs('cluster', 1)
  .describe('instance', 'Cloud Bigtable Instance ID')
  .describe('cluster', 'Cloud Bigtable Cluster ID')
  .recommendCommands()
  .epilogue('For more information, see https://cloud.google.com/bigtable/docs')
  .help()
  .strict().argv;
