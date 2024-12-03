import {describe} from 'mocha';
import {ReadRowsImpl} from '../utils/readRowsImpl';
import {MockServer} from '../../src/util/mock-servers/mock-server';
import {MockService} from '../../src/util/mock-servers/mock-service';
import {BigtableClientMockService} from '../../src/util/mock-servers/service-implementations/bigtable-client-mock-service';
import {ServerWritableStream} from '@grpc/grpc-js';
import {protos} from '../../src';
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
    /*
        return async (stream: ReadRowsWritableStream): Promise<void> => {
      await new ReadRowsImpl(serviceParameters).handleRequest(stream);
    };
     */
    service.setService({
      ReadModifyWriteRow: async (
        stream: ReadModifyWriteRowWritableStream
      ): Promise<void> => {
        // stream.request = {rules: [], tableName: '', rowKey: Buffer(0), appProfileId: '', authorizedViewName: ''}
        console.log('test');
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
      const readModifyWriteRowFunction = readModifyWriteRow({clientMap});
      await new Promise((resolve, reject) => {
        readModifyWriteRowFunction(
          {
            request: {
              clientId: 'TestReadModifyWriteRow_NoRetry_TransientError',
              request: {
                appProfileId: '',
                rowKey: '',
                rules: [],
                tableName: '',
              },
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
