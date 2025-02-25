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

import {describe} from 'mocha';
import {
  CloudMonitoringExporter,
  ExportResult,
} from '../src/client-side-metrics/exporter';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {Bigtable} from '../src';
import * as assert from 'assert';
import {expectedOtelExportInput} from '../test-common/expected-otel-export-input';
import {addFakeRecentTimestamps} from '../test-common/replace-timestamps';

describe.only('Bigtable/CloudMonitoringExporter', () => {
  it('Should send an otel exported value to the CloudMonitoringExporter', done => {
    // TODO: In this test make sure the start time and end time are increasing?
    const fakeStartTime = Math.floor(Date.now() / 1000) - 2000;
    const fakeEndTime = fakeStartTime + 1000;
    // When this test is run, metrics should be visible at the following link:
    // https://pantheon.corp.google.com/monitoring/metrics-explorer;duration=PT1H?inv=1&invt=Abo9_A&project={projectId}
    // This test will add metrics so that they are available in Pantheon
    (async () => {
      const resultCallback: (result: ExportResult) => void = (
        result: ExportResult
      ) => {
        try {
          assert.strictEqual(result.code, 0);
          done();
        } catch (error) {
          // Code isn't 0 so report the original error.
          done(result);
          done(error);
        }
      };
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
        JSON.stringify(expectedOtelExportInput).replace(
          /my-project/g,
          projectId
        )
      );
      addFakeRecentTimestamps(
        transformedExportInput as unknown as typeof expectedOtelExportInput
      );
      const exporter = new CloudMonitoringExporter();
      exporter.export(
        transformedExportInput as unknown as ResourceMetrics,
        resultCallback
      );
    })();
  });
});
