// Copyright 2018 Google LLC
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

// Note: this file is purely for documentation. Any contents are not expected
// to be loaded as the JS file.

/**
 * Request message for Bigtable.ReadRows.
 *
 * @property {string} tableName
 *   The unique name of the table from which to read.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {string} appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 *
 * @property {Object} rows
 *   The row keys and/or ranges to read. If not specified, reads from all rows.
 *
 *   This object should have the same structure as [RowSet]{@link google.bigtable.v2.RowSet}
 *
 * @property {Object} filter
 *   The filter to apply to the contents of the specified row(s). If unset,
 *   reads the entirety of each row.
 *
 *   This object should have the same structure as [RowFilter]{@link google.bigtable.v2.RowFilter}
 *
 * @property {number} rowsLimit
 *   The read will terminate after committing to N rows' worth of results. The
 *   default (zero) is to return all results.
 *
 * @typedef ReadRowsRequest
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.ReadRowsRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var ReadRowsRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response message for Bigtable.ReadRows.
 *
 * @property {Object[]} chunks
 *   This object should have the same structure as [CellChunk]{@link google.bigtable.v2.CellChunk}
 *
 * @property {string} lastScannedRowKey
 *   Optionally the server might return the row key of the last row it
 *   has scanned.  The client can use this to construct a more
 *   efficient retry request if needed: any row keys or portions of
 *   ranges less than this row key can be dropped from the request.
 *   This is primarily useful for cases where the server has read a
 *   lot of data that was filtered out since the last committed row
 *   key, allowing the client to skip that work on a retry.
 *
 * @typedef ReadRowsResponse
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.ReadRowsResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var ReadRowsResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * Specifies a piece of a row's contents returned as part of the read
   * response stream.
   *
   * @property {string} rowKey
   *   The row key for this chunk of data.  If the row key is empty,
   *   this CellChunk is a continuation of the same row as the previous
   *   CellChunk in the response stream, even if that CellChunk was in a
   *   previous ReadRowsResponse message.
   *
   * @property {Object} familyName
   *   The column family name for this chunk of data.  If this message
   *   is not present this CellChunk is a continuation of the same column
   *   family as the previous CellChunk.  The empty string can occur as a
   *   column family name in a response so clients must check
   *   explicitly for the presence of this message, not just for
   *   `family_name.value` being non-empty.
   *
   *   This object should have the same structure as [StringValue]{@link google.protobuf.StringValue}
   *
   * @property {Object} qualifier
   *   The column qualifier for this chunk of data.  If this message
   *   is not present, this CellChunk is a continuation of the same column
   *   as the previous CellChunk.  Column qualifiers may be empty so
   *   clients must check for the presence of this message, not just
   *   for `qualifier.value` being non-empty.
   *
   *   This object should have the same structure as [BytesValue]{@link google.protobuf.BytesValue}
   *
   * @property {number} timestampMicros
   *   The cell's stored timestamp, which also uniquely identifies it
   *   within its column.  Values are always expressed in
   *   microseconds, but individual tables may set a coarser
   *   granularity to further restrict the allowed values. For
   *   example, a table which specifies millisecond granularity will
   *   only allow values of `timestamp_micros` which are multiples of
   *   1000.  Timestamps are only set in the first CellChunk per cell
   *   (for cells split into multiple chunks).
   *
   * @property {string[]} labels
   *   Labels applied to the cell by a
   *   RowFilter.  Labels are only set
   *   on the first CellChunk per cell.
   *
   * @property {string} value
   *   The value stored in the cell.  Cell values can be split across
   *   multiple CellChunks.  In that case only the value field will be
   *   set in CellChunks after the first: the timestamp and labels
   *   will only be present in the first CellChunk, even if the first
   *   CellChunk came in a previous ReadRowsResponse.
   *
   * @property {number} valueSize
   *   If this CellChunk is part of a chunked cell value and this is
   *   not the final chunk of that cell, value_size will be set to the
   *   total length of the cell value.  The client can use this size
   *   to pre-allocate memory to hold the full cell value.
   *
   * @property {boolean} resetRow
   *   Indicates that the client should drop all previous chunks for
   *   `row_key`, as it will be re-read from the beginning.
   *
   * @property {boolean} commitRow
   *   Indicates that the client can safely process all previous chunks for
   *   `row_key`, as its data has been fully read.
   *
   * @typedef CellChunk
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.ReadRowsResponse.CellChunk definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
   */
  CellChunk: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  }
};

/**
 * Request message for Bigtable.SampleRowKeys.
 *
 * @property {string} tableName
 *   The unique name of the table from which to sample row keys.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {string} appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 *
 * @typedef SampleRowKeysRequest
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.SampleRowKeysRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var SampleRowKeysRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response message for Bigtable.SampleRowKeys.
 *
 * @property {string} rowKey
 *   Sorted streamed sequence of sample row keys in the table. The table might
 *   have contents before the first row key in the list and after the last one,
 *   but a key containing the empty string indicates "end of table" and will be
 *   the last response given, if present.
 *   Note that row keys in this list may not have ever been written to or read
 *   from, and users should therefore not make any assumptions about the row key
 *   structure that are specific to their use case.
 *
 * @property {number} offsetBytes
 *   Approximate total storage space used by all rows in the table which precede
 *   `row_key`. Buffering the contents of all rows between two subsequent
 *   samples would require space roughly equal to the difference in their
 *   `offset_bytes` fields.
 *
 * @typedef SampleRowKeysResponse
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.SampleRowKeysResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var SampleRowKeysResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for Bigtable.MutateRow.
 *
 * @property {string} tableName
 *   The unique name of the table to which the mutation should be applied.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {string} appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 *
 * @property {string} rowKey
 *   The key of the row to which the mutation should be applied.
 *
 * @property {Object[]} mutations
 *   Changes to be atomically applied to the specified row. Entries are applied
 *   in order, meaning that earlier mutations can be masked by later ones.
 *   Must contain at least one entry and at most 100000.
 *
 *   This object should have the same structure as [Mutation]{@link google.bigtable.v2.Mutation}
 *
 * @typedef MutateRowRequest
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.MutateRowRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var MutateRowRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response message for Bigtable.MutateRow.
 * @typedef MutateRowResponse
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.MutateRowResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var MutateRowResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for BigtableService.MutateRows.
 *
 * @property {string} tableName
 *   The unique name of the table to which the mutations should be applied.
 *
 * @property {string} appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 *
 * @property {Object[]} entries
 *   The row keys and corresponding mutations to be applied in bulk.
 *   Each entry is applied as an atomic mutation, but the entries may be
 *   applied in arbitrary order (even between entries for the same row).
 *   At least one entry must be specified, and in total the entries can
 *   contain at most 100000 mutations.
 *
 *   This object should have the same structure as [Entry]{@link google.bigtable.v2.Entry}
 *
 * @typedef MutateRowsRequest
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.MutateRowsRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var MutateRowsRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * @property {string} rowKey
   *   The key of the row to which the `mutations` should be applied.
   *
   * @property {Object[]} mutations
   *   Changes to be atomically applied to the specified row. Mutations are
   *   applied in order, meaning that earlier mutations can be masked by
   *   later ones.
   *   You must specify at least one mutation.
   *
   *   This object should have the same structure as [Mutation]{@link google.bigtable.v2.Mutation}
   *
   * @typedef Entry
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.MutateRowsRequest.Entry definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
   */
  Entry: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  }
};

/**
 * Response message for BigtableService.MutateRows.
 *
 * @property {Object[]} entries
 *   One or more results for Entries from the batch request.
 *
 *   This object should have the same structure as [Entry]{@link google.bigtable.v2.Entry}
 *
 * @typedef MutateRowsResponse
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.MutateRowsResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var MutateRowsResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * @property {number} index
   *   The index into the original request's `entries` list of the Entry
   *   for which a result is being reported.
   *
   * @property {Object} status
   *   The result of the request Entry identified by `index`.
   *   Depending on how requests are batched during execution, it is possible
   *   for one Entry to fail due to an error with another Entry. In the event
   *   that this occurs, the same error will be reported for both entries.
   *
   *   This object should have the same structure as [Status]{@link google.rpc.Status}
   *
   * @typedef Entry
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.MutateRowsResponse.Entry definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
   */
  Entry: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  }
};

/**
 * Request message for Bigtable.CheckAndMutateRow.
 *
 * @property {string} tableName
 *   The unique name of the table to which the conditional mutation should be
 *   applied.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {string} appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 *
 * @property {string} rowKey
 *   The key of the row to which the conditional mutation should be applied.
 *
 * @property {Object} predicateFilter
 *   The filter to be applied to the contents of the specified row. Depending
 *   on whether or not any results are yielded, either `true_mutations` or
 *   `false_mutations` will be executed. If unset, checks that the row contains
 *   any values at all.
 *
 *   This object should have the same structure as [RowFilter]{@link google.bigtable.v2.RowFilter}
 *
 * @property {Object[]} trueMutations
 *   Changes to be atomically applied to the specified row if `predicate_filter`
 *   yields at least one cell when applied to `row_key`. Entries are applied in
 *   order, meaning that earlier mutations can be masked by later ones.
 *   Must contain at least one entry if `false_mutations` is empty, and at most
 *   100000.
 *
 *   This object should have the same structure as [Mutation]{@link google.bigtable.v2.Mutation}
 *
 * @property {Object[]} falseMutations
 *   Changes to be atomically applied to the specified row if `predicate_filter`
 *   does not yield any cells when applied to `row_key`. Entries are applied in
 *   order, meaning that earlier mutations can be masked by later ones.
 *   Must contain at least one entry if `true_mutations` is empty, and at most
 *   100000.
 *
 *   This object should have the same structure as [Mutation]{@link google.bigtable.v2.Mutation}
 *
 * @typedef CheckAndMutateRowRequest
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.CheckAndMutateRowRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var CheckAndMutateRowRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response message for Bigtable.CheckAndMutateRow.
 *
 * @property {boolean} predicateMatched
 *   Whether or not the request's `predicate_filter` yielded any results for
 *   the specified row.
 *
 * @typedef CheckAndMutateRowResponse
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.CheckAndMutateRowResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var CheckAndMutateRowResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for Bigtable.ReadModifyWriteRow.
 *
 * @property {string} tableName
 *   The unique name of the table to which the read/modify/write rules should be
 *   applied.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {string} appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 *
 * @property {string} rowKey
 *   The key of the row to which the read/modify/write rules should be applied.
 *
 * @property {Object[]} rules
 *   Rules specifying how the specified row's contents are to be transformed
 *   into writes. Entries are applied in order, meaning that earlier rules will
 *   affect the results of later ones.
 *
 *   This object should have the same structure as [ReadModifyWriteRule]{@link google.bigtable.v2.ReadModifyWriteRule}
 *
 * @typedef ReadModifyWriteRowRequest
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.ReadModifyWriteRowRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var ReadModifyWriteRowRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response message for Bigtable.ReadModifyWriteRow.
 *
 * @property {Object} row
 *   A Row containing the new contents of all cells modified by the request.
 *
 *   This object should have the same structure as [Row]{@link google.bigtable.v2.Row}
 *
 * @typedef ReadModifyWriteRowResponse
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.ReadModifyWriteRowResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/bigtable.proto}
 */
var ReadModifyWriteRowResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};