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

/** Namespace motion. */
export namespace motion {

    /** Properties of a Trace. */
    interface ITrace {

        /** Trace id */
        id?: (string|null);

        /** Trace version */
        version?: (number|null);

        /** Trace name */
        name?: (string|null);

        /** Trace captureTime */
        captureTime?: (google.protobuf.ITimestamp|null);

        /** Trace processName */
        processName?: (string|null);

        /** Trace windowName */
        windowName?: (string|null);

        /** Trace duration */
        duration?: (google.protobuf.IDuration|null);

        /** Trace videoMetadata */
        videoMetadata?: (motion.IVideoMetadata|null);
    }

    /** Represents a Trace. */
    class Trace implements ITrace {

        /**
         * Constructs a new Trace.
         * @param [properties] Properties to set
         */
        constructor(properties?: motion.ITrace);

        /** Trace id. */
        public id: string;

        /** Trace version. */
        public version: number;

        /** Trace name. */
        public name: string;

        /** Trace captureTime. */
        public captureTime?: (google.protobuf.ITimestamp|null);

        /** Trace processName. */
        public processName: string;

        /** Trace windowName. */
        public windowName: string;

        /** Trace duration. */
        public duration?: (google.protobuf.IDuration|null);

        /** Trace videoMetadata. */
        public videoMetadata?: (motion.IVideoMetadata|null);

        /**
         * Creates a new Trace instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Trace instance
         */
        public static create(properties?: motion.ITrace): motion.Trace;

        /**
         * Encodes the specified Trace message. Does not implicitly
         * {@link motion.Trace.verify|verify} messages.
         * @param message Trace message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: motion.ITrace, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Trace message, length delimited. Does not implicitly
         * {@link motion.Trace.verify|verify} messages.
         * @param message Trace message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: motion.ITrace, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Trace message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Trace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): motion.Trace;

        /**
         * Decodes a Trace message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Trace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): motion.Trace;

        /**
         * Verifies a Trace message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Trace message from a plain object. Also converts values to their respective
         * internal types.
         * @param object Plain object
         * @returns Trace
         */
        public static fromObject(object: { [k: string]: any }): motion.Trace;

        /**
         * Creates a plain object from a Trace message. Also converts values to other types if
         * specified.
         * @param message Trace
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: motion.Trace, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Trace to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Trace
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a VideoMetadata. */
    interface IVideoMetadata {

        /** VideoMetadata widthPx */
        widthPx?: (number|null);

        /** VideoMetadata heightPx */
        heightPx?: (number|null);

        /** VideoMetadata density */
        density?: (number|null);
    }

    /** Represents a VideoMetadata. */
    class VideoMetadata implements IVideoMetadata {

        /**
         * Constructs a new VideoMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: motion.IVideoMetadata);

        /** VideoMetadata widthPx. */
        public widthPx: number;

        /** VideoMetadata heightPx. */
        public heightPx: number;

        /** VideoMetadata density. */
        public density: number;

        /**
         * Creates a new VideoMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VideoMetadata instance
         */
        public static create(properties?: motion.IVideoMetadata): motion.VideoMetadata;

        /**
         * Encodes the specified VideoMetadata message. Does not implicitly
         * {@link motion.VideoMetadata.verify|verify} messages.
         * @param message VideoMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: motion.IVideoMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VideoMetadata message, length delimited. Does not implicitly
         * {@link motion.VideoMetadata.verify|verify} messages.
         * @param message VideoMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: motion.IVideoMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VideoMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VideoMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): motion.VideoMetadata;

        /**
         * Decodes a VideoMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VideoMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): motion.VideoMetadata;

        /**
         * Verifies a VideoMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VideoMetadata message from a plain object. Also converts values to their
         * respective internal types.
         * @param object Plain object
         * @returns VideoMetadata
         */
        public static fromObject(object: { [k: string]: any }): motion.VideoMetadata;

        /**
         * Creates a plain object from a VideoMetadata message. Also converts values to other types
         * if specified.
         * @param message VideoMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: motion.VideoMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VideoMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for VideoMetadata
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Frame. */
    interface IFrame {

        /** Frame frameNumber */
        frameNumber?: (number|Long|null);

        /** Frame frameNanos */
        frameNanos?: (number|Long|null);

        /** Frame videoTimeSeconds */
        videoTimeSeconds?: (number|null);

        /** Frame viewHierarchy */
        viewHierarchy?: (motion.IViewNode|null);
    }

    /** Represents a Frame. */
    class Frame implements IFrame {

        /**
         * Constructs a new Frame.
         * @param [properties] Properties to set
         */
        constructor(properties?: motion.IFrame);

        /** Frame frameNumber. */
        public frameNumber: (number|Long);

        /** Frame frameNanos. */
        public frameNanos: (number|Long);

        /** Frame videoTimeSeconds. */
        public videoTimeSeconds: number;

        /** Frame viewHierarchy. */
        public viewHierarchy?: (motion.IViewNode|null);

        /**
         * Creates a new Frame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Frame instance
         */
        public static create(properties?: motion.IFrame): motion.Frame;

        /**
         * Encodes the specified Frame message. Does not implicitly
         * {@link motion.Frame.verify|verify} messages.
         * @param message Frame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: motion.IFrame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Frame message, length delimited. Does not implicitly
         * {@link motion.Frame.verify|verify} messages.
         * @param message Frame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: motion.IFrame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Frame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Frame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): motion.Frame;

        /**
         * Decodes a Frame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Frame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): motion.Frame;

        /**
         * Verifies a Frame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Frame message from a plain object. Also converts values to their respective
         * internal types.
         * @param object Plain object
         * @returns Frame
         */
        public static fromObject(object: { [k: string]: any }): motion.Frame;

        /**
         * Creates a plain object from a Frame message. Also converts values to other types if
         * specified.
         * @param message Frame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: motion.Frame, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Frame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Frame
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ViewNode. */
    interface IViewNode {

        /** ViewNode classname */
        classname?: (string|null);

        /** ViewNode hashcode */
        hashcode?: (number|null);

        /** ViewNode children */
        children?: (motion.IViewNode[]|null);

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
        constructor(properties?: motion.IViewNode);

        /** ViewNode classname. */
        public classname: string;

        /** ViewNode hashcode. */
        public hashcode: number;

        /** ViewNode children. */
        public children: motion.IViewNode[];

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
        public static create(properties?: motion.IViewNode): motion.ViewNode;

        /**
         * Encodes the specified ViewNode message. Does not implicitly
         * {@link motion.ViewNode.verify|verify} messages.
         * @param message ViewNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: motion.IViewNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ViewNode message, length delimited. Does not implicitly
         * {@link motion.ViewNode.verify|verify} messages.
         * @param message ViewNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: motion.IViewNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ViewNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ViewNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): motion.ViewNode;

        /**
         * Decodes a ViewNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ViewNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): motion.ViewNode;

        /**
         * Verifies a ViewNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ViewNode message from a plain object. Also converts values to their respective
         * internal types.
         * @param object Plain object
         * @returns ViewNode
         */
        public static fromObject(object: { [k: string]: any }): motion.ViewNode;

        /**
         * Creates a plain object from a ViewNode message. Also converts values to other types if
         * specified.
         * @param message ViewNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: motion.ViewNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ViewNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ViewNode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

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
             * Encodes the specified Timestamp message. Does not implicitly
             * {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly
             * {@link google.protobuf.Timestamp.verify|verify} messages.
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
             * Creates a Timestamp message from a plain object. Also converts values to their
             * respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types
             * if specified.
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
             * Encodes the specified Duration message. Does not implicitly
             * {@link google.protobuf.Duration.verify|verify} messages.
             * @param message Duration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Duration message, length delimited. Does not implicitly
             * {@link google.protobuf.Duration.verify|verify} messages.
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
             * Creates a Duration message from a plain object. Also converts values to their
             * respective internal types.
             * @param object Plain object
             * @returns Duration
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Duration;

            /**
             * Creates a plain object from a Duration message. Also converts values to other types
             * if specified.
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
    }
}
