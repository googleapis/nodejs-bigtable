import {FilterConfig, FilterConfigOption} from '../row';
import {Mutation} from '../../../../src/mutation';
import {RawFilter} from '../../../../src/filter';
import {RowProperties} from '../../../../src/row-data-utils';
import * as protos from '../../../../protos/protos';
import {Bytes} from '../../../../src/mutation.js';
import {google} from '../../../../protos/protos';

interface CheckAndMutateRowRequest {
  filter: RawFilter;
  properties: RowProperties;
  config: FilterConfig;
}
type CheckAndMutateRowGapicRequest =
  protos.google.bigtable.v2.ICheckAndMutateRowRequest;

/**
 * Inverts a CheckAndMutateRowRequest, reconstructing the original request
 * parameters from a gapi-formatted request. This is primarily used for testing.
 *
 * @param {CheckAndMutateRowGapicRequest} request The gAPI-formatted request to invert.
 * @returns {CheckAndMutateRowRequest} The reconstructed original request.
 */
export function getCheckAndMutateRowRequestInverse(
    request: CheckAndMutateRowGapicRequest
): CheckAndMutateRowRequest {
  const filter = invertFilter(
      request.predicateFilter as google.bigtable.v2.IRowFilter
  );
  const config: FilterConfig = {
    onMatch: invertMutations(
        request.trueMutations as google.bigtable.v2.IMutation[]
    ),
    onNoMatch: invertMutations(
        request.falseMutations as google.bigtable.v2.IMutation[]
    ),
  };

  const properties: RowProperties = {
    requestData: {
      id: Mutation.convertFromBytes(request.rowKey as Bytes),
      table: {} as any, // Replace with proper initialization if needed
      bigtable: {appProfileId: request.appProfileId} as any,
    },
    reqOpts: {
      tableName: request.tableName,
    },
  };

  return {filter, properties, config};
}

/**
 * Inverts a list of mutations from the gAPI format back to the original format.
 * Handles potential undefined values gracefully.
 *
 * @param {google.bigtable.v2.IMutation[] | null | undefined} mutations The gAPI mutations to invert.
 * @returns {FilterConfigOption[]} The inverted mutations.
 */
function invertMutations(
    mutations: google.bigtable.v2.IMutation[] | null | undefined
): FilterConfigOption[] {
  const invertedMutations: FilterConfigOption[] = [];
  if (!mutations) return invertedMutations;

  for (const mutation of mutations) {
    const invertedMutation: FilterConfigOption = {};

    if (mutation.setCell?.value) {
      invertedMutation.value = Mutation.convertFromBytes(
          mutation.setCell.value
      );
    } else if (mutation.incrementAmount) {
      invertedMutation.increment = mutation.incrementAmount;
    } else if (mutation.appendValue) {
      invertedMutation.append = Mutation.convertFromBytes(
          mutation.appendValue as Bytes
      ) as string;
    } // Add other mutation type handling (deleteFrom*, etc.) as needed.
    invertedMutations.push(invertedMutation);
  }

  return invertedMutations;
}

/**
 * Inverts a filter from the gAPI format to the simplified format. Handles all
 * known filter types.
 * @param {google.bigtable.v2.IRowFilter | null | undefined} filter The filter to invert.
 * @returns {RawFilter} The inverted filter.
 */
function invertFilter(
    filter: google.bigtable.v2.IRowFilter | null | undefined
): RawFilter {
  if (!filter) return {};
  // The specific properties within each `if` block now correctly map to the fields defined in google.bigtable.v2.RowFilter in the protos.

  if (filter.chain) {
    return {chain: invertFilter(filter.chain.filter)};
  } else if (filter.interleave) {
    return {
      interleave: filter.interleave.filters?.map(f => invertFilter(f)),
    };
  } else if (filter.condition) {
    return {
      condition: {
        predicate_filter: invertFilter(filter.condition.predicateFilter),
        true_filter: invertFilter(filter.condition.trueFilter),
        false_filter: invertFilter(filter.condition.falseFilter),
      },
    };
  } else if (filter.passAllFilter) {
    return {passAllFilter: true}; // Set to true since it's present
  } else if (filter.blockAllFilter) {
    return {blockAllFilter: true}; // Set to true since it's present
  } else if (filter.rowKeyRegexFilter) {
    return {
      rowKeyRegexFilter: Mutation.convertFromBytes(
          filter.rowKeyRegexFilter as Bytes
      ),
    };
  } else if (filter.rowSampleFilter) {
    return {rowSampleFilter: filter.rowSampleFilter};
  } else if (filter.familyNameRegexFilter) {
    return {familyNameRegexFilter: filter.familyNameRegexFilter};
  } else if (filter.columnQualifierRegexFilter) {
    return {
      columnQualifierRegexFilter: Mutation.convertFromBytes(
          filter.columnQualifierRegexFilter as Bytes
      ),
    };
  } else if (filter.columnNameRegexFilter) {
    return {columnNameRegexFilter: filter.columnNameRegexFilter};
  } else if (filter.cellLimit) {
    return {cellLimit: filter.cellLimit};
  } else if (filter.timestampRange) {
    return {timestampRange: filter.timestampRange};
  } else if (filter.valueRegexFilter) {
    return {
      valueRegexFilter: Mutation.convertFromBytes(
          filter.valueRegexFilter as Bytes
      ),
    };
  } else if (filter.valueRange) {
    return {
      valueRange: {
        startValueClosed: filter.valueRange?.startValueClosed
            ? Mutation.convertFromBytes(
                filter.valueRange.startValueClosed as Bytes
            )
            : undefined,
        startValueOpen: filter.valueRange?.startValueOpen
            ? Mutation.convertFromBytes(filter.valueRange.startValueOpen as Bytes)
            : undefined,
        endValueClosed: filter.valueRange?.endValueClosed
            ? Mutation.convertFromBytes(filter.valueRange.endValueClosed as Bytes)
            : undefined,
        endValueOpen: filter.valueRange?.endValueOpen
            ? Mutation.convertFromBytes(filter.valueRange.endValueOpen as Bytes)
            : undefined,
      },
    };
  } else if (filter.cellsPerRowOffsetFilter) {
    return {cellsPerRowOffsetFilter: filter.cellsPerRowOffsetFilter};
  } else if (filter.cellsPerRowLimitFilter) {
    return {cellsPerRowLimitFilter: filter.cellsPerRowLimitFilter};
  } else if (filter.cellsPerColumnLimitFilter) {
    return {cellsPerColumnLimitFilter: filter.cellsPerColumnLimitFilter};
  } else if (filter.stripValueTransformer) {
    return {stripValueTransformer: true}; // Set to true since it's present
  } else if (filter.applyLabelTransformer) {
    return {applyLabelTransformer: filter.applyLabelTransformer};
  } else if (filter.sink) {
    return {sink: true}; // Set to true since it's present
  }

  return {};
}
