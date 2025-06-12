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

const bulkMutateRows = require('./bulk-mutate-rows.js');
const checkAndMutateRow = require('./check-and-mutate-row.js');
const ClientMap = require('./utils/client-map.js');
const closeClient = require('./close-client.js');
const createClient = require('./create-client.js');
const mutateRow = require('./mutate-row.js');
const readModifyWriteRow = require('./read-modify-write-row.js');
const readRow = require('./read-row.js');
const readRows = require('./read-rows.js');
const removeClient = require('./remove-client.js');
const sampleRowKeys = require('./sample-row-keys.js');
const executeQuery = require('./execute-query.js');

/*
 * Starts the client pool map and retrieves the object that
 * lists all methods to be passed to grpc.Server.addService.
 *
 * ref: https://grpc.github.io/grpc/node/grpc.Server.html#addService__anchor
 */
function getServicesImplementation() {
  const clientMap = new ClientMap();

  return {
    bulkMutateRows: bulkMutateRows({clientMap}),
    checkAndMutateRow: checkAndMutateRow({clientMap}),
    createClient: createClient({clientMap}),
    closeClient: closeClient({clientMap}),
    mutateRow: mutateRow({clientMap}),
    readModifyWriteRow: readModifyWriteRow({clientMap}),
    readRow: readRow({clientMap}),
    readRows: readRows({clientMap}),
    removeClient: removeClient({clientMap}),
    sampleRowKeys: sampleRowKeys({clientMap}),
    executeQuery: executeQuery({clientMap}),
  };
}

module.exports = {
  getServicesImplementation,
};
