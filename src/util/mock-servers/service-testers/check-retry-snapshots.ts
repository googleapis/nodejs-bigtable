import {grpc, ServiceError} from 'google-gax';
import * as snapshot from 'snap-shot-it';
import {MockService} from '../mock-service';
import {ServiceHandler} from './service-handler';

export function checkRetrySnapshots(
  service: MockService,
  table: any,
  code: grpc.status,
  callback: () => void
) {
  const serviceHandler = new ServiceHandler(code);
  serviceHandler.setupService(service);
  table.createReadStream({}).on('error', (error: ServiceError) => {
    snapshot({
      code,
      callCount: serviceHandler.callCount,
      request: serviceHandler.request,
    });
    callback();
  });
}
