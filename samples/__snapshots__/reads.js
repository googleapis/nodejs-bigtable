exports['reads should read one row 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tconnected_cell: 1 @1559347200000000
\tconnected_wifi: 1 @1559347200000000
\tos_build: PQ2A.190405.003 @1559347200000000


`;

exports['reads should read part of one row 1'] = `
Reading data for phone#4c410523#20190501:
Column Family stats_summary
\tos_build: PQ2A.190405.003 @1559347200000000


`;

exports['reads should read multiple rows 1'] = `
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


`;

exports['reads should read a range of rows 1'] = `
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


`;

exports['reads should read multiple ranges of rows 1'] = `
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

exports['reads should read using a row prefix 1'] = `
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

exports['reads should read with a filter 1'] = `
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
