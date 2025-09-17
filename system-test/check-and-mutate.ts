// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as assert from 'assert';
import {before, after, describe, it} from 'mocha';

import {Bigtable} from '../src';
import {RawFilter} from '../src/filter';
import {generateId} from './common';

describe('Bigtable#checkAndMutate', () => {
  const bigtable = new Bigtable();
  const instance = bigtable.instance(generateId('instance'));
  const table = instance.table(generateId('table'));
  const CLUSTER_ID = generateId('cluster');
  const FAMILY_ID = 'users';

  before(async () => {
    try {
      const [, operation] = await instance.create({
        clusters: [
          {
            id: CLUSTER_ID,
            location: 'us-central1-c',
            nodes: 1,
          },
        ],
        labels: {
          time_created: Date.now(),
        },
      });
      await operation.promise();
      await table.create({
        families: [FAMILY_ID],
      });
    } catch (e) {
      console.error('Error setting up the test structure:', e);
      throw e;
    }
  });

  after(async () => {
    try {
      await instance.delete();
    } catch (e) {
      console.error('Error tearing down the test structure:', e);
    }
  });

  it('should demonstrate checkAndMutate with onMatch and onNoMatch', async () => {
    const rowId = 'user1';
    const row = table.row(rowId);

    const initialData = {
      key: rowId,
      data: {
        [FAMILY_ID]: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          status: 'active',
        },
      },
    };

    console.log('Populating table with initial data...');
    await table.insert(initialData);

    let [rowData] = await row.get();
    console.log('Initial data in table:');
    console.log(JSON.stringify(rowData.data, null, 2));

    // Scenario 1: Filter matches, onMatch mutations are applied.
    console.log('\nExecuting checkAndMutate with a matching filter...');
    const onMatchFilter: RawFilter = {
      family: FAMILY_ID,
      column: 'status',
      value: 'active',
    };

    const onMatchMutations = [
      {
        method: 'delete',
        data: [`${FAMILY_ID}:status`],
      },
      {
        method: 'insert',
        data: {
          [FAMILY_ID]: {
            status: 'inactive',
            last_modified: new Date(),
          },
        },
      },
    ];

    const onNoMatchMutations = [
      {
        method: 'insert',
        data: {
          [FAMILY_ID]: {
            error: 'unexpected_status',
          },
        },
      },
    ];

    let [matched] = await row.filter(onMatchFilter, {
      onMatch: onMatchMutations,
      onNoMatch: onNoMatchMutations,
    });
    assert.strictEqual(matched, true, 'The onMatch filter should have matched.');

    [rowData] = await row.get();
    console.log('Data after onMatch mutations:');
    console.log(JSON.stringify(rowData.data, null, 2));

    assert.strictEqual(
      rowData.data[FAMILY_ID].status[0].value,
      'inactive',
      "Status should be 'inactive'",
    );
    assert(
      rowData.data[FAMILY_ID].last_modified,
      'last_modified should exist',
    );
    assert.strictEqual(
      rowData.data[FAMILY_ID].error,
      undefined,
      'error should not exist',
    );

    // Scenario 2: Filter does not match, onNoMatch mutations are applied.
    console.log('\nExecuting checkAndMutate with a non-matching filter...');
    const onNoMatchFilter: RawFilter = {
      family: FAMILY_ID,
      column: 'status',
      value: 'active', // This will not match, as status is now 'inactive'
    };

    const onMatchMutations2 = [
      {
        method: 'insert',
        data: {
          [FAMILY_ID]: {
            error: 'unexpected_match',
          },
        },
      },
    ];

    const onNoMatchMutations2 = [
      {
        method: 'delete',
        data: [`${FAMILY_ID}:status`],
      },
      {
        method: 'insert',
        data: {
          [FAMILY_ID]: {
            status: 'archived',
            archived_by: 'system',
          },
        },
      },
    ];

    [matched] = await row.filter(onNoMatchFilter, {
      onMatch: onMatchMutations2,
      onNoMatch: onNoMatchMutations2,
    });
    assert.strictEqual(
      matched,
      false,
      'The onNoMatch filter should not have matched.',
    );

    [rowData] = await row.get();
    console.log('Data after onNoMatch mutations:');
    console.log(JSON.stringify(rowData.data, null, 2));

    assert.strictEqual(
      rowData.data[FAMILY_ID].status[0].value,
      'archived',
      "Status should be 'archived'",
    );
    assert(rowData.data[FAMILY_ID].archived_by, 'archived_by should exist');
    assert.strictEqual(
      rowData.data[FAMILY_ID].error,
      undefined,
      'error should not exist',
    );
  });
});
