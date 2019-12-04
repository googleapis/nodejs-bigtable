exports['filters should filter with row regex 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.003 @1559347200000000
Column Family cell_plan
\tdata_plan_01gb: true @1559347200000000
\tdata_plan_01gb: false @1559174400000000
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000


`;

exports['filters should filter with cells per col 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.003 @1559347200000000
Column Family cell_plan
\tdata_plan_01gb: true @1559347200000000
\tdata_plan_01gb: false @1559174400000000
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000


`;

exports['filters should filter with cells per row 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000


`;

exports['filters should filter with cells per row offset 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tos_build: PQ2A.190405.003 @1559347200000000
Column Family cell_plan
\tdata_plan_01gb: true @1559347200000000
\tdata_plan_01gb: false @1559174400000000
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000


`;

exports['filters should filter with col family regex 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.003 @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.004 @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190401.002 @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000


`;

exports['filters should filter with col qualifier regex 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000


`;

exports['filters should filter with col range 1'] = `
Reading data for phone#4c410523#20190501:
Column Family cell_plan
\tdata_plan_01gb: true @1559347200000000
\tdata_plan_01gb: false @1559174400000000
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000


`;

exports['filters should filter with value range 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tos_build: PQ2A.190405.003 @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tos_build: PQ2A.190405.004 @1559347200000000


`;

exports['filters should filter with value regex 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tos_build: PQ2A.190405.003 @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tos_build: PQ2A.190405.004 @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tos_build: PQ2A.190401.002 @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @1559347200000000


`;

exports['filters should filter with timestamp range 1'] = `
Reading data for phone#4c410523#20190501:
Column Family cell_plan
\tdata_plan_01gb: false @1559174400000000


`;

exports['filters should filter with pass all 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.003 @1559347200000000
Column Family cell_plan
\tdata_plan_01gb: true @1559347200000000
\tdata_plan_01gb: false @1559174400000000
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 0 @1559347200000000
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000


`;

exports['filters should filter with strip value 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell:  @1559347200000000
\tconnected_wifi:  @1559347200000000
\tos_build:  @1559347200000000
Column Family cell_plan
\tdata_plan_01gb:  @1559347200000000
\tdata_plan_01gb:  @1559174400000000
\tdata_plan_05gb:  @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell:  @1559347200000000
\tconnected_wifi:  @1559347200000000
\tos_build:  @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell:  @1559347200000000
\tconnected_wifi:  @1559347200000000
\tos_build:  @1559347200000000
Column Family cell_plan
\tdata_plan_05gb:  @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell:  @1559347200000000
\tconnected_wifi:  @1559347200000000
\tos_build:  @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell:  @1559347200000000
\tconnected_wifi:  @1559347200000000
\tos_build:  @1559347200000000
Column Family cell_plan
\tdata_plan_10gb:  @1559347200000000


`;

exports['filters should filter with label 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000 [labelled]
\tconnected_wifi: 1 @1559347200000000 [labelled]
\tos_build: PQ2A.190405.003 @1559347200000000 [labelled]
Column Family cell_plan
\tdata_plan_01gb: true @1559347200000000 [labelled]
\tdata_plan_01gb: false @1559174400000000 [labelled]
\tdata_plan_05gb: true @1559347200000000 [labelled]

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000 [labelled]
\tconnected_wifi: 1 @1559347200000000 [labelled]
\tos_build: PQ2A.190405.004 @1559347200000000 [labelled]
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000 [labelled]

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000 [labelled]
\tconnected_wifi: 1 @1559347200000000 [labelled]
\tos_build: PQ2A.190406.000 @1559347200000000 [labelled]
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000 [labelled]

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000 [labelled]
\tconnected_wifi: 1 @1559347200000000 [labelled]
\tos_build: PQ2A.190401.002 @1559347200000000 [labelled]
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000 [labelled]

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000 [labelled]
\tconnected_wifi: 0 @1559347200000000 [labelled]
\tos_build: PQ2A.190406.000 @1559347200000000 [labelled]
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000 [labelled]


`;

exports['filters should filter with chain 1'] = `
Reading data for phone#4c410523#20190501:
Column Family cell_plan
\tdata_plan_01gb: true @1559347200000000
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000


`;

exports['filters should filter with interleave 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tos_build: PQ2A.190405.003 @1559347200000000
Column Family cell_plan
\tdata_plan_01gb: true @1559347200000000
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tos_build: PQ2A.190405.004 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tos_build: PQ2A.190401.002 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tos_build: PQ2A.190406.000 @1559347200000000
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000


`;

exports['filters should filter with condition 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000 [filtered-out]
\tconnected_wifi: 1 @1559347200000000 [filtered-out]
\tos_build: PQ2A.190405.003 @1559347200000000 [filtered-out]
Column Family cell_plan
\tdata_plan_01gb: true @1559347200000000 [filtered-out]
\tdata_plan_01gb: false @1559174400000000 [filtered-out]
\tdata_plan_05gb: true @1559347200000000 [filtered-out]

Reading data for phone#4c410523#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000 [filtered-out]
\tconnected_wifi: 1 @1559347200000000 [filtered-out]
\tos_build: PQ2A.190405.004 @1559347200000000 [filtered-out]
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000 [filtered-out]

Reading data for phone#4c410523#20190505:
Column Family stats_summary
\tconnected_cell: 0 @1559347200000000 [filtered-out]
\tconnected_wifi: 1 @1559347200000000 [filtered-out]
\tos_build: PQ2A.190406.000 @1559347200000000 [filtered-out]
Column Family cell_plan
\tdata_plan_05gb: true @1559347200000000 [filtered-out]

Reading data for phone#5c10102#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000 [passed-filter]
\tconnected_wifi: 1 @1559347200000000 [passed-filter]
\tos_build: PQ2A.190401.002 @1559347200000000 [passed-filter]
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000 [passed-filter]

Reading data for phone#5c10102#20190502:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000 [passed-filter]
\tconnected_wifi: 0 @1559347200000000 [passed-filter]
\tos_build: PQ2A.190406.000 @1559347200000000 [passed-filter]
Column Family cell_plan
\tdata_plan_10gb: true @1559347200000000 [passed-filter]


`;
