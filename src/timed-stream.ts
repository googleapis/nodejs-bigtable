import {TransformOptions} from 'stream';

const {PassThrough} = require('stream');

interface Event {
  name: string;
  time: number;
}

export class TimedStream extends PassThrough {
  events: Event[] = [];
  constructor(options: TransformOptions) {
    // highWaterMark of 1 is needed to respond to each row
    super({
      ...options,
      highWaterMark: 1,
      transform: (chunk: any, encoding: any, callback: any) => {
        this.events.push({name: '_read called', time: Date.now()});
        callback(null, chunk);
      },
    });
    this.startTime = 0n;
    this.totalDuration = 0n;
    this.handleBeforeRow = this.handleBeforeRow.bind(this);
    this.handleAfterRow = this.handleAfterRow.bind(this);
    this.on('before_row', this.handleBeforeRow);
    this.on('after_row', this.handleAfterRow);
  }

  _read(size: any) {
    this.events.push({name: '_read called', time: Date.now()});
    super._read(size);
    this.events.push({name: 'emit before_row', time: Date.now()});
    this.emit('before_row');
    process.nextTick(() => {
      this.events.push({name: 'emit after_row', time: Date.now()});
      this.emit('after_row');
    });
    // Defer the after call to the next tick of the event loop
  }

  handleBeforeRow() {
    this.events.push({name: 'handle before_row', time: Date.now()});
    this.startTime = process.hrtime.bigint();
  }

  handleAfterRow() {
    const endTime = process.hrtime.bigint();
    const duration = endTime - this.startTime;
    this.totalDuration += duration;
    this.events.push({name: 'handle after_row', time: Date.now()});
  }

  getTotalDurationMs() {
    return Number(this.totalDuration / 1_000_000n);
  }
}
