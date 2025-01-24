import {Attributes} from '../../common/client-side-metrics-attributes';

/**
 * Metrics related to the completion of a Bigtable operation.
 */
export interface onOperationCompleteMetrics {
  operationLatency: number;
  retryCount?: number;
}

/**
 * Metrics related to the completion of a single attempt of a Bigtable operation.
 */
export interface onAttemptCompleteMetrics {
  attemptLatency: number;
  serverLatency?: number;
  firstResponseLatency?: number;
  connectivityErrorCount?: number;
}

// TODO: Trim attributes so only necessary attributes are required.
/**
 * An interface for handling client-side metrics related to Bigtable operations.
 * Implementations of this interface can define how metrics are recorded and processed.
 */
export interface IMetricsHandler {
  /**
   * Called when an operation completes (successfully or unsuccessfully).
   * @param {onOperationCompleteMetrics} metrics Metrics related to the completed operation.
   * @param {Attributes} attributes Attributes associated with the completed operation.
   */
  onOperationComplete?(
    metrics: onOperationCompleteMetrics,
    attributes: Attributes
  ): void;
  /**
   * Called when an attempt (e.g., an RPC attempt) completes.
   * @param {onAttemptCompleteMetrics} metrics Metrics related to the completed attempt.
   * @param {Attributes} attributes Attributes associated with the completed attempt.
   */
  onAttemptComplete?(
    metrics: onAttemptCompleteMetrics,
    attributes: Attributes
  ): void;
}
