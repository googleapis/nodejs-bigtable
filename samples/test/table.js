// Copyright 2016 Google LLC
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

const tableSnippets = require('./table.js');

const instance = bigtable.instance(INSTANCE_ID);

describe.skip('Table Snippets', () => {
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
    } catch (err) {
      // Handle the error.
    }
  });

  after(async () => {
    await instance.delete().catch(console.error);
  });

  it('should create a table', () => {
    tableSnippets.createTable(INSTANCE_ID, TABLE_ID);
  });

  it('should check table exists', () => {
    tableSnippets.existsTable(INSTANCE_ID, TABLE_ID);
  });

  it('should get the table', () => {
    tableSnippets.getTable(INSTANCE_ID, TABLE_ID);
  });

  it('should get table metadata', () => {
    tableSnippets.getMetadata(INSTANCE_ID, TABLE_ID);
  });

  it('should create family', () => {
    tableSnippets.createFamily(INSTANCE_ID, TABLE_ID, 'follows');
  });

  it('should get families', () => {
    tableSnippets.getFamilies(INSTANCE_ID, TABLE_ID);
  });

  it('should insert row', () => {
    tableSnippets.insertRows(INSTANCE_ID, TABLE_ID);
  });

  it('should get rows', () => {
    tableSnippets.getRows(INSTANCE_ID, TABLE_ID);
  });

  it('should mutate table', () => {
    tableSnippets.mutate(INSTANCE_ID, TABLE_ID);
  });

  it('should create a read-stream', () => {
    tableSnippets.createReadStream(INSTANCE_ID, TABLE_ID);
  });

  it('should create sample row-keys', () => {
    tableSnippets.sampleRowKeys(INSTANCE_ID, TABLE_ID);
  });

  // it('should delete rows', () => {
  //   tableSnippets.delRows(INSTANCE_ID, TABLE_ID);
  // });

  it('should delete table', () => {
    tableSnippets.delTable(INSTANCE_ID, TABLE_ID);
  });
});
