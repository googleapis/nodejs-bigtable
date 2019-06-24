/**
 * Copyright 2019, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {assert} = require('chai');
const cp = require('child_process');
const Bigtable = require('@google-cloud/bigtable');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const INSTANCE_ID = `nodejs-bigtable-samples-keepme`;
const TABLE_ID = 'mobile-time-series';

describe('writes', async () => {
  const bigtable = Bigtable();
  const instance = bigtable.instance(INSTANCE_ID);
  let table;

  before(async () => {
    table = instance.table(TABLE_ID);

    await table.create().catch(console.error);
    await table.createFamily('stats_summary').catch(console.error);
  });

  after(async () => {
    await table.delete().catch(console.error);
  });

  it('should do a simple write', async () => {
    const stdout = execSync(`node writeSimple ${INSTANCE_ID}`);
    assert.match(stdout, /Successfully wrote row .*/);
  });

  it('should do a conditional write', function() {
    const stdout = execSync(`node writeConditionally ${INSTANCE_ID}`);
    assert.match(stdout, /Successfully updated row's os_name/);
  });

  it('should do an increment', function() {
    const stdout = execSync(`node writeIncrement ${INSTANCE_ID}`);
    assert.match(stdout, /Successfully updated row .*/);
  });

  it('should do a batch write', function() {
    const stdout = execSync(`node writeBatch ${INSTANCE_ID}`);
    assert.match(stdout, /Successfully wrote 2 rows: .*/);
  });
});
