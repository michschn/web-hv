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

import * as $protobuf from 'protobufjs';

/** Namespace com. */
export namespace com {
  /** Namespace android. */
  namespace android {
    /** Namespace motion. */
    namespace motion {
      /** Properties of a MotionToolsRequest. */
      interface IMotionToolsRequest {
        /** MotionToolsRequest handshake */
        handshake?: com.android.motion.IHandshakeRequest | null;

        /** MotionToolsRequest beginTrace */
        beginTrace?: com.android.motion.IBeginTraceRequest | null;

        /** MotionToolsRequest endTrace */
        endTrace?: com.android.motion.IEndTraceRequest | null;

        /** MotionToolsRequest pollTrace */
        pollTrace?: com.android.motion.IPollTraceRequest | null;
      }

      /** Represents a MotionToolsRequest. */
      class MotionToolsRequest implements IMotionToolsRequest {
        /**
         * Constructs a new MotionToolsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IMotionToolsRequest);

        /** MotionToolsRequest handshake. */
        public handshake?: com.android.motion.IHandshakeRequest | null;

        /** MotionToolsRequest beginTrace. */
        public beginTrace?: com.android.motion.IBeginTraceRequest | null;

        /** MotionToolsRequest endTrace. */
        public endTrace?: com.android.motion.IEndTraceRequest | null;

        /** MotionToolsRequest pollTrace. */
        public pollTrace?: com.android.motion.IPollTraceRequest | null;

        /** MotionToolsRequest type. */
        public type?: 'handshake' | 'beginTrace' | 'endTrace' | 'pollTrace';

        /**
         * Creates a new MotionToolsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MotionToolsRequest instance
         */
        public static create(
          properties?: com.android.motion.IMotionToolsRequest
        ): com.android.motion.MotionToolsRequest;

        /**
         * Encodes the specified MotionToolsRequest message. Does not implicitly
         * {@link com.android.motion.MotionToolsRequest.verify|verify} messages.
         * @param message MotionToolsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IMotionToolsRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MotionToolsRequest message, length delimited. Does not implicitly
         * {@link com.android.motion.MotionToolsRequest.verify|verify} messages.
         * @param message MotionToolsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IMotionToolsRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MotionToolsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MotionToolsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.MotionToolsRequest;

        /**
         * Decodes a MotionToolsRequest message from the specified reader or buffer, length
         * delimited.
         * @param reader Reader or buffer to decode from
         * @returns MotionToolsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.MotionToolsRequest;

        /**
         * Verifies a MotionToolsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MotionToolsRequest message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns MotionToolsRequest
         */
        public static fromObject(object: {
          [k: string]: any;
        }): com.android.motion.MotionToolsRequest;

        /**
         * Creates a plain object from a MotionToolsRequest message. Also converts values to other
         * types if specified.
         * @param message MotionToolsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.MotionToolsRequest,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MotionToolsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MotionToolsRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a MotionToolsResponse. */
      interface IMotionToolsResponse {
        /** MotionToolsResponse error */
        error?: com.android.motion.IErrorResponse | null;

        /** MotionToolsResponse handshake */
        handshake?: com.android.motion.IHandshakeResponse | null;

        /** MotionToolsResponse beginTrace */
        beginTrace?: com.android.motion.IBeginTraceResponse | null;

        /** MotionToolsResponse endTrace */
        endTrace?: com.android.motion.IEndTraceResponse | null;

        /** MotionToolsResponse pollTrace */
        pollTrace?: com.android.motion.IPollTraceResponse | null;
      }

      /** Represents a MotionToolsResponse. */
      class MotionToolsResponse implements IMotionToolsResponse {
        /**
         * Constructs a new MotionToolsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IMotionToolsResponse);

        /** MotionToolsResponse error. */
        public error?: com.android.motion.IErrorResponse | null;

        /** MotionToolsResponse handshake. */
        public handshake?: com.android.motion.IHandshakeResponse | null;

        /** MotionToolsResponse beginTrace. */
        public beginTrace?: com.android.motion.IBeginTraceResponse | null;

        /** MotionToolsResponse endTrace. */
        public endTrace?: com.android.motion.IEndTraceResponse | null;

        /** MotionToolsResponse pollTrace. */
        public pollTrace?: com.android.motion.IPollTraceResponse | null;

        /** MotionToolsResponse type. */
        public type?: 'error' | 'handshake' | 'beginTrace' | 'endTrace' | 'pollTrace';

        /**
         * Creates a new MotionToolsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MotionToolsResponse instance
         */
        public static create(
          properties?: com.android.motion.IMotionToolsResponse
        ): com.android.motion.MotionToolsResponse;

        /**
         * Encodes the specified MotionToolsResponse message. Does not implicitly
         * {@link com.android.motion.MotionToolsResponse.verify|verify} messages.
         * @param message MotionToolsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IMotionToolsResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified MotionToolsResponse message, length delimited. Does not implicitly
         * {@link com.android.motion.MotionToolsResponse.verify|verify} messages.
         * @param message MotionToolsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IMotionToolsResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a MotionToolsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MotionToolsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.MotionToolsResponse;

        /**
         * Decodes a MotionToolsResponse message from the specified reader or buffer, length
         * delimited.
         * @param reader Reader or buffer to decode from
         * @returns MotionToolsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.MotionToolsResponse;

        /**
         * Verifies a MotionToolsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a MotionToolsResponse message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns MotionToolsResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): com.android.motion.MotionToolsResponse;

        /**
         * Creates a plain object from a MotionToolsResponse message. Also converts values to other
         * types if specified.
         * @param message MotionToolsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.MotionToolsResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this MotionToolsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MotionToolsResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of an ErrorResponse. */
      interface IErrorResponse {
        /** ErrorResponse code */
        code?: com.android.motion.ErrorResponse.Code | null;

        /** ErrorResponse message */
        message?: string | null;
      }

      /** Represents an ErrorResponse. */
      class ErrorResponse implements IErrorResponse {
        /**
         * Constructs a new ErrorResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IErrorResponse);

        /** ErrorResponse code. */
        public code: com.android.motion.ErrorResponse.Code;

        /** ErrorResponse message. */
        public message: string;

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorResponse instance
         */
        public static create(
          properties?: com.android.motion.IErrorResponse
        ): com.android.motion.ErrorResponse;

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly
         * {@link com.android.motion.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IErrorResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly
         * {@link com.android.motion.ErrorResponse.verify|verify} messages.
         * @param message ErrorResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IErrorResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.ErrorResponse;

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.ErrorResponse;

        /**
         * Verifies an ErrorResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns ErrorResponse
         */
        public static fromObject(object: { [k: string]: any }): com.android.motion.ErrorResponse;

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other
         * types if specified.
         * @param message ErrorResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.ErrorResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this ErrorResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ErrorResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      namespace ErrorResponse {
        /** Code enum. */
        enum Code {
          UNKNOWN = 0,
          INVALID_REQUEST = 1,
        }
      }

      /** Properties of a WindowIdentifier. */
      interface IWindowIdentifier {
        /** WindowIdentifier rootWindow */
        rootWindow?: string | null;
      }

      /** Represents a WindowIdentifier. */
      class WindowIdentifier implements IWindowIdentifier {
        /**
         * Constructs a new WindowIdentifier.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IWindowIdentifier);

        /** WindowIdentifier rootWindow. */
        public rootWindow: string;

        /**
         * Creates a new WindowIdentifier instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WindowIdentifier instance
         */
        public static create(
          properties?: com.android.motion.IWindowIdentifier
        ): com.android.motion.WindowIdentifier;

        /**
         * Encodes the specified WindowIdentifier message. Does not implicitly
         * {@link com.android.motion.WindowIdentifier.verify|verify} messages.
         * @param message WindowIdentifier message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IWindowIdentifier,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified WindowIdentifier message, length delimited. Does not implicitly
         * {@link com.android.motion.WindowIdentifier.verify|verify} messages.
         * @param message WindowIdentifier message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IWindowIdentifier,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a WindowIdentifier message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WindowIdentifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.WindowIdentifier;

        /**
         * Decodes a WindowIdentifier message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WindowIdentifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.WindowIdentifier;

        /**
         * Verifies a WindowIdentifier message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a WindowIdentifier message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns WindowIdentifier
         */
        public static fromObject(object: { [k: string]: any }): com.android.motion.WindowIdentifier;

        /**
         * Creates a plain object from a WindowIdentifier message. Also converts values to other
         * types if specified.
         * @param message WindowIdentifier
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.WindowIdentifier,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this WindowIdentifier to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WindowIdentifier
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a HandshakeRequest. */
      interface IHandshakeRequest {
        /** HandshakeRequest window */
        window?: com.android.motion.IWindowIdentifier | null;

        /** HandshakeRequest clientVersion */
        clientVersion?: number | null;
      }

      /** Represents a HandshakeRequest. */
      class HandshakeRequest implements IHandshakeRequest {
        /**
         * Constructs a new HandshakeRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IHandshakeRequest);

        /** HandshakeRequest window. */
        public window?: com.android.motion.IWindowIdentifier | null;

        /** HandshakeRequest clientVersion. */
        public clientVersion: number;

        /**
         * Creates a new HandshakeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HandshakeRequest instance
         */
        public static create(
          properties?: com.android.motion.IHandshakeRequest
        ): com.android.motion.HandshakeRequest;

        /**
         * Encodes the specified HandshakeRequest message. Does not implicitly
         * {@link com.android.motion.HandshakeRequest.verify|verify} messages.
         * @param message HandshakeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IHandshakeRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified HandshakeRequest message, length delimited. Does not implicitly
         * {@link com.android.motion.HandshakeRequest.verify|verify} messages.
         * @param message HandshakeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IHandshakeRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a HandshakeRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HandshakeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.HandshakeRequest;

        /**
         * Decodes a HandshakeRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HandshakeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.HandshakeRequest;

        /**
         * Verifies a HandshakeRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a HandshakeRequest message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns HandshakeRequest
         */
        public static fromObject(object: { [k: string]: any }): com.android.motion.HandshakeRequest;

        /**
         * Creates a plain object from a HandshakeRequest message. Also converts values to other
         * types if specified.
         * @param message HandshakeRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.HandshakeRequest,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this HandshakeRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HandshakeRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a HandshakeResponse. */
      interface IHandshakeResponse {
        /** HandshakeResponse status */
        status?: com.android.motion.HandshakeResponse.Status | null;

        /** HandshakeResponse serverVersion */
        serverVersion?: number | null;
      }

      /** Represents a HandshakeResponse. */
      class HandshakeResponse implements IHandshakeResponse {
        /**
         * Constructs a new HandshakeResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IHandshakeResponse);

        /** HandshakeResponse status. */
        public status: com.android.motion.HandshakeResponse.Status;

        /** HandshakeResponse serverVersion. */
        public serverVersion: number;

        /**
         * Creates a new HandshakeResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HandshakeResponse instance
         */
        public static create(
          properties?: com.android.motion.IHandshakeResponse
        ): com.android.motion.HandshakeResponse;

        /**
         * Encodes the specified HandshakeResponse message. Does not implicitly
         * {@link com.android.motion.HandshakeResponse.verify|verify} messages.
         * @param message HandshakeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IHandshakeResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified HandshakeResponse message, length delimited. Does not implicitly
         * {@link com.android.motion.HandshakeResponse.verify|verify} messages.
         * @param message HandshakeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IHandshakeResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a HandshakeResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HandshakeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.HandshakeResponse;

        /**
         * Decodes a HandshakeResponse message from the specified reader or buffer, length
         * delimited.
         * @param reader Reader or buffer to decode from
         * @returns HandshakeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.HandshakeResponse;

        /**
         * Verifies a HandshakeResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a HandshakeResponse message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns HandshakeResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): com.android.motion.HandshakeResponse;

        /**
         * Creates a plain object from a HandshakeResponse message. Also converts values to other
         * types if specified.
         * @param message HandshakeResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.HandshakeResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this HandshakeResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HandshakeResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      namespace HandshakeResponse {
        /** Status enum. */
        enum Status {
          OK = 1,
          WINDOW_NOT_FOUND = 2,
        }
      }

      /** Properties of a BeginTraceRequest. */
      interface IBeginTraceRequest {
        /** BeginTraceRequest window */
        window?: com.android.motion.IWindowIdentifier | null;
      }

      /** Represents a BeginTraceRequest. */
      class BeginTraceRequest implements IBeginTraceRequest {
        /**
         * Constructs a new BeginTraceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IBeginTraceRequest);

        /** BeginTraceRequest window. */
        public window?: com.android.motion.IWindowIdentifier | null;

        /**
         * Creates a new BeginTraceRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BeginTraceRequest instance
         */
        public static create(
          properties?: com.android.motion.IBeginTraceRequest
        ): com.android.motion.BeginTraceRequest;

        /**
         * Encodes the specified BeginTraceRequest message. Does not implicitly
         * {@link com.android.motion.BeginTraceRequest.verify|verify} messages.
         * @param message BeginTraceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IBeginTraceRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified BeginTraceRequest message, length delimited. Does not implicitly
         * {@link com.android.motion.BeginTraceRequest.verify|verify} messages.
         * @param message BeginTraceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IBeginTraceRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a BeginTraceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BeginTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.BeginTraceRequest;

        /**
         * Decodes a BeginTraceRequest message from the specified reader or buffer, length
         * delimited.
         * @param reader Reader or buffer to decode from
         * @returns BeginTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.BeginTraceRequest;

        /**
         * Verifies a BeginTraceRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a BeginTraceRequest message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns BeginTraceRequest
         */
        public static fromObject(object: {
          [k: string]: any;
        }): com.android.motion.BeginTraceRequest;

        /**
         * Creates a plain object from a BeginTraceRequest message. Also converts values to other
         * types if specified.
         * @param message BeginTraceRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.BeginTraceRequest,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this BeginTraceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BeginTraceRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a BeginTraceResponse. */
      interface IBeginTraceResponse {}

      /** Represents a BeginTraceResponse. */
      class BeginTraceResponse implements IBeginTraceResponse {
        /**
         * Constructs a new BeginTraceResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IBeginTraceResponse);

        /**
         * Creates a new BeginTraceResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BeginTraceResponse instance
         */
        public static create(
          properties?: com.android.motion.IBeginTraceResponse
        ): com.android.motion.BeginTraceResponse;

        /**
         * Encodes the specified BeginTraceResponse message. Does not implicitly
         * {@link com.android.motion.BeginTraceResponse.verify|verify} messages.
         * @param message BeginTraceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IBeginTraceResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified BeginTraceResponse message, length delimited. Does not implicitly
         * {@link com.android.motion.BeginTraceResponse.verify|verify} messages.
         * @param message BeginTraceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IBeginTraceResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a BeginTraceResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BeginTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.BeginTraceResponse;

        /**
         * Decodes a BeginTraceResponse message from the specified reader or buffer, length
         * delimited.
         * @param reader Reader or buffer to decode from
         * @returns BeginTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.BeginTraceResponse;

        /**
         * Verifies a BeginTraceResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a BeginTraceResponse message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns BeginTraceResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): com.android.motion.BeginTraceResponse;

        /**
         * Creates a plain object from a BeginTraceResponse message. Also converts values to other
         * types if specified.
         * @param message BeginTraceResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.BeginTraceResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this BeginTraceResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for BeginTraceResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of an EndTraceRequest. */
      interface IEndTraceRequest {
        /** EndTraceRequest window */
        window?: com.android.motion.IWindowIdentifier | null;
      }

      /** Represents an EndTraceRequest. */
      class EndTraceRequest implements IEndTraceRequest {
        /**
         * Constructs a new EndTraceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IEndTraceRequest);

        /** EndTraceRequest window. */
        public window?: com.android.motion.IWindowIdentifier | null;

        /**
         * Creates a new EndTraceRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EndTraceRequest instance
         */
        public static create(
          properties?: com.android.motion.IEndTraceRequest
        ): com.android.motion.EndTraceRequest;

        /**
         * Encodes the specified EndTraceRequest message. Does not implicitly
         * {@link com.android.motion.EndTraceRequest.verify|verify} messages.
         * @param message EndTraceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IEndTraceRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified EndTraceRequest message, length delimited. Does not implicitly
         * {@link com.android.motion.EndTraceRequest.verify|verify} messages.
         * @param message EndTraceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IEndTraceRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes an EndTraceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EndTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.EndTraceRequest;

        /**
         * Decodes an EndTraceRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EndTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.EndTraceRequest;

        /**
         * Verifies an EndTraceRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates an EndTraceRequest message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns EndTraceRequest
         */
        public static fromObject(object: { [k: string]: any }): com.android.motion.EndTraceRequest;

        /**
         * Creates a plain object from an EndTraceRequest message. Also converts values to other
         * types if specified.
         * @param message EndTraceRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.EndTraceRequest,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this EndTraceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EndTraceRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of an EndTraceResponse. */
      interface IEndTraceResponse {}

      /** Represents an EndTraceResponse. */
      class EndTraceResponse implements IEndTraceResponse {
        /**
         * Constructs a new EndTraceResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IEndTraceResponse);

        /**
         * Creates a new EndTraceResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EndTraceResponse instance
         */
        public static create(
          properties?: com.android.motion.IEndTraceResponse
        ): com.android.motion.EndTraceResponse;

        /**
         * Encodes the specified EndTraceResponse message. Does not implicitly
         * {@link com.android.motion.EndTraceResponse.verify|verify} messages.
         * @param message EndTraceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IEndTraceResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified EndTraceResponse message, length delimited. Does not implicitly
         * {@link com.android.motion.EndTraceResponse.verify|verify} messages.
         * @param message EndTraceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IEndTraceResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes an EndTraceResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EndTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.EndTraceResponse;

        /**
         * Decodes an EndTraceResponse message from the specified reader or buffer, length
         * delimited.
         * @param reader Reader or buffer to decode from
         * @returns EndTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.EndTraceResponse;

        /**
         * Verifies an EndTraceResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates an EndTraceResponse message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns EndTraceResponse
         */
        public static fromObject(object: { [k: string]: any }): com.android.motion.EndTraceResponse;

        /**
         * Creates a plain object from an EndTraceResponse message. Also converts values to other
         * types if specified.
         * @param message EndTraceResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.EndTraceResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this EndTraceResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EndTraceResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a PollTraceRequest. */
      interface IPollTraceRequest {
        /** PollTraceRequest window */
        window?: com.android.motion.IWindowIdentifier | null;
      }

      /** Represents a PollTraceRequest. */
      class PollTraceRequest implements IPollTraceRequest {
        /**
         * Constructs a new PollTraceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IPollTraceRequest);

        /** PollTraceRequest window. */
        public window?: com.android.motion.IWindowIdentifier | null;

        /**
         * Creates a new PollTraceRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PollTraceRequest instance
         */
        public static create(
          properties?: com.android.motion.IPollTraceRequest
        ): com.android.motion.PollTraceRequest;

        /**
         * Encodes the specified PollTraceRequest message. Does not implicitly
         * {@link com.android.motion.PollTraceRequest.verify|verify} messages.
         * @param message PollTraceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IPollTraceRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified PollTraceRequest message, length delimited. Does not implicitly
         * {@link com.android.motion.PollTraceRequest.verify|verify} messages.
         * @param message PollTraceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IPollTraceRequest,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a PollTraceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PollTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.PollTraceRequest;

        /**
         * Decodes a PollTraceRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PollTraceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.PollTraceRequest;

        /**
         * Verifies a PollTraceRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a PollTraceRequest message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns PollTraceRequest
         */
        public static fromObject(object: { [k: string]: any }): com.android.motion.PollTraceRequest;

        /**
         * Creates a plain object from a PollTraceRequest message. Also converts values to other
         * types if specified.
         * @param message PollTraceRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.PollTraceRequest,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this PollTraceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PollTraceRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }

      /** Properties of a PollTraceResponse. */
      interface IPollTraceResponse {}

      /** Represents a PollTraceResponse. */
      class PollTraceResponse implements IPollTraceResponse {
        /**
         * Constructs a new PollTraceResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: com.android.motion.IPollTraceResponse);

        /**
         * Creates a new PollTraceResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PollTraceResponse instance
         */
        public static create(
          properties?: com.android.motion.IPollTraceResponse
        ): com.android.motion.PollTraceResponse;

        /**
         * Encodes the specified PollTraceResponse message. Does not implicitly
         * {@link com.android.motion.PollTraceResponse.verify|verify} messages.
         * @param message PollTraceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(
          message: com.android.motion.IPollTraceResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Encodes the specified PollTraceResponse message, length delimited. Does not implicitly
         * {@link com.android.motion.PollTraceResponse.verify|verify} messages.
         * @param message PollTraceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(
          message: com.android.motion.IPollTraceResponse,
          writer?: $protobuf.Writer
        ): $protobuf.Writer;

        /**
         * Decodes a PollTraceResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PollTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          reader: $protobuf.Reader | Uint8Array,
          length?: number
        ): com.android.motion.PollTraceResponse;

        /**
         * Decodes a PollTraceResponse message from the specified reader or buffer, length
         * delimited.
         * @param reader Reader or buffer to decode from
         * @returns PollTraceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(
          reader: $protobuf.Reader | Uint8Array
        ): com.android.motion.PollTraceResponse;

        /**
         * Verifies a PollTraceResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a PollTraceResponse message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns PollTraceResponse
         */
        public static fromObject(object: {
          [k: string]: any;
        }): com.android.motion.PollTraceResponse;

        /**
         * Creates a plain object from a PollTraceResponse message. Also converts values to other
         * types if specified.
         * @param message PollTraceResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(
          message: com.android.motion.PollTraceResponse,
          options?: $protobuf.IConversionOptions
        ): { [k: string]: any };

        /**
         * Converts this PollTraceResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PollTraceResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
      }
    }
  }
}
