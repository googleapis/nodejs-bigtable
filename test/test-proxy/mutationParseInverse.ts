// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as assert from 'assert';
import {Mutation} from '../../src/mutation';
import {mutationParseInverse} from '../../testproxy/services/utils/request/mutateInverse';
import * as protos from '../../protos/protos';

describe('Check mutation parse and mutationParseInverse are inverses', () => {
  it('should invert mutations properly', () => {
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
      TODO: Fix the inverse function later so that these mutations can be used in the test proxy.
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
