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

const {dirname, resolve} = require('node:path');

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const services = require('./services/index.js');

const GAX_PROTOS_DIR = resolve(
  dirname(require.resolve('google-gax')),
  '../protos'
);
const PROTOS_DIR = resolve(__dirname, '../protos');
const PROTO_PATH = resolve(PROTOS_DIR, 'test_proxy.proto');
const port = parseInt(process.env.PORT, 10) || 9999;

async function loadDescriptor() {
  const packageDefinition = await protoLoader.load(PROTO_PATH, {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [PROTOS_DIR, GAX_PROTOS_DIR],
  });
  return grpc.loadPackageDefinition(packageDefinition);
}

function startServer(service) {
  const server = new grpc.Server();
  server.addService(service, services.getServicesImplementation());

  return server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`grpc server started on port: ${port}`);
      server.start();
    }
  );
}

async function main() {
  const descriptor = await loadDescriptor();
  const {service} =
    descriptor.google.bigtable.testproxy.CloudBigtableV2TestProxy;
  await startServer(service);
}

main();
