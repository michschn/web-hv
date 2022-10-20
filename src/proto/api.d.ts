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

import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace com. */
export namespace com {

    /** Namespace android. */
    namespace android {

        /** Namespace app. */
        namespace app {

            /** Namespace motiontool. */
            namespace motiontool {

                /** Properties of a MotionToolsRequest. */
                interface IMotionToolsRequest {

                    /** MotionToolsRequest handshake */
                    handshake?: (com.android.app.motiontool.IHandshakeRequest|null);

                    /** MotionToolsRequest beginTrace */
                    beginTrace?: (com.android.app.motiontool.IBeginTraceRequest|null);

                    /** MotionToolsRequest endTrace */
                    endTrace?: (com.android.app.motiontool.IEndTraceRequest|null);

                    /** MotionToolsRequest pollTrace */
                    pollTrace?: (com.android.app.motiontool.IPollTraceRequest|null);
                }

                /** Represents a MotionToolsRequest. */
                class MotionToolsRequest implements IMotionToolsRequest {

                    /**
                     * Constructs a new MotionToolsRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IMotionToolsRequest);

                    /** MotionToolsRequest handshake. */
                    public handshake?: (com.android.app.motiontool.IHandshakeRequest|null);

                    /** MotionToolsRequest beginTrace. */
                    public beginTrace?: (com.android.app.motiontool.IBeginTraceRequest|null);

                    /** MotionToolsRequest endTrace. */
                    public endTrace?: (com.android.app.motiontool.IEndTraceRequest|null);

                    /** MotionToolsRequest pollTrace. */
                    public pollTrace?: (com.android.app.motiontool.IPollTraceRequest|null);

                    /** MotionToolsRequest type. */
                    public type?: ("handshake"|"beginTrace"|"endTrace"|"pollTrace");

                    /**
                     * Creates a new MotionToolsRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MotionToolsRequest instance
                     */
                    public static create(properties?: com.android.app.motiontool.IMotionToolsRequest): com.android.app.motiontool.MotionToolsRequest;

                    /**
                     * Encodes the specified MotionToolsRequest message. Does not implicitly
                     * {@link com.android.app.motiontool.MotionToolsRequest.verify|verify}
                     * messages.
                     * @param message MotionToolsRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IMotionToolsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MotionToolsRequest message, length delimited. Does not
                     * implicitly {@link
                     * com.android.app.motiontool.MotionToolsRequest.verify|verify} messages.
                     * @param message MotionToolsRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IMotionToolsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MotionToolsRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MotionToolsRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.MotionToolsRequest;

                    /**
                     * Decodes a MotionToolsRequest message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MotionToolsRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.MotionToolsRequest;

                    /**
                     * Verifies a MotionToolsRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MotionToolsRequest message from a plain object. Also converts
                     * values to their respective internal types.
                     * @param object Plain object
                     * @returns MotionToolsRequest
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.MotionToolsRequest;

                    /**
                     * Creates a plain object from a MotionToolsRequest message. Also converts
                     * values to other types if specified.
                     * @param message MotionToolsRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.MotionToolsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MotionToolsRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for MotionToolsRequest
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a MotionToolsResponse. */
                interface IMotionToolsResponse {

                    /** MotionToolsResponse error */
                    error?: (com.android.app.motiontool.IErrorResponse|null);

                    /** MotionToolsResponse handshake */
                    handshake?: (com.android.app.motiontool.IHandshakeResponse|null);

                    /** MotionToolsResponse beginTrace */
                    beginTrace?: (com.android.app.motiontool.IBeginTraceResponse|null);

                    /** MotionToolsResponse endTrace */
                    endTrace?: (com.android.app.motiontool.IEndTraceResponse|null);

                    /** MotionToolsResponse pollTrace */
                    pollTrace?: (com.android.app.motiontool.IPollTraceResponse|null);
                }

                /** Represents a MotionToolsResponse. */
                class MotionToolsResponse implements IMotionToolsResponse {

                    /**
                     * Constructs a new MotionToolsResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IMotionToolsResponse);

                    /** MotionToolsResponse error. */
                    public error?: (com.android.app.motiontool.IErrorResponse|null);

                    /** MotionToolsResponse handshake. */
                    public handshake?: (com.android.app.motiontool.IHandshakeResponse|null);

                    /** MotionToolsResponse beginTrace. */
                    public beginTrace?: (com.android.app.motiontool.IBeginTraceResponse|null);

                    /** MotionToolsResponse endTrace. */
                    public endTrace?: (com.android.app.motiontool.IEndTraceResponse|null);

                    /** MotionToolsResponse pollTrace. */
                    public pollTrace?: (com.android.app.motiontool.IPollTraceResponse|null);

                    /** MotionToolsResponse type. */
                    public type?: ("error"|"handshake"|"beginTrace"|"endTrace"|"pollTrace");

                    /**
                     * Creates a new MotionToolsResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MotionToolsResponse instance
                     */
                    public static create(properties?: com.android.app.motiontool.IMotionToolsResponse): com.android.app.motiontool.MotionToolsResponse;

                    /**
                     * Encodes the specified MotionToolsResponse message. Does not implicitly
                     * {@link com.android.app.motiontool.MotionToolsResponse.verify|verify}
                     * messages.
                     * @param message MotionToolsResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IMotionToolsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MotionToolsResponse message, length delimited. Does
                     * not implicitly
                     * {@link com.android.app.motiontool.MotionToolsResponse.verify|verify}
                     * messages.
                     * @param message MotionToolsResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IMotionToolsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MotionToolsResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MotionToolsResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.MotionToolsResponse;

                    /**
                     * Decodes a MotionToolsResponse message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MotionToolsResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.MotionToolsResponse;

                    /**
                     * Verifies a MotionToolsResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MotionToolsResponse message from a plain object. Also converts
                     * values to their respective internal types.
                     * @param object Plain object
                     * @returns MotionToolsResponse
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.MotionToolsResponse;

                    /**
                     * Creates a plain object from a MotionToolsResponse message. Also converts
                     * values to other types if specified.
                     * @param message MotionToolsResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.MotionToolsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MotionToolsResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for MotionToolsResponse
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of an ErrorResponse. */
                interface IErrorResponse {

                    /** ErrorResponse code */
                    code?: (com.android.app.motiontool.ErrorResponse.Code|null);

                    /** ErrorResponse message */
                    message?: (string|null);
                }

                /** Represents an ErrorResponse. */
                class ErrorResponse implements IErrorResponse {

                    /**
                     * Constructs a new ErrorResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IErrorResponse);

                    /** ErrorResponse code. */
                    public code: com.android.app.motiontool.ErrorResponse.Code;

                    /** ErrorResponse message. */
                    public message: string;

                    /**
                     * Creates a new ErrorResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ErrorResponse instance
                     */
                    public static create(properties?: com.android.app.motiontool.IErrorResponse): com.android.app.motiontool.ErrorResponse;

                    /**
                     * Encodes the specified ErrorResponse message. Does not implicitly
                     * {@link com.android.app.motiontool.ErrorResponse.verify|verify} messages.
                     * @param message ErrorResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ErrorResponse message, length delimited. Does not
                     * implicitly {@link com.android.app.motiontool.ErrorResponse.verify|verify}
                     * messages.
                     * @param message ErrorResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ErrorResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ErrorResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.ErrorResponse;

                    /**
                     * Decodes an ErrorResponse message from the specified reader or buffer, length
                     * delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ErrorResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.ErrorResponse;

                    /**
                     * Verifies an ErrorResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ErrorResponse message from a plain object. Also converts values
                     * to their respective internal types.
                     * @param object Plain object
                     * @returns ErrorResponse
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.ErrorResponse;

                    /**
                     * Creates a plain object from an ErrorResponse message. Also converts values
                     * to other types if specified.
                     * @param message ErrorResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.ErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ErrorResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for ErrorResponse
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                namespace ErrorResponse {

                    /** Code enum. */
                    enum Code {
                        UNKNOWN = 0,
                        INVALID_REQUEST = 1,
                        UNKNOWN_TRACE_ID = 2,
                        WINDOW_NOT_FOUND = 3
                    }
                }

                /** Properties of a WindowIdentifier. */
                interface IWindowIdentifier {

                    /** WindowIdentifier rootWindow */
                    rootWindow?: (string|null);
                }

                /** Represents a WindowIdentifier. */
                class WindowIdentifier implements IWindowIdentifier {

                    /**
                     * Constructs a new WindowIdentifier.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IWindowIdentifier);

                    /** WindowIdentifier rootWindow. */
                    public rootWindow: string;

                    /**
                     * Creates a new WindowIdentifier instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns WindowIdentifier instance
                     */
                    public static create(properties?: com.android.app.motiontool.IWindowIdentifier): com.android.app.motiontool.WindowIdentifier;

                    /**
                     * Encodes the specified WindowIdentifier message. Does not implicitly
                     * {@link com.android.app.motiontool.WindowIdentifier.verify|verify} messages.
                     * @param message WindowIdentifier message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IWindowIdentifier, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified WindowIdentifier message, length delimited. Does not
                     * implicitly {@link com.android.app.motiontool.WindowIdentifier.verify|verify}
                     * messages.
                     * @param message WindowIdentifier message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IWindowIdentifier, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a WindowIdentifier message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns WindowIdentifier
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.WindowIdentifier;

                    /**
                     * Decodes a WindowIdentifier message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns WindowIdentifier
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.WindowIdentifier;

                    /**
                     * Verifies a WindowIdentifier message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a WindowIdentifier message from a plain object. Also converts values
                     * to their respective internal types.
                     * @param object Plain object
                     * @returns WindowIdentifier
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.WindowIdentifier;

                    /**
                     * Creates a plain object from a WindowIdentifier message. Also converts values
                     * to other types if specified.
                     * @param message WindowIdentifier
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.WindowIdentifier, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this WindowIdentifier to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for WindowIdentifier
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a HandshakeRequest. */
                interface IHandshakeRequest {

                    /** HandshakeRequest window */
                    window?: (com.android.app.motiontool.IWindowIdentifier|null);

                    /** HandshakeRequest clientVersion */
                    clientVersion?: (number|null);
                }

                /** Represents a HandshakeRequest. */
                class HandshakeRequest implements IHandshakeRequest {

                    /**
                     * Constructs a new HandshakeRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IHandshakeRequest);

                    /** HandshakeRequest window. */
                    public window?: (com.android.app.motiontool.IWindowIdentifier|null);

                    /** HandshakeRequest clientVersion. */
                    public clientVersion: number;

                    /**
                     * Creates a new HandshakeRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns HandshakeRequest instance
                     */
                    public static create(properties?: com.android.app.motiontool.IHandshakeRequest): com.android.app.motiontool.HandshakeRequest;

                    /**
                     * Encodes the specified HandshakeRequest message. Does not implicitly
                     * {@link com.android.app.motiontool.HandshakeRequest.verify|verify} messages.
                     * @param message HandshakeRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IHandshakeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified HandshakeRequest message, length delimited. Does not
                     * implicitly {@link com.android.app.motiontool.HandshakeRequest.verify|verify}
                     * messages.
                     * @param message HandshakeRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IHandshakeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a HandshakeRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns HandshakeRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.HandshakeRequest;

                    /**
                     * Decodes a HandshakeRequest message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns HandshakeRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.HandshakeRequest;

                    /**
                     * Verifies a HandshakeRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a HandshakeRequest message from a plain object. Also converts values
                     * to their respective internal types.
                     * @param object Plain object
                     * @returns HandshakeRequest
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.HandshakeRequest;

                    /**
                     * Creates a plain object from a HandshakeRequest message. Also converts values
                     * to other types if specified.
                     * @param message HandshakeRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.HandshakeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this HandshakeRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for HandshakeRequest
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a HandshakeResponse. */
                interface IHandshakeResponse {

                    /** HandshakeResponse status */
                    status?: (com.android.app.motiontool.HandshakeResponse.Status|null);

                    /** HandshakeResponse serverVersion */
                    serverVersion?: (number|null);
                }

                /** Represents a HandshakeResponse. */
                class HandshakeResponse implements IHandshakeResponse {

                    /**
                     * Constructs a new HandshakeResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IHandshakeResponse);

                    /** HandshakeResponse status. */
                    public status: com.android.app.motiontool.HandshakeResponse.Status;

                    /** HandshakeResponse serverVersion. */
                    public serverVersion: number;

                    /**
                     * Creates a new HandshakeResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns HandshakeResponse instance
                     */
                    public static create(properties?: com.android.app.motiontool.IHandshakeResponse): com.android.app.motiontool.HandshakeResponse;

                    /**
                     * Encodes the specified HandshakeResponse message. Does not implicitly
                     * {@link com.android.app.motiontool.HandshakeResponse.verify|verify} messages.
                     * @param message HandshakeResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IHandshakeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified HandshakeResponse message, length delimited. Does not
                     * implicitly {@link
                     * com.android.app.motiontool.HandshakeResponse.verify|verify} messages.
                     * @param message HandshakeResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IHandshakeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a HandshakeResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns HandshakeResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.HandshakeResponse;

                    /**
                     * Decodes a HandshakeResponse message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns HandshakeResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.HandshakeResponse;

                    /**
                     * Verifies a HandshakeResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a HandshakeResponse message from a plain object. Also converts
                     * values to their respective internal types.
                     * @param object Plain object
                     * @returns HandshakeResponse
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.HandshakeResponse;

                    /**
                     * Creates a plain object from a HandshakeResponse message. Also converts
                     * values to other types if specified.
                     * @param message HandshakeResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.HandshakeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this HandshakeResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for HandshakeResponse
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                namespace HandshakeResponse {

                    /** Status enum. */
                    enum Status {
                        OK = 1,
                        WINDOW_NOT_FOUND = 2
                    }
                }

                /** Properties of a BeginTraceRequest. */
                interface IBeginTraceRequest {

                    /** BeginTraceRequest window */
                    window?: (com.android.app.motiontool.IWindowIdentifier|null);
                }

                /** Represents a BeginTraceRequest. */
                class BeginTraceRequest implements IBeginTraceRequest {

                    /**
                     * Constructs a new BeginTraceRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IBeginTraceRequest);

                    /** BeginTraceRequest window. */
                    public window?: (com.android.app.motiontool.IWindowIdentifier|null);

                    /**
                     * Creates a new BeginTraceRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns BeginTraceRequest instance
                     */
                    public static create(properties?: com.android.app.motiontool.IBeginTraceRequest): com.android.app.motiontool.BeginTraceRequest;

                    /**
                     * Encodes the specified BeginTraceRequest message. Does not implicitly
                     * {@link com.android.app.motiontool.BeginTraceRequest.verify|verify} messages.
                     * @param message BeginTraceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IBeginTraceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified BeginTraceRequest message, length delimited. Does not
                     * implicitly {@link
                     * com.android.app.motiontool.BeginTraceRequest.verify|verify} messages.
                     * @param message BeginTraceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IBeginTraceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a BeginTraceRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns BeginTraceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.BeginTraceRequest;

                    /**
                     * Decodes a BeginTraceRequest message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns BeginTraceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.BeginTraceRequest;

                    /**
                     * Verifies a BeginTraceRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a BeginTraceRequest message from a plain object. Also converts
                     * values to their respective internal types.
                     * @param object Plain object
                     * @returns BeginTraceRequest
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.BeginTraceRequest;

                    /**
                     * Creates a plain object from a BeginTraceRequest message. Also converts
                     * values to other types if specified.
                     * @param message BeginTraceRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.BeginTraceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this BeginTraceRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for BeginTraceRequest
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a BeginTraceResponse. */
                interface IBeginTraceResponse {

                    /** BeginTraceResponse traceId */
                    traceId?: (number|null);
                }

                /** Represents a BeginTraceResponse. */
                class BeginTraceResponse implements IBeginTraceResponse {

                    /**
                     * Constructs a new BeginTraceResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IBeginTraceResponse);

                    /** BeginTraceResponse traceId. */
                    public traceId: number;

                    /**
                     * Creates a new BeginTraceResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns BeginTraceResponse instance
                     */
                    public static create(properties?: com.android.app.motiontool.IBeginTraceResponse): com.android.app.motiontool.BeginTraceResponse;

                    /**
                     * Encodes the specified BeginTraceResponse message. Does not implicitly
                     * {@link com.android.app.motiontool.BeginTraceResponse.verify|verify}
                     * messages.
                     * @param message BeginTraceResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IBeginTraceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified BeginTraceResponse message, length delimited. Does not
                     * implicitly {@link
                     * com.android.app.motiontool.BeginTraceResponse.verify|verify} messages.
                     * @param message BeginTraceResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IBeginTraceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a BeginTraceResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns BeginTraceResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.BeginTraceResponse;

                    /**
                     * Decodes a BeginTraceResponse message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns BeginTraceResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.BeginTraceResponse;

                    /**
                     * Verifies a BeginTraceResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a BeginTraceResponse message from a plain object. Also converts
                     * values to their respective internal types.
                     * @param object Plain object
                     * @returns BeginTraceResponse
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.BeginTraceResponse;

                    /**
                     * Creates a plain object from a BeginTraceResponse message. Also converts
                     * values to other types if specified.
                     * @param message BeginTraceResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.BeginTraceResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this BeginTraceResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for BeginTraceResponse
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of an EndTraceRequest. */
                interface IEndTraceRequest {

                    /** EndTraceRequest traceId */
                    traceId?: (number|null);
                }

                /** Represents an EndTraceRequest. */
                class EndTraceRequest implements IEndTraceRequest {

                    /**
                     * Constructs a new EndTraceRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IEndTraceRequest);

                    /** EndTraceRequest traceId. */
                    public traceId: number;

                    /**
                     * Creates a new EndTraceRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns EndTraceRequest instance
                     */
                    public static create(properties?: com.android.app.motiontool.IEndTraceRequest): com.android.app.motiontool.EndTraceRequest;

                    /**
                     * Encodes the specified EndTraceRequest message. Does not implicitly
                     * {@link com.android.app.motiontool.EndTraceRequest.verify|verify} messages.
                     * @param message EndTraceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IEndTraceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified EndTraceRequest message, length delimited. Does not
                     * implicitly {@link com.android.app.motiontool.EndTraceRequest.verify|verify}
                     * messages.
                     * @param message EndTraceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IEndTraceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an EndTraceRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns EndTraceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.EndTraceRequest;

                    /**
                     * Decodes an EndTraceRequest message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns EndTraceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.EndTraceRequest;

                    /**
                     * Verifies an EndTraceRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an EndTraceRequest message from a plain object. Also converts values
                     * to their respective internal types.
                     * @param object Plain object
                     * @returns EndTraceRequest
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.EndTraceRequest;

                    /**
                     * Creates a plain object from an EndTraceRequest message. Also converts values
                     * to other types if specified.
                     * @param message EndTraceRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.EndTraceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this EndTraceRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for EndTraceRequest
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of an EndTraceResponse. */
                interface IEndTraceResponse {

                    /** EndTraceResponse exportedData */
                    exportedData?: (com.android.app.viewcapture.data.IExportedData|null);
                }

                /** Represents an EndTraceResponse. */
                class EndTraceResponse implements IEndTraceResponse {

                    /**
                     * Constructs a new EndTraceResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IEndTraceResponse);

                    /** EndTraceResponse exportedData. */
                    public exportedData?: (com.android.app.viewcapture.data.IExportedData|null);

                    /**
                     * Creates a new EndTraceResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns EndTraceResponse instance
                     */
                    public static create(properties?: com.android.app.motiontool.IEndTraceResponse): com.android.app.motiontool.EndTraceResponse;

                    /**
                     * Encodes the specified EndTraceResponse message. Does not implicitly
                     * {@link com.android.app.motiontool.EndTraceResponse.verify|verify} messages.
                     * @param message EndTraceResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IEndTraceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified EndTraceResponse message, length delimited. Does not
                     * implicitly {@link com.android.app.motiontool.EndTraceResponse.verify|verify}
                     * messages.
                     * @param message EndTraceResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IEndTraceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an EndTraceResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns EndTraceResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.EndTraceResponse;

                    /**
                     * Decodes an EndTraceResponse message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns EndTraceResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.EndTraceResponse;

                    /**
                     * Verifies an EndTraceResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an EndTraceResponse message from a plain object. Also converts
                     * values to their respective internal types.
                     * @param object Plain object
                     * @returns EndTraceResponse
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.EndTraceResponse;

                    /**
                     * Creates a plain object from an EndTraceResponse message. Also converts
                     * values to other types if specified.
                     * @param message EndTraceResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.EndTraceResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this EndTraceResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for EndTraceResponse
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a PollTraceRequest. */
                interface IPollTraceRequest {

                    /** PollTraceRequest traceId */
                    traceId?: (number|null);
                }

                /** Represents a PollTraceRequest. */
                class PollTraceRequest implements IPollTraceRequest {

                    /**
                     * Constructs a new PollTraceRequest.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IPollTraceRequest);

                    /** PollTraceRequest traceId. */
                    public traceId: number;

                    /**
                     * Creates a new PollTraceRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PollTraceRequest instance
                     */
                    public static create(properties?: com.android.app.motiontool.IPollTraceRequest): com.android.app.motiontool.PollTraceRequest;

                    /**
                     * Encodes the specified PollTraceRequest message. Does not implicitly
                     * {@link com.android.app.motiontool.PollTraceRequest.verify|verify} messages.
                     * @param message PollTraceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IPollTraceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PollTraceRequest message, length delimited. Does not
                     * implicitly {@link com.android.app.motiontool.PollTraceRequest.verify|verify}
                     * messages.
                     * @param message PollTraceRequest message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IPollTraceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PollTraceRequest message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PollTraceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.PollTraceRequest;

                    /**
                     * Decodes a PollTraceRequest message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PollTraceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.PollTraceRequest;

                    /**
                     * Verifies a PollTraceRequest message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PollTraceRequest message from a plain object. Also converts values
                     * to their respective internal types.
                     * @param object Plain object
                     * @returns PollTraceRequest
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.PollTraceRequest;

                    /**
                     * Creates a plain object from a PollTraceRequest message. Also converts values
                     * to other types if specified.
                     * @param message PollTraceRequest
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.PollTraceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PollTraceRequest to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for PollTraceRequest
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }

                /** Properties of a PollTraceResponse. */
                interface IPollTraceResponse {

                    /** PollTraceResponse exportedData */
                    exportedData?: (com.android.app.viewcapture.data.IExportedData|null);
                }

                /** Represents a PollTraceResponse. */
                class PollTraceResponse implements IPollTraceResponse {

                    /**
                     * Constructs a new PollTraceResponse.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: com.android.app.motiontool.IPollTraceResponse);

                    /** PollTraceResponse exportedData. */
                    public exportedData?: (com.android.app.viewcapture.data.IExportedData|null);

                    /**
                     * Creates a new PollTraceResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns PollTraceResponse instance
                     */
                    public static create(properties?: com.android.app.motiontool.IPollTraceResponse): com.android.app.motiontool.PollTraceResponse;

                    /**
                     * Encodes the specified PollTraceResponse message. Does not implicitly
                     * {@link com.android.app.motiontool.PollTraceResponse.verify|verify} messages.
                     * @param message PollTraceResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: com.android.app.motiontool.IPollTraceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified PollTraceResponse message, length delimited. Does not
                     * implicitly {@link
                     * com.android.app.motiontool.PollTraceResponse.verify|verify} messages.
                     * @param message PollTraceResponse message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: com.android.app.motiontool.IPollTraceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a PollTraceResponse message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns PollTraceResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.motiontool.PollTraceResponse;

                    /**
                     * Decodes a PollTraceResponse message from the specified reader or buffer,
                     * length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns PollTraceResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.motiontool.PollTraceResponse;

                    /**
                     * Verifies a PollTraceResponse message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a PollTraceResponse message from a plain object. Also converts
                     * values to their respective internal types.
                     * @param object Plain object
                     * @returns PollTraceResponse
                     */
                    public static fromObject(object: { [k: string]: any }): com.android.app.motiontool.PollTraceResponse;

                    /**
                     * Creates a plain object from a PollTraceResponse message. Also converts
                     * values to other types if specified.
                     * @param message PollTraceResponse
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: com.android.app.motiontool.PollTraceResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this PollTraceResponse to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for PollTraceResponse
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                     *   "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            /** Namespace viewcapture. */
            namespace viewcapture {

                /** Namespace data. */
                namespace data {

                    /** Properties of an ExportedData. */
                    interface IExportedData {

                        /** ExportedData frameData */
                        frameData?: (com.android.app.viewcapture.data.IFrameData[]|null);

                        /** ExportedData classname */
                        classname?: (string[]|null);
                    }

                    /** Represents an ExportedData. */
                    class ExportedData implements IExportedData {

                        /**
                         * Constructs a new ExportedData.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: com.android.app.viewcapture.data.IExportedData);

                        /** ExportedData frameData. */
                        public frameData: com.android.app.viewcapture.data.IFrameData[];

                        /** ExportedData classname. */
                        public classname: string[];

                        /**
                         * Creates a new ExportedData instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ExportedData instance
                         */
                        public static create(properties?: com.android.app.viewcapture.data.IExportedData): com.android.app.viewcapture.data.ExportedData;

                        /**
                         * Encodes the specified ExportedData message. Does not implicitly
                         * {@link com.android.app.viewcapture.data.ExportedData.verify|verify}
                         * messages.
                         * @param message ExportedData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: com.android.app.viewcapture.data.IExportedData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ExportedData message, length delimited. Does not
                         * implicitly
                         * {@link com.android.app.viewcapture.data.ExportedData.verify|verify}
                         * messages.
                         * @param message ExportedData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: com.android.app.viewcapture.data.IExportedData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an ExportedData message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ExportedData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.viewcapture.data.ExportedData;

                        /**
                         * Decodes an ExportedData message from the specified reader or buffer,
                         * length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns ExportedData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.viewcapture.data.ExportedData;

                        /**
                         * Verifies an ExportedData message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an ExportedData message from a plain object. Also converts
                         * values to their respective internal types.
                         * @param object Plain object
                         * @returns ExportedData
                         */
                        public static fromObject(object: { [k: string]: any }): com.android.app.viewcapture.data.ExportedData;

                        /**
                         * Creates a plain object from an ExportedData message. Also converts
                         * values to other types if specified.
                         * @param message ExportedData
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: com.android.app.viewcapture.data.ExportedData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ExportedData to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for ExportedData
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                         *   "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a FrameData. */
                    interface IFrameData {

                        /** FrameData timestamp */
                        timestamp?: (number|Long|null);

                        /** FrameData node */
                        node?: (com.android.app.viewcapture.data.IViewNode|null);
                    }

                    /** Represents a FrameData. */
                    class FrameData implements IFrameData {

                        /**
                         * Constructs a new FrameData.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: com.android.app.viewcapture.data.IFrameData);

                        /** FrameData timestamp. */
                        public timestamp: (number|Long);

                        /** FrameData node. */
                        public node?: (com.android.app.viewcapture.data.IViewNode|null);

                        /**
                         * Creates a new FrameData instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns FrameData instance
                         */
                        public static create(properties?: com.android.app.viewcapture.data.IFrameData): com.android.app.viewcapture.data.FrameData;

                        /**
                         * Encodes the specified FrameData message. Does not implicitly
                         * {@link com.android.app.viewcapture.data.FrameData.verify|verify}
                         * messages.
                         * @param message FrameData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: com.android.app.viewcapture.data.IFrameData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified FrameData message, length delimited. Does not
                         * implicitly
                         * {@link com.android.app.viewcapture.data.FrameData.verify|verify}
                         * messages.
                         * @param message FrameData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: com.android.app.viewcapture.data.IFrameData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a FrameData message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns FrameData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.viewcapture.data.FrameData;

                        /**
                         * Decodes a FrameData message from the specified reader or buffer, length
                         * delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns FrameData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.viewcapture.data.FrameData;

                        /**
                         * Verifies a FrameData message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a FrameData message from a plain object. Also converts values to
                         * their respective internal types.
                         * @param object Plain object
                         * @returns FrameData
                         */
                        public static fromObject(object: { [k: string]: any }): com.android.app.viewcapture.data.FrameData;

                        /**
                         * Creates a plain object from a FrameData message. Also converts values to
                         * other types if specified.
                         * @param message FrameData
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: com.android.app.viewcapture.data.FrameData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this FrameData to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for FrameData
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                         *   "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a ViewNode. */
                    interface IViewNode {

                        /** ViewNode classnameIndex */
                        classnameIndex?: (number|null);

                        /** ViewNode hashcode */
                        hashcode?: (number|null);

                        /** ViewNode children */
                        children?: (com.android.app.viewcapture.data.IViewNode[]|null);

                        /** ViewNode id */
                        id?: (string|null);

                        /** ViewNode left */
                        left?: (number|null);

                        /** ViewNode top */
                        top?: (number|null);

                        /** ViewNode width */
                        width?: (number|null);

                        /** ViewNode height */
                        height?: (number|null);

                        /** ViewNode scrollX */
                        scrollX?: (number|null);

                        /** ViewNode scrollY */
                        scrollY?: (number|null);

                        /** ViewNode translationX */
                        translationX?: (number|null);

                        /** ViewNode translationY */
                        translationY?: (number|null);

                        /** ViewNode scaleX */
                        scaleX?: (number|null);

                        /** ViewNode scaleY */
                        scaleY?: (number|null);

                        /** ViewNode alpha */
                        alpha?: (number|null);

                        /** ViewNode willNotDraw */
                        willNotDraw?: (boolean|null);

                        /** ViewNode clipChildren */
                        clipChildren?: (boolean|null);

                        /** ViewNode visibility */
                        visibility?: (number|null);

                        /** ViewNode elevation */
                        elevation?: (number|null);
                    }

                    /** Represents a ViewNode. */
                    class ViewNode implements IViewNode {

                        /**
                         * Constructs a new ViewNode.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: com.android.app.viewcapture.data.IViewNode);

                        /** ViewNode classnameIndex. */
                        public classnameIndex: number;

                        /** ViewNode hashcode. */
                        public hashcode: number;

                        /** ViewNode children. */
                        public children: com.android.app.viewcapture.data.IViewNode[];

                        /** ViewNode id. */
                        public id: string;

                        /** ViewNode left. */
                        public left: number;

                        /** ViewNode top. */
                        public top: number;

                        /** ViewNode width. */
                        public width: number;

                        /** ViewNode height. */
                        public height: number;

                        /** ViewNode scrollX. */
                        public scrollX: number;

                        /** ViewNode scrollY. */
                        public scrollY: number;

                        /** ViewNode translationX. */
                        public translationX: number;

                        /** ViewNode translationY. */
                        public translationY: number;

                        /** ViewNode scaleX. */
                        public scaleX: number;

                        /** ViewNode scaleY. */
                        public scaleY: number;

                        /** ViewNode alpha. */
                        public alpha: number;

                        /** ViewNode willNotDraw. */
                        public willNotDraw: boolean;

                        /** ViewNode clipChildren. */
                        public clipChildren: boolean;

                        /** ViewNode visibility. */
                        public visibility: number;

                        /** ViewNode elevation. */
                        public elevation: number;

                        /**
                         * Creates a new ViewNode instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ViewNode instance
                         */
                        public static create(properties?: com.android.app.viewcapture.data.IViewNode): com.android.app.viewcapture.data.ViewNode;

                        /**
                         * Encodes the specified ViewNode message. Does not implicitly
                         * {@link com.android.app.viewcapture.data.ViewNode.verify|verify}
                         * messages.
                         * @param message ViewNode message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: com.android.app.viewcapture.data.IViewNode, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ViewNode message, length delimited. Does not
                         * implicitly {@link
                         * com.android.app.viewcapture.data.ViewNode.verify|verify} messages.
                         * @param message ViewNode message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: com.android.app.viewcapture.data.IViewNode, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ViewNode message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ViewNode
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.android.app.viewcapture.data.ViewNode;

                        /**
                         * Decodes a ViewNode message from the specified reader or buffer, length
                         * delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns ViewNode
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.android.app.viewcapture.data.ViewNode;

                        /**
                         * Verifies a ViewNode message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a ViewNode message from a plain object. Also converts values to
                         * their respective internal types.
                         * @param object Plain object
                         * @returns ViewNode
                         */
                        public static fromObject(object: { [k: string]: any }): com.android.app.viewcapture.data.ViewNode;

                        /**
                         * Creates a plain object from a ViewNode message. Also converts values to
                         * other types if specified.
                         * @param message ViewNode
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: com.android.app.viewcapture.data.ViewNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ViewNode to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for ViewNode
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default
                         *   "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }
                }
            }
        }
    }
}
