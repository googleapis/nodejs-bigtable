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

import {WithLogger, WithLoggerAndName} from './logger';
import {Dimensions, dimensionsToString} from './client-side-metrics-dimensions';

/**
 * A test implementation of a MeterProvider.  This MeterProvider is used for testing purposes.
 * It doesn't send metrics to a backend, but instead logs metric updates for verification.
 */
export class TestMeterProvider extends WithLogger {
  /**
   * Returns a TestMeter, that logs metric updates for verification.
   * @param {string} name The name of the meter.
   * @returns {TestMeter}
   */
  getMeter(name: string) {
    return new TestMeter(this.logger, name);
  }
}

/**
 * A test implementation of a Meter.  Used for testing purposes.  It doesn't send metrics to a backend,
 * but instead logs metric updates for verification.
 */
class TestMeter extends WithLoggerAndName {
  /**
   * Creates a test histogram.  The TestHistogram logs when values are recorded.
   * @param {string} instrument The name of the instrument.
   * @returns {TestHistogram}
   */
  createHistogram(instrument: string) {
    return new TestHistogram(this.logger, `${this.name}:${instrument}`);
  }
  /**
   * Creates a test counter. The TestCounter logs when values are added.
   * @param {string} instrument The name of the instrument.
   * @returns {TestCounter}
   */
  createCounter(instrument: string) {
    return new TestCounter(this.logger, `${this.name}:${instrument}`);
  }
}

/**
 * A test implementation of a Counter. Used for testing purposes. It doesn't send metrics to a backend,
 * but instead logs value additions for verification.
 */
class TestCounter extends WithLoggerAndName {
  /**
   * Simulates adding a value to the counter. Logs the value and the counter name.
   * @param {number} value The value to be added to the counter.
   * @param {Dimensions} dimensions The dimensions associated with the value.
   */
  add(value: number, dimensions: Dimensions) {
    this.logger.log(
      `Value added to counter ${this.name} = ${value.toString()} with dimensions ${dimensionsToString(dimensions)}`
    );
  }
}

/**
 * A test implementation of a Histogram. Used for testing purposes. It doesn't send metrics to a backend,
 * but instead logs recorded values for verification.
 */
class TestHistogram extends WithLoggerAndName {
  /**
   * Simulates recording a value in the histogram. Logs the value and the histogram name.
   * @param {number} value The value to be recorded in the histogram.
   * @param {Dimensions} dimensions The dimensions associated with the value.
   */
  record(value: number, dimensions: Dimensions) {
    this.logger.log(
      `Value added to histogram ${this.name} = ${value.toString()} with dimensions ${dimensionsToString(dimensions)}`
    );
  }
}
