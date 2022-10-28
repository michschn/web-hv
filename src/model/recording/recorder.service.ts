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

import { Inject, Injectable } from '@angular/core';
import { MotionConnection } from '../motion_connection';
import { checkNotNull, checkState } from '../../utils/preconditions';
import { Recording } from './recording';
import { VideoCapture } from '../video/video-capture';
import { com } from '../../proto/api.js';
import { google, motion } from '../../proto/storage.js';
import Long from 'long';
import { loadVideoMetadata } from './mp4parser';
import { BLOB_STORAGE_FACTORY, BlobStorage, BlobStorageFactory } from '../../storage/blob-storage';
import { BLOB_SCREENRECORDING_NAME, BLOB_TRACE_NAME } from './constants';
import { Deferred, longToBigInt } from '../../utils/utils';
import { Step } from '../script/definition';
import { ScriptRunner } from '../script/script-runner';
import { frameBinarySearch } from '../../utils/video';
import motion_tool = com.android.app.motiontool;
import view_capture = com.android.app.viewcapture.data;
import Timestamp = google.protobuf.Timestamp;
import Frame = motion.Frame;
import VideoMetadata = motion.VideoMetadata;
import Trace = motion.Trace;

const POLL_DELAY_MS = 5000;

const RECORDER_SERVICE_LOCK = 'recorder.service.ts.lifecycle';

@Injectable()
export class RecorderService {
  private _inProgressRecording: OngoingRecording | null = null;

  constructor(
    private readonly _motionConnection: MotionConnection,
    @Inject(BLOB_STORAGE_FACTORY) private readonly _blobStorageFactory: BlobStorageFactory
  ) {}

  private _isRecording = false;

  get isRecording(): boolean {
    return this._isRecording;
  }

  async loadRecoring(recordingId: string): Promise<Recording> {
    return Recording.load(await this._blobStorageFactory(recordingId));
  }

  async recordScript(script: string): Promise<string> {
    return await navigator.locks.request(RECORDER_SERVICE_LOCK, async () => {
      this._isRecording = true;

      const recording = new Deferred<string>();

      try {
        const scriptRunner = new ScriptRunner(this._motionConnection, {
          beginRecording: () => this._doStartRecording(),
          endRecording: async () => {
            const result = await this._doStopRecording();
            await result.traceEnded;
            result.recordingAvailable.then(recordingId => recording.resolve(recordingId));
          },
        });

        await scriptRunner.run(script);

        // The validated script is guaranteed to contain begin/endRecording calls
        return await recording;
      } finally {
        this._isRecording = false;
      }
    });
  }

  /**
   * Starts recording a motion trace for this recorder's `MotionConnection`.
   *
   * Only one trace can be active at the moment - this method throws an error is there is already
   * a session running.
   */
  async startRecording(script?: ReadonlyArray<Step>): Promise<void> {
    await navigator.locks.request(RECORDER_SERVICE_LOCK, async () => {
      this._isRecording = true;
      await this._doStartRecording();
    });
  }

  async stopRecording(): Promise<string> {
    return await navigator.locks.request(RECORDER_SERVICE_LOCK, async () => {
      try {
        const result = await this._doStopRecording();
        return result.recordingAvailable;
      } finally {
        this._isRecording = false;
      }
    });
  }

  private async _doStartRecording() {
    checkState(!this._inProgressRecording);

    const videoCapture = await this._motionConnection.createVideoCapture();

    // start the motion trace first. Since motion frame data must be available for all video frames,
    // it's easy to just toss out the extra motion trace data afterwards.
    const traceId = await this._beginTrace();

    await videoCapture.record();

    this._inProgressRecording = new OngoingRecording(videoCapture, traceId);

    this._scheduleTraceDataPoll();
  }

  private async _doStopRecording(): Promise<{
    traceEnded: Promise<void>;
    recordingAvailable: Promise<string>;
  }> {
    const recording = checkNotNull(this._inProgressRecording);
    this._inProgressRecording = null;

    // Stop video recording
    const { video } = await recording.videoCapture.stop();

    await this._cancelTraceDataPoll();

    const recordingId = crypto.randomUUID();
    const blobStorage = await this._blobStorageFactory(recordingId);

    const traceEnded = this._endTrace(recording);
    const recordingAvailable = traceEnded.then(async () => {
      const videoCaptureBytes = await video;
      await videoCaptureBytes.pipeTo(await blobStorage.writeable(BLOB_SCREENRECORDING_NAME));

      const { processName, windowId } = this._motionConnection;
      const windowName = windowId.substring(0, windowId.indexOf('/'));

      await createTraceFile(blobStorage, {
        recordingId,
        startTime: recording.startTime,
        capturedMotion: recording.pollData,
        processName,
        windowName,
      });

      return recordingId;
    });
    return { traceEnded, recordingAvailable };
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

  private _scheduledTraceDataPoll?: number;
  private _runningTraceDataPoll: Promise<void> = Promise.resolve();

  async _scheduleTraceDataPoll() {
    if (!this._inProgressRecording) return;

    this._scheduledTraceDataPoll = window.setTimeout(async () => {
      this._scheduledTraceDataPoll = undefined;
      this._runningTraceDataPoll = this._collectTraceData();
      this._runningTraceDataPoll.then(() => this._scheduleTraceDataPoll());
    }, POLL_DELAY_MS);
  }

  async _cancelTraceDataPoll() {
    await this._runningTraceDataPoll;
    clearInterval(this._scheduledTraceDataPoll);
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
  }
}

class OngoingRecording {
  readonly startTime: Date;
  readonly pollData: view_capture.IExportedData[] = [];
  constructor(public readonly videoCapture: VideoCapture, public readonly traceId: number) {
    this.startTime = new Date();
  }
}

async function createTraceFile(
  blobStorage: BlobStorage,
  data: {
    recordingId: string;
    startTime: Date;
    capturedMotion: view_capture.IExportedData[];
    processName: string;
    windowName: string;
  }
): Promise<void> {
  const videoMetadata = await loadVideoMetadata(blobStorage);

  const frameToViewHierarchy: Map<bigint, motion.IViewNode> = new Map(
    data.capturedMotion.flatMap(chunk => [...toFrameByFrameViewHierarchy(chunk).entries()])
  );

  let motionFrameTimes = [...frameToViewHierarchy.keys()].sort();

  let sum = 0n;
  for (let i = 1; i < motionFrameTimes.length; i++) {
    sum += motionFrameTimes[i] - motionFrameTimes[i - 1];
  }

  const avg = sum / BigInt(motionFrameTimes.length - 1);

  // checkState(videoMetadata.videoFrames.length <= motionFrameTimes.length);

  const frames = videoMetadata.videoFrames.map((frame, index) => {
    // There are no stable identifers for the video to match to. experimentation with
    // `adb shell dumpsys gfxinfo framestats` suggest that the current delay from rendering
    // screen is 3 frames. We go with that until we have a better ID on the video frame.
    const traceFrameIndex = frameBinarySearch(frame.ptsNanos -4n * avg, motionFrameTimes);
    return new Frame({
      frameNumber: frame.index,
      videoTimeSeconds: frame.time,
      viewHierarchy: frameToViewHierarchy.get(motionFrameTimes[traceFrameIndex]),
    });
  });

  const trace = new Trace({
    id: data.recordingId,
    version: 1,
    name: `Recording on ${data.startTime}`,
    captureTime: new Timestamp({
      seconds: data.startTime.getTime() / 1000,
      nanos: (data.startTime.getTime() % 1000) * 1_000_000,
    }),
    processName: data.processName,
    windowName: data.windowName,
    duration: new Timestamp({
      seconds: Number(videoMetadata.duration_nanos / 1_000_000_000n),
      nanos: Number(videoMetadata.duration_nanos % 1_000_000_000n),
    }),
    videoMetadata: new VideoMetadata({
      widthPx: videoMetadata.width,
      heightPx: videoMetadata.height,
    }),
    frames,
  });

  const traceBytes = Trace.encode(trace).finish();
  const writer = (await blobStorage.writeable(BLOB_TRACE_NAME)).getWriter();
  try {
    await writer.write(traceBytes);
  } finally {
    await writer.close();
    writer.releaseLock();
  }
}
function toFrameByFrameViewHierarchy({
  frameData,
  classname,
}: view_capture.IExportedData): Map<bigint, motion.IViewNode> {
  function getClassName(classNameIndex: number) {
    return classname?.at(classNameIndex) ?? 'UNKNOWN';
  }

  return new Map(
    frameData!.map(({ timestamp, node: rootNode }) => {
      return [
        longToBigInt(Long.fromValue(checkNotNull(timestamp))),
        convertViewHierarchy(checkNotNull(rootNode), getClassName),
      ];
    })
  );
}

function convertViewHierarchy(
  node: view_capture.IViewNode,
  getClassName: (classNameIndex: number) => string
): motion.IViewNode {
  return new motion.ViewNode({
    // cannot just spread node here (as in `...node`), because default values
    // get lost in the proto3 conversion.
    classname: node.classnameIndex ? getClassName(node.classnameIndex) : null,
    hashcode: node.hashcode,
    id: node.id,
    left: node.left,
    top: node.top,
    width: node.width,
    height: node.height,
    scrollX: node.scrollX,
    scrollY: node.scrollY,
    translationX: node.translationX,
    translationY: node.translationY,
    scaleX: node.scaleX,
    scaleY: node.scaleY,
    alpha: node.alpha,
    willNotDraw: node.willNotDraw,
    clipChildren: node.clipChildren,
    visibility: node.visibility,
    elevation: node.elevation,

    children: node.children?.map(child => convertViewHierarchy(child, getClassName)),
  });
}
