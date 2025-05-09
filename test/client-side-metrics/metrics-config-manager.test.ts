import * as assert from 'assert';
import {describe, it, beforeEach, afterEach} from 'mocha';
import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';

// Assuming GCPMetricsHandler is importable for type information,
// but its constructor will be stubbed.
import {GCPMetricsHandler as RealGCPMetricsHandler} from '../../src/client-side-metrics/gcp-metrics-handler';

describe('ClientSideMetricsConfigManager', () => {
  let ClientSideMetricsConfigManager: any;
  let gcpMetricsHandlerStub: sinon.SinonStub;

  beforeEach(() => {
    // Create a stub for the GCPMetricsHandler constructor
    gcpMetricsHandlerStub = sinon.stub();

    // Use proxyquire to inject the stubbed GCPMetricsHandler
    const metricsConfigManagerModule = proxyquire(
      '../../src/client-side-metrics/metrics-config-manager',
      {
        './gcp-metrics-handler': {
          GCPMetricsHandler: gcpMetricsHandlerStub,
        },
      },
    );
    ClientSideMetricsConfigManager =
      metricsConfigManagerModule.ClientSideMetricsConfigManager;

    // Reset the static store before each test to ensure test isolation
    ClientSideMetricsConfigManager.gcpHandlerStore = new Map();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a GCPMetricsHandler instance and pass options correctly', () => {
    const fakeOptions = {
      credentials: {key: 'value'},
      projectId: 'test-project-1',
    };
    const handler = ClientSideMetricsConfigManager.getGcpHandlerForProject(
      'test-project-1',
      fakeOptions,
    );

    assert.ok(handler, 'Handler instance should be created');
    assert.ok(
      gcpMetricsHandlerStub.calledOnce,
      'GCPMetricsHandler constructor should be called once',
    );
    assert.deepStrictEqual(
      gcpMetricsHandlerStub.firstCall.args[0],
      fakeOptions,
      'Options should be passed to GCPMetricsHandler constructor',
    );
  });

  it('should return the same GCPMetricsHandler instance for the same projectId', () => {
    const fakeOptions1 = {
      credentials: {key: 'value1'},
      projectId: 'test-project-1',
    };
    const handler1 = ClientSideMetricsConfigManager.getGcpHandlerForProject(
      'test-project-1',
      fakeOptions1,
    );

    const fakeOptions2 = {
      credentials: {key: 'value2'},
      projectId: 'test-project-1',
    };
    // Even with different options, for the same projectID, it should return the stored handler,
    // which was created with fakeOptions1.
    const handler2 = ClientSideMetricsConfigManager.getGcpHandlerForProject(
      'test-project-1',
      fakeOptions2,
    );

    assert.ok(
      gcpMetricsHandlerStub.calledOnce,
      'GCPMetricsHandler constructor should only be called once for the same project ID',
    );
    assert.strictEqual(
      handler1,
      handler2,
      'Should return the same handler instance for the same project ID',
    );
    // Verify it was constructed with the options from the first call.
    assert.deepStrictEqual(
      gcpMetricsHandlerStub.firstCall.args[0],
      fakeOptions1,
    );
  });

  it('should return different GCPMetricsHandler instances for different projectIds', () => {
    const fakeOptions1 = {
      credentials: {key: 'value1'},
      projectId: 'test-project-1',
    };
    const handler1 = ClientSideMetricsConfigManager.getGcpHandlerForProject(
      'test-project-1',
      fakeOptions1,
    );

    const fakeOptions2 = {
      credentials: {key: 'value2'},
      projectId: 'test-project-2',
    };
    const handler2 = ClientSideMetricsConfigManager.getGcpHandlerForProject(
      'test-project-2',
      fakeOptions2,
    );

    assert.ok(
      gcpMetricsHandlerStub.calledTwice,
      'GCPMetricsHandler constructor should be called twice for different project IDs',
    );
    assert.notStrictEqual(
      handler1,
      handler2,
      'Should return different handler instances for different project IDs',
    );
    assert.deepStrictEqual(
      gcpMetricsHandlerStub.firstCall.args[0],
      fakeOptions1,
      'First call options are correct',
    );
    assert.deepStrictEqual(
      gcpMetricsHandlerStub.secondCall.args[0],
      fakeOptions2,
      'Second call options are correct',
    );
  });

  it('should use the provided options object when creating a new handler', () => {
    const specificOptions = {setting: 'enabled', customData: {value: 123}};
    ClientSideMetricsConfigManager.getGcpHandlerForProject(
      'new-project',
      specificOptions,
    );

    assert.ok(
      gcpMetricsHandlerStub.calledOnce,
      'GCPMetricsHandler constructor should be called',
    );
    assert.deepStrictEqual(
      gcpMetricsHandlerStub.firstCall.args[0],
      specificOptions,
      'The specific options object should be passed',
    );
  });
});
