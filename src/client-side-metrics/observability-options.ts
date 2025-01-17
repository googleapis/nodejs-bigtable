interface ICounter {
  add(retries: number, dimensions: {}): void;
}

interface IHistogram {
  record(value: number, dimensions: {}): void;
}

interface IMeter {
  createCounter(instrument: string, attributes: {}): ICounter;
  createHistogram(instrument: string, attributes: {}): IHistogram;
}

interface IMeterProvider {
  getMeter(name: string): IMeter;
}

export interface ObservabilityOptions {
  meterProvider: IMeterProvider;
}
