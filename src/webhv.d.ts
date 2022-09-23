// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview declarations needed to integrate into the JS web-hv code.
 */

type StateCleanup = () => void;

/** WebHV calls these functions once upon invocation of `resetActiveState` */
declare let ActiveState: Array<StateCleanup>;

/**
 * Calls cleanup functions previously added to ActiveState.
 *
 * This is *typically* done when switching the top level functionality.
 */
declare function resetActiveState(): void;

interface ViewController {

  loadViewList(): Promise<any>

  captureView(viewName: string): Promise<any>

  profileView(viewName: string): Promise<any>

  customCommand(viewName: string, commandData: Uint8Array): Promise<any>
}


declare const TYPE_ERROR = -1;
declare const TYPE_ZIP = 0;
declare const TYPE_OLD = 1;
declare const TYPE_JDWP = 2;
declare const TYPE_BUG_REPORT = 3;
declare const TYPE_BUG_REPORT_V2 = 4;
declare const TYPE_TIME_LAPSE_BUG_REPORT = 5;
declare const TYPE_TIME_LAPSE_BUG_REPORT_DEPRECATED = 6;

declare type APP_INFO_TYPE =
    | typeof TYPE_ERROR
    | typeof TYPE_ZIP
    | typeof TYPE_OLD
    | typeof TYPE_JDWP
    | typeof TYPE_BUG_REPORT
    | typeof TYPE_BUG_REPORT_V2
    | typeof TYPE_TIME_LAPSE_BUG_REPORT
    | typeof TYPE_TIME_LAPSE_BUG_REPORT_DEPRECATED;

interface AppInfo {
  type: APP_INFO_TYPE,
  pid: number,
  device: AdbDevice,
  id: string,
  density: number,
  sdk_version: number,
  name: string,
  use_new_api: boolean,
  /** process name */
  pname: string,
  /**
   * A blob URL to the process icon.
   *
   * `value` will be set to the result of promise.
   */
  icon: Promise<string> & { value?: string }
}

declare function createViewController(appInfo: AppInfo): ViewController;

declare const STATE_DISCONNECTED = 0;
declare const STATE_CONNECTING = 1;
declare const STATE_ERROR = 2;
declare const STATE_UNAUTHORIZED = 3;
declare const STATE_CONNECTED_DEVICE = 4;

declare type  ADB_DEVICE_STATE =
    | typeof STATE_DISCONNECTED
    | typeof STATE_CONNECTING
    | typeof STATE_ERROR
    | typeof STATE_UNAUTHORIZED
    | typeof STATE_CONNECTED_DEVICE;

declare class AdbDevice {
  private constructor(device: USBDevice, interface: USBInterface);

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

declare type  STREAM_STATE =
    | typeof STREAM_OPEN
    | typeof STREAM_CLOSING
    | typeof STREAM_CLOSED;

declare class AdbStream {
  private constructor(device: AdbDevice, localId: number);

  device: AdbDevice;
  localId: number;
  remoteId: number;
  remoteIdResolved: Promise<number>;

  state: STREAM_STATE;
  keepOpen: boolean;

  read(length: number, callback: (result: Uint8Array) => void): void;

  readAll<T>(responseMerger: ResponseMerger<T>): Promise<T>;

  write(data: string | Uint8Array): Promise<void>;

  sendReady(): void;

  close(): void;
}

declare let adbDevice: AdbDevice;
