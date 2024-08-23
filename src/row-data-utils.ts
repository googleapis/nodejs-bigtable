import {Filter, RawFilter} from './filter';
import {FilterCallback, FilterConfig, FilterConfigOption} from './row';
import {Family} from './chunktransformer';
import {Mutation} from './mutation';
import {google} from '../protos/protos';
import {TabularApiService} from './tabular-api-service';
import arrify = require('arrify');

interface RowProperties {
  data?: {[index: string]: Family};
  id: string;
  table: TabularApiService;
}

export function filterUtil(
  filter: RawFilter,
  properties: RowProperties,
  configOrCallback?: FilterConfig | FilterCallback,
  cb?: FilterCallback
) {
  const config = typeof configOrCallback === 'object' ? configOrCallback : {};
  const callback =
    typeof configOrCallback === 'function' ? configOrCallback : cb!;
  const reqOpts = {
    tableName: properties.table.name,
    appProfileId: properties.table.bigtable.appProfileId,
    rowKey: Mutation.convertToBytes(properties.id),
    predicateFilter: Filter.parse(filter),
    trueMutations: createFlatMutationsList(config.onMatch!),
    falseMutations: createFlatMutationsList(config.onNoMatch!),
  };
  properties.data = {};
  properties.table.bigtable.request<google.bigtable.v2.ICheckAndMutateRowResponse>(
    {
      client: 'BigtableClient',
      method: 'checkAndMutateRow',
      reqOpts,
      gaxOpts: config.gaxOptions,
    },
    (err, apiResponse) => {
      if (err) {
        callback(err, null, apiResponse);
        return;
      }

      callback(null, apiResponse!.predicateMatched, apiResponse);
    }
  );

  function createFlatMutationsList(entries: FilterConfigOption[]) {
    const e2 = arrify(entries).map(
      entry => Mutation.parse(entry as Mutation).mutations!
    );
    return e2.reduce((a, b) => a.concat(b), []);
  }
}
