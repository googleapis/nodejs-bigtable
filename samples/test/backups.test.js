// Copyright 2020 Google LLC
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

const {assert} = require('chai');
const {describe, it, before, after} = require('mocha');
const uuid = require('uuid');
const {execSync} = require('child_process');
const {Bigtable} = require('@google-cloud/bigtable');

const exec = cmd => execSync(cmd, {encoding: 'utf8'});

const bigtable = new Bigtable();

const instanceId = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const clusterId = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const tableId = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const backupId = `gcloud-tests-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const instance = bigtable.instance(instanceId);

describe('backups', () => {
  before(async () => {
    await instance.create({
      clusters: [
        {
          id: clusterId,
          location: 'us-central1-c',
          nodes: 3,
        },
      ],
    });

    const table = instance.table(tableId);
    await table.create();
    await table.createFamily('follows');
    await table.insert([
      {
        key: 'alincoln',
        data: {
          follows: {
            gwashington: 1,
          },
        },
      },
      {
        key: 'gwashington',
        data: {
          follows: {
            alincoln: 1,
          },
        },
      },
    ]);
  });

  after(() => instance.delete());

  it('should backup, restore, and delete the backup', () => {
    const output = exec(
      `node backups.js run --instance ${instanceId} --cluster ${clusterId} --table ${tableId} --backup ${backupId}`
    );
    assert.include(output, 'The backup finished being created');
    assert.include(output, backupId);
    assert.include(output, `Deleted backup with ID ${backupId}`);
  }).timeout(120 * 1000); // deleting backups is slow, the script does it twice, give it time.
});
