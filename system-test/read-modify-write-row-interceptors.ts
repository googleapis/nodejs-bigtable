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

import {describe, it, before, after} from 'mocha';
import {Bigtable} from '../src';
import {ServiceError} from 'google-gax';
import {ClientSideMetricsConfigManager} from '../src/client-side-metrics/metrics-config-manager';
import {TestMetricsHandler} from '../test-common/test-metrics-handler';
import {
  OnAttemptCompleteData,
  OnOperationCompleteData,
} from '../src/client-side-metrics/metrics-handler';
import {OperationMetricsCollector} from '../src/client-side-metrics/operation-metrics-collector';
import {
  MethodName,
  StreamingState,
} from '../src/client-side-metrics/client-side-metrics-attributes';
import * as assert from 'assert';
import {status as GrpcStatus} from '@grpc/grpc-js';
import {withInterceptors} from '../src/interceptor';

const INSTANCE_ID = 'isolated-rmw-instance';
const TABLE_ID = 'isolated-rmw-table';
// TODO: Add after hook to delete instance

const ZONE = 'us-central1-a';
const CLUSTER = 'fake-cluster';

async function createInstance(
  bigtable: Bigtable,
  instanceId: string,
  clusterId: string,
  locationId: string,
) {
  const instance = bigtable.instance(instanceId);

  const [exists] = await instance.exists();
  if (exists) {
    console.log(`Instance ${instanceId} already exists.`);
    return instance;
  }

  const [i, operation] = await instance.create({
    clusters: [
      {
        id: clusterId,
        location: locationId,
        nodes: 3,
      },
    ],
    labels: {
      time_created: Date.now(),
    },
  });
  await operation.promise();
  console.log(`Created instance ${instanceId}`);
  return i;
}

async function createTable(
  bigtable: Bigtable,
  instanceId: string,
  tableId: string,
  families: string[],
) {
  const instance = bigtable.instance(instanceId);
  const table = instance.table(tableId);

  const [exists] = await table.exists();
  if (exists) {
    console.log(`Table ${tableId} already exists.`);
    return table;
  }

  const [t] = await table.create({
    families: families,
  });
  const row = table.row('gwashington');
  await row.save({
    traits: {
      teeth: 'shiny',
    },
  });
  console.log(`Created table ${tableId}`);
  return t;
}

// Helper function to create a Bigtable client with a TestMetricsHandler
function getTestMetricsHandler() {
  const testMetricsHandler = new TestMetricsHandler();
  testMetricsHandler.projectId = 'test-project-id';
  return testMetricsHandler;
}

async function getProjectIdFromClient(bigtable: Bigtable): Promise<string> {
  return new Promise((resolve, reject) => {
    bigtable.getProjectId_((err, projectId) => {
      if (err) {
        reject(err);
      } else {
        resolve(projectId!);
      }
    });
  });
}

const columnFamilies = ['cf1', 'cf2', 'data', 'metrics', 'logs', 'traits'];

describe.only('Bigtable/ReadModifyWriteRowInterceptorMetrics', () => {
  let bigtable: Bigtable;
  let testMetricsHandler: TestMetricsHandler;

  before(async () => {
    bigtable = new Bigtable();
    await getProjectIdFromClient(bigtable);
    await createInstance(bigtable, INSTANCE_ID, CLUSTER, ZONE);
    await createTable(bigtable, INSTANCE_ID, TABLE_ID, columnFamilies);
    testMetricsHandler = getTestMetricsHandler();
    bigtable._metricsConfigManager = new ClientSideMetricsConfigManager([
      testMetricsHandler,
    ]);
  });

  after(done => {
    done();
  });

  it('should record and export correct metrics for ReadModifyWriteRow via interceptors', async () => {
    const instance = bigtable.instance(INSTANCE_ID);

    const table = instance.table(TABLE_ID);

    /*
    fakeReadModifyWriteRowMethod is just a fake method on a table that makes a
    call to the readWriteModifyRow grpc endpoint. It demonstrates what a method
    might look like when trying to make a unary call while extracting
    information from the headers and trailers that the server returns so that
    the extracted information can be recorded in client side metrics.
     */
    (table as any).fakeReadModifyWriteRowMethod = async () => {
      // 1. Create a metrics collector.
      const metricsCollector = new OperationMetricsCollector(
        table,
        MethodName.READ_MODIFY_WRITE_ROW,
        StreamingState.UNARY,
        (table as any).bigtable._metricsConfigManager!.metricsHandlers,
      );
      // 2. Tell the metrics collector an attempt has been started.
      metricsCollector.onOperationStart();
      metricsCollector.onAttemptStart();
      // 3. Make a unary call with gax options that include interceptors. The
      // interceptors are built from a method that hooks them up to the
      // metrics collector
      const responseArray = await new Promise((resolve, reject) => {
        bigtable.request(
          {
            client: 'BigtableClient',
            method: 'readModifyWriteRow',
            reqOpts: {
              tableName: table.name,
              rowKey: Buffer.from('gwashington'),
              rules: [
                {
                  familyName: 'traits',
                  columnQualifier: Buffer.from('teeth'), // Fn of {column: 'traits:teeth', append: '-wood'}
                  appendValue: Buffer.from('-wood'), // Fn of {column: 'traits:teeth', append: '-wood'}
                },
              ],
              appProfileId: undefined,
            },
            gaxOpts: withInterceptors({}, metricsCollector),
          },
          (err: ServiceError | null, resp?: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(resp);
            }
          },
        );
      });
      // 4. Tell the metrics collector the attempt is over
      metricsCollector.onAttemptComplete(GrpcStatus.OK);
      metricsCollector.onOperationComplete(GrpcStatus.OK);
      // 5. Return results of method call to the user
      return responseArray;
    };

    await (table as any).fakeReadModifyWriteRowMethod();

    assert.strictEqual(testMetricsHandler.requestsHandled.length, 2);

    const attemptCompleteData = testMetricsHandler.requestsHandled.find(
      m => (m as {attemptLatency?: number}).attemptLatency !== undefined,
    ) as OnAttemptCompleteData | undefined;
    const operationCompleteData = testMetricsHandler.requestsHandled.find(
      m => (m as {operationLatency?: number}).operationLatency !== undefined,
    ) as OnOperationCompleteData | undefined;

    assert.ok(attemptCompleteData, 'OnAttemptCompleteData should be present');
    assert.ok(
      operationCompleteData,
      'OnOperationCompleteData should be present',
    );

    if (!attemptCompleteData || !operationCompleteData) {
      throw new Error('Metrics data is missing'); // Should be caught by asserts above
    }

    assert.strictEqual(
      attemptCompleteData.metricsCollectorData.method,
      MethodName.READ_MODIFY_WRITE_ROW,
    );
    assert.strictEqual(attemptCompleteData.status, '0');
    assert.strictEqual(
      attemptCompleteData.metricsCollectorData.table,
      TABLE_ID,
    );
    assert.strictEqual(
      attemptCompleteData.metricsCollectorData.instanceId,
      INSTANCE_ID,
    );
    assert.ok(attemptCompleteData.attemptLatency >= 0);
    assert(attemptCompleteData.serverLatency);
    assert.ok(attemptCompleteData.serverLatency >= 0);
    assert.strictEqual(attemptCompleteData.metricsCollectorData.zone, ZONE);
    assert.strictEqual(
      attemptCompleteData.metricsCollectorData.cluster,
      CLUSTER,
    );
    assert.strictEqual(attemptCompleteData.streaming, StreamingState.UNARY);

    assert.strictEqual(
      operationCompleteData.metricsCollectorData.method,
      MethodName.READ_MODIFY_WRITE_ROW,
    );
    assert.strictEqual(operationCompleteData.status, '0');
    assert.strictEqual(
      operationCompleteData.metricsCollectorData.table,
      TABLE_ID,
    );
    assert.strictEqual(
      operationCompleteData.metricsCollectorData.instanceId,
      INSTANCE_ID,
    );
    assert.ok(operationCompleteData.operationLatency >= 0);
    assert.strictEqual(operationCompleteData.retryCount, 0);
    assert.strictEqual(operationCompleteData.metricsCollectorData.zone, ZONE);
    assert.strictEqual(
      operationCompleteData.metricsCollectorData.cluster,
      CLUSTER,
    );
    assert.strictEqual(operationCompleteData.streaming, StreamingState.UNARY);
  });
});
