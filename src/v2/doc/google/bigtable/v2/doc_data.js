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
 * Specifies the complete (requested) contents of a single row of a table.
 * Rows which exceed 256MiB in size cannot be read in full.
 *
 * @property {string} key
 *   The unique key which identifies this row within its table. This is the same
 *   key that's used to identify the row in, for example, a MutateRowRequest.
 *   May contain any non-empty byte string up to 4KiB in length.
 *
 * @property {Object[]} families
 *   May be empty, but only if the entire row is empty.
 *   The mutual ordering of column families is not specified.
 *
 *   This object should have the same structure as [Family]{@link google.bigtable.v2.Family}
 *
 * @typedef Row
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.Row definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var Row = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Specifies (some of) the contents of a single row/column family intersection
 * of a table.
 *
 * @property {string} name
 *   The unique key which identifies this family within its row. This is the
 *   same key that's used to identify the family in, for example, a RowFilter
 *   which sets its "family_name_regex_filter" field.
 *   Must match `[-_.a-zA-Z0-9]+`, except that AggregatingRowProcessors may
 *   produce cells in a sentinel family with an empty name.
 *   Must be no greater than 64 characters in length.
 *
 * @property {Object[]} columns
 *   Must not be empty. Sorted in order of increasing "qualifier".
 *
 *   This object should have the same structure as [Column]{@link google.bigtable.v2.Column}
 *
 * @typedef Family
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.Family definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var Family = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Specifies (some of) the contents of a single row/column intersection of a
 * table.
 *
 * @property {string} qualifier
 *   The unique key which identifies this column within its family. This is the
 *   same key that's used to identify the column in, for example, a RowFilter
 *   which sets its `column_qualifier_regex_filter` field.
 *   May contain any byte string, including the empty string, up to 16kiB in
 *   length.
 *
 * @property {Object[]} cells
 *   Must not be empty. Sorted in order of decreasing "timestamp_micros".
 *
 *   This object should have the same structure as [Cell]{@link google.bigtable.v2.Cell}
 *
 * @typedef Column
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.Column definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var Column = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Specifies (some of) the contents of a single row/column/timestamp of a table.
 *
 * @property {number} timestampMicros
 *   The cell's stored timestamp, which also uniquely identifies it within
 *   its column.
 *   Values are always expressed in microseconds, but individual tables may set
 *   a coarser granularity to further restrict the allowed values. For
 *   example, a table which specifies millisecond granularity will only allow
 *   values of `timestamp_micros` which are multiples of 1000.
 *
 * @property {string} value
 *   The value stored in the cell.
 *   May contain any byte string, including the empty string, up to 100MiB in
 *   length.
 *
 * @property {string[]} labels
 *   Labels applied to the cell by a RowFilter.
 *
 * @typedef Cell
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.Cell definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var Cell = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Specifies a contiguous range of rows.
 *
 * @property {string} startKeyClosed
 *   Used when giving an inclusive lower bound for the range.
 *
 * @property {string} startKeyOpen
 *   Used when giving an exclusive lower bound for the range.
 *
 * @property {string} endKeyOpen
 *   Used when giving an exclusive upper bound for the range.
 *
 * @property {string} endKeyClosed
 *   Used when giving an inclusive upper bound for the range.
 *
 * @typedef RowRange
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.RowRange definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var RowRange = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Specifies a non-contiguous set of rows.
 *
 * @property {string[]} rowKeys
 *   Single rows included in the set.
 *
 * @property {Object[]} rowRanges
 *   Contiguous row ranges included in the set.
 *
 *   This object should have the same structure as [RowRange]{@link google.bigtable.v2.RowRange}
 *
 * @typedef RowSet
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.RowSet definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var RowSet = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Specifies a contiguous range of columns within a single column family.
 * The range spans from &lt;column_family&gt;:&lt;start_qualifier&gt; to
 * &lt;column_family&gt;:&lt;end_qualifier&gt;, where both bounds can be either
 * inclusive or exclusive.
 *
 * @property {string} familyName
 *   The name of the column family within which this range falls.
 *
 * @property {string} startQualifierClosed
 *   Used when giving an inclusive lower bound for the range.
 *
 * @property {string} startQualifierOpen
 *   Used when giving an exclusive lower bound for the range.
 *
 * @property {string} endQualifierClosed
 *   Used when giving an inclusive upper bound for the range.
 *
 * @property {string} endQualifierOpen
 *   Used when giving an exclusive upper bound for the range.
 *
 * @typedef ColumnRange
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.ColumnRange definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var ColumnRange = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Specified a contiguous range of microsecond timestamps.
 *
 * @property {number} startTimestampMicros
 *   Inclusive lower bound. If left empty, interpreted as 0.
 *
 * @property {number} endTimestampMicros
 *   Exclusive upper bound. If left empty, interpreted as infinity.
 *
 * @typedef TimestampRange
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.TimestampRange definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var TimestampRange = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Specifies a contiguous range of raw byte values.
 *
 * @property {string} startValueClosed
 *   Used when giving an inclusive lower bound for the range.
 *
 * @property {string} startValueOpen
 *   Used when giving an exclusive lower bound for the range.
 *
 * @property {string} endValueClosed
 *   Used when giving an inclusive upper bound for the range.
 *
 * @property {string} endValueOpen
 *   Used when giving an exclusive upper bound for the range.
 *
 * @typedef ValueRange
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.ValueRange definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var ValueRange = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Takes a row as input and produces an alternate view of the row based on
 * specified rules. For example, a RowFilter might trim down a row to include
 * just the cells from columns matching a given regular expression, or might
 * return all the cells of a row but not their values. More complicated filters
 * can be composed out of these components to express requests such as, "within
 * every column of a particular family, give just the two most recent cells
 * which are older than timestamp X."
 *
 * There are two broad categories of RowFilters (true filters and transformers),
 * as well as two ways to compose simple filters into more complex ones
 * (chains and interleaves). They work as follows:
 *
 * * True filters alter the input row by excluding some of its cells wholesale
 * from the output row. An example of a true filter is the `value_regex_filter`,
 * which excludes cells whose values don't match the specified pattern. All
 * regex true filters use RE2 syntax (https://github.com/google/re2/wiki/Syntax)
 * in raw byte mode (RE2::Latin1), and are evaluated as full matches. An
 * important point to keep in mind is that `RE2(.)` is equivalent by default to
 * `RE2([^\n])`, meaning that it does not match newlines. When attempting to
 * match an arbitrary byte, you should therefore use the escape sequence `\C`,
 * which may need to be further escaped as `\\C` in your client language.
 *
 * * Transformers alter the input row by changing the values of some of its
 * cells in the output, without excluding them completely. Currently, the only
 * supported transformer is the `strip_value_transformer`, which replaces every
 * cell's value with the empty string.
 *
 * * Chains and interleaves are described in more detail in the
 * RowFilter.Chain and RowFilter.Interleave documentation.
 *
 * The total serialized size of a RowFilter message must not
 * exceed 4096 bytes, and RowFilters may not be nested within each other
 * (in Chains or Interleaves) to a depth of more than 20.
 *
 * @property {Object} chain
 *   Applies several RowFilters to the data in sequence, progressively
 *   narrowing the results.
 *
 *   This object should have the same structure as [Chain]{@link google.bigtable.v2.Chain}
 *
 * @property {Object} interleave
 *   Applies several RowFilters to the data in parallel and combines the
 *   results.
 *
 *   This object should have the same structure as [Interleave]{@link google.bigtable.v2.Interleave}
 *
 * @property {Object} condition
 *   Applies one of two possible RowFilters to the data based on the output of
 *   a predicate RowFilter.
 *
 *   This object should have the same structure as [Condition]{@link google.bigtable.v2.Condition}
 *
 * @property {boolean} sink
 *   ADVANCED USE ONLY.
 *   Hook for introspection into the RowFilter. Outputs all cells directly to
 *   the output of the read rather than to any parent filter. Consider the
 *   following example:
 *
 *       Chain(
 *         FamilyRegex("A"),
 *         Interleave(
 *           All(),
 *           Chain(Label("foo"), Sink())
 *         ),
 *         QualifierRegex("B")
 *       )
 *
 *                           A,A,1,w
 *                           A,B,2,x
 *                           B,B,4,z
 *                              |
 *                       FamilyRegex("A")
 *                              |
 *                           A,A,1,w
 *                           A,B,2,x
 *                              |
 *                 +------------+-------------+
 *                 |                          |
 *               All()                    Label(foo)
 *                 |                          |
 *              A,A,1,w              A,A,1,w,labels:[foo]
 *              A,B,2,x              A,B,2,x,labels:[foo]
 *                 |                          |
 *                 |                        Sink() --------------+
 *                 |                          |                  |
 *                 +------------+      x------+          A,A,1,w,labels:[foo]
 *                              |                        A,B,2,x,labels:[foo]
 *                           A,A,1,w                             |
 *                           A,B,2,x                             |
 *                              |                                |
 *                      QualifierRegex("B")                      |
 *                              |                                |
 *                           A,B,2,x                             |
 *                              |                                |
 *                              +--------------------------------+
 *                              |
 *                           A,A,1,w,labels:[foo]
 *                           A,B,2,x,labels:[foo]  // could be switched
 *                           A,B,2,x               // could be switched
 *
 *   Despite being excluded by the qualifier filter, a copy of every cell
 *   that reaches the sink is present in the final result.
 *
 *   As with an Interleave,
 *   duplicate cells are possible, and appear in an unspecified mutual order.
 *   In this case we have a duplicate with column "A:B" and timestamp 2,
 *   because one copy passed through the all filter while the other was
 *   passed through the label and sink. Note that one copy has label "foo",
 *   while the other does not.
 *
 *   Cannot be used within the `predicate_filter`, `true_filter`, or
 *   `false_filter` of a Condition.
 *
 * @property {boolean} passAllFilter
 *   Matches all cells, regardless of input. Functionally equivalent to
 *   leaving `filter` unset, but included for completeness.
 *
 * @property {boolean} blockAllFilter
 *   Does not match any cells, regardless of input. Useful for temporarily
 *   disabling just part of a filter.
 *
 * @property {string} rowKeyRegexFilter
 *   Matches only cells from rows whose keys satisfy the given RE2 regex. In
 *   other words, passes through the entire row when the key matches, and
 *   otherwise produces an empty row.
 *   Note that, since row keys can contain arbitrary bytes, the `\C` escape
 *   sequence must be used if a true wildcard is desired. The `.` character
 *   will not match the new line character `\n`, which may be present in a
 *   binary key.
 *
 * @property {number} rowSampleFilter
 *   Matches all cells from a row with probability p, and matches no cells
 *   from the row with probability 1-p.
 *
 * @property {string} familyNameRegexFilter
 *   Matches only cells from columns whose families satisfy the given RE2
 *   regex. For technical reasons, the regex must not contain the `:`
 *   character, even if it is not being used as a literal.
 *   Note that, since column families cannot contain the new line character
 *   `\n`, it is sufficient to use `.` as a full wildcard when matching
 *   column family names.
 *
 * @property {string} columnQualifierRegexFilter
 *   Matches only cells from columns whose qualifiers satisfy the given RE2
 *   regex.
 *   Note that, since column qualifiers can contain arbitrary bytes, the `\C`
 *   escape sequence must be used if a true wildcard is desired. The `.`
 *   character will not match the new line character `\n`, which may be
 *   present in a binary qualifier.
 *
 * @property {Object} columnRangeFilter
 *   Matches only cells from columns within the given range.
 *
 *   This object should have the same structure as [ColumnRange]{@link google.bigtable.v2.ColumnRange}
 *
 * @property {Object} timestampRangeFilter
 *   Matches only cells with timestamps within the given range.
 *
 *   This object should have the same structure as [TimestampRange]{@link google.bigtable.v2.TimestampRange}
 *
 * @property {string} valueRegexFilter
 *   Matches only cells with values that satisfy the given regular expression.
 *   Note that, since cell values can contain arbitrary bytes, the `\C` escape
 *   sequence must be used if a true wildcard is desired. The `.` character
 *   will not match the new line character `\n`, which may be present in a
 *   binary value.
 *
 * @property {Object} valueRangeFilter
 *   Matches only cells with values that fall within the given range.
 *
 *   This object should have the same structure as [ValueRange]{@link google.bigtable.v2.ValueRange}
 *
 * @property {number} cellsPerRowOffsetFilter
 *   Skips the first N cells of each row, matching all subsequent cells.
 *   If duplicate cells are present, as is possible when using an Interleave,
 *   each copy of the cell is counted separately.
 *
 * @property {number} cellsPerRowLimitFilter
 *   Matches only the first N cells of each row.
 *   If duplicate cells are present, as is possible when using an Interleave,
 *   each copy of the cell is counted separately.
 *
 * @property {number} cellsPerColumnLimitFilter
 *   Matches only the most recent N cells within each column. For example,
 *   if N=2, this filter would match column `foo:bar` at timestamps 10 and 9,
 *   skip all earlier cells in `foo:bar`, and then begin matching again in
 *   column `foo:bar2`.
 *   If duplicate cells are present, as is possible when using an Interleave,
 *   each copy of the cell is counted separately.
 *
 * @property {boolean} stripValueTransformer
 *   Replaces each cell's value with the empty string.
 *
 * @property {string} applyLabelTransformer
 *   Applies the given label to all cells in the output row. This allows
 *   the client to determine which results were produced from which part of
 *   the filter.
 *
 *   Values must be at most 15 characters in length, and match the RE2
 *   pattern `[a-z0-9\\-]+`
 *
 *   Due to a technical limitation, it is not currently possible to apply
 *   multiple labels to a cell. As a result, a Chain may have no more than
 *   one sub-filter which contains a `apply_label_transformer`. It is okay for
 *   an Interleave to contain multiple `apply_label_transformers`, as they
 *   will be applied to separate copies of the input. This may be relaxed in
 *   the future.
 *
 * @typedef RowFilter
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.RowFilter definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var RowFilter = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * A RowFilter which sends rows through several RowFilters in sequence.
   *
   * @property {Object[]} filters
   *   The elements of "filters" are chained together to process the input row:
   *   in row -> f(0) -> intermediate row -> f(1) -> ... -> f(N) -> out row
   *   The full chain is executed atomically.
   *
   *   This object should have the same structure as [RowFilter]{@link google.bigtable.v2.RowFilter}
   *
   * @typedef Chain
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.RowFilter.Chain definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
   */
  Chain: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  },

  /**
   * A RowFilter which sends each row to each of several component
   * RowFilters and interleaves the results.
   *
   * @property {Object[]} filters
   *   The elements of "filters" all process a copy of the input row, and the
   *   results are pooled, sorted, and combined into a single output row.
   *   If multiple cells are produced with the same column and timestamp,
   *   they will all appear in the output row in an unspecified mutual order.
   *   Consider the following example, with three filters:
   *
   *                                    input row
   *                                        |
   *              -----------------------------------------------------
   *              |                         |                         |
   *             f(0)                      f(1)                      f(2)
   *              |                         |                         |
   *       1: foo,bar,10,x             foo,bar,10,z              far,bar,7,a
   *       2: foo,blah,11,z            far,blah,5,x              far,blah,5,x
   *              |                         |                         |
   *              -----------------------------------------------------
   *                                        |
   *       1:                      foo,bar,10,z   // could have switched with #2
   *       2:                      foo,bar,10,x   // could have switched with #1
   *       3:                      foo,blah,11,z
   *       4:                      far,bar,7,a
   *       5:                      far,blah,5,x   // identical to #6
   *       6:                      far,blah,5,x   // identical to #5
   *
   *   All interleaved filters are executed atomically.
   *
   *   This object should have the same structure as [RowFilter]{@link google.bigtable.v2.RowFilter}
   *
   * @typedef Interleave
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.RowFilter.Interleave definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
   */
  Interleave: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  },

  /**
   * A RowFilter which evaluates one of two possible RowFilters, depending on
   * whether or not a predicate RowFilter outputs any cells from the input row.
   *
   * IMPORTANT NOTE: The predicate filter does not execute atomically with the
   * true and false filters, which may lead to inconsistent or unexpected
   * results. Additionally, Condition filters have poor performance, especially
   * when filters are set for the false condition.
   *
   * @property {Object} predicateFilter
   *   If `predicate_filter` outputs any cells, then `true_filter` will be
   *   evaluated on the input row. Otherwise, `false_filter` will be evaluated.
   *
   *   This object should have the same structure as [RowFilter]{@link google.bigtable.v2.RowFilter}
   *
   * @property {Object} trueFilter
   *   The filter to apply to the input row if `predicate_filter` returns any
   *   results. If not provided, no results will be returned in the true case.
   *
   *   This object should have the same structure as [RowFilter]{@link google.bigtable.v2.RowFilter}
   *
   * @property {Object} falseFilter
   *   The filter to apply to the input row if `predicate_filter` does not
   *   return any results. If not provided, no results will be returned in the
   *   false case.
   *
   *   This object should have the same structure as [RowFilter]{@link google.bigtable.v2.RowFilter}
   *
   * @typedef Condition
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.RowFilter.Condition definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
   */
  Condition: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  }
};

/**
 * Specifies a particular change to be made to the contents of a row.
 *
 * @property {Object} setCell
 *   Set a cell's value.
 *
 *   This object should have the same structure as [SetCell]{@link google.bigtable.v2.SetCell}
 *
 * @property {Object} deleteFromColumn
 *   Deletes cells from a column.
 *
 *   This object should have the same structure as [DeleteFromColumn]{@link google.bigtable.v2.DeleteFromColumn}
 *
 * @property {Object} deleteFromFamily
 *   Deletes cells from a column family.
 *
 *   This object should have the same structure as [DeleteFromFamily]{@link google.bigtable.v2.DeleteFromFamily}
 *
 * @property {Object} deleteFromRow
 *   Deletes cells from the entire row.
 *
 *   This object should have the same structure as [DeleteFromRow]{@link google.bigtable.v2.DeleteFromRow}
 *
 * @typedef Mutation
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.Mutation definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var Mutation = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * A Mutation which sets the value of the specified cell.
   *
   * @property {string} familyName
   *   The name of the family into which new data should be written.
   *   Must match `[-_.a-zA-Z0-9]+`
   *
   * @property {string} columnQualifier
   *   The qualifier of the column into which new data should be written.
   *   Can be any byte string, including the empty string.
   *
   * @property {number} timestampMicros
   *   The timestamp of the cell into which new data should be written.
   *   Use -1 for current Bigtable server time.
   *   Otherwise, the client should set this value itself, noting that the
   *   default value is a timestamp of zero if the field is left unspecified.
   *   Values must match the granularity of the table (e.g. micros, millis).
   *
   * @property {string} value
   *   The value to be written into the specified cell.
   *
   * @typedef SetCell
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.Mutation.SetCell definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
   */
  SetCell: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  },

  /**
   * A Mutation which deletes cells from the specified column, optionally
   * restricting the deletions to a given timestamp range.
   *
   * @property {string} familyName
   *   The name of the family from which cells should be deleted.
   *   Must match `[-_.a-zA-Z0-9]+`
   *
   * @property {string} columnQualifier
   *   The qualifier of the column from which cells should be deleted.
   *   Can be any byte string, including the empty string.
   *
   * @property {Object} timeRange
   *   The range of timestamps within which cells should be deleted.
   *
   *   This object should have the same structure as [TimestampRange]{@link google.bigtable.v2.TimestampRange}
   *
   * @typedef DeleteFromColumn
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.Mutation.DeleteFromColumn definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
   */
  DeleteFromColumn: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  },

  /**
   * A Mutation which deletes all cells from the specified column family.
   *
   * @property {string} familyName
   *   The name of the family from which cells should be deleted.
   *   Must match `[-_.a-zA-Z0-9]+`
   *
   * @typedef DeleteFromFamily
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.Mutation.DeleteFromFamily definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
   */
  DeleteFromFamily: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  },

  /**
   * A Mutation which deletes all cells from the containing row.
   * @typedef DeleteFromRow
   * @memberof google.bigtable.v2
   * @see [google.bigtable.v2.Mutation.DeleteFromRow definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
   */
  DeleteFromRow: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  }
};

/**
 * Specifies an atomic read/modify/write operation on the latest value of the
 * specified column.
 *
 * @property {string} familyName
 *   The name of the family to which the read/modify/write should be applied.
 *   Must match `[-_.a-zA-Z0-9]+`
 *
 * @property {string} columnQualifier
 *   The qualifier of the column to which the read/modify/write should be
 *   applied.
 *   Can be any byte string, including the empty string.
 *
 * @property {string} appendValue
 *   Rule specifying that `append_value` be appended to the existing value.
 *   If the targeted cell is unset, it will be treated as containing the
 *   empty string.
 *
 * @property {number} incrementAmount
 *   Rule specifying that `increment_amount` be added to the existing value.
 *   If the targeted cell is unset, it will be treated as containing a zero.
 *   Otherwise, the targeted cell must contain an 8-byte value (interpreted
 *   as a 64-bit big-endian signed integer), or the entire request will fail.
 *
 * @typedef ReadModifyWriteRule
 * @memberof google.bigtable.v2
 * @see [google.bigtable.v2.ReadModifyWriteRule definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/v2/data.proto}
 */
var ReadModifyWriteRule = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};