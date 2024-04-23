import * as $protobuf from "protobufjs";
/** Namespace grpc. */
export namespace grpc {

    /** Namespace gcp. */
    namespace gcp {

        /** Properties of an ApiConfig. */
        interface IApiConfig {

            /** ApiConfig channelPool */
            channelPool?: (grpc.gcp.IChannelPoolConfig|null);

            /** ApiConfig method */
            method?: (grpc.gcp.IMethodConfig[]|null);
        }

        /** Represents an ApiConfig. */
        class ApiConfig implements IApiConfig {

            /**
             * Constructs a new ApiConfig.
             * @param [properties] Properties to set
             */
            constructor(properties?: grpc.gcp.IApiConfig);

            /** ApiConfig channelPool. */
            public channelPool?: (grpc.gcp.IChannelPoolConfig|null);

            /** ApiConfig method. */
            public method: grpc.gcp.IMethodConfig[];

            /**
             * Creates a new ApiConfig instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ApiConfig instance
             */
            public static create(properties?: grpc.gcp.IApiConfig): grpc.gcp.ApiConfig;

            /**
             * Encodes the specified ApiConfig message. Does not implicitly {@link grpc.gcp.ApiConfig.verify|verify} messages.
             * @param message ApiConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: grpc.gcp.IApiConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ApiConfig message, length delimited. Does not implicitly {@link grpc.gcp.ApiConfig.verify|verify} messages.
             * @param message ApiConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: grpc.gcp.IApiConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ApiConfig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ApiConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): grpc.gcp.ApiConfig;

            /**
             * Decodes an ApiConfig message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ApiConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): grpc.gcp.ApiConfig;

            /**
             * Verifies an ApiConfig message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ApiConfig message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ApiConfig
             */
            public static fromObject(object: { [k: string]: any }): grpc.gcp.ApiConfig;

            /**
             * Creates a plain object from an ApiConfig message. Also converts values to other types if specified.
             * @param message ApiConfig
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: grpc.gcp.ApiConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ApiConfig to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ChannelPoolConfig. */
        interface IChannelPoolConfig {

            /** ChannelPoolConfig maxSize */
            maxSize?: (number|null);

            /** ChannelPoolConfig minSize */
            minSize?: (number|null);

            /** ChannelPoolConfig idleTimeout */
            idleTimeout?: (number|Long|null);

            /** ChannelPoolConfig maxConcurrentStreamsLowWatermark */
            maxConcurrentStreamsLowWatermark?: (number|null);

            /** ChannelPoolConfig debugHeaderIntervalSecs */
            debugHeaderIntervalSecs?: (number|null);
        }

        /** Represents a ChannelPoolConfig. */
        class ChannelPoolConfig implements IChannelPoolConfig {

            /**
             * Constructs a new ChannelPoolConfig.
             * @param [properties] Properties to set
             */
            constructor(properties?: grpc.gcp.IChannelPoolConfig);

            /** ChannelPoolConfig maxSize. */
            public maxSize: number;

            /** ChannelPoolConfig minSize. */
            public minSize: number;

            /** ChannelPoolConfig idleTimeout. */
            public idleTimeout: (number|Long);

            /** ChannelPoolConfig maxConcurrentStreamsLowWatermark. */
            public maxConcurrentStreamsLowWatermark: number;

            /** ChannelPoolConfig debugHeaderIntervalSecs. */
            public debugHeaderIntervalSecs: number;

            /**
             * Creates a new ChannelPoolConfig instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChannelPoolConfig instance
             */
            public static create(properties?: grpc.gcp.IChannelPoolConfig): grpc.gcp.ChannelPoolConfig;

            /**
             * Encodes the specified ChannelPoolConfig message. Does not implicitly {@link grpc.gcp.ChannelPoolConfig.verify|verify} messages.
             * @param message ChannelPoolConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: grpc.gcp.IChannelPoolConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChannelPoolConfig message, length delimited. Does not implicitly {@link grpc.gcp.ChannelPoolConfig.verify|verify} messages.
             * @param message ChannelPoolConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: grpc.gcp.IChannelPoolConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChannelPoolConfig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChannelPoolConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): grpc.gcp.ChannelPoolConfig;

            /**
             * Decodes a ChannelPoolConfig message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChannelPoolConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): grpc.gcp.ChannelPoolConfig;

            /**
             * Verifies a ChannelPoolConfig message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChannelPoolConfig message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChannelPoolConfig
             */
            public static fromObject(object: { [k: string]: any }): grpc.gcp.ChannelPoolConfig;

            /**
             * Creates a plain object from a ChannelPoolConfig message. Also converts values to other types if specified.
             * @param message ChannelPoolConfig
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: grpc.gcp.ChannelPoolConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChannelPoolConfig to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodConfig. */
        interface IMethodConfig {

            /** MethodConfig name */
            name?: (string[]|null);

            /** MethodConfig affinity */
            affinity?: (grpc.gcp.IAffinityConfig|null);
        }

        /** Represents a MethodConfig. */
        class MethodConfig implements IMethodConfig {

            /**
             * Constructs a new MethodConfig.
             * @param [properties] Properties to set
             */
            constructor(properties?: grpc.gcp.IMethodConfig);

            /** MethodConfig name. */
            public name: string[];

            /** MethodConfig affinity. */
            public affinity?: (grpc.gcp.IAffinityConfig|null);

            /**
             * Creates a new MethodConfig instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MethodConfig instance
             */
            public static create(properties?: grpc.gcp.IMethodConfig): grpc.gcp.MethodConfig;

            /**
             * Encodes the specified MethodConfig message. Does not implicitly {@link grpc.gcp.MethodConfig.verify|verify} messages.
             * @param message MethodConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: grpc.gcp.IMethodConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodConfig message, length delimited. Does not implicitly {@link grpc.gcp.MethodConfig.verify|verify} messages.
             * @param message MethodConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: grpc.gcp.IMethodConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodConfig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): grpc.gcp.MethodConfig;

            /**
             * Decodes a MethodConfig message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): grpc.gcp.MethodConfig;

            /**
             * Verifies a MethodConfig message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodConfig message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodConfig
             */
            public static fromObject(object: { [k: string]: any }): grpc.gcp.MethodConfig;

            /**
             * Creates a plain object from a MethodConfig message. Also converts values to other types if specified.
             * @param message MethodConfig
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: grpc.gcp.MethodConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodConfig to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AffinityConfig. */
        interface IAffinityConfig {

            /** AffinityConfig command */
            command?: (grpc.gcp.AffinityConfig.Command|null);

            /** AffinityConfig affinityKey */
            affinityKey?: (string|null);
        }

        /** Represents an AffinityConfig. */
        class AffinityConfig implements IAffinityConfig {

            /**
             * Constructs a new AffinityConfig.
             * @param [properties] Properties to set
             */
            constructor(properties?: grpc.gcp.IAffinityConfig);

            /** AffinityConfig command. */
            public command: grpc.gcp.AffinityConfig.Command;

            /** AffinityConfig affinityKey. */
            public affinityKey: string;

            /**
             * Creates a new AffinityConfig instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AffinityConfig instance
             */
            public static create(properties?: grpc.gcp.IAffinityConfig): grpc.gcp.AffinityConfig;

            /**
             * Encodes the specified AffinityConfig message. Does not implicitly {@link grpc.gcp.AffinityConfig.verify|verify} messages.
             * @param message AffinityConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: grpc.gcp.IAffinityConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AffinityConfig message, length delimited. Does not implicitly {@link grpc.gcp.AffinityConfig.verify|verify} messages.
             * @param message AffinityConfig message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: grpc.gcp.IAffinityConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AffinityConfig message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AffinityConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): grpc.gcp.AffinityConfig;

            /**
             * Decodes an AffinityConfig message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AffinityConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): grpc.gcp.AffinityConfig;

            /**
             * Verifies an AffinityConfig message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AffinityConfig message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AffinityConfig
             */
            public static fromObject(object: { [k: string]: any }): grpc.gcp.AffinityConfig;

            /**
             * Creates a plain object from an AffinityConfig message. Also converts values to other types if specified.
             * @param message AffinityConfig
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: grpc.gcp.AffinityConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AffinityConfig to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace AffinityConfig {

            /** Command enum. */
            enum Command {
                BOUND = 0,
                BIND = 1,
                UNBIND = 2
            }
        }
    }
}
