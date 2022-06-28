import {grpc} from 'google-gax';
import {SameCallHandler} from './same-call-handler';
import {MockService} from '../../../mock-service';

export class SendErrorHandler extends SameCallHandler {
  code: grpc.status;
  request: any = null;
  callCount = 0;

  constructor(service: MockService, endpoint: string, code: grpc.status) {
    super(service, endpoint);
    this.code = code;
  }

  callHandler(call: any) {
    call.emit('error', {
      code: this.code,
      details: 'Details for a particular type of error',
    });
  }

  snapshotOutput(): any {
    return {
      request: this.request,
      code: this.code,
      callCount: this.callCount,
    };
  }
}
