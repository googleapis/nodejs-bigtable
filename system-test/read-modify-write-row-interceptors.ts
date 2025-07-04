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
import {CallOptions, GoogleError, ServiceError} from 'google-gax';
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
import * as assert from 'assert';
import {google} from '../protos/protos';
import {status as GrpcStatus} from '@grpc/grpc-js';
import arrify = require('arrify');
import {ServerStatus} from '../src/interceptor';

const INSTANCE_ID = 'isolated-rmw-instance';
const TABLE_ID = 'isolated-rmw-table';
const ROW_KEY = 'test-row';
const DUMMY_PROJECT_ID = 'test-project-isolated';

// Mock Server Implementation
import * as protoLoader from '@grpc/proto-loader';
import * as grpcJs from '@grpc/grpc-js';
import {MockServer} from '../src/util/mock-servers/mock-server'; // Adjust path if necessary
import {MockService} from '../src/util/mock-servers/mock-service'; // Adjust path if necessary
import * as jsonProtos from '../protos/protos.json';
import {BigtableClientMockService} from '../src/util/mock-servers/service-implementations/bigtable-client-mock-service'; // Adjust path to your protos.json

const packageDefinition = protoLoader.fromJSON(jsonProtos, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const bigtableProto = grpcJs.loadPackageDefinition(packageDefinition) as any;
const bigtableServiceDef = bigtableProto.google.bigtable.v2.Bigtable.service;

const readModifyWriteRowService = (
  call: grpcJs.ServerUnaryCall<
    google.bigtable.v2.IReadModifyWriteRowRequest,
    google.bigtable.v2.IReadModifyWriteRowResponse
  >,
  callback: grpcJs.sendUnaryData<google.bigtable.v2.IReadModifyWriteRowResponse>,
) => {
  console.log('readModifyWriteRow get call');
  const initialMetadata = new grpcJs.Metadata();
  initialMetadata.set('server-timing', 'gfet4t7; dur=123');
  // call.sendMetadata(initialMetadata);

  const trailingMetadata = new grpcJs.Metadata();
  const responseParamsProto = Buffer.from([
    10, 9, 102, 97, 107, 101, 45, 122, 111, 110, 101, 18, 12, 102, 97, 107, 101,
    45, 99, 108, 117, 115, 116, 101, 114,
  ]);
  trailingMetadata.set('x-goog-ext-425905942-bin', responseParamsProto);

  /*
  const errorToSend = {...this.mockReadModifyWriteRowError}; // Clone to avoid modifying original
  errorToSend.metadata = errorToSend.metadata || new grpcJs.Metadata();
  if (trailingMetadata) {
    const trailerObject = trailingMetadata.getMap(); // Returns { [key: string]: MetadataValue }
    for (const key in trailerObject) {
      if (Object.prototype.hasOwnProperty.call(trailerObject, key)) {
        const values = arrify(trailerObject[key]) as (string | Buffer)[]; // Ensure it's an array
        values.forEach((v: string | Buffer) => {
          errorToSend.metadata!.add(key, v);
        });
      }
    }
  }
  callback(errorToSend, null);
   */
  const mockReadModifyWriteRowResponse = {
    row: {
      key: Buffer.from(ROW_KEY),
      families: [],
    },
  };
  /*
  callback(
    null,
    mockReadModifyWriteRowResponse,
    trailingMetadata || undefined, // Ensure undefined if null
  );
   */
};

// Helper function to create a Bigtable client with a TestMetricsHandler
function getTestMetricsHandler() {
  const testMetricsHandler = new TestMetricsHandler();
  testMetricsHandler.projectId = 'test-project-id';
  return testMetricsHandler;
}

// Helper function to wait for metrics to be processed
async function waitForMetrics(
  testMetricsHandler: TestMetricsHandler,
  expectedCount: number,
  timeout = 5000, // 5 seconds timeout
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
            `Timeout waiting for ${expectedCount} metrics. Received ${testMetricsHandler.requestsHandled.length}`,
          ),
        );
      }
    }, 100); // Check every 100ms
  });
}

// Helper to create interceptor provider for OperationMetricsCollector
function createMetricsInterceptorProvider(
  collector: OperationMetricsCollector,
) {
  return (options: grpcJs.InterceptorOptions, nextCall: grpcJs.NextCall) => {
    let savedReceiveMessage: any;
    // savedReceiveMetadata and savedReceiveStatus are not strictly needed here anymore for the interceptor's own state

    // OperationStart and AttemptStart will be called by the calling code (`fakeReadModifyWriteRow`)

    return new grpcJs.InterceptingCall(nextCall(options), {
      start: (metadata, listener, next) => {
        // AttemptStart is called by the orchestrating code
        const newListener: grpcJs.Listener = {
          onReceiveMetadata: (metadata, nextMd) => {
            console.log('metadata encountered');
            collector.onMetadataReceived(metadata);
            nextMd(metadata);
          },
          onReceiveMessage: (message, nextMsg) => {
            savedReceiveMessage = message; // Still need to know if a message was received for onResponse
            nextMsg(message);
          },
          onReceiveStatus: (status, nextStat) => {
            if (status.code === GrpcStatus.OK && savedReceiveMessage) {
              collector.onResponse(); // Call onResponse for successful unary calls with a message
            }
            collector.onStatusMetadataReceived(status as ServerStatus);
            // AttemptComplete and OperationComplete will be called by the calling code
            nextStat(status);
          },
        };
        next(metadata, newListener);
      },
      sendMessage: (message, next) => next(message),
      halfClose: next => next(),
      cancel: next => next(),
    });
  };
}

describe.only('Bigtable/ReadModifyWriteRowInterceptorMetrics', () => {
  let bigtable: Bigtable;
  let testMetricsHandler: TestMetricsHandler;
  let mockServer: MockServer;
  let mockBigtableService: BigtableClientMockService;

  before(async () => {
    const port = await new Promise<string>(resolve => {
      mockServer = new MockServer(resolve);
    });
    bigtable = new Bigtable({
      apiEndpoint: `localhost:${port}`,
    });
    mockBigtableService = new BigtableClientMockService(mockServer);
    mockBigtableService.setService({
      ReadModifyWriteRow: readModifyWriteRowService,
    });
    testMetricsHandler = getTestMetricsHandler();
    bigtable._metricsConfigManager = new ClientSideMetricsConfigManager([
      testMetricsHandler,
    ]);
  });

  after(done => {
    mockServer.shutdown(() => done());
  });

  it('should record and export correct metrics for ReadModifyWriteRow via interceptors', async () => {
    const instance = bigtable.instance('some-instance');
    const table = instance.table('some-table');
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
      (table as any).bigtable._metricsConfigManager!.handlers,
    );

    // This is the "fake" method on the table for testing purposes
    // This is the "fake" method on the table for testing purposes
    (table as any).fakeReadModifyWriteRow = async (
      rowKey: string,
      rules: any[],
    ): Promise<google.bigtable.v2.IReadModifyWriteRowResponse> => {
      metricsCollector.onOperationStart();
      metricsCollector.onAttemptStart();

      const reqOpts = {
        tableName: table.name,
        rowKey,
        rules,
        appProfileId: (table as any).bigtable.appProfileId_,
      };

      const gaxOptions: CallOptions = {
        otherArgs: {
          options: {
            interceptors: [createMetricsInterceptorProvider(metricsCollector)],
          },
        },
      };

      try {
        // Make the request using bigtable.request, which will hit the mock server
        const myPromise = new Promise((resolve, reject) => {
          bigtable.request<google.bigtable.v2.IReadModifyWriteRowResponse>(
            {
              client: 'BigtableClient',
              method: 'readModifyWriteRow',
              reqOpts,
              gaxOpts: gaxOptions,
            },
            (err: ServiceError | null, resp?: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(resp);
              }
            },
          ) as unknown as [google.bigtable.v2.IReadModifyWriteRowResponse];
        });
        const responseArray = await myPromise;
        metricsCollector.onAttemptComplete(GrpcStatus.OK);
        metricsCollector.onOperationComplete(GrpcStatus.OK);
        // @ts-ignore
        return responseArray[0];
      } catch (err) {
        const googleError = err as GoogleError;
        const status = googleError.code || GrpcStatus.UNKNOWN;
        metricsCollector.onAttemptComplete(status);
        metricsCollector.onOperationComplete(status);
        throw googleError;
      }
    };

    const rules = [{rule: 'append', column: 'cf1:c1', value: '-appended'}];
    await (table as any).fakeReadModifyWriteRow(ROW_KEY, rules);

    await waitForMetrics(testMetricsHandler, 2);

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
    assert.strictEqual(attemptCompleteData.serverLatency, 123);
    assert.strictEqual(
      attemptCompleteData.metricsCollectorData.zone,
      'fake-zone',
    );
    assert.strictEqual(
      attemptCompleteData.metricsCollectorData.cluster,
      'fake-cluster',
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
    assert.strictEqual(
      operationCompleteData.metricsCollectorData.zone,
      'fake-zone',
    );
    assert.strictEqual(
      operationCompleteData.metricsCollectorData.cluster,
      'fake-cluster',
    );
    assert.strictEqual(operationCompleteData.streaming, StreamingState.UNARY);
  });
});
