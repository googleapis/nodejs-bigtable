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
const getRowResponse = require('./utils/get-row-response.js');
const getTableInfo = require('./utils/get-table-info.js');

const readRow = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {clientId, columns = {}, rowKey, tableName} = rawRequest.request;

    const bigtable = clientMap.get(clientId);
    const table = getTableInfo(bigtable, tableName);
    const row = table.row(rowKey);
    const res = await row.get(columns);
    const firstRow = getRowResponse(res[0]);

    return {
      status: {code: grpc.status.OK, details: []},
      row: firstRow,
    };
  });

module.exports = readRow;
