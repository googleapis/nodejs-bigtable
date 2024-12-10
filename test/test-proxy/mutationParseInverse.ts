import * as assert from 'assert';
import {Mutation} from '../../src/mutation';
import {mutationParseInverse} from '../../testproxy/services/utils/request/mutateInverse';
import * as protos from '../../protos/protos';

describe.only('Check mutation parse and mutationParseInverse are inverses', () => {
  it('should invert mutations properly', () => {
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
      /*
      TODO: Fix the inverse function later so that these mutations can be used.
      {
        deleteFromColumn: {
          familyName: 'cf1',
          columnQualifier: Buffer.from('cq1'),
          timeRange: {
            startTimestampMicros: 1678886400000000, // Example timestamp
            endTimestampMicros: 1678972800000000, // Example timestamp
          },
        },
      },
      {
        deleteFromColumn: {
          familyName: 'cf1',
          columnQualifier: Buffer.from('cq2'),
        },
      },
      {
        deleteFromFamily: {
          familyName: 'cf1',
        },
      },
      {
        deleteFromRow: {},
      }
      */
    ];
    const inputRequest = {
      mutations: insertMutations,
    };
    const insertMutation = mutationParseInverse(inputRequest);
    const parsedMutation = Mutation.parse(insertMutation);
    assert.deepStrictEqual(parsedMutation, inputRequest);
  });
});
