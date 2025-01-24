import {WithLogger} from './logger';
import {
  onAttemptCompleteMetrics,
  onOperationCompleteMetrics,
} from '../src/client-side-metrics/metrics-handler';
import {Attributes} from './client-side-metrics-attributes';

/**
 * A test implementation of the IMetricsHandler interface.  Used for testing purposes.
 * It logs the metrics and attributes received by the onOperationComplete and onAttemptComplete methods.
 */
export class TestMetricsHandler extends WithLogger {
  /**
   * Logs the metrics and attributes received for an operation completion.
   * @param {onOperationCompleteMetrics} metrics Metrics related to the completed operation.
   * @param {Attributes} attributes Attributes associated with the completed operation.
   */
  onOperationComplete(
    metrics: onOperationCompleteMetrics,
    attributes: Attributes
  ) {
    attributes.clientName = 'nodejs-bigtable';
    this.logger.log('Recording parameters for onOperationComplete:');
    this.logger.log(`metrics: ${JSON.stringify(metrics)}`);
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }

  /**
   * Logs the metrics and attributes received for an attempt completion.
   * @param {onAttemptCompleteMetrics} metrics Metrics related to the completed attempt.
   * @param {Attributes} attributes Attributes associated with the completed attempt.
   */
  onAttemptComplete(metrics: onAttemptCompleteMetrics, attributes: Attributes) {
    attributes.clientName = 'nodejs-bigtable';
    this.logger.log('Recording parameters for onAttemptComplete:');
    this.logger.log(`metrics: ${JSON.stringify(metrics)}`);
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }
}
