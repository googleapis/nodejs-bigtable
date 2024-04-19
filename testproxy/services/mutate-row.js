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

const normalizeCallback = require('./utils/normalize-callback.js');

const v2 = Symbol.for('v2');

const mutateRow = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {request} = rawRequest;
    const {request: mutateRequest} = request;
    const {appProfileId, mutations, tableName, rowKey} = mutateRequest;

    const {clientId} = request;
    const client = clientMap.get(clientId)[v2];
    await client.mutateRow({
      appProfileId,
      mutations,
      tableName,
      rowKey,
    });

    return {
      status: {code: grpc.status.OK, details: []},
    };
  });

module.exports = mutateRow;
