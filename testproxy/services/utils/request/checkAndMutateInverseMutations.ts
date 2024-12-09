import {FilterConfigOption} from '../row';
import {Mutation, Bytes} from '../../../../src/mutation';
import * as protos from '../../../../protos/protos';
import {google} from '../../../../protos/protos';

/**
 * Inverts a flat list of mutations back to a structured FilterConfigOption array.
 *
 * @param {protos.google.bigtable.v2.Mutation[]} mutations The flat mutations array.
 * @returns {FilterConfigOption[]} The structured array of mutations.
 */
export function createFlatMutationsListInverse(
  mutations: google.bigtable.v2.Mutation[]
): FilterConfigOption[] {
  const invertedMutations: FilterConfigOption[] = [];

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
      // Add other mutation types as needed
    } else if (mutation.deleteFromColumn?.familyName) {
      invertedMutation.family = mutation.deleteFromColumn.familyName

      if(mutation.deleteFromColumn.columnQualifier) {
        invertedMutation.column =  `${invertedMutation.family}:${Mutation.convertFromBytes(mutation.deleteFromColumn.columnQualifier as Bytes)}`
      }
      if (mutation.deleteFromColumn?.timeRange?.startTimestampMicros && mutation.deleteFromColumn?.timeRange?.endTimestampMicros) {
        invertedMutation.timeRangeFrom = mutation.deleteFromColumn.timeRange?.startTimestampMicros
        invertedMutation.timeRangeTo = mutation.deleteFromColumn.timeRange?.endTimestampMicros
      }

    } else if (mutation.deleteFromFamily?.familyName) {
      invertedMutation.family = mutation.deleteFromFamily?.familyName


    } else if (mutation.deleteFromRow) {
      invertedMutation.row = true; // or appropriate value based on your RowFilter structure


    }


    invertedMutations.push(invertedMutation);
  }

  return invertedMutations;
}
