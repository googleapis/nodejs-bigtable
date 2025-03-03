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
import * as fs from 'node:fs';
import {Bigtable} from '../src';
import {
  ITabularApiSurface,
  OperationMetricsCollector,
} from '../src/client-side-metrics/operation-metrics-collector';
import {IMetricsHandler} from '../src/client-side-metrics/metrics-handler';
import * as proxyquire from 'proxyquire';
import {TabularApiSurface} from '../src/tabular-api-surface';
import {google} from '../protos/protos';

class Logger {
  private messages = '';

  log(message: string) {
    console.log(message);
    this.messages = this.messages + message + '\n';
  }

  getMessages() {
    return this.messages;
  }
}

const logger = new Logger();

/*
class TestMetricsCollector extends OperationMetricsCollector {
  constructor(
      tabularApiSurface: ITabularApiSurface,
      metricsHandlers: IMetricsHandler[],
      methodName: MethodName,
      projectId?: string
  ) {
    super(
        tabularApiSurface,
        metricsHandlers,
        methodName,
        projectId,
        new TestDateProvider(logger)
    );
  }
}
 */

describe('Bigtable/MetricsCollector', () => {
  /*
  const FakeTabularApiSurface = proxyquire('../src/tabular-api-surface.js', {
    './client-side-metrics/operation-metrics-collector': {
      MetricsCollector: TestMetricsCollector,
    },
  }).TabularApiSurface;
  const FakeTable: TabularApiSurface = proxyquire('../src/table.js', {
    './tabular-api-surface.js': {Table: FakeTabularApiSurface},
  }).Table;
  const FakeInstance = proxyquire('../src/instance.js', {
    './table.js': {Table: FakeTable},
  }).Instance;
  const FakeBigtable = proxyquire('../src/index.js', {
    './instance.js': {Table: FakeInstance},
  }).Bigtable;
   */
  const bigtable = new Bigtable();
  const instanceId = 'emulator-test-instance';
  const tableId = 'my-table';
  const columnFamilyId = 'cf1';

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
    for (let i = 0; i < 100; i++) {
      await table.getRows();
    }
    const myString = logger.getMessages(); // 'This is the string I want to write to the file.';
    const filename = 'metricsCollected.txt';
    console.log('waiting');
    await new Promise(resolve => {
      setTimeout(async () => {
        resolve('value');
      }, 30_000);
    });
    console.log('stop waiting');

    // Write the string to the file
    fs.writeFileSync(filename, myString);
  });
});
