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

import {PassThrough, TransformCallback, TransformOptions} from 'stream';

/**
 * This interface is the usual options that can be passed into a Transform plus
 * a hook for injecting code into the stream's transform function. This hook is
 * useful for code running code that normally runs in the transform method if that
 * code is different for each method that makes use of a stream.
 */
type TimedStreamOptions = TransformOptions & {
  transformHook?: (
    event: any,
    _encoding: BufferEncoding,
    callback: TransformCallback,
  ) => void;
};

/**
 * The TimedStream class is used for measuring the time the user spends
 * processing data from the stream. We need to measure this time for use cases
 * like measuring the application latencies for client side metrics.
 */
export class TimedStream extends PassThrough {
  private startTimeRead;
  private totalDurationRead;
  private totalDurationTransform;
  constructor(options?: TimedStreamOptions) {
    // highWaterMark of 1 is needed to respond to each row
    let startTimeTransform = 0n;
    super({
      ...options,
      objectMode: true,
      highWaterMark: 0,
      transform: (event, _encoding, callback) => {
        // First run code for time measurement before the transform callback is
        // invoked. ie. Ensure that the timer is started.
        startTimeTransform = process.hrtime.bigint();
        // Then run method specific code and the transform callback.
        if (options?.transformHook) {
          options?.transformHook(event, _encoding, callback);
        }
        callback(null, event);
        // Last, run code for time measurement after the transform callback is
        // invoked. ie. Ensure that the timer is stopped and elapsed time is
        // recorded.
        const endTime = process.hrtime.bigint();
        const duration = endTime - startTimeTransform;
        this.totalDurationTransform += duration;
        startTimeTransform = process.hrtime.bigint();
      },
    });
    this.startTimeRead = 0n;
    this.totalDurationRead = 0n;
    this.totalDurationTransform = 0n;
    this.handleBeforeRowRead = this.handleBeforeRowRead.bind(this);
    this.handleAfterRowRead = this.handleAfterRowRead.bind(this);
    this.on('before_row', this.handleBeforeRowRead);
    this.on('after_row', this.handleAfterRowRead);
  }

  /**
   * read code is called when a row is consumed.
   */
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

  /**
   * handleBeforeRowRead code is called when the stream processes a before_row
   * event emitted by the read function.
   */
  handleBeforeRowRead() {
    this.startTimeRead = process.hrtime.bigint();
  }

  /**
   * handleAfterRowRead code is called when the stream processes an after_row
   * event emitted by the read function.
   */
  handleAfterRowRead() {
    const endTime = process.hrtime.bigint();
    const duration = endTime - this.startTimeRead;
    this.totalDurationRead += duration;
  }

  /**
   *
   */
  getTotalDurationMs() {
    return Number(
      (this.totalDurationRead + this.totalDurationTransform) / 1_000_000n,
    );
  }
}
