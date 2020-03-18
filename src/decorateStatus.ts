/*!
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as extend from 'extend';
import {google} from '../protos/protos';

/**
 * @const {object} - A map of protobuf codes to HTTP status codes.
 * @private
 */
const GRPC_ERROR_CODE_TO_HTTP = [
  {code: 200, message: 'OK'},
  {code: 499, message: 'Client Closed Request'},
  {code: 500, message: 'Internal Server Error'},
  {code: 400, message: 'Bad Request'},
  {code: 504, message: 'Gateway Timeout'},
  {code: 404, message: 'Not Found'},
  {code: 409, message: 'Conflict'},
  {code: 403, message: 'Forbidden'},
  {code: 429, message: 'Too Many Requests'},
  {code: 412, message: 'Precondition Failed'},
  {code: 409, message: 'Conflict'},
  {code: 400, message: 'Bad Request'},
  {code: 501, message: 'Not Implemented'},
  {code: 500, message: 'Internal Server Error'},
  {code: 503, message: 'Service Unavailable'},
  {code: 500, message: 'Internal Server Error'},
  {code: 401, message: 'Unauthorized'},
];

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
  if (response && GRPC_ERROR_CODE_TO_HTTP[response.code!]) {
    const defaultResponseDetails = GRPC_ERROR_CODE_TO_HTTP[response.code!];
    let message = defaultResponseDetails.message;
    if (response.message) {
      // gRPC error messages can be either stringified JSON or strings.
      try {
        message = JSON.parse(response.message).description;
      } catch (e) {
        message = response.message;
      }
    }
    return extend(true, obj, response, {
      code: defaultResponseDetails.code,
      message,
    });
  }
  return null;
}

export function shouldRetryRequest(r: {code: number}) {
  return [429, 500, 502, 503].includes(r.code);
}
