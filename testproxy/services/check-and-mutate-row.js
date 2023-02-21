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

const checkAndMutateRow = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {request} = rawRequest;
    const {request: checkAndMutateRequest} = request;
    // TODO: Add appProfileId and predicateFilter
    // TODO: Invert createFlatMutationsList
    const {falseMutations, rowKey, tableName, trueMutations} =
      checkAndMutateRequest;

    const {clientId} = request;
    const bigtable = clientMap.get(clientId);
    const table = getTableInfo(bigtable, tableName);
    const row = table.row(rowKey);
    const filter = []; // TODO: This needs to change to an inversion of predicate_filter
    const config = {
      onMatch: trueMutations, // TODO: Needs to be inverted
      onNoMatch: falseMutations, // TODO: Needs to be inverted
    };
    // TODO: It looks like the results are passed into the third argument of the callback
    // TODO: Tests will guide us to rewrite the proxy to parse results of this call correctly
    // TODO: Set {predicateMatched: result.matched}
    const result = await row.filter(filter, config);
    return {
      status: {code: grpc.status.OK, details: []},
      result,
    };
  });

module.exports = checkAndMutateRow;
