import {after, describe, it} from 'mocha';
import {Bigtable} from '../src';

describe.only('TPC tests', () => {
  async function mockBigtable(bigtable: Bigtable) {
    const instance = bigtable.instance(instanceId);
    const [instanceInfo] = await instance.exists();
    if (!instanceInfo) {
      const [, operation] = await instance.create({
        clusters: {
          id: 'fake-cluster3',
          location: 'u-us-prp1-a',
          nodes: 1,
        },
      });
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

  function runTest(done: Mocha.Done, bigtable: Bigtable) {
    (async () => {
      try {
        const instance = bigtable.instance(instanceId);
        const table = instance.table(tableId);
        await mockBigtable(bigtable);
        await table.getRows();
        done();
      } catch (e) {
        done(e);
      }
    })();
  }

  const instanceId = 'emulator-test-instance';
  const tableId = 'my-table';
  const columnFamilyId = 'cf1';
  process.env.GOOGLE_APPLICATION_CREDENTIALS =
    '/Users/djbruce/Documents/Programming/keys/tpc_sa_key.json';

  after(async () => {
    // TODO: Solve the issue where tests fail because instances don't get created on time.
    // Notes: Creating instances can take time and if they are not ready in
    // time then tests can fail. This shouldn't happen because if the create
    // instance long running operation completes then the instance should be
    // ready and shouldn't produce the `Error: 5 NOT_FOUND` error.

    // Uncomment the code below when the task above is addressed:
    // const instance = bigtable.instance(instanceId);
    // await instance.delete({});
  });

  it('should set the TPC universe with a client option', done => {
    const universeDomain = 'apis-tpczero.goog'; // or your universe domain if not using emulator
    const options = {
      universeDomain,
    };
    const bigtable = new Bigtable(options);
    runTest(done, bigtable);
  });

  it('should set the TPC universe with a client option for the gapic clients', done => {
    const universeDomain = 'apis-tpczero.goog'; // or your universe domain if not using emulator
    const options = {
      BigtableClient: {universeDomain},
      BigtableInstanceAdminClient: {universeDomain},
      BigtableTableAdminClient: {universeDomain},
    };
    const bigtable = new Bigtable(options);
    runTest(done, bigtable);
  });

  it('Should set TPC universe with an environment variable', done => {
    process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN = 'apis-tpczero.goog';
    const bigtable = new Bigtable();
    runTest(done, bigtable);
  });
});
