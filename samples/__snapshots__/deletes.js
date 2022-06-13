// Copyright 2022 Google LLC
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

exports['deletes should delete column from a row 1'] = `
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.003 @1559347200000000
Column Family cell_plan
\tdata_plan_01gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000


`;

exports['deletes should delete column family from a row 1'] = `
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.003 @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000


`;

exports['deletes should delete a row 1'] = `
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000


`;

exports['deletes should stream rows and then do a batch delete 1'] = `
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000


`;

exports['deletes should check and mutate 1'] = `
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000


`;

exports['deletes should delete a whole range of rows 1'] = `
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000


`;

exports['deletes should delete a column family 1'] = `


`;

exports['deletes should delete a table 1'] = `
[ false ]

`;
