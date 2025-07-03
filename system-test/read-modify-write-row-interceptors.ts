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
import {Bigtable, Table, BigtableOptions} from '../src';
import {
  CallOptions,
  ClientConfig,
  GoogleError,
  grpc,
} from 'google-gax';
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
import {Metadata, status as GrpcStatus, MetadataValue} from '@grpc/grpc-js';
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
import * as jsonProtos from '../protos/protos.json'; // Adjust path to your protos.json

const packageDefinition = protoLoader.fromJSON(jsonProtos, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const bigtableProto = grpcJs.loadPackageDefinition(packageDefinition) as any;
const bigtableServiceDef =
  bigtableProto.google.bigtable.v2.Bigtable.service;

class MockBigtableService extends MockService {
  service = bigtableServiceDef;
  // Properties to control mock behavior
  mockReadModifyWriteRowResponse: google.bigtable.v2.IReadModifyWriteRowResponse | null =
    null;
  mockReadModifyWriteRowError: grpcJs.ServiceError | null = null;
  mockInitialMetadata: grpcJs.Metadata | null = null;
  mockTrailingMetadata: grpcJs.Metadata | null = null;

  constructor(server: MockServer) {
    super(server);
    this.server.setService(this.service, {
      ReadModifyWriteRow: this.ReadModifyWriteRow.bind(this),
      // Add other methods if needed, or have them return Unimplemented
      ReadRows: (
        call: grpcJs.ServerReadableStream<any, any>,
        callback: grpcJs.sendUnaryData<any>
      ) => {
        // For ReadRows, we'd typically use call.write() for each row
        // and call.end() when done. Or send an error via callback for unary part.
        // For this test, we only care about ReadModifyWriteRow.
        const error: grpcJs.ServiceError = {
          code: GrpcStatus.UNIMPLEMENTED,
          details: 'ReadRows not implemented in this mock',
          metadata: new grpcJs.Metadata(),
          name: 'Error',
          message: 'ReadRows not implemented',
        };
        callback(error, null);
      },
      // ... other methods returning UNIMPLEMENTED ...
    });
  }

  ReadModifyWriteRow(
    call: grpcJs.ServerUnaryCall<
      google.bigtable.v2.IReadModifyWriteRowRequest,
      google.bigtable.v2.IReadModifyWriteRowResponse
    >,
    callback: grpcJs.sendUnaryData<google.bigtable.v2.IReadModifyWriteRowResponse>
  ) {
    console.log('[MOCK_SERVER] ReadModifyWriteRow called with request:', call.request);
    if (this.mockInitialMetadata) {
      console.log('[MOCK_SERVER] Sending initial metadata.');
      call.sendMetadata(this.mockInitialMetadata);
    }

    if (this.mockReadModifyWriteRowError) {
      console.log('[MOCK_SERVER] Sending error:', this.mockReadModifyWriteRowError);
      const errorToSend = {...this.mockReadModifyWriteRowError}; // Clone to avoid modifying original
      errorToSend.metadata = errorToSend.metadata || new grpcJs.Metadata();
      if (this.mockTrailingMetadata) {
        const trailerObject = this.mockTrailingMetadata.getMap(); // Returns { [key: string]: MetadataValue }
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
    } else {
      console.log('[MOCK_SERVER] Sending success response.');
      callback(
        null,
        this.mockReadModifyWriteRowResponse,
        this.mockTrailingMetadata || undefined // Ensure undefined if null
      );
    }
  }

  // Helper to reset mocks
  reset() {
    this.mockReadModifyWriteRowResponse = null;
    this.mockReadModifyWriteRowError = null;
    this.mockInitialMetadata = null;
    this.mockTrailingMetadata = null;
  }
}

// Helper function to create a Bigtable client with a TestMetricsHandler
function getBigtableClientWithTestMetricsHandler(
  projectId: string,
  port: string, // Port for the mock server
  options?: BigtableOptions
) {
  const testMetricsHandler = new TestMetricsHandler();
  testMetricsHandler.projectId = projectId;
  // Forcing insecure by not providing sslCreds and using a non-HTTPS endpoint.
  // google-gax defaults to insecure if apiEndpoint doesn't start with "grpcs://"
  // and no sslCreds are provided.
  const clientOptions: BigtableOptions & ClientConfig = {
    projectId,
    apiEndpoint: `localhost:${port}`, // Point to mock server
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

// Helper to create interceptor provider for OperationMetricsCollector
function createMetricsInterceptorProvider(collector: OperationMetricsCollector) {
  try {
    console.log('[TEST_INTERCEPTOR_PROVIDER] Factory called.');
    return (options: grpcJs.InterceptorOptions, nextCall: grpcJs.NextCall) => {
      try {
        console.log('[TEST_INTERCEPTOR_PROVIDER] Provider created for call, options:', JSON.stringify(options).substring(0, 200));
        let savedReceiveMessage: any;
        const interceptingCall = new grpcJs.InterceptingCall(nextCall(options), {
          start: (metadata, listener, next) => {
            try {
              console.log('[TEST_INTERCEPTOR] Interceptor Start called.');
              const newListener: grpcJs.Listener = {
                onReceiveMetadata: (metadataVal, nextMd) => {
                  console.log('[TEST_INTERCEPTOR] onReceiveMetadata hit.');
                  collector.onMetadataReceived(metadataVal);
                  nextMd(metadataVal);
                },
                onReceiveMessage: (message, nextMsg) => {
                  console.log('[TEST_INTERCEPTOR] onReceiveMessage hit.');
                  savedReceiveMessage = message;
                  nextMsg(message);
                },
                onReceiveStatus: (status, nextStat) => {
                  console.log('[TEST_INTERCEPTOR] onReceiveStatus hit, status code:', status.code);
                  if (status.code === GrpcStatus.OK && savedReceiveMessage) {
                    collector.onResponse();
                  }
                  collector.onStatusMetadataReceived(status as ServerStatus);
                  nextStat(status);
                },
              };
              next(metadata, newListener);
            } catch (e) {
              console.error('[TEST_INTERCEPTOR] Error in Start method:', e);
              // If error occurs in `start`, it might not propagate correctly to the main call's promise
              // depending on how gRPC handles it. For now, just log.
              // Potentially, one might need to manually fail the call if `next` isn't called.
              throw e;
            }
          },
          sendMessage: (message, next) => {
            console.log('[TEST_INTERCEPTOR] sendMessage called.');
            next(message);
          },
          halfClose: (next) => {
            console.log('[TEST_INTERCEPTOR] halfClose called.');
            next();
          },
          cancel: (next) => {
            console.log('[TEST_INTERCEPTOR] cancel called.');
            next();
          },
        });
        return interceptingCall;
      } catch (e) {
        console.error('[TEST_INTERCEPTOR_PROVIDER] Error creating InterceptingCall:', e);
        throw e;
      }
    };
  } catch (e) {
    console.error('[TEST_INTERCEPTOR_PROVIDER] Error in factory:', e);
    throw e;
  }
}

describe('Bigtable/ReadModifyWriteRowInterceptorMetrics', () => {
  let bigtable: Bigtable;
  let table: Table;
  let testMetricsHandler: TestMetricsHandler;
  let mockServer: MockServer;
  let mockBigtableService: MockBigtableService;
  let serverPort: string;

  before(done => {
    mockServer = new MockServer(port => {
      serverPort = port;
      mockBigtableService = new MockBigtableService(mockServer);

      const {client: testClient, testMetricsHandler: handler} =
        getBigtableClientWithTestMetricsHandler(
          DUMMY_PROJECT_ID,
          serverPort
        );
      bigtable = testClient;
      testMetricsHandler = handler;
      table = bigtable.instance(INSTANCE_ID).table(TABLE_ID);
      done();
    });
  });

  after(done => {
    mockServer.shutdown(() => done());
  });

  it('should record and export correct metrics for ReadModifyWriteRow via interceptors', async () => {
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

    // This is the "fake" method on the table for testing purposes
    // This is the "fake" method on the table for testing purposes
    (table as any).fakeReadModifyWriteRow = async (
      rowKey: string,
      rules: any[]
    ): Promise<google.bigtable.v2.IReadModifyWriteRowResponse> => {
      console.log('[TEST_FAKE_RMRW] Start of fakeReadModifyWriteRow');
      metricsCollector.onOperationStart();
      metricsCollector.onAttemptStart();

      // Prepare mock server response
      mockBigtableService.reset(); // Clear previous mock settings
      console.log('[TEST_FAKE_RMRW] Configuring mock server response...');
      mockBigtableService.mockReadModifyWriteRowResponse = {
        row: {key: Buffer.from(rowKey), families: []},
      };
      const initialMetadata = new grpcJs.Metadata();
      initialMetadata.set('server-timing', 'gfet4t7; dur=123');
      mockBigtableService.mockInitialMetadata = initialMetadata;

      const trailingMetadata = new grpcJs.Metadata();
      const responseParamsProto = Buffer.from([
        10, 9, 102, 97, 107, 101, 45, 122, 111, 110, 101, 18, 12, 102, 97,
        107, 101, 45, 99, 108, 117, 115, 116, 101, 114,
      ]);
      trailingMetadata.set('x-goog-ext-425905942-bin', responseParamsProto);
      mockBigtableService.mockTrailingMetadata = trailingMetadata;
      console.log('[TEST_FAKE_RMRW] Mock server response configured.');

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
      console.log('[TEST_FAKE_RMRW] Interceptors prepared for gaxOptions.');

      try {
        console.log('[TEST_FAKE_RMRW] Before await bigtable.request.');
        const responseArray = (await bigtable.request<google.bigtable.v2.IReadModifyWriteRowResponse>(
          {
            client: 'BigtableClient',
            method: 'readModifyWriteRow',
            reqOpts,
            gaxOpts: gaxOptions,
          }
        )) as unknown as [google.bigtable.v2.IReadModifyWriteRowResponse];
        console.log('[TEST_FAKE_RMRW] After await bigtable.request - Success.');

        metricsCollector.onOperationComplete(GrpcStatus.OK);
        console.log('[TEST_FAKE_RMRW] Called onOperationComplete (Success).');
        return responseArray[0];
      } catch (err) {
        console.error('[TEST_FAKE_RMRW] After await bigtable.request - Error:', err);
        const googleError = err as GoogleError;
        const status = googleError.code || GrpcStatus.UNKNOWN;
        metricsCollector.onOperationComplete(status);
        console.log('[TEST_FAKE_RMRW] Called onOperationComplete (Error).');
        throw googleError;
      }
    };

    const rules = [{rule: 'append', column: `cf1:c1`, value: '-appended'}];
    console.log('[TEST_CASE] Calling fakeReadModifyWriteRow...');
    await (table as any).fakeReadModifyWriteRow(ROW_KEY, rules);
    console.log('[TEST_CASE] fakeReadModifyWriteRow call completed.');

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
