import {Filter} from './filter';
import {Mutation} from './mutation';
import * as protos from '../../protos/protos';
import {Bytes} from './mutation';
import {google} from '../../protos/protos';
import {RawFilter} from '../filter';

/**
 * Inverts a filter from the proto format to the simplified format. Handles all
 * known filter types.
 *
 * @param {protos.google.bigtable.v2.Filter} filter The filter to invert.
 * @returns {RawFilter} The inverted filter.
 */
export function filterInverse(filter: google.bigtable.v2.IRowFilter): RawFilter {
  if (!filter) {
    return {};
  }

  if (filter.chain) {
    return filter.chain.filters?.map(filterInverse); // recursively invert chained filters
  }

  if (filter.interleave) {
    return {
      interleave: filter.interleave.filters?.map(filterInverse),
    };
  }

  if (filter.condition) {
    return {
      condition: {
        test: filterInverse(
          filter.condition.predicateFilter as protos.google.bigtable.v2.Filter
        ),
        pass: filterInverse(filter.condition.trueFilter as protos.google.bigtable.v2.Filter),
        fail: filterInverse(filter.condition.falseFilter as protos.google.bigtable.v2.Filter),
      },
    };
  }

  if (filter.passAllFilter) {
    return {all: true};
  }

  if (filter.blockAllFilter) {
    return {all: false};
  }



  if (filter.rowKeyRegexFilter) {

    return {row: Mutation.convertFromBytes(filter.rowKeyRegexFilter as Bytes)};

  }

  if (filter.familyNameRegexFilter) {
    return {family: filter.familyNameRegexFilter};
  }


  if (filter.columnQualifierRegexFilter) {

    return {column: Mutation.convertFromBytes(filter.columnQualifierRegexFilter as Bytes)};

  }




  if (filter.columnNameRegexFilter) {
    return {column: filter.columnNameRegexFilter};
  }

  if (filter.cellLimit) {
    return {cellLimit: filter.cellLimit};
  }



  if (filter.timestampRange) {

    return {
      time: {start: filter.timestampRange?.startTimestampMicros, end: filter.timestampRange?.endTimestampMicros},
    };
  }

  if (filter.valueRegexFilter) {
    return { value: Mutation.convertFromBytes(filter.valueRegexFilter as Bytes) };
  }

  if (filter.valueRange) {
    const start = {};
    const end = {};

    if (filter.valueRange.startValueClosed) {
      Object.assign(start, {value: Mutation.convertFromBytes(filter.valueRange.startValueClosed as Bytes), inclusive: true});
    }


    if (filter.valueRange.startValueOpen) {
      Object.assign(start, {value: Mutation.convertFromBytes(filter.valueRange.startValueOpen as Bytes), inclusive: false});
    }


    if (filter.valueRange.endValueClosed) {
      Object.assign(end, {value: Mutation.convertFromBytes(filter.valueRange.endValueClosed as Bytes), inclusive: true});

    }

    if (filter.valueRange.endValueOpen) {
      Object.assign(end, {value: Mutation.convertFromBytes(filter.valueRange.endValueOpen as Bytes), inclusive: false});

    }

    return { value: {start, end} };
  }

  if (filter.cellsPerRowOffsetFilter) {

    return {row: {cellOffset: filter.cellsPerRowOffsetFilter}};
  }


  if (filter.cellsPerRowLimitFilter) {
    return {row: {cellLimit: filter.cellsPerRowLimitFilter}};
  }

  if (filter.cellsPerColumnLimitFilter) {
    return {column: {cellLimit: filter.cellsPerColumnLimitFilter}};
  }


  if (filter.stripValueTransformer) {
    return { value: {strip: true} };
  }

  if (filter.applyLabelTransformer) {
    return {label: filter.applyLabelTransformer};
  }


  if (filter.sink) {
    return {sink: true};
  }


  // Default case: If the filter type is unknown or not handled, return an empty object
  return {};
}
