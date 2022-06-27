import {grpc} from 'google-gax';
import {ServiceHandler} from '../service-handler';

export class SendErrorHandler extends ServiceHandler {
  code: grpc.status;
  request: any = null;
  callCount = 0;

  constructor(code: grpc.status) {
    super();
    this.code = code;
  }

  handler(call: any) {
    const errorDetails = 'Details for a particular type of error';
    call.emit('error', {
      code: this.code,
      details: errorDetails,
    });
  }
}
