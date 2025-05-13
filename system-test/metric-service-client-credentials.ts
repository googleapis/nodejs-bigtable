import * as proxyquire from 'proxyquire';
import {ClientOptions} from 'google-gax';
import * as assert from 'assert';
import {setupBigtable} from './client-side-metrics-setup-table';

describe.only('Bigtable/MetricServiceClientCredentials', () => {
  it('should pass the credentials to the metric service client', done => {
    const clientOptions = {};
    class FakeExporter {
      constructor(options: ClientOptions) {
        try {
          assert.strictEqual(bigtable.options, options);
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
    const FakeMetricsConfigManager = proxyquire(
      '../src/client-side-metrics/metrics-config-manager.js',
      {
        './gcp-metrics-handler': {
          GCPMetricsHandler: FakeCGPMetricsHandler,
        },
      },
    ).ClientSideMetricsConfigManager;
    const FakeOperationMetricsCollector = proxyquire(
      '../src/client-side-metrics/operation-metrics-collector.js',
      {
        './metrics-config-manager': {
          ClientSideMetricsConfigManager: FakeMetricsConfigManager,
        },
      },
    ).OperationMetricsCollector;
    const FakeFactory = proxyquire(
      '../src/client-side-metrics/operation-metrics-collector-factory.js',
      {
        './operation-metrics-collector': {
          OperationMetricsCollector: FakeOperationMetricsCollector,
        },
      },
    ).OperationMetricsCollectorFactory;
    const FakeTabularApiSurface = proxyquire('../src/tabular-api-surface.js', {
      './client-side-metrics/operation-metrics-collector-factory': {
        OperationMetricsCollectorFactory: FakeFactory,
      },
    }).TabularApiSurface;
    const FakeTable = proxyquire('../src/table.js', {
      './tabular-api-surface': {TabularApiSurface: FakeTabularApiSurface},
    }).Table;
    const FakeInstance = proxyquire('../src/instance.js', {
      './table': {Table: FakeTable},
    }).Instance;
    const FakeBigtable = proxyquire('../src/index.js', {
      './instance': {Instance: FakeInstance},
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
