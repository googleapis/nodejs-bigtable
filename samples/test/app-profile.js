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
const APP_PROFILE_ID = 'my-app-profile';

const appProfileSnippets = require('./app-profile.js');

const instance = bigtable.instance(INSTANCE_ID);

describe.skip('App Profile Snippets', () => {
  before(async () => {
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
  });

  after(() => {
    instance.exists().then(result => {
      const exists = result[0];
      if (exists) {
        instance.delete();
      }
    });
  });

  it('should create an app-profile', () => {
    appProfileSnippets.create(INSTANCE_ID, APP_PROFILE_ID);
  });

  it('should check app-profile exists', () => {
    appProfileSnippets.exists(INSTANCE_ID, APP_PROFILE_ID);
  });

  it('should get the app-profile', () => {
    appProfileSnippets.get(INSTANCE_ID, APP_PROFILE_ID);
  });

  it('should get app-profile metadata', () => {
    appProfileSnippets.getMeta(INSTANCE_ID, APP_PROFILE_ID);
  });

  it('should set app-profile metadata', () => {
    appProfileSnippets.setMeta(INSTANCE_ID, APP_PROFILE_ID, CLUSTER_ID);
  });

  it('should delete an app-profile', () => {
    appProfileSnippets.delete(INSTANCE_ID, APP_PROFILE_ID);
  });
});
