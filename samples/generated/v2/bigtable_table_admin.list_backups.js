// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main(parent) {
  // [START bigtableadmin_v2_generated_BigtableTableAdmin_ListBackups_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The cluster to list backups from.  Values are of the
   *  form `projects/{project}/instances/{instance}/clusters/{cluster}`.
   *  Use `{cluster} = '-'` to list backups for all clusters in an instance,
   *  e.g., `projects/{project}/instances/{instance}/clusters/-`.
   */
  // const parent = 'abc123'
  /**
   *  A filter expression that filters backups listed in the response.
   *  The expression must specify the field name, a comparison operator,
   *  and the value that you want to use for filtering. The value must be a
   *  string, a number, or a boolean. The comparison operator must be
   *  <, >, <=, >=, !=, =, or :. Colon ':' represents a HAS operator which is
   *  roughly synonymous with equality. Filter rules are case insensitive.
   *  The fields eligible for filtering are:
   *    * `name`
   *    * `source_table`
   *    * `state`
   *    * `start_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ)
   *    * `end_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ)
   *    * `expire_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ)
   *    * `size_bytes`
   *  To filter on multiple expressions, provide each separate expression within
   *  parentheses. By default, each expression is an AND expression. However,
   *  you can include AND, OR, and NOT expressions explicitly.
   *  Some examples of using filters are:
   *    * `name:"exact"` --> The backup's name is the string "exact".
   *    * `name:howl` --> The backup's name contains the string "howl".
   *    * `source_table:prod`
   *           --> The source_table's name contains the string "prod".
   *    * `state:CREATING` --> The backup is pending creation.
   *    * `state:READY` --> The backup is fully created and ready for use.
   *    * `(name:howl) AND (start_time < \"2018-03-28T14:50:00Z\")`
   *           --> The backup name contains the string "howl" and start_time
   *               of the backup is before 2018-03-28T14:50:00Z.
   *    * `size_bytes > 10000000000` --> The backup's size is greater than 10GB
   */
  // const filter = 'abc123'
  /**
   *  An expression for specifying the sort order of the results of the request.
   *  The string value should specify one or more fields in Backup google.bigtable.admin.v2.Backup. The full
   *  syntax is described at https://aip.dev/132#ordering.
   *  Fields supported are:
   *     * name
   *     * source_table
   *     * expire_time
   *     * start_time
   *     * end_time
   *     * size_bytes
   *     * state
   *  For example, "start_time". The default sorting order is ascending.
   *  To specify descending order for the field, a suffix " desc" should
   *  be appended to the field name. For example, "start_time desc".
   *  Redundant space characters in the syntax are insigificant.
   *  If order_by is empty, results will be sorted by `start_time` in descending
   *  order starting from the most recently created backup.
   */
  // const orderBy = 'abc123'
  /**
   *  Number of backups to be returned in the response. If 0 or
   *  less, defaults to the server's maximum allowed page size.
   */
  // const pageSize = 1234
  /**
   *  If non-empty, `page_token` should contain a
   *  next_page_token google.bigtable.admin.v2.ListBackupsResponse.next_page_token  from a
   *  previous ListBackupsResponse google.bigtable.admin.v2.ListBackupsResponse  to the same `parent` and with the same
   *  `filter`.
   */
  // const pageToken = 'abc123'

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function callListBackups() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const iterable = await adminClient.listBackupsAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  callListBackups();
  // [END bigtableadmin_v2_generated_BigtableTableAdmin_ListBackups_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
