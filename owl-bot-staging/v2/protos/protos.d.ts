// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type {protobuf as $protobuf} from "google-gax";
import Long = require("long");
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
                 * Calls PingAndWarm.
                 * @param request PingAndWarmRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and PingAndWarmResponse
                 */
                public pingAndWarm(request: google.bigtable.v2.IPingAndWarmRequest, callback: google.bigtable.v2.Bigtable.PingAndWarmCallback): void;

                /**
                 * Calls PingAndWarm.
                 * @param request PingAndWarmRequest message or plain object
                 * @returns Promise
                 */
                public pingAndWarm(request: google.bigtable.v2.IPingAndWarmRequest): Promise<google.bigtable.v2.PingAndWarmResponse>;

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

                /**
                 * Calls GenerateInitialChangeStreamPartitions.
                 * @param request GenerateInitialChangeStreamPartitionsRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and GenerateInitialChangeStreamPartitionsResponse
                 */
                public generateInitialChangeStreamPartitions(request: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsRequest, callback: google.bigtable.v2.Bigtable.GenerateInitialChangeStreamPartitionsCallback): void;

                /**
                 * Calls GenerateInitialChangeStreamPartitions.
                 * @param request GenerateInitialChangeStreamPartitionsRequest message or plain object
                 * @returns Promise
                 */
                public generateInitialChangeStreamPartitions(request: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsRequest): Promise<google.bigtable.v2.GenerateInitialChangeStreamPartitionsResponse>;

                /**
                 * Calls ReadChangeStream.
                 * @param request ReadChangeStreamRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and ReadChangeStreamResponse
                 */
                public readChangeStream(request: google.bigtable.v2.IReadChangeStreamRequest, callback: google.bigtable.v2.Bigtable.ReadChangeStreamCallback): void;

                /**
                 * Calls ReadChangeStream.
                 * @param request ReadChangeStreamRequest message or plain object
                 * @returns Promise
                 */
                public readChangeStream(request: google.bigtable.v2.IReadChangeStreamRequest): Promise<google.bigtable.v2.ReadChangeStreamResponse>;
            }

            namespace Bigtable {

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable|readRows}.
                 * @param error Error, if any
                 * @param [response] ReadRowsResponse
                 */
                type ReadRowsCallback = (error: (Error|null), response?: google.bigtable.v2.ReadRowsResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable|sampleRowKeys}.
                 * @param error Error, if any
                 * @param [response] SampleRowKeysResponse
                 */
                type SampleRowKeysCallback = (error: (Error|null), response?: google.bigtable.v2.SampleRowKeysResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable|mutateRow}.
                 * @param error Error, if any
                 * @param [response] MutateRowResponse
                 */
                type MutateRowCallback = (error: (Error|null), response?: google.bigtable.v2.MutateRowResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable|mutateRows}.
                 * @param error Error, if any
                 * @param [response] MutateRowsResponse
                 */
                type MutateRowsCallback = (error: (Error|null), response?: google.bigtable.v2.MutateRowsResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable|checkAndMutateRow}.
                 * @param error Error, if any
                 * @param [response] CheckAndMutateRowResponse
                 */
                type CheckAndMutateRowCallback = (error: (Error|null), response?: google.bigtable.v2.CheckAndMutateRowResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable|pingAndWarm}.
                 * @param error Error, if any
                 * @param [response] PingAndWarmResponse
                 */
                type PingAndWarmCallback = (error: (Error|null), response?: google.bigtable.v2.PingAndWarmResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable|readModifyWriteRow}.
                 * @param error Error, if any
                 * @param [response] ReadModifyWriteRowResponse
                 */
                type ReadModifyWriteRowCallback = (error: (Error|null), response?: google.bigtable.v2.ReadModifyWriteRowResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable|generateInitialChangeStreamPartitions}.
                 * @param error Error, if any
                 * @param [response] GenerateInitialChangeStreamPartitionsResponse
                 */
                type GenerateInitialChangeStreamPartitionsCallback = (error: (Error|null), response?: google.bigtable.v2.GenerateInitialChangeStreamPartitionsResponse) => void;

                /**
                 * Callback as used by {@link google.bigtable.v2.Bigtable|readChangeStream}.
                 * @param error Error, if any
                 * @param [response] ReadChangeStreamResponse
                 */
                type ReadChangeStreamCallback = (error: (Error|null), response?: google.bigtable.v2.ReadChangeStreamResponse) => void;
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
                rowsLimit?: (number|Long|string|null);

                /** ReadRowsRequest requestStatsView */
                requestStatsView?: (google.bigtable.v2.ReadRowsRequest.RequestStatsView|keyof typeof google.bigtable.v2.ReadRowsRequest.RequestStatsView|null);

                /** ReadRowsRequest reversed */
                reversed?: (boolean|null);
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
                public rowsLimit: (number|Long|string);

                /** ReadRowsRequest requestStatsView. */
                public requestStatsView: (google.bigtable.v2.ReadRowsRequest.RequestStatsView|keyof typeof google.bigtable.v2.ReadRowsRequest.RequestStatsView);

                /** ReadRowsRequest reversed. */
                public reversed: boolean;

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

                /**
                 * Gets the default type url for ReadRowsRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace ReadRowsRequest {

                /** RequestStatsView enum. */
                enum RequestStatsView {
                    REQUEST_STATS_VIEW_UNSPECIFIED = 0,
                    REQUEST_STATS_NONE = 1,
                    REQUEST_STATS_FULL = 2
                }
            }

            /** Properties of a ReadRowsResponse. */
            interface IReadRowsResponse {

                /** ReadRowsResponse chunks */
                chunks?: (google.bigtable.v2.ReadRowsResponse.ICellChunk[]|null);

                /** ReadRowsResponse lastScannedRowKey */
                lastScannedRowKey?: (Uint8Array|string|null);

                /** ReadRowsResponse requestStats */
                requestStats?: (google.bigtable.v2.IRequestStats|null);
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
                public lastScannedRowKey: (Uint8Array|string);

                /** ReadRowsResponse requestStats. */
                public requestStats?: (google.bigtable.v2.IRequestStats|null);

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

                /**
                 * Gets the default type url for ReadRowsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace ReadRowsResponse {

                /** Properties of a CellChunk. */
                interface ICellChunk {

                    /** CellChunk rowKey */
                    rowKey?: (Uint8Array|string|null);

                    /** CellChunk familyName */
                    familyName?: (google.protobuf.IStringValue|null);

                    /** CellChunk qualifier */
                    qualifier?: (google.protobuf.IBytesValue|null);

                    /** CellChunk timestampMicros */
                    timestampMicros?: (number|Long|string|null);

                    /** CellChunk labels */
                    labels?: (string[]|null);

                    /** CellChunk value */
                    value?: (Uint8Array|string|null);

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
                    public rowKey: (Uint8Array|string);

                    /** CellChunk familyName. */
                    public familyName?: (google.protobuf.IStringValue|null);

                    /** CellChunk qualifier. */
                    public qualifier?: (google.protobuf.IBytesValue|null);

                    /** CellChunk timestampMicros. */
                    public timestampMicros: (number|Long|string);

                    /** CellChunk labels. */
                    public labels: string[];

                    /** CellChunk value. */
                    public value: (Uint8Array|string);

                    /** CellChunk valueSize. */
                    public valueSize: number;

                    /** CellChunk resetRow. */
                    public resetRow?: (boolean|null);

                    /** CellChunk commitRow. */
                    public commitRow?: (boolean|null);

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

                    /**
                     * Gets the default type url for CellChunk
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for SampleRowKeysRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a SampleRowKeysResponse. */
            interface ISampleRowKeysResponse {

                /** SampleRowKeysResponse rowKey */
                rowKey?: (Uint8Array|string|null);

                /** SampleRowKeysResponse offsetBytes */
                offsetBytes?: (number|Long|string|null);
            }

            /** Represents a SampleRowKeysResponse. */
            class SampleRowKeysResponse implements ISampleRowKeysResponse {

                /**
                 * Constructs a new SampleRowKeysResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.ISampleRowKeysResponse);

                /** SampleRowKeysResponse rowKey. */
                public rowKey: (Uint8Array|string);

                /** SampleRowKeysResponse offsetBytes. */
                public offsetBytes: (number|Long|string);

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

                /**
                 * Gets the default type url for SampleRowKeysResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a MutateRowRequest. */
            interface IMutateRowRequest {

                /** MutateRowRequest tableName */
                tableName?: (string|null);

                /** MutateRowRequest appProfileId */
                appProfileId?: (string|null);

                /** MutateRowRequest rowKey */
                rowKey?: (Uint8Array|string|null);

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
                public rowKey: (Uint8Array|string);

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

                /**
                 * Gets the default type url for MutateRowRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for MutateRowResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for MutateRowsRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace MutateRowsRequest {

                /** Properties of an Entry. */
                interface IEntry {

                    /** Entry rowKey */
                    rowKey?: (Uint8Array|string|null);

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
                    public rowKey: (Uint8Array|string);

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

                    /**
                     * Gets the default type url for Entry
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            /** Properties of a MutateRowsResponse. */
            interface IMutateRowsResponse {

                /** MutateRowsResponse entries */
                entries?: (google.bigtable.v2.MutateRowsResponse.IEntry[]|null);

                /** MutateRowsResponse rateLimitInfo */
                rateLimitInfo?: (google.bigtable.v2.IRateLimitInfo|null);
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

                /** MutateRowsResponse rateLimitInfo. */
                public rateLimitInfo?: (google.bigtable.v2.IRateLimitInfo|null);

                /** MutateRowsResponse _rateLimitInfo. */
                public _rateLimitInfo?: "rateLimitInfo";

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

                /**
                 * Gets the default type url for MutateRowsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace MutateRowsResponse {

                /** Properties of an Entry. */
                interface IEntry {

                    /** Entry index */
                    index?: (number|Long|string|null);

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
                    public index: (number|Long|string);

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

                    /**
                     * Gets the default type url for Entry
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            /** Properties of a RateLimitInfo. */
            interface IRateLimitInfo {

                /** RateLimitInfo period */
                period?: (google.protobuf.IDuration|null);

                /** RateLimitInfo factor */
                factor?: (number|null);
            }

            /** Represents a RateLimitInfo. */
            class RateLimitInfo implements IRateLimitInfo {

                /**
                 * Constructs a new RateLimitInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IRateLimitInfo);

                /** RateLimitInfo period. */
                public period?: (google.protobuf.IDuration|null);

                /** RateLimitInfo factor. */
                public factor: number;

                /**
                 * Creates a new RateLimitInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RateLimitInfo instance
                 */
                public static create(properties?: google.bigtable.v2.IRateLimitInfo): google.bigtable.v2.RateLimitInfo;

                /**
                 * Encodes the specified RateLimitInfo message. Does not implicitly {@link google.bigtable.v2.RateLimitInfo.verify|verify} messages.
                 * @param message RateLimitInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IRateLimitInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RateLimitInfo message, length delimited. Does not implicitly {@link google.bigtable.v2.RateLimitInfo.verify|verify} messages.
                 * @param message RateLimitInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IRateLimitInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RateLimitInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RateLimitInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.RateLimitInfo;

                /**
                 * Decodes a RateLimitInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RateLimitInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.RateLimitInfo;

                /**
                 * Verifies a RateLimitInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RateLimitInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RateLimitInfo
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.RateLimitInfo;

                /**
                 * Creates a plain object from a RateLimitInfo message. Also converts values to other types if specified.
                 * @param message RateLimitInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.RateLimitInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RateLimitInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RateLimitInfo
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a CheckAndMutateRowRequest. */
            interface ICheckAndMutateRowRequest {

                /** CheckAndMutateRowRequest tableName */
                tableName?: (string|null);

                /** CheckAndMutateRowRequest appProfileId */
                appProfileId?: (string|null);

                /** CheckAndMutateRowRequest rowKey */
                rowKey?: (Uint8Array|string|null);

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
                public rowKey: (Uint8Array|string);

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

                /**
                 * Gets the default type url for CheckAndMutateRowRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for CheckAndMutateRowResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a PingAndWarmRequest. */
            interface IPingAndWarmRequest {

                /** PingAndWarmRequest name */
                name?: (string|null);

                /** PingAndWarmRequest appProfileId */
                appProfileId?: (string|null);
            }

            /** Represents a PingAndWarmRequest. */
            class PingAndWarmRequest implements IPingAndWarmRequest {

                /**
                 * Constructs a new PingAndWarmRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IPingAndWarmRequest);

                /** PingAndWarmRequest name. */
                public name: string;

                /** PingAndWarmRequest appProfileId. */
                public appProfileId: string;

                /**
                 * Creates a new PingAndWarmRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PingAndWarmRequest instance
                 */
                public static create(properties?: google.bigtable.v2.IPingAndWarmRequest): google.bigtable.v2.PingAndWarmRequest;

                /**
                 * Encodes the specified PingAndWarmRequest message. Does not implicitly {@link google.bigtable.v2.PingAndWarmRequest.verify|verify} messages.
                 * @param message PingAndWarmRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IPingAndWarmRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PingAndWarmRequest message, length delimited. Does not implicitly {@link google.bigtable.v2.PingAndWarmRequest.verify|verify} messages.
                 * @param message PingAndWarmRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IPingAndWarmRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PingAndWarmRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PingAndWarmRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.PingAndWarmRequest;

                /**
                 * Decodes a PingAndWarmRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PingAndWarmRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.PingAndWarmRequest;

                /**
                 * Verifies a PingAndWarmRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PingAndWarmRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PingAndWarmRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.PingAndWarmRequest;

                /**
                 * Creates a plain object from a PingAndWarmRequest message. Also converts values to other types if specified.
                 * @param message PingAndWarmRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.PingAndWarmRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PingAndWarmRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PingAndWarmRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a PingAndWarmResponse. */
            interface IPingAndWarmResponse {
            }

            /** Represents a PingAndWarmResponse. */
            class PingAndWarmResponse implements IPingAndWarmResponse {

                /**
                 * Constructs a new PingAndWarmResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IPingAndWarmResponse);

                /**
                 * Creates a new PingAndWarmResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PingAndWarmResponse instance
                 */
                public static create(properties?: google.bigtable.v2.IPingAndWarmResponse): google.bigtable.v2.PingAndWarmResponse;

                /**
                 * Encodes the specified PingAndWarmResponse message. Does not implicitly {@link google.bigtable.v2.PingAndWarmResponse.verify|verify} messages.
                 * @param message PingAndWarmResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IPingAndWarmResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PingAndWarmResponse message, length delimited. Does not implicitly {@link google.bigtable.v2.PingAndWarmResponse.verify|verify} messages.
                 * @param message PingAndWarmResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IPingAndWarmResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PingAndWarmResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PingAndWarmResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.PingAndWarmResponse;

                /**
                 * Decodes a PingAndWarmResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PingAndWarmResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.PingAndWarmResponse;

                /**
                 * Verifies a PingAndWarmResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PingAndWarmResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PingAndWarmResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.PingAndWarmResponse;

                /**
                 * Creates a plain object from a PingAndWarmResponse message. Also converts values to other types if specified.
                 * @param message PingAndWarmResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.PingAndWarmResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PingAndWarmResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PingAndWarmResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ReadModifyWriteRowRequest. */
            interface IReadModifyWriteRowRequest {

                /** ReadModifyWriteRowRequest tableName */
                tableName?: (string|null);

                /** ReadModifyWriteRowRequest appProfileId */
                appProfileId?: (string|null);

                /** ReadModifyWriteRowRequest rowKey */
                rowKey?: (Uint8Array|string|null);

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
                public rowKey: (Uint8Array|string);

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

                /**
                 * Gets the default type url for ReadModifyWriteRowRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for ReadModifyWriteRowResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GenerateInitialChangeStreamPartitionsRequest. */
            interface IGenerateInitialChangeStreamPartitionsRequest {

                /** GenerateInitialChangeStreamPartitionsRequest tableName */
                tableName?: (string|null);

                /** GenerateInitialChangeStreamPartitionsRequest appProfileId */
                appProfileId?: (string|null);
            }

            /** Represents a GenerateInitialChangeStreamPartitionsRequest. */
            class GenerateInitialChangeStreamPartitionsRequest implements IGenerateInitialChangeStreamPartitionsRequest {

                /**
                 * Constructs a new GenerateInitialChangeStreamPartitionsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsRequest);

                /** GenerateInitialChangeStreamPartitionsRequest tableName. */
                public tableName: string;

                /** GenerateInitialChangeStreamPartitionsRequest appProfileId. */
                public appProfileId: string;

                /**
                 * Creates a new GenerateInitialChangeStreamPartitionsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GenerateInitialChangeStreamPartitionsRequest instance
                 */
                public static create(properties?: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsRequest): google.bigtable.v2.GenerateInitialChangeStreamPartitionsRequest;

                /**
                 * Encodes the specified GenerateInitialChangeStreamPartitionsRequest message. Does not implicitly {@link google.bigtable.v2.GenerateInitialChangeStreamPartitionsRequest.verify|verify} messages.
                 * @param message GenerateInitialChangeStreamPartitionsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GenerateInitialChangeStreamPartitionsRequest message, length delimited. Does not implicitly {@link google.bigtable.v2.GenerateInitialChangeStreamPartitionsRequest.verify|verify} messages.
                 * @param message GenerateInitialChangeStreamPartitionsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GenerateInitialChangeStreamPartitionsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GenerateInitialChangeStreamPartitionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.GenerateInitialChangeStreamPartitionsRequest;

                /**
                 * Decodes a GenerateInitialChangeStreamPartitionsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GenerateInitialChangeStreamPartitionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.GenerateInitialChangeStreamPartitionsRequest;

                /**
                 * Verifies a GenerateInitialChangeStreamPartitionsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GenerateInitialChangeStreamPartitionsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GenerateInitialChangeStreamPartitionsRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.GenerateInitialChangeStreamPartitionsRequest;

                /**
                 * Creates a plain object from a GenerateInitialChangeStreamPartitionsRequest message. Also converts values to other types if specified.
                 * @param message GenerateInitialChangeStreamPartitionsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.GenerateInitialChangeStreamPartitionsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GenerateInitialChangeStreamPartitionsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GenerateInitialChangeStreamPartitionsRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GenerateInitialChangeStreamPartitionsResponse. */
            interface IGenerateInitialChangeStreamPartitionsResponse {

                /** GenerateInitialChangeStreamPartitionsResponse partition */
                partition?: (google.bigtable.v2.IStreamPartition|null);
            }

            /** Represents a GenerateInitialChangeStreamPartitionsResponse. */
            class GenerateInitialChangeStreamPartitionsResponse implements IGenerateInitialChangeStreamPartitionsResponse {

                /**
                 * Constructs a new GenerateInitialChangeStreamPartitionsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsResponse);

                /** GenerateInitialChangeStreamPartitionsResponse partition. */
                public partition?: (google.bigtable.v2.IStreamPartition|null);

                /**
                 * Creates a new GenerateInitialChangeStreamPartitionsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GenerateInitialChangeStreamPartitionsResponse instance
                 */
                public static create(properties?: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsResponse): google.bigtable.v2.GenerateInitialChangeStreamPartitionsResponse;

                /**
                 * Encodes the specified GenerateInitialChangeStreamPartitionsResponse message. Does not implicitly {@link google.bigtable.v2.GenerateInitialChangeStreamPartitionsResponse.verify|verify} messages.
                 * @param message GenerateInitialChangeStreamPartitionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GenerateInitialChangeStreamPartitionsResponse message, length delimited. Does not implicitly {@link google.bigtable.v2.GenerateInitialChangeStreamPartitionsResponse.verify|verify} messages.
                 * @param message GenerateInitialChangeStreamPartitionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IGenerateInitialChangeStreamPartitionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GenerateInitialChangeStreamPartitionsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GenerateInitialChangeStreamPartitionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.GenerateInitialChangeStreamPartitionsResponse;

                /**
                 * Decodes a GenerateInitialChangeStreamPartitionsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GenerateInitialChangeStreamPartitionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.GenerateInitialChangeStreamPartitionsResponse;

                /**
                 * Verifies a GenerateInitialChangeStreamPartitionsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GenerateInitialChangeStreamPartitionsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GenerateInitialChangeStreamPartitionsResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.GenerateInitialChangeStreamPartitionsResponse;

                /**
                 * Creates a plain object from a GenerateInitialChangeStreamPartitionsResponse message. Also converts values to other types if specified.
                 * @param message GenerateInitialChangeStreamPartitionsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.GenerateInitialChangeStreamPartitionsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GenerateInitialChangeStreamPartitionsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GenerateInitialChangeStreamPartitionsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ReadChangeStreamRequest. */
            interface IReadChangeStreamRequest {

                /** ReadChangeStreamRequest tableName */
                tableName?: (string|null);

                /** ReadChangeStreamRequest appProfileId */
                appProfileId?: (string|null);

                /** ReadChangeStreamRequest partition */
                partition?: (google.bigtable.v2.IStreamPartition|null);

                /** ReadChangeStreamRequest startTime */
                startTime?: (google.protobuf.ITimestamp|null);

                /** ReadChangeStreamRequest continuationTokens */
                continuationTokens?: (google.bigtable.v2.IStreamContinuationTokens|null);

                /** ReadChangeStreamRequest endTime */
                endTime?: (google.protobuf.ITimestamp|null);

                /** ReadChangeStreamRequest heartbeatDuration */
                heartbeatDuration?: (google.protobuf.IDuration|null);
            }

            /** Represents a ReadChangeStreamRequest. */
            class ReadChangeStreamRequest implements IReadChangeStreamRequest {

                /**
                 * Constructs a new ReadChangeStreamRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IReadChangeStreamRequest);

                /** ReadChangeStreamRequest tableName. */
                public tableName: string;

                /** ReadChangeStreamRequest appProfileId. */
                public appProfileId: string;

                /** ReadChangeStreamRequest partition. */
                public partition?: (google.bigtable.v2.IStreamPartition|null);

                /** ReadChangeStreamRequest startTime. */
                public startTime?: (google.protobuf.ITimestamp|null);

                /** ReadChangeStreamRequest continuationTokens. */
                public continuationTokens?: (google.bigtable.v2.IStreamContinuationTokens|null);

                /** ReadChangeStreamRequest endTime. */
                public endTime?: (google.protobuf.ITimestamp|null);

                /** ReadChangeStreamRequest heartbeatDuration. */
                public heartbeatDuration?: (google.protobuf.IDuration|null);

                /** ReadChangeStreamRequest startFrom. */
                public startFrom?: ("startTime"|"continuationTokens");

                /**
                 * Creates a new ReadChangeStreamRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReadChangeStreamRequest instance
                 */
                public static create(properties?: google.bigtable.v2.IReadChangeStreamRequest): google.bigtable.v2.ReadChangeStreamRequest;

                /**
                 * Encodes the specified ReadChangeStreamRequest message. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamRequest.verify|verify} messages.
                 * @param message ReadChangeStreamRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IReadChangeStreamRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReadChangeStreamRequest message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamRequest.verify|verify} messages.
                 * @param message ReadChangeStreamRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IReadChangeStreamRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReadChangeStreamRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReadChangeStreamRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadChangeStreamRequest;

                /**
                 * Decodes a ReadChangeStreamRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReadChangeStreamRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadChangeStreamRequest;

                /**
                 * Verifies a ReadChangeStreamRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReadChangeStreamRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReadChangeStreamRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadChangeStreamRequest;

                /**
                 * Creates a plain object from a ReadChangeStreamRequest message. Also converts values to other types if specified.
                 * @param message ReadChangeStreamRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ReadChangeStreamRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReadChangeStreamRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ReadChangeStreamRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ReadChangeStreamResponse. */
            interface IReadChangeStreamResponse {

                /** ReadChangeStreamResponse dataChange */
                dataChange?: (google.bigtable.v2.ReadChangeStreamResponse.IDataChange|null);

                /** ReadChangeStreamResponse heartbeat */
                heartbeat?: (google.bigtable.v2.ReadChangeStreamResponse.IHeartbeat|null);

                /** ReadChangeStreamResponse closeStream */
                closeStream?: (google.bigtable.v2.ReadChangeStreamResponse.ICloseStream|null);
            }

            /** Represents a ReadChangeStreamResponse. */
            class ReadChangeStreamResponse implements IReadChangeStreamResponse {

                /**
                 * Constructs a new ReadChangeStreamResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IReadChangeStreamResponse);

                /** ReadChangeStreamResponse dataChange. */
                public dataChange?: (google.bigtable.v2.ReadChangeStreamResponse.IDataChange|null);

                /** ReadChangeStreamResponse heartbeat. */
                public heartbeat?: (google.bigtable.v2.ReadChangeStreamResponse.IHeartbeat|null);

                /** ReadChangeStreamResponse closeStream. */
                public closeStream?: (google.bigtable.v2.ReadChangeStreamResponse.ICloseStream|null);

                /** ReadChangeStreamResponse streamRecord. */
                public streamRecord?: ("dataChange"|"heartbeat"|"closeStream");

                /**
                 * Creates a new ReadChangeStreamResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReadChangeStreamResponse instance
                 */
                public static create(properties?: google.bigtable.v2.IReadChangeStreamResponse): google.bigtable.v2.ReadChangeStreamResponse;

                /**
                 * Encodes the specified ReadChangeStreamResponse message. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.verify|verify} messages.
                 * @param message ReadChangeStreamResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IReadChangeStreamResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReadChangeStreamResponse message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.verify|verify} messages.
                 * @param message ReadChangeStreamResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IReadChangeStreamResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReadChangeStreamResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReadChangeStreamResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadChangeStreamResponse;

                /**
                 * Decodes a ReadChangeStreamResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReadChangeStreamResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadChangeStreamResponse;

                /**
                 * Verifies a ReadChangeStreamResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReadChangeStreamResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReadChangeStreamResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadChangeStreamResponse;

                /**
                 * Creates a plain object from a ReadChangeStreamResponse message. Also converts values to other types if specified.
                 * @param message ReadChangeStreamResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ReadChangeStreamResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReadChangeStreamResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ReadChangeStreamResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace ReadChangeStreamResponse {

                /** Properties of a MutationChunk. */
                interface IMutationChunk {

                    /** MutationChunk chunkInfo */
                    chunkInfo?: (google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.IChunkInfo|null);

                    /** MutationChunk mutation */
                    mutation?: (google.bigtable.v2.IMutation|null);
                }

                /** Represents a MutationChunk. */
                class MutationChunk implements IMutationChunk {

                    /**
                     * Constructs a new MutationChunk.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.ReadChangeStreamResponse.IMutationChunk);

                    /** MutationChunk chunkInfo. */
                    public chunkInfo?: (google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.IChunkInfo|null);

                    /** MutationChunk mutation. */
                    public mutation?: (google.bigtable.v2.IMutation|null);

                    /**
                     * Creates a new MutationChunk instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MutationChunk instance
                     */
                    public static create(properties?: google.bigtable.v2.ReadChangeStreamResponse.IMutationChunk): google.bigtable.v2.ReadChangeStreamResponse.MutationChunk;

                    /**
                     * Encodes the specified MutationChunk message. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.verify|verify} messages.
                     * @param message MutationChunk message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.ReadChangeStreamResponse.IMutationChunk, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MutationChunk message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.verify|verify} messages.
                     * @param message MutationChunk message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.ReadChangeStreamResponse.IMutationChunk, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MutationChunk message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MutationChunk
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadChangeStreamResponse.MutationChunk;

                    /**
                     * Decodes a MutationChunk message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MutationChunk
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadChangeStreamResponse.MutationChunk;

                    /**
                     * Verifies a MutationChunk message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MutationChunk message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MutationChunk
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadChangeStreamResponse.MutationChunk;

                    /**
                     * Creates a plain object from a MutationChunk message. Also converts values to other types if specified.
                     * @param message MutationChunk
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.ReadChangeStreamResponse.MutationChunk, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MutationChunk to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for MutationChunk
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                namespace MutationChunk {

                    /** Properties of a ChunkInfo. */
                    interface IChunkInfo {

                        /** ChunkInfo chunkedValueSize */
                        chunkedValueSize?: (number|null);

                        /** ChunkInfo chunkedValueOffset */
                        chunkedValueOffset?: (number|null);

                        /** ChunkInfo lastChunk */
                        lastChunk?: (boolean|null);
                    }

                    /** Represents a ChunkInfo. */
                    class ChunkInfo implements IChunkInfo {

                        /**
                         * Constructs a new ChunkInfo.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.IChunkInfo);

                        /** ChunkInfo chunkedValueSize. */
                        public chunkedValueSize: number;

                        /** ChunkInfo chunkedValueOffset. */
                        public chunkedValueOffset: number;

                        /** ChunkInfo lastChunk. */
                        public lastChunk: boolean;

                        /**
                         * Creates a new ChunkInfo instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ChunkInfo instance
                         */
                        public static create(properties?: google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.IChunkInfo): google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.ChunkInfo;

                        /**
                         * Encodes the specified ChunkInfo message. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.ChunkInfo.verify|verify} messages.
                         * @param message ChunkInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.IChunkInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ChunkInfo message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.ChunkInfo.verify|verify} messages.
                         * @param message ChunkInfo message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.IChunkInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ChunkInfo message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ChunkInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.ChunkInfo;

                        /**
                         * Decodes a ChunkInfo message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns ChunkInfo
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.ChunkInfo;

                        /**
                         * Verifies a ChunkInfo message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a ChunkInfo message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns ChunkInfo
                         */
                        public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.ChunkInfo;

                        /**
                         * Creates a plain object from a ChunkInfo message. Also converts values to other types if specified.
                         * @param message ChunkInfo
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.bigtable.v2.ReadChangeStreamResponse.MutationChunk.ChunkInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ChunkInfo to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for ChunkInfo
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }
                }

                /** Properties of a DataChange. */
                interface IDataChange {

                    /** DataChange type */
                    type?: (google.bigtable.v2.ReadChangeStreamResponse.DataChange.Type|keyof typeof google.bigtable.v2.ReadChangeStreamResponse.DataChange.Type|null);

                    /** DataChange sourceClusterId */
                    sourceClusterId?: (string|null);

                    /** DataChange rowKey */
                    rowKey?: (Uint8Array|string|null);

                    /** DataChange commitTimestamp */
                    commitTimestamp?: (google.protobuf.ITimestamp|null);

                    /** DataChange tiebreaker */
                    tiebreaker?: (number|null);

                    /** DataChange chunks */
                    chunks?: (google.bigtable.v2.ReadChangeStreamResponse.IMutationChunk[]|null);

                    /** DataChange done */
                    done?: (boolean|null);

                    /** DataChange token */
                    token?: (string|null);

                    /** DataChange estimatedLowWatermark */
                    estimatedLowWatermark?: (google.protobuf.ITimestamp|null);
                }

                /** Represents a DataChange. */
                class DataChange implements IDataChange {

                    /**
                     * Constructs a new DataChange.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.ReadChangeStreamResponse.IDataChange);

                    /** DataChange type. */
                    public type: (google.bigtable.v2.ReadChangeStreamResponse.DataChange.Type|keyof typeof google.bigtable.v2.ReadChangeStreamResponse.DataChange.Type);

                    /** DataChange sourceClusterId. */
                    public sourceClusterId: string;

                    /** DataChange rowKey. */
                    public rowKey: (Uint8Array|string);

                    /** DataChange commitTimestamp. */
                    public commitTimestamp?: (google.protobuf.ITimestamp|null);

                    /** DataChange tiebreaker. */
                    public tiebreaker: number;

                    /** DataChange chunks. */
                    public chunks: google.bigtable.v2.ReadChangeStreamResponse.IMutationChunk[];

                    /** DataChange done. */
                    public done: boolean;

                    /** DataChange token. */
                    public token: string;

                    /** DataChange estimatedLowWatermark. */
                    public estimatedLowWatermark?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new DataChange instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DataChange instance
                     */
                    public static create(properties?: google.bigtable.v2.ReadChangeStreamResponse.IDataChange): google.bigtable.v2.ReadChangeStreamResponse.DataChange;

                    /**
                     * Encodes the specified DataChange message. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.DataChange.verify|verify} messages.
                     * @param message DataChange message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.ReadChangeStreamResponse.IDataChange, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DataChange message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.DataChange.verify|verify} messages.
                     * @param message DataChange message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.ReadChangeStreamResponse.IDataChange, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DataChange message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DataChange
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadChangeStreamResponse.DataChange;

                    /**
                     * Decodes a DataChange message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DataChange
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadChangeStreamResponse.DataChange;

                    /**
                     * Verifies a DataChange message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DataChange message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DataChange
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadChangeStreamResponse.DataChange;

                    /**
                     * Creates a plain object from a DataChange message. Also converts values to other types if specified.
                     * @param message DataChange
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.ReadChangeStreamResponse.DataChange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DataChange to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for DataChange
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                namespace DataChange {

                    /** Type enum. */
                    enum Type {
                        TYPE_UNSPECIFIED = 0,
                        USER = 1,
                        GARBAGE_COLLECTION = 2,
                        CONTINUATION = 3
                    }
                }

                /** Properties of a Heartbeat. */
                interface IHeartbeat {

                    /** Heartbeat continuationToken */
                    continuationToken?: (google.bigtable.v2.IStreamContinuationToken|null);

                    /** Heartbeat estimatedLowWatermark */
                    estimatedLowWatermark?: (google.protobuf.ITimestamp|null);
                }

                /** Represents a Heartbeat. */
                class Heartbeat implements IHeartbeat {

                    /**
                     * Constructs a new Heartbeat.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.ReadChangeStreamResponse.IHeartbeat);

                    /** Heartbeat continuationToken. */
                    public continuationToken?: (google.bigtable.v2.IStreamContinuationToken|null);

                    /** Heartbeat estimatedLowWatermark. */
                    public estimatedLowWatermark?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new Heartbeat instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Heartbeat instance
                     */
                    public static create(properties?: google.bigtable.v2.ReadChangeStreamResponse.IHeartbeat): google.bigtable.v2.ReadChangeStreamResponse.Heartbeat;

                    /**
                     * Encodes the specified Heartbeat message. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.Heartbeat.verify|verify} messages.
                     * @param message Heartbeat message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.ReadChangeStreamResponse.IHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Heartbeat message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.Heartbeat.verify|verify} messages.
                     * @param message Heartbeat message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.ReadChangeStreamResponse.IHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Heartbeat message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Heartbeat
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadChangeStreamResponse.Heartbeat;

                    /**
                     * Decodes a Heartbeat message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Heartbeat
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadChangeStreamResponse.Heartbeat;

                    /**
                     * Verifies a Heartbeat message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Heartbeat message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Heartbeat
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadChangeStreamResponse.Heartbeat;

                    /**
                     * Creates a plain object from a Heartbeat message. Also converts values to other types if specified.
                     * @param message Heartbeat
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.ReadChangeStreamResponse.Heartbeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Heartbeat to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for Heartbeat
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a CloseStream. */
                interface ICloseStream {

                    /** CloseStream status */
                    status?: (google.rpc.IStatus|null);

                    /** CloseStream continuationTokens */
                    continuationTokens?: (google.bigtable.v2.IStreamContinuationToken[]|null);

                    /** CloseStream newPartitions */
                    newPartitions?: (google.bigtable.v2.IStreamPartition[]|null);
                }

                /** Represents a CloseStream. */
                class CloseStream implements ICloseStream {

                    /**
                     * Constructs a new CloseStream.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.v2.ReadChangeStreamResponse.ICloseStream);

                    /** CloseStream status. */
                    public status?: (google.rpc.IStatus|null);

                    /** CloseStream continuationTokens. */
                    public continuationTokens: google.bigtable.v2.IStreamContinuationToken[];

                    /** CloseStream newPartitions. */
                    public newPartitions: google.bigtable.v2.IStreamPartition[];

                    /**
                     * Creates a new CloseStream instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CloseStream instance
                     */
                    public static create(properties?: google.bigtable.v2.ReadChangeStreamResponse.ICloseStream): google.bigtable.v2.ReadChangeStreamResponse.CloseStream;

                    /**
                     * Encodes the specified CloseStream message. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.CloseStream.verify|verify} messages.
                     * @param message CloseStream message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.v2.ReadChangeStreamResponse.ICloseStream, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CloseStream message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadChangeStreamResponse.CloseStream.verify|verify} messages.
                     * @param message CloseStream message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.v2.ReadChangeStreamResponse.ICloseStream, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CloseStream message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CloseStream
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadChangeStreamResponse.CloseStream;

                    /**
                     * Decodes a CloseStream message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CloseStream
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadChangeStreamResponse.CloseStream;

                    /**
                     * Verifies a CloseStream message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CloseStream message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CloseStream
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadChangeStreamResponse.CloseStream;

                    /**
                     * Creates a plain object from a CloseStream message. Also converts values to other types if specified.
                     * @param message CloseStream
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.v2.ReadChangeStreamResponse.CloseStream, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CloseStream to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for CloseStream
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            /** Properties of a Row. */
            interface IRow {

                /** Row key */
                key?: (Uint8Array|string|null);

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
                public key: (Uint8Array|string);

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

                /**
                 * Gets the default type url for Row
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for Family
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Column. */
            interface IColumn {

                /** Column qualifier */
                qualifier?: (Uint8Array|string|null);

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
                public qualifier: (Uint8Array|string);

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

                /**
                 * Gets the default type url for Column
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Cell. */
            interface ICell {

                /** Cell timestampMicros */
                timestampMicros?: (number|Long|string|null);

                /** Cell value */
                value?: (Uint8Array|string|null);

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
                public timestampMicros: (number|Long|string);

                /** Cell value. */
                public value: (Uint8Array|string);

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

                /**
                 * Gets the default type url for Cell
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RowRange. */
            interface IRowRange {

                /** RowRange startKeyClosed */
                startKeyClosed?: (Uint8Array|string|null);

                /** RowRange startKeyOpen */
                startKeyOpen?: (Uint8Array|string|null);

                /** RowRange endKeyOpen */
                endKeyOpen?: (Uint8Array|string|null);

                /** RowRange endKeyClosed */
                endKeyClosed?: (Uint8Array|string|null);
            }

            /** Represents a RowRange. */
            class RowRange implements IRowRange {

                /**
                 * Constructs a new RowRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IRowRange);

                /** RowRange startKeyClosed. */
                public startKeyClosed?: (Uint8Array|string|null);

                /** RowRange startKeyOpen. */
                public startKeyOpen?: (Uint8Array|string|null);

                /** RowRange endKeyOpen. */
                public endKeyOpen?: (Uint8Array|string|null);

                /** RowRange endKeyClosed. */
                public endKeyClosed?: (Uint8Array|string|null);

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

                /**
                 * Gets the default type url for RowRange
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for RowSet
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ColumnRange. */
            interface IColumnRange {

                /** ColumnRange familyName */
                familyName?: (string|null);

                /** ColumnRange startQualifierClosed */
                startQualifierClosed?: (Uint8Array|string|null);

                /** ColumnRange startQualifierOpen */
                startQualifierOpen?: (Uint8Array|string|null);

                /** ColumnRange endQualifierClosed */
                endQualifierClosed?: (Uint8Array|string|null);

                /** ColumnRange endQualifierOpen */
                endQualifierOpen?: (Uint8Array|string|null);
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
                public startQualifierClosed?: (Uint8Array|string|null);

                /** ColumnRange startQualifierOpen. */
                public startQualifierOpen?: (Uint8Array|string|null);

                /** ColumnRange endQualifierClosed. */
                public endQualifierClosed?: (Uint8Array|string|null);

                /** ColumnRange endQualifierOpen. */
                public endQualifierOpen?: (Uint8Array|string|null);

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

                /**
                 * Gets the default type url for ColumnRange
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a TimestampRange. */
            interface ITimestampRange {

                /** TimestampRange startTimestampMicros */
                startTimestampMicros?: (number|Long|string|null);

                /** TimestampRange endTimestampMicros */
                endTimestampMicros?: (number|Long|string|null);
            }

            /** Represents a TimestampRange. */
            class TimestampRange implements ITimestampRange {

                /**
                 * Constructs a new TimestampRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.ITimestampRange);

                /** TimestampRange startTimestampMicros. */
                public startTimestampMicros: (number|Long|string);

                /** TimestampRange endTimestampMicros. */
                public endTimestampMicros: (number|Long|string);

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

                /**
                 * Gets the default type url for TimestampRange
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ValueRange. */
            interface IValueRange {

                /** ValueRange startValueClosed */
                startValueClosed?: (Uint8Array|string|null);

                /** ValueRange startValueOpen */
                startValueOpen?: (Uint8Array|string|null);

                /** ValueRange endValueClosed */
                endValueClosed?: (Uint8Array|string|null);

                /** ValueRange endValueOpen */
                endValueOpen?: (Uint8Array|string|null);
            }

            /** Represents a ValueRange. */
            class ValueRange implements IValueRange {

                /**
                 * Constructs a new ValueRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IValueRange);

                /** ValueRange startValueClosed. */
                public startValueClosed?: (Uint8Array|string|null);

                /** ValueRange startValueOpen. */
                public startValueOpen?: (Uint8Array|string|null);

                /** ValueRange endValueClosed. */
                public endValueClosed?: (Uint8Array|string|null);

                /** ValueRange endValueOpen. */
                public endValueOpen?: (Uint8Array|string|null);

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

                /**
                 * Gets the default type url for ValueRange
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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
                rowKeyRegexFilter?: (Uint8Array|string|null);

                /** RowFilter rowSampleFilter */
                rowSampleFilter?: (number|null);

                /** RowFilter familyNameRegexFilter */
                familyNameRegexFilter?: (string|null);

                /** RowFilter columnQualifierRegexFilter */
                columnQualifierRegexFilter?: (Uint8Array|string|null);

                /** RowFilter columnRangeFilter */
                columnRangeFilter?: (google.bigtable.v2.IColumnRange|null);

                /** RowFilter timestampRangeFilter */
                timestampRangeFilter?: (google.bigtable.v2.ITimestampRange|null);

                /** RowFilter valueRegexFilter */
                valueRegexFilter?: (Uint8Array|string|null);

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
                public sink?: (boolean|null);

                /** RowFilter passAllFilter. */
                public passAllFilter?: (boolean|null);

                /** RowFilter blockAllFilter. */
                public blockAllFilter?: (boolean|null);

                /** RowFilter rowKeyRegexFilter. */
                public rowKeyRegexFilter?: (Uint8Array|string|null);

                /** RowFilter rowSampleFilter. */
                public rowSampleFilter?: (number|null);

                /** RowFilter familyNameRegexFilter. */
                public familyNameRegexFilter?: (string|null);

                /** RowFilter columnQualifierRegexFilter. */
                public columnQualifierRegexFilter?: (Uint8Array|string|null);

                /** RowFilter columnRangeFilter. */
                public columnRangeFilter?: (google.bigtable.v2.IColumnRange|null);

                /** RowFilter timestampRangeFilter. */
                public timestampRangeFilter?: (google.bigtable.v2.ITimestampRange|null);

                /** RowFilter valueRegexFilter. */
                public valueRegexFilter?: (Uint8Array|string|null);

                /** RowFilter valueRangeFilter. */
                public valueRangeFilter?: (google.bigtable.v2.IValueRange|null);

                /** RowFilter cellsPerRowOffsetFilter. */
                public cellsPerRowOffsetFilter?: (number|null);

                /** RowFilter cellsPerRowLimitFilter. */
                public cellsPerRowLimitFilter?: (number|null);

                /** RowFilter cellsPerColumnLimitFilter. */
                public cellsPerColumnLimitFilter?: (number|null);

                /** RowFilter stripValueTransformer. */
                public stripValueTransformer?: (boolean|null);

                /** RowFilter applyLabelTransformer. */
                public applyLabelTransformer?: (string|null);

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

                /**
                 * Gets the default type url for RowFilter
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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

                    /**
                     * Gets the default type url for Chain
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
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

                    /**
                     * Gets the default type url for Interleave
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
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

                    /**
                     * Gets the default type url for Condition
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for Mutation
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace Mutation {

                /** Properties of a SetCell. */
                interface ISetCell {

                    /** SetCell familyName */
                    familyName?: (string|null);

                    /** SetCell columnQualifier */
                    columnQualifier?: (Uint8Array|string|null);

                    /** SetCell timestampMicros */
                    timestampMicros?: (number|Long|string|null);

                    /** SetCell value */
                    value?: (Uint8Array|string|null);
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
                    public columnQualifier: (Uint8Array|string);

                    /** SetCell timestampMicros. */
                    public timestampMicros: (number|Long|string);

                    /** SetCell value. */
                    public value: (Uint8Array|string);

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

                    /**
                     * Gets the default type url for SetCell
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a DeleteFromColumn. */
                interface IDeleteFromColumn {

                    /** DeleteFromColumn familyName */
                    familyName?: (string|null);

                    /** DeleteFromColumn columnQualifier */
                    columnQualifier?: (Uint8Array|string|null);

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
                    public columnQualifier: (Uint8Array|string);

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

                    /**
                     * Gets the default type url for DeleteFromColumn
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
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

                    /**
                     * Gets the default type url for DeleteFromFamily
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
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

                    /**
                     * Gets the default type url for DeleteFromRow
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            /** Properties of a ReadModifyWriteRule. */
            interface IReadModifyWriteRule {

                /** ReadModifyWriteRule familyName */
                familyName?: (string|null);

                /** ReadModifyWriteRule columnQualifier */
                columnQualifier?: (Uint8Array|string|null);

                /** ReadModifyWriteRule appendValue */
                appendValue?: (Uint8Array|string|null);

                /** ReadModifyWriteRule incrementAmount */
                incrementAmount?: (number|Long|string|null);
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
                public columnQualifier: (Uint8Array|string);

                /** ReadModifyWriteRule appendValue. */
                public appendValue?: (Uint8Array|string|null);

                /** ReadModifyWriteRule incrementAmount. */
                public incrementAmount?: (number|Long|string|null);

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

                /**
                 * Gets the default type url for ReadModifyWriteRule
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a StreamPartition. */
            interface IStreamPartition {

                /** StreamPartition rowRange */
                rowRange?: (google.bigtable.v2.IRowRange|null);
            }

            /** Represents a StreamPartition. */
            class StreamPartition implements IStreamPartition {

                /**
                 * Constructs a new StreamPartition.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IStreamPartition);

                /** StreamPartition rowRange. */
                public rowRange?: (google.bigtable.v2.IRowRange|null);

                /**
                 * Creates a new StreamPartition instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StreamPartition instance
                 */
                public static create(properties?: google.bigtable.v2.IStreamPartition): google.bigtable.v2.StreamPartition;

                /**
                 * Encodes the specified StreamPartition message. Does not implicitly {@link google.bigtable.v2.StreamPartition.verify|verify} messages.
                 * @param message StreamPartition message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IStreamPartition, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StreamPartition message, length delimited. Does not implicitly {@link google.bigtable.v2.StreamPartition.verify|verify} messages.
                 * @param message StreamPartition message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IStreamPartition, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StreamPartition message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StreamPartition
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.StreamPartition;

                /**
                 * Decodes a StreamPartition message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StreamPartition
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.StreamPartition;

                /**
                 * Verifies a StreamPartition message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StreamPartition message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StreamPartition
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.StreamPartition;

                /**
                 * Creates a plain object from a StreamPartition message. Also converts values to other types if specified.
                 * @param message StreamPartition
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.StreamPartition, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StreamPartition to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StreamPartition
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a StreamContinuationTokens. */
            interface IStreamContinuationTokens {

                /** StreamContinuationTokens tokens */
                tokens?: (google.bigtable.v2.IStreamContinuationToken[]|null);
            }

            /** Represents a StreamContinuationTokens. */
            class StreamContinuationTokens implements IStreamContinuationTokens {

                /**
                 * Constructs a new StreamContinuationTokens.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IStreamContinuationTokens);

                /** StreamContinuationTokens tokens. */
                public tokens: google.bigtable.v2.IStreamContinuationToken[];

                /**
                 * Creates a new StreamContinuationTokens instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StreamContinuationTokens instance
                 */
                public static create(properties?: google.bigtable.v2.IStreamContinuationTokens): google.bigtable.v2.StreamContinuationTokens;

                /**
                 * Encodes the specified StreamContinuationTokens message. Does not implicitly {@link google.bigtable.v2.StreamContinuationTokens.verify|verify} messages.
                 * @param message StreamContinuationTokens message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IStreamContinuationTokens, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StreamContinuationTokens message, length delimited. Does not implicitly {@link google.bigtable.v2.StreamContinuationTokens.verify|verify} messages.
                 * @param message StreamContinuationTokens message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IStreamContinuationTokens, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StreamContinuationTokens message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StreamContinuationTokens
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.StreamContinuationTokens;

                /**
                 * Decodes a StreamContinuationTokens message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StreamContinuationTokens
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.StreamContinuationTokens;

                /**
                 * Verifies a StreamContinuationTokens message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StreamContinuationTokens message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StreamContinuationTokens
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.StreamContinuationTokens;

                /**
                 * Creates a plain object from a StreamContinuationTokens message. Also converts values to other types if specified.
                 * @param message StreamContinuationTokens
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.StreamContinuationTokens, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StreamContinuationTokens to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StreamContinuationTokens
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a StreamContinuationToken. */
            interface IStreamContinuationToken {

                /** StreamContinuationToken partition */
                partition?: (google.bigtable.v2.IStreamPartition|null);

                /** StreamContinuationToken token */
                token?: (string|null);
            }

            /** Represents a StreamContinuationToken. */
            class StreamContinuationToken implements IStreamContinuationToken {

                /**
                 * Constructs a new StreamContinuationToken.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IStreamContinuationToken);

                /** StreamContinuationToken partition. */
                public partition?: (google.bigtable.v2.IStreamPartition|null);

                /** StreamContinuationToken token. */
                public token: string;

                /**
                 * Creates a new StreamContinuationToken instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StreamContinuationToken instance
                 */
                public static create(properties?: google.bigtable.v2.IStreamContinuationToken): google.bigtable.v2.StreamContinuationToken;

                /**
                 * Encodes the specified StreamContinuationToken message. Does not implicitly {@link google.bigtable.v2.StreamContinuationToken.verify|verify} messages.
                 * @param message StreamContinuationToken message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IStreamContinuationToken, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StreamContinuationToken message, length delimited. Does not implicitly {@link google.bigtable.v2.StreamContinuationToken.verify|verify} messages.
                 * @param message StreamContinuationToken message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IStreamContinuationToken, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StreamContinuationToken message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StreamContinuationToken
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.StreamContinuationToken;

                /**
                 * Decodes a StreamContinuationToken message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StreamContinuationToken
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.StreamContinuationToken;

                /**
                 * Verifies a StreamContinuationToken message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StreamContinuationToken message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StreamContinuationToken
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.StreamContinuationToken;

                /**
                 * Creates a plain object from a StreamContinuationToken message. Also converts values to other types if specified.
                 * @param message StreamContinuationToken
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.StreamContinuationToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StreamContinuationToken to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StreamContinuationToken
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ReadIterationStats. */
            interface IReadIterationStats {

                /** ReadIterationStats rowsSeenCount */
                rowsSeenCount?: (number|Long|string|null);

                /** ReadIterationStats rowsReturnedCount */
                rowsReturnedCount?: (number|Long|string|null);

                /** ReadIterationStats cellsSeenCount */
                cellsSeenCount?: (number|Long|string|null);

                /** ReadIterationStats cellsReturnedCount */
                cellsReturnedCount?: (number|Long|string|null);
            }

            /** Represents a ReadIterationStats. */
            class ReadIterationStats implements IReadIterationStats {

                /**
                 * Constructs a new ReadIterationStats.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IReadIterationStats);

                /** ReadIterationStats rowsSeenCount. */
                public rowsSeenCount: (number|Long|string);

                /** ReadIterationStats rowsReturnedCount. */
                public rowsReturnedCount: (number|Long|string);

                /** ReadIterationStats cellsSeenCount. */
                public cellsSeenCount: (number|Long|string);

                /** ReadIterationStats cellsReturnedCount. */
                public cellsReturnedCount: (number|Long|string);

                /**
                 * Creates a new ReadIterationStats instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReadIterationStats instance
                 */
                public static create(properties?: google.bigtable.v2.IReadIterationStats): google.bigtable.v2.ReadIterationStats;

                /**
                 * Encodes the specified ReadIterationStats message. Does not implicitly {@link google.bigtable.v2.ReadIterationStats.verify|verify} messages.
                 * @param message ReadIterationStats message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IReadIterationStats, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReadIterationStats message, length delimited. Does not implicitly {@link google.bigtable.v2.ReadIterationStats.verify|verify} messages.
                 * @param message ReadIterationStats message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IReadIterationStats, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReadIterationStats message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReadIterationStats
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ReadIterationStats;

                /**
                 * Decodes a ReadIterationStats message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReadIterationStats
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ReadIterationStats;

                /**
                 * Verifies a ReadIterationStats message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReadIterationStats message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReadIterationStats
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ReadIterationStats;

                /**
                 * Creates a plain object from a ReadIterationStats message. Also converts values to other types if specified.
                 * @param message ReadIterationStats
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ReadIterationStats, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReadIterationStats to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ReadIterationStats
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RequestLatencyStats. */
            interface IRequestLatencyStats {

                /** RequestLatencyStats frontendServerLatency */
                frontendServerLatency?: (google.protobuf.IDuration|null);
            }

            /** Represents a RequestLatencyStats. */
            class RequestLatencyStats implements IRequestLatencyStats {

                /**
                 * Constructs a new RequestLatencyStats.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IRequestLatencyStats);

                /** RequestLatencyStats frontendServerLatency. */
                public frontendServerLatency?: (google.protobuf.IDuration|null);

                /**
                 * Creates a new RequestLatencyStats instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RequestLatencyStats instance
                 */
                public static create(properties?: google.bigtable.v2.IRequestLatencyStats): google.bigtable.v2.RequestLatencyStats;

                /**
                 * Encodes the specified RequestLatencyStats message. Does not implicitly {@link google.bigtable.v2.RequestLatencyStats.verify|verify} messages.
                 * @param message RequestLatencyStats message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IRequestLatencyStats, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RequestLatencyStats message, length delimited. Does not implicitly {@link google.bigtable.v2.RequestLatencyStats.verify|verify} messages.
                 * @param message RequestLatencyStats message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IRequestLatencyStats, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequestLatencyStats message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RequestLatencyStats
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.RequestLatencyStats;

                /**
                 * Decodes a RequestLatencyStats message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RequestLatencyStats
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.RequestLatencyStats;

                /**
                 * Verifies a RequestLatencyStats message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RequestLatencyStats message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RequestLatencyStats
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.RequestLatencyStats;

                /**
                 * Creates a plain object from a RequestLatencyStats message. Also converts values to other types if specified.
                 * @param message RequestLatencyStats
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.RequestLatencyStats, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RequestLatencyStats to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RequestLatencyStats
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a FullReadStatsView. */
            interface IFullReadStatsView {

                /** FullReadStatsView readIterationStats */
                readIterationStats?: (google.bigtable.v2.IReadIterationStats|null);

                /** FullReadStatsView requestLatencyStats */
                requestLatencyStats?: (google.bigtable.v2.IRequestLatencyStats|null);
            }

            /** Represents a FullReadStatsView. */
            class FullReadStatsView implements IFullReadStatsView {

                /**
                 * Constructs a new FullReadStatsView.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IFullReadStatsView);

                /** FullReadStatsView readIterationStats. */
                public readIterationStats?: (google.bigtable.v2.IReadIterationStats|null);

                /** FullReadStatsView requestLatencyStats. */
                public requestLatencyStats?: (google.bigtable.v2.IRequestLatencyStats|null);

                /**
                 * Creates a new FullReadStatsView instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns FullReadStatsView instance
                 */
                public static create(properties?: google.bigtable.v2.IFullReadStatsView): google.bigtable.v2.FullReadStatsView;

                /**
                 * Encodes the specified FullReadStatsView message. Does not implicitly {@link google.bigtable.v2.FullReadStatsView.verify|verify} messages.
                 * @param message FullReadStatsView message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IFullReadStatsView, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified FullReadStatsView message, length delimited. Does not implicitly {@link google.bigtable.v2.FullReadStatsView.verify|verify} messages.
                 * @param message FullReadStatsView message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IFullReadStatsView, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a FullReadStatsView message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns FullReadStatsView
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.FullReadStatsView;

                /**
                 * Decodes a FullReadStatsView message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns FullReadStatsView
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.FullReadStatsView;

                /**
                 * Verifies a FullReadStatsView message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a FullReadStatsView message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns FullReadStatsView
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.FullReadStatsView;

                /**
                 * Creates a plain object from a FullReadStatsView message. Also converts values to other types if specified.
                 * @param message FullReadStatsView
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.FullReadStatsView, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this FullReadStatsView to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for FullReadStatsView
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a RequestStats. */
            interface IRequestStats {

                /** RequestStats fullReadStatsView */
                fullReadStatsView?: (google.bigtable.v2.IFullReadStatsView|null);
            }

            /** Represents a RequestStats. */
            class RequestStats implements IRequestStats {

                /**
                 * Constructs a new RequestStats.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IRequestStats);

                /** RequestStats fullReadStatsView. */
                public fullReadStatsView?: (google.bigtable.v2.IFullReadStatsView|null);

                /** RequestStats statsView. */
                public statsView?: "fullReadStatsView";

                /**
                 * Creates a new RequestStats instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RequestStats instance
                 */
                public static create(properties?: google.bigtable.v2.IRequestStats): google.bigtable.v2.RequestStats;

                /**
                 * Encodes the specified RequestStats message. Does not implicitly {@link google.bigtable.v2.RequestStats.verify|verify} messages.
                 * @param message RequestStats message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IRequestStats, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RequestStats message, length delimited. Does not implicitly {@link google.bigtable.v2.RequestStats.verify|verify} messages.
                 * @param message RequestStats message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IRequestStats, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequestStats message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RequestStats
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.RequestStats;

                /**
                 * Decodes a RequestStats message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RequestStats
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.RequestStats;

                /**
                 * Verifies a RequestStats message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RequestStats message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RequestStats
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.RequestStats;

                /**
                 * Creates a plain object from a RequestStats message. Also converts values to other types if specified.
                 * @param message RequestStats
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.RequestStats, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RequestStats to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for RequestStats
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a FeatureFlags. */
            interface IFeatureFlags {

                /** FeatureFlags reverseScans */
                reverseScans?: (boolean|null);

                /** FeatureFlags mutateRowsRateLimit */
                mutateRowsRateLimit?: (boolean|null);

                /** FeatureFlags mutateRowsRateLimit2 */
                mutateRowsRateLimit2?: (boolean|null);

                /** FeatureFlags lastScannedRowResponses */
                lastScannedRowResponses?: (boolean|null);
            }

            /** Represents a FeatureFlags. */
            class FeatureFlags implements IFeatureFlags {

                /**
                 * Constructs a new FeatureFlags.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IFeatureFlags);

                /** FeatureFlags reverseScans. */
                public reverseScans: boolean;

                /** FeatureFlags mutateRowsRateLimit. */
                public mutateRowsRateLimit: boolean;

                /** FeatureFlags mutateRowsRateLimit2. */
                public mutateRowsRateLimit2: boolean;

                /** FeatureFlags lastScannedRowResponses. */
                public lastScannedRowResponses: boolean;

                /**
                 * Creates a new FeatureFlags instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns FeatureFlags instance
                 */
                public static create(properties?: google.bigtable.v2.IFeatureFlags): google.bigtable.v2.FeatureFlags;

                /**
                 * Encodes the specified FeatureFlags message. Does not implicitly {@link google.bigtable.v2.FeatureFlags.verify|verify} messages.
                 * @param message FeatureFlags message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IFeatureFlags, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified FeatureFlags message, length delimited. Does not implicitly {@link google.bigtable.v2.FeatureFlags.verify|verify} messages.
                 * @param message FeatureFlags message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IFeatureFlags, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a FeatureFlags message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns FeatureFlags
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.FeatureFlags;

                /**
                 * Decodes a FeatureFlags message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns FeatureFlags
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.FeatureFlags;

                /**
                 * Verifies a FeatureFlags message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a FeatureFlags message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns FeatureFlags
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.FeatureFlags;

                /**
                 * Creates a plain object from a FeatureFlags message. Also converts values to other types if specified.
                 * @param message FeatureFlags
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.FeatureFlags, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this FeatureFlags to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for FeatureFlags
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ResponseParams. */
            interface IResponseParams {

                /** ResponseParams zoneId */
                zoneId?: (string|null);

                /** ResponseParams clusterId */
                clusterId?: (string|null);
            }

            /** Represents a ResponseParams. */
            class ResponseParams implements IResponseParams {

                /**
                 * Constructs a new ResponseParams.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.bigtable.v2.IResponseParams);

                /** ResponseParams zoneId. */
                public zoneId?: (string|null);

                /** ResponseParams clusterId. */
                public clusterId?: (string|null);

                /** ResponseParams _zoneId. */
                public _zoneId?: "zoneId";

                /** ResponseParams _clusterId. */
                public _clusterId?: "clusterId";

                /**
                 * Creates a new ResponseParams instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResponseParams instance
                 */
                public static create(properties?: google.bigtable.v2.IResponseParams): google.bigtable.v2.ResponseParams;

                /**
                 * Encodes the specified ResponseParams message. Does not implicitly {@link google.bigtable.v2.ResponseParams.verify|verify} messages.
                 * @param message ResponseParams message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.bigtable.v2.IResponseParams, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ResponseParams message, length delimited. Does not implicitly {@link google.bigtable.v2.ResponseParams.verify|verify} messages.
                 * @param message ResponseParams message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.bigtable.v2.IResponseParams, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResponseParams message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ResponseParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.v2.ResponseParams;

                /**
                 * Decodes a ResponseParams message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ResponseParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.v2.ResponseParams;

                /**
                 * Verifies a ResponseParams message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ResponseParams message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ResponseParams
                 */
                public static fromObject(object: { [k: string]: any }): google.bigtable.v2.ResponseParams;

                /**
                 * Creates a plain object from a ResponseParams message. Also converts values to other types if specified.
                 * @param message ResponseParams
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.bigtable.v2.ResponseParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ResponseParams to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ResponseParams
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }

    /** Namespace api. */
    namespace api {

        /** Properties of a Http. */
        interface IHttp {

            /** Http rules */
            rules?: (google.api.IHttpRule[]|null);

            /** Http fullyDecodeReservedExpansion */
            fullyDecodeReservedExpansion?: (boolean|null);
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

            /** Http fullyDecodeReservedExpansion. */
            public fullyDecodeReservedExpansion: boolean;

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

            /**
             * Gets the default type url for Http
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /** HttpRule responseBody */
            responseBody?: (string|null);

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
            public get?: (string|null);

            /** HttpRule put. */
            public put?: (string|null);

            /** HttpRule post. */
            public post?: (string|null);

            /** HttpRule delete. */
            public delete?: (string|null);

            /** HttpRule patch. */
            public patch?: (string|null);

            /** HttpRule custom. */
            public custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule body. */
            public body: string;

            /** HttpRule responseBody. */
            public responseBody: string;

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

            /**
             * Gets the default type url for HttpRule
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for CustomHttpPattern
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CommonLanguageSettings. */
        interface ICommonLanguageSettings {

            /** CommonLanguageSettings referenceDocsUri */
            referenceDocsUri?: (string|null);

            /** CommonLanguageSettings destinations */
            destinations?: (google.api.ClientLibraryDestination[]|null);
        }

        /** Represents a CommonLanguageSettings. */
        class CommonLanguageSettings implements ICommonLanguageSettings {

            /**
             * Constructs a new CommonLanguageSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.ICommonLanguageSettings);

            /** CommonLanguageSettings referenceDocsUri. */
            public referenceDocsUri: string;

            /** CommonLanguageSettings destinations. */
            public destinations: google.api.ClientLibraryDestination[];

            /**
             * Creates a new CommonLanguageSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CommonLanguageSettings instance
             */
            public static create(properties?: google.api.ICommonLanguageSettings): google.api.CommonLanguageSettings;

            /**
             * Encodes the specified CommonLanguageSettings message. Does not implicitly {@link google.api.CommonLanguageSettings.verify|verify} messages.
             * @param message CommonLanguageSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.ICommonLanguageSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CommonLanguageSettings message, length delimited. Does not implicitly {@link google.api.CommonLanguageSettings.verify|verify} messages.
             * @param message CommonLanguageSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.ICommonLanguageSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CommonLanguageSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CommonLanguageSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.CommonLanguageSettings;

            /**
             * Decodes a CommonLanguageSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CommonLanguageSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.CommonLanguageSettings;

            /**
             * Verifies a CommonLanguageSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CommonLanguageSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CommonLanguageSettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.CommonLanguageSettings;

            /**
             * Creates a plain object from a CommonLanguageSettings message. Also converts values to other types if specified.
             * @param message CommonLanguageSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.CommonLanguageSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CommonLanguageSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CommonLanguageSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ClientLibrarySettings. */
        interface IClientLibrarySettings {

            /** ClientLibrarySettings version */
            version?: (string|null);

            /** ClientLibrarySettings launchStage */
            launchStage?: (google.api.LaunchStage|keyof typeof google.api.LaunchStage|null);

            /** ClientLibrarySettings restNumericEnums */
            restNumericEnums?: (boolean|null);

            /** ClientLibrarySettings javaSettings */
            javaSettings?: (google.api.IJavaSettings|null);

            /** ClientLibrarySettings cppSettings */
            cppSettings?: (google.api.ICppSettings|null);

            /** ClientLibrarySettings phpSettings */
            phpSettings?: (google.api.IPhpSettings|null);

            /** ClientLibrarySettings pythonSettings */
            pythonSettings?: (google.api.IPythonSettings|null);

            /** ClientLibrarySettings nodeSettings */
            nodeSettings?: (google.api.INodeSettings|null);

            /** ClientLibrarySettings dotnetSettings */
            dotnetSettings?: (google.api.IDotnetSettings|null);

            /** ClientLibrarySettings rubySettings */
            rubySettings?: (google.api.IRubySettings|null);

            /** ClientLibrarySettings goSettings */
            goSettings?: (google.api.IGoSettings|null);
        }

        /** Represents a ClientLibrarySettings. */
        class ClientLibrarySettings implements IClientLibrarySettings {

            /**
             * Constructs a new ClientLibrarySettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IClientLibrarySettings);

            /** ClientLibrarySettings version. */
            public version: string;

            /** ClientLibrarySettings launchStage. */
            public launchStage: (google.api.LaunchStage|keyof typeof google.api.LaunchStage);

            /** ClientLibrarySettings restNumericEnums. */
            public restNumericEnums: boolean;

            /** ClientLibrarySettings javaSettings. */
            public javaSettings?: (google.api.IJavaSettings|null);

            /** ClientLibrarySettings cppSettings. */
            public cppSettings?: (google.api.ICppSettings|null);

            /** ClientLibrarySettings phpSettings. */
            public phpSettings?: (google.api.IPhpSettings|null);

            /** ClientLibrarySettings pythonSettings. */
            public pythonSettings?: (google.api.IPythonSettings|null);

            /** ClientLibrarySettings nodeSettings. */
            public nodeSettings?: (google.api.INodeSettings|null);

            /** ClientLibrarySettings dotnetSettings. */
            public dotnetSettings?: (google.api.IDotnetSettings|null);

            /** ClientLibrarySettings rubySettings. */
            public rubySettings?: (google.api.IRubySettings|null);

            /** ClientLibrarySettings goSettings. */
            public goSettings?: (google.api.IGoSettings|null);

            /**
             * Creates a new ClientLibrarySettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientLibrarySettings instance
             */
            public static create(properties?: google.api.IClientLibrarySettings): google.api.ClientLibrarySettings;

            /**
             * Encodes the specified ClientLibrarySettings message. Does not implicitly {@link google.api.ClientLibrarySettings.verify|verify} messages.
             * @param message ClientLibrarySettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IClientLibrarySettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientLibrarySettings message, length delimited. Does not implicitly {@link google.api.ClientLibrarySettings.verify|verify} messages.
             * @param message ClientLibrarySettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IClientLibrarySettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientLibrarySettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClientLibrarySettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.ClientLibrarySettings;

            /**
             * Decodes a ClientLibrarySettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClientLibrarySettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.ClientLibrarySettings;

            /**
             * Verifies a ClientLibrarySettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClientLibrarySettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClientLibrarySettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.ClientLibrarySettings;

            /**
             * Creates a plain object from a ClientLibrarySettings message. Also converts values to other types if specified.
             * @param message ClientLibrarySettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.ClientLibrarySettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClientLibrarySettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ClientLibrarySettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Publishing. */
        interface IPublishing {

            /** Publishing methodSettings */
            methodSettings?: (google.api.IMethodSettings[]|null);

            /** Publishing newIssueUri */
            newIssueUri?: (string|null);

            /** Publishing documentationUri */
            documentationUri?: (string|null);

            /** Publishing apiShortName */
            apiShortName?: (string|null);

            /** Publishing githubLabel */
            githubLabel?: (string|null);

            /** Publishing codeownerGithubTeams */
            codeownerGithubTeams?: (string[]|null);

            /** Publishing docTagPrefix */
            docTagPrefix?: (string|null);

            /** Publishing organization */
            organization?: (google.api.ClientLibraryOrganization|keyof typeof google.api.ClientLibraryOrganization|null);

            /** Publishing librarySettings */
            librarySettings?: (google.api.IClientLibrarySettings[]|null);

            /** Publishing protoReferenceDocumentationUri */
            protoReferenceDocumentationUri?: (string|null);
        }

        /** Represents a Publishing. */
        class Publishing implements IPublishing {

            /**
             * Constructs a new Publishing.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IPublishing);

            /** Publishing methodSettings. */
            public methodSettings: google.api.IMethodSettings[];

            /** Publishing newIssueUri. */
            public newIssueUri: string;

            /** Publishing documentationUri. */
            public documentationUri: string;

            /** Publishing apiShortName. */
            public apiShortName: string;

            /** Publishing githubLabel. */
            public githubLabel: string;

            /** Publishing codeownerGithubTeams. */
            public codeownerGithubTeams: string[];

            /** Publishing docTagPrefix. */
            public docTagPrefix: string;

            /** Publishing organization. */
            public organization: (google.api.ClientLibraryOrganization|keyof typeof google.api.ClientLibraryOrganization);

            /** Publishing librarySettings. */
            public librarySettings: google.api.IClientLibrarySettings[];

            /** Publishing protoReferenceDocumentationUri. */
            public protoReferenceDocumentationUri: string;

            /**
             * Creates a new Publishing instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Publishing instance
             */
            public static create(properties?: google.api.IPublishing): google.api.Publishing;

            /**
             * Encodes the specified Publishing message. Does not implicitly {@link google.api.Publishing.verify|verify} messages.
             * @param message Publishing message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IPublishing, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Publishing message, length delimited. Does not implicitly {@link google.api.Publishing.verify|verify} messages.
             * @param message Publishing message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IPublishing, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Publishing message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Publishing
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.Publishing;

            /**
             * Decodes a Publishing message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Publishing
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.Publishing;

            /**
             * Verifies a Publishing message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Publishing message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Publishing
             */
            public static fromObject(object: { [k: string]: any }): google.api.Publishing;

            /**
             * Creates a plain object from a Publishing message. Also converts values to other types if specified.
             * @param message Publishing
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.Publishing, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Publishing to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Publishing
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a JavaSettings. */
        interface IJavaSettings {

            /** JavaSettings libraryPackage */
            libraryPackage?: (string|null);

            /** JavaSettings serviceClassNames */
            serviceClassNames?: ({ [k: string]: string }|null);

            /** JavaSettings common */
            common?: (google.api.ICommonLanguageSettings|null);
        }

        /** Represents a JavaSettings. */
        class JavaSettings implements IJavaSettings {

            /**
             * Constructs a new JavaSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IJavaSettings);

            /** JavaSettings libraryPackage. */
            public libraryPackage: string;

            /** JavaSettings serviceClassNames. */
            public serviceClassNames: { [k: string]: string };

            /** JavaSettings common. */
            public common?: (google.api.ICommonLanguageSettings|null);

            /**
             * Creates a new JavaSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns JavaSettings instance
             */
            public static create(properties?: google.api.IJavaSettings): google.api.JavaSettings;

            /**
             * Encodes the specified JavaSettings message. Does not implicitly {@link google.api.JavaSettings.verify|verify} messages.
             * @param message JavaSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IJavaSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified JavaSettings message, length delimited. Does not implicitly {@link google.api.JavaSettings.verify|verify} messages.
             * @param message JavaSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IJavaSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a JavaSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns JavaSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.JavaSettings;

            /**
             * Decodes a JavaSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns JavaSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.JavaSettings;

            /**
             * Verifies a JavaSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a JavaSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns JavaSettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.JavaSettings;

            /**
             * Creates a plain object from a JavaSettings message. Also converts values to other types if specified.
             * @param message JavaSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.JavaSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this JavaSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for JavaSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CppSettings. */
        interface ICppSettings {

            /** CppSettings common */
            common?: (google.api.ICommonLanguageSettings|null);
        }

        /** Represents a CppSettings. */
        class CppSettings implements ICppSettings {

            /**
             * Constructs a new CppSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.ICppSettings);

            /** CppSettings common. */
            public common?: (google.api.ICommonLanguageSettings|null);

            /**
             * Creates a new CppSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CppSettings instance
             */
            public static create(properties?: google.api.ICppSettings): google.api.CppSettings;

            /**
             * Encodes the specified CppSettings message. Does not implicitly {@link google.api.CppSettings.verify|verify} messages.
             * @param message CppSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.ICppSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CppSettings message, length delimited. Does not implicitly {@link google.api.CppSettings.verify|verify} messages.
             * @param message CppSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.ICppSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CppSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CppSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.CppSettings;

            /**
             * Decodes a CppSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CppSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.CppSettings;

            /**
             * Verifies a CppSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CppSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CppSettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.CppSettings;

            /**
             * Creates a plain object from a CppSettings message. Also converts values to other types if specified.
             * @param message CppSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.CppSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CppSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CppSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PhpSettings. */
        interface IPhpSettings {

            /** PhpSettings common */
            common?: (google.api.ICommonLanguageSettings|null);
        }

        /** Represents a PhpSettings. */
        class PhpSettings implements IPhpSettings {

            /**
             * Constructs a new PhpSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IPhpSettings);

            /** PhpSettings common. */
            public common?: (google.api.ICommonLanguageSettings|null);

            /**
             * Creates a new PhpSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PhpSettings instance
             */
            public static create(properties?: google.api.IPhpSettings): google.api.PhpSettings;

            /**
             * Encodes the specified PhpSettings message. Does not implicitly {@link google.api.PhpSettings.verify|verify} messages.
             * @param message PhpSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IPhpSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PhpSettings message, length delimited. Does not implicitly {@link google.api.PhpSettings.verify|verify} messages.
             * @param message PhpSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IPhpSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PhpSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PhpSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.PhpSettings;

            /**
             * Decodes a PhpSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PhpSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.PhpSettings;

            /**
             * Verifies a PhpSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PhpSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PhpSettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.PhpSettings;

            /**
             * Creates a plain object from a PhpSettings message. Also converts values to other types if specified.
             * @param message PhpSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.PhpSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PhpSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PhpSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a PythonSettings. */
        interface IPythonSettings {

            /** PythonSettings common */
            common?: (google.api.ICommonLanguageSettings|null);
        }

        /** Represents a PythonSettings. */
        class PythonSettings implements IPythonSettings {

            /**
             * Constructs a new PythonSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IPythonSettings);

            /** PythonSettings common. */
            public common?: (google.api.ICommonLanguageSettings|null);

            /**
             * Creates a new PythonSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PythonSettings instance
             */
            public static create(properties?: google.api.IPythonSettings): google.api.PythonSettings;

            /**
             * Encodes the specified PythonSettings message. Does not implicitly {@link google.api.PythonSettings.verify|verify} messages.
             * @param message PythonSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IPythonSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PythonSettings message, length delimited. Does not implicitly {@link google.api.PythonSettings.verify|verify} messages.
             * @param message PythonSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IPythonSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PythonSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PythonSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.PythonSettings;

            /**
             * Decodes a PythonSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PythonSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.PythonSettings;

            /**
             * Verifies a PythonSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PythonSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PythonSettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.PythonSettings;

            /**
             * Creates a plain object from a PythonSettings message. Also converts values to other types if specified.
             * @param message PythonSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.PythonSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PythonSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PythonSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a NodeSettings. */
        interface INodeSettings {

            /** NodeSettings common */
            common?: (google.api.ICommonLanguageSettings|null);
        }

        /** Represents a NodeSettings. */
        class NodeSettings implements INodeSettings {

            /**
             * Constructs a new NodeSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.INodeSettings);

            /** NodeSettings common. */
            public common?: (google.api.ICommonLanguageSettings|null);

            /**
             * Creates a new NodeSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NodeSettings instance
             */
            public static create(properties?: google.api.INodeSettings): google.api.NodeSettings;

            /**
             * Encodes the specified NodeSettings message. Does not implicitly {@link google.api.NodeSettings.verify|verify} messages.
             * @param message NodeSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.INodeSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NodeSettings message, length delimited. Does not implicitly {@link google.api.NodeSettings.verify|verify} messages.
             * @param message NodeSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.INodeSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NodeSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NodeSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.NodeSettings;

            /**
             * Decodes a NodeSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NodeSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.NodeSettings;

            /**
             * Verifies a NodeSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NodeSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NodeSettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.NodeSettings;

            /**
             * Creates a plain object from a NodeSettings message. Also converts values to other types if specified.
             * @param message NodeSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.NodeSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NodeSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NodeSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DotnetSettings. */
        interface IDotnetSettings {

            /** DotnetSettings common */
            common?: (google.api.ICommonLanguageSettings|null);

            /** DotnetSettings renamedServices */
            renamedServices?: ({ [k: string]: string }|null);

            /** DotnetSettings renamedResources */
            renamedResources?: ({ [k: string]: string }|null);

            /** DotnetSettings ignoredResources */
            ignoredResources?: (string[]|null);

            /** DotnetSettings forcedNamespaceAliases */
            forcedNamespaceAliases?: (string[]|null);

            /** DotnetSettings handwrittenSignatures */
            handwrittenSignatures?: (string[]|null);
        }

        /** Represents a DotnetSettings. */
        class DotnetSettings implements IDotnetSettings {

            /**
             * Constructs a new DotnetSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IDotnetSettings);

            /** DotnetSettings common. */
            public common?: (google.api.ICommonLanguageSettings|null);

            /** DotnetSettings renamedServices. */
            public renamedServices: { [k: string]: string };

            /** DotnetSettings renamedResources. */
            public renamedResources: { [k: string]: string };

            /** DotnetSettings ignoredResources. */
            public ignoredResources: string[];

            /** DotnetSettings forcedNamespaceAliases. */
            public forcedNamespaceAliases: string[];

            /** DotnetSettings handwrittenSignatures. */
            public handwrittenSignatures: string[];

            /**
             * Creates a new DotnetSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DotnetSettings instance
             */
            public static create(properties?: google.api.IDotnetSettings): google.api.DotnetSettings;

            /**
             * Encodes the specified DotnetSettings message. Does not implicitly {@link google.api.DotnetSettings.verify|verify} messages.
             * @param message DotnetSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IDotnetSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DotnetSettings message, length delimited. Does not implicitly {@link google.api.DotnetSettings.verify|verify} messages.
             * @param message DotnetSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IDotnetSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DotnetSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DotnetSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.DotnetSettings;

            /**
             * Decodes a DotnetSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DotnetSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.DotnetSettings;

            /**
             * Verifies a DotnetSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DotnetSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DotnetSettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.DotnetSettings;

            /**
             * Creates a plain object from a DotnetSettings message. Also converts values to other types if specified.
             * @param message DotnetSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.DotnetSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DotnetSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DotnetSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RubySettings. */
        interface IRubySettings {

            /** RubySettings common */
            common?: (google.api.ICommonLanguageSettings|null);
        }

        /** Represents a RubySettings. */
        class RubySettings implements IRubySettings {

            /**
             * Constructs a new RubySettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IRubySettings);

            /** RubySettings common. */
            public common?: (google.api.ICommonLanguageSettings|null);

            /**
             * Creates a new RubySettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RubySettings instance
             */
            public static create(properties?: google.api.IRubySettings): google.api.RubySettings;

            /**
             * Encodes the specified RubySettings message. Does not implicitly {@link google.api.RubySettings.verify|verify} messages.
             * @param message RubySettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IRubySettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RubySettings message, length delimited. Does not implicitly {@link google.api.RubySettings.verify|verify} messages.
             * @param message RubySettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IRubySettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RubySettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RubySettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.RubySettings;

            /**
             * Decodes a RubySettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RubySettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.RubySettings;

            /**
             * Verifies a RubySettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RubySettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RubySettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.RubySettings;

            /**
             * Creates a plain object from a RubySettings message. Also converts values to other types if specified.
             * @param message RubySettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.RubySettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RubySettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RubySettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a GoSettings. */
        interface IGoSettings {

            /** GoSettings common */
            common?: (google.api.ICommonLanguageSettings|null);
        }

        /** Represents a GoSettings. */
        class GoSettings implements IGoSettings {

            /**
             * Constructs a new GoSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IGoSettings);

            /** GoSettings common. */
            public common?: (google.api.ICommonLanguageSettings|null);

            /**
             * Creates a new GoSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GoSettings instance
             */
            public static create(properties?: google.api.IGoSettings): google.api.GoSettings;

            /**
             * Encodes the specified GoSettings message. Does not implicitly {@link google.api.GoSettings.verify|verify} messages.
             * @param message GoSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IGoSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GoSettings message, length delimited. Does not implicitly {@link google.api.GoSettings.verify|verify} messages.
             * @param message GoSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IGoSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GoSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GoSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.GoSettings;

            /**
             * Decodes a GoSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GoSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.GoSettings;

            /**
             * Verifies a GoSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GoSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GoSettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.GoSettings;

            /**
             * Creates a plain object from a GoSettings message. Also converts values to other types if specified.
             * @param message GoSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.GoSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GoSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for GoSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MethodSettings. */
        interface IMethodSettings {

            /** MethodSettings selector */
            selector?: (string|null);

            /** MethodSettings longRunning */
            longRunning?: (google.api.MethodSettings.ILongRunning|null);
        }

        /** Represents a MethodSettings. */
        class MethodSettings implements IMethodSettings {

            /**
             * Constructs a new MethodSettings.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IMethodSettings);

            /** MethodSettings selector. */
            public selector: string;

            /** MethodSettings longRunning. */
            public longRunning?: (google.api.MethodSettings.ILongRunning|null);

            /**
             * Creates a new MethodSettings instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MethodSettings instance
             */
            public static create(properties?: google.api.IMethodSettings): google.api.MethodSettings;

            /**
             * Encodes the specified MethodSettings message. Does not implicitly {@link google.api.MethodSettings.verify|verify} messages.
             * @param message MethodSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IMethodSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodSettings message, length delimited. Does not implicitly {@link google.api.MethodSettings.verify|verify} messages.
             * @param message MethodSettings message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IMethodSettings, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodSettings message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.MethodSettings;

            /**
             * Decodes a MethodSettings message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodSettings
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.MethodSettings;

            /**
             * Verifies a MethodSettings message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodSettings message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodSettings
             */
            public static fromObject(object: { [k: string]: any }): google.api.MethodSettings;

            /**
             * Creates a plain object from a MethodSettings message. Also converts values to other types if specified.
             * @param message MethodSettings
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.MethodSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodSettings to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MethodSettings
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace MethodSettings {

            /** Properties of a LongRunning. */
            interface ILongRunning {

                /** LongRunning initialPollDelay */
                initialPollDelay?: (google.protobuf.IDuration|null);

                /** LongRunning pollDelayMultiplier */
                pollDelayMultiplier?: (number|null);

                /** LongRunning maxPollDelay */
                maxPollDelay?: (google.protobuf.IDuration|null);

                /** LongRunning totalPollTimeout */
                totalPollTimeout?: (google.protobuf.IDuration|null);
            }

            /** Represents a LongRunning. */
            class LongRunning implements ILongRunning {

                /**
                 * Constructs a new LongRunning.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.api.MethodSettings.ILongRunning);

                /** LongRunning initialPollDelay. */
                public initialPollDelay?: (google.protobuf.IDuration|null);

                /** LongRunning pollDelayMultiplier. */
                public pollDelayMultiplier: number;

                /** LongRunning maxPollDelay. */
                public maxPollDelay?: (google.protobuf.IDuration|null);

                /** LongRunning totalPollTimeout. */
                public totalPollTimeout?: (google.protobuf.IDuration|null);

                /**
                 * Creates a new LongRunning instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LongRunning instance
                 */
                public static create(properties?: google.api.MethodSettings.ILongRunning): google.api.MethodSettings.LongRunning;

                /**
                 * Encodes the specified LongRunning message. Does not implicitly {@link google.api.MethodSettings.LongRunning.verify|verify} messages.
                 * @param message LongRunning message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.api.MethodSettings.ILongRunning, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LongRunning message, length delimited. Does not implicitly {@link google.api.MethodSettings.LongRunning.verify|verify} messages.
                 * @param message LongRunning message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.api.MethodSettings.ILongRunning, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LongRunning message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LongRunning
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.MethodSettings.LongRunning;

                /**
                 * Decodes a LongRunning message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LongRunning
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.MethodSettings.LongRunning;

                /**
                 * Verifies a LongRunning message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LongRunning message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LongRunning
                 */
                public static fromObject(object: { [k: string]: any }): google.api.MethodSettings.LongRunning;

                /**
                 * Creates a plain object from a LongRunning message. Also converts values to other types if specified.
                 * @param message LongRunning
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.api.MethodSettings.LongRunning, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LongRunning to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for LongRunning
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** ClientLibraryOrganization enum. */
        enum ClientLibraryOrganization {
            CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED = 0,
            CLOUD = 1,
            ADS = 2,
            PHOTOS = 3,
            STREET_VIEW = 4,
            SHOPPING = 5,
            GEO = 6,
            GENERATIVE_AI = 7
        }

        /** ClientLibraryDestination enum. */
        enum ClientLibraryDestination {
            CLIENT_LIBRARY_DESTINATION_UNSPECIFIED = 0,
            GITHUB = 10,
            PACKAGE_MANAGER = 20
        }

        /** LaunchStage enum. */
        enum LaunchStage {
            LAUNCH_STAGE_UNSPECIFIED = 0,
            UNIMPLEMENTED = 6,
            PRELAUNCH = 7,
            EARLY_ACCESS = 1,
            ALPHA = 2,
            BETA = 3,
            GA = 4,
            DEPRECATED = 5
        }

        /** FieldBehavior enum. */
        enum FieldBehavior {
            FIELD_BEHAVIOR_UNSPECIFIED = 0,
            OPTIONAL = 1,
            REQUIRED = 2,
            OUTPUT_ONLY = 3,
            INPUT_ONLY = 4,
            IMMUTABLE = 5,
            UNORDERED_LIST = 6,
            NON_EMPTY_DEFAULT = 7
        }

        /** Properties of a ResourceDescriptor. */
        interface IResourceDescriptor {

            /** ResourceDescriptor type */
            type?: (string|null);

            /** ResourceDescriptor pattern */
            pattern?: (string[]|null);

            /** ResourceDescriptor nameField */
            nameField?: (string|null);

            /** ResourceDescriptor history */
            history?: (google.api.ResourceDescriptor.History|keyof typeof google.api.ResourceDescriptor.History|null);

            /** ResourceDescriptor plural */
            plural?: (string|null);

            /** ResourceDescriptor singular */
            singular?: (string|null);

            /** ResourceDescriptor style */
            style?: (google.api.ResourceDescriptor.Style[]|null);
        }

        /** Represents a ResourceDescriptor. */
        class ResourceDescriptor implements IResourceDescriptor {

            /**
             * Constructs a new ResourceDescriptor.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IResourceDescriptor);

            /** ResourceDescriptor type. */
            public type: string;

            /** ResourceDescriptor pattern. */
            public pattern: string[];

            /** ResourceDescriptor nameField. */
            public nameField: string;

            /** ResourceDescriptor history. */
            public history: (google.api.ResourceDescriptor.History|keyof typeof google.api.ResourceDescriptor.History);

            /** ResourceDescriptor plural. */
            public plural: string;

            /** ResourceDescriptor singular. */
            public singular: string;

            /** ResourceDescriptor style. */
            public style: google.api.ResourceDescriptor.Style[];

            /**
             * Creates a new ResourceDescriptor instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ResourceDescriptor instance
             */
            public static create(properties?: google.api.IResourceDescriptor): google.api.ResourceDescriptor;

            /**
             * Encodes the specified ResourceDescriptor message. Does not implicitly {@link google.api.ResourceDescriptor.verify|verify} messages.
             * @param message ResourceDescriptor message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IResourceDescriptor, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResourceDescriptor message, length delimited. Does not implicitly {@link google.api.ResourceDescriptor.verify|verify} messages.
             * @param message ResourceDescriptor message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IResourceDescriptor, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResourceDescriptor message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResourceDescriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.ResourceDescriptor;

            /**
             * Decodes a ResourceDescriptor message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResourceDescriptor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.ResourceDescriptor;

            /**
             * Verifies a ResourceDescriptor message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResourceDescriptor message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResourceDescriptor
             */
            public static fromObject(object: { [k: string]: any }): google.api.ResourceDescriptor;

            /**
             * Creates a plain object from a ResourceDescriptor message. Also converts values to other types if specified.
             * @param message ResourceDescriptor
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.ResourceDescriptor, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResourceDescriptor to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ResourceDescriptor
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace ResourceDescriptor {

            /** History enum. */
            enum History {
                HISTORY_UNSPECIFIED = 0,
                ORIGINALLY_SINGLE_PATTERN = 1,
                FUTURE_MULTI_PATTERN = 2
            }

            /** Style enum. */
            enum Style {
                STYLE_UNSPECIFIED = 0,
                DECLARATIVE_FRIENDLY = 1
            }
        }

        /** Properties of a ResourceReference. */
        interface IResourceReference {

            /** ResourceReference type */
            type?: (string|null);

            /** ResourceReference childType */
            childType?: (string|null);
        }

        /** Represents a ResourceReference. */
        class ResourceReference implements IResourceReference {

            /**
             * Constructs a new ResourceReference.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IResourceReference);

            /** ResourceReference type. */
            public type: string;

            /** ResourceReference childType. */
            public childType: string;

            /**
             * Creates a new ResourceReference instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ResourceReference instance
             */
            public static create(properties?: google.api.IResourceReference): google.api.ResourceReference;

            /**
             * Encodes the specified ResourceReference message. Does not implicitly {@link google.api.ResourceReference.verify|verify} messages.
             * @param message ResourceReference message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IResourceReference, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ResourceReference message, length delimited. Does not implicitly {@link google.api.ResourceReference.verify|verify} messages.
             * @param message ResourceReference message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IResourceReference, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ResourceReference message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ResourceReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.ResourceReference;

            /**
             * Decodes a ResourceReference message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ResourceReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.ResourceReference;

            /**
             * Verifies a ResourceReference message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ResourceReference message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ResourceReference
             */
            public static fromObject(object: { [k: string]: any }): google.api.ResourceReference;

            /**
             * Creates a plain object from a ResourceReference message. Also converts values to other types if specified.
             * @param message ResourceReference
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.ResourceReference, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ResourceReference to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ResourceReference
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RoutingRule. */
        interface IRoutingRule {

            /** RoutingRule routingParameters */
            routingParameters?: (google.api.IRoutingParameter[]|null);
        }

        /** Represents a RoutingRule. */
        class RoutingRule implements IRoutingRule {

            /**
             * Constructs a new RoutingRule.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IRoutingRule);

            /** RoutingRule routingParameters. */
            public routingParameters: google.api.IRoutingParameter[];

            /**
             * Creates a new RoutingRule instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RoutingRule instance
             */
            public static create(properties?: google.api.IRoutingRule): google.api.RoutingRule;

            /**
             * Encodes the specified RoutingRule message. Does not implicitly {@link google.api.RoutingRule.verify|verify} messages.
             * @param message RoutingRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IRoutingRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RoutingRule message, length delimited. Does not implicitly {@link google.api.RoutingRule.verify|verify} messages.
             * @param message RoutingRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IRoutingRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RoutingRule message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RoutingRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.RoutingRule;

            /**
             * Decodes a RoutingRule message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RoutingRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.RoutingRule;

            /**
             * Verifies a RoutingRule message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RoutingRule message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RoutingRule
             */
            public static fromObject(object: { [k: string]: any }): google.api.RoutingRule;

            /**
             * Creates a plain object from a RoutingRule message. Also converts values to other types if specified.
             * @param message RoutingRule
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.RoutingRule, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RoutingRule to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RoutingRule
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a RoutingParameter. */
        interface IRoutingParameter {

            /** RoutingParameter field */
            field?: (string|null);

            /** RoutingParameter pathTemplate */
            pathTemplate?: (string|null);
        }

        /** Represents a RoutingParameter. */
        class RoutingParameter implements IRoutingParameter {

            /**
             * Constructs a new RoutingParameter.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IRoutingParameter);

            /** RoutingParameter field. */
            public field: string;

            /** RoutingParameter pathTemplate. */
            public pathTemplate: string;

            /**
             * Creates a new RoutingParameter instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RoutingParameter instance
             */
            public static create(properties?: google.api.IRoutingParameter): google.api.RoutingParameter;

            /**
             * Encodes the specified RoutingParameter message. Does not implicitly {@link google.api.RoutingParameter.verify|verify} messages.
             * @param message RoutingParameter message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IRoutingParameter, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RoutingParameter message, length delimited. Does not implicitly {@link google.api.RoutingParameter.verify|verify} messages.
             * @param message RoutingParameter message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IRoutingParameter, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RoutingParameter message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RoutingParameter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.RoutingParameter;

            /**
             * Decodes a RoutingParameter message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RoutingParameter
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.RoutingParameter;

            /**
             * Verifies a RoutingParameter message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RoutingParameter message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RoutingParameter
             */
            public static fromObject(object: { [k: string]: any }): google.api.RoutingParameter;

            /**
             * Creates a plain object from a RoutingParameter message. Also converts values to other types if specified.
             * @param message RoutingParameter
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.RoutingParameter, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RoutingParameter to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for RoutingParameter
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for FileDescriptorSet
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /** FileDescriptorProto edition */
            edition?: (string|null);
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

            /** FileDescriptorProto edition. */
            public edition: string;

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

            /**
             * Gets the default type url for FileDescriptorProto
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for DescriptorProto
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace DescriptorProto {

            /** Properties of an ExtensionRange. */
            interface IExtensionRange {

                /** ExtensionRange start */
                start?: (number|null);

                /** ExtensionRange end */
                end?: (number|null);

                /** ExtensionRange options */
                options?: (google.protobuf.IExtensionRangeOptions|null);
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

                /** ExtensionRange options. */
                public options?: (google.protobuf.IExtensionRangeOptions|null);

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

                /**
                 * Gets the default type url for ExtensionRange
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for ReservedRange
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of an ExtensionRangeOptions. */
        interface IExtensionRangeOptions {

            /** ExtensionRangeOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** ExtensionRangeOptions declaration */
            declaration?: (google.protobuf.ExtensionRangeOptions.IDeclaration[]|null);

            /** ExtensionRangeOptions features */
            features?: (google.protobuf.IFeatureSet|null);

            /** ExtensionRangeOptions verification */
            verification?: (google.protobuf.ExtensionRangeOptions.VerificationState|keyof typeof google.protobuf.ExtensionRangeOptions.VerificationState|null);
        }

        /** Represents an ExtensionRangeOptions. */
        class ExtensionRangeOptions implements IExtensionRangeOptions {

            /**
             * Constructs a new ExtensionRangeOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IExtensionRangeOptions);

            /** ExtensionRangeOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /** ExtensionRangeOptions declaration. */
            public declaration: google.protobuf.ExtensionRangeOptions.IDeclaration[];

            /** ExtensionRangeOptions features. */
            public features?: (google.protobuf.IFeatureSet|null);

            /** ExtensionRangeOptions verification. */
            public verification: (google.protobuf.ExtensionRangeOptions.VerificationState|keyof typeof google.protobuf.ExtensionRangeOptions.VerificationState);

            /**
             * Creates a new ExtensionRangeOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ExtensionRangeOptions instance
             */
            public static create(properties?: google.protobuf.IExtensionRangeOptions): google.protobuf.ExtensionRangeOptions;

            /**
             * Encodes the specified ExtensionRangeOptions message. Does not implicitly {@link google.protobuf.ExtensionRangeOptions.verify|verify} messages.
             * @param message ExtensionRangeOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IExtensionRangeOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ExtensionRangeOptions message, length delimited. Does not implicitly {@link google.protobuf.ExtensionRangeOptions.verify|verify} messages.
             * @param message ExtensionRangeOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IExtensionRangeOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ExtensionRangeOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ExtensionRangeOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ExtensionRangeOptions;

            /**
             * Decodes an ExtensionRangeOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ExtensionRangeOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ExtensionRangeOptions;

            /**
             * Verifies an ExtensionRangeOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ExtensionRangeOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ExtensionRangeOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ExtensionRangeOptions;

            /**
             * Creates a plain object from an ExtensionRangeOptions message. Also converts values to other types if specified.
             * @param message ExtensionRangeOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ExtensionRangeOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ExtensionRangeOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ExtensionRangeOptions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace ExtensionRangeOptions {

            /** Properties of a Declaration. */
            interface IDeclaration {

                /** Declaration number */
                number?: (number|null);

                /** Declaration fullName */
                fullName?: (string|null);

                /** Declaration type */
                type?: (string|null);

                /** Declaration reserved */
                reserved?: (boolean|null);

                /** Declaration repeated */
                repeated?: (boolean|null);
            }

            /** Represents a Declaration. */
            class Declaration implements IDeclaration {

                /**
                 * Constructs a new Declaration.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.ExtensionRangeOptions.IDeclaration);

                /** Declaration number. */
                public number: number;

                /** Declaration fullName. */
                public fullName: string;

                /** Declaration type. */
                public type: string;

                /** Declaration reserved. */
                public reserved: boolean;

                /** Declaration repeated. */
                public repeated: boolean;

                /**
                 * Creates a new Declaration instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Declaration instance
                 */
                public static create(properties?: google.protobuf.ExtensionRangeOptions.IDeclaration): google.protobuf.ExtensionRangeOptions.Declaration;

                /**
                 * Encodes the specified Declaration message. Does not implicitly {@link google.protobuf.ExtensionRangeOptions.Declaration.verify|verify} messages.
                 * @param message Declaration message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.ExtensionRangeOptions.IDeclaration, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Declaration message, length delimited. Does not implicitly {@link google.protobuf.ExtensionRangeOptions.Declaration.verify|verify} messages.
                 * @param message Declaration message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.ExtensionRangeOptions.IDeclaration, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Declaration message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Declaration
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ExtensionRangeOptions.Declaration;

                /**
                 * Decodes a Declaration message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Declaration
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ExtensionRangeOptions.Declaration;

                /**
                 * Verifies a Declaration message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Declaration message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Declaration
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.ExtensionRangeOptions.Declaration;

                /**
                 * Creates a plain object from a Declaration message. Also converts values to other types if specified.
                 * @param message Declaration
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.ExtensionRangeOptions.Declaration, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Declaration to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Declaration
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** VerificationState enum. */
            enum VerificationState {
                DECLARATION = 0,
                UNVERIFIED = 1
            }
        }

        /** Properties of a FieldDescriptorProto. */
        interface IFieldDescriptorProto {

            /** FieldDescriptorProto name */
            name?: (string|null);

            /** FieldDescriptorProto number */
            number?: (number|null);

            /** FieldDescriptorProto label */
            label?: (google.protobuf.FieldDescriptorProto.Label|keyof typeof google.protobuf.FieldDescriptorProto.Label|null);

            /** FieldDescriptorProto type */
            type?: (google.protobuf.FieldDescriptorProto.Type|keyof typeof google.protobuf.FieldDescriptorProto.Type|null);

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

            /** FieldDescriptorProto proto3Optional */
            proto3Optional?: (boolean|null);
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
            public label: (google.protobuf.FieldDescriptorProto.Label|keyof typeof google.protobuf.FieldDescriptorProto.Label);

            /** FieldDescriptorProto type. */
            public type: (google.protobuf.FieldDescriptorProto.Type|keyof typeof google.protobuf.FieldDescriptorProto.Type);

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

            /** FieldDescriptorProto proto3Optional. */
            public proto3Optional: boolean;

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

            /**
             * Gets the default type url for FieldDescriptorProto
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for OneofDescriptorProto
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an EnumDescriptorProto. */
        interface IEnumDescriptorProto {

            /** EnumDescriptorProto name */
            name?: (string|null);

            /** EnumDescriptorProto value */
            value?: (google.protobuf.IEnumValueDescriptorProto[]|null);

            /** EnumDescriptorProto options */
            options?: (google.protobuf.IEnumOptions|null);

            /** EnumDescriptorProto reservedRange */
            reservedRange?: (google.protobuf.EnumDescriptorProto.IEnumReservedRange[]|null);

            /** EnumDescriptorProto reservedName */
            reservedName?: (string[]|null);
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

            /** EnumDescriptorProto reservedRange. */
            public reservedRange: google.protobuf.EnumDescriptorProto.IEnumReservedRange[];

            /** EnumDescriptorProto reservedName. */
            public reservedName: string[];

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

            /**
             * Gets the default type url for EnumDescriptorProto
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace EnumDescriptorProto {

            /** Properties of an EnumReservedRange. */
            interface IEnumReservedRange {

                /** EnumReservedRange start */
                start?: (number|null);

                /** EnumReservedRange end */
                end?: (number|null);
            }

            /** Represents an EnumReservedRange. */
            class EnumReservedRange implements IEnumReservedRange {

                /**
                 * Constructs a new EnumReservedRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.EnumDescriptorProto.IEnumReservedRange);

                /** EnumReservedRange start. */
                public start: number;

                /** EnumReservedRange end. */
                public end: number;

                /**
                 * Creates a new EnumReservedRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EnumReservedRange instance
                 */
                public static create(properties?: google.protobuf.EnumDescriptorProto.IEnumReservedRange): google.protobuf.EnumDescriptorProto.EnumReservedRange;

                /**
                 * Encodes the specified EnumReservedRange message. Does not implicitly {@link google.protobuf.EnumDescriptorProto.EnumReservedRange.verify|verify} messages.
                 * @param message EnumReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.EnumDescriptorProto.IEnumReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified EnumReservedRange message, length delimited. Does not implicitly {@link google.protobuf.EnumDescriptorProto.EnumReservedRange.verify|verify} messages.
                 * @param message EnumReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.EnumDescriptorProto.IEnumReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EnumReservedRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns EnumReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto.EnumReservedRange;

                /**
                 * Decodes an EnumReservedRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns EnumReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto.EnumReservedRange;

                /**
                 * Verifies an EnumReservedRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an EnumReservedRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns EnumReservedRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto.EnumReservedRange;

                /**
                 * Creates a plain object from an EnumReservedRange message. Also converts values to other types if specified.
                 * @param message EnumReservedRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.EnumDescriptorProto.EnumReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this EnumReservedRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for EnumReservedRange
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
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

            /**
             * Gets the default type url for EnumValueDescriptorProto
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for ServiceDescriptorProto
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for MethodDescriptorProto
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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
            optimizeFor?: (google.protobuf.FileOptions.OptimizeMode|keyof typeof google.protobuf.FileOptions.OptimizeMode|null);

            /** FileOptions goPackage */
            goPackage?: (string|null);

            /** FileOptions ccGenericServices */
            ccGenericServices?: (boolean|null);

            /** FileOptions javaGenericServices */
            javaGenericServices?: (boolean|null);

            /** FileOptions pyGenericServices */
            pyGenericServices?: (boolean|null);

            /** FileOptions phpGenericServices */
            phpGenericServices?: (boolean|null);

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

            /** FileOptions phpNamespace */
            phpNamespace?: (string|null);

            /** FileOptions phpMetadataNamespace */
            phpMetadataNamespace?: (string|null);

            /** FileOptions rubyPackage */
            rubyPackage?: (string|null);

            /** FileOptions features */
            features?: (google.protobuf.IFeatureSet|null);

            /** FileOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** FileOptions .google.api.resourceDefinition */
            ".google.api.resourceDefinition"?: (google.api.IResourceDescriptor[]|null);
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
            public optimizeFor: (google.protobuf.FileOptions.OptimizeMode|keyof typeof google.protobuf.FileOptions.OptimizeMode);

            /** FileOptions goPackage. */
            public goPackage: string;

            /** FileOptions ccGenericServices. */
            public ccGenericServices: boolean;

            /** FileOptions javaGenericServices. */
            public javaGenericServices: boolean;

            /** FileOptions pyGenericServices. */
            public pyGenericServices: boolean;

            /** FileOptions phpGenericServices. */
            public phpGenericServices: boolean;

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

            /** FileOptions phpNamespace. */
            public phpNamespace: string;

            /** FileOptions phpMetadataNamespace. */
            public phpMetadataNamespace: string;

            /** FileOptions rubyPackage. */
            public rubyPackage: string;

            /** FileOptions features. */
            public features?: (google.protobuf.IFeatureSet|null);

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

            /**
             * Gets the default type url for FileOptions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /** MessageOptions deprecatedLegacyJsonFieldConflicts */
            deprecatedLegacyJsonFieldConflicts?: (boolean|null);

            /** MessageOptions features */
            features?: (google.protobuf.IFeatureSet|null);

            /** MessageOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** MessageOptions .google.api.resource */
            ".google.api.resource"?: (google.api.IResourceDescriptor|null);
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

            /** MessageOptions deprecatedLegacyJsonFieldConflicts. */
            public deprecatedLegacyJsonFieldConflicts: boolean;

            /** MessageOptions features. */
            public features?: (google.protobuf.IFeatureSet|null);

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

            /**
             * Gets the default type url for MessageOptions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a FieldOptions. */
        interface IFieldOptions {

            /** FieldOptions ctype */
            ctype?: (google.protobuf.FieldOptions.CType|keyof typeof google.protobuf.FieldOptions.CType|null);

            /** FieldOptions packed */
            packed?: (boolean|null);

            /** FieldOptions jstype */
            jstype?: (google.protobuf.FieldOptions.JSType|keyof typeof google.protobuf.FieldOptions.JSType|null);

            /** FieldOptions lazy */
            lazy?: (boolean|null);

            /** FieldOptions unverifiedLazy */
            unverifiedLazy?: (boolean|null);

            /** FieldOptions deprecated */
            deprecated?: (boolean|null);

            /** FieldOptions weak */
            weak?: (boolean|null);

            /** FieldOptions debugRedact */
            debugRedact?: (boolean|null);

            /** FieldOptions retention */
            retention?: (google.protobuf.FieldOptions.OptionRetention|keyof typeof google.protobuf.FieldOptions.OptionRetention|null);

            /** FieldOptions targets */
            targets?: (google.protobuf.FieldOptions.OptionTargetType[]|null);

            /** FieldOptions editionDefaults */
            editionDefaults?: (google.protobuf.FieldOptions.IEditionDefault[]|null);

            /** FieldOptions features */
            features?: (google.protobuf.IFeatureSet|null);

            /** FieldOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** FieldOptions .google.api.fieldBehavior */
            ".google.api.fieldBehavior"?: (google.api.FieldBehavior[]|null);

            /** FieldOptions .google.api.resourceReference */
            ".google.api.resourceReference"?: (google.api.IResourceReference|null);
        }

        /** Represents a FieldOptions. */
        class FieldOptions implements IFieldOptions {

            /**
             * Constructs a new FieldOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldOptions);

            /** FieldOptions ctype. */
            public ctype: (google.protobuf.FieldOptions.CType|keyof typeof google.protobuf.FieldOptions.CType);

            /** FieldOptions packed. */
            public packed: boolean;

            /** FieldOptions jstype. */
            public jstype: (google.protobuf.FieldOptions.JSType|keyof typeof google.protobuf.FieldOptions.JSType);

            /** FieldOptions lazy. */
            public lazy: boolean;

            /** FieldOptions unverifiedLazy. */
            public unverifiedLazy: boolean;

            /** FieldOptions deprecated. */
            public deprecated: boolean;

            /** FieldOptions weak. */
            public weak: boolean;

            /** FieldOptions debugRedact. */
            public debugRedact: boolean;

            /** FieldOptions retention. */
            public retention: (google.protobuf.FieldOptions.OptionRetention|keyof typeof google.protobuf.FieldOptions.OptionRetention);

            /** FieldOptions targets. */
            public targets: google.protobuf.FieldOptions.OptionTargetType[];

            /** FieldOptions editionDefaults. */
            public editionDefaults: google.protobuf.FieldOptions.IEditionDefault[];

            /** FieldOptions features. */
            public features?: (google.protobuf.IFeatureSet|null);

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

            /**
             * Gets the default type url for FieldOptions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /** OptionRetention enum. */
            enum OptionRetention {
                RETENTION_UNKNOWN = 0,
                RETENTION_RUNTIME = 1,
                RETENTION_SOURCE = 2
            }

            /** OptionTargetType enum. */
            enum OptionTargetType {
                TARGET_TYPE_UNKNOWN = 0,
                TARGET_TYPE_FILE = 1,
                TARGET_TYPE_EXTENSION_RANGE = 2,
                TARGET_TYPE_MESSAGE = 3,
                TARGET_TYPE_FIELD = 4,
                TARGET_TYPE_ONEOF = 5,
                TARGET_TYPE_ENUM = 6,
                TARGET_TYPE_ENUM_ENTRY = 7,
                TARGET_TYPE_SERVICE = 8,
                TARGET_TYPE_METHOD = 9
            }

            /** Properties of an EditionDefault. */
            interface IEditionDefault {

                /** EditionDefault edition */
                edition?: (string|null);

                /** EditionDefault value */
                value?: (string|null);
            }

            /** Represents an EditionDefault. */
            class EditionDefault implements IEditionDefault {

                /**
                 * Constructs a new EditionDefault.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.FieldOptions.IEditionDefault);

                /** EditionDefault edition. */
                public edition: string;

                /** EditionDefault value. */
                public value: string;

                /**
                 * Creates a new EditionDefault instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EditionDefault instance
                 */
                public static create(properties?: google.protobuf.FieldOptions.IEditionDefault): google.protobuf.FieldOptions.EditionDefault;

                /**
                 * Encodes the specified EditionDefault message. Does not implicitly {@link google.protobuf.FieldOptions.EditionDefault.verify|verify} messages.
                 * @param message EditionDefault message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.FieldOptions.IEditionDefault, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified EditionDefault message, length delimited. Does not implicitly {@link google.protobuf.FieldOptions.EditionDefault.verify|verify} messages.
                 * @param message EditionDefault message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.FieldOptions.IEditionDefault, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EditionDefault message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns EditionDefault
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions.EditionDefault;

                /**
                 * Decodes an EditionDefault message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns EditionDefault
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions.EditionDefault;

                /**
                 * Verifies an EditionDefault message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an EditionDefault message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns EditionDefault
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions.EditionDefault;

                /**
                 * Creates a plain object from an EditionDefault message. Also converts values to other types if specified.
                 * @param message EditionDefault
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.FieldOptions.EditionDefault, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this EditionDefault to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for EditionDefault
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of an OneofOptions. */
        interface IOneofOptions {

            /** OneofOptions features */
            features?: (google.protobuf.IFeatureSet|null);

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

            /** OneofOptions features. */
            public features?: (google.protobuf.IFeatureSet|null);

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

            /**
             * Gets the default type url for OneofOptions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an EnumOptions. */
        interface IEnumOptions {

            /** EnumOptions allowAlias */
            allowAlias?: (boolean|null);

            /** EnumOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumOptions deprecatedLegacyJsonFieldConflicts */
            deprecatedLegacyJsonFieldConflicts?: (boolean|null);

            /** EnumOptions features */
            features?: (google.protobuf.IFeatureSet|null);

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

            /** EnumOptions deprecatedLegacyJsonFieldConflicts. */
            public deprecatedLegacyJsonFieldConflicts: boolean;

            /** EnumOptions features. */
            public features?: (google.protobuf.IFeatureSet|null);

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

            /**
             * Gets the default type url for EnumOptions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an EnumValueOptions. */
        interface IEnumValueOptions {

            /** EnumValueOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumValueOptions features */
            features?: (google.protobuf.IFeatureSet|null);

            /** EnumValueOptions debugRedact */
            debugRedact?: (boolean|null);

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

            /** EnumValueOptions features. */
            public features?: (google.protobuf.IFeatureSet|null);

            /** EnumValueOptions debugRedact. */
            public debugRedact: boolean;

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

            /**
             * Gets the default type url for EnumValueOptions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ServiceOptions. */
        interface IServiceOptions {

            /** ServiceOptions features */
            features?: (google.protobuf.IFeatureSet|null);

            /** ServiceOptions deprecated */
            deprecated?: (boolean|null);

            /** ServiceOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** ServiceOptions .google.api.defaultHost */
            ".google.api.defaultHost"?: (string|null);

            /** ServiceOptions .google.api.oauthScopes */
            ".google.api.oauthScopes"?: (string|null);
        }

        /** Represents a ServiceOptions. */
        class ServiceOptions implements IServiceOptions {

            /**
             * Constructs a new ServiceOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceOptions);

            /** ServiceOptions features. */
            public features?: (google.protobuf.IFeatureSet|null);

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

            /**
             * Gets the default type url for ServiceOptions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MethodOptions. */
        interface IMethodOptions {

            /** MethodOptions deprecated */
            deprecated?: (boolean|null);

            /** MethodOptions idempotencyLevel */
            idempotencyLevel?: (google.protobuf.MethodOptions.IdempotencyLevel|keyof typeof google.protobuf.MethodOptions.IdempotencyLevel|null);

            /** MethodOptions features */
            features?: (google.protobuf.IFeatureSet|null);

            /** MethodOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** MethodOptions .google.api.http */
            ".google.api.http"?: (google.api.IHttpRule|null);

            /** MethodOptions .google.api.methodSignature */
            ".google.api.methodSignature"?: (string[]|null);

            /** MethodOptions .google.api.routing */
            ".google.api.routing"?: (google.api.IRoutingRule|null);
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
            public idempotencyLevel: (google.protobuf.MethodOptions.IdempotencyLevel|keyof typeof google.protobuf.MethodOptions.IdempotencyLevel);

            /** MethodOptions features. */
            public features?: (google.protobuf.IFeatureSet|null);

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

            /**
             * Gets the default type url for MethodOptions
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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
            positiveIntValue?: (number|Long|string|null);

            /** UninterpretedOption negativeIntValue */
            negativeIntValue?: (number|Long|string|null);

            /** UninterpretedOption doubleValue */
            doubleValue?: (number|null);

            /** UninterpretedOption stringValue */
            stringValue?: (Uint8Array|string|null);

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
            public positiveIntValue: (number|Long|string);

            /** UninterpretedOption negativeIntValue. */
            public negativeIntValue: (number|Long|string);

            /** UninterpretedOption doubleValue. */
            public doubleValue: number;

            /** UninterpretedOption stringValue. */
            public stringValue: (Uint8Array|string);

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

            /**
             * Gets the default type url for UninterpretedOption
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for NamePart
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a FeatureSet. */
        interface IFeatureSet {

            /** FeatureSet fieldPresence */
            fieldPresence?: (google.protobuf.FeatureSet.FieldPresence|keyof typeof google.protobuf.FeatureSet.FieldPresence|null);

            /** FeatureSet enumType */
            enumType?: (google.protobuf.FeatureSet.EnumType|keyof typeof google.protobuf.FeatureSet.EnumType|null);

            /** FeatureSet repeatedFieldEncoding */
            repeatedFieldEncoding?: (google.protobuf.FeatureSet.RepeatedFieldEncoding|keyof typeof google.protobuf.FeatureSet.RepeatedFieldEncoding|null);

            /** FeatureSet stringFieldValidation */
            stringFieldValidation?: (google.protobuf.FeatureSet.StringFieldValidation|keyof typeof google.protobuf.FeatureSet.StringFieldValidation|null);

            /** FeatureSet messageEncoding */
            messageEncoding?: (google.protobuf.FeatureSet.MessageEncoding|keyof typeof google.protobuf.FeatureSet.MessageEncoding|null);

            /** FeatureSet jsonFormat */
            jsonFormat?: (google.protobuf.FeatureSet.JsonFormat|keyof typeof google.protobuf.FeatureSet.JsonFormat|null);

            /** FeatureSet rawFeatures */
            rawFeatures?: (google.protobuf.IFeatureSet|null);
        }

        /** Represents a FeatureSet. */
        class FeatureSet implements IFeatureSet {

            /**
             * Constructs a new FeatureSet.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFeatureSet);

            /** FeatureSet fieldPresence. */
            public fieldPresence: (google.protobuf.FeatureSet.FieldPresence|keyof typeof google.protobuf.FeatureSet.FieldPresence);

            /** FeatureSet enumType. */
            public enumType: (google.protobuf.FeatureSet.EnumType|keyof typeof google.protobuf.FeatureSet.EnumType);

            /** FeatureSet repeatedFieldEncoding. */
            public repeatedFieldEncoding: (google.protobuf.FeatureSet.RepeatedFieldEncoding|keyof typeof google.protobuf.FeatureSet.RepeatedFieldEncoding);

            /** FeatureSet stringFieldValidation. */
            public stringFieldValidation: (google.protobuf.FeatureSet.StringFieldValidation|keyof typeof google.protobuf.FeatureSet.StringFieldValidation);

            /** FeatureSet messageEncoding. */
            public messageEncoding: (google.protobuf.FeatureSet.MessageEncoding|keyof typeof google.protobuf.FeatureSet.MessageEncoding);

            /** FeatureSet jsonFormat. */
            public jsonFormat: (google.protobuf.FeatureSet.JsonFormat|keyof typeof google.protobuf.FeatureSet.JsonFormat);

            /** FeatureSet rawFeatures. */
            public rawFeatures?: (google.protobuf.IFeatureSet|null);

            /**
             * Creates a new FeatureSet instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FeatureSet instance
             */
            public static create(properties?: google.protobuf.IFeatureSet): google.protobuf.FeatureSet;

            /**
             * Encodes the specified FeatureSet message. Does not implicitly {@link google.protobuf.FeatureSet.verify|verify} messages.
             * @param message FeatureSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFeatureSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FeatureSet message, length delimited. Does not implicitly {@link google.protobuf.FeatureSet.verify|verify} messages.
             * @param message FeatureSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFeatureSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FeatureSet message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FeatureSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FeatureSet;

            /**
             * Decodes a FeatureSet message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FeatureSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FeatureSet;

            /**
             * Verifies a FeatureSet message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FeatureSet message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FeatureSet
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FeatureSet;

            /**
             * Creates a plain object from a FeatureSet message. Also converts values to other types if specified.
             * @param message FeatureSet
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FeatureSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FeatureSet to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for FeatureSet
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace FeatureSet {

            /** FieldPresence enum. */
            enum FieldPresence {
                FIELD_PRESENCE_UNKNOWN = 0,
                EXPLICIT = 1,
                IMPLICIT = 2,
                LEGACY_REQUIRED = 3
            }

            /** EnumType enum. */
            enum EnumType {
                ENUM_TYPE_UNKNOWN = 0,
                OPEN = 1,
                CLOSED = 2
            }

            /** RepeatedFieldEncoding enum. */
            enum RepeatedFieldEncoding {
                REPEATED_FIELD_ENCODING_UNKNOWN = 0,
                PACKED = 1,
                EXPANDED = 2
            }

            /** StringFieldValidation enum. */
            enum StringFieldValidation {
                STRING_FIELD_VALIDATION_UNKNOWN = 0,
                MANDATORY = 1,
                HINT = 2,
                NONE = 3
            }

            /** MessageEncoding enum. */
            enum MessageEncoding {
                MESSAGE_ENCODING_UNKNOWN = 0,
                LENGTH_PREFIXED = 1,
                DELIMITED = 2
            }

            /** JsonFormat enum. */
            enum JsonFormat {
                JSON_FORMAT_UNKNOWN = 0,
                ALLOW = 1,
                LEGACY_BEST_EFFORT = 2
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

            /**
             * Gets the default type url for SourceCodeInfo
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /**
                 * Gets the default type url for Location
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for GeneratedCodeInfo
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

                /** Annotation semantic */
                semantic?: (google.protobuf.GeneratedCodeInfo.Annotation.Semantic|keyof typeof google.protobuf.GeneratedCodeInfo.Annotation.Semantic|null);
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

                /** Annotation semantic. */
                public semantic: (google.protobuf.GeneratedCodeInfo.Annotation.Semantic|keyof typeof google.protobuf.GeneratedCodeInfo.Annotation.Semantic);

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

                /**
                 * Gets the default type url for Annotation
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace Annotation {

                /** Semantic enum. */
                enum Semantic {
                    NONE = 0,
                    SET = 1,
                    ALIAS = 2
                }
            }
        }

        /** Properties of a Duration. */
        interface IDuration {

            /** Duration seconds */
            seconds?: (number|Long|string|null);

            /** Duration nanos */
            nanos?: (number|null);
        }

        /** Represents a Duration. */
        class Duration implements IDuration {

            /**
             * Constructs a new Duration.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDuration);

            /** Duration seconds. */
            public seconds: (number|Long|string);

            /** Duration nanos. */
            public nanos: number;

            /**
             * Creates a new Duration instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Duration instance
             */
            public static create(properties?: google.protobuf.IDuration): google.protobuf.Duration;

            /**
             * Encodes the specified Duration message. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @param message Duration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Duration message, length delimited. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @param message Duration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Duration message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Duration;

            /**
             * Decodes a Duration message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Duration;

            /**
             * Verifies a Duration message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Duration message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Duration
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Duration;

            /**
             * Creates a plain object from a Duration message. Also converts values to other types if specified.
             * @param message Duration
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Duration, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Duration to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Duration
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|string|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long|string);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Timestamp
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for DoubleValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for FloatValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an Int64Value. */
        interface IInt64Value {

            /** Int64Value value */
            value?: (number|Long|string|null);
        }

        /** Represents an Int64Value. */
        class Int64Value implements IInt64Value {

            /**
             * Constructs a new Int64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IInt64Value);

            /** Int64Value value. */
            public value: (number|Long|string);

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

            /**
             * Gets the default type url for Int64Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a UInt64Value. */
        interface IUInt64Value {

            /** UInt64Value value */
            value?: (number|Long|string|null);
        }

        /** Represents a UInt64Value. */
        class UInt64Value implements IUInt64Value {

            /**
             * Constructs a new UInt64Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUInt64Value);

            /** UInt64Value value. */
            public value: (number|Long|string);

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

            /**
             * Gets the default type url for UInt64Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for Int32Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for UInt32Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for BoolValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for StringValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a BytesValue. */
        interface IBytesValue {

            /** BytesValue value */
            value?: (Uint8Array|string|null);
        }

        /** Represents a BytesValue. */
        class BytesValue implements IBytesValue {

            /**
             * Constructs a new BytesValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IBytesValue);

            /** BytesValue value. */
            public value: (Uint8Array|string);

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

            /**
             * Gets the default type url for BytesValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|string|null);
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
            public value: (Uint8Array|string);

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

            /**
             * Gets the default type url for Any
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
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

            /**
             * Gets the default type url for Status
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
