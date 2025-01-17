/**
 * The Counter interface for recording increments of a metric.
 */
interface ICounter {
  /**
   * Adds a value to the counter.
   * @param retries The value to be added to the counter.
   * @param dimensions The dimensions associated with this value.
   */
  add(retries: number, dimensions: {}): void;
}

/**
 * The Histogram interface for recording distributions of values of a metric.
 */
interface IHistogram {
  /**
   * Records a value in the histogram.
   * @param value The value to be recorded in the histogram.
   * @param dimensions The dimensions associated with this value.
   */
  record(value: number, dimensions: {}): void;
}

/**
 * The Meter interface.  Meters are responsible for creating and managing instruments (Counters, Histograms, etc.).
 */
interface IMeter {
  /**
   * Creates a Counter instrument, which counts increments of a given metric.
   * @param instrument The name of the counter instrument.
   * @param attributes The attributes associated with this counter.
   * @returns {ICounter} A Counter instance.
   */
  createCounter(instrument: string, attributes: {}): ICounter;
  /**
   * Creates a Histogram instrument, which records distributions of values for a given metric.
   * @param instrument The name of the histogram instrument.
   * @param attributes The attributes associated with this histogram.
   * @returns {IHistogram} A Histogram instance.
   */
  createHistogram(instrument: string, attributes: {}): IHistogram;
}

/**
 * The MeterProvider interface.  A MeterProvider creates and manages Meters.
 */
interface IMeterProvider {
  /**
   * Returns a Meter, which can be used to create instruments for recording measurements.
   * @param name The name of the Meter.
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
