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
import {GetRowsOptions, Value} from '../../src';
import {ChunkTransformer} from '../../src/chunktransformer';
import {ReadRowsResumptionStrategy} from '../../src/utils/read-rows-resumption';
import * as assert from 'assert';

describe.only('ReadrowsResumptionStrategy', () => {
  // TODO: Move this out into its own file.
  // TODO: Would be good to parameterize the test to prove it is idempotent
  const tableName = 'fake-table-name';
  function generateStrategy(
    options: GetRowsOptions,
    lastRowKey?: Value
  ): ReadRowsResumptionStrategy {
    const chunkTransformer = new ChunkTransformer({
      decode: false,
    } as any);
    if (lastRowKey) {
      chunkTransformer.lastRowKey = lastRowKey;
    }
    return new ReadRowsResumptionStrategy(chunkTransformer, options, {
      tableName,
    });
  }
  it('should generate the right resumption request with no options each time', () => {
    const strategy = generateStrategy({});
    const noRangesNoKeys = {
      rows: {
        rowKeys: [],
        rowRanges: [{}],
      },
      tableName,
    };
    assert.deepStrictEqual(strategy.getResumeRequest(), noRangesNoKeys);
  });
  it('should generate the right resumption requests with a last row key', () => {
    const strategy = generateStrategy(
      {
        keys: ['a', 'b', 'c'],
      },
      'b'
    );
    assert.deepStrictEqual(strategy.getResumeRequest(), {
      rows: {
        rowKeys: ['c'].map(key => Buffer.from(key)),
        rowRanges: [],
      },
      tableName,
    });
  });
  it('should generate the right resumption request with the lastrow key in a row range', () => {
    const strategy = generateStrategy(
      {
        ranges: [
          {start: 'a', end: 'c'},
          {start: 'e', end: 'g'},
        ],
      },
      'b'
    );
    assert.deepStrictEqual(strategy.getResumeRequest(), {
      rows: {
        rowKeys: [],
        rowRanges: [
          {startKeyOpen: Buffer.from('b'), endKeyClosed: Buffer.from('c')},
          {startKeyClosed: Buffer.from('e'), endKeyClosed: Buffer.from('g')},
        ],
      },
      tableName,
    });
  });
  it('should generate the right resumption request with the lastrow key at the end of a row range', () => {
    const strategy = generateStrategy(
      {
        ranges: [
          {start: 'a', end: 'c'},
          {start: 'e', end: 'g'},
        ],
      },
      'c'
    );
    assert.deepStrictEqual(strategy.getResumeRequest(), {
      rows: {
        rowKeys: [],
        rowRanges: [
          {startKeyClosed: Buffer.from('e'), endKeyClosed: Buffer.from('g')},
        ],
      },
      tableName,
    });
  });
  it('should generate the right resumption request with the limit', () => {
    const strategy = generateStrategy({
      limit: 71,
    });
    strategy.rowsRead = 37;
    assert.deepStrictEqual(strategy.getResumeRequest(), {
      rows: {
        rowKeys: [],
        rowRanges: [{}],
      },
      rowsLimit: 34,
      tableName,
    });
  });
  it('should generate the right resumption request with start and end', () => {
    const strategy = generateStrategy(
      {
        start: 'b',
        end: 'm',
      },
      'd'
    );
    assert.deepStrictEqual(strategy.getResumeRequest(), {
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
    });
  });
  it('should generate the right resumption request with prefixes', () => {
    const strategy = generateStrategy(
      {
        prefixes: ['d', 'f', 'h'],
      },
      'e'
    );
    const request = strategy.getResumeRequest();
    assert.deepStrictEqual(request, {
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
    });
  });
});
