exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with retryable errors 1'
] = {
  code: 14,
  callCount: 4,
  request: {
    tableName:
      'projects/{{projectId}}/instances/fake-instance/tables/fake-table',
    rows: {
      rowKeys: [],
      rowRanges: [{}],
    },
    filter: null,
    rowsLimit: '0',
    appProfileId: '',
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with retryable errors 2'
] = {
  code: 10,
  callCount: 4,
  request: {
    tableName:
      'projects/{{projectId}}/instances/fake-instance/tables/fake-table',
    rows: {
      rowKeys: [],
      rowRanges: [{}],
    },
    filter: null,
    rowsLimit: '0',
    appProfileId: '',
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with retryable errors 3'
] = {
  code: 8,
  callCount: 4,
  request: {
    tableName:
      'projects/{{projectId}}/instances/fake-instance/tables/fake-table',
    rows: {
      rowKeys: [],
      rowRanges: [{}],
    },
    filter: null,
    rowsLimit: '0',
    appProfileId: '',
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with retryable errors 4'
] = {
  code: 4,
  callCount: 4,
  request: {
    tableName:
      'projects/{{projectId}}/instances/fake-instance/tables/fake-table',
    rows: {
      rowKeys: [],
      rowRanges: [{}],
    },
    filter: null,
    rowsLimit: '0',
    appProfileId: '',
  },
};
