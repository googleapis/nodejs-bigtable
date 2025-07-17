import {TransformOptions} from 'stream';

const {PassThrough} = require('stream');

interface Event {
  name: string;
  time: number;
}

export class TimedStream extends PassThrough {
  constructor(options?: TransformOptions) {
    // highWaterMark of 1 is needed to respond to each row
    super({...options, objectMode: true, highWaterMark: 0});
    this.startTime = 0n;
    this.totalDuration = 0n;
    this.handleBeforeRowRead = this.handleBeforeRowRead.bind(this);
    this.handleAfterRowRead = this.handleAfterRowRead.bind(this);
    this.on('before_row', this.handleBeforeRowRead);
    this.on('after_row', this.handleAfterRowRead);
  }

  _transform(chunk: any, encoding: any, callback: any) {
    // calculate the time spent in the callback (i.e. on("data") handlers)
    this.handleBeforeRowRead();
    callback(null, chunk);
    this.handleAfterRowRead();
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

  handleBeforeRowRead() {
    this.startTime = process.hrtime.bigint();
  }

  handleAfterRowRead() {
    const endTime = process.hrtime.bigint();
    const duration = endTime - this.startTime;
    this.totalDuration += duration;
    this.startTime = process.hrtime.bigint();
  }

  getTotalDurationMs() {
    return Number(this.totalDuration / 1_000_000n);
  }
}

export class TimedStreamWithEvents extends TimedStream {
  events: Event[] = [];

  read(size: any) {
    this.events.push({name: 'read called', time: Date.now()});
    return super.read(size);
  }

  _transform(chunk: any, encoding: any, callback: any) {
    this.events.push({name: '_transform', time: Date.now()});
    return super._transform(chunk, encoding, callback);
  }

  handleBeforeRowRead() {
    this.events.push({name: 'handle before_row', time: Date.now()});
    return super.handleBeforeRowRead();
  }

  handleAfterRowRead() {
    this.events.push({name: 'handle after_row', time: Date.now()});
    return super.handleAfterRowRead();
  }
}
