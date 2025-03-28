import {Bigtable} from '../src';
export async function setupBigtable(
  bigtable: Bigtable,
  columnFamilyId: string,
  instanceId: string,
  tableIds: string[]
) {
  const instance = bigtable.instance(instanceId);
  const [instanceInfo] = await instance.exists();
  if (!instanceInfo) {
    const [, operation] = await instance.create({
      clusters: {
        id: 'fake-cluster3',
        location: 'us-west1-c',
        nodes: 1,
      },
    });
    await operation.promise();
  }
  const tables = tableIds.map(tableId => instance.table(tableId));
  for (const currentTable of tables) {
    const [tableExists] = await currentTable.exists();
    if (!tableExists) {
      await currentTable.create({families: [columnFamilyId]}); // Create column family
    } else {
      // Check if column family exists and create it if not.
      const [families] = await currentTable.getFamilies();

      if (
        !families.some((family: {id: string}) => family.id === columnFamilyId)
      ) {
        await currentTable.createFamily(columnFamilyId);
      }
    }
    // Add some data so that a firstResponseLatency is recorded.
    await currentTable.insert([
      {
        key: 'rowId',
        data: {
          [columnFamilyId]: {
            gwashington: 1,
            tjefferson: 1,
          },
        },
      },
    ]);
  }
}
