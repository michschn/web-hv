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

/**
 * @fileoverview declarations needed to integrate into the JS web-hv code.
 */

declare const ADB_INTERFACE_CLASS: number;
declare const ADB_INTERFACE_SUB_CLASS: number;
declare const ADB_INTERFACE_PROTOCOL: number;

declare const ADB_DEVICE_FILTER: Record<any, any>;

declare const STATE_DISCONNECTED = 0;
declare const STATE_CONNECTING = 1;
declare const STATE_ERROR = 2;
declare const STATE_UNAUTHORIZED = 3;
declare const STATE_CONNECTED_DEVICE = 4;

declare type ADB_DEVICE_STATE =
  | typeof STATE_DISCONNECTED
  | typeof STATE_CONNECTING
  | typeof STATE_ERROR
  | typeof STATE_UNAUTHORIZED
  | typeof STATE_CONNECTED_DEVICE;

declare class AdbDevice {
  constructor(device: USBDevice, interface: USBInterface);

  stateCallback?: (state: ADB_DEVICE_STATE) => void;

  device: USBDevice;

  interface: USBInterface;

  state: ADB_DEVICE_STATE;

  connect(): Promise<void>;

  openStream(command: string): AdbStream;

  shellCommand(command: string): Promise<string>;

  closeAll(): void;

  disconnect(): void;

  sendFile(deviceTargetPath: string, sourceUrl: string): Promise<void>;
}

interface ResponseMerger<T> {
  result: T;

  merge(data: Uint8Array): void;
}

declare class TextResponseMerger implements ResponseMerger<string> {
  result: string;

  merge(data: Uint8Array): void;
}

declare class ByteResponseMerger implements ResponseMerger<Uint8Array | null> {
  result: Uint8Array | null;

  merge(data: Uint8Array): void;
}

declare const STREAM_OPEN = 0;
declare const STREAM_CLOSING = 1;
declare const STREAM_CLOSED = 2;

declare type STREAM_STATE = typeof STREAM_OPEN | typeof STREAM_CLOSING | typeof STREAM_CLOSED;

declare class AdbStream {
  private constructor(device: AdbDevice, localId: number);

  device: AdbDevice;

  localId: number;

  remoteId: number;

  remoteIdResolved: Promise<number>;

  state: STREAM_STATE;

  keepOpen: boolean;

  onReceiveWrite: (data: Uint8Array) => void;

  read(length: number, callback: (result: Uint8Array) => void): void;

  readAll<T>(responseMerger: ResponseMerger<T>): Promise<T>;

  write(data: string | Uint8Array): Promise<void>;

  sendReady(): void;

  close(): void;
}

declare class jdwp {
  static STATUS_DISCONNECTED: number;
  static STATUS_CONNECTING: number;
  static STATUS_CONNECTED: number;

  constructor(pid: number, device: AdbDevice);

  readonly device: AdbDevice;
  readonly pid: number;
  readonly status: number;

  destroy(): void;

  /**
   * Writes a chunk with the specified payload, then waits for the response.
   *
   * NOTE: there are multiple failure modes: communication failure will result
   * in a rejected promise, while application-level errors are indicated via
   * the `chunkType`.
   *
   * @param type the 4-byte DDM chunk type, either as an ASCII string or an
   *   32-bit int
   * @param data byte data to send as a chunk argument. all numbers are
   *   interpreted as an unsigned 8-bit number.
   * @return DataInputStream with the position starting at the response
   *   payload. The chunk type as responed by the server is already consumed,
   *   and exposed as the `chunkType` property.
   */
  writeChunk(
    type: string | number,
    data: DataOutputStream | Array<number> | Uint8Array
  ): Promise<DataInputStream & { chunkType: number }>;
}

/** Converts a 4-letter chunk type to the 32bit int version. */
declare function getChunkType(type: string): number;

/**
 * Reads a byte buffer sequentially.
 *
 * DANGER: This API is error-prone, and the encoding not well-defined. Use
 * protobufs for new API.
 */
declare class DataOutputStream {
  static intMax: number;
  static shortMax: number;
  static intSignedMax: number;

  // Array of numbers which are interpreted as bytes (0-255)
  data: Array<number>;
  highFirst: boolean; // default true

  writeByte(byte: number, position?: number): void;

  writeBytes(bytes: Array<number>, position?: number): void;

  writeInt(int: number, position: number): void;

  writeFloat(int: number, position: number): void;

  writeStr(str: string, doNotWriteLen?: boolean): void;
}

declare function deferred<T>(): Promise<T> & {
  accept: (value: T) => void;
  reject: (reason?: any) => void;
};

/**
 * Reads a byte buffer sequentially.
 *
 * DANGER: This API is error-prone, and the encoding not well-defined. Use
 * protobufs for new API.
 */
declare class DataInputStream {
  constructor(data: Uint8Array);

  data: Uint8Array;
  pos: number;

  /** Consumes and returns a byte from the stream. */
  read(): number;

  /** Consumes and returns a signed 32-bit integer from the stream. */
  readInt(): number;

  /** Consumes and returns a signed 16-bit integer from the stream. */
  readShort(): number;

  /** Consumes and returns a float (32-bit) from the stream. */
  readFloat(): number;

  /** Consumes and returns a float (64-bit) from the stream. */
  readDouble(): number;

  /**
   * Consumes a string from `length` UTF-16 codepoints.
   * If the length is not specified, it is first read as an 32-bit int from the
   * stream
   */
  readStr(length?: number): string;

  /**
   * Consumes a string of ASCII characters.
   *
   * DANGER: the server side implementation sends UTF-8, thus this won't decode
   * correctly for non-ASCII characters
   */
  readStrSmall(): string;
}
