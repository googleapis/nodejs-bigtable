/**
 * Copyright 2018 Google Inc. All Rights Reserved.
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
const uuid = require(`uuid`);

const Bigtable = require(`@google-cloud/bigtable`);
const bigtable = new Bigtable();

const INSTANCE_ID = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const CLUSTER_ID = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const TABLE_ID = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
// const FAMILY_ID = `sample-family-${uuid.v4()}`.substr(0, 10); // Bigtable naming rules

const rowSnippets = require('../row.js');

const instance = bigtable.instance(INSTANCE_ID);

describe('Row Snippets', function() {
  before(async () => {
    await instance.create({
      clusters: [
        {
          name: CLUSTER_ID,
          location: 'us-central1-f',
          storage: 'hdd',
        },
      ],
      type: 'DEVELOPMENT',
    });
    await instance.createTable(TABLE_ID);
  });

  after(async () => {
    await instance.delete();
  });

  it('should create a row', done => {
    rowSnippets.createRow(INSTANCE_ID, TABLE_ID, done);
  });
  it('should create a row rules', done => {
    rowSnippets.createRules(INSTANCE_ID, TABLE_ID, done);
  });
  it('should delete all cells', done => {
    rowSnippets.deleteAllCells(INSTANCE_ID, TABLE_ID, done);
  });
  it('should delete selected cells', done => {
    rowSnippets.deleteCells(INSTANCE_ID, TABLE_ID, done);
  });
  it('should check row exists', done => {
    rowSnippets.exists(INSTANCE_ID, TABLE_ID, done);
  });
  it('should mutate row with matched filter', done => {
    rowSnippets.filter(INSTANCE_ID, TABLE_ID, done);
  });
  it('should get row meta-data', done => {
    rowSnippets.getMetadata(INSTANCE_ID, TABLE_ID, done);
  });
  it('should increment row', done => {
    rowSnippets.increment(INSTANCE_ID, TABLE_ID, done);
  });
  it('should save row', done => {
    rowSnippets.save(INSTANCE_ID, TABLE_ID, done);
  });
});
