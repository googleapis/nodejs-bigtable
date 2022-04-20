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

import {describe, it, before, after} from 'mocha';
import {generateId} from './common';
import {
  Bigtable,
  ClusterInfo,
  Instance,
  Cluster,
  GetClusterMetadataResponse,
} from '../src';
import assert = require('assert');

describe('Cluster', () => {
  const bigtable = new Bigtable();

  async function getNewInstance(clusters: ClusterInfo[]): Promise<Instance> {
    const instanceId: string = generateId('instance');
    const instance: Instance = bigtable.instance(instanceId);
    const [, operation] = await instance.create({
      clusters,
      labels: {
        time_created: Date.now(),
      },
    });
    await operation.promise();
    return instance;
  }

  describe('Create cluster', () => {
    function standardCreationClusters(clusterId: string, nodes: number) {
      return [
        {
          id: clusterId,
          location: 'us-east1-c',
          nodes,
        },
      ];
    }
    describe('With manual scaling', () => {
      async function checkMetadata(
        instance: Instance,
        clusterId: string,
        nodes: number
      ) {
        const cluster: Cluster = instance.cluster(clusterId);
        const metadata: GetClusterMetadataResponse = await cluster.getMetadata(
          {}
        );
        assert.strictEqual(metadata[0].serveNodes, nodes);
      }
      it('Create an instance with clusters for manual scaling', async () => {
        const clusterId: string = generateId('cluster');
        const instance: Instance = await getNewInstance(
          standardCreationClusters(clusterId, 2)
        );
        await checkMetadata(instance, clusterId, 2);
        await instance.delete();
      });
      it('Create an instance and then create clusters for manual scaling', async () => {
        const clusterId: string = generateId('cluster');
        const instance: Instance = await getNewInstance(
          standardCreationClusters(clusterId, 2)
        );
        const clusterId2: string = generateId('cluster');
        const cluster: Cluster = instance.cluster(clusterId2);
        await cluster.create({
          location: 'us-west1-c',
          nodes: 3,
        });
        await checkMetadata(instance, clusterId2, 3);
        await instance.delete();
      });
    });
    describe('With automatic scaling', () => {
      const minServeNodes = 2;
      const maxServeNodes = 4;
      const cpuUtilizationPercent = 50;

      async function checkMetadata(
        instance: Instance,
        clusterId: string
      ): Promise<void> {
        const cluster: Cluster = instance.cluster(clusterId);
        const metadata = await cluster.getMetadata({});
        const clusterConfig = metadata[0].clusterConfig;
        const clusterAutoscalingConfig =
          clusterConfig?.clusterAutoscalingConfig;
        const autoscalingLimits = clusterAutoscalingConfig?.autoscalingLimits;
        const autoscalingTargets = clusterAutoscalingConfig?.autoscalingTargets;
        assert.strictEqual(autoscalingLimits?.minServeNodes, minServeNodes);
        assert.strictEqual(autoscalingLimits?.maxServeNodes, maxServeNodes);
        assert.strictEqual(
          autoscalingTargets?.cpuUtilizationPercent,
          cpuUtilizationPercent
        );
      }

      it('Create an instance with clusters for automatic scaling', async () => {
        const clusterId = generateId('cluster');
        const instance: Instance = await getNewInstance([
          {
            id: clusterId,
            location: 'us-east1-c',
            minServeNodes,
            maxServeNodes,
            cpuUtilizationPercent,
          },
        ]);
        await checkMetadata(instance, clusterId);
        await instance.delete();
      });
      // it('Create an instance with clusters for manual scaling', () => {
      //   let instance: Instance;
      //   await instance.delete();
      // });
    });
  });
});
