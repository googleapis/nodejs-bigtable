import {MockService} from '../../../mock-service';
import * as assert from 'assert';
import {ServiceHandler} from '../service-handler';

export abstract class SameCallHandler extends ServiceHandler {
  service: MockService;
  request: any = null;
  callCount = 0;
  endpoint: string;

  protected constructor(service: MockService, endpoint: string) {
    super();
    this.endpoint = endpoint;
    this.service = service;
  }

  setupService(): void {
    const handleRpcCall = (call: any) => {
      // TODO: Make an abstraction of this
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
    this.service.setService({
      // Abstraction: Always emit error
      [this.endpoint]: handleRpcCall,
    });
  }
}
