// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {PreciseDate} from '@google-cloud/precise-date';
import * as promisify from '@google-cloud/promisify';
import * as assert from 'assert';
import {before, beforeEach, describe, it} from 'mocha';
import * as proxyquire from 'proxyquire';
import * as pumpify from 'pumpify';
import {ServiceError} from 'google-gax';

import * as clusterTypes from '../src/cluster';
import * as backupTypes from '../src/backup';

import {Bigtable} from '../src';

let promisified = false;
const fakePromisify = Object.assign({}, promisify, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promisifyAll(klass: Function, options: any) {
    if (klass.name === 'Backup') {
      promisified = true;
      assert.deepStrictEqual(options.exclude, [
        'endDate',
        'expireDate',
        'startDate',
      ]);
    }
  },
});

describe.only('Bigtable/Backup', () => {
  const BACKUP_ID = 'my-backup';
  let CLUSTER: clusterTypes.Cluster;
  let BACKUP_NAME: string;

  let Backup: typeof backupTypes.Backup;
  let backup: backupTypes.Backup;

  before(() => {
    Backup = proxyquire('../src/backup.js', {
      '@google-cloud/promisify': fakePromisify,
      pumpify,
    }).Backup;
  });

  beforeEach(() => {
    CLUSTER = {
      bigtable: {} as Bigtable,
      name: 'a/b/c/d',
    } as clusterTypes.Cluster;
    BACKUP_NAME = CLUSTER.name + '/backups/' + BACKUP_ID;
    backup = new Backup(CLUSTER, BACKUP_ID);
  });

  describe('instantiation', () => {
    it('should promisify all the things', () => {
      assert(promisified);
    });

    it('should localize Bigtable instance', () => {
      assert.strictEqual(backup.bigtable, CLUSTER.bigtable);
    });

    it('should localize the Cluster instance', () => {
      assert.strictEqual(backup.cluster, CLUSTER);
    });

    it('should localize name and id when provided with name', () => {
      const backup = new Backup(CLUSTER, BACKUP_NAME);
      assert.strictEqual(backup.name, BACKUP_NAME);
      assert.strictEqual(backup.id, BACKUP_ID);
    });

    it('should throw if name is in wrong format', () => {
      const badName = '/other/cluster/backup/id';
      assert.throws(() => {
        new Backup(CLUSTER, badName);
      }, /Backup id '\/other\/cluster\/backup\/id' is not formatted correctly.\nPlease use the format 'my-backup' or 'a\/b\/c\/d\/backups\/my-backup'\./);
    });

    it('should localize name and id when provided with id', () => {
      const backup = new Backup(CLUSTER, BACKUP_ID);
      assert.strictEqual(backup.name, BACKUP_NAME);
      assert.strictEqual(backup.id, BACKUP_ID);
    });
  });

  describe('endDate accessor', () => {
    it('should throw if metadata is not set', () => {
      assert.throws(() => {
        backup.metadata = undefined;
        backup.endDate;
      }, /An endTime is required to convert to Date./);
    });

    it('should throw if endTime is not set on metadata', () => {
      assert.throws(() => {
        backup.metadata = {};
        backup.endDate;
      }, /An endTime is required to convert to Date./);
    });

    it('should return PreciseDate', () => {
      const seconds = 30;
      const nanos = 1000;
      const expectedEndDate = new PreciseDate({seconds, nanos});
      backup.metadata = {
        endTime: {seconds, nanos},
      };
      const convertedEndDate = backup.endDate;
      assert.deepStrictEqual(convertedEndDate, expectedEndDate);
    });
  });

  describe('expireDate accessor', () => {
    it('should throw if metadata is not set', () => {
      assert.throws(() => {
        backup.metadata = undefined;
        backup.expireDate;
      }, /An expireTime is required to convert to Date./);
    });

    it('should throw if expireTime is not set on metadata', () => {
      assert.throws(() => {
        backup.metadata = {};
        backup.expireDate;
      }, /An expireTime is required to convert to Date./);
    });

    it('should return PreciseDate', () => {
      const seconds = 30;
      const nanos = 1000;
      const expectedExpireDate = new PreciseDate({seconds, nanos});
      backup.metadata = {
        expireTime: {seconds, nanos},
      };
      const convertedExpireDate = backup.expireDate;
      assert.deepStrictEqual(convertedExpireDate, expectedExpireDate);
    });
  });

  describe('startDate accessor', () => {
    it('should throw if metadata is not set', () => {
      assert.throws(() => {
        backup.metadata = undefined;
        backup.startDate;
      }, /A startTime is required to convert to Date./);
    });

    it('should throw if startTime is not set on metadata', () => {
      assert.throws(() => {
        backup.metadata = {};
        backup.startDate;
      }, /A startTime is required to convert to Date./);
    });

    it('should return PreciseDate', () => {
      const seconds = 30;
      const nanos = 1000;
      const expectedStartDate = new PreciseDate({seconds, nanos});
      backup.metadata = {
        startTime: {seconds, nanos},
      };
      const convertedStartDate = backup.startDate;
      assert.deepStrictEqual(convertedStartDate, expectedStartDate);
    });
  });

  describe('create', () => {
    it('should call createBackup from cluster', done => {
      const config = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup.cluster.createBackup as any) = (
        id: string,
        _config: {},
        callback: Function
      ) => {
        assert.strictEqual(id, backup.id);
        assert.strictEqual(_config, config);
        callback(); // done()
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.create(config as any, done);
    });
  });

  describe('delete', () => {
    it('should make the correct request', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any, callback: Function) => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'deleteBackup');
        assert.deepStrictEqual(config.reqOpts, {
          name: backup.name,
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        callback(); // done()
      };

      backup.delete(done);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      backup.delete(gaxOptions, assert.ifError);
    });
  });

  describe('exists', () => {
    it('should not require gaxOptions', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).getMetadata = (options: any) => {
        assert.deepStrictEqual(options, {});
        done();
      };
      backup.exists(assert.ifError);
    });

    it('should pass gaxOptions to getMetadata', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).getMetadata = (options: any) => {
        assert.strictEqual(options, gaxOptions);
        done();
      };
      backup.exists(gaxOptions, assert.ifError);
    });

    it('should return false if error code is 5', done => {
      const error = new Error('Error.') as ServiceError;
      error.code = 5;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).getMetadata = (gaxOptions: {}, callback: Function) => {
        callback(error);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.exists((err: any, exists: any) => {
        assert.ifError(err);
        assert.strictEqual(exists, false);
        done();
      });
    });

    it('should return error if code is not 5', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error: any = new Error('Error.');
      error.code = 'NOT-5';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).getMetadata = (gaxOptions: {}, callback: Function) => {
        callback(error);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.exists((err: any) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return true if no error', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).getMetadata = (gaxOptions: {}, callback: Function) => {
        callback(null, {});
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.exists((err: any, exists: any) => {
        assert.ifError(err);
        assert.strictEqual(exists, true);
        done();
      });
    });
  });

  describe('get', () => {
    it('should call getMetadata', done => {
      const gaxOptions = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).getMetadata = (options: {}) => {
        assert.strictEqual(options, gaxOptions);
        done();
      };
      backup.get(gaxOptions, assert.ifError);
    });

    it('should not require an options object', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).getMetadata = (options: {}) => {
        assert.deepStrictEqual(options, {});
        done();
      };
      backup.get(assert.ifError);
    });

    it('should return an error from getMetadata', done => {
      const error = new Error('Error.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).getMetadata = (gaxOptions: {}, callback: Function) => {
        callback(error);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.get((err: any) => {
        assert.strictEqual(err, error);
        done();
      });
    });

    it('should return self and API response', done => {
      const apiResponse = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).getMetadata = (gaxOptions: {}, callback: Function) => {
        callback(null, apiResponse);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.get((err: any, _backup: any, _apiResponse: any) => {
        assert.ifError(err);
        assert.strictEqual(_backup, backup);
        assert.strictEqual(_apiResponse, apiResponse);
        done();
      });
    });
  });

  describe('getMetadata', () => {
    it('should make the correct request', done => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any) => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'getBackup');
        assert.deepStrictEqual(config.reqOpts, {
          name: backup.name,
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        done();
      };

      backup.getMetadata(assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const gaxOptions = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      backup.getMetadata(gaxOptions, assert.ifError);
    });

    it('should update the metadata', done => {
      const response = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: {}, callback: Function) => {
        callback(null, response);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.getMetadata((err: any, metadata: any) => {
        assert.ifError(err);
        assert.strictEqual(metadata, response);
        assert.strictEqual(backup.metadata, response);
        done();
      });
    });
  });

  describe('restore', () => {
    it('should send the correct request', done => {
      const tableId = 'table-id';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any) => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'restoreTable');
        assert.deepStrictEqual(config.reqOpts, {
          parent: backup.cluster.name,
          tableId,
          backup: backup.name,
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        done();
      };

      backup.restore(tableId, assert.ifError);
    });

    it('should accept gaxOptions', done => {
      const tableId = 'table-id';
      const gaxOptions = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any) => {
        assert.deepStrictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      backup.restore(tableId, gaxOptions, assert.ifError);
    });

    it('should execute callback with error', done => {
      const tableId = 'table-id';
      const error = new Error('Error.');
      const args = [{a: 'b'}, {c: 'd'}, {e: 'f'}];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any, callback: Function) => {
        callback(error, ...args);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.restore(tableId, (err, table, ..._args: any[]) => {
        assert.strictEqual(err, error);
        assert.strictEqual(table, undefined);
        assert.deepStrictEqual(_args, args);
        done();
      });
    });

    it('should execute callback with created Table', done => {
      const tableId = 'table-id';
      const args = [{a: 'b'}, {c: 'd'}, {e: 'f'}];
      const tableInstance = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).cluster.instance = {
        table: (_tableId: string) => {
          assert.strictEqual(_tableId, tableId);
          return tableInstance;
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any, callback: Function) => {
        callback(null, ...args);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.restore(tableId, (err, table, ..._args: any[]) => {
        assert.ifError(err);
        assert.strictEqual(table, tableInstance);
        assert.deepStrictEqual(_args, args);
        done();
      });
    });
  });

  describe('setMetadata', () => {
    it('should send the correct request', done => {
      const metadata = {
        testProperty: 'value',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any, callback: Function) => {
        assert.strictEqual(config.client, 'BigtableTableAdminClient');
        assert.strictEqual(config.method, 'updateBackup');
        assert.deepStrictEqual(config.reqOpts, {
          backup: {
            name: backup.name,
            ...metadata,
          },
          updateMask: {
            paths: ['test_property'],
          },
        });
        assert.deepStrictEqual(config.gaxOpts, {});
        callback(); // done()
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.setMetadata(metadata as any, done);
    });

    it('should accept gaxOptions', done => {
      const metadata = {};
      const gaxOptions = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any) => {
        assert.strictEqual(config.gaxOpts, gaxOptions);
        done();
      };

      backup.setMetadata(metadata, gaxOptions, assert.ifError);
    });

    it('should convert expireTime Date to struct', done => {
      const metadata = {
        expireTime: new Date(),
      };
      const expectedExpireTime = new PreciseDate(
        metadata.expireTime
      ).toStruct();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: any) => {
        assert.deepStrictEqual(
          config.reqOpts.backup.expireTime,
          expectedExpireTime
        );
        done();
      };

      backup.setMetadata(metadata, assert.ifError);
    });

    it('should execute the callback and update the metadata', done => {
      const metadata = {};
      const response = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (backup as any).bigtable.request = (config: {}, callback: Function) => {
        callback(null, response);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backup.setMetadata(
        metadata,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err: any, metadata: any, apiResponse: any) => {
          assert.ifError(err);
          assert.strictEqual(metadata, response);
          assert.strictEqual(backup.metadata, response);
          assert.strictEqual(apiResponse, response);
          done();
        }
      );
    });
  });
});
