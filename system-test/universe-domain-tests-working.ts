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

import {describe, it, before, after} from 'mocha';
import {Bigtable} from '../src';
import * as proxyquire from 'proxyquire';
import * as mocha from 'mocha';

describe.only('TPC using the client option', () => {
  async function mockBigtable() {
    const instance = bigtable.instance(instanceId);
    const [instanceInfo] = await instance.exists();
    console.log('after exists');
    if (!instanceInfo) {
      const [, operation] = await instance.create({
        clusters: {
          id: 'fake-cluster3',
          location: 'u-us-prp1-a',
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
  }

  const instanceId = 'emulator-test-instance';
  const tableId = 'my-table';
  const columnFamilyId = 'cf1';
  let bigtable: Bigtable;

  before(async () => {
    // This line is added just to make sure the bigtable variable is assigned.
    // It is needed to solve a compile time error in the after hook.
    const universeDomain = 'apis-tpczero.goog'; // or your universe domain if not using emulator
    const options = {
      universeDomain,
    };
    process.env.GOOGLE_APPLICATION_CREDENTIALS =
      '/Users/djbruce/Documents/Programming/keys/tpc_sa_key.json';
    bigtable = new Bigtable(options);
  });

  after(async () => {
    try {
      // If the instance has been deleted already by another source, we don't
      // want this after hook to block the continuous integration pipeline.
      const instance = bigtable.instance(instanceId);
      await instance.delete({});
    } catch (e) {
      console.warn('The instance has been deleted already');
    }
  });

  it('should send the metrics to the metrics handler for a ReadRows call', done => {
    (async () => {
      try {
        const instance = bigtable.instance(instanceId);
        const table = instance.table(tableId);
        await mockBigtable();
        await table.getRows();
        console.log('done');
        done();
      } catch (e) {
        done(e);
      }
    })();
  });
});
