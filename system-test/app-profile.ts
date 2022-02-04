import {describe, it} from 'mocha';
import {generateId} from './common';
import {Bigtable} from '../src';
import {CreateAppProfileResponse} from '../src';
import * as inst from '../src/instance';
import assert = require('assert');
import {google} from '../protos/protos';
import AppProfile = google.bigtable.admin.v2.AppProfile;

describe('📦 App Profile', () => {
  describe('📦 Create a profile', () => {
    it('should create a profile with multiple clusters',async () => {
      const bigtable = new Bigtable();
      const clusterIds = [
        generateId('cluster'),
        generateId('cluster'),
        generateId('cluster')
      ]

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
        }
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
      const clusterSubset = clusterIds
        .slice(1, 3).map(clusterId => instance.cluster(clusterId));
      const options = {
        routing: clusterSubset,
      };
      await instance.createAppProfile(appProfileId, options);
      const appProfile = instance.appProfile(appProfileId);
      const getAppProfileResponse = await appProfile.get();
      const firstResponseItem = getAppProfileResponse[0];
      const responseClusterIds = firstResponseItem.metadata?.multiClusterRoutingUseAny?.clusterIds;
      assert.deepStrictEqual(
          responseClusterIds,
          clusterSubset.map(cluster => cluster.id)
      )
      await instance.delete();
    });
  });
});
