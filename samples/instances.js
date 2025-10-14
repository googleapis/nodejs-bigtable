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

async function runInstanceOperations(instanceID, clusterID) {
  console.log('Check Instance Exists');
  // [START bigtable_check_instance_exists]
  let instanceExists = true;
  try {
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();
    await instanceAdminClient.getInstance({
      name: `projects/${projectId}/instances/${instanceID}`,
    });
  } catch (e) {
    if (e.code === 5) {
      instanceExists = false;
    }
  }
  // [END bigtable_check_instance_exists]

  // Create instance if does not exists
  if (!instanceExists) {
    console.log('Creating a PRODUCTION Instance');
    // [START bigtable_create_prod_instance]
    // Creates a Production Instance with the ID "ssd-instance"
    // with cluster id "ssd-cluster", 3 nodes and location us-central1-f
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();

    const instanceOptions = {
      parent: `projects/${projectId}`,
      instanceId: instanceID,
      instance: {
        displayName: instanceID,
        labels: {'prod-label': 'prod-label'},
        type: 'PRODUCTION',
      },
      clusters: {
        [clusterID]: {
          location: `projects/${projectId}/locations/us-central1-f`,
          serveNodes: 3,
          defaultStorageType: 'SSD',
        },
      },
    };

    // Create production instance with given options
    const [prodInstance, operation] =
      await instanceAdminClient.createInstance(instanceOptions);
    await operation.promise();
    console.log(`Created Instance: ${prodInstance.name}`);
    // [END bigtable_create_prod_instance]
  } else {
    console.log(`Instance ${instanceID} exists`);
  }

  console.log(); //for just a new-line
  console.log('Listing Instances:');
  {
    // [START bigtable_list_instances]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();
    const [instances] = await instanceAdminClient.listInstances({
      parent: `projects/${projectId}`,
    });
    instances.instances.forEach(instance => {
      console.log(instance.name);
    });
    // [END bigtable_list_instances]
  }

  console.log(); //for just a new-line
  console.log('Get Instance');
  {
    // [START bigtable_get_instance]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();
    const [instance2] = await instanceAdminClient.getInstance({
      name: `projects/${projectId}/instances/${instanceID}`,
    });
    console.log(`Instance ID: ${instance2.name}`);
    console.log(`Instance Meta: ${JSON.stringify(instance2.labels)}`);
    // [END bigtable_get_instance]
  }

  console.log(); //for just a new-line
  console.log('Listing Clusters...');
  {
    // [START bigtable_get_clusters]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();
    const [clusters] = await instanceAdminClient.listClusters({
      parent: `projects/${projectId}/instances/${instanceID}`,
    });
    clusters.clusters.forEach(cluster => {
      console.log(cluster.name);
    });
    // [END bigtable_get_clusters]
  }
}

// Creates a Development instance with the ID "hdd-instance"
// with cluster ID "hdd-cluster" and location us-central1-f
// Cluster nodes should not be set while creating Development Instance
async function createDevInstance(instanceID, clusterID) {
  // [START bigtable_create_dev_instance]
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();
  console.log(); //for just a new-line
  console.log('Creating a DEVELOPMENT Instance');
  // Set options to create an Instance
  const options = {
    parent: `projects/${projectId}`,
    instanceId: instanceID,
    instance: {
      displayName: instanceID,
      labels: {'dev-label': 'dev-label'},
      type: 'DEVELOPMENT',
    },
    clusters: [
      {
        id: clusterID,
        location: `projects/${projectId}/locations/us-central1-f`,
        serveNodes: 1,
        defaultStorageType: 'HDD',
      },
    ],
  };

  // Create development instance with given options
  const [instance, operation] =
    await instanceAdminClient.createInstance(options);
  await operation.promise();
  console.log(`Created development instance: ${instance.name}`);
  // [END bigtable_create_dev_instance]
}

// Delete the Instance
async function deleteInstance(instanceID) {
  console.log(); //for just a new-line
  // [START bigtable_delete_instance]
  console.log('Deleting Instance');
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();
  await instanceAdminClient.deleteInstance({
    name: `projects/${projectId}/instances/${instanceID}`,
  });
  console.log(`Instance deleted: ${instanceID}`);
  // [END bigtable_delete_instance]
}

// Add Cluster
async function addCluster(instanceID, clusterID) {
  let instanceExists = true;
  try {
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();
    await instanceAdminClient.getInstance({
      name: `projects/${projectId}/instances/${instanceID}`,
    });
  } catch (e) {
    if (e.code === 5) {
      instanceExists = false;
    }
  }
  if (!instanceExists) {
    console.log('Instance does not exists');
  } else {
    console.log(); //for just a new-line
    console.log(`Adding Cluster to Instance ${instanceID}`);
    // [START bigtable_create_cluster]
    const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
    const instanceAdminClient = new BigtableInstanceAdminClient();
    const projectId = await instanceAdminClient.getProjectId();
    const clusterOptions = {
      parent: `projects/${projectId}/instances/${instanceID}`,
      clusterId: clusterID,
      cluster: {
        location: `projects/${projectId}/locations/us-central1-c`,
        serveNodes: 3,
        defaultStorageType: 'SSD',
      },
    };

    const [cluster, operation] =
      await instanceAdminClient.createCluster(clusterOptions);
    await operation.promise();
    console.log(`Cluster created: ${cluster.name}`);
    // [END bigtable_create_cluster]
  }
}

// Delete the Cluster
async function deleteCluster(instanceID, clusterID) {
  // [START bigtable_delete_cluster]
  const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
  const instanceAdminClient = new BigtableInstanceAdminClient();
  const projectId = await instanceAdminClient.getProjectId();
  console.log(); //for just a new-line
  console.log('Deleting Cluster');
  await instanceAdminClient.deleteCluster({
    name: `projects/${projectId}/instances/${instanceID}/clusters/${clusterID}`,
  });
  console.log(`Cluster deleted: ${clusterID}`);
  // [END bigtable_delete_cluster]
}

require('yargs')
  .demand(1)
  .command(
    'run',
    'Creates an Instance(type: PRODUCTION) and run basic instance-operations',
    {},
    argv => runInstanceOperations(argv.instance, argv.cluster),
  )
  .example(
    'node $0 run --instance [instanceID] --cluster [clusterID]',
    'Run instance operations',
  )
  .command('dev-instance', 'Create Development Instance', {}, argv =>
    createDevInstance(argv.instance, argv.cluster),
  )
  .example(
    'node $0 dev-instance --instance [instanceID]',
    'Create Development Instance',
  )
  .command('del-instance', 'Delete the Instance', {}, argv =>
    deleteInstance(argv.instance),
  )
  .example(
    'node $0 del-instance --instance [instanceID]',
    'Delete the Instance.',
  )
  .command('add-cluster', 'Add Cluster', {}, argv =>
    addCluster(argv.instance, argv.cluster),
  )
  .example(
    'node $0 add-cluster --instance [instanceID] --cluster [clusterID]',
    'Add Cluster',
  )
  .command('del-cluster', 'Delete the Cluster', {}, argv =>
    deleteCluster(argv.instance, argv.cluster),
  )
  .example(
    'node $0 del-cluster --instance [instanceID] --cluster [clusterID]',
    'Delete the Cluster',
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
