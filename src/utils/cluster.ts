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

import * as protos from '../../protos/protos';
import {
  BasicClusterConfig,
  Cluster,
  CreateClusterOptions,
  ICluster,
  SetClusterMetadataOptions,
} from '../cluster';
import {google} from '../../protos/protos';
import {ClusterInfo} from '../instance';

export class ClusterUtils {
  static noConfigError =
    'Must specify either serve_nodes or all of the autoscaling configurations (min_serve_nodes, max_serve_nodes, and cpu_utilization_percent).';
  static allConfigError =
    'Cannot specify both serve_nodes and autoscaling configurations (min_serve_nodes, max_serve_nodes, and cpu_utilization_percent).';
  static incompleteConfigError =
    'All of autoscaling configurations must be specified at the same time (min_serve_nodes, max_serve_nodes, and cpu_utilization_percent).';

  static validateClusterMetadata(metadata: BasicClusterConfig): void {
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

  static getClusterBaseConfigWithFullLocation(
    metadata: BasicClusterConfig,
    projectId: string,
    name: string | undefined
  ): google.bigtable.admin.v2.ICluster {
    const metadataClone = Object.assign({}, metadata);
    if (metadataClone.location) {
      metadataClone.location = Cluster.getLocation_(
        projectId,
        metadataClone.location
      );
    }
    return ClusterUtils.getClusterAdvancedConfig(metadataClone, name);
  }

  static getClusterAdvancedConfig(
    metadata: BasicClusterConfig,
    name: string | undefined
  ): google.bigtable.admin.v2.ICluster {
    const baseConfig = ClusterUtils.getClusterBaseConfig(metadata, name);
    return Object.assign(
      baseConfig,
      metadata.key ? {encryptionConfig: {kmsKeyName: metadata.key}} : null,
      metadata.encryption ? {encryptionConfig: metadata.encryption} : null
    );
  }

  static getClusterBaseConfig(
    metadata: BasicClusterConfig,
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
    const location = metadata?.location;
    return Object.assign(
      {},
      name ? {name} : null,
      location ? {location} : null,
      clusterConfig ? {clusterConfig} : null,
      metadata.nodes ? {serveNodes: metadata.nodes} : null
    );
  }

  static getClusterFromMetadata(
    metadata: BasicClusterConfig,
    name: string
  ): google.bigtable.admin.v2.ICluster {
    const cluster: ICluster | SetClusterMetadataOptions = Object.assign(
      {},
      this.getClusterBaseConfig(metadata, name),
      metadata
    );
    delete (cluster as SetClusterMetadataOptions).nodes;
    delete (cluster as SetClusterMetadataOptions).minServeNodes;
    delete (cluster as SetClusterMetadataOptions).maxServeNodes;
    delete (cluster as SetClusterMetadataOptions).cpuUtilizationPercent;
    return cluster as ICluster;
  }

  static getRequestFromMetadata(
    metadata: BasicClusterConfig,
    name: string
  ): protos.google.bigtable.admin.v2.IPartialUpdateClusterRequest {
    return {
      cluster: this.getClusterFromMetadata(metadata, name),
      updateMask: {paths: this.getUpdateMask(metadata)},
    };
  }
}

export class ClusterCredentialsUtils {
  static validateCredentialsForInstance(cluster: ClusterInfo) {
    this.validateErrorAndKey(
      cluster,
      'A cluster was provided with both `encryption` and `key` defined.'
    );
  }

  static validateCredentialsForCluster(cluster: CreateClusterOptions) {
    this.validateErrorAndKey(
      cluster,
      'The cluster cannot have both `encryption` and `key` defined.'
    );
  }

  static validateErrorAndKey(
    cluster: CreateClusterOptions | ClusterInfo,
    message: string
  ) {
    if (
      typeof cluster.key !== 'undefined' &&
      typeof cluster.encryption !== 'undefined'
    ) {
      throw new Error(message);
    }
  }
}
