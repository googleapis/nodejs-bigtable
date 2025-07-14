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
      highWaterMark: 0,
      objectMode: true,
    });
    this.startTime = 0n;
    this.totalDuration = 0n;
    this.handleBeforeRow = this.handleBeforeRow.bind(this);
    this.handleAfterRow = this.handleAfterRow.bind(this);
    this.on('before_row', this.handleBeforeRow);
    this.on('after_row', this.handleAfterRow);
  }

  read(size: any) {
    this.events.push({name: 'read called', time: Date.now()});
    const chunk = super.read(size);
    if (chunk) {
      this.events.push({name: 'emit before_row', time: Date.now()});
      this.emit('before_row');
      process.nextTick(() => {
        this.events.push({name: 'emit after_row', time: Date.now()});
        this.emit('after_row');
      });
      // Defer the after call to the next tick of the event loop
    }
  }

  _transform(chunk: any, encoding: any, callback: any) {
    // calculate the time spent in the callback (i.e. on("data") handlers)
    this.events.push({name: '_read called', time: Date.now()});
    this.handleBeforeRow();
    this.handleAfterRow();
    callback(null, chunk);
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
