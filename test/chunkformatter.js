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
const proxyquire = require('proxyquire');
const sinon = require('sinon').sandbox.create();
const Mutation = require('../src/mutation.js');
const ROW_ID = 'my-row';
const CONVERTED_ROW_ID = 'my-converted-row';

const FakeMutation = {
  methods: Mutation.methods,
  convertToBytes: sinon.spy(function(value) {
    if (value === ROW_ID) {
      return CONVERTED_ROW_ID;
    }
    return value;
  }),
  convertFromBytes: sinon.spy(function(value) {
    return value;
  }),
};

describe('Bigtable/ChunkFormatter', function() {
  let ChunkFormatter;
  let chunkFormatter;

  before(function() {
    ChunkFormatter = proxyquire('../src/chunkformatter.js', {
      './mutation.js': FakeMutation,
    });
  });
  beforeEach(function() {
    chunkFormatter = new ChunkFormatter();
  });
  afterEach(function() {
    sinon.restore();

    Object.keys(FakeMutation).forEach(function(spy) {
      if (FakeMutation[spy].reset) {
        FakeMutation[spy].reset();
      }
    });
  });
  describe('instantiation', function() {
    it('should have initial state', function() {
      assert(chunkFormatter instanceof ChunkFormatter);
      this.prevRowKey = '';
      this.family = {};
      this.qualifiers = [];
      this.qualifier = {};
      this.row = {};
      this.state = this.newRow;
      assert.deepEqual(chunkFormatter.row, {}, 'invalid initial state');
      assert.deepEqual(chunkFormatter.prevRowKey, '', 'invalid initial state');
      assert.deepEqual(chunkFormatter.family, {}, 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifiers, [], 'invalid initial state');
      assert.deepEqual(chunkFormatter.qualifier, {}, 'invalid initial state');
      assert.deepEqual(
        chunkFormatter.state,
        chunkFormatter.newRow,
        'invalid initial state'
      );
    });
  });
  
});
