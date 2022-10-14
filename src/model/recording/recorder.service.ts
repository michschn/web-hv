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
import * as generated_proto from '../../proto/motion.js';
import motion_proto = generated_proto.com.android.app.motiontool.proto;

@Injectable()
export class RecorderService {
  private _inProgressRecording: OngoingRecording | null = null;

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

    const [traceId] = await Promise.all([this._beginTrace(), videoCapture.record()]);

    const pollInterval = window.setInterval(() => this._collectTraceData(), 100);

    this._inProgressRecording = new OngoingRecording(videoCapture, traceId, pollInterval);
  }

  async stopRecording(): Promise<string> {
    try {
      const recording = checkNotNull(this._inProgressRecording);

      const motionDataProto = new Uint8Array();

      const [traceData, videoCaptureBytes] = await Promise.all([
        this._endTrace(recording),
        recording.videoCapture.stop(),
      ]);

      console.log(traceData);

      const recordingId = await this._createRecordingEntry(motionDataProto);

      await this._storeScreenRecording(videoCaptureBytes, recordingId);

      return recordingId;
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

  async _beginTrace(): Promise<number> {
    const request = new motion_proto.MotionToolsRequest({
      beginTrace: new motion_proto.BeginTraceRequest({
        window: new motion_proto.WindowIdentifier({
          rootWindow: this._motionConnection.windowId,
        }),
      }),
    });

    const response = await this._motionConnection.sendRequest(request);
    if (response.error) {
      throw new Error(response.error.message ?? 'Unknown error');
    }
    return checkNotNull(response.beginTrace?.traceId);
  }

  async _endTrace(recording: OngoingRecording): Promise<Array<motion_proto.IFrameData>> {
    clearInterval(recording.pollIntervalId);
    await this._collectTraceData();

    const request = new motion_proto.MotionToolsRequest({
      endTrace: new motion_proto.EndTraceRequest({
        traceId: recording.traceId,
      }),
    });

    const response = await this._motionConnection.sendRequest(request);
    if (response.error) {
      throw new Error(response.error.message ?? 'Unknown error');
    }
    return recording.frameData;
  }

  async _collectTraceData(): Promise<void> {
    const recordingState = checkNotNull(this._inProgressRecording);
    const request = new motion_proto.MotionToolsRequest({
      pollTrace: new motion_proto.PollTraceRequest({
        traceId: recordingState.traceId,
      }),
    });

    const response = await this._motionConnection.sendRequest(request);
    if (response.error) {
      throw new Error(response.error.message ?? 'Unknown error');
    }

    const frameData = checkNotNull(response.pollTrace?.frameData);
    recordingState.frameData.push(...frameData);
  }
}

class OngoingRecording {
  readonly frameData: motion_proto.IFrameData[] = [];
  constructor(
    public readonly videoCapture: VideoCapture,
    public readonly traceId: number,
    public readonly pollIntervalId: number
  ) {}
}

async function getOrCreateFileHandle(name: string, directory: FileSystemDirectoryHandle) {
  try {
    return await directory.getFileHandle(name);
  } catch {
    return await directory.getFileHandle(name, { create: true });
  }
}
