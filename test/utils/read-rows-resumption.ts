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

import {describe, it} from 'mocha';
import {ChunkTransformer} from '../../src/chunktransformer';
import {ReadRowsResumptionStrategy} from '../../src/utils/read-rows-resumption';
import * as assert from 'assert';
import {GoogleError} from 'google-gax';

describe('Bigtable/Utils/ReadrowsResumptionStrategy', () => {
  const tableName = 'fake-table-name';
  [
    {
      name: 'should generate the right resumption request with no options each time',
      shouldRetry: true,
      expectedResumeRequest: {
        rows: {
          rowKeys: [],
          rowRanges: [{}],
        },
        tableName,
      },
      options: {},
    },
    {
      name: 'should generate the right resumption requests with a last row key',
      shouldRetry: true,
      expectedResumeRequest: {
        rows: {
          rowKeys: ['c'].map(key => Buffer.from(key)),
          rowRanges: [],
        },
        tableName,
      },
      options: {
        keys: ['a', 'b', 'c'],
      },
      lastRowKey: 'b',
    },
    {
      name: 'should generate the right resumption request with the lastrow key in a row range',
      shouldRetry: true,
      expectedResumeRequest: {
        rows: {
          rowKeys: [],
          rowRanges: [
            {startKeyOpen: Buffer.from('b'), endKeyClosed: Buffer.from('c')},
            {startKeyClosed: Buffer.from('e'), endKeyClosed: Buffer.from('g')},
          ],
        },
        tableName,
      },
      options: {
        ranges: [
          {start: 'a', end: 'c'},
          {start: 'e', end: 'g'},
        ],
      },
      lastRowKey: 'b',
    },
    {
      name: 'should generate the right resumption request with the lastrow key at the end of a row range',
      shouldRetry: true,
      expectedResumeRequest: {
        rows: {
          rowKeys: [],
          rowRanges: [
            {startKeyClosed: Buffer.from('e'), endKeyClosed: Buffer.from('g')},
          ],
        },
        tableName,
      },
      options: {
        ranges: [
          {start: 'a', end: 'c'},
          {start: 'e', end: 'g'},
        ],
      },
      lastRowKey: 'c',
    },
    {
      name: 'should generate the right resumption request with start and end',
      shouldRetry: true,
      expectedResumeRequest: {
        rows: {
          rowKeys: [],
          rowRanges: [
            {
              startKeyOpen: Buffer.from('d'),
              endKeyClosed: Buffer.from('m'),
            },
          ],
        },
        tableName,
      },
      options: {
        start: 'b',
        end: 'm',
      },
      lastRowKey: 'd',
    },
    {
      name: 'should generate the right resumption request with prefixes',
      shouldRetry: true,
      expectedResumeRequest: {
        rows: {
          rowKeys: [],
          rowRanges: [
            {
              startKeyClosed: Buffer.from('f'),
              endKeyOpen: Buffer.from('g'),
            },
            {
              startKeyClosed: Buffer.from('h'),
              endKeyOpen: Buffer.from('i'),
            },
          ],
        },
        tableName,
      },
      options: {
        prefixes: ['d', 'f', 'h'],
      },
      lastRowKey: 'e',
    },
    {
      name: 'should generate the right resumption request with row ranges and row keys',
      shouldRetry: true,
      expectedResumeRequest: {
        rows: {
          rowKeys: ['d'].map(key => Buffer.from(key)),
          rowRanges: [
            {startKeyClosed: Buffer.from('e'), endKeyClosed: Buffer.from('g')},
          ],
        },
        tableName,
      },
      options: {
        keys: ['a', 'c', 'd'],
        ranges: [
          {start: 'a', end: 'c'},
          {start: 'e', end: 'g'},
        ],
      },
      lastRowKey: 'c',
    },
    {
      name: 'should generate the right resumption request without any filtering',
      shouldRetry: true,
      expectedResumeRequest: {
        rows: {
          rowKeys: ['c', 'd', 'e'].map(key => Buffer.from(key)),
          rowRanges: [
            {startKeyClosed: Buffer.from('d'), endKeyClosed: Buffer.from('f')},
            {startKeyClosed: Buffer.from('g'), endKeyClosed: Buffer.from('h')},
          ],
        },
        tableName,
      },
      options: {
        keys: ['c', 'd', 'e'],
        ranges: [
          {start: 'd', end: 'f'},
          {start: 'g', end: 'h'},
        ],
      },
      lastRowKey: 'b',
    },
    {
      name: 'should not retry again if the last row key exceeds all the row keys requested',
      shouldRetry: false,
      options: {
        keys: ['a', 'b', 'c'],
      },
      lastRowKey: 'e',
    },
  ].forEach(test => {
    it(test.name, () => {
      const chunkTransformer = new ChunkTransformer({
        decode: false,
      } as any);
      if (test.lastRowKey) {
        chunkTransformer.lastRowKey = test.lastRowKey;
      }
      const strategy = new ReadRowsResumptionStrategy(
        chunkTransformer,
        test.options,
        {
          tableName,
        }
      );
      const error = new GoogleError();
      error.code = 4;
      const willRetry = strategy.canResume(error); // Updates strategy state.
      // Do this check 2 times to make sure getResumeRequest is idempotent.
      assert.strictEqual(willRetry, test.shouldRetry);
      if (willRetry) {
        assert.deepStrictEqual(
          strategy.getResumeRequest(),
          test.expectedResumeRequest
        );
        assert.deepStrictEqual(
          strategy.getResumeRequest(),
          test.expectedResumeRequest
        );
      }
    });
  });
  it('should generate the right resumption request with the limit', () => {
    const chunkTransformer = new ChunkTransformer({
      decode: false,
    } as any);
    const strategy = new ReadRowsResumptionStrategy(
      chunkTransformer,
      {
        limit: 71,
      },
      {
        tableName,
      }
    );
    strategy.rowsRead = 37;
    strategy.canResume(new GoogleError()); // Updates strategy state.
    assert.deepStrictEqual(strategy.getResumeRequest(), {
      rows: {
        rowKeys: [],
        rowRanges: [{}],
      },
      rowsLimit: 34,
      tableName,
    });
  });
});
