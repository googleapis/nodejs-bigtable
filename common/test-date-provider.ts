interface ILogger {
  log(message: string): void;
}

class TestDateLike {
  private fakeDate;
  constructor(fakeDate: number) {
    this.fakeDate = fakeDate;
  }
  getTime() {
    return this.fakeDate;
  }
}

// TODO: ILogger in separate file
export class TestDateProvider {
  private dateCounter = 0;
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }
  getDate() {
    // The test assumes exactly 1s passes between each getDate call.
    this.dateCounter = this.dateCounter + 1000;
    this.logger.log(`getDate call returns ${this.dateCounter.toString()} ms`);
    return new TestDateLike(this.dateCounter);
  }
}
