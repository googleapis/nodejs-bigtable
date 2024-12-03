import * as assert from 'assert';

import {describe} from 'mocha';
import * as gax from 'google-gax';

import {ReadRowsImpl} from '../utils/readRowsImpl';
import {MockServer} from '../../src/util/mock-servers/mock-server';
import {MockService} from '../../src/util/mock-servers/mock-service';
import {BigtableClientMockService} from '../../src/util/mock-servers/service-implementations/bigtable-client-mock-service';
import {ServerWritableStream} from '@grpc/grpc-js';
import {protos} from '../../src';
import {BigtableClient} from '../../src/v2';
import type {Callback, CallOptions} from 'google-gax';
import {StreamProxy} from 'google-gax/build/src/streamingCalls/streaming';
const readModifyWriteRow = require('../../../testproxy/services/read-modify-write-row.js');
const createClient = require('../../../testproxy/services/create-client.js');

export type ReadModifyWriteRowWritableStream = ServerWritableStream<
  protos.google.bigtable.v2.IReadModifyWriteRowRequest,
  protos.google.bigtable.v2.IReadModifyWriteRowResponse
>;

describe.only('TestProxy/ReadModifyWriteRow', () => {
  let server: MockServer;
  let service: MockService;
  let port: string;

  before(async () => {
    // make sure we have everything initialized before starting tests
    port = await new Promise<string>(resolve => {
      server = new MockServer(resolve);
    });
    service = new BigtableClientMockService(server);
  });

  it('Ensure the proper request is passed to the Gapic Layer', done => {
    const readModifyWriteRowRequest = {
      tableName: 'test-table',
      appProfileId: 'test-app-profile',
      rowKey: Buffer.from('test-row-key'),
      rules: [
        {
          familyName: 'cf1',
          columnQualifier: Buffer.from('cq1'),
          appendValue: Buffer.from('append-val'),
        },
        {
          familyName: 'cf2',
          columnQualifier: Buffer.from('cq2'),
          incrementAmount: 10,
        },
      ],
    };
    /*
        return async (stream: ReadRowsWritableStream): Promise<void> => {
      await new ReadRowsImpl(serviceParameters).handleRequest(stream);
    };
     */
    service.setService({
      ReadModifyWriteRow: async (
        stream: ReadModifyWriteRowWritableStream
      ): Promise<void> => {
        try {
          assert.deepStrictEqual(stream.request, readModifyWriteRowRequest);
          done();
        } catch (e) {
          done(e);
        }
        // stream.request = {rules: [], tableName: '', rowKey: Buffer(0), appProfileId: '', authorizedViewName: ''}
      },
    });
    (async () => {
      const clientMap = new Map();
      const createClientFunction = createClient({clientMap});
      await new Promise((resolve, reject) => {
        createClientFunction(
          {
            request: {
              clientId: 'TestReadModifyWriteRow_NoRetry_TransientError',
              dataTarget: `localhost:${port}`,
              projectId: 'projectId',
              instanceId: 'instance',
              appProfileId: '',
            },
          },
          (...args: any) => {
            if (args[0]) {
              reject(args[0]);
            }
            resolve(args[1]);
          }
        );
      });
      const bigtable = clientMap.get(
        'TestReadModifyWriteRow_NoRetry_TransientError'
      );
      // Mock out the Gapic layer so we can see requests coming into it
      const bigtableClient = new BigtableClient(
        bigtable.options.BigtableClient
      );
      bigtable.api['BigtableClient'] = bigtableClient;
      bigtableClient.readModifyWriteRow = (
        request?: protos.google.bigtable.v2.IReadModifyWriteRowRequest,
        optionsOrCallback?:
          | CallOptions
          | Callback<
              protos.google.bigtable.v2.IReadModifyWriteRowResponse,
              | protos.google.bigtable.v2.IReadModifyWriteRowRequest
              | null
              | undefined,
              {} | null | undefined
            >,
        callback?: Callback<
          protos.google.bigtable.v2.IReadModifyWriteRowResponse,
          | protos.google.bigtable.v2.IReadModifyWriteRowRequest
          | null
          | undefined,
          {} | null | undefined
        >
      ) => {
        try {
          // If the Gapic request is correct then the test passes.
          assert.deepStrictEqual(request, readModifyWriteRowRequest);
          done();
        } catch (e) {
          // If the Gapic request is incorrect then the test fails with an error.
          done(e);
        }
        // The following code is added just so the mocked gapic function will compile.
        // A return value is provided to match the return value of the readrows
        // Gapic function.
        return new Promise((resolve, reject) => {
          const response: protos.google.bigtable.v2.IReadModifyWriteRowResponse =
            {};
          resolve([response, {}, undefined]);
        });
      };
      const readModifyWriteRowFunction = readModifyWriteRow({clientMap});
      await new Promise((resolve, reject) => {
        readModifyWriteRowFunction(
          {
            request: {
              clientId: 'TestReadModifyWriteRow_NoRetry_TransientError',
              request: readModifyWriteRowRequest,
            },
          },
          (...args: any) => {
            if (args[0]) {
              reject(args[0]);
            }
            resolve(args[1]);
          }
        );
      });
      console.log(clientMap);
    })();
  });
});
