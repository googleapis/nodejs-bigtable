exports[
  'Bigtable/ReadRows with custom responses and createReadStream arguments should pass checks with a simple call 1'
] = {
  input: {
    responses: [
      {
        row_keys: ['a', 'b', 'c'],
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
      result: 'data',
      data: ['a', 'b', 'c'],
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
