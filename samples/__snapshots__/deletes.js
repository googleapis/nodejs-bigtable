exports['deletes should delete one cell from a row 1'] = `
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


`

exports['deletes should delete a whole range of rows 1'] = `
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


`

exports['deletes should delete a column family 1'] = `
Column Family cell_plan
\tdata_plan_01gb:  @1559347200000000
\tdata_plan_05gb:  @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000


`

exports['deletes should delete a table 1'] = `
[ false ]

`
