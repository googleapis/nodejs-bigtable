// Copyright 2025 Google LLC
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

import {describe, it} from 'mocha';
import {Bigtable} from '../src';
import {setupBigtable} from './client-side-metrics-setup-table';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe.only('Bigtable/ClientSideMetricsExperiment', () => {
  const instanceId1 = 'emulator-test-instance';
  const tableId1 = 'my-table';
  const tableId2 = 'my-table2';
  const columnFamilyId = 'cf1';

  it('should pass the projectId to the metrics handler properly', async () => {
    const bigtable = new Bigtable();
    await setupBigtable(bigtable, columnFamilyId, instanceId1, [
      tableId1,
      tableId2,
    ]);
    const instance = bigtable.instance(instanceId1);
    const table = instance.table(tableId1);
    await table.getRows();
    const table2 = instance.table(tableId2);
    await table2.getRows();
    await sleep(180000);
  });
});
