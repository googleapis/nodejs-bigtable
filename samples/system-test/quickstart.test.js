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

const proxyquire = require(`proxyquire`).noPreserveCache();
const sinon = require(`sinon`);
const test = require(`ava`);
const tools = require(`@google-cloud/nodejs-repo-tools`);
const uuid = require(`uuid`);

const bigtable = proxyquire(`@google-cloud/bigtable`, {})();
const clusterName = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const instanceName = `nodejs-bigtable-samples-${uuid.v4()}`.substr(0, 30); // Bigtable naming rules
const instance = bigtable.instance(instanceName);

test.before(tools.stubConsole);

test.after.always(async () => {
  tools.restoreConsole();
  try {
    await instance.delete();
  } catch (err) {} // ignore error
});

test.cb(`should create an instance`, t => {
  const expectedInstanceName = `my-new-instance`;

  const bigtableMock = {
    createInstance: (_instanceName, _instanceOpts) => {
      t.is(_instanceName, expectedInstanceName);
      t.not(_instanceOpts, undefined);
      t.is(_instanceOpts.clusters[0].name, 'my-cluster');
      t.is(_instanceOpts.clusters[0].location, 'us-central1-c');
      t.is(_instanceOpts.clusters[0].nodes, 3);

      _instanceOpts.clusters[0].name = clusterName;

      return instance.create(_instanceOpts).then(([instance]) => {
        t.not(instance, undefined);
        t.is(instance.id.split('/').pop(), instanceName);

        setTimeout(() => {
          try {
            t.true(console.log.calledOnce);
            t.deepEqual(console.log.firstCall.args, [
              `Instance ${expectedInstanceName} created.`,
            ]);
            t.end();
          } catch (err) {
            t.end(err);
          }
        }, 200);

        return [instance];
      });
    },
  };

  proxyquire(`../quickstart`, {
    '@google-cloud/bigtable': sinon.stub().returns(bigtableMock),
  });
});
