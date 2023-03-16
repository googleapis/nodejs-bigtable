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

const normalizeCallback = require('./utils/normalize-callback.js');

const grpc = require('@grpc/grpc-js');
const {Bigtable} = require('../../build/src/index.js');
const {BigtableClient} = require('../../build/src/index.js').v2;

const v2 = Symbol.for('v2');

const createClient = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    // TODO: Handle refresh periods
    const {request} = rawRequest;
    const {
      callCredential,
      clientId,
      projectId,
      instanceId,
      dataTarget: apiEndpoint,
      appProfileId,
    } = request;

    if (!(clientId && projectId && instanceId && apiEndpoint)) {
      throw Object.assign(
        new Error(
          'clientId, projectId, instanceId, and apiEndpoint must be provided.'
        ),
        {code: grpc.status.INVALID_ARGUMENT}
      );
    }

    if (clientMap.has(clientId)) {
      throw Object.assign(new Error(`Client ${clientId} already exists`), {
        code: grpc.status.ALREADY_EXISTS,
      });
    }

    // TODO: Implement support to SSL connection
    let authClient;
    if (callCredential && callCredential.jsonServiceAccount) {
      authClient = JSON.parse(request.callCredential.jsonServiceAccount);
    }
    const bigtable = new Bigtable({
      projectId,
      apiEndpoint,
      authClient,
      appProfileId,
      clientConfig: require('../../src/v2/bigtable_client_config.json'),
    });
    bigtable[v2] = new BigtableClient(bigtable.options.BigtableClient);
    clientMap.set(clientId, bigtable);
  });

module.exports = createClient;
