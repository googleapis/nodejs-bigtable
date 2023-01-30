// Copyright 2020 Google LLC
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

const assert = require('assert');
const {execSync} = require('child_process');
const path = require('path');
const requestRetry = require('requestretry');
const uuid = require('uuid');
const {obtainTestInstance} = require('./util');
const {describe, it, before, after} = require('mocha');

const PORT = 9010;
const BASE_URL = `http://localhost:${PORT}`;
const cwd = path.join(__dirname, '..');

const TABLE_ID = `mobile-time-series-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules

describe('functions', async () => {
  // The following `obtainTestInstance` line needs to be moved into `before`.
  // This needs to happen when we get the functions tests running again.
  const instance = await obtainTestInstance();
  const INSTANCE_ID = instance.id;
  let table;
  const TIMESTAMP = new Date(2019, 5, 1);
  TIMESTAMP.setUTCHours(0);

  let ffProc;

  before(async () => {
    table = instance.table(TABLE_ID);

    await table.create().catch(console.error);
    await table.createFamily('stats_summary').catch(console.error);

    const rowsToInsert = [
      {
        key: 'phone#4c410523#20190501',
        data: {
          stats_summary: {
            connected_cell: {
              value: 1,
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 1,
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190405.003',
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
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 1,
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190405.004',
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
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 1,
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190406.000',
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
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 1,
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190401.002',
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
              timestamp: TIMESTAMP,
            },
            connected_wifi: {
              value: 0,
              timestamp: TIMESTAMP,
            },
            os_build: {
              value: 'PQ2A.190406.000',
              timestamp: TIMESTAMP,
            },
          },
        },
      },
    ];

    await table.insert(rowsToInsert).catch(console.error);

    // Run the functions-framework instance to host functions locally
    // exec's 'timeout' param won't kill children of "shim" /bin/sh process
    // Workaround: include "& sleep <TIMEOUT>; kill $!" in executed command
    ffProc = execSync(
      `functions-framework --target=readRows --signature-type=http --port ${PORT} & sleep 2; kill $!`,
      {shell: true, cwd}
    );
  });

  after(async () => {
    // Wait for the functions framework to stop
    await ffProc;
  });

  it('should read one row', async () => {
    const response = await requestRetry({
      url: `${BASE_URL}/readRows`,
      method: 'GET',
      body: {
        instanceId: INSTANCE_ID,
        tableId: TABLE_ID,
      },
      retryDelay: 200,
      json: true,
    });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(
      response.body,
      `rowkey: phone#4c410523#20190501, os_build: PQ2A.190405.003
rowkey: phone#4c410523#20190502, os_build: PQ2A.190405.004
rowkey: phone#4c410523#20190505, os_build: PQ2A.190406.000
rowkey: phone#5c10102#20190501, os_build: PQ2A.190401.002
rowkey: phone#5c10102#20190502, os_build: PQ2A.190406.000
`
    );
  });
});
