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
  create: (instanceId, clusterId, callback) => {
    // [START bigtable_create_cluster]
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .create()
      .then(function(data) {
        const cluster = data[0];
        const operation = data[1];
        const apiResponse = data[2];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_create_cluster]

    callback();
  },

  delete: (instanceId, clusterId, callback) => {
    // [START bigtable_delete_cluster]
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .delete()
      .then(function(data) {
        let apiResponse = data[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_delete_cluster]

    callback();
  },

  exists: (instanceId, clusterId, callback) => {
    // [START bigtable_exists_cluster]
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .exists()
      .then(data => {
        let exists = data[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_exists_cluster]

    callback();
  },

  get: (instanceId, clusterId, callback) => {
    // [START bigtable_get_cluster]
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .get()
      .then(data => {
        let cluster = data[0];
        let apiResponse = data[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_cluster]

    callback();
  },

  getMeta: (instanceId, clusterId, callback) => {
    // [START bigtable_cluster_get_meta]
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .getMetadata()
      .then(data => {
        let metadata = data[0];
        let apiResponse = data[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_cluster_get_meta]

    callback();
  },

  setMeta: (instanceId, clusterId, callback) => {
    // [START bigtable_cluster_set_meta]
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    const metadata = {
      nodes: 4,
    };

    cluster
      .setMetadata(metadata)
      .then(data => {
        const operation = data[0];
        const apiResponse = data[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_cluster_set_meta]
    callback();
  },
};

module.exports = snippets;
