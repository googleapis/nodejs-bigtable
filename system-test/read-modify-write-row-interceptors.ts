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
import {Bigtable, Mutation, Rule} from '../src';
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
// TODO: Add after hook to delete instance

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
  console.log(`Created table ${tableId}`);
  return t;
}

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
  let mockServer: MockServer;
  let mockBigtableService: BigtableClientMockService;

  before(async () => {
    /*
    const port = await new Promise<string>(resolve => {
      mockServer = new MockServer(resolve);
    });
     */
    bigtable = new Bigtable();
    await getProjectIdFromClient(bigtable);
    await createInstance(bigtable, INSTANCE_ID, CLUSTER, ZONE);
    await createTable(bigtable, INSTANCE_ID, TABLE_ID, columnFamilies);
    /*
    mockBigtableService = new BigtableClientMockService(mockServer);
    mockBigtableService.setService({
      // ReadModifyWriteRow: readModifyWriteRowService,
      readModifyWriteRow: readModifyWriteRowService,
    });
     */
    testMetricsHandler = getTestMetricsHandler();
    bigtable._metricsConfigManager = new ClientSideMetricsConfigManager([
      testMetricsHandler,
    ]);
  });

  after(done => {
    // mockServer.shutdown(() => done());
    done();
  });

  it('should record and export correct metrics for ReadModifyWriteRow via interceptors', async () => {
    const instance = bigtable.instance(INSTANCE_ID);

    const table = instance.table(TABLE_ID);

    (table as any).fakeReadModifyWriteRowMethod = async () => {
      const metricsCollector = new OperationMetricsCollector(
        table,
        MethodName.READ_MODIFY_WRITE_ROW,
        StreamingState.UNARY,
        (table as any).bigtable._metricsConfigManager!.metricsHandlers,
      );
      metricsCollector.onOperationStart();
      metricsCollector.onAttemptStart();
      const row = table.row('gwashington');
      const rule = {
        column: 'traits:teeth',
        append: '-wood',
      };
      await row.save({
        traits: {
          teeth: 'shiny',
        },
      });
      const gaxOptions: CallOptions = {
        otherArgs: {
          options: {
            interceptors: [createMetricsInterceptorProvider(metricsCollector)],
          },
        },
      };
      await row.createRules(rule, gaxOptions);
      metricsCollector.onAttemptComplete(GrpcStatus.OK);
      metricsCollector.onOperationComplete(GrpcStatus.OK);
    };
    // This is the "fake" method on the table for testing purposes
    // This is the "fake" method on the table for testing purposes
    /*
    (table as any).fakeReadModifyWriteRow = async (
      rowKey: string,
      rules: any[],
    ): Promise<google.bigtable.v2.IReadModifyWriteRowResponse> => {
      metricsCollector.onOperationStart();
      metricsCollector.onAttemptStart();
      const column = {
        family: 'traits',
        qualifier: 'teeth',
      };

      const row = table.row('gwashington');
      await row.save({
        traits: {
          teeth: 'shiny',
        },
      });

      const reqOpts = {
        tableName: table.name,
        rowKey: Buffer.from('gwashington'),
        rules: [
          {
            familyName: column.family,
            columnQualifier: Buffer.from(column.qualifier!), // Fn of {column: 'traits:teeth', append: '-wood'}
            appendValue: Buffer.from('-wood'), // Fn of {column: 'traits:teeth', append: '-wood'}
          },
        ],
        appProfileId: undefined,
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
     */

    // const rules = [{rule: 'append', column: 'cf1:c1', value: '-appended'}];
    await (table as any).fakeReadModifyWriteRowMethod();

    // await waitForMetrics(testMetricsHandler, 2);

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
