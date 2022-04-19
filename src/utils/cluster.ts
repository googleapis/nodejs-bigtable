import * as protos from '../../protos/protos';
import {ICluster, SetClusterMetadataOptions} from '../cluster';

export class ClusterUtils {
  static getRequestFromMetadata(
    metadata: SetClusterMetadataOptions,
    location: string,
    name: string
  ): protos.google.bigtable.admin.v2.IPartialUpdateClusterRequest {
    let clusterConfig;
    if (
      metadata.cpuUtilizationPercent ||
      metadata.minServeNodes ||
      metadata.maxServeNodes
    ) {
      clusterConfig = {
        clusterAutoscalingConfig: {
          autoscalingTargets: {
            cpuUtilizationPercent: metadata.cpuUtilizationPercent,
          },
          autoscalingLimits: {
            minServeNodes: metadata.minServeNodes,
            maxServeNodes: metadata.maxServeNodes,
          },
        },
      };
    }
    const cluster: ICluster = Object.assign(
      {},
      {
        name,
        location,
        serveNodes: metadata.nodes,
        clusterConfig: clusterConfig,
      },
      metadata
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (cluster as any).nodes;
    delete (cluster as any).minServeNodes;
    delete (cluster as any).maxServeNodes;
    delete (cluster as any).cpuUtilizationPercent;
    const updateMask: string[] = [];
    if (metadata.nodes) {
      updateMask.push('serve_nodes');
    }
    if (metadata.minServeNodes) {
      updateMask.push(
        'cluster_config.cluster_autoscaling_config.autoscaling_limits.min_serve_nodes'
      );
    }
    if (metadata.maxServeNodes) {
      updateMask.push(
        'cluster_config.cluster_autoscaling_config.autoscaling_limits.max_serve_nodes'
      );
    }
    if (metadata.cpuUtilizationPercent) {
      updateMask.push(
        'cluster_config.cluster_autoscaling_config.autoscaling_targets.cpu_utilization_percent'
      );
    }
    return {
      cluster,
      updateMask: {paths: updateMask},
    };
  }
}
