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
import {BoundData, Filter} from '../filter';

// TOOD: Eliminate duplicates.
function populateAttemptHeader(attempt: number, gaxOpts?: CallOptions) {
  gaxOpts = gaxOpts || {};
  gaxOpts.otherArgs = gaxOpts.otherArgs || {};
  gaxOpts.otherArgs.headers = gaxOpts.otherArgs.headers || {};
  gaxOpts.otherArgs.headers['bigtable-attempt'] = attempt;
  return gaxOpts;
}
