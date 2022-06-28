import {grpc, ServiceError} from 'google-gax';
import * as snapshot from 'snap-shot-it';
import {SameCallHandler} from './service-handlers/implementation/same-call-handler';

export function checkRetrySnapshots(
  serviceHandler: SameCallHandler,
  table: any,
  code: grpc.status,
  callback: () => void
) {
  serviceHandler.setupService();
  // TODO: Abstract out the stream getter
  table.createReadStream({}).on('error', (error: ServiceError) => {
    snapshot(serviceHandler.snapshotOutput());
    callback();
  });
}
