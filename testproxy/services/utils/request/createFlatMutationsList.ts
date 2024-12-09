import {FilterConfigOption} from '../../../../src/row';
import {Mutation} from '../../../../src/mutation';
import arrify = require('arrify');
import {google} from '../../../../protos/protos';

/**
 * Creates a flattened list of mutations by applying a transformation function to each entry in an array of FilterConfigOptions.
 *
 * This function takes an array of `FilterConfigOption` objects and a transformation function `f`.  It applies `f` to each
 * `FilterConfigOption` (after casting it to a `Mutation` object) and extracts the `mutations` property from the result of `f`.
 * The `mutations` property is expected to be an array of type `T`, which extends `google.bigtable.v2.IMutation`.
 * Finally, it flattens the resulting array of `T[]` into a single, concatenated array of `T`.
 *
 * @template T The type of mutation objects within the `mutations` array returned by `f`. Must extend `google.bigtable.v2.IMutation`.
 * @param {FilterConfigOption[]} entries An array of `FilterConfigOption` objects, each representing a set of mutations.
 * @param {function(Mutation): {mutations: T[]}} f The transformation function to apply to each `FilterConfigOption`.
 *   This function takes a `Mutation` object as input and must return an object with a `mutations` property that is an array of `T` objects.
 * @returns {T[]} A flattened array of mutations of type `T`, created by concatenating the `mutations` arrays returned by applying `f` to each entry.
 */
export function createFlatMutationsListWithFn<
  T extends google.bigtable.v2.IMutation,
>(entries: FilterConfigOption[], f: (entry: Mutation) => {mutations: T[]}) {
  const e2 = arrify(entries).map(entry => f(entry as Mutation).mutations!);
  return e2.reduce((a, b) => a.concat(b), []);
}

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
export function createFlatMutationsListWithFnInverse<
  T extends google.bigtable.v2.IMutation,
>(
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
