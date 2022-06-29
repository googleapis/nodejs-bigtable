exports[
  'Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with an empty request 1'
] = {
  input: {
    code: 4,
    message: {},
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
  'Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with a decode value set 1'
] = {
  input: {
    code: 4,
    message: {
      decode: true,
    },
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
  'Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with an encoding value set 1'
] = {
  input: {
    code: 4,
    message: {
      encoding: 'test-encoding',
    },
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
  'Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with start and end values 1'
] = {
  input: {
    code: 4,
    message: {
      start: 'test-start',
      end: 'test-end',
    },
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
            rowRanges: [
              {
                startKeyClosed: {
                  type: 'Buffer',
                  data: [116, 101, 115, 116, 45, 115, 116, 97, 114, 116],
                },
                startKey: 'startKeyClosed',
                endKeyClosed: {
                  type: 'Buffer',
                  data: [116, 101, 115, 116, 45, 101, 110, 100],
                },
                endKey: 'endKeyClosed',
              },
            ],
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
  'Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with keys 1'
] = {
  input: {
    code: 4,
    message: {
      keys: ['test-key-1', 'test-key-2'],
    },
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
            rowKeys: [
              {
                type: 'Buffer',
                data: [116, 101, 115, 116, 45, 107, 101, 121, 45, 49],
              },
              {
                type: 'Buffer',
                data: [116, 101, 115, 116, 45, 107, 101, 121, 45, 50],
              },
            ],
            rowRanges: [],
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
  'Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with a limit 1'
] = {
  input: {
    code: 4,
    message: {
      limit: 10,
    },
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
          rowsLimit: '10',
          appProfileId: '',
        },
      },
      requestOrder: [0, 0, 0, 0],
      callCount: 4,
    },
  },
};

exports[
  'Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with a prefix 1'
] = {
  input: {
    code: 4,
    message: {
      prefix: 'test-prefix',
    },
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
            rowRanges: [
              {
                startKeyClosed: {
                  type: 'Buffer',
                  data: [116, 101, 115, 116, 45, 112, 114, 101, 102, 105, 120],
                },
                startKey: 'startKeyClosed',
                endKeyOpen: {
                  type: 'Buffer',
                  data: [116, 101, 115, 116, 45, 112, 114, 101, 102, 105, 121],
                },
                endKey: 'endKeyOpen',
              },
            ],
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
  'Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with prefixes 1'
] = {
  input: {
    code: 4,
    message: {
      prefixes: ['test-prefix1', 'test-prefix2'],
    },
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
            rowRanges: [
              {
                startKeyClosed: {
                  type: 'Buffer',
                  data: [
                    116, 101, 115, 116, 45, 112, 114, 101, 102, 105, 120, 49,
                  ],
                },
                startKey: 'startKeyClosed',
                endKeyOpen: {
                  type: 'Buffer',
                  data: [
                    116, 101, 115, 116, 45, 112, 114, 101, 102, 105, 120, 50,
                  ],
                },
                endKey: 'endKeyOpen',
              },
              {
                startKeyClosed: {
                  type: 'Buffer',
                  data: [
                    116, 101, 115, 116, 45, 112, 114, 101, 102, 105, 120, 50,
                  ],
                },
                startKey: 'startKeyClosed',
                endKeyOpen: {
                  type: 'Buffer',
                  data: [
                    116, 101, 115, 116, 45, 112, 114, 101, 102, 105, 120, 51,
                  ],
                },
                endKey: 'endKeyOpen',
              },
            ],
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
  'Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with a list of ranges 1'
] = {
  input: {
    code: 4,
    message: {
      ranges: [
        {
          start: 'test-start-1',
          end: 'test-end-1',
        },
        {
          start: 'test-start-2',
          end: 'test-end-2',
        },
      ],
    },
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
            rowRanges: [
              {
                startKeyClosed: {
                  type: 'Buffer',
                  data: [
                    116, 101, 115, 116, 45, 115, 116, 97, 114, 116, 45, 49,
                  ],
                },
                startKey: 'startKeyClosed',
                endKeyClosed: {
                  type: 'Buffer',
                  data: [116, 101, 115, 116, 45, 101, 110, 100, 45, 49],
                },
                endKey: 'endKeyClosed',
              },
              {
                startKeyClosed: {
                  type: 'Buffer',
                  data: [
                    116, 101, 115, 116, 45, 115, 116, 97, 114, 116, 45, 50,
                  ],
                },
                startKey: 'startKeyClosed',
                endKeyClosed: {
                  type: 'Buffer',
                  data: [116, 101, 115, 116, 45, 101, 110, 100, 45, 50],
                },
                endKey: 'endKeyClosed',
              },
            ],
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
