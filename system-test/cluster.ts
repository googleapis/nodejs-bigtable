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
import {ClusterUtils} from '../src/utils/cluster';

describe('Cluster', () => {
  const bigtable = new Bigtable();
  let instance: Instance;

  async function createNewInstance(clusters: ClusterInfo[]): Promise<void> {
    const instanceId: string = generateId('instance');
    instance = bigtable.instance(instanceId);
    const [, operation] = await instance.create({
      clusters,
      labels: {
        time_created: Date.now(),
      },
    });
    await operation.promise();
  }
  async function createStandardNewInstance(
    clusterId: string,
    nodes: number
  ): Promise<void> {
    return await createNewInstance(standardCreationClusters(clusterId, nodes));
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
  afterEach(async () => {
    await instance.delete();
  });
  describe('Create cluster', () => {
    describe('With manual scaling', () => {
      let clusterId: string;
      let cluster: Cluster;
      async function checkMetadata(localCluster: Cluster, nodes: number) {
        const metadata: GetClusterMetadataResponse =
          await localCluster.getMetadata({});
        assert.strictEqual(metadata[0].serveNodes, nodes);
      }
      beforeEach(async () => {
        clusterId = generateId('cluster');
        cluster = instance.cluster(clusterId);
        await createStandardNewInstance(clusterId, 2);
      });
      it('Create an instance with clusters for manual scaling', async () => {
        await checkMetadata(cluster, 2);
      });
      it('Create an instance and then create a cluster for manual scaling', async () => {
        const clusterId2: string = generateId('cluster');
        const cluster2 = instance.cluster(clusterId2);
        await cluster2.create({
          location: 'us-west1-c',
          nodes: 3,
        });
        await checkMetadata(cluster2, 3);
      });
      describe('Using an incorrect configuration', () => {
        let cluster2: Cluster;
        beforeEach(async () => {
          const clusterId2: string = generateId('cluster');
          cluster2 = instance.cluster(clusterId2);
        });
        it('Without providing any cluster configuration', async () => {
          try {
            await cluster2.create({
              location: 'us-west1-c',
              nodes: 3,
            });
            assert.fail();
          } catch (e) {
            assert.equal(e.message, ClusterUtils.noConfigError);
          }
        });
        it('By providing too much cluster configurations', async () => {
          try {
            await cluster2.create({
              location: 'us-west1-c',
              nodes: 2,
              minServeNodes: 3,
            });
            assert.fail();
          } catch (e) {
            assert.equal(e.message, ClusterUtils.allConfigError);
          }
        });
        it('Without providing all autoscaling configurations', async () => {
          try {
            await cluster2.create({
              location: 'us-west1-c',
              minServeNodes: 3,
              cpuUtilizationPercent: 51,
            });
            assert.fail();
          } catch (e) {
            assert.equal(e.message, ClusterUtils.incompleteConfigError);
          }
        });
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
        await createNewInstance([
          Object.assign({id: clusterId}, createClusterOptions),
        ]);
        await checkMetadata(instance, clusterId);
      });
      it('Create an instance and then create clusters for automatic scaling', async () => {
        const clusterId: string = generateId('cluster');
        await createStandardNewInstance(clusterId, 2);
        const clusterId2: string = generateId('cluster');
        const cluster: Cluster = instance.cluster(clusterId2);
        await cluster.create(createClusterOptions);
        await checkMetadata(instance, clusterId2);
      });
    });
  });
  describe('Update cluster', () => {
    describe('Starting from manual scaling', () => {
      let cluster: Cluster;
      const startingNodes = 2;

      beforeEach(async () => {
        const clusterId = generateId('cluster');
        await createStandardNewInstance(clusterId, startingNodes);
        cluster = instance.cluster(clusterId);
      });

      it('Change nodes for manual scaling', async () => {
        const updateNodes = 5;
        assert.notEqual(startingNodes, updateNodes);
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
      describe('Using an incorrect configuration', () => {
        it('Without providing any cluster configuration', async () => {
          try {
            await cluster.setMetadata({});
            assert.fail();
          } catch (e) {
            assert.equal(e.message, ClusterUtils.noConfigError);
          }
        });
        it('By providing too much cluster configurations', async () => {
          try {
            await cluster.setMetadata({
              nodes: 2,
              minServeNodes: 3,
            });
            assert.fail();
          } catch (e) {
            assert.equal(e.message, ClusterUtils.allConfigError);
          }
        });
        it('Without providing all autoscaling configurations', async () => {
          try {
            await cluster.setMetadata({
              minServeNodes: 3,
              cpuUtilizationPercent: 51,
            });
            assert.fail();
          } catch (e) {
            assert.equal(e.message, ClusterUtils.incompleteConfigError);
          }
        });
      });
    });
    describe('Starting from autoscaling', () => {
      let cluster: Cluster;

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
        const clusterId = generateId('cluster');
        await createNewInstance([
          Object.assign({id: clusterId}, createClusterOptions),
        ]);
        cluster = instance.cluster(clusterId);
      });

      it('Change cluster to manual scaling', async () => {
        const updateNodes = 5;
        await cluster.setMetadata({
          nodes: updateNodes,
        });
        const metadata = await cluster.getMetadata({});
        const {clusterConfig, serveNodes} = metadata[0];
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
