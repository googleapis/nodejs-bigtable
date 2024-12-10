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
const {
  createFlatMutationsListWithFnInverse,
} = require('../../build/testproxy/services/utils/request/createFlatMutationsList');
const {
  mutationParseInverse,
} = require('../../build/testproxy/services/utils/request/mutateInverse');

function handwrittenLayerMutations(gapicLayerMutations) {
  return createFlatMutationsListWithFnInverse(
    [
      {
        mutations: gapicLayerMutations,
      },
    ],
    mutationParseInverse,
    1
  );
}

/**
 * Converts a byte array (or string) back to a string.  This is the inverse of
 * Mutation.convertToBytes.
 *
 * @param {Bytes} bytes The byte array or string to convert.
 * @returns {string} The converted string.
 */
function convertFromBytes(bytes) {
  if (bytes instanceof Buffer) {
    return bytes.toString();
  } else if (typeof bytes === 'string') {
    return bytes;
  } else {
    throw new Error('Invalid input type. Must be Buffer or string.');
  }
}

const checkAndMutateRow = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {request} = rawRequest;
    const {clientId, request: checkAndMutateRowRequest} = request;
    const {
      // authorizedViewName, // TODO: Pass the authorizedViewName along in the test proxy.
      appProfileId,
      falseMutations,
      rowKey,
      // predicateFilter, // TODO: Pass the predicateFilter along in the test proxy.
      tableName,
      trueMutations,
    } = checkAndMutateRowRequest;
    const onMatch = handwrittenLayerMutations(trueMutations);
    const onNoMatch = handwrittenLayerMutations(falseMutations);
    const id = convertFromBytes(rowKey);
    const bigtable = clientMap.get(clientId);
    bigtable.appProfileId = appProfileId; // TODO: Remove this line and pass appProfileId into the client.
    const table = getTableInfo(bigtable, tableName);
    const row = table.row(id);
    const filter = [];
    const filterConfig = {onMatch, onNoMatch};
    try {
      const result = await row.filter(filter, filterConfig);
      return {
        status: {code: grpc.status.OK, details: []},
        row: result,
      };
    } catch (e) {
      return {
        status: {
          code: e.code,
          details: [],
          message: e.message,
        },
      };
    }
  });

module.exports = checkAndMutateRow;
