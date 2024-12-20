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

import {Mutation} from '../../src/mutation';
import {
  createFlatMutationsListWithFn,
  createFlatMutationsListWithFnInverse as inverse,
} from '../../testproxy/services/utils/request/createFlatMutationsList';
import {mutationParseInverse} from '../../testproxy/services/utils/request/mutateInverse';
import * as assert from 'assert';
import {google} from '../../protos/protos';
import IMutation = google.bigtable.v2.IMutation;

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
    assert.deepStrictEqual(
      createFlatMutationsListWithFn(
        inverse(insertMutations, mutationParseInverse, 1),
        // parse needs to be wrapped to cast and solve a compiler error.
        (entry: Mutation) => Mutation.parse(entry) as {mutations: IMutation[]}
      ), // This is the flattened list of Gapic Layer shaped mutations.
      insertMutations[0].mutations
    );
  });
});
