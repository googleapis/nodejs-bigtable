import * as uuid from 'uuid';
import {Cluster} from '../src/cluster';
import * as inst from '../src/instance';

export const PREFIX = 'gcloud-tests-';

export function generateId(resourceType: string) {
  return PREFIX + resourceType + '-' + uuid.v1().substr(0, 8);
}

export class FakeCluster extends Cluster {
  calledWith_: Array<{}>;
  constructor(...args: [inst.Instance, string]) {
    super(args[0], args[1]);
    this.calledWith_ = args;
  }
}
