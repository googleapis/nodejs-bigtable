// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const uuid = require('uuid');
const {describe, it, before, after} = require('mocha');
const {Bigtable} = require('@google-cloud/bigtable');
const bigtable = new Bigtable();

const INSTANCE_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const CLUSTER_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const TABLE_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules

const rowSnippets = require('./row.js');

const instance = bigtable.instance(INSTANCE_ID);

describe.skip('Row Snippets', () => {
  before(async () => {
    try {
      const [, operation] = await instance.create({
        clusters: [
          {
            name: CLUSTER_ID,
            location: 'us-central1-f',
            storage: 'hdd',
          },
        ],
        type: 'DEVELOPMENT',
      });
      await operation.promise();
      await instance.createTable(TABLE_ID);
    } catch (err) {
      // Handle the error.
    }
  });

  after(async () => {
    try {
      await instance.delete();
    } catch (err) {
      /// Handle the error.
    }
  });

  it('should create a row', () => {
    rowSnippets.createRow(INSTANCE_ID, TABLE_ID);
  });
  it('should create a row rules', () => {
    rowSnippets.createRules(INSTANCE_ID, TABLE_ID);
  });
  it('should delete all cells', () => {
    rowSnippets.deleteAllCells(INSTANCE_ID, TABLE_ID);
  });
  it('should delete selected cells', () => {
    rowSnippets.deleteCells(INSTANCE_ID, TABLE_ID);
  });
  it('should check row exists', () => {
    rowSnippets.exists(INSTANCE_ID, TABLE_ID);
  });
  it('should mutate row with matched filter', () => {
    rowSnippets.filter(INSTANCE_ID, TABLE_ID);
  });
  it('should get row meta-data', () => {
    rowSnippets.getMetadata(INSTANCE_ID, TABLE_ID);
  });
  it('should increment row', () => {
    rowSnippets.increment(INSTANCE_ID, TABLE_ID);
  });
  it('should save row', () => {
    rowSnippets.save(INSTANCE_ID, TABLE_ID);
  });
});
