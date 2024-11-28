// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {describe, before, after} from 'mocha';
import Q from 'p-queue';

import {Bigtable, Instance} from '../src';
import {generateId, PREFIX} from './common';
import * as assert from 'assert';
import {ServiceError} from 'google-gax';

const v2 = Symbol.for('v2');

describe.only('CloseClientAfterInitialization', () => {
  const instanceId = generateId('instance');
  const bigtable = new Bigtable();
  const INSTANCE = bigtable.instance(instanceId);
  const TABLE = INSTANCE.table(generateId('table'));
  const APP_PROFILE_ID = generateId('appProfile');
  const CLUSTER_ID = generateId('cluster');

  async function reapBackups(instance: Instance) {
    const [backups] = await instance.getBackups();
    const q = new Q({concurrency: 5});
    return Promise.all(
      backups.map(backup => {
        q.add(async () => {
          try {
            await backup.delete({timeout: 50 * 1000});
          } catch (e) {
            console.log(`Error deleting backup: ${backup.id}`);
          }
        });
      })
    );
  }

  async function reapInstances() {
    const [instances] = await bigtable.getInstances();
    const testInstances = instances
      .filter(i => i.id.match(PREFIX))
      .filter(i => {
        const timeCreated = i.metadata!.labels!.time_created as {} as Date;
        // Only delete stale resources.
        const oneHourAgo = new Date(Date.now() - 3600000);
        return !timeCreated || timeCreated <= oneHourAgo;
      });
    const q = new Q({concurrency: 5});
    // need to delete backups first due to instance deletion precondition
    await Promise.all(testInstances.map(instance => reapBackups(instance)));
    await Promise.all(
      testInstances.map(instance => {
        q.add(async () => {
          try {
            await instance.delete();
          } catch (e) {
            console.log(`Error deleting instance: ${instance.id}`);
          }
        });
      })
    );
  }

  before(async () => {
    await reapInstances();
    const [, operation] = await INSTANCE.create(
      createInstanceConfig(CLUSTER_ID, 'us-central1-c', 3, Date.now())
    );

    await operation.promise();
    await TABLE.create({
      families: ['follows', 'traits'],
    });
    await INSTANCE.createAppProfile(APP_PROFILE_ID, {
      routing: 'any',
      ignoreWarnings: true,
    });
  });

  after(async () => {
    const secondBigtable = new Bigtable();
    const SECOND_INSTANCE = secondBigtable.instance(instanceId);
    const q = new Q({concurrency: 5});
    const instances = [SECOND_INSTANCE];

    // need to delete backups first due to instance deletion precondition
    await Promise.all(instances.map(instance => reapBackups(instance)));
    await Promise.all(
      instances.map(instance => {
        q.add(async () => {
          try {
            await instance.delete();
          } catch (e) {
            console.log(`Error deleting instance: ${instance.id}`);
          }
        });
      })
    );
  });

  it('Calling close and then sampleRowKeys should tell us the client is closed after client initialization', async () => {
    await TABLE.sampleRowKeys(); // Initialize the client.
    // await (bigtable as any)[v2].close();
    // await bigtable.api.BigtableClient.close();
    await bigtable.close();
    try {
      await TABLE.sampleRowKeys();
      assert.fail('This call should have resulted in a client closed error');
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        'The client has already been closed.'
      );
    }
  });
});

function createInstanceConfig(
  clusterId: string,
  location: string,
  nodes: number,
  time_created: number
) {
  return {
    clusters: [
      {
        id: clusterId,
        location: location,
        nodes: nodes,
      },
    ],
    labels: {
      time_created: time_created,
    },
  };
}
