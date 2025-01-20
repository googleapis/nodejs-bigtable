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

import {Attributes} from '../../common/client-side-metrics-attributes';

/**
 * The Counter interface for recording increments of a metric.
 */
interface ICounter {
  /**
   * Adds a value to the counter.
   * @param retries The value to be added to the counter.
   * @param attributes The attributes associated with this value.
   */
  add(retries: number, attributes: Attributes): void;
}

/**
 * The Histogram interface for recording distributions of values of a metric.
 */
interface IHistogram {
  /**
   * Records a value in the histogram.
   * @param {number} value The value to be recorded in the histogram.
   * @param attributes The attributes associated with this value.
   */
  record(value: number, attributes: Attributes): void;
}

/**
 * The Meter interface.  Meters are responsible for creating and managing instruments (Counters, Histograms, etc.).
 */
interface IMeter {
  /**
   * Creates a Counter instrument, which counts increments of a given metric.
   * @param {string} instrument The name of the counter instrument.
   * @param {Attributes} attributes The attributes associated with this counter.
   * @returns {ICounter} A Counter instance.
   */
  createCounter(instrument: string, attributes: Attributes): ICounter;
  /**
   * Creates a Histogram instrument, which records distributions of values for a given metric.
   * @param {string} instrument The name of the histogram instrument.
   * @param {Attributes} attributes The attributes associated with this histogram.
   * @returns {IHistogram} A Histogram instance.
   */
  createHistogram(instrument: string, attributes: Attributes): IHistogram;
}

/**
 * The MeterProvider interface.  A MeterProvider creates and manages Meters.
 */
interface IMeterProvider {
  /**
   * Returns a Meter, which can be used to create instruments for recording measurements.
   * @param {string} name The name of the Meter.
   * @returns {IMeter} A Meter instance.
   */
  getMeter(name: string): IMeter;
}

/**
 * Options for configuring client-side metrics observability. Allows users to provide their own MeterProvider.
 */
export interface ObservabilityOptions {
  /**
   * The MeterProvider to use for recording metrics. If not provided, a default MeterProvider will be used.
   */
  meterProvider: IMeterProvider;
}
