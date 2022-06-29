exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with deadline exceeded error 1'
] = {
  result: 'error',
  output: {
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
    code: 4,
    callCount: 4,
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with resource exhausted error 1'
] = {
  result: 'error',
  output: {
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
    code: 8,
    callCount: 4,
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with aborted error 1'
] = {
  result: 'error',
  output: {
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
    code: 10,
    callCount: 4,
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with unavailable error 1'
] = {
  result: 'error',
  output: {
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
    code: 14,
    callCount: 4,
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is not retryable should ensure correct behavior with cancelled error 1'
] = {
  result: 'data',
  output: {
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
    code: 1,
    callCount: 1,
  },
  data: [],
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is not retryable should ensure correct behavior with internal error 1'
] = {
  result: 'error',
  output: {
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
    code: 13,
    callCount: 1,
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is not retryable should ensure correct behavior with invalid argument error 1'
] = {
  result: 'error',
  output: {
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
    code: 3,
    callCount: 1,
  },
};
