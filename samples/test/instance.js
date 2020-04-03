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
const {describe, it, after} = require('mocha');
const {Bigtable} = require('@google-cloud/bigtable');
const bigtable = new Bigtable();

const INSTANCE_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const CLUSTER_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
// const APP_PROFILE_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const TABLE_ID = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules

const instanceSnippets = require('./instance.js');

describe.skip('Instance Snippets', () => {
  after(async () => {
    try {
      const instance = await bigtable.instance(INSTANCE_ID);
      const [exists] = await instance.exists();
      if (exists) {
        instance.delete();
      }
    } catch (err) {
      // Handle the error.
    }
  });

  it('should create an instance', () => {
    instanceSnippets.createInstance(INSTANCE_ID, CLUSTER_ID);
  });

  // it('should create cluster', () => {
  //   instanceSnippets.createCluster(INSTANCE_ID, CLUSTER_ID);
  // });

  // it('should create an app-profile', done => {
  //   instanceSnippets.createAppProfile(INSTANCE_ID, APP_PROFILE_ID, done);
  // });

  it('should create table', () => {
    instanceSnippets.createTable(INSTANCE_ID, TABLE_ID);
  });

  it('should check instance existance', () => {
    instanceSnippets.existsInstance(INSTANCE_ID);
  });

  it('should get instance', () => {
    instanceSnippets.getInstance(INSTANCE_ID);
  });

  it('should get Clusters', () => {
    instanceSnippets.getClusters(INSTANCE_ID);
  });

  // it('should get appProfiles', () => {
  //   instanceSnippets.getAppProfiles(INSTANCE_ID);
  // });

  it('should get metadata', () => {
    instanceSnippets.getMetadata(INSTANCE_ID);
  });

  it('should get tables', () => {
    instanceSnippets.getTables(INSTANCE_ID);
  });

  it('should update instance', () => {
    instanceSnippets.updateInstance(INSTANCE_ID);
  });

  it('should delete instance', () => {
    instanceSnippets.delInstance(INSTANCE_ID);
  });
});
