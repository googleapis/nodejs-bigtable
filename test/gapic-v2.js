// Copyright 2018 Google LLC
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

'use strict';

const assert = require('assert');
const through2 = require('through2');

const bigtableModule = require('../src');

var FAKE_STATUS_CODE = 1;
var error = new Error();
error.code = FAKE_STATUS_CODE;

describe('BigtableClient', () => {
  describe('readRows', () => {
    it('invokes readRows without error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var request = {
        tableName: formattedTableName,
      };

      // Mock response
      var lastScannedRowKey = '-126';
      var expectedResponse = {
        lastScannedRowKey: lastScannedRowKey,
      };

      // Mock Grpc layer
      client._innerApiCalls.readRows = mockServerStreamingGrpcMethod(
        request,
        expectedResponse
      );

      var stream = client.readRows(request);
      stream.on('data', response => {
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
      stream.on('error', err => {
        done(err);
      });

      stream.write();
    });

    it('invokes readRows with error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var request = {
        tableName: formattedTableName,
      };

      // Mock Grpc layer
      client._innerApiCalls.readRows = mockServerStreamingGrpcMethod(
        request,
        null,
        error
      );

      var stream = client.readRows(request);
      stream.on('data', () => {
        assert.fail();
      });
      stream.on('error', err => {
        assert(err instanceof Error);
        assert.equal(err.code, FAKE_STATUS_CODE);
        done();
      });

      stream.write();
    });
  });

  describe('sampleRowKeys', () => {
    it('invokes sampleRowKeys without error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var request = {
        tableName: formattedTableName,
      };

      // Mock response
      var rowKey = '122';
      var offsetBytes = 889884095;
      var expectedResponse = {
        rowKey: rowKey,
        offsetBytes: offsetBytes,
      };

      // Mock Grpc layer
      client._innerApiCalls.sampleRowKeys = mockServerStreamingGrpcMethod(
        request,
        expectedResponse
      );

      var stream = client.sampleRowKeys(request);
      stream.on('data', response => {
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
      stream.on('error', err => {
        done(err);
      });

      stream.write();
    });

    it('invokes sampleRowKeys with error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var request = {
        tableName: formattedTableName,
      };

      // Mock Grpc layer
      client._innerApiCalls.sampleRowKeys = mockServerStreamingGrpcMethod(
        request,
        null,
        error
      );

      var stream = client.sampleRowKeys(request);
      stream.on('data', () => {
        assert.fail();
      });
      stream.on('error', err => {
        assert(err instanceof Error);
        assert.equal(err.code, FAKE_STATUS_CODE);
        done();
      });

      stream.write();
    });
  });

  describe('mutateRow', () => {
    it('invokes mutateRow without error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var rowKey = '122';
      var mutations = [];
      var request = {
        tableName: formattedTableName,
        rowKey: rowKey,
        mutations: mutations,
      };

      // Mock response
      var expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.mutateRow = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.mutateRow(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes mutateRow with error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var rowKey = '122';
      var mutations = [];
      var request = {
        tableName: formattedTableName,
        rowKey: rowKey,
        mutations: mutations,
      };

      // Mock Grpc layer
      client._innerApiCalls.mutateRow = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.mutateRow(request, (err, response) => {
        assert(err instanceof Error);
        assert.equal(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('mutateRows', () => {
    it('invokes mutateRows without error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var entries = [];
      var request = {
        tableName: formattedTableName,
        entries: entries,
      };

      // Mock response
      var expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.mutateRows = mockServerStreamingGrpcMethod(
        request,
        expectedResponse
      );

      var stream = client.mutateRows(request);
      stream.on('data', response => {
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
      stream.on('error', err => {
        done(err);
      });

      stream.write();
    });

    it('invokes mutateRows with error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var entries = [];
      var request = {
        tableName: formattedTableName,
        entries: entries,
      };

      // Mock Grpc layer
      client._innerApiCalls.mutateRows = mockServerStreamingGrpcMethod(
        request,
        null,
        error
      );

      var stream = client.mutateRows(request);
      stream.on('data', () => {
        assert.fail();
      });
      stream.on('error', err => {
        assert(err instanceof Error);
        assert.equal(err.code, FAKE_STATUS_CODE);
        done();
      });

      stream.write();
    });
  });

  describe('checkAndMutateRow', () => {
    it('invokes checkAndMutateRow without error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var rowKey = '122';
      var request = {
        tableName: formattedTableName,
        rowKey: rowKey,
      };

      // Mock response
      var predicateMatched = true;
      var expectedResponse = {
        predicateMatched: predicateMatched,
      };

      // Mock Grpc layer
      client._innerApiCalls.checkAndMutateRow = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.checkAndMutateRow(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes checkAndMutateRow with error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var rowKey = '122';
      var request = {
        tableName: formattedTableName,
        rowKey: rowKey,
      };

      // Mock Grpc layer
      client._innerApiCalls.checkAndMutateRow = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.checkAndMutateRow(request, (err, response) => {
        assert(err instanceof Error);
        assert.equal(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('readModifyWriteRow', () => {
    it('invokes readModifyWriteRow without error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var rowKey = '122';
      var rules = [];
      var request = {
        tableName: formattedTableName,
        rowKey: rowKey,
        rules: rules,
      };

      // Mock response
      var expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.readModifyWriteRow = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.readModifyWriteRow(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes readModifyWriteRow with error', done => {
      var client = new bigtableModule.v2.BigtableClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      var formattedTableName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      var rowKey = '122';
      var rules = [];
      var request = {
        tableName: formattedTableName,
        rowKey: rowKey,
        rules: rules,
      };

      // Mock Grpc layer
      client._innerApiCalls.readModifyWriteRow = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.readModifyWriteRow(request, (err, response) => {
        assert(err instanceof Error);
        assert.equal(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
});

function mockSimpleGrpcMethod(expectedRequest, response, error) {
  return function(actualRequest, options, callback) {
    assert.deepStrictEqual(actualRequest, expectedRequest);
    if (error) {
      callback(error);
    } else if (response) {
      callback(null, response);
    } else {
      callback(null);
    }
  };
}

function mockServerStreamingGrpcMethod(expectedRequest, response, error) {
  return actualRequest => {
    assert.deepStrictEqual(actualRequest, expectedRequest);
    var mockStream = through2.obj((chunk, enc, callback) => {
      if (error) {
        callback(error);
      } else {
        callback(null, response);
      }
    });
    return mockStream;
  };
}
