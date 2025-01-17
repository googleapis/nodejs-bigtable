export class TestMeterProvider {
  private logger: ILogger;
  constructor(logger: ILogger) {
    this.logger = logger;
  }
  getMeter(name: string) {
    return new TestMeter(this.logger, name);
  }
}

interface ILogger {
  log(message: string): void;
}

class TestMeter {
  private logger: ILogger;
  private name: string;
  constructor(logger: ILogger, name: string) {
    this.logger = logger;
    this.name = name;
  }
  createHistogram(instrument: string) {
    return new TestHistogram(this.logger, `${this.name}:${instrument}`);
  }
  createCounter(instrument: string) {
    return new TestCounter(this.logger, `${this.name}:${instrument}`);
  }
}

class TestCounter {
  private logger: ILogger;
  private name: string;
  constructor(logger: ILogger, name: string) {
    this.logger = logger;
    this.name = name;
  }
  add(value: number) {
    this.logger.log(
      `Value added to counter ${this.name} = ${value.toString()}`
    );
  }
}

class TestHistogram {
  private logger: ILogger;
  private name: string;
  constructor(logger: ILogger, name: string) {
    this.logger = logger;
    this.name = name;
  }
  record(value: number) {
    this.logger.log(
      `Value added to histogram ${this.name} = ${value.toString()}`
    );
  }
}
