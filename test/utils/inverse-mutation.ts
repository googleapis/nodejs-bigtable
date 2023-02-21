import {SetCellObj} from '../../src';
import {Data} from '../../src/mutation';

export class InverseMutation {
  static inverseEncodeSetCell(mutations: SetCellObj[]): Data {
    const data = {} as any;
    for (const mutation of mutations.map(m => m.setCell)) {
      if (mutation) {
        const familyName = mutation.familyName as string;
        if (!(familyName in data)) {
          data[familyName] = {};
        }
        const columnQualifier = (mutation.columnQualifier as Buffer).toString();
        const newCell = {} as any;
        newCell[columnQualifier] = {
          timestamp: mutation.timestampMicros,
          value: mutation.value,
        };
        Object.assign(data[familyName], newCell);
      }
    }
    return data;
  }
}
