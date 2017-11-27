/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const assert = require('assert');
const arrify = require('arrify');
const _ = require('lodash');
const readRowResponse = require('../src/read-row-responses'),
  RowMergerStateManager = readRowResponse.RowMergerStateManager,
  ReadRowsResponse = readRowResponse.ReadRowsResponse;

function createCell(key, family, qualifier, value, timestampMicros, isCommit, labels){
  let cellChunk = {};
  if (key !== null) {
    cellChunk['rowKey'] = key;
  }
  if (family !== null) {
    cellChunk['familyName'] = {
      value: family,
    };
  }
  if (qualifier !== null) {
    cellChunk['qualifier'] = {
      value: qualifier,
    };
  }
  cellChunk['timestampMicros'] = timestampMicros;
  cellChunk['value'] = value;
  if (isCommit) {
    cellChunk['commitRow'] = true;
  }
  if (labels !== null || typeof labels !== 'undefined') {
    cellChunk['labels'] = labels;
  }
  return cellChunk;
}

function cellChunkToCell(chunk) {
  let cell = {};
  let setter = function(chunk, field, targetField) {
    let components = field.split('.');
    let value = chunk;
    components.forEach(part => {
      if (value !== null && value.hasOwnProperty(part)) {
        value = value[part];
      } else {
        value = null;
      }
    });
    targetField = typeof targetField === 'undefined' ? field : targetField;
    if (value !== null)
      cell[targetField] = value;
  };
  setter(chunk, 'rowKey');
  setter(chunk, 'qualifier.value', 'qualifier');
  setter(chunk, 'value');
  setter(chunk, 'labels');
  setter(chunk, 'timestampMicros', 'timestamp');
  setter(chunk, 'familyName.value', 'family');

  return cell;
}

function createReadResponse(lastScannedRowKey, cellChunks) {
  return new ReadRowsResponse(lastScannedRowKey, arrify(cellChunks));
}
describe('BigTable/ReadRowsResponse', function() {
  it('should emit two rows with 1 cell each on event stream', done => {
    let cells = [];
    let sut = new RowMergerStateManager();
    sut.on('row', row => {
      let cell = {};
      cell['rowKey'] = row.rowKey;
      _.merge(cell, row.cells[0]);
      cells.push(cell);
    });
    // @formatter:off
    let chunk1 = createCell('row_key1', 'family', 'qualifier', 'value', 1, true, "L1");
    let chunk2 = createCell('row_key2', 'family', 'qualifier', 'value', 1, true, "L2");
    // @formatter:off
    sut.consumeNext(createReadResponse(null, chunk1));
    sut.consumeNext(createReadResponse(null, chunk2));
    assert(cells.length === 2);
    assert.deepEqual(cells[0], cellChunkToCell(chunk1));
    assert.deepEqual(cells[1], cellChunkToCell(chunk2));
    done();
  });
  it('should emit 1 row with 3 cell on event stream', done => {
    let cells = [];
    let rows = [];
    let sut = new RowMergerStateManager();
    sut.on('row', row => {
      row.cells.forEach(c => {
        let cell = {};
        cell['rowKey'] = row.rowKey;
        _.merge(cell, c);
        cells.push(cell);
      });
      rows.push(row);
    });
    // @formatter:off
    let chunk1 = createCell('row_key1', 'family', 'qualifier', 'value', 1, false, "L1");
    let chunk2 = createCell(null, null, 'qualifier2', 'value2', 2, false);
    let chunk3 = createCell(null, null, null, 'value3', 1, true);
    // @formatter:off
    sut.consumeNext(createReadResponse(null, chunk1));
    sut.consumeNext(createReadResponse(null, chunk2));
    sut.consumeNext(createReadResponse(null, chunk3));
    assert(cells.length === 3);
    assert.deepEqual(cells[0], cellChunkToCell(chunk1));
    assert.deepEqual(cells[1], {
      family: 'family',
      labels: '',
      qualifier: 'qualifier2',
      rowKey: 'row_key1',
      timestamp: 2,
      value: 'value2',
    });
    assert.deepEqual(cells[2], {
      family: 'family',
      labels: '',
      qualifier: 'qualifier2',
      rowKey: 'row_key1',
      timestamp: 1,
      value: 'value3',
    });
    done();
  });
});
