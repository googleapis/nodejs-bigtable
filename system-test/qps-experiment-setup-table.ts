// Copyright 2025 Google LLC
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
import {describe} from 'mocha';

describe('Bigtable/ClientSideMetricsSetupLargeTable', () => {
  it('test', done => {
    async function setupBigtable(
      bigtable: Bigtable,
      columnFamilyId: string,
      instanceId: string,
      tableIds: string[]
    ) {
      try {
        const instance = bigtable.instance(instanceId);
        const [instanceInfo] = await instance.exists();
        while (!instanceInfo) {
          const [, operation] = await instance.create({
            clusters: {
              id: 'fake-cluster3',
              location: 'us-west1-c',
              nodes: 1,
            },
          });
          await operation.promise();
          /**
           * For whatever reason, even after waiting for an operation.promise()
           * call to complete, the instance still doesn't seem to be ready yet so
           * we do another check to ensure the instance is ready.
           */
          const [instanceInfoAgain] = await instance.exists();
          if (instanceInfoAgain) {
            break;
          }
        }
        const tables = tableIds.map(tableId => instance.table(tableId));
        for (const currentTable of tables) {
          const [tableExists] = await currentTable.exists();
          if (!tableExists) {
            await currentTable.create({families: [columnFamilyId]}); // Create column family
          } else {
            // Check if column family exists and create it if not.
            const [families] = await currentTable.getFamilies();

            if (
              !families.some(
                (family: {id: string}) => family.id === columnFamilyId
              )
            ) {
              await currentTable.createFamily(columnFamilyId);
            }
          }
          let entries = [];
          for (let i = 0; i < 10000000; i++) {
            console.log(i);
            entries.push({
              key: `rowId-${i}`,
              data: {
                [columnFamilyId]: {
                  gwashington: 1,
                  tjefferson: 1,
                },
              },
            });
            if (i % 10000 === 0) {
              await currentTable.insert(entries);
              entries = [];
            }
          }
          console.log('inserting');
          // Add some data so that a firstResponseLatency is recorded.
          await currentTable.insert(entries);
          console.log('done');
          done();
        }
      } catch (e) {
        done(e);
      }
    }
    const bigtable = new Bigtable();
    const columnFamilyId = 'family-id';
    const instanceId = 'large-table-instance-id';
    const tableIds = ['large-table'];
    setupBigtable(bigtable, columnFamilyId, instanceId, tableIds);
  });
});
