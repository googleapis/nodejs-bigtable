import {FilterConfig, FilterConfigOption} from '../row';
import {Mutation} from '../mutation';
import arrify = require('arrify');
import {Filter, RawFilter} from '../filter';
import {RowProperties} from '../row-data-utils';
import * as protos from '../../protos/protos';

interface CheckAndMutateRowRequest {
  filter: RawFilter;
  properties: RowProperties;
  config: FilterConfig;
}
type CheckAndMutateRowGapicRequest =
  protos.google.bigtable.v2.ICheckAndMutateRowRequest;

export function getCheckAndMutateRowRequest(
  request: CheckAndMutateRowRequest
): CheckAndMutateRowGapicRequest {
  const {filter, properties, config} = request;
  return Object.assign(
    {
      appProfileId: properties.requestData.bigtable.appProfileId,
      rowKey: Mutation.convertToBytes(properties.requestData.id),
      predicateFilter: Filter.parse(filter),
      trueMutations: createFlatMutationsList(config.onMatch!),
      falseMutations: createFlatMutationsList(config.onNoMatch!),
    },
    properties.reqOpts
  );
}

function createFlatMutationsList(entries: FilterConfigOption[]) {
  const e2 = arrify(entries).map(
    entry => Mutation.parse(entry as Mutation).mutations!
  );
  return e2.reduce((a, b) => a.concat(b), []);
}

function createFlatMutationsListWithFn<T>(
  entries: FilterConfigOption[],
  f: (entry: Mutation) => {mutations: T[]}
) {
  const e2 = arrify(entries).map(entry => f(entry as Mutation).mutations!);
  return e2.reduce((a, b) => a.concat(b), []);
}
