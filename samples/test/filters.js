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
const {assert} = require('chai');
const {describe, it, before, after} = require('mocha');
const cp = require('child_process');
const {obtainTestInstance} = require('./util');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});
const runId = uuid.v4().split('-')[0];
const TABLE_ID = `mobile-time-series-${runId}`;

describe('filters', async () => {
  let table;
  let INSTANCE_ID;
  const TIMESTAMP = new Date(2019, 5, 1);
  TIMESTAMP.setUTCHours(0);
  const TIMESTAMP_OLDER = new Date(2019, 4, 30);
  TIMESTAMP_OLDER.setUTCHours(0);

  before(async () => {
    const instance = await obtainTestInstance();
    INSTANCE_ID = instance.id;
    table = instance.table(TABLE_ID);

    await table.create().catch(console.error);
    await table.createFamily('stats_summary').catch(console.error);
    await table.createFamily('cell_plan').catch(console.error);

    const rowsToInsert = [
      {
        key: 'phone#4c410523#20190501',
        data: {
          cell_plan: {
            data_plan_01gb: {
              value: 'false',
              timestamp: TIMESTAMP_OLDER,
            },
          },
        },
      },
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
          cell_plan: {
            data_plan_01gb: {
              value: 'true',
              timestamp: TIMESTAMP,
            },
            data_plan_05gb: {
              value: 'true',
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
          cell_plan: {
            data_plan_05gb: {
              value: 'true',
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
          cell_plan: {
            data_plan_05gb: {
              value: 'true',
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
          cell_plan: {
            data_plan_10gb: {
              value: 'true',
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
          cell_plan: {
            data_plan_10gb: {
              value: 'true',
              timestamp: TIMESTAMP,
            },
          },
        },
      },
    ];

    await table.insert(rowsToInsert).catch(console.error);
  });

  after(async () => {
    await table.delete().catch(console.error);
  });

  it('should filter with row sample', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterRowSample`
    );
    console.log('stdout', stdout);
    assert.include(stdout, 'Reading data for');
  });

  it('should filter with row regex', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterRowRegex`
    );

    snapshot(stdout);
  });

  it('should filter with cells per col', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterCellsPerCol`
    );

    snapshot(stdout);
  });

  it('should filter with cells per row', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterCellsPerRow`
    );

    snapshot(stdout);
  });

  it('should filter with cells per row offset', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterCellsPerRowOffset`
    );

    snapshot(stdout);
  });

  it('should filter with col family regex', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterColFamilyRegex`
    );

    snapshot(stdout);
  });

  it('should filter with col qualifier regex', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterColQualifierRegex`
    );

    snapshot(stdout);
  });

  it('should filter with col range', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterColRange`
    );

    snapshot(stdout);
  });

  it('should filter with value range', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterValueRange`
    );

    snapshot(stdout);
  });

  it('should filter with value regex', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterValueRegex`
    );

    snapshot(stdout);
  });

  it('should filter with timestamp range', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterTimestampRange`
    );

    snapshot(stdout);
  });

  it('should filter with block all', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterBlockAll`
    );
    const result = '';
    assert.equal(stdout, result);
  });

  it('should filter with pass all', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterPassAll`
    );

    snapshot(stdout);
  });

  it('should filter with strip value', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterStripValue`
    );

    snapshot(stdout);
  });

  it('should filter with label', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterApplyLabel`
    );

    snapshot(stdout);
  });
  it('should filter with chain', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterChain`
    );

    snapshot(stdout);
  });
  it('should filter with interleave', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterInterleave`
    );

    snapshot(stdout);
  });
  it('should filter with condition', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterCondition`
    );

    snapshot(stdout);
  });
});
