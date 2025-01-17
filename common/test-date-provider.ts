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

import {WithLogger} from './logger';

/**
 * A test implementation of a Date-like object.  Used for testing purposes.  It provides a
 * getTime method that returns a pre-determined fake date value, allowing for
 * deterministic testing of time-dependent functionality.
 */
class TestDateLike {
  private fakeDate;
  /**
   * @param {number} fakeDate The fake date value to be returned by getTime(), in milliseconds.
   */
  constructor(fakeDate: number) {
    this.fakeDate = fakeDate;
  }
  /**
   * Returns the fake date value that this object was created with.
   * @returns {number} The fake date, in milliseconds.
   */
  getTime() {
    return this.fakeDate;
  }
}

/**
 * A test implementation of a DateProvider. Used for testing purposes. Provides
 * a deterministic series of fake dates, with each call to getDate() returning a date 1000ms later than the last.
 * Logs each date value returned for verification purposes.
 */
export class TestDateProvider extends WithLogger {
  private dateCounter = 0;
  /**
   * Returns a new fake date 1000ms later than the last. Logs the date for test verification.
   * @returns {TestDateLike} A fake date object.
   */
  getDate() {
    // The test assumes exactly 1s passes between each getDate call.
    this.dateCounter = this.dateCounter + 1000;
    this.logger.log(`getDate call returns ${this.dateCounter.toString()} ms`);
    return new TestDateLike(this.dateCounter);
  }
}
