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
import {
  fakeEndTime,
  fakeStartTime,
} from '../test-common/expected-otel-export-input';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {Bigtable} from '../src';
import * as assert from 'assert';
import {expectedOtelExportInput} from '../test-common/expected-otel-export-input';
import {replaceTimestamps} from '../test-common/replace-timestamps';

describe('Bigtable/CloudMonitoringExporter', () => {
  it('Should send an otel exported value to the CloudMonitoringExporter', done => {
    // When this test is run, metrics should be visible at the following link:
    // https://pantheon.corp.google.com/monitoring/metrics-explorer;duration=PT1H?inv=1&invt=Abo9_A&project={projectId}
    // This test will add metrics so that they are available in Pantheon
    (async () => {
      const resultCallback: (result: ExportResult) => void = (
        result: ExportResult
      ) => {
        try {
          assert.deepStrictEqual(result, {code: 0});
          done();
        } catch (error) {
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
      replaceTimestamps(
        transformedExportInput as unknown as typeof expectedOtelExportInput,
        [fakeStartTime, 0],
        [fakeEndTime, 0]
      );
      const exporter = new CloudMonitoringExporter();
      exporter.export(
        transformedExportInput as unknown as ResourceMetrics,
        resultCallback
      );
    })();
  });
});
