import {PassThrough, TransformOptions} from 'stream';

export class TimedStream extends PassThrough {
  private startTimeRead;
  private startTimeTransform;
  private totalDurationRead;
  private totalDurationTransform;
  constructor(options?: TransformOptions) {
    // highWaterMark of 1 is needed to respond to each row
    super({...options, objectMode: true, highWaterMark: 0});
    this.startTimeRead = 0n;
    this.startTimeTransform = 0n;
    this.totalDurationRead = 0n;
    this.totalDurationTransform = 0n;
    this.handleBeforeRowRead = this.handleBeforeRowRead.bind(this);
    this.handleAfterRowRead = this.handleAfterRowRead.bind(this);
    this.on('before_row', this.handleBeforeRowRead);
    this.on('after_row', this.handleAfterRowRead);
  }

  _transform(chunk: any, encoding: any, callback: any) {
    console.log('_transform');
    // calculate the time spent in the callback (i.e. on("data") handlers)
    this.handleBeforeRowTransform();
    callback(null, chunk);
    this.handleAfterRowTransform();
  }

  read(size: number) {
    console.log('read row');
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

  handleBeforeRowRead() {
    console.log('handleBeforeRowRead');
    this.startTimeRead = process.hrtime.bigint();
  }

  handleAfterRowRead() {
    console.log('handleAfterRowRead');
    const endTime = process.hrtime.bigint();
    const duration = endTime - this.startTimeRead;
    this.totalDurationRead += duration;
    // this.startTimeRead = process.hrtime.bigint();
  }

  handleBeforeRowTransform() {
    console.log('handleBeforeRowTransform');
    this.startTimeTransform = process.hrtime.bigint();
  }

  handleAfterRowTransform() {
    console.log('handleAfterRowTransform');
    const endTime = process.hrtime.bigint();
    const duration = endTime - this.startTimeTransform;
    this.totalDurationTransform += duration;
    this.startTimeTransform = process.hrtime.bigint();
  }

  getTotalDurationMs() {
    return Number(
      (this.totalDurationRead + this.totalDurationTransform) / 1_000_000n,
    );
  }
}
