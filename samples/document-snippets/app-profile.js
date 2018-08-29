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
  create: (instanceId, appProfileId) => {
    // [START bigtable_create_app_profile]
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);

    appProfile
      .create()
      .then(data => {
        const appProfile = data[0];
        const apiResponse = data[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_create_app_profile]
  },

  delete: (instanceId, appProfileId) => {
    // [START bigtable_delete_app_profile]
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);

    appProfile
      .delete()
      .then(data => {
        const apiResponse = data[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_delete_app_profile]
  },

  exists: (instanceId, appProfileId) => {
    // [START bigtable_exists_app_profile]
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);

    appProfile
      .exists()
      .then(data => {
        const exists = data[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_exists_app_profile]
  },

  get: (instanceId, appProfileId) => {
    // [START bigtable_get_app_profile]
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);

    appProfile
      .get()
      .then(data => {
        const appProfile = data[0];
        const apiResponse = data[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_get_app_profile]
  },

  getMeta: (instanceId, appProfileId) => {
    // [START bigtable_app_profile_get_meta]
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);

    appProfile
      .getMetadata()
      .then(data => {
        const metadata = data[0];
        const apiResponse = data[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_app_profile_get_meta]
  },

  setMeta: (instanceId, appProfileId, clusterId) => {
    // [START bigtable_app_profile_set_meta]
    const instance = bigtable.instance(instanceId);
    const cluster = instance.cluster(clusterId);
    const appProfile = instance.appProfile(appProfileId);

    const metadata = {
      description: 'My Updated App Profile',
      routing: cluster,
      allowTransactionalWrites: true,
    };

    appProfile
      .setMetadata(metadata)
      .then(data => {
        const apiResponse = data[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_app_profile_set_meta]
  },
};

module.exports = snippets;
