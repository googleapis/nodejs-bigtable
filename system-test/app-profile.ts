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
import {Bigtable} from '../src';
import assert = require('assert');

describe('📦 App Profile', () => {
  describe('📦 Create a profile', () => {
    it('should create a profile with multiple clusters', async () => {
      const bigtable = new Bigtable();
      const clusterIds = [
        generateId('cluster'),
        generateId('cluster'),
        generateId('cluster'),
      ];

      // This is for creating a Bigtable instance.
      const instanceId = generateId('instance');
      const instance = bigtable.instance(instanceId);
      const instanceClusters = [
        {
          id: clusterIds[0],
          location: 'us-east1-c',
          nodes: 1,
        },
        {
          id: clusterIds[1],
          location: 'us-central1-b',
          nodes: 1,
        },
        {
          id: clusterIds[2],
          location: 'us-west1-b',
          nodes: 1,
        },
      ];
      const [, operation] = await instance.create({
        clusters: instanceClusters,
        labels: {
          time_created: Date.now(),
        },
      });
      await operation.promise();

      // This is for creating an app profile.
      const appProfileId = generateId('app-profile');
      const options = {
        routing: [
          instance.cluster(clusterIds[1]),
          instance.cluster(clusterIds[2]),
        ],
      };
      await instance.createAppProfile(appProfileId, options);
      const appProfile = instance.appProfile(appProfileId);
      const getAppProfileResponse = await appProfile.get();
      const firstResponseItem = getAppProfileResponse[0];
      const responseClusterIds =
        firstResponseItem.metadata?.multiClusterRoutingUseAny?.clusterIds;
      assert.deepStrictEqual(
        responseClusterIds,
        options.routing.map(cluster => cluster.id)
      );
      await instance.delete();
    });
  });
});
