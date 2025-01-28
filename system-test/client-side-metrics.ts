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
import {describe, it, before, after} from 'mocha';
import * as fs from 'node:fs';
import {TestMetricsHandler} from '../common/test-metrics-handler';
import {
  ITabularApiSurface,
  MetricsCollector,
} from '../src/client-side-metrics/metrics-collector';
import {IMetricsHandler} from '../src/client-side-metrics/metrics-handler';
import {TestDateProvider} from '../common/test-date-provider';
import * as proxyquire from 'proxyquire';
import {FakeCluster} from './common';
import * as pumpify from 'pumpify';

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

class TestMetricsCollector extends MetricsCollector {
  constructor(
    tabularApiSurface: ITabularApiSurface,
    metricsHandlers: IMetricsHandler[],
    methodName: string,
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

describe.only('Bigtable/Table#getRows', () => {
  const bigtable = new Bigtable({
    metricsHandlers: [new TestMetricsHandler(logger)],
  });
  const instanceId = 'emulator-test-instance';
  const tableId = 'my-table';
  const columnFamilyId = 'cf1';

  before(async () => {
    const FakeTabularApiSurface = proxyquire('../src/tabular-api-surface.js', {
      './table.js': {Table: FakeInstance},
    }).Instance;
    const FakeTable = proxyquire('../src/table.js', {
      './table.js': {Table: FakeInstance},
    }).Instance;
    const FakeInstance = proxyquire('../src/instance.js', {
      './table.js': {Table: FakeInstance},
    }).Instance;
    const Bigtable = proxyquire('../src/index.js', {
      './instance.js': {Table: FakeTable},
      pumpify,
    }).Instance;

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
    for (let i = 0; i < 30; i++) {
      console.log(`Doing attempt ${i}`);
      const rows = await table.getRows();
      console.log(`Done attempt ${i}`);
      logger.log(`Done attempt ${i}`);
    }
    const myString = logger.getMessages(); // 'This is the string I want to write to the file.';
    const filename = 'myFile.txt';

    // Write the string to the file
    fs.writeFileSync(filename, myString);
  });
});
