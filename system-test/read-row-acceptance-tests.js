/*!
 * Copyright 2017 Google Inc. All Rights Reserved.
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
const _ = require('lodash');
const ChunkParser = require('./chunkparser');

const readRowResponses = require('../src/read-row-responses'),
  RowMergerStateManager = readRowResponses.RowMergerStateManager,
  ReadRowsResponse = readRowResponses.ReadRowsResponse;

describe('Read Row Acceptance tests', function() {
  var testcase = require('./read-rows-acceptance-test').tests;
  var chunkParser = new ChunkParser();
  testcase.forEach(function(test) {
    var cellChunks = chunkParser.toChunks(test.chunks);
    var expected = test.results;
    var expectedErrors = _.filter(expected, e => e.error);
    var expectedRows = _.filter(expected, e => !e.error);

    it(test.name, done => {
      const rowStateManager = new RowMergerStateManager();
      let rows = [];
      let errors = [];
      rowStateManager
        .on('row', function(row) {
          rows.push(row);
        })
        .on('error', function(error) {
          errors.push(error);
        });
      rowStateManager.consumeNext(new ReadRowsResponse(null, cellChunks));
      if (errors.length === 0) {
        rowStateManager.onCompleted();
      }
      assert.equal(errors.length, expectedErrors.length, 'Expected Errors');
      if (expectedRows.length > 0) {
        let cells = _.flatMap(rows, getAllCells);
        assert.equal(
          cells.length,
          expectedRows.length,
          'Expecting equals numbers of cells'
        );
        assert.deepEqual(cells, expectedRows);
      }
      done();
    });
  });
});

let fieldMap = {
  rowKey: 'rk',
  family: 'fm',
  labels: 'label',
  qualifier: 'qual',
  timestamp: 'ts',
  value: 'value',
};

function getAllCells(row) {
  return row.cells.map(cell => {
    let dummyCell = {};
    dummyCell['rk'] = row.rowKey;
    dummyCell['error'] = false;
    _.keys(cell).forEach(k => {
      let mappedKey = fieldMap[k];
      let mappedValue = cell[k];
      dummyCell[mappedKey] = mappedValue;
    });
    return dummyCell;
  });
}
