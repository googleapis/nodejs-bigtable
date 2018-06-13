/**
 * Copyright 2017, Google, Inc.
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

const path = require(`path`);
const test = require(`ava`);
const tools = require(`@google-cloud/nodejs-repo-tools`);
const uuid = require(`uuid`);

const Bigtable = require(`@google-cloud/bigtable`);
const bigtable = new Bigtable();
const clusterId = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const instanceId = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const instance = bigtable.instance(instanceId);

const cwd = path.join(__dirname, `..`);
const cmd = `node instances.js`;

test.before(tools.checkCredentials);
test.before(async () => {
  await instance.create({
    clusters: [
      {
        id: clusterId,
        location: 'us-central1-c',
        nodes: 3,
      },
    ],
  });
});

test.after.always(async () => {
  try {
    await instance.delete();
  } catch (err) {} // ignore error
});

test(`should list zones`, async t => {
  t.plan(0);
  await tools
    .tryTest(async assert => {
      const output = await tools.runAsync(
        `${cmd} run --instance ${instanceId}`,
        cwd
      );
      assert(output.includes(`Instances:`));
      assert(output.includes(instanceId));
    })
    .start();
});
