import {PassThrough, Readable, TransformOptions} from 'stream';
import * as assert from 'assert';
// import {TimedStreamWithEvents as TimedStream} from '../src/timed-stream-new';

class TimedStream extends PassThrough {
  private startTime;
  private totalDuration;
  constructor(options?: TransformOptions) {
    // highWaterMark of 1 is needed to respond to each row
    super({...options, objectMode: true, highWaterMark: 0});
    this.startTime = 0n;
    this.totalDuration = 0n;
    this.handleBeforeRow = this.handleBeforeRow.bind(this);
    this.handleAfterRow = this.handleAfterRow.bind(this);
    this.on('before_row', this.handleBeforeRow);
    this.on('after_row', this.handleAfterRow);
  }

  _transform(chunk: any, encoding: any, callback: any) {
    console.log('run transform');
    // calculate the time spent in the callback (i.e. on("data") handlers)
    this.handleBeforeRow();
    callback(null, chunk);
    this.handleAfterRow();
  }

  read(size: number) {
    console.log('run read');
    // calculate the time spent between iterations of read (i.e. processing the stream in a for loop)
    const chunk = super.read(size);
    if (chunk) {
      this.emit('before_row');
      // Defer the after call to the next tick of the event loop
      process.nextTick(() => {
        this.emit('after_row');
      });
    }
    return chunk;
  }

  handleBeforeRow() {
    console.log('handleBeforeRow');
    this.startTime = process.hrtime.bigint();
  }

  handleAfterRow() {
    console.log('handleAfterRow');
    const endTime = process.hrtime.bigint();
    const duration = endTime - this.startTime;
    this.totalDuration += duration;
    this.startTime = process.hrtime.bigint();
  }

  getTotalDurationMs() {
    return Number(this.totalDuration / 1_000_000n);
  }
}

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
