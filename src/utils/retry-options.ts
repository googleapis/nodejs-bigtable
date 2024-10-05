// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {BackoffSettings} from 'google-gax/build/src/gax';
import {GoogleError, grpc, ServiceError} from 'google-gax';

export const RETRYABLE_STATUS_CODES = new Set([
  grpc.status.DEADLINE_EXCEEDED.valueOf(),
  grpc.status.ABORTED.valueOf(),
  grpc.status.UNAVAILABLE.valueOf(),
]);
export const DEFAULT_BACKOFF_SETTINGS: BackoffSettings = {
  initialRetryDelayMillis: 10,
  retryDelayMultiplier: 2,
  maxRetryDelayMillis: 60000,
};
export const DEFAULT_RETRY_COUNT = 10;
export const isRstStreamError = (
  error: GoogleError | ServiceError
): boolean => {
  // Retry on "received rst stream" errors
  if (error.code === grpc.status.INTERNAL && error.message) {
    const error_message = (error.message || '').toLowerCase();
    return (
      error.code === grpc.status.INTERNAL &&
      (error_message.includes('rst_stream') ||
        error_message.includes('rst stream') ||
        error_message.includes(
          'Received unexpected EOS on DATA frame from server'
        ))
    );
  }
  return false;
};
