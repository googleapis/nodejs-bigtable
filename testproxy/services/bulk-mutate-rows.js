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

const bulkMutateRows = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {request} = rawRequest;
    const {request: mutateRequest} = request;
    const {appProfileId, entries, tableName} = mutateRequest;

    const {clientId} = request;
    const bigtable = clientMap.get(clientId);
    const client = new BigtableClient(bigtable.options.BigtableClient);
    const result = await new Promise((res, rej) => {
      const response = {entries: []};
      client
        .mutateRows({
          appProfileId,
          entries,
          tableName,
        })
        .on('data', data => {
          response.entries = [...data.entries];
        })
        .on('error', rej)
        .on('end', () => res(response));
    });

    return {
      status: {code: grpc.status.OK, details: []},
      entry: result.entries,
    };
  });

module.exports = bulkMutateRows;
