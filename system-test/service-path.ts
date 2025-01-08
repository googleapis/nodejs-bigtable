import {describe, it} from 'mocha';
import * as assert from 'assert';
import {ServiceError} from 'google-gax';
import {Bigtable} from '../src';
import {BigtableClient, BigtableInstanceAdminClient} from '../src/v2';

describe('Service Path', () => {
  it('Setting universe domain should set the service path', async () => {
    const universeDomain = 'someUniverseDomain'; // or your universe domain if not using emulator
    const options = {
      universeDomain,
    };
    const bigtable = new Bigtable({
      BigtableClient: options,
      BigtableInstanceAdminClient: options,
      BigtableTableAdminClient: options,
    });
    // Need to mock getProjectId_ since it normally uses auth and auth isn't
    // available in unit tests.
    bigtable.getProjectId_ = (
      callback: (err: Error | null, projectId?: string) => void
    ) => {
      callback(null, 'projectId');
    };
    try {
      // This is necessary to initialize the bigtable instance admin client.
      await bigtable.getInstances({timeout: 1000});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        'Total timeout of API google.bigtable.admin.v2.BigtableInstanceAdmin exceeded 1000 milliseconds retrying error Error: 14 UNAVAILABLE: Name resolution failed for target dns:bigtableadmin.someUniverseDomain:443  before any response was received.'
      );
    } finally {
      assert.strictEqual(
        (
          bigtable.api
            .BigtableInstanceAdminClient as BigtableInstanceAdminClient
        )['_opts'].servicePath,
        `bigtableadmin.${universeDomain}`
      );
    }
    try {
      // This will fail in unit tests, but is necessary to initialize the
      // bigtable client.
      const instance = bigtable.instance('instanceId');
      const table = instance.table('tableId');
      await table.getRows({gaxOptions: {timeout: 1000}});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        '14 UNAVAILABLE: Name resolution failed for target dns:bigtable.someUniverseDomain:443'
      );
    } finally {
      assert.strictEqual(
        (bigtable.api.BigtableClient as BigtableClient)['_opts'].servicePath,
        `bigtable.${universeDomain}`
      );
    }
  });
  it('Setting universe domain and custom endpoint should set the service path to custom endpoint', async () => {
    const universeDomain = 'someUniverseDomain'; // or your universe domain if not using emulator
    const apiEndpoint = 'someApiEndpoint';
    const options = {
      universeDomain,
    };
    const bigtable = new Bigtable({
      apiEndpoint,
      BigtableClient: options,
      BigtableInstanceAdminClient: options,
      BigtableTableAdminClient: options,
    });
    // Need to mock getProjectId_ since it normally uses auth and auth isn't
    // available in unit tests.
    bigtable.getProjectId_ = (
      callback: (err: Error | null, projectId?: string) => void
    ) => {
      callback(null, 'projectId');
    };
    try {
      // This is necessary to initialize the bigtable instance admin client.
      await bigtable.getInstances({timeout: 1000});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        'Total timeout of API google.bigtable.admin.v2.BigtableInstanceAdmin exceeded 1000 milliseconds retrying error Error: 14 UNAVAILABLE: Name resolution failed for target dns:someApiEndpoint:443  before any response was received.'
      );
    } finally {
      assert.strictEqual(
        (
          bigtable.api
            .BigtableInstanceAdminClient as BigtableInstanceAdminClient
        )['_opts'].servicePath,
        apiEndpoint
      );
    }
    try {
      // This will fail in unit tests, but is necessary to initialize the
      // bigtable client.
      const instance = bigtable.instance('instanceId');
      const table = instance.table('tableId');
      await table.getRows({gaxOptions: {timeout: 1000}});
    } catch (e) {
      assert.strictEqual(
        (e as ServiceError).message,
        '14 UNAVAILABLE: Name resolution failed for target dns:someApiEndpoint:443'
      );
    } finally {
      assert.strictEqual(
        (bigtable.api.BigtableClient as BigtableClient)['_opts'].servicePath,
        apiEndpoint
      );
    }
  });
});
