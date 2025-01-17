import {WithLogger} from './logger';

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
export class TestDateProvider extends WithLogger {
  private dateCounter = 0;
  getDate() {
    // The test assumes exactly 1s passes between each getDate call.
    this.dateCounter = this.dateCounter + 1000;
    this.logger.log(`getDate call returns ${this.dateCounter.toString()} ms`);
    return new TestDateLike(this.dateCounter);
  }
}
