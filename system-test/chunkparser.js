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

const arrify = require('arrify');
const toBytes = require('../src/mutation').convertToBytes;
const camelCase = require('change-case').camelCase;
const ProtoBuf = require('protobufjs');
ProtoBuf.convertFieldsToCamelCase = true;
const Tokenizer = ProtoBuf.DotProto.Tokenizer;
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
const idF = v => v;

/**
 * Helper class to parse the chunks section of the acceptance tests in json format.
 * @constructor
 */
function ChunkParser() {
  this.fieldMetadata = {
    rowKey: toBytes,
    familyName: idF,
    qualifier: toBytes,
    timestamp_micros: idF,
    labels: arrify,
  };
}

ChunkParser.prototype.toValue = function(field, value) {
  switch (field.substring('_root_.'.length)) {
    case 'rowKey':
    case 'row_key':
    case 'qualifier.value':
    case 'value':
      return toBytes(value);
    case 'family_name.value':
    case 'familyName.value':
    case 'timestamp_micros':
    case 'timestampMicros':
    case 'valueSize':
      return idF(value);
    case 'labels':
      return arrify(value);
    default:
      return idF(value);
  }
};

ChunkParser.prototype.toChunks = function(chunkStrArray) {
  let readRowsResponse = new ReadRowsResponse();
  readRowsResponse.set(
    'chunks',
    chunkStrArray.map(chunkStr => this.toChunk(chunkStr)).map(chunk => {
      let cellChunk = new CellChunk();
      if (typeof chunk.rowKey !== 'undefined') {
        cellChunk.set('rowKey', chunk.rowKey);
      }
      if (typeof chunk.familyName !== 'undefined') {
        cellChunk.set('familyName', chunk.familyName);
      }
      if (typeof chunk.qualifier !== 'undefined') {
        cellChunk.set('qualifier', chunk.qualifier);
      }
      if (typeof chunk.timestampMicros !== 'undefined') {
        cellChunk.set('timestampMicros', chunk.timestampMicros);
      }
      if (typeof chunk.value !== 'undefined') {
        cellChunk.set('value', chunk.value);
      }
      if (typeof chunk.valueSize !== 'undefined') {
        cellChunk.set('valueSize', chunk.valueSize);
      }
      if (typeof chunk.labels !== 'undefined') {
        cellChunk.set('labels', chunk.labels);
      }
      if (typeof chunk.resetRow !== 'undefined') {
        cellChunk.set('resetRow', chunk.resetRow);
      }
      if (typeof chunk.commitRow !== 'undefined') {
        cellChunk.set('commitRow', chunk.commitRow);
      }
      return cellChunk;
    })
  );
  return ReadRowsResponse.decode(readRowsResponse.encode().toBuffer()).toRaw(
    true,
    true
  );
};
ChunkParser.prototype.toChunk = function(chunkStr) {
  let value = {};
  const tokenizer = new Tokenizer(chunkStr);

  let token;
  let stack = [];
  let tokenValue = null;
  let tokenName = null;
  let current = value;
  let currentNamespace = '_root_';
  stack.push([currentNamespace, current]);
  while ((token = tokenizer.next())) {
    switch (token) {
      case ':':
        //beginning of value block
        var peekToken = tokenizer.peek();
        if (peekToken === '"') {
          token = tokenizer.next();
          token = tokenizer.next();
          if (token === '"') {
            tokenValue = '';
          } else {
            tokenValue = token;
            tokenizer.next(); //ignore '"'
          }
        } else if (peekToken === '<') {
          // dont do anything
          break;
        } else {
          tokenValue = tokenizer.next();
          if (tokenValue === 'false' || tokenValue === 'true') {
            tokenValue = tokenValue === 'true';
          } else if (/(\d+)/.test(tokenValue)) {
            tokenValue = parseInt(tokenValue);
          }
        }
        current[tokenName] = this.toValue(
          `${currentNamespace}.${tokenName}`,
          tokenValue
        );
        tokenName = tokenValue = null;
        break;
      case '<':
        //beginning of nested block
        var newObject = {};
        current[tokenName] = newObject;
        stack.push([currentNamespace, newObject]);
        currentNamespace = `${currentNamespace}.${tokenName}`;
        tokenName = null;
        current = newObject;
        break;
      case '>':
        //end of nested block
        if (stack.length >= 2) {
          stack.pop();
          let top = stack[stack.length - 1];
          currentNamespace = top[0];
          current = top[1];
        }
        tokenName = tokenValue = null;
        break;
      default:
        tokenName = camelCase(token);
    }
  }
  return value;
};

module.exports = ChunkParser;
