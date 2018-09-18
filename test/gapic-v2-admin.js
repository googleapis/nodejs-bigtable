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

const adminModule = require('../src');

let FAKE_STATUS_CODE = 1;
let error = new Error();
error.code = FAKE_STATUS_CODE;

describe('BigtableInstanceAdminClient', () => {
  describe('createInstance', function() {
    it('invokes createInstance without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.projectPath('[PROJECT]');
      let instanceId = 'instanceId-2101995259';
      let instance = {};
      let clusters = {};
      let request = {
        parent: formattedParent,
        instanceId: instanceId,
        instance: instance,
        clusters: clusters,
      };

      // Mock response
      let name = 'name3373707';
      let displayName = 'displayName1615086568';
      let expectedResponse = {
        name: name,
        displayName: displayName,
      };

      // Mock Grpc layer
      client._innerApiCalls.createInstance = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .createInstance(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes createInstance with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.projectPath('[PROJECT]');
      let instanceId = 'instanceId-2101995259';
      let instance = {};
      let clusters = {};
      let request = {
        parent: formattedParent,
        instanceId: instanceId,
        instance: instance,
        clusters: clusters,
      };

      // Mock Grpc layer
      client._innerApiCalls.createInstance = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .createInstance(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.createInstance
          .responseDecoder instanceof Function
      );
      assert(
        client._descriptors.longrunning.createInstance
          .metadataDecoder instanceof Function
      );
    });
  });

  describe('getInstance', () => {
    it('invokes getInstance without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        name: formattedName,
      };

      // Mock response
      let name2 = 'name2-1052831874';
      let displayName = 'displayName1615086568';
      let expectedResponse = {
        name: name2,
        displayName: displayName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getInstance = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getInstance(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getInstance with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getInstance = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getInstance(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('listInstances', () => {
    it('invokes listInstances without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.projectPath('[PROJECT]');
      let request = {
        parent: formattedParent,
      };

      // Mock response
      let nextPageToken = 'nextPageToken-1530815211';
      let expectedResponse = {
        nextPageToken: nextPageToken,
      };

      // Mock Grpc layer
      client._innerApiCalls.listInstances = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.listInstances(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes listInstances with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.projectPath('[PROJECT]');
      let request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listInstances = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.listInstances(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('updateInstance', () => {
    it('invokes updateInstance without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      let displayName = 'displayName1615086568';
      let type = 'TYPE_UNSPECIFIED';
      let labels = {};
      let request = {
        name: formattedName,
        displayName: displayName,
        type: type,
        labels: labels,
      };

      // Mock response
      let name2 = 'name2-1052831874';
      let displayName2 = 'displayName21615000987';
      let expectedResponse = {
        name: name2,
        displayName: displayName2,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateInstance = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.updateInstance(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes updateInstance with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      let displayName = 'displayName1615086568';
      let type = 'TYPE_UNSPECIFIED';
      let labels = {};
      let request = {
        name: formattedName,
        displayName: displayName,
        type: type,
        labels: labels,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateInstance = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.updateInstance(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('partialUpdateInstance', function() {
    it('invokes partialUpdateInstance without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let instance = {};
      let updateMask = {};
      let request = {
        instance: instance,
        updateMask: updateMask,
      };

      // Mock response
      let name = 'name3373707';
      let displayName = 'displayName1615086568';
      let expectedResponse = {
        name: name,
        displayName: displayName,
      };

      // Mock Grpc layer
      client._innerApiCalls.partialUpdateInstance = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .partialUpdateInstance(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes partialUpdateInstance with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let instance = {};
      let updateMask = {};
      let request = {
        instance: instance,
        updateMask: updateMask,
      };

      // Mock Grpc layer
      client._innerApiCalls.partialUpdateInstance = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .partialUpdateInstance(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.partialUpdateInstance
          .responseDecoder instanceof Function
      );
      assert(
        client._descriptors.longrunning.partialUpdateInstance
          .metadataDecoder instanceof Function
      );
    });
  });

  describe('deleteInstance', () => {
    it('invokes deleteInstance without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteInstance = mockSimpleGrpcMethod(request);

      client.deleteInstance(request, err => {
        assert.ifError(err);
        done();
      });
    });

    it('invokes deleteInstance with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteInstance = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.deleteInstance(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('createCluster', function() {
    it('invokes createCluster without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let clusterId = 'clusterId240280960';
      let cluster = {};
      let request = {
        parent: formattedParent,
        clusterId: clusterId,
        cluster: cluster,
      };

      // Mock response
      let name = 'name3373707';
      let location = 'location1901043637';
      let serveNodes = 1288838783;
      let expectedResponse = {
        name: name,
        location: location,
        serveNodes: serveNodes,
      };

      // Mock Grpc layer
      client._innerApiCalls.createCluster = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .createCluster(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes createCluster with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let clusterId = 'clusterId240280960';
      let cluster = {};
      let request = {
        parent: formattedParent,
        clusterId: clusterId,
        cluster: cluster,
      };

      // Mock Grpc layer
      client._innerApiCalls.createCluster = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .createCluster(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.createCluster.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.createCluster.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('getCluster', () => {
    it('invokes getCluster without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.clusterPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]'
      );
      let request = {
        name: formattedName,
      };

      // Mock response
      let name2 = 'name2-1052831874';
      let location = 'location1901043637';
      let serveNodes = 1288838783;
      let expectedResponse = {
        name: name2,
        location: location,
        serveNodes: serveNodes,
      };

      // Mock Grpc layer
      client._innerApiCalls.getCluster = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getCluster(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getCluster with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.clusterPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getCluster = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getCluster(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('listClusters', () => {
    it('invokes listClusters without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        parent: formattedParent,
      };

      // Mock response
      let nextPageToken = 'nextPageToken-1530815211';
      let expectedResponse = {
        nextPageToken: nextPageToken,
      };

      // Mock Grpc layer
      client._innerApiCalls.listClusters = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.listClusters(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes listClusters with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listClusters = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.listClusters(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('updateCluster', function() {
    it('invokes updateCluster without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.clusterPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]'
      );
      let location = 'location1901043637';
      let serveNodes = 1288838783;
      let request = {
        name: formattedName,
        location: location,
        serveNodes: serveNodes,
      };

      // Mock response
      let name2 = 'name2-1052831874';
      let location2 = 'location21541837352';
      let serveNodes2 = 1623486220;
      let expectedResponse = {
        name: name2,
        location: location2,
        serveNodes: serveNodes2,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateCluster = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .updateCluster(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes updateCluster with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.clusterPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]'
      );
      let location = 'location1901043637';
      let serveNodes = 1288838783;
      let request = {
        name: formattedName,
        location: location,
        serveNodes: serveNodes,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateCluster = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .updateCluster(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.updateCluster.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.updateCluster.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('deleteCluster', () => {
    it('invokes deleteCluster without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.clusterPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteCluster = mockSimpleGrpcMethod(request);

      client.deleteCluster(request, err => {
        assert.ifError(err);
        done();
      });
    });

    it('invokes deleteCluster with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.clusterPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteCluster = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.deleteCluster(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('createAppProfile', () => {
    it('invokes createAppProfile without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let appProfileId = 'appProfileId1262094415';
      let appProfile = {};
      let request = {
        parent: formattedParent,
        appProfileId: appProfileId,
        appProfile: appProfile,
      };

      // Mock response
      let name = 'name3373707';
      let etag = 'etag3123477';
      let description = 'description-1724546052';
      let expectedResponse = {
        name: name,
        etag: etag,
        description: description,
      };

      // Mock Grpc layer
      client._innerApiCalls.createAppProfile = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.createAppProfile(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes createAppProfile with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let appProfileId = 'appProfileId1262094415';
      let appProfile = {};
      let request = {
        parent: formattedParent,
        appProfileId: appProfileId,
        appProfile: appProfile,
      };

      // Mock Grpc layer
      client._innerApiCalls.createAppProfile = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.createAppProfile(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('getAppProfile', () => {
    it('invokes getAppProfile without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.appProfilePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[APP_PROFILE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock response
      let name2 = 'name2-1052831874';
      let etag = 'etag3123477';
      let description = 'description-1724546052';
      let expectedResponse = {
        name: name2,
        etag: etag,
        description: description,
      };

      // Mock Grpc layer
      client._innerApiCalls.getAppProfile = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getAppProfile(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getAppProfile with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.appProfilePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[APP_PROFILE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getAppProfile = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getAppProfile(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('listAppProfiles', () => {
    it('invokes listAppProfiles without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        parent: formattedParent,
      };

      // Mock response
      let nextPageToken = '';
      let appProfilesElement = {};
      let appProfiles = [appProfilesElement];
      let expectedResponse = {
        nextPageToken: nextPageToken,
        appProfiles: appProfiles,
      };

      // Mock Grpc layer
      client._innerApiCalls.listAppProfiles = (
        actualRequest,
        options,
        callback
      ) => {
        assert.deepStrictEqual(actualRequest, request);
        callback(null, expectedResponse.appProfiles);
      };

      client.listAppProfiles(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse.appProfiles);
        done();
      });
    });

    it('invokes listAppProfiles with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listAppProfiles = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.listAppProfiles(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('updateAppProfile', function() {
    it('invokes updateAppProfile without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let appProfile = {};
      let updateMask = {};
      let request = {
        appProfile: appProfile,
        updateMask: updateMask,
      };

      // Mock response
      let name = 'name3373707';
      let etag = 'etag3123477';
      let description = 'description-1724546052';
      let expectedResponse = {
        name: name,
        etag: etag,
        description: description,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateAppProfile = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .updateAppProfile(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes updateAppProfile with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let appProfile = {};
      let updateMask = {};
      let request = {
        appProfile: appProfile,
        updateMask: updateMask,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateAppProfile = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .updateAppProfile(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.updateAppProfile
          .responseDecoder instanceof Function
      );
      assert(
        client._descriptors.longrunning.updateAppProfile
          .metadataDecoder instanceof Function
      );
    });
  });

  describe('deleteAppProfile', () => {
    it('invokes deleteAppProfile without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.appProfilePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[APP_PROFILE]'
      );
      let ignoreWarnings = true;
      let request = {
        name: formattedName,
        ignoreWarnings: ignoreWarnings,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteAppProfile = mockSimpleGrpcMethod(request);

      client.deleteAppProfile(request, err => {
        assert.ifError(err);
        done();
      });
    });

    it('invokes deleteAppProfile with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.appProfilePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[APP_PROFILE]'
      );
      let ignoreWarnings = true;
      let request = {
        name: formattedName,
        ignoreWarnings: ignoreWarnings,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteAppProfile = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.deleteAppProfile(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('getIamPolicy', () => {
    it('invokes getIamPolicy without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        resource: formattedResource,
      };

      // Mock response
      let version = 351608024;
      let etag = 'etag3123477';
      let expectedResponse = {
        version: version,
        etag: etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.getIamPolicy = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getIamPolicy(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getIamPolicy with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        resource: formattedResource,
      };

      // Mock Grpc layer
      client._innerApiCalls.getIamPolicy = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getIamPolicy(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('setIamPolicy', () => {
    it('invokes setIamPolicy without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      let policy = {};
      let request = {
        resource: formattedResource,
        policy: policy,
      };

      // Mock response
      let version = 351608024;
      let etag = 'etag3123477';
      let expectedResponse = {
        version: version,
        etag: etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.setIamPolicy = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.setIamPolicy(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes setIamPolicy with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      let policy = {};
      let request = {
        resource: formattedResource,
        policy: policy,
      };

      // Mock Grpc layer
      client._innerApiCalls.setIamPolicy = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.setIamPolicy(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('testIamPermissions', () => {
    it('invokes testIamPermissions without error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      let permissions = [];
      let request = {
        resource: formattedResource,
        permissions: permissions,
      };

      // Mock response
      let expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.testIamPermissions = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.testIamPermissions(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes testIamPermissions with error', done => {
      let client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      let permissions = [];
      let request = {
        resource: formattedResource,
        permissions: permissions,
      };

      // Mock Grpc layer
      client._innerApiCalls.testIamPermissions = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.testIamPermissions(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
});
describe('BigtableTableAdminClient', () => {
  describe('createTable', () => {
    it('invokes createTable without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let tableId = 'tableId-895419604';
      let table = {};
      let request = {
        parent: formattedParent,
        tableId: tableId,
        table: table,
      };

      // Mock response
      let name = 'name3373707';
      let expectedResponse = {
        name: name,
      };

      // Mock Grpc layer
      client._innerApiCalls.createTable = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.createTable(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes createTable with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let tableId = 'tableId-895419604';
      let table = {};
      let request = {
        parent: formattedParent,
        tableId: tableId,
        table: table,
      };

      // Mock Grpc layer
      client._innerApiCalls.createTable = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.createTable(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('createTableFromSnapshot', function() {
    it('invokes createTableFromSnapshot without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let tableId = 'tableId-895419604';
      let sourceSnapshot = 'sourceSnapshot-947679896';
      let request = {
        parent: formattedParent,
        tableId: tableId,
        sourceSnapshot: sourceSnapshot,
      };

      // Mock response
      let name = 'name3373707';
      let expectedResponse = {
        name: name,
      };

      // Mock Grpc layer
      client._innerApiCalls.createTableFromSnapshot = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .createTableFromSnapshot(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes createTableFromSnapshot with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let tableId = 'tableId-895419604';
      let sourceSnapshot = 'sourceSnapshot-947679896';
      let request = {
        parent: formattedParent,
        tableId: tableId,
        sourceSnapshot: sourceSnapshot,
      };

      // Mock Grpc layer
      client._innerApiCalls.createTableFromSnapshot = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .createTableFromSnapshot(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.createTableFromSnapshot
          .responseDecoder instanceof Function
      );
      assert(
        client._descriptors.longrunning.createTableFromSnapshot
          .metadataDecoder instanceof Function
      );
    });
  });

  describe('listTables', () => {
    it('invokes listTables without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        parent: formattedParent,
      };

      // Mock response
      let nextPageToken = '';
      let tablesElement = {};
      let tables = [tablesElement];
      let expectedResponse = {
        nextPageToken: nextPageToken,
        tables: tables,
      };

      // Mock Grpc layer
      client._innerApiCalls.listTables = (actualRequest, options, callback) => {
        assert.deepStrictEqual(actualRequest, request);
        callback(null, expectedResponse.tables);
      };

      client.listTables(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse.tables);
        done();
      });
    });

    it('invokes listTables with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      let request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listTables = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.listTables(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('getTable', () => {
    it('invokes getTable without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock response
      let name2 = 'name2-1052831874';
      let expectedResponse = {
        name: name2,
      };

      // Mock Grpc layer
      client._innerApiCalls.getTable = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getTable(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getTable with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getTable = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getTable(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('deleteTable', () => {
    it('invokes deleteTable without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteTable = mockSimpleGrpcMethod(request);

      client.deleteTable(request, err => {
        assert.ifError(err);
        done();
      });
    });

    it('invokes deleteTable with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteTable = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.deleteTable(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('modifyColumnFamilies', () => {
    it('invokes modifyColumnFamilies without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let modifications = [];
      let request = {
        name: formattedName,
        modifications: modifications,
      };

      // Mock response
      let name2 = 'name2-1052831874';
      let expectedResponse = {
        name: name2,
      };

      // Mock Grpc layer
      client._innerApiCalls.modifyColumnFamilies = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.modifyColumnFamilies(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes modifyColumnFamilies with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let modifications = [];
      let request = {
        name: formattedName,
        modifications: modifications,
      };

      // Mock Grpc layer
      client._innerApiCalls.modifyColumnFamilies = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.modifyColumnFamilies(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('dropRowRange', () => {
    it('invokes dropRowRange without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.dropRowRange = mockSimpleGrpcMethod(request);

      client.dropRowRange(request, err => {
        assert.ifError(err);
        done();
      });
    });

    it('invokes dropRowRange with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.dropRowRange = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.dropRowRange(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('generateConsistencyToken', () => {
    it('invokes generateConsistencyToken without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock response
      let consistencyToken = 'consistencyToken-1090516718';
      let expectedResponse = {
        consistencyToken: consistencyToken,
      };

      // Mock Grpc layer
      client._innerApiCalls.generateConsistencyToken = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.generateConsistencyToken(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes generateConsistencyToken with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.generateConsistencyToken = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.generateConsistencyToken(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('checkConsistency', () => {
    it('invokes checkConsistency without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let consistencyToken = 'consistencyToken-1090516718';
      let request = {
        name: formattedName,
        consistencyToken: consistencyToken,
      };

      // Mock response
      let consistent = true;
      let expectedResponse = {
        consistent: consistent,
      };

      // Mock Grpc layer
      client._innerApiCalls.checkConsistency = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.checkConsistency(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes checkConsistency with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let consistencyToken = 'consistencyToken-1090516718';
      let request = {
        name: formattedName,
        consistencyToken: consistencyToken,
      };

      // Mock Grpc layer
      client._innerApiCalls.checkConsistency = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.checkConsistency(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('snapshotTable', function() {
    it('invokes snapshotTable without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let cluster = 'cluster872092154';
      let snapshotId = 'snapshotId-168585866';
      let description = 'description-1724546052';
      let request = {
        name: formattedName,
        cluster: cluster,
        snapshotId: snapshotId,
        description: description,
      };

      // Mock response
      let name2 = 'name2-1052831874';
      let dataSizeBytes = 2110122398;
      let description2 = 'description2568623279';
      let expectedResponse = {
        name: name2,
        dataSizeBytes: dataSizeBytes,
        description: description2,
      };

      // Mock Grpc layer
      client._innerApiCalls.snapshotTable = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .snapshotTable(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes snapshotTable with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.tablePath(
        '[PROJECT]',
        '[INSTANCE]',
        '[TABLE]'
      );
      let cluster = 'cluster872092154';
      let snapshotId = 'snapshotId-168585866';
      let description = 'description-1724546052';
      let request = {
        name: formattedName,
        cluster: cluster,
        snapshotId: snapshotId,
        description: description,
      };

      // Mock Grpc layer
      client._innerApiCalls.snapshotTable = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .snapshotTable(request)
        .then(responses => {
          let operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.snapshotTable.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.snapshotTable.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('getSnapshot', () => {
    it('invokes getSnapshot without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.snapshotPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]',
        '[SNAPSHOT]'
      );
      let request = {
        name: formattedName,
      };

      // Mock response
      let name2 = 'name2-1052831874';
      let dataSizeBytes = 2110122398;
      let description = 'description-1724546052';
      let expectedResponse = {
        name: name2,
        dataSizeBytes: dataSizeBytes,
        description: description,
      };

      // Mock Grpc layer
      client._innerApiCalls.getSnapshot = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getSnapshot(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getSnapshot with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.snapshotPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]',
        '[SNAPSHOT]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getSnapshot = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getSnapshot(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('listSnapshots', () => {
    it('invokes listSnapshots without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.clusterPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]'
      );
      let request = {
        parent: formattedParent,
      };

      // Mock response
      let nextPageToken = '';
      let snapshotsElement = {};
      let snapshots = [snapshotsElement];
      let expectedResponse = {
        nextPageToken: nextPageToken,
        snapshots: snapshots,
      };

      // Mock Grpc layer
      client._innerApiCalls.listSnapshots = (
        actualRequest,
        options,
        callback
      ) => {
        assert.deepStrictEqual(actualRequest, request);
        callback(null, expectedResponse.snapshots);
      };

      client.listSnapshots(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse.snapshots);
        done();
      });
    });

    it('invokes listSnapshots with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedParent = client.clusterPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]'
      );
      let request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listSnapshots = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.listSnapshots(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('deleteSnapshot', () => {
    it('invokes deleteSnapshot without error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.snapshotPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]',
        '[SNAPSHOT]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteSnapshot = mockSimpleGrpcMethod(request);

      client.deleteSnapshot(request, err => {
        assert.ifError(err);
        done();
      });
    });

    it('invokes deleteSnapshot with error', done => {
      let client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      let formattedName = client.snapshotPath(
        '[PROJECT]',
        '[INSTANCE]',
        '[CLUSTER]',
        '[SNAPSHOT]'
      );
      let request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteSnapshot = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.deleteSnapshot(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
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

function mockLongRunningGrpcMethod(expectedRequest, response, error) {
  return request => {
    assert.deepStrictEqual(request, expectedRequest);
    let mockOperation = {
      promise: function() {
        return new Promise((resolve, reject) => {
          if (error) {
            reject(error);
          } else {
            resolve([response]);
          }
        });
      },
    };
    return Promise.resolve([mockOperation]);
  };
}
