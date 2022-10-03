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
import * as $protobuf from 'protobufjs/minimal';

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {});

export const com = ($root.com = (() => {
  /**
   * Namespace com.
   * @exports com
   * @namespace
   */
  const com = {};

  com.android = (function () {
    /**
     * Namespace android.
     * @memberof com
     * @namespace
     */
    const android = {};

    android.motion = (function () {
      /**
       * Namespace motion.
       * @memberof com.android
       * @namespace
       */
      const motion = {};

      motion.MotionToolsRequest = (function () {
        /**
         * Properties of a MotionToolsRequest.
         * @memberof com.android.motion
         * @interface IMotionToolsRequest
         * @property {com.android.motion.IHandshakeRequest|null} [handshake] MotionToolsRequest handshake
         * @property {com.android.motion.IBeginTraceRequest|null} [beginTrace] MotionToolsRequest beginTrace
         * @property {com.android.motion.IEndTraceRequest|null} [endTrace] MotionToolsRequest endTrace
         * @property {com.android.motion.IPollTraceRequest|null} [pollTrace] MotionToolsRequest pollTrace
         */

        /**
         * Constructs a new MotionToolsRequest.
         * @memberof com.android.motion
         * @classdesc Represents a MotionToolsRequest.
         * @implements IMotionToolsRequest
         * @constructor
         * @param {com.android.motion.IMotionToolsRequest=} [properties] Properties to set
         */
        function MotionToolsRequest(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * MotionToolsRequest handshake.
         * @member {com.android.motion.IHandshakeRequest|null|undefined} handshake
         * @memberof com.android.motion.MotionToolsRequest
         * @instance
         */
        MotionToolsRequest.prototype.handshake = null;

        /**
         * MotionToolsRequest beginTrace.
         * @member {com.android.motion.IBeginTraceRequest|null|undefined} beginTrace
         * @memberof com.android.motion.MotionToolsRequest
         * @instance
         */
        MotionToolsRequest.prototype.beginTrace = null;

        /**
         * MotionToolsRequest endTrace.
         * @member {com.android.motion.IEndTraceRequest|null|undefined} endTrace
         * @memberof com.android.motion.MotionToolsRequest
         * @instance
         */
        MotionToolsRequest.prototype.endTrace = null;

        /**
         * MotionToolsRequest pollTrace.
         * @member {com.android.motion.IPollTraceRequest|null|undefined} pollTrace
         * @memberof com.android.motion.MotionToolsRequest
         * @instance
         */
        MotionToolsRequest.prototype.pollTrace = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * MotionToolsRequest type.
         * @member {"handshake"|"beginTrace"|"endTrace"|"pollTrace"|undefined} type
         * @memberof com.android.motion.MotionToolsRequest
         * @instance
         */
        Object.defineProperty(MotionToolsRequest.prototype, 'type', {
          get: $util.oneOfGetter(
            ($oneOfFields = ['handshake', 'beginTrace', 'endTrace', 'pollTrace'])
          ),
          set: $util.oneOfSetter($oneOfFields),
        });

        /**
         * Creates a new MotionToolsRequest instance using the specified properties.
         * @function create
         * @memberof com.android.motion.MotionToolsRequest
         * @static
         * @param {com.android.motion.IMotionToolsRequest=} [properties] Properties to set
         * @returns {com.android.motion.MotionToolsRequest} MotionToolsRequest instance
         */
        MotionToolsRequest.create = function create(properties) {
          return new MotionToolsRequest(properties);
        };

        /**
         * Encodes the specified MotionToolsRequest message. Does not implicitly {@link com.android.motion.MotionToolsRequest.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.MotionToolsRequest
         * @static
         * @param {com.android.motion.IMotionToolsRequest} message MotionToolsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MotionToolsRequest.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.handshake != null && Object.hasOwnProperty.call(message, 'handshake'))
            $root.com.android.motion.HandshakeRequest.encode(
              message.handshake,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          if (message.beginTrace != null && Object.hasOwnProperty.call(message, 'beginTrace'))
            $root.com.android.motion.BeginTraceRequest.encode(
              message.beginTrace,
              writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
            ).ldelim();
          if (message.endTrace != null && Object.hasOwnProperty.call(message, 'endTrace'))
            $root.com.android.motion.EndTraceRequest.encode(
              message.endTrace,
              writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
            ).ldelim();
          if (message.pollTrace != null && Object.hasOwnProperty.call(message, 'pollTrace'))
            $root.com.android.motion.PollTraceRequest.encode(
              message.pollTrace,
              writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
            ).ldelim();
          return writer;
        };

        /**
         * Encodes the specified MotionToolsRequest message, length delimited. Does not implicitly {@link com.android.motion.MotionToolsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.MotionToolsRequest
         * @static
         * @param {com.android.motion.IMotionToolsRequest} message MotionToolsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MotionToolsRequest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MotionToolsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.MotionToolsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.MotionToolsRequest} MotionToolsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MotionToolsRequest.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.MotionToolsRequest();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.handshake = $root.com.android.motion.HandshakeRequest.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 2: {
                message.beginTrace = $root.com.android.motion.BeginTraceRequest.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 3: {
                message.endTrace = $root.com.android.motion.EndTraceRequest.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 4: {
                message.pollTrace = $root.com.android.motion.PollTraceRequest.decode(
                  reader,
                  reader.uint32()
                );
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
         * @memberof com.android.motion.MotionToolsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.MotionToolsRequest} MotionToolsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MotionToolsRequest.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MotionToolsRequest message.
         * @function verify
         * @memberof com.android.motion.MotionToolsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MotionToolsRequest.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          let properties = {};
          if (message.handshake != null && message.hasOwnProperty('handshake')) {
            properties.type = 1;
            {
              let error = $root.com.android.motion.HandshakeRequest.verify(message.handshake);
              if (error) return 'handshake.' + error;
            }
          }
          if (message.beginTrace != null && message.hasOwnProperty('beginTrace')) {
            if (properties.type === 1) return 'type: multiple values';
            properties.type = 1;
            {
              let error = $root.com.android.motion.BeginTraceRequest.verify(message.beginTrace);
              if (error) return 'beginTrace.' + error;
            }
          }
          if (message.endTrace != null && message.hasOwnProperty('endTrace')) {
            if (properties.type === 1) return 'type: multiple values';
            properties.type = 1;
            {
              let error = $root.com.android.motion.EndTraceRequest.verify(message.endTrace);
              if (error) return 'endTrace.' + error;
            }
          }
          if (message.pollTrace != null && message.hasOwnProperty('pollTrace')) {
            if (properties.type === 1) return 'type: multiple values';
            properties.type = 1;
            {
              let error = $root.com.android.motion.PollTraceRequest.verify(message.pollTrace);
              if (error) return 'pollTrace.' + error;
            }
          }
          return null;
        };

        /**
         * Creates a MotionToolsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.MotionToolsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.MotionToolsRequest} MotionToolsRequest
         */
        MotionToolsRequest.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.MotionToolsRequest) return object;
          let message = new $root.com.android.motion.MotionToolsRequest();
          if (object.handshake != null) {
            if (typeof object.handshake !== 'object')
              throw TypeError('.com.android.motion.MotionToolsRequest.handshake: object expected');
            message.handshake = $root.com.android.motion.HandshakeRequest.fromObject(
              object.handshake
            );
          }
          if (object.beginTrace != null) {
            if (typeof object.beginTrace !== 'object')
              throw TypeError('.com.android.motion.MotionToolsRequest.beginTrace: object expected');
            message.beginTrace = $root.com.android.motion.BeginTraceRequest.fromObject(
              object.beginTrace
            );
          }
          if (object.endTrace != null) {
            if (typeof object.endTrace !== 'object')
              throw TypeError('.com.android.motion.MotionToolsRequest.endTrace: object expected');
            message.endTrace = $root.com.android.motion.EndTraceRequest.fromObject(object.endTrace);
          }
          if (object.pollTrace != null) {
            if (typeof object.pollTrace !== 'object')
              throw TypeError('.com.android.motion.MotionToolsRequest.pollTrace: object expected');
            message.pollTrace = $root.com.android.motion.PollTraceRequest.fromObject(
              object.pollTrace
            );
          }
          return message;
        };

        /**
         * Creates a plain object from a MotionToolsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.MotionToolsRequest
         * @static
         * @param {com.android.motion.MotionToolsRequest} message MotionToolsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MotionToolsRequest.toObject = function toObject(message, options) {
          if (!options) options = {};
          let object = {};
          if (message.handshake != null && message.hasOwnProperty('handshake')) {
            object.handshake = $root.com.android.motion.HandshakeRequest.toObject(
              message.handshake,
              options
            );
            if (options.oneofs) object.type = 'handshake';
          }
          if (message.beginTrace != null && message.hasOwnProperty('beginTrace')) {
            object.beginTrace = $root.com.android.motion.BeginTraceRequest.toObject(
              message.beginTrace,
              options
            );
            if (options.oneofs) object.type = 'beginTrace';
          }
          if (message.endTrace != null && message.hasOwnProperty('endTrace')) {
            object.endTrace = $root.com.android.motion.EndTraceRequest.toObject(
              message.endTrace,
              options
            );
            if (options.oneofs) object.type = 'endTrace';
          }
          if (message.pollTrace != null && message.hasOwnProperty('pollTrace')) {
            object.pollTrace = $root.com.android.motion.PollTraceRequest.toObject(
              message.pollTrace,
              options
            );
            if (options.oneofs) object.type = 'pollTrace';
          }
          return object;
        };

        /**
         * Converts this MotionToolsRequest to JSON.
         * @function toJSON
         * @memberof com.android.motion.MotionToolsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MotionToolsRequest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MotionToolsRequest
         * @function getTypeUrl
         * @memberof com.android.motion.MotionToolsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MotionToolsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.MotionToolsRequest';
        };

        return MotionToolsRequest;
      })();

      motion.MotionToolsResponse = (function () {
        /**
         * Properties of a MotionToolsResponse.
         * @memberof com.android.motion
         * @interface IMotionToolsResponse
         * @property {com.android.motion.IErrorResponse|null} [error] MotionToolsResponse error
         * @property {com.android.motion.IHandshakeResponse|null} [handshake] MotionToolsResponse handshake
         * @property {com.android.motion.IBeginTraceResponse|null} [beginTrace] MotionToolsResponse beginTrace
         * @property {com.android.motion.IEndTraceResponse|null} [endTrace] MotionToolsResponse endTrace
         * @property {com.android.motion.IPollTraceResponse|null} [pollTrace] MotionToolsResponse pollTrace
         */

        /**
         * Constructs a new MotionToolsResponse.
         * @memberof com.android.motion
         * @classdesc Represents a MotionToolsResponse.
         * @implements IMotionToolsResponse
         * @constructor
         * @param {com.android.motion.IMotionToolsResponse=} [properties] Properties to set
         */
        function MotionToolsResponse(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * MotionToolsResponse error.
         * @member {com.android.motion.IErrorResponse|null|undefined} error
         * @memberof com.android.motion.MotionToolsResponse
         * @instance
         */
        MotionToolsResponse.prototype.error = null;

        /**
         * MotionToolsResponse handshake.
         * @member {com.android.motion.IHandshakeResponse|null|undefined} handshake
         * @memberof com.android.motion.MotionToolsResponse
         * @instance
         */
        MotionToolsResponse.prototype.handshake = null;

        /**
         * MotionToolsResponse beginTrace.
         * @member {com.android.motion.IBeginTraceResponse|null|undefined} beginTrace
         * @memberof com.android.motion.MotionToolsResponse
         * @instance
         */
        MotionToolsResponse.prototype.beginTrace = null;

        /**
         * MotionToolsResponse endTrace.
         * @member {com.android.motion.IEndTraceResponse|null|undefined} endTrace
         * @memberof com.android.motion.MotionToolsResponse
         * @instance
         */
        MotionToolsResponse.prototype.endTrace = null;

        /**
         * MotionToolsResponse pollTrace.
         * @member {com.android.motion.IPollTraceResponse|null|undefined} pollTrace
         * @memberof com.android.motion.MotionToolsResponse
         * @instance
         */
        MotionToolsResponse.prototype.pollTrace = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * MotionToolsResponse type.
         * @member {"error"|"handshake"|"beginTrace"|"endTrace"|"pollTrace"|undefined} type
         * @memberof com.android.motion.MotionToolsResponse
         * @instance
         */
        Object.defineProperty(MotionToolsResponse.prototype, 'type', {
          get: $util.oneOfGetter(
            ($oneOfFields = ['error', 'handshake', 'beginTrace', 'endTrace', 'pollTrace'])
          ),
          set: $util.oneOfSetter($oneOfFields),
        });

        /**
         * Creates a new MotionToolsResponse instance using the specified properties.
         * @function create
         * @memberof com.android.motion.MotionToolsResponse
         * @static
         * @param {com.android.motion.IMotionToolsResponse=} [properties] Properties to set
         * @returns {com.android.motion.MotionToolsResponse} MotionToolsResponse instance
         */
        MotionToolsResponse.create = function create(properties) {
          return new MotionToolsResponse(properties);
        };

        /**
         * Encodes the specified MotionToolsResponse message. Does not implicitly {@link com.android.motion.MotionToolsResponse.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.MotionToolsResponse
         * @static
         * @param {com.android.motion.IMotionToolsResponse} message MotionToolsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MotionToolsResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.error != null && Object.hasOwnProperty.call(message, 'error'))
            $root.com.android.motion.ErrorResponse.encode(
              message.error,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          if (message.handshake != null && Object.hasOwnProperty.call(message, 'handshake'))
            $root.com.android.motion.HandshakeResponse.encode(
              message.handshake,
              writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
            ).ldelim();
          if (message.beginTrace != null && Object.hasOwnProperty.call(message, 'beginTrace'))
            $root.com.android.motion.BeginTraceResponse.encode(
              message.beginTrace,
              writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
            ).ldelim();
          if (message.endTrace != null && Object.hasOwnProperty.call(message, 'endTrace'))
            $root.com.android.motion.EndTraceResponse.encode(
              message.endTrace,
              writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
            ).ldelim();
          if (message.pollTrace != null && Object.hasOwnProperty.call(message, 'pollTrace'))
            $root.com.android.motion.PollTraceResponse.encode(
              message.pollTrace,
              writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
            ).ldelim();
          return writer;
        };

        /**
         * Encodes the specified MotionToolsResponse message, length delimited. Does not implicitly {@link com.android.motion.MotionToolsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.MotionToolsResponse
         * @static
         * @param {com.android.motion.IMotionToolsResponse} message MotionToolsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MotionToolsResponse.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MotionToolsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.MotionToolsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.MotionToolsResponse} MotionToolsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MotionToolsResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.MotionToolsResponse();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.error = $root.com.android.motion.ErrorResponse.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 2: {
                message.handshake = $root.com.android.motion.HandshakeResponse.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 3: {
                message.beginTrace = $root.com.android.motion.BeginTraceResponse.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 4: {
                message.endTrace = $root.com.android.motion.EndTraceResponse.decode(
                  reader,
                  reader.uint32()
                );
                break;
              }
              case 5: {
                message.pollTrace = $root.com.android.motion.PollTraceResponse.decode(
                  reader,
                  reader.uint32()
                );
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
         * @memberof com.android.motion.MotionToolsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.MotionToolsResponse} MotionToolsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MotionToolsResponse.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MotionToolsResponse message.
         * @function verify
         * @memberof com.android.motion.MotionToolsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MotionToolsResponse.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          let properties = {};
          if (message.error != null && message.hasOwnProperty('error')) {
            properties.type = 1;
            {
              let error = $root.com.android.motion.ErrorResponse.verify(message.error);
              if (error) return 'error.' + error;
            }
          }
          if (message.handshake != null && message.hasOwnProperty('handshake')) {
            if (properties.type === 1) return 'type: multiple values';
            properties.type = 1;
            {
              let error = $root.com.android.motion.HandshakeResponse.verify(message.handshake);
              if (error) return 'handshake.' + error;
            }
          }
          if (message.beginTrace != null && message.hasOwnProperty('beginTrace')) {
            if (properties.type === 1) return 'type: multiple values';
            properties.type = 1;
            {
              let error = $root.com.android.motion.BeginTraceResponse.verify(message.beginTrace);
              if (error) return 'beginTrace.' + error;
            }
          }
          if (message.endTrace != null && message.hasOwnProperty('endTrace')) {
            if (properties.type === 1) return 'type: multiple values';
            properties.type = 1;
            {
              let error = $root.com.android.motion.EndTraceResponse.verify(message.endTrace);
              if (error) return 'endTrace.' + error;
            }
          }
          if (message.pollTrace != null && message.hasOwnProperty('pollTrace')) {
            if (properties.type === 1) return 'type: multiple values';
            properties.type = 1;
            {
              let error = $root.com.android.motion.PollTraceResponse.verify(message.pollTrace);
              if (error) return 'pollTrace.' + error;
            }
          }
          return null;
        };

        /**
         * Creates a MotionToolsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.MotionToolsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.MotionToolsResponse} MotionToolsResponse
         */
        MotionToolsResponse.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.MotionToolsResponse) return object;
          let message = new $root.com.android.motion.MotionToolsResponse();
          if (object.error != null) {
            if (typeof object.error !== 'object')
              throw TypeError('.com.android.motion.MotionToolsResponse.error: object expected');
            message.error = $root.com.android.motion.ErrorResponse.fromObject(object.error);
          }
          if (object.handshake != null) {
            if (typeof object.handshake !== 'object')
              throw TypeError('.com.android.motion.MotionToolsResponse.handshake: object expected');
            message.handshake = $root.com.android.motion.HandshakeResponse.fromObject(
              object.handshake
            );
          }
          if (object.beginTrace != null) {
            if (typeof object.beginTrace !== 'object')
              throw TypeError(
                '.com.android.motion.MotionToolsResponse.beginTrace: object expected'
              );
            message.beginTrace = $root.com.android.motion.BeginTraceResponse.fromObject(
              object.beginTrace
            );
          }
          if (object.endTrace != null) {
            if (typeof object.endTrace !== 'object')
              throw TypeError('.com.android.motion.MotionToolsResponse.endTrace: object expected');
            message.endTrace = $root.com.android.motion.EndTraceResponse.fromObject(
              object.endTrace
            );
          }
          if (object.pollTrace != null) {
            if (typeof object.pollTrace !== 'object')
              throw TypeError('.com.android.motion.MotionToolsResponse.pollTrace: object expected');
            message.pollTrace = $root.com.android.motion.PollTraceResponse.fromObject(
              object.pollTrace
            );
          }
          return message;
        };

        /**
         * Creates a plain object from a MotionToolsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.MotionToolsResponse
         * @static
         * @param {com.android.motion.MotionToolsResponse} message MotionToolsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MotionToolsResponse.toObject = function toObject(message, options) {
          if (!options) options = {};
          let object = {};
          if (message.error != null && message.hasOwnProperty('error')) {
            object.error = $root.com.android.motion.ErrorResponse.toObject(message.error, options);
            if (options.oneofs) object.type = 'error';
          }
          if (message.handshake != null && message.hasOwnProperty('handshake')) {
            object.handshake = $root.com.android.motion.HandshakeResponse.toObject(
              message.handshake,
              options
            );
            if (options.oneofs) object.type = 'handshake';
          }
          if (message.beginTrace != null && message.hasOwnProperty('beginTrace')) {
            object.beginTrace = $root.com.android.motion.BeginTraceResponse.toObject(
              message.beginTrace,
              options
            );
            if (options.oneofs) object.type = 'beginTrace';
          }
          if (message.endTrace != null && message.hasOwnProperty('endTrace')) {
            object.endTrace = $root.com.android.motion.EndTraceResponse.toObject(
              message.endTrace,
              options
            );
            if (options.oneofs) object.type = 'endTrace';
          }
          if (message.pollTrace != null && message.hasOwnProperty('pollTrace')) {
            object.pollTrace = $root.com.android.motion.PollTraceResponse.toObject(
              message.pollTrace,
              options
            );
            if (options.oneofs) object.type = 'pollTrace';
          }
          return object;
        };

        /**
         * Converts this MotionToolsResponse to JSON.
         * @function toJSON
         * @memberof com.android.motion.MotionToolsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MotionToolsResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MotionToolsResponse
         * @function getTypeUrl
         * @memberof com.android.motion.MotionToolsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MotionToolsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.MotionToolsResponse';
        };

        return MotionToolsResponse;
      })();

      motion.ErrorResponse = (function () {
        /**
         * Properties of an ErrorResponse.
         * @memberof com.android.motion
         * @interface IErrorResponse
         * @property {com.android.motion.ErrorResponse.Code|null} [code] ErrorResponse code
         * @property {string|null} [message] ErrorResponse message
         */

        /**
         * Constructs a new ErrorResponse.
         * @memberof com.android.motion
         * @classdesc Represents an ErrorResponse.
         * @implements IErrorResponse
         * @constructor
         * @param {com.android.motion.IErrorResponse=} [properties] Properties to set
         */
        function ErrorResponse(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorResponse code.
         * @member {com.android.motion.ErrorResponse.Code} code
         * @memberof com.android.motion.ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.code = 0;

        /**
         * ErrorResponse message.
         * @member {string} message
         * @memberof com.android.motion.ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.message = '';

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @function create
         * @memberof com.android.motion.ErrorResponse
         * @static
         * @param {com.android.motion.IErrorResponse=} [properties] Properties to set
         * @returns {com.android.motion.ErrorResponse} ErrorResponse instance
         */
        ErrorResponse.create = function create(properties) {
          return new ErrorResponse(properties);
        };

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link com.android.motion.ErrorResponse.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.ErrorResponse
         * @static
         * @param {com.android.motion.IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.code != null && Object.hasOwnProperty.call(message, 'code'))
            writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.code);
          if (message.message != null && Object.hasOwnProperty.call(message, 'message'))
            writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.message);
          return writer;
        };

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link com.android.motion.ErrorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.ErrorResponse
         * @static
         * @param {com.android.motion.IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.ErrorResponse} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.ErrorResponse();
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
         * @memberof com.android.motion.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.ErrorResponse} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorResponse message.
         * @function verify
         * @memberof com.android.motion.ErrorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorResponse.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          if (message.code != null && message.hasOwnProperty('code'))
            switch (message.code) {
              default:
                return 'code: enum value expected';
              case 0:
              case 1:
                break;
            }
          if (message.message != null && message.hasOwnProperty('message'))
            if (!$util.isString(message.message)) return 'message: string expected';
          return null;
        };

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.ErrorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.ErrorResponse} ErrorResponse
         */
        ErrorResponse.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.ErrorResponse) return object;
          let message = new $root.com.android.motion.ErrorResponse();
          switch (object.code) {
            default:
              if (typeof object.code === 'number') {
                message.code = object.code;
                break;
              }
              break;
            case 'UNKNOWN':
            case 0:
              message.code = 0;
              break;
            case 'INVALID_REQUEST':
            case 1:
              message.code = 1;
              break;
          }
          if (object.message != null) message.message = String(object.message);
          return message;
        };

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.ErrorResponse
         * @static
         * @param {com.android.motion.ErrorResponse} message ErrorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorResponse.toObject = function toObject(message, options) {
          if (!options) options = {};
          let object = {};
          if (options.defaults) {
            object.code = options.enums === String ? 'UNKNOWN' : 0;
            object.message = '';
          }
          if (message.code != null && message.hasOwnProperty('code'))
            object.code =
              options.enums === String
                ? $root.com.android.motion.ErrorResponse.Code[message.code] === undefined
                  ? message.code
                  : $root.com.android.motion.ErrorResponse.Code[message.code]
                : message.code;
          if (message.message != null && message.hasOwnProperty('message'))
            object.message = message.message;
          return object;
        };

        /**
         * Converts this ErrorResponse to JSON.
         * @function toJSON
         * @memberof com.android.motion.ErrorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ErrorResponse
         * @function getTypeUrl
         * @memberof com.android.motion.ErrorResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ErrorResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.ErrorResponse';
        };

        /**
         * Code enum.
         * @name com.android.motion.ErrorResponse.Code
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} INVALID_REQUEST=1 INVALID_REQUEST value
         */
        ErrorResponse.Code = (function () {
          const valuesById = {},
            values = Object.create(valuesById);
          values[(valuesById[0] = 'UNKNOWN')] = 0;
          values[(valuesById[1] = 'INVALID_REQUEST')] = 1;
          return values;
        })();

        return ErrorResponse;
      })();

      motion.WindowIdentifier = (function () {
        /**
         * Properties of a WindowIdentifier.
         * @memberof com.android.motion
         * @interface IWindowIdentifier
         * @property {string|null} [rootWindow] WindowIdentifier rootWindow
         */

        /**
         * Constructs a new WindowIdentifier.
         * @memberof com.android.motion
         * @classdesc Represents a WindowIdentifier.
         * @implements IWindowIdentifier
         * @constructor
         * @param {com.android.motion.IWindowIdentifier=} [properties] Properties to set
         */
        function WindowIdentifier(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * WindowIdentifier rootWindow.
         * @member {string} rootWindow
         * @memberof com.android.motion.WindowIdentifier
         * @instance
         */
        WindowIdentifier.prototype.rootWindow = '';

        /**
         * Creates a new WindowIdentifier instance using the specified properties.
         * @function create
         * @memberof com.android.motion.WindowIdentifier
         * @static
         * @param {com.android.motion.IWindowIdentifier=} [properties] Properties to set
         * @returns {com.android.motion.WindowIdentifier} WindowIdentifier instance
         */
        WindowIdentifier.create = function create(properties) {
          return new WindowIdentifier(properties);
        };

        /**
         * Encodes the specified WindowIdentifier message. Does not implicitly {@link com.android.motion.WindowIdentifier.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.WindowIdentifier
         * @static
         * @param {com.android.motion.IWindowIdentifier} message WindowIdentifier message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WindowIdentifier.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.rootWindow != null && Object.hasOwnProperty.call(message, 'rootWindow'))
            writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.rootWindow);
          return writer;
        };

        /**
         * Encodes the specified WindowIdentifier message, length delimited. Does not implicitly {@link com.android.motion.WindowIdentifier.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.WindowIdentifier
         * @static
         * @param {com.android.motion.IWindowIdentifier} message WindowIdentifier message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WindowIdentifier.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a WindowIdentifier message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.WindowIdentifier
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.WindowIdentifier} WindowIdentifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WindowIdentifier.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.WindowIdentifier();
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
         * @memberof com.android.motion.WindowIdentifier
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.WindowIdentifier} WindowIdentifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WindowIdentifier.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WindowIdentifier message.
         * @function verify
         * @memberof com.android.motion.WindowIdentifier
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WindowIdentifier.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          if (message.rootWindow != null && message.hasOwnProperty('rootWindow'))
            if (!$util.isString(message.rootWindow)) return 'rootWindow: string expected';
          return null;
        };

        /**
         * Creates a WindowIdentifier message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.WindowIdentifier
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.WindowIdentifier} WindowIdentifier
         */
        WindowIdentifier.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.WindowIdentifier) return object;
          let message = new $root.com.android.motion.WindowIdentifier();
          if (object.rootWindow != null) message.rootWindow = String(object.rootWindow);
          return message;
        };

        /**
         * Creates a plain object from a WindowIdentifier message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.WindowIdentifier
         * @static
         * @param {com.android.motion.WindowIdentifier} message WindowIdentifier
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WindowIdentifier.toObject = function toObject(message, options) {
          if (!options) options = {};
          let object = {};
          if (options.defaults) object.rootWindow = '';
          if (message.rootWindow != null && message.hasOwnProperty('rootWindow'))
            object.rootWindow = message.rootWindow;
          return object;
        };

        /**
         * Converts this WindowIdentifier to JSON.
         * @function toJSON
         * @memberof com.android.motion.WindowIdentifier
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WindowIdentifier.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WindowIdentifier
         * @function getTypeUrl
         * @memberof com.android.motion.WindowIdentifier
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WindowIdentifier.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.WindowIdentifier';
        };

        return WindowIdentifier;
      })();

      motion.HandshakeRequest = (function () {
        /**
         * Properties of a HandshakeRequest.
         * @memberof com.android.motion
         * @interface IHandshakeRequest
         * @property {com.android.motion.IWindowIdentifier|null} [window] HandshakeRequest window
         * @property {number|null} [clientVersion] HandshakeRequest clientVersion
         */

        /**
         * Constructs a new HandshakeRequest.
         * @memberof com.android.motion
         * @classdesc Represents a HandshakeRequest.
         * @implements IHandshakeRequest
         * @constructor
         * @param {com.android.motion.IHandshakeRequest=} [properties] Properties to set
         */
        function HandshakeRequest(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * HandshakeRequest window.
         * @member {com.android.motion.IWindowIdentifier|null|undefined} window
         * @memberof com.android.motion.HandshakeRequest
         * @instance
         */
        HandshakeRequest.prototype.window = null;

        /**
         * HandshakeRequest clientVersion.
         * @member {number} clientVersion
         * @memberof com.android.motion.HandshakeRequest
         * @instance
         */
        HandshakeRequest.prototype.clientVersion = 0;

        /**
         * Creates a new HandshakeRequest instance using the specified properties.
         * @function create
         * @memberof com.android.motion.HandshakeRequest
         * @static
         * @param {com.android.motion.IHandshakeRequest=} [properties] Properties to set
         * @returns {com.android.motion.HandshakeRequest} HandshakeRequest instance
         */
        HandshakeRequest.create = function create(properties) {
          return new HandshakeRequest(properties);
        };

        /**
         * Encodes the specified HandshakeRequest message. Does not implicitly {@link com.android.motion.HandshakeRequest.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.HandshakeRequest
         * @static
         * @param {com.android.motion.IHandshakeRequest} message HandshakeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HandshakeRequest.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.window != null && Object.hasOwnProperty.call(message, 'window'))
            $root.com.android.motion.WindowIdentifier.encode(
              message.window,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          if (message.clientVersion != null && Object.hasOwnProperty.call(message, 'clientVersion'))
            writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.clientVersion);
          return writer;
        };

        /**
         * Encodes the specified HandshakeRequest message, length delimited. Does not implicitly {@link com.android.motion.HandshakeRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.HandshakeRequest
         * @static
         * @param {com.android.motion.IHandshakeRequest} message HandshakeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HandshakeRequest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HandshakeRequest message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.HandshakeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.HandshakeRequest} HandshakeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HandshakeRequest.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.HandshakeRequest();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.window = $root.com.android.motion.WindowIdentifier.decode(
                  reader,
                  reader.uint32()
                );
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
         * @memberof com.android.motion.HandshakeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.HandshakeRequest} HandshakeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HandshakeRequest.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HandshakeRequest message.
         * @function verify
         * @memberof com.android.motion.HandshakeRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HandshakeRequest.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          if (message.window != null && message.hasOwnProperty('window')) {
            let error = $root.com.android.motion.WindowIdentifier.verify(message.window);
            if (error) return 'window.' + error;
          }
          if (message.clientVersion != null && message.hasOwnProperty('clientVersion'))
            if (!$util.isInteger(message.clientVersion)) return 'clientVersion: integer expected';
          return null;
        };

        /**
         * Creates a HandshakeRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.HandshakeRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.HandshakeRequest} HandshakeRequest
         */
        HandshakeRequest.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.HandshakeRequest) return object;
          let message = new $root.com.android.motion.HandshakeRequest();
          if (object.window != null) {
            if (typeof object.window !== 'object')
              throw TypeError('.com.android.motion.HandshakeRequest.window: object expected');
            message.window = $root.com.android.motion.WindowIdentifier.fromObject(object.window);
          }
          if (object.clientVersion != null) message.clientVersion = object.clientVersion | 0;
          return message;
        };

        /**
         * Creates a plain object from a HandshakeRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.HandshakeRequest
         * @static
         * @param {com.android.motion.HandshakeRequest} message HandshakeRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HandshakeRequest.toObject = function toObject(message, options) {
          if (!options) options = {};
          let object = {};
          if (options.defaults) {
            object.window = null;
            object.clientVersion = 0;
          }
          if (message.window != null && message.hasOwnProperty('window'))
            object.window = $root.com.android.motion.WindowIdentifier.toObject(
              message.window,
              options
            );
          if (message.clientVersion != null && message.hasOwnProperty('clientVersion'))
            object.clientVersion = message.clientVersion;
          return object;
        };

        /**
         * Converts this HandshakeRequest to JSON.
         * @function toJSON
         * @memberof com.android.motion.HandshakeRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HandshakeRequest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HandshakeRequest
         * @function getTypeUrl
         * @memberof com.android.motion.HandshakeRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HandshakeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.HandshakeRequest';
        };

        return HandshakeRequest;
      })();

      motion.HandshakeResponse = (function () {
        /**
         * Properties of a HandshakeResponse.
         * @memberof com.android.motion
         * @interface IHandshakeResponse
         * @property {com.android.motion.HandshakeResponse.Status|null} [status] HandshakeResponse status
         * @property {number|null} [serverVersion] HandshakeResponse serverVersion
         */

        /**
         * Constructs a new HandshakeResponse.
         * @memberof com.android.motion
         * @classdesc Represents a HandshakeResponse.
         * @implements IHandshakeResponse
         * @constructor
         * @param {com.android.motion.IHandshakeResponse=} [properties] Properties to set
         */
        function HandshakeResponse(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * HandshakeResponse status.
         * @member {com.android.motion.HandshakeResponse.Status} status
         * @memberof com.android.motion.HandshakeResponse
         * @instance
         */
        HandshakeResponse.prototype.status = 1;

        /**
         * HandshakeResponse serverVersion.
         * @member {number} serverVersion
         * @memberof com.android.motion.HandshakeResponse
         * @instance
         */
        HandshakeResponse.prototype.serverVersion = 0;

        /**
         * Creates a new HandshakeResponse instance using the specified properties.
         * @function create
         * @memberof com.android.motion.HandshakeResponse
         * @static
         * @param {com.android.motion.IHandshakeResponse=} [properties] Properties to set
         * @returns {com.android.motion.HandshakeResponse} HandshakeResponse instance
         */
        HandshakeResponse.create = function create(properties) {
          return new HandshakeResponse(properties);
        };

        /**
         * Encodes the specified HandshakeResponse message. Does not implicitly {@link com.android.motion.HandshakeResponse.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.HandshakeResponse
         * @static
         * @param {com.android.motion.IHandshakeResponse} message HandshakeResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HandshakeResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.status != null && Object.hasOwnProperty.call(message, 'status'))
            writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.status);
          if (message.serverVersion != null && Object.hasOwnProperty.call(message, 'serverVersion'))
            writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.serverVersion);
          return writer;
        };

        /**
         * Encodes the specified HandshakeResponse message, length delimited. Does not implicitly {@link com.android.motion.HandshakeResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.HandshakeResponse
         * @static
         * @param {com.android.motion.IHandshakeResponse} message HandshakeResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HandshakeResponse.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HandshakeResponse message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.HandshakeResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.HandshakeResponse} HandshakeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HandshakeResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.HandshakeResponse();
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
         * @memberof com.android.motion.HandshakeResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.HandshakeResponse} HandshakeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HandshakeResponse.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HandshakeResponse message.
         * @function verify
         * @memberof com.android.motion.HandshakeResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HandshakeResponse.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          if (message.status != null && message.hasOwnProperty('status'))
            switch (message.status) {
              default:
                return 'status: enum value expected';
              case 1:
              case 2:
                break;
            }
          if (message.serverVersion != null && message.hasOwnProperty('serverVersion'))
            if (!$util.isInteger(message.serverVersion)) return 'serverVersion: integer expected';
          return null;
        };

        /**
         * Creates a HandshakeResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.HandshakeResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.HandshakeResponse} HandshakeResponse
         */
        HandshakeResponse.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.HandshakeResponse) return object;
          let message = new $root.com.android.motion.HandshakeResponse();
          switch (object.status) {
            default:
              if (typeof object.status === 'number') {
                message.status = object.status;
                break;
              }
              break;
            case 'OK':
            case 1:
              message.status = 1;
              break;
            case 'WINDOW_NOT_FOUND':
            case 2:
              message.status = 2;
              break;
          }
          if (object.serverVersion != null) message.serverVersion = object.serverVersion | 0;
          return message;
        };

        /**
         * Creates a plain object from a HandshakeResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.HandshakeResponse
         * @static
         * @param {com.android.motion.HandshakeResponse} message HandshakeResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HandshakeResponse.toObject = function toObject(message, options) {
          if (!options) options = {};
          let object = {};
          if (options.defaults) {
            object.status = options.enums === String ? 'OK' : 1;
            object.serverVersion = 0;
          }
          if (message.status != null && message.hasOwnProperty('status'))
            object.status =
              options.enums === String
                ? $root.com.android.motion.HandshakeResponse.Status[message.status] === undefined
                  ? message.status
                  : $root.com.android.motion.HandshakeResponse.Status[message.status]
                : message.status;
          if (message.serverVersion != null && message.hasOwnProperty('serverVersion'))
            object.serverVersion = message.serverVersion;
          return object;
        };

        /**
         * Converts this HandshakeResponse to JSON.
         * @function toJSON
         * @memberof com.android.motion.HandshakeResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HandshakeResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HandshakeResponse
         * @function getTypeUrl
         * @memberof com.android.motion.HandshakeResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HandshakeResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.HandshakeResponse';
        };

        /**
         * Status enum.
         * @name com.android.motion.HandshakeResponse.Status
         * @enum {number}
         * @property {number} OK=1 OK value
         * @property {number} WINDOW_NOT_FOUND=2 WINDOW_NOT_FOUND value
         */
        HandshakeResponse.Status = (function () {
          const valuesById = {},
            values = Object.create(valuesById);
          values[(valuesById[1] = 'OK')] = 1;
          values[(valuesById[2] = 'WINDOW_NOT_FOUND')] = 2;
          return values;
        })();

        return HandshakeResponse;
      })();

      motion.BeginTraceRequest = (function () {
        /**
         * Properties of a BeginTraceRequest.
         * @memberof com.android.motion
         * @interface IBeginTraceRequest
         * @property {com.android.motion.IWindowIdentifier|null} [window] BeginTraceRequest window
         */

        /**
         * Constructs a new BeginTraceRequest.
         * @memberof com.android.motion
         * @classdesc Represents a BeginTraceRequest.
         * @implements IBeginTraceRequest
         * @constructor
         * @param {com.android.motion.IBeginTraceRequest=} [properties] Properties to set
         */
        function BeginTraceRequest(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * BeginTraceRequest window.
         * @member {com.android.motion.IWindowIdentifier|null|undefined} window
         * @memberof com.android.motion.BeginTraceRequest
         * @instance
         */
        BeginTraceRequest.prototype.window = null;

        /**
         * Creates a new BeginTraceRequest instance using the specified properties.
         * @function create
         * @memberof com.android.motion.BeginTraceRequest
         * @static
         * @param {com.android.motion.IBeginTraceRequest=} [properties] Properties to set
         * @returns {com.android.motion.BeginTraceRequest} BeginTraceRequest instance
         */
        BeginTraceRequest.create = function create(properties) {
          return new BeginTraceRequest(properties);
        };

        /**
         * Encodes the specified BeginTraceRequest message. Does not implicitly {@link com.android.motion.BeginTraceRequest.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.BeginTraceRequest
         * @static
         * @param {com.android.motion.IBeginTraceRequest} message BeginTraceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BeginTraceRequest.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.window != null && Object.hasOwnProperty.call(message, 'window'))
            $root.com.android.motion.WindowIdentifier.encode(
              message.window,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          return writer;
        };

        /**
         * Encodes the specified BeginTraceRequest message, length delimited. Does not implicitly {@link com.android.motion.BeginTraceRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.BeginTraceRequest
         * @static
         * @param {com.android.motion.IBeginTraceRequest} message BeginTraceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BeginTraceRequest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BeginTraceRequest message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.BeginTraceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.BeginTraceRequest} BeginTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BeginTraceRequest.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.BeginTraceRequest();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.window = $root.com.android.motion.WindowIdentifier.decode(
                  reader,
                  reader.uint32()
                );
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
         * @memberof com.android.motion.BeginTraceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.BeginTraceRequest} BeginTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BeginTraceRequest.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BeginTraceRequest message.
         * @function verify
         * @memberof com.android.motion.BeginTraceRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BeginTraceRequest.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          if (message.window != null && message.hasOwnProperty('window')) {
            let error = $root.com.android.motion.WindowIdentifier.verify(message.window);
            if (error) return 'window.' + error;
          }
          return null;
        };

        /**
         * Creates a BeginTraceRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.BeginTraceRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.BeginTraceRequest} BeginTraceRequest
         */
        BeginTraceRequest.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.BeginTraceRequest) return object;
          let message = new $root.com.android.motion.BeginTraceRequest();
          if (object.window != null) {
            if (typeof object.window !== 'object')
              throw TypeError('.com.android.motion.BeginTraceRequest.window: object expected');
            message.window = $root.com.android.motion.WindowIdentifier.fromObject(object.window);
          }
          return message;
        };

        /**
         * Creates a plain object from a BeginTraceRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.BeginTraceRequest
         * @static
         * @param {com.android.motion.BeginTraceRequest} message BeginTraceRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BeginTraceRequest.toObject = function toObject(message, options) {
          if (!options) options = {};
          let object = {};
          if (options.defaults) object.window = null;
          if (message.window != null && message.hasOwnProperty('window'))
            object.window = $root.com.android.motion.WindowIdentifier.toObject(
              message.window,
              options
            );
          return object;
        };

        /**
         * Converts this BeginTraceRequest to JSON.
         * @function toJSON
         * @memberof com.android.motion.BeginTraceRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BeginTraceRequest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BeginTraceRequest
         * @function getTypeUrl
         * @memberof com.android.motion.BeginTraceRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BeginTraceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.BeginTraceRequest';
        };

        return BeginTraceRequest;
      })();

      motion.BeginTraceResponse = (function () {
        /**
         * Properties of a BeginTraceResponse.
         * @memberof com.android.motion
         * @interface IBeginTraceResponse
         */

        /**
         * Constructs a new BeginTraceResponse.
         * @memberof com.android.motion
         * @classdesc Represents a BeginTraceResponse.
         * @implements IBeginTraceResponse
         * @constructor
         * @param {com.android.motion.IBeginTraceResponse=} [properties] Properties to set
         */
        function BeginTraceResponse(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new BeginTraceResponse instance using the specified properties.
         * @function create
         * @memberof com.android.motion.BeginTraceResponse
         * @static
         * @param {com.android.motion.IBeginTraceResponse=} [properties] Properties to set
         * @returns {com.android.motion.BeginTraceResponse} BeginTraceResponse instance
         */
        BeginTraceResponse.create = function create(properties) {
          return new BeginTraceResponse(properties);
        };

        /**
         * Encodes the specified BeginTraceResponse message. Does not implicitly {@link com.android.motion.BeginTraceResponse.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.BeginTraceResponse
         * @static
         * @param {com.android.motion.IBeginTraceResponse} message BeginTraceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BeginTraceResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified BeginTraceResponse message, length delimited. Does not implicitly {@link com.android.motion.BeginTraceResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.BeginTraceResponse
         * @static
         * @param {com.android.motion.IBeginTraceResponse} message BeginTraceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BeginTraceResponse.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BeginTraceResponse message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.BeginTraceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.BeginTraceResponse} BeginTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BeginTraceResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.BeginTraceResponse();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
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
         * @memberof com.android.motion.BeginTraceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.BeginTraceResponse} BeginTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BeginTraceResponse.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BeginTraceResponse message.
         * @function verify
         * @memberof com.android.motion.BeginTraceResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BeginTraceResponse.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          return null;
        };

        /**
         * Creates a BeginTraceResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.BeginTraceResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.BeginTraceResponse} BeginTraceResponse
         */
        BeginTraceResponse.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.BeginTraceResponse) return object;
          return new $root.com.android.motion.BeginTraceResponse();
        };

        /**
         * Creates a plain object from a BeginTraceResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.BeginTraceResponse
         * @static
         * @param {com.android.motion.BeginTraceResponse} message BeginTraceResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BeginTraceResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this BeginTraceResponse to JSON.
         * @function toJSON
         * @memberof com.android.motion.BeginTraceResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BeginTraceResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BeginTraceResponse
         * @function getTypeUrl
         * @memberof com.android.motion.BeginTraceResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BeginTraceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.BeginTraceResponse';
        };

        return BeginTraceResponse;
      })();

      motion.EndTraceRequest = (function () {
        /**
         * Properties of an EndTraceRequest.
         * @memberof com.android.motion
         * @interface IEndTraceRequest
         * @property {com.android.motion.IWindowIdentifier|null} [window] EndTraceRequest window
         */

        /**
         * Constructs a new EndTraceRequest.
         * @memberof com.android.motion
         * @classdesc Represents an EndTraceRequest.
         * @implements IEndTraceRequest
         * @constructor
         * @param {com.android.motion.IEndTraceRequest=} [properties] Properties to set
         */
        function EndTraceRequest(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * EndTraceRequest window.
         * @member {com.android.motion.IWindowIdentifier|null|undefined} window
         * @memberof com.android.motion.EndTraceRequest
         * @instance
         */
        EndTraceRequest.prototype.window = null;

        /**
         * Creates a new EndTraceRequest instance using the specified properties.
         * @function create
         * @memberof com.android.motion.EndTraceRequest
         * @static
         * @param {com.android.motion.IEndTraceRequest=} [properties] Properties to set
         * @returns {com.android.motion.EndTraceRequest} EndTraceRequest instance
         */
        EndTraceRequest.create = function create(properties) {
          return new EndTraceRequest(properties);
        };

        /**
         * Encodes the specified EndTraceRequest message. Does not implicitly {@link com.android.motion.EndTraceRequest.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.EndTraceRequest
         * @static
         * @param {com.android.motion.IEndTraceRequest} message EndTraceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndTraceRequest.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.window != null && Object.hasOwnProperty.call(message, 'window'))
            $root.com.android.motion.WindowIdentifier.encode(
              message.window,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          return writer;
        };

        /**
         * Encodes the specified EndTraceRequest message, length delimited. Does not implicitly {@link com.android.motion.EndTraceRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.EndTraceRequest
         * @static
         * @param {com.android.motion.IEndTraceRequest} message EndTraceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndTraceRequest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EndTraceRequest message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.EndTraceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.EndTraceRequest} EndTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndTraceRequest.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.EndTraceRequest();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.window = $root.com.android.motion.WindowIdentifier.decode(
                  reader,
                  reader.uint32()
                );
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
         * @memberof com.android.motion.EndTraceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.EndTraceRequest} EndTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndTraceRequest.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EndTraceRequest message.
         * @function verify
         * @memberof com.android.motion.EndTraceRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EndTraceRequest.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          if (message.window != null && message.hasOwnProperty('window')) {
            let error = $root.com.android.motion.WindowIdentifier.verify(message.window);
            if (error) return 'window.' + error;
          }
          return null;
        };

        /**
         * Creates an EndTraceRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.EndTraceRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.EndTraceRequest} EndTraceRequest
         */
        EndTraceRequest.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.EndTraceRequest) return object;
          let message = new $root.com.android.motion.EndTraceRequest();
          if (object.window != null) {
            if (typeof object.window !== 'object')
              throw TypeError('.com.android.motion.EndTraceRequest.window: object expected');
            message.window = $root.com.android.motion.WindowIdentifier.fromObject(object.window);
          }
          return message;
        };

        /**
         * Creates a plain object from an EndTraceRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.EndTraceRequest
         * @static
         * @param {com.android.motion.EndTraceRequest} message EndTraceRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EndTraceRequest.toObject = function toObject(message, options) {
          if (!options) options = {};
          let object = {};
          if (options.defaults) object.window = null;
          if (message.window != null && message.hasOwnProperty('window'))
            object.window = $root.com.android.motion.WindowIdentifier.toObject(
              message.window,
              options
            );
          return object;
        };

        /**
         * Converts this EndTraceRequest to JSON.
         * @function toJSON
         * @memberof com.android.motion.EndTraceRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EndTraceRequest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EndTraceRequest
         * @function getTypeUrl
         * @memberof com.android.motion.EndTraceRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EndTraceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.EndTraceRequest';
        };

        return EndTraceRequest;
      })();

      motion.EndTraceResponse = (function () {
        /**
         * Properties of an EndTraceResponse.
         * @memberof com.android.motion
         * @interface IEndTraceResponse
         */

        /**
         * Constructs a new EndTraceResponse.
         * @memberof com.android.motion
         * @classdesc Represents an EndTraceResponse.
         * @implements IEndTraceResponse
         * @constructor
         * @param {com.android.motion.IEndTraceResponse=} [properties] Properties to set
         */
        function EndTraceResponse(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new EndTraceResponse instance using the specified properties.
         * @function create
         * @memberof com.android.motion.EndTraceResponse
         * @static
         * @param {com.android.motion.IEndTraceResponse=} [properties] Properties to set
         * @returns {com.android.motion.EndTraceResponse} EndTraceResponse instance
         */
        EndTraceResponse.create = function create(properties) {
          return new EndTraceResponse(properties);
        };

        /**
         * Encodes the specified EndTraceResponse message. Does not implicitly {@link com.android.motion.EndTraceResponse.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.EndTraceResponse
         * @static
         * @param {com.android.motion.IEndTraceResponse} message EndTraceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndTraceResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified EndTraceResponse message, length delimited. Does not implicitly {@link com.android.motion.EndTraceResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.EndTraceResponse
         * @static
         * @param {com.android.motion.IEndTraceResponse} message EndTraceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndTraceResponse.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EndTraceResponse message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.EndTraceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.EndTraceResponse} EndTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndTraceResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.EndTraceResponse();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
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
         * @memberof com.android.motion.EndTraceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.EndTraceResponse} EndTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndTraceResponse.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EndTraceResponse message.
         * @function verify
         * @memberof com.android.motion.EndTraceResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EndTraceResponse.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          return null;
        };

        /**
         * Creates an EndTraceResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.EndTraceResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.EndTraceResponse} EndTraceResponse
         */
        EndTraceResponse.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.EndTraceResponse) return object;
          return new $root.com.android.motion.EndTraceResponse();
        };

        /**
         * Creates a plain object from an EndTraceResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.EndTraceResponse
         * @static
         * @param {com.android.motion.EndTraceResponse} message EndTraceResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EndTraceResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this EndTraceResponse to JSON.
         * @function toJSON
         * @memberof com.android.motion.EndTraceResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EndTraceResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EndTraceResponse
         * @function getTypeUrl
         * @memberof com.android.motion.EndTraceResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EndTraceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.EndTraceResponse';
        };

        return EndTraceResponse;
      })();

      motion.PollTraceRequest = (function () {
        /**
         * Properties of a PollTraceRequest.
         * @memberof com.android.motion
         * @interface IPollTraceRequest
         * @property {com.android.motion.IWindowIdentifier|null} [window] PollTraceRequest window
         */

        /**
         * Constructs a new PollTraceRequest.
         * @memberof com.android.motion
         * @classdesc Represents a PollTraceRequest.
         * @implements IPollTraceRequest
         * @constructor
         * @param {com.android.motion.IPollTraceRequest=} [properties] Properties to set
         */
        function PollTraceRequest(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * PollTraceRequest window.
         * @member {com.android.motion.IWindowIdentifier|null|undefined} window
         * @memberof com.android.motion.PollTraceRequest
         * @instance
         */
        PollTraceRequest.prototype.window = null;

        /**
         * Creates a new PollTraceRequest instance using the specified properties.
         * @function create
         * @memberof com.android.motion.PollTraceRequest
         * @static
         * @param {com.android.motion.IPollTraceRequest=} [properties] Properties to set
         * @returns {com.android.motion.PollTraceRequest} PollTraceRequest instance
         */
        PollTraceRequest.create = function create(properties) {
          return new PollTraceRequest(properties);
        };

        /**
         * Encodes the specified PollTraceRequest message. Does not implicitly {@link com.android.motion.PollTraceRequest.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.PollTraceRequest
         * @static
         * @param {com.android.motion.IPollTraceRequest} message PollTraceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PollTraceRequest.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          if (message.window != null && Object.hasOwnProperty.call(message, 'window'))
            $root.com.android.motion.WindowIdentifier.encode(
              message.window,
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
            ).ldelim();
          return writer;
        };

        /**
         * Encodes the specified PollTraceRequest message, length delimited. Does not implicitly {@link com.android.motion.PollTraceRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.PollTraceRequest
         * @static
         * @param {com.android.motion.IPollTraceRequest} message PollTraceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PollTraceRequest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PollTraceRequest message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.PollTraceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.PollTraceRequest} PollTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PollTraceRequest.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.PollTraceRequest();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
              case 1: {
                message.window = $root.com.android.motion.WindowIdentifier.decode(
                  reader,
                  reader.uint32()
                );
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
         * @memberof com.android.motion.PollTraceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.PollTraceRequest} PollTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PollTraceRequest.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PollTraceRequest message.
         * @function verify
         * @memberof com.android.motion.PollTraceRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PollTraceRequest.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          if (message.window != null && message.hasOwnProperty('window')) {
            let error = $root.com.android.motion.WindowIdentifier.verify(message.window);
            if (error) return 'window.' + error;
          }
          return null;
        };

        /**
         * Creates a PollTraceRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.PollTraceRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.PollTraceRequest} PollTraceRequest
         */
        PollTraceRequest.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.PollTraceRequest) return object;
          let message = new $root.com.android.motion.PollTraceRequest();
          if (object.window != null) {
            if (typeof object.window !== 'object')
              throw TypeError('.com.android.motion.PollTraceRequest.window: object expected');
            message.window = $root.com.android.motion.WindowIdentifier.fromObject(object.window);
          }
          return message;
        };

        /**
         * Creates a plain object from a PollTraceRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.PollTraceRequest
         * @static
         * @param {com.android.motion.PollTraceRequest} message PollTraceRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PollTraceRequest.toObject = function toObject(message, options) {
          if (!options) options = {};
          let object = {};
          if (options.defaults) object.window = null;
          if (message.window != null && message.hasOwnProperty('window'))
            object.window = $root.com.android.motion.WindowIdentifier.toObject(
              message.window,
              options
            );
          return object;
        };

        /**
         * Converts this PollTraceRequest to JSON.
         * @function toJSON
         * @memberof com.android.motion.PollTraceRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PollTraceRequest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PollTraceRequest
         * @function getTypeUrl
         * @memberof com.android.motion.PollTraceRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PollTraceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.PollTraceRequest';
        };

        return PollTraceRequest;
      })();

      motion.PollTraceResponse = (function () {
        /**
         * Properties of a PollTraceResponse.
         * @memberof com.android.motion
         * @interface IPollTraceResponse
         */

        /**
         * Constructs a new PollTraceResponse.
         * @memberof com.android.motion
         * @classdesc Represents a PollTraceResponse.
         * @implements IPollTraceResponse
         * @constructor
         * @param {com.android.motion.IPollTraceResponse=} [properties] Properties to set
         */
        function PollTraceResponse(properties) {
          if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
              if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new PollTraceResponse instance using the specified properties.
         * @function create
         * @memberof com.android.motion.PollTraceResponse
         * @static
         * @param {com.android.motion.IPollTraceResponse=} [properties] Properties to set
         * @returns {com.android.motion.PollTraceResponse} PollTraceResponse instance
         */
        PollTraceResponse.create = function create(properties) {
          return new PollTraceResponse(properties);
        };

        /**
         * Encodes the specified PollTraceResponse message. Does not implicitly {@link com.android.motion.PollTraceResponse.verify|verify} messages.
         * @function encode
         * @memberof com.android.motion.PollTraceResponse
         * @static
         * @param {com.android.motion.IPollTraceResponse} message PollTraceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PollTraceResponse.encode = function encode(message, writer) {
          if (!writer) writer = $Writer.create();
          return writer;
        };

        /**
         * Encodes the specified PollTraceResponse message, length delimited. Does not implicitly {@link com.android.motion.PollTraceResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof com.android.motion.PollTraceResponse
         * @static
         * @param {com.android.motion.IPollTraceResponse} message PollTraceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PollTraceResponse.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PollTraceResponse message from the specified reader or buffer.
         * @function decode
         * @memberof com.android.motion.PollTraceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {com.android.motion.PollTraceResponse} PollTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PollTraceResponse.decode = function decode(reader, length) {
          if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
          let end = length === undefined ? reader.len : reader.pos + length,
            message = new $root.com.android.motion.PollTraceResponse();
          while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
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
         * @memberof com.android.motion.PollTraceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {com.android.motion.PollTraceResponse} PollTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PollTraceResponse.decodeDelimited = function decodeDelimited(reader) {
          if (!(reader instanceof $Reader)) reader = new $Reader(reader);
          return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PollTraceResponse message.
         * @function verify
         * @memberof com.android.motion.PollTraceResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PollTraceResponse.verify = function verify(message) {
          if (typeof message !== 'object' || message === null) return 'object expected';
          return null;
        };

        /**
         * Creates a PollTraceResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof com.android.motion.PollTraceResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {com.android.motion.PollTraceResponse} PollTraceResponse
         */
        PollTraceResponse.fromObject = function fromObject(object) {
          if (object instanceof $root.com.android.motion.PollTraceResponse) return object;
          return new $root.com.android.motion.PollTraceResponse();
        };

        /**
         * Creates a plain object from a PollTraceResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof com.android.motion.PollTraceResponse
         * @static
         * @param {com.android.motion.PollTraceResponse} message PollTraceResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PollTraceResponse.toObject = function toObject() {
          return {};
        };

        /**
         * Converts this PollTraceResponse to JSON.
         * @function toJSON
         * @memberof com.android.motion.PollTraceResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PollTraceResponse.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PollTraceResponse
         * @function getTypeUrl
         * @memberof com.android.motion.PollTraceResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PollTraceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
          if (typeUrlPrefix === undefined) {
            typeUrlPrefix = 'type.googleapis.com';
          }
          return typeUrlPrefix + '/com.android.motion.PollTraceResponse';
        };

        return PollTraceResponse;
      })();

      return motion;
    })();

    return android;
  })();

  return com;
})());

export { $root as default };
