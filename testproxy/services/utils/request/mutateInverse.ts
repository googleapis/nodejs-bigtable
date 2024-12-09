import {Mutation, Bytes} from '../../../../src/mutation';
import {FilterConfigOption} from '../../../../src/row';
import * as protos from '../../../../protos/protos';

/**
 * Inverts the Mutation.parse function. Reconstructs a Mutation object from its
 * protobuf representation.
 *
 * @param {protos.google.bigtable.v2.IMutateRowRequest} req The protobuf representation of the mutation.
 * @returns {Mutation} The reconstructed Mutation object.
 */
export function mutationParseInverse(
  req: protos.google.bigtable.v2.IMutateRowRequest
): Mutation {
  const key = Mutation.convertFromBytes(req.rowKey! as string);
  let method: string | undefined;
  let data: FilterConfigOption | FilterConfigOption[] | undefined;

  if (req.mutations && req.mutations.length > 0) {
    if (req.mutations[0].setCell) {
      method = Mutation.methods.INSERT;
      const localData = {} as any;

      req.mutations.forEach(m => {
        const cell = m.setCell;
        if (cell) {
          const family = cell.familyName!;
          const qualifier = Mutation.convertFromBytes(
            cell.columnQualifier! as Bytes
          );

          // Now TypeScript knows that 'data' is an object, and 'family' is a string key
          if (!localData[family]) {
            localData[family] = {};
          }
          localData[family][qualifier as string] = {
            value: Mutation.convertFromBytes(cell?.value as Bytes),
          };
        }
      });
      data = localData;
    } else if (
      req.mutations.some(
        m => m.deleteFromColumn || m.deleteFromFamily || m.deleteFromRow
      )
    ) {
      method = Mutation.methods.DELETE;
      const localData: FilterConfigOption[] = [];

      req.mutations.forEach(m => {
        if (m.deleteFromColumn) {
          const col = m.deleteFromColumn;

          const column = {
            family: col?.familyName,
            qualifier: Mutation.convertFromBytes(col?.columnQualifier as Bytes),
          };

          const qualifier = `${column.family}:${column.qualifier}`;

          if (
            col?.timeRange?.startTimestampMicros &&
            col?.timeRange.endTimestampMicros
          ) {
            const time = {
              start: col?.timeRange?.startTimestampMicros,
              end: col?.timeRange.endTimestampMicros,
            };
            // @ts-ignore
            localData.push({column: qualifier, time});
          } else {
            // @ts-ignore
            localData.push(qualifier);
          }
        } else if (m.deleteFromFamily) {
          // @ts-ignore
          localData.push(m.deleteFromFamily?.familyName);
        } else if (m.deleteFromRow) {
          localData.push({}); // Represent deleteFromRow as an empty object
        }
      });
      data = localData;
    }
  }

  return new Mutation({key: key as string, method: method!, data}); // method cannot be undefined here, assert non-null
}
