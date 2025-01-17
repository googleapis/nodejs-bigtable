import {WithLogger, WithLoggerAndName} from './logger';

export class TestMeterProvider extends WithLogger {
  getMeter(name: string) {
    return new TestMeter(this.logger, name);
  }
}

class TestMeter extends WithLoggerAndName {
  createHistogram(instrument: string) {
    return new TestHistogram(this.logger, `${this.name}:${instrument}`);
  }
  createCounter(instrument: string) {
    return new TestCounter(this.logger, `${this.name}:${instrument}`);
  }
}

class TestCounter extends WithLoggerAndName {
  add(value: number) {
    this.logger.log(
      `Value added to counter ${this.name} = ${value.toString()}`
    );
  }
}

class TestHistogram extends WithLoggerAndName {
  record(value: number) {
    this.logger.log(
      `Value added to histogram ${this.name} = ${value.toString()}`
    );
  }
}
