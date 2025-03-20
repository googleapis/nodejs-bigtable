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

import {describe, it, before, after} from 'mocha';
import {Bigtable} from '../src/.';

async function createColumnFamilyIfNotExists(
  projectId: string,
  instanceId: string,
  tableId: string,
  columnFamilyId: string
) {
  const bigtable = new Bigtable({projectId});
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  try {
    const [tableExists] = await table.exists();
    if (!tableExists) {
      console.log(
        `Table ${tableId} does not exist. Cannot create column family.`
      );
      return;
    }

    // Check if the column family exists
    const [families] = await table.getFamilies();
    const familyExists = families.some(family => family.id === columnFamilyId);

    if (!familyExists) {
      console.log(
        `Column family ${columnFamilyId} does not exist. Creating it...`
      );
      await table.createFamily(columnFamilyId);
      console.log(`Column family ${columnFamilyId} created successfully.`);
    } else {
      console.log(`Column family ${columnFamilyId} already exists.`);
    }
  } catch (error) {
    console.error(
      `Error while checking or creating column family ${columnFamilyId}:`,
      error
    );
  }
}

// Example Usage (replace with your actual values):
const projectId = 'your-project-id'; // Replace with your project ID
const instanceId = 'your-instance-id'; // Replace with your instance ID
const tableId = 'your-table-id'; // Replace with your table ID
const columnFamilyId = 'stats_summary';

describe.only('Bigtable/IterativeTest', () => {
  const instanceId = 'emulator-test-instance';
  const tableId = 'my-table';
  const columnFamilyId = 'cf1';
  const bigtable = new Bigtable();

  before(async () => {
    // TODO: Change `any`
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

        if (
          !families.some((family: {id: string}) => family.id === columnFamilyId)
        ) {
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

    const timestamp = new Date();
    const projectId: string = await new Promise((resolve, reject) => {
      bigtable.getProjectId_((err, projectId) => {
        if (err) {
          reject(err);
        } else {
          resolve(projectId as string);
        }
      });
    });
    await createColumnFamilyIfNotExists(
      projectId,
      instanceId,
      tableId,
      'stats_summary' // columnFamilyId
    );
    for (let i = 0; i < 100; i++) {
      const rowToInsert = {
        key: `key-${i}`,
        data: {
          stats_summary: {
            connected_cell: {
              value: 1,
              timestamp,
            },
            connected_wifi: {
              value: 1,
              timestamp,
            },
            os_build: {
              value: 'PQ2A.190405.003',
              timestamp,
            },
          },
        },
      };
      await table.insert([rowToInsert]);
    }
    const stream = table.createReadStream();
    for await (const row of stream) {
      console.log('printing row id');
      console.log(row.id);
    }
  });
});
