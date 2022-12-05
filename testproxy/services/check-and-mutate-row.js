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
const {BigtableClient} = require('../../build/src/index.js').v2;

const normalizeCallback = require('./utils/normalize-callback.js');

const checkAndMutateRow = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {request} = rawRequest;
    const {request: checkAndMutateRequest} = request;
    const {appProfileId, falseMutations, rowKey, tableName, trueMutations} =
      checkAndMutateRequest;

    const {clientId} = request;
    const bigtable = clientMap.get(clientId);
    const client = new BigtableClient(bigtable.options.BigtableClient);
    const [result] = await client.checkAndMutateRow({
      appProfileId,
      falseMutations,
      rowKey,
      tableName,
      trueMutations,
    });

    return {
      status: {code: grpc.status.OK, details: []},
      result,
    };
  });

module.exports = checkAndMutateRow;
