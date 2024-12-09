import * as assert from 'assert';
import {Mutation} from '../../src/mutation';
import {mutationParseInverse} from '../../testproxy/services/utils/request/mutateInverse';
import * as protos from '../../protos/protos';

describe.only('Check mutation parse and mutationParseInverse are inverses', () => {
  it('should invert setCell mutations', () => {
    const rowKey = 'row123';
    const insertMutations: protos.google.bigtable.v2.IMutation[] = [
      {
        setCell: {
          familyName: 'cf1',
          timestampMicros: 1000007,
          columnQualifier: Buffer.from('cq1'),
          value: Buffer.from('value1'),
        },
      },
      {
        setCell: {
          familyName: 'cf2',
          timestampMicros: 1000007,
          columnQualifier: Buffer.from('cq2'),
          value: Buffer.from('value2'),
        },
      },
    ];
    const inputRequest: protos.google.bigtable.v2.IMutateRowRequest = {
      rowKey: Buffer.from(rowKey),
      mutations: insertMutations,
      appProfileId: 'my-app-profile',
    };
    const insertMutation = mutationParseInverse(inputRequest);
    const parsedMutation = Mutation.parse(insertMutation);
    assert.deepStrictEqual(parsedMutation, inputRequest);
  });
});
