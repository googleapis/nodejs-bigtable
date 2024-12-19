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
const {
  getRMWRRequestInverse,
} = require('../../build/testproxy/services/utils/request/readModifyWriteRow.js');
const getTableInfo = require('./utils/get-table-info');

const readModifyWriteRow = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {request} = rawRequest;
    const {clientId, request: readModifyWriteRow} = request;
    const {appProfileId, tableName} = readModifyWriteRow;
    const handWrittenRequest = getRMWRRequestInverse(readModifyWriteRow);
    const bigtable = clientMap.get(clientId);
    if (appProfileId && appProfileId !== '') {
      bigtable.appProfileId = appProfileId;
    }
    const table = getTableInfo(bigtable, tableName);
    const row = table.row(handWrittenRequest.id);
    try {
      const [result] = await row.createRules(handWrittenRequest.rules);
      return {
        status: {code: grpc.status.OK, details: []},
        row: result.row,
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

module.exports = readModifyWriteRow;
