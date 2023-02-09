// Copyright 2019 Google LLC
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

describe('reads', async () => {
  let INSTANCE_ID;
  let table;

  before(async () => {
    const instance = await obtainTestInstance();
    INSTANCE_ID = instance.id;

    const TIMESTAMP = new Date(2019, 5, 1);
    TIMESTAMP.setUTCHours(0);

    table = instance.table(TABLE_ID);
    await table.create();
    await table.createFamily('stats_summary');

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

    await table.insert(rowsToInsert);
  });

  it('should read one row', async () => {
    const stdout = execSync(`node readSnippets ${INSTANCE_ID} ${TABLE_ID}`);
    snapshot(stdout);
  });

  it('should read part of one row', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readRowPartial`
    );
    snapshot(stdout);
  });

  it('should read multiple rows', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readRows`
    );
    snapshot(stdout);
  });

  it('should read a range of rows', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readRowRange`
    );
    snapshot(stdout);
  });

  it('should read multiple ranges of rows', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readRowRanges`
    );
    snapshot(stdout);
  });

  it('should read using a row prefix', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readPrefix`
    );
    snapshot(stdout);
  });

  it('should read with a filter', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readFilter`
    );

    snapshot(stdout);
  });
});
