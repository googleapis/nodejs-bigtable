import { FilterConfigOption } from '../../../../src/row';
import { Mutation } from '../../../../src/mutation';
import * as protos from '../../../../protos/protos';
import { Bytes } from '../../../../src/mutation';
import { google } from '../../../../protos/protos';

/**
 * Inverts a flat list of mutations back to a structured FilterConfigOption array.
 * This is the inverse of the `createFlatMutationsList` function.
 *
 * @param {google.bigtable.v2.Mutation[]} mutations A flat list of mutations.
 * @returns {FilterConfigOption[]} A structured array of mutations.
 */
export function createFlatMutationsListInverse(
  mutations: protos.google.bigtable.v2.Mutation[]
): FilterConfigOption[] {

}
