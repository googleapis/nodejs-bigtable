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
const testcases = require('./read-rows-acceptance-test.json').tests;
const sinon = require('sinon');
const Stream = require('stream');
const Table = require('../src/table.js');
const ProtoBuf = require('protobufjs');
ProtoBuf.convertFieldsToCamelCase = true;
const path = require('path');
const protosRoot = path.resolve(__dirname, '../protos');
const builder = ProtoBuf.loadProtoFile({
  root: protosRoot,
  file: 'google/bigtable/v2/bigtable.proto',
});
const ReadRowsResponse = builder.build('google.bigtable.v2.ReadRowsResponse');
const CellChunk = builder.build(
  'google.bigtable.v2.ReadRowsResponse.CellChunk'
);
describe('Read Row Acceptance tests', function() {
  testcases.forEach(function(test) {
    it(test.name, done => {
      const results = [];
      const rawResults = test.results || [];
      rawResults.filter(result => !result.error).forEach(result => {
        const existingRow = results.find(filter => filter.key === result.rk);
        const row = existingRow || {key: result.rk, data: {}};
        const data = row.data;
        if (typeof existingRow === 'undefined') {
          results.push(row);
        }
        const family = data[result.fm] || {};
        data[result.fm] = family;
        const qualifier = family[result.qual] || [];
        family[result.qual] = qualifier;
        qualifier.push({value: result.value, timestamp: result.ts});
      });
      let readRowsResponse = new ReadRowsResponse();
      readRowsResponse.set(
        'chunks',
        test.chunks_base64.map(chunk => {
          const cellChunk = CellChunk.decode64(chunk);
          return cellChunk;
        })
      );

      readRowsResponse = ReadRowsResponse.decode(
        readRowsResponse.encode().toBuffer()
      ).toRaw(true, false);
      const rs = new Stream.Readable({objectMode: true});
      rs.push(readRowsResponse);
      rs.push(null);
      const table = new Table({id: 'xyz'}, 'my-table');
      sinon.stub(table, 'requestStream').returns(rs);
      table.getRows({}, function(err, rows) {
        assert.equal(
          rows.length,
          results.length,
          'Expected & Actual Row count mismatch'
        );
        results.forEach(result => {
          const row = rows.find(row => row.id === result.key);
          assert.notEqual(row, 'undefined', 'can not find row');
          const familiesName = Object.keys(result.data);
          familiesName.forEach(familyName => {
            const resultFamily = result.data[familyName];
            const rowFamily = row.data[familyName];
            assert.notEqual(rowFamily, 'undefined', 'row family mismatch');
            const qualifiersName = Object.keys(resultFamily);
            qualifiersName.forEach(qualifierName => {
              const resultQualifier = resultFamily[qualifierName];
              const rowQualifier = rowFamily[qualifierName];
              assert.notEqual(
                rowQualifier,
                'undefined',
                'row qualifier mismatch'
              );
              assert.equal(
                rowQualifier.length,
                resultQualifier.length,
                'qualifier length mistmatch'
              );
              for (let qe of resultQualifier.entries()) {
                const resultQualifierValue = qe[1];
                const rowQualifierValue = rowQualifier[qe[0]];
                assert.notEqual(
                  rowQualifierValue,
                  'undefined',
                  'qualifier  mismatch'
                );
                assert.equal(
                  rowQualifierValue.value,
                  resultQualifierValue.value,
                  'qualifier value mismatch'
                );
                assert.equal(
                  rowQualifierValue.timestamp,
                  resultQualifierValue.timestamp,
                  'qualifier value timestamp mismatch'
                );
              }
            });
          });
        });
        done();
      });
    });
  });
});
