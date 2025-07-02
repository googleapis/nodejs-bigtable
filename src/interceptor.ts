import {grpc} from 'google-gax';

const loggingInterceptor = (options: any, nextCall: any) => {
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
        onReceiveStatus: function (status: any, next: any) {
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
