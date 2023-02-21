import {SetCellObj} from '../../src';
import {Data} from '../../src/mutation';

export class InverseMutation {
  static inverseEncodeSetCell(mutations: SetCellObj[]): Data {
    const data = {} as any;
    for (const mutation of mutations) {
      const familyName = mutation.familyName as string;
      if (!(familyName in data)) {
        data[familyName] = {};
      }
      const columnQualifier = (mutation.columnQualifer as Buffer).toString();
      const newCell = {} as any;
      newCell[columnQualifier] = {
        timestamp: mutation.timestampMicros,
        value: mutation.value,
      };
      Object.assign(data[familyName], newCell);
    }
    return data;
    /*
    const mutationsInput = [
      {
        mutation: 'setCell',
        setCell: {
          familyName: '',
          columnQualifier: Buffer.from(Long.fromNumber(0).toBytesBE()),
          timestampMicros: '0',
          value: Buffer.from(Long.fromNumber(0).toBytesBE()),
        },
      },
    ];
    console.log(mutationsInput);
    return {
      familyName1: {
        cellName1: {
          value: Buffer.from(Long.fromNumber(0).toBytesBE()),
          timestamp: '0',
        },
      },
    };
    */
  }
}
