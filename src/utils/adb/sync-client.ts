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

import { Disposable } from '../disposer';
import { Deferred } from '../utils';
import { checkArgument, checkNotNull, checkState } from '../preconditions';

/**
 * ADB sync service client implementation.
 *
 * See https://android.googlesource.com/platform/packages/modules/adb/+/refs/heads/master/SYNC.TXT
 */
export class SyncClient implements Disposable {
  private _stream: AdbStream | null;

  constructor(device: AdbDevice) {
    this._stream = device.openStream('sync:');
    this._stream.keepOpen = true;
  }

  async getFileSize(path: string): Promise<number> {
    const stream = checkNotNull(this._stream, 'Sync client already disposed');
    await sendSyncCommand('STAT', path, stream);

    // http://cs.android.com/search?q=file:adb/file_sync_protocol%20symbol:sync_stat_v1
    const statV1Data = await readData(16, stream);
    const command = getCommandId(statV1Data);
    if (command != 'STAT') throw new Error(`Server answered with unexpected command '${command}'`);

    return statV1Data.getUint32(8, /* littleEndian*/ true);
  }

  async pull(path: string): Promise<ReadableStream<Uint8Array>> {
    checkState(this._stream != null, 'Sync client already disposed');

    // Use a separate stream for pulling the data, since reading will be async.
    const stream = this._stream!.device.openStream('sync:');
    stream.keepOpen = true;

    return new ReadableStream({
      async start(controller) {
        try {
          sendSyncCommand('RECV', path, stream);

          while (true) {
            // 4 bytes command ID, 4 bytes length
            const recvData = await readData(8, stream);
            const command = getCommandId(recvData);

            if (command == 'DONE') {
              return;
            }

            if (command != 'DATA') {
              throw new Error(`SYNC failed. Received '${command}', expected 'DATA'`);
            }

            const chunkSize = recvData.getUint32(4, /* littleEndian*/ true);
            const chunk = await readBytes(chunkSize, stream);
            controller.enqueue(chunk);
          }
        } catch (e) {
          controller.error(e);
        } finally {
          controller.close();
          stream.close();
        }
      },
    });
  }

  dispose(): void {
    this._stream?.close();
    this._stream = null;
  }
}

async function sendSyncCommand(commandId: string, path: string, stream: AdbStream) {
  // http://cs.android.com/search?q=file:adb/file_sync_protocol%20symbol:SyncRequest
  https: checkArgument(commandId.length == 4);
  checkArgument(path.length <= 1024);

  let out = new DataOutputStream();
  out.highFirst = false;
  out.writeBytes(stringToByteArray(commandId));
  const pathBytes = stringToByteArray(path);
  out.writeInt(pathBytes.length);
  out.writeBytes(pathBytes);
  await stream.write(new Uint8Array(out.data));
}

async function readBytes(numBytes: number, stream: AdbStream): Promise<Uint8Array> {
  const response = new Deferred<Uint8Array>();
  stream.read(numBytes, function (data) {
    response.resolve(data);
  });
  return response;
}

async function readData(numBytes: number, stream: AdbStream): Promise<DataView> {
  const bytes = await readBytes(numBytes, stream);
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function getCommandId(data: DataView) {
  return String.fromCharCode(data.getInt8(0), data.getInt8(1), data.getInt8(2), data.getInt8(3));
}
