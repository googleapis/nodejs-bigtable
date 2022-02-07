// Copyright 2022 Google LLC
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

import {describe, it} from 'mocha';
import {generateId} from './common';
import {AppProfileOptions, Bigtable, Instance} from '../src';
import {AppProfile} from '../src';
import assert = require('assert');

describe('📦 App Profile', () => {
  const bigtable = new Bigtable();

  // Creates an app profile and returns information containing the app profile response.
  async function createProfile(instance: Instance, appProfileId: string, options: AppProfileOptions) : Promise<AppProfile> {
    await instance.createAppProfile(appProfileId, options);
    const appProfile = instance.appProfile(appProfileId);
    const getAppProfileResponse = await appProfile.get();
    return getAppProfileResponse[0];
  }

  describe('📦 Create a profile', () => {
    let instance: Instance
    let clusterIds: string[]

    before(async () => {
      // Creates an instance with clusters
      const instanceClusters = ['us-east1-c', 'us-central1-b', 'us-west1-b']
          .map(location => {
            return {
              id: generateId('cluster'),
              location,
            };
          })
      clusterIds = instanceClusters.map(cluster => cluster.id);
      const instanceId = generateId('instance');
      instance = bigtable.instance(instanceId);
      const [, operation] = await instance.create({
        clusters: instanceClusters.map(cluster => {
            return {
              ...cluster,
            nodes: 1
          }
        }),
        labels: {
          time_created: Date.now(),
        },
      });
      await operation.promise();
    })

    it('should create a profile with multiple clusters', async () => {
      // Creates an app profile
      const appProfileId = generateId('app-profile');
      const options = {
        routing: new Set([
          instance.cluster(clusterIds[1]),
          instance.cluster(clusterIds[2]),
        ]),
      };
      const firstResponseItem = await createProfile(instance, appProfileId, options)
      assert.deepStrictEqual(
          new Set(firstResponseItem.metadata?.multiClusterRoutingUseAny?.clusterIds),
          new Set([...options.routing].map(cluster => cluster.id))
      );
      await instance.delete();
    });
  });
});
