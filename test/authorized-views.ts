import {describe} from 'mocha';
import {AbortableDuplex, Bigtable, PrefixRange, RawFilter} from '../src';
import {PassThrough} from 'stream';
import {CallOptions} from 'google-gax';

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
          const stream = new PassThrough({
            objectMode: true,
          });
          return stream as {} as AbortableDuplex;
        };
        table.createReadStream({
          decode: true,

          /**
           * The encoding to use when converting Buffer values to a string.
           */
          // encoding?: string;

          /**
           * End value for key range.
           */
          // end?: string;

          /**
           * Row filters allow you to both make advanced queries and format how the data is returned.
           */
          // filter: RawFilter;
          gaxOptions: {
            maxRetries: 4,
          },
          limit: 5,
          start: '7',
        });
      });
    });
  });
});
