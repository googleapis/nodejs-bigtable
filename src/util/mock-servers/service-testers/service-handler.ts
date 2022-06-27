import {grpc} from 'google-gax';
import {MockService} from '../mock-service';
import * as assert from 'assert';

export class ServiceHandler {
  code: grpc.status;
  request: any = null;
  callCount = 0;

  constructor(code: grpc.status) {
    this.code = code;
  }

  handler(call: any) {
    const errorDetails = 'Details for a particular type of error';
    call.emit('error', {
      code: this.code,
      details: errorDetails,
    });
  }

  setupService(service: MockService) {
    const handleRpcCall = (call: any) => {
      const streamRequest = call.request;
      if (this.request) {
        // This ensures that every call to the server is the same
        assert.deepStrictEqual(this.request, streamRequest);
      } else {
        this.request = streamRequest;
      }
      this.callCount++;
      this.handler(call);
    };
    service.setService({
      // Abstraction: Always emit error
      ReadRows: handleRpcCall,
    });
  }
}
