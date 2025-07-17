import {PassThrough, Readable, TransformOptions} from 'stream';
import * as assert from 'assert';
import {TimedStream} from '../src/timed-stream-separated';

// set up streams
function* numberGenerator(n: number) {
  for (let i = 0; i < n; i++) {
    yield String(i) + '\n';
  }
}

describe('while iterating through a stream loop', () => {
  describe('with no delay from server', () => {
    it('should measure the total time accurately for a series of 30 rows', async function () {
      this.timeout(200000);
      const sourceStream = Readable.from(numberGenerator(30));
      const timedStream = new TimedStream({});
      // @ts-ignore
      sourceStream.pipe(timedStream as unknown as WritableStream);
      // iterate stream
      for await (const chunk of timedStream as unknown as PassThrough) {
        process.stdout.write(chunk.toString());
        // Simulate 1 second of busy work
        const startTime = Date.now();
        console.log(`Before while: ${chunk.toString()}`);
        while (Date.now() - startTime < 1000) {
          /* empty */
        }
        console.log(`After while: ${chunk.toString()}`);
      }
      const totalMilliseconds = timedStream.getTotalDurationMs();
      assert(totalMilliseconds > 29000);
      assert(totalMilliseconds < 31000);
    });
  });
});
