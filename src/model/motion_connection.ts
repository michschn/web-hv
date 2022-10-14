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

import { fixedRetryDelay, NonRetryableError, retry } from '../utils/retry';
import { checkNotNull, checkState } from '../utils/preconditions';
import { Deferred, isNamedError, namedError } from '../utils/utils';
import * as generated_proto from '../proto/motion.js';
import { LiveViewSource } from './video/live-view-source';
import { VideoCapture } from './video/video-capture';
import motion_proto = generated_proto.com.android.app.motiontool.proto;

const CLIENT_VERSION = 1;
const MOTION_TOOLS_CHUNK_TYPE = 0x4d_4f_54_4f; // 'MOTO';

export type State = OkState | ErrorState;

interface OkState {
  type: 'disconnected' | 'connecting' | 'connected' | 'unauthorized';
}

interface ErrorState {
  type: 'error';
  detail: 'deviceNotFound' | 'processNotFound' | 'windowNotFound' | 'unknown';
  message?: string;
  exception?: unknown;
}

/**
 * Connection description that can be serialized to a URL for bookmarkability.
 */
export class MotionConnection extends EventTarget {
  private _adbDevice?: AdbDevice;
  private _jdwp?: jdwp;

  /**
   * @param deviceId Device serial number
   * @param processId Numeric process ID
   * @param processName Name of the process
   * @param windowId The window name being inspected
   */
  constructor(
    public readonly deviceId: string,
    public readonly processId: number,
    public readonly processName: string,
    public readonly windowId: string
  ) {
    super();
  }

  /**
   * Parses  URL parameters to restore a bookmarked connection.
   *
   * @param urlParams from windwow.location.search
   * @throws {Error} if url params are missing or wrongly formatted.
   */
  static createFromUrlParams(urlParams: URLSearchParams): MotionConnection {
    function validatedParam(name: string, test: RegExp) {
      const value = urlParams.get(name);
      if (!value?.match(test)) {
        throw namedError('InvalidUrlParams', `Invalid param ${name} (${value})`);
      }
      return value!;
    }

    const deviceId = validatedParam('serial', /[a-zA-Z0-9]{14}/);
    const pid = Number.parseInt(validatedParam('pid', /\d+/));
    const processName = validatedParam('pname', /.+/);
    const windowId = validatedParam('wid', /.+/);

    return new MotionConnection(deviceId, pid, processName, windowId);
  }

  // Overall state of this motion connection.
  // This is a composite of the ADB, JDWP and DDMS state.
  private _state: State = { type: 'disconnected' };

  // Whether the _adbDevice is in the connected state.
  private _deviceConnected = false;
  // Completes when as soon as `_deviceConnected === true`
  private _deviceConnectedPromise = new Deferred<void>();

  get state() {
    return this._state;
  }

  private set state(newState: State) {
    this._state = newState;
    this.dispatchEvent(new CustomEvent('state-changed', { detail: newState }));
  }

  async connect() {
    if (this._state.type !== 'disconnected') {
      throw new Error(`Unable to connect. Unexpected state ${this._state}`);
    }

    checkState(!this._adbDevice);

    try {
      this.state = { type: 'connecting' };
      try {
        this._adbDevice = await createAdbDevice(this.deviceId);
      } catch (e) {
        if (isNamedError(e, 'DeviceNotFound')) {
          this.state = {
            type: 'error',
            detail: 'deviceNotFound',
            message: `No device with serial ${this.deviceId} found`,
          };
          return;
        }
        throw e;
      }
      this._adbDevice.stateCallback = this._deviceStateChanges.bind(this);
      await this._adbDevice.connect();

      await this._deviceConnectedPromise;

      checkState(!this._jdwp);
      this._jdwp = new jdwp(this.processId, this._adbDevice);
      let processName: string;
      try {
        processName = await this._readProcessName();
      } catch (e) {
        if (e instanceof Error && e.name === 'StreamDisconnectedError') {
          // An invalid PID caused the stream to be closed (via remote command)
          // upon trying to connect - this happens
          this.state = {
            type: 'error',
            detail: 'processNotFound',
            message: `Process with ID ${this.processId} not found`,
          };
          return;
        }
        throw e;
      }

      if (processName !== this.processName) {
        this.state = {
          type: 'error',
          detail: 'processNotFound',
          message: `Process ID ${this.processId} reported unexpected name (${processName}).`,
        };
        return;
      }

      await this.sendHandshake();
      // await this.sendHandshake();

      this.state = { type: 'connected' };
    } catch (e) {
      this.state = { type: 'error', detail: 'unknown', exception: e };
      throw e;
    }
  }

  async sendRequest(
    request: motion_proto.MotionToolsRequest
  ): Promise<motion_proto.MotionToolsResponse> {
    const jdwp = checkNotNull(this._jdwp);

    console.log(request);
    const requestBytes = motion_proto.MotionToolsRequest.encode(request).finish();

    const responseStream = await jdwp.writeChunk(MOTION_TOOLS_CHUNK_TYPE, requestBytes);
    if (responseStream.chunkType !== MOTION_TOOLS_CHUNK_TYPE) {
      throw new Error(`Unexpected chunk type 0x${responseStream.chunkType.toString(16)}`);
    }

    // The responseStream is prefixed with chunk code and length, which have already been consumed
    // by the jdwp.writeChunk's response read implementation. To grab the rest of the response as
    // a byte array for protobuf parsing, this has to be skipped.
    const responseProtoBytes = responseStream.data.slice(responseStream.pos);

    const motionToolsResponse = motion_proto.MotionToolsResponse.decode(responseProtoBytes);
    console.log(motionToolsResponse);

    return motionToolsResponse;
  }

  /**
   * Creates a new video source that mirrors the device display in realtime.
   */
  createLiveViewSource(): LiveViewSource {
    return new LiveViewSource(checkNotNull(this._adbDevice));
  }

  /**
   * Allows recording the device screen into an MP3 video.
   */
  async createVideoCapture(): Promise<VideoCapture> {
    return new VideoCapture(checkNotNull(this._adbDevice));
  }

  async disconnect() {}

  private _deviceStateChanges(state: ADB_DEVICE_STATE) {
    let deviceConnected = false;
    switch (state) {
      case STATE_DISCONNECTED:
        this._adbDevice?.closeAll();
        this._adbDevice?.disconnect();
        this._adbDevice = undefined;
        this.state = { type: 'disconnected' };
        break;
      case STATE_CONNECTING:
        this.state = { type: 'connecting' };
        break;
      case STATE_ERROR:
        this.state = {
          type: 'error',
          detail: 'unknown',
          exception: new Error('adbDevice reported error state'),
        };
        break;
      case STATE_UNAUTHORIZED:
        this.state = { type: 'unauthorized' };
        break;
      case STATE_CONNECTED_DEVICE:
        this.state = { type: 'connecting' };
        deviceConnected = true;
        break;
    }

    if (deviceConnected && !this._deviceConnected) {
      this._deviceConnected = true;
      this._deviceConnectedPromise.resolve();
    } else if (!deviceConnected && this._deviceConnected) {
      this._deviceConnected = false;
      this._deviceConnectedPromise = new Deferred();
    }
  }

  /** Sends an HELO packet to initialize the connection and read the process name. */
  async _readProcessName(): Promise<string> {
    const jdwp = checkNotNull(this._jdwp);

    const data = await jdwp.writeChunk('HELO', [0, 0, 0, 1]);
    const serverVersion = data.readInt();
    const processId = data.readInt();

    const vmDescriptionLength = data.readInt();
    const processNameLength = data.readInt();
    const vmDescription = data.readStr(vmDescriptionLength);
    const processName = data.readStr(processNameLength);

    console.log(`Connected to process ${processId} (${processName})`);

    return processName;
  }

  async sendHandshake(): Promise<void> {
    const request = new motion_proto.MotionToolsRequest({
      handshake: new motion_proto.HandshakeRequest({
        window: new motion_proto.WindowIdentifier({
          rootWindow: this.windowId,
        }),
        clientVersion: CLIENT_VERSION,
      }),
    });

    const handshakeResponse = (await this.sendRequest(request)).handshake;
    console.log(handshakeResponse);
  }
}

async function createAdbDevice(serial: string): Promise<AdbDevice> {
  const devices = await navigator.usb.getDevices();
  const actualDevice = devices.find(device => device.serialNumber === serial);

  if (!actualDevice) {
    throw namedError('DeviceNotFound', `No device with serial ${serial} found`);
  }

  const adbInterface = await retry(() => claimAdbInterface(actualDevice), {
    delay: fixedRetryDelay(500),
    attemptFailed: async (_, e) => {
      console.log('Device is use, trying reset', e);
      // Resetting the device will kill the connection of other tabs/clients.
      await actualDevice.reset();
    },
  });

  const adbDevice = new AdbDevice(actualDevice, adbInterface);
  return adbDevice;
}

async function claimAdbInterface(device: USBDevice): Promise<USBInterface> {
  await device.open();
  if (!device.configuration) {
    await device.selectConfiguration(1);
  }
  const adbInterface = device.configuration?.interfaces?.find(
    iface =>
      iface.alternate.interfaceClass === ADB_INTERFACE_CLASS &&
      iface.alternate.interfaceSubclass === ADB_INTERFACE_SUB_CLASS &&
      iface.alternate.interfaceProtocol === ADB_INTERFACE_PROTOCOL
  );

  if (adbInterface == null) {
    throw new NonRetryableError('Device does not support ADB interface');
  }
  await device.claimInterface(adbInterface.interfaceNumber);
  return adbInterface;
}
