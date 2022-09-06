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
    /** @type {String} Device serial number. */
    #deviceId;
    /** @type {Number} Numeric process ID. */
    #processId;
    /** @type {String} Name of the process. */
    #processName;
    /** @type {String} The window name being inspected. */
    #windowId;

    constructor(deviceId, processId, processName, windowId) {
        this.#deviceId = deviceId;
        this.#processId = processId;
        this.#processName = processName;
        this.#windowId = windowId;
    }

    /**
     * Create a connection description from a `JdwpController` backed connection
     *
     * @param {Object} activity_list's `appInfo` associated each window row
     * @return {WindowConnectionDescription}
     * @throws {Error} if appInfo does not originate form a JdwpController
     */
    static async createFromAppInfo(appInfo) {
        if (appInfo.type !== TYPE_JDWP) {
            throw new Error(
                'Window connections are only supported for ADB devices')
        }

        const deviceId = deviceId;
        const processId = appInfo.pid;
        const processName = appInfo.pname;
        const windowId = appInfo.id;
    }

    /**
     * Parses  URL parameters to restore a bookmarked connection.
     *
     * @param {URLSearchParams} urlParams from windwow.location.search
     * @throws {Error} if url params are missing or wrongly formatted.
     */
    static createFromUrlParams(urlParams) {
        const deviceId = urlParams.get('serial');
        const processid = urlParams.get('pid');
        const processName = urlParams.get('pname');
        const windowId = urlParams.get('wid');
    }
}