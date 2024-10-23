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

import {GetRowsOptions, PrefixRange} from '../table';
import {ChunkTransformer} from '../chunktransformer';
import * as protos from '../../protos/protos';
import {TableUtils} from './table';
import {google} from '../../protos/protos';
import {CallOptions, GoogleError, RetryOptions} from 'google-gax';
import {Mutation} from '../mutation';
import {BoundData, Filter} from '../filter';
import {RequestType} from 'google-gax/build/src/apitypes';
import {
  DEFAULT_BACKOFF_SETTINGS,
  isRstStreamError,
  RETRYABLE_STATUS_CODES,
} from './retry-options';
import * as is from 'is';
import arrify = require('arrify');

// This interface contains the information that will be used in a request.
interface TableStrategyInfo {
  tableName: string;
  appProfileId?: string;
}

// Gets the row keys for a readrows request by filtering out row keys that have
// already been read.
function getRowKeys(
  rowKeys: string[],
  lastRowKey: string | number | true | Uint8Array
) {
  // Remove rowKeys already read.
  return rowKeys.filter(rowKey =>
    TableUtils.greaterThan(rowKey, lastRowKey as string)
  );
}

// Modifies ranges in place based on the lastRowKey to prepare
// a readrows request.
function spliceRanges(
  ranges: PrefixRange[],
  lastRowKey: string | number | true | Uint8Array
): void {
  // Readjust and/or remove ranges based on previous valid row reads.
  // Iterate backward since items may need to be removed.
  for (let index = ranges.length - 1; index >= 0; index--) {
    const range = ranges[index];
    const startValue = is.object(range.start)
      ? (range.start as BoundData).value
      : range.start;
    const startKeyIsRead =
      !startValue ||
      TableUtils.lessThanOrEqualTo(startValue as string, lastRowKey as string);
    if (startKeyIsRead) {
      const endValue = is.object(range.end)
        ? (range.end as BoundData).value
        : range.end;
      const endKeyIsNotRead =
        !endValue ||
        (endValue as Buffer).length === 0 ||
        TableUtils.lessThan(lastRowKey as string, endValue as string);
      if (endKeyIsNotRead) {
        // EndKey is not read, reset the range to start from lastRowKey open
        range.start = {
          value: lastRowKey,
          inclusive: false,
        };
      } else {
        // EndKey is read, remove this range
        ranges.splice(index, 1);
      }
    }
  }
}

/**
 * Create a ReadRowsResumptionStrategy object to specify retry behaviour
 *
 * @class
 * @param {ChunkTransformer} chunkTransformer A ChunkTransformer stream defined
 * in chunktransformer.ts which is typically used for parsing chunked data from
 * the server into a format ready for the user. The lastRowKey parameter of the
 * chunkTransformer object is used for resumption logic to determine what keys
 * and ranges should be included in the request for instance.
 * @param {GetRowsOptions} options Options provided to createreadstream used for
 * customizing the readRows call.
 * @param {TableStrategyInfo} tableStrategyInfo Data passed about the table
 * that is necessary for the readRows request.
 *
 */
export class ReadRowsResumptionStrategy {
  private chunkTransformer: ChunkTransformer;
  private rowKeys: string[];
  private ranges: PrefixRange[];
  private rowsLimit: number;
  private hasLimit: boolean;
  private options: GetRowsOptions;
  private tableStrategyInfo: TableStrategyInfo;
  private retryCodes;
  rowsRead = 0;
  constructor(
    chunkTransformer: ChunkTransformer,
    options: GetRowsOptions,
    tableStrategyInfo: TableStrategyInfo
  ) {
    this.chunkTransformer = chunkTransformer;
    this.options = options;
    this.rowKeys = options.keys || [];
    this.ranges = TableUtils.getRanges(options);
    this.rowsLimit = options.limit || 0;
    this.hasLimit = this.rowsLimit !== 0;
    this.rowsRead = 0;
    if (this?.options?.gaxOptions?.retry?.retryCodes) {
      // Clone the retry codes
      this.retryCodes = this?.options?.gaxOptions?.retry?.retryCodes.slice(0);
    }

    this.tableStrategyInfo = tableStrategyInfo;
    // If rowKeys and ranges are both empty, the request is a full table scan.
    // Add an empty range to simplify the resumption logic.
    if (this.rowKeys.length === 0 && this.ranges.length === 0) {
      this.ranges.push({});
    }
  }

  /**
    This function updates the row keys and row ranges based on the lastRowKey
    value in the chunk transformer. This idempotent function is called in
    canResume, but since canResume is only used when a retry function is not
    provided, we need to also call it in getResumeRequest so that it is
    guaranteed to be called before an outgoing request is made.
   */
  private updateKeysAndRanges() {
    const lastRowKey = this.chunkTransformer
      ? this.chunkTransformer.lastRowKey
      : '';
    if (lastRowKey) {
      spliceRanges(this.ranges, lastRowKey);
      this.rowKeys = getRowKeys(this.rowKeys, lastRowKey);
    }
  }

  /**
   * Gets the next readrows request.
   *
   * This function computes the next readRows request that will be sent to the
   * server. Based on the last row key calculated by data already passed through
   * the chunk transformer, the set of row keys and row ranges is calculated and
   * updated. The calculated row keys and ranges are used along with other
   * properties provided by the user like limits and filters to compute and
   * return a request that will be used in the next read rows call.
   *
   * @return {protos.google.bigtable.v2.IReadRowsRequest} The request options
   * for the next readrows request.
   */
  getResumeRequest(): protos.google.bigtable.v2.IReadRowsRequest {
    this.updateKeysAndRanges();
    const reqOpts = this
      .tableStrategyInfo as google.bigtable.v2.IReadRowsRequest;

    // Create the new reqOpts
    reqOpts.rows = {};

    // Preprocess all the keys and ranges to Bytes
    reqOpts.rows.rowKeys = this.rowKeys.map(
      Mutation.convertToBytes
    ) as {} as Uint8Array[];

    reqOpts.rows.rowRanges = this.ranges.map(range =>
      Filter.createRange(
        range.start as BoundData,
        range.end as BoundData,
        'Key'
      )
    );

    if (this.options.filter) {
      reqOpts.filter = Filter.parse(this.options.filter);
    }

    if (this.hasLimit) {
      reqOpts.rowsLimit = this.rowsLimit - this.rowsRead;
    }
    return reqOpts;
  }

  /**
   * Decides if the client is going to retry a request.
   *
   * canResume contains the logic that will decide if the client will retry with
   * another request when it receives an error. This logic is passed along to
   * google-gax and used by google-gax to decide if the client should retry
   * a request when google-gax receives an error. If canResume returns true then
   * the client will retry with another request computed by getResumeRequest. If
   * canResume request returns false then the error will bubble up from gax to
   * the handwritten layer.
   *
   * @param {GoogleError} [error] The error that Google Gax receives.
   * @return {boolean} True if the client will retry
   */
  canResume(error: GoogleError): boolean {
    // First update the row keys and the row ranges based on the last row key.
    this.updateKeysAndRanges();
    if (error.statusDetails === 'RetryInfo') {
      return true;
    }
    // If all the row keys and ranges are read, end the stream
    // and do not retry.
    if (this.rowKeys.length === 0 && this.ranges.length === 0) {
      return false;
    }
    // If there was a row limit in the original request and
    // we've already read all the rows and met/exceeded that limit, end the
    // stream and do not retry.
    if (this.hasLimit && this.rowsLimit === this.rowsRead) {
      return false;
    }
    const retryCodesUsed = this.retryCodes
      ? this.retryCodes
      : arrify(RETRYABLE_STATUS_CODES);
    if (
      error.code &&
      (retryCodesUsed.includes(error.code) || isRstStreamError(error))
    ) {
      return true;
    }
    return false;
  }

  /**
   * Creates a RetryOptions object that can be used by google-gax.
   *
   * This class contains the business logic to specify retry behaviour of
   * readrows requests and this function packages that logic into a RetryOptions
   * object that google-gax expects.
   *
   * @param {CallOptions} [gaxOpts] The call options that will be used to
   * specify retry behaviour.
   * @return {RetryOptions} A RetryOptions object that google-gax expects that
   * can determine retry behaviour.
   *
   */
  toRetryOptions(gaxOpts: CallOptions): RetryOptions {
    // On individual calls, the user can override any of the default
    // retry options. Overrides can be done on the retryCodes, backoffSettings,
    // shouldRetryFn or getResumptionRequestFn.
    const canResume = (error: GoogleError) => {
      return this.canResume(error);
    };
    const getResumeRequest = () => {
      return this.getResumeRequest() as RequestType;
    };
    // In RetryOptions, the 1st parameter, the retryCodes are ignored if a
    // shouldRetryFn is provided.
    // The 3rd parameter, the shouldRetryFn will determine if the client should retry.
    return new RetryOptions(
      [],
      gaxOpts?.retry?.backoffSettings || DEFAULT_BACKOFF_SETTINGS,
      canResume,
      getResumeRequest
    );
  }
}
