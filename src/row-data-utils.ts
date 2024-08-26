const dotProp = require('dot-prop');
import {Filter, RawFilter} from './filter';
import {
  CreateRulesCallback,
  FilterCallback,
  FilterConfig,
  FilterConfigOption,
  FormatFamiliesOptions,
  IncrementCallback,
  Rule,
} from './row';
import {Family} from './chunktransformer';
import {Bytes, Mutation} from './mutation';
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

// A class is required because of the mock
class RowDataUtils {
  static filterUtil(
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

  static formatFamilies_Util(
    families: google.bigtable.v2.IFamily[],
    options?: FormatFamiliesOptions
  ) {
    const data = {} as {[index: string]: {}};
    options = options || {};
    families.forEach(family => {
      const familyData = (data[family.name!] = {}) as {
        [index: string]: {};
      };
      family.columns!.forEach(column => {
        const qualifier = Mutation.convertFromBytes(
          column.qualifier as string
        ) as string;
        familyData[qualifier] = column.cells!.map(cell => {
          let value = cell.value;
          if (options!.decode !== false) {
            value = Mutation.convertFromBytes(value as Bytes, {
              isPossibleNumber: true,
            }) as string;
          }
          return {
            value,
            timestamp: cell.timestampMicros,
            labels: cell.labels,
          };
        });
      });
    });
    return data;
  }

  static createRulesUtil(
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

  static incrementUtils(
    column: string,
    properties: RowProperties,
    valueOrOptionsOrCallback?: number | CallOptions | IncrementCallback,
    optionsOrCallback?: CallOptions | IncrementCallback,
    cb?: IncrementCallback
  ) {
    const value =
      typeof valueOrOptionsOrCallback === 'number'
        ? valueOrOptionsOrCallback
        : 1;
    const gaxOptions =
      typeof valueOrOptionsOrCallback === 'object'
        ? valueOrOptionsOrCallback
        : typeof optionsOrCallback === 'object'
          ? optionsOrCallback
          : {};
    const callback =
      typeof valueOrOptionsOrCallback === 'function'
        ? valueOrOptionsOrCallback
        : typeof optionsOrCallback === 'function'
          ? optionsOrCallback
          : cb!;

    const reqOpts = {
      column,
      increment: value,
    } as Rule;

    this.createRulesUtil(reqOpts, properties, gaxOptions, (err, resp) => {
      if (err) {
        callback(err, null, resp);
        return;
      }

      const data = this.formatFamilies_Util(resp!.row!.families!);
      const value = dotProp.get(data, column.replace(':', '.'))[0].value;

      callback(null, value, resp);
    });
  }
}

export {RowDataUtils};
