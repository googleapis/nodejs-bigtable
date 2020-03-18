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

import * as assert from 'assert';
import {describe, it} from 'mocha';
const testcases = require('../../system-test/read-rows-acceptance-test.json')
  .tests;
import {PassThrough} from 'stream';
import {Table} from '../src/table.js';
import {Row} from '../src/row.js';
import * as ProtoBuf from 'protobufjs';
import * as fs from 'fs';
import * as path from 'path';
import {Instance} from '../src/instance';
import {Bigtable} from '../src';

const protosJson = path.resolve(__dirname, '../protos/protos.json');
const root = ProtoBuf.Root.fromJSON(
  JSON.parse(fs.readFileSync(protosJson).toString())
);
const ReadRowsResponse = root.lookupType('google.bigtable.v2.ReadRowsResponse');
const CellChunk = root.lookupType(
  'google.bigtable.v2.ReadRowsResponse.CellChunk'
);
describe('Read Row Acceptance tests', function() {
  testcases.forEach(function(test) {
    it(test.name, done => {
      const table = new Table({id: 'xyz'} as Instance, 'my-table');
      const results: any[] = [];
      const rawResults = test.results || [];
      const errorCount = rawResults.filter(result => result.error).length;
      rawResults
        .filter(result => !result.error)
        .forEach(result => {
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
          const resultLabels: any[] = [];
          if (result.label !== '') {
            resultLabels.push(result.label);
          }
          qualifier.push({
            value: result.value,
            timestamp: '' + result.ts,
            labels: resultLabels,
          });
        });

      table.bigtable = {} as Bigtable;
      (table.bigtable.request as any) = function() {
        const stream = new PassThrough({
          objectMode: true,
        });

        /* tslint:disable-next-line */
        (stream as any).abort = function() {};

        setImmediate(function() {
          test.chunks_base64
            .map(chunk => {
              const cellChunk = CellChunk.decode(Buffer.from(chunk, 'base64')); //.decode64(chunk);
              let readRowsResponse: any = {chunks: [cellChunk]};
              readRowsResponse = ReadRowsResponse.create(readRowsResponse);
              readRowsResponse = ReadRowsResponse.toObject(readRowsResponse, {
                defaults: true,
                longs: String,
                oneofs: true,
              });
              return readRowsResponse;
            })
            .forEach(readRowsResponse => stream.push(readRowsResponse));
          stream.push(null);
        });

        return stream;
      };

      const tableRows = results.map(rawRow => {
        const row = new Row(table, rawRow.key);
        row.data = rawRow.data;
        return row;
      });

      const errors: any[] = [];
      const rows: any[] = [];

      table
        .createReadStream({})
        .on('error', err => {
          errors.push(err);
          verify();
        })
        .on('data', row => {
          rows.push(row);
        })
        .on('end', () => {
          verify();
        });
      function verify() {
        assert.strictEqual(errors.length, errorCount, ' error count mismatch');
        assert.strictEqual(rows.length, results.length, 'row count mismatch');
        assert.deepStrictEqual(rows, tableRows, 'row mismatch');
        done();
      }
    });
  });
});
