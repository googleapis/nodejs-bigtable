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

const getRowsOptions = readRowsRequest => {
  const getRowsRequest = {};

  if (readRowsRequest.rows) {
    const {rowRanges} = readRowsRequest.rows;
    if (rowRanges) {
      getRowsRequest.ranges = rowRanges.map(
        ({startKeyClosed, endKeyClosed}) => ({
          start: {inclusive: true, value: String(startKeyClosed)},
          end: {inclusive: true, value: String(endKeyClosed)},
        })
      );
    }

    const {rowKeys} = readRowsRequest.rows;
    if (rowKeys) {
      getRowsRequest.keys = rowKeys.map(String);
    }
  }

  const {rowsLimit} = readRowsRequest;
  if (rowsLimit && rowsLimit !== '0') {
    getRowsRequest.limit = parseInt(rowsLimit, 10);
  }
  return getRowsRequest;
};

const getReadRowsRequest = request => {
  const readRowsRequest = request ? request.request : undefined;
  if (!readRowsRequest || !readRowsRequest.tableName) {
    throw Object.assign(new Error('table_name must be provided in request.'), {
      code: grpc.status.INVALID_ARGUMENT,
    });
  }
  return readRowsRequest;
};

const readRows = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const request = rawRequest.request;
    const {clientId} = request;
    const readRowsRequest = getReadRowsRequest(request);
    const {tableName} = readRowsRequest;
    const bigtable = clientMap.get(clientId);
    const table = getTableInfo(bigtable, tableName);
    const rowsOptions = getRowsOptions(readRowsRequest);
    try {
      const [rows] = await table.getRows(rowsOptions);
      return {
        status: {code: grpc.status.OK, details: []},
        rows: rows.map(getRowResponse),
      };
    } catch (e) {
      return {status: e};
    }
  });

module.exports = readRows;
