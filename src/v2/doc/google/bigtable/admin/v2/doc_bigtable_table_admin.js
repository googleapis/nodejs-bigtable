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
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.CreateTable
 *
 * @property {string} parent
 *   The unique name of the instance in which to create the table.
 *   Values are of the form `projects/<project>/instances/<instance>`.
 *
 * @property {string} tableId
 *   The name by which the new table should be referred to within the parent
 *   instance, e.g., `foobar` rather than `<parent>/tables/foobar`.
 *
 * @property {Object} table
 *   The Table to create.
 *
 *   This object should have the same structure as [Table]{@link google.bigtable.admin.v2.Table}
 *
 * @property {Object[]} initialSplits
 *   The optional list of row keys that will be used to initially split the
 *   table into several tablets (tablets are similar to HBase regions).
 *   Given two split keys, `s1` and `s2`, three tablets will be created,
 *   spanning the key ranges: `[, s1), [s1, s2), [s2, )`.
 *
 *   Example:
 *
 *   * Row keys := `["a", "apple", "custom", "customer_1", "customer_2",`
 *                  `"other", "zz"]`
 *   * initial_split_keys := `["apple", "customer_1", "customer_2", "other"]`
 *   * Key assignment:
 *       - Tablet 1 `[, apple)                => {"a"}.`
 *       - Tablet 2 `[apple, customer_1)      => {"apple", "custom"}.`
 *       - Tablet 3 `[customer_1, customer_2) => {"customer_1"}.`
 *       - Tablet 4 `[customer_2, other)      => {"customer_2"}.`
 *       - Tablet 5 `[other, )                => {"other", "zz"}.`
 *
 *   This object should have the same structure as [Split]{@link google.bigtable.admin.v2.Split}
 *
 * @typedef CreateTableRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CreateTableRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var CreateTableRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * An initial split point for a newly created table.
   *
   * @property {string} key
   *   Row key to use as an initial tablet boundary.
   *
   * @typedef Split
   * @memberof google.bigtable.admin.v2
   * @see [google.bigtable.admin.v2.CreateTableRequest.Split definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
   */
  Split: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  }
};

/**
 * This is a private alpha release of Cloud Bigtable snapshots. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.CreateTableFromSnapshot
 *
 * @property {string} parent
 *   The unique name of the instance in which to create the table.
 *   Values are of the form `projects/<project>/instances/<instance>`.
 *
 * @property {string} tableId
 *   The name by which the new table should be referred to within the parent
 *   instance, e.g., `foobar` rather than `<parent>/tables/foobar`.
 *
 * @property {string} sourceSnapshot
 *   The unique name of the snapshot from which to restore the table. The
 *   snapshot and the table must be in the same instance.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/clusters/<cluster>/snapshots/<snapshot>`.
 *
 * @typedef CreateTableFromSnapshotRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CreateTableFromSnapshotRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var CreateTableFromSnapshotRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.DropRowRange
 *
 * @property {string} name
 *   The unique name of the table on which to drop a range of rows.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {string} rowKeyPrefix
 *   Delete all rows that start with this row key prefix. Prefix cannot be
 *   zero length.
 *
 * @property {boolean} deleteAllDataFromTable
 *   Delete all rows in the table. Setting this to false is a no-op.
 *
 * @typedef DropRowRangeRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.DropRowRangeRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var DropRowRangeRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.ListTables
 *
 * @property {string} parent
 *   The unique name of the instance for which tables should be listed.
 *   Values are of the form `projects/<project>/instances/<instance>`.
 *
 * @property {number} view
 *   The view to be applied to the returned tables' fields.
 *   Defaults to `NAME_ONLY` if unspecified; no others are currently supported.
 *
 *   The number should be among the values of [View]{@link google.bigtable.admin.v2.View}
 *
 * @property {string} pageToken
 *   The value of `next_page_token` returned by a previous call.
 *
 * @typedef ListTablesRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListTablesRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var ListTablesRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Response message for
 * google.bigtable.admin.v2.BigtableTableAdmin.ListTables
 *
 * @property {Object[]} tables
 *   The tables present in the requested instance.
 *
 *   This object should have the same structure as [Table]{@link google.bigtable.admin.v2.Table}
 *
 * @property {string} nextPageToken
 *   Set if not all tables could be returned in a single response.
 *   Pass this value to `page_token` in another request to get the next
 *   page of results.
 *
 * @typedef ListTablesResponse
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListTablesResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var ListTablesResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.GetTable
 *
 * @property {string} name
 *   The unique name of the requested table.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {number} view
 *   The view to be applied to the returned table's fields.
 *   Defaults to `SCHEMA_VIEW` if unspecified.
 *
 *   The number should be among the values of [View]{@link google.bigtable.admin.v2.View}
 *
 * @typedef GetTableRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.GetTableRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var GetTableRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.DeleteTable
 *
 * @property {string} name
 *   The unique name of the table to be deleted.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @typedef DeleteTableRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.DeleteTableRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var DeleteTableRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.ModifyColumnFamilies
 *
 * @property {string} name
 *   The unique name of the table whose families should be modified.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {Object[]} modifications
 *   Modifications to be atomically applied to the specified table's families.
 *   Entries are applied in order, meaning that earlier modifications can be
 *   masked by later ones (in the case of repeated updates to the same family,
 *   for example).
 *
 *   This object should have the same structure as [Modification]{@link google.bigtable.admin.v2.Modification}
 *
 * @typedef ModifyColumnFamiliesRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ModifyColumnFamiliesRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var ModifyColumnFamiliesRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.

  /**
   * A create, update, or delete of a particular column family.
   *
   * @property {string} id
   *   The ID of the column family to be modified.
   *
   * @property {Object} create
   *   Create a new column family with the specified schema, or fail if
   *   one already exists with the given ID.
   *
   *   This object should have the same structure as [ColumnFamily]{@link google.bigtable.admin.v2.ColumnFamily}
   *
   * @property {Object} update
   *   Update an existing column family to the specified schema, or fail
   *   if no column family exists with the given ID.
   *
   *   This object should have the same structure as [ColumnFamily]{@link google.bigtable.admin.v2.ColumnFamily}
   *
   * @property {boolean} drop
   *   Drop (delete) the column family with the given ID, or fail if no such
   *   family exists.
   *
   * @typedef Modification
   * @memberof google.bigtable.admin.v2
   * @see [google.bigtable.admin.v2.ModifyColumnFamiliesRequest.Modification definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
   */
  Modification: {
    // This is for documentation. Actual contents will be loaded by gRPC.
  }
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.GenerateConsistencyToken
 *
 * @property {string} name
 *   The unique name of the Table for which to create a consistency token.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @typedef GenerateConsistencyTokenRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.GenerateConsistencyTokenRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var GenerateConsistencyTokenRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Response message for
 * google.bigtable.admin.v2.BigtableTableAdmin.GenerateConsistencyToken
 *
 * @property {string} consistencyToken
 *   The generated consistency token.
 *
 * @typedef GenerateConsistencyTokenResponse
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.GenerateConsistencyTokenResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var GenerateConsistencyTokenResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.CheckConsistency
 *
 * @property {string} name
 *   The unique name of the Table for which to check replication consistency.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {string} consistencyToken
 *   The token created using GenerateConsistencyToken for the Table.
 *
 * @typedef CheckConsistencyRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CheckConsistencyRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var CheckConsistencyRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable replication. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Response message for
 * google.bigtable.admin.v2.BigtableTableAdmin.CheckConsistency
 *
 * @property {boolean} consistent
 *   True only if the token is consistent. A token is consistent if replication
 *   has caught up with the restrictions specified in the request.
 *
 * @typedef CheckConsistencyResponse
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CheckConsistencyResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var CheckConsistencyResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable snapshots. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.SnapshotTable
 *
 * @property {string} name
 *   The unique name of the table to have the snapshot taken.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 *
 * @property {string} cluster
 *   The name of the cluster where the snapshot will be created in.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/clusters/<cluster>`.
 *
 * @property {string} snapshotId
 *   The ID by which the new snapshot should be referred to within the parent
 *   cluster, e.g., `mysnapshot` of the form: `[_a-zA-Z0-9][-_.a-zA-Z0-9]*`
 *   rather than
 *   `projects/<project>/instances/<instance>/clusters/<cluster>/snapshots/mysnapshot`.
 *
 * @property {Object} ttl
 *   The amount of time that the new snapshot can stay active after it is
 *   created. Once 'ttl' expires, the snapshot will get deleted. The maximum
 *   amount of time a snapshot can stay active is 7 days. If 'ttl' is not
 *   specified, the default value of 24 hours will be used.
 *
 *   This object should have the same structure as [Duration]{@link google.protobuf.Duration}
 *
 * @property {string} description
 *   Description of the snapshot.
 *
 * @typedef SnapshotTableRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.SnapshotTableRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var SnapshotTableRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable snapshots. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.GetSnapshot
 *
 * @property {string} name
 *   The unique name of the requested snapshot.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/clusters/<cluster>/snapshots/<snapshot>`.
 *
 * @typedef GetSnapshotRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.GetSnapshotRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var GetSnapshotRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable snapshots. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.ListSnapshots
 *
 * @property {string} parent
 *   The unique name of the cluster for which snapshots should be listed.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/clusters/<cluster>`.
 *   Use `<cluster> = '-'` to list snapshots for all clusters in an instance,
 *   e.g., `projects/<project>/instances/<instance>/clusters/-`.
 *
 * @property {number} pageSize
 *   The maximum number of snapshots to return.
 *
 * @property {string} pageToken
 *   The value of `next_page_token` returned by a previous call.
 *
 * @typedef ListSnapshotsRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListSnapshotsRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var ListSnapshotsRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable snapshots. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Response message for
 * google.bigtable.admin.v2.BigtableTableAdmin.ListSnapshots
 *
 * @property {Object[]} snapshots
 *   The snapshots present in the requested cluster.
 *
 *   This object should have the same structure as [Snapshot]{@link google.bigtable.admin.v2.Snapshot}
 *
 * @property {string} nextPageToken
 *   Set if not all snapshots could be returned in a single response.
 *   Pass this value to `page_token` in another request to get the next
 *   page of results.
 *
 * @typedef ListSnapshotsResponse
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.ListSnapshotsResponse definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var ListSnapshotsResponse = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable snapshots. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * Request message for
 * google.bigtable.admin.v2.BigtableTableAdmin.DeleteSnapshot
 *
 * @property {string} name
 *   The unique name of the snapshot to be deleted.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/clusters/<cluster>/snapshots/<snapshot>`.
 *
 * @typedef DeleteSnapshotRequest
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.DeleteSnapshotRequest definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var DeleteSnapshotRequest = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable snapshots. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * The metadata for the Operation returned by SnapshotTable.
 *
 * @property {Object} originalRequest
 *   The request that prompted the initiation of this SnapshotTable operation.
 *
 *   This object should have the same structure as [SnapshotTableRequest]{@link google.bigtable.admin.v2.SnapshotTableRequest}
 *
 * @property {Object} requestTime
 *   The time at which the original request was received.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {Object} finishTime
 *   The time at which the operation failed or was completed successfully.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @typedef SnapshotTableMetadata
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.SnapshotTableMetadata definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var SnapshotTableMetadata = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};

/**
 * This is a private alpha release of Cloud Bigtable snapshots. This feature
 * is not currently available to most Cloud Bigtable customers. This feature
 * might be changed in backward-incompatible ways and is not recommended for
 * production use. It is not subject to any SLA or deprecation policy.
 *
 * The metadata for the Operation returned by CreateTableFromSnapshot.
 *
 * @property {Object} originalRequest
 *   The request that prompted the initiation of this CreateTableFromSnapshot
 *   operation.
 *
 *   This object should have the same structure as [CreateTableFromSnapshotRequest]{@link google.bigtable.admin.v2.CreateTableFromSnapshotRequest}
 *
 * @property {Object} requestTime
 *   The time at which the original request was received.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @property {Object} finishTime
 *   The time at which the operation failed or was completed successfully.
 *
 *   This object should have the same structure as [Timestamp]{@link google.protobuf.Timestamp}
 *
 * @typedef CreateTableFromSnapshotMetadata
 * @memberof google.bigtable.admin.v2
 * @see [google.bigtable.admin.v2.CreateTableFromSnapshotMetadata definition in proto format]{@link https://github.com/googleapis/googleapis/blob/master/google/bigtable/admin/v2/bigtable_table_admin.proto}
 */
var CreateTableFromSnapshotMetadata = {
  // This is for documentation. Actual contents will be loaded by gRPC.
};