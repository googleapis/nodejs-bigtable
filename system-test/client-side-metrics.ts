// Copyright 2024 Google LLC
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



import {Bigtable} from '../src';
import {Mutation} from '../src/mutation';
import * as assert from 'assert';
import {describe, it, before, after} from 'mocha';

describe.only('Bigtable/Table#getRows', () => {
  const bigtable = new Bigtable();
  const instanceId = 'emulator-test-instance';
  const tableId = 'my-table';
  const clusterId = 'test-cluster';
  const location = 'us-central1-c';

  before(async () => {
    const instance = bigtable.instance(instanceId);
    try {
      const [instanceInfo] = await instance.exists();
      if (!instanceInfo) {
        const [,operation] = await instance.create({ // Fix: Destructure correctly
          clusters: {  // Fix: Use computed property name
            [clusterId]: {
              location,
              nodes: 3,
            },
          },
        } as any); // any cast resolves type mismatch for options.
        await operation.promise();
      }

      const table = instance.table(tableId);
      const [tableExists] = await table.exists();
      if (!tableExists) {
        await table.create();
      }
    } catch (error) {
      console.error('Error during setup:', error);
      // Consider re-throwing error, to actually stop tests.
    }
  });

  after(async () => {
    const instance = bigtable.instance(instanceId);
    await instance.delete({});
  });


  it('should read rows after inserting data', async () => {
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    const rows = [
      {
        key: 'row1',
        data: {
          cf1: {
            q1: 'value1',
          },
        },
      },
      {
        key: 'row2',
        data: {
          cf1: {
            q2: 'value2',
          },
        },
      },
    ];
    await table.insert(rows);
    const retrievedRows = await table.getRows();
    assert.strictEqual(retrievedRows[0].length, 2);
    const row1 = retrievedRows[0].find(row => row.key === 'row1');
    assert(row1);
    const row1Data = row1.data;
    assert.deepStrictEqual(row1Data, rows[0].data);
    const row2 = retrievedRows[0].find(row => row.key === 'row2');
    assert(row2);
    const row2Data = row2.data;
    assert.deepStrictEqual(row2Data, rows[1].data);
  });
});
