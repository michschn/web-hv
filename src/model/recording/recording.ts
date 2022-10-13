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

import { SeekableVideoSource } from '../video/video-source';
import { Disposable } from '../../utils/disposer';
import { RecordedViewSource } from '../video/recorded-view-source';

export class Recording implements Disposable {
  constructor(
    public readonly duration: number,
    public readonly frames: ReadonlyArray<Frame>,
    public readonly videoSource: SeekableVideoSource
  ) {}

  static load(recordingId: string): Promise<Recording> {
    return loadRecording(recordingId);
  }

  dispose(): void {}
}

export interface Frame {
  readonly frameIndex: number;
  readonly frameTime: number;
}

async function loadRecording(recordingId: string): Promise<Recording> {
  const duration = 0;
  const frames: Frame[] = [];

  const videoSource = await RecordedViewSource.createVideoSource(recordingId);

  return new Recording(duration, frames, videoSource);
}
