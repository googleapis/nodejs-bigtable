import {grpc, ServiceError} from 'google-gax';
import * as assert from 'assert';
import * as snapshot from 'snap-shot-it';
import {MockService} from '../mock-service';

export function checkRetrySnapshots(
  service: MockService,
  table: any,
  code: grpc.status,
  callback: () => void
) {
  const errorDetails = 'Details for a particular type of error';
  let request: any = null;
  let callCount = 0;
  const emitError = (stream: any) => {
    const streamRequest = stream.request;
    if (request) {
      // This ensures that every call to the server is the same
      assert.deepStrictEqual(request, streamRequest);
    } else {
      request = streamRequest;
    }
    callCount++;
    stream.emit('error', {
      code,
      details: errorDetails,
    });
  };
  service.setService({
    // Abstraction: Always emit error
    ReadRows: emitError,
  });
  table.createReadStream({}).on('error', (error: ServiceError) => {
    snapshot({
      code,
      callCount,
      request,
    });
    callback();
  });
}