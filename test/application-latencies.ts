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

import {Bigtable, Row, Table} from '../src';
import {GoogleError} from 'google-gax';
import * as assert from 'assert';
import * as sinon from 'sinon';
import {PassThrough} from 'stream';
import {IMetricsHandler, OnOperationCompleteData, OnAttemptCompleteData} from '../src/client-side-metrics/metrics-handler';
import {grpc} from 'google-gax';
import { MethodName, StreamingState } from '../src/client-side-metrics/client-side-metrics-attributes';

// Type imports for mock server
import * as mockServer from '../src/util/mock-servers/mock-server';
import { google } from '../protos/protos';
import IReadRowsResponse = google.bigtable.v2.IReadRowsResponse;
import IServerStream = mockServer.IServerStream;

const INSTANCE_ID = 'test-instance';
const TABLE_ID = 'test-table';

// Mock for process.hrtime.bigint
let currentMockTimeNs = 0n;
const mockHrTimeResolutionNs = 1000000n; // 1 millisecond

const originalHrtime = process.hrtime;

function mockHrtime(): bigint {
  return currentMockTimeNs;
}

function advanceMockTimeNs(durationNs: bigint | number): void {
  currentMockTimeNs += BigInt(durationNs);
}

function resetMockTime(): void {
  currentMockTimeNs = 0n;
}

// Helper to convert ms to ns for mock time
function msToNs(ms: number): bigint {
  return BigInt(ms) * 1000000n;
}

class TestMetricsHandler implements IMetricsHandler {
  public operationData: OnOperationCompleteData[] = [];
  public attemptData: OnAttemptCompleteData[] = [];

  onOperationComplete(data: OnOperationCompleteData): void {
    this.operationData.push(data);
  }

  onAttemptComplete(data: OnAttemptCompleteData): void {
    this.attemptData.push(data);
  }

  reset(): void {
    this.operationData = [];
    this.attemptData = [];
  }
}

describe('Application Blocking Latencies', () => {
  let bigtable: Bigtable;
  let table: Table;
  let testMetricsHandler: TestMetricsHandler;
  let sandbox: sinon.SinonSandbox;
  let mockBigtableServer: mockServer.MockServer;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    sandbox.stub(process, 'hrtime').value(Object.assign(mockHrtime, { bigint: mockHrtime }));
    resetMockTime();

    testMetricsHandler = new TestMetricsHandler();
    // Temporarily create a minimal Bigtable instance for testing.
    // We'll replace the gRPC layer with our mock server.
    bigtable = new Bigtable({projectId: 'test-project', clientConfig: {
      metricsHandlers: [testMetricsHandler],
    }});
    // @ts-ignore // private property
    bigtable.options.instances = new Map();
    // @ts-ignore // private property
    bigtable.options.metricsEnabled = true;


    // Start mock server
    mockBigtableServer = new mockServer.MockServer();
    const port = await mockBigtableServer.start();
    bigtable.api.BigtableClient.get gaxGrpc().grpc.settings.set('grpc.default_authority', `localhost:${port}`);

    // Override the client to use the insecure channel and disable SSL.
    // @ts-ignore
    const newBigtableClient = new bigtable.api.BigtableClient({
      port,
      servicePath: 'localhost',
      sslCreds: grpc.credentials.createInsecure(),
      metricsHandlers: [testMetricsHandler], // ensure client also has it for some internal checks
    });
    // @ts-ignore
    bigtable.api.BigtableClient = newBigtableClient;
     // @ts-ignore
    bigtable.appProfileId = undefined; // Use default app profile

    table = bigtable.instance(INSTANCE_ID).table(TABLE_ID);
     // @ts-ignore
    table.bigtable.options.metricsEnabled = true; // Ensure table level also reflects this
  });

  afterEach(async () => {
    sandbox.restore();
    if (mockBigtableServer) {
      mockBigtableServer.stop();
    }
  });

  // Test scenarios will go here

  interface MockReadRowsConfig {
    rows: Array<{key: string, data: string, delayMs?: number}>; // Simplified row data
    serverProcessingTimeMs?: number; // Initial delay before sending first chunk
    chunkDelayMs?: number; // Delay between sending chunks
    chunksPerResponse?: number; // How many chunks to group in a single ReadRowsResponse (useful for simulating server batching)
    error?: GoogleError; // Optional error to throw
  }

  function createMockReadRowsHandler(config: MockReadRowsConfig): mockServer.GRPCCall<IServerStream<IReadRowsResponse>> {
    return (stream) => {
      let rowIdx = 0;

      async function sendRows() {
        if (config.error) {
          stream.emit('error', config.error);
          return;
        }

        if (config.serverProcessingTimeMs && config.serverProcessingTimeMs > 0) {
          await new Promise(resolve => setTimeout(resolve, config.serverProcessingTimeMs));
        }

        while(rowIdx < config.rows.length) {
          const responseChunks: IReadRowsResponse['chunks'] = [];
          let currentResponseChunkCount = 0;
          const targetChunksInResponse = config.chunksPerResponse || 1;

          while(rowIdx < config.rows.length && currentResponseChunkCount < targetChunksInResponse) {
            const rowConfig = config.rows[rowIdx];
            if (rowConfig.delayMs && rowConfig.delayMs > 0) {
              await new Promise(resolve => setTimeout(resolve, rowConfig.delayMs));
            }

            // Construct a simple chunk
            // This is a simplified representation. Real chunks are more complex.
            responseChunks.push({
              rowKey: Buffer.from(rowConfig.key),
              familyName: {value: 'cf'},
              qualifier: {value: Buffer.from('cq')},
              timestampMicros: Date.now() * 1000,
              value: Buffer.from(rowConfig.data),
              commitRow: true, // Assuming each row is committed immediately for simplicity
            });
            rowIdx++;
            currentResponseChunkCount++;
          }

          if (responseChunks.length > 0) {
            stream.write({chunks: responseChunks});
          }

          if (config.chunkDelayMs && config.chunkDelayMs > 0 && rowIdx < config.rows.length) {
            await new Promise(resolve => setTimeout(resolve, config.chunkDelayMs));
          }
        }
        stream.end();
      }
      sendRows().catch(err => stream.emit('error', err));
    };
  }

  it('Scenario 1: Basic flow - .on("data", handler) consumes immediately', (done) => {
    const MOCK_ROWS = [
      {key: 'row1', data: 'data1'},
      {key: 'row2', data: 'data2'},
      {key: 'row3', data: 'data3'},
    ];
    const USER_PROCESSING_TIME_MS = 50;
    const TOTAL_EXPECTED_USER_PROCESSING_NS = msToNs(MOCK_ROWS.length * USER_PROCESSING_TIME_MS);

    mockBigtableServer.setService({
      serviceName: 'Bigtable',
      methods: {
        ReadRows: createMockReadRowsHandler({
          rows: MOCK_ROWS,
          serverProcessingTimeMs: 10, // Small initial server delay
          chunkDelayMs: 5, // Small delay between chunks
        }),
      },
    });

    let rowsProcessed = 0;
    advanceMockTimeNs(msToNs(1)); // Initial time before request

    table.createReadStream({})
      .on('data', (row: Row) => {
        // Simulate user processing time
        advanceMockTimeNs(msToNs(USER_PROCESSING_TIME_MS));
        rowsProcessed++;
      })
      .on('end', () => {
        advanceMockTimeNs(msToNs(1)); // Small time after stream ends

        assert.strictEqual(rowsProcessed, MOCK_ROWS.length, 'Should process all rows');

        assert.strictEqual(testMetricsHandler.operationData.length, 1, 'Should have one operation data');
        const opData = testMetricsHandler.operationData[0];
        assert.strictEqual(opData.method, MethodName.READ_ROWS_STREAMING_READ_ROWS);
        assert.strictEqual(opData.status, 'OK');
        assert.strictEqual(opData.streaming, StreamingState.STREAMING);

        assert.ok(opData.applicationLatencies, 'Application latencies should exist');
        assert.strictEqual(opData.applicationLatencies.length, 1, 'Should have one total application latency value');

        // console.log(`Actual app latency: ${opData.applicationLatencies[0]} ms, Expected: ${Number(TOTAL_EXPECTED_USER_PROCESSING_NS / 1000000n)} ms`);
        // console.log(`Current mock time at end: ${currentMockTimeNs} ns`);

        // Allow a small tolerance due to mock hrtime resolution and other minor overheads
        const actualAppLatencyNs = msToNs(opData.applicationLatencies[0]);
        const toleranceNs = msToNs(5); // Tolerance of 5ms for the total

        assert.ok(
            actualAppLatencyNs >= TOTAL_EXPECTED_USER_PROCESSING_NS - toleranceNs &&
            actualAppLatencyNs <= TOTAL_EXPECTED_USER_PROCESSING_NS + toleranceNs,
            `Application latency ${opData.applicationLatencies[0]}ms is not within expected range of ${Number(TOTAL_EXPECTED_USER_PROCESSING_NS / 1000000n)}ms (tolerance ${Number(toleranceNs/1000000n)}ms)`
        );

        // Basic check for attempt data
        assert.ok(testMetricsHandler.attemptData.length >= 1, 'Should have at least one attempt data');
        const firstAttempt = testMetricsHandler.attemptData[0];
        assert.strictEqual(firstAttempt.status, 'OK');

        done();
      })
      .on('error', (err: Error) => {
        done(err);
      });
  });

  it('Scenario 2: Basic flow - for...await...of loop consumes immediately', async () => {
    const MOCK_ROWS = [
      {key: 'row1', data: 'data1'},
      {key: 'row2', data: 'data2'},
      {key: 'row3', data: 'data3'},
    ];
    const USER_PROCESSING_TIME_MS = 40; // Different time for this test
    const TOTAL_EXPECTED_USER_PROCESSING_NS = msToNs(MOCK_ROWS.length * USER_PROCESSING_TIME_MS);

    mockBigtableServer.setService({
      serviceName: 'Bigtable',
      methods: {
        ReadRows: createMockReadRowsHandler({
          rows: MOCK_ROWS,
          serverProcessingTimeMs: 10,
          chunkDelayMs: 5,
        }),
      },
    });

    let rowsProcessed = 0;
    advanceMockTimeNs(msToNs(1)); // Initial time

    try {
      const stream = table.createReadStream({});
      for await (const row of stream) {
        assert.ok(row instanceof Row, 'Should receive Row objects');
        // Simulate user processing time
        advanceMockTimeNs(msToNs(USER_PROCESSING_TIME_MS));
        rowsProcessed++;
      }
    } catch (err) {
      assert.fail(err as Error);
    }

    advanceMockTimeNs(msToNs(1)); // Small time after stream ends

    assert.strictEqual(rowsProcessed, MOCK_ROWS.length, 'Should process all rows');

    assert.strictEqual(testMetricsHandler.operationData.length, 1, 'Should have one operation data');
    const opData = testMetricsHandler.operationData[0];
    assert.strictEqual(opData.method, MethodName.READ_ROWS_STREAMING_READ_ROWS);
    assert.strictEqual(opData.status, 'OK');
    assert.strictEqual(opData.streaming, StreamingState.STREAMING);

    assert.ok(opData.applicationLatencies, 'Application latencies should exist');
    assert.strictEqual(opData.applicationLatencies.length, 1, 'Should have one total application latency value');

    const actualAppLatencyNs = msToNs(opData.applicationLatencies[0]);
    const toleranceNs = msToNs(5); // Tolerance of 5ms for the total

    assert.ok(
        actualAppLatencyNs >= TOTAL_EXPECTED_USER_PROCESSING_NS - toleranceNs &&
        actualAppLatencyNs <= TOTAL_EXPECTED_USER_PROCESSING_NS + toleranceNs,
        `Application latency ${opData.applicationLatencies[0]}ms is not within expected range of ${Number(TOTAL_EXPECTED_USER_PROCESSING_NS / 1000000n)}ms (tolerance ${Number(toleranceNs/1000000n)}ms)`
    );

    assert.ok(testMetricsHandler.attemptData.length >= 1, 'Should have at least one attempt data');
  });

  it('Scenario 3: Delayed .on("data", handler) attachment', (done) => {
    const MOCK_ROWS = [
      {key: 'row1', data: 'data1'},
      {key: 'row2', data: 'data2'},
    ];
    const USER_PROCESSING_TIME_MS = 30;
    const DELAY_BEFORE_ATTACH_MS = 100;
    const TOTAL_EXPECTED_USER_PROCESSING_NS = msToNs(MOCK_ROWS.length * USER_PROCESSING_TIME_MS);

    mockBigtableServer.setService({
      serviceName: 'Bigtable',
      methods: {
        ReadRows: createMockReadRowsHandler({
          rows: MOCK_ROWS,
          serverProcessingTimeMs: 5,
          chunkDelayMs: 5,
        }),
      },
    });

    let rowsProcessed = 0;
    advanceMockTimeNs(msToNs(1)); // Initial time

    const stream = table.createReadStream({});

    // Simulate delay before attaching handler
    advanceMockTimeNs(msToNs(DELAY_BEFORE_ATTACH_MS));

    stream
      .on('data', (row: Row) => {
        advanceMockTimeNs(msToNs(USER_PROCESSING_TIME_MS));
        rowsProcessed++;
      })
      .on('end', () => {
        advanceMockTimeNs(msToNs(1));

        assert.strictEqual(rowsProcessed, MOCK_ROWS.length);
        assert.strictEqual(testMetricsHandler.operationData.length, 1);
        const opData = testMetricsHandler.operationData[0];

        assert.ok(opData.applicationLatencies, 'Application latencies should exist');
        assert.strictEqual(opData.applicationLatencies.length, 1, 'Should have one total application latency value');

        const actualAppLatencyNs = msToNs(opData.applicationLatencies[0]);
        const toleranceNs = msToNs(5);

        assert.ok(
            actualAppLatencyNs >= TOTAL_EXPECTED_USER_PROCESSING_NS - toleranceNs &&
            actualAppLatencyNs <= TOTAL_EXPECTED_USER_PROCESSING_NS + toleranceNs,
            `Application latency ${opData.applicationLatencies[0]}ms is not within expected range of ${Number(TOTAL_EXPECTED_USER_PROCESSING_NS / 1000000n)}ms (initial delay ${DELAY_BEFORE_ATTACH_MS}ms should be excluded)`
        );
        done();
      })
      .on('error', done);
  });

  it('Scenario 7: Empty stream - .on("data")', (done) => {
    mockBigtableServer.setService({
      serviceName: 'Bigtable',
      methods: {
        ReadRows: createMockReadRowsHandler({
          rows: [], // No rows
          serverProcessingTimeMs: 5,
        }),
      },
    });

    let dataHandlerCalled = false;
    advanceMockTimeNs(msToNs(1));

    table.createReadStream({})
      .on('data', (row: Row) => {
        dataHandlerCalled = true;
        // This should not be called, but if it is, add some processing time
        advanceMockTimeNs(msToNs(100));
      })
      .on('end', () => {
        advanceMockTimeNs(msToNs(1));
        assert.strictEqual(dataHandlerCalled, false, 'Data handler should not be called for an empty stream');

        assert.strictEqual(testMetricsHandler.operationData.length, 1);
        const opData = testMetricsHandler.operationData[0];
        assert.ok(opData.applicationLatencies);
        assert.strictEqual(opData.applicationLatencies.length, 1);
        assert.strictEqual(opData.applicationLatencies[0], 0, 'Application latency should be 0 for an empty stream');
        done();
      })
      .on('error', done);
  });

  it('Scenario 8: Stream errors after some rows - .on("data")', (done) => {
    const MOCK_ROWS_BEFORE_ERROR = [
      {key: 'row1', data: 'data1'},
      {key: 'row2', data: 'data2'},
    ];
    const USER_PROCESSING_TIME_MS = 35;
    const TOTAL_EXPECTED_USER_PROCESSING_NS = msToNs(MOCK_ROWS_BEFORE_ERROR.length * USER_PROCESSING_TIME_MS);
    const STREAM_ERROR = new GoogleError('Test stream error');
    STREAM_ERROR.code = grpc.status.INTERNAL;

    mockBigtableServer.setService({
      serviceName: 'Bigtable',
      methods: {
        ReadRows: createMockReadRowsHandler({
          rows: MOCK_ROWS_BEFORE_ERROR,
          serverProcessingTimeMs: 5,
          chunkDelayMs: 5,
          error: STREAM_ERROR, // Error will be emitted after these rows
        }),
      },
    });

    let rowsProcessed = 0;
    advanceMockTimeNs(msToNs(1));

    table.createReadStream({})
      .on('data', (row: Row) => {
        advanceMockTimeNs(msToNs(USER_PROCESSING_TIME_MS));
        rowsProcessed++;
      })
      .on('end', () => {
        done(new Error('Stream should have errored, not ended cleanly'));
      })
      .on('error', (err: GoogleError) => {
        advanceMockTimeNs(msToNs(1));
        assert.strictEqual(err.message, STREAM_ERROR.message, 'Should emit the correct error');
        assert.strictEqual(rowsProcessed, MOCK_ROWS_BEFORE_ERROR.length, 'Should process rows before error');

        assert.strictEqual(testMetricsHandler.operationData.length, 1, 'Should have operation data despite error');
        const opData = testMetricsHandler.operationData[0];
        assert.strictEqual(opData.status, grpc.status[STREAM_ERROR.code!], 'Operation status should reflect the error');

        assert.ok(opData.applicationLatencies, 'Application latencies should exist');
        assert.strictEqual(opData.applicationLatencies.length, 1, 'Should have one total application latency value');

        const actualAppLatencyNs = msToNs(opData.applicationLatencies[0]);
        const toleranceNs = msToNs(5);

        assert.ok(
            actualAppLatencyNs >= TOTAL_EXPECTED_USER_PROCESSING_NS - toleranceNs &&
            actualAppLatencyNs <= TOTAL_EXPECTED_USER_PROCESSING_NS + toleranceNs,
            `Application latency ${opData.applicationLatencies[0]}ms is not within expected range of ${Number(TOTAL_EXPECTED_USER_PROCESSING_NS / 1000000n)}ms for rows processed before error`
        );
        done();
      });
  });

  it('Scenario 6: Server sends data in bursts using .on("data")', (done) => {
    const MOCK_ROWS_BATCH1 = [ {key: 'r1', data: 'd1'}, {key: 'r2', data: 'd2'} ];
    const MOCK_ROWS_BATCH2 = [ {key: 'r3', data: 'd3'} ];
    const SERVER_DELAY_BETWEEN_BATCHES_MS = 200;
    const USER_PROCESSING_TIME_MS = 20;
    const TOTAL_EXPECTED_USER_PROCESSING_NS = msToNs(
      (MOCK_ROWS_BATCH1.length + MOCK_ROWS_BATCH2.length) * USER_PROCESSING_TIME_MS
    );

    let streamRequestCount = 0;
    const mockReadRows = (stream: IServerStream<IReadRowsResponse>) => {
      streamRequestCount++;
      async function send() {
        // Send batch 1
        for (const rowCfg of MOCK_ROWS_BATCH1) {
          stream.write({chunks: [{ rowKey: Buffer.from(rowCfg.key), value: Buffer.from(rowCfg.data), familyName: {value: 'cf'}, qualifier: {value: Buffer.from('cq')}, commitRow: true, timestampMicros: 1 }]});
          await new Promise(r => setTimeout(r, 5)); // Small inter-row server delay
        }

        // Simulate server delay
        await new Promise(r => setTimeout(r, SERVER_DELAY_BETWEEN_BATCHES_MS));

        // Send batch 2
        for (const rowCfg of MOCK_ROWS_BATCH2) {
          stream.write({chunks: [{ rowKey: Buffer.from(rowCfg.key), value: Buffer.from(rowCfg.data), familyName: {value: 'cf'}, qualifier: {value: Buffer.from('cq')}, commitRow: true, timestampMicros: 1 }]});
          await new Promise(r => setTimeout(r, 5));
        }
        stream.end();
      }
      send().catch(e => stream.emit('error', e));
    };

    mockBigtableServer.setService({
      serviceName: 'Bigtable',
      methods: { ReadRows: mockReadRows },
    });

    let rowsProcessed = 0;
    advanceMockTimeNs(msToNs(1));

    table.createReadStream({})
      .on('data', (row: Row) => {
        advanceMockTimeNs(msToNs(USER_PROCESSING_TIME_MS));
        rowsProcessed++;
      })
      .on('end', () => {
        advanceMockTimeNs(msToNs(1));

        assert.strictEqual(rowsProcessed, MOCK_ROWS_BATCH1.length + MOCK_ROWS_BATCH2.length);
        assert.strictEqual(testMetricsHandler.operationData.length, 1);
        const opData = testMetricsHandler.operationData[0];

        assert.ok(opData.applicationLatencies);
        assert.strictEqual(opData.applicationLatencies.length, 1);

        const actualAppLatencyNs = msToNs(opData.applicationLatencies[0]);
        const toleranceNs = msToNs(10); // Increased tolerance slightly for multi-batch test

        assert.ok(
            actualAppLatencyNs >= TOTAL_EXPECTED_USER_PROCESSING_NS - toleranceNs &&
            actualAppLatencyNs <= TOTAL_EXPECTED_USER_PROCESSING_NS + toleranceNs,
            `Application latency ${opData.applicationLatencies[0]}ms is not within expected range of ${Number(TOTAL_EXPECTED_USER_PROCESSING_NS / 1000000n)}ms (server delay ${SERVER_DELAY_BETWEEN_BATCHES_MS}ms should be excluded)`
        );
        assert.strictEqual(streamRequestCount, 1, "Should only be one RPC call for this scenario");
        done();
      })
      .on('error', done);
  });

  it('Scenario 4: Delayed for...await...of loop processing', async () => {
    const MOCK_ROWS = [
      {key: 'row1', data: 'data1'},
      {key: 'row2', data: 'data2'},
    ];
    const USER_PROCESSING_TIME_MS = 25;
    const DELAY_BEFORE_LOOP_MS = 120;
    const TOTAL_EXPECTED_USER_PROCESSING_NS = msToNs(MOCK_ROWS.length * USER_PROCESSING_TIME_MS);

    mockBigtableServer.setService({
      serviceName: 'Bigtable',
      methods: {
        ReadRows: createMockReadRowsHandler({
          rows: MOCK_ROWS,
          serverProcessingTimeMs: 5,
          chunkDelayMs: 5,
        }),
      },
    });

    let rowsProcessed = 0;
    advanceMockTimeNs(msToNs(1));

    const stream = table.createReadStream({});

    // Simulate delay before starting the loop
    advanceMockTimeNs(msToNs(DELAY_BEFORE_LOOP_MS));

    try {
      for await (const row of stream) {
        advanceMockTimeNs(msToNs(USER_PROCESSING_TIME_MS));
        rowsProcessed++;
      }
    } catch (err) {
      assert.fail(err as Error);
    }

    advanceMockTimeNs(msToNs(1));

    assert.strictEqual(rowsProcessed, MOCK_ROWS.length);
    assert.strictEqual(testMetricsHandler.operationData.length, 1);
    const opData = testMetricsHandler.operationData[0];

    assert.ok(opData.applicationLatencies, 'Application latencies should exist');
    assert.strictEqual(opData.applicationLatencies.length, 1, 'Should have one total application latency value');

    const actualAppLatencyNs = msToNs(opData.applicationLatencies[0]);
    const toleranceNs = msToNs(5);

    assert.ok(
        actualAppLatencyNs >= TOTAL_EXPECTED_USER_PROCESSING_NS - toleranceNs &&
        actualAppLatencyNs <= TOTAL_EXPECTED_USER_PROCESSING_NS + toleranceNs,
        `Application latency ${opData.applicationLatencies[0]}ms is not within expected range of ${Number(TOTAL_EXPECTED_USER_PROCESSING_NS / 1000000n)}ms (initial delay ${DELAY_BEFORE_LOOP_MS}ms should be excluded)`
    );
  });

  it('Scenario 5: Backpressure - slow .on("data") handler, fast server', (done) => {
    const MOCK_ROWS = [
      {key: 'row1', data: 'data1'}, {key: 'row2', data: 'data2'},
      {key: 'row3', data: 'data3'}, {key: 'row4', data: 'data4'},
      {key: 'row5', data: 'data5'},
    ];
    const USER_PROCESSING_TIME_MS = 200; // Very slow user processing
    const SERVER_CHUNK_DELAY_MS = 5;    // Fast server
    const TOTAL_EXPECTED_USER_PROCESSING_NS = msToNs(MOCK_ROWS.length * USER_PROCESSING_TIME_MS);

    mockBigtableServer.setService({
      serviceName: 'Bigtable',
      methods: {
        ReadRows: createMockReadRowsHandler({
          rows: MOCK_ROWS,
          serverProcessingTimeMs: 1,
          chunkDelayMs: SERVER_CHUNK_DELAY_MS, // Server sends chunks quickly
          chunksPerResponse: 1,
        }),
      },
    });

    let rowsProcessed = 0;
    advanceMockTimeNs(msToNs(1));

    // Keep default HWM for userStream (which is 0 for objectMode if not specified, meaning it relies on internal passthrough)
    // The internalPassthrough also has HWM 0. This should mean backpressure propagates quickly.
    const stream = table.createReadStream({});

    stream
      .on('data', (row: Row) => {
        // Simulate slow SYNCHRONOUS processing for the row
        advanceMockTimeNs(msToNs(USER_PROCESSING_TIME_MS));
        rowsProcessed++;
      })
      .on('end', () => {
        advanceMockTimeNs(msToNs(1));

        assert.strictEqual(rowsProcessed, MOCK_ROWS.length);
        assert.strictEqual(testMetricsHandler.operationData.length, 1);
        const opData = testMetricsHandler.operationData[0];

        assert.ok(opData.applicationLatencies, 'Application latencies should exist');
        assert.strictEqual(opData.applicationLatencies.length, 1, 'Should have one total application latency value');

        const actualAppLatencyNs = msToNs(opData.applicationLatencies[0]);
        // Tolerance needs to be larger here because setTimeout(..., 1) can introduce small, unpredictable
        // gaps in mock time if not perfectly aligned with hrtime ticks,
        // and the start/stop logic for many small, fast chunks with slow user code can accumulate this.
        const toleranceNs = msToNs(MOCK_ROWS.length * 5); // 5ms per row tolerance

        assert.ok(
            actualAppLatencyNs >= TOTAL_EXPECTED_USER_PROCESSING_NS - toleranceNs &&
            actualAppLatencyNs <= TOTAL_EXPECTED_USER_PROCESSING_NS + toleranceNs,
            `Application latency ${opData.applicationLatencies[0]}ms is not within expected range of ${Number(TOTAL_EXPECTED_USER_PROCESSING_NS / 1000000n)}ms (tolerance ${Number(toleranceNs/1000000n)}ms)`
        );
        done();
      })
      .on('error', done);
  });
});
