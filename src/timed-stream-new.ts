import {TransformOptions} from 'stream';

const {PassThrough, Readable} = require('stream');

export class TimedStream extends PassThrough {
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
    // calculate the time spent in the callback (i.e. on("data") handlers)
    this.handleBeforeRow();
    callback(null, chunk);
    this.handleAfterRow();
  }

  read(size: number) {
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
    console.log(`[START TIMER]`);
    this.startTime = process.hrtime.bigint();
  }

  handleAfterRow() {
    const endTime = process.hrtime.bigint();
    const duration = endTime - this.startTime;
    this.totalDuration += duration;
    this.startTime = process.hrtime.bigint();
    console.log(
      `[END TIMER] - Added ${duration / 1_000_000n} ms to processing time.`,
    );
  }

  getTotalDurationMs() {
    return Number(this.totalDuration / 1_000_000n);
  }
}
