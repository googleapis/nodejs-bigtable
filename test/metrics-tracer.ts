import {describe} from 'mocha';
import {MetricsTracerFactory} from '../src/metrics-tracer-factory';
import {TestMeterProvider} from '../common/test-meter-provider';
import {TestDateProvider} from '../common/test-date-provider';

// TODO: Shared folder

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
// TODO: Put fixtures into a shared folder that are going to be used
// by system tests.

class FakeInstance {
  id = 'fakeInstanceId';
}

// TODO: Check that there is a server latency for each attempt

describe.only('Bigtable/MetricsTracer', () => {
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
        metricsTracer.onMetadataReceived(createMetadata('1001'));
        logger.log('5. Client receives first row.');
        metricsTracer.onResponse();
        logger.log('6. Client receives metadata.');
        metricsTracer.onMetadataReceived(createMetadata('1002'));
        logger.log('7. Client receives second row.');
        metricsTracer.onResponse();
        logger.log('8. A transient error occurs.');
        metricsTracer.onAttemptComplete({finalOperationStatus: 'ERROR'});
        logger.log('9. After a timeout, the second attempt is made.');
        metricsTracer.onAttemptStart();
        logger.log('10. Client receives status information.');
        metricsTracer.onStatusReceived(status);
        logger.log('11. Client receives metadata.');
        metricsTracer.onMetadataReceived(createMetadata('1003'));
        logger.log('12. Client receives third row.');
        metricsTracer.onResponse();
        logger.log('13. Client receives metadata.');
        metricsTracer.onMetadataReceived(createMetadata('1004'));
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
    // Ensure events occurred in the right order here:
    console.log('test');
  });
});
