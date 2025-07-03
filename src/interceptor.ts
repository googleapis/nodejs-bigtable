import {grpc} from 'google-gax';
import {OperationMetricsCollector} from './client-side-metrics/operation-metrics-collector';
import {StatusObject} from '@grpc/grpc-js/src/call-interface';
import {InterceptorOptions, Metadata, NextCall} from '@grpc/grpc-js';

// TODO: Try to replace this class with its real type
class ServerStatusMetadata {
  // TODO: internalRepr is protected to meet needs of the compiler in the
  protected internalRepr: Map<string, Uint8Array[]>;
  options: {};
  constructor(internalRepr: Map<string, Uint8Array[]>, options: {}) {
    this.internalRepr = internalRepr;
    this.options = options;
  }
}

// TODO: Put this in more places
type ServerStatus = {
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
