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

import * as assert from 'assert';

const adminModule = require('../src');

const FAKE_STATUS_CODE = 1;
const error: any = new Error();
error.code = FAKE_STATUS_CODE;

describe('BigtableInstanceAdminClient', () => {
  describe('createInstance', function() {
    it('invokes createInstance without error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.projectPath('[PROJECT]');
      const instanceId = 'instanceId-2101995259';
      const instance = {};
      const clusters = {};
      const request = {
        parent: formattedParent,
        instanceId,
        instance,
        clusters,
      };

      // Mock response
      const name = 'name3373707';
      const displayName = 'displayName1615086568';
      const expectedResponse = {
        name,
        displayName,
      };

      // Mock Grpc layer
      client._innerApiCalls.createInstance =
          mockLongRunningGrpcMethod(request, expectedResponse);

      client.createInstance(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.projectPath('[PROJECT]');
      const instanceId = 'instanceId-2101995259';
      const instance = {};
      const clusters = {};
      const request = {
        parent: formattedParent,
        instanceId,
        instance,
        clusters,
      };

      // Mock Grpc layer
      client._innerApiCalls.createInstance =
          mockLongRunningGrpcMethod(request, null, error);

      client.createInstance(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
          client._descriptors.longrunning.createInstance
              .responseDecoder instanceof
          Function);
      assert(
          client._descriptors.longrunning.createInstance
              .metadataDecoder instanceof
          Function);
    });
  });

  describe('getInstance', () => {
    it('invokes getInstance without error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const displayName = 'displayName1615086568';
      const expectedResponse = {
        name: name2,
        displayName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getInstance =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.getInstance(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getInstance with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getInstance =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.projectPath('[PROJECT]');
      const request = {
        parent: formattedParent,
      };

      // Mock response
      const nextPageToken = 'nextPageToken-1530815211';
      const expectedResponse = {
        nextPageToken,
      };

      // Mock Grpc layer
      client._innerApiCalls.listInstances =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.listInstances(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes listInstances with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.projectPath('[PROJECT]');
      const request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listInstances =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      const displayName = 'displayName1615086568';
      const type = 'TYPE_UNSPECIFIED';
      const labels = {};
      const request = {
        name: formattedName,
        displayName,
        type,
        labels,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const displayName2 = 'displayName21615000987';
      const expectedResponse = {
        name: name2,
        displayName: displayName2,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateInstance =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.updateInstance(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes updateInstance with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      const displayName = 'displayName1615086568';
      const type = 'TYPE_UNSPECIFIED';
      const labels = {};
      const request = {
        name: formattedName,
        displayName,
        type,
        labels,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateInstance =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const instance = {};
      const updateMask = {};
      const request = {
        instance,
        updateMask,
      };

      // Mock response
      const name = 'name3373707';
      const displayName = 'displayName1615086568';
      const expectedResponse = {
        name,
        displayName,
      };

      // Mock Grpc layer
      client._innerApiCalls.partialUpdateInstance =
          mockLongRunningGrpcMethod(request, expectedResponse);

      client.partialUpdateInstance(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const instance = {};
      const updateMask = {};
      const request = {
        instance,
        updateMask,
      };

      // Mock Grpc layer
      client._innerApiCalls.partialUpdateInstance =
          mockLongRunningGrpcMethod(request, null, error);

      client.partialUpdateInstance(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
          client._descriptors.longrunning.partialUpdateInstance
              .responseDecoder instanceof
          Function);
      assert(
          client._descriptors.longrunning.partialUpdateInstance
              .metadataDecoder instanceof
          Function);
    });
  });

  describe('deleteInstance', () => {
    it('invokes deleteInstance without error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteInstance =
          mockSimpleGrpcMethod(request, null, error);

      client.deleteInstance(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('createCluster', function() {
    it('invokes createCluster without error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const clusterId = 'clusterId240280960';
      const cluster = {};
      const request = {
        parent: formattedParent,
        clusterId,
        cluster,
      };

      // Mock response
      const name = 'name3373707';
      const location = 'location1901043637';
      const serveNodes = 1288838783;
      const expectedResponse = {
        name,
        location,
        serveNodes,
      };

      // Mock Grpc layer
      client._innerApiCalls.createCluster =
          mockLongRunningGrpcMethod(request, expectedResponse);

      client.createCluster(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const clusterId = 'clusterId240280960';
      const cluster = {};
      const request = {
        parent: formattedParent,
        clusterId,
        cluster,
      };

      // Mock Grpc layer
      client._innerApiCalls.createCluster =
          mockLongRunningGrpcMethod(request, null, error);

      client.createCluster(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
          client._descriptors.longrunning.createCluster
              .responseDecoder instanceof
          Function);
      assert(
          client._descriptors.longrunning.createCluster
              .metadataDecoder instanceof
          Function);
    });
  });

  describe('getCluster', () => {
    it('invokes getCluster without error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const location = 'location1901043637';
      const serveNodes = 1288838783;
      const expectedResponse = {
        name: name2,
        location,
        serveNodes,
      };

      // Mock Grpc layer
      client._innerApiCalls.getCluster =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.getCluster(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getCluster with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getCluster =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        parent: formattedParent,
      };

      // Mock response
      const nextPageToken = 'nextPageToken-1530815211';
      const expectedResponse = {
        nextPageToken,
      };

      // Mock Grpc layer
      client._innerApiCalls.listClusters =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.listClusters(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes listClusters with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listClusters =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
      const location = 'location1901043637';
      const serveNodes = 1288838783;
      const request = {
        name: formattedName,
        location,
        serveNodes,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const location2 = 'location21541837352';
      const serveNodes2 = 1623486220;
      const expectedResponse = {
        name: name2,
        location: location2,
        serveNodes: serveNodes2,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateCluster =
          mockLongRunningGrpcMethod(request, expectedResponse);

      client.updateCluster(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
      const location = 'location1901043637';
      const serveNodes = 1288838783;
      const request = {
        name: formattedName,
        location,
        serveNodes,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateCluster =
          mockLongRunningGrpcMethod(request, null, error);

      client.updateCluster(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
          client._descriptors.longrunning.updateCluster
              .responseDecoder instanceof
          Function);
      assert(
          client._descriptors.longrunning.updateCluster
              .metadataDecoder instanceof
          Function);
    });
  });

  describe('deleteCluster', () => {
    it('invokes deleteCluster without error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
      const request = {
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteCluster =
          mockSimpleGrpcMethod(request, null, error);

      client.deleteCluster(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('createAppProfile', () => {
    it('invokes createAppProfile without error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const appProfileId = 'appProfileId1262094415';
      const appProfile = {};
      const request = {
        parent: formattedParent,
        appProfileId,
        appProfile,
      };

      // Mock response
      const name = 'name3373707';
      const etag = 'etag3123477';
      const description = 'description-1724546052';
      const expectedResponse = {
        name,
        etag,
        description,
      };

      // Mock Grpc layer
      client._innerApiCalls.createAppProfile =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.createAppProfile(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes createAppProfile with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const appProfileId = 'appProfileId1262094415';
      const appProfile = {};
      const request = {
        parent: formattedParent,
        appProfileId,
        appProfile,
      };

      // Mock Grpc layer
      client._innerApiCalls.createAppProfile =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.appProfilePath('[PROJECT]', '[INSTANCE]', '[APP_PROFILE]');
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const etag = 'etag3123477';
      const description = 'description-1724546052';
      const expectedResponse = {
        name: name2,
        etag,
        description,
      };

      // Mock Grpc layer
      client._innerApiCalls.getAppProfile =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.getAppProfile(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getAppProfile with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.appProfilePath('[PROJECT]', '[INSTANCE]', '[APP_PROFILE]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getAppProfile =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        parent: formattedParent,
      };

      // Mock response
      const nextPageToken = '';
      const appProfilesElement = {};
      const appProfiles = [appProfilesElement];
      const expectedResponse = {
        nextPageToken,
        appProfiles,
      };

      // Mock Grpc layer
      client._innerApiCalls.listAppProfiles =
          (actualRequest, options, callback) => {
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listAppProfiles =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const appProfile = {};
      const updateMask = {};
      const request = {
        appProfile,
        updateMask,
      };

      // Mock response
      const name = 'name3373707';
      const etag = 'etag3123477';
      const description = 'description-1724546052';
      const expectedResponse = {
        name,
        etag,
        description,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateAppProfile =
          mockLongRunningGrpcMethod(request, expectedResponse);

      client.updateAppProfile(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const appProfile = {};
      const updateMask = {};
      const request = {
        appProfile,
        updateMask,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateAppProfile =
          mockLongRunningGrpcMethod(request, null, error);

      client.updateAppProfile(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
          client._descriptors.longrunning.updateAppProfile
              .responseDecoder instanceof
          Function);
      assert(
          client._descriptors.longrunning.updateAppProfile
              .metadataDecoder instanceof
          Function);
    });
  });

  describe('deleteAppProfile', () => {
    it('invokes deleteAppProfile without error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.appProfilePath('[PROJECT]', '[INSTANCE]', '[APP_PROFILE]');
      const ignoreWarnings = true;
      const request = {
        name: formattedName,
        ignoreWarnings,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteAppProfile = mockSimpleGrpcMethod(request);

      client.deleteAppProfile(request, err => {
        assert.ifError(err);
        done();
      });
    });

    it('invokes deleteAppProfile with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.appProfilePath('[PROJECT]', '[INSTANCE]', '[APP_PROFILE]');
      const ignoreWarnings = true;
      const request = {
        name: formattedName,
        ignoreWarnings,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteAppProfile =
          mockSimpleGrpcMethod(request, null, error);

      client.deleteAppProfile(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('getIamPolicy', () => {
    it('invokes getIamPolicy without error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        resource: formattedResource,
      };

      // Mock response
      const version = 351608024;
      const etag = 'etag3123477';
      const expectedResponse = {
        version,
        etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.getIamPolicy =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.getIamPolicy(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getIamPolicy with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        resource: formattedResource,
      };

      // Mock Grpc layer
      client._innerApiCalls.getIamPolicy =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      const policy = {};
      const request = {
        resource: formattedResource,
        policy,
      };

      // Mock response
      const version = 351608024;
      const etag = 'etag3123477';
      const expectedResponse = {
        version,
        etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.setIamPolicy =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.setIamPolicy(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes setIamPolicy with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      const policy = {};
      const request = {
        resource: formattedResource,
        policy,
      };

      // Mock Grpc layer
      client._innerApiCalls.setIamPolicy =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      const permissions = [];
      const request = {
        resource: formattedResource,
        permissions,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.testIamPermissions =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.testIamPermissions(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes testIamPermissions with error', done => {
      const client = new adminModule.v2.BigtableInstanceAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedResource = client.instancePath('[PROJECT]', '[INSTANCE]');
      const permissions = [];
      const request = {
        resource: formattedResource,
        permissions,
      };

      // Mock Grpc layer
      client._innerApiCalls.testIamPermissions =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const tableId = 'tableId-895419604';
      const table = {};
      const request = {
        parent: formattedParent,
        tableId,
        table,
      };

      // Mock response
      const name = 'name3373707';
      const expectedResponse = {
        name,
      };

      // Mock Grpc layer
      client._innerApiCalls.createTable =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.createTable(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes createTable with error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const tableId = 'tableId-895419604';
      const table = {};
      const request = {
        parent: formattedParent,
        tableId,
        table,
      };

      // Mock Grpc layer
      client._innerApiCalls.createTable =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const tableId = 'tableId-895419604';
      const sourceSnapshot = 'sourceSnapshot-947679896';
      const request = {
        parent: formattedParent,
        tableId,
        sourceSnapshot,
      };

      // Mock response
      const name = 'name3373707';
      const expectedResponse = {
        name,
      };

      // Mock Grpc layer
      client._innerApiCalls.createTableFromSnapshot =
          mockLongRunningGrpcMethod(request, expectedResponse);

      client.createTableFromSnapshot(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const tableId = 'tableId-895419604';
      const sourceSnapshot = 'sourceSnapshot-947679896';
      const request = {
        parent: formattedParent,
        tableId,
        sourceSnapshot,
      };

      // Mock Grpc layer
      client._innerApiCalls.createTableFromSnapshot =
          mockLongRunningGrpcMethod(request, null, error);

      client.createTableFromSnapshot(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
          client._descriptors.longrunning.createTableFromSnapshot
              .responseDecoder instanceof
          Function);
      assert(
          client._descriptors.longrunning.createTableFromSnapshot
              .metadataDecoder instanceof
          Function);
    });
  });

  describe('listTables', () => {
    it('invokes listTables without error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        parent: formattedParent,
      };

      // Mock response
      const nextPageToken = '';
      const tablesElement = {};
      const tables = [tablesElement];
      const expectedResponse = {
        nextPageToken,
        tables,
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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.instancePath('[PROJECT]', '[INSTANCE]');
      const request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listTables =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const expectedResponse = {
        name: name2,
      };

      // Mock Grpc layer
      client._innerApiCalls.getTable =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.getTable(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getTable with error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getTable =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const request = {
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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteTable =
          mockSimpleGrpcMethod(request, null, error);

      client.deleteTable(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('modifyColumnFamilies', () => {
    it('invokes modifyColumnFamilies without error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const modifications = [];
      const request = {
        name: formattedName,
        modifications,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const expectedResponse = {
        name: name2,
      };

      // Mock Grpc layer
      client._innerApiCalls.modifyColumnFamilies =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.modifyColumnFamilies(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes modifyColumnFamilies with error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const modifications = [];
      const request = {
        name: formattedName,
        modifications,
      };

      // Mock Grpc layer
      client._innerApiCalls.modifyColumnFamilies =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const request = {
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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.dropRowRange =
          mockSimpleGrpcMethod(request, null, error);

      client.dropRowRange(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });

  describe('generateConsistencyToken', () => {
    it('invokes generateConsistencyToken without error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const request = {
        name: formattedName,
      };

      // Mock response
      const consistencyToken = 'consistencyToken-1090516718';
      const expectedResponse = {
        consistencyToken,
      };

      // Mock Grpc layer
      client._innerApiCalls.generateConsistencyToken =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.generateConsistencyToken(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes generateConsistencyToken with error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.generateConsistencyToken =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const consistencyToken = 'consistencyToken-1090516718';
      const request = {
        name: formattedName,
        consistencyToken,
      };

      // Mock response
      const consistent = true;
      const expectedResponse = {
        consistent,
      };

      // Mock Grpc layer
      client._innerApiCalls.checkConsistency =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.checkConsistency(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes checkConsistency with error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const consistencyToken = 'consistencyToken-1090516718';
      const request = {
        name: formattedName,
        consistencyToken,
      };

      // Mock Grpc layer
      client._innerApiCalls.checkConsistency =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const cluster = 'cluster872092154';
      const snapshotId = 'snapshotId-168585866';
      const description = 'description-1724546052';
      const request = {
        name: formattedName,
        cluster,
        snapshotId,
        description,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const dataSizeBytes = 2110122398;
      const description2 = 'description2568623279';
      const expectedResponse = {
        name: name2,
        dataSizeBytes,
        description: description2,
      };

      // Mock Grpc layer
      client._innerApiCalls.snapshotTable =
          mockLongRunningGrpcMethod(request, expectedResponse);

      client.snapshotTable(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName =
          client.tablePath('[PROJECT]', '[INSTANCE]', '[TABLE]');
      const cluster = 'cluster872092154';
      const snapshotId = 'snapshotId-168585866';
      const description = 'description-1724546052';
      const request = {
        name: formattedName,
        cluster,
        snapshotId,
        description,
      };

      // Mock Grpc layer
      client._innerApiCalls.snapshotTable =
          mockLongRunningGrpcMethod(request, null, error);

      client.snapshotTable(request)
          .then(responses => {
            const operation = responses[0];
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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
          client._descriptors.longrunning.snapshotTable
              .responseDecoder instanceof
          Function);
      assert(
          client._descriptors.longrunning.snapshotTable
              .metadataDecoder instanceof
          Function);
    });
  });

  describe('getSnapshot', () => {
    it('invokes getSnapshot without error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.snapshotPath(
          '[PROJECT]', '[INSTANCE]', '[CLUSTER]', '[SNAPSHOT]');
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const dataSizeBytes = 2110122398;
      const description = 'description-1724546052';
      const expectedResponse = {
        name: name2,
        dataSizeBytes,
        description,
      };

      // Mock Grpc layer
      client._innerApiCalls.getSnapshot =
          mockSimpleGrpcMethod(request, expectedResponse);

      client.getSnapshot(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getSnapshot with error', done => {
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.snapshotPath(
          '[PROJECT]', '[INSTANCE]', '[CLUSTER]', '[SNAPSHOT]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getSnapshot =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent =
          client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
      const request = {
        parent: formattedParent,
      };

      // Mock response
      const nextPageToken = '';
      const snapshotsElement = {};
      const snapshots = [snapshotsElement];
      const expectedResponse = {
        nextPageToken,
        snapshots,
      };

      // Mock Grpc layer
      client._innerApiCalls.listSnapshots =
          (actualRequest, options, callback) => {
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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent =
          client.clusterPath('[PROJECT]', '[INSTANCE]', '[CLUSTER]');
      const request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listSnapshots =
          mockSimpleGrpcMethod(request, null, error);

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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.snapshotPath(
          '[PROJECT]', '[INSTANCE]', '[CLUSTER]', '[SNAPSHOT]');
      const request = {
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
      const client = new adminModule.v2.BigtableTableAdminClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.snapshotPath(
          '[PROJECT]', '[INSTANCE]', '[CLUSTER]', '[SNAPSHOT]');
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteSnapshot =
          mockSimpleGrpcMethod(request, null, error);

      client.deleteSnapshot(request, err => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        done();
      });
    });
  });
});

function mockSimpleGrpcMethod(expectedRequest, response?, error?) {
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

function mockLongRunningGrpcMethod(expectedRequest, response, error?) {
  return request => {
    assert.deepStrictEqual(request, expectedRequest);
    const mockOperation = {
      promise() {
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
