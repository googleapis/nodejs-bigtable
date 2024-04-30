// These two function should be moved out of this module
import {CallOptions, GoogleError, RetryOptions, ServiceError} from 'google-gax';
import {BackoffSettings} from 'google-gax/build/src/gax';

// See protos/google/rpc/code.proto
// (4=DEADLINE_EXCEEDED, 8=RESOURCE_EXHAUSTED, 10=ABORTED, 14=UNAVAILABLE)
export const RETRYABLE_STATUS_CODES = new Set([4, 8, 10, 14]);
export const DEFAULT_BACKOFF_SETTINGS: BackoffSettings = {
  initialRetryDelayMillis: 10,
  retryDelayMultiplier: 2,
  maxRetryDelayMillis: 60000,
};
const isRstStreamError = (error: GoogleError | ServiceError): boolean => {
  // Retry on "received rst stream" errors
  if (error.code === 13 && error.message) {
    const error_message = (error.message || '').toLowerCase();
    return (
      error.code === 13 &&
      (error_message.includes('rst_stream') ||
        error_message.includes('rst stream'))
    );
  }
  return false;
};

const createReadStreamShouldRetryFn = function checkRetry(
  error: GoogleError
): boolean {
  if (
    error.code &&
    (RETRYABLE_STATUS_CODES.has(error.code) || isRstStreamError(error))
  ) {
    console.log('retry true');
    return true;
  }
  console.log('retry false');
  return false;
};

export function retryOptions(gaxOpts: CallOptions) {
  const backoffSettings =
    gaxOpts?.retry?.backoffSettings || DEFAULT_BACKOFF_SETTINGS;
  return new RetryOptions([], backoffSettings, createReadStreamShouldRetryFn);
}
