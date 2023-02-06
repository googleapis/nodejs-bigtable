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
        entry: [],
      };
    } catch (error) {
      if (error.name === 'PartialFailureError') {
        const entries = Array.from(error.errors.entries()).map(
          ([index, entry]) => {
            // We add one to index because for partial failures, the
            // client expects an index starting at 1 in the error
            // results.
            return {index: index + 1, status: entry};
          }
        );
        return {
          status: {code: grpc.status.OK, message: error.message},
          entry: entries,
        };
      } else {
        return {
          status: error,
          entry: [],
        };
      }
    }
  });

module.exports = bulkMutateRows;
