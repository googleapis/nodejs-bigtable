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
import {MetricsTracerFactory} from '../../src/client-side-metrics/metrics-tracer-factory';
import {TestMeterProvider} from '../../common/test-meter-provider';
import {TestDateProvider} from '../../common/test-date-provider';
import * as assert from 'assert';
import * as fs from 'fs';

class Logger {
  private messages: string[] = [];

  log(message: string) {
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }
}

class FakeBigtable {
  appProfileId?: string;
  metricsTracerFactory: MetricsTracerFactory;
  constructor(observabilityOptions: {meterProvider: TestMeterProvider}) {
    this.metricsTracerFactory = new MetricsTracerFactory({
      meterProvider: observabilityOptions.meterProvider,
    });
  }

  getProjectId_(
    callback: (err: Error | null, projectId?: string) => void
  ): void {
    callback(null, 'my-project');
  }
}

class FakeInstance {
  id = 'fakeInstanceId';
}

describe('Bigtable/MetricsTracer', () => {
  it('should record the right metrics with a typical method call', () => {
    const logger = new Logger();
    class FakeTable {
      id = 'fakeTableId';
      instance = new FakeInstance();
      bigtable = new FakeBigtable({
        meterProvider: new TestMeterProvider(logger),
      });

      fakeMethod(): void {
        function createMetadata(duration: string) {
          return {
            internalRepr: new Map([
              ['server-timing', Buffer.from(`dur=${duration}`)],
            ]),
            options: {},
          };
        }
        const status = {
          metadata: {
            internalRepr: new Map([
              ['x-goog-ext-425905942-bin', Buffer.from('doLater')],
            ]),
            options: {},
          },
        };
        const metricsTracer =
          this.bigtable.metricsTracerFactory.getMetricsTracer(
            this,
            'fakeMethod',
            new TestDateProvider(logger)
          );
        // In this method we simulate a series of events that might happen
        // when a user calls one of the Table methods.
        // Here is an example of what might happen in a method call:
        logger.log('1. The operation starts');
        metricsTracer.onOperationStart();
        logger.log('2. The attempt starts.');
        metricsTracer.onAttemptStart();
        logger.log('3. Client receives status information.');
        metricsTracer.onStatusReceived(status);
        logger.log('4. Client receives metadata.');
        metricsTracer.onMetadataReceived(createMetadata('101'));
        logger.log('5. Client receives first row.');
        metricsTracer.onResponse();
        logger.log('6. Client receives metadata.');
        metricsTracer.onMetadataReceived(createMetadata('102'));
        logger.log('7. Client receives second row.');
        metricsTracer.onResponse();
        logger.log('8. A transient error occurs.');
        metricsTracer.onAttemptComplete({finalOperationStatus: 'ERROR'});
        logger.log('9. After a timeout, the second attempt is made.');
        metricsTracer.onAttemptStart();
        logger.log('10. Client receives status information.');
        metricsTracer.onStatusReceived(status);
        logger.log('11. Client receives metadata.');
        metricsTracer.onMetadataReceived(createMetadata('103'));
        logger.log('12. Client receives third row.');
        metricsTracer.onResponse();
        logger.log('13. Client receives metadata.');
        metricsTracer.onMetadataReceived(createMetadata('104'));
        logger.log('14. Client receives fourth row.');
        metricsTracer.onResponse();
        logger.log('15. User reads row 1');
        metricsTracer.onRead();
        logger.log('16. User reads row 2');
        metricsTracer.onRead();
        logger.log('17. User reads row 3');
        metricsTracer.onRead();
        logger.log('18. User reads row 4');
        metricsTracer.onRead();
        logger.log('19. Stream ends, operation completes');
        metricsTracer.onOperationComplete({
          retries: 1,
          finalOperationStatus: 'SUCCESS',
          connectivityErrorCount: 1,
        });
      }
    }
    const table = new FakeTable();
    table.fakeMethod();
    const expectedOutput = fs.readFileSync(
      './test/metrics-tracer/typical-method-call.txt',
      'utf8'
    );
    // Ensure events occurred in the right order here:
    assert.strictEqual(logger.getMessages().join('\n') + '\n', expectedOutput);
    console.log('test');
  });
});
