import {Filter, RawFilter} from './filter';
import {
  CreateRulesCallback,
  FilterCallback,
  FilterConfig,
  FilterConfigOption,
  Rule,
} from './row';
import {Family} from './chunktransformer';
import {Mutation} from './mutation';
import {google} from '../protos/protos';
import {TabularApiService} from './tabular-api-service';
import arrify = require('arrify');
import {Bigtable} from './index';
import {CallOptions} from 'google-gax';

interface RowProperties {
  data?: {[index: string]: Family};
  id: string;
  table: TabularApiService;
  bigtable: Bigtable;
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
    appProfileId: properties.bigtable.appProfileId,
    rowKey: Mutation.convertToBytes(properties.id),
    predicateFilter: Filter.parse(filter),
    trueMutations: createFlatMutationsList(config.onMatch!),
    falseMutations: createFlatMutationsList(config.onNoMatch!),
  };
  properties.data = {};
  properties.bigtable.request<google.bigtable.v2.ICheckAndMutateRowResponse>(
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

export function createRulesUtil(
  rules: Rule | Rule[],
  properties: RowProperties,
  optionsOrCallback?: CallOptions | CreateRulesCallback,
  cb?: CreateRulesCallback
) {
  const gaxOptions =
    typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
  const callback =
    typeof optionsOrCallback === 'function' ? optionsOrCallback : cb!;

  if (!rules || (rules as Rule[]).length === 0) {
    throw new Error('At least one rule must be provided.');
  }

  rules = arrify(rules).map(rule => {
    const column = Mutation.parseColumnName(rule.column);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ruleData: any = {
      familyName: column.family,
      columnQualifier: Mutation.convertToBytes(column.qualifier!),
    };

    if (rule.append) {
      ruleData.appendValue = Mutation.convertToBytes(rule.append);
    }

    if (rule.increment) {
      ruleData.incrementAmount = rule.increment;
    }

    return ruleData;
  });

  const reqOpts = {
    tableName: properties.table.name,
    appProfileId: properties.bigtable.appProfileId,
    rowKey: Mutation.convertToBytes(properties.id),
    rules,
  };
  properties.data = {};
  properties.bigtable.request<google.bigtable.v2.IReadModifyWriteRowResponse>(
    {
      client: 'BigtableClient',
      method: 'readModifyWriteRow',
      reqOpts,
      gaxOpts: gaxOptions,
    },
    callback
  );
}
