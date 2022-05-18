import {describe, it} from 'mocha';
import {Bigtable} from '../src';
import * as v2 from '../src/v2';
import {PassThrough} from 'stream';

import * as protos from '../protos/protos';
import jsonProtos = require('../protos/protos.json');

import grpc = require('@grpc/grpc-js');
import protoLoader = require('@grpc/proto-loader');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const packageDefinition = protoLoader.fromJSON(jsonProtos, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const readRows = (arg1: any, arg2: any) => {
  console.log(arg1, arg2);
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
  it('error should not change when emitted from gax', done => {
    const bigtable = new Bigtable({apiEndpoint: 'localhost:1234'});
    const clientConfig = 'BigtableClient';
    const gaxClient = new v2[clientConfig]({});
    const stream = new PassThrough({objectMode: true});
    gaxClient.innerApiCalls.readRows = () => {
      return stream;
    };
    const table = bigtable.instance('fake-instance').table('fake-table');
    const readStream = table.createReadStream({});
    readStream.on('error', err => {
      console.log(err);
      done();
    });
    console.log('test');
  });
});
