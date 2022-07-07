exports[
  'Bigtable/ReadRows with custom responses and createReadStream arguments should pass checks with a simple call 1'
] = {
  input: {
    responses: [
      {
        row_keys: ['a', 'b', 'c'],
        last_row_key: 'c',
        end_with_error: 13,
      },
    ],
    message: {
      rowKeys: [],
      rowRanges: [{}],
    },
  },
  output: {
    results: {
      result: 'error',
      data: [['a', 'b', 'c']],
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
  'Bigtable/ReadRows with custom responses and createReadStream arguments retries a failed read 1'
] = {
  input: {
    responses: [
      {
        row_keys: ['a', 'b'],
        last_row_key: 'c',
        end_with_error: 4,
      },
      {
        row_keys: ['c'],
        last_row_key: 'c',
      },
    ],
    message: {
      rowKeys: [],
      rowRanges: [{}],
    },
  },
  output: {
    results: {
      result: 'end stream',
      data: [['a', 'b'], ['c']],
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
        1: {
          tableName:
            'projects/{{projectId}}/instances/fake-instance/tables/fake-table',
          rows: {
            rowKeys: [],
            rowRanges: [
              {
                startKeyOpen: {
                  type: 'Buffer',
                  data: [99],
                },
                startKey: 'startKeyOpen',
              },
            ],
          },
          filter: null,
          rowsLimit: '0',
          appProfileId: '',
        },
      },
      requestOrder: [0, 1],
      callCount: 2,
    },
  },
};

exports[
  'Bigtable/ReadRows with custom responses and createReadStream arguments fails after all available retries 1'
] = {
  input: {
    responses: [
      {
        end_with_error: 4,
      },
      {
        end_with_error: 4,
      },
      {
        end_with_error: 4,
      },
      {
        end_with_error: 4,
      },
    ],
    message: {
      rowKeys: [],
      rowRanges: [{}],
    },
  },
  output: {
    results: {
      result: 'error',
      data: [[], [], [], []],
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
