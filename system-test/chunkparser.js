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

/**
 * Helper class to parse the chunks section of the acceptance tests in json format.
 * @constructor
 */
function ChunkParser() {
  this.tokenizer = require('protobufjs').tokenize;
  this.camelCase = require('change-case').camelCase;
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
  stack.push(value);
  let current = value;
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
        current[tokenName] = tokenValue;
        tokenName = tokenValue = null;
        break;
      case '<':
        //beginning of nested block
        var newObject = {};
        current[tokenName] = newObject;
        stack.push(newObject);
        tokenName = null;
        current = newObject;
        break;
      case '>':
        //end of nested block
        if (stack.length >= 2) {
          stack.pop();
          current = stack[stack.length - 1];
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