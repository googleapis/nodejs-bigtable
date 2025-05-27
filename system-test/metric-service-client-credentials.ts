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

import * as proxyquire from 'proxyquire';
import {ClientOptions} from 'google-gax';
import * as assert from 'assert';
import {setupBigtable} from './client-side-metrics-setup-table';

describe.only('Bigtable/MetricServiceClientCredentials', () => {
  it('should pass the credentials to the metric service client', done => {
    const clientOptions = {metricsEnabled: true};
    class FakeExporter {
      constructor(options: ClientOptions) {
        try {
          assert.strictEqual(options, clientOptions);
          done();
        } catch (e) {
          done(e);
        }
      }
    }
    const FakeCGPMetricsHandler = proxyquire(
      '../src/client-side-metrics/gcp-metrics-handler.js',
      {
        './exporter': {
          CloudMonitoringExporter: FakeExporter,
        },
      },
    ).GCPMetricsHandler;
    const FakeBigtable = proxyquire('../src/index.js', {
      './client-side-metrics/gcp-metrics-handler': {
        GCPMetricsHandler: FakeCGPMetricsHandler,
      },
    }).Bigtable;
    const bigtable = new FakeBigtable(clientOptions);
    const instanceId = 'emulator-test-instance';
    const columnFamilyId = 'cf1';
    const tableId1 = 'my-table';
    (async () => {
      try {
        await setupBigtable(bigtable, columnFamilyId, instanceId, [tableId1]);
        const instance = bigtable.instance(instanceId);
        const table = instance.table(tableId1);
        await table.getRows();
      } catch (e) {
        done(e);
      }
    })().catch(err => {
      throw err;
    });
  });
});
