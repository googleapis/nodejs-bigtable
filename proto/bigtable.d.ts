import * as $protobuf from "protobufjs";
import * as long from "long";
/** Namespace google. */
export namespace google {

    /** Namespace bigtable. */
    namespace bigtable {

        /** Namespace v2. */
        namespace v2 {

            /** Represents a Bigtable */
            class Bigtable extends $protobuf.rpc.Service {

                /**
                 * Constructs a new Bigtable service.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 */
                constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                /**
                 * Creates new Bigtable service using the specified rpc implementation.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 * @returns RPC service. Useful where requests and/or responses are streamed.
                 */
                public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Bigtable;

                /**
                 * Calls ReadRows.
                 * @param request ReadRowsRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and ReadRowsResponse
                 */
                public readRows(request: google.bigtable.v2.IReadRowsRequest, callback: google.bigtable.v2.Bigtable.ReadRowsCallback): void;

                /**
                 * Calls ReadRows.
                 * @param request ReadRowsRequest message or plain object
                 * @returns Promise
                 */
                public readRows(request: google.bigtable.v2.IReadRowsRequest): Promise<google.bigtable.v2.ReadRowsResponse>;

                /**
                 * Calls SampleRowKeys.
                 * @param request SampleRowKeysRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and SampleRowKeysResponse
                 */
                public sampleRowKeys(request: google.bigtable.v2.ISampleRowKeysRequest, callback: google.bigtable.v2.Bigtable.SampleRowKeysCallback): void;

                /**
                 * Calls SampleRowKeys.
                 * @param request SampleRowKeysRequest message or plain object
                 * @returns Promise
                 */
                public sampleRowKeys(request: google.bigtable.v2.ISampleRowKeysRequest): Promise<google.bigtable.v2.SampleRowKeysResponse>;

                /**
                 * Calls MutateRow.
                 * @param request MutateRowRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and MutateRowResponse
                 */
                public mutateRow(request: google.bigtable.v2.IMutateRowRequest, callback: google.bigtable.v2.Bigtable.MutateRowCallback): void;

                /**
                 * Calls MutateRow.
                 * @param request MutateRowRequest message or plain object
                 * @returns Promise
                 */
                public mutateRow(request: google.bigtable.v2.IMutateRowRequest): Promise<google.bigtable.v2.MutateRowResponse>;

                /**
                 * Calls MutateRows.
                 * @param request MutateRowsRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and MutateRowsResponse
                 */
                public mutateRows(request: google.bigtable.v2.IMutateRowsRequest, callback: google.bigtable.v2.Bigtable.MutateRowsCallback): void;

                /**
                 * Calls MutateRows.
                 * @param request MutateRowsRequest message or plain object
                 * @returns Promise
                 */
                public mutateRows(request: google.bigtable.v2.IMutateRowsRequest): Promise<google.bigtable.v2.MutateRowsResponse>;

                /**
                 * Calls CheckAndMutateRow.
                 * @param request CheckAndMutateRowRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and CheckAndMutateRowResponse
                 */
                public checkAndMutateRow(request: google.bigtable.v2.ICheckAndMutateRowRequest, callback: google.bigtable.v2.Bigtable.CheckAndMutateRowCallback): void;

                /**
                 * Calls CheckAndMutateRow.
                 * @param request CheckAndMutateRowRequest message or plain object
                 * @returns Promise
                 */
                public checkAndMutateRow(request: google.bigtable.v2.ICheckAndMutateRowRequest): Promise<google.bigtable.v2.CheckAndMutateRowResponse>;

                /**
                 * Calls ReadModifyWriteRow.
                 * @param request ReadModifyWriteRowRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and ReadModifyWriteRowResponse
                 */
                public readModifyWriteRow(request: google.bigtable.v2.IReadModifyWriteRowRequest, callback: google.bigtable.v2.Bigtable.ReadModifyWriteRowCallback): void;

                /**
                 * Calls ReadModifyWriteRow.
                 * @param request ReadModifyWriteRowRequest message or plain object
                 * @returns Promise
                 */
                public readModifyWriteRow(request: google.bigtable.v2.IReadModifyWriteRowRequest): Promise<google.bigtable.v2.ReadModifyWriteRowResponse>;
            }

            namespace Bigtable {

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable#readRows}.
                 * @param error Error, if any
                 * @param [response] ReadRowsResponse
                 */
                type ReadRowsCallback = (error: (Error|null), response?: google.bigtable.v2.ReadRowsResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable#sampleRowKeys}.
                 * @param error Error, if any
                 * @param [response] SampleRowKeysResponse
                 */
                type SampleRowKeysCallback = (error: (Error|null), response?: google.bigtable.v2.SampleRowKeysResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable#mutateRow}.
                 * @param error Error, if any
                 * @param [response] MutateRowResponse
                 */
                type MutateRowCallback = (error: (Error|null), response?: google.bigtable.v2.MutateRowResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable#mutateRows}.
                 * @param error Error, if any
                 * @param [response] MutateRowsResponse
                 */
                type MutateRowsCallback = (error: (Error|null), response?: google.bigtable.v2.MutateRowsResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable#checkAndMutateRow}.
                 * @param error Error, if any
                 * @param [response] CheckAndMutateRowResponse
                 */
                type CheckAndMutateRowCallback = (error: (Error|null), response?: google.bigtable.v2.CheckAndMutateRowResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable#readModifyWriteRow}.
                 * @param error Error, if any
                 * @param [response] ReadModifyWriteRowResponse
                 */
                type ReadModifyWriteRowCallback = (error: (Error|null), response?: google.bigtable.v2.ReadModifyWriteRowResponse) => void;
            }

            /** Properties of a ReadRowsRequest. */
            interface IReadRowsRequest {

                /** ReadRowsRequest tableName */
                tableName?: (string|null);

                /** ReadRowsRequest appProfileId */
                appProfileId?: (string|null);

                /** ReadRowsRequest rows */
                rows?: (google.bigtable.v2.IRowSet|null);

                /** ReadRowsRequest filter */
                filter?: (google.bigtable.v2.IRowFilter|null);

                /** ReadRowsRequest rowsLimit */
                rowsLimit?: (number|Long|null);
            }

            /** Represents a ReadRowsRequest. */
            class ReadRowsRequest implements IReadRowsRequest {

                /**
                 * Constructs a new ReadRowsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IReadRowsRequest);

                /** ReadRowsRequest tableName. */
                public tableName: string;

                /** ReadRowsRequest appProfileId. */
                public appProfileId: string;

                /** ReadRowsRequest rows. */
                public rows?: (google.bigtable.v2.IRowSet|null);

                /** ReadRowsRequest filter. */
                public filter?: (google.bigtable.v2.IRowFilter|null);

                /** ReadRowsRequest rowsLimit. */
                public rowsLimit: (number|Long);

                /**
                 * Creates a new ReadRowsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReadRowsRequest instance
                 */
                public static create(properties?: google.bigtable.v2.IReadRowsRequest): google.bigtable.v2.ReadRowsRequest;

                /**
                 * Encodes the specified ReadRowsRequest message. Does not implicitly {@link google.bigtable.v2.ReadRowsRequest.verify|verify} messages.
                 * @param message ReadRowsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IReadRowsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReadRowsRequest message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadRowsRequest.verify|verify} messages.
                 * @param message ReadRowsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IReadRowsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReadRowsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReadRowsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadRowsRequest;

                /**
                 * Decodes a ReadRowsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReadRowsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadRowsRequest;

                /**
                 * Verifies a ReadRowsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReadRowsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReadRowsRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadRowsRequest;

                /**
                 * Creates a plain object from a ReadRowsRequest message. Also converts values to other types if specified.
                 * @param message ReadRowsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ReadRowsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReadRowsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReadRowsResponse. */
            interface IReadRowsResponse {

                /** ReadRowsResponse chunks */
                chunks?: (google.bigtable.v2.ReadRowsResponse.ICellChunk[]|null);

                /** ReadRowsResponse lastScannedRowKey */
                lastScannedRowKey?: (Uint8Array|null);
            }

            /** Represents a ReadRowsResponse. */
            class ReadRowsResponse implements IReadRowsResponse {

                /**
                 * Constructs a new ReadRowsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IReadRowsResponse);

                /** ReadRowsResponse chunks. */
                public chunks: google.bigtable.v2.ReadRowsResponse.ICellChunk[];

                /** ReadRowsResponse lastScannedRowKey. */
                public lastScannedRowKey: Uint8Array;

                /**
                 * Creates a new ReadRowsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReadRowsResponse instance
                 */
                public static create(properties?: google.bigtable.v2.IReadRowsResponse): google.bigtable.v2.ReadRowsResponse;

                /**
                 * Encodes the specified ReadRowsResponse message. Does not implicitly {@link google.bigtable.v2.ReadRowsResponse.verify|verify} messages.
                 * @param message ReadRowsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IReadRowsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReadRowsResponse message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadRowsResponse.verify|verify} messages.
                 * @param message ReadRowsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IReadRowsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReadRowsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReadRowsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadRowsResponse;

                /**
                 * Decodes a ReadRowsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReadRowsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadRowsResponse;

                /**
                 * Verifies a ReadRowsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReadRowsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReadRowsResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadRowsResponse;

                /**
                 * Creates a plain object from a ReadRowsResponse message. Also converts values to other types if specified.
                 * @param message ReadRowsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ReadRowsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReadRowsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace ReadRowsResponse {

                /** Properties of a CellChunk. */
                interface ICellChunk {

                    /** CellChunk rowKey */
                    rowKey?: (Uint8Array|null);

                    /** CellChunk familyName */
                    familyName?: (google.protobuf.IStringValue|null);

                    /** CellChunk qualifier */
                    qualifier?: (google.protobuf.IBytesValue|null);

                    /** CellChunk timestampMicros */
                    timestampMicros?: (number|Long|null);

                    /** CellChunk labels */
                    labels?: (string[]|null);

                    /** CellChunk value */
                    value?: (Uint8Array|null);

                    /** CellChunk valueSize */
                    valueSize?: (number|null);

                    /** CellChunk resetRow */
                    resetRow?: (boolean|null);

                    /** CellChunk commitRow */
                    commitRow?: (boolean|null);
                }

                /** Represents a CellChunk. */
                class CellChunk implements ICellChunk {

                    /**
                     * Constructs a new CellChunk.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.ReadRowsResponse.ICellChunk);

                    /** CellChunk rowKey. */
                    public rowKey: Uint8Array;

                    /** CellChunk familyName. */
                    public familyName?: (google.protobuf.IStringValue|null);

                    /** CellChunk qualifier. */
                    public qualifier?: (google.protobuf.IBytesValue|null);

                    /** CellChunk timestampMicros. */
                    public timestampMicros: (number|Long);

                    /** CellChunk labels. */
                    public labels: string[];

                    /** CellChunk value. */
                    public value: Uint8Array;

                    /** CellChunk valueSize. */
                    public valueSize: number;

                    /** CellChunk resetRow. */
                    public resetRow: boolean;

                    /** CellChunk commitRow. */
                    public commitRow: boolean;

                    /** CellChunk rowStatus. */
                    public rowStatus?: ("resetRow"|"commitRow");

                    /**
                     * Creates a new CellChunk instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CellChunk instance
                     */
                    public static create(properties?: google.bigtable.v2.ReadRowsResponse.ICellChunk): google.bigtable.v2.ReadRowsResponse.CellChunk;

                    /**
                     * Encodes the specified CellChunk message. Does not implicitly {@link google.bigtable.v2.ReadRowsResponse.CellChunk.verify|verify} messages.
                     * @param message CellChunk message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.ReadRowsResponse.ICellChunk, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CellChunk message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadRowsResponse.CellChunk.verify|verify} messages.
                     * @param message CellChunk message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.ReadRowsResponse.ICellChunk, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CellChunk message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CellChunk
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadRowsResponse.CellChunk;

                    /**
                     * Decodes a CellChunk message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CellChunk
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadRowsResponse.CellChunk;

                    /**
                     * Verifies a CellChunk message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CellChunk message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CellChunk
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadRowsResponse.CellChunk;

                    /**
                     * Creates a plain object from a CellChunk message. Also converts values to other types if specified.
                     * @param message CellChunk
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.ReadRowsResponse.CellChunk, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CellChunk to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a SampleRowKeysRequest. */
            interface ISampleRowKeysRequest {

                /** SampleRowKeysRequest tableName */
                tableName?: (string|null);

                /** SampleRowKeysRequest appProfileId */
                appProfileId?: (string|null);
            }

            /** Represents a SampleRowKeysRequest. */
            class SampleRowKeysRequest implements ISampleRowKeysRequest {

                /**
                 * Constructs a new SampleRowKeysRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.ISampleRowKeysRequest);

                /** SampleRowKeysRequest tableName. */
                public tableName: string;

                /** SampleRowKeysRequest appProfileId. */
                public appProfileId: string;

                /**
                 * Creates a new SampleRowKeysRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SampleRowKeysRequest instance
                 */
                public static create(properties?: google.bigtable.v2.ISampleRowKeysRequest): google.bigtable.v2.SampleRowKeysRequest;

                /**
                 * Encodes the specified SampleRowKeysRequest message. Does not implicitly {@link google.bigtable.v2.SampleRowKeysRequest.verify|verify} messages.
                 * @param message SampleRowKeysRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.ISampleRowKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SampleRowKeysRequest message, length delimited. Does not implicitly {@link google.bigtable.v2.SampleRowKeysRequest.verify|verify} messages.
                 * @param message SampleRowKeysRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.ISampleRowKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SampleRowKeysRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SampleRowKeysRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.SampleRowKeysRequest;

                /**
                 * Decodes a SampleRowKeysRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SampleRowKeysRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.SampleRowKeysRequest;

                /**
                 * Verifies a SampleRowKeysRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SampleRowKeysRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SampleRowKeysRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.SampleRowKeysRequest;

                /**
                 * Creates a plain object from a SampleRowKeysRequest message. Also converts values to other types if specified.
                 * @param message SampleRowKeysRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.SampleRowKeysRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SampleRowKeysRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SampleRowKeysResponse. */
            interface ISampleRowKeysResponse {

                /** SampleRowKeysResponse rowKey */
                rowKey?: (Uint8Array|null);

                /** SampleRowKeysResponse offsetBytes */
                offsetBytes?: (number|Long|null);
            }

            /** Represents a SampleRowKeysResponse. */
            class SampleRowKeysResponse implements ISampleRowKeysResponse {

                /**
                 * Constructs a new SampleRowKeysResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.ISampleRowKeysResponse);

                /** SampleRowKeysResponse rowKey. */
                public rowKey: Uint8Array;

                /** SampleRowKeysResponse offsetBytes. */
                public offsetBytes: (number|Long);

                /**
                 * Creates a new SampleRowKeysResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SampleRowKeysResponse instance
                 */
                public static create(properties?: google.bigtable.v2.ISampleRowKeysResponse): google.bigtable.v2.SampleRowKeysResponse;

                /**
                 * Encodes the specified SampleRowKeysResponse message. Does not implicitly {@link google.bigtable.v2.SampleRowKeysResponse.verify|verify} messages.
                 * @param message SampleRowKeysResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.ISampleRowKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SampleRowKeysResponse message, length delimited. Does not implicitly {@link google.bigtable.v2.SampleRowKeysResponse.verify|verify} messages.
                 * @param message SampleRowKeysResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.ISampleRowKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SampleRowKeysResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SampleRowKeysResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.SampleRowKeysResponse;

                /**
                 * Decodes a SampleRowKeysResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SampleRowKeysResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.SampleRowKeysResponse;

                /**
                 * Verifies a SampleRowKeysResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SampleRowKeysResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SampleRowKeysResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.SampleRowKeysResponse;

                /**
                 * Creates a plain object from a SampleRowKeysResponse message. Also converts values to other types if specified.
                 * @param message SampleRowKeysResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.SampleRowKeysResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SampleRowKeysResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a MutateRowRequest. */
            interface IMutateRowRequest {

                /** MutateRowRequest tableName */
                tableName?: (string|null);

                /** MutateRowRequest appProfileId */
                appProfileId?: (string|null);

                /** MutateRowRequest rowKey */
                rowKey?: (Uint8Array|null);

                /** MutateRowRequest mutations */
                mutations?: (google.bigtable.v2.IMutation[]|null);
            }

            /** Represents a MutateRowRequest. */
            class MutateRowRequest implements IMutateRowRequest {

                /**
                 * Constructs a new MutateRowRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IMutateRowRequest);

                /** MutateRowRequest tableName. */
                public tableName: string;

                /** MutateRowRequest appProfileId. */
                public appProfileId: string;

                /** MutateRowRequest rowKey. */
                public rowKey: Uint8Array;

                /** MutateRowRequest mutations. */
                public mutations: google.bigtable.v2.IMutation[];

                /**
                 * Creates a new MutateRowRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MutateRowRequest instance
                 */
                public static create(properties?: google.bigtable.v2.IMutateRowRequest): google.bigtable.v2.MutateRowRequest;

                /**
                 * Encodes the specified MutateRowRequest message. Does not implicitly {@link google.bigtable.v2.MutateRowRequest.verify|verify} messages.
                 * @param message MutateRowRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IMutateRowRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MutateRowRequest message, length delimited. Does not implicitly {@link google.bigtable.v2.MutateRowRequest.verify|verify} messages.
                 * @param message MutateRowRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IMutateRowRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MutateRowRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MutateRowRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.MutateRowRequest;

                /**
                 * Decodes a MutateRowRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MutateRowRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.MutateRowRequest;

                /**
                 * Verifies a MutateRowRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MutateRowRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MutateRowRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.MutateRowRequest;

                /**
                 * Creates a plain object from a MutateRowRequest message. Also converts values to other types if specified.
                 * @param message MutateRowRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.MutateRowRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MutateRowRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a MutateRowResponse. */
            interface IMutateRowResponse {
            }

            /** Represents a MutateRowResponse. */
            class MutateRowResponse implements IMutateRowResponse {

                /**
                 * Constructs a new MutateRowResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IMutateRowResponse);

                /**
                 * Creates a new MutateRowResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MutateRowResponse instance
                 */
                public static create(properties?: google.bigtable.v2.IMutateRowResponse): google.bigtable.v2.MutateRowResponse;

                /**
                 * Encodes the specified MutateRowResponse message. Does not implicitly {@link google.bigtable.v2.MutateRowResponse.verify|verify} messages.
                 * @param message MutateRowResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IMutateRowResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MutateRowResponse message, length delimited. Does not implicitly {@link google.bigtable.v2.MutateRowResponse.verify|verify} messages.
                 * @param message MutateRowResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IMutateRowResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MutateRowResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MutateRowResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.MutateRowResponse;

                /**
                 * Decodes a MutateRowResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MutateRowResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.MutateRowResponse;

                /**
                 * Verifies a MutateRowResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MutateRowResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MutateRowResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.MutateRowResponse;

                /**
                 * Creates a plain object from a MutateRowResponse message. Also converts values to other types if specified.
                 * @param message MutateRowResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.MutateRowResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MutateRowResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a MutateRowsRequest. */
            interface IMutateRowsRequest {

                /** MutateRowsRequest tableName */
                tableName?: (string|null);

                /** MutateRowsRequest appProfileId */
                appProfileId?: (string|null);

                /** MutateRowsRequest entries */
                entries?: (google.bigtable.v2.MutateRowsRequest.IEntry[]|null);
            }

            /** Represents a MutateRowsRequest. */
            class MutateRowsRequest implements IMutateRowsRequest {

                /**
                 * Constructs a new MutateRowsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IMutateRowsRequest);

                /** MutateRowsRequest tableName. */
                public tableName: string;

                /** MutateRowsRequest appProfileId. */
                public appProfileId: string;

                /** MutateRowsRequest entries. */
                public entries: google.bigtable.v2.MutateRowsRequest.IEntry[];

                /**
                 * Creates a new MutateRowsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MutateRowsRequest instance
                 */
                public static create(properties?: google.bigtable.v2.IMutateRowsRequest): google.bigtable.v2.MutateRowsRequest;

                /**
                 * Encodes the specified MutateRowsRequest message. Does not implicitly {@link google.bigtable.v2.MutateRowsRequest.verify|verify} messages.
                 * @param message MutateRowsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IMutateRowsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MutateRowsRequest message, length delimited. Does not implicitly {@link google.bigtable.v2.MutateRowsRequest.verify|verify} messages.
                 * @param message MutateRowsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IMutateRowsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MutateRowsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MutateRowsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.MutateRowsRequest;

                /**
                 * Decodes a MutateRowsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MutateRowsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.MutateRowsRequest;

                /**
                 * Verifies a MutateRowsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MutateRowsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MutateRowsRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.MutateRowsRequest;

                /**
                 * Creates a plain object from a MutateRowsRequest message. Also converts values to other types if specified.
                 * @param message MutateRowsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.MutateRowsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MutateRowsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace MutateRowsRequest {

                /** Properties of an Entry. */
                interface IEntry {

                    /** Entry rowKey */
                    rowKey?: (Uint8Array|null);

                    /** Entry mutations */
                    mutations?: (google.bigtable.v2.IMutation[]|null);
                }

                /** Represents an Entry. */
                class Entry implements IEntry {

                    /**
                     * Constructs a new Entry.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.MutateRowsRequest.IEntry);

                    /** Entry rowKey. */
                    public rowKey: Uint8Array;

                    /** Entry mutations. */
                    public mutations: google.bigtable.v2.IMutation[];

                    /**
                     * Creates a new Entry instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Entry instance
                     */
                    public static create(properties?: google.bigtable.v2.MutateRowsRequest.IEntry): google.bigtable.v2.MutateRowsRequest.Entry;

                    /**
                     * Encodes the specified Entry message. Does not implicitly {@link google.bigtable.v2.MutateRowsRequest.Entry.verify|verify} messages.
                     * @param message Entry message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.MutateRowsRequest.IEntry, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Entry message, length delimited. Does not implicitly {@link google.bigtable.v2.MutateRowsRequest.Entry.verify|verify} messages.
                     * @param message Entry message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.MutateRowsRequest.IEntry, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Entry message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Entry
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.MutateRowsRequest.Entry;

                    /**
                     * Decodes an Entry message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Entry
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.MutateRowsRequest.Entry;

                    /**
                     * Verifies an Entry message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Entry message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Entry
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.MutateRowsRequest.Entry;

                    /**
                     * Creates a plain object from an Entry message. Also converts values to other types if specified.
                     * @param message Entry
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.MutateRowsRequest.Entry, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Entry to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a MutateRowsResponse. */
            interface IMutateRowsResponse {

                /** MutateRowsResponse entries */
                entries?: (google.bigtable.v2.MutateRowsResponse.IEntry[]|null);
            }

            /** Represents a MutateRowsResponse. */
            class MutateRowsResponse implements IMutateRowsResponse {

                /**
                 * Constructs a new MutateRowsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IMutateRowsResponse);

                /** MutateRowsResponse entries. */
                public entries: google.bigtable.v2.MutateRowsResponse.IEntry[];

                /**
                 * Creates a new MutateRowsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MutateRowsResponse instance
                 */
                public static create(properties?: google.bigtable.v2.IMutateRowsResponse): google.bigtable.v2.MutateRowsResponse;

                /**
                 * Encodes the specified MutateRowsResponse message. Does not implicitly {@link google.bigtable.v2.MutateRowsResponse.verify|verify} messages.
                 * @param message MutateRowsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IMutateRowsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MutateRowsResponse message, length delimited. Does not implicitly {@link google.bigtable.v2.MutateRowsResponse.verify|verify} messages.
                 * @param message MutateRowsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IMutateRowsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MutateRowsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MutateRowsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.MutateRowsResponse;

                /**
                 * Decodes a MutateRowsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MutateRowsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.MutateRowsResponse;

                /**
                 * Verifies a MutateRowsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MutateRowsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MutateRowsResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.MutateRowsResponse;

                /**
                 * Creates a plain object from a MutateRowsResponse message. Also converts values to other types if specified.
                 * @param message MutateRowsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.MutateRowsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MutateRowsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace MutateRowsResponse {

                /** Properties of an Entry. */
                interface IEntry {

                    /** Entry index */
                    index?: (number|Long|null);

                    /** Entry status */
                    status?: (google.rpc.IStatus|null);
                }

                /** Represents an Entry. */
                class Entry implements IEntry {

                    /**
                     * Constructs a new Entry.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.MutateRowsResponse.IEntry);

                    /** Entry index. */
                    public index: (number|Long);

                    /** Entry status. */
                    public status?: (google.rpc.IStatus|null);

                    /**
                     * Creates a new Entry instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Entry instance
                     */
                    public static create(properties?: google.bigtable.v2.MutateRowsResponse.IEntry): google.bigtable.v2.MutateRowsResponse.Entry;

                    /**
                     * Encodes the specified Entry message. Does not implicitly {@link google.bigtable.v2.MutateRowsResponse.Entry.verify|verify} messages.
                     * @param message Entry message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.MutateRowsResponse.IEntry, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Entry message, length delimited. Does not implicitly {@link google.bigtable.v2.MutateRowsResponse.Entry.verify|verify} messages.
                     * @param message Entry message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.MutateRowsResponse.IEntry, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Entry message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Entry
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.MutateRowsResponse.Entry;

                    /**
                     * Decodes an Entry message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Entry
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.MutateRowsResponse.Entry;

                    /**
                     * Verifies an Entry message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Entry message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Entry
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.MutateRowsResponse.Entry;

                    /**
                     * Creates a plain object from an Entry message. Also converts values to other types if specified.
                     * @param message Entry
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.MutateRowsResponse.Entry, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Entry to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a CheckAndMutateRowRequest. */
            interface ICheckAndMutateRowRequest {

                /** CheckAndMutateRowRequest tableName */
                tableName?: (string|null);

                /** CheckAndMutateRowRequest appProfileId */
                appProfileId?: (string|null);

                /** CheckAndMutateRowRequest rowKey */
                rowKey?: (Uint8Array|null);

                /** CheckAndMutateRowRequest predicateFilter */
                predicateFilter?: (google.bigtable.v2.IRowFilter|null);

                /** CheckAndMutateRowRequest trueMutations */
                trueMutations?: (google.bigtable.v2.IMutation[]|null);

                /** CheckAndMutateRowRequest falseMutations */
                falseMutations?: (google.bigtable.v2.IMutation[]|null);
            }

            /** Represents a CheckAndMutateRowRequest. */
            class CheckAndMutateRowRequest implements ICheckAndMutateRowRequest {

                /**
                 * Constructs a new CheckAndMutateRowRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.ICheckAndMutateRowRequest);

                /** CheckAndMutateRowRequest tableName. */
                public tableName: string;

                /** CheckAndMutateRowRequest appProfileId. */
                public appProfileId: string;

                /** CheckAndMutateRowRequest rowKey. */
                public rowKey: Uint8Array;

                /** CheckAndMutateRowRequest predicateFilter. */
                public predicateFilter?: (google.bigtable.v2.IRowFilter|null);

                /** CheckAndMutateRowRequest trueMutations. */
                public trueMutations: google.bigtable.v2.IMutation[];

                /** CheckAndMutateRowRequest falseMutations. */
                public falseMutations: google.bigtable.v2.IMutation[];

                /**
                 * Creates a new CheckAndMutateRowRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CheckAndMutateRowRequest instance
                 */
                public static create(properties?: google.bigtable.v2.ICheckAndMutateRowRequest): google.bigtable.v2.CheckAndMutateRowRequest;

                /**
                 * Encodes the specified CheckAndMutateRowRequest message. Does not implicitly {@link google.bigtable.v2.CheckAndMutateRowRequest.verify|verify} messages.
                 * @param message CheckAndMutateRowRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.ICheckAndMutateRowRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CheckAndMutateRowRequest message, length delimited. Does not implicitly {@link google.bigtable.v2.CheckAndMutateRowRequest.verify|verify} messages.
                 * @param message CheckAndMutateRowRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.ICheckAndMutateRowRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CheckAndMutateRowRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CheckAndMutateRowRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.CheckAndMutateRowRequest;

                /**
                 * Decodes a CheckAndMutateRowRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CheckAndMutateRowRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.CheckAndMutateRowRequest;

                /**
                 * Verifies a CheckAndMutateRowRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CheckAndMutateRowRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CheckAndMutateRowRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.CheckAndMutateRowRequest;

                /**
                 * Creates a plain object from a CheckAndMutateRowRequest message. Also converts values to other types if specified.
                 * @param message CheckAndMutateRowRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.CheckAndMutateRowRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CheckAndMutateRowRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CheckAndMutateRowResponse. */
            interface ICheckAndMutateRowResponse {

                /** CheckAndMutateRowResponse predicateMatched */
                predicateMatched?: (boolean|null);
            }

            /** Represents a CheckAndMutateRowResponse. */
            class CheckAndMutateRowResponse implements ICheckAndMutateRowResponse {

                /**
                 * Constructs a new CheckAndMutateRowResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.ICheckAndMutateRowResponse);

                /** CheckAndMutateRowResponse predicateMatched. */
                public predicateMatched: boolean;

                /**
                 * Creates a new CheckAndMutateRowResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CheckAndMutateRowResponse instance
                 */
                public static create(properties?: google.bigtable.v2.ICheckAndMutateRowResponse): google.bigtable.v2.CheckAndMutateRowResponse;

                /**
                 * Encodes the specified CheckAndMutateRowResponse message. Does not implicitly {@link google.bigtable.v2.CheckAndMutateRowResponse.verify|verify} messages.
                 * @param message CheckAndMutateRowResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.ICheckAndMutateRowResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CheckAndMutateRowResponse message, length delimited. Does not implicitly {@link google.bigtable.v2.CheckAndMutateRowResponse.verify|verify} messages.
                 * @param message CheckAndMutateRowResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.ICheckAndMutateRowResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CheckAndMutateRowResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CheckAndMutateRowResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.CheckAndMutateRowResponse;

                /**
                 * Decodes a CheckAndMutateRowResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CheckAndMutateRowResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.CheckAndMutateRowResponse;

                /**
                 * Verifies a CheckAndMutateRowResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CheckAndMutateRowResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CheckAndMutateRowResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.CheckAndMutateRowResponse;

                /**
                 * Creates a plain object from a CheckAndMutateRowResponse message. Also converts values to other types if specified.
                 * @param message CheckAndMutateRowResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.CheckAndMutateRowResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CheckAndMutateRowResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReadModifyWriteRowRequest. */
            interface IReadModifyWriteRowRequest {

                /** ReadModifyWriteRowRequest tableName */
                tableName?: (string|null);

                /** ReadModifyWriteRowRequest appProfileId */
                appProfileId?: (string|null);

                /** ReadModifyWriteRowRequest rowKey */
                rowKey?: (Uint8Array|null);

                /** ReadModifyWriteRowRequest rules */
                rules?: (google.bigtable.v2.IReadModifyWriteRule[]|null);
            }

            /** Represents a ReadModifyWriteRowRequest. */
            class ReadModifyWriteRowRequest implements IReadModifyWriteRowRequest {

                /**
                 * Constructs a new ReadModifyWriteRowRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IReadModifyWriteRowRequest);

                /** ReadModifyWriteRowRequest tableName. */
                public tableName: string;

                /** ReadModifyWriteRowRequest appProfileId. */
                public appProfileId: string;

                /** ReadModifyWriteRowRequest rowKey. */
                public rowKey: Uint8Array;

                /** ReadModifyWriteRowRequest rules. */
                public rules: google.bigtable.v2.IReadModifyWriteRule[];

                /**
                 * Creates a new ReadModifyWriteRowRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReadModifyWriteRowRequest instance
                 */
                public static create(properties?: google.bigtable.v2.IReadModifyWriteRowRequest): google.bigtable.v2.ReadModifyWriteRowRequest;

                /**
                 * Encodes the specified ReadModifyWriteRowRequest message. Does not implicitly {@link google.bigtable.v2.ReadModifyWriteRowRequest.verify|verify} messages.
                 * @param message ReadModifyWriteRowRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IReadModifyWriteRowRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReadModifyWriteRowRequest message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadModifyWriteRowRequest.verify|verify} messages.
                 * @param message ReadModifyWriteRowRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IReadModifyWriteRowRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReadModifyWriteRowRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReadModifyWriteRowRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadModifyWriteRowRequest;

                /**
                 * Decodes a ReadModifyWriteRowRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReadModifyWriteRowRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadModifyWriteRowRequest;

                /**
                 * Verifies a ReadModifyWriteRowRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReadModifyWriteRowRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReadModifyWriteRowRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadModifyWriteRowRequest;

                /**
                 * Creates a plain object from a ReadModifyWriteRowRequest message. Also converts values to other types if specified.
                 * @param message ReadModifyWriteRowRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ReadModifyWriteRowRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReadModifyWriteRowRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReadModifyWriteRowResponse. */
            interface IReadModifyWriteRowResponse {

                /** ReadModifyWriteRowResponse row */
                row?: (google.bigtable.v2.IRow|null);
            }

            /** Represents a ReadModifyWriteRowResponse. */
            class ReadModifyWriteRowResponse implements IReadModifyWriteRowResponse {

                /**
                 * Constructs a new ReadModifyWriteRowResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IReadModifyWriteRowResponse);

                /** ReadModifyWriteRowResponse row. */
                public row?: (google.bigtable.v2.IRow|null);

                /**
                 * Creates a new ReadModifyWriteRowResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReadModifyWriteRowResponse instance
                 */
                public static create(properties?: google.bigtable.v2.IReadModifyWriteRowResponse): google.bigtable.v2.ReadModifyWriteRowResponse;

                /**
                 * Encodes the specified ReadModifyWriteRowResponse message. Does not implicitly {@link google.bigtable.v2.ReadModifyWriteRowResponse.verify|verify} messages.
                 * @param message ReadModifyWriteRowResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IReadModifyWriteRowResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReadModifyWriteRowResponse message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadModifyWriteRowResponse.verify|verify} messages.
                 * @param message ReadModifyWriteRowResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IReadModifyWriteRowResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReadModifyWriteRowResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReadModifyWriteRowResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadModifyWriteRowResponse;

                /**
                 * Decodes a ReadModifyWriteRowResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReadModifyWriteRowResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadModifyWriteRowResponse;

                /**
                 * Verifies a ReadModifyWriteRowResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReadModifyWriteRowResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReadModifyWriteRowResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadModifyWriteRowResponse;

                /**
                 * Creates a plain object from a ReadModifyWriteRowResponse message. Also converts values to other types if specified.
                 * @param message ReadModifyWriteRowResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ReadModifyWriteRowResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReadModifyWriteRowResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Row. */
            interface IRow {

                /** Row key */
                key?: (Uint8Array|null);

                /** Row families */
                families?: (google.bigtable.v2.IFamily[]|null);
            }

            /** Represents a Row. */
            class Row implements IRow {

                /**
                 * Constructs a new Row.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IRow);

                /** Row key. */
                public key: Uint8Array;

                /** Row families. */
                public families: google.bigtable.v2.IFamily[];

                /**
                 * Creates a new Row instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Row instance
                 */
                public static create(properties?: google.bigtable.v2.IRow): google.bigtable.v2.Row;

                /**
                 * Encodes the specified Row message. Does not implicitly {@link google.bigtable.v2.Row.verify|verify} messages.
                 * @param message Row message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IRow, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Row message, length delimited. Does not implicitly {@link google.bigtable.v2.Row.verify|verify} messages.
                 * @param message Row message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IRow, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Row message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Row
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.Row;

                /**
                 * Decodes a Row message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Row
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.Row;

                /**
                 * Verifies a Row message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Row message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Row
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.Row;

                /**
                 * Creates a plain object from a Row message. Also converts values to other types if specified.
                 * @param message Row
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.Row, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Row to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Family. */
            interface IFamily {

                /** Family name */
                name?: (string|null);

                /** Family columns */
                columns?: (google.bigtable.v2.IColumn[]|null);
            }

            /** Represents a Family. */
            class Family implements IFamily {

                /**
                 * Constructs a new Family.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IFamily);

                /** Family name. */
                public name: string;

                /** Family columns. */
                public columns: google.bigtable.v2.IColumn[];

                /**
                 * Creates a new Family instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Family instance
                 */
                public static create(properties?: google.bigtable.v2.IFamily): google.bigtable.v2.Family;

                /**
                 * Encodes the specified Family message. Does not implicitly {@link google.bigtable.v2.Family.verify|verify} messages.
                 * @param message Family message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IFamily, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Family message, length delimited. Does not implicitly {@link google.bigtable.v2.Family.verify|verify} messages.
                 * @param message Family message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IFamily, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Family message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Family
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.Family;

                /**
                 * Decodes a Family message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Family
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.Family;

                /**
                 * Verifies a Family message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Family message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Family
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.Family;

                /**
                 * Creates a plain object from a Family message. Also converts values to other types if specified.
                 * @param message Family
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.Family, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Family to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Column. */
            interface IColumn {

                /** Column qualifier */
                qualifier?: (Uint8Array|null);

                /** Column cells */
                cells?: (google.bigtable.v2.ICell[]|null);
            }

            /** Represents a Column. */
            class Column implements IColumn {

                /**
                 * Constructs a new Column.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IColumn);

                /** Column qualifier. */
                public qualifier: Uint8Array;

                /** Column cells. */
                public cells: google.bigtable.v2.ICell[];

                /**
                 * Creates a new Column instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Column instance
                 */
                public static create(properties?: google.bigtable.v2.IColumn): google.bigtable.v2.Column;

                /**
                 * Encodes the specified Column message. Does not implicitly {@link google.bigtable.v2.Column.verify|verify} messages.
                 * @param message Column message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IColumn, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Column message, length delimited. Does not implicitly {@link google.bigtable.v2.Column.verify|verify} messages.
                 * @param message Column message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IColumn, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Column message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Column
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.Column;

                /**
                 * Decodes a Column message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Column
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.Column;

                /**
                 * Verifies a Column message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Column message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Column
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.Column;

                /**
                 * Creates a plain object from a Column message. Also converts values to other types if specified.
                 * @param message Column
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.Column, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Column to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Cell. */
            interface ICell {

                /** Cell timestampMicros */
                timestampMicros?: (number|Long|null);

                /** Cell value */
                value?: (Uint8Array|null);

                /** Cell labels */
                labels?: (string[]|null);
            }

            /** Represents a Cell. */
            class Cell implements ICell {

                /**
                 * Constructs a new Cell.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.ICell);

                /** Cell timestampMicros. */
                public timestampMicros: (number|Long);

                /** Cell value. */
                public value: Uint8Array;

                /** Cell labels. */
                public labels: string[];

                /**
                 * Creates a new Cell instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Cell instance
                 */
                public static create(properties?: google.bigtable.v2.ICell): google.bigtable.v2.Cell;

                /**
                 * Encodes the specified Cell message. Does not implicitly {@link google.bigtable.v2.Cell.verify|verify} messages.
                 * @param message Cell message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.ICell, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Cell message, length delimited. Does not implicitly {@link google.bigtable.v2.Cell.verify|verify} messages.
                 * @param message Cell message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.ICell, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Cell message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Cell
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.Cell;

                /**
                 * Decodes a Cell message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Cell
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.Cell;

                /**
                 * Verifies a Cell message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Cell message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Cell
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.Cell;

                /**
                 * Creates a plain object from a Cell message. Also converts values to other types if specified.
                 * @param message Cell
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.Cell, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Cell to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RowRange. */
            interface IRowRange {

                /** RowRange startKeyClosed */
                startKeyClosed?: (Uint8Array|null);

                /** RowRange startKeyOpen */
                startKeyOpen?: (Uint8Array|null);

                /** RowRange endKeyOpen */
                endKeyOpen?: (Uint8Array|null);

                /** RowRange endKeyClosed */
                endKeyClosed?: (Uint8Array|null);
            }

            /** Represents a RowRange. */
            class RowRange implements IRowRange {

                /**
                 * Constructs a new RowRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IRowRange);

                /** RowRange startKeyClosed. */
                public startKeyClosed: Uint8Array;

                /** RowRange startKeyOpen. */
                public startKeyOpen: Uint8Array;

                /** RowRange endKeyOpen. */
                public endKeyOpen: Uint8Array;

                /** RowRange endKeyClosed. */
                public endKeyClosed: Uint8Array;

                /** RowRange startKey. */
                public startKey?: ("startKeyClosed"|"startKeyOpen");

                /** RowRange endKey. */
                public endKey?: ("endKeyOpen"|"endKeyClosed");

                /**
                 * Creates a new RowRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RowRange instance
                 */
                public static create(properties?: google.bigtable.v2.IRowRange): google.bigtable.v2.RowRange;

                /**
                 * Encodes the specified RowRange message. Does not implicitly {@link google.bigtable.v2.RowRange.verify|verify} messages.
                 * @param message RowRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IRowRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RowRange message, length delimited. Does not implicitly {@link google.bigtable.v2.RowRange.verify|verify} messages.
                 * @param message RowRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IRowRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RowRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RowRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.RowRange;

                /**
                 * Decodes a RowRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RowRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.RowRange;

                /**
                 * Verifies a RowRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RowRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RowRange
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.RowRange;

                /**
                 * Creates a plain object from a RowRange message. Also converts values to other types if specified.
                 * @param message RowRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.RowRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RowRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RowSet. */
            interface IRowSet {

                /** RowSet rowKeys */
                rowKeys?: (Uint8Array[]|null);

                /** RowSet rowRanges */
                rowRanges?: (google.bigtable.v2.IRowRange[]|null);
            }

            /** Represents a RowSet. */
            class RowSet implements IRowSet {

                /**
                 * Constructs a new RowSet.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IRowSet);

                /** RowSet rowKeys. */
                public rowKeys: Uint8Array[];

                /** RowSet rowRanges. */
                public rowRanges: google.bigtable.v2.IRowRange[];

                /**
                 * Creates a new RowSet instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RowSet instance
                 */
                public static create(properties?: google.bigtable.v2.IRowSet): google.bigtable.v2.RowSet;

                /**
                 * Encodes the specified RowSet message. Does not implicitly {@link google.bigtable.v2.RowSet.verify|verify} messages.
                 * @param message RowSet message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IRowSet, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RowSet message, length delimited. Does not implicitly {@link google.bigtable.v2.RowSet.verify|verify} messages.
                 * @param message RowSet message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IRowSet, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RowSet message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RowSet
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.RowSet;

                /**
                 * Decodes a RowSet message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RowSet
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.RowSet;

                /**
                 * Verifies a RowSet message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RowSet message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RowSet
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.RowSet;

                /**
                 * Creates a plain object from a RowSet message. Also converts values to other types if specified.
                 * @param message RowSet
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.RowSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RowSet to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ColumnRange. */
            interface IColumnRange {

                /** ColumnRange familyName */
                familyName?: (string|null);

                /** ColumnRange startQualifierClosed */
                startQualifierClosed?: (Uint8Array|null);

                /** ColumnRange startQualifierOpen */
                startQualifierOpen?: (Uint8Array|null);

                /** ColumnRange endQualifierClosed */
                endQualifierClosed?: (Uint8Array|null);

                /** ColumnRange endQualifierOpen */
                endQualifierOpen?: (Uint8Array|null);
            }

            /** Represents a ColumnRange. */
            class ColumnRange implements IColumnRange {

                /**
                 * Constructs a new ColumnRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IColumnRange);

                /** ColumnRange familyName. */
                public familyName: string;

                /** ColumnRange startQualifierClosed. */
                public startQualifierClosed: Uint8Array;

                /** ColumnRange startQualifierOpen. */
                public startQualifierOpen: Uint8Array;

                /** ColumnRange endQualifierClosed. */
                public endQualifierClosed: Uint8Array;

                /** ColumnRange endQualifierOpen. */
                public endQualifierOpen: Uint8Array;

                /** ColumnRange startQualifier. */
                public startQualifier?: ("startQualifierClosed"|"startQualifierOpen");

                /** ColumnRange endQualifier. */
                public endQualifier?: ("endQualifierClosed"|"endQualifierOpen");

                /**
                 * Creates a new ColumnRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ColumnRange instance
                 */
                public static create(properties?: google.bigtable.v2.IColumnRange): google.bigtable.v2.ColumnRange;

                /**
                 * Encodes the specified ColumnRange message. Does not implicitly {@link google.bigtable.v2.ColumnRange.verify|verify} messages.
                 * @param message ColumnRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IColumnRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ColumnRange message, length delimited. Does not implicitly {@link google.bigtable.v2.ColumnRange.verify|verify} messages.
                 * @param message ColumnRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IColumnRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ColumnRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ColumnRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ColumnRange;

                /**
                 * Decodes a ColumnRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ColumnRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ColumnRange;

                /**
                 * Verifies a ColumnRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ColumnRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ColumnRange
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ColumnRange;

                /**
                 * Creates a plain object from a ColumnRange message. Also converts values to other types if specified.
                 * @param message ColumnRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ColumnRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ColumnRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TimestampRange. */
            interface ITimestampRange {

                /** TimestampRange startTimestampMicros */
                startTimestampMicros?: (number|Long|null);

                /** TimestampRange endTimestampMicros */
                endTimestampMicros?: (number|Long|null);
            }

            /** Represents a TimestampRange. */
            class TimestampRange implements ITimestampRange {

                /**
                 * Constructs a new TimestampRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.ITimestampRange);

                /** TimestampRange startTimestampMicros. */
                public startTimestampMicros: (number|Long);

                /** TimestampRange endTimestampMicros. */
                public endTimestampMicros: (number|Long);

                /**
                 * Creates a new TimestampRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TimestampRange instance
                 */
                public static create(properties?: google.bigtable.v2.ITimestampRange): google.bigtable.v2.TimestampRange;

                /**
                 * Encodes the specified TimestampRange message. Does not implicitly {@link google.bigtable.v2.TimestampRange.verify|verify} messages.
                 * @param message TimestampRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.ITimestampRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TimestampRange message, length delimited. Does not implicitly {@link google.bigtable.v2.TimestampRange.verify|verify} messages.
                 * @param message TimestampRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.ITimestampRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TimestampRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TimestampRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.TimestampRange;

                /**
                 * Decodes a TimestampRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TimestampRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.TimestampRange;

                /**
                 * Verifies a TimestampRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TimestampRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TimestampRange
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.TimestampRange;

                /**
                 * Creates a plain object from a TimestampRange message. Also converts values to other types if specified.
                 * @param message TimestampRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.TimestampRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TimestampRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ValueRange. */
            interface IValueRange {

                /** ValueRange startValueClosed */
                startValueClosed?: (Uint8Array|null);

                /** ValueRange startValueOpen */
                startValueOpen?: (Uint8Array|null);

                /** ValueRange endValueClosed */
                endValueClosed?: (Uint8Array|null);

                /** ValueRange endValueOpen */
                endValueOpen?: (Uint8Array|null);
            }

            /** Represents a ValueRange. */
            class ValueRange implements IValueRange {

                /**
                 * Constructs a new ValueRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IValueRange);

                /** ValueRange startValueClosed. */
                public startValueClosed: Uint8Array;

                /** ValueRange startValueOpen. */
                public startValueOpen: Uint8Array;

                /** ValueRange endValueClosed. */
                public endValueClosed: Uint8Array;

                /** ValueRange endValueOpen. */
                public endValueOpen: Uint8Array;

                /** ValueRange startValue. */
                public startValue?: ("startValueClosed"|"startValueOpen");

                /** ValueRange endValue. */
                public endValue?: ("endValueClosed"|"endValueOpen");

                /**
                 * Creates a new ValueRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ValueRange instance
                 */
                public static create(properties?: google.bigtable.v2.IValueRange): google.bigtable.v2.ValueRange;

                /**
                 * Encodes the specified ValueRange message. Does not implicitly {@link google.bigtable.v2.ValueRange.verify|verify} messages.
                 * @param message ValueRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IValueRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ValueRange message, length delimited. Does not implicitly {@link google.bigtable.v2.ValueRange.verify|verify} messages.
                 * @param message ValueRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IValueRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ValueRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ValueRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ValueRange;

                /**
                 * Decodes a ValueRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ValueRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ValueRange;

                /**
                 * Verifies a ValueRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ValueRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ValueRange
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ValueRange;

                /**
                 * Creates a plain object from a ValueRange message. Also converts values to other types if specified.
                 * @param message ValueRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ValueRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ValueRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RowFilter. */
            interface IRowFilter {

                /** RowFilter chain */
                chain?: (google.bigtable.v2.RowFilter.IChain|null);

                /** RowFilter interleave */
                interleave?: (google.bigtable.v2.RowFilter.IInterleave|null);

                /** RowFilter condition */
                condition?: (google.bigtable.v2.RowFilter.ICondition|null);

                /** RowFilter sink */
                sink?: (boolean|null);

                /** RowFilter passAllFilter */
                passAllFilter?: (boolean|null);

                /** RowFilter blockAllFilter */
                blockAllFilter?: (boolean|null);

                /** RowFilter rowKeyRegexFilter */
                rowKeyRegexFilter?: (Uint8Array|null);

                /** RowFilter rowSampleFilter */
                rowSampleFilter?: (number|null);

                /** RowFilter familyNameRegexFilter */
                familyNameRegexFilter?: (string|null);

                /** RowFilter columnQualifierRegexFilter */
                columnQualifierRegexFilter?: (Uint8Array|null);

                /** RowFilter columnRangeFilter */
                columnRangeFilter?: (google.bigtable.v2.IColumnRange|null);

                /** RowFilter timestampRangeFilter */
                timestampRangeFilter?: (google.bigtable.v2.ITimestampRange|null);

                /** RowFilter valueRegexFilter */
                valueRegexFilter?: (Uint8Array|null);

                /** RowFilter valueRangeFilter */
                valueRangeFilter?: (google.bigtable.v2.IValueRange|null);

                /** RowFilter cellsPerRowOffsetFilter */
                cellsPerRowOffsetFilter?: (number|null);

                /** RowFilter cellsPerRowLimitFilter */
                cellsPerRowLimitFilter?: (number|null);

                /** RowFilter cellsPerColumnLimitFilter */
                cellsPerColumnLimitFilter?: (number|null);

                /** RowFilter stripValueTransformer */
                stripValueTransformer?: (boolean|null);

                /** RowFilter applyLabelTransformer */
                applyLabelTransformer?: (string|null);
            }

            /** Represents a RowFilter. */
            class RowFilter implements IRowFilter {

                /**
                 * Constructs a new RowFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IRowFilter);

                /** RowFilter chain. */
                public chain?: (google.bigtable.v2.RowFilter.IChain|null);

                /** RowFilter interleave. */
                public interleave?: (google.bigtable.v2.RowFilter.IInterleave|null);

                /** RowFilter condition. */
                public condition?: (google.bigtable.v2.RowFilter.ICondition|null);

                /** RowFilter sink. */
                public sink: boolean;

                /** RowFilter passAllFilter. */
                public passAllFilter: boolean;

                /** RowFilter blockAllFilter. */
                public blockAllFilter: boolean;

                /** RowFilter rowKeyRegexFilter. */
                public rowKeyRegexFilter: Uint8Array;

                /** RowFilter rowSampleFilter. */
                public rowSampleFilter: number;

                /** RowFilter familyNameRegexFilter. */
                public familyNameRegexFilter: string;

                /** RowFilter columnQualifierRegexFilter. */
                public columnQualifierRegexFilter: Uint8Array;

                /** RowFilter columnRangeFilter. */
                public columnRangeFilter?: (google.bigtable.v2.IColumnRange|null);

                /** RowFilter timestampRangeFilter. */
                public timestampRangeFilter?: (google.bigtable.v2.ITimestampRange|null);

                /** RowFilter valueRegexFilter. */
                public valueRegexFilter: Uint8Array;

                /** RowFilter valueRangeFilter. */
                public valueRangeFilter?: (google.bigtable.v2.IValueRange|null);

                /** RowFilter cellsPerRowOffsetFilter. */
                public cellsPerRowOffsetFilter: number;

                /** RowFilter cellsPerRowLimitFilter. */
                public cellsPerRowLimitFilter: number;

                /** RowFilter cellsPerColumnLimitFilter. */
                public cellsPerColumnLimitFilter: number;

                /** RowFilter stripValueTransformer. */
                public stripValueTransformer: boolean;

                /** RowFilter applyLabelTransformer. */
                public applyLabelTransformer: string;

                /** RowFilter filter. */
                public filter?: ("chain"|"interleave"|"condition"|"sink"|"passAllFilter"|"blockAllFilter"|"rowKeyRegexFilter"|"rowSampleFilter"|"familyNameRegexFilter"|"columnQualifierRegexFilter"|"columnRangeFilter"|"timestampRangeFilter"|"valueRegexFilter"|"valueRangeFilter"|"cellsPerRowOffsetFilter"|"cellsPerRowLimitFilter"|"cellsPerColumnLimitFilter"|"stripValueTransformer"|"applyLabelTransformer");

                /**
                 * Creates a new RowFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RowFilter instance
                 */
                public static create(properties?: google.bigtable.v2.IRowFilter): google.bigtable.v2.RowFilter;

                /**
                 * Encodes the specified RowFilter message. Does not implicitly {@link google.bigtable.v2.RowFilter.verify|verify} messages.
                 * @param message RowFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IRowFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RowFilter message, length delimited. Does not implicitly {@link google.bigtable.v2.RowFilter.verify|verify} messages.
                 * @param message RowFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IRowFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RowFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RowFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.RowFilter;

                /**
                 * Decodes a RowFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RowFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.RowFilter;

                /**
                 * Verifies a RowFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RowFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RowFilter
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.RowFilter;

                /**
                 * Creates a plain object from a RowFilter message. Also converts values to other types if specified.
                 * @param message RowFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.RowFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RowFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace RowFilter {

                /** Properties of a Chain. */
                interface IChain {

                    /** Chain filters */
                    filters?: (google.bigtable.v2.IRowFilter[]|null);
                }

                /** Represents a Chain. */
                class Chain implements IChain {

                    /**
                     * Constructs a new Chain.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.RowFilter.IChain);

                    /** Chain filters. */
                    public filters: google.bigtable.v2.IRowFilter[];

                    /**
                     * Creates a new Chain instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Chain instance
                     */
                    public static create(properties?: google.bigtable.v2.RowFilter.IChain): google.bigtable.v2.RowFilter.Chain;

                    /**
                     * Encodes the specified Chain message. Does not implicitly {@link google.bigtable.v2.RowFilter.Chain.verify|verify} messages.
                     * @param message Chain message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.RowFilter.IChain, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Chain message, length delimited. Does not implicitly {@link google.bigtable.v2.RowFilter.Chain.verify|verify} messages.
                     * @param message Chain message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.RowFilter.IChain, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Chain message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Chain
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.RowFilter.Chain;

                    /**
                     * Decodes a Chain message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Chain
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.RowFilter.Chain;

                    /**
                     * Verifies a Chain message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Chain message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Chain
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.RowFilter.Chain;

                    /**
                     * Creates a plain object from a Chain message. Also converts values to other types if specified.
                     * @param message Chain
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.RowFilter.Chain, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Chain to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an Interleave. */
                interface IInterleave {

                    /** Interleave filters */
                    filters?: (google.bigtable.v2.IRowFilter[]|null);
                }

                /** Represents an Interleave. */
                class Interleave implements IInterleave {

                    /**
                     * Constructs a new Interleave.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.RowFilter.IInterleave);

                    /** Interleave filters. */
                    public filters: google.bigtable.v2.IRowFilter[];

                    /**
                     * Creates a new Interleave instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Interleave instance
                     */
                    public static create(properties?: google.bigtable.v2.RowFilter.IInterleave): google.bigtable.v2.RowFilter.Interleave;

                    /**
                     * Encodes the specified Interleave message. Does not implicitly {@link google.bigtable.v2.RowFilter.Interleave.verify|verify} messages.
                     * @param message Interleave message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.RowFilter.IInterleave, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Interleave message, length delimited. Does not implicitly {@link google.bigtable.v2.RowFilter.Interleave.verify|verify} messages.
                     * @param message Interleave message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.RowFilter.IInterleave, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Interleave message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Interleave
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.RowFilter.Interleave;

                    /**
                     * Decodes an Interleave message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Interleave
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.RowFilter.Interleave;

                    /**
                     * Verifies an Interleave message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Interleave message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Interleave
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.RowFilter.Interleave;

                    /**
                     * Creates a plain object from an Interleave message. Also converts values to other types if specified.
                     * @param message Interleave
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.RowFilter.Interleave, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Interleave to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Condition. */
                interface ICondition {

                    /** Condition predicateFilter */
                    predicateFilter?: (google.bigtable.v2.IRowFilter|null);

                    /** Condition trueFilter */
                    trueFilter?: (google.bigtable.v2.IRowFilter|null);

                    /** Condition falseFilter */
                    falseFilter?: (google.bigtable.v2.IRowFilter|null);
                }

                /** Represents a Condition. */
                class Condition implements ICondition {

                    /**
                     * Constructs a new Condition.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.RowFilter.ICondition);

                    /** Condition predicateFilter. */
                    public predicateFilter?: (google.bigtable.v2.IRowFilter|null);

                    /** Condition trueFilter. */
                    public trueFilter?: (google.bigtable.v2.IRowFilter|null);

                    /** Condition falseFilter. */
                    public falseFilter?: (google.bigtable.v2.IRowFilter|null);

                    /**
                     * Creates a new Condition instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Condition instance
                     */
                    public static create(properties?: google.bigtable.v2.RowFilter.ICondition): google.bigtable.v2.RowFilter.Condition;

                    /**
                     * Encodes the specified Condition message. Does not implicitly {@link google.bigtable.v2.RowFilter.Condition.verify|verify} messages.
                     * @param message Condition message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.RowFilter.ICondition, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Condition message, length delimited. Does not implicitly {@link google.bigtable.v2.RowFilter.Condition.verify|verify} messages.
                     * @param message Condition message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.RowFilter.ICondition, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Condition message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Condition
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.RowFilter.Condition;

                    /**
                     * Decodes a Condition message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Condition
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.RowFilter.Condition;

                    /**
                     * Verifies a Condition message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Condition message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Condition
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.RowFilter.Condition;

                    /**
                     * Creates a plain object from a Condition message. Also converts values to other types if specified.
                     * @param message Condition
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.RowFilter.Condition, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Condition to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a Mutation. */
            interface IMutation {

                /** Mutation setCell */
                setCell?: (google.bigtable.v2.Mutation.ISetCell|null);

                /** Mutation deleteFromColumn */
                deleteFromColumn?: (google.bigtable.v2.Mutation.IDeleteFromColumn|null);

                /** Mutation deleteFromFamily */
                deleteFromFamily?: (google.bigtable.v2.Mutation.IDeleteFromFamily|null);

                /** Mutation deleteFromRow */
                deleteFromRow?: (google.bigtable.v2.Mutation.IDeleteFromRow|null);
            }

            /** Represents a Mutation. */
            class Mutation implements IMutation {

                /**
                 * Constructs a new Mutation.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IMutation);

                /** Mutation setCell. */
                public setCell?: (google.bigtable.v2.Mutation.ISetCell|null);

                /** Mutation deleteFromColumn. */
                public deleteFromColumn?: (google.bigtable.v2.Mutation.IDeleteFromColumn|null);

                /** Mutation deleteFromFamily. */
                public deleteFromFamily?: (google.bigtable.v2.Mutation.IDeleteFromFamily|null);

                /** Mutation deleteFromRow. */
                public deleteFromRow?: (google.bigtable.v2.Mutation.IDeleteFromRow|null);

                /** Mutation mutation. */
                public mutation?: ("setCell"|"deleteFromColumn"|"deleteFromFamily"|"deleteFromRow");

                /**
                 * Creates a new Mutation instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Mutation instance
                 */
                public static create(properties?: google.bigtable.v2.IMutation): google.bigtable.v2.Mutation;

                /**
                 * Encodes the specified Mutation message. Does not implicitly {@link google.bigtable.v2.Mutation.verify|verify} messages.
                 * @param message Mutation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IMutation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Mutation message, length delimited. Does not implicitly {@link google.bigtable.v2.Mutation.verify|verify} messages.
                 * @param message Mutation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IMutation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Mutation message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Mutation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.Mutation;

                /**
                 * Decodes a Mutation message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Mutation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.Mutation;

                /**
                 * Verifies a Mutation message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Mutation message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Mutation
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.Mutation;

                /**
                 * Creates a plain object from a Mutation message. Also converts values to other types if specified.
                 * @param message Mutation
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.Mutation, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Mutation to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace Mutation {

                /** Properties of a SetCell. */
                interface ISetCell {

                    /** SetCell familyName */
                    familyName?: (string|null);

                    /** SetCell columnQualifier */
                    columnQualifier?: (Uint8Array|null);

                    /** SetCell timestampMicros */
                    timestampMicros?: (number|Long|null);

                    /** SetCell value */
                    value?: (Uint8Array|null);
                }

                /** Represents a SetCell. */
                class SetCell implements ISetCell {

                    /**
                     * Constructs a new SetCell.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.Mutation.ISetCell);

                    /** SetCell familyName. */
                    public familyName: string;

                    /** SetCell columnQualifier. */
                    public columnQualifier: Uint8Array;

                    /** SetCell timestampMicros. */
                    public timestampMicros: (number|Long);

                    /** SetCell value. */
                    public value: Uint8Array;

                    /**
                     * Creates a new SetCell instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SetCell instance
                     */
                    public static create(properties?: google.bigtable.v2.Mutation.ISetCell): google.bigtable.v2.Mutation.SetCell;

                    /**
                     * Encodes the specified SetCell message. Does not implicitly {@link google.bigtable.v2.Mutation.SetCell.verify|verify} messages.
                     * @param message SetCell message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.Mutation.ISetCell, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SetCell message, length delimited. Does not implicitly {@link google.bigtable.v2.Mutation.SetCell.verify|verify} messages.
                     * @param message SetCell message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.Mutation.ISetCell, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SetCell message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SetCell
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.Mutation.SetCell;

                    /**
                     * Decodes a SetCell message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SetCell
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.Mutation.SetCell;

                    /**
                     * Verifies a SetCell message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SetCell message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SetCell
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.Mutation.SetCell;

                    /**
                     * Creates a plain object from a SetCell message. Also converts values to other types if specified.
                     * @param message SetCell
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.Mutation.SetCell, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SetCell to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DeleteFromColumn. */
                interface IDeleteFromColumn {

                    /** DeleteFromColumn familyName */
                    familyName?: (string|null);

                    /** DeleteFromColumn columnQualifier */
                    columnQualifier?: (Uint8Array|null);

                    /** DeleteFromColumn timeRange */
                    timeRange?: (google.bigtable.v2.ITimestampRange|null);
                }

                /** Represents a DeleteFromColumn. */
                class DeleteFromColumn implements IDeleteFromColumn {

                    /**
                     * Constructs a new DeleteFromColumn.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.Mutation.IDeleteFromColumn);

                    /** DeleteFromColumn familyName. */
                    public familyName: string;

                    /** DeleteFromColumn columnQualifier. */
                    public columnQualifier: Uint8Array;

                    /** DeleteFromColumn timeRange. */
                    public timeRange?: (google.bigtable.v2.ITimestampRange|null);

                    /**
                     * Creates a new DeleteFromColumn instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeleteFromColumn instance
                     */
                    public static create(properties?: google.bigtable.v2.Mutation.IDeleteFromColumn): google.bigtable.v2.Mutation.DeleteFromColumn;

                    /**
                     * Encodes the specified DeleteFromColumn message. Does not implicitly {@link google.bigtable.v2.Mutation.DeleteFromColumn.verify|verify} messages.
                     * @param message DeleteFromColumn message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.Mutation.IDeleteFromColumn, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeleteFromColumn message, length delimited. Does not implicitly {@link google.bigtable.v2.Mutation.DeleteFromColumn.verify|verify} messages.
                     * @param message DeleteFromColumn message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.Mutation.IDeleteFromColumn, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeleteFromColumn message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeleteFromColumn
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.Mutation.DeleteFromColumn;

                    /**
                     * Decodes a DeleteFromColumn message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeleteFromColumn
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.Mutation.DeleteFromColumn;

                    /**
                     * Verifies a DeleteFromColumn message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeleteFromColumn message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeleteFromColumn
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.Mutation.DeleteFromColumn;

                    /**
                     * Creates a plain object from a DeleteFromColumn message. Also converts values to other types if specified.
                     * @param message DeleteFromColumn
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.Mutation.DeleteFromColumn, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeleteFromColumn to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DeleteFromFamily. */
                interface IDeleteFromFamily {

                    /** DeleteFromFamily familyName */
                    familyName?: (string|null);
                }

                /** Represents a DeleteFromFamily. */
                class DeleteFromFamily implements IDeleteFromFamily {

                    /**
                     * Constructs a new DeleteFromFamily.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.Mutation.IDeleteFromFamily);

                    /** DeleteFromFamily familyName. */
                    public familyName: string;

                    /**
                     * Creates a new DeleteFromFamily instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeleteFromFamily instance
                     */
                    public static create(properties?: google.bigtable.v2.Mutation.IDeleteFromFamily): google.bigtable.v2.Mutation.DeleteFromFamily;

                    /**
                     * Encodes the specified DeleteFromFamily message. Does not implicitly {@link google.bigtable.v2.Mutation.DeleteFromFamily.verify|verify} messages.
                     * @param message DeleteFromFamily message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.Mutation.IDeleteFromFamily, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeleteFromFamily message, length delimited. Does not implicitly {@link google.bigtable.v2.Mutation.DeleteFromFamily.verify|verify} messages.
                     * @param message DeleteFromFamily message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.Mutation.IDeleteFromFamily, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeleteFromFamily message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeleteFromFamily
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.Mutation.DeleteFromFamily;

                    /**
                     * Decodes a DeleteFromFamily message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeleteFromFamily
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.Mutation.DeleteFromFamily;

                    /**
                     * Verifies a DeleteFromFamily message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeleteFromFamily message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeleteFromFamily
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.Mutation.DeleteFromFamily;

                    /**
                     * Creates a plain object from a DeleteFromFamily message. Also converts values to other types if specified.
                     * @param message DeleteFromFamily
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.Mutation.DeleteFromFamily, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeleteFromFamily to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DeleteFromRow. */
                interface IDeleteFromRow {
                }

                /** Represents a DeleteFromRow. */
                class DeleteFromRow implements IDeleteFromRow {

                    /**
                     * Constructs a new DeleteFromRow.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.Mutation.IDeleteFromRow);

                    /**
                     * Creates a new DeleteFromRow instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeleteFromRow instance
                     */
                    public static create(properties?: google.bigtable.v2.Mutation.IDeleteFromRow): google.bigtable.v2.Mutation.DeleteFromRow;

                    /**
                     * Encodes the specified DeleteFromRow message. Does not implicitly {@link google.bigtable.v2.Mutation.DeleteFromRow.verify|verify} messages.
                     * @param message DeleteFromRow message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.Mutation.IDeleteFromRow, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeleteFromRow message, length delimited. Does not implicitly {@link google.bigtable.v2.Mutation.DeleteFromRow.verify|verify} messages.
                     * @param message DeleteFromRow message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.Mutation.IDeleteFromRow, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeleteFromRow message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeleteFromRow
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.Mutation.DeleteFromRow;

                    /**
                     * Decodes a DeleteFromRow message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeleteFromRow
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.Mutation.DeleteFromRow;

                    /**
                     * Verifies a DeleteFromRow message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeleteFromRow message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeleteFromRow
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.Mutation.DeleteFromRow;

                    /**
                     * Creates a plain object from a DeleteFromRow message. Also converts values to other types if specified.
                     * @param message DeleteFromRow
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.Mutation.DeleteFromRow, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeleteFromRow to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a ReadModifyWriteRule. */
            interface IReadModifyWriteRule {

                /** ReadModifyWriteRule familyName */
                familyName?: (string|null);

                /** ReadModifyWriteRule columnQualifier */
                columnQualifier?: (Uint8Array|null);

                /** ReadModifyWriteRule appendValue */
                appendValue?: (Uint8Array|null);

                /** ReadModifyWriteRule incrementAmount */
                incrementAmount?: (number|Long|null);
            }

            /** Represents a ReadModifyWriteRule. */
            class ReadModifyWriteRule implements IReadModifyWriteRule {

                /**
                 * Constructs a new ReadModifyWriteRule.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IReadModifyWriteRule);

                /** ReadModifyWriteRule familyName. */
                public familyName: string;

                /** ReadModifyWriteRule columnQualifier. */
                public columnQualifier: Uint8Array;

                /** ReadModifyWriteRule appendValue. */
                public appendValue: Uint8Array;

                /** ReadModifyWriteRule incrementAmount. */
                public incrementAmount: (number|Long);

                /** ReadModifyWriteRule rule. */
                public rule?: ("appendValue"|"incrementAmount");

                /**
                 * Creates a new ReadModifyWriteRule instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReadModifyWriteRule instance
                 */
                public static create(properties?: google.bigtable.v2.IReadModifyWriteRule): google.bigtable.v2.ReadModifyWriteRule;

                /**
                 * Encodes the specified ReadModifyWriteRule message. Does not implicitly {@link google.bigtable.v2.ReadModifyWriteRule.verify|verify} messages.
                 * @param message ReadModifyWriteRule message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IReadModifyWriteRule, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReadModifyWriteRule message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadModifyWriteRule.verify|verify} messages.
                 * @param message ReadModifyWriteRule message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IReadModifyWriteRule, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReadModifyWriteRule message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReadModifyWriteRule
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadModifyWriteRule;

                /**
                 * Decodes a ReadModifyWriteRule message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReadModifyWriteRule
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadModifyWriteRule;

                /**
                 * Verifies a ReadModifyWriteRule message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReadModifyWriteRule message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReadModifyWriteRule
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadModifyWriteRule;

                /**
                 * Creates a plain object from a ReadModifyWriteRule message. Also converts values to other types if specified.
                 * @param message ReadModifyWriteRule
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ReadModifyWriteRule, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReadModifyWriteRule to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace api. */
    namespace api {

        /** Properties of a Http. */
        interface IHttp {

            /** Http rules */
            rules?: (google.api.IHttpRule[]|null);
        }

        /** Represents a Http. */
        class Http implements IHttp {

            /**
             * Constructs a new Http.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttp);

            /** Http rules. */
            public rules: google.api.IHttpRule[];

            /**
             * Creates a new Http instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Http instance
             */
            public static create(properties?: google.api.IHttp): google.api.Http;

            /**
             * Encodes the specified Http message. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @param message Http message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IHttp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Http message, length delimited. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @param message Http message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IHttp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Http message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.Http;

            /**
             * Decodes a Http message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.Http;

            /**
             * Verifies a Http message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Http message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Http
             */
            public static fromObject(object: { [k: string]: any }): google.api.Http;

            /**
             * Creates a plain object from a Http message. Also converts values to other types if specified.
             * @param message Http
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.Http, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Http to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a HttpRule. */
        interface IHttpRule {

            /** HttpRule selector */
            selector?: (string|null);

            /** HttpRule get */
            get?: (string|null);

            /** HttpRule put */
            put?: (string|null);

            /** HttpRule post */
            post?: (string|null);

            /** HttpRule delete */
            "delete"?: (string|null);

            /** HttpRule patch */
            patch?: (string|null);

            /** HttpRule custom */
            custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule body */
            body?: (string|null);

            /** HttpRule additionalBindings */
            additionalBindings?: (google.api.IHttpRule[]|null);
        }

        /** Represents a HttpRule. */
        class HttpRule implements IHttpRule {

            /**
             * Constructs a new HttpRule.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttpRule);

            /** HttpRule selector. */
            public selector: string;

            /** HttpRule get. */
            public get: string;

            /** HttpRule put. */
            public put: string;

            /** HttpRule post. */
            public post: string;

            /** HttpRule delete. */
            public delete: string;

            /** HttpRule patch. */
            public patch: string;

            /** HttpRule custom. */
            public custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule body. */
            public body: string;

            /** HttpRule additionalBindings. */
            public additionalBindings: google.api.IHttpRule[];

            /** HttpRule pattern. */
            public pattern?: ("get"|"put"|"post"|"delete"|"patch"|"custom");

            /**
             * Creates a new HttpRule instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HttpRule instance
             */
            public static create(properties?: google.api.IHttpRule): google.api.HttpRule;

            /**
             * Encodes the specified HttpRule message. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @param message HttpRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IHttpRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HttpRule message, length delimited. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @param message HttpRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IHttpRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HttpRule message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.HttpRule;

            /**
             * Decodes a HttpRule message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.HttpRule;

            /**
             * Verifies a HttpRule message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HttpRule message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HttpRule
             */
            public static fromObject(object: { [k: string]: any }): google.api.HttpRule;

            /**
             * Creates a plain object from a HttpRule message. Also converts values to other types if specified.
             * @param message HttpRule
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.HttpRule, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HttpRule to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CustomHttpPattern. */
        interface ICustomHttpPattern {

            /** CustomHttpPattern kind */
            kind?: (string|null);

            /** CustomHttpPattern path */
            path?: (string|null);
        }

        /** Represents a CustomHttpPattern. */
        class CustomHttpPattern implements ICustomHttpPattern {

            /**
             * Constructs a new CustomHttpPattern.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.ICustomHttpPattern);

            /** CustomHttpPattern kind. */
            public kind: string;

            /** CustomHttpPattern path. */
            public path: string;

            /**
             * Creates a new CustomHttpPattern instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CustomHttpPattern instance
             */
            public static create(properties?: google.api.ICustomHttpPattern): google.api.CustomHttpPattern;

            /**
             * Encodes the specified CustomHttpPattern message. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @param message CustomHttpPattern message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.ICustomHttpPattern, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CustomHttpPattern message, length delimited. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @param message CustomHttpPattern message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.ICustomHttpPattern, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CustomHttpPattern message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.CustomHttpPattern;

            /**
             * Decodes a CustomHttpPattern message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.CustomHttpPattern;

            /**
             * Verifies a CustomHttpPattern message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CustomHttpPattern message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CustomHttpPattern
             */
            public static fromObject(object: { [k: string]: any }): google.api.CustomHttpPattern;

            /**
             * Creates a plain object from a CustomHttpPattern message. Also converts values to other types if specified.
             * @param message CustomHttpPattern
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.CustomHttpPattern, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CustomHttpPattern to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a FileDescriptorSet. */
        interface IFileDescriptorSet {

            /** FileDescriptorSet file */
            file?: (google.protobuf.IFileDescriptorProto[]|null);
        }

        /** Represents a FileDescriptorSet. */
        class FileDescriptorSet implements IFileDescriptorSet {

            /**
             * Constructs a new FileDescriptorSet.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorSet);

            /** FileDescriptorSet file. */
            public file: google.protobuf.IFileDescriptorProto[];

            /**
             * Creates a new FileDescriptorSet instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileDescriptorSet instance
             */
            public static create(properties?: google.protobuf.IFileDescriptorSet): google.protobuf.FileDescriptorSet;

            /**
             * Encodes the specified FileDescriptorSet message. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @param message FileDescriptorSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileDescriptorSet message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @param message FileDescriptorSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet;

            /**
             * Verifies a FileDescriptorSet message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileDescriptorSet message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorSet
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;

            /**
             * Creates a plain object from a FileDescriptorSet message. Also converts values to other types if specified.
             * @param message FileDescriptorSet
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorSet to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileDescriptorProto. */
        interface IFileDescriptorProto {

            /** FileDescriptorProto name */
            name?: (string|null);

            /** FileDescriptorProto package */
            "package"?: (string|null);

            /** FileDescriptorProto dependency */
            dependency?: (string[]|null);

            /** FileDescriptorProto publicDependency */
            publicDependency?: (number[]|null);

            /** FileDescriptorProto weakDependency */
            weakDependency?: (number[]|null);

            /** FileDescriptorProto messageType */
            messageType?: (google.protobuf.IDescriptorProto[]|null);

            /** FileDescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** FileDescriptorProto service */
            service?: (google.protobuf.IServiceDescriptorProto[]|null);

            /** FileDescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** FileDescriptorProto options */
            options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo */
            sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax */
            syntax?: (string|null);
        }

        /** Represents a FileDescriptorProto. */
        class FileDescriptorProto implements IFileDescriptorProto {

            /**
             * Constructs a new FileDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorProto);

            /** FileDescriptorProto name. */
            public name: string;

            /** FileDescriptorProto package. */
            public package: string;

            /** FileDescriptorProto dependency. */
            public dependency: string[];

            /** FileDescriptorProto publicDependency. */
            public publicDependency: number[];

            /** FileDescriptorProto weakDependency. */
            public weakDependency: number[];

            /** FileDescriptorProto messageType. */
            public messageType: google.protobuf.IDescriptorProto[];

            /** FileDescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** FileDescriptorProto service. */
            public service: google.protobuf.IServiceDescriptorProto[];

            /** FileDescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** FileDescriptorProto options. */
            public options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo. */
            public sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax. */
            public syntax: string;

            /**
             * Creates a new FileDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IFileDescriptorProto): google.protobuf.FileDescriptorProto;

            /**
             * Encodes the specified FileDescriptorProto message. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @param message FileDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @param message FileDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto;

            /**
             * Verifies a FileDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;

            /**
             * Creates a plain object from a FileDescriptorProto message. Also converts values to other types if specified.
             * @param message FileDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DescriptorProto. */
        interface IDescriptorProto {

            /** DescriptorProto name */
            name?: (string|null);

            /** DescriptorProto field */
            field?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto nestedType */
            nestedType?: (google.protobuf.IDescriptorProto[]|null);

            /** DescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** DescriptorProto extensionRange */
            extensionRange?: (google.protobuf.DescriptorProto.IExtensionRange[]|null);

            /** DescriptorProto oneofDecl */
            oneofDecl?: (google.protobuf.IOneofDescriptorProto[]|null);

            /** DescriptorProto options */
            options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange */
            reservedRange?: (google.protobuf.DescriptorProto.IReservedRange[]|null);

            /** DescriptorProto reservedName */
            reservedName?: (string[]|null);
        }

        /** Represents a DescriptorProto. */
        class DescriptorProto implements IDescriptorProto {

            /**
             * Constructs a new DescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDescriptorProto);

            /** DescriptorProto name. */
            public name: string;

            /** DescriptorProto field. */
            public field: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto nestedType. */
            public nestedType: google.protobuf.IDescriptorProto[];

            /** DescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** DescriptorProto extensionRange. */
            public extensionRange: google.protobuf.DescriptorProto.IExtensionRange[];

            /** DescriptorProto oneofDecl. */
            public oneofDecl: google.protobuf.IOneofDescriptorProto[];

            /** DescriptorProto options. */
            public options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange. */
            public reservedRange: google.protobuf.DescriptorProto.IReservedRange[];

            /** DescriptorProto reservedName. */
            public reservedName: string[];

            /**
             * Creates a new DescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DescriptorProto instance
             */
            public static create(properties?: google.protobuf.IDescriptorProto): google.protobuf.DescriptorProto;

            /**
             * Encodes the specified DescriptorProto message. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @param message DescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @param message DescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto;

            /**
             * Verifies a DescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;

            /**
             * Creates a plain object from a DescriptorProto message. Also converts values to other types if specified.
             * @param message DescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace DescriptorProto {

            /** Properties of an ExtensionRange. */
            interface IExtensionRange {

                /** ExtensionRange start */
                start?: (number|null);

                /** ExtensionRange end */
                end?: (number|null);
            }

            /** Represents an ExtensionRange. */
            class ExtensionRange implements IExtensionRange {

                /**
                 * Constructs a new ExtensionRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IExtensionRange);

                /** ExtensionRange start. */
                public start: number;

                /** ExtensionRange end. */
                public end: number;

                /**
                 * Creates a new ExtensionRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ExtensionRange instance
                 */
                public static create(properties?: google.protobuf.DescriptorProto.IExtensionRange): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Encodes the specified ExtensionRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @param message ExtensionRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ExtensionRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @param message ExtensionRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Verifies an ExtensionRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ExtensionRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ExtensionRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Creates a plain object from an ExtensionRange message. Also converts values to other types if specified.
                 * @param message ExtensionRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ExtensionRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReservedRange. */
            interface IReservedRange {

                /** ReservedRange start */
                start?: (number|null);

                /** ReservedRange end */
                end?: (number|null);
            }

            /** Represents a ReservedRange. */
            class ReservedRange implements IReservedRange {

                /**
                 * Constructs a new ReservedRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IReservedRange);

                /** ReservedRange start. */
                public start: number;

                /** ReservedRange end. */
                public end: number;

                /**
                 * Creates a new ReservedRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReservedRange instance
                 */
                public static create(properties?: google.protobuf.DescriptorProto.IReservedRange): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Encodes the specified ReservedRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @param message ReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReservedRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @param message ReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Verifies a ReservedRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReservedRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReservedRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Creates a plain object from a ReservedRange message. Also converts values to other types if specified.
                 * @param message ReservedRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReservedRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a FieldDescriptorProto. */
        interface IFieldDescriptorProto {

            /** FieldDescriptorProto name */
            name?: (string|null);

            /** FieldDescriptorProto number */
            number?: (number|null);

            /** FieldDescriptorProto label */
            label?: (google.protobuf.FieldDescriptorProto.Label|null);

            /** FieldDescriptorProto type */
            type?: (google.protobuf.FieldDescriptorProto.Type|null);

            /** FieldDescriptorProto typeName */
            typeName?: (string|null);

            /** FieldDescriptorProto extendee */
            extendee?: (string|null);

            /** FieldDescriptorProto defaultValue */
            defaultValue?: (string|null);

            /** FieldDescriptorProto oneofIndex */
            oneofIndex?: (number|null);

            /** FieldDescriptorProto jsonName */
            jsonName?: (string|null);

            /** FieldDescriptorProto options */
            options?: (google.protobuf.IFieldOptions|null);
        }

        /** Represents a FieldDescriptorProto. */
        class FieldDescriptorProto implements IFieldDescriptorProto {

            /**
             * Constructs a new FieldDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldDescriptorProto);

            /** FieldDescriptorProto name. */
            public name: string;

            /** FieldDescriptorProto number. */
            public number: number;

            /** FieldDescriptorProto label. */
            public label: google.protobuf.FieldDescriptorProto.Label;

            /** FieldDescriptorProto type. */
            public type: google.protobuf.FieldDescriptorProto.Type;

            /** FieldDescriptorProto typeName. */
            public typeName: string;

            /** FieldDescriptorProto extendee. */
            public extendee: string;

            /** FieldDescriptorProto defaultValue. */
            public defaultValue: string;

            /** FieldDescriptorProto oneofIndex. */
            public oneofIndex: number;

            /** FieldDescriptorProto jsonName. */
            public jsonName: string;

            /** FieldDescriptorProto options. */
            public options?: (google.protobuf.IFieldOptions|null);

            /**
             * Creates a new FieldDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FieldDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IFieldDescriptorProto): google.protobuf.FieldDescriptorProto;

            /**
             * Encodes the specified FieldDescriptorProto message. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @param message FieldDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FieldDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @param message FieldDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;

            /**
             * Verifies a FieldDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FieldDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;

            /**
             * Creates a plain object from a FieldDescriptorProto message. Also converts values to other types if specified.
             * @param message FieldDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldDescriptorProto {

            /** Type enum. */
            enum Type {
                TYPE_DOUBLE = 1,
                TYPE_FLOAT = 2,
                TYPE_INT64 = 3,
                TYPE_UINT64 = 4,
                TYPE_INT32 = 5,
                TYPE_FIXED64 = 6,
                TYPE_FIXED32 = 7,
                TYPE_BOOL = 8,
                TYPE_STRING = 9,
                TYPE_GROUP = 10,
                TYPE_MESSAGE = 11,
                TYPE_BYTES = 12,
                TYPE_UINT32 = 13,
                TYPE_ENUM = 14,
                TYPE_SFIXED32 = 15,
                TYPE_SFIXED64 = 16,
                TYPE_SINT32 = 17,
                TYPE_SINT64 = 18
            }

            /** Label enum. */
            enum Label {
                LABEL_OPTIONAL = 1,
                LABEL_REQUIRED = 2,
                LABEL_REPEATED = 3
            }
        }

        /** Properties of an OneofDescriptorProto. */
        interface IOneofDescriptorProto {

            /** OneofDescriptorProto name */
            name?: (string|null);

            /** OneofDescriptorProto options */
            options?: (google.protobuf.IOneofOptions|null);
        }

        /** Represents an OneofDescriptorProto. */
        class OneofDescriptorProto implements IOneofDescriptorProto {

            /**
             * Constructs a new OneofDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofDescriptorProto);

            /** OneofDescriptorProto name. */
            public name: string;

            /** OneofDescriptorProto options. */
            public options?: (google.protobuf.IOneofOptions|null);

            /**
             * Creates a new OneofDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OneofDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IOneofDescriptorProto): google.protobuf.OneofDescriptorProto;

            /**
             * Encodes the specified OneofDescriptorProto message. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @param message OneofDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OneofDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @param message OneofDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;

            /**
             * Verifies an OneofDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OneofDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;

            /**
             * Creates a plain object from an OneofDescriptorProto message. Also converts values to other types if specified.
             * @param message OneofDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumDescriptorProto. */
        interface IEnumDescriptorProto {

            /** EnumDescriptorProto name */
            name?: (string|null);

            /** EnumDescriptorProto value */
            value?: (google.protobuf.IEnumValueDescriptorProto[]|null);

            /** EnumDescriptorProto options */
            options?: (google.protobuf.IEnumOptions|null);
        }

        /** Represents an EnumDescriptorProto. */
        class EnumDescriptorProto implements IEnumDescriptorProto {

            /**
             * Constructs a new EnumDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumDescriptorProto);

            /** EnumDescriptorProto name. */
            public name: string;

            /** EnumDescriptorProto value. */
            public value: google.protobuf.IEnumValueDescriptorProto[];

            /** EnumDescriptorProto options. */
            public options?: (google.protobuf.IEnumOptions|null);

            /**
             * Creates a new EnumDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IEnumDescriptorProto): google.protobuf.EnumDescriptorProto;

            /**
             * Encodes the specified EnumDescriptorProto message. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @param message EnumDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @param message EnumDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;

            /**
             * Verifies an EnumDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;

            /**
             * Creates a plain object from an EnumDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumValueDescriptorProto. */
        interface IEnumValueDescriptorProto {

            /** EnumValueDescriptorProto name */
            name?: (string|null);

            /** EnumValueDescriptorProto number */
            number?: (number|null);

            /** EnumValueDescriptorProto options */
            options?: (google.protobuf.IEnumValueOptions|null);
        }

        /** Represents an EnumValueDescriptorProto. */
        class EnumValueDescriptorProto implements IEnumValueDescriptorProto {

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueDescriptorProto);

            /** EnumValueDescriptorProto name. */
            public name: string;

            /** EnumValueDescriptorProto number. */
            public number: number;

            /** EnumValueDescriptorProto options. */
            public options?: (google.protobuf.IEnumValueOptions|null);

            /**
             * Creates a new EnumValueDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumValueDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IEnumValueDescriptorProto): google.protobuf.EnumValueDescriptorProto;

            /**
             * Encodes the specified EnumValueDescriptorProto message. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @param message EnumValueDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumValueDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @param message EnumValueDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;

            /**
             * Verifies an EnumValueDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumValueDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;

            /**
             * Creates a plain object from an EnumValueDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumValueDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceDescriptorProto. */
        interface IServiceDescriptorProto {

            /** ServiceDescriptorProto name */
            name?: (string|null);

            /** ServiceDescriptorProto method */
            method?: (google.protobuf.IMethodDescriptorProto[]|null);

            /** ServiceDescriptorProto options */
            options?: (google.protobuf.IServiceOptions|null);
        }

        /** Represents a ServiceDescriptorProto. */
        class ServiceDescriptorProto implements IServiceDescriptorProto {

            /**
             * Constructs a new ServiceDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceDescriptorProto);

            /** ServiceDescriptorProto name. */
            public name: string;

            /** ServiceDescriptorProto method. */
            public method: google.protobuf.IMethodDescriptorProto[];

            /** ServiceDescriptorProto options. */
            public options?: (google.protobuf.IServiceOptions|null);

            /**
             * Creates a new ServiceDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServiceDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IServiceDescriptorProto): google.protobuf.ServiceDescriptorProto;

            /**
             * Encodes the specified ServiceDescriptorProto message. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @param message ServiceDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @param message ServiceDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;

            /**
             * Verifies a ServiceDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;

            /**
             * Creates a plain object from a ServiceDescriptorProto message. Also converts values to other types if specified.
             * @param message ServiceDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodDescriptorProto. */
        interface IMethodDescriptorProto {

            /** MethodDescriptorProto name */
            name?: (string|null);

            /** MethodDescriptorProto inputType */
            inputType?: (string|null);

            /** MethodDescriptorProto outputType */
            outputType?: (string|null);

            /** MethodDescriptorProto options */
            options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming */
            clientStreaming?: (boolean|null);

            /** MethodDescriptorProto serverStreaming */
            serverStreaming?: (boolean|null);
        }

        /** Represents a MethodDescriptorProto. */
        class MethodDescriptorProto implements IMethodDescriptorProto {

            /**
             * Constructs a new MethodDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodDescriptorProto);

            /** MethodDescriptorProto name. */
            public name: string;

            /** MethodDescriptorProto inputType. */
            public inputType: string;

            /** MethodDescriptorProto outputType. */
            public outputType: string;

            /** MethodDescriptorProto options. */
            public options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming. */
            public clientStreaming: boolean;

            /** MethodDescriptorProto serverStreaming. */
            public serverStreaming: boolean;

            /**
             * Creates a new MethodDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MethodDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IMethodDescriptorProto): google.protobuf.MethodDescriptorProto;

            /**
             * Encodes the specified MethodDescriptorProto message. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @param message MethodDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @param message MethodDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;

            /**
             * Verifies a MethodDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;

            /**
             * Creates a plain object from a MethodDescriptorProto message. Also converts values to other types if specified.
             * @param message MethodDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileOptions. */
        interface IFileOptions {

            /** FileOptions javaPackage */
            javaPackage?: (string|null);

            /** FileOptions javaOuterClassname */
            javaOuterClassname?: (string|null);

            /** FileOptions javaMultipleFiles */
            javaMultipleFiles?: (boolean|null);

            /** FileOptions javaGenerateEqualsAndHash */
            javaGenerateEqualsAndHash?: (boolean|null);

            /** FileOptions javaStringCheckUtf8 */
            javaStringCheckUtf8?: (boolean|null);

            /** FileOptions optimizeFor */
            optimizeFor?: (google.protobuf.FileOptions.OptimizeMode|null);

            /** FileOptions goPackage */
            goPackage?: (string|null);

            /** FileOptions ccGenericServices */
            ccGenericServices?: (boolean|null);

            /** FileOptions javaGenericServices */
            javaGenericServices?: (boolean|null);

            /** FileOptions pyGenericServices */
            pyGenericServices?: (boolean|null);

            /** FileOptions deprecated */
            deprecated?: (boolean|null);

            /** FileOptions ccEnableArenas */
            ccEnableArenas?: (boolean|null);

            /** FileOptions objcClassPrefix */
            objcClassPrefix?: (string|null);

            /** FileOptions csharpNamespace */
            csharpNamespace?: (string|null);

            /** FileOptions swiftPrefix */
            swiftPrefix?: (string|null);

            /** FileOptions phpClassPrefix */
            phpClassPrefix?: (string|null);

            /** FileOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a FileOptions. */
        class FileOptions implements IFileOptions {

            /**
             * Constructs a new FileOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileOptions);

            /** FileOptions javaPackage. */
            public javaPackage: string;

            /** FileOptions javaOuterClassname. */
            public javaOuterClassname: string;

            /** FileOptions javaMultipleFiles. */
            public javaMultipleFiles: boolean;

            /** FileOptions javaGenerateEqualsAndHash. */
            public javaGenerateEqualsAndHash: boolean;

            /** FileOptions javaStringCheckUtf8. */
            public javaStringCheckUtf8: boolean;

            /** FileOptions optimizeFor. */
            public optimizeFor: google.protobuf.FileOptions.OptimizeMode;

            /** FileOptions goPackage. */
            public goPackage: string;

            /** FileOptions ccGenericServices. */
            public ccGenericServices: boolean;

            /** FileOptions javaGenericServices. */
            public javaGenericServices: boolean;

            /** FileOptions pyGenericServices. */
            public pyGenericServices: boolean;

            /** FileOptions deprecated. */
            public deprecated: boolean;

            /** FileOptions ccEnableArenas. */
            public ccEnableArenas: boolean;

            /** FileOptions objcClassPrefix. */
            public objcClassPrefix: string;

            /** FileOptions csharpNamespace. */
            public csharpNamespace: string;

            /** FileOptions swiftPrefix. */
            public swiftPrefix: string;

            /** FileOptions phpClassPrefix. */
            public phpClassPrefix: string;

            /** FileOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new FileOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileOptions instance
             */
            public static create(properties?: google.protobuf.IFileOptions): google.protobuf.FileOptions;

            /**
             * Encodes the specified FileOptions message. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @param message FileOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileOptions message, length delimited. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @param message FileOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions;

            /**
             * Decodes a FileOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions;

            /**
             * Verifies a FileOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileOptions;

            /**
             * Creates a plain object from a FileOptions message. Also converts values to other types if specified.
             * @param message FileOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FileOptions {

            /** OptimizeMode enum. */
            enum OptimizeMode {
                SPEED = 1,
                CODE_SIZE = 2,
                LITE_RUNTIME = 3
            }
        }

        /** Properties of a MessageOptions. */
        interface IMessageOptions {

            /** MessageOptions messageSetWireFormat */
            messageSetWireFormat?: (boolean|null);

            /** MessageOptions noStandardDescriptorAccessor */
            noStandardDescriptorAccessor?: (boolean|null);

            /** MessageOptions deprecated */
            deprecated?: (boolean|null);

            /** MessageOptions mapEntry */
            mapEntry?: (boolean|null);

            /** MessageOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a MessageOptions. */
        class MessageOptions implements IMessageOptions {

            /**
             * Constructs a new MessageOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMessageOptions);

            /** MessageOptions messageSetWireFormat. */
            public messageSetWireFormat: boolean;

            /** MessageOptions noStandardDescriptorAccessor. */
            public noStandardDescriptorAccessor: boolean;

            /** MessageOptions deprecated. */
            public deprecated: boolean;

            /** MessageOptions mapEntry. */
            public mapEntry: boolean;

            /** MessageOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new MessageOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MessageOptions instance
             */
            public static create(properties?: google.protobuf.IMessageOptions): google.protobuf.MessageOptions;

            /**
             * Encodes the specified MessageOptions message. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @param message MessageOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MessageOptions message, length delimited. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @param message MessageOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MessageOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;

            /**
             * Decodes a MessageOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions;

            /**
             * Verifies a MessageOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MessageOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MessageOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;

            /**
             * Creates a plain object from a MessageOptions message. Also converts values to other types if specified.
             * @param message MessageOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MessageOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FieldOptions. */
        interface IFieldOptions {

            /** FieldOptions ctype */
            ctype?: (google.protobuf.FieldOptions.CType|null);

            /** FieldOptions packed */
            packed?: (boolean|null);

            /** FieldOptions jstype */
            jstype?: (google.protobuf.FieldOptions.JSType|null);

            /** FieldOptions lazy */
            lazy?: (boolean|null);

            /** FieldOptions deprecated */
            deprecated?: (boolean|null);

            /** FieldOptions weak */
            weak?: (boolean|null);

            /** FieldOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a FieldOptions. */
        class FieldOptions implements IFieldOptions {

            /**
             * Constructs a new FieldOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldOptions);

            /** FieldOptions ctype. */
            public ctype: google.protobuf.FieldOptions.CType;

            /** FieldOptions packed. */
            public packed: boolean;

            /** FieldOptions jstype. */
            public jstype: google.protobuf.FieldOptions.JSType;

            /** FieldOptions lazy. */
            public lazy: boolean;

            /** FieldOptions deprecated. */
            public deprecated: boolean;

            /** FieldOptions weak. */
            public weak: boolean;

            /** FieldOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new FieldOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FieldOptions instance
             */
            public static create(properties?: google.protobuf.IFieldOptions): google.protobuf.FieldOptions;

            /**
             * Encodes the specified FieldOptions message. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @param message FieldOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FieldOptions message, length delimited. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @param message FieldOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FieldOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;

            /**
             * Decodes a FieldOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions;

            /**
             * Verifies a FieldOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FieldOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions;

            /**
             * Creates a plain object from a FieldOptions message. Also converts values to other types if specified.
             * @param message FieldOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldOptions {

            /** CType enum. */
            enum CType {
                STRING = 0,
                CORD = 1,
                STRING_PIECE = 2
            }

            /** JSType enum. */
            enum JSType {
                JS_NORMAL = 0,
                JS_STRING = 1,
                JS_NUMBER = 2
            }
        }

        /** Properties of an OneofOptions. */
        interface IOneofOptions {

            /** OneofOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an OneofOptions. */
        class OneofOptions implements IOneofOptions {

            /**
             * Constructs a new OneofOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofOptions);

            /** OneofOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new OneofOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OneofOptions instance
             */
            public static create(properties?: google.protobuf.IOneofOptions): google.protobuf.OneofOptions;

            /**
             * Encodes the specified OneofOptions message. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @param message OneofOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OneofOptions message, length delimited. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @param message OneofOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OneofOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;

            /**
             * Decodes an OneofOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions;

            /**
             * Verifies an OneofOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OneofOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;

            /**
             * Creates a plain object from an OneofOptions message. Also converts values to other types if specified.
             * @param message OneofOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumOptions. */
        interface IEnumOptions {

            /** EnumOptions allowAlias */
            allowAlias?: (boolean|null);

            /** EnumOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an EnumOptions. */
        class EnumOptions implements IEnumOptions {

            /**
             * Constructs a new EnumOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumOptions);

            /** EnumOptions allowAlias. */
            public allowAlias: boolean;

            /** EnumOptions deprecated. */
            public deprecated: boolean;

            /** EnumOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new EnumOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumOptions instance
             */
            public static create(properties?: google.protobuf.IEnumOptions): google.protobuf.EnumOptions;

            /**
             * Encodes the specified EnumOptions message. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @param message EnumOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @param message EnumOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;

            /**
             * Decodes an EnumOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions;

            /**
             * Verifies an EnumOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;

            /**
             * Creates a plain object from an EnumOptions message. Also converts values to other types if specified.
             * @param message EnumOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumValueOptions. */
        interface IEnumValueOptions {

            /** EnumValueOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumValueOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an EnumValueOptions. */
        class EnumValueOptions implements IEnumValueOptions {

            /**
             * Constructs a new EnumValueOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueOptions);

            /** EnumValueOptions deprecated. */
            public deprecated: boolean;

            /** EnumValueOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new EnumValueOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumValueOptions instance
             */
            public static create(properties?: google.protobuf.IEnumValueOptions): google.protobuf.EnumValueOptions;

            /**
             * Encodes the specified EnumValueOptions message. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @param message EnumValueOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumValueOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @param message EnumValueOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions;

            /**
             * Verifies an EnumValueOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumValueOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;

            /**
             * Creates a plain object from an EnumValueOptions message. Also converts values to other types if specified.
             * @param message EnumValueOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceOptions. */
        interface IServiceOptions {

            /** ServiceOptions deprecated */
            deprecated?: (boolean|null);

            /** ServiceOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a ServiceOptions. */
        class ServiceOptions implements IServiceOptions {

            /**
             * Constructs a new ServiceOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceOptions);

            /** ServiceOptions deprecated. */
            public deprecated: boolean;

            /** ServiceOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new ServiceOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServiceOptions instance
             */
            public static create(properties?: google.protobuf.IServiceOptions): google.protobuf.ServiceOptions;

            /**
             * Encodes the specified ServiceOptions message. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @param message ServiceOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceOptions message, length delimited. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @param message ServiceOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions;

            /**
             * Verifies a ServiceOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;

            /**
             * Creates a plain object from a ServiceOptions message. Also converts values to other types if specified.
             * @param message ServiceOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodOptions. */
        interface IMethodOptions {

            /** MethodOptions deprecated */
            deprecated?: (boolean|null);

            /** MethodOptions idempotencyLevel */
            idempotencyLevel?: (google.protobuf.MethodOptions.IdempotencyLevel|null);

            /** MethodOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** MethodOptions .google.api.http */
            ".google.api.http"?: (google.api.IHttpRule|null);
        }

        /** Represents a MethodOptions. */
        class MethodOptions implements IMethodOptions {

            /**
             * Constructs a new MethodOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodOptions);

            /** MethodOptions deprecated. */
            public deprecated: boolean;

            /** MethodOptions idempotencyLevel. */
            public idempotencyLevel: google.protobuf.MethodOptions.IdempotencyLevel;

            /** MethodOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new MethodOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MethodOptions instance
             */
            public static create(properties?: google.protobuf.IMethodOptions): google.protobuf.MethodOptions;

            /**
             * Encodes the specified MethodOptions message. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @param message MethodOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodOptions message, length delimited. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @param message MethodOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;

            /**
             * Decodes a MethodOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions;

            /**
             * Verifies a MethodOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodOptions;

            /**
             * Creates a plain object from a MethodOptions message. Also converts values to other types if specified.
             * @param message MethodOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace MethodOptions {

            /** IdempotencyLevel enum. */
            enum IdempotencyLevel {
                IDEMPOTENCY_UNKNOWN = 0,
                NO_SIDE_EFFECTS = 1,
                IDEMPOTENT = 2
            }
        }

        /** Properties of an UninterpretedOption. */
        interface IUninterpretedOption {

            /** UninterpretedOption name */
            name?: (google.protobuf.UninterpretedOption.INamePart[]|null);

            /** UninterpretedOption identifierValue */
            identifierValue?: (string|null);

            /** UninterpretedOption positiveIntValue */
            positiveIntValue?: (number|Long|null);

            /** UninterpretedOption negativeIntValue */
            negativeIntValue?: (number|Long|null);

            /** UninterpretedOption doubleValue */
            doubleValue?: (number|null);

            /** UninterpretedOption stringValue */
            stringValue?: (Uint8Array|null);

            /** UninterpretedOption aggregateValue */
            aggregateValue?: (string|null);
        }

        /** Represents an UninterpretedOption. */
        class UninterpretedOption implements IUninterpretedOption {

            /**
             * Constructs a new UninterpretedOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUninterpretedOption);

            /** UninterpretedOption name. */
            public name: google.protobuf.UninterpretedOption.INamePart[];

            /** UninterpretedOption identifierValue. */
            public identifierValue: string;

            /** UninterpretedOption positiveIntValue. */
            public positiveIntValue: (number|Long);

            /** UninterpretedOption negativeIntValue. */
            public negativeIntValue: (number|Long);

            /** UninterpretedOption doubleValue. */
            public doubleValue: number;

            /** UninterpretedOption stringValue. */
            public stringValue: Uint8Array;

            /** UninterpretedOption aggregateValue. */
            public aggregateValue: string;

            /**
             * Creates a new UninterpretedOption instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UninterpretedOption instance
             */
            public static create(properties?: google.protobuf.IUninterpretedOption): google.protobuf.UninterpretedOption;

            /**
             * Encodes the specified UninterpretedOption message. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @param message UninterpretedOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UninterpretedOption message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @param message UninterpretedOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption;

            /**
             * Verifies an UninterpretedOption message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UninterpretedOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UninterpretedOption
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;

            /**
             * Creates a plain object from an UninterpretedOption message. Also converts values to other types if specified.
             * @param message UninterpretedOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UninterpretedOption to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace UninterpretedOption {

            /** Properties of a NamePart. */
            interface INamePart {

                /** NamePart namePart */
                namePart: string;

                /** NamePart isExtension */
                isExtension: boolean;
            }

            /** Represents a NamePart. */
            class NamePart implements INamePart {

                /**
                 * Constructs a new NamePart.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.UninterpretedOption.INamePart);

                /** NamePart namePart. */
                public namePart: string;

                /** NamePart isExtension. */
                public isExtension: boolean;

                /**
                 * Creates a new NamePart instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NamePart instance
                 */
                public static create(properties?: google.protobuf.UninterpretedOption.INamePart): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Encodes the specified NamePart message. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @param message NamePart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NamePart message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @param message NamePart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NamePart message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Decodes a NamePart message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Verifies a NamePart message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NamePart message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NamePart
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Creates a plain object from a NamePart message. Also converts values to other types if specified.
                 * @param message NamePart
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NamePart to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a SourceCodeInfo. */
        interface ISourceCodeInfo {

            /** SourceCodeInfo location */
            location?: (google.protobuf.SourceCodeInfo.ILocation[]|null);
        }

        /** Represents a SourceCodeInfo. */
        class SourceCodeInfo implements ISourceCodeInfo {

            /**
             * Constructs a new SourceCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ISourceCodeInfo);

            /** SourceCodeInfo location. */
            public location: google.protobuf.SourceCodeInfo.ILocation[];

            /**
             * Creates a new SourceCodeInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SourceCodeInfo instance
             */
            public static create(properties?: google.protobuf.ISourceCodeInfo): google.protobuf.SourceCodeInfo;

            /**
             * Encodes the specified SourceCodeInfo message. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @param message SourceCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SourceCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @param message SourceCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo;

            /**
             * Verifies a SourceCodeInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SourceCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SourceCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;

            /**
             * Creates a plain object from a SourceCodeInfo message. Also converts values to other types if specified.
             * @param message SourceCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SourceCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace SourceCodeInfo {

            /** Properties of a Location. */
            interface ILocation {

                /** Location path */
                path?: (number[]|null);

                /** Location span */
                span?: (number[]|null);

                /** Location leadingComments */
                leadingComments?: (string|null);

                /** Location trailingComments */
                trailingComments?: (string|null);

                /** Location leadingDetachedComments */
                leadingDetachedComments?: (string[]|null);
            }

            /** Represents a Location. */
            class Location implements ILocation {

                /**
                 * Constructs a new Location.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);

                /** Location path. */
                public path: number[];

                /** Location span. */
                public span: number[];

                /** Location leadingComments. */
                public leadingComments: string;

                /** Location trailingComments. */
                public trailingComments: string;

                /** Location leadingDetachedComments. */
                public leadingDetachedComments: string[];

                /**
                 * Creates a new Location instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Location instance
                 */
                public static create(properties?: google.protobuf.SourceCodeInfo.ILocation): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Encodes the specified Location message. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Location message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Location message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Decodes a Location message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Verifies a Location message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Location message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Location
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Creates a plain object from a Location message. Also converts values to other types if specified.
                 * @param message Location
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Location to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a GeneratedCodeInfo. */
        interface IGeneratedCodeInfo {

            /** GeneratedCodeInfo annotation */
            annotation?: (google.protobuf.GeneratedCodeInfo.IAnnotation[]|null);
        }

        /** Represents a GeneratedCodeInfo. */
        class GeneratedCodeInfo implements IGeneratedCodeInfo {

            /**
             * Constructs a new GeneratedCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IGeneratedCodeInfo);

            /** GeneratedCodeInfo annotation. */
            public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];

            /**
             * Creates a new GeneratedCodeInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GeneratedCodeInfo instance
             */
            public static create(properties?: google.protobuf.IGeneratedCodeInfo): google.protobuf.GeneratedCodeInfo;

            /**
             * Encodes the specified GeneratedCodeInfo message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @param message GeneratedCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GeneratedCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @param message GeneratedCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;

            /**
             * Verifies a GeneratedCodeInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GeneratedCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GeneratedCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;

            /**
             * Creates a plain object from a GeneratedCodeInfo message. Also converts values to other types if specified.
             * @param message GeneratedCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GeneratedCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace GeneratedCodeInfo {

            /** Properties of an Annotation. */
            interface IAnnotation {

                /** Annotation path */
                path?: (number[]|null);

                /** Annotation sourceFile */
                sourceFile?: (string|null);

                /** Annotation begin */
                begin?: (number|null);

                /** Annotation end */
                end?: (number|null);
            }

            /** Represents an Annotation. */
            class Annotation implements IAnnotation {

                /**
                 * Constructs a new Annotation.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);

                /** Annotation path. */
                public path: number[];

                /** Annotation sourceFile. */
                public sourceFile: string;

                /** Annotation begin. */
                public begin: number;

                /** Annotation end. */
                public end: number;

                /**
                 * Creates a new Annotation instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Annotation instance
                 */
                public static create(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Encodes the specified Annotation message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @param message Annotation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Annotation message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @param message Annotation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Annotation message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Decodes an Annotation message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Verifies an Annotation message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Annotation message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Annotation
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Creates a plain object from an Annotation message. Also converts values to other types if specified.
                 * @param message Annotation
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Annotation to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a DoubleValue. */
        interface IDoubleValue {

            /** DoubleValue value */
            value?: (number|null);
        }

        /** Represents a DoubleValue. */
        class DoubleValue implements IDoubleValue {

            /**
             * Constructs a new DoubleValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDoubleValue);

            /** DoubleValue value. */
            public value: number;

            /**
             * Creates a new DoubleValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DoubleValue instance
             */
            public static create(properties?: google.protobuf.IDoubleValue): google.protobuf.DoubleValue;

            /**
             * Encodes the specified DoubleValue message. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @param message DoubleValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DoubleValue message, length delimited. Does not implicitly {@link google.protobuf.DoubleValue.verify|verify} messages.
             * @param message DoubleValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDoubleValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DoubleValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DoubleValue;

            /**
             * Decodes a DoubleValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DoubleValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DoubleValue;

            /**
             * Verifies a DoubleValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DoubleValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DoubleValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.DoubleValue;

            /**
             * Creates a plain object from a DoubleValue message. Also converts values to other types if specified.
             * @param message DoubleValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.DoubleValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DoubleValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FloatValue. */
        interface IFloatValue {

            /** FloatValue value */
            value?: (number|null);
        }

        /** Represents a FloatValue. */
        class FloatValue implements IFloatValue {

            /**
             * Constructs a new FloatValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFloatValue);

            /** FloatValue value. */
            public value: number;

            /**
             * Creates a new FloatValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FloatValue instance
             */
            public static create(properties?: google.protobuf.IFloatValue): google.protobuf.FloatValue;

            /**
             * Encodes the specified FloatValue message. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @param message FloatValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFloatValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FloatValue message, length delimited. Does not implicitly {@link google.protobuf.FloatValue.verify|verify} messages.
             * @param message FloatValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFloatValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FloatValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FloatValue;

            /**
             * Decodes a FloatValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FloatValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FloatValue;

            /**
             * Verifies a FloatValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FloatValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FloatValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FloatValue;

            /**
             * Creates a plain object from a FloatValue message. Also converts values to other types if specified.
             * @param message FloatValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FloatValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FloatValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Int64Value. */
        interface IInt64Value {

            /** Int64Value value */
            value?: (number|Long|null);
        }

        /** Represents an Int64Value. */
        class Int64Value implements IInt64Value {

            /**
             * Constructs a new Int64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt64Value);

            /** Int64Value value. */
            public value: (number|Long);

            /**
             * Creates a new Int64Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Int64Value instance
             */
            public static create(properties?: google.protobuf.IInt64Value): google.protobuf.Int64Value;

            /**
             * Encodes the specified Int64Value message. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @param message Int64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Int64Value message, length delimited. Does not implicitly {@link google.protobuf.Int64Value.verify|verify} messages.
             * @param message Int64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Int64Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int64Value;

            /**
             * Decodes an Int64Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Int64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int64Value;

            /**
             * Verifies an Int64Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Int64Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Int64Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int64Value;

            /**
             * Creates a plain object from an Int64Value message. Also converts values to other types if specified.
             * @param message Int64Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Int64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Int64Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a UInt64Value. */
        interface IUInt64Value {

            /** UInt64Value value */
            value?: (number|Long|null);
        }

        /** Represents a UInt64Value. */
        class UInt64Value implements IUInt64Value {

            /**
             * Constructs a new UInt64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt64Value);

            /** UInt64Value value. */
            public value: (number|Long);

            /**
             * Creates a new UInt64Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UInt64Value instance
             */
            public static create(properties?: google.protobuf.IUInt64Value): google.protobuf.UInt64Value;

            /**
             * Encodes the specified UInt64Value message. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @param message UInt64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UInt64Value message, length delimited. Does not implicitly {@link google.protobuf.UInt64Value.verify|verify} messages.
             * @param message UInt64Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUInt64Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UInt64Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt64Value;

            /**
             * Decodes a UInt64Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UInt64Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt64Value;

            /**
             * Verifies a UInt64Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UInt64Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UInt64Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt64Value;

            /**
             * Creates a plain object from a UInt64Value message. Also converts values to other types if specified.
             * @param message UInt64Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UInt64Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UInt64Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Int32Value. */
        interface IInt32Value {

            /** Int32Value value */
            value?: (number|null);
        }

        /** Represents an Int32Value. */
        class Int32Value implements IInt32Value {

            /**
             * Constructs a new Int32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt32Value);

            /** Int32Value value. */
            public value: number;

            /**
             * Creates a new Int32Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Int32Value instance
             */
            public static create(properties?: google.protobuf.IInt32Value): google.protobuf.Int32Value;

            /**
             * Encodes the specified Int32Value message. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @param message Int32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Int32Value message, length delimited. Does not implicitly {@link google.protobuf.Int32Value.verify|verify} messages.
             * @param message Int32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Int32Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Int32Value;

            /**
             * Decodes an Int32Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Int32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Int32Value;

            /**
             * Verifies an Int32Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Int32Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Int32Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Int32Value;

            /**
             * Creates a plain object from an Int32Value message. Also converts values to other types if specified.
             * @param message Int32Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Int32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Int32Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a UInt32Value. */
        interface IUInt32Value {

            /** UInt32Value value */
            value?: (number|null);
        }

        /** Represents a UInt32Value. */
        class UInt32Value implements IUInt32Value {

            /**
             * Constructs a new UInt32Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt32Value);

            /** UInt32Value value. */
            public value: number;

            /**
             * Creates a new UInt32Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UInt32Value instance
             */
            public static create(properties?: google.protobuf.IUInt32Value): google.protobuf.UInt32Value;

            /**
             * Encodes the specified UInt32Value message. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @param message UInt32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UInt32Value message, length delimited. Does not implicitly {@link google.protobuf.UInt32Value.verify|verify} messages.
             * @param message UInt32Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUInt32Value, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UInt32Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UInt32Value;

            /**
             * Decodes a UInt32Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UInt32Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UInt32Value;

            /**
             * Verifies a UInt32Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UInt32Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UInt32Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UInt32Value;

            /**
             * Creates a plain object from a UInt32Value message. Also converts values to other types if specified.
             * @param message UInt32Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UInt32Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UInt32Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BoolValue. */
        interface IBoolValue {

            /** BoolValue value */
            value?: (boolean|null);
        }

        /** Represents a BoolValue. */
        class BoolValue implements IBoolValue {

            /**
             * Constructs a new BoolValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBoolValue);

            /** BoolValue value. */
            public value: boolean;

            /**
             * Creates a new BoolValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BoolValue instance
             */
            public static create(properties?: google.protobuf.IBoolValue): google.protobuf.BoolValue;

            /**
             * Encodes the specified BoolValue message. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @param message BoolValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IBoolValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BoolValue message, length delimited. Does not implicitly {@link google.protobuf.BoolValue.verify|verify} messages.
             * @param message BoolValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IBoolValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BoolValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BoolValue;

            /**
             * Decodes a BoolValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BoolValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BoolValue;

            /**
             * Verifies a BoolValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BoolValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BoolValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.BoolValue;

            /**
             * Creates a plain object from a BoolValue message. Also converts values to other types if specified.
             * @param message BoolValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.BoolValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BoolValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a StringValue. */
        interface IStringValue {

            /** StringValue value */
            value?: (string|null);
        }

        /** Represents a StringValue. */
        class StringValue implements IStringValue {

            /**
             * Constructs a new StringValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IStringValue);

            /** StringValue value. */
            public value: string;

            /**
             * Creates a new StringValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StringValue instance
             */
            public static create(properties?: google.protobuf.IStringValue): google.protobuf.StringValue;

            /**
             * Encodes the specified StringValue message. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @param message StringValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StringValue message, length delimited. Does not implicitly {@link google.protobuf.StringValue.verify|verify} messages.
             * @param message StringValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IStringValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StringValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.StringValue;

            /**
             * Decodes a StringValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StringValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.StringValue;

            /**
             * Verifies a StringValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StringValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StringValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.StringValue;

            /**
             * Creates a plain object from a StringValue message. Also converts values to other types if specified.
             * @param message StringValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.StringValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StringValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BytesValue. */
        interface IBytesValue {

            /** BytesValue value */
            value?: (Uint8Array|null);
        }

        /** Represents a BytesValue. */
        class BytesValue implements IBytesValue {

            /**
             * Constructs a new BytesValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBytesValue);

            /** BytesValue value. */
            public value: Uint8Array;

            /**
             * Creates a new BytesValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BytesValue instance
             */
            public static create(properties?: google.protobuf.IBytesValue): google.protobuf.BytesValue;

            /**
             * Encodes the specified BytesValue message. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @param message BytesValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IBytesValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BytesValue message, length delimited. Does not implicitly {@link google.protobuf.BytesValue.verify|verify} messages.
             * @param message BytesValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IBytesValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BytesValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.BytesValue;

            /**
             * Decodes a BytesValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BytesValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.BytesValue;

            /**
             * Verifies a BytesValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BytesValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BytesValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.BytesValue;

            /**
             * Creates a plain object from a BytesValue message. Also converts values to other types if specified.
             * @param message BytesValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.BytesValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BytesValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace rpc. */
    namespace rpc {

        /** Properties of a Status. */
        interface IStatus {

            /** Status code */
            code?: (number|null);

            /** Status message */
            message?: (string|null);

            /** Status details */
            details?: (google.protobuf.IAny[]|null);
        }

        /** Represents a Status. */
        class Status implements IStatus {

            /**
             * Constructs a new Status.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.rpc.IStatus);

            /** Status code. */
            public code: number;

            /** Status message. */
            public message: string;

            /** Status details. */
            public details: google.protobuf.IAny[];

            /**
             * Creates a new Status instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Status instance
             */
            public static create(properties?: google.rpc.IStatus): google.rpc.Status;

            /**
             * Encodes the specified Status message. Does not implicitly {@link google.rpc.Status.verify|verify} messages.
             * @param message Status message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.rpc.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Status message, length delimited. Does not implicitly {@link google.rpc.Status.verify|verify} messages.
             * @param message Status message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.rpc.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Status message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.rpc.Status;

            /**
             * Decodes a Status message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.rpc.Status;

            /**
             * Verifies a Status message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Status message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Status
             */
            public static fromObject(object: { [k: string]: any }): google.rpc.Status;

            /**
             * Creates a plain object from a Status message. Also converts values to other types if specified.
             * @param message Status
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.rpc.Status, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Status to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
