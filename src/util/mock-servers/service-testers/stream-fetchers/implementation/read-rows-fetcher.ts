import {Table} from '../../../../../table';
import internal = require('stream');
import {StreamFetcher} from '../stream-fetcher';

export class ReadRowsFetcher extends StreamFetcher {
  table: Table;

  constructor(table: Table) {
    super();
    this.table = table;
  }

  fetchStream(): internal.PassThrough {
    return this.table.createReadStream({});
  }
}
