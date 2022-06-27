import {MockService} from '../../mock-service';
import * as assert from 'assert';

export abstract class ServiceHandler {
  request: any = null;
  callCount = 0;
  endpoint: string;

  protected constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  abstract callHandler(call: any): void;

  setupService(service: MockService) {
    const handleRpcCall = (call: any) => {
      const callRequest = call.request;
      if (this.request) {
        // This ensures that every call to the server is the same
        assert.deepStrictEqual(this.request, callRequest);
      } else {
        this.request = callRequest;
      }
      this.callCount++;
      this.callHandler(call);
    };
    service.setService({
      // Abstraction: Always emit error
      [this.endpoint]: handleRpcCall,
    });
  }
}
