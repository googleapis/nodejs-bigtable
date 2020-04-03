// Copyright 2016 Google LLC
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

import {Bigtable} from '../src';
import {Test} from './testTypes';
const {
  tests,
} = require('../../system-test/data/mutate-rows-retry-test.json') as {
  tests: Test[];
};

import * as assert from 'assert';
import {afterEach, beforeEach, describe, it} from 'mocha';
import * as sinon from 'sinon';
import * as through from 'through2';
import {EventEmitter} from 'events';
import {ProjectIdCallback, GoogleAuth} from 'google-auth-library';
import {PartialFailureError} from '@google-cloud/common/build/src/util';
import {Entry} from '../src/table';
import {CancellableStream, GrpcClient} from 'google-gax';
import {BigtableClient} from '../src/v2';

const {grpc} = new GrpcClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dispatch(emitter: EventEmitter, response: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emits: any[] = [];
  emits.push({name: 'response', arg: {code: response.code}});
  if (response.entry_codes) {
    emits.push({name: 'data', arg: entryResponses(response.entry_codes)});
  }
  emits.push({name: 'end'});
  let index = 0;
  setImmediate(next);

  function next() {
    if (index < emits.length) {
      const emit = emits[index];
      index++;
      emitter.emit(emit.name, emit.arg);
      setImmediate(next);
    }
  }
}

function entryResponses(statusCodes: number[]) {
  return {
    entries: statusCodes.map((code, index) => ({
      index,
      status: {code},
    })),
  };
}

function getDeltas(array: number[]) {
  return array.reduce((acc, item, index) => {
    return index ? acc.concat(item - array[index - 1]) : [item];
  }, [] as number[]);
}

describe('Bigtable/Table', () => {
  const bigtable = new Bigtable();
  bigtable.api = {};
  bigtable.auth = {
    getProjectId(callback: ProjectIdCallback) {
      callback(null, 'project-id');
    },
  } as GoogleAuth;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (bigtable as any).grpcCredentials = grpc.credentials.createInsecure();

  const INSTANCE = bigtable.instance('instance');
  const TABLE = INSTANCE.table('table');

  describe('mutate()', () => {
    let clock: sinon.SinonFakeTimers;
    let mutationBatchesInvoked: Array<{}>;
    let mutationCallTimes: number[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let responses: any[] | null;

    beforeEach(() => {
      clock = sinon.useFakeTimers({
        toFake: ['setTimeout', 'setImmediate', 'Date', 'nextTick'],
      });
      mutationBatchesInvoked = [];
      mutationCallTimes = [];
      responses = null;
      bigtable.api.BigtableClient = {
        mutateRows: reqOpts => {
          mutationBatchesInvoked.push(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reqOpts!.entries!.map(entry => (entry.rowKey as any).asciiSlice())
          );
          mutationCallTimes.push(new Date().getTime());
          const emitter = through.obj();
          dispatch(emitter, responses!.shift());
          return (emitter as {}) as CancellableStream;
        },
      } as BigtableClient;
    });

    afterEach(() => {
      clock.uninstall();
    });

    tests.forEach(test => {
      it(test.name, done => {
        responses = test.responses;
        TABLE.maxRetries = test.max_retries;
        TABLE.mutate(test.mutations_request, error => {
          assert.deepStrictEqual(
            mutationBatchesInvoked,
            test.mutation_batches_invoked
          );
          getDeltas(mutationCallTimes).forEach((delta, index) => {
            if (index === 0) {
              const message = 'First request should happen Immediately';
              assert.strictEqual(index, 0, message);
              return;
            }
            const minBackoff = 1000 * Math.pow(2, index);

            // Adjust for some flakiness with the fake timers.
            const maxBackoff = minBackoff + 1010;
            const message =
              `Backoff for retry #${index} should be between ` +
              `${minBackoff} and ${maxBackoff}, was ${delta}`;
            assert(delta > minBackoff, message);
            assert(delta < maxBackoff, message);
          });
          if (test.errors) {
            const expectedIndices = test.errors.map(error => {
              return error.index_in_mutations_request;
            });
            assert.deepStrictEqual(error!.name, 'PartialFailureError');
            const actualIndices = (error as PartialFailureError).errors!.map(
              error => {
                return test.mutations_request.indexOf(
                  (error as {entry: Entry}).entry
                );
              }
            );
            assert.deepStrictEqual(expectedIndices, actualIndices);
          } else {
            assert.ifError(error);
          }
          done();
        });
        clock.runAll();
      });
    });
  });
});
