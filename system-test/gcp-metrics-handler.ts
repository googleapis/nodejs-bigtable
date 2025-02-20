import {describe} from 'mocha';
import {GCPMetricsHandler} from '../src/client-side-metrics/gcp-metrics-handler';
import {expectedRequestsHandled} from '../test-common/metrics-handler-fixture';
import {
  OnAttemptCompleteData,
  OnOperationCompleteData,
} from '../src/client-side-metrics/metrics-handler';
import {CloudMonitoringExporter} from '../src/client-side-metrics/exporter';

// TODO: Test that calls export.
// TODO: Test whole process.
describe('Bigtable/GCPMetricsHandler', () => {
  it('Should export a value to the CloudMonitoringExporter', done => {
    /*
    We need to create a timeout here because if we don't then mocha shuts down
    the test as it is sleeping before the GCPMetricsHandler has a chance to
    export the data.
     */
    const timeout = setTimeout(() => {}, 30000);
    const handler = new GCPMetricsHandler(
      new CloudMonitoringExporter({projectId: 'cloud-native-db-dpes-shared'})
    );

    for (const request of expectedRequestsHandled) {
      if (request.attemptLatency) {
        handler.onAttemptComplete(request as OnAttemptCompleteData);
      } else {
        handler.onOperationComplete(request as OnOperationCompleteData);
      }
    }
  });
});
