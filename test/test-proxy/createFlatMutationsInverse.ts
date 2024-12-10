import {Mutation} from '../../src/mutation';
import {
  createFlatMutationsListWithFn,
  createFlatMutationsListWithFnInverse,
} from '../../testproxy/services/utils/request/createFlatMutationsList';
import {mutationParseInverse} from '../../testproxy/services/utils/request/mutateInverse';
import * as assert from 'assert';

describe('Check createFlatMutationsList and createFlatMutationsListInverse are inverses', () => {
  it('should invert mutations properly', () => {
    const insertMutations = [
      {
        mutations: [
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
        ],
      },
    ];
    const invertedMutations = createFlatMutationsListWithFnInverse(
      insertMutations,
      mutationParseInverse,
      1
    );
    const f = (entry: Mutation) => {
      // parse needs to be wrapped in f to cast and solve a compiler error.
      return Mutation.parse(entry) as {mutations: any[]};
    };
    const flatMutationsList = createFlatMutationsListWithFn(
      invertedMutations,
      f
    );
    assert.deepStrictEqual(flatMutationsList, insertMutations[0].mutations);
  });
});
