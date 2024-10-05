// Copyright 2024 Google LLC
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

import {ChunkTransformer} from '../../src/chunktransformer';
import {Bigtable, GetRowsOptions, protos} from '../../src';
import * as v2 from '../../src/v2';
import * as mocha from 'mocha';
import {CallOptions, GoogleError, grpc, RetryOptions} from 'google-gax';
import * as assert from 'assert';
import * as gax from 'google-gax';
import {StreamProxy} from 'google-gax/build/src/streamingCalls/streaming';
import {ReadRowsResumptionStrategy} from '../../src/utils/read-rows-resumption';
import {RequestType} from 'google-gax/build/src/apitypes';
import {DEFAULT_BACKOFF_SETTINGS} from '../../src/utils/retry-options';

/**
 * Create an MockGapicLayer object used for ensuring the right data reaches the Gapic layer when we are testing the handwritten layer.
 *
 * @param {Bigtable} An instance of the Bigtable client
 *
 * @example
 * ```
 * const bigtable = new Bigtable({
 *   projectId: 'fake-project-id',
 * });
 * const tester = new MockGapicLayer(bigtable);
 * const table: Table = bigtable.instance('fake-instance').table('fake-table');
 * tester.testReadRowsGapicCall( // Mocks out the readRows function
 *   done,
 *   {
 *     rows: {
 *       rowKeys: [],
 *       rowRanges: [{}],
 *     },
 *     tableName,
 *   },
 *   {}
 * );
 * table.createReadStream();
 * ```
 */
export class MockGapicLayer {
  private gapicClient: v2.BigtableClient;
  constructor(bigtable: Bigtable) {
    const clientOptions = bigtable.options.BigtableClient;
    this.gapicClient = new v2['BigtableClient'](clientOptions);
    bigtable.api['BigtableClient'] = this.gapicClient;
  }

  /**
   * Returns gax options that contain a retry options object containing the
   * usual retry conditions and the usual resumption strategy.
   *
   * @param {string} tableName The formatted table name
   * @param {GetRowsOptions} options Options provided to createreadstream used for
   * customizing the readRows call.
   */
  buildReadRowsGaxOptions(
    tableName: string,
    options: GetRowsOptions
  ): CallOptions {
    const chunkTransformer: ChunkTransformer = new ChunkTransformer({
      decode: false,
    } as any);
    const expectedStrategy = new ReadRowsResumptionStrategy(
      chunkTransformer,
      options,
      {tableName}
    );
    const expectedResumptionRequest = () => {
      return expectedStrategy.getResumeRequest() as RequestType;
    };
    const expectedCanResume = (error: GoogleError) => {
      return expectedStrategy.canResume(error);
    };
    const expectedRetryOptions = new RetryOptions(
      [],
      DEFAULT_BACKOFF_SETTINGS,
      expectedCanResume,
      expectedResumptionRequest
    );
    return {
      otherArgs: {
        headers: {
          'bigtable-attempt': 0,
        },
      },
      retry: expectedRetryOptions,
    };
  }

  /**
   * Mocks out the ReadRows function in the Gapic layer with a function that
   * ensures the data being received in the Gapic layer is correct.
   *
   * @param {mocha.Done} [done] This is the function that is called when the
   * mocha test is completed.
   * @param {protos.google.bigtable.v2.IReadRowsRequest} [expectedRequest] The
   * request expected in the call to readrows in the Gapic layer
   * @param {CallOptions} expectedOptions The gax options expected in the call
   * to the readrows function in the Gapic layer.
   *
   */
  testReadRowsGapicCall(
    done: mocha.Done,
    expectedRequest: protos.google.bigtable.v2.IReadRowsRequest,
    expectedOptions: CallOptions
  ) {
    this.gapicClient.readRows = (
      request: protos.google.bigtable.v2.IReadRowsRequest,
      options: CallOptions
    ) => {
      try {
        assert.deepStrictEqual(request, expectedRequest);
        if (options || expectedOptions) {
          // Do value comparison on options.retry since
          // it won't be reference equal to expectedOptions.retry:
          assert(options);
          assert(expectedOptions);
          const retry = options.retry;
          const expectedRetry = expectedOptions.retry;
          assert(retry);
          assert(expectedRetry);
          // This if statement is needed to satisfy the compiler.
          // The previous asserts guarantee it evaluates to true.
          if (retry && expectedRetry) {
            // First check that the retry codes are correct
            // These do not need to be reference equal for a passing check
            assert.deepStrictEqual(
              retry?.retryCodes,
              expectedRetry?.retryCodes
            );
            // Next check that the backoff settings are correct
            // These do not need to be reference equal for a passing check
            assert.deepStrictEqual(
              retry?.backoffSettings,
              expectedRetry?.backoffSettings
            );
            // Next check that the shouldRetryFn gets the right result for
            // each error type.
            assert(retry);
            assert(expectedRetry);
            assert(retry.shouldRetryFn);
            assert(expectedRetry.shouldRetryFn);
            const grpcErrorCodes = Object.values(grpc.status)
              .map((status, index) => index)
              .slice(1);
            // This function maps a shouldRetryFn in the retry parameter
            // to an array of what its output would be for each grpc code.
            const mapCodeToShouldRetryArray = (
              retryParameter: Partial<gax.RetryOptions>
            ) =>
              grpcErrorCodes
                .map((code: number) =>
                  Object.assign(new GoogleError('Test error'), {code: code})
                )
                .map((error: GoogleError) => {
                  retryParameter.shouldRetryFn
                    ? retryParameter.shouldRetryFn(error)
                    : undefined;
                });
            // This check ensures that for each grpc error code, the boolean
            // return value of the shouldRetryFn is correct.
            assert.deepStrictEqual(
              mapCodeToShouldRetryArray(retry),
              mapCodeToShouldRetryArray(expectedRetry)
            );
            // Check that the output of the resumption function is correct:
            assert(retry.getResumptionRequestFn);
            assert(expectedRetry.getResumptionRequestFn);
            // This if statement is needed to satisfy the compiler.
            // The previous asserts guarantee it evaluates to true.
            if (
              retry.getResumptionRequestFn &&
              expectedRetry.getResumptionRequestFn
            ) {
              assert.deepStrictEqual(
                retry.getResumptionRequestFn({}),
                expectedRetry.getResumptionRequestFn({})
              );
            }
          }
          done();
        }
      } catch (e: unknown) {
        done(e);
      }
      // The following code is added just so the mocked gapic function will compile.
      // A return value is provided to match the return value of the readrows
      // Gapic function.
      const duplex: gax.CancellableStream = new StreamProxy(
        gax.StreamType.SERVER_STREAMING,
        () => {}
      );
      return duplex;
    };
  }
}
