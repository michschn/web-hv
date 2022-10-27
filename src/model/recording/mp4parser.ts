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

import { Buffer, createFile as createParser, FileInfo, Sample, VideoTrack } from 'mp4box';
import { BlobStorage } from '../../storage/blob-storage';
import { BLOB_SCREENRECORDING_NAME } from './constants';
import { arrayBufferEquals } from '../../utils/utils';
import { checkState } from '../../utils/preconditions';

const WINSCOPE_MAGIC_STRING_V1 = new TextEncoder().encode('#VV1NSC0PET1ME!#');
const WINSCOPE_MAGIC_STRING_V2 = new TextEncoder().encode('#VV1NSC0PET1ME2#');
const WINSCOPE_MAGIC_STRING_LENGTH = 16;

export interface VideoMetadata {
  /** video width in pixels */
  width: number;
  /** video height in pixels */
  height: number;
  /** video duration in nanoseconds */
  duration_nanos: bigint;

  videoFrames: FrameMetadata[];
}

export interface FrameMetadata {
  /** 0-based frame index of the video. */
  index: number;
  /** Frame time, represented as a double-precision floating-point value in seconds. */
  time: number;
  /** Presentation time relative to the elapsed realtime clock in microseconds. */
  winscope1PtsMicros?: bigint;
}

export async function loadVideoMetadata(
  storage: BlobStorage,
  options?: { readFrameData: boolean }
): Promise<VideoMetadata> {
  const readFrameData = options?.readFrameData ?? false;
  let parseError: string | undefined;
  let fileInfo: FileInfo | undefined;
  let videoTrack: VideoTrack | undefined;

  const parser = createParser();
  parser.onError = errorMessage => {
    console.error(`mp4box parser error: ${errorMessage}`);
    parseError = errorMessage;
  };

  parser.onReady = info => {
    fileInfo = info;

    // The `screenrecord` utility creates a mp4 with exactly 1 video stream and 1 metadata stream.
    if (fileInfo.videoTracks.length != 1) {
      throw new Error(
        `Recording must contain exactly 1 video track (found ${fileInfo.videoTracks.length})`
      );
    }
    videoTrack = fileInfo.videoTracks[0];

    // extract all video samples to collect frame times
    parser.setExtractionOptions(videoTrack.id, 'video');
    // extract as all metadata stamples to parse winscope metadata.
    fileInfo.metadataTracks.forEach(({ id }) => parser.setExtractionOptions(id, 'metadata'));

    if (readFrameData) {
      parser.start();
    }
  };

  const frames: FrameMetadata[] = [];
  let winscope1PresentationTimes: bigint[] | undefined;

  function consumeFrameSample(sample: Sample) {
    const timescale = sample.timescale;

    frames.push({
      index: sample.number,
      time: sample.cts / timescale,
    });
  }

  function consumeMetadataSample(sample: Sample) {
    if (sample.data.length < WINSCOPE_MAGIC_STRING_LENGTH) return;
    const magic = sample.data.subarray(0, WINSCOPE_MAGIC_STRING_LENGTH);
    const payload = new DataView(
      sample.data.buffer,
      sample.data.byteOffset + WINSCOPE_MAGIC_STRING_LENGTH
    );

    if (arrayBufferEquals(magic, WINSCOPE_MAGIC_STRING_V1)) {
      const frameCount = payload.getUint32(0, true);
      winscope1PresentationTimes = [];
      for (let i = 0; i < frameCount; i++) {
        winscope1PresentationTimes.push(payload.getBigUint64(4 + i * 8, true));
      }
    } else if (arrayBufferEquals(magic, WINSCOPE_MAGIC_STRING_V2)) {

      console.log();

    }
  }

  parser.onSamples = (id, user, samples) => {
    if (user === 'video') {
      samples.forEach(consumeFrameSample);
    } else if (user == 'metadata') {
      samples.forEach(consumeMetadataSample);
    }
    parser.releaseUsedSamples(id, samples[samples.length - 1].number);
  };

  // Feed raw bytes to mp4box.
  const mp4FileReader = (await storage.readable(BLOB_SCREENRECORDING_NAME)).getReader();
  let bytesRead = 0;
  while (!parseError) {
    const { done, value } = await mp4FileReader.read();
    if (done) {
      parser.flush();
      break;
    }

    const buffer = value.buffer as Buffer;
    buffer.fileStart = bytesRead;
    parser.appendBuffer(buffer);
    bytesRead += buffer.byteLength;
  }

  if (parseError) {
    await mp4FileReader.cancel(parseError);
    throw new Error(parseError);
  }

  if (!videoTrack) {
    throw new Error('Video track not found');
  }

  if (winscope1PresentationTimes) {
    checkState(winscope1PresentationTimes.length === frames.length);
    for (let i = 0; i < winscope1PresentationTimes.length; i++) {
      frames[i].winscope1PtsMicros = winscope1PresentationTimes[i];
    }
  }

  parser.stop();

  return {
    width: videoTrack.video.width,
    height: videoTrack.video.height,
    duration_nanos: (BigInt(fileInfo!.duration) * 1_000_000_000n) / BigInt(fileInfo!.timescale),
    videoFrames: frames,
  };
}
