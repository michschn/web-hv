/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const com = $root.com = (() => {

    /**
     * Namespace com.
     * @exports com
     * @namespace
     */
    const com = {};

    com.android = (function() {

        /**
         * Namespace android.
         * @memberof com
         * @namespace
         */
        const android = {};

        android.app = (function() {

            /**
             * Namespace app.
             * @memberof com.android
             * @namespace
             */
            const app = {};

            app.motiontool = (function() {

                /**
                 * Namespace motiontool.
                 * @memberof com.android.app
                 * @namespace
                 */
                const motiontool = {};

                motiontool.proto = (function() {

                    /**
                     * Namespace proto.
                     * @memberof com.android.app.motiontool
                     * @namespace
                     */
                    const proto = {};

                    proto.MotionToolsRequest = (function() {

                        /**
                         * Properties of a MotionToolsRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IMotionToolsRequest
                         * @property {com.android.app.motiontool.proto.IHandshakeRequest|null} [handshake] MotionToolsRequest handshake
                         * @property {com.android.app.motiontool.proto.IBeginTraceRequest|null} [beginTrace] MotionToolsRequest beginTrace
                         * @property {com.android.app.motiontool.proto.IEndTraceRequest|null} [endTrace] MotionToolsRequest endTrace
                         * @property {com.android.app.motiontool.proto.IPollTraceRequest|null} [pollTrace] MotionToolsRequest pollTrace
                         */

                        /**
                         * Constructs a new MotionToolsRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a MotionToolsRequest.
                         * @implements IMotionToolsRequest
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IMotionToolsRequest=} [properties] Properties to set
                         */
                        function MotionToolsRequest(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * MotionToolsRequest handshake.
                         * @member {com.android.app.motiontool.proto.IHandshakeRequest|null|undefined} handshake
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @instance
                         */
                        MotionToolsRequest.prototype.handshake = null;

                        /**
                         * MotionToolsRequest beginTrace.
                         * @member {com.android.app.motiontool.proto.IBeginTraceRequest|null|undefined} beginTrace
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @instance
                         */
                        MotionToolsRequest.prototype.beginTrace = null;

                        /**
                         * MotionToolsRequest endTrace.
                         * @member {com.android.app.motiontool.proto.IEndTraceRequest|null|undefined} endTrace
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @instance
                         */
                        MotionToolsRequest.prototype.endTrace = null;

                        /**
                         * MotionToolsRequest pollTrace.
                         * @member {com.android.app.motiontool.proto.IPollTraceRequest|null|undefined} pollTrace
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @instance
                         */
                        MotionToolsRequest.prototype.pollTrace = null;

                        // OneOf field names bound to virtual getters and setters
                        let $oneOfFields;

                        /**
                         * MotionToolsRequest type.
                         * @member {"handshake"|"beginTrace"|"endTrace"|"pollTrace"|undefined} type
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @instance
                         */
                        Object.defineProperty(MotionToolsRequest.prototype, "type", {
                            get: $util.oneOfGetter($oneOfFields = ["handshake", "beginTrace", "endTrace", "pollTrace"]),
                            set: $util.oneOfSetter($oneOfFields)
                        });

                        /**
                         * Creates a new MotionToolsRequest instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IMotionToolsRequest=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.MotionToolsRequest} MotionToolsRequest instance
                         */
                        MotionToolsRequest.create = function create(properties) {
                            return new MotionToolsRequest(properties);
                        };

                        /**
                         * Encodes the specified MotionToolsRequest message. Does not implicitly {@link com.android.app.motiontool.proto.MotionToolsRequest.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IMotionToolsRequest} message MotionToolsRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        MotionToolsRequest.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.handshake != null && Object.hasOwnProperty.call(message, "handshake"))
                                $root.com.android.app.motiontool.proto.HandshakeRequest.encode(message.handshake, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.beginTrace != null && Object.hasOwnProperty.call(message, "beginTrace"))
                                $root.com.android.app.motiontool.proto.BeginTraceRequest.encode(message.beginTrace, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                            if (message.endTrace != null && Object.hasOwnProperty.call(message, "endTrace"))
                                $root.com.android.app.motiontool.proto.EndTraceRequest.encode(message.endTrace, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                            if (message.pollTrace != null && Object.hasOwnProperty.call(message, "pollTrace"))
                                $root.com.android.app.motiontool.proto.PollTraceRequest.encode(message.pollTrace, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified MotionToolsRequest message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.MotionToolsRequest.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IMotionToolsRequest} message MotionToolsRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        MotionToolsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a MotionToolsRequest message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.MotionToolsRequest} MotionToolsRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        MotionToolsRequest.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.MotionToolsRequest();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.handshake = $root.com.android.app.motiontool.proto.HandshakeRequest.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 2: {
                                        message.beginTrace = $root.com.android.app.motiontool.proto.BeginTraceRequest.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 3: {
                                        message.endTrace = $root.com.android.app.motiontool.proto.EndTraceRequest.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 4: {
                                        message.pollTrace = $root.com.android.app.motiontool.proto.PollTraceRequest.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a MotionToolsRequest message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.MotionToolsRequest} MotionToolsRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        MotionToolsRequest.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a MotionToolsRequest message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        MotionToolsRequest.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            let properties = {};
                            if (message.handshake != null && message.hasOwnProperty("handshake")) {
                                properties.type = 1;
                                {
                                    let error = $root.com.android.app.motiontool.proto.HandshakeRequest.verify(message.handshake);
                                    if (error)
                                        return "handshake." + error;
                                }
                            }
                            if (message.beginTrace != null && message.hasOwnProperty("beginTrace")) {
                                if (properties.type === 1)
                                    return "type: multiple values";
                                properties.type = 1;
                                {
                                    let error = $root.com.android.app.motiontool.proto.BeginTraceRequest.verify(message.beginTrace);
                                    if (error)
                                        return "beginTrace." + error;
                                }
                            }
                            if (message.endTrace != null && message.hasOwnProperty("endTrace")) {
                                if (properties.type === 1)
                                    return "type: multiple values";
                                properties.type = 1;
                                {
                                    let error = $root.com.android.app.motiontool.proto.EndTraceRequest.verify(message.endTrace);
                                    if (error)
                                        return "endTrace." + error;
                                }
                            }
                            if (message.pollTrace != null && message.hasOwnProperty("pollTrace")) {
                                if (properties.type === 1)
                                    return "type: multiple values";
                                properties.type = 1;
                                {
                                    let error = $root.com.android.app.motiontool.proto.PollTraceRequest.verify(message.pollTrace);
                                    if (error)
                                        return "pollTrace." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a MotionToolsRequest message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.MotionToolsRequest} MotionToolsRequest
                         */
                        MotionToolsRequest.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.MotionToolsRequest)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.MotionToolsRequest();
                            if (object.handshake != null) {
                                if (typeof object.handshake !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.MotionToolsRequest.handshake: object expected");
                                message.handshake = $root.com.android.app.motiontool.proto.HandshakeRequest.fromObject(object.handshake);
                            }
                            if (object.beginTrace != null) {
                                if (typeof object.beginTrace !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.MotionToolsRequest.beginTrace: object expected");
                                message.beginTrace = $root.com.android.app.motiontool.proto.BeginTraceRequest.fromObject(object.beginTrace);
                            }
                            if (object.endTrace != null) {
                                if (typeof object.endTrace !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.MotionToolsRequest.endTrace: object expected");
                                message.endTrace = $root.com.android.app.motiontool.proto.EndTraceRequest.fromObject(object.endTrace);
                            }
                            if (object.pollTrace != null) {
                                if (typeof object.pollTrace !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.MotionToolsRequest.pollTrace: object expected");
                                message.pollTrace = $root.com.android.app.motiontool.proto.PollTraceRequest.fromObject(object.pollTrace);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a MotionToolsRequest message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.MotionToolsRequest} message MotionToolsRequest
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        MotionToolsRequest.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (message.handshake != null && message.hasOwnProperty("handshake")) {
                                object.handshake = $root.com.android.app.motiontool.proto.HandshakeRequest.toObject(message.handshake, options);
                                if (options.oneofs)
                                    object.type = "handshake";
                            }
                            if (message.beginTrace != null && message.hasOwnProperty("beginTrace")) {
                                object.beginTrace = $root.com.android.app.motiontool.proto.BeginTraceRequest.toObject(message.beginTrace, options);
                                if (options.oneofs)
                                    object.type = "beginTrace";
                            }
                            if (message.endTrace != null && message.hasOwnProperty("endTrace")) {
                                object.endTrace = $root.com.android.app.motiontool.proto.EndTraceRequest.toObject(message.endTrace, options);
                                if (options.oneofs)
                                    object.type = "endTrace";
                            }
                            if (message.pollTrace != null && message.hasOwnProperty("pollTrace")) {
                                object.pollTrace = $root.com.android.app.motiontool.proto.PollTraceRequest.toObject(message.pollTrace, options);
                                if (options.oneofs)
                                    object.type = "pollTrace";
                            }
                            return object;
                        };

                        /**
                         * Converts this MotionToolsRequest to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        MotionToolsRequest.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for MotionToolsRequest
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.MotionToolsRequest
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        MotionToolsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.MotionToolsRequest";
                        };

                        return MotionToolsRequest;
                    })();

                    proto.MotionToolsResponse = (function() {

                        /**
                         * Properties of a MotionToolsResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IMotionToolsResponse
                         * @property {com.android.app.motiontool.proto.IErrorResponse|null} [error] MotionToolsResponse error
                         * @property {com.android.app.motiontool.proto.IHandshakeResponse|null} [handshake] MotionToolsResponse handshake
                         * @property {com.android.app.motiontool.proto.IBeginTraceResponse|null} [beginTrace] MotionToolsResponse beginTrace
                         * @property {com.android.app.motiontool.proto.IEndTraceResponse|null} [endTrace] MotionToolsResponse endTrace
                         * @property {com.android.app.motiontool.proto.IPollTraceResponse|null} [pollTrace] MotionToolsResponse pollTrace
                         */

                        /**
                         * Constructs a new MotionToolsResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a MotionToolsResponse.
                         * @implements IMotionToolsResponse
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IMotionToolsResponse=} [properties] Properties to set
                         */
                        function MotionToolsResponse(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * MotionToolsResponse error.
                         * @member {com.android.app.motiontool.proto.IErrorResponse|null|undefined} error
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @instance
                         */
                        MotionToolsResponse.prototype.error = null;

                        /**
                         * MotionToolsResponse handshake.
                         * @member {com.android.app.motiontool.proto.IHandshakeResponse|null|undefined} handshake
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @instance
                         */
                        MotionToolsResponse.prototype.handshake = null;

                        /**
                         * MotionToolsResponse beginTrace.
                         * @member {com.android.app.motiontool.proto.IBeginTraceResponse|null|undefined} beginTrace
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @instance
                         */
                        MotionToolsResponse.prototype.beginTrace = null;

                        /**
                         * MotionToolsResponse endTrace.
                         * @member {com.android.app.motiontool.proto.IEndTraceResponse|null|undefined} endTrace
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @instance
                         */
                        MotionToolsResponse.prototype.endTrace = null;

                        /**
                         * MotionToolsResponse pollTrace.
                         * @member {com.android.app.motiontool.proto.IPollTraceResponse|null|undefined} pollTrace
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @instance
                         */
                        MotionToolsResponse.prototype.pollTrace = null;

                        // OneOf field names bound to virtual getters and setters
                        let $oneOfFields;

                        /**
                         * MotionToolsResponse type.
                         * @member {"error"|"handshake"|"beginTrace"|"endTrace"|"pollTrace"|undefined} type
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @instance
                         */
                        Object.defineProperty(MotionToolsResponse.prototype, "type", {
                            get: $util.oneOfGetter($oneOfFields = ["error", "handshake", "beginTrace", "endTrace", "pollTrace"]),
                            set: $util.oneOfSetter($oneOfFields)
                        });

                        /**
                         * Creates a new MotionToolsResponse instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IMotionToolsResponse=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.MotionToolsResponse} MotionToolsResponse instance
                         */
                        MotionToolsResponse.create = function create(properties) {
                            return new MotionToolsResponse(properties);
                        };

                        /**
                         * Encodes the specified MotionToolsResponse message. Does not implicitly {@link com.android.app.motiontool.proto.MotionToolsResponse.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IMotionToolsResponse} message MotionToolsResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        MotionToolsResponse.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                                $root.com.android.app.motiontool.proto.ErrorResponse.encode(message.error, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.handshake != null && Object.hasOwnProperty.call(message, "handshake"))
                                $root.com.android.app.motiontool.proto.HandshakeResponse.encode(message.handshake, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                            if (message.beginTrace != null && Object.hasOwnProperty.call(message, "beginTrace"))
                                $root.com.android.app.motiontool.proto.BeginTraceResponse.encode(message.beginTrace, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                            if (message.endTrace != null && Object.hasOwnProperty.call(message, "endTrace"))
                                $root.com.android.app.motiontool.proto.EndTraceResponse.encode(message.endTrace, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                            if (message.pollTrace != null && Object.hasOwnProperty.call(message, "pollTrace"))
                                $root.com.android.app.motiontool.proto.PollTraceResponse.encode(message.pollTrace, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified MotionToolsResponse message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.MotionToolsResponse.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IMotionToolsResponse} message MotionToolsResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        MotionToolsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a MotionToolsResponse message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.MotionToolsResponse} MotionToolsResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        MotionToolsResponse.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.MotionToolsResponse();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.error = $root.com.android.app.motiontool.proto.ErrorResponse.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 2: {
                                        message.handshake = $root.com.android.app.motiontool.proto.HandshakeResponse.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 3: {
                                        message.beginTrace = $root.com.android.app.motiontool.proto.BeginTraceResponse.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 4: {
                                        message.endTrace = $root.com.android.app.motiontool.proto.EndTraceResponse.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 5: {
                                        message.pollTrace = $root.com.android.app.motiontool.proto.PollTraceResponse.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a MotionToolsResponse message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.MotionToolsResponse} MotionToolsResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        MotionToolsResponse.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a MotionToolsResponse message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        MotionToolsResponse.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            let properties = {};
                            if (message.error != null && message.hasOwnProperty("error")) {
                                properties.type = 1;
                                {
                                    let error = $root.com.android.app.motiontool.proto.ErrorResponse.verify(message.error);
                                    if (error)
                                        return "error." + error;
                                }
                            }
                            if (message.handshake != null && message.hasOwnProperty("handshake")) {
                                if (properties.type === 1)
                                    return "type: multiple values";
                                properties.type = 1;
                                {
                                    let error = $root.com.android.app.motiontool.proto.HandshakeResponse.verify(message.handshake);
                                    if (error)
                                        return "handshake." + error;
                                }
                            }
                            if (message.beginTrace != null && message.hasOwnProperty("beginTrace")) {
                                if (properties.type === 1)
                                    return "type: multiple values";
                                properties.type = 1;
                                {
                                    let error = $root.com.android.app.motiontool.proto.BeginTraceResponse.verify(message.beginTrace);
                                    if (error)
                                        return "beginTrace." + error;
                                }
                            }
                            if (message.endTrace != null && message.hasOwnProperty("endTrace")) {
                                if (properties.type === 1)
                                    return "type: multiple values";
                                properties.type = 1;
                                {
                                    let error = $root.com.android.app.motiontool.proto.EndTraceResponse.verify(message.endTrace);
                                    if (error)
                                        return "endTrace." + error;
                                }
                            }
                            if (message.pollTrace != null && message.hasOwnProperty("pollTrace")) {
                                if (properties.type === 1)
                                    return "type: multiple values";
                                properties.type = 1;
                                {
                                    let error = $root.com.android.app.motiontool.proto.PollTraceResponse.verify(message.pollTrace);
                                    if (error)
                                        return "pollTrace." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a MotionToolsResponse message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.MotionToolsResponse} MotionToolsResponse
                         */
                        MotionToolsResponse.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.MotionToolsResponse)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.MotionToolsResponse();
                            if (object.error != null) {
                                if (typeof object.error !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.MotionToolsResponse.error: object expected");
                                message.error = $root.com.android.app.motiontool.proto.ErrorResponse.fromObject(object.error);
                            }
                            if (object.handshake != null) {
                                if (typeof object.handshake !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.MotionToolsResponse.handshake: object expected");
                                message.handshake = $root.com.android.app.motiontool.proto.HandshakeResponse.fromObject(object.handshake);
                            }
                            if (object.beginTrace != null) {
                                if (typeof object.beginTrace !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.MotionToolsResponse.beginTrace: object expected");
                                message.beginTrace = $root.com.android.app.motiontool.proto.BeginTraceResponse.fromObject(object.beginTrace);
                            }
                            if (object.endTrace != null) {
                                if (typeof object.endTrace !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.MotionToolsResponse.endTrace: object expected");
                                message.endTrace = $root.com.android.app.motiontool.proto.EndTraceResponse.fromObject(object.endTrace);
                            }
                            if (object.pollTrace != null) {
                                if (typeof object.pollTrace !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.MotionToolsResponse.pollTrace: object expected");
                                message.pollTrace = $root.com.android.app.motiontool.proto.PollTraceResponse.fromObject(object.pollTrace);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a MotionToolsResponse message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.MotionToolsResponse} message MotionToolsResponse
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        MotionToolsResponse.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (message.error != null && message.hasOwnProperty("error")) {
                                object.error = $root.com.android.app.motiontool.proto.ErrorResponse.toObject(message.error, options);
                                if (options.oneofs)
                                    object.type = "error";
                            }
                            if (message.handshake != null && message.hasOwnProperty("handshake")) {
                                object.handshake = $root.com.android.app.motiontool.proto.HandshakeResponse.toObject(message.handshake, options);
                                if (options.oneofs)
                                    object.type = "handshake";
                            }
                            if (message.beginTrace != null && message.hasOwnProperty("beginTrace")) {
                                object.beginTrace = $root.com.android.app.motiontool.proto.BeginTraceResponse.toObject(message.beginTrace, options);
                                if (options.oneofs)
                                    object.type = "beginTrace";
                            }
                            if (message.endTrace != null && message.hasOwnProperty("endTrace")) {
                                object.endTrace = $root.com.android.app.motiontool.proto.EndTraceResponse.toObject(message.endTrace, options);
                                if (options.oneofs)
                                    object.type = "endTrace";
                            }
                            if (message.pollTrace != null && message.hasOwnProperty("pollTrace")) {
                                object.pollTrace = $root.com.android.app.motiontool.proto.PollTraceResponse.toObject(message.pollTrace, options);
                                if (options.oneofs)
                                    object.type = "pollTrace";
                            }
                            return object;
                        };

                        /**
                         * Converts this MotionToolsResponse to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        MotionToolsResponse.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for MotionToolsResponse
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.MotionToolsResponse
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        MotionToolsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.MotionToolsResponse";
                        };

                        return MotionToolsResponse;
                    })();

                    proto.ErrorResponse = (function() {

                        /**
                         * Properties of an ErrorResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IErrorResponse
                         * @property {com.android.app.motiontool.proto.ErrorResponse.Code|null} [code] ErrorResponse code
                         * @property {string|null} [message] ErrorResponse message
                         */

                        /**
                         * Constructs a new ErrorResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents an ErrorResponse.
                         * @implements IErrorResponse
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IErrorResponse=} [properties] Properties to set
                         */
                        function ErrorResponse(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * ErrorResponse code.
                         * @member {com.android.app.motiontool.proto.ErrorResponse.Code} code
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @instance
                         */
                        ErrorResponse.prototype.code = 0;

                        /**
                         * ErrorResponse message.
                         * @member {string} message
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @instance
                         */
                        ErrorResponse.prototype.message = "";

                        /**
                         * Creates a new ErrorResponse instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IErrorResponse=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.ErrorResponse} ErrorResponse instance
                         */
                        ErrorResponse.create = function create(properties) {
                            return new ErrorResponse(properties);
                        };

                        /**
                         * Encodes the specified ErrorResponse message. Does not implicitly {@link com.android.app.motiontool.proto.ErrorResponse.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IErrorResponse} message ErrorResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ErrorResponse.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                            return writer;
                        };

                        /**
                         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.ErrorResponse.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IErrorResponse} message ErrorResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ErrorResponse.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes an ErrorResponse message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.ErrorResponse} ErrorResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ErrorResponse.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.ErrorResponse();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.code = reader.int32();
                                        break;
                                    }
                                case 2: {
                                        message.message = reader.string();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.ErrorResponse} ErrorResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ErrorResponse.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an ErrorResponse message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ErrorResponse.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.code != null && message.hasOwnProperty("code"))
                                switch (message.code) {
                                default:
                                    return "code: enum value expected";
                                case 0:
                                case 1:
                                case 2:
                                    break;
                                }
                            if (message.message != null && message.hasOwnProperty("message"))
                                if (!$util.isString(message.message))
                                    return "message: string expected";
                            return null;
                        };

                        /**
                         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.ErrorResponse} ErrorResponse
                         */
                        ErrorResponse.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.ErrorResponse)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.ErrorResponse();
                            switch (object.code) {
                            default:
                                if (typeof object.code === "number") {
                                    message.code = object.code;
                                    break;
                                }
                                break;
                            case "UNKNOWN":
                            case 0:
                                message.code = 0;
                                break;
                            case "INVALID_REQUEST":
                            case 1:
                                message.code = 1;
                                break;
                            case "UNKNOWN_TRACE_ID":
                            case 2:
                                message.code = 2;
                                break;
                            }
                            if (object.message != null)
                                message.message = String(object.message);
                            return message;
                        };

                        /**
                         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.ErrorResponse} message ErrorResponse
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ErrorResponse.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.code = options.enums === String ? "UNKNOWN" : 0;
                                object.message = "";
                            }
                            if (message.code != null && message.hasOwnProperty("code"))
                                object.code = options.enums === String ? $root.com.android.app.motiontool.proto.ErrorResponse.Code[message.code] === undefined ? message.code : $root.com.android.app.motiontool.proto.ErrorResponse.Code[message.code] : message.code;
                            if (message.message != null && message.hasOwnProperty("message"))
                                object.message = message.message;
                            return object;
                        };

                        /**
                         * Converts this ErrorResponse to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ErrorResponse.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for ErrorResponse
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.ErrorResponse
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        ErrorResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.ErrorResponse";
                        };

                        /**
                         * Code enum.
                         * @name com.android.app.motiontool.proto.ErrorResponse.Code
                         * @enum {number}
                         * @property {number} UNKNOWN=0 UNKNOWN value
                         * @property {number} INVALID_REQUEST=1 INVALID_REQUEST value
                         * @property {number} UNKNOWN_TRACE_ID=2 UNKNOWN_TRACE_ID value
                         */
                        ErrorResponse.Code = (function() {
                            const valuesById = {}, values = Object.create(valuesById);
                            values[valuesById[0] = "UNKNOWN"] = 0;
                            values[valuesById[1] = "INVALID_REQUEST"] = 1;
                            values[valuesById[2] = "UNKNOWN_TRACE_ID"] = 2;
                            return values;
                        })();

                        return ErrorResponse;
                    })();

                    proto.WindowIdentifier = (function() {

                        /**
                         * Properties of a WindowIdentifier.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IWindowIdentifier
                         * @property {string|null} [rootWindow] WindowIdentifier rootWindow
                         */

                        /**
                         * Constructs a new WindowIdentifier.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a WindowIdentifier.
                         * @implements IWindowIdentifier
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IWindowIdentifier=} [properties] Properties to set
                         */
                        function WindowIdentifier(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * WindowIdentifier rootWindow.
                         * @member {string} rootWindow
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @instance
                         */
                        WindowIdentifier.prototype.rootWindow = "";

                        /**
                         * Creates a new WindowIdentifier instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @static
                         * @param {com.android.app.motiontool.proto.IWindowIdentifier=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.WindowIdentifier} WindowIdentifier instance
                         */
                        WindowIdentifier.create = function create(properties) {
                            return new WindowIdentifier(properties);
                        };

                        /**
                         * Encodes the specified WindowIdentifier message. Does not implicitly {@link com.android.app.motiontool.proto.WindowIdentifier.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @static
                         * @param {com.android.app.motiontool.proto.IWindowIdentifier} message WindowIdentifier message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        WindowIdentifier.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.rootWindow != null && Object.hasOwnProperty.call(message, "rootWindow"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rootWindow);
                            return writer;
                        };

                        /**
                         * Encodes the specified WindowIdentifier message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.WindowIdentifier.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @static
                         * @param {com.android.app.motiontool.proto.IWindowIdentifier} message WindowIdentifier message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        WindowIdentifier.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a WindowIdentifier message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.WindowIdentifier} WindowIdentifier
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        WindowIdentifier.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.WindowIdentifier();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.rootWindow = reader.string();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a WindowIdentifier message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.WindowIdentifier} WindowIdentifier
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        WindowIdentifier.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a WindowIdentifier message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        WindowIdentifier.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.rootWindow != null && message.hasOwnProperty("rootWindow"))
                                if (!$util.isString(message.rootWindow))
                                    return "rootWindow: string expected";
                            return null;
                        };

                        /**
                         * Creates a WindowIdentifier message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.WindowIdentifier} WindowIdentifier
                         */
                        WindowIdentifier.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.WindowIdentifier)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.WindowIdentifier();
                            if (object.rootWindow != null)
                                message.rootWindow = String(object.rootWindow);
                            return message;
                        };

                        /**
                         * Creates a plain object from a WindowIdentifier message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @static
                         * @param {com.android.app.motiontool.proto.WindowIdentifier} message WindowIdentifier
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        WindowIdentifier.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults)
                                object.rootWindow = "";
                            if (message.rootWindow != null && message.hasOwnProperty("rootWindow"))
                                object.rootWindow = message.rootWindow;
                            return object;
                        };

                        /**
                         * Converts this WindowIdentifier to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        WindowIdentifier.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for WindowIdentifier
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.WindowIdentifier
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        WindowIdentifier.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.WindowIdentifier";
                        };

                        return WindowIdentifier;
                    })();

                    proto.HandshakeRequest = (function() {

                        /**
                         * Properties of a HandshakeRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IHandshakeRequest
                         * @property {com.android.app.motiontool.proto.IWindowIdentifier|null} [window] HandshakeRequest window
                         * @property {number|null} [clientVersion] HandshakeRequest clientVersion
                         */

                        /**
                         * Constructs a new HandshakeRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a HandshakeRequest.
                         * @implements IHandshakeRequest
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IHandshakeRequest=} [properties] Properties to set
                         */
                        function HandshakeRequest(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * HandshakeRequest window.
                         * @member {com.android.app.motiontool.proto.IWindowIdentifier|null|undefined} window
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @instance
                         */
                        HandshakeRequest.prototype.window = null;

                        /**
                         * HandshakeRequest clientVersion.
                         * @member {number} clientVersion
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @instance
                         */
                        HandshakeRequest.prototype.clientVersion = 0;

                        /**
                         * Creates a new HandshakeRequest instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IHandshakeRequest=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.HandshakeRequest} HandshakeRequest instance
                         */
                        HandshakeRequest.create = function create(properties) {
                            return new HandshakeRequest(properties);
                        };

                        /**
                         * Encodes the specified HandshakeRequest message. Does not implicitly {@link com.android.app.motiontool.proto.HandshakeRequest.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IHandshakeRequest} message HandshakeRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        HandshakeRequest.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.window != null && Object.hasOwnProperty.call(message, "window"))
                                $root.com.android.app.motiontool.proto.WindowIdentifier.encode(message.window, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.clientVersion);
                            return writer;
                        };

                        /**
                         * Encodes the specified HandshakeRequest message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.HandshakeRequest.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IHandshakeRequest} message HandshakeRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        HandshakeRequest.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a HandshakeRequest message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.HandshakeRequest} HandshakeRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        HandshakeRequest.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.HandshakeRequest();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.window = $root.com.android.app.motiontool.proto.WindowIdentifier.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 2: {
                                        message.clientVersion = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a HandshakeRequest message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.HandshakeRequest} HandshakeRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        HandshakeRequest.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a HandshakeRequest message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        HandshakeRequest.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.window != null && message.hasOwnProperty("window")) {
                                let error = $root.com.android.app.motiontool.proto.WindowIdentifier.verify(message.window);
                                if (error)
                                    return "window." + error;
                            }
                            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                                if (!$util.isInteger(message.clientVersion))
                                    return "clientVersion: integer expected";
                            return null;
                        };

                        /**
                         * Creates a HandshakeRequest message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.HandshakeRequest} HandshakeRequest
                         */
                        HandshakeRequest.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.HandshakeRequest)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.HandshakeRequest();
                            if (object.window != null) {
                                if (typeof object.window !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.HandshakeRequest.window: object expected");
                                message.window = $root.com.android.app.motiontool.proto.WindowIdentifier.fromObject(object.window);
                            }
                            if (object.clientVersion != null)
                                message.clientVersion = object.clientVersion | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from a HandshakeRequest message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.HandshakeRequest} message HandshakeRequest
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        HandshakeRequest.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.window = null;
                                object.clientVersion = 0;
                            }
                            if (message.window != null && message.hasOwnProperty("window"))
                                object.window = $root.com.android.app.motiontool.proto.WindowIdentifier.toObject(message.window, options);
                            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                                object.clientVersion = message.clientVersion;
                            return object;
                        };

                        /**
                         * Converts this HandshakeRequest to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        HandshakeRequest.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for HandshakeRequest
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.HandshakeRequest
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        HandshakeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.HandshakeRequest";
                        };

                        return HandshakeRequest;
                    })();

                    proto.HandshakeResponse = (function() {

                        /**
                         * Properties of a HandshakeResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IHandshakeResponse
                         * @property {com.android.app.motiontool.proto.HandshakeResponse.Status|null} [status] HandshakeResponse status
                         * @property {number|null} [serverVersion] HandshakeResponse serverVersion
                         */

                        /**
                         * Constructs a new HandshakeResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a HandshakeResponse.
                         * @implements IHandshakeResponse
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IHandshakeResponse=} [properties] Properties to set
                         */
                        function HandshakeResponse(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * HandshakeResponse status.
                         * @member {com.android.app.motiontool.proto.HandshakeResponse.Status} status
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @instance
                         */
                        HandshakeResponse.prototype.status = 1;

                        /**
                         * HandshakeResponse serverVersion.
                         * @member {number} serverVersion
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @instance
                         */
                        HandshakeResponse.prototype.serverVersion = 0;

                        /**
                         * Creates a new HandshakeResponse instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IHandshakeResponse=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.HandshakeResponse} HandshakeResponse instance
                         */
                        HandshakeResponse.create = function create(properties) {
                            return new HandshakeResponse(properties);
                        };

                        /**
                         * Encodes the specified HandshakeResponse message. Does not implicitly {@link com.android.app.motiontool.proto.HandshakeResponse.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IHandshakeResponse} message HandshakeResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        HandshakeResponse.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
                            if (message.serverVersion != null && Object.hasOwnProperty.call(message, "serverVersion"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.serverVersion);
                            return writer;
                        };

                        /**
                         * Encodes the specified HandshakeResponse message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.HandshakeResponse.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IHandshakeResponse} message HandshakeResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        HandshakeResponse.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a HandshakeResponse message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.HandshakeResponse} HandshakeResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        HandshakeResponse.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.HandshakeResponse();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.status = reader.int32();
                                        break;
                                    }
                                case 2: {
                                        message.serverVersion = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a HandshakeResponse message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.HandshakeResponse} HandshakeResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        HandshakeResponse.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a HandshakeResponse message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        HandshakeResponse.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.status != null && message.hasOwnProperty("status"))
                                switch (message.status) {
                                default:
                                    return "status: enum value expected";
                                case 1:
                                case 2:
                                    break;
                                }
                            if (message.serverVersion != null && message.hasOwnProperty("serverVersion"))
                                if (!$util.isInteger(message.serverVersion))
                                    return "serverVersion: integer expected";
                            return null;
                        };

                        /**
                         * Creates a HandshakeResponse message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.HandshakeResponse} HandshakeResponse
                         */
                        HandshakeResponse.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.HandshakeResponse)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.HandshakeResponse();
                            switch (object.status) {
                            default:
                                if (typeof object.status === "number") {
                                    message.status = object.status;
                                    break;
                                }
                                break;
                            case "OK":
                            case 1:
                                message.status = 1;
                                break;
                            case "WINDOW_NOT_FOUND":
                            case 2:
                                message.status = 2;
                                break;
                            }
                            if (object.serverVersion != null)
                                message.serverVersion = object.serverVersion | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from a HandshakeResponse message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.HandshakeResponse} message HandshakeResponse
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        HandshakeResponse.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.status = options.enums === String ? "OK" : 1;
                                object.serverVersion = 0;
                            }
                            if (message.status != null && message.hasOwnProperty("status"))
                                object.status = options.enums === String ? $root.com.android.app.motiontool.proto.HandshakeResponse.Status[message.status] === undefined ? message.status : $root.com.android.app.motiontool.proto.HandshakeResponse.Status[message.status] : message.status;
                            if (message.serverVersion != null && message.hasOwnProperty("serverVersion"))
                                object.serverVersion = message.serverVersion;
                            return object;
                        };

                        /**
                         * Converts this HandshakeResponse to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        HandshakeResponse.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for HandshakeResponse
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.HandshakeResponse
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        HandshakeResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.HandshakeResponse";
                        };

                        /**
                         * Status enum.
                         * @name com.android.app.motiontool.proto.HandshakeResponse.Status
                         * @enum {number}
                         * @property {number} OK=1 OK value
                         * @property {number} WINDOW_NOT_FOUND=2 WINDOW_NOT_FOUND value
                         */
                        HandshakeResponse.Status = (function() {
                            const valuesById = {}, values = Object.create(valuesById);
                            values[valuesById[1] = "OK"] = 1;
                            values[valuesById[2] = "WINDOW_NOT_FOUND"] = 2;
                            return values;
                        })();

                        return HandshakeResponse;
                    })();

                    proto.BeginTraceRequest = (function() {

                        /**
                         * Properties of a BeginTraceRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IBeginTraceRequest
                         * @property {com.android.app.motiontool.proto.IWindowIdentifier|null} [window] BeginTraceRequest window
                         */

                        /**
                         * Constructs a new BeginTraceRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a BeginTraceRequest.
                         * @implements IBeginTraceRequest
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IBeginTraceRequest=} [properties] Properties to set
                         */
                        function BeginTraceRequest(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * BeginTraceRequest window.
                         * @member {com.android.app.motiontool.proto.IWindowIdentifier|null|undefined} window
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @instance
                         */
                        BeginTraceRequest.prototype.window = null;

                        /**
                         * Creates a new BeginTraceRequest instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IBeginTraceRequest=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.BeginTraceRequest} BeginTraceRequest instance
                         */
                        BeginTraceRequest.create = function create(properties) {
                            return new BeginTraceRequest(properties);
                        };

                        /**
                         * Encodes the specified BeginTraceRequest message. Does not implicitly {@link com.android.app.motiontool.proto.BeginTraceRequest.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IBeginTraceRequest} message BeginTraceRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        BeginTraceRequest.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.window != null && Object.hasOwnProperty.call(message, "window"))
                                $root.com.android.app.motiontool.proto.WindowIdentifier.encode(message.window, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified BeginTraceRequest message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.BeginTraceRequest.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IBeginTraceRequest} message BeginTraceRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        BeginTraceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a BeginTraceRequest message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.BeginTraceRequest} BeginTraceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        BeginTraceRequest.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.BeginTraceRequest();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.window = $root.com.android.app.motiontool.proto.WindowIdentifier.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a BeginTraceRequest message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.BeginTraceRequest} BeginTraceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        BeginTraceRequest.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a BeginTraceRequest message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        BeginTraceRequest.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.window != null && message.hasOwnProperty("window")) {
                                let error = $root.com.android.app.motiontool.proto.WindowIdentifier.verify(message.window);
                                if (error)
                                    return "window." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates a BeginTraceRequest message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.BeginTraceRequest} BeginTraceRequest
                         */
                        BeginTraceRequest.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.BeginTraceRequest)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.BeginTraceRequest();
                            if (object.window != null) {
                                if (typeof object.window !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.BeginTraceRequest.window: object expected");
                                message.window = $root.com.android.app.motiontool.proto.WindowIdentifier.fromObject(object.window);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a BeginTraceRequest message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.BeginTraceRequest} message BeginTraceRequest
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        BeginTraceRequest.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults)
                                object.window = null;
                            if (message.window != null && message.hasOwnProperty("window"))
                                object.window = $root.com.android.app.motiontool.proto.WindowIdentifier.toObject(message.window, options);
                            return object;
                        };

                        /**
                         * Converts this BeginTraceRequest to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        BeginTraceRequest.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for BeginTraceRequest
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.BeginTraceRequest
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        BeginTraceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.BeginTraceRequest";
                        };

                        return BeginTraceRequest;
                    })();

                    proto.BeginTraceResponse = (function() {

                        /**
                         * Properties of a BeginTraceResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IBeginTraceResponse
                         * @property {number|null} [traceId] BeginTraceResponse traceId
                         */

                        /**
                         * Constructs a new BeginTraceResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a BeginTraceResponse.
                         * @implements IBeginTraceResponse
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IBeginTraceResponse=} [properties] Properties to set
                         */
                        function BeginTraceResponse(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * BeginTraceResponse traceId.
                         * @member {number} traceId
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @instance
                         */
                        BeginTraceResponse.prototype.traceId = 0;

                        /**
                         * Creates a new BeginTraceResponse instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IBeginTraceResponse=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.BeginTraceResponse} BeginTraceResponse instance
                         */
                        BeginTraceResponse.create = function create(properties) {
                            return new BeginTraceResponse(properties);
                        };

                        /**
                         * Encodes the specified BeginTraceResponse message. Does not implicitly {@link com.android.app.motiontool.proto.BeginTraceResponse.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IBeginTraceResponse} message BeginTraceResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        BeginTraceResponse.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.traceId);
                            return writer;
                        };

                        /**
                         * Encodes the specified BeginTraceResponse message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.BeginTraceResponse.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IBeginTraceResponse} message BeginTraceResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        BeginTraceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a BeginTraceResponse message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.BeginTraceResponse} BeginTraceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        BeginTraceResponse.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.BeginTraceResponse();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.traceId = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a BeginTraceResponse message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.BeginTraceResponse} BeginTraceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        BeginTraceResponse.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a BeginTraceResponse message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        BeginTraceResponse.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                if (!$util.isInteger(message.traceId))
                                    return "traceId: integer expected";
                            return null;
                        };

                        /**
                         * Creates a BeginTraceResponse message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.BeginTraceResponse} BeginTraceResponse
                         */
                        BeginTraceResponse.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.BeginTraceResponse)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.BeginTraceResponse();
                            if (object.traceId != null)
                                message.traceId = object.traceId | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from a BeginTraceResponse message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.BeginTraceResponse} message BeginTraceResponse
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        BeginTraceResponse.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults)
                                object.traceId = 0;
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                object.traceId = message.traceId;
                            return object;
                        };

                        /**
                         * Converts this BeginTraceResponse to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        BeginTraceResponse.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for BeginTraceResponse
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.BeginTraceResponse
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        BeginTraceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.BeginTraceResponse";
                        };

                        return BeginTraceResponse;
                    })();

                    proto.EndTraceRequest = (function() {

                        /**
                         * Properties of an EndTraceRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IEndTraceRequest
                         * @property {number|null} [traceId] EndTraceRequest traceId
                         */

                        /**
                         * Constructs a new EndTraceRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents an EndTraceRequest.
                         * @implements IEndTraceRequest
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IEndTraceRequest=} [properties] Properties to set
                         */
                        function EndTraceRequest(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * EndTraceRequest traceId.
                         * @member {number} traceId
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @instance
                         */
                        EndTraceRequest.prototype.traceId = 0;

                        /**
                         * Creates a new EndTraceRequest instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IEndTraceRequest=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.EndTraceRequest} EndTraceRequest instance
                         */
                        EndTraceRequest.create = function create(properties) {
                            return new EndTraceRequest(properties);
                        };

                        /**
                         * Encodes the specified EndTraceRequest message. Does not implicitly {@link com.android.app.motiontool.proto.EndTraceRequest.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IEndTraceRequest} message EndTraceRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        EndTraceRequest.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.traceId);
                            return writer;
                        };

                        /**
                         * Encodes the specified EndTraceRequest message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.EndTraceRequest.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IEndTraceRequest} message EndTraceRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        EndTraceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes an EndTraceRequest message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.EndTraceRequest} EndTraceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        EndTraceRequest.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.EndTraceRequest();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.traceId = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes an EndTraceRequest message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.EndTraceRequest} EndTraceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        EndTraceRequest.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an EndTraceRequest message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        EndTraceRequest.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                if (!$util.isInteger(message.traceId))
                                    return "traceId: integer expected";
                            return null;
                        };

                        /**
                         * Creates an EndTraceRequest message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.EndTraceRequest} EndTraceRequest
                         */
                        EndTraceRequest.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.EndTraceRequest)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.EndTraceRequest();
                            if (object.traceId != null)
                                message.traceId = object.traceId | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from an EndTraceRequest message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.EndTraceRequest} message EndTraceRequest
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        EndTraceRequest.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults)
                                object.traceId = 0;
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                object.traceId = message.traceId;
                            return object;
                        };

                        /**
                         * Converts this EndTraceRequest to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        EndTraceRequest.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for EndTraceRequest
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.EndTraceRequest
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        EndTraceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.EndTraceRequest";
                        };

                        return EndTraceRequest;
                    })();

                    proto.EndTraceResponse = (function() {

                        /**
                         * Properties of an EndTraceResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IEndTraceResponse
                         * @property {number|null} [traceId] EndTraceResponse traceId
                         */

                        /**
                         * Constructs a new EndTraceResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents an EndTraceResponse.
                         * @implements IEndTraceResponse
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IEndTraceResponse=} [properties] Properties to set
                         */
                        function EndTraceResponse(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * EndTraceResponse traceId.
                         * @member {number} traceId
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @instance
                         */
                        EndTraceResponse.prototype.traceId = 0;

                        /**
                         * Creates a new EndTraceResponse instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IEndTraceResponse=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.EndTraceResponse} EndTraceResponse instance
                         */
                        EndTraceResponse.create = function create(properties) {
                            return new EndTraceResponse(properties);
                        };

                        /**
                         * Encodes the specified EndTraceResponse message. Does not implicitly {@link com.android.app.motiontool.proto.EndTraceResponse.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IEndTraceResponse} message EndTraceResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        EndTraceResponse.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.traceId);
                            return writer;
                        };

                        /**
                         * Encodes the specified EndTraceResponse message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.EndTraceResponse.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IEndTraceResponse} message EndTraceResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        EndTraceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes an EndTraceResponse message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.EndTraceResponse} EndTraceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        EndTraceResponse.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.EndTraceResponse();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.traceId = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes an EndTraceResponse message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.EndTraceResponse} EndTraceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        EndTraceResponse.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an EndTraceResponse message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        EndTraceResponse.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                if (!$util.isInteger(message.traceId))
                                    return "traceId: integer expected";
                            return null;
                        };

                        /**
                         * Creates an EndTraceResponse message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.EndTraceResponse} EndTraceResponse
                         */
                        EndTraceResponse.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.EndTraceResponse)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.EndTraceResponse();
                            if (object.traceId != null)
                                message.traceId = object.traceId | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from an EndTraceResponse message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.EndTraceResponse} message EndTraceResponse
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        EndTraceResponse.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults)
                                object.traceId = 0;
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                object.traceId = message.traceId;
                            return object;
                        };

                        /**
                         * Converts this EndTraceResponse to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        EndTraceResponse.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for EndTraceResponse
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.EndTraceResponse
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        EndTraceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.EndTraceResponse";
                        };

                        return EndTraceResponse;
                    })();

                    proto.PollTraceRequest = (function() {

                        /**
                         * Properties of a PollTraceRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IPollTraceRequest
                         * @property {number|null} [traceId] PollTraceRequest traceId
                         */

                        /**
                         * Constructs a new PollTraceRequest.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a PollTraceRequest.
                         * @implements IPollTraceRequest
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IPollTraceRequest=} [properties] Properties to set
                         */
                        function PollTraceRequest(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * PollTraceRequest traceId.
                         * @member {number} traceId
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @instance
                         */
                        PollTraceRequest.prototype.traceId = 0;

                        /**
                         * Creates a new PollTraceRequest instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IPollTraceRequest=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.PollTraceRequest} PollTraceRequest instance
                         */
                        PollTraceRequest.create = function create(properties) {
                            return new PollTraceRequest(properties);
                        };

                        /**
                         * Encodes the specified PollTraceRequest message. Does not implicitly {@link com.android.app.motiontool.proto.PollTraceRequest.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IPollTraceRequest} message PollTraceRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PollTraceRequest.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.traceId);
                            return writer;
                        };

                        /**
                         * Encodes the specified PollTraceRequest message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.PollTraceRequest.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.IPollTraceRequest} message PollTraceRequest message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PollTraceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a PollTraceRequest message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.PollTraceRequest} PollTraceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        PollTraceRequest.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.PollTraceRequest();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.traceId = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a PollTraceRequest message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.PollTraceRequest} PollTraceRequest
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        PollTraceRequest.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a PollTraceRequest message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        PollTraceRequest.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                if (!$util.isInteger(message.traceId))
                                    return "traceId: integer expected";
                            return null;
                        };

                        /**
                         * Creates a PollTraceRequest message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.PollTraceRequest} PollTraceRequest
                         */
                        PollTraceRequest.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.PollTraceRequest)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.PollTraceRequest();
                            if (object.traceId != null)
                                message.traceId = object.traceId | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from a PollTraceRequest message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @static
                         * @param {com.android.app.motiontool.proto.PollTraceRequest} message PollTraceRequest
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        PollTraceRequest.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults)
                                object.traceId = 0;
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                object.traceId = message.traceId;
                            return object;
                        };

                        /**
                         * Converts this PollTraceRequest to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        PollTraceRequest.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for PollTraceRequest
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.PollTraceRequest
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        PollTraceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.PollTraceRequest";
                        };

                        return PollTraceRequest;
                    })();

                    proto.PollTraceResponse = (function() {

                        /**
                         * Properties of a PollTraceResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IPollTraceResponse
                         * @property {Array.<com.android.app.motiontool.proto.IFrameData>|null} [frameData] PollTraceResponse frameData
                         * @property {number|null} [traceId] PollTraceResponse traceId
                         */

                        /**
                         * Constructs a new PollTraceResponse.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a PollTraceResponse.
                         * @implements IPollTraceResponse
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IPollTraceResponse=} [properties] Properties to set
                         */
                        function PollTraceResponse(properties) {
                            this.frameData = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * PollTraceResponse frameData.
                         * @member {Array.<com.android.app.motiontool.proto.IFrameData>} frameData
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @instance
                         */
                        PollTraceResponse.prototype.frameData = $util.emptyArray;

                        /**
                         * PollTraceResponse traceId.
                         * @member {number} traceId
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @instance
                         */
                        PollTraceResponse.prototype.traceId = 0;

                        /**
                         * Creates a new PollTraceResponse instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IPollTraceResponse=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.PollTraceResponse} PollTraceResponse instance
                         */
                        PollTraceResponse.create = function create(properties) {
                            return new PollTraceResponse(properties);
                        };

                        /**
                         * Encodes the specified PollTraceResponse message. Does not implicitly {@link com.android.app.motiontool.proto.PollTraceResponse.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IPollTraceResponse} message PollTraceResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PollTraceResponse.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.frameData != null && message.frameData.length)
                                for (let i = 0; i < message.frameData.length; ++i)
                                    $root.com.android.app.motiontool.proto.FrameData.encode(message.frameData[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.traceId);
                            return writer;
                        };

                        /**
                         * Encodes the specified PollTraceResponse message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.PollTraceResponse.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.IPollTraceResponse} message PollTraceResponse message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        PollTraceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a PollTraceResponse message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.PollTraceResponse} PollTraceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        PollTraceResponse.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.PollTraceResponse();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.frameData && message.frameData.length))
                                            message.frameData = [];
                                        message.frameData.push($root.com.android.app.motiontool.proto.FrameData.decode(reader, reader.uint32()));
                                        break;
                                    }
                                case 2: {
                                        message.traceId = reader.int32();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a PollTraceResponse message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.PollTraceResponse} PollTraceResponse
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        PollTraceResponse.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a PollTraceResponse message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        PollTraceResponse.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.frameData != null && message.hasOwnProperty("frameData")) {
                                if (!Array.isArray(message.frameData))
                                    return "frameData: array expected";
                                for (let i = 0; i < message.frameData.length; ++i) {
                                    let error = $root.com.android.app.motiontool.proto.FrameData.verify(message.frameData[i]);
                                    if (error)
                                        return "frameData." + error;
                                }
                            }
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                if (!$util.isInteger(message.traceId))
                                    return "traceId: integer expected";
                            return null;
                        };

                        /**
                         * Creates a PollTraceResponse message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.PollTraceResponse} PollTraceResponse
                         */
                        PollTraceResponse.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.PollTraceResponse)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.PollTraceResponse();
                            if (object.frameData) {
                                if (!Array.isArray(object.frameData))
                                    throw TypeError(".com.android.app.motiontool.proto.PollTraceResponse.frameData: array expected");
                                message.frameData = [];
                                for (let i = 0; i < object.frameData.length; ++i) {
                                    if (typeof object.frameData[i] !== "object")
                                        throw TypeError(".com.android.app.motiontool.proto.PollTraceResponse.frameData: object expected");
                                    message.frameData[i] = $root.com.android.app.motiontool.proto.FrameData.fromObject(object.frameData[i]);
                                }
                            }
                            if (object.traceId != null)
                                message.traceId = object.traceId | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from a PollTraceResponse message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @static
                         * @param {com.android.app.motiontool.proto.PollTraceResponse} message PollTraceResponse
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        PollTraceResponse.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults)
                                object.frameData = [];
                            if (options.defaults)
                                object.traceId = 0;
                            if (message.frameData && message.frameData.length) {
                                object.frameData = [];
                                for (let j = 0; j < message.frameData.length; ++j)
                                    object.frameData[j] = $root.com.android.app.motiontool.proto.FrameData.toObject(message.frameData[j], options);
                            }
                            if (message.traceId != null && message.hasOwnProperty("traceId"))
                                object.traceId = message.traceId;
                            return object;
                        };

                        /**
                         * Converts this PollTraceResponse to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        PollTraceResponse.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for PollTraceResponse
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.PollTraceResponse
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        PollTraceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.PollTraceResponse";
                        };

                        return PollTraceResponse;
                    })();

                    proto.FrameData = (function() {

                        /**
                         * Properties of a FrameData.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IFrameData
                         * @property {number|Long|null} [timestamp] FrameData timestamp
                         * @property {com.android.app.motiontool.proto.IViewNode|null} [node] FrameData node
                         */

                        /**
                         * Constructs a new FrameData.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a FrameData.
                         * @implements IFrameData
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IFrameData=} [properties] Properties to set
                         */
                        function FrameData(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * FrameData timestamp.
                         * @member {number|Long} timestamp
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @instance
                         */
                        FrameData.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * FrameData node.
                         * @member {com.android.app.motiontool.proto.IViewNode|null|undefined} node
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @instance
                         */
                        FrameData.prototype.node = null;

                        /**
                         * Creates a new FrameData instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @static
                         * @param {com.android.app.motiontool.proto.IFrameData=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.FrameData} FrameData instance
                         */
                        FrameData.create = function create(properties) {
                            return new FrameData(properties);
                        };

                        /**
                         * Encodes the specified FrameData message. Does not implicitly {@link com.android.app.motiontool.proto.FrameData.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @static
                         * @param {com.android.app.motiontool.proto.IFrameData} message FrameData message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        FrameData.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
                            if (message.node != null && Object.hasOwnProperty.call(message, "node"))
                                $root.com.android.app.motiontool.proto.ViewNode.encode(message.node, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified FrameData message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.FrameData.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @static
                         * @param {com.android.app.motiontool.proto.IFrameData} message FrameData message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        FrameData.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a FrameData message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.FrameData} FrameData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        FrameData.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.FrameData();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.timestamp = reader.int64();
                                        break;
                                    }
                                case 2: {
                                        message.node = $root.com.android.app.motiontool.proto.ViewNode.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a FrameData message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.FrameData} FrameData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        FrameData.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a FrameData message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        FrameData.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                                    return "timestamp: integer|Long expected";
                            if (message.node != null && message.hasOwnProperty("node")) {
                                let error = $root.com.android.app.motiontool.proto.ViewNode.verify(message.node);
                                if (error)
                                    return "node." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates a FrameData message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.FrameData} FrameData
                         */
                        FrameData.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.FrameData)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.FrameData();
                            if (object.timestamp != null)
                                if ($util.Long)
                                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                                else if (typeof object.timestamp === "string")
                                    message.timestamp = parseInt(object.timestamp, 10);
                                else if (typeof object.timestamp === "number")
                                    message.timestamp = object.timestamp;
                                else if (typeof object.timestamp === "object")
                                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                            if (object.node != null) {
                                if (typeof object.node !== "object")
                                    throw TypeError(".com.android.app.motiontool.proto.FrameData.node: object expected");
                                message.node = $root.com.android.app.motiontool.proto.ViewNode.fromObject(object.node);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a FrameData message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @static
                         * @param {com.android.app.motiontool.proto.FrameData} message FrameData
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        FrameData.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.timestamp = options.longs === String ? "0" : 0;
                                object.node = null;
                            }
                            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                                if (typeof message.timestamp === "number")
                                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                                else
                                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                            if (message.node != null && message.hasOwnProperty("node"))
                                object.node = $root.com.android.app.motiontool.proto.ViewNode.toObject(message.node, options);
                            return object;
                        };

                        /**
                         * Converts this FrameData to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        FrameData.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for FrameData
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.FrameData
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        FrameData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.FrameData";
                        };

                        return FrameData;
                    })();

                    proto.ViewNode = (function() {

                        /**
                         * Properties of a ViewNode.
                         * @memberof com.android.app.motiontool.proto
                         * @interface IViewNode
                         * @property {string|null} [classname] ViewNode classname
                         * @property {number|null} [hashcode] ViewNode hashcode
                         * @property {Array.<com.android.app.motiontool.proto.IViewNode>|null} [children] ViewNode children
                         * @property {string|null} [id] ViewNode id
                         * @property {number|null} [left] ViewNode left
                         * @property {number|null} [top] ViewNode top
                         * @property {number|null} [width] ViewNode width
                         * @property {number|null} [height] ViewNode height
                         * @property {number|null} [scrollX] ViewNode scrollX
                         * @property {number|null} [scrollY] ViewNode scrollY
                         * @property {number|null} [translationX] ViewNode translationX
                         * @property {number|null} [translationY] ViewNode translationY
                         * @property {number|null} [scaleX] ViewNode scaleX
                         * @property {number|null} [scaleY] ViewNode scaleY
                         * @property {number|null} [alpha] ViewNode alpha
                         * @property {boolean|null} [willNotDraw] ViewNode willNotDraw
                         * @property {boolean|null} [clipChildren] ViewNode clipChildren
                         * @property {number|null} [visibility] ViewNode visibility
                         * @property {number|null} [elevation] ViewNode elevation
                         */

                        /**
                         * Constructs a new ViewNode.
                         * @memberof com.android.app.motiontool.proto
                         * @classdesc Represents a ViewNode.
                         * @implements IViewNode
                         * @constructor
                         * @param {com.android.app.motiontool.proto.IViewNode=} [properties] Properties to set
                         */
                        function ViewNode(properties) {
                            this.children = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * ViewNode classname.
                         * @member {string} classname
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.classname = "";

                        /**
                         * ViewNode hashcode.
                         * @member {number} hashcode
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.hashcode = 0;

                        /**
                         * ViewNode children.
                         * @member {Array.<com.android.app.motiontool.proto.IViewNode>} children
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.children = $util.emptyArray;

                        /**
                         * ViewNode id.
                         * @member {string} id
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.id = "";

                        /**
                         * ViewNode left.
                         * @member {number} left
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.left = 0;

                        /**
                         * ViewNode top.
                         * @member {number} top
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.top = 0;

                        /**
                         * ViewNode width.
                         * @member {number} width
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.width = 0;

                        /**
                         * ViewNode height.
                         * @member {number} height
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.height = 0;

                        /**
                         * ViewNode scrollX.
                         * @member {number} scrollX
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.scrollX = 0;

                        /**
                         * ViewNode scrollY.
                         * @member {number} scrollY
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.scrollY = 0;

                        /**
                         * ViewNode translationX.
                         * @member {number} translationX
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.translationX = 0;

                        /**
                         * ViewNode translationY.
                         * @member {number} translationY
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.translationY = 0;

                        /**
                         * ViewNode scaleX.
                         * @member {number} scaleX
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.scaleX = 1;

                        /**
                         * ViewNode scaleY.
                         * @member {number} scaleY
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.scaleY = 1;

                        /**
                         * ViewNode alpha.
                         * @member {number} alpha
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.alpha = 1;

                        /**
                         * ViewNode willNotDraw.
                         * @member {boolean} willNotDraw
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.willNotDraw = false;

                        /**
                         * ViewNode clipChildren.
                         * @member {boolean} clipChildren
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.clipChildren = false;

                        /**
                         * ViewNode visibility.
                         * @member {number} visibility
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.visibility = 0;

                        /**
                         * ViewNode elevation.
                         * @member {number} elevation
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         */
                        ViewNode.prototype.elevation = 0;

                        /**
                         * Creates a new ViewNode instance using the specified properties.
                         * @function create
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @static
                         * @param {com.android.app.motiontool.proto.IViewNode=} [properties] Properties to set
                         * @returns {com.android.app.motiontool.proto.ViewNode} ViewNode instance
                         */
                        ViewNode.create = function create(properties) {
                            return new ViewNode(properties);
                        };

                        /**
                         * Encodes the specified ViewNode message. Does not implicitly {@link com.android.app.motiontool.proto.ViewNode.verify|verify} messages.
                         * @function encode
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @static
                         * @param {com.android.app.motiontool.proto.IViewNode} message ViewNode message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ViewNode.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.classname != null && Object.hasOwnProperty.call(message, "classname"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.classname);
                            if (message.hashcode != null && Object.hasOwnProperty.call(message, "hashcode"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.hashcode);
                            if (message.children != null && message.children.length)
                                for (let i = 0; i < message.children.length; ++i)
                                    $root.com.android.app.motiontool.proto.ViewNode.encode(message.children[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                                writer.uint32(/* id 4, wireType 2 =*/34).string(message.id);
                            if (message.left != null && Object.hasOwnProperty.call(message, "left"))
                                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.left);
                            if (message.top != null && Object.hasOwnProperty.call(message, "top"))
                                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.top);
                            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.width);
                            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.height);
                            if (message.scrollX != null && Object.hasOwnProperty.call(message, "scrollX"))
                                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.scrollX);
                            if (message.scrollY != null && Object.hasOwnProperty.call(message, "scrollY"))
                                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.scrollY);
                            if (message.translationX != null && Object.hasOwnProperty.call(message, "translationX"))
                                writer.uint32(/* id 11, wireType 5 =*/93).float(message.translationX);
                            if (message.translationY != null && Object.hasOwnProperty.call(message, "translationY"))
                                writer.uint32(/* id 12, wireType 5 =*/101).float(message.translationY);
                            if (message.scaleX != null && Object.hasOwnProperty.call(message, "scaleX"))
                                writer.uint32(/* id 13, wireType 5 =*/109).float(message.scaleX);
                            if (message.scaleY != null && Object.hasOwnProperty.call(message, "scaleY"))
                                writer.uint32(/* id 14, wireType 5 =*/117).float(message.scaleY);
                            if (message.alpha != null && Object.hasOwnProperty.call(message, "alpha"))
                                writer.uint32(/* id 15, wireType 5 =*/125).float(message.alpha);
                            if (message.willNotDraw != null && Object.hasOwnProperty.call(message, "willNotDraw"))
                                writer.uint32(/* id 16, wireType 0 =*/128).bool(message.willNotDraw);
                            if (message.clipChildren != null && Object.hasOwnProperty.call(message, "clipChildren"))
                                writer.uint32(/* id 17, wireType 0 =*/136).bool(message.clipChildren);
                            if (message.visibility != null && Object.hasOwnProperty.call(message, "visibility"))
                                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.visibility);
                            if (message.elevation != null && Object.hasOwnProperty.call(message, "elevation"))
                                writer.uint32(/* id 19, wireType 5 =*/157).float(message.elevation);
                            return writer;
                        };

                        /**
                         * Encodes the specified ViewNode message, length delimited. Does not implicitly {@link com.android.app.motiontool.proto.ViewNode.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @static
                         * @param {com.android.app.motiontool.proto.IViewNode} message ViewNode message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ViewNode.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a ViewNode message from the specified reader or buffer.
                         * @function decode
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {com.android.app.motiontool.proto.ViewNode} ViewNode
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ViewNode.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.android.app.motiontool.proto.ViewNode();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.classname = reader.string();
                                        break;
                                    }
                                case 2: {
                                        message.hashcode = reader.int32();
                                        break;
                                    }
                                case 3: {
                                        if (!(message.children && message.children.length))
                                            message.children = [];
                                        message.children.push($root.com.android.app.motiontool.proto.ViewNode.decode(reader, reader.uint32()));
                                        break;
                                    }
                                case 4: {
                                        message.id = reader.string();
                                        break;
                                    }
                                case 5: {
                                        message.left = reader.int32();
                                        break;
                                    }
                                case 6: {
                                        message.top = reader.int32();
                                        break;
                                    }
                                case 7: {
                                        message.width = reader.int32();
                                        break;
                                    }
                                case 8: {
                                        message.height = reader.int32();
                                        break;
                                    }
                                case 9: {
                                        message.scrollX = reader.int32();
                                        break;
                                    }
                                case 10: {
                                        message.scrollY = reader.int32();
                                        break;
                                    }
                                case 11: {
                                        message.translationX = reader.float();
                                        break;
                                    }
                                case 12: {
                                        message.translationY = reader.float();
                                        break;
                                    }
                                case 13: {
                                        message.scaleX = reader.float();
                                        break;
                                    }
                                case 14: {
                                        message.scaleY = reader.float();
                                        break;
                                    }
                                case 15: {
                                        message.alpha = reader.float();
                                        break;
                                    }
                                case 16: {
                                        message.willNotDraw = reader.bool();
                                        break;
                                    }
                                case 17: {
                                        message.clipChildren = reader.bool();
                                        break;
                                    }
                                case 18: {
                                        message.visibility = reader.int32();
                                        break;
                                    }
                                case 19: {
                                        message.elevation = reader.float();
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a ViewNode message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {com.android.app.motiontool.proto.ViewNode} ViewNode
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ViewNode.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a ViewNode message.
                         * @function verify
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ViewNode.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.classname != null && message.hasOwnProperty("classname"))
                                if (!$util.isString(message.classname))
                                    return "classname: string expected";
                            if (message.hashcode != null && message.hasOwnProperty("hashcode"))
                                if (!$util.isInteger(message.hashcode))
                                    return "hashcode: integer expected";
                            if (message.children != null && message.hasOwnProperty("children")) {
                                if (!Array.isArray(message.children))
                                    return "children: array expected";
                                for (let i = 0; i < message.children.length; ++i) {
                                    let error = $root.com.android.app.motiontool.proto.ViewNode.verify(message.children[i]);
                                    if (error)
                                        return "children." + error;
                                }
                            }
                            if (message.id != null && message.hasOwnProperty("id"))
                                if (!$util.isString(message.id))
                                    return "id: string expected";
                            if (message.left != null && message.hasOwnProperty("left"))
                                if (!$util.isInteger(message.left))
                                    return "left: integer expected";
                            if (message.top != null && message.hasOwnProperty("top"))
                                if (!$util.isInteger(message.top))
                                    return "top: integer expected";
                            if (message.width != null && message.hasOwnProperty("width"))
                                if (!$util.isInteger(message.width))
                                    return "width: integer expected";
                            if (message.height != null && message.hasOwnProperty("height"))
                                if (!$util.isInteger(message.height))
                                    return "height: integer expected";
                            if (message.scrollX != null && message.hasOwnProperty("scrollX"))
                                if (!$util.isInteger(message.scrollX))
                                    return "scrollX: integer expected";
                            if (message.scrollY != null && message.hasOwnProperty("scrollY"))
                                if (!$util.isInteger(message.scrollY))
                                    return "scrollY: integer expected";
                            if (message.translationX != null && message.hasOwnProperty("translationX"))
                                if (typeof message.translationX !== "number")
                                    return "translationX: number expected";
                            if (message.translationY != null && message.hasOwnProperty("translationY"))
                                if (typeof message.translationY !== "number")
                                    return "translationY: number expected";
                            if (message.scaleX != null && message.hasOwnProperty("scaleX"))
                                if (typeof message.scaleX !== "number")
                                    return "scaleX: number expected";
                            if (message.scaleY != null && message.hasOwnProperty("scaleY"))
                                if (typeof message.scaleY !== "number")
                                    return "scaleY: number expected";
                            if (message.alpha != null && message.hasOwnProperty("alpha"))
                                if (typeof message.alpha !== "number")
                                    return "alpha: number expected";
                            if (message.willNotDraw != null && message.hasOwnProperty("willNotDraw"))
                                if (typeof message.willNotDraw !== "boolean")
                                    return "willNotDraw: boolean expected";
                            if (message.clipChildren != null && message.hasOwnProperty("clipChildren"))
                                if (typeof message.clipChildren !== "boolean")
                                    return "clipChildren: boolean expected";
                            if (message.visibility != null && message.hasOwnProperty("visibility"))
                                if (!$util.isInteger(message.visibility))
                                    return "visibility: integer expected";
                            if (message.elevation != null && message.hasOwnProperty("elevation"))
                                if (typeof message.elevation !== "number")
                                    return "elevation: number expected";
                            return null;
                        };

                        /**
                         * Creates a ViewNode message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {com.android.app.motiontool.proto.ViewNode} ViewNode
                         */
                        ViewNode.fromObject = function fromObject(object) {
                            if (object instanceof $root.com.android.app.motiontool.proto.ViewNode)
                                return object;
                            let message = new $root.com.android.app.motiontool.proto.ViewNode();
                            if (object.classname != null)
                                message.classname = String(object.classname);
                            if (object.hashcode != null)
                                message.hashcode = object.hashcode | 0;
                            if (object.children) {
                                if (!Array.isArray(object.children))
                                    throw TypeError(".com.android.app.motiontool.proto.ViewNode.children: array expected");
                                message.children = [];
                                for (let i = 0; i < object.children.length; ++i) {
                                    if (typeof object.children[i] !== "object")
                                        throw TypeError(".com.android.app.motiontool.proto.ViewNode.children: object expected");
                                    message.children[i] = $root.com.android.app.motiontool.proto.ViewNode.fromObject(object.children[i]);
                                }
                            }
                            if (object.id != null)
                                message.id = String(object.id);
                            if (object.left != null)
                                message.left = object.left | 0;
                            if (object.top != null)
                                message.top = object.top | 0;
                            if (object.width != null)
                                message.width = object.width | 0;
                            if (object.height != null)
                                message.height = object.height | 0;
                            if (object.scrollX != null)
                                message.scrollX = object.scrollX | 0;
                            if (object.scrollY != null)
                                message.scrollY = object.scrollY | 0;
                            if (object.translationX != null)
                                message.translationX = Number(object.translationX);
                            if (object.translationY != null)
                                message.translationY = Number(object.translationY);
                            if (object.scaleX != null)
                                message.scaleX = Number(object.scaleX);
                            if (object.scaleY != null)
                                message.scaleY = Number(object.scaleY);
                            if (object.alpha != null)
                                message.alpha = Number(object.alpha);
                            if (object.willNotDraw != null)
                                message.willNotDraw = Boolean(object.willNotDraw);
                            if (object.clipChildren != null)
                                message.clipChildren = Boolean(object.clipChildren);
                            if (object.visibility != null)
                                message.visibility = object.visibility | 0;
                            if (object.elevation != null)
                                message.elevation = Number(object.elevation);
                            return message;
                        };

                        /**
                         * Creates a plain object from a ViewNode message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @static
                         * @param {com.android.app.motiontool.proto.ViewNode} message ViewNode
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ViewNode.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults)
                                object.children = [];
                            if (options.defaults) {
                                object.classname = "";
                                object.hashcode = 0;
                                object.id = "";
                                object.left = 0;
                                object.top = 0;
                                object.width = 0;
                                object.height = 0;
                                object.scrollX = 0;
                                object.scrollY = 0;
                                object.translationX = 0;
                                object.translationY = 0;
                                object.scaleX = 1;
                                object.scaleY = 1;
                                object.alpha = 1;
                                object.willNotDraw = false;
                                object.clipChildren = false;
                                object.visibility = 0;
                                object.elevation = 0;
                            }
                            if (message.classname != null && message.hasOwnProperty("classname"))
                                object.classname = message.classname;
                            if (message.hashcode != null && message.hasOwnProperty("hashcode"))
                                object.hashcode = message.hashcode;
                            if (message.children && message.children.length) {
                                object.children = [];
                                for (let j = 0; j < message.children.length; ++j)
                                    object.children[j] = $root.com.android.app.motiontool.proto.ViewNode.toObject(message.children[j], options);
                            }
                            if (message.id != null && message.hasOwnProperty("id"))
                                object.id = message.id;
                            if (message.left != null && message.hasOwnProperty("left"))
                                object.left = message.left;
                            if (message.top != null && message.hasOwnProperty("top"))
                                object.top = message.top;
                            if (message.width != null && message.hasOwnProperty("width"))
                                object.width = message.width;
                            if (message.height != null && message.hasOwnProperty("height"))
                                object.height = message.height;
                            if (message.scrollX != null && message.hasOwnProperty("scrollX"))
                                object.scrollX = message.scrollX;
                            if (message.scrollY != null && message.hasOwnProperty("scrollY"))
                                object.scrollY = message.scrollY;
                            if (message.translationX != null && message.hasOwnProperty("translationX"))
                                object.translationX = options.json && !isFinite(message.translationX) ? String(message.translationX) : message.translationX;
                            if (message.translationY != null && message.hasOwnProperty("translationY"))
                                object.translationY = options.json && !isFinite(message.translationY) ? String(message.translationY) : message.translationY;
                            if (message.scaleX != null && message.hasOwnProperty("scaleX"))
                                object.scaleX = options.json && !isFinite(message.scaleX) ? String(message.scaleX) : message.scaleX;
                            if (message.scaleY != null && message.hasOwnProperty("scaleY"))
                                object.scaleY = options.json && !isFinite(message.scaleY) ? String(message.scaleY) : message.scaleY;
                            if (message.alpha != null && message.hasOwnProperty("alpha"))
                                object.alpha = options.json && !isFinite(message.alpha) ? String(message.alpha) : message.alpha;
                            if (message.willNotDraw != null && message.hasOwnProperty("willNotDraw"))
                                object.willNotDraw = message.willNotDraw;
                            if (message.clipChildren != null && message.hasOwnProperty("clipChildren"))
                                object.clipChildren = message.clipChildren;
                            if (message.visibility != null && message.hasOwnProperty("visibility"))
                                object.visibility = message.visibility;
                            if (message.elevation != null && message.hasOwnProperty("elevation"))
                                object.elevation = options.json && !isFinite(message.elevation) ? String(message.elevation) : message.elevation;
                            return object;
                        };

                        /**
                         * Converts this ViewNode to JSON.
                         * @function toJSON
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ViewNode.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for ViewNode
                         * @function getTypeUrl
                         * @memberof com.android.app.motiontool.proto.ViewNode
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        ViewNode.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/com.android.app.motiontool.proto.ViewNode";
                        };

                        return ViewNode;
                    })();

                    return proto;
                })();

                return motiontool;
            })();

            return app;
        })();

        return android;
    })();

    return com;
})();

export { $root as default };
