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
const ChunkParser = require('./chunkparser');
const testcases = require('./read-rows-acceptance-test.json').tests;
const chunkParser = new ChunkParser();
const sinon = require('sinon');
const Stream = require('stream');
const Table = require('../src/table.js');
describe('Read Row Acceptance tests', function() {
  testcases.forEach(function(test) {
    it(test.name, done => {
      const results = test.results
        .filter(result => !result.error)
        .map(result => {
          const row = {key: result.rk, data: {}};
          const data = row.data;
          const family = {};
          const qualifier = [{value: result.value, timestamp: result.ts}];
          family[result.qual] = qualifier;
          data[result.fm] = family;
          return row;
        });
      const readRowsResponse = chunkParser.toChunks(test.chunks);
      const rs = new Stream.Readable({objectMode: true});
      rs.push(readRowsResponse);
      rs.push(null);
      const table = new Table({id: 'xyz'}, 'my-table');
      sinon.stub(table, 'requestStream').returns(rs);
      table.getRows({}, function(err, rows) {
        assert.equal(rows.length, results.length, 'Expected Row');
        done();
      });
    });
  });
});
