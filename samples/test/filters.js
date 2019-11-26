/**
 * Copyright 2019, Google, Inc.
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

'use strict';
const uuid = require(`uuid`);

const {assert} = require('chai');
const cp = require('child_process');
const Bigtable = require('@google-cloud/bigtable');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const INSTANCE_ID = `nodejs-bigtable-samples-keepme`;
const TABLE_ID = `mobile-time-series-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules

describe('filters', async () => {
  const bigtable = Bigtable();
  const instance = bigtable.instance(INSTANCE_ID);
  let table;
  const TIMESTAMP = new Date();
  let TIMESTAMP_MINUS_HR = new Date(TIMESTAMP);
  TIMESTAMP_MINUS_HR = new Date(
    TIMESTAMP_MINUS_HR.setHours(TIMESTAMP_MINUS_HR.getHours() - 1)
  );
  const TIMESTAMP_SECS = TIMESTAMP.getTime() * 1000;
  const TIMESTAMP_MINUS_HR_SECS = TIMESTAMP_MINUS_HR.getTime() * 1000;

  before(async function() {
    this.timeout(20000);
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
              timestamp: TIMESTAMP_MINUS_HR,
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
    const result = `Reading data for`;
    assert.equal(stdout.includes(result), true);
  });

  it('should filter with row regex', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterRowRegex`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_01gb: true @${TIMESTAMP_SECS}
\tdata_plan_01gb: false @${TIMESTAMP_MINUS_HR_SECS}
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190401.002 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with cells per col', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterCellsPerCol`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_01gb: true @${TIMESTAMP_SECS}
\tdata_plan_01gb: false @${TIMESTAMP_MINUS_HR_SECS}
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190405.004 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190401.002 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 0 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with cells per row', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterCellsPerRow`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 0 @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with cells per row offset', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterCellsPerRowOffset`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_01gb: true @${TIMESTAMP_SECS}
\tdata_plan_01gb: false @${TIMESTAMP_MINUS_HR_SECS}
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tos_build: PQ2A.190405.004 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tos_build: PQ2A.190401.002 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with col family regex', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterColFamilyRegex`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190405.004 @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190401.002 @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 0 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with col qualifier regex', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterColQualifierRegex`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 0 @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with col range', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterColRange`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family cell_plan
\tdata_plan_01gb: true @${TIMESTAMP_SECS}
\tdata_plan_01gb: false @${TIMESTAMP_MINUS_HR_SECS}
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with value range', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterValueRange`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tos_build: PQ2A.190405.004 @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with value regex', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterValueRegex`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tos_build: PQ2A.190405.004 @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tos_build: PQ2A.190401.002 @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with timestamp range', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterTimestampRange`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family cell_plan
\tdata_plan_01gb: false @${TIMESTAMP_MINUS_HR_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with block all', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterBlockAll`
    );
    const result = ``;
    assert.equal(stdout, result);
  });

  it('should filter with pass all', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterPassAll`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_01gb: true @${TIMESTAMP_SECS}
\tdata_plan_01gb: false @${TIMESTAMP_MINUS_HR_SECS}
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190405.004 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190401.002 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 0 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with strip value', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterStripValue`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell:  @${TIMESTAMP_SECS}
\tconnected_wifi:  @${TIMESTAMP_SECS}
\tos_build:  @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_01gb:  @${TIMESTAMP_SECS}
\tdata_plan_01gb:  @${TIMESTAMP_MINUS_HR_SECS}
\tdata_plan_05gb:  @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell:  @${TIMESTAMP_SECS}
\tconnected_wifi:  @${TIMESTAMP_SECS}
\tos_build:  @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb:  @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell:  @${TIMESTAMP_SECS}
\tconnected_wifi:  @${TIMESTAMP_SECS}
\tos_build:  @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb:  @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell:  @${TIMESTAMP_SECS}
\tconnected_wifi:  @${TIMESTAMP_SECS}
\tos_build:  @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb:  @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell:  @${TIMESTAMP_SECS}
\tconnected_wifi:  @${TIMESTAMP_SECS}
\tos_build:  @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb:  @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should filter with label', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterApplyLabel`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS} [labelled]
\tconnected_wifi: 1 @${TIMESTAMP_SECS} [labelled]
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS} [labelled]
Column Family cell_plan
\tdata_plan_01gb: true @${TIMESTAMP_SECS} [labelled]
\tdata_plan_01gb: false @${TIMESTAMP_MINUS_HR_SECS} [labelled]
\tdata_plan_05gb: true @${TIMESTAMP_SECS} [labelled]

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS} [labelled]
\tconnected_wifi: 1 @${TIMESTAMP_SECS} [labelled]
\tos_build: PQ2A.190405.004 @${TIMESTAMP_SECS} [labelled]
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS} [labelled]

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @${TIMESTAMP_SECS} [labelled]
\tconnected_wifi: 1 @${TIMESTAMP_SECS} [labelled]
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS} [labelled]
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS} [labelled]

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS} [labelled]
\tconnected_wifi: 1 @${TIMESTAMP_SECS} [labelled]
\tos_build: PQ2A.190401.002 @${TIMESTAMP_SECS} [labelled]
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS} [labelled]

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS} [labelled]
\tconnected_wifi: 0 @${TIMESTAMP_SECS} [labelled]
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS} [labelled]
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS} [labelled]

`;
    assert.equal(stdout, result);
  });
  it('should filter with chain', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterChain`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family cell_plan
\tdata_plan_01gb: true @${TIMESTAMP_SECS}
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });
  it('should filter with interleave', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterInterleave`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_01gb: true @${TIMESTAMP_SECS}
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tos_build: PQ2A.190405.004 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tos_build: PQ2A.190401.002 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS}
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });
  it('should filter with condition', async () => {
    const stdout = execSync(
      `node filterSnippets ${INSTANCE_ID} ${TABLE_ID} filterCondition`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS} [filtered-out]
\tconnected_wifi: 1 @${TIMESTAMP_SECS} [filtered-out]
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS} [filtered-out]
Column Family cell_plan
\tdata_plan_01gb: true @${TIMESTAMP_SECS} [filtered-out]
\tdata_plan_01gb: false @${TIMESTAMP_MINUS_HR_SECS} [filtered-out]
\tdata_plan_05gb: true @${TIMESTAMP_SECS} [filtered-out]

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS} [filtered-out]
\tconnected_wifi: 1 @${TIMESTAMP_SECS} [filtered-out]
\tos_build: PQ2A.190405.004 @${TIMESTAMP_SECS} [filtered-out]
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS} [filtered-out]

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @${TIMESTAMP_SECS} [filtered-out]
\tconnected_wifi: 1 @${TIMESTAMP_SECS} [filtered-out]
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS} [filtered-out]
Column Family cell_plan
\tdata_plan_05gb: true @${TIMESTAMP_SECS} [filtered-out]

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS} [passed-filter]
\tconnected_wifi: 1 @${TIMESTAMP_SECS} [passed-filter]
\tos_build: PQ2A.190401.002 @${TIMESTAMP_SECS} [passed-filter]
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS} [passed-filter]

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS} [passed-filter]
\tconnected_wifi: 0 @${TIMESTAMP_SECS} [passed-filter]
\tos_build: PQ2A.190406.000 @${TIMESTAMP_SECS} [passed-filter]
Column Family cell_plan
\tdata_plan_10gb: true @${TIMESTAMP_SECS} [passed-filter]

`;
    assert.equal(stdout, result);
  });
});
