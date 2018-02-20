'use strict';

const Bigtable = require('../');
const mutation = require('../src/mutation.js');

const tests = require('./data/read-rows-retry-test.json').tests;

const assert = require('assert');
const grpc = require('@google-cloud/common-grpc').grpc;
const sinon = require('sinon');
const through = require('through2');

function dispatch(emitter, response) {
  let emits = [{name: 'request'}];
  if (response.row_keys) {
    emits.push.apply(emits, [
      {name: 'response', arg: 200},
      {
        name: 'data',
        arg: {chunks: response.row_keys.map(rowResponse)},
      },
    ]);
  }
  if (response.end_with_error) {
    const error = new Error();
    error.code = response.end_with_error;
    emits.push({name: 'error', arg: error});
  } else {
    emits.push({name: 'end'});
  }
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

function rowResponse(rowKey) {
  return {
    rowKey: mutation.convertToBytes(rowKey),
    familyName: {value: 'family'},
    qualifier: {value: 'qualifier'},
    valueSize: 0,
    timestampMicros: 0,
    labels: [],
    commitRow: true,
    value: 'value',
  };
}

describe('Bigtable/Table', () => {
  const bigtable = new Bigtable();
  bigtable.grpcCredentials = grpc.credentials.createInsecure();

  const INSTANCE = bigtable.instance('instance');
  const TABLE = INSTANCE.table('table');

  describe('createReadStream', () => {
    let clock;
    let endCalled;
    let error;
    let requestedOptions;
    let responses;
    let rowKeysRead;
    let stub;

    beforeEach(() => {
      clock = sinon.useFakeTimers({
        toFake: [
          'setTimeout',
          'clearTimeout',
          'setImmediate',
          'clearImmediate',
          'setInterval',
          'clearInterval',
          'Date',
          'nextTick',
        ],
      });
      endCalled = false;
      error = null;
      responses = null;
      rowKeysRead = [];
      requestedOptions = [];
      stub = sinon.stub(bigtable, 'request').callsFake(cfg => {
        const reqOpts = cfg.reqOpts;
        let requestOptions = {};
        if (reqOpts.rows && reqOpts.rows.rowRanges) {
          requestOptions.rowRanges = reqOpts.rows.rowRanges.map(range => {
            const convertedRowRange = {};
            Object.keys(range).forEach(
              key => (convertedRowRange[key] = range[key].asciiSlice())
            );
            return convertedRowRange;
          });
        }
        if (reqOpts.rows && reqOpts.rows.rowKeys) {
          requestOptions.rowKeys = reqOpts.rows.rowKeys.map(rowKeys =>
            rowKeys.asciiSlice()
          );
        }
        if (reqOpts.rowsLimit) {
          requestOptions.rowsLimit = reqOpts.rowsLimit;
        }
        requestedOptions.push(requestOptions);
        rowKeysRead.push([]);
        const emitter = through.obj();
        dispatch(emitter, responses.shift());
        return emitter;
      });
    });

    afterEach(() => {
      clock.uninstall();
      stub.restore();
    });

    tests.forEach(test => {
      it(test.name, () => {
        responses = test.responses;
        TABLE.maxRetries = test.max_retries;
        TABLE.createReadStream(test.createReadStream_options)
          .on('data', row => rowKeysRead[rowKeysRead.length - 1].push(row.id))
          .on('end', () => (endCalled = true))
          .on('error', err => (error = err));
        clock.runAll();

        setImmediate(function () {
          if (test.error) {
            assert(!endCalled, `.on('end') should not have been invoked`);
            assert.strictEqual(error.code, test.error);
          } else {
            assert(endCalled, `.on('end') shoud have been invoked`);
            assert.ifError(error);
          }
          assert.deepStrictEqual(rowKeysRead, test.row_keys_read);
          assert.strictEqual(
            responses.length,
            0,
            'not all the responses were used'
          );
          assert.deepStrictEqual(requestedOptions, test.request_options);
        });
      });
    });
  });
});
