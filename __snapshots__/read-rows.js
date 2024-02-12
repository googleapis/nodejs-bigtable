exports['Bigtable/ReadRows with custom responses and createReadStream arguments should pass checks with a simple call 1'] = {
  "input": {
    "responses": [
      {
        "row_keys": [
          "a",
          "b",
          "c"
        ],
        "last_row_key": "c",
        "end_with_error": 13
      }
    ],
    "message": {
      "rowKeys": [],
      "rowRanges": [
        {}
      ]
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [
          "a",
          "b",
          "c"
        ]
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0
      ],
      "callCount": 1
    }
  }
}

exports['Bigtable/ReadRows with custom responses and createReadStream arguments retries a failed read 1'] = {
  "input": {
    "responses": [
      {
        "row_keys": [
          "a",
          "b"
        ],
        "last_row_key": "c",
        "end_with_error": 4
      },
      {
        "row_keys": [
          "c"
        ],
        "last_row_key": "c"
      }
    ],
    "message": {
      "rowKeys": [],
      "rowRanges": [
        {}
      ]
    }
  },
  "output": {
    "results": {
      "result": "end stream",
      "data": [
        [
          "a",
          "b"
        ],
        [
          "c"
        ]
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        },
        "1": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyOpen": {
                  "type": "Buffer",
                  "data": [
                    99
                  ]
                },
                "startKey": "startKeyOpen"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        1
      ],
      "callCount": 2
    }
  }
}

exports['Bigtable/ReadRows with custom responses and createReadStream arguments fails after all available retries 1'] = {
  "input": {
    "responses": [
      {
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      }
    ],
    "message": {
      "rowKeys": [],
      "rowRanges": [
        {}
      ]
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with custom responses and createReadStream arguments resets the retry counter after a successful read 1'] = {
  "input": {
    "responses": [
      {
        "row_keys": [
          "a"
        ],
        "last_row_key": "a",
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      },
      {
        "row_keys": [
          "b"
        ],
        "last_row_key": "b",
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      },
      {
        "row_keys": [
          "c"
        ],
        "last_row_key": "b"
      }
    ],
    "message": {
      "rowKeys": [],
      "rowRanges": [
        {}
      ]
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [
          "a"
        ],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        },
        "1": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyOpen": {
                  "type": "Buffer",
                  "data": [
                    97
                  ]
                },
                "startKey": "startKeyOpen"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        1,
        1,
        1
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with custom responses and createReadStream arguments moves the start point of a range being consumed 1'] = {
  "input": {
    "responses": [
      {
        "row_keys": [
          "a",
          "b"
        ],
        "end_with_error": 4
      },
      {
        "row_keys": [
          "c"
        ]
      }
    ],
    "message": {
      "ranges": [
        {
          "start": {
            "value": "b",
            "inclusive": false
          },
          "end": "z"
        }
      ]
    }
  },
  "output": {
    "results": {
      "result": "end stream",
      "data": [
        [
          "a",
          "b"
        ],
        [
          "c"
        ]
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    97
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    122
                  ]
                },
                "endKey": "endKeyClosed"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        },
        "1": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyOpen": {
                  "type": "Buffer",
                  "data": [
                    98
                  ]
                },
                "startKey": "startKeyOpen",
                "endKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    122
                  ]
                },
                "endKey": "endKeyClosed"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        1
      ],
      "callCount": 2
    }
  }
}

exports['Bigtable/ReadRows with custom responses and createReadStream arguments removes ranges already consumed 1'] = {
  "input": {
    "responses": [
      {
        "row_keys": [
          "a",
          "b",
          "c"
        ],
        "end_with_error": 4
      },
      {
        "row_keys": [
          "x"
        ]
      }
    ],
    "message": {
      "ranges": [
        {
          "start": "x",
          "end": "z"
        }
      ]
    }
  },
  "output": {
    "results": {
      "result": "end stream",
      "data": [
        [
          "a",
          "b",
          "c"
        ],
        [
          "x"
        ]
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    97
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    99
                  ]
                },
                "endKey": "endKeyClosed"
              },
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    120
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    122
                  ]
                },
                "endKey": "endKeyClosed"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        },
        "1": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    120
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    122
                  ]
                },
                "endKey": "endKeyClosed"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        1
      ],
      "callCount": 2
    }
  }
}

exports['Bigtable/ReadRows with custom responses and createReadStream arguments removes keys already read 1'] = {
  "input": {
    "responses": [
      {
        "row_keys": [
          "a",
          "b",
          "c"
        ],
        "end_with_error": 4
      },
      {
        "row_keys": [
          "x"
        ]
      }
    ],
    "message": {
      "keys": [
        "a",
        "b",
        "x"
      ]
    }
  },
  "output": {
    "results": {
      "result": "end stream",
      "data": [
        [
          "a",
          "b",
          "c"
        ],
        [
          "x"
        ]
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [
              {
                "type": "Buffer",
                "data": [
                  97
                ]
              },
              {
                "type": "Buffer",
                "data": [
                  98
                ]
              },
              {
                "type": "Buffer",
                "data": [
                  120
                ]
              }
            ],
            "rowRanges": []
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        },
        "1": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [
              {
                "type": "Buffer",
                "data": [
                  120
                ]
              }
            ],
            "rowRanges": []
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        1
      ],
      "callCount": 2
    }
  }
}

exports['Bigtable/ReadRows with custom responses and createReadStream arguments adjust the limit based on the number of rows read 1'] = {
  "input": {
    "responses": [
      {
        "row_keys": [
          "a",
          "b"
        ],
        "end_with_error": 4
      },
      {
        "row_keys": [
          "x"
        ]
      }
    ],
    "message": {
      "limit": 10
    }
  },
  "output": {
    "results": {
      "result": "end stream",
      "data": [
        [
          "a",
          "b"
        ],
        [
          "x"
        ]
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "10",
          "appProfileId": ""
        },
        "1": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyOpen": {
                  "type": "Buffer",
                  "data": [
                    98
                  ]
                },
                "startKey": "startKeyOpen"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "8",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        1
      ],
      "callCount": 2
    }
  }
}

exports['Bigtable/ReadRows with custom responses and createReadStream arguments respects the max retries parameter 1'] = {
  "input": {
    "responses": [
      {
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      },
      {
        "end_with_error": 4
      }
    ],
    "message": {
      "maxRetries": 2
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with deadline exceeded error 1'] = {
  "input": {
    "code": 4,
    "message": {}
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with resource exhausted error 1'] = {
  "input": {
    "code": 8,
    "message": {}
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with aborted error 1'] = {
  "input": {
    "code": 10,
    "message": {}
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back where the error is retryable should ensure correct behavior with unavailable error 1'] = {
  "input": {
    "code": 14,
    "message": {}
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back where the error is not retryable should ensure correct behavior with cancelled error 1'] = {
  "input": {
    "code": 1,
    "message": {}
  },
  "output": {
    "results": {
      "result": "end stream",
      "data": [
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0
      ],
      "callCount": 1
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back where the error is not retryable should ensure correct behavior with internal error 1'] = {
  "input": {
    "code": 13,
    "message": {}
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0
      ],
      "callCount": 1
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back where the error is not retryable should ensure correct behavior with invalid argument error 1'] = {
  "input": {
    "code": 3,
    "message": {}
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0
      ],
      "callCount": 1
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with an empty request 1'] = {
  "input": {
    "code": 4,
    "message": {}
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with a decode value set 1'] = {
  "input": {
    "code": 4,
    "message": {
      "decode": true
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with an encoding value set 1'] = {
  "input": {
    "code": 4,
    "message": {
      "encoding": "test-encoding"
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with start and end values 1'] = {
  "input": {
    "code": 4,
    "message": {
      "start": "test-start",
      "end": "test-end"
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    115,
                    116,
                    97,
                    114,
                    116
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    101,
                    110,
                    100
                  ]
                },
                "endKey": "endKeyClosed"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with keys 1'] = {
  "input": {
    "code": 4,
    "message": {
      "keys": [
        "test-key-1",
        "test-key-2"
      ]
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [
              {
                "type": "Buffer",
                "data": [
                  116,
                  101,
                  115,
                  116,
                  45,
                  107,
                  101,
                  121,
                  45,
                  49
                ]
              },
              {
                "type": "Buffer",
                "data": [
                  116,
                  101,
                  115,
                  116,
                  45,
                  107,
                  101,
                  121,
                  45,
                  50
                ]
              }
            ],
            "rowRanges": []
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with a filter 1'] = {
  "input": {
    "code": 4,
    "message": {
      "filter": [
        {
          "column": "columnPrefix"
        }
      ]
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": {
            "columnQualifierRegexFilter": {
              "type": "Buffer",
              "data": [
                99,
                111,
                108,
                117,
                109,
                110,
                80,
                114,
                101,
                102,
                105,
                120
              ]
            },
            "filter": "columnQualifierRegexFilter"
          },
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with a limit 1'] = {
  "input": {
    "code": 4,
    "message": {
      "limit": 10
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {}
            ]
          },
          "filter": null,
          "rowsLimit": "10",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with a prefix 1'] = {
  "input": {
    "code": 4,
    "message": {
      "prefix": "test-prefix"
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    112,
                    114,
                    101,
                    102,
                    105,
                    120
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyOpen": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    112,
                    114,
                    101,
                    102,
                    105,
                    121
                  ]
                },
                "endKey": "endKeyOpen"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with prefixes 1'] = {
  "input": {
    "code": 4,
    "message": {
      "prefixes": [
        "test-prefix1",
        "test-prefix2"
      ]
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    112,
                    114,
                    101,
                    102,
                    105,
                    120,
                    49
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyOpen": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    112,
                    114,
                    101,
                    102,
                    105,
                    120,
                    50
                  ]
                },
                "endKey": "endKeyOpen"
              },
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    112,
                    114,
                    101,
                    102,
                    105,
                    120,
                    50
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyOpen": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    112,
                    114,
                    101,
                    102,
                    105,
                    120,
                    51
                  ]
                },
                "endKey": "endKeyOpen"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}

exports['Bigtable/ReadRows with a mock server that always sends an error back with a deadline exceeded error and different createReadStream arguments should pass checks with a list of ranges 1'] = {
  "input": {
    "code": 4,
    "message": {
      "ranges": [
        {
          "start": "test-start-1",
          "end": "test-end-1"
        },
        {
          "start": "test-start-2",
          "end": "test-end-2"
        }
      ]
    }
  },
  "output": {
    "results": {
      "result": "error",
      "data": [
        [],
        [],
        [],
        []
      ]
    },
    "requestData": {
      "requests": {
        "0": {
          "tableName": "projects/{{projectId}}/instances/fake-instance/tables/fake-table",
          "rows": {
            "rowKeys": [],
            "rowRanges": [
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    115,
                    116,
                    97,
                    114,
                    116,
                    45,
                    49
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    101,
                    110,
                    100,
                    45,
                    49
                  ]
                },
                "endKey": "endKeyClosed"
              },
              {
                "startKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    115,
                    116,
                    97,
                    114,
                    116,
                    45,
                    50
                  ]
                },
                "startKey": "startKeyClosed",
                "endKeyClosed": {
                  "type": "Buffer",
                  "data": [
                    116,
                    101,
                    115,
                    116,
                    45,
                    101,
                    110,
                    100,
                    45,
                    50
                  ]
                },
                "endKey": "endKeyClosed"
              }
            ]
          },
          "filter": null,
          "rowsLimit": "0",
          "appProfileId": ""
        }
      },
      "requestOrder": [
        0,
        0,
        0,
        0
      ],
      "callCount": 4
    }
  }
}
