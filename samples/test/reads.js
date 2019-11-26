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

describe('reads', async () => {
  const bigtable = Bigtable();
  const instance = bigtable.instance(INSTANCE_ID);
  let table;
  const TIMESTAMP = new Date();
  const TIMESTAMP_SECS = TIMESTAMP.getTime() * 1000;

  before(async function() {
    this.timeout(20000);
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
  });

  after(async () => {
    await table.delete().catch(console.error);
  });

  it('should read one row', async () => {
    const stdout = execSync(`node readSnippets ${INSTANCE_ID} ${TABLE_ID}`);
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @${TIMESTAMP_SECS}
\tconnected_wifi: 1 @${TIMESTAMP_SECS}
\tos_build: PQ2A.190405.003 @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should read part of one row', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readRowPartial`
    );
    const result = `Reading data for phone#4c410523#20190501:
Column Family stats_summary
	os_build: PQ2A.190405.003 @${TIMESTAMP_SECS}

`;
    assert.equal(stdout, result);
  });

  it('should read multiple rows', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readRows`
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

`;
    assert.equal(stdout, result);
  });

  it('should read a range of rows', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readRowRange`
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

`;
    assert.equal(stdout, result);
  });

  it('should read multiple ranges of rows', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readRowRanges`
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

  it('should read using a row prefix', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readPrefix`
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

  it('should read with a filter', async () => {
    const stdout = execSync(
      `node readSnippets ${INSTANCE_ID} ${TABLE_ID} readFilter`
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
});
