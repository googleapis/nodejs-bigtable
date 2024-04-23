/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.grpc = (function() {

    /**
     * Namespace grpc.
     * @exports grpc
     * @namespace
     */
    var grpc = {};

    grpc.gcp = (function() {

        /**
         * Namespace gcp.
         * @memberof grpc
         * @namespace
         */
        var gcp = {};

        gcp.ApiConfig = (function() {

            /**
             * Properties of an ApiConfig.
             * @memberof grpc.gcp
             * @interface IApiConfig
             * @property {grpc.gcp.IChannelPoolConfig|null} [channelPool] ApiConfig channelPool
             * @property {Array.<grpc.gcp.IMethodConfig>|null} [method] ApiConfig method
             */

            /**
             * Constructs a new ApiConfig.
             * @memberof grpc.gcp
             * @classdesc Represents an ApiConfig.
             * @implements IApiConfig
             * @constructor
             * @param {grpc.gcp.IApiConfig=} [properties] Properties to set
             */
            function ApiConfig(properties) {
                this.method = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ApiConfig channelPool.
             * @member {grpc.gcp.IChannelPoolConfig|null|undefined} channelPool
             * @memberof grpc.gcp.ApiConfig
             * @instance
             */
            ApiConfig.prototype.channelPool = null;

            /**
             * ApiConfig method.
             * @member {Array.<grpc.gcp.IMethodConfig>} method
             * @memberof grpc.gcp.ApiConfig
             * @instance
             */
            ApiConfig.prototype.method = $util.emptyArray;

            /**
             * Creates a new ApiConfig instance using the specified properties.
             * @function create
             * @memberof grpc.gcp.ApiConfig
             * @static
             * @param {grpc.gcp.IApiConfig=} [properties] Properties to set
             * @returns {grpc.gcp.ApiConfig} ApiConfig instance
             */
            ApiConfig.create = function create(properties) {
                return new ApiConfig(properties);
            };

            /**
             * Encodes the specified ApiConfig message. Does not implicitly {@link grpc.gcp.ApiConfig.verify|verify} messages.
             * @function encode
             * @memberof grpc.gcp.ApiConfig
             * @static
             * @param {grpc.gcp.IApiConfig} message ApiConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ApiConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.channelPool != null && Object.hasOwnProperty.call(message, "channelPool"))
                    $root.grpc.gcp.ChannelPoolConfig.encode(message.channelPool, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.method != null && message.method.length)
                    for (var i = 0; i < message.method.length; ++i)
                        $root.grpc.gcp.MethodConfig.encode(message.method[i], writer.uint32(/* id 1001, wireType 2 =*/8010).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ApiConfig message, length delimited. Does not implicitly {@link grpc.gcp.ApiConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof grpc.gcp.ApiConfig
             * @static
             * @param {grpc.gcp.IApiConfig} message ApiConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ApiConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ApiConfig message from the specified reader or buffer.
             * @function decode
             * @memberof grpc.gcp.ApiConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {grpc.gcp.ApiConfig} ApiConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ApiConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.grpc.gcp.ApiConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.channelPool = $root.grpc.gcp.ChannelPoolConfig.decode(reader, reader.uint32());
                        break;
                    case 1001:
                        if (!(message.method && message.method.length))
                            message.method = [];
                        message.method.push($root.grpc.gcp.MethodConfig.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ApiConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof grpc.gcp.ApiConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {grpc.gcp.ApiConfig} ApiConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ApiConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ApiConfig message.
             * @function verify
             * @memberof grpc.gcp.ApiConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ApiConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.channelPool != null && message.hasOwnProperty("channelPool")) {
                    var error = $root.grpc.gcp.ChannelPoolConfig.verify(message.channelPool);
                    if (error)
                        return "channelPool." + error;
                }
                if (message.method != null && message.hasOwnProperty("method")) {
                    if (!Array.isArray(message.method))
                        return "method: array expected";
                    for (var i = 0; i < message.method.length; ++i) {
                        var error = $root.grpc.gcp.MethodConfig.verify(message.method[i]);
                        if (error)
                            return "method." + error;
                    }
                }
                return null;
            };

            /**
             * Creates an ApiConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof grpc.gcp.ApiConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {grpc.gcp.ApiConfig} ApiConfig
             */
            ApiConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.grpc.gcp.ApiConfig)
                    return object;
                var message = new $root.grpc.gcp.ApiConfig();
                if (object.channelPool != null) {
                    if (typeof object.channelPool !== "object")
                        throw TypeError(".grpc.gcp.ApiConfig.channelPool: object expected");
                    message.channelPool = $root.grpc.gcp.ChannelPoolConfig.fromObject(object.channelPool);
                }
                if (object.method) {
                    if (!Array.isArray(object.method))
                        throw TypeError(".grpc.gcp.ApiConfig.method: array expected");
                    message.method = [];
                    for (var i = 0; i < object.method.length; ++i) {
                        if (typeof object.method[i] !== "object")
                            throw TypeError(".grpc.gcp.ApiConfig.method: object expected");
                        message.method[i] = $root.grpc.gcp.MethodConfig.fromObject(object.method[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from an ApiConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof grpc.gcp.ApiConfig
             * @static
             * @param {grpc.gcp.ApiConfig} message ApiConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ApiConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.method = [];
                if (options.defaults)
                    object.channelPool = null;
                if (message.channelPool != null && message.hasOwnProperty("channelPool"))
                    object.channelPool = $root.grpc.gcp.ChannelPoolConfig.toObject(message.channelPool, options);
                if (message.method && message.method.length) {
                    object.method = [];
                    for (var j = 0; j < message.method.length; ++j)
                        object.method[j] = $root.grpc.gcp.MethodConfig.toObject(message.method[j], options);
                }
                return object;
            };

            /**
             * Converts this ApiConfig to JSON.
             * @function toJSON
             * @memberof grpc.gcp.ApiConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ApiConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ApiConfig;
        })();

        gcp.ChannelPoolConfig = (function() {

            /**
             * Properties of a ChannelPoolConfig.
             * @memberof grpc.gcp
             * @interface IChannelPoolConfig
             * @property {number|null} [maxSize] ChannelPoolConfig maxSize
             * @property {number|null} [minSize] ChannelPoolConfig minSize
             * @property {number|Long|null} [idleTimeout] ChannelPoolConfig idleTimeout
             * @property {number|null} [maxConcurrentStreamsLowWatermark] ChannelPoolConfig maxConcurrentStreamsLowWatermark
             * @property {number|null} [debugHeaderIntervalSecs] ChannelPoolConfig debugHeaderIntervalSecs
             */

            /**
             * Constructs a new ChannelPoolConfig.
             * @memberof grpc.gcp
             * @classdesc Represents a ChannelPoolConfig.
             * @implements IChannelPoolConfig
             * @constructor
             * @param {grpc.gcp.IChannelPoolConfig=} [properties] Properties to set
             */
            function ChannelPoolConfig(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChannelPoolConfig maxSize.
             * @member {number} maxSize
             * @memberof grpc.gcp.ChannelPoolConfig
             * @instance
             */
            ChannelPoolConfig.prototype.maxSize = 0;

            /**
             * ChannelPoolConfig minSize.
             * @member {number} minSize
             * @memberof grpc.gcp.ChannelPoolConfig
             * @instance
             */
            ChannelPoolConfig.prototype.minSize = 0;

            /**
             * ChannelPoolConfig idleTimeout.
             * @member {number|Long} idleTimeout
             * @memberof grpc.gcp.ChannelPoolConfig
             * @instance
             */
            ChannelPoolConfig.prototype.idleTimeout = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * ChannelPoolConfig maxConcurrentStreamsLowWatermark.
             * @member {number} maxConcurrentStreamsLowWatermark
             * @memberof grpc.gcp.ChannelPoolConfig
             * @instance
             */
            ChannelPoolConfig.prototype.maxConcurrentStreamsLowWatermark = 0;

            /**
             * ChannelPoolConfig debugHeaderIntervalSecs.
             * @member {number} debugHeaderIntervalSecs
             * @memberof grpc.gcp.ChannelPoolConfig
             * @instance
             */
            ChannelPoolConfig.prototype.debugHeaderIntervalSecs = 0;

            /**
             * Creates a new ChannelPoolConfig instance using the specified properties.
             * @function create
             * @memberof grpc.gcp.ChannelPoolConfig
             * @static
             * @param {grpc.gcp.IChannelPoolConfig=} [properties] Properties to set
             * @returns {grpc.gcp.ChannelPoolConfig} ChannelPoolConfig instance
             */
            ChannelPoolConfig.create = function create(properties) {
                return new ChannelPoolConfig(properties);
            };

            /**
             * Encodes the specified ChannelPoolConfig message. Does not implicitly {@link grpc.gcp.ChannelPoolConfig.verify|verify} messages.
             * @function encode
             * @memberof grpc.gcp.ChannelPoolConfig
             * @static
             * @param {grpc.gcp.IChannelPoolConfig} message ChannelPoolConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChannelPoolConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.maxSize != null && Object.hasOwnProperty.call(message, "maxSize"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.maxSize);
                if (message.idleTimeout != null && Object.hasOwnProperty.call(message, "idleTimeout"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.idleTimeout);
                if (message.maxConcurrentStreamsLowWatermark != null && Object.hasOwnProperty.call(message, "maxConcurrentStreamsLowWatermark"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.maxConcurrentStreamsLowWatermark);
                if (message.minSize != null && Object.hasOwnProperty.call(message, "minSize"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.minSize);
                if (message.debugHeaderIntervalSecs != null && Object.hasOwnProperty.call(message, "debugHeaderIntervalSecs"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.debugHeaderIntervalSecs);
                return writer;
            };

            /**
             * Encodes the specified ChannelPoolConfig message, length delimited. Does not implicitly {@link grpc.gcp.ChannelPoolConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof grpc.gcp.ChannelPoolConfig
             * @static
             * @param {grpc.gcp.IChannelPoolConfig} message ChannelPoolConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChannelPoolConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChannelPoolConfig message from the specified reader or buffer.
             * @function decode
             * @memberof grpc.gcp.ChannelPoolConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {grpc.gcp.ChannelPoolConfig} ChannelPoolConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChannelPoolConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.grpc.gcp.ChannelPoolConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.maxSize = reader.uint32();
                        break;
                    case 4:
                        message.minSize = reader.uint32();
                        break;
                    case 2:
                        message.idleTimeout = reader.uint64();
                        break;
                    case 3:
                        message.maxConcurrentStreamsLowWatermark = reader.uint32();
                        break;
                    case 5:
                        message.debugHeaderIntervalSecs = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ChannelPoolConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof grpc.gcp.ChannelPoolConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {grpc.gcp.ChannelPoolConfig} ChannelPoolConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChannelPoolConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChannelPoolConfig message.
             * @function verify
             * @memberof grpc.gcp.ChannelPoolConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChannelPoolConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.maxSize != null && message.hasOwnProperty("maxSize"))
                    if (!$util.isInteger(message.maxSize))
                        return "maxSize: integer expected";
                if (message.minSize != null && message.hasOwnProperty("minSize"))
                    if (!$util.isInteger(message.minSize))
                        return "minSize: integer expected";
                if (message.idleTimeout != null && message.hasOwnProperty("idleTimeout"))
                    if (!$util.isInteger(message.idleTimeout) && !(message.idleTimeout && $util.isInteger(message.idleTimeout.low) && $util.isInteger(message.idleTimeout.high)))
                        return "idleTimeout: integer|Long expected";
                if (message.maxConcurrentStreamsLowWatermark != null && message.hasOwnProperty("maxConcurrentStreamsLowWatermark"))
                    if (!$util.isInteger(message.maxConcurrentStreamsLowWatermark))
                        return "maxConcurrentStreamsLowWatermark: integer expected";
                if (message.debugHeaderIntervalSecs != null && message.hasOwnProperty("debugHeaderIntervalSecs"))
                    if (!$util.isInteger(message.debugHeaderIntervalSecs))
                        return "debugHeaderIntervalSecs: integer expected";
                return null;
            };

            /**
             * Creates a ChannelPoolConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof grpc.gcp.ChannelPoolConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {grpc.gcp.ChannelPoolConfig} ChannelPoolConfig
             */
            ChannelPoolConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.grpc.gcp.ChannelPoolConfig)
                    return object;
                var message = new $root.grpc.gcp.ChannelPoolConfig();
                if (object.maxSize != null)
                    message.maxSize = object.maxSize >>> 0;
                if (object.minSize != null)
                    message.minSize = object.minSize >>> 0;
                if (object.idleTimeout != null)
                    if ($util.Long)
                        (message.idleTimeout = $util.Long.fromValue(object.idleTimeout)).unsigned = true;
                    else if (typeof object.idleTimeout === "string")
                        message.idleTimeout = parseInt(object.idleTimeout, 10);
                    else if (typeof object.idleTimeout === "number")
                        message.idleTimeout = object.idleTimeout;
                    else if (typeof object.idleTimeout === "object")
                        message.idleTimeout = new $util.LongBits(object.idleTimeout.low >>> 0, object.idleTimeout.high >>> 0).toNumber(true);
                if (object.maxConcurrentStreamsLowWatermark != null)
                    message.maxConcurrentStreamsLowWatermark = object.maxConcurrentStreamsLowWatermark >>> 0;
                if (object.debugHeaderIntervalSecs != null)
                    message.debugHeaderIntervalSecs = object.debugHeaderIntervalSecs >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a ChannelPoolConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof grpc.gcp.ChannelPoolConfig
             * @static
             * @param {grpc.gcp.ChannelPoolConfig} message ChannelPoolConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChannelPoolConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.maxSize = 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.idleTimeout = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.idleTimeout = options.longs === String ? "0" : 0;
                    object.maxConcurrentStreamsLowWatermark = 0;
                    object.minSize = 0;
                    object.debugHeaderIntervalSecs = 0;
                }
                if (message.maxSize != null && message.hasOwnProperty("maxSize"))
                    object.maxSize = message.maxSize;
                if (message.idleTimeout != null && message.hasOwnProperty("idleTimeout"))
                    if (typeof message.idleTimeout === "number")
                        object.idleTimeout = options.longs === String ? String(message.idleTimeout) : message.idleTimeout;
                    else
                        object.idleTimeout = options.longs === String ? $util.Long.prototype.toString.call(message.idleTimeout) : options.longs === Number ? new $util.LongBits(message.idleTimeout.low >>> 0, message.idleTimeout.high >>> 0).toNumber(true) : message.idleTimeout;
                if (message.maxConcurrentStreamsLowWatermark != null && message.hasOwnProperty("maxConcurrentStreamsLowWatermark"))
                    object.maxConcurrentStreamsLowWatermark = message.maxConcurrentStreamsLowWatermark;
                if (message.minSize != null && message.hasOwnProperty("minSize"))
                    object.minSize = message.minSize;
                if (message.debugHeaderIntervalSecs != null && message.hasOwnProperty("debugHeaderIntervalSecs"))
                    object.debugHeaderIntervalSecs = message.debugHeaderIntervalSecs;
                return object;
            };

            /**
             * Converts this ChannelPoolConfig to JSON.
             * @function toJSON
             * @memberof grpc.gcp.ChannelPoolConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChannelPoolConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ChannelPoolConfig;
        })();

        gcp.MethodConfig = (function() {

            /**
             * Properties of a MethodConfig.
             * @memberof grpc.gcp
             * @interface IMethodConfig
             * @property {Array.<string>|null} [name] MethodConfig name
             * @property {grpc.gcp.IAffinityConfig|null} [affinity] MethodConfig affinity
             */

            /**
             * Constructs a new MethodConfig.
             * @memberof grpc.gcp
             * @classdesc Represents a MethodConfig.
             * @implements IMethodConfig
             * @constructor
             * @param {grpc.gcp.IMethodConfig=} [properties] Properties to set
             */
            function MethodConfig(properties) {
                this.name = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MethodConfig name.
             * @member {Array.<string>} name
             * @memberof grpc.gcp.MethodConfig
             * @instance
             */
            MethodConfig.prototype.name = $util.emptyArray;

            /**
             * MethodConfig affinity.
             * @member {grpc.gcp.IAffinityConfig|null|undefined} affinity
             * @memberof grpc.gcp.MethodConfig
             * @instance
             */
            MethodConfig.prototype.affinity = null;

            /**
             * Creates a new MethodConfig instance using the specified properties.
             * @function create
             * @memberof grpc.gcp.MethodConfig
             * @static
             * @param {grpc.gcp.IMethodConfig=} [properties] Properties to set
             * @returns {grpc.gcp.MethodConfig} MethodConfig instance
             */
            MethodConfig.create = function create(properties) {
                return new MethodConfig(properties);
            };

            /**
             * Encodes the specified MethodConfig message. Does not implicitly {@link grpc.gcp.MethodConfig.verify|verify} messages.
             * @function encode
             * @memberof grpc.gcp.MethodConfig
             * @static
             * @param {grpc.gcp.IMethodConfig} message MethodConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.name.length)
                    for (var i = 0; i < message.name.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name[i]);
                if (message.affinity != null && Object.hasOwnProperty.call(message, "affinity"))
                    $root.grpc.gcp.AffinityConfig.encode(message.affinity, writer.uint32(/* id 1001, wireType 2 =*/8010).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MethodConfig message, length delimited. Does not implicitly {@link grpc.gcp.MethodConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof grpc.gcp.MethodConfig
             * @static
             * @param {grpc.gcp.IMethodConfig} message MethodConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MethodConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MethodConfig message from the specified reader or buffer.
             * @function decode
             * @memberof grpc.gcp.MethodConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {grpc.gcp.MethodConfig} MethodConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MethodConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.grpc.gcp.MethodConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.name && message.name.length))
                            message.name = [];
                        message.name.push(reader.string());
                        break;
                    case 1001:
                        message.affinity = $root.grpc.gcp.AffinityConfig.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MethodConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof grpc.gcp.MethodConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {grpc.gcp.MethodConfig} MethodConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MethodConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MethodConfig message.
             * @function verify
             * @memberof grpc.gcp.MethodConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MethodConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name")) {
                    if (!Array.isArray(message.name))
                        return "name: array expected";
                    for (var i = 0; i < message.name.length; ++i)
                        if (!$util.isString(message.name[i]))
                            return "name: string[] expected";
                }
                if (message.affinity != null && message.hasOwnProperty("affinity")) {
                    var error = $root.grpc.gcp.AffinityConfig.verify(message.affinity);
                    if (error)
                        return "affinity." + error;
                }
                return null;
            };

            /**
             * Creates a MethodConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof grpc.gcp.MethodConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {grpc.gcp.MethodConfig} MethodConfig
             */
            MethodConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.grpc.gcp.MethodConfig)
                    return object;
                var message = new $root.grpc.gcp.MethodConfig();
                if (object.name) {
                    if (!Array.isArray(object.name))
                        throw TypeError(".grpc.gcp.MethodConfig.name: array expected");
                    message.name = [];
                    for (var i = 0; i < object.name.length; ++i)
                        message.name[i] = String(object.name[i]);
                }
                if (object.affinity != null) {
                    if (typeof object.affinity !== "object")
                        throw TypeError(".grpc.gcp.MethodConfig.affinity: object expected");
                    message.affinity = $root.grpc.gcp.AffinityConfig.fromObject(object.affinity);
                }
                return message;
            };

            /**
             * Creates a plain object from a MethodConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof grpc.gcp.MethodConfig
             * @static
             * @param {grpc.gcp.MethodConfig} message MethodConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MethodConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.name = [];
                if (options.defaults)
                    object.affinity = null;
                if (message.name && message.name.length) {
                    object.name = [];
                    for (var j = 0; j < message.name.length; ++j)
                        object.name[j] = message.name[j];
                }
                if (message.affinity != null && message.hasOwnProperty("affinity"))
                    object.affinity = $root.grpc.gcp.AffinityConfig.toObject(message.affinity, options);
                return object;
            };

            /**
             * Converts this MethodConfig to JSON.
             * @function toJSON
             * @memberof grpc.gcp.MethodConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MethodConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MethodConfig;
        })();

        gcp.AffinityConfig = (function() {

            /**
             * Properties of an AffinityConfig.
             * @memberof grpc.gcp
             * @interface IAffinityConfig
             * @property {grpc.gcp.AffinityConfig.Command|null} [command] AffinityConfig command
             * @property {string|null} [affinityKey] AffinityConfig affinityKey
             */

            /**
             * Constructs a new AffinityConfig.
             * @memberof grpc.gcp
             * @classdesc Represents an AffinityConfig.
             * @implements IAffinityConfig
             * @constructor
             * @param {grpc.gcp.IAffinityConfig=} [properties] Properties to set
             */
            function AffinityConfig(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AffinityConfig command.
             * @member {grpc.gcp.AffinityConfig.Command} command
             * @memberof grpc.gcp.AffinityConfig
             * @instance
             */
            AffinityConfig.prototype.command = 0;

            /**
             * AffinityConfig affinityKey.
             * @member {string} affinityKey
             * @memberof grpc.gcp.AffinityConfig
             * @instance
             */
            AffinityConfig.prototype.affinityKey = "";

            /**
             * Creates a new AffinityConfig instance using the specified properties.
             * @function create
             * @memberof grpc.gcp.AffinityConfig
             * @static
             * @param {grpc.gcp.IAffinityConfig=} [properties] Properties to set
             * @returns {grpc.gcp.AffinityConfig} AffinityConfig instance
             */
            AffinityConfig.create = function create(properties) {
                return new AffinityConfig(properties);
            };

            /**
             * Encodes the specified AffinityConfig message. Does not implicitly {@link grpc.gcp.AffinityConfig.verify|verify} messages.
             * @function encode
             * @memberof grpc.gcp.AffinityConfig
             * @static
             * @param {grpc.gcp.IAffinityConfig} message AffinityConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AffinityConfig.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.command);
                if (message.affinityKey != null && Object.hasOwnProperty.call(message, "affinityKey"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.affinityKey);
                return writer;
            };

            /**
             * Encodes the specified AffinityConfig message, length delimited. Does not implicitly {@link grpc.gcp.AffinityConfig.verify|verify} messages.
             * @function encodeDelimited
             * @memberof grpc.gcp.AffinityConfig
             * @static
             * @param {grpc.gcp.IAffinityConfig} message AffinityConfig message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AffinityConfig.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AffinityConfig message from the specified reader or buffer.
             * @function decode
             * @memberof grpc.gcp.AffinityConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {grpc.gcp.AffinityConfig} AffinityConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AffinityConfig.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.grpc.gcp.AffinityConfig();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.command = reader.int32();
                        break;
                    case 3:
                        message.affinityKey = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AffinityConfig message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof grpc.gcp.AffinityConfig
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {grpc.gcp.AffinityConfig} AffinityConfig
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AffinityConfig.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AffinityConfig message.
             * @function verify
             * @memberof grpc.gcp.AffinityConfig
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AffinityConfig.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.command != null && message.hasOwnProperty("command"))
                    switch (message.command) {
                    default:
                        return "command: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.affinityKey != null && message.hasOwnProperty("affinityKey"))
                    if (!$util.isString(message.affinityKey))
                        return "affinityKey: string expected";
                return null;
            };

            /**
             * Creates an AffinityConfig message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof grpc.gcp.AffinityConfig
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {grpc.gcp.AffinityConfig} AffinityConfig
             */
            AffinityConfig.fromObject = function fromObject(object) {
                if (object instanceof $root.grpc.gcp.AffinityConfig)
                    return object;
                var message = new $root.grpc.gcp.AffinityConfig();
                switch (object.command) {
                case "BOUND":
                case 0:
                    message.command = 0;
                    break;
                case "BIND":
                case 1:
                    message.command = 1;
                    break;
                case "UNBIND":
                case 2:
                    message.command = 2;
                    break;
                }
                if (object.affinityKey != null)
                    message.affinityKey = String(object.affinityKey);
                return message;
            };

            /**
             * Creates a plain object from an AffinityConfig message. Also converts values to other types if specified.
             * @function toObject
             * @memberof grpc.gcp.AffinityConfig
             * @static
             * @param {grpc.gcp.AffinityConfig} message AffinityConfig
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AffinityConfig.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.command = options.enums === String ? "BOUND" : 0;
                    object.affinityKey = "";
                }
                if (message.command != null && message.hasOwnProperty("command"))
                    object.command = options.enums === String ? $root.grpc.gcp.AffinityConfig.Command[message.command] : message.command;
                if (message.affinityKey != null && message.hasOwnProperty("affinityKey"))
                    object.affinityKey = message.affinityKey;
                return object;
            };

            /**
             * Converts this AffinityConfig to JSON.
             * @function toJSON
             * @memberof grpc.gcp.AffinityConfig
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AffinityConfig.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Command enum.
             * @name grpc.gcp.AffinityConfig.Command
             * @enum {number}
             * @property {number} BOUND=0 BOUND value
             * @property {number} BIND=1 BIND value
             * @property {number} UNBIND=2 UNBIND value
             */
            AffinityConfig.Command = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "BOUND"] = 0;
                values[valuesById[1] = "BIND"] = 1;
                values[valuesById[2] = "UNBIND"] = 2;
                return values;
            })();

            return AffinityConfig;
        })();

        return gcp;
    })();

    return grpc;
})();

module.exports = $root;
