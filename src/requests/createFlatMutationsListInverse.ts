import {FilterConfigOption} from '../row';
import {Mutation} from '../mutation';
import arrify = require('arrify');
import {google} from '../../protos/protos';

/**
 * Partially inverts createFlatMutationsListWithFn, reconstructing the original
 * FilterConfigOption[] by assuming 'f' converts Mutations to their protobuf
 * representation.  Note: This does *not* invert the transformation performed by 'f' itself.
 *
 * @param {T[]} mutations The flattened mutations list.
 * @param {Function} fInverse The inverse of the function 'f' used in createFlatMutationsListWithFn.  MUST BE PROVIDED and MUST correctly invert 'f'.
 * @param {number} numEntries The original number of entries.  This is REQUIRED as the flattening operation loses this information.
 * @returns {FilterConfigOption[]} The reconstructed FilterConfigOption array.
 */
export function createFlatMutationsListWithFnInverse<T>(
  mutations: T[],
  fInverse: (entry: T) => Mutation, //  Type changed to reflect the inverse function
  numEntries: number
): FilterConfigOption[] {
  const invertedEntries: FilterConfigOption[] = [];
  const mutationsPerEntry = mutations.length / numEntries;

  for (let i = 0; i < numEntries; i++) {
    const start = i * mutationsPerEntry;
    const end = start + mutationsPerEntry;
    const entryMutations = mutations.slice(start, end) as unknown as T[]; // Type cast to align with fInverse input

    const invertedEntry: FilterConfigOption = {};
    for (const mutation of entryMutations) {
      Object.assign(invertedEntry, fInverse(mutation)); // Apply inverse function to each mutation
    }

    invertedEntries.push(invertedEntry);
  }

  return invertedEntries;
}
