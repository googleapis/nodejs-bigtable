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
const getTableInfo = require('./utils/get-table-info');

const bulkMutateRows = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {request} = rawRequest;
    const {request: mutateRequest} = request;
    const {entries, tableName} = mutateRequest;

    const {clientId} = request;
    const bigtable = clientMap.get(clientId);
    const table = getTableInfo(bigtable, tableName);
    try {
      const mutateOptions = {
        rawMutation: true,
      };
      await table.mutate(entries, mutateOptions);
      return {
        status: {code: grpc.status.OK, details: []},
        entries: [],
      };
    } catch (error) {
      if (error.name === 'PartialFailureError') {
        return {
          status: error,
          entries: Array.from(error.errors.entries()).map(([index, entry]) => ({
            index: index + 1,
            status: entry,
          })),
        };
      } else {
        return {
          status: error,
          entries: [],
        };
      }
    }
  });

module.exports = bulkMutateRows;
