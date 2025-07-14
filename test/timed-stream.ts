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
import {PassThrough, Readable} from 'stream';
import {TimedStream} from '../src/timed-stream';
import * as assert from 'assert';

// set up streams
function* numberGenerator(n: number) {
  for (let i = 0; i < n; i++) {
    yield String(i) + '\n';
  }
}

describe('Bigtable/TimedStream', () => {
  describe('with handlers', () => {
    describe('with no delay from server', () => {
      it('should measure the total time accurately for a series of 30 rows', function (done) {
        this.timeout(200000);
        const sourceStream = Readable.from(numberGenerator(30));
        const timedStream = new TimedStream({});
        // @ts-ignore
        sourceStream.pipe(timedStream as unknown as WritableStream);
        setTimeout(async () => {
          // iterate stream
          timedStream.on('data', async (chunk: any) => {
            process.stdout.write(chunk.toString());
            // Simulate 1 second of busy work
            const startTime = Date.now();
            while (Date.now() - startTime < 1000) {
              /* empty */
            }
          });
          timedStream.on('end', () => {
            const totalMilliseconds = timedStream.getTotalDurationMs();
            try {
              assert(totalMilliseconds > 29000);
              assert(totalMilliseconds < 31000);
              // TODO: Add check for 30 BEFORE events. I only see a couple
              done();
            } catch (e) {
              done(e);
            }
          });
        }, 500);
      });
    });
    describe('with delay from server', () => {
      it.skip('should measure the total time accurately for a series of 10 rows', done => {
        const dataEvents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
          i.toString(),
        );
        const sourceStream = new PassThrough();
        const timedStream = new TimedStream({});
        // @ts-ignore
        sourceStream.pipe(timedStream);

        setTimeout(async () => {
          // iterate stream
          timedStream.on('data', async (chunk: any) => {
            process.stdout.write(chunk.toString());
            // Simulate 1 second of busy work
            const startTime = Date.now();
            while (Date.now() - startTime < 1000) {
              /* empty */
            }
          });
          timedStream.on('end', () => {
            // print results
            try {
              const totalMilliseconds = timedStream.getTotalDurationMs();
              console.log(totalMilliseconds);
              // totalMilliseconds should be around 10 seconds, 1 per row
              assert(totalMilliseconds > 9000);
              assert(totalMilliseconds < 11000);
              done();
            } catch (e) {
              done(e);
            }
          });
        }, 500);

        setInterval(() => {
          if (dataEvents.length > 0) {
            const dataEvent = dataEvents.shift();
            sourceStream.write(dataEvent);
          } else {
            sourceStream.emit('end');
          }
        }, 5000);
      });
    });
  });
});
