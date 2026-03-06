exports[
  'Bigtable/Cluster setMetadata should provide the proper request options asynchronously 1'
] = {
  input: {
    id: 'my-cluster',
    options: {
      nodes: 2,
      location: 'us-central2-d',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'partialUpdateCluster',
      reqOpts: {
        cluster: {
          name: 'projects/grape-spaceship-123/instances/i/clusters/my-cluster',
          location: 'us-central2-d',
          serveNodes: 2,
        },
        updateMask: {
          paths: ['serve_nodes', 'cluster_config.cluster_autoscaling_config'],
        },
      },
      gaxOpts: {},
    },
  },
};

exports[
  'Bigtable/Cluster setMetadata should provide the proper request options asynchronously 2'
] = {
  input: {
    id: 'my-cluster',
    options: {
      nodes: 2,
      storage: 'ssd',
      location: 'us-central2-d',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'partialUpdateCluster',
      reqOpts: {
        cluster: {
          name: 'projects/grape-spaceship-123/instances/i/clusters/my-cluster',
          location: 'us-central2-d',
          serveNodes: 2,
          storage: 'ssd',
        },
        updateMask: {
          paths: ['serve_nodes', 'cluster_config.cluster_autoscaling_config'],
        },
      },
      gaxOpts: {},
    },
  },
};

exports[
  'Bigtable/Cluster setMetadata should provide the proper request options asynchronously 3'
] = {
  input: {
    id: 'my-cluster',
    options: {
      nodes: 2,
      key: 'kms-key-name',
      location: 'us-central2-d',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'partialUpdateCluster',
      reqOpts: {
        cluster: {
          name: 'projects/grape-spaceship-123/instances/i/clusters/my-cluster',
          location: 'us-central2-d',
          serveNodes: 2,
          key: 'kms-key-name',
        },
        updateMask: {
          paths: ['serve_nodes', 'cluster_config.cluster_autoscaling_config'],
        },
      },
      gaxOpts: {},
    },
  },
};

exports[
  'Bigtable/Cluster setMetadata should provide the proper request options asynchronously 4'
] = {
  input: {
    id: 'my-cluster',
    options: {
      nodes: 2,
      encryption: {
        kmsKeyName: 'kms-key-name',
      },
      location: 'us-central2-d',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'partialUpdateCluster',
      reqOpts: {
        cluster: {
          name: 'projects/grape-spaceship-123/instances/i/clusters/my-cluster',
          location: 'us-central2-d',
          serveNodes: 2,
          encryption: {
            kmsKeyName: 'kms-key-name',
          },
        },
        updateMask: {
          paths: ['serve_nodes', 'cluster_config.cluster_autoscaling_config'],
        },
      },
      gaxOpts: {},
    },
  },
};

exports[
  'Bigtable/Cluster setMetadata should provide the proper request options asynchronously 5'
] = {
  input: {
    id: 'my-cluster',
    options: {
      minServeNodes: 2,
      maxServeNodes: 3,
      cpuUtilizationPercent: 50,
      location: 'us-central2-d',
    },
  },
  output: {
    config: {
      client: 'BigtableInstanceAdminClient',
      method: 'partialUpdateCluster',
      reqOpts: {
        cluster: {
          name: 'projects/grape-spaceship-123/instances/i/clusters/my-cluster',
          location: 'us-central2-d',
          clusterConfig: {
            clusterAutoscalingConfig: {
              autoscalingTargets: {
                cpuUtilizationPercent: 50,
              },
              autoscalingLimits: {
                minServeNodes: 2,
                maxServeNodes: 3,
              },
            },
          },
        },
        updateMask: {
          paths: [
            'cluster_config.cluster_autoscaling_config.autoscaling_limits.min_serve_nodes',
            'cluster_config.cluster_autoscaling_config.autoscaling_limits.max_serve_nodes',
            'cluster_config.cluster_autoscaling_config.autoscaling_targets.cpu_utilization_percent',
          ],
        },
      },
      gaxOpts: {},
    },
  },
};
