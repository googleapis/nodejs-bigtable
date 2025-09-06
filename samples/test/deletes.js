// Copyright 2022 Google LLC
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

const uuid = require('uuid');
const snapshot = require('snap-shot-it');
const {describe, it, before} = require('mocha');
const cp = require('child_process');
const {obtainTestInstance} = require('./util');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});
const TABLE_ID = `mobile-time-series-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules

describe('deletes', async () => {
  let table;
  let INSTANCE_ID;
  const TIMESTAMP = new Date(2019, 5, 1);
  TIMESTAMP.setUTCHours(0);

  before(async () => {
    const instance = await obtainTestInstance();
    INSTANCE_ID = instance.id;
    const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;
    const adminClient = new BigtableTableAdminClient();
    const projectId = await adminClient.getProjectId();
    const request = {
      parent: adminClient.instancePath(projectId, INSTANCE_ID),
      tableId: TABLE_ID,
      table: {
        columnFamilies: {
          stats_summary: {},
          cell_plan: {},
        },
      },
    };
    const tableExists = await adminClient
      .getTable({name: adminClient.tablePath(projectId, INSTANCE_ID, TABLE_ID)})
      .catch(e => (e.code === 5 ? false : e));
    if (tableExists) {
      await adminClient.deleteTable({
        name: adminClient.tablePath(projectId, INSTANCE_ID, TABLE_ID),
      });
    }
    await adminClient.createTable(request);
    table = instance.table(TABLE_ID);

    const rowsToInsert = [
      {
        key: 'phone#4c410523#20190501',
        data: {
          stats_summary: {
            connected_cell: {
              value: 1,
              labels: [],
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 1,
              labels: [],
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190405.003',
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
          cell_plan: {
            data_plan_01gb: {
              value: true,
              labels: [],
              timestamp: TIMESTAMP,
            },
            data_plan_05gb: {
              value: true,
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
        },
      },
      {
        key: 'phone#4c410523#20190502',
        data: {
          stats_summary: {
            connected_cell: {
              value: 1,
              labels: [],
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 1,
              labels: [],
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190405.004',
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
          cell_plan: {
            data_plan_05gb: {
              value: true,
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
        },
      },
      {
        key: 'phone#4c410523#20190505',
        data: {
          stats_summary: {
            connected_cell: {
              value: 0,
              labels: [],
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 1,
              labels: [],
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190406.000',
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
          cell_plan: {
            data_plan_05gb: {
              value: true,
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
        },
      },
      {
        key: 'phone#5c10102#20190501',
        data: {
          stats_summary: {
            connected_cell: {
              value: 1,
              labels: [],
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 1,
              labels: [],
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190401.002',
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
          cell_plan: {
            data_plan_10gb: {
              value: true,
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
        },
      },
      {
        key: 'phone#5c10102#20190502',
        data: {
          stats_summary: {
            connected_cell: {
              value: 1,
              labels: [],
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 0,
              labels: [],
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190406.000',
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
          cell_plan: {
            data_plan_10gb: {
              value: true,
              labels: [],
              timestamp: TIMESTAMP,
            },
          },
        },
      },
    ];

    await table.insert(rowsToInsert);
  });

  function runAndSnapshot(cmd) {
    const deleteSnippetsCommand = `node deleteSnippets ${INSTANCE_ID} ${TABLE_ID} ${cmd}`;
    const stdout = execSync(deleteSnippetsCommand);
    snapshot(stdout);
  }

  it('should delete column from a row', async () => {
    runAndSnapshot('deleteFromColumn');
  });
  it('should delete column family from a row', async () => {
    runAndSnapshot('deleteFromFamily');
  });
  it('should delete a row', async () => {
    runAndSnapshot('deleteFromRow');
  });
  it('should stream rows and then do a batch delete', async () => {
    runAndSnapshot('streamingAndBatching');
  });
  it('should check and mutate', async () => {
    runAndSnapshot('checkAndMutate');
  });
  it('should delete a whole range of rows', async () => {
    runAndSnapshot('dropRowRange');
  });
  it('should delete a column family', async () => {
    runAndSnapshot('deleteColumnFamily');
  });
  it('should delete a table', async () => {
    runAndSnapshot('deleteTable');
  });
});
