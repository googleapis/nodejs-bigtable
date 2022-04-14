import {describe, it} from 'mocha';
import {ClusterUtils} from '../../src/utils/cluster';
import * as assert from 'assert';

describe('Bigtable/Utils/Cluster', () => {
  describe('getRequestFromMetadata', () => {
    it('should translate metadata for a full set of parameters', () => {
      const metadata = {
        nodes: 1,
        minServeNodes: 2,
        maxServeNodes: 3,
        cpuUtilizationPercent: 50,
      };
      const name = 'cluster1';
      const location = 'projects/{{projectId}}/locations/us-east4-b';
      const reqOpts = ClusterUtils.getRequestFromMetadata(
        metadata,
        location,
        name
      );
      assert.deepStrictEqual(reqOpts, {
        cluster: {
          name: name,
          location: location,
          serveNodes: metadata.nodes,
          clusterConfig: {
            clusterAutoscalingConfig: {
              autoscalingLimits: {
                minServeNodes: metadata.minServeNodes,
                maxServeNodes: metadata.maxServeNodes,
              },
              autoscalingTargets: {
                cpuUtilizationPercent: metadata.cpuUtilizationPercent,
              },
            },
          },
        },
        updateMask: {
          paths: [
            'serve_nodes',
            'cluster_config.cluster_autoscaling_config.autoscaling_limits.min_serve_nodes',
            'cluster_config.cluster_autoscaling_config.autoscaling_limits.max_serve_nodes',
            'cluster_config.cluster_autoscaling_config.autoscaling_targets.cpu_utilization_percent',
          ],
        },
      });
    });
  });
});
