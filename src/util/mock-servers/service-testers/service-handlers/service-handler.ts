import {MockService} from '../../mock-service';
import * as assert from 'assert';

export abstract class ServiceHandler {
  request: any = null;
  callCount = 0;

  abstract handler(call: any): void;

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
