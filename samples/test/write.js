// Copyright 2019 Google LLC
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
const {describe, it, before} = require('mocha');
const cp = require('child_process');
const uuid = require('uuid');
const {obtainTestInstance} = require('./util');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});
const TABLE_ID = `mobile-time-series-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules

describe('writes', async () => {
  let INSTANCE_ID;
  let table;

  before(async () => {
    const instance = await obtainTestInstance();
    INSTANCE_ID = instance.id;

    table = instance.table(TABLE_ID);

    await table.create().catch(console.error);
    await table.createFamily('stats_summary').catch(console.error);
  });

  it('should do a simple write', async () => {
    const stdout = execSync(`node writeSimple ${INSTANCE_ID} ${TABLE_ID}`);
    assert.match(stdout, /Successfully wrote row .*/);
  });

  it('should do a conditional write', () => {
    const stdout = execSync(
      `node writeConditionally ${INSTANCE_ID} ${TABLE_ID}`
    );
    assert.match(stdout, /Successfully updated row's os_name/);
  });

  it('should do an increment', () => {
    const stdout = execSync(`node writeIncrement ${INSTANCE_ID} ${TABLE_ID}`);
    assert.match(stdout, /Successfully updated row .*/);
  });

  it('should do a batch write', () => {
    const stdout = execSync(`node writeBatch ${INSTANCE_ID} ${TABLE_ID}`);
    assert.match(stdout, /Successfully wrote 2 rows: .*/);
  });
});
