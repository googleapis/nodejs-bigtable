import * as protos from '../../protos/protos';
import {
  BasicClusterConfig,
  ICluster,
  SetClusterMetadataOptions,
} from '../cluster';
import {google} from '../../protos/protos';

export class ClusterUtils {
  static noConfigError = `Must specify either serve_nodes or all of the autoscaling configurations (min_serve_nodes, max_serve_nodes, and cpu_utilization_percent).`;
  static allConfigError = `Cannot specify both serve_nodes and autoscaling configurations (min_serve_nodes, max_serve_nodes, and cpu_utilization_percent).`;
  static incompleteConfigError = `All of autoscaling configurations must be specified at the same time (min_serve_nodes, max_serve_nodes, and cpu_utilization_percent).`;

  static validateMetadata(
    metadata: SetClusterMetadataOptions | BasicClusterConfig
  ): void {
    if (metadata.nodes) {
      if (
        metadata.minServeNodes ||
        metadata.maxServeNodes ||
        metadata.cpuUtilizationPercent
      ) {
        throw new Error(this.allConfigError);
      }
    } else {
      if (
        metadata.minServeNodes ||
        metadata.maxServeNodes ||
        metadata.cpuUtilizationPercent
      ) {
        if (
          !(
            metadata.minServeNodes &&
            metadata.maxServeNodes &&
            metadata.cpuUtilizationPercent
          )
        ) {
          throw new Error(this.incompleteConfigError);
        }
      } else {
        throw new Error(this.noConfigError);
      }
    }
  }
  static getUpdateMask(metadata: SetClusterMetadataOptions): string[] {
    const updateMask: string[] = [];
    if (metadata.nodes) {
      updateMask.push('serve_nodes');
      if (
        !(
          metadata.minServeNodes ||
          metadata.maxServeNodes ||
          metadata.cpuUtilizationPercent
        )
      ) {
        updateMask.push('cluster_config.cluster_autoscaling_config');
      }
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
    return updateMask;
  }

  static getClusterBaseConfig(
    metadata: SetClusterMetadataOptions | BasicClusterConfig,
    location: string | undefined,
    name: string | undefined
  ): google.bigtable.admin.v2.ICluster {
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
    return Object.assign(
      {},
      name ? {name} : null,
      location ? {location} : null,
      clusterConfig ? {clusterConfig} : null,
      metadata.nodes ? {serveNodes: metadata.nodes} : null
    );
  }

  static getClusterFromMetadata(
    metadata: SetClusterMetadataOptions,
    location: string,
    name: string
  ): google.bigtable.admin.v2.ICluster {
    const cluster: ICluster = Object.assign(
      {},
      this.getClusterBaseConfig(metadata, location, name),
      metadata
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (cluster as any).nodes;
    delete (cluster as any).minServeNodes;
    delete (cluster as any).maxServeNodes;
    delete (cluster as any).cpuUtilizationPercent;
    return cluster;
  }

  static getRequestFromMetadata(
    metadata: SetClusterMetadataOptions,
    location: string,
    name: string
  ): protos.google.bigtable.admin.v2.IPartialUpdateClusterRequest {
    return {
      cluster: this.getClusterFromMetadata(metadata, location, name),
      updateMask: {paths: this.getUpdateMask(metadata)},
    };
  }
}
