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

import {describe} from 'mocha';
import * as assert from 'assert';
import * as fs from 'fs';
import {TestMetricsHandler} from '../../test-common/test-metrics-handler';
import {OperationMetricsCollector} from '../../src/client-side-metrics/operation-metrics-collector';
import {
  MethodName,
  StreamingState,
} from '../../src/client-side-metrics/client-side-metrics-attributes';
import {grpc} from 'google-gax';
import {expectedRequestsHandled} from './metrics-handler-fixture';
import * as gax from 'google-gax';
const root = gax.protobuf.loadSync(
  './protos/google/bigtable/v2/response_params.proto'
);
const ResponseParams = root.lookupType('ResponseParams');

/**
 * A fake implementation of the Bigtable client for testing purposes.  Provides a
 * metricsTracerFactory and a stubbed projectId method.
 */
class FakeBigtable {
  clientUid = 'fake-uuid';
  appProfileId?: string;
  projectId = 'my-project';
}

/**
 * A fake implementation of a Bigtable instance for testing purposes.  Provides only an ID.
 */
class FakeInstance {
  /**
   * The ID of the fake instance.
   */
  id = 'fakeInstanceId';
}

describe('Bigtable/MetricsCollector', () => {
  const logger = {value: ''};
  const originalDate = global.Date;

  before(() => {
    let mockTime = new Date('1970-01-01T00:00:01.000Z').getTime();

    (global as any).Date = class extends originalDate {
      constructor(...args: any[]) {
        // Using a rest parameter
        if (args.length === 0) {
          super(mockTime);
          logger.value += `getDate call returns ${mockTime.toString()} ms\n`;
          mockTime += 1000;
        }
      }

      static now(): number {
        return mockTime;
      }

      static parse(dateString: string): number {
        return originalDate.parse(dateString);
      }

      static UTC(
        year: number,
        month: number,
        date?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        ms?: number
      ): number {
        return originalDate.UTC(year, month, date, hours, minutes, seconds, ms);
      }
    };
  });

  after(() => {
    (global as any).Date = originalDate;
  });

  it('should record the right metrics with a typical method call', async () => {
    const testHandler = new TestMetricsHandler(logger);
    const metricsHandlers = [testHandler];
    class FakeTable {
      id = 'fakeTableId';
      instance = new FakeInstance();
      bigtable = new FakeBigtable();

      async fakeMethod(): Promise<void> {
        function createMetadata(duration: string) {
          return {
            internalRepr: new Map([
              ['server-timing', [`gfet4t7; dur=${duration}`]],
            ]),
            options: {},
          };
        }
        if (this.bigtable.projectId) {
          const status = {
            metadata: {
              internalRepr: new Map([
                [
                  'x-goog-ext-425905942-bin',
                  [
                    ResponseParams.encode({
                      zoneId: 'us-west1-c',
                      clusterId: 'fake-cluster3',
                    }).finish(),
                  ],
                ],
              ]),
              options: {},
            },
          };
          const metricsCollector = new OperationMetricsCollector(
            this,
            metricsHandlers,
            MethodName.READ_ROWS,
            StreamingState.STREAMING
          );
          // In this method we simulate a series of events that might happen
          // when a user calls one of the Table methods.
          // Here is an example of what might happen in a method call:
          logger.value += '1. The operation starts\n';
          metricsCollector.onOperationStart();
          logger.value += '2. The attempt starts.\n';
          metricsCollector.onAttemptStart();
          logger.value += '3. Client receives status information.\n';
          metricsCollector.onStatusMetadataReceived(status);
          logger.value += '4. Client receives metadata.\n';
          metricsCollector.onMetadataReceived(createMetadata('101'));
          logger.value += '5. Client receives first row.\n';
          metricsCollector.onResponse(this.bigtable.projectId);
          logger.value += '6. Client receives metadata.\n';
          metricsCollector.onMetadataReceived(createMetadata('102'));
          logger.value += '7. Client receives second row.\n';
          metricsCollector.onResponse(this.bigtable.projectId);
          logger.value += '8. A transient error occurs.\n';
          metricsCollector.onAttemptComplete(
            this.bigtable.projectId,
            grpc.status.DEADLINE_EXCEEDED
          );
          logger.value += '9. After a timeout, the second attempt is made.\n';
          metricsCollector.onAttemptStart();
          logger.value += '10. Client receives status information.\n';
          metricsCollector.onStatusMetadataReceived(status);
          logger.value += '11. Client receives metadata.\n';
          metricsCollector.onMetadataReceived(createMetadata('103'));
          logger.value += '12. Client receives third row.\n';
          metricsCollector.onResponse(this.bigtable.projectId);
          logger.value += '13. Client receives metadata.\n';
          metricsCollector.onMetadataReceived(createMetadata('104'));
          logger.value += '14. Client receives fourth row.\n';
          metricsCollector.onResponse(this.bigtable.projectId);
          logger.value += '15. User reads row 1\n';
          logger.value += '16. Stream ends, operation completes\n';
          metricsCollector.onAttemptComplete(
            this.bigtable.projectId,
            grpc.status.OK
          );
          metricsCollector.onOperationComplete(
            this.bigtable.projectId,
            grpc.status.OK
          );
        }
      }
    }
    const table = new FakeTable();
    await table.fakeMethod();
    const expectedOutput = fs.readFileSync(
      './test/metrics-collector/typical-method-call.txt',
      'utf8'
    );
    // Ensure events occurred in the right order here:
    assert.strictEqual(logger.value, expectedOutput.replace(/\r/g, ''));
    assert.deepStrictEqual(
      testHandler.requestsHandled,
      expectedRequestsHandled
    );
  });
});
