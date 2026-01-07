// Copyright 2026 Google LLC
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

const path = require('path');
const fs = require('fs');
const {
  ClientSideMetricsConfigManager,
} = require('../../build/src/client-side-metrics/metrics-config-manager.js'); // eslint-disable-line
const {
  TestMetricsHandlerKeepName,
} = require('../../build/test-common/test-metrics-handler.js'); // eslint-disable-line
const {Bigtable} = require('../../build/src/index.js'); // eslint-disable-line

async function main() {
  const packagePath = path.join(__dirname, '../../package.json');

  // Read the file using the absolute path
  const packageJSON = fs.readFileSync(packagePath);
  const expectedVersion = JSON.parse(packageJSON.toString()).version;

  const fakeBigtable = new Bigtable();
  const testMetricsHandler = new TestMetricsHandlerKeepName();
  fakeBigtable._metricsConfigManager = new ClientSideMetricsConfigManager([
    testMetricsHandler,
  ]);

  const instance = fakeBigtable.instance('fake-instance-id');
  const table = instance.table('fake-table-id');
  try {
    console.log('entered getRows');
    await table.getRows();
  } catch (e) {
    // Suppress the error.
    // We just made this call so that the test metrics handler would
    // collect grpc response data.
  }
  console.log(`requests handled length: ${testMetricsHandler.length}`);
  if (
    testMetricsHandler.requestsHandled[0].client_name !==
    `nodejs-bigtable/${expectedVersion}`
  ) {
    console.log('Actual:');
    console.log(testMetricsHandler.requestsHandled[0].client_name);
    console.log('Expected:');
    console.log(`nodejs-bigtable/${expectedVersion}`);
    throw Error('The wrong version is being recorded');
  }
}
main();
