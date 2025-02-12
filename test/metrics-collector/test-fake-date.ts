import {describe} from 'mocha';
import {getDate} from '../../src/getDate';

describe.only('Bigtable/FakeDate', () => {
  const originalDate = global.Date;
  before(() => {
    let mockTime = new Date('2025-03-15T10:00:00.000Z').getTime();

    (global as any).Date = class extends originalDate {
      constructor(...args: any[]) {
        // Using a rest parameter
        if (args.length === 0) {
          super(mockTime);
          mockTime += 1000;
        }
      }

      static now(): number {
        return mockTime;
      }

      static parse(dateString: string): number {
        return originalDate.parse(dateString);
      }

      static UTC(
        year: number,
        month: number,
        date?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        ms?: number
      ): number {
        return originalDate.UTC(year, month, date, hours, minutes, seconds, ms);
      }
    };
  });

  after(() => {
    (global as any).Date = originalDate;
  });

  it('should record the right metrics with a typical method call', async () => {
    console.log(getDate().toISOString());
    console.log(getDate().toISOString());
    console.log(getDate().toISOString());
  });
});
