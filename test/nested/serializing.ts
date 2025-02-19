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
        [
          ResponseParams.encode({
            zoneId: 'us-west1-c',
            clusterId: 'fake-cluster3',
          }).finish(),
        ],
      ],
    ]),
    options: {},
  },
};

describe.only('Bigtable/Table', () => {
  it('decode', () => {
    // const buffer = new TextEncoder().encode('\n\nus-west1-c \rfake-cluster3');
    // const result3 = gax.protobuf.parse('\n\nus-west1-c \rfake-cluster3');
    const mappedValue = status.metadata.internalRepr.get(
      'x-goog-ext-425905942-bin'
    ) as Buffer[];
    const encoded = ResponseParams.encode(mappedValue as Buffer[]);
    const something = ResponseParams.oneofsArray;
    const result4 = ResponseParams.decodeDelimited(
      Buffer.from('\n\nus-west1-c \rfake-cluster3')
    );
    // ResponseParams.toObject(Buffer.from('\n\nus-west1-c \rfake-cluster3'))
    const result2 = ResponseParams.get('\n\nus-west1-c \rfake-cluster3');

    const result = ResponseParams.decode(
      mappedValue[0], // Buffer.from('\n\nus-west1-c \rfake-cluster3'),
      mappedValue[0].toString().length
    );
    const result5 = serializer.toProto3JSON(result4);
    /*
    const result6 = serializer.fromProto3JSON(
      ResponseParams,
      Buffer.from('\n\nus-west1-c \rfake-cluster3')
    );
     */
    console.log(result4);
    console.log(result);
    console.log(result5);
  });
});
