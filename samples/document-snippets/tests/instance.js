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
// const APP_PROFILE_ID = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const TABLE_ID = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules

const instanceSnippets = require('../instance.js');

describe('Instance Snippets', function() {
  after(function(done) {
    const instance = bigtable.instance(INSTANCE_ID);
    instance.delete(done);
  });

  it('should create an instance', function(done) {
    instanceSnippets.createInstance(INSTANCE_ID, CLUSTER_ID, err => {
      assert.ifError(err);
      done();
    });
  });

  // it('should create cluster', function(done) {
  //   instanceSnippets.createCluster(INSTANCE_ID, CLUSTER_ID, function(err, instance) {
  //     assert.ifError(err);
  //     done();
  //   });
  // });

  // it('should create an app-profile', function(done) {
  //   instanceSnippets.createAppProfile(INSTANCE_ID, APP_PROFILE_ID, function(err, appProfile) {
  //     assert.ifError(err);
  //     done();
  //   });
  // });

  it('should create table', function(done) {
    instanceSnippets.createTable(INSTANCE_ID, TABLE_ID, err => {
      assert.ifError(err);
      done();
    });
  });

  it('should check instance existance', function(done) {
    instanceSnippets.existsInstance(INSTANCE_ID, err => {
      assert.ifError(err);
      done();
    });
  });

  it('should get instance', function(done) {
    instanceSnippets.getInstance(INSTANCE_ID, err => {
      assert.ifError(err);
      done();
    });
  });

  it('should get Clusters', function(done) {
    instanceSnippets.getClusters(INSTANCE_ID, err => {
      assert.ifError(err);
      done();
    });
  });

  // it('should get appProfiles', function(done) {
  //   instanceSnippets.getAppProfiles(INSTANCE_ID, err => {
  //     assert.ifError(err);
  //     done();
  //   });
  // });

  it('should get MetaData', function(done) {
    instanceSnippets.getMetaData(INSTANCE_ID, err => {
      assert.ifError(err);
      done();
    });
  });

  it('should get tables', function(done) {
    instanceSnippets.getTables(INSTANCE_ID, err => {
      assert.ifError(err);
      done();
    });
  });

  it('should update instance', function(done) {
    instanceSnippets.updateInstance(INSTANCE_ID, err => {
      assert.ifError(err);
      done();
    });
  });

  it('should delete instance', function(done) {
    instanceSnippets.delInstance(INSTANCE_ID, err => {
      assert.ifError(err);
      done();
    });
  });
});
