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
import * as assert from 'assert';
import {describe, it, before, after} from 'mocha';

describe.only('Bigtable/Table#getRows', () => {
  const bigtable = new Bigtable({
    projectId: 'cloud-native-db-dpes-shared',
  });
  const instanceId = 'emulator-test-instance';
  const tableId = 'my-table';
  const columnFamilyId = 'cf1';
  const clusterId = 'test-cluster';
  const location = 'us-central1-c';

  before(async () => {
    const instance = bigtable.instance(instanceId);
    try {
      const [instanceInfo] = await instance.exists();
      if (!instanceInfo) {
        const [, operation] = await instance.create({
          clusters: {
            id: 'fake-cluster3',
            location: 'us-west1-c',
            nodes: 1,
          },
        });
        await operation.promise();
      }

      const table = instance.table(tableId);
      const [tableExists] = await table.exists();
      if (!tableExists) {
        await table.create({families: [columnFamilyId]}); // Create column family
      } else {
        // Check if column family exists and create it if not.
        const [families] = await table.getFamilies();

        if (!families.some(family => family.id === columnFamilyId)) {
          await table.createFamily(columnFamilyId);
        }
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
    for (let i = 0; i < 100; i++) {
      console.log(await table.getRows());
    }
  });
});
