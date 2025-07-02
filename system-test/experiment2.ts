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

import {describe, it} from 'mocha';
import {Bigtable} from '../src';

describe.only('Bigtable/ClientSideMetrics', () => {
  const bigtable = new Bigtable();
  const instanceId = 'large-table-instance-id';
  const tableId = 'large-table';

  describe('Bigtable/QPSExperiment', () => {
    console.log('Test watermark 0');
    const elapsedTimes: any[] = [];
    for (let k = 0; k < 10; k++) {
      it(`readRows call ${k}`, done => {
        (async () => {
          try {
            const instance = bigtable.instance(instanceId);
            const table = instance.table(tableId);
            const hundredValues = [];
            // Get the starting time (in milliseconds since the Unix epoch)
            const startTime = Date.now();
            for (let j = 0; j < 10; j++) {
              for (let i = 0; i < 1000; i++) {
                hundredValues.push(i);
              }
              const promises = hundredValues.map(i =>
                table.getRows({limit: 100}),
              );
              console.log(new Date());
              console.log('running 100 readRows calls');
              await Promise.all(promises);
              console.log('complete');
            }
            // Get the ending time
            const endTime = Date.now();
            // Calculate the elapsed time in milliseconds
            const elapsedTime = endTime - startTime;
            elapsedTimes.push(elapsedTime);
            console.log(`Elapsed time: ${elapsedTime}`);
            console.log(elapsedTimes);
            done();
          } catch (e) {
            done(new Error('An error occurred while running the script'));
            done(e);
          }
        })();
      });
    }
  });
});
