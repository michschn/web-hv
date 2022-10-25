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

import { checkArgument } from '../../utils/preconditions';

/** Maps frame time to frame number and vice versa. */
export class Timeline {
  constructor(
    /**
     * Times of all frames, represented as a double-precision floating-point value in seconds.
     *
     * The list must be sorted strictily ascending, and within the bound of [0, duration]. The
     * first frame MUST be at 0.
     */
    public readonly frameTimes: ReadonlyArray<number>,
    /** Duration , represented as a double-precision floating-point value in seconds. */

    public readonly duration: number
  ) {
    let lastTime = frameTimes.length > 0 ? frameTimes[0] : 0;
    checkArgument(lastTime === 0);

    for (let i = 1; i < frameTimes.length; i++) {
      const frameTime = frameTimes[i];
      checkArgument(frameTime > lastTime);
      checkArgument(frameTime <= this.duration);
      lastTime = frameTime;
    }
  }

  /** Number of frames in this timeline. */
  get frameCount(): number {
    return this.frameTimes.length;
  }

  /**
   * The frame number covering the time in seconds.
   *
   * Each frame starts at the frame time, and just before the next frame's start time, or duration
   * if it's the last frame.
   */
  getFrameFromTime(timeSeconds: number): number {
    if (timeSeconds < 0) return Number.NEGATIVE_INFINITY;
    if (timeSeconds >= this.duration) return Number.POSITIVE_INFINITY;

    const frameTimes = this.frameTimes;

    let start = 0;
    let end = frameTimes.length - 1;

    while (start <= end) {
      let mid = (start + end) >> 1;

      if (frameTimes[mid] === timeSeconds) {
        return mid;
      }

      if (timeSeconds < frameTimes[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return end;
  }

  getTimeFromFrame(frameNumber: number): number {
    frameNumber = Math.floor(frameNumber);
    if (frameNumber < 0) return Number.NEGATIVE_INFINITY;
    const frameTimes = this.frameTimes;
    if (frameNumber >= frameTimes.length) return Number.POSITIVE_INFINITY;

    return frameTimes[frameNumber];
  }
}
