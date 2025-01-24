import {WithLogger} from './logger';
import {
  OnAttemptCompleteMetrics,
  OnOperationCompleteMetrics,
} from '../src/client-side-metrics/metrics-handler';
import {
  OnAttemptCompleteAttributes,
  OnOperationCompleteAttributes,
} from './client-side-metrics-attributes';

/**
 * A test implementation of the IMetricsHandler interface.  Used for testing purposes.
 * It logs the metrics and attributes received by the onOperationComplete and onAttemptComplete methods.
 */
export class TestMetricsHandler extends WithLogger {
  /**
   * Logs the metrics and attributes received for an operation completion.
   * @param {OnOperationCompleteMetrics} metrics Metrics related to the completed operation.
   * @param {Attributes} attributes Attributes associated with the completed operation.
   */
  onOperationComplete(
    metrics: OnOperationCompleteMetrics,
    attributes: OnOperationCompleteAttributes
  ) {
    attributes.clientName = 'nodejs-bigtable';
    this.logger.log('Recording parameters for onOperationComplete:');
    this.logger.log(`metrics: ${JSON.stringify(metrics)}`);
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }

  /**
   * Logs the metrics and attributes received for an attempt completion.
   * @param {OnAttemptCompleteMetrics} metrics Metrics related to the completed attempt.
   * @param {Attributes} attributes Attributes associated with the completed attempt.
   */
  onAttemptComplete(
    metrics: OnAttemptCompleteMetrics,
    attributes: OnAttemptCompleteAttributes
  ) {
    attributes.clientName = 'nodejs-bigtable';
    this.logger.log('Recording parameters for onAttemptComplete:');
    this.logger.log(`metrics: ${JSON.stringify(metrics)}`);
    this.logger.log(`attributes: ${JSON.stringify(attributes)}`);
  }
}
