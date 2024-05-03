import {GetRowsOptions, GoogleInnerError, PrefixRange} from '../table';
import {ChunkTransformer} from '../chunktransformer';
import * as protos from '../../protos/protos';
import {TableUtils} from './table';
import {google} from '../../protos/protos';
import {CallOptions, GoogleError, RetryOptions} from 'google-gax';
import {
  createReadStreamShouldRetryFn,
  DEFAULT_BACKOFF_SETTINGS,
} from './retry-options';
import {Mutation} from '../mutation';
import {BoundData, Filter, RawFilter} from '../filter';
import {RequestType} from 'google-gax/build/src/apitypes';


// TODO: Move ReadRowsResumptionStrategy out into a separate module
export class ReadRowsResumptionStrategy {
  private chunkTransformer: ChunkTransformer;
  private rowKeys: string[];
  private ranges: PrefixRange[];
  private rowsLimit: number;
  private hasLimit: boolean;
  private tableName: string;
  private appProfileId?: string;
  private options: GetRowsOptions;
  rowsRead = 0;
  constructor(
    chunkTransformer: ChunkTransformer,
    options: GetRowsOptions,
    tableName: string,
    appProfileId?: string
  ) {
    this.chunkTransformer = chunkTransformer;
    this.options = options;
    this.rowKeys = options.keys || [];
    this.ranges = TableUtils.getRanges(options);
    this.rowsLimit = options.limit || 0;
    this.hasLimit = this.rowsLimit !== 0;
    this.rowsRead = 0;
    // TODO: Create a case class for these two objects:
    this.tableName = tableName;
    this.appProfileId = appProfileId;
    // If rowKeys and ranges are both empty, the request is a full table scan.
    // Add an empty range to simplify the resumption logic.
    if (this.rowKeys.length === 0 && this.ranges.length === 0) {
      this.ranges.push({});
    }
  }
  getResumeRequest(
    request?: protos.google.bigtable.v2.IReadRowsRequest
  ): protos.google.bigtable.v2.IReadRowsRequest {
    const lastRowKey = this.chunkTransformer
      ? this.chunkTransformer.lastRowKey
      : '';
    if (lastRowKey) {
      TableUtils.spliceRanges(this.ranges, lastRowKey);
      this.rowKeys = TableUtils.getRowKeys(this.rowKeys, lastRowKey);
    }
    const reqOpts: protos.google.bigtable.v2.IReadRowsRequest =
      this.#readRowsReqOpts(this.ranges, this.rowKeys, this.options.filter);

    if (this.hasLimit) {
      reqOpts.rowsLimit = this.rowsLimit - this.rowsRead;
    }
    return reqOpts;
  }

  canResume(error: GoogleError): boolean {
    // If all the row keys and ranges are read, end the stream
    // and do not retry.
    if (this.rowKeys.length === 0 && this.ranges.length === 0) {
      return false;
    }
    // If there was a row limit in the original request and
    // we've already read all the rows, end the stream and
    // do not retry.
    if (this.hasLimit && this.rowsLimit === this.rowsRead) {
      return false;
    }
    return createReadStreamShouldRetryFn(error);
  }

  toRetryOptions(gaxOpts: CallOptions) {
    const backoffSettings =
      gaxOpts?.retry?.backoffSettings || DEFAULT_BACKOFF_SETTINGS;
    // TODO: Add resume request
    const canResume = (error: GoogleError) => {
      return this.canResume(error);
    };
    const getResumeRequest = (
      request?: protos.google.bigtable.v2.IReadRowsRequest
    ) => {
      return this.getResumeRequest(request) as RequestType;
    };
    return new RetryOptions([], backoffSettings, canResume, getResumeRequest);
  }

  #readRowsReqOpts(
    ranges: PrefixRange[],
    rowKeys: string[],
    filter: RawFilter
  ) {
    const reqOpts = {
      tableName: this.tableName,
      appProfileId: this.appProfileId,
    } as google.bigtable.v2.IReadRowsRequest;

    // Create the new reqOpts
    reqOpts.rows = {};

    // TODO: preprocess all the keys and ranges to Bytes
    reqOpts.rows.rowKeys = rowKeys.map(
      Mutation.convertToBytes
    ) as {} as Uint8Array[];

    reqOpts.rows.rowRanges = ranges.map(range =>
      Filter.createRange(
        range.start as BoundData,
        range.end as BoundData,
        'Key'
      )
    );

    if (filter) {
      reqOpts.filter = Filter.parse(filter);
    }

    return reqOpts;
  }
}
