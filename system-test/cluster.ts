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

import {beforeEach, describe, it} from 'mocha';
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
  async function getStandardNewInstance(
    clusterId: string,
    nodes: number
  ): Promise<Instance> {
    return await getNewInstance(standardCreationClusters(clusterId, nodes));
  }
  function standardCreationClusters(
    clusterId: string,
    nodes: number
  ): ClusterInfo[] {
    return [
      {
        id: clusterId,
        location: 'us-east1-c',
        nodes,
      },
    ];
  }
  describe('Create cluster', () => {
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
        const instance: Instance = await getStandardNewInstance(clusterId, 2);
        await checkMetadata(instance, clusterId, 2);
        await instance.delete();
      });
      it('Create an instance and then create clusters for manual scaling', async () => {
        const clusterId: string = generateId('cluster');
        const instance: Instance = await getStandardNewInstance(clusterId, 2);
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
      const createClusterOptions = {
        location: 'us-west1-c',
        minServeNodes,
        maxServeNodes,
        cpuUtilizationPercent,
      };
      it('Create an instance with clusters for automatic scaling', async () => {
        const clusterId = generateId('cluster');
        const instance: Instance = await getNewInstance([
          Object.assign({id: clusterId}, createClusterOptions),
        ]);
        await checkMetadata(instance, clusterId);
        await instance.delete();
      });
      it('Create an instance and then create clusters for automatic scaling', async () => {
        const clusterId: string = generateId('cluster');
        const instance: Instance = await getStandardNewInstance(clusterId, 2);
        const clusterId2: string = generateId('cluster');
        const cluster: Cluster = instance.cluster(clusterId2);
        await cluster.create(createClusterOptions);
        await checkMetadata(instance, clusterId2);
        await instance.delete();
      });
    });
  });
  describe('Update cluster', () => {
    describe('Starting from manual scaling', () => {
      let clusterId: string;
      let instance: Instance;
      const startingNodes = 2;

      beforeEach(async () => {
        clusterId = generateId('cluster');
        instance = await getStandardNewInstance(clusterId, startingNodes);
      });

      it('Change nodes for manual scaling', async () => {
        const updateNodes = 5;
        assert.notEqual(startingNodes, updateNodes);
        const cluster: Cluster = instance.cluster(clusterId);
        await cluster.setMetadata({nodes: updateNodes});
        const metadata = await cluster.getMetadata({});
        const {clusterConfig, serveNodes} = metadata[0];
        assert.strictEqual(serveNodes, updateNodes);
        assert.strictEqual(clusterConfig, undefined);
      });
      it('Change cluster to autoscaling', async () => {
        const minServeNodes = 3;
        const maxServeNodes = 4;
        const cpuUtilizationPercent = 50;
        const cluster: Cluster = instance.cluster(clusterId);
        await cluster.setMetadata({
          minServeNodes,
          maxServeNodes,
          cpuUtilizationPercent,
        });
        const metadata = await cluster.getMetadata({});
        const {clusterConfig, serveNodes} = metadata[0];
        assert.strictEqual(serveNodes, startingNodes);
        assert.deepStrictEqual(clusterConfig, {
          clusterAutoscalingConfig: {
            autoscalingLimits: {
              minServeNodes,
              maxServeNodes,
            },
            autoscalingTargets: {
              cpuUtilizationPercent,
            },
          },
        });
      });
    });
    describe('Starting from autoscaling', () => {
      let clusterId: string;
      let instance: Instance;

      const minServeNodes = 3;
      const maxServeNodes = 4;
      const cpuUtilizationPercent = 50;
      const createClusterOptions = {
        location: 'us-west1-c',
        minServeNodes,
        maxServeNodes,
        cpuUtilizationPercent,
      };

      beforeEach(async () => {
        clusterId = generateId('cluster');
        instance = await getNewInstance([
          Object.assign({id: clusterId}, createClusterOptions),
        ]);
      });

      it('Change cluster to manual scaling', async () => {
        const updateNodes = 5;
        const cluster: Cluster = instance.cluster(clusterId);
        await cluster.setMetadata({
          nodes: updateNodes,
        });
        const metadata = await cluster.getMetadata({});
        const {clusterConfig, serveNodes} = metadata[0];
        // TODO: This test failing indicates that we must disable autoscaling somehow
        assert.strictEqual(serveNodes, updateNodes);
        assert.strictEqual(clusterConfig, undefined);
      });
      it('Change autoscaling properties', async () => {
        const newMinServeNodes = 5;
        const newMaxServeNodes = 6;
        const newCpuUtilizationPercent = 53;
        assert.notEqual(minServeNodes, newMinServeNodes);
        assert.notEqual(maxServeNodes, newMaxServeNodes);
        assert.notEqual(cpuUtilizationPercent, newCpuUtilizationPercent);
        const cluster: Cluster = instance.cluster(clusterId);
        await cluster.setMetadata({
          minServeNodes: newMinServeNodes,
          maxServeNodes: newMaxServeNodes,
          cpuUtilizationPercent: newCpuUtilizationPercent,
        });
        const metadata = await cluster.getMetadata({});
        const {clusterConfig, serveNodes} = metadata[0];
        assert.strictEqual(serveNodes, minServeNodes);
        assert.deepStrictEqual(clusterConfig, {
          clusterAutoscalingConfig: {
            autoscalingLimits: {
              minServeNodes: newMinServeNodes,
              maxServeNodes: newMaxServeNodes,
            },
            autoscalingTargets: {
              cpuUtilizationPercent: newCpuUtilizationPercent,
            },
          },
        });
      });
    });
  });
});
