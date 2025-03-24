import {describe, it} from 'mocha';
import {Bigtable} from '../src';

describe.only('Service Path2', () => {
  it('Experiment with setting the service path', async () => {
    const instanceId = 'instanceId';
    const tableId = 'tableId';
    const columnFamilyId = 'cf1';
    async function mockBigtable() {
      const instance = bigtable.instance(instanceId);
      console.log('get instance info');
      const [instanceInfo] = await instance.exists();
      console.log('after instance info');
      if (!instanceInfo) {
        console.log('create instance');
        const [, operation] = await instance.create({
          clusters: [
            {
              id: 'fake-cluster3',
              location: 'us-west1-c',
              nodes: 1,
            },
          ],
        });
        console.log('create instance done');
        await operation.promise();
      }

      const table = instance.table(tableId);
      const [tableExists] = await table.exists();
      if (!tableExists) {
        await table.create({families: [columnFamilyId]}); // Create column family
      } else {
        // Check if column family exists and create it if not.
        const [families] = await table.getFamilies();
        if (
          !families.some((family: {id: string}) => family.id === columnFamilyId)
        ) {
          await table.createFamily(columnFamilyId);
        }
      }
    }
    // Do the universe domain test
    const universeDomain = 'apis-tpczero.goog'; // or your universe domain if not using emulator
    /*
    const options = {
      universeDomain,
    };
     */
    const options = {};
    const bigtable = new Bigtable();
    const instance = bigtable.instance(instanceId);
    const table = instance.table(tableId);
    await mockBigtable();
    await table.getRows();
  });
});
