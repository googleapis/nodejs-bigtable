import {CreateClusterOptions} from '../../src';

export const createClusterOptionsList: CreateClusterOptions[] = [
  {nodes: 2},
  {nodes: 2, storage: 'ssd'},
  {nodes: 2, key: 'kms-key-name'},
  {nodes: 2, encryption: {kmsKeyName: 'kms-key-name'}},
  {
    minServeNodes: 2,
    maxServeNodes: 3,
    cpuUtilizationPercent: 50,
  },
].map(option => Object.assign(option, {location: 'us-central1-b'}));
