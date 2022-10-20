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

export const motion = $root.motion = (() => {

    /**
     * Namespace motion.
     * @exports motion
     * @namespace
     */
    const motion = {};

    motion.Trace = (function() {

        /**
         * Properties of a Trace.
         * @memberof motion
         * @interface ITrace
         * @property {string|null} [id] Trace id
         * @property {number|null} [version] Trace version
         * @property {string|null} [name] Trace name
         * @property {google.protobuf.ITimestamp|null} [captureTime] Trace captureTime
         * @property {string|null} [processName] Trace processName
         * @property {string|null} [windowName] Trace windowName
         * @property {google.protobuf.IDuration|null} [duration] Trace duration
         * @property {motion.IVideoMetadata|null} [videoMetadata] Trace videoMetadata
         */

        /**
         * Constructs a new Trace.
         * @memberof motion
         * @classdesc Represents a Trace.
         * @implements ITrace
         * @constructor
         * @param {motion.ITrace=} [properties] Properties to set
         */
        function Trace(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Trace id.
         * @member {string} id
         * @memberof motion.Trace
         * @instance
         */
        Trace.prototype.id = "";

        /**
         * Trace version.
         * @member {number} version
         * @memberof motion.Trace
         * @instance
         */
        Trace.prototype.version = 0;

        /**
         * Trace name.
         * @member {string} name
         * @memberof motion.Trace
         * @instance
         */
        Trace.prototype.name = "";

        /**
         * Trace captureTime.
         * @member {google.protobuf.ITimestamp|null|undefined} captureTime
         * @memberof motion.Trace
         * @instance
         */
        Trace.prototype.captureTime = null;

        /**
         * Trace processName.
         * @member {string} processName
         * @memberof motion.Trace
         * @instance
         */
        Trace.prototype.processName = "";

        /**
         * Trace windowName.
         * @member {string} windowName
         * @memberof motion.Trace
         * @instance
         */
        Trace.prototype.windowName = "";

        /**
         * Trace duration.
         * @member {google.protobuf.IDuration|null|undefined} duration
         * @memberof motion.Trace
         * @instance
         */
        Trace.prototype.duration = null;

        /**
         * Trace videoMetadata.
         * @member {motion.IVideoMetadata|null|undefined} videoMetadata
         * @memberof motion.Trace
         * @instance
         */
        Trace.prototype.videoMetadata = null;

        /**
         * Creates a new Trace instance using the specified properties.
         * @function create
         * @memberof motion.Trace
         * @static
         * @param {motion.ITrace=} [properties] Properties to set
         * @returns {motion.Trace} Trace instance
         */
        Trace.create = function create(properties) {
            return new Trace(properties);
        };

        /**
         * Encodes the specified Trace message. Does not implicitly {@link motion.Trace.verify|verify} messages.
         * @function encode
         * @memberof motion.Trace
         * @static
         * @param {motion.ITrace} message Trace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trace.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.version);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.captureTime != null && Object.hasOwnProperty.call(message, "captureTime"))
                $root.google.protobuf.Timestamp.encode(message.captureTime, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.processName != null && Object.hasOwnProperty.call(message, "processName"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.processName);
            if (message.windowName != null && Object.hasOwnProperty.call(message, "windowName"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.windowName);
            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                $root.google.protobuf.Duration.encode(message.duration, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.videoMetadata != null && Object.hasOwnProperty.call(message, "videoMetadata"))
                $root.motion.VideoMetadata.encode(message.videoMetadata, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Trace message, length delimited. Does not implicitly {@link motion.Trace.verify|verify} messages.
         * @function encodeDelimited
         * @memberof motion.Trace
         * @static
         * @param {motion.ITrace} message Trace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Trace.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Trace message from the specified reader or buffer.
         * @function decode
         * @memberof motion.Trace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {motion.Trace} Trace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Trace.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.motion.Trace();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.version = reader.int32();
                        break;
                    }
                case 3: {
                        message.name = reader.string();
                        break;
                    }
                case 4: {
                        message.captureTime = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.processName = reader.string();
                        break;
                    }
                case 6: {
                        message.windowName = reader.string();
                        break;
                    }
                case 7: {
                        message.duration = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        message.videoMetadata = $root.motion.VideoMetadata.decode(reader, reader.uint32());
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
         * Decodes a Trace message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof motion.Trace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {motion.Trace} Trace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Trace.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Trace message.
         * @function verify
         * @memberof motion.Trace
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Trace.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.captureTime != null && message.hasOwnProperty("captureTime")) {
                let error = $root.google.protobuf.Timestamp.verify(message.captureTime);
                if (error)
                    return "captureTime." + error;
            }
            if (message.processName != null && message.hasOwnProperty("processName"))
                if (!$util.isString(message.processName))
                    return "processName: string expected";
            if (message.windowName != null && message.hasOwnProperty("windowName"))
                if (!$util.isString(message.windowName))
                    return "windowName: string expected";
            if (message.duration != null && message.hasOwnProperty("duration")) {
                let error = $root.google.protobuf.Duration.verify(message.duration);
                if (error)
                    return "duration." + error;
            }
            if (message.videoMetadata != null && message.hasOwnProperty("videoMetadata")) {
                let error = $root.motion.VideoMetadata.verify(message.videoMetadata);
                if (error)
                    return "videoMetadata." + error;
            }
            return null;
        };

        /**
         * Creates a Trace message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof motion.Trace
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {motion.Trace} Trace
         */
        Trace.fromObject = function fromObject(object) {
            if (object instanceof $root.motion.Trace)
                return object;
            let message = new $root.motion.Trace();
            if (object.id != null)
                message.id = String(object.id);
            if (object.version != null)
                message.version = object.version | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.captureTime != null) {
                if (typeof object.captureTime !== "object")
                    throw TypeError(".motion.Trace.captureTime: object expected");
                message.captureTime = $root.google.protobuf.Timestamp.fromObject(object.captureTime);
            }
            if (object.processName != null)
                message.processName = String(object.processName);
            if (object.windowName != null)
                message.windowName = String(object.windowName);
            if (object.duration != null) {
                if (typeof object.duration !== "object")
                    throw TypeError(".motion.Trace.duration: object expected");
                message.duration = $root.google.protobuf.Duration.fromObject(object.duration);
            }
            if (object.videoMetadata != null) {
                if (typeof object.videoMetadata !== "object")
                    throw TypeError(".motion.Trace.videoMetadata: object expected");
                message.videoMetadata = $root.motion.VideoMetadata.fromObject(object.videoMetadata);
            }
            return message;
        };

        /**
         * Creates a plain object from a Trace message. Also converts values to other types if specified.
         * @function toObject
         * @memberof motion.Trace
         * @static
         * @param {motion.Trace} message Trace
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Trace.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.version = 0;
                object.name = "";
                object.captureTime = null;
                object.processName = "";
                object.windowName = "";
                object.duration = null;
                object.videoMetadata = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.captureTime != null && message.hasOwnProperty("captureTime"))
                object.captureTime = $root.google.protobuf.Timestamp.toObject(message.captureTime, options);
            if (message.processName != null && message.hasOwnProperty("processName"))
                object.processName = message.processName;
            if (message.windowName != null && message.hasOwnProperty("windowName"))
                object.windowName = message.windowName;
            if (message.duration != null && message.hasOwnProperty("duration"))
                object.duration = $root.google.protobuf.Duration.toObject(message.duration, options);
            if (message.videoMetadata != null && message.hasOwnProperty("videoMetadata"))
                object.videoMetadata = $root.motion.VideoMetadata.toObject(message.videoMetadata, options);
            return object;
        };

        /**
         * Converts this Trace to JSON.
         * @function toJSON
         * @memberof motion.Trace
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Trace.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Trace
         * @function getTypeUrl
         * @memberof motion.Trace
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Trace.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/motion.Trace";
        };

        return Trace;
    })();

    motion.VideoMetadata = (function() {

        /**
         * Properties of a VideoMetadata.
         * @memberof motion
         * @interface IVideoMetadata
         * @property {number|null} [widthPx] VideoMetadata widthPx
         * @property {number|null} [heightPx] VideoMetadata heightPx
         * @property {number|null} [density] VideoMetadata density
         */

        /**
         * Constructs a new VideoMetadata.
         * @memberof motion
         * @classdesc Represents a VideoMetadata.
         * @implements IVideoMetadata
         * @constructor
         * @param {motion.IVideoMetadata=} [properties] Properties to set
         */
        function VideoMetadata(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VideoMetadata widthPx.
         * @member {number} widthPx
         * @memberof motion.VideoMetadata
         * @instance
         */
        VideoMetadata.prototype.widthPx = 0;

        /**
         * VideoMetadata heightPx.
         * @member {number} heightPx
         * @memberof motion.VideoMetadata
         * @instance
         */
        VideoMetadata.prototype.heightPx = 0;

        /**
         * VideoMetadata density.
         * @member {number} density
         * @memberof motion.VideoMetadata
         * @instance
         */
        VideoMetadata.prototype.density = 0;

        /**
         * Creates a new VideoMetadata instance using the specified properties.
         * @function create
         * @memberof motion.VideoMetadata
         * @static
         * @param {motion.IVideoMetadata=} [properties] Properties to set
         * @returns {motion.VideoMetadata} VideoMetadata instance
         */
        VideoMetadata.create = function create(properties) {
            return new VideoMetadata(properties);
        };

        /**
         * Encodes the specified VideoMetadata message. Does not implicitly {@link motion.VideoMetadata.verify|verify} messages.
         * @function encode
         * @memberof motion.VideoMetadata
         * @static
         * @param {motion.IVideoMetadata} message VideoMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VideoMetadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.widthPx != null && Object.hasOwnProperty.call(message, "widthPx"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.widthPx);
            if (message.heightPx != null && Object.hasOwnProperty.call(message, "heightPx"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.heightPx);
            if (message.density != null && Object.hasOwnProperty.call(message, "density"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.density);
            return writer;
        };

        /**
         * Encodes the specified VideoMetadata message, length delimited. Does not implicitly {@link motion.VideoMetadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof motion.VideoMetadata
         * @static
         * @param {motion.IVideoMetadata} message VideoMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VideoMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VideoMetadata message from the specified reader or buffer.
         * @function decode
         * @memberof motion.VideoMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {motion.VideoMetadata} VideoMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VideoMetadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.motion.VideoMetadata();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.widthPx = reader.int32();
                        break;
                    }
                case 2: {
                        message.heightPx = reader.int32();
                        break;
                    }
                case 3: {
                        message.density = reader.int32();
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
         * Decodes a VideoMetadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof motion.VideoMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {motion.VideoMetadata} VideoMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VideoMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VideoMetadata message.
         * @function verify
         * @memberof motion.VideoMetadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VideoMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.widthPx != null && message.hasOwnProperty("widthPx"))
                if (!$util.isInteger(message.widthPx))
                    return "widthPx: integer expected";
            if (message.heightPx != null && message.hasOwnProperty("heightPx"))
                if (!$util.isInteger(message.heightPx))
                    return "heightPx: integer expected";
            if (message.density != null && message.hasOwnProperty("density"))
                if (!$util.isInteger(message.density))
                    return "density: integer expected";
            return null;
        };

        /**
         * Creates a VideoMetadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof motion.VideoMetadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {motion.VideoMetadata} VideoMetadata
         */
        VideoMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.motion.VideoMetadata)
                return object;
            let message = new $root.motion.VideoMetadata();
            if (object.widthPx != null)
                message.widthPx = object.widthPx | 0;
            if (object.heightPx != null)
                message.heightPx = object.heightPx | 0;
            if (object.density != null)
                message.density = object.density | 0;
            return message;
        };

        /**
         * Creates a plain object from a VideoMetadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof motion.VideoMetadata
         * @static
         * @param {motion.VideoMetadata} message VideoMetadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VideoMetadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.widthPx = 0;
                object.heightPx = 0;
                object.density = 0;
            }
            if (message.widthPx != null && message.hasOwnProperty("widthPx"))
                object.widthPx = message.widthPx;
            if (message.heightPx != null && message.hasOwnProperty("heightPx"))
                object.heightPx = message.heightPx;
            if (message.density != null && message.hasOwnProperty("density"))
                object.density = message.density;
            return object;
        };

        /**
         * Converts this VideoMetadata to JSON.
         * @function toJSON
         * @memberof motion.VideoMetadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VideoMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VideoMetadata
         * @function getTypeUrl
         * @memberof motion.VideoMetadata
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VideoMetadata.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/motion.VideoMetadata";
        };

        return VideoMetadata;
    })();

    motion.Frame = (function() {

        /**
         * Properties of a Frame.
         * @memberof motion
         * @interface IFrame
         * @property {number|Long|null} [frameNumber] Frame frameNumber
         * @property {number|Long|null} [frameNanos] Frame frameNanos
         * @property {number|null} [videoTimeSeconds] Frame videoTimeSeconds
         * @property {motion.IViewNode|null} [viewHierarchy] Frame viewHierarchy
         */

        /**
         * Constructs a new Frame.
         * @memberof motion
         * @classdesc Represents a Frame.
         * @implements IFrame
         * @constructor
         * @param {motion.IFrame=} [properties] Properties to set
         */
        function Frame(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Frame frameNumber.
         * @member {number|Long} frameNumber
         * @memberof motion.Frame
         * @instance
         */
        Frame.prototype.frameNumber = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Frame frameNanos.
         * @member {number|Long} frameNanos
         * @memberof motion.Frame
         * @instance
         */
        Frame.prototype.frameNanos = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Frame videoTimeSeconds.
         * @member {number} videoTimeSeconds
         * @memberof motion.Frame
         * @instance
         */
        Frame.prototype.videoTimeSeconds = 0;

        /**
         * Frame viewHierarchy.
         * @member {motion.IViewNode|null|undefined} viewHierarchy
         * @memberof motion.Frame
         * @instance
         */
        Frame.prototype.viewHierarchy = null;

        /**
         * Creates a new Frame instance using the specified properties.
         * @function create
         * @memberof motion.Frame
         * @static
         * @param {motion.IFrame=} [properties] Properties to set
         * @returns {motion.Frame} Frame instance
         */
        Frame.create = function create(properties) {
            return new Frame(properties);
        };

        /**
         * Encodes the specified Frame message. Does not implicitly {@link motion.Frame.verify|verify} messages.
         * @function encode
         * @memberof motion.Frame
         * @static
         * @param {motion.IFrame} message Frame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Frame.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.frameNumber != null && Object.hasOwnProperty.call(message, "frameNumber"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.frameNumber);
            if (message.frameNanos != null && Object.hasOwnProperty.call(message, "frameNanos"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.frameNanos);
            if (message.viewHierarchy != null && Object.hasOwnProperty.call(message, "viewHierarchy"))
                $root.motion.ViewNode.encode(message.viewHierarchy, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.videoTimeSeconds != null && Object.hasOwnProperty.call(message, "videoTimeSeconds"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.videoTimeSeconds);
            return writer;
        };

        /**
         * Encodes the specified Frame message, length delimited. Does not implicitly {@link motion.Frame.verify|verify} messages.
         * @function encodeDelimited
         * @memberof motion.Frame
         * @static
         * @param {motion.IFrame} message Frame message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Frame.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Frame message from the specified reader or buffer.
         * @function decode
         * @memberof motion.Frame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {motion.Frame} Frame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Frame.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.motion.Frame();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.frameNumber = reader.int64();
                        break;
                    }
                case 2: {
                        message.frameNanos = reader.int64();
                        break;
                    }
                case 4: {
                        message.videoTimeSeconds = reader.double();
                        break;
                    }
                case 3: {
                        message.viewHierarchy = $root.motion.ViewNode.decode(reader, reader.uint32());
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
         * Decodes a Frame message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof motion.Frame
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {motion.Frame} Frame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Frame.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Frame message.
         * @function verify
         * @memberof motion.Frame
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Frame.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.frameNumber != null && message.hasOwnProperty("frameNumber"))
                if (!$util.isInteger(message.frameNumber) && !(message.frameNumber && $util.isInteger(message.frameNumber.low) && $util.isInteger(message.frameNumber.high)))
                    return "frameNumber: integer|Long expected";
            if (message.frameNanos != null && message.hasOwnProperty("frameNanos"))
                if (!$util.isInteger(message.frameNanos) && !(message.frameNanos && $util.isInteger(message.frameNanos.low) && $util.isInteger(message.frameNanos.high)))
                    return "frameNanos: integer|Long expected";
            if (message.videoTimeSeconds != null && message.hasOwnProperty("videoTimeSeconds"))
                if (typeof message.videoTimeSeconds !== "number")
                    return "videoTimeSeconds: number expected";
            if (message.viewHierarchy != null && message.hasOwnProperty("viewHierarchy")) {
                let error = $root.motion.ViewNode.verify(message.viewHierarchy);
                if (error)
                    return "viewHierarchy." + error;
            }
            return null;
        };

        /**
         * Creates a Frame message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof motion.Frame
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {motion.Frame} Frame
         */
        Frame.fromObject = function fromObject(object) {
            if (object instanceof $root.motion.Frame)
                return object;
            let message = new $root.motion.Frame();
            if (object.frameNumber != null)
                if ($util.Long)
                    (message.frameNumber = $util.Long.fromValue(object.frameNumber)).unsigned = false;
                else if (typeof object.frameNumber === "string")
                    message.frameNumber = parseInt(object.frameNumber, 10);
                else if (typeof object.frameNumber === "number")
                    message.frameNumber = object.frameNumber;
                else if (typeof object.frameNumber === "object")
                    message.frameNumber = new $util.LongBits(object.frameNumber.low >>> 0, object.frameNumber.high >>> 0).toNumber();
            if (object.frameNanos != null)
                if ($util.Long)
                    (message.frameNanos = $util.Long.fromValue(object.frameNanos)).unsigned = false;
                else if (typeof object.frameNanos === "string")
                    message.frameNanos = parseInt(object.frameNanos, 10);
                else if (typeof object.frameNanos === "number")
                    message.frameNanos = object.frameNanos;
                else if (typeof object.frameNanos === "object")
                    message.frameNanos = new $util.LongBits(object.frameNanos.low >>> 0, object.frameNanos.high >>> 0).toNumber();
            if (object.videoTimeSeconds != null)
                message.videoTimeSeconds = Number(object.videoTimeSeconds);
            if (object.viewHierarchy != null) {
                if (typeof object.viewHierarchy !== "object")
                    throw TypeError(".motion.Frame.viewHierarchy: object expected");
                message.viewHierarchy = $root.motion.ViewNode.fromObject(object.viewHierarchy);
            }
            return message;
        };

        /**
         * Creates a plain object from a Frame message. Also converts values to other types if specified.
         * @function toObject
         * @memberof motion.Frame
         * @static
         * @param {motion.Frame} message Frame
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Frame.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.frameNumber = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.frameNumber = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.frameNanos = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.frameNanos = options.longs === String ? "0" : 0;
                object.viewHierarchy = null;
                object.videoTimeSeconds = 0;
            }
            if (message.frameNumber != null && message.hasOwnProperty("frameNumber"))
                if (typeof message.frameNumber === "number")
                    object.frameNumber = options.longs === String ? String(message.frameNumber) : message.frameNumber;
                else
                    object.frameNumber = options.longs === String ? $util.Long.prototype.toString.call(message.frameNumber) : options.longs === Number ? new $util.LongBits(message.frameNumber.low >>> 0, message.frameNumber.high >>> 0).toNumber() : message.frameNumber;
            if (message.frameNanos != null && message.hasOwnProperty("frameNanos"))
                if (typeof message.frameNanos === "number")
                    object.frameNanos = options.longs === String ? String(message.frameNanos) : message.frameNanos;
                else
                    object.frameNanos = options.longs === String ? $util.Long.prototype.toString.call(message.frameNanos) : options.longs === Number ? new $util.LongBits(message.frameNanos.low >>> 0, message.frameNanos.high >>> 0).toNumber() : message.frameNanos;
            if (message.viewHierarchy != null && message.hasOwnProperty("viewHierarchy"))
                object.viewHierarchy = $root.motion.ViewNode.toObject(message.viewHierarchy, options);
            if (message.videoTimeSeconds != null && message.hasOwnProperty("videoTimeSeconds"))
                object.videoTimeSeconds = options.json && !isFinite(message.videoTimeSeconds) ? String(message.videoTimeSeconds) : message.videoTimeSeconds;
            return object;
        };

        /**
         * Converts this Frame to JSON.
         * @function toJSON
         * @memberof motion.Frame
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Frame.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Frame
         * @function getTypeUrl
         * @memberof motion.Frame
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Frame.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/motion.Frame";
        };

        return Frame;
    })();

    motion.ViewNode = (function() {

        /**
         * Properties of a ViewNode.
         * @memberof motion
         * @interface IViewNode
         * @property {string|null} [classname] ViewNode classname
         * @property {number|null} [hashcode] ViewNode hashcode
         * @property {Array.<motion.IViewNode>|null} [children] ViewNode children
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
         * @memberof motion
         * @classdesc Represents a ViewNode.
         * @implements IViewNode
         * @constructor
         * @param {motion.IViewNode=} [properties] Properties to set
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
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.classname = "";

        /**
         * ViewNode hashcode.
         * @member {number} hashcode
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.hashcode = 0;

        /**
         * ViewNode children.
         * @member {Array.<motion.IViewNode>} children
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.children = $util.emptyArray;

        /**
         * ViewNode id.
         * @member {string} id
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.id = "";

        /**
         * ViewNode left.
         * @member {number} left
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.left = 0;

        /**
         * ViewNode top.
         * @member {number} top
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.top = 0;

        /**
         * ViewNode width.
         * @member {number} width
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.width = 0;

        /**
         * ViewNode height.
         * @member {number} height
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.height = 0;

        /**
         * ViewNode scrollX.
         * @member {number} scrollX
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.scrollX = 0;

        /**
         * ViewNode scrollY.
         * @member {number} scrollY
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.scrollY = 0;

        /**
         * ViewNode translationX.
         * @member {number} translationX
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.translationX = 0;

        /**
         * ViewNode translationY.
         * @member {number} translationY
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.translationY = 0;

        /**
         * ViewNode scaleX.
         * @member {number} scaleX
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.scaleX = 0;

        /**
         * ViewNode scaleY.
         * @member {number} scaleY
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.scaleY = 0;

        /**
         * ViewNode alpha.
         * @member {number} alpha
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.alpha = 0;

        /**
         * ViewNode willNotDraw.
         * @member {boolean} willNotDraw
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.willNotDraw = false;

        /**
         * ViewNode clipChildren.
         * @member {boolean} clipChildren
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.clipChildren = false;

        /**
         * ViewNode visibility.
         * @member {number} visibility
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.visibility = 0;

        /**
         * ViewNode elevation.
         * @member {number} elevation
         * @memberof motion.ViewNode
         * @instance
         */
        ViewNode.prototype.elevation = 0;

        /**
         * Creates a new ViewNode instance using the specified properties.
         * @function create
         * @memberof motion.ViewNode
         * @static
         * @param {motion.IViewNode=} [properties] Properties to set
         * @returns {motion.ViewNode} ViewNode instance
         */
        ViewNode.create = function create(properties) {
            return new ViewNode(properties);
        };

        /**
         * Encodes the specified ViewNode message. Does not implicitly {@link motion.ViewNode.verify|verify} messages.
         * @function encode
         * @memberof motion.ViewNode
         * @static
         * @param {motion.IViewNode} message ViewNode message or plain object to encode
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
                    $root.motion.ViewNode.encode(message.children[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
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
         * Encodes the specified ViewNode message, length delimited. Does not implicitly {@link motion.ViewNode.verify|verify} messages.
         * @function encodeDelimited
         * @memberof motion.ViewNode
         * @static
         * @param {motion.IViewNode} message ViewNode message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ViewNode.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ViewNode message from the specified reader or buffer.
         * @function decode
         * @memberof motion.ViewNode
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {motion.ViewNode} ViewNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ViewNode.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.motion.ViewNode();
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
                        message.children.push($root.motion.ViewNode.decode(reader, reader.uint32()));
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
         * @memberof motion.ViewNode
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {motion.ViewNode} ViewNode
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
         * @memberof motion.ViewNode
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
                    let error = $root.motion.ViewNode.verify(message.children[i]);
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
         * @memberof motion.ViewNode
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {motion.ViewNode} ViewNode
         */
        ViewNode.fromObject = function fromObject(object) {
            if (object instanceof $root.motion.ViewNode)
                return object;
            let message = new $root.motion.ViewNode();
            if (object.classname != null)
                message.classname = String(object.classname);
            if (object.hashcode != null)
                message.hashcode = object.hashcode | 0;
            if (object.children) {
                if (!Array.isArray(object.children))
                    throw TypeError(".motion.ViewNode.children: array expected");
                message.children = [];
                for (let i = 0; i < object.children.length; ++i) {
                    if (typeof object.children[i] !== "object")
                        throw TypeError(".motion.ViewNode.children: object expected");
                    message.children[i] = $root.motion.ViewNode.fromObject(object.children[i]);
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
         * @memberof motion.ViewNode
         * @static
         * @param {motion.ViewNode} message ViewNode
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
                object.scaleX = 0;
                object.scaleY = 0;
                object.alpha = 0;
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
                    object.children[j] = $root.motion.ViewNode.toObject(message.children[j], options);
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
         * @memberof motion.ViewNode
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ViewNode.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ViewNode
         * @function getTypeUrl
         * @memberof motion.ViewNode
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ViewNode.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/motion.ViewNode";
        };

        return ViewNode;
    })();

    return motion;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
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
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        protobuf.Duration = (function() {

            /**
             * Properties of a Duration.
             * @memberof google.protobuf
             * @interface IDuration
             * @property {number|Long|null} [seconds] Duration seconds
             * @property {number|null} [nanos] Duration nanos
             */

            /**
             * Constructs a new Duration.
             * @memberof google.protobuf
             * @classdesc Represents a Duration.
             * @implements IDuration
             * @constructor
             * @param {google.protobuf.IDuration=} [properties] Properties to set
             */
            function Duration(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Duration seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Duration nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.nanos = 0;

            /**
             * Creates a new Duration instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration=} [properties] Properties to set
             * @returns {google.protobuf.Duration} Duration instance
             */
            Duration.create = function create(properties) {
                return new Duration(properties);
            };

            /**
             * Encodes the specified Duration message. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration} message Duration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Duration.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Duration message, length delimited. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration} message Duration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Duration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Duration message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Duration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Duration} Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Duration.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Duration();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
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
             * Decodes a Duration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Duration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Duration} Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Duration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Duration message.
             * @function verify
             * @memberof google.protobuf.Duration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Duration.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Duration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Duration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Duration} Duration
             */
            Duration.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Duration)
                    return object;
                let message = new $root.google.protobuf.Duration();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Duration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.Duration} message Duration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Duration.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Duration to JSON.
             * @function toJSON
             * @memberof google.protobuf.Duration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Duration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Duration
             * @function getTypeUrl
             * @memberof google.protobuf.Duration
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Duration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Duration";
            };

            return Duration;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
