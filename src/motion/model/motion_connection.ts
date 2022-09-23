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
 * Connection description that can be serialized to a URL for bookmarkability.
 */
export class WindowConnectionDescription {

  /**
   * @param deviceId Device serial number
   * @param processId Numeric process ID
   * @param processName Name of the process
   * @param windowId The window name being inspected
   */
  constructor(
      public readonly deviceId: string,
      public readonly processId: number | null,
      public readonly processName: string | null,
      public readonly windowId: string | null) {
  }

  /**
   * Create a connection description from a `JdwpController` backed connection
   *
   * @param activity_list's `appInfo` associated each window row
   * @throws {Error} if appInfo does not originate form a JdwpController
   */
  static createFromAppInfo(appInfo: AppInfo): WindowConnectionDescription {
    if (appInfo.type !== TYPE_JDWP) {
      throw new Error(
          'Window connections are only supported for ADB devices')
    }


    const deviceId = '';
    const processId = appInfo.pid;
    const processName = appInfo.pname;
    const windowId = appInfo.id;

    return new WindowConnectionDescription(deviceId, processId, processName, windowId);
  }

  /**
   * Parses  URL parameters to restore a bookmarked connection.
   *
   * @param urlParams from windwow.location.search
   * @throws {Error} if url params are missing or wrongly formatted.
   */
  static createFromUrlParams(urlParams: URLSearchParams): WindowConnectionDescription {
    const deviceId = urlParams.get('serial');
    if (deviceId == null) throw new Error('no device serial');

    const pidParameter = urlParams.get('pid');
    const processId = pidParameter ? Number.parseInt(pidParameter!) : null;
    if (processId === NaN) throw new Error('invalid process ID');

    const processName = urlParams.get('pname');

    const windowId = urlParams.get('wid');

    return new WindowConnectionDescription(deviceId, processId, processName, windowId);
  }
}