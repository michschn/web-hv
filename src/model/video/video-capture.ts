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

import { delay } from '../../utils/utils';
import { SyncClient } from '../../utils/adb/sync-client';

/**
 * Captures a full-resolution device screenrecording.
 *
 * Durint the actual recording, the video is stored on-device, and upon calling stop(), a byte
 * stream is transferred. Once complete, the on-device recording is deleted.
 */
export class VideoCapture {
  private _captureState: CaptureState | null = null;

  constructor(private readonly _device: AdbDevice) {}

  async record(): Promise<void> {
    if (this._captureState !== null) return;

    const filename = `/data/local/tmp/motion-${Date.now()}.mp4`;
    const shellStream = this._device.openStream(
      `shell:screenrecord --output-format=mp4 ${filename}`
    );

    this._captureState = new CaptureState(shellStream, filename);
    // There is no information on when the recording actually started.
    // The video will be truncated at the UI level once recorded.
    await delay(200);
  }

  async stop(): Promise<ReadableStream<Uint8Array>> {
    if (this._captureState === null) {
      throw new Error('Illegal State: no video capture in progress');
    }
    const { filename, shellStream } = this._captureState;
    this._captureState = null;

    const adbDevice = this._device;

    // Send ctrl-c to end the recording.
    await shellStream.write('\x03');
    shellStream.close();
    // TODO: The stream is never correctly closed, which would be a good signal to understand
    // when the recording is completely written to disk.

    const sync = new SyncClient(adbDevice);
    try {
      // Await the file being written, with some timeout in case the heuristic was bad.
      await Promise.race([awaitScreenrecordingWritten(filename, sync), delay(10000)]);

      // Just pipe through the bytes, but delete the original recording on file once the
      // transfer is complete/
      const recordingDeleteGuard = new TransformStream({
        async flush(): Promise<void> {
          await adbDevice.shellCommand(`rm ${filename}`);
        },
      });

      (await sync.pull(filename)).pipeTo(recordingDeleteGuard.writable);

      return recordingDeleteGuard.readable;
    } finally {
      sync.dispose();
    }
  }
}

class CaptureState {
  constructor(public shellStream: AdbStream, public filename: string) {}
}

/**
 * Awaits the screenrecording in `filename` to be completely written.
 *
 * This uses a heuristic to determine when this is completed:
 * - poll the file size, and check whether it is increasing over a 50ms period
 * - assume a minimum file size of 5kb, since part of the header is already written when the
 *   recording is started
 *
 * The thresholds above were "randomly" selected.
 */
async function awaitScreenrecordingWritten(filename: string, syncClient: SyncClient) {
  let fileSize = await syncClient.getFileSize(filename);
  while (true) {
    await delay(1000);
    const updatedFileSize = await syncClient.getFileSize(filename);
    if (fileSize > 5000 && fileSize == updatedFileSize) {
      return;
    }
    fileSize = updatedFileSize;
  }
}
