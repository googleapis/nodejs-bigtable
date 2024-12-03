import * as assert from 'assert';

import {describe} from 'mocha';
import {protos} from '../../src';
import {BigtableClient} from '../../src/v2';
import type {Callback, CallOptions} from 'google-gax';
const readModifyWriteRow = require('../../../testproxy/services/read-modify-write-row.js');
const createClient = require('../../../testproxy/services/create-client.js');

describe.only('TestProxy/ReadModifyWriteRow', () => {
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
    (async () => {
      const clientMap = new Map();
      const createClientFunction = createClient({clientMap});
      await new Promise((resolve, reject) => {
        createClientFunction(
          {
            request: {
              clientId: 'TestReadModifyWriteRow_NoRetry_TransientError',
              dataTarget: `localhost:1234`,
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
        request?: protos.google.bigtable.v2.IReadModifyWriteRowRequest
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
    })();
  });
});
