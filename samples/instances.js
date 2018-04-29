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
      console.log(`Instance created with name ${instance.name}`);
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
    .then(result => {
      console.log('performed get on ssd-instance:');
      console.log(`Name: ${result[0].name}`);
      console.log(`Metadata: ${JSON.stringify(result[0].metadata)}`);
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
      console.log('deleted the ssd-instance instance');
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

require(`yargs`)
  .demand(1)

  // command to check if instance exists and delete if true
  .command(
    `del-if-exists`,
    `Deletes the Instance if Exists`,
    {},
    delIfExists
  )
  .example(
    `node $0 del-if-exists <instanceId>`,
    `Deletes the Instance if Exists`
  )

  // command to create an instance
  .command(
    `create-instance`,
    `Creates a PRODUCTION instance`,
    {},
    createInstance
  )
  .example(`node $0 create-instance`, `Creates a PRODUCTION instance`)

  // command to list all instances and check 'ssd-instance' is listed
  .command(
    `list`,
    `Lists all instances in the current project.`,
    {},
    listInstances
  )
  .example(`node $0 list`, `Lists all instances in the current project.`)

  // command to get the instance 'ssd-instance'
  .command(
    `get-instance`,
    `Get the Instance`,
    {},
    getInstance
  )
  .example(`node $0 get-instance`, `Get the Instance`)

  // command to delete the instance 'ssd-instance'
  .command(
    `del-instance`,
    `Delete the Instance`,
    {},
    delInstance
  )
  .example(`node $0 del-instance`, `Delete the Instance`)

  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/bigtable/docs`)
  .help()
  .strict().argv;
