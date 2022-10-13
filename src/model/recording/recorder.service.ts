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

import { Injectable } from '@angular/core';
import { MotionConnection } from '../motion_connection';
import { checkNotNull, checkState } from '../../utils/preconditions';
import { Recording } from './recording';
import { VideoCapture } from '../video/video-capture';

@Injectable()
export class RecorderService {
  private _inProgressRecording: OngoingRecordingImpl | null = null;

  constructor(private readonly _motionConnection: MotionConnection) {
    checkState(Worker !== undefined);
  }

  get isRecording(): boolean {
    return this._inProgressRecording != null;
  }

  async loadRecoring(recordingId: string): Promise<Recording> {
    return Recording.load(recordingId);
  }

  async startRecording(): Promise<void> {
    checkState(!this._inProgressRecording);

    const videoCapture = await this._motionConnection.createVideoCapture();

    this._inProgressRecording = new OngoingRecordingImpl(videoCapture);

    await videoCapture.record();
  }

  async stopRecording(): Promise<Recording> {
    try {
      const recording = checkNotNull(this._inProgressRecording);

      const motionDataProto = new Uint8Array();

      const recordingPromise = this._createRecordingEntry(motionDataProto);
      const videoCapturePromise = recording.videoCapture.stop();

      const recordingId = await recordingPromise;

      await this._storeScreenRecording(await videoCapturePromise, recordingId);

      return this.loadRecoring(recordingId);
    } finally {
      this._inProgressRecording = null;
    }
  }

  private async _createRecordingEntry(motionDataProto: Uint8Array): Promise<string> {
    const recordingId = crypto.randomUUID();

    const rootDataDirectory = await navigator.storage.getDirectory();
    const recordingDataDirectory = await rootDataDirectory.getDirectoryHandle(recordingId, {
      create: true,
    });
    const motionDataFile = await recordingDataDirectory.getFileHandle('motion.data', {
      create: true,
    });

    return recordingId;
  }

  private async _storeScreenRecording(
    videoSourceStream: ReadableStream<Uint8Array>,
    recordingId: string
  ) {
    const rootDataDirectory = await navigator.storage.getDirectory();
    const recordingDataDirectory = await rootDataDirectory.getDirectoryHandle(recordingId);

    const recordingFile = await getOrCreateFileHandle('screenrecord.mp4', recordingDataDirectory);
    const fileTargetStream = await recordingFile.createWritable();
    await videoSourceStream.pipeTo(fileTargetStream);
  }
}

class OngoingRecordingImpl {
  constructor(public readonly videoCapture: VideoCapture) {}
}

async function getOrCreateFileHandle(name: string, directory: FileSystemDirectoryHandle) {
  try {
    return await directory.getFileHandle(name);
  } catch {
    return await directory.getFileHandle(name, { create: true });
  }
}
