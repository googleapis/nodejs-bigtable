import {describe} from 'mocha';
import assert from 'assert';
import {AbortableDuplex, Bigtable} from '../src';

describe('Bigtable/AuthorizedViews', () => {
  describe('Authorized View methods should have requests that match Table and Row requests', () => {
    describe('Table', () => {
      it('requests for createReadStream should match', () => {
        const bigtable = new Bigtable({});
        const fakeTableName = 'fake-table';
        const fakeInstanceName = 'fake-instance';
        const fakeViewName = 'fake-view';
        const instance = bigtable.instance(fakeInstanceName);
        const table = instance.table(fakeTableName);
        const view = instance.view(fakeTableName, fakeViewName);
        table.bigtable.request = (config: any) => {
          assert.strictEqual(config.reqOpts.rowsLimit, options.limit);
          return (stream as {} as AbortableDuplex).abort = () => {};;
        };
      });
    });
  });
});
