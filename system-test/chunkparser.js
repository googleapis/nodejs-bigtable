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

const Arrify = require('arrify');
const Mutation = require('../src/mutation');

const toBytes = Mutation.convertToBytes;
const idF = v => v;

/**
 * Helper class to parse the chunks section of the acceptance tests in json format.
 * @constructor
 */
function ChunkParser() {
  this.tokenizer = require('protobufjs').tokenize;
  this.camelCase = require('change-case').camelCase;
  this.fieldMetadata = {
    rowKey: toBytes,
    familyName: idF,
    qualifier: toBytes,
    timestamp_micros: idF,
    labels: Arrify,
  };
}

ChunkParser.prototype.toValue = function(field, value) {
  switch(field.substring('_root_.'.length)){
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
      return Arrify(value);
    default:
      return idF(value);
  }
}

ChunkParser.prototype.toChunks = function(chunkStrArray) {
  return chunkStrArray.map(chunkStr => this.toChunk(chunkStr));
};
ChunkParser.prototype.toChunk = function(chunkStr) {
  let value = {};
  const tokenizer = this.tokenizer(chunkStr);

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
        current[tokenName] = this.toValue(`${currentNamespace}.${tokenName}`, tokenValue);
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
        tokenName = this.camelCase(token);
    }
  }
  return value;
};

module.exports = ChunkParser;