import {grpc} from 'google-gax';
import {ServiceHandler} from '../service-handler';

export class SendErrorHandler extends ServiceHandler {
  code: grpc.status;
  request: any = null;
  callCount = 0;

  constructor(endpoint: string, code: grpc.status) {
    super(endpoint);
    this.code = code;
  }

  callHandler(call: any) {
    call.emit('error', {
      code: this.code,
      details: 'Details for a particular type of error',
    });
  }
}
