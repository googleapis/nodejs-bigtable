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
const uuid = require(`uuid`);

const Bigtable = require(`@google-cloud/bigtable`);
const bigtable = new Bigtable();

const INSTANCE_ID = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const CLUSTER_ID = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const TABLE_ID = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const FAMILY_ID = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules

const familySnippets = require('../family.js');

const instance = bigtable.instance(INSTANCE_ID);

describe.only('Family Snippets', function() {
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

  it('should create a column family', function(done) {
    familySnippets.createColmFamily(INSTANCE_ID, TABLE_ID, FAMILY_ID, done);
  });

  it('should check family exists', function(done) {
    familySnippets.existsFamily(INSTANCE_ID, TABLE_ID, FAMILY_ID, done);
  });

  it('should get the family', function(done) {
    familySnippets.getFamily(INSTANCE_ID, TABLE_ID, FAMILY_ID, done);
  });

  it('should get family meta-data', function(done) {
    familySnippets.getMetaData(INSTANCE_ID, TABLE_ID, FAMILY_ID, done);
  });

  it('should set family meta-data', function(done) {
    familySnippets.setMetaData(INSTANCE_ID, TABLE_ID, FAMILY_ID, done);
  });

  it('should delete family', function(done) {
    familySnippets.delFamily(INSTANCE_ID, TABLE_ID, FAMILY_ID, done);
  });
});
