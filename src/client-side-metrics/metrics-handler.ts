import {Attributes} from '../../common/client-side-metrics-attributes';

export interface onOperationCompleteMetrics {
  operationLatency: number;
  retryCount?: number;
}

export interface onAttemptCompleteMetrics {
  attemptLatency: number;
  serverLatency?: number;
  firstResponseLatency?: number;
  connectivityErrorCount?: number;
}

// TODO: Trim attributes so only necessary attributes are required.
export interface IMetricsHandler {
  onOperationComplete?(
    metrics: onOperationCompleteMetrics,
    attributes: Attributes
  ): void;
  onAttemptComplete?(
    metrics: onAttemptCompleteMetrics,
    attributes: Attributes
  ): void;
}
