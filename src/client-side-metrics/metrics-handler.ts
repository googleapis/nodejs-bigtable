import {Attributes} from '../../common/client-side-metrics-attributes';

interface onOperationCompleteMetrics {
  operationLatency: number;
  retryCount?: number;
}

interface onAttemptCompleteMetrics {
  attemptLatency: number;
  serverLatency?: number;
  firstResponseLatency?: number;
  connectivityErrorCount?: number;
}

interface onReadMetrics {
  latency: number;
}

// TODO: Trim attributes so only necessary attributes are required.
export interface IMetricsHandler {
  onOperationComplete?(
    metrics: onOperationCompleteMetrics,
    attributes: Attributes
  ): void;
  onRead?(metrics: onReadMetrics, attributes: Attributes): void;
  onAttemptComplete?(
    metrics: onAttemptCompleteMetrics,
    attributes: Attributes
  ): void;
}
