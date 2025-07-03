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

import {describe, it, before} from 'mocha';
import {Bigtable, Table, BigtableOptions} from '../src';
import {ClientSideMetricsConfigManager} from '../src/client-side-metrics/metrics-config-manager';
import {TestMetricsHandler} from '../test-common/test-metrics-handler';
import {
  OnAttemptCompleteData,
  OnOperationCompleteData,
} from '../src/client-side-metrics/metrics-handler';
import {
  OperationMetricsCollector,
  ITabularApiSurface,
} from '../src/client-side-metrics/operation-metrics-collector';
import {
  MethodName,
  StreamingState,
} from '../src/client-side-metrics/client-side-metrics-attributes';
import {GoogleError, grpc} from 'google-gax';
import * as assert from 'assert';
import {google} from '../protos/protos';
import {Metadata} from '@grpc/grpc-js';
import {ServerStatus} from '../src/interceptor';

const INSTANCE_ID = 'isolated-rmw-instance';
const TABLE_ID = 'isolated-rmw-table';
const ROW_KEY = 'test-row';
const DUMMY_PROJECT_ID = 'test-project-isolated';

// Helper function to create a Bigtable client with a TestMetricsHandler
function getBigtableClientWithTestMetricsHandler(
  projectId: string,
  options?: BigtableOptions
) {
  const testMetricsHandler = new TestMetricsHandler();
  testMetricsHandler.projectId = projectId;
  // Explicitly set a dummy endpoint as we don't want to make real calls
  const clientOptions = {
    projectId,
    apiEndpoint: 'emulator.invalid:8086', // Dummy endpoint
    ...options,
  };
  const client = new Bigtable(clientOptions);
  client._metricsConfigManager = new ClientSideMetricsConfigManager([
    testMetricsHandler,
  ]);
  return {client, testMetricsHandler};
}

// Helper function to wait for metrics to be processed
async function waitForMetrics(
  testMetricsHandler: TestMetricsHandler,
  expectedCount: number,
  timeout = 5000 // 5 seconds timeout
) {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (testMetricsHandler.requestsHandled.length >= expectedCount) {
        clearInterval(interval);
        resolve();
      } else if (Date.now() - startTime > timeout) {
        clearInterval(interval);
        reject(
          new Error(
            `Timeout waiting for ${expectedCount} metrics. Received ${testMetricsHandler.requestsHandled.length}`
          )
        );
      }
    }, 100); // Check every 100ms
  });
}

describe('Bigtable/IsolatedReadModifyWriteRowMetrics', () => {
  let bigtable: Bigtable;
  let table: Table;
  let testMetricsHandler: TestMetricsHandler;

  before(() => {
    // Initialize Bigtable and TestMetricsHandler
    const {client: testClient, testMetricsHandler: handler} =
      getBigtableClientWithTestMetricsHandler(DUMMY_PROJECT_ID);
    bigtable = testClient;
    testMetricsHandler = handler;
    // Create a Table object instance. No actual table creation RPC needed.
    table = bigtable.instance(INSTANCE_ID).table(TABLE_ID);
  });

  it('should record and export correct metrics for ReadModifyWriteRow without external calls', async () => {
    const tabularApiSurface: ITabularApiSurface = {
      instance: {id: (table as any).instance.id},
      id: table.id,
      bigtable: {
        projectId: DUMMY_PROJECT_ID,
        appProfileId: (table as any).bigtable.appProfileId_,
        options: (table as any).bigtable.options,
      },
    };

    const metricsCollector = new OperationMetricsCollector(
      tabularApiSurface,
      MethodName.READ_MODIFY_WRITE_ROW,
      StreamingState.UNARY,
      (table as any).bigtable._metricsConfigManager!.handlers
    );

    async function simulateReadModifyWriteRowWithMetrics(
      _rowKey: string, // Parameters like rowKey, rules are illustrative for the method signature
      _rules: any[]
    ): Promise<google.bigtable.v2.IReadModifyWriteRowResponse> {
      metricsCollector.onOperationStart();
      metricsCollector.onAttemptStart();

      // Simulate metadata that would be extracted by interceptors
      const responseMetadata = new Metadata();
      responseMetadata.set('server-timing', 'gfet4t7; dur=123');
      metricsCollector.onMetadataReceived(responseMetadata);

      metricsCollector.onResponse(); // Signifies first byte/response received

      const statusMetadata = new Metadata();
      const responseParamsProto = Buffer.from([
        10, 9, 102, 97, 107, 101, 45, 122, 111, 110, 101, 18, 12, 102, 97,
        107, 101, 45, 99, 108, 117, 115, 116, 101, 114,
      ]);
      statusMetadata.add('x-goog-ext-425905942-bin', responseParamsProto);

      const serverStatus: ServerStatus = {
        code: grpc.status.OK,
        details: 'OK',
        metadata: statusMetadata,
      };
      metricsCollector.onStatusMetadataReceived(serverStatus);

      // Simulate a successful operation. No actual RPC call.
      // Construct a fake response object that matches IReadModifyWriteRowResponse
      const fakeResponse: google.bigtable.v2.IReadModifyWriteRowResponse = {
        row: {
          key: Buffer.from(ROW_KEY),
          families: [], // Add families/columns if your assertions depend on them
        },
      };
      metricsCollector.onOperationComplete(grpc.status.OK);
      return fakeResponse;
    }

    const rules = [{rule: 'append', column: `cf1:c1`, value: '-appended'}];
    await simulateReadModifyWriteRowWithMetrics(ROW_KEY, rules);

    await waitForMetrics(testMetricsHandler, 2);

    assert.strictEqual(testMetricsHandler.requestsHandled.length, 2);

    const attemptCompleteData = testMetricsHandler.requestsHandled.find(
      m => (m as {attemptLatency?: number}).attemptLatency !== undefined
    ) as OnAttemptCompleteData | undefined;
    const operationCompleteData = testMetricsHandler.requestsHandled.find(
      m => (m as {operationLatency?: number}).operationLatency !== undefined
    ) as OnOperationCompleteData | undefined;

    assert.ok(attemptCompleteData, 'OnAttemptCompleteData should be present');
    assert.ok(operationCompleteData, 'OnOperationCompleteData should be present');

    if (!attemptCompleteData || !operationCompleteData) {
      throw new Error('Metrics data is missing'); // Should be caught by asserts above
    }

    assert.strictEqual(
      attemptCompleteData.metricsCollectorData.method,
      MethodName.READ_MODIFY_WRITE_ROW
    );
    assert.strictEqual(attemptCompleteData.status, '0');
    assert.strictEqual(attemptCompleteData.metricsCollectorData.table, TABLE_ID);
    assert.strictEqual(attemptCompleteData.metricsCollectorData.instanceId, INSTANCE_ID);
    assert.ok(attemptCompleteData.attemptLatency >= 0);
    assert.strictEqual(attemptCompleteData.serverLatency, 123);
    assert.strictEqual(attemptCompleteData.metricsCollectorData.zone, 'fake-zone');
    assert.strictEqual(attemptCompleteData.metricsCollectorData.cluster, 'fake-cluster');
    assert.strictEqual(attemptCompleteData.streaming, StreamingState.UNARY);

    assert.strictEqual(
      operationCompleteData.metricsCollectorData.method,
      MethodName.READ_MODIFY_WRITE_ROW
    );
    assert.strictEqual(operationCompleteData.status, '0');
    assert.strictEqual(operationCompleteData.metricsCollectorData.table, TABLE_ID);
    assert.strictEqual(operationCompleteData.metricsCollectorData.instanceId, INSTANCE_ID);
    assert.ok(operationCompleteData.operationLatency >= 0);
    assert.strictEqual(operationCompleteData.retryCount, 0);
    assert.strictEqual(operationCompleteData.metricsCollectorData.zone, 'fake-zone');
    assert.strictEqual(operationCompleteData.metricsCollectorData.cluster, 'fake-cluster');
    assert.strictEqual(operationCompleteData.streaming, StreamingState.UNARY);
  });
});
