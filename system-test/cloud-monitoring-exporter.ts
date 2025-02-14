import {describe} from 'mocha';
import {CloudMonitoringExporter} from '../src/client-side-metrics/exporter';
import {exportInput} from '../test-common/export-input-fixture';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {Bigtable} from '../src';

describe('Bigtable/CloudMonitoringExporter', () => {
  it('exports client side metrics to cloud monitoring', done => {
    // When this test is run, metrics should be visible at the following link:
    // https://pantheon.corp.google.com/monitoring/metrics-explorer;duration=PT1H?inv=1&invt=Abo9_A&project={projectId}
    // This test will add metrics so that they are available in Pantheon
    (async () => {
      const bigtable = new Bigtable();
      const projectId: string = await new Promise((resolve, reject) => {
        bigtable.getProjectId_((err, projectId) => {
          if (err) {
            reject(err);
          } else {
            resolve(projectId as string);
          }
        });
      });
      const transformedExportInput = JSON.parse(
        JSON.stringify(exportInput).replace(/some-project/g, projectId)
      );
      const exporter = new CloudMonitoringExporter();
      exporter.export(
        transformedExportInput as unknown as ResourceMetrics,
        (result: {code: number}) => {
          if (result.code === 0) {
            done();
          } else {
            done(result.code);
          }
        }
      );
    })();
  });
});
