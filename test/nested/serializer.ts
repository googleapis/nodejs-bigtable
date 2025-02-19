import {describe, it} from 'mocha';
import * as gax from 'google-gax';
const root = gax.protobuf.loadSync(
  './protos/google/bigtable/v2/response_params.proto'
);
const ResponseParams = root.lookupType('ResponseParams');
import {serializer} from 'google-gax';
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
    const buffer = new TextEncoder().encode('\n\nus-west1-c \rfake-cluster3');
    // const result3 = gax.protobuf.parse('\n\nus-west1-c \rfake-cluster3');
    const encoded = ResponseParams.encode(buffer);
    const something = ResponseParams.oneofsArray;
    const result4 = ResponseParams.decodeDelimited(
      Buffer.from('\n\nus-west1-c \rfake-cluster3')
    );
    // ResponseParams.toObject(Buffer.from('\n\nus-west1-c \rfake-cluster3'))
    const result2 = ResponseParams.get('\n\nus-west1-c \rfake-cluster3');

    const result = ResponseParams.decode(
      buffer, // Buffer.from('\n\nus-west1-c \rfake-cluster3'),
      2
    );
    const result5 = serializer.toProto3JSON(result4);
    console.log(result4);
    console.log(result);
    console.log(result5);
  });
});
