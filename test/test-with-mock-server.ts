// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {before, describe, it} from 'mocha';
import {Bigtable, Table} from '../src';
import {MockServer} from '../src/util/mock-servers/mock-server';
import {BigtableClientMockService} from '../src/util/mock-servers/service-implementations/bigtable-client-mock-service';
import {MockService} from '../src/util/mock-servers/mock-service';

import {ReadRowsWritableStream} from '../test/utils/readRowsServiceParameters';

describe.only('Bigtable/ReadRows', () => {
  let server: MockServer;
  let service: MockService;
  let bigtable: Bigtable;
  let table: Table;

  before(async () => {
    // make sure we have everything initialized before starting tests
    const port = await new Promise<string>(resolve => {
      server = new MockServer(resolve);
    });
    bigtable = new Bigtable({
      apiEndpoint: `localhost:${port}`,
    });
    table = bigtable.instance('fake-instance').table('fake-table');
    service = new BigtableClientMockService(server);
  });

  it('should create read stream and read synchronously', done => {
    service.setService({
      ReadRows: async (stream: ReadRowsWritableStream): Promise<void> => {
        console.log('readRows called');
        done();
      },
    });
    table.createReadStream();
  });
});
