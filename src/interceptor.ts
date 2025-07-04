import {grpc} from 'google-gax';
import {OperationMetricsCollector} from './client-side-metrics/operation-metrics-collector';
import {InterceptorOptions, Metadata, NextCall} from '@grpc/grpc-js';

// Mock Server Implementation
import * as grpcJs from '@grpc/grpc-js';
import {status as GrpcStatus} from '@grpc/grpc-js';

// TODO: Put this in more places
export type ServerStatus = {
  metadata: Metadata;
  code: number;
  details: string;
};

export const loggingInterceptor = (options: any, nextCall: any) => {
  return new grpc.InterceptingCall(nextCall(options), {
    start: function (metadata, listener, next) {
      console.log(
        `[Interceptor LOG] Method: ${options.method_definition.path}`,
      );
      console.log('[Interceptor LOG] Outgoing Metadata:', metadata.getMap());

      const newListener = {
        onReceiveMetadata: function (metadata: any, next: any) {
          console.log(
            '[Interceptor LOG] Incoming Metadata:',
            metadata.getMap(),
          );
          next(metadata);
        },
        onReceiveMessage: function (message: any, next: any) {
          console.log(
            '[Interceptor LOG] Incoming Message (type):',
            message ? message.constructor.name : null,
          );
          next(message);
        },
        onReceiveStatus: function (status: ServerStatus, next: any) {
          console.log('[Interceptor LOG] Status:', status);
          next(status);
        },
      };
      next(metadata, newListener);
    },
    sendMessage: function (message, next) {
      console.log(
        '[Interceptor LOG] Outgoing Message (type):',
        message ? message.constructor.name : null,
      );
      next(message);
    },
    halfClose: function (next) {
      console.log('[Interceptor LOG] Half Close');
      next();
    },
    cancel: function (next) {
      console.log('[Interceptor LOG] Cancelled');
      next();
    },
  });
};

export const getInterceptor = (metricsCollector: OperationMetricsCollector) => {
  return (options: InterceptorOptions, nextCall: NextCall) => {
    return new grpc.InterceptingCall(nextCall(options), {
      start: function (metadata, listener, next) {
        const newListener = {
          onReceiveMetadata: function (
            metadata: Metadata,
            next: (metadata: Metadata) => void,
          ) {
            console.log(
              '[Interceptor LOG] Incoming Metadata:',
              metadata.getMap(),
            );
            metricsCollector.onMetadataReceived(metadata);
            next(metadata);
          },
          onReceiveMessage: function (
            message: any,
            next: (message: any) => void,
          ) {
            next(message);
          },
          onReceiveStatus: function (
            status: ServerStatus,
            next: (s: ServerStatus) => void,
          ) {
            console.log('[Interceptor LOG] Status:', status);
            next(status);
          },
        };
        next(metadata, newListener);
      },
      sendMessage: function (message, next) {
        next(message);
      },
      halfClose: function (next) {
        next();
      },
      cancel: function (next) {
        next();
      },
    });
  };
};

// Helper to create interceptor provider for OperationMetricsCollector
export function createMetricsInterceptorProvider(
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
