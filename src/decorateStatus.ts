// Copyright 2019 Google LLC
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

import * as extend from 'extend';
import {google} from '../protos/protos';

export type DecoratedStatus = google.rpc.IStatus & {
  code: number;
  message: string;
};

/**
 * Checks for a grpc status code and extends the supplied object with
 * additional information.
 *
 * @param {object} obj - The object to be extended.
 * @param {object} response - The grpc response.
 * @return {object|null}
 */
export function decorateStatus(
  response?: google.rpc.IStatus | null
): DecoratedStatus | null {
  const obj = {};
  if (response && response.code) {
    let message = '';
    if (response.message) {
      // gRPC error messages can be either stringified JSON or strings.
      try {
        message = JSON.parse(response.message).description;
      } catch (e) {
        message = response.message;
      }
    }
    return extend(true, obj, response, {
      code: response.code,
      message,
    });
  }
  return null;
}

export function shouldRetryRequest(r: {code: number}) {
  return [429, 500, 502, 503].includes(r.code);
}
