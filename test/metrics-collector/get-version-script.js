const path = require('path');
const fs = require('fs');
const {
  ClientSideMetricsConfigManager,
} = require('../../build/src/client-side-metrics/metrics-config-manager.js');
const {
  TestMetricsHandlerKeepName,
} = require('../../build/test-common/test-metrics-handler.js');
const {Bigtable} = require('../../build/src/index.js');

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
    await table.getRows();
  } catch (e) {
    // Suppress the error.
    // We just made this call so that the test metrics handler would
    // collect grpc response data.
  }
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
