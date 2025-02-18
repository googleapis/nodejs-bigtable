import {describe, it} from 'mocha';
import * as gax from 'google-gax';
const root = gax.protobuf.loadSync(
  './protos/google/bigtable/v2/response_params.proto'
);
const ResponseParams = root.lookupType('ResponseParams');
const status = {
  metadata: {
    internalRepr: new Map([
      [
        'x-goog-ext-425905942-bin',
        Buffer.from('\n\nus-west1-c \rfake-cluster3'),
      ],
    ]),
    options: {},
  },
};

describe.only('Bigtable/Table', () => {
  it('decode', () => {
    const result3 = gax.protobuf.parse('\n\nus-west1-c \rfake-cluster3');
    const result2 = ResponseParams.get('\n\nus-west1-c \rfake-cluster3');
    const result = ResponseParams.decode(
      Buffer.from('\n\nus-west1-c \rfake-cluster3')
    );
    console.log(result);
  });
});
