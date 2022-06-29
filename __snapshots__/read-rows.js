exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with deadline exceeded error 1'
] = {
  input: {
    code: 4,
  },
  output: {
    results: {
      result: 'error',
    },
    requestData: {
      requests: {
        0: {
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
      },
      requestOrder: [0, 0, 0, 0],
      callCount: 4,
    },
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with resource exhausted error 1'
] = {
  input: {
    code: 8,
  },
  output: {
    results: {
      result: 'error',
    },
    requestData: {
      requests: {
        0: {
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
      },
      requestOrder: [0, 0, 0, 0],
      callCount: 4,
    },
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with aborted error 1'
] = {
  input: {
    code: 10,
  },
  output: {
    results: {
      result: 'error',
    },
    requestData: {
      requests: {
        0: {
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
      },
      requestOrder: [0, 0, 0, 0],
      callCount: 4,
    },
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with unavailable error 1'
] = {
  input: {
    code: 14,
  },
  output: {
    results: {
      result: 'error',
    },
    requestData: {
      requests: {
        0: {
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
      },
      requestOrder: [0, 0, 0, 0],
      callCount: 4,
    },
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is not retryable should ensure correct behavior with cancelled error 1'
] = {
  output: {
    input: {
      code: 1,
    },
    output: {
      results: {
        result: 'data',
        data: [],
      },
      requestData: {
        requests: {
          0: {
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
        },
        requestOrder: [0],
        callCount: 1,
      },
    },
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is not retryable should ensure correct behavior with internal error 1'
] = {
  input: {
    code: 13,
  },
  output: {
    results: {
      result: 'error',
    },
    requestData: {
      requests: {
        0: {
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
      },
      requestOrder: [0],
      callCount: 1,
    },
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back where the error is not retryable should ensure correct behavior with invalid argument error 1'
] = {
  input: {
    code: 3,
  },
  output: {
    results: {
      result: 'error',
    },
    requestData: {
      requests: {
        0: {
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
      },
      requestOrder: [0],
      callCount: 1,
    },
  },
};
