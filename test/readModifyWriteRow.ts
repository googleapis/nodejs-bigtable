import {
  getRMWRRequest,
  getRMWRRequestInverse,
} from '../src/utils/readModifyWriteRow/getRMWRRequest';
import * as protos from '../protos/protos';
import * as assert from 'assert';

describe.only('getRMWRRequest and getRMWRRequestInverse', () => {
  const testCases: protos.google.bigtable.v2.IReadModifyWriteRowRequest[] = [
    {
      tableName: 'test-table',
      rowKey: Buffer.from('test-row-key'),
      rules: [
        {
          familyName: 'cf1',
          columnQualifier: Buffer.from('cq1'),
          appendValue: Buffer.from('append-val'),
        },
        {
          familyName: 'cf2',
          columnQualifier: Buffer.from('cq2'),
          incrementAmount: 10,
        },
      ],
    },
    {
      tableName: 'another-table',
      rowKey: Buffer.from('row-key-2'),
      rules: [
        {
          familyName: 'cf3',
          columnQualifier: Buffer.from('cq3'),
          incrementAmount: -5,
        },
      ],
    },
    {
      tableName: 'test-table-4',
      rowKey: Buffer.from('test-row-key-4'),
      rules: [
        {
          familyName: 'cf1',
          columnQualifier: Buffer.from('cq1'),
          appendValue: Buffer.from('append-val1'),
        },
        {
          familyName: 'cf2',
          columnQualifier: Buffer.from('cq2'),
          incrementAmount: 11,
        },
        {
          familyName: 'cf3',
          columnQualifier: Buffer.from('cq3'),
          appendValue: Buffer.from('append-val2'),
        },
      ],
      appProfileId: 'my-app-profile',
    }, // appProfileId
    // Add more test cases with different combinations of fields
  ];

  it('Run test 1', () => {
    const inverseResult = getRMWRRequestInverse(testCases[0]);
    const result = getRMWRRequest(inverseResult);
    assert.deepStrictEqual(result, testCases[0]);
  });
  it('Run test 2', () => {
    assert.deepStrictEqual(
      getRMWRRequest(getRMWRRequestInverse(testCases[1])),
      testCases[1]
    );
  });
  it('Run test 3', () => {
    assert.deepStrictEqual(
      getRMWRRequest(getRMWRRequestInverse(testCases[2])),
      testCases[2]
    );
  });
  it('Run test 4', () => {
    assert.deepStrictEqual(
      getRMWRRequest(getRMWRRequestInverse(testCases[3])),
      testCases[3]
    );
  });
});
