// Copyright 2022 Google LLC
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
'use strict';

const grpc = require('@grpc/grpc-js');

class ClientMap extends Map {
  // TODO: we might need to implement a way to lock
  // currently used client instances here
  get(key) {
    if (!key) {
      const err = {
        code: grpc.status.INVALID_ARGUMENT,
        details: 'Client id is not defined.',
      };
      throw Object.assign(new Error(err.details), err);
    }

    const res = super.get(key);
    if (!res) {
      const err = {
        code: grpc.status.NOT_FOUND,
        details: `Client ${key} not found.`,
      };
      throw Object.assign(new Error(err.details), err);
    }

    return res;
  }
}

module.exports = ClientMap;
