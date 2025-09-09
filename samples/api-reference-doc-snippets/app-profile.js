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
  create: (instanceId, appProfileId) => {
    // [START bigtable_api_create_app_profile]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);
    // set routing policy, required for creating an app-profile
    const options = {
      routing: 'any',
    };

    appProfile
      .create(options)
      .then(result => {
        const appProfile = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_app_profile]
  },

  delete: (instanceId, appProfileId) => {
    // [START bigtable_api_delete_app_profile]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);

    appProfile
      .delete()
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_delete_app_profile]
  },

  exists: (instanceId, appProfileId) => {
    // [START bigtable_api_exists_app_profile]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);

    appProfile
      .exists()
      .then(result => {
        const exists = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_exists_app_profile]
  },

  get: (instanceId, appProfileId) => {
    // [START bigtable_api_get_app_profile]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);

    appProfile
      .get()
      .then(result => {
        const appProfile = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_app_profile]
  },

  getMeta: (instanceId, appProfileId) => {
    // [START bigtable_api_app_profile_get_meta]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const appProfile = instance.appProfile(appProfileId);

    appProfile
      .getMetadata()
      .then(result => {
        const metadata = result[0];
        const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_app_profile_get_meta]
  },

  setMeta: (instanceId, appProfileId, clusterId) => {
    // [START bigtable_api_app_profile_set_meta]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
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
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_app_profile_set_meta]
  },
};

module.exports = snippets;
