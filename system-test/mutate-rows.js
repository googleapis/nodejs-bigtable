'use strict';

const Bigtable = require('../');

const tests = require('./data/mutate-rows-retry-test.json').tests;

const assert = require('assert');
const grpc = require('@google-cloud/common-grpc').grpc;
const sinon = require('sinon');
const through = require('through2');

function dispatch(emitter, response) {
  const emits = [];
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

describe.skip('Bigtable/Table', () => {
  const bigtable = new Bigtable();
  bigtable.api = {};
  bigtable.auth = {
    getProjectId: function(callback) {
      callback(null, 'project-id');
    },
  };
  bigtable.grpcCredentials = grpc.credentials.createInsecure();
  bigtable.projectId = 'test';

  const INSTANCE = bigtable.instance('instance');
  const TABLE = INSTANCE.table('table');

  describe('mutate()', () => {
    let clock;
    let mutationBatchesInvoked;
    let mutationCallTimes;
    let responses;
    let stub;

    beforeEach(() => {
      clock = sinon.useFakeTimers({
        toFake: ['setTimeout'],
      });
      mutationBatchesInvoked = [];
      mutationCallTimes = [];
      responses = null;
      bigtable.api.BigtableClient = {
        mutateRows: reqOpts => {
          mutationBatchesInvoked.push(
            reqOpts.entries.map(entry => entry.rowKey.asciiSlice())
          );
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
          if (test.errors) {
            const expectedIndices = test.errors.map(error => {
              return error.index_in_mutations_request;
            });
            assert.deepEqual(error.name, 'PartialFailureError');
            const actualIndices = error.errors.map(error => {
              return test.mutations_request.indexOf(error.entry);
            });
            assert.deepEqual(expectedIndices, actualIndices);
          } else {
            assert.ifError(error);
          }
          assert.deepEqual(
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
          done();
        });
        clock.runAll();
      });
    });
  });
});
