import {Bigtable} from '../src';

const instanceId1 = 'emulator-test-instance';
const tableId1 = 'my-table';

it.only('experiment', done => {
  (async () => {
    try {
      const bigtable = new Bigtable(); // await mockBigtable(projectId, done);
      const instance = bigtable.instance(instanceId1);
      const table = instance.table(tableId1);
      await table.getRows();
    } catch (e) {
      done(new Error('An error occurred while running the script'));
      done(e);
    }
  })().catch(err => {
    throw err;
  });
});
