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
  createColmFamily: (instanceId, tableId, familyId) => {
    // [START bigtable_api_create_family]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    family
      .create()
      .then(result => {
        const family = result[0];
        // let apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_family]
  },
  existsFamily: (instanceId, tableId, familyId) => {
    // [START bigtable_api_exists_family]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    family
      .exists()
      .then(result => {
        const exists = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_exists_family]
  },
  getFamily: (instanceId, tableId, familyId) => {
    // [START bigtable_api_get_family]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    family
      .get()
      .then(result => {
        const family = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_family]
  },
  getMetadata: (instanceId, tableId, familyId) => {
    // [START bigtable_api_get_family_meta]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    family
      .getMetadata()
      .then(result => {
        const metaData = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_family_meta]
  },
  setMetadata: (instanceId, tableId, familyId) => {
    // [START bigtable_api_set_family_meta]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    const metadata = {
      rule: {
        versions: 2,
        union: true,
      },
    };

    family
      .setMetadata(metadata)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_set_family_meta]
  },
  delFamily: (instanceId, tableId, familyId) => {
    // [START bigtable_api_del_family]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const family = table.family(familyId);

    family
      .delete()
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_del_family]
  },
};

module.exports = snippets;
