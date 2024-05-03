import {ChunkTransformer} from '../../src/chunktransformer';
import {Bigtable, GetRowsOptions, protos} from '../../src';
import * as v2 from '../../src/v2';
import * as mocha from 'mocha';
import {CallOptions, GoogleError, RetryOptions} from 'google-gax';
import * as assert from 'assert';
import * as gax from 'google-gax';
import {StreamProxy} from 'google-gax/build/src/streamingCalls/streaming';
import {ReadRowsResumptionStrategy} from '../../src/utils/read-rows-resumption';
import {RequestType} from 'google-gax/build/src/apitypes';
import {
  createReadStreamShouldRetryFn,
  DEFAULT_BACKOFF_SETTINGS,
} from '../../src/utils/retry-options';

export class GapicLayerTester {
  private gapicClient: v2.BigtableClient;
  constructor(bigtable: Bigtable) {
    const clientOptions = bigtable.options.BigtableClient;
    this.gapicClient = new v2['BigtableClient'](clientOptions);
    bigtable.api['BigtableClient'] = this.gapicClient;
  }

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
      tableName,
      undefined
    );
    const expectedResumptionRequest = () => {
      return expectedStrategy.getResumeRequest() as RequestType;
    };
    const expectedRetryOptions = new RetryOptions(
      [],
      DEFAULT_BACKOFF_SETTINGS,
      createReadStreamShouldRetryFn,
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
            const grpcErrorCodes = [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            ]; // TODO: Replace later
            // This function maps a shouldRetryFn to in the retry parameter
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
            assert.deepStrictEqual(
              mapCodeToShouldRetryArray(retry),
              mapCodeToShouldRetryArray(expectedRetry)
            );
            // Check that the output of the resumption function:
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
      // The following code is added just so the mocked gapic function will compile:
      const duplex: gax.CancellableStream = new StreamProxy(
        gax.StreamType.SERVER_STREAMING,
        () => {}
      );
      return duplex;
    };
  }
}
