/*!
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Bigtable = require('../src');
const {tests} = require('../../system-test/data/mutate-rows-retry-test.json');

import * as assert from 'assert';
import {grpc} from '@google-cloud/common-grpc';
import * as sinon from 'sinon';
import * as through from 'through2';

function dispatch(emitter, response) {
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

function entryResponses(statusCodes) {
  return {
    entries: statusCodes.map((code, index) => ({
                               index,
                               status: {code},
                             })),
  };
}

function getDeltas(array) {
  return array.reduce((acc, item, index) => {
    return index ? acc.concat(item - array[index - 1]) : [item];
  }, []);
}

describe('Bigtable/Table', () => {
  const bigtable = new Bigtable();
  bigtable.api = {};
  bigtable.auth = {
    getProjectId(callback) {
      callback(null, 'project-id');
    },
  };
  bigtable.grpcCredentials = grpc.credentials.createInsecure();

  const INSTANCE = bigtable.instance('instance');
  const TABLE = INSTANCE.table('table');

  describe('mutate()', () => {
    let clock;
    let mutationBatchesInvoked;
    let mutationCallTimes;
    let responses;

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
              reqOpts.entries.map(entry => entry.rowKey.asciiSlice()));
          mutationCallTimes.push(new Date().getTime());
          const emitter = through.obj();
          dispatch(emitter, responses.shift());
          return emitter;
        },
      };
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
              mutationBatchesInvoked, test.mutation_batches_invoked);
          getDeltas(mutationCallTimes).forEach((delta, index) => {
            if (index === 0) {
              const message = 'First request should happen Immediately';
              assert.strictEqual(index, 0, message);
              return;
            }
            const minBackoff = 1000 * Math.pow(2, index);

            // Adjust for some flakiness with the fake timers.
            const maxBackoff = minBackoff + 1010;
            const message = `Backoff for retry #${index} should be between ` +
                `${minBackoff} and ${maxBackoff}, was ${delta}`;
            assert(delta > minBackoff, message);
            assert(delta < maxBackoff, message);
          });
          if (test.errors) {
            const expectedIndices = test.errors.map(error => {
              return error.index_in_mutations_request;
            });
            assert.deepStrictEqual(error.name, 'PartialFailureError');
            const actualIndices = error.errors.map(error => {
              return test.mutations_request.indexOf(error.entry);
            });
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
