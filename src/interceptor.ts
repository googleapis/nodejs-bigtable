import {CallOptions} from 'google-gax';
import {OperationMetricsCollector} from './client-side-metrics/operation-metrics-collector';
import {Metadata} from '@grpc/grpc-js';

// Mock Server Implementation
import * as grpcJs from '@grpc/grpc-js';
import {status as GrpcStatus} from '@grpc/grpc-js';

export type ServerStatus = {
  metadata: Metadata;
  code: number;
  details: string;
};

// Helper to create interceptor provider for OperationMetricsCollector
function createMetricsInterceptorProvider(
  collector: OperationMetricsCollector,
) {
  return (options: grpcJs.InterceptorOptions, nextCall: grpcJs.NextCall) => {
    let savedReceiveMessage: any;
    // savedReceiveMetadata and savedReceiveStatus are not strictly needed here anymore for the interceptor's own state
    // OperationStart and AttemptStart will be called by the calling code (`fakeReadModifyWriteRow`)
    return new grpcJs.InterceptingCall(nextCall(options), {
      start: (metadata, listener, next) => {
        // AttemptStart is called by the orchestrating code
        const newListener: grpcJs.Listener = {
          onReceiveMetadata: (metadata, nextMd) => {
            console.log('metadata encountered');
            collector.onMetadataReceived(metadata);
            nextMd(metadata);
          },
          onReceiveMessage: (message, nextMsg) => {
            savedReceiveMessage = message; // Still need to know if a message was received for onResponse
            nextMsg(message);
          },
          onReceiveStatus: (status, nextStat) => {
            if (status.code === GrpcStatus.OK && savedReceiveMessage) {
              collector.onResponse(); // Call onResponse for successful unary calls with a message
            }
            collector.onStatusMetadataReceived(status as ServerStatus);
            // AttemptComplete and OperationComplete will be called by the calling code
            nextStat(status);
          },
        };
        next(metadata, newListener);
      },
      sendMessage: (message, next) => next(message),
      halfClose: next => next(),
      cancel: next => next(),
    });
  };
}

export function withInterceptors(
  gaxOptions: CallOptions,
  metricsCollector?: OperationMetricsCollector,
) {
  if (metricsCollector) {
    const interceptor = createMetricsInterceptorProvider(metricsCollector);
    if (!gaxOptions.otherArgs) {
      gaxOptions.otherArgs = {};
    }
    if (!gaxOptions.otherArgs.options) {
      gaxOptions.otherArgs.options = {};
    }
    if (!gaxOptions.otherArgs.options.interceptors) {
      gaxOptions.otherArgs.options.interceptors = [interceptor];
    }
  }
  return gaxOptions;
}
