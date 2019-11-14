// Copyright 2019 Google LLC
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

import * as Long from "long";
import * as $protobuf from "protobufjs";
/** Namespace google. */
export namespace google {

    /** Namespace bigtable. */
    namespace bigtable {

        /** Namespace admin. */
        namespace admin {

            /** Namespace v2. */
            namespace v2 {

                /** Properties of a Table. */
                interface ITable {

                    /** Table name */
                    name?: (string|null);

                    /** Table clusterStates */
                    clusterStates?: ({ [k: string]: google.bigtable.admin.v2.Table.IClusterState }|null);

                    /** Table columnFamilies */
                    columnFamilies?: ({ [k: string]: google.bigtable.admin.v2.IColumnFamily }|null);

                    /** Table granularity */
                    granularity?: (google.bigtable.admin.v2.Table.TimestampGranularity|null);
                }

                /** Represents a Table. */
                class Table implements ITable {

                    /**
                     * Constructs a new Table.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ITable);

                    /** Table name. */
                    public name: string;

                    /** Table clusterStates. */
                    public clusterStates: { [k: string]: google.bigtable.admin.v2.Table.IClusterState };

                    /** Table columnFamilies. */
                    public columnFamilies: { [k: string]: google.bigtable.admin.v2.IColumnFamily };

                    /** Table granularity. */
                    public granularity: google.bigtable.admin.v2.Table.TimestampGranularity;

                    /**
                     * Creates a new Table instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Table instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ITable): google.bigtable.admin.v2.Table;

                    /**
                     * Encodes the specified Table message. Does not implicitly {@link google.bigtable.admin.v2.Table.verify|verify} messages.
                     * @param message Table message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ITable, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Table message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.Table.verify|verify} messages.
                     * @param message Table message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ITable, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Table message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Table
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.Table;

                    /**
                     * Decodes a Table message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Table
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.Table;

                    /**
                     * Verifies a Table message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Table message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Table
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.Table;

                    /**
                     * Creates a plain object from a Table message. Also converts values to other types if specified.
                     * @param message Table
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.Table, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Table to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace Table {

                    /** Properties of a ClusterState. */
                    interface IClusterState {

                        /** ClusterState replicationState */
                        replicationState?: (google.bigtable.admin.v2.Table.ClusterState.ReplicationState|null);
                    }

                    /** Represents a ClusterState. */
                    class ClusterState implements IClusterState {

                        /**
                         * Constructs a new ClusterState.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.bigtable.admin.v2.Table.IClusterState);

                        /** ClusterState replicationState. */
                        public replicationState: google.bigtable.admin.v2.Table.ClusterState.ReplicationState;

                        /**
                         * Creates a new ClusterState instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ClusterState instance
                         */
                        public static create(properties?: google.bigtable.admin.v2.Table.IClusterState): google.bigtable.admin.v2.Table.ClusterState;

                        /**
                         * Encodes the specified ClusterState message. Does not implicitly {@link google.bigtable.admin.v2.Table.ClusterState.verify|verify} messages.
                         * @param message ClusterState message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.bigtable.admin.v2.Table.IClusterState, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ClusterState message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.Table.ClusterState.verify|verify} messages.
                         * @param message ClusterState message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.bigtable.admin.v2.Table.IClusterState, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ClusterState message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ClusterState
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.Table.ClusterState;

                        /**
                         * Decodes a ClusterState message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns ClusterState
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.Table.ClusterState;

                        /**
                         * Verifies a ClusterState message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a ClusterState message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns ClusterState
                         */
                        public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.Table.ClusterState;

                        /**
                         * Creates a plain object from a ClusterState message. Also converts values to other types if specified.
                         * @param message ClusterState
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.bigtable.admin.v2.Table.ClusterState, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ClusterState to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    namespace ClusterState {

                        /** ReplicationState enum. */
                        enum ReplicationState {
                            STATE_NOT_KNOWN = 0,
                            INITIALIZING = 1,
                            PLANNED_MAINTENANCE = 2,
                            UNPLANNED_MAINTENANCE = 3,
                            READY = 4
                        }
                    }

                    /** TimestampGranularity enum. */
                    enum TimestampGranularity {
                        TIMESTAMP_GRANULARITY_UNSPECIFIED = 0,
                        MILLIS = 1
                    }

                    /** View enum. */
                    enum View {
                        VIEW_UNSPECIFIED = 0,
                        NAME_ONLY = 1,
                        SCHEMA_VIEW = 2,
                        REPLICATION_VIEW = 3,
                        FULL = 4
                    }
                }

                /** Properties of a ColumnFamily. */
                interface IColumnFamily {

                    /** ColumnFamily gcRule */
                    gcRule?: (google.bigtable.admin.v2.IGcRule|null);
                }

                /** Represents a ColumnFamily. */
                class ColumnFamily implements IColumnFamily {

                    /**
                     * Constructs a new ColumnFamily.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IColumnFamily);

                    /** ColumnFamily gcRule. */
                    public gcRule?: (google.bigtable.admin.v2.IGcRule|null);

                    /**
                     * Creates a new ColumnFamily instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ColumnFamily instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IColumnFamily): google.bigtable.admin.v2.ColumnFamily;

                    /**
                     * Encodes the specified ColumnFamily message. Does not implicitly {@link google.bigtable.admin.v2.ColumnFamily.verify|verify} messages.
                     * @param message ColumnFamily message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IColumnFamily, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ColumnFamily message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ColumnFamily.verify|verify} messages.
                     * @param message ColumnFamily message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IColumnFamily, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ColumnFamily message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ColumnFamily
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ColumnFamily;

                    /**
                     * Decodes a ColumnFamily message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ColumnFamily
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ColumnFamily;

                    /**
                     * Verifies a ColumnFamily message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ColumnFamily message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ColumnFamily
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ColumnFamily;

                    /**
                     * Creates a plain object from a ColumnFamily message. Also converts values to other types if specified.
                     * @param message ColumnFamily
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ColumnFamily, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ColumnFamily to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GcRule. */
                interface IGcRule {

                    /** GcRule maxNumVersions */
                    maxNumVersions?: (number|null);

                    /** GcRule maxAge */
                    maxAge?: (google.protobuf.IDuration|null);

                    /** GcRule intersection */
                    intersection?: (google.bigtable.admin.v2.GcRule.IIntersection|null);

                    /** GcRule union */
                    union?: (google.bigtable.admin.v2.GcRule.IUnion|null);
                }

                /** Represents a GcRule. */
                class GcRule implements IGcRule {

                    /**
                     * Constructs a new GcRule.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IGcRule);

                    /** GcRule maxNumVersions. */
                    public maxNumVersions: number;

                    /** GcRule maxAge. */
                    public maxAge?: (google.protobuf.IDuration|null);

                    /** GcRule intersection. */
                    public intersection?: (google.bigtable.admin.v2.GcRule.IIntersection|null);

                    /** GcRule union. */
                    public union?: (google.bigtable.admin.v2.GcRule.IUnion|null);

                    /** GcRule rule. */
                    public rule?: ("maxNumVersions"|"maxAge"|"intersection"|"union");

                    /**
                     * Creates a new GcRule instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GcRule instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IGcRule): google.bigtable.admin.v2.GcRule;

                    /**
                     * Encodes the specified GcRule message. Does not implicitly {@link google.bigtable.admin.v2.GcRule.verify|verify} messages.
                     * @param message GcRule message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IGcRule, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GcRule message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GcRule.verify|verify} messages.
                     * @param message GcRule message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IGcRule, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GcRule message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GcRule
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GcRule;

                    /**
                     * Decodes a GcRule message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GcRule
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GcRule;

                    /**
                     * Verifies a GcRule message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GcRule message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GcRule
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GcRule;

                    /**
                     * Creates a plain object from a GcRule message. Also converts values to other types if specified.
                     * @param message GcRule
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.GcRule, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GcRule to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace GcRule {

                    /** Properties of an Intersection. */
                    interface IIntersection {

                        /** Intersection rules */
                        rules?: (google.bigtable.admin.v2.IGcRule[]|null);
                    }

                    /** Represents an Intersection. */
                    class Intersection implements IIntersection {

                        /**
                         * Constructs a new Intersection.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.bigtable.admin.v2.GcRule.IIntersection);

                        /** Intersection rules. */
                        public rules: google.bigtable.admin.v2.IGcRule[];

                        /**
                         * Creates a new Intersection instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Intersection instance
                         */
                        public static create(properties?: google.bigtable.admin.v2.GcRule.IIntersection): google.bigtable.admin.v2.GcRule.Intersection;

                        /**
                         * Encodes the specified Intersection message. Does not implicitly {@link google.bigtable.admin.v2.GcRule.Intersection.verify|verify} messages.
                         * @param message Intersection message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.bigtable.admin.v2.GcRule.IIntersection, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Intersection message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GcRule.Intersection.verify|verify} messages.
                         * @param message Intersection message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.bigtable.admin.v2.GcRule.IIntersection, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an Intersection message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Intersection
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GcRule.Intersection;

                        /**
                         * Decodes an Intersection message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Intersection
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GcRule.Intersection;

                        /**
                         * Verifies an Intersection message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an Intersection message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Intersection
                         */
                        public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GcRule.Intersection;

                        /**
                         * Creates a plain object from an Intersection message. Also converts values to other types if specified.
                         * @param message Intersection
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.bigtable.admin.v2.GcRule.Intersection, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Intersection to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of an Union. */
                    interface IUnion {

                        /** Union rules */
                        rules?: (google.bigtable.admin.v2.IGcRule[]|null);
                    }

                    /** Represents an Union. */
                    class Union implements IUnion {

                        /**
                         * Constructs a new Union.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.bigtable.admin.v2.GcRule.IUnion);

                        /** Union rules. */
                        public rules: google.bigtable.admin.v2.IGcRule[];

                        /**
                         * Creates a new Union instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Union instance
                         */
                        public static create(properties?: google.bigtable.admin.v2.GcRule.IUnion): google.bigtable.admin.v2.GcRule.Union;

                        /**
                         * Encodes the specified Union message. Does not implicitly {@link google.bigtable.admin.v2.GcRule.Union.verify|verify} messages.
                         * @param message Union message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.bigtable.admin.v2.GcRule.IUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Union message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GcRule.Union.verify|verify} messages.
                         * @param message Union message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.bigtable.admin.v2.GcRule.IUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an Union message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Union
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GcRule.Union;

                        /**
                         * Decodes an Union message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Union
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GcRule.Union;

                        /**
                         * Verifies an Union message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an Union message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Union
                         */
                        public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GcRule.Union;

                        /**
                         * Creates a plain object from an Union message. Also converts values to other types if specified.
                         * @param message Union
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.bigtable.admin.v2.GcRule.Union, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Union to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a Snapshot. */
                interface ISnapshot {

                    /** Snapshot name */
                    name?: (string|null);

                    /** Snapshot sourceTable */
                    sourceTable?: (google.bigtable.admin.v2.ITable|null);

                    /** Snapshot dataSizeBytes */
                    dataSizeBytes?: (number|Long|null);

                    /** Snapshot createTime */
                    createTime?: (google.protobuf.ITimestamp|null);

                    /** Snapshot deleteTime */
                    deleteTime?: (google.protobuf.ITimestamp|null);

                    /** Snapshot state */
                    state?: (google.bigtable.admin.v2.Snapshot.State|null);

                    /** Snapshot description */
                    description?: (string|null);
                }

                /** Represents a Snapshot. */
                class Snapshot implements ISnapshot {

                    /**
                     * Constructs a new Snapshot.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ISnapshot);

                    /** Snapshot name. */
                    public name: string;

                    /** Snapshot sourceTable. */
                    public sourceTable?: (google.bigtable.admin.v2.ITable|null);

                    /** Snapshot dataSizeBytes. */
                    public dataSizeBytes: (number|Long);

                    /** Snapshot createTime. */
                    public createTime?: (google.protobuf.ITimestamp|null);

                    /** Snapshot deleteTime. */
                    public deleteTime?: (google.protobuf.ITimestamp|null);

                    /** Snapshot state. */
                    public state: google.bigtable.admin.v2.Snapshot.State;

                    /** Snapshot description. */
                    public description: string;

                    /**
                     * Creates a new Snapshot instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Snapshot instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ISnapshot): google.bigtable.admin.v2.Snapshot;

                    /**
                     * Encodes the specified Snapshot message. Does not implicitly {@link google.bigtable.admin.v2.Snapshot.verify|verify} messages.
                     * @param message Snapshot message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ISnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Snapshot message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.Snapshot.verify|verify} messages.
                     * @param message Snapshot message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ISnapshot, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Snapshot message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Snapshot
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.Snapshot;

                    /**
                     * Decodes a Snapshot message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Snapshot
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.Snapshot;

                    /**
                     * Verifies a Snapshot message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Snapshot message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Snapshot
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.Snapshot;

                    /**
                     * Creates a plain object from a Snapshot message. Also converts values to other types if specified.
                     * @param message Snapshot
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.Snapshot, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Snapshot to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace Snapshot {

                    /** State enum. */
                    enum State {
                        STATE_NOT_KNOWN = 0,
                        READY = 1,
                        CREATING = 2
                    }
                }

                /** StorageType enum. */
                enum StorageType {
                    STORAGE_TYPE_UNSPECIFIED = 0,
                    SSD = 1,
                    HDD = 2
                }

                /** Represents a BigtableInstanceAdmin */
                class BigtableInstanceAdmin extends $protobuf.rpc.Service {

                    /**
                     * Constructs a new BigtableInstanceAdmin service.
                     * @param rpcImpl RPC implementation
                     * @param [requestDelimited=false] Whether requests are length-delimited
                     * @param [responseDelimited=false] Whether responses are length-delimited
                     */
                    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                    /**
                     * Creates new BigtableInstanceAdmin service using the specified rpc implementation.
                     * @param rpcImpl RPC implementation
                     * @param [requestDelimited=false] Whether requests are length-delimited
                     * @param [responseDelimited=false] Whether responses are length-delimited
                     * @returns RPC service. Useful where requests and/or responses are streamed.
                     */
                    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): BigtableInstanceAdmin;

                    /**
                     * Calls CreateInstance.
                     * @param request CreateInstanceRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public createInstance(request: google.bigtable.admin.v2.ICreateInstanceRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.CreateInstanceCallback): void;

                    /**
                     * Calls CreateInstance.
                     * @param request CreateInstanceRequest message or plain object
                     * @returns Promise
                     */
                    public createInstance(request: google.bigtable.admin.v2.ICreateInstanceRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls GetInstance.
                     * @param request GetInstanceRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Instance
                     */
                    public getInstance(request: google.bigtable.admin.v2.IGetInstanceRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.GetInstanceCallback): void;

                    /**
                     * Calls GetInstance.
                     * @param request GetInstanceRequest message or plain object
                     * @returns Promise
                     */
                    public getInstance(request: google.bigtable.admin.v2.IGetInstanceRequest): Promise<google.bigtable.admin.v2.Instance>;

                    /**
                     * Calls ListInstances.
                     * @param request ListInstancesRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and ListInstancesResponse
                     */
                    public listInstances(request: google.bigtable.admin.v2.IListInstancesRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.ListInstancesCallback): void;

                    /**
                     * Calls ListInstances.
                     * @param request ListInstancesRequest message or plain object
                     * @returns Promise
                     */
                    public listInstances(request: google.bigtable.admin.v2.IListInstancesRequest): Promise<google.bigtable.admin.v2.ListInstancesResponse>;

                    /**
                     * Calls UpdateInstance.
                     * @param request Instance message or plain object
                     * @param callback Node-style callback called with the error, if any, and Instance
                     */
                    public updateInstance(request: google.bigtable.admin.v2.IInstance, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.UpdateInstanceCallback): void;

                    /**
                     * Calls UpdateInstance.
                     * @param request Instance message or plain object
                     * @returns Promise
                     */
                    public updateInstance(request: google.bigtable.admin.v2.IInstance): Promise<google.bigtable.admin.v2.Instance>;

                    /**
                     * Calls PartialUpdateInstance.
                     * @param request PartialUpdateInstanceRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public partialUpdateInstance(request: google.bigtable.admin.v2.IPartialUpdateInstanceRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.PartialUpdateInstanceCallback): void;

                    /**
                     * Calls PartialUpdateInstance.
                     * @param request PartialUpdateInstanceRequest message or plain object
                     * @returns Promise
                     */
                    public partialUpdateInstance(request: google.bigtable.admin.v2.IPartialUpdateInstanceRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls DeleteInstance.
                     * @param request DeleteInstanceRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Empty
                     */
                    public deleteInstance(request: google.bigtable.admin.v2.IDeleteInstanceRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.DeleteInstanceCallback): void;

                    /**
                     * Calls DeleteInstance.
                     * @param request DeleteInstanceRequest message or plain object
                     * @returns Promise
                     */
                    public deleteInstance(request: google.bigtable.admin.v2.IDeleteInstanceRequest): Promise<google.protobuf.Empty>;

                    /**
                     * Calls CreateCluster.
                     * @param request CreateClusterRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public createCluster(request: google.bigtable.admin.v2.ICreateClusterRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.CreateClusterCallback): void;

                    /**
                     * Calls CreateCluster.
                     * @param request CreateClusterRequest message or plain object
                     * @returns Promise
                     */
                    public createCluster(request: google.bigtable.admin.v2.ICreateClusterRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls GetCluster.
                     * @param request GetClusterRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Cluster
                     */
                    public getCluster(request: google.bigtable.admin.v2.IGetClusterRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.GetClusterCallback): void;

                    /**
                     * Calls GetCluster.
                     * @param request GetClusterRequest message or plain object
                     * @returns Promise
                     */
                    public getCluster(request: google.bigtable.admin.v2.IGetClusterRequest): Promise<google.bigtable.admin.v2.Cluster>;

                    /**
                     * Calls ListClusters.
                     * @param request ListClustersRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and ListClustersResponse
                     */
                    public listClusters(request: google.bigtable.admin.v2.IListClustersRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.ListClustersCallback): void;

                    /**
                     * Calls ListClusters.
                     * @param request ListClustersRequest message or plain object
                     * @returns Promise
                     */
                    public listClusters(request: google.bigtable.admin.v2.IListClustersRequest): Promise<google.bigtable.admin.v2.ListClustersResponse>;

                    /**
                     * Calls UpdateCluster.
                     * @param request Cluster message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public updateCluster(request: google.bigtable.admin.v2.ICluster, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.UpdateClusterCallback): void;

                    /**
                     * Calls UpdateCluster.
                     * @param request Cluster message or plain object
                     * @returns Promise
                     */
                    public updateCluster(request: google.bigtable.admin.v2.ICluster): Promise<google.longrunning.Operation>;

                    /**
                     * Calls DeleteCluster.
                     * @param request DeleteClusterRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Empty
                     */
                    public deleteCluster(request: google.bigtable.admin.v2.IDeleteClusterRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.DeleteClusterCallback): void;

                    /**
                     * Calls DeleteCluster.
                     * @param request DeleteClusterRequest message or plain object
                     * @returns Promise
                     */
                    public deleteCluster(request: google.bigtable.admin.v2.IDeleteClusterRequest): Promise<google.protobuf.Empty>;

                    /**
                     * Calls CreateAppProfile.
                     * @param request CreateAppProfileRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and AppProfile
                     */
                    public createAppProfile(request: google.bigtable.admin.v2.ICreateAppProfileRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.CreateAppProfileCallback): void;

                    /**
                     * Calls CreateAppProfile.
                     * @param request CreateAppProfileRequest message or plain object
                     * @returns Promise
                     */
                    public createAppProfile(request: google.bigtable.admin.v2.ICreateAppProfileRequest): Promise<google.bigtable.admin.v2.AppProfile>;

                    /**
                     * Calls GetAppProfile.
                     * @param request GetAppProfileRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and AppProfile
                     */
                    public getAppProfile(request: google.bigtable.admin.v2.IGetAppProfileRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.GetAppProfileCallback): void;

                    /**
                     * Calls GetAppProfile.
                     * @param request GetAppProfileRequest message or plain object
                     * @returns Promise
                     */
                    public getAppProfile(request: google.bigtable.admin.v2.IGetAppProfileRequest): Promise<google.bigtable.admin.v2.AppProfile>;

                    /**
                     * Calls ListAppProfiles.
                     * @param request ListAppProfilesRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and ListAppProfilesResponse
                     */
                    public listAppProfiles(request: google.bigtable.admin.v2.IListAppProfilesRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.ListAppProfilesCallback): void;

                    /**
                     * Calls ListAppProfiles.
                     * @param request ListAppProfilesRequest message or plain object
                     * @returns Promise
                     */
                    public listAppProfiles(request: google.bigtable.admin.v2.IListAppProfilesRequest): Promise<google.bigtable.admin.v2.ListAppProfilesResponse>;

                    /**
                     * Calls UpdateAppProfile.
                     * @param request UpdateAppProfileRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public updateAppProfile(request: google.bigtable.admin.v2.IUpdateAppProfileRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.UpdateAppProfileCallback): void;

                    /**
                     * Calls UpdateAppProfile.
                     * @param request UpdateAppProfileRequest message or plain object
                     * @returns Promise
                     */
                    public updateAppProfile(request: google.bigtable.admin.v2.IUpdateAppProfileRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls DeleteAppProfile.
                     * @param request DeleteAppProfileRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Empty
                     */
                    public deleteAppProfile(request: google.bigtable.admin.v2.IDeleteAppProfileRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.DeleteAppProfileCallback): void;

                    /**
                     * Calls DeleteAppProfile.
                     * @param request DeleteAppProfileRequest message or plain object
                     * @returns Promise
                     */
                    public deleteAppProfile(request: google.bigtable.admin.v2.IDeleteAppProfileRequest): Promise<google.protobuf.Empty>;

                    /**
                     * Calls GetIamPolicy.
                     * @param request GetIamPolicyRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Policy
                     */
                    public getIamPolicy(request: google.iam.v1.IGetIamPolicyRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.GetIamPolicyCallback): void;

                    /**
                     * Calls GetIamPolicy.
                     * @param request GetIamPolicyRequest message or plain object
                     * @returns Promise
                     */
                    public getIamPolicy(request: google.iam.v1.IGetIamPolicyRequest): Promise<google.iam.v1.Policy>;

                    /**
                     * Calls SetIamPolicy.
                     * @param request SetIamPolicyRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Policy
                     */
                    public setIamPolicy(request: google.iam.v1.ISetIamPolicyRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.SetIamPolicyCallback): void;

                    /**
                     * Calls SetIamPolicy.
                     * @param request SetIamPolicyRequest message or plain object
                     * @returns Promise
                     */
                    public setIamPolicy(request: google.iam.v1.ISetIamPolicyRequest): Promise<google.iam.v1.Policy>;

                    /**
                     * Calls TestIamPermissions.
                     * @param request TestIamPermissionsRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and TestIamPermissionsResponse
                     */
                    public testIamPermissions(request: google.iam.v1.ITestIamPermissionsRequest, callback: google.bigtable.admin.v2.BigtableInstanceAdmin.TestIamPermissionsCallback): void;

                    /**
                     * Calls TestIamPermissions.
                     * @param request TestIamPermissionsRequest message or plain object
                     * @returns Promise
                     */
                    public testIamPermissions(request: google.iam.v1.ITestIamPermissionsRequest): Promise<google.iam.v1.TestIamPermissionsResponse>;
                }

                namespace BigtableInstanceAdmin {

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#createInstance}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type CreateInstanceCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#getInstance}.
                     * @param error Error, if any
                     * @param [response] Instance
                     */
                    type GetInstanceCallback = (error: (Error|null), response?: google.bigtable.admin.v2.Instance) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#listInstances}.
                     * @param error Error, if any
                     * @param [response] ListInstancesResponse
                     */
                    type ListInstancesCallback = (error: (Error|null), response?: google.bigtable.admin.v2.ListInstancesResponse) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#updateInstance}.
                     * @param error Error, if any
                     * @param [response] Instance
                     */
                    type UpdateInstanceCallback = (error: (Error|null), response?: google.bigtable.admin.v2.Instance) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#partialUpdateInstance}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type PartialUpdateInstanceCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#deleteInstance}.
                     * @param error Error, if any
                     * @param [response] Empty
                     */
                    type DeleteInstanceCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#createCluster}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type CreateClusterCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#getCluster}.
                     * @param error Error, if any
                     * @param [response] Cluster
                     */
                    type GetClusterCallback = (error: (Error|null), response?: google.bigtable.admin.v2.Cluster) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#listClusters}.
                     * @param error Error, if any
                     * @param [response] ListClustersResponse
                     */
                    type ListClustersCallback = (error: (Error|null), response?: google.bigtable.admin.v2.ListClustersResponse) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#updateCluster}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type UpdateClusterCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#deleteCluster}.
                     * @param error Error, if any
                     * @param [response] Empty
                     */
                    type DeleteClusterCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#createAppProfile}.
                     * @param error Error, if any
                     * @param [response] AppProfile
                     */
                    type CreateAppProfileCallback = (error: (Error|null), response?: google.bigtable.admin.v2.AppProfile) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#getAppProfile}.
                     * @param error Error, if any
                     * @param [response] AppProfile
                     */
                    type GetAppProfileCallback = (error: (Error|null), response?: google.bigtable.admin.v2.AppProfile) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#listAppProfiles}.
                     * @param error Error, if any
                     * @param [response] ListAppProfilesResponse
                     */
                    type ListAppProfilesCallback = (error: (Error|null), response?: google.bigtable.admin.v2.ListAppProfilesResponse) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#updateAppProfile}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type UpdateAppProfileCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#deleteAppProfile}.
                     * @param error Error, if any
                     * @param [response] Empty
                     */
                    type DeleteAppProfileCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#getIamPolicy}.
                     * @param error Error, if any
                     * @param [response] Policy
                     */
                    type GetIamPolicyCallback = (error: (Error|null), response?: google.iam.v1.Policy) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#setIamPolicy}.
                     * @param error Error, if any
                     * @param [response] Policy
                     */
                    type SetIamPolicyCallback = (error: (Error|null), response?: google.iam.v1.Policy) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableInstanceAdmin#testIamPermissions}.
                     * @param error Error, if any
                     * @param [response] TestIamPermissionsResponse
                     */
                    type TestIamPermissionsCallback = (error: (Error|null), response?: google.iam.v1.TestIamPermissionsResponse) => void;
                }

                /** Properties of a CreateInstanceRequest. */
                interface ICreateInstanceRequest {

                    /** CreateInstanceRequest parent */
                    parent?: (string|null);

                    /** CreateInstanceRequest instanceId */
                    instanceId?: (string|null);

                    /** CreateInstanceRequest instance */
                    instance?: (google.bigtable.admin.v2.IInstance|null);

                    /** CreateInstanceRequest clusters */
                    clusters?: ({ [k: string]: google.bigtable.admin.v2.ICluster }|null);
                }

                /** Represents a CreateInstanceRequest. */
                class CreateInstanceRequest implements ICreateInstanceRequest {

                    /**
                     * Constructs a new CreateInstanceRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICreateInstanceRequest);

                    /** CreateInstanceRequest parent. */
                    public parent: string;

                    /** CreateInstanceRequest instanceId. */
                    public instanceId: string;

                    /** CreateInstanceRequest instance. */
                    public instance?: (google.bigtable.admin.v2.IInstance|null);

                    /** CreateInstanceRequest clusters. */
                    public clusters: { [k: string]: google.bigtable.admin.v2.ICluster };

                    /**
                     * Creates a new CreateInstanceRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CreateInstanceRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICreateInstanceRequest): google.bigtable.admin.v2.CreateInstanceRequest;

                    /**
                     * Encodes the specified CreateInstanceRequest message. Does not implicitly {@link google.bigtable.admin.v2.CreateInstanceRequest.verify|verify} messages.
                     * @param message CreateInstanceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICreateInstanceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CreateInstanceRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CreateInstanceRequest.verify|verify} messages.
                     * @param message CreateInstanceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICreateInstanceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CreateInstanceRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CreateInstanceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CreateInstanceRequest;

                    /**
                     * Decodes a CreateInstanceRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CreateInstanceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CreateInstanceRequest;

                    /**
                     * Verifies a CreateInstanceRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CreateInstanceRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CreateInstanceRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CreateInstanceRequest;

                    /**
                     * Creates a plain object from a CreateInstanceRequest message. Also converts values to other types if specified.
                     * @param message CreateInstanceRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CreateInstanceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CreateInstanceRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GetInstanceRequest. */
                interface IGetInstanceRequest {

                    /** GetInstanceRequest name */
                    name?: (string|null);
                }

                /** Represents a GetInstanceRequest. */
                class GetInstanceRequest implements IGetInstanceRequest {

                    /**
                     * Constructs a new GetInstanceRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IGetInstanceRequest);

                    /** GetInstanceRequest name. */
                    public name: string;

                    /**
                     * Creates a new GetInstanceRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GetInstanceRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IGetInstanceRequest): google.bigtable.admin.v2.GetInstanceRequest;

                    /**
                     * Encodes the specified GetInstanceRequest message. Does not implicitly {@link google.bigtable.admin.v2.GetInstanceRequest.verify|verify} messages.
                     * @param message GetInstanceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IGetInstanceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GetInstanceRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GetInstanceRequest.verify|verify} messages.
                     * @param message GetInstanceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IGetInstanceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GetInstanceRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GetInstanceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GetInstanceRequest;

                    /**
                     * Decodes a GetInstanceRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GetInstanceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GetInstanceRequest;

                    /**
                     * Verifies a GetInstanceRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GetInstanceRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GetInstanceRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GetInstanceRequest;

                    /**
                     * Creates a plain object from a GetInstanceRequest message. Also converts values to other types if specified.
                     * @param message GetInstanceRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.GetInstanceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GetInstanceRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListInstancesRequest. */
                interface IListInstancesRequest {

                    /** ListInstancesRequest parent */
                    parent?: (string|null);

                    /** ListInstancesRequest pageToken */
                    pageToken?: (string|null);
                }

                /** Represents a ListInstancesRequest. */
                class ListInstancesRequest implements IListInstancesRequest {

                    /**
                     * Constructs a new ListInstancesRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListInstancesRequest);

                    /** ListInstancesRequest parent. */
                    public parent: string;

                    /** ListInstancesRequest pageToken. */
                    public pageToken: string;

                    /**
                     * Creates a new ListInstancesRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListInstancesRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListInstancesRequest): google.bigtable.admin.v2.ListInstancesRequest;

                    /**
                     * Encodes the specified ListInstancesRequest message. Does not implicitly {@link google.bigtable.admin.v2.ListInstancesRequest.verify|verify} messages.
                     * @param message ListInstancesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListInstancesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListInstancesRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListInstancesRequest.verify|verify} messages.
                     * @param message ListInstancesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListInstancesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListInstancesRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListInstancesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListInstancesRequest;

                    /**
                     * Decodes a ListInstancesRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListInstancesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListInstancesRequest;

                    /**
                     * Verifies a ListInstancesRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListInstancesRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListInstancesRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListInstancesRequest;

                    /**
                     * Creates a plain object from a ListInstancesRequest message. Also converts values to other types if specified.
                     * @param message ListInstancesRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListInstancesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListInstancesRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListInstancesResponse. */
                interface IListInstancesResponse {

                    /** ListInstancesResponse instances */
                    instances?: (google.bigtable.admin.v2.IInstance[]|null);

                    /** ListInstancesResponse failedLocations */
                    failedLocations?: (string[]|null);

                    /** ListInstancesResponse nextPageToken */
                    nextPageToken?: (string|null);
                }

                /** Represents a ListInstancesResponse. */
                class ListInstancesResponse implements IListInstancesResponse {

                    /**
                     * Constructs a new ListInstancesResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListInstancesResponse);

                    /** ListInstancesResponse instances. */
                    public instances: google.bigtable.admin.v2.IInstance[];

                    /** ListInstancesResponse failedLocations. */
                    public failedLocations: string[];

                    /** ListInstancesResponse nextPageToken. */
                    public nextPageToken: string;

                    /**
                     * Creates a new ListInstancesResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListInstancesResponse instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListInstancesResponse): google.bigtable.admin.v2.ListInstancesResponse;

                    /**
                     * Encodes the specified ListInstancesResponse message. Does not implicitly {@link google.bigtable.admin.v2.ListInstancesResponse.verify|verify} messages.
                     * @param message ListInstancesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListInstancesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListInstancesResponse message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListInstancesResponse.verify|verify} messages.
                     * @param message ListInstancesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListInstancesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListInstancesResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListInstancesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListInstancesResponse;

                    /**
                     * Decodes a ListInstancesResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListInstancesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListInstancesResponse;

                    /**
                     * Verifies a ListInstancesResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListInstancesResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListInstancesResponse
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListInstancesResponse;

                    /**
                     * Creates a plain object from a ListInstancesResponse message. Also converts values to other types if specified.
                     * @param message ListInstancesResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListInstancesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListInstancesResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a PartialUpdateInstanceRequest. */
                interface IPartialUpdateInstanceRequest {

                    /** PartialUpdateInstanceRequest instance */
                    instance?: (google.bigtable.admin.v2.IInstance|null);

                    /** PartialUpdateInstanceRequest updateMask */
                    updateMask?: (google.protobuf.IFieldMask|null);
                }

                /** Represents a PartialUpdateInstanceRequest. */
                class PartialUpdateInstanceRequest implements IPartialUpdateInstanceRequest {

                    /**
                     * Constructs a new PartialUpdateInstanceRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IPartialUpdateInstanceRequest);

                    /** PartialUpdateInstanceRequest instance. */
                    public instance?: (google.bigtable.admin.v2.IInstance|null);

                    /** PartialUpdateInstanceRequest updateMask. */
                    public updateMask?: (google.protobuf.IFieldMask|null);

                    /**
                     * Creates a new PartialUpdateInstanceRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PartialUpdateInstanceRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IPartialUpdateInstanceRequest): google.bigtable.admin.v2.PartialUpdateInstanceRequest;

                    /**
                     * Encodes the specified PartialUpdateInstanceRequest message. Does not implicitly {@link google.bigtable.admin.v2.PartialUpdateInstanceRequest.verify|verify} messages.
                     * @param message PartialUpdateInstanceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IPartialUpdateInstanceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PartialUpdateInstanceRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.PartialUpdateInstanceRequest.verify|verify} messages.
                     * @param message PartialUpdateInstanceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IPartialUpdateInstanceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PartialUpdateInstanceRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PartialUpdateInstanceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.PartialUpdateInstanceRequest;

                    /**
                     * Decodes a PartialUpdateInstanceRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PartialUpdateInstanceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.PartialUpdateInstanceRequest;

                    /**
                     * Verifies a PartialUpdateInstanceRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PartialUpdateInstanceRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns PartialUpdateInstanceRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.PartialUpdateInstanceRequest;

                    /**
                     * Creates a plain object from a PartialUpdateInstanceRequest message. Also converts values to other types if specified.
                     * @param message PartialUpdateInstanceRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.PartialUpdateInstanceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PartialUpdateInstanceRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DeleteInstanceRequest. */
                interface IDeleteInstanceRequest {

                    /** DeleteInstanceRequest name */
                    name?: (string|null);
                }

                /** Represents a DeleteInstanceRequest. */
                class DeleteInstanceRequest implements IDeleteInstanceRequest {

                    /**
                     * Constructs a new DeleteInstanceRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IDeleteInstanceRequest);

                    /** DeleteInstanceRequest name. */
                    public name: string;

                    /**
                     * Creates a new DeleteInstanceRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeleteInstanceRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IDeleteInstanceRequest): google.bigtable.admin.v2.DeleteInstanceRequest;

                    /**
                     * Encodes the specified DeleteInstanceRequest message. Does not implicitly {@link google.bigtable.admin.v2.DeleteInstanceRequest.verify|verify} messages.
                     * @param message DeleteInstanceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IDeleteInstanceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeleteInstanceRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.DeleteInstanceRequest.verify|verify} messages.
                     * @param message DeleteInstanceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IDeleteInstanceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeleteInstanceRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeleteInstanceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.DeleteInstanceRequest;

                    /**
                     * Decodes a DeleteInstanceRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeleteInstanceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.DeleteInstanceRequest;

                    /**
                     * Verifies a DeleteInstanceRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeleteInstanceRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeleteInstanceRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.DeleteInstanceRequest;

                    /**
                     * Creates a plain object from a DeleteInstanceRequest message. Also converts values to other types if specified.
                     * @param message DeleteInstanceRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.DeleteInstanceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeleteInstanceRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CreateClusterRequest. */
                interface ICreateClusterRequest {

                    /** CreateClusterRequest parent */
                    parent?: (string|null);

                    /** CreateClusterRequest clusterId */
                    clusterId?: (string|null);

                    /** CreateClusterRequest cluster */
                    cluster?: (google.bigtable.admin.v2.ICluster|null);
                }

                /** Represents a CreateClusterRequest. */
                class CreateClusterRequest implements ICreateClusterRequest {

                    /**
                     * Constructs a new CreateClusterRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICreateClusterRequest);

                    /** CreateClusterRequest parent. */
                    public parent: string;

                    /** CreateClusterRequest clusterId. */
                    public clusterId: string;

                    /** CreateClusterRequest cluster. */
                    public cluster?: (google.bigtable.admin.v2.ICluster|null);

                    /**
                     * Creates a new CreateClusterRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CreateClusterRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICreateClusterRequest): google.bigtable.admin.v2.CreateClusterRequest;

                    /**
                     * Encodes the specified CreateClusterRequest message. Does not implicitly {@link google.bigtable.admin.v2.CreateClusterRequest.verify|verify} messages.
                     * @param message CreateClusterRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICreateClusterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CreateClusterRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CreateClusterRequest.verify|verify} messages.
                     * @param message CreateClusterRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICreateClusterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CreateClusterRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CreateClusterRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CreateClusterRequest;

                    /**
                     * Decodes a CreateClusterRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CreateClusterRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CreateClusterRequest;

                    /**
                     * Verifies a CreateClusterRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CreateClusterRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CreateClusterRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CreateClusterRequest;

                    /**
                     * Creates a plain object from a CreateClusterRequest message. Also converts values to other types if specified.
                     * @param message CreateClusterRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CreateClusterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CreateClusterRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GetClusterRequest. */
                interface IGetClusterRequest {

                    /** GetClusterRequest name */
                    name?: (string|null);
                }

                /** Represents a GetClusterRequest. */
                class GetClusterRequest implements IGetClusterRequest {

                    /**
                     * Constructs a new GetClusterRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IGetClusterRequest);

                    /** GetClusterRequest name. */
                    public name: string;

                    /**
                     * Creates a new GetClusterRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GetClusterRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IGetClusterRequest): google.bigtable.admin.v2.GetClusterRequest;

                    /**
                     * Encodes the specified GetClusterRequest message. Does not implicitly {@link google.bigtable.admin.v2.GetClusterRequest.verify|verify} messages.
                     * @param message GetClusterRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IGetClusterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GetClusterRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GetClusterRequest.verify|verify} messages.
                     * @param message GetClusterRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IGetClusterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GetClusterRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GetClusterRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GetClusterRequest;

                    /**
                     * Decodes a GetClusterRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GetClusterRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GetClusterRequest;

                    /**
                     * Verifies a GetClusterRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GetClusterRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GetClusterRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GetClusterRequest;

                    /**
                     * Creates a plain object from a GetClusterRequest message. Also converts values to other types if specified.
                     * @param message GetClusterRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.GetClusterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GetClusterRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListClustersRequest. */
                interface IListClustersRequest {

                    /** ListClustersRequest parent */
                    parent?: (string|null);

                    /** ListClustersRequest pageToken */
                    pageToken?: (string|null);
                }

                /** Represents a ListClustersRequest. */
                class ListClustersRequest implements IListClustersRequest {

                    /**
                     * Constructs a new ListClustersRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListClustersRequest);

                    /** ListClustersRequest parent. */
                    public parent: string;

                    /** ListClustersRequest pageToken. */
                    public pageToken: string;

                    /**
                     * Creates a new ListClustersRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListClustersRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListClustersRequest): google.bigtable.admin.v2.ListClustersRequest;

                    /**
                     * Encodes the specified ListClustersRequest message. Does not implicitly {@link google.bigtable.admin.v2.ListClustersRequest.verify|verify} messages.
                     * @param message ListClustersRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListClustersRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListClustersRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListClustersRequest.verify|verify} messages.
                     * @param message ListClustersRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListClustersRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListClustersRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListClustersRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListClustersRequest;

                    /**
                     * Decodes a ListClustersRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListClustersRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListClustersRequest;

                    /**
                     * Verifies a ListClustersRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListClustersRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListClustersRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListClustersRequest;

                    /**
                     * Creates a plain object from a ListClustersRequest message. Also converts values to other types if specified.
                     * @param message ListClustersRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListClustersRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListClustersRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListClustersResponse. */
                interface IListClustersResponse {

                    /** ListClustersResponse clusters */
                    clusters?: (google.bigtable.admin.v2.ICluster[]|null);

                    /** ListClustersResponse failedLocations */
                    failedLocations?: (string[]|null);

                    /** ListClustersResponse nextPageToken */
                    nextPageToken?: (string|null);
                }

                /** Represents a ListClustersResponse. */
                class ListClustersResponse implements IListClustersResponse {

                    /**
                     * Constructs a new ListClustersResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListClustersResponse);

                    /** ListClustersResponse clusters. */
                    public clusters: google.bigtable.admin.v2.ICluster[];

                    /** ListClustersResponse failedLocations. */
                    public failedLocations: string[];

                    /** ListClustersResponse nextPageToken. */
                    public nextPageToken: string;

                    /**
                     * Creates a new ListClustersResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListClustersResponse instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListClustersResponse): google.bigtable.admin.v2.ListClustersResponse;

                    /**
                     * Encodes the specified ListClustersResponse message. Does not implicitly {@link google.bigtable.admin.v2.ListClustersResponse.verify|verify} messages.
                     * @param message ListClustersResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListClustersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListClustersResponse message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListClustersResponse.verify|verify} messages.
                     * @param message ListClustersResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListClustersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListClustersResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListClustersResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListClustersResponse;

                    /**
                     * Decodes a ListClustersResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListClustersResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListClustersResponse;

                    /**
                     * Verifies a ListClustersResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListClustersResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListClustersResponse
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListClustersResponse;

                    /**
                     * Creates a plain object from a ListClustersResponse message. Also converts values to other types if specified.
                     * @param message ListClustersResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListClustersResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListClustersResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DeleteClusterRequest. */
                interface IDeleteClusterRequest {

                    /** DeleteClusterRequest name */
                    name?: (string|null);
                }

                /** Represents a DeleteClusterRequest. */
                class DeleteClusterRequest implements IDeleteClusterRequest {

                    /**
                     * Constructs a new DeleteClusterRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IDeleteClusterRequest);

                    /** DeleteClusterRequest name. */
                    public name: string;

                    /**
                     * Creates a new DeleteClusterRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeleteClusterRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IDeleteClusterRequest): google.bigtable.admin.v2.DeleteClusterRequest;

                    /**
                     * Encodes the specified DeleteClusterRequest message. Does not implicitly {@link google.bigtable.admin.v2.DeleteClusterRequest.verify|verify} messages.
                     * @param message DeleteClusterRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IDeleteClusterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeleteClusterRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.DeleteClusterRequest.verify|verify} messages.
                     * @param message DeleteClusterRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IDeleteClusterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeleteClusterRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeleteClusterRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.DeleteClusterRequest;

                    /**
                     * Decodes a DeleteClusterRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeleteClusterRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.DeleteClusterRequest;

                    /**
                     * Verifies a DeleteClusterRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeleteClusterRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeleteClusterRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.DeleteClusterRequest;

                    /**
                     * Creates a plain object from a DeleteClusterRequest message. Also converts values to other types if specified.
                     * @param message DeleteClusterRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.DeleteClusterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeleteClusterRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CreateInstanceMetadata. */
                interface ICreateInstanceMetadata {

                    /** CreateInstanceMetadata originalRequest */
                    originalRequest?: (google.bigtable.admin.v2.ICreateInstanceRequest|null);

                    /** CreateInstanceMetadata requestTime */
                    requestTime?: (google.protobuf.ITimestamp|null);

                    /** CreateInstanceMetadata finishTime */
                    finishTime?: (google.protobuf.ITimestamp|null);
                }

                /** Represents a CreateInstanceMetadata. */
                class CreateInstanceMetadata implements ICreateInstanceMetadata {

                    /**
                     * Constructs a new CreateInstanceMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICreateInstanceMetadata);

                    /** CreateInstanceMetadata originalRequest. */
                    public originalRequest?: (google.bigtable.admin.v2.ICreateInstanceRequest|null);

                    /** CreateInstanceMetadata requestTime. */
                    public requestTime?: (google.protobuf.ITimestamp|null);

                    /** CreateInstanceMetadata finishTime. */
                    public finishTime?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new CreateInstanceMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CreateInstanceMetadata instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICreateInstanceMetadata): google.bigtable.admin.v2.CreateInstanceMetadata;

                    /**
                     * Encodes the specified CreateInstanceMetadata message. Does not implicitly {@link google.bigtable.admin.v2.CreateInstanceMetadata.verify|verify} messages.
                     * @param message CreateInstanceMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICreateInstanceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CreateInstanceMetadata message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CreateInstanceMetadata.verify|verify} messages.
                     * @param message CreateInstanceMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICreateInstanceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CreateInstanceMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CreateInstanceMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CreateInstanceMetadata;

                    /**
                     * Decodes a CreateInstanceMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CreateInstanceMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CreateInstanceMetadata;

                    /**
                     * Verifies a CreateInstanceMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CreateInstanceMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CreateInstanceMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CreateInstanceMetadata;

                    /**
                     * Creates a plain object from a CreateInstanceMetadata message. Also converts values to other types if specified.
                     * @param message CreateInstanceMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CreateInstanceMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CreateInstanceMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an UpdateInstanceMetadata. */
                interface IUpdateInstanceMetadata {

                    /** UpdateInstanceMetadata originalRequest */
                    originalRequest?: (google.bigtable.admin.v2.IPartialUpdateInstanceRequest|null);

                    /** UpdateInstanceMetadata requestTime */
                    requestTime?: (google.protobuf.ITimestamp|null);

                    /** UpdateInstanceMetadata finishTime */
                    finishTime?: (google.protobuf.ITimestamp|null);
                }

                /** Represents an UpdateInstanceMetadata. */
                class UpdateInstanceMetadata implements IUpdateInstanceMetadata {

                    /**
                     * Constructs a new UpdateInstanceMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IUpdateInstanceMetadata);

                    /** UpdateInstanceMetadata originalRequest. */
                    public originalRequest?: (google.bigtable.admin.v2.IPartialUpdateInstanceRequest|null);

                    /** UpdateInstanceMetadata requestTime. */
                    public requestTime?: (google.protobuf.ITimestamp|null);

                    /** UpdateInstanceMetadata finishTime. */
                    public finishTime?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new UpdateInstanceMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UpdateInstanceMetadata instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IUpdateInstanceMetadata): google.bigtable.admin.v2.UpdateInstanceMetadata;

                    /**
                     * Encodes the specified UpdateInstanceMetadata message. Does not implicitly {@link google.bigtable.admin.v2.UpdateInstanceMetadata.verify|verify} messages.
                     * @param message UpdateInstanceMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IUpdateInstanceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UpdateInstanceMetadata message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.UpdateInstanceMetadata.verify|verify} messages.
                     * @param message UpdateInstanceMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IUpdateInstanceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an UpdateInstanceMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UpdateInstanceMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.UpdateInstanceMetadata;

                    /**
                     * Decodes an UpdateInstanceMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UpdateInstanceMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.UpdateInstanceMetadata;

                    /**
                     * Verifies an UpdateInstanceMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an UpdateInstanceMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UpdateInstanceMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.UpdateInstanceMetadata;

                    /**
                     * Creates a plain object from an UpdateInstanceMetadata message. Also converts values to other types if specified.
                     * @param message UpdateInstanceMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.UpdateInstanceMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UpdateInstanceMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CreateClusterMetadata. */
                interface ICreateClusterMetadata {

                    /** CreateClusterMetadata originalRequest */
                    originalRequest?: (google.bigtable.admin.v2.ICreateClusterRequest|null);

                    /** CreateClusterMetadata requestTime */
                    requestTime?: (google.protobuf.ITimestamp|null);

                    /** CreateClusterMetadata finishTime */
                    finishTime?: (google.protobuf.ITimestamp|null);
                }

                /** Represents a CreateClusterMetadata. */
                class CreateClusterMetadata implements ICreateClusterMetadata {

                    /**
                     * Constructs a new CreateClusterMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICreateClusterMetadata);

                    /** CreateClusterMetadata originalRequest. */
                    public originalRequest?: (google.bigtable.admin.v2.ICreateClusterRequest|null);

                    /** CreateClusterMetadata requestTime. */
                    public requestTime?: (google.protobuf.ITimestamp|null);

                    /** CreateClusterMetadata finishTime. */
                    public finishTime?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new CreateClusterMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CreateClusterMetadata instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICreateClusterMetadata): google.bigtable.admin.v2.CreateClusterMetadata;

                    /**
                     * Encodes the specified CreateClusterMetadata message. Does not implicitly {@link google.bigtable.admin.v2.CreateClusterMetadata.verify|verify} messages.
                     * @param message CreateClusterMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICreateClusterMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CreateClusterMetadata message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CreateClusterMetadata.verify|verify} messages.
                     * @param message CreateClusterMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICreateClusterMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CreateClusterMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CreateClusterMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CreateClusterMetadata;

                    /**
                     * Decodes a CreateClusterMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CreateClusterMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CreateClusterMetadata;

                    /**
                     * Verifies a CreateClusterMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CreateClusterMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CreateClusterMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CreateClusterMetadata;

                    /**
                     * Creates a plain object from a CreateClusterMetadata message. Also converts values to other types if specified.
                     * @param message CreateClusterMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CreateClusterMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CreateClusterMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an UpdateClusterMetadata. */
                interface IUpdateClusterMetadata {

                    /** UpdateClusterMetadata originalRequest */
                    originalRequest?: (google.bigtable.admin.v2.ICluster|null);

                    /** UpdateClusterMetadata requestTime */
                    requestTime?: (google.protobuf.ITimestamp|null);

                    /** UpdateClusterMetadata finishTime */
                    finishTime?: (google.protobuf.ITimestamp|null);
                }

                /** Represents an UpdateClusterMetadata. */
                class UpdateClusterMetadata implements IUpdateClusterMetadata {

                    /**
                     * Constructs a new UpdateClusterMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IUpdateClusterMetadata);

                    /** UpdateClusterMetadata originalRequest. */
                    public originalRequest?: (google.bigtable.admin.v2.ICluster|null);

                    /** UpdateClusterMetadata requestTime. */
                    public requestTime?: (google.protobuf.ITimestamp|null);

                    /** UpdateClusterMetadata finishTime. */
                    public finishTime?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new UpdateClusterMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UpdateClusterMetadata instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IUpdateClusterMetadata): google.bigtable.admin.v2.UpdateClusterMetadata;

                    /**
                     * Encodes the specified UpdateClusterMetadata message. Does not implicitly {@link google.bigtable.admin.v2.UpdateClusterMetadata.verify|verify} messages.
                     * @param message UpdateClusterMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IUpdateClusterMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UpdateClusterMetadata message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.UpdateClusterMetadata.verify|verify} messages.
                     * @param message UpdateClusterMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IUpdateClusterMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an UpdateClusterMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UpdateClusterMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.UpdateClusterMetadata;

                    /**
                     * Decodes an UpdateClusterMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UpdateClusterMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.UpdateClusterMetadata;

                    /**
                     * Verifies an UpdateClusterMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an UpdateClusterMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UpdateClusterMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.UpdateClusterMetadata;

                    /**
                     * Creates a plain object from an UpdateClusterMetadata message. Also converts values to other types if specified.
                     * @param message UpdateClusterMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.UpdateClusterMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UpdateClusterMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CreateAppProfileRequest. */
                interface ICreateAppProfileRequest {

                    /** CreateAppProfileRequest parent */
                    parent?: (string|null);

                    /** CreateAppProfileRequest appProfileId */
                    appProfileId?: (string|null);

                    /** CreateAppProfileRequest appProfile */
                    appProfile?: (google.bigtable.admin.v2.IAppProfile|null);

                    /** CreateAppProfileRequest ignoreWarnings */
                    ignoreWarnings?: (boolean|null);
                }

                /** Represents a CreateAppProfileRequest. */
                class CreateAppProfileRequest implements ICreateAppProfileRequest {

                    /**
                     * Constructs a new CreateAppProfileRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICreateAppProfileRequest);

                    /** CreateAppProfileRequest parent. */
                    public parent: string;

                    /** CreateAppProfileRequest appProfileId. */
                    public appProfileId: string;

                    /** CreateAppProfileRequest appProfile. */
                    public appProfile?: (google.bigtable.admin.v2.IAppProfile|null);

                    /** CreateAppProfileRequest ignoreWarnings. */
                    public ignoreWarnings: boolean;

                    /**
                     * Creates a new CreateAppProfileRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CreateAppProfileRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICreateAppProfileRequest): google.bigtable.admin.v2.CreateAppProfileRequest;

                    /**
                     * Encodes the specified CreateAppProfileRequest message. Does not implicitly {@link google.bigtable.admin.v2.CreateAppProfileRequest.verify|verify} messages.
                     * @param message CreateAppProfileRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICreateAppProfileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CreateAppProfileRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CreateAppProfileRequest.verify|verify} messages.
                     * @param message CreateAppProfileRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICreateAppProfileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CreateAppProfileRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CreateAppProfileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CreateAppProfileRequest;

                    /**
                     * Decodes a CreateAppProfileRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CreateAppProfileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CreateAppProfileRequest;

                    /**
                     * Verifies a CreateAppProfileRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CreateAppProfileRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CreateAppProfileRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CreateAppProfileRequest;

                    /**
                     * Creates a plain object from a CreateAppProfileRequest message. Also converts values to other types if specified.
                     * @param message CreateAppProfileRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CreateAppProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CreateAppProfileRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GetAppProfileRequest. */
                interface IGetAppProfileRequest {

                    /** GetAppProfileRequest name */
                    name?: (string|null);
                }

                /** Represents a GetAppProfileRequest. */
                class GetAppProfileRequest implements IGetAppProfileRequest {

                    /**
                     * Constructs a new GetAppProfileRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IGetAppProfileRequest);

                    /** GetAppProfileRequest name. */
                    public name: string;

                    /**
                     * Creates a new GetAppProfileRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GetAppProfileRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IGetAppProfileRequest): google.bigtable.admin.v2.GetAppProfileRequest;

                    /**
                     * Encodes the specified GetAppProfileRequest message. Does not implicitly {@link google.bigtable.admin.v2.GetAppProfileRequest.verify|verify} messages.
                     * @param message GetAppProfileRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IGetAppProfileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GetAppProfileRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GetAppProfileRequest.verify|verify} messages.
                     * @param message GetAppProfileRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IGetAppProfileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GetAppProfileRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GetAppProfileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GetAppProfileRequest;

                    /**
                     * Decodes a GetAppProfileRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GetAppProfileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GetAppProfileRequest;

                    /**
                     * Verifies a GetAppProfileRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GetAppProfileRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GetAppProfileRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GetAppProfileRequest;

                    /**
                     * Creates a plain object from a GetAppProfileRequest message. Also converts values to other types if specified.
                     * @param message GetAppProfileRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.GetAppProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GetAppProfileRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListAppProfilesRequest. */
                interface IListAppProfilesRequest {

                    /** ListAppProfilesRequest parent */
                    parent?: (string|null);

                    /** ListAppProfilesRequest pageSize */
                    pageSize?: (number|null);

                    /** ListAppProfilesRequest pageToken */
                    pageToken?: (string|null);
                }

                /** Represents a ListAppProfilesRequest. */
                class ListAppProfilesRequest implements IListAppProfilesRequest {

                    /**
                     * Constructs a new ListAppProfilesRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListAppProfilesRequest);

                    /** ListAppProfilesRequest parent. */
                    public parent: string;

                    /** ListAppProfilesRequest pageSize. */
                    public pageSize: number;

                    /** ListAppProfilesRequest pageToken. */
                    public pageToken: string;

                    /**
                     * Creates a new ListAppProfilesRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListAppProfilesRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListAppProfilesRequest): google.bigtable.admin.v2.ListAppProfilesRequest;

                    /**
                     * Encodes the specified ListAppProfilesRequest message. Does not implicitly {@link google.bigtable.admin.v2.ListAppProfilesRequest.verify|verify} messages.
                     * @param message ListAppProfilesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListAppProfilesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListAppProfilesRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListAppProfilesRequest.verify|verify} messages.
                     * @param message ListAppProfilesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListAppProfilesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListAppProfilesRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListAppProfilesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListAppProfilesRequest;

                    /**
                     * Decodes a ListAppProfilesRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListAppProfilesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListAppProfilesRequest;

                    /**
                     * Verifies a ListAppProfilesRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListAppProfilesRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListAppProfilesRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListAppProfilesRequest;

                    /**
                     * Creates a plain object from a ListAppProfilesRequest message. Also converts values to other types if specified.
                     * @param message ListAppProfilesRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListAppProfilesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListAppProfilesRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListAppProfilesResponse. */
                interface IListAppProfilesResponse {

                    /** ListAppProfilesResponse appProfiles */
                    appProfiles?: (google.bigtable.admin.v2.IAppProfile[]|null);

                    /** ListAppProfilesResponse nextPageToken */
                    nextPageToken?: (string|null);

                    /** ListAppProfilesResponse failedLocations */
                    failedLocations?: (string[]|null);
                }

                /** Represents a ListAppProfilesResponse. */
                class ListAppProfilesResponse implements IListAppProfilesResponse {

                    /**
                     * Constructs a new ListAppProfilesResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListAppProfilesResponse);

                    /** ListAppProfilesResponse appProfiles. */
                    public appProfiles: google.bigtable.admin.v2.IAppProfile[];

                    /** ListAppProfilesResponse nextPageToken. */
                    public nextPageToken: string;

                    /** ListAppProfilesResponse failedLocations. */
                    public failedLocations: string[];

                    /**
                     * Creates a new ListAppProfilesResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListAppProfilesResponse instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListAppProfilesResponse): google.bigtable.admin.v2.ListAppProfilesResponse;

                    /**
                     * Encodes the specified ListAppProfilesResponse message. Does not implicitly {@link google.bigtable.admin.v2.ListAppProfilesResponse.verify|verify} messages.
                     * @param message ListAppProfilesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListAppProfilesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListAppProfilesResponse message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListAppProfilesResponse.verify|verify} messages.
                     * @param message ListAppProfilesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListAppProfilesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListAppProfilesResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListAppProfilesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListAppProfilesResponse;

                    /**
                     * Decodes a ListAppProfilesResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListAppProfilesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListAppProfilesResponse;

                    /**
                     * Verifies a ListAppProfilesResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListAppProfilesResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListAppProfilesResponse
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListAppProfilesResponse;

                    /**
                     * Creates a plain object from a ListAppProfilesResponse message. Also converts values to other types if specified.
                     * @param message ListAppProfilesResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListAppProfilesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListAppProfilesResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an UpdateAppProfileRequest. */
                interface IUpdateAppProfileRequest {

                    /** UpdateAppProfileRequest appProfile */
                    appProfile?: (google.bigtable.admin.v2.IAppProfile|null);

                    /** UpdateAppProfileRequest updateMask */
                    updateMask?: (google.protobuf.IFieldMask|null);

                    /** UpdateAppProfileRequest ignoreWarnings */
                    ignoreWarnings?: (boolean|null);
                }

                /** Represents an UpdateAppProfileRequest. */
                class UpdateAppProfileRequest implements IUpdateAppProfileRequest {

                    /**
                     * Constructs a new UpdateAppProfileRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IUpdateAppProfileRequest);

                    /** UpdateAppProfileRequest appProfile. */
                    public appProfile?: (google.bigtable.admin.v2.IAppProfile|null);

                    /** UpdateAppProfileRequest updateMask. */
                    public updateMask?: (google.protobuf.IFieldMask|null);

                    /** UpdateAppProfileRequest ignoreWarnings. */
                    public ignoreWarnings: boolean;

                    /**
                     * Creates a new UpdateAppProfileRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UpdateAppProfileRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IUpdateAppProfileRequest): google.bigtable.admin.v2.UpdateAppProfileRequest;

                    /**
                     * Encodes the specified UpdateAppProfileRequest message. Does not implicitly {@link google.bigtable.admin.v2.UpdateAppProfileRequest.verify|verify} messages.
                     * @param message UpdateAppProfileRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IUpdateAppProfileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UpdateAppProfileRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.UpdateAppProfileRequest.verify|verify} messages.
                     * @param message UpdateAppProfileRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IUpdateAppProfileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an UpdateAppProfileRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UpdateAppProfileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.UpdateAppProfileRequest;

                    /**
                     * Decodes an UpdateAppProfileRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UpdateAppProfileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.UpdateAppProfileRequest;

                    /**
                     * Verifies an UpdateAppProfileRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an UpdateAppProfileRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UpdateAppProfileRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.UpdateAppProfileRequest;

                    /**
                     * Creates a plain object from an UpdateAppProfileRequest message. Also converts values to other types if specified.
                     * @param message UpdateAppProfileRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.UpdateAppProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UpdateAppProfileRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DeleteAppProfileRequest. */
                interface IDeleteAppProfileRequest {

                    /** DeleteAppProfileRequest name */
                    name?: (string|null);

                    /** DeleteAppProfileRequest ignoreWarnings */
                    ignoreWarnings?: (boolean|null);
                }

                /** Represents a DeleteAppProfileRequest. */
                class DeleteAppProfileRequest implements IDeleteAppProfileRequest {

                    /**
                     * Constructs a new DeleteAppProfileRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IDeleteAppProfileRequest);

                    /** DeleteAppProfileRequest name. */
                    public name: string;

                    /** DeleteAppProfileRequest ignoreWarnings. */
                    public ignoreWarnings: boolean;

                    /**
                     * Creates a new DeleteAppProfileRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeleteAppProfileRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IDeleteAppProfileRequest): google.bigtable.admin.v2.DeleteAppProfileRequest;

                    /**
                     * Encodes the specified DeleteAppProfileRequest message. Does not implicitly {@link google.bigtable.admin.v2.DeleteAppProfileRequest.verify|verify} messages.
                     * @param message DeleteAppProfileRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IDeleteAppProfileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeleteAppProfileRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.DeleteAppProfileRequest.verify|verify} messages.
                     * @param message DeleteAppProfileRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IDeleteAppProfileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeleteAppProfileRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeleteAppProfileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.DeleteAppProfileRequest;

                    /**
                     * Decodes a DeleteAppProfileRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeleteAppProfileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.DeleteAppProfileRequest;

                    /**
                     * Verifies a DeleteAppProfileRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeleteAppProfileRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeleteAppProfileRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.DeleteAppProfileRequest;

                    /**
                     * Creates a plain object from a DeleteAppProfileRequest message. Also converts values to other types if specified.
                     * @param message DeleteAppProfileRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.DeleteAppProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeleteAppProfileRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an UpdateAppProfileMetadata. */
                interface IUpdateAppProfileMetadata {
                }

                /** Represents an UpdateAppProfileMetadata. */
                class UpdateAppProfileMetadata implements IUpdateAppProfileMetadata {

                    /**
                     * Constructs a new UpdateAppProfileMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IUpdateAppProfileMetadata);

                    /**
                     * Creates a new UpdateAppProfileMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UpdateAppProfileMetadata instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IUpdateAppProfileMetadata): google.bigtable.admin.v2.UpdateAppProfileMetadata;

                    /**
                     * Encodes the specified UpdateAppProfileMetadata message. Does not implicitly {@link google.bigtable.admin.v2.UpdateAppProfileMetadata.verify|verify} messages.
                     * @param message UpdateAppProfileMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IUpdateAppProfileMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified UpdateAppProfileMetadata message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.UpdateAppProfileMetadata.verify|verify} messages.
                     * @param message UpdateAppProfileMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IUpdateAppProfileMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an UpdateAppProfileMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns UpdateAppProfileMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.UpdateAppProfileMetadata;

                    /**
                     * Decodes an UpdateAppProfileMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns UpdateAppProfileMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.UpdateAppProfileMetadata;

                    /**
                     * Verifies an UpdateAppProfileMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an UpdateAppProfileMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns UpdateAppProfileMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.UpdateAppProfileMetadata;

                    /**
                     * Creates a plain object from an UpdateAppProfileMetadata message. Also converts values to other types if specified.
                     * @param message UpdateAppProfileMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.UpdateAppProfileMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this UpdateAppProfileMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an Instance. */
                interface IInstance {

                    /** Instance name */
                    name?: (string|null);

                    /** Instance displayName */
                    displayName?: (string|null);

                    /** Instance state */
                    state?: (google.bigtable.admin.v2.Instance.State|null);

                    /** Instance type */
                    type?: (google.bigtable.admin.v2.Instance.Type|null);

                    /** Instance labels */
                    labels?: ({ [k: string]: string }|null);
                }

                /** Represents an Instance. */
                class Instance implements IInstance {

                    /**
                     * Constructs a new Instance.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IInstance);

                    /** Instance name. */
                    public name: string;

                    /** Instance displayName. */
                    public displayName: string;

                    /** Instance state. */
                    public state: google.bigtable.admin.v2.Instance.State;

                    /** Instance type. */
                    public type: google.bigtable.admin.v2.Instance.Type;

                    /** Instance labels. */
                    public labels: { [k: string]: string };

                    /**
                     * Creates a new Instance instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Instance instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IInstance): google.bigtable.admin.v2.Instance;

                    /**
                     * Encodes the specified Instance message. Does not implicitly {@link google.bigtable.admin.v2.Instance.verify|verify} messages.
                     * @param message Instance message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IInstance, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Instance message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.Instance.verify|verify} messages.
                     * @param message Instance message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IInstance, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Instance message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Instance
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.Instance;

                    /**
                     * Decodes an Instance message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Instance
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.Instance;

                    /**
                     * Verifies an Instance message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Instance message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Instance
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.Instance;

                    /**
                     * Creates a plain object from an Instance message. Also converts values to other types if specified.
                     * @param message Instance
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.Instance, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Instance to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace Instance {

                    /** State enum. */
                    enum State {
                        STATE_NOT_KNOWN = 0,
                        READY = 1,
                        CREATING = 2
                    }

                    /** Type enum. */
                    enum Type {
                        TYPE_UNSPECIFIED = 0,
                        PRODUCTION = 1,
                        DEVELOPMENT = 2
                    }
                }

                /** Properties of a Cluster. */
                interface ICluster {

                    /** Cluster name */
                    name?: (string|null);

                    /** Cluster location */
                    location?: (string|null);

                    /** Cluster state */
                    state?: (google.bigtable.admin.v2.Cluster.State|null);

                    /** Cluster serveNodes */
                    serveNodes?: (number|null);

                    /** Cluster defaultStorageType */
                    defaultStorageType?: (google.bigtable.admin.v2.StorageType|null);
                }

                /** Represents a Cluster. */
                class Cluster implements ICluster {

                    /**
                     * Constructs a new Cluster.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICluster);

                    /** Cluster name. */
                    public name: string;

                    /** Cluster location. */
                    public location: string;

                    /** Cluster state. */
                    public state: google.bigtable.admin.v2.Cluster.State;

                    /** Cluster serveNodes. */
                    public serveNodes: number;

                    /** Cluster defaultStorageType. */
                    public defaultStorageType: google.bigtable.admin.v2.StorageType;

                    /**
                     * Creates a new Cluster instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Cluster instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICluster): google.bigtable.admin.v2.Cluster;

                    /**
                     * Encodes the specified Cluster message. Does not implicitly {@link google.bigtable.admin.v2.Cluster.verify|verify} messages.
                     * @param message Cluster message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICluster, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Cluster message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.Cluster.verify|verify} messages.
                     * @param message Cluster message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICluster, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Cluster message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Cluster
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.Cluster;

                    /**
                     * Decodes a Cluster message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Cluster
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.Cluster;

                    /**
                     * Verifies a Cluster message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Cluster message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Cluster
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.Cluster;

                    /**
                     * Creates a plain object from a Cluster message. Also converts values to other types if specified.
                     * @param message Cluster
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.Cluster, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Cluster to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace Cluster {

                    /** State enum. */
                    enum State {
                        STATE_NOT_KNOWN = 0,
                        READY = 1,
                        CREATING = 2,
                        RESIZING = 3,
                        DISABLED = 4
                    }
                }

                /** Properties of an AppProfile. */
                interface IAppProfile {

                    /** AppProfile name */
                    name?: (string|null);

                    /** AppProfile etag */
                    etag?: (string|null);

                    /** AppProfile description */
                    description?: (string|null);

                    /** AppProfile multiClusterRoutingUseAny */
                    multiClusterRoutingUseAny?: (google.bigtable.admin.v2.AppProfile.IMultiClusterRoutingUseAny|null);

                    /** AppProfile singleClusterRouting */
                    singleClusterRouting?: (google.bigtable.admin.v2.AppProfile.ISingleClusterRouting|null);
                }

                /** Represents an AppProfile. */
                class AppProfile implements IAppProfile {

                    /**
                     * Constructs a new AppProfile.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IAppProfile);

                    /** AppProfile name. */
                    public name: string;

                    /** AppProfile etag. */
                    public etag: string;

                    /** AppProfile description. */
                    public description: string;

                    /** AppProfile multiClusterRoutingUseAny. */
                    public multiClusterRoutingUseAny?: (google.bigtable.admin.v2.AppProfile.IMultiClusterRoutingUseAny|null);

                    /** AppProfile singleClusterRouting. */
                    public singleClusterRouting?: (google.bigtable.admin.v2.AppProfile.ISingleClusterRouting|null);

                    /** AppProfile routingPolicy. */
                    public routingPolicy?: ("multiClusterRoutingUseAny"|"singleClusterRouting");

                    /**
                     * Creates a new AppProfile instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns AppProfile instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IAppProfile): google.bigtable.admin.v2.AppProfile;

                    /**
                     * Encodes the specified AppProfile message. Does not implicitly {@link google.bigtable.admin.v2.AppProfile.verify|verify} messages.
                     * @param message AppProfile message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IAppProfile, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified AppProfile message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.AppProfile.verify|verify} messages.
                     * @param message AppProfile message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IAppProfile, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an AppProfile message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns AppProfile
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.AppProfile;

                    /**
                     * Decodes an AppProfile message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns AppProfile
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.AppProfile;

                    /**
                     * Verifies an AppProfile message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an AppProfile message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns AppProfile
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.AppProfile;

                    /**
                     * Creates a plain object from an AppProfile message. Also converts values to other types if specified.
                     * @param message AppProfile
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.AppProfile, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this AppProfile to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace AppProfile {

                    /** Properties of a MultiClusterRoutingUseAny. */
                    interface IMultiClusterRoutingUseAny {
                    }

                    /** Represents a MultiClusterRoutingUseAny. */
                    class MultiClusterRoutingUseAny implements IMultiClusterRoutingUseAny {

                        /**
                         * Constructs a new MultiClusterRoutingUseAny.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.bigtable.admin.v2.AppProfile.IMultiClusterRoutingUseAny);

                        /**
                         * Creates a new MultiClusterRoutingUseAny instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MultiClusterRoutingUseAny instance
                         */
                        public static create(properties?: google.bigtable.admin.v2.AppProfile.IMultiClusterRoutingUseAny): google.bigtable.admin.v2.AppProfile.MultiClusterRoutingUseAny;

                        /**
                         * Encodes the specified MultiClusterRoutingUseAny message. Does not implicitly {@link google.bigtable.admin.v2.AppProfile.MultiClusterRoutingUseAny.verify|verify} messages.
                         * @param message MultiClusterRoutingUseAny message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.bigtable.admin.v2.AppProfile.IMultiClusterRoutingUseAny, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified MultiClusterRoutingUseAny message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.AppProfile.MultiClusterRoutingUseAny.verify|verify} messages.
                         * @param message MultiClusterRoutingUseAny message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.bigtable.admin.v2.AppProfile.IMultiClusterRoutingUseAny, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MultiClusterRoutingUseAny message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns MultiClusterRoutingUseAny
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.AppProfile.MultiClusterRoutingUseAny;

                        /**
                         * Decodes a MultiClusterRoutingUseAny message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns MultiClusterRoutingUseAny
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.AppProfile.MultiClusterRoutingUseAny;

                        /**
                         * Verifies a MultiClusterRoutingUseAny message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a MultiClusterRoutingUseAny message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns MultiClusterRoutingUseAny
                         */
                        public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.AppProfile.MultiClusterRoutingUseAny;

                        /**
                         * Creates a plain object from a MultiClusterRoutingUseAny message. Also converts values to other types if specified.
                         * @param message MultiClusterRoutingUseAny
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.bigtable.admin.v2.AppProfile.MultiClusterRoutingUseAny, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this MultiClusterRoutingUseAny to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }

                    /** Properties of a SingleClusterRouting. */
                    interface ISingleClusterRouting {

                        /** SingleClusterRouting clusterId */
                        clusterId?: (string|null);

                        /** SingleClusterRouting allowTransactionalWrites */
                        allowTransactionalWrites?: (boolean|null);
                    }

                    /** Represents a SingleClusterRouting. */
                    class SingleClusterRouting implements ISingleClusterRouting {

                        /**
                         * Constructs a new SingleClusterRouting.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.bigtable.admin.v2.AppProfile.ISingleClusterRouting);

                        /** SingleClusterRouting clusterId. */
                        public clusterId: string;

                        /** SingleClusterRouting allowTransactionalWrites. */
                        public allowTransactionalWrites: boolean;

                        /**
                         * Creates a new SingleClusterRouting instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns SingleClusterRouting instance
                         */
                        public static create(properties?: google.bigtable.admin.v2.AppProfile.ISingleClusterRouting): google.bigtable.admin.v2.AppProfile.SingleClusterRouting;

                        /**
                         * Encodes the specified SingleClusterRouting message. Does not implicitly {@link google.bigtable.admin.v2.AppProfile.SingleClusterRouting.verify|verify} messages.
                         * @param message SingleClusterRouting message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.bigtable.admin.v2.AppProfile.ISingleClusterRouting, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified SingleClusterRouting message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.AppProfile.SingleClusterRouting.verify|verify} messages.
                         * @param message SingleClusterRouting message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.bigtable.admin.v2.AppProfile.ISingleClusterRouting, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a SingleClusterRouting message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns SingleClusterRouting
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.AppProfile.SingleClusterRouting;

                        /**
                         * Decodes a SingleClusterRouting message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns SingleClusterRouting
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.AppProfile.SingleClusterRouting;

                        /**
                         * Verifies a SingleClusterRouting message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a SingleClusterRouting message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns SingleClusterRouting
                         */
                        public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.AppProfile.SingleClusterRouting;

                        /**
                         * Creates a plain object from a SingleClusterRouting message. Also converts values to other types if specified.
                         * @param message SingleClusterRouting
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.bigtable.admin.v2.AppProfile.SingleClusterRouting, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this SingleClusterRouting to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Represents a BigtableTableAdmin */
                class BigtableTableAdmin extends $protobuf.rpc.Service {

                    /**
                     * Constructs a new BigtableTableAdmin service.
                     * @param rpcImpl RPC implementation
                     * @param [requestDelimited=false] Whether requests are length-delimited
                     * @param [responseDelimited=false] Whether responses are length-delimited
                     */
                    constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                    /**
                     * Creates new BigtableTableAdmin service using the specified rpc implementation.
                     * @param rpcImpl RPC implementation
                     * @param [requestDelimited=false] Whether requests are length-delimited
                     * @param [responseDelimited=false] Whether responses are length-delimited
                     * @returns RPC service. Useful where requests and/or responses are streamed.
                     */
                    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): BigtableTableAdmin;

                    /**
                     * Calls CreateTable.
                     * @param request CreateTableRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Table
                     */
                    public createTable(request: google.bigtable.admin.v2.ICreateTableRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.CreateTableCallback): void;

                    /**
                     * Calls CreateTable.
                     * @param request CreateTableRequest message or plain object
                     * @returns Promise
                     */
                    public createTable(request: google.bigtable.admin.v2.ICreateTableRequest): Promise<google.bigtable.admin.v2.Table>;

                    /**
                     * Calls CreateTableFromSnapshot.
                     * @param request CreateTableFromSnapshotRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public createTableFromSnapshot(request: google.bigtable.admin.v2.ICreateTableFromSnapshotRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.CreateTableFromSnapshotCallback): void;

                    /**
                     * Calls CreateTableFromSnapshot.
                     * @param request CreateTableFromSnapshotRequest message or plain object
                     * @returns Promise
                     */
                    public createTableFromSnapshot(request: google.bigtable.admin.v2.ICreateTableFromSnapshotRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls ListTables.
                     * @param request ListTablesRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and ListTablesResponse
                     */
                    public listTables(request: google.bigtable.admin.v2.IListTablesRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.ListTablesCallback): void;

                    /**
                     * Calls ListTables.
                     * @param request ListTablesRequest message or plain object
                     * @returns Promise
                     */
                    public listTables(request: google.bigtable.admin.v2.IListTablesRequest): Promise<google.bigtable.admin.v2.ListTablesResponse>;

                    /**
                     * Calls GetTable.
                     * @param request GetTableRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Table
                     */
                    public getTable(request: google.bigtable.admin.v2.IGetTableRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.GetTableCallback): void;

                    /**
                     * Calls GetTable.
                     * @param request GetTableRequest message or plain object
                     * @returns Promise
                     */
                    public getTable(request: google.bigtable.admin.v2.IGetTableRequest): Promise<google.bigtable.admin.v2.Table>;

                    /**
                     * Calls DeleteTable.
                     * @param request DeleteTableRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Empty
                     */
                    public deleteTable(request: google.bigtable.admin.v2.IDeleteTableRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.DeleteTableCallback): void;

                    /**
                     * Calls DeleteTable.
                     * @param request DeleteTableRequest message or plain object
                     * @returns Promise
                     */
                    public deleteTable(request: google.bigtable.admin.v2.IDeleteTableRequest): Promise<google.protobuf.Empty>;

                    /**
                     * Calls ModifyColumnFamilies.
                     * @param request ModifyColumnFamiliesRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Table
                     */
                    public modifyColumnFamilies(request: google.bigtable.admin.v2.IModifyColumnFamiliesRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.ModifyColumnFamiliesCallback): void;

                    /**
                     * Calls ModifyColumnFamilies.
                     * @param request ModifyColumnFamiliesRequest message or plain object
                     * @returns Promise
                     */
                    public modifyColumnFamilies(request: google.bigtable.admin.v2.IModifyColumnFamiliesRequest): Promise<google.bigtable.admin.v2.Table>;

                    /**
                     * Calls DropRowRange.
                     * @param request DropRowRangeRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Empty
                     */
                    public dropRowRange(request: google.bigtable.admin.v2.IDropRowRangeRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.DropRowRangeCallback): void;

                    /**
                     * Calls DropRowRange.
                     * @param request DropRowRangeRequest message or plain object
                     * @returns Promise
                     */
                    public dropRowRange(request: google.bigtable.admin.v2.IDropRowRangeRequest): Promise<google.protobuf.Empty>;

                    /**
                     * Calls GenerateConsistencyToken.
                     * @param request GenerateConsistencyTokenRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and GenerateConsistencyTokenResponse
                     */
                    public generateConsistencyToken(request: google.bigtable.admin.v2.IGenerateConsistencyTokenRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.GenerateConsistencyTokenCallback): void;

                    /**
                     * Calls GenerateConsistencyToken.
                     * @param request GenerateConsistencyTokenRequest message or plain object
                     * @returns Promise
                     */
                    public generateConsistencyToken(request: google.bigtable.admin.v2.IGenerateConsistencyTokenRequest): Promise<google.bigtable.admin.v2.GenerateConsistencyTokenResponse>;

                    /**
                     * Calls CheckConsistency.
                     * @param request CheckConsistencyRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and CheckConsistencyResponse
                     */
                    public checkConsistency(request: google.bigtable.admin.v2.ICheckConsistencyRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.CheckConsistencyCallback): void;

                    /**
                     * Calls CheckConsistency.
                     * @param request CheckConsistencyRequest message or plain object
                     * @returns Promise
                     */
                    public checkConsistency(request: google.bigtable.admin.v2.ICheckConsistencyRequest): Promise<google.bigtable.admin.v2.CheckConsistencyResponse>;

                    /**
                     * Calls SnapshotTable.
                     * @param request SnapshotTableRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Operation
                     */
                    public snapshotTable(request: google.bigtable.admin.v2.ISnapshotTableRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.SnapshotTableCallback): void;

                    /**
                     * Calls SnapshotTable.
                     * @param request SnapshotTableRequest message or plain object
                     * @returns Promise
                     */
                    public snapshotTable(request: google.bigtable.admin.v2.ISnapshotTableRequest): Promise<google.longrunning.Operation>;

                    /**
                     * Calls GetSnapshot.
                     * @param request GetSnapshotRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Snapshot
                     */
                    public getSnapshot(request: google.bigtable.admin.v2.IGetSnapshotRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.GetSnapshotCallback): void;

                    /**
                     * Calls GetSnapshot.
                     * @param request GetSnapshotRequest message or plain object
                     * @returns Promise
                     */
                    public getSnapshot(request: google.bigtable.admin.v2.IGetSnapshotRequest): Promise<google.bigtable.admin.v2.Snapshot>;

                    /**
                     * Calls ListSnapshots.
                     * @param request ListSnapshotsRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and ListSnapshotsResponse
                     */
                    public listSnapshots(request: google.bigtable.admin.v2.IListSnapshotsRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.ListSnapshotsCallback): void;

                    /**
                     * Calls ListSnapshots.
                     * @param request ListSnapshotsRequest message or plain object
                     * @returns Promise
                     */
                    public listSnapshots(request: google.bigtable.admin.v2.IListSnapshotsRequest): Promise<google.bigtable.admin.v2.ListSnapshotsResponse>;

                    /**
                     * Calls DeleteSnapshot.
                     * @param request DeleteSnapshotRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Empty
                     */
                    public deleteSnapshot(request: google.bigtable.admin.v2.IDeleteSnapshotRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.DeleteSnapshotCallback): void;

                    /**
                     * Calls DeleteSnapshot.
                     * @param request DeleteSnapshotRequest message or plain object
                     * @returns Promise
                     */
                    public deleteSnapshot(request: google.bigtable.admin.v2.IDeleteSnapshotRequest): Promise<google.protobuf.Empty>;

                    /**
                     * Calls GetIamPolicy.
                     * @param request GetIamPolicyRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Policy
                     */
                    public getIamPolicy(request: google.iam.v1.IGetIamPolicyRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.GetIamPolicyCallback): void;

                    /**
                     * Calls GetIamPolicy.
                     * @param request GetIamPolicyRequest message or plain object
                     * @returns Promise
                     */
                    public getIamPolicy(request: google.iam.v1.IGetIamPolicyRequest): Promise<google.iam.v1.Policy>;

                    /**
                     * Calls SetIamPolicy.
                     * @param request SetIamPolicyRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and Policy
                     */
                    public setIamPolicy(request: google.iam.v1.ISetIamPolicyRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.SetIamPolicyCallback): void;

                    /**
                     * Calls SetIamPolicy.
                     * @param request SetIamPolicyRequest message or plain object
                     * @returns Promise
                     */
                    public setIamPolicy(request: google.iam.v1.ISetIamPolicyRequest): Promise<google.iam.v1.Policy>;

                    /**
                     * Calls TestIamPermissions.
                     * @param request TestIamPermissionsRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and TestIamPermissionsResponse
                     */
                    public testIamPermissions(request: google.iam.v1.ITestIamPermissionsRequest, callback: google.bigtable.admin.v2.BigtableTableAdmin.TestIamPermissionsCallback): void;

                    /**
                     * Calls TestIamPermissions.
                     * @param request TestIamPermissionsRequest message or plain object
                     * @returns Promise
                     */
                    public testIamPermissions(request: google.iam.v1.ITestIamPermissionsRequest): Promise<google.iam.v1.TestIamPermissionsResponse>;
                }

                namespace BigtableTableAdmin {

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#createTable}.
                     * @param error Error, if any
                     * @param [response] Table
                     */
                    type CreateTableCallback = (error: (Error|null), response?: google.bigtable.admin.v2.Table) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#createTableFromSnapshot}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type CreateTableFromSnapshotCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#listTables}.
                     * @param error Error, if any
                     * @param [response] ListTablesResponse
                     */
                    type ListTablesCallback = (error: (Error|null), response?: google.bigtable.admin.v2.ListTablesResponse) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#getTable}.
                     * @param error Error, if any
                     * @param [response] Table
                     */
                    type GetTableCallback = (error: (Error|null), response?: google.bigtable.admin.v2.Table) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#deleteTable}.
                     * @param error Error, if any
                     * @param [response] Empty
                     */
                    type DeleteTableCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#modifyColumnFamilies}.
                     * @param error Error, if any
                     * @param [response] Table
                     */
                    type ModifyColumnFamiliesCallback = (error: (Error|null), response?: google.bigtable.admin.v2.Table) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#dropRowRange}.
                     * @param error Error, if any
                     * @param [response] Empty
                     */
                    type DropRowRangeCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#generateConsistencyToken}.
                     * @param error Error, if any
                     * @param [response] GenerateConsistencyTokenResponse
                     */
                    type GenerateConsistencyTokenCallback = (error: (Error|null), response?: google.bigtable.admin.v2.GenerateConsistencyTokenResponse) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#checkConsistency}.
                     * @param error Error, if any
                     * @param [response] CheckConsistencyResponse
                     */
                    type CheckConsistencyCallback = (error: (Error|null), response?: google.bigtable.admin.v2.CheckConsistencyResponse) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#snapshotTable}.
                     * @param error Error, if any
                     * @param [response] Operation
                     */
                    type SnapshotTableCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#getSnapshot}.
                     * @param error Error, if any
                     * @param [response] Snapshot
                     */
                    type GetSnapshotCallback = (error: (Error|null), response?: google.bigtable.admin.v2.Snapshot) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#listSnapshots}.
                     * @param error Error, if any
                     * @param [response] ListSnapshotsResponse
                     */
                    type ListSnapshotsCallback = (error: (Error|null), response?: google.bigtable.admin.v2.ListSnapshotsResponse) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#deleteSnapshot}.
                     * @param error Error, if any
                     * @param [response] Empty
                     */
                    type DeleteSnapshotCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#getIamPolicy}.
                     * @param error Error, if any
                     * @param [response] Policy
                     */
                    type GetIamPolicyCallback = (error: (Error|null), response?: google.iam.v1.Policy) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#setIamPolicy}.
                     * @param error Error, if any
                     * @param [response] Policy
                     */
                    type SetIamPolicyCallback = (error: (Error|null), response?: google.iam.v1.Policy) => void;

                    /**
                     * Callback as used by {@link google.bigtable.admin.v2.BigtableTableAdmin#testIamPermissions}.
                     * @param error Error, if any
                     * @param [response] TestIamPermissionsResponse
                     */
                    type TestIamPermissionsCallback = (error: (Error|null), response?: google.iam.v1.TestIamPermissionsResponse) => void;
                }

                /** Properties of a CreateTableRequest. */
                interface ICreateTableRequest {

                    /** CreateTableRequest parent */
                    parent?: (string|null);

                    /** CreateTableRequest tableId */
                    tableId?: (string|null);

                    /** CreateTableRequest table */
                    table?: (google.bigtable.admin.v2.ITable|null);

                    /** CreateTableRequest initialSplits */
                    initialSplits?: (google.bigtable.admin.v2.CreateTableRequest.ISplit[]|null);
                }

                /** Represents a CreateTableRequest. */
                class CreateTableRequest implements ICreateTableRequest {

                    /**
                     * Constructs a new CreateTableRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICreateTableRequest);

                    /** CreateTableRequest parent. */
                    public parent: string;

                    /** CreateTableRequest tableId. */
                    public tableId: string;

                    /** CreateTableRequest table. */
                    public table?: (google.bigtable.admin.v2.ITable|null);

                    /** CreateTableRequest initialSplits. */
                    public initialSplits: google.bigtable.admin.v2.CreateTableRequest.ISplit[];

                    /**
                     * Creates a new CreateTableRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CreateTableRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICreateTableRequest): google.bigtable.admin.v2.CreateTableRequest;

                    /**
                     * Encodes the specified CreateTableRequest message. Does not implicitly {@link google.bigtable.admin.v2.CreateTableRequest.verify|verify} messages.
                     * @param message CreateTableRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICreateTableRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CreateTableRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CreateTableRequest.verify|verify} messages.
                     * @param message CreateTableRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICreateTableRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CreateTableRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CreateTableRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CreateTableRequest;

                    /**
                     * Decodes a CreateTableRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CreateTableRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CreateTableRequest;

                    /**
                     * Verifies a CreateTableRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CreateTableRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CreateTableRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CreateTableRequest;

                    /**
                     * Creates a plain object from a CreateTableRequest message. Also converts values to other types if specified.
                     * @param message CreateTableRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CreateTableRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CreateTableRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace CreateTableRequest {

                    /** Properties of a Split. */
                    interface ISplit {

                        /** Split key */
                        key?: (Uint8Array|null);
                    }

                    /** Represents a Split. */
                    class Split implements ISplit {

                        /**
                         * Constructs a new Split.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.bigtable.admin.v2.CreateTableRequest.ISplit);

                        /** Split key. */
                        public key: Uint8Array;

                        /**
                         * Creates a new Split instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Split instance
                         */
                        public static create(properties?: google.bigtable.admin.v2.CreateTableRequest.ISplit): google.bigtable.admin.v2.CreateTableRequest.Split;

                        /**
                         * Encodes the specified Split message. Does not implicitly {@link google.bigtable.admin.v2.CreateTableRequest.Split.verify|verify} messages.
                         * @param message Split message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.bigtable.admin.v2.CreateTableRequest.ISplit, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Split message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CreateTableRequest.Split.verify|verify} messages.
                         * @param message Split message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.bigtable.admin.v2.CreateTableRequest.ISplit, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Split message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Split
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CreateTableRequest.Split;

                        /**
                         * Decodes a Split message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Split
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CreateTableRequest.Split;

                        /**
                         * Verifies a Split message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Split message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Split
                         */
                        public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CreateTableRequest.Split;

                        /**
                         * Creates a plain object from a Split message. Also converts values to other types if specified.
                         * @param message Split
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.bigtable.admin.v2.CreateTableRequest.Split, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Split to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a CreateTableFromSnapshotRequest. */
                interface ICreateTableFromSnapshotRequest {

                    /** CreateTableFromSnapshotRequest parent */
                    parent?: (string|null);

                    /** CreateTableFromSnapshotRequest tableId */
                    tableId?: (string|null);

                    /** CreateTableFromSnapshotRequest sourceSnapshot */
                    sourceSnapshot?: (string|null);
                }

                /** Represents a CreateTableFromSnapshotRequest. */
                class CreateTableFromSnapshotRequest implements ICreateTableFromSnapshotRequest {

                    /**
                     * Constructs a new CreateTableFromSnapshotRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICreateTableFromSnapshotRequest);

                    /** CreateTableFromSnapshotRequest parent. */
                    public parent: string;

                    /** CreateTableFromSnapshotRequest tableId. */
                    public tableId: string;

                    /** CreateTableFromSnapshotRequest sourceSnapshot. */
                    public sourceSnapshot: string;

                    /**
                     * Creates a new CreateTableFromSnapshotRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CreateTableFromSnapshotRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICreateTableFromSnapshotRequest): google.bigtable.admin.v2.CreateTableFromSnapshotRequest;

                    /**
                     * Encodes the specified CreateTableFromSnapshotRequest message. Does not implicitly {@link google.bigtable.admin.v2.CreateTableFromSnapshotRequest.verify|verify} messages.
                     * @param message CreateTableFromSnapshotRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICreateTableFromSnapshotRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CreateTableFromSnapshotRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CreateTableFromSnapshotRequest.verify|verify} messages.
                     * @param message CreateTableFromSnapshotRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICreateTableFromSnapshotRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CreateTableFromSnapshotRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CreateTableFromSnapshotRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CreateTableFromSnapshotRequest;

                    /**
                     * Decodes a CreateTableFromSnapshotRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CreateTableFromSnapshotRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CreateTableFromSnapshotRequest;

                    /**
                     * Verifies a CreateTableFromSnapshotRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CreateTableFromSnapshotRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CreateTableFromSnapshotRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CreateTableFromSnapshotRequest;

                    /**
                     * Creates a plain object from a CreateTableFromSnapshotRequest message. Also converts values to other types if specified.
                     * @param message CreateTableFromSnapshotRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CreateTableFromSnapshotRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CreateTableFromSnapshotRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DropRowRangeRequest. */
                interface IDropRowRangeRequest {

                    /** DropRowRangeRequest name */
                    name?: (string|null);

                    /** DropRowRangeRequest rowKeyPrefix */
                    rowKeyPrefix?: (Uint8Array|null);

                    /** DropRowRangeRequest deleteAllDataFromTable */
                    deleteAllDataFromTable?: (boolean|null);
                }

                /** Represents a DropRowRangeRequest. */
                class DropRowRangeRequest implements IDropRowRangeRequest {

                    /**
                     * Constructs a new DropRowRangeRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IDropRowRangeRequest);

                    /** DropRowRangeRequest name. */
                    public name: string;

                    /** DropRowRangeRequest rowKeyPrefix. */
                    public rowKeyPrefix: Uint8Array;

                    /** DropRowRangeRequest deleteAllDataFromTable. */
                    public deleteAllDataFromTable: boolean;

                    /** DropRowRangeRequest target. */
                    public target?: ("rowKeyPrefix"|"deleteAllDataFromTable");

                    /**
                     * Creates a new DropRowRangeRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DropRowRangeRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IDropRowRangeRequest): google.bigtable.admin.v2.DropRowRangeRequest;

                    /**
                     * Encodes the specified DropRowRangeRequest message. Does not implicitly {@link google.bigtable.admin.v2.DropRowRangeRequest.verify|verify} messages.
                     * @param message DropRowRangeRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IDropRowRangeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DropRowRangeRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.DropRowRangeRequest.verify|verify} messages.
                     * @param message DropRowRangeRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IDropRowRangeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DropRowRangeRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DropRowRangeRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.DropRowRangeRequest;

                    /**
                     * Decodes a DropRowRangeRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DropRowRangeRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.DropRowRangeRequest;

                    /**
                     * Verifies a DropRowRangeRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DropRowRangeRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DropRowRangeRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.DropRowRangeRequest;

                    /**
                     * Creates a plain object from a DropRowRangeRequest message. Also converts values to other types if specified.
                     * @param message DropRowRangeRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.DropRowRangeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DropRowRangeRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListTablesRequest. */
                interface IListTablesRequest {

                    /** ListTablesRequest parent */
                    parent?: (string|null);

                    /** ListTablesRequest view */
                    view?: (google.bigtable.admin.v2.Table.View|null);

                    /** ListTablesRequest pageSize */
                    pageSize?: (number|null);

                    /** ListTablesRequest pageToken */
                    pageToken?: (string|null);
                }

                /** Represents a ListTablesRequest. */
                class ListTablesRequest implements IListTablesRequest {

                    /**
                     * Constructs a new ListTablesRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListTablesRequest);

                    /** ListTablesRequest parent. */
                    public parent: string;

                    /** ListTablesRequest view. */
                    public view: google.bigtable.admin.v2.Table.View;

                    /** ListTablesRequest pageSize. */
                    public pageSize: number;

                    /** ListTablesRequest pageToken. */
                    public pageToken: string;

                    /**
                     * Creates a new ListTablesRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListTablesRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListTablesRequest): google.bigtable.admin.v2.ListTablesRequest;

                    /**
                     * Encodes the specified ListTablesRequest message. Does not implicitly {@link google.bigtable.admin.v2.ListTablesRequest.verify|verify} messages.
                     * @param message ListTablesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListTablesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListTablesRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListTablesRequest.verify|verify} messages.
                     * @param message ListTablesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListTablesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListTablesRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListTablesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListTablesRequest;

                    /**
                     * Decodes a ListTablesRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListTablesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListTablesRequest;

                    /**
                     * Verifies a ListTablesRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListTablesRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListTablesRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListTablesRequest;

                    /**
                     * Creates a plain object from a ListTablesRequest message. Also converts values to other types if specified.
                     * @param message ListTablesRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListTablesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListTablesRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListTablesResponse. */
                interface IListTablesResponse {

                    /** ListTablesResponse tables */
                    tables?: (google.bigtable.admin.v2.ITable[]|null);

                    /** ListTablesResponse nextPageToken */
                    nextPageToken?: (string|null);
                }

                /** Represents a ListTablesResponse. */
                class ListTablesResponse implements IListTablesResponse {

                    /**
                     * Constructs a new ListTablesResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListTablesResponse);

                    /** ListTablesResponse tables. */
                    public tables: google.bigtable.admin.v2.ITable[];

                    /** ListTablesResponse nextPageToken. */
                    public nextPageToken: string;

                    /**
                     * Creates a new ListTablesResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListTablesResponse instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListTablesResponse): google.bigtable.admin.v2.ListTablesResponse;

                    /**
                     * Encodes the specified ListTablesResponse message. Does not implicitly {@link google.bigtable.admin.v2.ListTablesResponse.verify|verify} messages.
                     * @param message ListTablesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListTablesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListTablesResponse message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListTablesResponse.verify|verify} messages.
                     * @param message ListTablesResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListTablesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListTablesResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListTablesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListTablesResponse;

                    /**
                     * Decodes a ListTablesResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListTablesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListTablesResponse;

                    /**
                     * Verifies a ListTablesResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListTablesResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListTablesResponse
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListTablesResponse;

                    /**
                     * Creates a plain object from a ListTablesResponse message. Also converts values to other types if specified.
                     * @param message ListTablesResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListTablesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListTablesResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GetTableRequest. */
                interface IGetTableRequest {

                    /** GetTableRequest name */
                    name?: (string|null);

                    /** GetTableRequest view */
                    view?: (google.bigtable.admin.v2.Table.View|null);
                }

                /** Represents a GetTableRequest. */
                class GetTableRequest implements IGetTableRequest {

                    /**
                     * Constructs a new GetTableRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IGetTableRequest);

                    /** GetTableRequest name. */
                    public name: string;

                    /** GetTableRequest view. */
                    public view: google.bigtable.admin.v2.Table.View;

                    /**
                     * Creates a new GetTableRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GetTableRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IGetTableRequest): google.bigtable.admin.v2.GetTableRequest;

                    /**
                     * Encodes the specified GetTableRequest message. Does not implicitly {@link google.bigtable.admin.v2.GetTableRequest.verify|verify} messages.
                     * @param message GetTableRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IGetTableRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GetTableRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GetTableRequest.verify|verify} messages.
                     * @param message GetTableRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IGetTableRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GetTableRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GetTableRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GetTableRequest;

                    /**
                     * Decodes a GetTableRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GetTableRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GetTableRequest;

                    /**
                     * Verifies a GetTableRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GetTableRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GetTableRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GetTableRequest;

                    /**
                     * Creates a plain object from a GetTableRequest message. Also converts values to other types if specified.
                     * @param message GetTableRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.GetTableRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GetTableRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DeleteTableRequest. */
                interface IDeleteTableRequest {

                    /** DeleteTableRequest name */
                    name?: (string|null);
                }

                /** Represents a DeleteTableRequest. */
                class DeleteTableRequest implements IDeleteTableRequest {

                    /**
                     * Constructs a new DeleteTableRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IDeleteTableRequest);

                    /** DeleteTableRequest name. */
                    public name: string;

                    /**
                     * Creates a new DeleteTableRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeleteTableRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IDeleteTableRequest): google.bigtable.admin.v2.DeleteTableRequest;

                    /**
                     * Encodes the specified DeleteTableRequest message. Does not implicitly {@link google.bigtable.admin.v2.DeleteTableRequest.verify|verify} messages.
                     * @param message DeleteTableRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IDeleteTableRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeleteTableRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.DeleteTableRequest.verify|verify} messages.
                     * @param message DeleteTableRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IDeleteTableRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeleteTableRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeleteTableRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.DeleteTableRequest;

                    /**
                     * Decodes a DeleteTableRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeleteTableRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.DeleteTableRequest;

                    /**
                     * Verifies a DeleteTableRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeleteTableRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeleteTableRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.DeleteTableRequest;

                    /**
                     * Creates a plain object from a DeleteTableRequest message. Also converts values to other types if specified.
                     * @param message DeleteTableRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.DeleteTableRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeleteTableRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ModifyColumnFamiliesRequest. */
                interface IModifyColumnFamiliesRequest {

                    /** ModifyColumnFamiliesRequest name */
                    name?: (string|null);

                    /** ModifyColumnFamiliesRequest modifications */
                    modifications?: (google.bigtable.admin.v2.ModifyColumnFamiliesRequest.IModification[]|null);
                }

                /** Represents a ModifyColumnFamiliesRequest. */
                class ModifyColumnFamiliesRequest implements IModifyColumnFamiliesRequest {

                    /**
                     * Constructs a new ModifyColumnFamiliesRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IModifyColumnFamiliesRequest);

                    /** ModifyColumnFamiliesRequest name. */
                    public name: string;

                    /** ModifyColumnFamiliesRequest modifications. */
                    public modifications: google.bigtable.admin.v2.ModifyColumnFamiliesRequest.IModification[];

                    /**
                     * Creates a new ModifyColumnFamiliesRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ModifyColumnFamiliesRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IModifyColumnFamiliesRequest): google.bigtable.admin.v2.ModifyColumnFamiliesRequest;

                    /**
                     * Encodes the specified ModifyColumnFamiliesRequest message. Does not implicitly {@link google.bigtable.admin.v2.ModifyColumnFamiliesRequest.verify|verify} messages.
                     * @param message ModifyColumnFamiliesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IModifyColumnFamiliesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ModifyColumnFamiliesRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ModifyColumnFamiliesRequest.verify|verify} messages.
                     * @param message ModifyColumnFamiliesRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IModifyColumnFamiliesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ModifyColumnFamiliesRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ModifyColumnFamiliesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ModifyColumnFamiliesRequest;

                    /**
                     * Decodes a ModifyColumnFamiliesRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ModifyColumnFamiliesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ModifyColumnFamiliesRequest;

                    /**
                     * Verifies a ModifyColumnFamiliesRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ModifyColumnFamiliesRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ModifyColumnFamiliesRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ModifyColumnFamiliesRequest;

                    /**
                     * Creates a plain object from a ModifyColumnFamiliesRequest message. Also converts values to other types if specified.
                     * @param message ModifyColumnFamiliesRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ModifyColumnFamiliesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ModifyColumnFamiliesRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                namespace ModifyColumnFamiliesRequest {

                    /** Properties of a Modification. */
                    interface IModification {

                        /** Modification id */
                        id?: (string|null);

                        /** Modification create */
                        create?: (google.bigtable.admin.v2.IColumnFamily|null);

                        /** Modification update */
                        update?: (google.bigtable.admin.v2.IColumnFamily|null);

                        /** Modification drop */
                        drop?: (boolean|null);
                    }

                    /** Represents a Modification. */
                    class Modification implements IModification {

                        /**
                         * Constructs a new Modification.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.bigtable.admin.v2.ModifyColumnFamiliesRequest.IModification);

                        /** Modification id. */
                        public id: string;

                        /** Modification create. */
                        public create?: (google.bigtable.admin.v2.IColumnFamily|null);

                        /** Modification update. */
                        public update?: (google.bigtable.admin.v2.IColumnFamily|null);

                        /** Modification drop. */
                        public drop: boolean;

                        /** Modification mod. */
                        public mod?: ("create"|"update"|"drop");

                        /**
                         * Creates a new Modification instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Modification instance
                         */
                        public static create(properties?: google.bigtable.admin.v2.ModifyColumnFamiliesRequest.IModification): google.bigtable.admin.v2.ModifyColumnFamiliesRequest.Modification;

                        /**
                         * Encodes the specified Modification message. Does not implicitly {@link google.bigtable.admin.v2.ModifyColumnFamiliesRequest.Modification.verify|verify} messages.
                         * @param message Modification message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.bigtable.admin.v2.ModifyColumnFamiliesRequest.IModification, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Modification message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ModifyColumnFamiliesRequest.Modification.verify|verify} messages.
                         * @param message Modification message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.bigtable.admin.v2.ModifyColumnFamiliesRequest.IModification, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Modification message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Modification
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ModifyColumnFamiliesRequest.Modification;

                        /**
                         * Decodes a Modification message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Modification
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ModifyColumnFamiliesRequest.Modification;

                        /**
                         * Verifies a Modification message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Modification message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Modification
                         */
                        public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ModifyColumnFamiliesRequest.Modification;

                        /**
                         * Creates a plain object from a Modification message. Also converts values to other types if specified.
                         * @param message Modification
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.bigtable.admin.v2.ModifyColumnFamiliesRequest.Modification, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Modification to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };
                    }
                }

                /** Properties of a GenerateConsistencyTokenRequest. */
                interface IGenerateConsistencyTokenRequest {

                    /** GenerateConsistencyTokenRequest name */
                    name?: (string|null);
                }

                /** Represents a GenerateConsistencyTokenRequest. */
                class GenerateConsistencyTokenRequest implements IGenerateConsistencyTokenRequest {

                    /**
                     * Constructs a new GenerateConsistencyTokenRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IGenerateConsistencyTokenRequest);

                    /** GenerateConsistencyTokenRequest name. */
                    public name: string;

                    /**
                     * Creates a new GenerateConsistencyTokenRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GenerateConsistencyTokenRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IGenerateConsistencyTokenRequest): google.bigtable.admin.v2.GenerateConsistencyTokenRequest;

                    /**
                     * Encodes the specified GenerateConsistencyTokenRequest message. Does not implicitly {@link google.bigtable.admin.v2.GenerateConsistencyTokenRequest.verify|verify} messages.
                     * @param message GenerateConsistencyTokenRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IGenerateConsistencyTokenRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GenerateConsistencyTokenRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GenerateConsistencyTokenRequest.verify|verify} messages.
                     * @param message GenerateConsistencyTokenRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IGenerateConsistencyTokenRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GenerateConsistencyTokenRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GenerateConsistencyTokenRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GenerateConsistencyTokenRequest;

                    /**
                     * Decodes a GenerateConsistencyTokenRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GenerateConsistencyTokenRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GenerateConsistencyTokenRequest;

                    /**
                     * Verifies a GenerateConsistencyTokenRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GenerateConsistencyTokenRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GenerateConsistencyTokenRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GenerateConsistencyTokenRequest;

                    /**
                     * Creates a plain object from a GenerateConsistencyTokenRequest message. Also converts values to other types if specified.
                     * @param message GenerateConsistencyTokenRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.GenerateConsistencyTokenRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GenerateConsistencyTokenRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GenerateConsistencyTokenResponse. */
                interface IGenerateConsistencyTokenResponse {

                    /** GenerateConsistencyTokenResponse consistencyToken */
                    consistencyToken?: (string|null);
                }

                /** Represents a GenerateConsistencyTokenResponse. */
                class GenerateConsistencyTokenResponse implements IGenerateConsistencyTokenResponse {

                    /**
                     * Constructs a new GenerateConsistencyTokenResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IGenerateConsistencyTokenResponse);

                    /** GenerateConsistencyTokenResponse consistencyToken. */
                    public consistencyToken: string;

                    /**
                     * Creates a new GenerateConsistencyTokenResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GenerateConsistencyTokenResponse instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IGenerateConsistencyTokenResponse): google.bigtable.admin.v2.GenerateConsistencyTokenResponse;

                    /**
                     * Encodes the specified GenerateConsistencyTokenResponse message. Does not implicitly {@link google.bigtable.admin.v2.GenerateConsistencyTokenResponse.verify|verify} messages.
                     * @param message GenerateConsistencyTokenResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IGenerateConsistencyTokenResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GenerateConsistencyTokenResponse message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GenerateConsistencyTokenResponse.verify|verify} messages.
                     * @param message GenerateConsistencyTokenResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IGenerateConsistencyTokenResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GenerateConsistencyTokenResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GenerateConsistencyTokenResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GenerateConsistencyTokenResponse;

                    /**
                     * Decodes a GenerateConsistencyTokenResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GenerateConsistencyTokenResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GenerateConsistencyTokenResponse;

                    /**
                     * Verifies a GenerateConsistencyTokenResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GenerateConsistencyTokenResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GenerateConsistencyTokenResponse
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GenerateConsistencyTokenResponse;

                    /**
                     * Creates a plain object from a GenerateConsistencyTokenResponse message. Also converts values to other types if specified.
                     * @param message GenerateConsistencyTokenResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.GenerateConsistencyTokenResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GenerateConsistencyTokenResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CheckConsistencyRequest. */
                interface ICheckConsistencyRequest {

                    /** CheckConsistencyRequest name */
                    name?: (string|null);

                    /** CheckConsistencyRequest consistencyToken */
                    consistencyToken?: (string|null);
                }

                /** Represents a CheckConsistencyRequest. */
                class CheckConsistencyRequest implements ICheckConsistencyRequest {

                    /**
                     * Constructs a new CheckConsistencyRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICheckConsistencyRequest);

                    /** CheckConsistencyRequest name. */
                    public name: string;

                    /** CheckConsistencyRequest consistencyToken. */
                    public consistencyToken: string;

                    /**
                     * Creates a new CheckConsistencyRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CheckConsistencyRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICheckConsistencyRequest): google.bigtable.admin.v2.CheckConsistencyRequest;

                    /**
                     * Encodes the specified CheckConsistencyRequest message. Does not implicitly {@link google.bigtable.admin.v2.CheckConsistencyRequest.verify|verify} messages.
                     * @param message CheckConsistencyRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICheckConsistencyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CheckConsistencyRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CheckConsistencyRequest.verify|verify} messages.
                     * @param message CheckConsistencyRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICheckConsistencyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CheckConsistencyRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CheckConsistencyRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CheckConsistencyRequest;

                    /**
                     * Decodes a CheckConsistencyRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CheckConsistencyRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CheckConsistencyRequest;

                    /**
                     * Verifies a CheckConsistencyRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CheckConsistencyRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CheckConsistencyRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CheckConsistencyRequest;

                    /**
                     * Creates a plain object from a CheckConsistencyRequest message. Also converts values to other types if specified.
                     * @param message CheckConsistencyRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CheckConsistencyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CheckConsistencyRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CheckConsistencyResponse. */
                interface ICheckConsistencyResponse {

                    /** CheckConsistencyResponse consistent */
                    consistent?: (boolean|null);
                }

                /** Represents a CheckConsistencyResponse. */
                class CheckConsistencyResponse implements ICheckConsistencyResponse {

                    /**
                     * Constructs a new CheckConsistencyResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICheckConsistencyResponse);

                    /** CheckConsistencyResponse consistent. */
                    public consistent: boolean;

                    /**
                     * Creates a new CheckConsistencyResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CheckConsistencyResponse instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICheckConsistencyResponse): google.bigtable.admin.v2.CheckConsistencyResponse;

                    /**
                     * Encodes the specified CheckConsistencyResponse message. Does not implicitly {@link google.bigtable.admin.v2.CheckConsistencyResponse.verify|verify} messages.
                     * @param message CheckConsistencyResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICheckConsistencyResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CheckConsistencyResponse message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CheckConsistencyResponse.verify|verify} messages.
                     * @param message CheckConsistencyResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICheckConsistencyResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CheckConsistencyResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CheckConsistencyResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CheckConsistencyResponse;

                    /**
                     * Decodes a CheckConsistencyResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CheckConsistencyResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CheckConsistencyResponse;

                    /**
                     * Verifies a CheckConsistencyResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CheckConsistencyResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CheckConsistencyResponse
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CheckConsistencyResponse;

                    /**
                     * Creates a plain object from a CheckConsistencyResponse message. Also converts values to other types if specified.
                     * @param message CheckConsistencyResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CheckConsistencyResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CheckConsistencyResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a SnapshotTableRequest. */
                interface ISnapshotTableRequest {

                    /** SnapshotTableRequest name */
                    name?: (string|null);

                    /** SnapshotTableRequest cluster */
                    cluster?: (string|null);

                    /** SnapshotTableRequest snapshotId */
                    snapshotId?: (string|null);

                    /** SnapshotTableRequest ttl */
                    ttl?: (google.protobuf.IDuration|null);

                    /** SnapshotTableRequest description */
                    description?: (string|null);
                }

                /** Represents a SnapshotTableRequest. */
                class SnapshotTableRequest implements ISnapshotTableRequest {

                    /**
                     * Constructs a new SnapshotTableRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ISnapshotTableRequest);

                    /** SnapshotTableRequest name. */
                    public name: string;

                    /** SnapshotTableRequest cluster. */
                    public cluster: string;

                    /** SnapshotTableRequest snapshotId. */
                    public snapshotId: string;

                    /** SnapshotTableRequest ttl. */
                    public ttl?: (google.protobuf.IDuration|null);

                    /** SnapshotTableRequest description. */
                    public description: string;

                    /**
                     * Creates a new SnapshotTableRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SnapshotTableRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ISnapshotTableRequest): google.bigtable.admin.v2.SnapshotTableRequest;

                    /**
                     * Encodes the specified SnapshotTableRequest message. Does not implicitly {@link google.bigtable.admin.v2.SnapshotTableRequest.verify|verify} messages.
                     * @param message SnapshotTableRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ISnapshotTableRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SnapshotTableRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.SnapshotTableRequest.verify|verify} messages.
                     * @param message SnapshotTableRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ISnapshotTableRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SnapshotTableRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SnapshotTableRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.SnapshotTableRequest;

                    /**
                     * Decodes a SnapshotTableRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SnapshotTableRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.SnapshotTableRequest;

                    /**
                     * Verifies a SnapshotTableRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SnapshotTableRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SnapshotTableRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.SnapshotTableRequest;

                    /**
                     * Creates a plain object from a SnapshotTableRequest message. Also converts values to other types if specified.
                     * @param message SnapshotTableRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.SnapshotTableRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SnapshotTableRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a GetSnapshotRequest. */
                interface IGetSnapshotRequest {

                    /** GetSnapshotRequest name */
                    name?: (string|null);
                }

                /** Represents a GetSnapshotRequest. */
                class GetSnapshotRequest implements IGetSnapshotRequest {

                    /**
                     * Constructs a new GetSnapshotRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IGetSnapshotRequest);

                    /** GetSnapshotRequest name. */
                    public name: string;

                    /**
                     * Creates a new GetSnapshotRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns GetSnapshotRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IGetSnapshotRequest): google.bigtable.admin.v2.GetSnapshotRequest;

                    /**
                     * Encodes the specified GetSnapshotRequest message. Does not implicitly {@link google.bigtable.admin.v2.GetSnapshotRequest.verify|verify} messages.
                     * @param message GetSnapshotRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IGetSnapshotRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified GetSnapshotRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.GetSnapshotRequest.verify|verify} messages.
                     * @param message GetSnapshotRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IGetSnapshotRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a GetSnapshotRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns GetSnapshotRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.GetSnapshotRequest;

                    /**
                     * Decodes a GetSnapshotRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns GetSnapshotRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.GetSnapshotRequest;

                    /**
                     * Verifies a GetSnapshotRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a GetSnapshotRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns GetSnapshotRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.GetSnapshotRequest;

                    /**
                     * Creates a plain object from a GetSnapshotRequest message. Also converts values to other types if specified.
                     * @param message GetSnapshotRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.GetSnapshotRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this GetSnapshotRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListSnapshotsRequest. */
                interface IListSnapshotsRequest {

                    /** ListSnapshotsRequest parent */
                    parent?: (string|null);

                    /** ListSnapshotsRequest pageSize */
                    pageSize?: (number|null);

                    /** ListSnapshotsRequest pageToken */
                    pageToken?: (string|null);
                }

                /** Represents a ListSnapshotsRequest. */
                class ListSnapshotsRequest implements IListSnapshotsRequest {

                    /**
                     * Constructs a new ListSnapshotsRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListSnapshotsRequest);

                    /** ListSnapshotsRequest parent. */
                    public parent: string;

                    /** ListSnapshotsRequest pageSize. */
                    public pageSize: number;

                    /** ListSnapshotsRequest pageToken. */
                    public pageToken: string;

                    /**
                     * Creates a new ListSnapshotsRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListSnapshotsRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListSnapshotsRequest): google.bigtable.admin.v2.ListSnapshotsRequest;

                    /**
                     * Encodes the specified ListSnapshotsRequest message. Does not implicitly {@link google.bigtable.admin.v2.ListSnapshotsRequest.verify|verify} messages.
                     * @param message ListSnapshotsRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListSnapshotsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListSnapshotsRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListSnapshotsRequest.verify|verify} messages.
                     * @param message ListSnapshotsRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListSnapshotsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListSnapshotsRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListSnapshotsRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListSnapshotsRequest;

                    /**
                     * Decodes a ListSnapshotsRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListSnapshotsRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListSnapshotsRequest;

                    /**
                     * Verifies a ListSnapshotsRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListSnapshotsRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListSnapshotsRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListSnapshotsRequest;

                    /**
                     * Creates a plain object from a ListSnapshotsRequest message. Also converts values to other types if specified.
                     * @param message ListSnapshotsRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListSnapshotsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListSnapshotsRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a ListSnapshotsResponse. */
                interface IListSnapshotsResponse {

                    /** ListSnapshotsResponse snapshots */
                    snapshots?: (google.bigtable.admin.v2.ISnapshot[]|null);

                    /** ListSnapshotsResponse nextPageToken */
                    nextPageToken?: (string|null);
                }

                /** Represents a ListSnapshotsResponse. */
                class ListSnapshotsResponse implements IListSnapshotsResponse {

                    /**
                     * Constructs a new ListSnapshotsResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IListSnapshotsResponse);

                    /** ListSnapshotsResponse snapshots. */
                    public snapshots: google.bigtable.admin.v2.ISnapshot[];

                    /** ListSnapshotsResponse nextPageToken. */
                    public nextPageToken: string;

                    /**
                     * Creates a new ListSnapshotsResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ListSnapshotsResponse instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IListSnapshotsResponse): google.bigtable.admin.v2.ListSnapshotsResponse;

                    /**
                     * Encodes the specified ListSnapshotsResponse message. Does not implicitly {@link google.bigtable.admin.v2.ListSnapshotsResponse.verify|verify} messages.
                     * @param message ListSnapshotsResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IListSnapshotsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ListSnapshotsResponse message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.ListSnapshotsResponse.verify|verify} messages.
                     * @param message ListSnapshotsResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IListSnapshotsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ListSnapshotsResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ListSnapshotsResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.ListSnapshotsResponse;

                    /**
                     * Decodes a ListSnapshotsResponse message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ListSnapshotsResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.ListSnapshotsResponse;

                    /**
                     * Verifies a ListSnapshotsResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ListSnapshotsResponse message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ListSnapshotsResponse
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.ListSnapshotsResponse;

                    /**
                     * Creates a plain object from a ListSnapshotsResponse message. Also converts values to other types if specified.
                     * @param message ListSnapshotsResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.ListSnapshotsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ListSnapshotsResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a DeleteSnapshotRequest. */
                interface IDeleteSnapshotRequest {

                    /** DeleteSnapshotRequest name */
                    name?: (string|null);
                }

                /** Represents a DeleteSnapshotRequest. */
                class DeleteSnapshotRequest implements IDeleteSnapshotRequest {

                    /**
                     * Constructs a new DeleteSnapshotRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.IDeleteSnapshotRequest);

                    /** DeleteSnapshotRequest name. */
                    public name: string;

                    /**
                     * Creates a new DeleteSnapshotRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DeleteSnapshotRequest instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.IDeleteSnapshotRequest): google.bigtable.admin.v2.DeleteSnapshotRequest;

                    /**
                     * Encodes the specified DeleteSnapshotRequest message. Does not implicitly {@link google.bigtable.admin.v2.DeleteSnapshotRequest.verify|verify} messages.
                     * @param message DeleteSnapshotRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.IDeleteSnapshotRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified DeleteSnapshotRequest message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.DeleteSnapshotRequest.verify|verify} messages.
                     * @param message DeleteSnapshotRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.IDeleteSnapshotRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DeleteSnapshotRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns DeleteSnapshotRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.DeleteSnapshotRequest;

                    /**
                     * Decodes a DeleteSnapshotRequest message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns DeleteSnapshotRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.DeleteSnapshotRequest;

                    /**
                     * Verifies a DeleteSnapshotRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a DeleteSnapshotRequest message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns DeleteSnapshotRequest
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.DeleteSnapshotRequest;

                    /**
                     * Creates a plain object from a DeleteSnapshotRequest message. Also converts values to other types if specified.
                     * @param message DeleteSnapshotRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.DeleteSnapshotRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this DeleteSnapshotRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a SnapshotTableMetadata. */
                interface ISnapshotTableMetadata {

                    /** SnapshotTableMetadata originalRequest */
                    originalRequest?: (google.bigtable.admin.v2.ISnapshotTableRequest|null);

                    /** SnapshotTableMetadata requestTime */
                    requestTime?: (google.protobuf.ITimestamp|null);

                    /** SnapshotTableMetadata finishTime */
                    finishTime?: (google.protobuf.ITimestamp|null);
                }

                /** Represents a SnapshotTableMetadata. */
                class SnapshotTableMetadata implements ISnapshotTableMetadata {

                    /**
                     * Constructs a new SnapshotTableMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ISnapshotTableMetadata);

                    /** SnapshotTableMetadata originalRequest. */
                    public originalRequest?: (google.bigtable.admin.v2.ISnapshotTableRequest|null);

                    /** SnapshotTableMetadata requestTime. */
                    public requestTime?: (google.protobuf.ITimestamp|null);

                    /** SnapshotTableMetadata finishTime. */
                    public finishTime?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new SnapshotTableMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SnapshotTableMetadata instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ISnapshotTableMetadata): google.bigtable.admin.v2.SnapshotTableMetadata;

                    /**
                     * Encodes the specified SnapshotTableMetadata message. Does not implicitly {@link google.bigtable.admin.v2.SnapshotTableMetadata.verify|verify} messages.
                     * @param message SnapshotTableMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ISnapshotTableMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified SnapshotTableMetadata message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.SnapshotTableMetadata.verify|verify} messages.
                     * @param message SnapshotTableMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ISnapshotTableMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SnapshotTableMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns SnapshotTableMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.SnapshotTableMetadata;

                    /**
                     * Decodes a SnapshotTableMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns SnapshotTableMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.SnapshotTableMetadata;

                    /**
                     * Verifies a SnapshotTableMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a SnapshotTableMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns SnapshotTableMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.SnapshotTableMetadata;

                    /**
                     * Creates a plain object from a SnapshotTableMetadata message. Also converts values to other types if specified.
                     * @param message SnapshotTableMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.SnapshotTableMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this SnapshotTableMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a CreateTableFromSnapshotMetadata. */
                interface ICreateTableFromSnapshotMetadata {

                    /** CreateTableFromSnapshotMetadata originalRequest */
                    originalRequest?: (google.bigtable.admin.v2.ICreateTableFromSnapshotRequest|null);

                    /** CreateTableFromSnapshotMetadata requestTime */
                    requestTime?: (google.protobuf.ITimestamp|null);

                    /** CreateTableFromSnapshotMetadata finishTime */
                    finishTime?: (google.protobuf.ITimestamp|null);
                }

                /** Represents a CreateTableFromSnapshotMetadata. */
                class CreateTableFromSnapshotMetadata implements ICreateTableFromSnapshotMetadata {

                    /**
                     * Constructs a new CreateTableFromSnapshotMetadata.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: google.bigtable.admin.v2.ICreateTableFromSnapshotMetadata);

                    /** CreateTableFromSnapshotMetadata originalRequest. */
                    public originalRequest?: (google.bigtable.admin.v2.ICreateTableFromSnapshotRequest|null);

                    /** CreateTableFromSnapshotMetadata requestTime. */
                    public requestTime?: (google.protobuf.ITimestamp|null);

                    /** CreateTableFromSnapshotMetadata finishTime. */
                    public finishTime?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new CreateTableFromSnapshotMetadata instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CreateTableFromSnapshotMetadata instance
                     */
                    public static create(properties?: google.bigtable.admin.v2.ICreateTableFromSnapshotMetadata): google.bigtable.admin.v2.CreateTableFromSnapshotMetadata;

                    /**
                     * Encodes the specified CreateTableFromSnapshotMetadata message. Does not implicitly {@link google.bigtable.admin.v2.CreateTableFromSnapshotMetadata.verify|verify} messages.
                     * @param message CreateTableFromSnapshotMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: google.bigtable.admin.v2.ICreateTableFromSnapshotMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified CreateTableFromSnapshotMetadata message, length delimited. Does not implicitly {@link google.bigtable.admin.v2.CreateTableFromSnapshotMetadata.verify|verify} messages.
                     * @param message CreateTableFromSnapshotMetadata message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: google.bigtable.admin.v2.ICreateTableFromSnapshotMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CreateTableFromSnapshotMetadata message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns CreateTableFromSnapshotMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.bigtable.admin.v2.CreateTableFromSnapshotMetadata;

                    /**
                     * Decodes a CreateTableFromSnapshotMetadata message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns CreateTableFromSnapshotMetadata
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.bigtable.admin.v2.CreateTableFromSnapshotMetadata;

                    /**
                     * Verifies a CreateTableFromSnapshotMetadata message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a CreateTableFromSnapshotMetadata message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns CreateTableFromSnapshotMetadata
                     */
                    public static fromObject(object: { [k: string]: any }): google.bigtable.admin.v2.CreateTableFromSnapshotMetadata;

                    /**
                     * Creates a plain object from a CreateTableFromSnapshotMetadata message. Also converts values to other types if specified.
                     * @param message CreateTableFromSnapshotMetadata
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: google.bigtable.admin.v2.CreateTableFromSnapshotMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this CreateTableFromSnapshotMetadata to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }
        }

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

        /** Properties of an ExtensionRangeOptions. */
        interface IExtensionRangeOptions {

            /** ExtensionRangeOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
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

            /** MethodOptions .google.api.methodSignature */
            ".google.api.methodSignature"?: (string[]|null);

            /** MethodOptions .google.longrunning.operationInfo */
            ".google.longrunning.operationInfo"?: (google.longrunning.IOperationInfo|null);
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

        /** Properties of a Duration. */
        interface IDuration {

            /** Duration seconds */
            seconds?: (number|Long|null);

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
            public seconds: (number|Long);

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
        }

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

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
            public seconds: (number|Long);

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

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Empty instance
             */
            public static create(properties?: google.protobuf.IEmpty): google.protobuf.Empty;

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Empty;

            /**
             * Verifies an Empty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Empty
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Empty;

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @param message Empty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Empty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FieldMask. */
        interface IFieldMask {

            /** FieldMask paths */
            paths?: (string[]|null);
        }

        /** Represents a FieldMask. */
        class FieldMask implements IFieldMask {

            /**
             * Constructs a new FieldMask.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldMask);

            /** FieldMask paths. */
            public paths: string[];

            /**
             * Creates a new FieldMask instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FieldMask instance
             */
            public static create(properties?: google.protobuf.IFieldMask): google.protobuf.FieldMask;

            /**
             * Encodes the specified FieldMask message. Does not implicitly {@link google.protobuf.FieldMask.verify|verify} messages.
             * @param message FieldMask message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFieldMask, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FieldMask message, length delimited. Does not implicitly {@link google.protobuf.FieldMask.verify|verify} messages.
             * @param message FieldMask message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFieldMask, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FieldMask message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FieldMask
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldMask;

            /**
             * Decodes a FieldMask message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FieldMask
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldMask;

            /**
             * Verifies a FieldMask message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FieldMask message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldMask
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldMask;

            /**
             * Creates a plain object from a FieldMask message. Also converts values to other types if specified.
             * @param message FieldMask
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldMask, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldMask to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
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
    }

    /** Namespace iam. */
    namespace iam {

        /** Namespace v1. */
        namespace v1 {

            /** Represents a IAMPolicy */
            class IAMPolicy extends $protobuf.rpc.Service {

                /**
                 * Constructs a new IAMPolicy service.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 */
                constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                /**
                 * Creates new IAMPolicy service using the specified rpc implementation.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 * @returns RPC service. Useful where requests and/or responses are streamed.
                 */
                public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): IAMPolicy;

                /**
                 * Calls SetIamPolicy.
                 * @param request SetIamPolicyRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and Policy
                 */
                public setIamPolicy(request: google.iam.v1.ISetIamPolicyRequest, callback: google.iam.v1.IAMPolicy.SetIamPolicyCallback): void;

                /**
                 * Calls SetIamPolicy.
                 * @param request SetIamPolicyRequest message or plain object
                 * @returns Promise
                 */
                public setIamPolicy(request: google.iam.v1.ISetIamPolicyRequest): Promise<google.iam.v1.Policy>;

                /**
                 * Calls GetIamPolicy.
                 * @param request GetIamPolicyRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and Policy
                 */
                public getIamPolicy(request: google.iam.v1.IGetIamPolicyRequest, callback: google.iam.v1.IAMPolicy.GetIamPolicyCallback): void;

                /**
                 * Calls GetIamPolicy.
                 * @param request GetIamPolicyRequest message or plain object
                 * @returns Promise
                 */
                public getIamPolicy(request: google.iam.v1.IGetIamPolicyRequest): Promise<google.iam.v1.Policy>;

                /**
                 * Calls TestIamPermissions.
                 * @param request TestIamPermissionsRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and TestIamPermissionsResponse
                 */
                public testIamPermissions(request: google.iam.v1.ITestIamPermissionsRequest, callback: google.iam.v1.IAMPolicy.TestIamPermissionsCallback): void;

                /**
                 * Calls TestIamPermissions.
                 * @param request TestIamPermissionsRequest message or plain object
                 * @returns Promise
                 */
                public testIamPermissions(request: google.iam.v1.ITestIamPermissionsRequest): Promise<google.iam.v1.TestIamPermissionsResponse>;
            }

            namespace IAMPolicy {

                /**
                 * Callback as used by {@link google.iam.v1.IAMPolicy#setIamPolicy}.
                 * @param error Error, if any
                 * @param [response] Policy
                 */
                type SetIamPolicyCallback = (error: (Error|null), response?: google.iam.v1.Policy) => void;

                /**
                 * Callback as used by {@link google.iam.v1.IAMPolicy#getIamPolicy}.
                 * @param error Error, if any
                 * @param [response] Policy
                 */
                type GetIamPolicyCallback = (error: (Error|null), response?: google.iam.v1.Policy) => void;

                /**
                 * Callback as used by {@link google.iam.v1.IAMPolicy#testIamPermissions}.
                 * @param error Error, if any
                 * @param [response] TestIamPermissionsResponse
                 */
                type TestIamPermissionsCallback = (error: (Error|null), response?: google.iam.v1.TestIamPermissionsResponse) => void;
            }

            /** Properties of a SetIamPolicyRequest. */
            interface ISetIamPolicyRequest {

                /** SetIamPolicyRequest resource */
                resource?: (string|null);

                /** SetIamPolicyRequest policy */
                policy?: (google.iam.v1.IPolicy|null);
            }

            /** Represents a SetIamPolicyRequest. */
            class SetIamPolicyRequest implements ISetIamPolicyRequest {

                /**
                 * Constructs a new SetIamPolicyRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.ISetIamPolicyRequest);

                /** SetIamPolicyRequest resource. */
                public resource: string;

                /** SetIamPolicyRequest policy. */
                public policy?: (google.iam.v1.IPolicy|null);

                /**
                 * Creates a new SetIamPolicyRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SetIamPolicyRequest instance
                 */
                public static create(properties?: google.iam.v1.ISetIamPolicyRequest): google.iam.v1.SetIamPolicyRequest;

                /**
                 * Encodes the specified SetIamPolicyRequest message. Does not implicitly {@link google.iam.v1.SetIamPolicyRequest.verify|verify} messages.
                 * @param message SetIamPolicyRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.ISetIamPolicyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SetIamPolicyRequest message, length delimited. Does not implicitly {@link google.iam.v1.SetIamPolicyRequest.verify|verify} messages.
                 * @param message SetIamPolicyRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.ISetIamPolicyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SetIamPolicyRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SetIamPolicyRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.SetIamPolicyRequest;

                /**
                 * Decodes a SetIamPolicyRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SetIamPolicyRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.SetIamPolicyRequest;

                /**
                 * Verifies a SetIamPolicyRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SetIamPolicyRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SetIamPolicyRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.SetIamPolicyRequest;

                /**
                 * Creates a plain object from a SetIamPolicyRequest message. Also converts values to other types if specified.
                 * @param message SetIamPolicyRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.SetIamPolicyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SetIamPolicyRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetIamPolicyRequest. */
            interface IGetIamPolicyRequest {

                /** GetIamPolicyRequest resource */
                resource?: (string|null);

                /** GetIamPolicyRequest options */
                options?: (google.iam.v1.IGetPolicyOptions|null);
            }

            /** Represents a GetIamPolicyRequest. */
            class GetIamPolicyRequest implements IGetIamPolicyRequest {

                /**
                 * Constructs a new GetIamPolicyRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.IGetIamPolicyRequest);

                /** GetIamPolicyRequest resource. */
                public resource: string;

                /** GetIamPolicyRequest options. */
                public options?: (google.iam.v1.IGetPolicyOptions|null);

                /**
                 * Creates a new GetIamPolicyRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetIamPolicyRequest instance
                 */
                public static create(properties?: google.iam.v1.IGetIamPolicyRequest): google.iam.v1.GetIamPolicyRequest;

                /**
                 * Encodes the specified GetIamPolicyRequest message. Does not implicitly {@link google.iam.v1.GetIamPolicyRequest.verify|verify} messages.
                 * @param message GetIamPolicyRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.IGetIamPolicyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetIamPolicyRequest message, length delimited. Does not implicitly {@link google.iam.v1.GetIamPolicyRequest.verify|verify} messages.
                 * @param message GetIamPolicyRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.IGetIamPolicyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetIamPolicyRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetIamPolicyRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.GetIamPolicyRequest;

                /**
                 * Decodes a GetIamPolicyRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetIamPolicyRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.GetIamPolicyRequest;

                /**
                 * Verifies a GetIamPolicyRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetIamPolicyRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetIamPolicyRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.GetIamPolicyRequest;

                /**
                 * Creates a plain object from a GetIamPolicyRequest message. Also converts values to other types if specified.
                 * @param message GetIamPolicyRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.GetIamPolicyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetIamPolicyRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestIamPermissionsRequest. */
            interface ITestIamPermissionsRequest {

                /** TestIamPermissionsRequest resource */
                resource?: (string|null);

                /** TestIamPermissionsRequest permissions */
                permissions?: (string[]|null);
            }

            /** Represents a TestIamPermissionsRequest. */
            class TestIamPermissionsRequest implements ITestIamPermissionsRequest {

                /**
                 * Constructs a new TestIamPermissionsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.ITestIamPermissionsRequest);

                /** TestIamPermissionsRequest resource. */
                public resource: string;

                /** TestIamPermissionsRequest permissions. */
                public permissions: string[];

                /**
                 * Creates a new TestIamPermissionsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestIamPermissionsRequest instance
                 */
                public static create(properties?: google.iam.v1.ITestIamPermissionsRequest): google.iam.v1.TestIamPermissionsRequest;

                /**
                 * Encodes the specified TestIamPermissionsRequest message. Does not implicitly {@link google.iam.v1.TestIamPermissionsRequest.verify|verify} messages.
                 * @param message TestIamPermissionsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.ITestIamPermissionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestIamPermissionsRequest message, length delimited. Does not implicitly {@link google.iam.v1.TestIamPermissionsRequest.verify|verify} messages.
                 * @param message TestIamPermissionsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.ITestIamPermissionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestIamPermissionsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestIamPermissionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.TestIamPermissionsRequest;

                /**
                 * Decodes a TestIamPermissionsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestIamPermissionsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.TestIamPermissionsRequest;

                /**
                 * Verifies a TestIamPermissionsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestIamPermissionsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestIamPermissionsRequest
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.TestIamPermissionsRequest;

                /**
                 * Creates a plain object from a TestIamPermissionsRequest message. Also converts values to other types if specified.
                 * @param message TestIamPermissionsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.TestIamPermissionsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestIamPermissionsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TestIamPermissionsResponse. */
            interface ITestIamPermissionsResponse {

                /** TestIamPermissionsResponse permissions */
                permissions?: (string[]|null);
            }

            /** Represents a TestIamPermissionsResponse. */
            class TestIamPermissionsResponse implements ITestIamPermissionsResponse {

                /**
                 * Constructs a new TestIamPermissionsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.ITestIamPermissionsResponse);

                /** TestIamPermissionsResponse permissions. */
                public permissions: string[];

                /**
                 * Creates a new TestIamPermissionsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TestIamPermissionsResponse instance
                 */
                public static create(properties?: google.iam.v1.ITestIamPermissionsResponse): google.iam.v1.TestIamPermissionsResponse;

                /**
                 * Encodes the specified TestIamPermissionsResponse message. Does not implicitly {@link google.iam.v1.TestIamPermissionsResponse.verify|verify} messages.
                 * @param message TestIamPermissionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.ITestIamPermissionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TestIamPermissionsResponse message, length delimited. Does not implicitly {@link google.iam.v1.TestIamPermissionsResponse.verify|verify} messages.
                 * @param message TestIamPermissionsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.ITestIamPermissionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TestIamPermissionsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TestIamPermissionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.TestIamPermissionsResponse;

                /**
                 * Decodes a TestIamPermissionsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TestIamPermissionsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.TestIamPermissionsResponse;

                /**
                 * Verifies a TestIamPermissionsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TestIamPermissionsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TestIamPermissionsResponse
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.TestIamPermissionsResponse;

                /**
                 * Creates a plain object from a TestIamPermissionsResponse message. Also converts values to other types if specified.
                 * @param message TestIamPermissionsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.TestIamPermissionsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TestIamPermissionsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetPolicyOptions. */
            interface IGetPolicyOptions {

                /** GetPolicyOptions requestedPolicyVersion */
                requestedPolicyVersion?: (number|null);
            }

            /** Represents a GetPolicyOptions. */
            class GetPolicyOptions implements IGetPolicyOptions {

                /**
                 * Constructs a new GetPolicyOptions.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.IGetPolicyOptions);

                /** GetPolicyOptions requestedPolicyVersion. */
                public requestedPolicyVersion: number;

                /**
                 * Creates a new GetPolicyOptions instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetPolicyOptions instance
                 */
                public static create(properties?: google.iam.v1.IGetPolicyOptions): google.iam.v1.GetPolicyOptions;

                /**
                 * Encodes the specified GetPolicyOptions message. Does not implicitly {@link google.iam.v1.GetPolicyOptions.verify|verify} messages.
                 * @param message GetPolicyOptions message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.IGetPolicyOptions, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetPolicyOptions message, length delimited. Does not implicitly {@link google.iam.v1.GetPolicyOptions.verify|verify} messages.
                 * @param message GetPolicyOptions message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.IGetPolicyOptions, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetPolicyOptions message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetPolicyOptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.GetPolicyOptions;

                /**
                 * Decodes a GetPolicyOptions message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetPolicyOptions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.GetPolicyOptions;

                /**
                 * Verifies a GetPolicyOptions message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetPolicyOptions message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetPolicyOptions
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.GetPolicyOptions;

                /**
                 * Creates a plain object from a GetPolicyOptions message. Also converts values to other types if specified.
                 * @param message GetPolicyOptions
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.GetPolicyOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetPolicyOptions to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Policy. */
            interface IPolicy {

                /** Policy version */
                version?: (number|null);

                /** Policy bindings */
                bindings?: (google.iam.v1.IBinding[]|null);

                /** Policy etag */
                etag?: (Uint8Array|null);
            }

            /** Represents a Policy. */
            class Policy implements IPolicy {

                /**
                 * Constructs a new Policy.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.IPolicy);

                /** Policy version. */
                public version: number;

                /** Policy bindings. */
                public bindings: google.iam.v1.IBinding[];

                /** Policy etag. */
                public etag: Uint8Array;

                /**
                 * Creates a new Policy instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Policy instance
                 */
                public static create(properties?: google.iam.v1.IPolicy): google.iam.v1.Policy;

                /**
                 * Encodes the specified Policy message. Does not implicitly {@link google.iam.v1.Policy.verify|verify} messages.
                 * @param message Policy message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.IPolicy, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Policy message, length delimited. Does not implicitly {@link google.iam.v1.Policy.verify|verify} messages.
                 * @param message Policy message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.IPolicy, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Policy message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Policy
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.Policy;

                /**
                 * Decodes a Policy message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Policy
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.Policy;

                /**
                 * Verifies a Policy message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Policy message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Policy
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.Policy;

                /**
                 * Creates a plain object from a Policy message. Also converts values to other types if specified.
                 * @param message Policy
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.Policy, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Policy to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Binding. */
            interface IBinding {

                /** Binding role */
                role?: (string|null);

                /** Binding members */
                members?: (string[]|null);

                /** Binding condition */
                condition?: (google.type.IExpr|null);
            }

            /** Represents a Binding. */
            class Binding implements IBinding {

                /**
                 * Constructs a new Binding.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.IBinding);

                /** Binding role. */
                public role: string;

                /** Binding members. */
                public members: string[];

                /** Binding condition. */
                public condition?: (google.type.IExpr|null);

                /**
                 * Creates a new Binding instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Binding instance
                 */
                public static create(properties?: google.iam.v1.IBinding): google.iam.v1.Binding;

                /**
                 * Encodes the specified Binding message. Does not implicitly {@link google.iam.v1.Binding.verify|verify} messages.
                 * @param message Binding message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.IBinding, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Binding message, length delimited. Does not implicitly {@link google.iam.v1.Binding.verify|verify} messages.
                 * @param message Binding message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.IBinding, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Binding message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Binding
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.Binding;

                /**
                 * Decodes a Binding message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Binding
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.Binding;

                /**
                 * Verifies a Binding message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Binding message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Binding
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.Binding;

                /**
                 * Creates a plain object from a Binding message. Also converts values to other types if specified.
                 * @param message Binding
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.Binding, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Binding to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PolicyDelta. */
            interface IPolicyDelta {

                /** PolicyDelta bindingDeltas */
                bindingDeltas?: (google.iam.v1.IBindingDelta[]|null);

                /** PolicyDelta auditConfigDeltas */
                auditConfigDeltas?: (google.iam.v1.IAuditConfigDelta[]|null);
            }

            /** Represents a PolicyDelta. */
            class PolicyDelta implements IPolicyDelta {

                /**
                 * Constructs a new PolicyDelta.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.IPolicyDelta);

                /** PolicyDelta bindingDeltas. */
                public bindingDeltas: google.iam.v1.IBindingDelta[];

                /** PolicyDelta auditConfigDeltas. */
                public auditConfigDeltas: google.iam.v1.IAuditConfigDelta[];

                /**
                 * Creates a new PolicyDelta instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PolicyDelta instance
                 */
                public static create(properties?: google.iam.v1.IPolicyDelta): google.iam.v1.PolicyDelta;

                /**
                 * Encodes the specified PolicyDelta message. Does not implicitly {@link google.iam.v1.PolicyDelta.verify|verify} messages.
                 * @param message PolicyDelta message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.IPolicyDelta, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PolicyDelta message, length delimited. Does not implicitly {@link google.iam.v1.PolicyDelta.verify|verify} messages.
                 * @param message PolicyDelta message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.IPolicyDelta, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PolicyDelta message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PolicyDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.PolicyDelta;

                /**
                 * Decodes a PolicyDelta message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PolicyDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.PolicyDelta;

                /**
                 * Verifies a PolicyDelta message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PolicyDelta message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PolicyDelta
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.PolicyDelta;

                /**
                 * Creates a plain object from a PolicyDelta message. Also converts values to other types if specified.
                 * @param message PolicyDelta
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.PolicyDelta, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PolicyDelta to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a BindingDelta. */
            interface IBindingDelta {

                /** BindingDelta action */
                action?: (google.iam.v1.BindingDelta.Action|null);

                /** BindingDelta role */
                role?: (string|null);

                /** BindingDelta member */
                member?: (string|null);

                /** BindingDelta condition */
                condition?: (google.type.IExpr|null);
            }

            /** Represents a BindingDelta. */
            class BindingDelta implements IBindingDelta {

                /**
                 * Constructs a new BindingDelta.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.IBindingDelta);

                /** BindingDelta action. */
                public action: google.iam.v1.BindingDelta.Action;

                /** BindingDelta role. */
                public role: string;

                /** BindingDelta member. */
                public member: string;

                /** BindingDelta condition. */
                public condition?: (google.type.IExpr|null);

                /**
                 * Creates a new BindingDelta instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BindingDelta instance
                 */
                public static create(properties?: google.iam.v1.IBindingDelta): google.iam.v1.BindingDelta;

                /**
                 * Encodes the specified BindingDelta message. Does not implicitly {@link google.iam.v1.BindingDelta.verify|verify} messages.
                 * @param message BindingDelta message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.IBindingDelta, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified BindingDelta message, length delimited. Does not implicitly {@link google.iam.v1.BindingDelta.verify|verify} messages.
                 * @param message BindingDelta message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.IBindingDelta, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a BindingDelta message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns BindingDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.BindingDelta;

                /**
                 * Decodes a BindingDelta message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns BindingDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.BindingDelta;

                /**
                 * Verifies a BindingDelta message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a BindingDelta message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns BindingDelta
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.BindingDelta;

                /**
                 * Creates a plain object from a BindingDelta message. Also converts values to other types if specified.
                 * @param message BindingDelta
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.BindingDelta, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this BindingDelta to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace BindingDelta {

                /** Action enum. */
                enum Action {
                    ACTION_UNSPECIFIED = 0,
                    ADD = 1,
                    REMOVE = 2
                }
            }

            /** Properties of an AuditConfigDelta. */
            interface IAuditConfigDelta {

                /** AuditConfigDelta action */
                action?: (google.iam.v1.AuditConfigDelta.Action|null);

                /** AuditConfigDelta service */
                service?: (string|null);

                /** AuditConfigDelta exemptedMember */
                exemptedMember?: (string|null);

                /** AuditConfigDelta logType */
                logType?: (string|null);
            }

            /** Represents an AuditConfigDelta. */
            class AuditConfigDelta implements IAuditConfigDelta {

                /**
                 * Constructs a new AuditConfigDelta.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.iam.v1.IAuditConfigDelta);

                /** AuditConfigDelta action. */
                public action: google.iam.v1.AuditConfigDelta.Action;

                /** AuditConfigDelta service. */
                public service: string;

                /** AuditConfigDelta exemptedMember. */
                public exemptedMember: string;

                /** AuditConfigDelta logType. */
                public logType: string;

                /**
                 * Creates a new AuditConfigDelta instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AuditConfigDelta instance
                 */
                public static create(properties?: google.iam.v1.IAuditConfigDelta): google.iam.v1.AuditConfigDelta;

                /**
                 * Encodes the specified AuditConfigDelta message. Does not implicitly {@link google.iam.v1.AuditConfigDelta.verify|verify} messages.
                 * @param message AuditConfigDelta message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.iam.v1.IAuditConfigDelta, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AuditConfigDelta message, length delimited. Does not implicitly {@link google.iam.v1.AuditConfigDelta.verify|verify} messages.
                 * @param message AuditConfigDelta message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.iam.v1.IAuditConfigDelta, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AuditConfigDelta message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AuditConfigDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.iam.v1.AuditConfigDelta;

                /**
                 * Decodes an AuditConfigDelta message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AuditConfigDelta
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.iam.v1.AuditConfigDelta;

                /**
                 * Verifies an AuditConfigDelta message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AuditConfigDelta message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AuditConfigDelta
                 */
                public static fromObject(object: { [k: string]: any }): google.iam.v1.AuditConfigDelta;

                /**
                 * Creates a plain object from an AuditConfigDelta message. Also converts values to other types if specified.
                 * @param message AuditConfigDelta
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.iam.v1.AuditConfigDelta, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AuditConfigDelta to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace AuditConfigDelta {

                /** Action enum. */
                enum Action {
                    ACTION_UNSPECIFIED = 0,
                    ADD = 1,
                    REMOVE = 2
                }
            }
        }
    }

    /** Namespace type. */
    namespace type {

        /** Properties of an Expr. */
        interface IExpr {

            /** Expr expression */
            expression?: (string|null);

            /** Expr title */
            title?: (string|null);

            /** Expr description */
            description?: (string|null);

            /** Expr location */
            location?: (string|null);
        }

        /** Represents an Expr. */
        class Expr implements IExpr {

            /**
             * Constructs a new Expr.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.type.IExpr);

            /** Expr expression. */
            public expression: string;

            /** Expr title. */
            public title: string;

            /** Expr description. */
            public description: string;

            /** Expr location. */
            public location: string;

            /**
             * Creates a new Expr instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Expr instance
             */
            public static create(properties?: google.type.IExpr): google.type.Expr;

            /**
             * Encodes the specified Expr message. Does not implicitly {@link google.type.Expr.verify|verify} messages.
             * @param message Expr message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.type.IExpr, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Expr message, length delimited. Does not implicitly {@link google.type.Expr.verify|verify} messages.
             * @param message Expr message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.type.IExpr, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Expr message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Expr
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.type.Expr;

            /**
             * Decodes an Expr message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Expr
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.type.Expr;

            /**
             * Verifies an Expr message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Expr message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Expr
             */
            public static fromObject(object: { [k: string]: any }): google.type.Expr;

            /**
             * Creates a plain object from an Expr message. Also converts values to other types if specified.
             * @param message Expr
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.type.Expr, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Expr to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Namespace longrunning. */
    namespace longrunning {

        /** Represents an Operations */
        class Operations extends $protobuf.rpc.Service {

            /**
             * Constructs a new Operations service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Creates new Operations service using the specified rpc implementation.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             * @returns RPC service. Useful where requests and/or responses are streamed.
             */
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Operations;

            /**
             * Calls ListOperations.
             * @param request ListOperationsRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and ListOperationsResponse
             */
            public listOperations(request: google.longrunning.IListOperationsRequest, callback: google.longrunning.Operations.ListOperationsCallback): void;

            /**
             * Calls ListOperations.
             * @param request ListOperationsRequest message or plain object
             * @returns Promise
             */
            public listOperations(request: google.longrunning.IListOperationsRequest): Promise<google.longrunning.ListOperationsResponse>;

            /**
             * Calls GetOperation.
             * @param request GetOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Operation
             */
            public getOperation(request: google.longrunning.IGetOperationRequest, callback: google.longrunning.Operations.GetOperationCallback): void;

            /**
             * Calls GetOperation.
             * @param request GetOperationRequest message or plain object
             * @returns Promise
             */
            public getOperation(request: google.longrunning.IGetOperationRequest): Promise<google.longrunning.Operation>;

            /**
             * Calls DeleteOperation.
             * @param request DeleteOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Empty
             */
            public deleteOperation(request: google.longrunning.IDeleteOperationRequest, callback: google.longrunning.Operations.DeleteOperationCallback): void;

            /**
             * Calls DeleteOperation.
             * @param request DeleteOperationRequest message or plain object
             * @returns Promise
             */
            public deleteOperation(request: google.longrunning.IDeleteOperationRequest): Promise<google.protobuf.Empty>;

            /**
             * Calls CancelOperation.
             * @param request CancelOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Empty
             */
            public cancelOperation(request: google.longrunning.ICancelOperationRequest, callback: google.longrunning.Operations.CancelOperationCallback): void;

            /**
             * Calls CancelOperation.
             * @param request CancelOperationRequest message or plain object
             * @returns Promise
             */
            public cancelOperation(request: google.longrunning.ICancelOperationRequest): Promise<google.protobuf.Empty>;

            /**
             * Calls WaitOperation.
             * @param request WaitOperationRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Operation
             */
            public waitOperation(request: google.longrunning.IWaitOperationRequest, callback: google.longrunning.Operations.WaitOperationCallback): void;

            /**
             * Calls WaitOperation.
             * @param request WaitOperationRequest message or plain object
             * @returns Promise
             */
            public waitOperation(request: google.longrunning.IWaitOperationRequest): Promise<google.longrunning.Operation>;
        }

        namespace Operations {

            /**
             * Callback as used by {@link google.longrunning.Operations#listOperations}.
             * @param error Error, if any
             * @param [response] ListOperationsResponse
             */
            type ListOperationsCallback = (error: (Error|null), response?: google.longrunning.ListOperationsResponse) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#getOperation}.
             * @param error Error, if any
             * @param [response] Operation
             */
            type GetOperationCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#deleteOperation}.
             * @param error Error, if any
             * @param [response] Empty
             */
            type DeleteOperationCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#cancelOperation}.
             * @param error Error, if any
             * @param [response] Empty
             */
            type CancelOperationCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

            /**
             * Callback as used by {@link google.longrunning.Operations#waitOperation}.
             * @param error Error, if any
             * @param [response] Operation
             */
            type WaitOperationCallback = (error: (Error|null), response?: google.longrunning.Operation) => void;
        }

        /** Properties of an Operation. */
        interface IOperation {

            /** Operation name */
            name?: (string|null);

            /** Operation metadata */
            metadata?: (google.protobuf.IAny|null);

            /** Operation done */
            done?: (boolean|null);

            /** Operation error */
            error?: (google.rpc.IStatus|null);

            /** Operation response */
            response?: (google.protobuf.IAny|null);
        }

        /** Represents an Operation. */
        class Operation implements IOperation {

            /**
             * Constructs a new Operation.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IOperation);

            /** Operation name. */
            public name: string;

            /** Operation metadata. */
            public metadata?: (google.protobuf.IAny|null);

            /** Operation done. */
            public done: boolean;

            /** Operation error. */
            public error?: (google.rpc.IStatus|null);

            /** Operation response. */
            public response?: (google.protobuf.IAny|null);

            /** Operation result. */
            public result?: ("error"|"response");

            /**
             * Creates a new Operation instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Operation instance
             */
            public static create(properties?: google.longrunning.IOperation): google.longrunning.Operation;

            /**
             * Encodes the specified Operation message. Does not implicitly {@link google.longrunning.Operation.verify|verify} messages.
             * @param message Operation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Operation message, length delimited. Does not implicitly {@link google.longrunning.Operation.verify|verify} messages.
             * @param message Operation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IOperation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Operation message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Operation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.Operation;

            /**
             * Decodes an Operation message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Operation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.Operation;

            /**
             * Verifies an Operation message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Operation message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Operation
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.Operation;

            /**
             * Creates a plain object from an Operation message. Also converts values to other types if specified.
             * @param message Operation
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.Operation, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Operation to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetOperationRequest. */
        interface IGetOperationRequest {

            /** GetOperationRequest name */
            name?: (string|null);
        }

        /** Represents a GetOperationRequest. */
        class GetOperationRequest implements IGetOperationRequest {

            /**
             * Constructs a new GetOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IGetOperationRequest);

            /** GetOperationRequest name. */
            public name: string;

            /**
             * Creates a new GetOperationRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetOperationRequest instance
             */
            public static create(properties?: google.longrunning.IGetOperationRequest): google.longrunning.GetOperationRequest;

            /**
             * Encodes the specified GetOperationRequest message. Does not implicitly {@link google.longrunning.GetOperationRequest.verify|verify} messages.
             * @param message GetOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IGetOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetOperationRequest message, length delimited. Does not implicitly {@link google.longrunning.GetOperationRequest.verify|verify} messages.
             * @param message GetOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IGetOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetOperationRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.GetOperationRequest;

            /**
             * Decodes a GetOperationRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.GetOperationRequest;

            /**
             * Verifies a GetOperationRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetOperationRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetOperationRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.GetOperationRequest;

            /**
             * Creates a plain object from a GetOperationRequest message. Also converts values to other types if specified.
             * @param message GetOperationRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.GetOperationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetOperationRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ListOperationsRequest. */
        interface IListOperationsRequest {

            /** ListOperationsRequest name */
            name?: (string|null);

            /** ListOperationsRequest filter */
            filter?: (string|null);

            /** ListOperationsRequest pageSize */
            pageSize?: (number|null);

            /** ListOperationsRequest pageToken */
            pageToken?: (string|null);
        }

        /** Represents a ListOperationsRequest. */
        class ListOperationsRequest implements IListOperationsRequest {

            /**
             * Constructs a new ListOperationsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IListOperationsRequest);

            /** ListOperationsRequest name. */
            public name: string;

            /** ListOperationsRequest filter. */
            public filter: string;

            /** ListOperationsRequest pageSize. */
            public pageSize: number;

            /** ListOperationsRequest pageToken. */
            public pageToken: string;

            /**
             * Creates a new ListOperationsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ListOperationsRequest instance
             */
            public static create(properties?: google.longrunning.IListOperationsRequest): google.longrunning.ListOperationsRequest;

            /**
             * Encodes the specified ListOperationsRequest message. Does not implicitly {@link google.longrunning.ListOperationsRequest.verify|verify} messages.
             * @param message ListOperationsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IListOperationsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ListOperationsRequest message, length delimited. Does not implicitly {@link google.longrunning.ListOperationsRequest.verify|verify} messages.
             * @param message ListOperationsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IListOperationsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ListOperationsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ListOperationsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.ListOperationsRequest;

            /**
             * Decodes a ListOperationsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ListOperationsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.ListOperationsRequest;

            /**
             * Verifies a ListOperationsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ListOperationsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ListOperationsRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.ListOperationsRequest;

            /**
             * Creates a plain object from a ListOperationsRequest message. Also converts values to other types if specified.
             * @param message ListOperationsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.ListOperationsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ListOperationsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ListOperationsResponse. */
        interface IListOperationsResponse {

            /** ListOperationsResponse operations */
            operations?: (google.longrunning.IOperation[]|null);

            /** ListOperationsResponse nextPageToken */
            nextPageToken?: (string|null);
        }

        /** Represents a ListOperationsResponse. */
        class ListOperationsResponse implements IListOperationsResponse {

            /**
             * Constructs a new ListOperationsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IListOperationsResponse);

            /** ListOperationsResponse operations. */
            public operations: google.longrunning.IOperation[];

            /** ListOperationsResponse nextPageToken. */
            public nextPageToken: string;

            /**
             * Creates a new ListOperationsResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ListOperationsResponse instance
             */
            public static create(properties?: google.longrunning.IListOperationsResponse): google.longrunning.ListOperationsResponse;

            /**
             * Encodes the specified ListOperationsResponse message. Does not implicitly {@link google.longrunning.ListOperationsResponse.verify|verify} messages.
             * @param message ListOperationsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IListOperationsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ListOperationsResponse message, length delimited. Does not implicitly {@link google.longrunning.ListOperationsResponse.verify|verify} messages.
             * @param message ListOperationsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IListOperationsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ListOperationsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ListOperationsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.ListOperationsResponse;

            /**
             * Decodes a ListOperationsResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ListOperationsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.ListOperationsResponse;

            /**
             * Verifies a ListOperationsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ListOperationsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ListOperationsResponse
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.ListOperationsResponse;

            /**
             * Creates a plain object from a ListOperationsResponse message. Also converts values to other types if specified.
             * @param message ListOperationsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.ListOperationsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ListOperationsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CancelOperationRequest. */
        interface ICancelOperationRequest {

            /** CancelOperationRequest name */
            name?: (string|null);
        }

        /** Represents a CancelOperationRequest. */
        class CancelOperationRequest implements ICancelOperationRequest {

            /**
             * Constructs a new CancelOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.ICancelOperationRequest);

            /** CancelOperationRequest name. */
            public name: string;

            /**
             * Creates a new CancelOperationRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CancelOperationRequest instance
             */
            public static create(properties?: google.longrunning.ICancelOperationRequest): google.longrunning.CancelOperationRequest;

            /**
             * Encodes the specified CancelOperationRequest message. Does not implicitly {@link google.longrunning.CancelOperationRequest.verify|verify} messages.
             * @param message CancelOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.ICancelOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CancelOperationRequest message, length delimited. Does not implicitly {@link google.longrunning.CancelOperationRequest.verify|verify} messages.
             * @param message CancelOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.ICancelOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CancelOperationRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CancelOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.CancelOperationRequest;

            /**
             * Decodes a CancelOperationRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CancelOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.CancelOperationRequest;

            /**
             * Verifies a CancelOperationRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CancelOperationRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CancelOperationRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.CancelOperationRequest;

            /**
             * Creates a plain object from a CancelOperationRequest message. Also converts values to other types if specified.
             * @param message CancelOperationRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.CancelOperationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CancelOperationRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DeleteOperationRequest. */
        interface IDeleteOperationRequest {

            /** DeleteOperationRequest name */
            name?: (string|null);
        }

        /** Represents a DeleteOperationRequest. */
        class DeleteOperationRequest implements IDeleteOperationRequest {

            /**
             * Constructs a new DeleteOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IDeleteOperationRequest);

            /** DeleteOperationRequest name. */
            public name: string;

            /**
             * Creates a new DeleteOperationRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeleteOperationRequest instance
             */
            public static create(properties?: google.longrunning.IDeleteOperationRequest): google.longrunning.DeleteOperationRequest;

            /**
             * Encodes the specified DeleteOperationRequest message. Does not implicitly {@link google.longrunning.DeleteOperationRequest.verify|verify} messages.
             * @param message DeleteOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IDeleteOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeleteOperationRequest message, length delimited. Does not implicitly {@link google.longrunning.DeleteOperationRequest.verify|verify} messages.
             * @param message DeleteOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IDeleteOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeleteOperationRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeleteOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.DeleteOperationRequest;

            /**
             * Decodes a DeleteOperationRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeleteOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.DeleteOperationRequest;

            /**
             * Verifies a DeleteOperationRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeleteOperationRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeleteOperationRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.DeleteOperationRequest;

            /**
             * Creates a plain object from a DeleteOperationRequest message. Also converts values to other types if specified.
             * @param message DeleteOperationRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.DeleteOperationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeleteOperationRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a WaitOperationRequest. */
        interface IWaitOperationRequest {

            /** WaitOperationRequest name */
            name?: (string|null);

            /** WaitOperationRequest timeout */
            timeout?: (google.protobuf.IDuration|null);
        }

        /** Represents a WaitOperationRequest. */
        class WaitOperationRequest implements IWaitOperationRequest {

            /**
             * Constructs a new WaitOperationRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IWaitOperationRequest);

            /** WaitOperationRequest name. */
            public name: string;

            /** WaitOperationRequest timeout. */
            public timeout?: (google.protobuf.IDuration|null);

            /**
             * Creates a new WaitOperationRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns WaitOperationRequest instance
             */
            public static create(properties?: google.longrunning.IWaitOperationRequest): google.longrunning.WaitOperationRequest;

            /**
             * Encodes the specified WaitOperationRequest message. Does not implicitly {@link google.longrunning.WaitOperationRequest.verify|verify} messages.
             * @param message WaitOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IWaitOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified WaitOperationRequest message, length delimited. Does not implicitly {@link google.longrunning.WaitOperationRequest.verify|verify} messages.
             * @param message WaitOperationRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IWaitOperationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a WaitOperationRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns WaitOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.WaitOperationRequest;

            /**
             * Decodes a WaitOperationRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns WaitOperationRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.WaitOperationRequest;

            /**
             * Verifies a WaitOperationRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a WaitOperationRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns WaitOperationRequest
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.WaitOperationRequest;

            /**
             * Creates a plain object from a WaitOperationRequest message. Also converts values to other types if specified.
             * @param message WaitOperationRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.WaitOperationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this WaitOperationRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an OperationInfo. */
        interface IOperationInfo {

            /** OperationInfo responseType */
            responseType?: (string|null);

            /** OperationInfo metadataType */
            metadataType?: (string|null);
        }

        /** Represents an OperationInfo. */
        class OperationInfo implements IOperationInfo {

            /**
             * Constructs a new OperationInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.longrunning.IOperationInfo);

            /** OperationInfo responseType. */
            public responseType: string;

            /** OperationInfo metadataType. */
            public metadataType: string;

            /**
             * Creates a new OperationInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OperationInfo instance
             */
            public static create(properties?: google.longrunning.IOperationInfo): google.longrunning.OperationInfo;

            /**
             * Encodes the specified OperationInfo message. Does not implicitly {@link google.longrunning.OperationInfo.verify|verify} messages.
             * @param message OperationInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.longrunning.IOperationInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OperationInfo message, length delimited. Does not implicitly {@link google.longrunning.OperationInfo.verify|verify} messages.
             * @param message OperationInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.longrunning.IOperationInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OperationInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OperationInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.longrunning.OperationInfo;

            /**
             * Decodes an OperationInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OperationInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.longrunning.OperationInfo;

            /**
             * Verifies an OperationInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OperationInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OperationInfo
             */
            public static fromObject(object: { [k: string]: any }): google.longrunning.OperationInfo;

            /**
             * Creates a plain object from an OperationInfo message. Also converts values to other types if specified.
             * @param message OperationInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.longrunning.OperationInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OperationInfo to JSON.
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
