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

import {fixedRetryDelay, NonRetryableError, retry} from '../utils/retry';

export type State =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error'
  | 'unauthorized';

/**
 * Connection description that can be serialized to a URL for bookmarkability.
 */
export class MotionConnection extends EventTarget {
  private _adbDevice?: AdbDevice;

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
        throw new Error(`Invalid param ${name} (${value})`);
      }
      return value!;
    }

    const deviceId = validatedParam('serial', /[a-zA-Z0-9]{14}/);
    const pid = Number.parseInt(validatedParam('pid', /\d+/));
    const processName = validatedParam('pname', /.+/);
    const windowId = validatedParam('wid', /.+/);

    return new MotionConnection(deviceId, pid, processName, windowId);
  }

  private _state: State = 'disconnected';

  get state() {
    return this._state;
  }

  private set state(newState: State) {
    this._state = newState;
    this.dispatchEvent(new CustomEvent('state-changed', { detail: newState }));
  }

  async connect() {
    if (this._state !== 'disconnected') {
      throw new Error(`Unable to connect. Unexpected state ${this._state}`);
    }

    console.assert(!this._adbDevice);

    try {
      this.state = 'connecting';
      this._adbDevice = await createAdbDevice(this.deviceId);
      this._adbDevice.stateCallback = this._connectionStateChanges.bind(this);

      await this._adbDevice.connect();
    } catch (e) {
      this.state = 'error';
      throw e;
    }
  }

  async disconnect() {}

  private _connectionStateChanges(state: ADB_DEVICE_STATE) {
    switch (state) {
      case STATE_DISCONNECTED:
        this._adbDevice?.closeAll();
        this._adbDevice?.disconnect();
        this._adbDevice = undefined;
        this.state = 'disconnected';
        break;
      case STATE_CONNECTING:
        this.state = 'connecting';
        break;
      case STATE_ERROR:
        this.state = 'error';
        break;
      case STATE_UNAUTHORIZED:
        this.state = 'unauthorized';
        break;
      case STATE_CONNECTED_DEVICE:
        this.state = 'connected';
        break;
    }
  }
}

async function createAdbDevice(serial: string): Promise<AdbDevice> {
  const devices = await navigator.usb.getDevices();
  const actualDevice = devices.find(device => device.serialNumber === serial);

  if (!actualDevice) {
    throw new Error(`No device with serial ${serial} found`);
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
    throw new NonRetryableError('No interface found');
  }
  await device.claimInterface(adbInterface.interfaceNumber);
  return adbInterface;
}
