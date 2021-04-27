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
  create: (instanceId, clusterId) => {
    // [START bigtable_api_create_cluster]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .create()
      .then(result => {
        const cluster = result[0];
        const operation = result[1];
        const apiResponse = result[2];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_cluster]
  },

  delete: (instanceId, clusterId) => {
    // [START bigtable_api_delete_cluster]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .delete()
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_delete_cluster]
  },

  exists: (instanceId, clusterId) => {
    // [START bigtable_api_exists_cluster]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .exists()
      .then(result => {
        const exists = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_exists_cluster]
  },

  get: (instanceId, clusterId) => {
    // [START bigtable_api_get_cluster]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .get()
      .then(result => {
        const cluster = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_cluster]
  },

  getMeta: (instanceId, clusterId) => {
    // [START bigtable_api_cluster_get_meta]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    cluster
      .getMetadata()
      .then(result => {
        const metadata = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_cluster_get_meta]
  },

  setMeta: (instanceId, clusterId) => {
    // [START bigtable_api_cluster_set_meta]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);

    const metadata = {
      nodes: 4,
    };

    cluster
      .setMetadata(metadata)
      .then(result => {
        const operation = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_cluster_set_meta]
  },
};

module.exports = snippets;
