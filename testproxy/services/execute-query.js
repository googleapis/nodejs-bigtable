// Copyright 2025 Google LLC
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
const {
  parseMetadata,
  parseRows,
  parseParameters,
} = require('../../build/testproxy/services/utils/request/createExecuteQueryResponse.js');
const normalizeCallback = require('./utils/normalize-callback.js');

const executeQuery = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {request, clientId} = rawRequest.request;

    const {instanceName} = request;
    const bigtable = clientMap.get(clientId);
    const instance = bigtable.instance(instanceName);

    try {
      const [parameters, parameterTypes] = await parseParameters(
        request.params,
      );
      const [preparedStatement] = await instance.prepareStatement({
        query: request.query,
        parameterTypes: parameterTypes,
      });
      const [rows] = await instance.executeQuery({
        preparedStatement,
        parameters: parameters,
        retryOptions: {},
      });

      const parsedMetadata = await parseMetadata(preparedStatement);
      const parsedRows = await parseRows(preparedStatement, rows);
      return {
        status: {code: grpc.status.OK, details: []},
        rows: parsedRows,
        metadata: {columns: parsedMetadata},
      };
    } catch (e) {
      return {
        status: {
          code: e.code || grpc.status.INTERNAL,
          details: [], // e.details must be in an empty array for the test runner to return the status. This is tracked in https://b.corp.google.com/issues/383096533.
          message: e.message,
        },
      };
    }
  });

module.exports = executeQuery;
