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

const {Bigtable} = require('@google-cloud/bigtable');
const bigtable = new Bigtable();

const snippets = {
  createTable: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_create_table]
    table
      .create()
      .then(result => {
        const table = result[0];
        // let apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_table]
  },

  existsTable: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_exists_table]
    table
      .exists()
      .then(result => {
        const exists = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_exists_table]
  },

  getTable: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_get_table]
    table
      .get()
      .then(result => {
        const table = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_table]
  },

  getMetadata: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_get_table_meta]
    table
      .getMetadata()
      .then(result => {
        const metaData = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_table_meta]
  },

  createFamily: (instanceId, tableId, familyId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_create_family]
    const options = {};
    // options.rule = {
    //   age: {
    //     seconds: 0,
    //     nanos: 5000
    //   },
    //   versions: 3,
    //   union: true
    // };

    table
      .createFamily(familyId, options)
      .then(result => {
        const family = result[0];
        // const apiResponse = result[1];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_create_family]
  },

  getFamilies: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_get_families]
    table
      .getFamilies()
      .then(result => {
        const families = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_families]
  },

  insertRows: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_insert_rows]
    const entries = [
      {
        key: 'alincoln',
        data: {
          follows: {
            gwashington: 1,
          },
        },
      },
    ];

    table
      .insert(entries)
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_insert_rows]
  },

  getRows: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_get_rows]
    const options = {
      keys: ['alincoln', 'gwashington'],
    };
    table
      .getRows(options)
      .then(result => {
        const rows = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_rows]
  },

  mutate: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_mutate_rows]
    const entries = [
      {
        method: 'delete',
        key: 'alincoln',
      },
    ];
    table
      .mutate(entries)
      .then(() => {
        // handle success
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_mutate_rows]
  },

  createReadStream: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_table_readstream]
    table
      .createReadStream()
      .on('error', err => {
        // Handle the error.
      })
      .on('data', row => {
        // `row` is a Row object.
      })
      .on('end', () => {
        // All rows retrieved.
      });
    //-
    // If you anticipate many results, you can end a stream early to prevent
    // unnecessary processing.
    //-
    // table
    //   .createReadStream()
    //   .on('data', function (row) {
    //     this.end();
    //   });

    //-
    // Specify arbitrary keys for a non-contiguous set of rows.
    // The total size of the keys must remain under 1MB, after encoding.
    //-
    // table.createReadStream({
    //   keys: [
    //     'alincoln',
    //     'gwashington'
    //   ]
    // });

    //-
    // Scan for row keys that contain a specific prefix.
    //-
    // table.createReadStream({
    //   prefix: 'gwash'
    // });

    //-
    // Specify a contiguous range of rows to read by supplying `start` and `end`
    // keys.
    //
    // If the `start` key is omitted, it is interpreted as an empty string.
    // If the `end` key is omitted, it is interpreted as infinity.
    //-
    // table.createReadStream({
    //   start: 'alincoln',
    //   end: 'gwashington'
    // });

    //-
    // Specify multiple ranges.
    //-
    // table.createReadStream({
    //   ranges: [{
    //     start: 'alincoln',
    //     end: 'gwashington'
    //   }, {
    //     start: 'tjefferson',
    //     end: 'jadams'
    //   }]
    // });

    //-
    // Apply a {@link Filter} to the contents of the specified rows.
    //-
    // table.createReadStream({
    //   filter: [
    //     {
    //       column: 'gwashington'
    //     }, {
    //       value: 1
    //     }
    //   ]
    // });
    //
    // [END bigtable_api_table_readstream]
  },

  sampleRowKeys: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_sample_row_keys]
    table
      .sampleRowKeys()
      .then(result => {
        const sampleRKeys = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_sample_row_keys]
  },

  getIamPolicy: (instanceId, tableId) => {
    // [START bigtable_api_get_table_Iam_policy]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    table
      .getIamPolicy()
      .then(result => {
        const policy = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_get_table_Iam_policy]
  },

  setIamPolicy: (instanceId, tableId) => {
    // [START bigtable_api_set_table_Iam_policy]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const policy = {
      bindings: [
        {
          role: 'roles/bigtable.viewer',
          members: ['user:mike@example.com', 'group:admins@example.com'],
        },
      ],
    };

    table
      .setIamPolicy(policy)
      .then(result => {
        const setPolicy = result[0];
      })
      .catch(err => {
        // Handle the error
      });
    // [END bigtable_api_set_table_Iam_policy]
  },

  testIamPermissions: (instanceId, tableId) => {
    // [START bigtable_api_test_table_Iam_permissions]
    const {Bigtable} = require('@google-cloud/bigtable');
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    const permissions = ['bigtable.tables.get', 'bigtable.tables.readRows'];
    table
      .testIamPermissions(permissions)
      .then(result => {
        const grantedPermissions = result[0];
      })
      .catch(err => {
        // Handle the error
      });
    // [END bigtable_api_test_table_Iam_permissions]
  },

  delRows: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_del_rows]
    table
      .deleteRows('alincoln')
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_del_rows]
  },

  delTable: (instanceId, tableId) => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);

    // [START bigtable_api_del_table]
    table
      .delete()
      .then(result => {
        const apiResponse = result[0];
      })
      .catch(err => {
        // Handle the error.
      });
    // [END bigtable_api_del_table]
  },
};

module.exports = snippets;
