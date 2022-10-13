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

import { Disposable } from '../../utils/disposer';

/**
 * A playable video that can be drawn on a `Canvas`.
 *
 * See `VideoSourceEventMap` for events this object notifies about.
 */
export interface VideoSource extends EventTarget,Disposable{
  /* Intrinsic width in pixels. */
  readonly width: number;

  /* Intrinsic height in pixels. */
  readonly height: number;

  /** Starts playing the video. */
  play(): Promise<void>;

  /** Stops playing the video. */
  stop(): Promise<void>;

  /* Draws the current frame. */
  drawCurrentFrame(ctx: CanvasRenderingContext2D): void;
}

interface VideoSourceEventMap {
  'metadata-changed': Event;
}

/** A `VideoSource` randomly seekable to a specified time */
export interface SeekableVideoSource extends VideoSource {
  /**
   * A read-only double-precision floating-point value indicating the total duration of the video
   * in second.
   */
  readonly duration: number;

  /**
   * Seeks the media to the given time, represented as a double-precision floating-point
   * value in seconds.
   *
   * Returns `true` once the seek succeeded, `false` if it was cancelled, for example by a later
   * seek, or stopping playback.
   */
  seek(time: number): Promise<boolean>;
}

declare global {
  interface VideoSource {
    addEventListener<K extends keyof VideoSourceEventMap>(
      type: K,
      listener: (this: VideoSource, ev: VideoSourceEventMap[K]) => void
    ): void;
  }
}
