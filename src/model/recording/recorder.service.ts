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
import * as api_proto from '../../proto/api.js';
import * as storage_proto from '../../proto/storage.js';
import { FILENAME_SCREENRECORDING, FILENAME_TRRACE, getOrCreateFileHandle } from './files';
import Long from 'long';
import motion_tool = api_proto.com.android.app.motiontool;
import view_capture = api_proto.com.android.app.viewcapture.data;
import storage = storage_proto.motion;

const POLL_DELAY_MS = 500;

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

    // start the motion trace first. Since motion frame data must be available for all video frames,
    // it's easy to just toss out the extra motion trace data afterwards.
    const traceId = await this._beginTrace();

    await videoCapture.record();

    const nextPollHandle = window.setTimeout(() => this._collectTraceData(), POLL_DELAY_MS);

    this._inProgressRecording = new OngoingRecording(videoCapture, traceId, nextPollHandle);
  }

  async stopRecording(): Promise<string> {
    try {
      const recording = checkNotNull(this._inProgressRecording);
      clearInterval(recording.nextPollHandle);

      const recordingId = crypto.randomUUID();

      // Stop video recording
      const videoCaptureBytes = await recording.videoCapture.stop();
      await Promise.all([
        this._endTrace(recording),
        await storeScreenRecording(videoCaptureBytes, recordingId),
      ]);

      const { processName, windowId } = this._motionConnection;
      const windowName = windowId.substring(0, windowId.indexOf('/'));

      await createTraceFile(recordingId, {
        startTime: recording.startTime,
        capturedMotion: recording.pollData,
        processName,
        windowName,
      });

      return recordingId;
    } finally {
      this._inProgressRecording = null;
    }
  }

  async _beginTrace(): Promise<number> {
    const request = new motion_tool.MotionToolsRequest({
      beginTrace: new motion_tool.BeginTraceRequest({
        window: new motion_tool.WindowIdentifier({
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

  async _endTrace(recording: OngoingRecording): Promise<void> {
    const request = new motion_tool.MotionToolsRequest({
      endTrace: new motion_tool.EndTraceRequest({
        traceId: recording.traceId,
      }),
    });

    const response = await this._motionConnection.sendRequest(request);
    if (response.error) {
      throw new Error(response.error.message ?? 'Unknown error');
    }
    const exportedData = checkNotNull(response.endTrace?.exportedData);
    recording.pollData.push(exportedData);
    return;
  }

  async _collectTraceData(): Promise<void> {
    const recordingState = checkNotNull(this._inProgressRecording);
    const request = new motion_tool.MotionToolsRequest({
      pollTrace: new motion_tool.PollTraceRequest({
        traceId: recordingState.traceId,
      }),
    });

    const response = await this._motionConnection.sendRequest(request);
    if (response.error) {
      throw new Error(response.error.message ?? 'Unknown error');
    }

    const exportedData = checkNotNull(response.pollTrace?.exportedData);
    recordingState.pollData.push(exportedData);

    if (this._inProgressRecording === recordingState) {
      // if still in progress, schedule the next poll.
      recordingState.nextPollHandle = window.setTimeout(
        () => this._collectTraceData(),
        POLL_DELAY_MS
      );
    }
  }
}

class OngoingRecording {
  readonly startTime: Date;
  readonly pollData: view_capture.IExportedData[] = [];
  constructor(
    public readonly videoCapture: VideoCapture,
    public readonly traceId: number,
    public nextPollHandle: number
  ) {
    this.startTime = new Date();
  }
}

async function storeScreenRecording(
  videoSourceStream: ReadableStream<Uint8Array>,
  recordingId: string
): Promise<void> {
  const recordingFile = await getOrCreateFileHandle(FILENAME_SCREENRECORDING, recordingId);
  const fileTargetStream = await recordingFile.createWritable();
  await videoSourceStream.pipeTo(fileTargetStream);
}

async function createTraceFile(
  recordingId: string,
  data: {
    startTime: Date;
    capturedMotion: view_capture.IExportedData[];
    processName: string;
    windowName: string;
  }
): Promise<void> {
  const trace = new storage.Trace({
    id: recordingId,
    version: 1,
    name: `Recording on ${data.startTime}`,
    captureTime: new storage_proto.google.protobuf.Timestamp({
      seconds: data.startTime.getTime() / 1000,
      nanos: (data.startTime.getTime() % 1000) * 1_000_000,
    }),
    processName: data.processName,
    windowName: data.windowName,
  });

  const frameToViewHierarchy: Map<Long, storage_proto.motion.IViewNode> = new Map(
    data.capturedMotion.flatMap(chunk => [...toFrameByFrameViewHierarchy(chunk).entries()])
  );

  console.log(`trace`, trace, frameToViewHierarchy);
  const traceBytes = storage.Trace.encode(trace).finish();
  const traceFile = await getOrCreateFileHandle(FILENAME_TRRACE, recordingId);
  const traceFileStream = await traceFile.createWritable();
  try {
    traceFileStream.write(traceBytes);
  } finally {
    traceFileStream.close();
  }
}
function toFrameByFrameViewHierarchy({
  frameData,
  classname,
}: view_capture.IExportedData): Map<Long, storage_proto.motion.IViewNode> {
  function getClassName(classNameIndex: number) {
    return classname?.at(classNameIndex) ?? 'UNKNOWN';
  }

  return new Map(
    frameData!.map(({ timestamp, node: rootNode }) => {
      return [
        Long.fromValue(checkNotNull(timestamp)),
        convertViewHierarchy(checkNotNull(rootNode), getClassName),
      ];
    })
  );
}

function convertViewHierarchy(
  node: view_capture.IViewNode,
  getClassName: (classNameIndex: number) => string
): storage_proto.motion.IViewNode {
  return new storage_proto.motion.ViewNode({
    ...node,
    classname: node.classnameIndex ? getClassName(node.classnameIndex) : null,
    children: node.children?.map(child => convertViewHierarchy(child, getClassName)),
  });
}
