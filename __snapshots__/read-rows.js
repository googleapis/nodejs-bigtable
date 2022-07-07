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

exports[
  'Bigtable/ReadRows with custom responses and createReadStream arguments resets the retry counter after a successful read 1'
] = {
  input: {
    responses: [
      {
        row_keys: ['a'],
        last_row_key: 'a',
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
      {
        row_keys: ['b'],
        last_row_key: 'b',
        end_with_error: 4,
      },
      {
        end_with_error: 4,
      },
      {
        end_with_error: 4,
      },
      {
        row_keys: ['c'],
        last_row_key: 'b',
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
      data: [['a'], [], [], []],
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
                  data: [97],
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
      requestOrder: [0, 1, 1, 1],
      callCount: 4,
    },
  },
};

exports[
  'Bigtable/ReadRows with custom responses and createReadStream arguments moves the start point of a range being consumed 1'
] = {
  input: {
    responses: [
      {
        row_keys: ['a', 'b'],
        end_with_error: 4,
      },
      {
        row_keys: ['c'],
      },
    ],
    message: {
      ranges: [
        {
          start: {
            value: 'b',
            inclusive: false,
          },
          end: 'z',
        },
      ],
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
            rowRanges: [
              {
                startKeyClosed: {
                  type: 'Buffer',
                  data: [97],
                },
                startKey: 'startKeyClosed',
                endKeyClosed: {
                  type: 'Buffer',
                  data: [122],
                },
                endKey: 'endKeyClosed',
              },
            ],
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
                  data: [98],
                },
                startKey: 'startKeyOpen',
                endKeyClosed: {
                  type: 'Buffer',
                  data: [122],
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
      requestOrder: [0, 1],
      callCount: 2,
    },
  },
};

exports[
  'Bigtable/ReadRows with custom responses and createReadStream arguments removes ranges already consumed 1'
] = {
  input: {
    responses: [
      {
        row_keys: ['a', 'b', 'c'],
        end_with_error: 4,
      },
      {
        row_keys: ['x'],
      },
    ],
    message: {
      ranges: [
        {
          start: 'x',
          end: 'z',
        },
      ],
    },
  },
  output: {
    results: {
      result: 'end stream',
      data: [['a', 'b', 'c'], ['x']],
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
                  data: [97],
                },
                startKey: 'startKeyClosed',
                endKeyClosed: {
                  type: 'Buffer',
                  data: [99],
                },
                endKey: 'endKeyClosed',
              },
              {
                startKeyClosed: {
                  type: 'Buffer',
                  data: [120],
                },
                startKey: 'startKeyClosed',
                endKeyClosed: {
                  type: 'Buffer',
                  data: [122],
                },
                endKey: 'endKeyClosed',
              },
            ],
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
                startKeyClosed: {
                  type: 'Buffer',
                  data: [120],
                },
                startKey: 'startKeyClosed',
                endKeyClosed: {
                  type: 'Buffer',
                  data: [122],
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
      requestOrder: [0, 1],
      callCount: 2,
    },
  },
};

exports[
  'Bigtable/ReadRows with custom responses and createReadStream arguments removes keys already read 1'
] = {
  input: {
    responses: [
      {
        row_keys: ['a', 'b', 'c'],
        end_with_error: 4,
      },
      {
        row_keys: ['x'],
      },
    ],
    message: {
      keys: ['a', 'b', 'x'],
    },
  },
  output: {
    results: {
      result: 'end stream',
      data: [['a', 'b', 'c'], ['x']],
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
                data: [97],
              },
              {
                type: 'Buffer',
                data: [98],
              },
              {
                type: 'Buffer',
                data: [120],
              },
            ],
            rowRanges: [],
          },
          filter: null,
          rowsLimit: '0',
          appProfileId: '',
        },
        1: {
          tableName:
            'projects/{{projectId}}/instances/fake-instance/tables/fake-table',
          rows: {
            rowKeys: [
              {
                type: 'Buffer',
                data: [120],
              },
            ],
            rowRanges: [],
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
  'Bigtable/ReadRows with custom responses and createReadStream arguments adjust the limit based on the number of rows read 1'
] = {
  input: {
    responses: [
      {
        row_keys: ['a', 'b'],
        end_with_error: 4,
      },
      {
        row_keys: ['x'],
      },
    ],
    message: {
      limit: 10,
    },
  },
  output: {
    results: {
      result: 'end stream',
      data: [['a', 'b'], ['x']],
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
        1: {
          tableName:
            'projects/{{projectId}}/instances/fake-instance/tables/fake-table',
          rows: {
            rowKeys: [],
            rowRanges: [
              {
                startKeyOpen: {
                  type: 'Buffer',
                  data: [98],
                },
                startKey: 'startKeyOpen',
              },
            ],
          },
          filter: null,
          rowsLimit: '8',
          appProfileId: '',
        },
      },
      requestOrder: [0, 1],
      callCount: 2,
    },
  },
};
