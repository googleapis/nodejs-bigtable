import {describe, it} from 'mocha';
import {Bigtable} from '../src';
import * as v2 from '../src/v2';
import {PassThrough} from 'stream';
import * as assert from 'assert';

import jsonProtos = require('../protos/protos.json');

import grpc = require('@grpc/grpc-js');
import protoLoader = require('@grpc/proto-loader');
import {GoogleError} from 'google-gax';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const packageDefinition = protoLoader.fromJSON(jsonProtos, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const errorDetails =
  'Table not found: projects/my-project/instances/my-instance/tables/my-table';
const readRows = (call: any, example: any) => {
  // const internalRepr = new Map();
  // internalRepr.set('grpc-server-stats-bin', [
  //   Buffer.from([0, 0, 201, 39, 110, 3, 0, 0, 0, 0]),
  // ]);
  // call.emit('error', {
  //   code: 5,
  //   details:
  //     'Table not found: projects/my-project/instances/my-instance/tables/my-table',
  //   metadata: {
  //     internalRepr,
  //     options: {},
  //   },
  // });
  call.emit('error', {
    code: 5,
    details: errorDetails,
  });
};
const proto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const service = proto.google.bigtable.v2.Bigtable.service;
server.addService(service, {
  ReadRows: readRows,
});
server.bindAsync(
  'localhost:1234',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);

describe('Bigtable/Grpc-mock', () => {
  it('should produce human readable error when passing through gax', done => {
    const bigtable = new Bigtable({apiEndpoint: 'localhost:1234'});
    const clientConfig = 'BigtableClient';
    const gaxClient = new v2[clientConfig]({});
    const stream = new PassThrough({objectMode: true});
    gaxClient.innerApiCalls.readRows = () => {
      return stream;
    };
    const table = bigtable.instance('fake-instance').table('fake-table');
    const readStream = table.createReadStream({});
    readStream.on('error', (err: GoogleError) => {
      const {code, statusDetails, message} = err;
      assert.strictEqual(statusDetails, errorDetails);
      assert.strictEqual(code, 5);
      assert.strictEqual(
        message,
        '5 NOT_FOUND: Table not found: projects/my-project/instances/my-instance/tables/my-table'
      );
      done();
    });
  });
});
