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
import {Bigtable, ClusterInfo, Instance} from '../src';
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
    it('📦 Create an instance with clusters for manual scaling', async () => {
      const clusterId = generateId('cluster');
      const nodes = 2;
      const instance: Instance = await getNewInstance([
        {
          id: clusterId,
          location: 'us-east1-c',
          nodes,
        },
      ]);
      const cluster = instance.cluster(clusterId);
      const metadata = await cluster.getMetadata({});
      assert.strictEqual(metadata[0].serveNodes, nodes);
      await instance.delete();
    });
    // it('📦 Create an instance and then create clusters for manual scaling', () => {
    //   const clusterId = generateId('cluster');
    //   const nodes = 2;
    //   const instance: Instance = await getNewInstance([
    //     {
    //       id: clusterId,
    //       location: 'us-east1-c',
    //       nodes,
    //     },
    //   ]);
    //   const cluster = instance.cluster(clusterId);
    //   const metadata = await cluster.getMetadata({});
    //   assert.strictEqual(metadata[0].serveNodes, nodes);
    //   await instance.delete();
    // });
    it.only('📦 Create an instance with clusters for automatic scaling', async () => {
      const clusterId = generateId('cluster');
      const minServeNodes = 2;
      const maxServeNodes = 4;
      const cpuUtilizationPercent = 50;
      const instance: Instance = await getNewInstance([
        {
          id: clusterId,
          location: 'us-east1-c',
          minServeNodes,
          maxServeNodes,
          cpuUtilizationPercent,
        },
      ]);
      const cluster = instance.cluster(clusterId);
      const metadata = await cluster.getMetadata({});
      // assert.strictEqual(metadata[0].serveNodes, nodes);
      await instance.delete();
    });
    // describe('📦 Create an instance with clusters for manual scaling', () => {
    //   let instance: Instance;
    //   await instance.delete();
    // });
  });
});
